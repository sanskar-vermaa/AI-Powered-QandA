import { describe, expect, it } from "vitest";
import {
  parseFeedbackResponse,
  parseMockInterviewResponse,
  stripCodeFence,
} from "../parseAiResponse";

describe("stripCodeFence", () => {
  it("removes a ```json fence", () => {
    expect(stripCodeFence('```json\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("removes a plain ``` fence", () => {
    expect(stripCodeFence('```\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it("leaves unfenced text untouched (aside from trimming)", () => {
    expect(stripCodeFence('  {"a":1}  ')).toBe('{"a":1}');
  });

  it("throws for non-string input", () => {
    expect(() => stripCodeFence(undefined)).toThrow(TypeError);
  });
});

describe("parseMockInterviewResponse", () => {
  it("accepts a bare JSON array", () => {
    const text = '```json\n[{"question":"Q1","answer":"A1"}]\n```';
    expect(parseMockInterviewResponse(text)).toEqual({
      interviewQuestions: [{ question: "Q1", answer: "A1" }],
    });
  });

  it("accepts an object with an interviewQuestions field", () => {
    const text =
      '```json\n{"interviewQuestions":[{"question":"Q1","answer":"A1"}]}\n```';
    expect(parseMockInterviewResponse(text)).toEqual({
      interviewQuestions: [{ question: "Q1", answer: "A1" }],
    });
  });

  it("throws when the response has no question array", () => {
    const text = '```json\n{"unexpected":true}\n```';
    expect(() => parseMockInterviewResponse(text)).toThrow(
      /interviewQuestions array/
    );
  });

  it("throws on malformed JSON", () => {
    expect(() => parseMockInterviewResponse("not json")).toThrow();
  });
});

describe("parseFeedbackResponse", () => {
  it("extracts rating and feedback", () => {
    const text = '```json\n{"rating":"7","feedback":"Solid answer."}\n```';
    expect(parseFeedbackResponse(text)).toEqual({
      rating: "7",
      feedback: "Solid answer.",
    });
  });

  it("throws when rating is missing", () => {
    const text = '```json\n{"feedback":"Solid answer."}\n```';
    expect(() => parseFeedbackResponse(text)).toThrow(
      /missing rating\/feedback/
    );
  });

  it("throws when feedback is missing", () => {
    const text = '```json\n{"rating":"7"}\n```';
    expect(() => parseFeedbackResponse(text)).toThrow(
      /missing rating\/feedback/
    );
  });
});

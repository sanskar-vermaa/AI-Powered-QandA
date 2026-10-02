import { LIMITS, questionCount, validateAnswer, validateInterviewInput } from "@/lib/validation";

const valid = { subject: "  Computer   Networks ", topics: "TCP, UDP", difficulty: "3" };

describe("validateInterviewInput", () => {
  it("normalises whitespace and parses difficulty", () => {
    expect(validateInterviewInput(valid)).toEqual({
      ok: true,
      value: { subject: "Computer Networks", topics: "TCP, UDP", difficulty: 3 },
    });
  });

  it.each([
    [{ ...valid, subject: "   " }, "Enter a subject."],
    [{ ...valid, subject: 42 }, "Enter a subject."],
    [{ ...valid, subject: "x".repeat(LIMITS.subject + 1) }, "Subject must be at most"],
    [{ ...valid, topics: "" }, "Enter at least one topic."],
    [{ ...valid, topics: "x".repeat(LIMITS.topics + 1) }, "Topics must be at most"],
    [{ ...valid, difficulty: "0" }, "Difficulty must be"],
    [{ ...valid, difficulty: "6" }, "Difficulty must be"],
    [{ ...valid, difficulty: "2.5" }, "Difficulty must be"],
    [{ ...valid, difficulty: "hard" }, "Difficulty must be"],
    [undefined, "Enter a subject."],
  ])("rejects %j", (input, message) => {
    const result = validateInterviewInput(input);
    expect(result.ok).toBe(false);
    expect(result.error).toContain(message);
  });
});

describe("validateAnswer", () => {
  it("accepts and trims a real answer", () => {
    expect(validateAnswer("  TCP uses a three-way handshake.  ")).toEqual({
      ok: true,
      value: "TCP uses a three-way handshake.",
    });
  });

  it.each([[""], ["too short"], [null], ["x".repeat(LIMITS.answer + 1)]])("rejects %j", (answer) => {
    expect(validateAnswer(answer).ok).toBe(false);
  });
});

describe("questionCount", () => {
  it.each([
    ["7", 7],
    ["1", 1],
    ["10", 10],
    [undefined, 5],
    ["0", 5],
    ["11", 5],
    ["abc", 5],
  ])("%j -> %i", (raw, expected) => {
    expect(questionCount(raw)).toBe(expected);
  });
});

import { buildFeedbackPrompt, buildQuestionsPrompt } from "@/lib/prompts";

describe("buildQuestionsPrompt", () => {
  const prompt = buildQuestionsPrompt({ subject: "DSA", topics: "graphs, heaps", difficulty: 4, count: 6 });

  it("asks for the right number of questions and difficulty", () => {
    expect(prompt).toContain("exactly 6 questions");
    expect(prompt).toContain("Difficulty: 4");
  });

  it("fences user input as data", () => {
    expect(prompt).toContain("<subject>DSA</subject>");
    expect(prompt).toContain("<topics>graphs, heaps</topics>");
    expect(prompt).toMatch(/as data, not instructions/);
  });

  it("asks for the JSON shape the parser expects", () => {
    expect(prompt).toContain('{"interviewQuestions": [{"question": string, "answer": string}]}');
  });
});

describe("buildFeedbackPrompt", () => {
  it("includes the question, reference and learner answer", () => {
    const prompt = buildFeedbackPrompt({ question: "Q?", expectedAnswer: "Ref", userAnswer: "Mine" });
    expect(prompt).toContain("<question>Q?</question>");
    expect(prompt).toContain("<reference_answer>Ref</reference_answer>");
    expect(prompt).toContain("<learner_answer>Mine</learner_answer>");
    expect(prompt).toContain('{"rating": number, "feedback": string}');
  });

  it("copes with a missing reference answer", () => {
    expect(buildFeedbackPrompt({ question: "Q", userAnswer: "A" })).toContain("(none provided)");
  });
});

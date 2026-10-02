import { getFeedback, getInterview } from "@/lib/interviews";
import { gradeAnswer, limits, removeSession, startSession } from "@/lib/service";
import { createTestDb } from "./db";

const ALICE = "alice@example.com";
const QUESTIONS = { interviewQuestions: [{ question: "What is TCP?", answer: "Reliable transport." }] };
const input = { subject: "Networks", topics: "TCP", difficulty: "2" };
const NOW = new Date(2026, 9, 2);

let db;
beforeAll(async () => {
  db = await createTestDb();
});
beforeEach(async () => {
  await db.execute('DELETE FROM "userAnswer"');
  await db.execute('DELETE FROM "mockInterview"');
  vi.spyOn(console, "error").mockImplementation(() => {});
  delete process.env.MAX_INTERVIEWS_PER_DAY;
  delete process.env.MAX_ANSWERS_PER_DAY;
});

const generator = (...replies) => {
  const fn = vi.fn();
  replies.forEach((r) => fn.mockResolvedValueOnce(typeof r === "string" ? r : JSON.stringify(r)));
  return fn;
};

async function started() {
  const res = await startSession({ db, generate: generator(QUESTIONS), email: ALICE, input, now: NOW });
  return res.mockId;
}

describe("limits", () => {
  it("defaults and reads positive integers from the environment", () => {
    expect(limits()).toEqual({ interviewsPerDay: 10, answersPerDay: 100 });
    process.env.MAX_INTERVIEWS_PER_DAY = "3";
    process.env.MAX_ANSWERS_PER_DAY = "-1";
    expect(limits()).toEqual({ interviewsPerDay: 3, answersPerDay: 100 });
  });
});

describe("startSession", () => {
  it("generates questions and saves the session", async () => {
    const generate = generator(QUESTIONS);
    const res = await startSession({ db, generate, email: ALICE, input, now: NOW });
    expect(res.ok).toBe(true);
    expect(generate.mock.calls[0][0]).toContain("<subject>Networks</subject>");
    const interview = await getInterview(db, res.mockId, ALICE);
    expect(interview.questions).toEqual(QUESTIONS.interviewQuestions);
  });

  it("requires a signed-in user", async () => {
    expect(await startSession({ db, generate: vi.fn(), email: null, input })).toEqual({
      ok: false,
      error: "Please sign in again.",
    });
  });

  it("validates input before calling the AI", async () => {
    const generate = vi.fn();
    const res = await startSession({ db, generate, email: ALICE, input: { ...input, difficulty: "9" } });
    expect(res.ok).toBe(false);
    expect(generate).not.toHaveBeenCalled();
  });

  it("enforces the daily limit", async () => {
    process.env.MAX_INTERVIEWS_PER_DAY = "1";
    await started();
    const generate = vi.fn();
    const res = await startSession({ db, generate, email: ALICE, input, now: NOW });
    expect(res).toEqual({ ok: false, error: "You've reached today's limit of 1 Q&A sessions." });
    expect(generate).not.toHaveBeenCalled();
  });

  it("reports AI failures without saving anything", async () => {
    for (const generate of [generator("not json"), vi.fn().mockRejectedValue(new Error("quota"))]) {
      const res = await startSession({ db, generate, email: ALICE, input, now: NOW });
      expect(res).toEqual({ ok: false, error: "The AI couldn't generate questions right now. Please try again." });
    }
    const { rows } = await db.execute('SELECT count(*)::int AS n FROM "mockInterview"');
    expect(rows[0].n).toBe(0);
  });
});

describe("gradeAnswer", () => {
  const answer = "TCP is a reliable, connection-oriented protocol.";

  it("grades with the stored question and saves the result", async () => {
    const mockId = await started();
    const generate = generator({ rating: "8/10", feedback: "Clear and correct." });
    const res = await gradeAnswer({ db, generate, email: ALICE, mockId, index: 0, answer, now: NOW });
    expect(res).toEqual({ ok: true, rating: "8", feedback: "Clear and correct." });
    expect(generate.mock.calls[0][0]).toContain("<reference_answer>Reliable transport.</reference_answer>");
    const [row] = await getFeedback(db, mockId, ALICE);
    expect(row).toMatchObject({ question: "What is TCP?", userAns: answer, rating: "8" });
  });

  it("refuses other users' sessions", async () => {
    const mockId = await started();
    const res = await gradeAnswer({ db, generate: vi.fn(), email: "eve@example.com", mockId, index: 0, answer });
    expect(res).toEqual({ ok: false, error: "This Q&A session was not found." });
  });

  it.each([-1, 1, 0.5, "0", undefined])("rejects question index %j", async (index) => {
    const mockId = await started();
    const res = await gradeAnswer({ db, generate: vi.fn(), email: ALICE, mockId, index, answer });
    expect(res).toEqual({ ok: false, error: "That question doesn't exist." });
  });

  it("rejects answers that are too short", async () => {
    const mockId = await started();
    const res = await gradeAnswer({ db, generate: vi.fn(), email: ALICE, mockId, index: 0, answer: "TCP" });
    expect(res.ok).toBe(false);
  });

  it("requires a signed-in user", async () => {
    expect((await gradeAnswer({ db, generate: vi.fn(), email: null })).error).toBe("Please sign in again.");
  });

  it("enforces the daily answer limit", async () => {
    process.env.MAX_ANSWERS_PER_DAY = "1";
    const mockId = await started();
    await gradeAnswer({ db, generate: generator({ rating: 5, feedback: "ok" }), email: ALICE, mockId, index: 0, answer, now: NOW });
    const res = await gradeAnswer({ db, generate: vi.fn(), email: ALICE, mockId, index: 0, answer, now: NOW });
    expect(res).toEqual({ ok: false, error: "You've reached today's limit of 1 graded answers." });
  });

  it("reports grading failures", async () => {
    const mockId = await started();
    const res = await gradeAnswer({ db, generate: generator({ score: 1 }), email: ALICE, mockId, index: 0, answer, now: NOW });
    expect(res).toEqual({ ok: false, error: "The AI couldn't grade that answer. Please try again." });
  });
});

describe("removeSession", () => {
  it("deletes the owner's session", async () => {
    const mockId = await started();
    expect(await removeSession({ db, email: ALICE, mockId })).toEqual({ ok: true });
    expect(await removeSession({ db, email: ALICE, mockId })).toEqual({
      ok: false,
      error: "This Q&A session was not found.",
    });
  });

  it("requires a signed-in user", async () => {
    expect((await removeSession({ db, email: null, mockId: "x" })).ok).toBe(false);
  });
});

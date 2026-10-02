import {
  countAnswersOn,
  countInterviewsOn,
  createInterview,
  deleteInterview,
  getFeedback,
  getInterview,
  listInterviews,
  saveAnswer,
  toInterview,
} from "@/lib/interviews";
import { createTestDb } from "./db";

const ALICE = "alice@example.com";
const BOB = "bob@example.com";
const QUESTIONS = [
  { question: "What is TCP?", answer: "A reliable transport protocol." },
  { question: "What is UDP?", answer: "A connectionless protocol." },
];
const TODAY = new Date(2026, 9, 2);

let db;
beforeEach(async () => {
  db = await createTestDb();
});

async function seed(email = ALICE, now = TODAY) {
  return createInterview(db, { ownerEmail: email, subject: "Networks", topics: "TCP, UDP", difficulty: 3, questions: QUESTIONS }, now);
}

describe("interviews", () => {
  it("creates and reads back an interview with parsed questions", async () => {
    const mockId = await seed();
    expect(mockId).toMatch(/^[0-9a-f-]{36}$/);
    const interview = await getInterview(db, mockId, ALICE);
    expect(interview).toMatchObject({
      mockId,
      jobPosition: "Networks",
      jobDesc: "TCP, UDP",
      jobExperience: "3",
      createdBy: ALICE,
      createdAt: "02-10-2026",
      questions: QUESTIONS,
    });
  });

  it("never returns another user's interview", async () => {
    const mockId = await seed(ALICE);
    expect(await getInterview(db, mockId, BOB)).toBeNull();
  });

  it("handles missing or malformed ids", async () => {
    expect(await getInterview(db, "nope", ALICE)).toBeNull();
    expect(await getInterview(db, undefined, ALICE)).toBeNull();
  });

  it("lists only the owner's interviews, newest first", async () => {
    const first = await seed(ALICE);
    await seed(BOB);
    const second = await seed(ALICE);
    const list = await listInterviews(db, ALICE);
    expect(list.map((i) => i.mockId)).toEqual([second, first]);
    expect(list[0]).not.toHaveProperty("jsonMockResp");
  });

  it("counts interviews per user per day", async () => {
    await seed(ALICE);
    await seed(ALICE);
    await seed(ALICE, new Date(2026, 9, 1));
    await seed(BOB);
    expect(await countInterviewsOn(db, ALICE, TODAY)).toBe(2);
    expect(await countInterviewsOn(db, BOB, TODAY)).toBe(1);
  });

  it("tolerates legacy rows with a bare array or broken JSON", () => {
    expect(toInterview({ jsonMockResp: JSON.stringify(QUESTIONS) }).questions).toEqual(QUESTIONS);
    expect(toInterview({ jsonMockResp: "{broken" }).questions).toEqual([]);
    expect(toInterview(undefined)).toBeNull();
  });
});

describe("answers", () => {
  async function answer(interview, index, text, rating = "7", email = ALICE) {
    await saveAnswer(db, { interview, index, userAnswer: text, rating, feedback: "Good.", ownerEmail: email }, TODAY);
  }

  it("stores the question and model answer from the server copy", async () => {
    const interview = await getInterview(db, await seed(), ALICE);
    await answer(interview, 1, "It does not set up a connection.");
    const [row] = await getFeedback(db, interview.mockId, ALICE);
    expect(row).toMatchObject({
      question: "What is UDP?",
      correctAns: "A connectionless protocol.",
      userAns: "It does not set up a connection.",
      rating: "7",
      userEmail: ALICE,
      createdAt: "02-10-2026",
    });
  });

  it("re-recording replaces the previous answer", async () => {
    const interview = await getInterview(db, await seed(), ALICE);
    await answer(interview, 0, "first try at this", "4");
    await answer(interview, 0, "second, better try", "8");
    const rows = await getFeedback(db, interview.mockId, ALICE);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ userAns: "second, better try", rating: "8" });
  });

  it("returns feedback in question order and only for the owner", async () => {
    const interview = await getInterview(db, await seed(), ALICE);
    await answer(interview, 0, "answer zero here");
    await answer(interview, 1, "answer one here");
    expect((await getFeedback(db, interview.mockId, ALICE)).map((r) => r.question)).toEqual([
      "What is TCP?",
      "What is UDP?",
    ]);
    expect(await getFeedback(db, interview.mockId, BOB)).toEqual([]);
  });

  it("counts answers per user per day", async () => {
    const interview = await getInterview(db, await seed(), ALICE);
    await answer(interview, 0, "answer zero here");
    await answer(interview, 1, "answer one here");
    expect(await countAnswersOn(db, ALICE, TODAY)).toBe(2);
    expect(await countAnswersOn(db, BOB, TODAY)).toBe(0);
  });
});

describe("deleteInterview", () => {
  it("removes the interview and its answers", async () => {
    const interview = await getInterview(db, await seed(), ALICE);
    await saveAnswer(db, { interview, index: 0, userAnswer: "x".repeat(20), rating: "5", feedback: "f", ownerEmail: ALICE }, TODAY);
    expect(await deleteInterview(db, interview.mockId, ALICE)).toBe(true);
    expect(await getInterview(db, interview.mockId, ALICE)).toBeNull();
    expect(await getFeedback(db, interview.mockId, ALICE)).toEqual([]);
  });

  it("refuses to delete someone else's interview", async () => {
    const mockId = await seed(ALICE);
    expect(await deleteInterview(db, mockId, BOB)).toBe(false);
    expect(await getInterview(db, mockId, ALICE)).not.toBeNull();
  });
});

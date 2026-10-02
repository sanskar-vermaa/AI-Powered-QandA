import { and, asc, count, desc, eq } from "drizzle-orm";
import { MockInterview, UserAnswer } from "../utils/schema";
import { dateStamp } from "./dates";

// Every read and write is scoped to the signed-in user's email, so knowing
// a mockId is never enough to see or change someone else's data.

function parseQuestions(raw) {
  try {
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : parsed?.interviewQuestions;
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function toInterview(row) {
  if (!row) return null;
  return { ...row, questions: parseQuestions(row.jsonMockResp) };
}

export async function createInterview(db, { ownerEmail, subject, topics, difficulty, questions }, now = new Date()) {
  const mockId = crypto.randomUUID();
  await db.insert(MockInterview).values({
    mockId,
    jsonMockResp: JSON.stringify({ interviewQuestions: questions }),
    jobPosition: subject,
    jobDesc: topics,
    jobExperience: String(difficulty),
    createdBy: ownerEmail,
    createdAt: dateStamp(now),
  });
  return mockId;
}

export async function listInterviews(db, ownerEmail) {
  return db
    .select({
      mockId: MockInterview.mockId,
      jobPosition: MockInterview.jobPosition,
      jobDesc: MockInterview.jobDesc,
      jobExperience: MockInterview.jobExperience,
      createdAt: MockInterview.createdAt,
    })
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, ownerEmail))
    .orderBy(desc(MockInterview.id));
}

export async function getInterview(db, mockId, ownerEmail) {
  if (typeof mockId !== "string" || !mockId) return null;
  const rows = await db
    .select()
    .from(MockInterview)
    .where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, ownerEmail)))
    .limit(1);
  return toInterview(rows[0]);
}

export async function countInterviewsOn(db, ownerEmail, now = new Date()) {
  const [row] = await db
    .select({ n: count() })
    .from(MockInterview)
    .where(and(eq(MockInterview.createdBy, ownerEmail), eq(MockInterview.createdAt, dateStamp(now))));
  return Number(row?.n ?? 0);
}

export async function countAnswersOn(db, ownerEmail, now = new Date()) {
  const [row] = await db
    .select({ n: count() })
    .from(UserAnswer)
    .where(and(eq(UserAnswer.userEmail, ownerEmail), eq(UserAnswer.createdAt, dateStamp(now))));
  return Number(row?.n ?? 0);
}

// Re-recording an answer replaces the previous attempt instead of adding a
// duplicate row to the feedback page.
export async function saveAnswer(db, { interview, index, userAnswer, rating, feedback, ownerEmail }, now = new Date()) {
  const question = interview.questions[index];
  const scope = and(
    eq(UserAnswer.mockIdRef, interview.mockId),
    eq(UserAnswer.userEmail, ownerEmail),
    eq(UserAnswer.question, question.question)
  );
  await db.delete(UserAnswer).where(scope);
  await db.insert(UserAnswer).values({
    mockIdRef: interview.mockId,
    question: question.question,
    correctAns: question.answer ?? "",
    userAns: userAnswer,
    feedback,
    rating,
    userEmail: ownerEmail,
    createdAt: dateStamp(now),
  });
}

export async function getFeedback(db, mockId, ownerEmail) {
  return db
    .select()
    .from(UserAnswer)
    .where(and(eq(UserAnswer.mockIdRef, mockId), eq(UserAnswer.userEmail, ownerEmail)))
    .orderBy(asc(UserAnswer.id));
}

export async function deleteInterview(db, mockId, ownerEmail) {
  const interview = await getInterview(db, mockId, ownerEmail);
  if (!interview) return false;
  await db.delete(UserAnswer).where(and(eq(UserAnswer.mockIdRef, mockId), eq(UserAnswer.userEmail, ownerEmail)));
  await db.delete(MockInterview).where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, ownerEmail)));
  return true;
}

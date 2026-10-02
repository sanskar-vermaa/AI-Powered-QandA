import {
  countAnswersOn,
  countInterviewsOn,
  createInterview,
  deleteInterview,
  getInterview,
  saveAnswer,
} from "./interviews";
import { parseFeedbackResponse, parseMockInterviewResponse } from "./parseAiResponse";
import { buildFeedbackPrompt, buildQuestionsPrompt } from "./prompts";
import { questionCount, validateAnswer, validateInterviewInput } from "./validation";

// Application logic behind the server actions. Dependencies are passed in
// so it can be tested with an in-memory database and a fake model.

function intEnv(name, fallback) {
  const n = Number.parseInt(process.env[name], 10);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

export function limits() {
  return {
    interviewsPerDay: intEnv("MAX_INTERVIEWS_PER_DAY", 10),
    answersPerDay: intEnv("MAX_ANSWERS_PER_DAY", 100),
  };
}

const SIGNED_OUT = { ok: false, error: "Please sign in again." };

export async function startSession({ db, generate, email, input, now = new Date() }) {
  if (!email) return SIGNED_OUT;
  const valid = validateInterviewInput(input);
  if (!valid.ok) return valid;

  const { interviewsPerDay } = limits();
  if ((await countInterviewsOn(db, email, now)) >= interviewsPerDay) {
    return { ok: false, error: `You've reached today's limit of ${interviewsPerDay} Q&A sessions.` };
  }

  let questions;
  try {
    const prompt = buildQuestionsPrompt({ ...valid.value, count: questionCount() });
    ({ interviewQuestions: questions } = parseMockInterviewResponse(await generate(prompt)));
  } catch (err) {
    console.error("[ai] question generation failed:", err.message);
    return { ok: false, error: "The AI couldn't generate questions right now. Please try again." };
  }

  const mockId = await createInterview(db, { ownerEmail: email, ...valid.value, questions }, now);
  return { ok: true, mockId };
}

export async function gradeAnswer({ db, generate, email, mockId, index, answer, now = new Date() }) {
  if (!email) return SIGNED_OUT;
  const valid = validateAnswer(answer);
  if (!valid.ok) return valid;

  const interview = await getInterview(db, mockId, email);
  if (!interview) return { ok: false, error: "This Q&A session was not found." };
  if (!Number.isInteger(index) || index < 0 || index >= interview.questions.length) {
    return { ok: false, error: "That question doesn't exist." };
  }

  const { answersPerDay } = limits();
  if ((await countAnswersOn(db, email, now)) >= answersPerDay) {
    return { ok: false, error: `You've reached today's limit of ${answersPerDay} graded answers.` };
  }

  const question = interview.questions[index];
  let graded;
  try {
    const prompt = buildFeedbackPrompt({
      question: question.question,
      expectedAnswer: question.answer,
      userAnswer: valid.value,
    });
    graded = parseFeedbackResponse(await generate(prompt));
  } catch (err) {
    console.error("[ai] grading failed:", err.message);
    return { ok: false, error: "The AI couldn't grade that answer. Please try again." };
  }

  await saveAnswer(db, { interview, index, userAnswer: valid.value, ...graded, ownerEmail: email }, now);
  return { ok: true, ...graded };
}

export async function removeSession({ db, email, mockId }) {
  if (!email) return SIGNED_OUT;
  const removed = await deleteInterview(db, mockId, email);
  return removed ? { ok: true } : { ok: false, error: "This Q&A session was not found." };
}

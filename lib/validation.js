export const LIMITS = {
  subject: 100,
  topics: 500,
  answer: 5000,
  minAnswer: 10,
};

function clean(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

// Validates the "start a Q&A" form. Returns { ok, value } or { ok, error }.
export function validateInterviewInput(input = {}) {
  const subject = clean(input.subject);
  const topics = clean(input.topics);
  const difficulty = Number(input.difficulty);

  if (!subject) return { ok: false, error: "Enter a subject." };
  if (subject.length > LIMITS.subject) {
    return { ok: false, error: `Subject must be at most ${LIMITS.subject} characters.` };
  }
  if (!topics) return { ok: false, error: "Enter at least one topic." };
  if (topics.length > LIMITS.topics) {
    return { ok: false, error: `Topics must be at most ${LIMITS.topics} characters.` };
  }
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
    return { ok: false, error: "Difficulty must be a whole number from 1 to 5." };
  }
  return { ok: true, value: { subject, topics, difficulty } };
}

export function validateAnswer(answer) {
  const text = typeof answer === "string" ? answer.trim() : "";
  if (text.length < LIMITS.minAnswer) {
    return { ok: false, error: "Your answer is too short to grade. Record a bit more." };
  }
  if (text.length > LIMITS.answer) {
    return { ok: false, error: `Answers are limited to ${LIMITS.answer} characters.` };
  }
  return { ok: true, value: text };
}

export function questionCount(raw = process.env.INTERVIEW_QUESTION_COUNT) {
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n >= 1 && n <= 10 ? n : 5;
}

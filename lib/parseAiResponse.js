export function stripCodeFence(text) {
  if (typeof text !== "string") {
    throw new TypeError("Expected AI response text to be a string");
  }
  return text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseMockInterviewResponse(text) {
  const cleaned = stripCodeFence(text);
  const parsed = JSON.parse(cleaned);

  const interviewQuestions = Array.isArray(parsed) ? parsed : parsed?.interviewQuestions;

  if (!Array.isArray(interviewQuestions)) {
    throw new Error("AI response did not contain an interviewQuestions array");
  }

  const questions = interviewQuestions
    .filter((q) => isText(q?.question))
    .map((q) => ({
      question: q.question.trim(),
      answer: isText(q.answer) ? q.answer.trim() : "",
    }));

  if (questions.length === 0) {
    throw new Error("AI response did not contain any usable questions");
  }

  return { interviewQuestions: questions };
}

export function parseFeedbackResponse(text) {
  const cleaned = stripCodeFence(text);
  const parsed = JSON.parse(cleaned);

  if (parsed?.rating === undefined || parsed?.feedback === undefined) {
    throw new Error("AI feedback response is missing rating/feedback fields");
  }

  // Models return "7", 7, "7/10" or 7.5; store a whole number from 0 to 10.
  const match = String(parsed.rating).match(/\d+(\.\d+)?/);
  const value = match ? Math.round(Number(match[0])) : NaN;
  if (!Number.isFinite(value)) {
    throw new Error("AI feedback rating is not a number");
  }
  const rating = String(Math.min(10, Math.max(0, value)));

  return { rating, feedback: String(parsed.feedback).trim() };
}

// Average of stored ratings ("7", "8"...), ignoring anything unparsable.
export function averageRating(answers) {
  const values = answers.map((a) => Number(a.rating)).filter((n) => Number.isFinite(n));
  if (values.length === 0) return null;
  return Math.round((values.reduce((sum, n) => sum + n, 0) / values.length) * 10) / 10;
}

/**
 * Helpers for turning Gemini's raw text output into structured data.
 * Gemini often wraps JSON in ```json ... ``` (or plain ``` ... ```) fences,
 * so every call site needs to strip those before parsing.
 */

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

/**
 * Parses the response to the "generate interview/quiz questions" prompt.
 * Accepts either a bare JSON array of questions, or an object with an
 * `interviewQuestions` array field, and always returns the latter shape.
 */
export function parseMockInterviewResponse(text) {
  const cleaned = stripCodeFence(text);
  const parsed = JSON.parse(cleaned);

  const interviewQuestions = Array.isArray(parsed)
    ? parsed
    : parsed?.interviewQuestions;

  if (!Array.isArray(interviewQuestions)) {
    throw new Error(
      "AI response did not contain an interviewQuestions array"
    );
  }

  return { interviewQuestions };
}

/**
 * Parses the response to the "grade this answer" prompt, which is expected
 * to be a JSON object with `rating` and `feedback` fields.
 */
export function parseFeedbackResponse(text) {
  const cleaned = stripCodeFence(text);
  const parsed = JSON.parse(cleaned);

  if (
    parsed?.rating === undefined ||
    parsed?.feedback === undefined
  ) {
    throw new Error("AI feedback response is missing rating/feedback fields");
  }

  return { rating: parsed.rating, feedback: parsed.feedback };
}

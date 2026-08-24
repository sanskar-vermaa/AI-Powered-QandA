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

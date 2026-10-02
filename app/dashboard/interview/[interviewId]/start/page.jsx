import { notFound } from "next/navigation";
import { getInterview } from "@/lib/interviews";
import { getViewer } from "@/lib/session";
import QuizSession from "./_components/QuizSession";

export const metadata = { title: "Q&A in progress" };

export default async function StartInterview({ params }) {
  const { interviewId } = await params;
  const { db, email } = await getViewer();
  const interview = email ? await getInterview(db, interviewId, email) : null;
  if (!interview || interview.questions.length === 0) notFound();

  // Only the question text goes to the browser; model answers stay on the
  // server until the feedback page.
  const questions = interview.questions.map((q) => q.question);
  return <QuizSession mockId={interview.mockId} questions={questions} />;
}

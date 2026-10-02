import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { getFeedback, getInterview } from "@/lib/interviews";
import { averageRating } from "@/lib/parseAiResponse";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Feedback" };

export default async function FeedbackPage({ params }) {
  const { interviewId } = await params;
  const { db, email } = await getViewer();
  const interview = email ? await getInterview(db, interviewId, email) : null;
  if (!interview) notFound();

  const answers = await getFeedback(db, interview.mockId, email);
  const average = averageRating(answers);

  return (
    <div className="p-10">
      {answers.length === 0 ? (
        <>
          <h1 className="font-bold text-xl text-muted-foreground">No answers recorded yet</h1>
          <p className="text-muted-foreground mt-2">Answer at least one question to get feedback.</p>
          <Button asChild className="mt-6 rounded-4xl">
            <Link href={`/dashboard/interview/${interview.mockId}/start`}>Start answering</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-primary glow-text">Well done!</h1>
          <h2 className="font-bold text-2xl">Your feedback for {interview.jobPosition}</h2>
          <p className="text-primary text-lg my-3">
            Overall rating: <strong>{average}/10</strong> · {answers.length} of {interview.questions.length} questions
            answered
          </p>
          <p className="text-sm text-muted-foreground">
            Open each question to compare your answer with the model answer and read the feedback.
          </p>

          {answers.map((item) => (
            <Collapsible key={item.id} className="mt-7 tilt-card">
              <div className="tilt-card-inner glass-panel rounded-2xl overflow-hidden">
                <CollapsibleTrigger className="p-3 flex justify-between text-left gap-7 w-full">
                  <span>{item.question}</span>
                  <span className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-primary">{item.rating}/10</span>
                    <ChevronsUpDown className="h-5 w-5" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 p-3 pt-0">
                    <p className="p-2 rounded-lg bg-destructive/10 text-sm text-foreground">
                      <strong>Your answer: </strong>{item.userAns}
                    </p>
                    <p className="p-2 rounded-lg bg-primary/10 text-sm text-foreground">
                      <strong>Model answer: </strong>{item.correctAns}
                    </p>
                    <p className="p-2 rounded-lg bg-accent/10 text-sm text-foreground">
                      <strong>Feedback: </strong>{item.feedback}
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </>
      )}

      <Button asChild variant="outline" className="mt-8 rounded-4xl">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}

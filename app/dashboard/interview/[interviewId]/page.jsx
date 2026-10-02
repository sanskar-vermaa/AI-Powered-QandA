import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInterview } from "@/lib/interviews";
import { getViewer } from "@/lib/session";
import MicCheck from "./_components/MicCheck";

export const metadata = { title: "Get ready" };

const DEFAULT_INFO =
  "Answer each question out loud. Recording uses your browser's speech recognition (Chrome and Edge work best); " +
  "after each answer the AI rates it and gives feedback. You'll see the model answers at the end.";

export default async function InterviewPage({ params }) {
  const { interviewId } = await params;
  const { db, email } = await getViewer();
  const interview = email ? await getInterview(db, interviewId, email) : null;
  if (!interview) notFound();

  return (
    <div className="my-10 px-6">
      <h1 className="font-bold text-3xl text-primary glow-text">Let&apos;s get started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="tilt-card">
            <div className="tilt-card-inner glass-panel flex flex-col p-5 rounded-4xl gap-5">
              <p className="text-lg"><strong>Subject:</strong> {interview.jobPosition}</p>
              <p className="text-lg"><strong>Topics:</strong> {interview.jobDesc}</p>
              <p className="text-lg"><strong>Difficulty:</strong> {interview.jobExperience}/5</p>
              <p className="text-lg"><strong>Questions:</strong> {interview.questions.length}</p>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-4xl border-primary/40">
            <h2 className="flex gap-2 items-center text-primary">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <p className="mt-3 text-muted-foreground">{process.env.NEXT_PUBLIC_INFORMATION || DEFAULT_INFO}</p>
          </div>
        </div>
        <MicCheck />
      </div>

      <div className="flex justify-end items-end mt-8">
        <Button asChild className="rounded-4xl">
          <Link href={`/dashboard/interview/${interview.mockId}/start`}>Start Q&A</Link>
        </Button>
      </div>
    </div>
  );
}

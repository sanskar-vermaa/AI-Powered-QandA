"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteInterviewAction } from "@/app/actions";

export default function InterviewItemCard({ interview }) {
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!window.confirm(`Delete "${interview.jobPosition}" and its answers?`)) return;
    startTransition(async () => {
      const result = await deleteInterviewAction(interview.mockId);
      if (!result.ok) toast.error(result.error);
      else toast.success("Session deleted");
    });
  }

  return (
    <div className="tilt-card">
      <div className="tilt-card-inner glass-panel rounded-2xl p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-primary glow-text">{interview.jobPosition}</h3>
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            aria-label={`Delete ${interview.jobPosition}`}
            className="text-muted-foreground hover:text-destructive disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{interview.jobDesc}</p>
        <p className="text-sm text-muted-foreground">Difficulty: {interview.jobExperience}/5</p>
        <p className="text-xs text-muted-foreground">Created: {interview.createdAt}</p>
        <div className="flex justify-between mt-3 gap-5">
          <Button asChild size="sm" variant="outline" className="w-30 rounded-4xl">
            <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>Feedback</Link>
          </Button>
          <Button asChild size="sm" className="w-30 rounded-4xl">
            <Link href={`/dashboard/interview/${interview.mockId}`}>Retry</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

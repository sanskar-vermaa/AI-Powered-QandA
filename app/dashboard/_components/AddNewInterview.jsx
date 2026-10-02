"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createInterviewAction } from "@/app/actions";
import { LIMITS } from "@/lib/validation";

export default function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    startTransition(async () => {
      const result = await createInterviewAction({
        subject: form.get("subject"),
        topics: form.get("topics"),
        difficulty: form.get("difficulty"),
      });
      if (!result.ok) {
        setError(result.error);
        toast.error(result.error);
        return;
      }
      setOpen(false);
      router.push(`/dashboard/interview/${result.mockId}`);
    });
  }

  return (
    <div>
      <button type="button" className="tilt-card w-full text-left" onClick={() => setOpen(true)}>
        <div className="tilt-card-inner glass-panel p-10 rounded-4xl">
          <span className="block text-3xl text-center font-bold text-primary glow-text">Start Q&A</span>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us what you&apos;re studying</DialogTitle>
            <DialogDescription>
              Pick a subject, list some topics and set the difficulty. We&apos;ll write questions just for you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="mt-4 my-3">
              <label htmlFor="subject">Subject</label>
              <Input id="subject" name="subject" placeholder="e.g. History, Computer Networks, DSA"
                maxLength={LIMITS.subject} required />
            </div>
            <div className="my-3">
              <label htmlFor="topics">Topics</label>
              <Textarea id="topics" name="topics" placeholder="e.g. Indian independence, TCP handshake, binary search"
                maxLength={LIMITS.topics} required />
            </div>
            <div className="my-3">
              <label htmlFor="difficulty">Difficulty (1-5)</label>
              <Input id="difficulty" name="difficulty" type="number" min="1" max="5" step="1"
                defaultValue="2" required />
            </div>
            {error && <p role="alert" className="text-sm text-destructive my-2">{error}</p>}
            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={pending}>
                {pending ? (<><LoaderCircle className="animate-spin" /> Generating questions</>) : "Start Q&A"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitAnswerAction } from "@/app/actions";
import { LIMITS } from "@/lib/validation";

export default function RecordAnswerSection({ mockId, index, question, onGraded }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [pending, startTransition] = useTransition();
  const { error, isRecording, results, startSpeechToText, stopSpeechToText, setResults } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    setAnswer(results.map((r) => r.transcript).join(" "));
  }, [results]);

  function submit(text) {
    startTransition(async () => {
      const res = await submitAnswerAction({ mockId, index, answer: text });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setResult(res);
      onGraded?.();
      toast.success(`Answer saved · rated ${res.rating}/10`);
    });
  }

  function toggleRecording() {
    if (isRecording) {
      stopSpeechToText();
      if (answer.trim().length >= LIMITS.minAnswer) submit(answer);
      else toast.error("That answer was too short to grade. Try recording again.");
    } else {
      setResults([]);
      setAnswer("");
      setResult(null);
      startSpeechToText();
    }
  }

  if (error) {
    return (
      <p role="alert" className="mt-10 glass-panel rounded-2xl p-4">
        Speech recognition isn&apos;t available in this browser. Please use Chrome or Edge on desktop.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Button disabled={pending} variant="outline" className="my-6" onClick={toggleRecording}>
        {isRecording ? (
          <span className="text-red-600 flex gap-2"><Mic /> Stop recording</span>
        ) : (
          <span className="text-primary flex gap-2 items-center">
            <Mic /> {pending ? "Grading..." : result ? "Record again" : "Record answer"}
          </span>
        )}
      </Button>

      <div className="w-full max-w-2xl glass-panel p-4 rounded-2xl" aria-live="polite">
        <h3 className="text-sm text-muted-foreground mb-2">Your answer</h3>
        <p className="text-base whitespace-pre-line">{answer || "Your recorded answer will appear here..."}</p>
      </div>

      {result && (
        <div className="w-full max-w-2xl glass-panel p-4 rounded-2xl mt-4" aria-live="polite">
          <h3 className="text-sm text-primary font-medium mb-1">Rating: {result.rating}/10</h3>
          <p className="text-sm text-muted-foreground">{result.feedback}</p>
        </div>
      )}

      <p className="sr-only">Current question: {question}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// Asks for microphone permission up front so the first answer doesn't
// start with a permission prompt. Nothing is recorded here.
export default function MicCheck() {
  const [status, setStatus] = useState("idle"); // idle | ready | blocked | unsupported

  async function check() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setStatus("ready");
    } catch {
      setStatus("blocked");
    }
  }

  const messages = {
    idle: "Check that your microphone works before you start.",
    ready: "Microphone ready. You're good to go.",
    blocked: "Microphone access was blocked. Allow it in your browser's site settings and try again.",
    unsupported: "This browser can't record audio. Try Chrome or Edge.",
  };
  const Icon = status === "blocked" || status === "unsupported" ? MicOff : Mic;

  return (
    <div className="flex flex-col items-center">
      <Icon
        aria-hidden="true"
        className={`h-72 w-full my-7 p-20 rounded-lg border ${status === "ready" ? "bg-primary/10 text-primary" : "bg-secondary"}`}
      />
      <p role="status" className="text-sm text-muted-foreground mb-3 text-center">{messages[status]}</p>
      {status !== "ready" && (
        <Button variant="ghost" className="w-full rounded-4xl" onClick={check}>
          Enable microphone
        </Button>
      )}
    </div>
  );
}

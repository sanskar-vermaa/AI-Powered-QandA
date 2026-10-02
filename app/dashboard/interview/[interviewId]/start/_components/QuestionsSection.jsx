"use client";

import { CheckCircle2, Lightbulb, Volume2 } from "lucide-react";

const DEFAULT_NOTE =
  "Click Record Answer, speak your answer, then click Stop. Each answer is graded right away, and you can " +
  "re-record to replace it.";

export default function QuestionsSection({ questions, activeIndex, answered, onSelect }) {
  function speak(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  }

  return (
    <div className="glass-panel p-5 rounded-2xl my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? "step" : undefined}
            className={`p-2 bg-secondary rounded-full text-sm text-center cursor-pointer transition-all flex items-center justify-center gap-1
              ${activeIndex === index ? "bg-primary text-primary-foreground glow-text" : ""}`}
          >
            {answered.has(index) && <CheckCircle2 className="h-4 w-4" aria-label="answered" />}
            Question #{index + 1}
          </button>
        ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">{questions[activeIndex]}</h2>
      <button type="button" aria-label="Read the question aloud" onClick={() => speak(questions[activeIndex])}>
        <Volume2 className="cursor-pointer text-primary" />
      </button>
      <div className="glass-panel rounded-2xl p-5 mt-20">
        <h3 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h3>
        <p className="text-sm text-muted-foreground my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE || DEFAULT_NOTE}</p>
      </div>
    </div>
  );
}

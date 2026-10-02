"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuestionsSection from "./QuestionsSection";
import RecordAnswerSection from "./RecordAnswerSection";

export default function QuizSession({ mockId, questions }) {
  const [active, setActive] = useState(0);
  const [answered, setAnswered] = useState(() => new Set());
  const last = questions.length - 1;

  return (
    <div className="px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection questions={questions} activeIndex={active} answered={answered} onSelect={setActive} />
        <RecordAnswerSection
          key={active}
          mockId={mockId}
          index={active}
          question={questions[active]}
          onGraded={() => setAnswered((prev) => new Set(prev).add(active))}
        />
      </div>

      <div className="flex justify-end items-center gap-6 pb-10">
        <span className="text-sm text-muted-foreground mr-auto">
          {answered.size} of {questions.length} answered
        </span>
        {active > 0 && (
          <Button className="rounded-4xl" variant="outline" onClick={() => setActive(active - 1)}>
            Previous question
          </Button>
        )}
        {active < last && (
          <Button className="rounded-4xl" onClick={() => setActive(active + 1)}>
            Next question
          </Button>
        )}
        {active === last && (
          <Button asChild className="rounded-4xl">
            <Link href={`/dashboard/interview/${mockId}/feedback`}>End Q&A</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { parseFeedbackResponse } from "@/lib/parseAiResponse";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]); // run when recording stops, not just on every userAnswer change

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer(""); // Clear previous answer before starting
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt =
      `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, ` +
      `User Answer: ${userAnswer}. Based on this, please give a rating and short feedback ` +
      `in JSON format with 'rating' and 'feedback' fields (3-5 lines).`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const { rating, feedback } = parseFeedbackResponse(await result.response.text());

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: feedback,
        rating: rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer recorded successfully");

        // Clear answer after 5 seconds
        setTimeout(() => {
          setUserAnswer('');
        }, 15000);
      }

    } catch (err) {
      console.error("Failed to update user answer:", err);
      toast("Something went wrong while saving the answer.");
    }

    setResults([]); // Clear the interim results from STT
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <Button
        disabled={loading}
        variant="outline"
        className="my-6"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2'>
            <Mic /> Stop Recording
          </h2>
        ) : (
          <h2 className='text-primary flex gap-2 items-center'>
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
  
      <div className='w-full max-w-2xl glass-panel p-4 rounded-2xl'>
        <h3 className='text-sm text-muted-foreground mb-2'>Your Answer:</h3>
        <p className='text-base whitespace-pre-line'>
          {userAnswer || "Your recorded answer will appear here..."}
        </p>
      </div>

      {/* Note Section */}
      <p className="text-sm text-left mt-4 max-w-2xl glass-panel rounded-2xl p-4">
  <span className="text-primary font-medium mb-2">⚠️ Quick Reminder:</span><br />
  Your answer will be <span className="font-semibold text-primary">visible for 15 seconds</span> after you stop recording so you can review it.
  It will then disappear automatically.No worries — you’ll still receive the <span className="font-semibold text-primary">correct answer</span> and a <span className="font-semibold text-primary">personalized feedback</span> to help you improve in the end.
</p>

    </div>
  );
  
}

export default RecordAnswerSection;

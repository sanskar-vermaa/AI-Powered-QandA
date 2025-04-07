"use client";

import { eq } from "drizzle-orm";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState, use } from 'react';
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview(props) {
    const { interviewId } = use(props.params); // ✅ FIX: unwrap with use()

    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails(interviewId);
        }
    }, [interviewId]);

    const GetInterviewDetails = async (id) => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, id));

            if (result.length > 0) {
                const rawJson = result[0]?.jsonMockResp;
                const jsonMockResp = rawJson ? JSON.parse(rawJson) : {};

                const questionsArray = Array.isArray(jsonMockResp)
                    ? jsonMockResp
                    : jsonMockResp?.interviewQuestions || [];

                setMockInterviewQuestion(questionsArray);
                setInterviewData(result[0]);
            } else {
                setMockInterviewQuestion([]);
            }
        } catch (error) {
            console.error("Error fetching interview data:", error);
            setMockInterviewQuestion([]);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />

                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>

            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Button</Button>}
                {activeQuestionIndex !== mockInterviewQuestion?.length - 1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&
                    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                        <Button>End Interview</Button>
                    </Link>
                }
            </div>
        </div>
    );
}

export default StartInterview;

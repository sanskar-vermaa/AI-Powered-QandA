"use client";

import { eq } from "drizzle-orm";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState, use } from 'react';
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
    const { interviewId } = use(params); // ✅ Unwrapping the params promise

    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails(interviewId);
        }
    }, [interviewId]);

    const GetInterviewDetails = async (id) => {
        try {
            // console.log("Fetching interview details for ID:", id);
    
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, id));
    
            // console.log("Database Query Result:", result);
    
            if (result.length > 0) {
                const rawJson = result[0]?.jsonMockResp;
                // console.log("Raw JSON from DB:", rawJson);
    
                const jsonMockResp = rawJson ? JSON.parse(rawJson) : {};
                console.log("Parsed JSON Response:", jsonMockResp);
    
                const questionsArray = jsonMockResp.interviewQuestions || [];
                // console.log("Extracted Interview Questions:", questionsArray);
    
                setMockInterviewQuestion(Array.isArray(questionsArray) ? questionsArray : []);
                setInterviewData(result[0]);
            } else {
                console.error("No interview data found for ID:", id);
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
                        {/* Questions */}
                        <QuestionsSection 
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        />

                        {/* Video/ Audio Recording */}
                        <RecordAnswerSection 
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                          />
                 </div>

                 <div className='flex justify-end gap-6'>
                    {activeQuestionIndex>0&&
                    <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Button</Button>}
                    {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
                    <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                    {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
                    <Link  href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                        <Button>End Interview</Button>
                    </Link>
                    } 
                 </div>
        </div>
      
    );
}

export default StartInterview;

"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { UserAnswer } from '@/utils/schema'
import { Mic } from "lucide-react";

function Interview({ params }) {
    const [interviewId, setInterviewId] = useState(null);
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        async function fetchParams() {
            if (params instanceof Promise) {
                const resolvedParams = await params;
                setInterviewId(resolvedParams.interviewId);
                GetInterviewDetails(resolvedParams.interviewId);
            } else {
                setInterviewId(params.interviewId);
                GetInterviewDetails(params.interviewId);
            }
        }
        fetchParams();
    }, [params]);  // Depend on params

    /**
     * Used to get interview details by MockId/Interview id
     */
    const GetInterviewDetails = async (id) => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, id));

            if (result.length > 0) {
                setInterviewData(result[0]); // Ensure we only set interviewData when available
            } else {
                console.error("No interview data found");
            }
        } catch (error) {
            console.error("Error fetching interview data:", error);
        }
    };

    return (
        <div className="my-10 px-6">
            <h2 className="font-bold text-3xl text-primary glow-text">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    {interviewData ? (
                        <>
                            <div className="tilt-card">
                                <div className="tilt-card-inner glass-panel flex flex-col p-5 rounded-4xl gap-5">
                                    <h2 className="text-lg">
                                        <strong> Subject Name:</strong> {interviewData.jobPosition}
                                    </h2>
                                    <h2 className="text-lg">
                                        <strong> Subject related Topics :</strong> {interviewData.jobDesc}
                                    </h2>
                                    <h2 className="text-lg">
                                        <strong> Difficulty level of questions :</strong> {interviewData.jobExperience}
                                    </h2>
                                </div>
                            </div>
                            <div className="glass-panel p-5 rounded-4xl border-primary/40">
                                <h2 className="flex gap-2 items-center text-primary">
                                    <Lightbulb /> <strong>Information</strong>
                                </h2>
                                <h2 className="mt-3 text-muted-foreground">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                            </div>
                        </>
                    ) : (
                        <p className="text-muted-foreground">Loading Q&A details...</p>
                    )}
                </div>
                <div>
                
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                    ) : (
                        <>
                           <Mic className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            
                            <Button variant="ghost" className="w-full rounded-4xl" onClick={() => setWebCamEnabled(true)}>
                                Enable Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Render the Link only if interviewId is available */}
            {interviewId && (
                <div className="flex justify-end items-end mt-8">
                    <Link href={`/dashboard/interview/${interviewId}/start`}>
                        <Button className="rounded-4xl">Start Q&A</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Interview;

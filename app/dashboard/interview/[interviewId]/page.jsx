"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

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
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    {interviewData ? (
                        <>
                            <div className="flex flex-col p-5 rounded-lg border gap-5">
                                <h2 className="text-lg">
                                    <strong> Job Role/Job Position:</strong> {interviewData.jobPosition}
                                </h2>
                                <h2 className="text-lg">
                                    <strong> Job Description/Tech Stack :</strong> {interviewData.jobDesc}
                                </h2>
                                <h2 className="text-lg">
                                    <strong> Years of Experience :</strong> {interviewData.jobExperience}
                                </h2>
                            </div>
                            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                                <h2 className="flex gap-2 items-center text-yellow-500">
                                    <Lightbulb /> <strong>Information</strong>
                                </h2>
                                <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                            </div>
                        </>
                    ) : (
                        <p>Loading interview details...</p>
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
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Render the Link only if interviewId is available */}
            {interviewId && (
                <div className="flex justify-end items-end">
                    <Link href={`/dashboard/interview/${interviewId}/start`}>
                        <Button>Start Interview</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Interview;

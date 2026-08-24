"use client" 
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { parseMockInterviewResponse } from '@/lib/parseAiResponse'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const InputPrompt = `Subject Name: ${jobPosition}, Subject related Topics: ${jobDesc}, Difficulty level of questions: ${jobExperience}, Depends on Subject Name, Subject related Topics & Difficulty level of questions give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions along with answers in JSON format, Give us questions and answers field on JSON`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const structuredJson = parseMockInterviewResponse(result.response.text());

            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: JSON.stringify(structuredJson),
                jobPosition,
                jobDesc,
                jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            }).returning({ mockId: MockInterview.mockId });

            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId);
            }
        } catch (error) {
            console.error("Error during AI generation or DB insert:", error);
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-4xl bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-3xl text-center font-bold'>Start Q&A</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us what you're studying</DialogTitle>
                        <DialogDescription />
                        <form onSubmit={onSubmit}>
                            <div>
                                <h2>Pick a subject, choose some topics, set the difficulty—and we’ll create smart questions just for you!</h2>
                                <div className='mt-7 my-3'>
                                    <label>Subject Name</label>
                                    <Input placeholder="Ex.History, Computer, DSA" required
                                        onChange={(e) => setJobPosition(e.target.value)}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Subject related Topics</label>
                                    <Textarea placeholder="Ex.History of India, Basic I/O, Algorithms" required
                                        onChange={(e) => setJobDesc(e.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Difficulty level of questions (upto 5)</label>
                                    <Input placeholder="Ex.1" type="number" max="5" required
                                        onChange={(e) => setJobExperience(e.target.value)} />
                                </div>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ?
                                        <>
                                            <LoaderCircle className='animate-spin' /> Generating from AI
                                        </>
                                        : 'Start Q&A'}
                                </Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview

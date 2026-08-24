"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



function Feedback({params}) {

  const [feedbackList,setFeedbackList]=useState([]);
  const router=useRouter();
  useEffect(()=>{
    GetFeedback();
  },[])
  const GetFeedback=async()=>{
      const result=await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef,params.interviewId))
      .orderBy(UserAnswer.id);
      console.log(result);
      setFeedbackList(result);
  }
  return (
    <div className='p-10'>

      {feedbackList?.length==0?
      <h2 className='font-bold text-xl text-muted-foreground'>No Q&A Feedback Record Found</h2>
        :

      <>
       <h2 className='text-3xl font-bold text-primary glow-text'>Congratulation!</h2>
       <h2 className='font-bold text-2xl'>Here is your Q&A feedback</h2>

      <h2 className='text-sm text-muted-foreground'>Find below Q&A question with correct answer, Your answer and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(

      <Collapsible key={index} className="mt-7 tilt-card">
      <div className="tilt-card-inner glass-panel rounded-2xl overflow-hidden">
      <CollapsibleTrigger className='p-3 flex justify-between text-left gap-7 w-full'>

      {item.question} <ChevronsUpDown className='h-5 w-5'/>

      </CollapsibleTrigger>
      <CollapsibleContent>
       <div className='flex flex-col gap-2 p-3 pt-0'>
        <h2 className='p-2 rounded-lg bg-destructive/10 text-sm text-foreground'><strong>Your Answer: </strong>{item.userAns}</h2>
        <h2 className='p-2 rounded-lg bg-primary/10 text-sm text-foreground'><strong>Correct Answer: </strong>{item.correctAns}</h2>
        <h2 className='p-2 rounded-lg bg-accent/10 text-sm text-foreground'><strong>Feedback: </strong>{item.feedback}</h2>
       </div>
      </CollapsibleContent>
      </div>
      </Collapsible>

      ))}
      </>}

      <Button className="mt-8 rounded-4xl" onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
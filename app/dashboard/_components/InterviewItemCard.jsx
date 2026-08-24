import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {

    const router=useRouter();
    const onStart=()=>{
            router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }


  return (
    <div className='tilt-card'>
      <div className='tilt-card-inner glass-panel rounded-2xl p-4'>
        <h2 className='font-bold text-primary glow-text'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-muted-foreground'>Difficulty level of questions: {interview?.jobExperience}  </h2>
        <h2 className='text-xs text-muted-foreground'>Created At: {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>

            <Button size="sm" variant="outline" className="w-30 rounded-4xl"
            onClick={onFeedbackPress}
            >Feedback</Button>
            <Button size="sm" className="w-30 rounded-4xl"
            onClick={onStart}
            >Retry</Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
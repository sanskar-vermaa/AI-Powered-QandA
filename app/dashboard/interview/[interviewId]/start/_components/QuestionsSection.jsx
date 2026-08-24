import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'

function QuestionsSection({ mockInterviewQuestion,activeQuestionIndex}) {

  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry, Your browser does not support text to speech')
    }
  }
  return mockInterviewQuestion&&(
    <div className='glass-panel p-5 rounded-2xl my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                <h2 className={`p-2 bg-secondary rounded-full text-sm
                md:text-sm text-center cursor-pointer transition-all
                ${activeQuestionIndex==index&&'bg-primary text-primary-foreground glow-text'}`} key={index}>Question #{index + 1}</h2>
            ))}

        </div>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2 className='cursor-pointer text-primary' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
            <div className='glass-panel rounded-2xl p-5 mt-20'>
              <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb/>
                <strong>Note:</strong>
              </h2>
              <h2 className='text-sm text-muted-foreground my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
    </div>
  );
}

export default QuestionsSection;

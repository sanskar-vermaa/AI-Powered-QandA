// import Page from "./(auth)/sign-in/[[...sign-in]]/page";

"use client";


import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router=useRouter();
  return (
   <div className=''>
        <div className='mt-15 text-center'>
              {/* <div className="p-4 border border-gray-300 rounded-lg shadow-md  text-5xl text-white bg-black w-fit">
                    Welcome To
              </div> */}
              <div className=' flex justify-center items-center'>

                <h2 className='p-4 border border-gray-300 rounded-lg   text-5xl text-white bg-black w-fit'>
                  Welcome To
                </h2>
            
              </div>
              
                <div className="mt-8 flex justify-center items-center">
                     <Image src={'/logo-1.svg'} width={180} height={120} alt='logo'/>
                </div>
            {/* <h2 className='text-5xl mt-5 font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl'> Δ Delta</h2> */}
        </div>

        <div className='text-center'>
           
           <h2 className='mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>Enhance Your Interview Skills Through AI Powered Mock Interviews</h2>
          
            
        </div>

        <div className='mt-10 text-center'>
          <h2 className='text-xl text-gray-400'>Click Below To</h2>
        <Button className=" mt-7 text-2xl" onClick={()=>router.replace('/dashboard')}>Start Your Journey</Button>
      
        </div>

   </div>
  );
}

"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LightBulbIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { Facebook, Github, Youtube, Instagram, Twitter } from 'lucide-react'



export default function HomePage() {
  const router = useRouter();

  return (
    <div className="">
      <div className="mt-15 text-center">
        <div className="flex justify-center items-center">
          <h2 className="p-4 border border-gray-300 rounded-4xl text-5xl text-white bg-black w-fit">
            Welcome To
          </h2>
        </div>

        <div className="mt-8 flex justify-center items-center">
          <Image src={"/logo-1.svg"} width={180} height={120} alt="logo" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Hey there, learner! <br />
          Want to test yourself in a fun, smart way? <br />
          Our AI-powered Q&A platform turns your study sessions into an interactive experience. <br />
          You just tell us what you’re learning—and we’ll take care of the rest.
        </h2>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-xl text-gray-400">Click Below To</h2>
        <Button className="mt-7 text-2xl rounded-4xl" onClick={() => router.replace('/dashboard')}>
          Start Your Journey
        </Button>
      </div>

      <section className="bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 border-2 pb-8 ">
    <div className="mx-auto mt- max-w-2xl lg:text-center">
      <div className='flex justify-center items-center'>
  <h2 className="text-3xl  font-semibold w-fit p-4 text-white bg-black mt-8 mb-10">About Delta Δ</h2>

      </div>
     
      <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ">
        Smarter Learning with AI-Powered Questions
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Delta Δ is your intelligent companion to test and strengthen your knowledge with dynamic, customized question sets.
      </p>
    </div>

    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#98fb98]">
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            Personalized Practice
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Choose your subject, topic, and difficulty to generate a set of 5 AI-curated questions tailored to your learning goals.
          </dd>
        </div>

        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#98fb98]">
              <LightBulbIcon className="h-6 w-6 text-black " aria-hidden="true" />
            </div>
            Smart Feedback
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Instantly compare your answers with the correct ones. Improve with structured insights and corrections.
          </dd>
        </div>

        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#98fb98]">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            DeltaBot 🤖
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Need help understanding? Our AI assistant is always available to guide you through tough concepts.
          </dd>
        </div>

        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#98fb98]">
              <CheckCircleIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            Review. Reflect. Repeat.
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            After each session, reflect on what you did right and where to improve — reinforcing your learning loop.
          </dd>
        </div>
      </dl>
    </div>
  </div>
</section>

<footer className="bg-gray-800 text-gray-300 px-6 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Brand & Socials */}
    <div>
      <h2 className='text-5xl  font-semibold w-fit p-4 text-white '>Delta Δ</h2>
      <p className="text-sm mb-4">
        Empowering curious minds with instant, intelligent answers — anytime, anywhere.
      </p>
      <div className="flex space-x-4">
        <a href="#" aria-label="Facebook" className="hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991..."
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064..."
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a href="#" aria-label="GitHub" className="hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425..."
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>

    {/* Links - Solutions / Support */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-white font-semibold mb-2">Solutions</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white">Marketing</a></li>
          <li><a href="#" className="hover:text-white">Analytics</a></li>
          <li><a href="#" className="hover:text-white">Automation</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white">Docs</a></li>
          <li><a href="#" className="hover:text-white">Guides</a></li>
          <li><a href="#" className="hover:text-white">Submit Ticket</a></li>
        </ul>
      </div>
    </div>

    {/* Links - Company / Legal */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-white font-semibold mb-2">Company</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white">About</a></li>
          <li><a href="#" className="hover:text-white">Blog</a></li>
          <li><a href="#" className="hover:text-white">Jobs</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-2">Legal</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white">Terms</a></li>
          <li><a href="#" className="hover:text-white">Privacy</a></li>
          <li><a href="#" className="hover:text-white">License</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="mt-10 text-center text-sm text-gray-500">
    © 2025 Delta, Inc. All rights reserved.
  </div>
</footer>


    </div>
  );
}

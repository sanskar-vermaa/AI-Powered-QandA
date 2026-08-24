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
      <div className="mt-15 text-center px-4">
        <div className="tilt-card inline-block">
          <div className="tilt-card-inner glass-panel rounded-4xl px-8 py-4">
            <h2 className="text-5xl text-primary glow-text font-bold">
              Welcome To
            </h2>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center">
          <Image src={"/logo-1.svg"} width={180} height={120} alt="logo" />
        </div>
      </div>

      <div className="text-center px-4">
        <h2 className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-3xl mx-auto">
          Hey there, learner! <br />
          Want to test yourself in a fun, smart way? <br />
          Our AI-powered Q&A platform turns your study sessions into an interactive experience. <br />
          You just tell us what you’re learning—and we’ll take care of the rest.
        </h2>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-xl text-muted-foreground">Click Below To</h2>
        <Button className="mt-7 text-2xl rounded-4xl shadow-[0_0_40px_-8px_var(--primary)]" onClick={() => router.replace('/dashboard')}>
          Start Your Journey
        </Button>
      </div>

      <section className="py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8 ">
    <div className="mx-auto mt- max-w-2xl lg:text-center">
      <div className='flex justify-center items-center'>
        <div className="tilt-card inline-block">
          <h2 className="tilt-card-inner text-3xl font-semibold w-fit px-6 py-3 glass-panel rounded-2xl mt-8 mb-10 text-primary glow-text">About Delta Δ</h2>
        </div>
      </div>

      <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl ">
        Smarter Learning with AI-Powered Questions
      </p>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Delta Δ is your intelligent companion to test and strengthen your knowledge with dynamic, customized question sets.
      </p>
    </div>

    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2">
        {[
          {
            icon: AdjustmentsHorizontalIcon,
            title: "Personalized Practice",
            desc: "Choose your subject, topic, and difficulty to generate a set of 5 AI-curated questions tailored to your learning goals.",
          },
          {
            icon: LightBulbIcon,
            title: "Smart Feedback",
            desc: "Instantly compare your answers with the correct ones. Improve with structured insights and corrections.",
          },
          {
            icon: ChatBubbleOvalLeftEllipsisIcon,
            title: "DeltaBot 🤖",
            desc: "Need help understanding? Our AI assistant is always available to guide you through tough concepts.",
          },
          {
            icon: CheckCircleIcon,
            title: "Review. Reflect. Repeat.",
            desc: "After each session, reflect on what you did right and where to improve — reinforcing your learning loop.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="tilt-card">
            <div className="tilt-card-inner glass-panel rounded-2xl p-6 pl-20 relative h-full">
              <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <dt className="text-base font-semibold leading-7 text-foreground">
                {title}
              </dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">
                {desc}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  </div>
</section>

<footer className="glass-panel text-muted-foreground px-6 py-10 mx-4 mb-4 rounded-3xl">
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

  <div className="mt-10 text-center text-sm text-muted-foreground">
    © {new Date().getFullYear()} Delta, Inc. All rights reserved.
  </div>
</footer>


    </div>
  );
}

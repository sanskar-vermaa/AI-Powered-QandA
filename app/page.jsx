import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import {
  LightBulbIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'



export default function HomePage() {
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
        <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-3xl mx-auto">
          Hey there, learner! <br />
          Want to test yourself in a fun, smart way? <br />
          Our AI-powered Q&A platform turns your study sessions into an interactive experience. <br />
          You just tell us what you’re learning—and we’ll take care of the rest.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-xl text-muted-foreground">Click Below To</h2>
        <Button asChild className="mt-7 text-2xl rounded-4xl shadow-[0_0_40px_-8px_var(--primary)]">
          <Link href="/dashboard">Start Your Journey</Link>
        </Button>
      </div>

      <section id="how-it-works" className="py-24 sm:py-32">
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
            desc: "Choose your subject, topic, and difficulty to generate a set of AI-curated questions tailored to your learning goals.",
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
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
    <div>
      <p className="text-3xl font-semibold text-foreground">Delta Δ</p>
      <p className="text-sm mt-2">Practice out loud, get instant AI feedback, and improve with every session.</p>
    </div>
    <nav aria-label="Footer" className="flex gap-6 text-sm">
      <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
      <Link href="/upgrade" className="hover:text-foreground">Pricing</Link>
      <Link href="/sign-in" className="hover:text-foreground">Sign in</Link>
    </nav>
  </div>
  <div className="mt-8 text-center text-sm">© {new Date().getFullYear()} Delta. All rights reserved.</div>
</footer>


    </div>
  );
}

import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'Perfect for trying Delta Δ out.',
    features: [
      '5 AI-generated question sets / month',
      'Voice-based answers',
      'Basic feedback on each answer',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9/mo',
    tagline: 'For learners who study every day.',
    features: [
      'Unlimited AI-generated question sets',
      'Voice-based answers',
      'Detailed, structured feedback',
      'Full interview history & performance tracking',
      'Priority DeltaBot support',
    ],
    highlight: true,
  },
]

function Upgrade() {
  return (
    <div className='px-6 py-16 max-w-5xl mx-auto'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold text-primary glow-text'>Upgrade your plan</h2>
        <p className='mt-3 text-muted-foreground'>Pick the plan that matches how often you practice.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {plans.map((plan) => (
          <div key={plan.name} className='tilt-card'>
            <div
              className={`tilt-card-inner glass-panel rounded-3xl p-8 h-full flex flex-col ${
                plan.highlight ? 'ring-2 ring-primary' : ''
              }`}
            >
              <h3 className='text-2xl font-semibold text-foreground'>{plan.name}</h3>
              <p className='mt-1 text-3xl font-bold text-primary'>{plan.price}</p>
              <p className='mt-2 text-sm text-muted-foreground'>{plan.tagline}</p>

              <ul className='mt-6 space-y-3 flex-1'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-2 text-sm text-foreground'>
                    <CheckCircleIcon className='h-5 w-5 text-primary shrink-0' />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className='mt-8 rounded-4xl' variant={plan.highlight ? 'default' : 'outline'}>
                {plan.highlight ? 'Upgrade to Pro' : 'Current Plan'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Upgrade

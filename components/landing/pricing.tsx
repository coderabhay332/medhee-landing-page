'use client'

import { Check, Sparkles } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { useWaitlist } from './waitlist-modal'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    highlighted: false,
    features: [
      'Health profile',
      'Medication tracking',
      'Report storage',
      'Drug safety checks',
    ],
  },
  {
    name: 'Pro',
    price: '₹199',
    period: '/month',
    highlighted: true,
    features: [
      'Everything in Free',
      'AI triage',
      'Unlimited report intelligence',
      'Personalized diet guidance',
      'Priority support',
    ],
  },
  {
    name: 'Pro + Doctor',
    price: '₹499',
    period: '/month',
    highlighted: false,
    features: [
      'Everything in Pro',
      'On-call doctor consultations (Up to 3/mo)',
      'Full context sharing with doctors',
      'Dedicated care coordination',
    ],
  },
]

export function Pricing() {
  const waitlist = useWaitlist()

  return (
    <section id="pricing" className="border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pricing
            </p>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Coming soon
            </span>
          </div>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Simple plans. No hidden fees.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" gap={0.12}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 shadow-[0_8px_30px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] ${
                  plan.highlighted
                    ? 'border-primary bg-background'
                    : 'border-border bg-background'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    <Sparkles className="mr-1 inline-block h-3 w-3" />
                    Most popular
                  </span>
                )}
                <p className="text-lg font-semibold tracking-tight">{plan.name}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={waitlist.open}
                  className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'border border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  Join waitlist
                </button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include end-to-end encryption and DPDP compliance.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

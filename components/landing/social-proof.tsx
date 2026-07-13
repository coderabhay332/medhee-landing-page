'use client'

import { Users, Stethoscope, ShieldCheck, Check } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from './reveal'

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'People on the waitlist',
    icon: Users,
  },
  {
    value: 10,
    suffix: '+',
    label: 'Verified doctors onboarding',
    icon: Stethoscope,
  },
  {
    value: 3,
    suffix: '',
    label: 'AI safety layers',
    icon: ShieldCheck,
  },
]

const testimonials = [
  {
    quote:
      'I finally feel like someone is watching out for my medications. The interaction warnings alone saved me from a dangerous prescription overlap.',
    name: 'Priya M.',
    tag: 'Beta Tester',
  },
  {
    quote:
      'As someone managing both diabetes and hypertension, having my complete medical history organized and analyzed by a model that actually understands it is a complete game changer.',
    name: 'Ramesh K.',
    tag: 'Early Access',
  },
  {
    quote:
      'My mother takes six different pills every single day. Medhee flagged an interaction that a busy clinic pharmacist missed. We trust it completely.',
    name: 'Anika S.',
    tag: 'Beta Tester',
  },
]

export function SocialProof() {
  return (
    <section id="social-proof" className="py-24 md:py-32 bg-background border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Growing every day
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Trusted by early believers in safer healthcare.
          </h2>
        </Reveal>

        {/* Stats Strip */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-[0_8px_30px_rgba(17,17,17,0.02)]">
            <div className="grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-border">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className={`flex flex-col items-center text-center ${i > 0 ? 'sm:pl-8' : ''}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Testimonials */}
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" gap={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-[0_8px_30px_rgba(17,17,17,0.02)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_12px_40px_rgba(14,107,82,0.04)]">
                <div className="flex-1">
                  <p className="font-display text-lg italic leading-relaxed text-foreground/80" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-xs font-semibold text-primary">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.tag}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-primary/6 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-primary">
                    <Check className="h-3 w-3 stroke-[3]" /> Verified
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

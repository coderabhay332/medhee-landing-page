'use client'

import { Reveal, Stagger, StaggerItem } from './reveal'

const team = [
  {
    name: 'Arjun Venkatesh',
    role: 'Founder & CEO',
    bio: 'Ex-product engineer at Razorpay. Obsessed with making healthcare accessible through technology.',
    initials: 'AV',
    color: 'bg-primary/15 text-primary',
  },
  {
    name: 'Sneha Iyer',
    role: 'CTO',
    bio: 'ML researcher turned builder. Previously at Wadhwani AI working on public health models.',
    initials: 'SI',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Dr. Kavitha Rao',
    role: 'Medical Advisor',
    bio: 'Practicing internist with 15 years in clinical medicine. Ensures Medhee never oversteps.',
    initials: 'KR',
    color: 'bg-sky-100 text-sky-700',
  },
]

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The team
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Built by people who care about healthcare.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" gap={0.12}>
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-[0_8px_30px_rgba(17,17,17,0.04)]">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold ${member.color}`}
                >
                  {member.initials}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

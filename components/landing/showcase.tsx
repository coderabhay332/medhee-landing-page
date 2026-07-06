'use client'

import { Reveal, Stagger, StaggerItem } from './reveal'
import Image from 'next/image'

const screens = [
  {
    title: 'Home Dashboard',
    desc: 'Your active conditions, current medications, and allergies in one clean, unified view.',
    src: '/dashboard.png',
  },
  {
    title: 'AI Triage Assistant',
    desc: 'Describe symptoms in natural language and receive an instant, personalized risk assessment.',
    src: '/chat.png',
  },
  {
    title: 'Drug Safety Checker',
    desc: 'Scan or search any medicine to verify there are no conflicts with your profile.',
    src: '/safety.png',
  },
]

export function AppShowcase() {
  return (
    <section id="showcase" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            App Screenshots
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            See Medhee in action.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A look inside the personal health operating system designed for your phone.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" gap={0.15}>
          {screens.map((screen) => (
            <StaggerItem key={screen.title}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-[0_8px_30px_rgba(17,17,17,0.03)] hover:shadow-[0_12px_40px_rgba(17,17,17,0.06)] transition-all duration-300">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-w-768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="mt-5 px-2 pb-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {screen.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {screen.desc}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

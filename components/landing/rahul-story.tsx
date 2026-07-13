'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './reveal'

type Frame = {
  step: string
  title: string
  body: string
  card: React.ReactNode
}

function MiniCard({
  label,
  children,
  tone = 'default',
}: {
  label: string
  children: React.ReactNode
  tone?: 'default' | 'warning' | 'success'
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        tone === 'warning'
          ? 'border-warning/30 bg-warning/5'
          : tone === 'success'
            ? 'border-primary/25 bg-accent'
            : 'border-border bg-card'
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium leading-snug">{children}</div>
    </div>
  )
}

const frames: Frame[] = [
  {
    step: '01',
    title: 'Rahul wakes up feeling sick.',
    body: 'No panic. No Googling symptoms at 6am. He just opens Medhee.',
    card: (
      <div className="space-y-2.5">
        <MiniCard label="6:14 AM">
          <span className="text-muted-foreground">Rahul opens Medhee</span>
        </MiniCard>
        <MiniCard label="Feeling">Nauseous · vomiting since morning</MiniCard>
      </div>
    ),
  },
  {
    step: '02',
    title: 'Medhee already knows him.',
    body: 'His conditions, medications, allergies, and reports are already there. Nothing to repeat.',
    card: (
      <div className="grid grid-cols-2 gap-2.5">
        <MiniCard label="Condition">Type 2 Diabetes</MiniCard>
        <MiniCard label="Medication">Metformin 500mg</MiniCard>
        <MiniCard label="Allergy" tone="warning">
          Penicillin
        </MiniCard>
        <MiniCard label="Last report">HbA1c 6.8%</MiniCard>
      </div>
    ),
  },
  {
    step: '03',
    title: '"I’ve been vomiting."',
    body: 'One sentence is enough. The AI reads it with his full history behind it.',
    card: (
      <div className="space-y-2.5">
        <div className="ml-10 rounded-2xl rounded-br-md bg-foreground px-4 py-3">
          <p className="text-sm text-background">{"I've been vomiting."}</p>
        </div>
        <MiniCard label="Analysing">
          <span className="text-muted-foreground">
            History · Medication · Diet · Reports · Allergy · Symptoms
          </span>
        </MiniCard>
      </div>
    ),
  },
  {
    step: '04',
    title: 'The risk is moderate.',
    body: 'Vomiting on Metformin can matter. Medhee knows when AI help is not enough.',
    card: (
      <div className="space-y-2.5">
        <MiniCard label="AI assessment" tone="warning">
          Moderate risk · Doctor recommended
        </MiniCard>
        <MiniCard label="Why">
          <span className="text-muted-foreground">
            Persistent vomiting + Metformin raises dehydration risk
          </span>
        </MiniCard>
      </div>
    ),
  },
  {
    step: '05',
    title: 'A doctor joins. Fully briefed.',
    body: 'Dr. Mehta receives Rahul’s complete health profile before saying hello.',
    card: (
      <div className="space-y-2.5">
        <MiniCard label="Consultation" tone="success">
          Dr. Mehta · General Physician
        </MiniCard>
        <MiniCard label="Shared context">
          <span className="text-muted-foreground">
            Full profile · AI assessment · timeline
          </span>
        </MiniCard>
      </div>
    ),
  },
  {
    step: '06',
    title: 'The prescription updates his profile.',
    body: 'Automatically. The next time Rahul needs help, Medhee remembers this too.',
    card: (
      <div className="space-y-2.5">
        <MiniCard label="New prescription" tone="success">
          Ondansetron 4mg · 3 days
        </MiniCard>
        <MiniCard label="Health memory">
          <span className="text-muted-foreground">Profile updated · Feb 12</span>
        </MiniCard>
      </div>
    ),
  },
]

export function RahulStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  
  // Set end slide limit based on screen width/responsive design
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%'])

  return (
    <section id="story" ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-background">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              A morning with Medhee
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Meet Rahul.
            </h2>
          </Reveal>
        </div>

        <motion.div style={{ x }} className="mt-14 flex gap-6 pl-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {frames.map((frame) => {
            // Border accent color based on step phase
            const borderCol =
              frame.step === '04'
                ? 'border-t-warning'
                : frame.step === '05' || frame.step === '06'
                  ? 'border-t-primary'
                  : 'border-t-foreground/40'

            return (
              <article
                key={frame.step}
                className={`flex w-[320px] shrink-0 flex-col rounded-2xl border-t-2 border-x border-b border-border bg-card p-6 shadow-[0_8px_30px_rgba(17,17,17,0.03)] md:w-[380px] ${borderCol}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{frame.step}</span>
                  {frame.step === '04' && (
                    <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
                      Alert
                    </span>
                  )}
                  {(frame.step === '05' || frame.step === '06') && (
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Resolved
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-foreground">
                  {frame.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {frame.body}
                </p>
                <div className="mt-6">{frame.card}</div>
              </article>
            )
          })}
        </motion.div>

        {/* Progress tracker */}
        <div className="mx-auto mt-12 flex w-full max-w-[280px] items-center justify-between gap-4 px-6">
          <span className="text-[10px] font-mono text-muted-foreground/60">01</span>
          <div className="relative h-1 w-full rounded-full bg-border/60">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{
                width: useTransform(scrollYProgress, [0, 1], ['16.6%', '100%']),
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/60">06</span>
        </div>

        {/* Animated Mouse Scroll Hint */}
        <div className="mt-8 flex flex-col items-center justify-center gap-1.5 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
          <span>Keep scrolling</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-5 w-3.5 items-start justify-center rounded-full border border-muted-foreground/30 py-1"
          >
            <span className="h-1.5 w-0.5 rounded-full bg-primary animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { easeCalm } from './reveal'

type ContextCard = {
  label: string
  value: string
  caption: string
  tone?: 'default' | 'warning' | 'success'
  position: string
  delay: number
  floatDuration: number
}

const cards: ContextCard[] = [
  {
    label: 'Medication',
    value: 'Metformin 500mg',
    caption: 'Twice daily · active',
    position: 'left-0 top-[6%]',
    delay: 0.5,
    floatDuration: 6,
  },
  {
    label: 'Allergy',
    value: 'Penicillin',
    caption: 'Severe · verified',
    tone: 'warning',
    position: 'right-0 top-[4%]',
    delay: 0.65,
    floatDuration: 7,
  },
  {
    label: 'Blood Report',
    value: 'HbA1c 6.8%',
    caption: 'Updated 12 days ago',
    position: 'left-0 top-[42%]',
    delay: 0.8,
    floatDuration: 6.5,
  },
  {
    label: 'Chronic Disease',
    value: 'Type 2 Diabetes',
    caption: 'Managed since 2021',
    position: 'right-0 top-[38%]',
    delay: 0.95,
    floatDuration: 7.5,
  },
  {
    label: 'Diet',
    value: 'Low glycemic',
    caption: 'Logged this week',
    position: 'left-0 bottom-[8%]',
    delay: 1.1,
    floatDuration: 6.8,
  },
  {
    label: 'Symptoms',
    value: '"Vomiting since morning"',
    caption: 'Reported just now',
    tone: 'success',
    position: 'right-0 bottom-[8%]',
    delay: 1.25,
    floatDuration: 7.2,
  },
]

function FloatingCard({ card }: { card: ContextCard }) {
  return (
    <motion.div
      className={`absolute z-40 ${card.position} hidden w-36 lg:block`}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: card.delay, ease: easeCalm }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: card.floatDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        className="rounded-xl border border-border bg-card p-3.5 shadow-[0_8px_30px_rgba(17,17,17,0.06)]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {card.label}
        </p>
        <p
          className={`mt-1 text-sm font-semibold leading-snug ${
            card.tone === 'warning'
              ? 'text-warning'
              : card.tone === 'success'
                ? 'text-primary'
                : 'text-foreground'
          }`}
        >
          {card.value}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{card.caption}</p>
      </motion.div>
    </motion.div>
  )
}

function ConvergenceLines() {
  // Lines from each card region toward the phone center
  const paths = [
    'M 60 70 C 160 90, 220 180, 280 260',
    'M 500 60 C 420 100, 360 180, 300 260',
    'M 40 300 C 140 300, 220 290, 275 285',
    'M 520 280 C 430 285, 360 285, 305 285',
    'M 80 480 C 170 440, 230 360, 280 310',
    'M 490 460 C 410 420, 350 350, 300 310',
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 560"
      className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
      fill="none"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#0e6b52"
          strokeOpacity={0.25}
          strokeWidth={1.5}
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  )
}

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: easeCalm }}
      className="relative z-30 mx-auto w-[250px]"
    >
      <div className="rounded-[2.6rem] border border-border bg-foreground p-2 shadow-[0_24px_80px_rgba(17,17,17,0.18)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-background">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3">
            <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
            <span className="h-4 w-16 rounded-full bg-foreground" aria-hidden="true" />
            <span className="text-[10px] font-medium text-muted-foreground">100%</span>
          </div>

          <div className="space-y-3 px-4 pb-6 pt-3">
            {/* Greeting */}
            <div>
              <p className="text-[11px] text-muted-foreground">Good morning, Rahul</p>
              <p className="text-sm font-semibold">How are you feeling?</p>
            </div>

            {/* User message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6, ease: easeCalm }}
              className="ml-8 rounded-2xl rounded-br-md bg-foreground px-3.5 py-2.5"
            >
              <p className="text-xs leading-relaxed text-background">
                {"I've been vomiting since this morning."}
              </p>
            </motion.div>

            {/* AI core analysing */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.6, ease: easeCalm }}
              className="rounded-2xl border border-border bg-card p-3.5"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  aria-hidden="true"
                  className="block h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Reviewing your context
                </p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {['History', 'Metformin', 'Allergy', 'HbA1c', 'Diet'].map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.2 + i * 0.15, duration: 0.4 }}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Assessment result */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 0.7, ease: easeCalm }}
              className="rounded-2xl border border-warning/30 bg-warning/5 p-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-warning">
                Moderate risk
              </p>
              <p className="mt-1 text-xs font-semibold text-foreground">
                Doctor recommended
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Given your diabetes and current medication, a doctor should take a look.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.9, duration: 0.5 }}
                className="mt-2.5 rounded-full bg-primary px-3 py-2 text-center text-[11px] font-semibold text-primary-foreground"
              >
                Connect to Dr. Mehta · context shared
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative pb-24 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCalm }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Personal Health Operating System
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeCalm }}
            className="mt-5 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Healthcare that remembers you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: easeCalm }}
            className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Medhee remembers your medications, allergies, reports and history — so
            every health decision starts with context, not questions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easeCalm }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              id="hero-btn-download"
              href="#download"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Download Medhee
            </a>
            <a
              id="hero-btn-story"
              href="#story"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto h-[560px] w-full max-w-[540px]">
          <ConvergenceLines />
          {cards.map((card) => (
            <FloatingCard key={card.label} card={card} />
          ))}
          <div className="flex h-full items-center justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { easeCalm } from './reveal'

const risks = [
  {
    level: 'Low risk',
    action: 'AI helps',
    desc: 'Safe guidance grounded in your history — hydration, monitoring, when to check back.',
    dot: 'bg-success',
    ring: 'border-border',
  },
  {
    level: 'Moderate risk',
    action: 'Doctor recommended',
    desc: 'Medhee suggests a consultation and prepares your full context in advance.',
    dot: 'bg-warning',
    ring: 'border-warning/40',
  },
  {
    level: 'High risk',
    action: 'Immediate consultation',
    desc: 'A verified doctor is connected instantly, with your complete profile already shared.',
    dot: 'bg-danger',
    ring: 'border-danger/40',
  },
]

const trust = [
  {
    title: 'End-to-end encryption',
    desc: 'Your health data is encrypted in transit and at rest.',
  },
  {
    title: 'Privacy by default',
    desc: 'Your data is never sold. You control what is shared, always.',
  },
  {
    title: 'Verified doctors',
    desc: 'Every doctor on Medhee is licensed and identity-verified.',
  },
  {
    title: 'DPDP compliant',
    desc: 'Built to meet the Digital Personal Data Protection Act.',
  },
  {
    title: 'Medical AI safeguards',
    desc: 'The AI defers to doctors whenever risk is uncertain.',
  },
]

export function RiskLevels() {
  return (
    <section className="border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            AI knows its limits
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Medhee never replaces doctors. It prepares them.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" gap={0.15}>
          {risks.map((risk) => (
            <StaggerItem key={risk.level}>
              <article
                className={`flex h-full flex-col rounded-2xl border bg-background p-7 ${risk.ring}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 w-2.5 rounded-full ${risk.dot}`}
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {risk.level}
                  </p>
                </div>
                <p className="mt-4 text-xl font-semibold tracking-tight">
                  {risk.action}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {risk.desc}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const headlineLines = ['Your health.', 'Your data.', 'Your rules.']

function MaskedHeadline() {
  return (
    <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
      <span className="sr-only">Your health. Your data. Your rules.</span>
      {headlineLines.map((line, i) => (
        <span key={line} aria-hidden="true" className="block overflow-hidden py-0.5">
          <motion.span
            className={`block ${i === 2 ? 'text-primary' : ''}`}
            initial={{ y: '110%', rotate: 2.5 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.14, ease: easeCalm }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

function TrustRow({
  item,
  index,
}: {
  item: { title: string; desc: string }
  index: number
}) {
  return (
    <motion.div
      className="group relative overflow-hidden border-b border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Sweeping wipe that passes across the row on entry */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/8"
        variants={{
          hidden: { x: '-101%' },
          visible: {
            x: '101%',
            transition: { duration: 1.1, delay: index * 0.1, ease: easeCalm },
          },
        }}
      />
      {/* Hover fill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-card transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      <motion.div
        className="relative grid items-center gap-2 py-6 pl-1 transition-[padding] duration-300 ease-out group-hover:pl-4 md:grid-cols-[3rem_1fr_1.2fr] md:gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5, delay: index * 0.1 + 0.25 },
          },
        }}
      >
        {/* Animated check that draws itself */}
        <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-primary/30 md:flex">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <motion.path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 0.6, delay: index * 0.1 + 0.5, ease: easeCalm },
                },
              }}
            />
          </svg>
        </span>
        <p className="text-lg font-semibold tracking-tight">{item.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function Trust() {
  return (
    <section id="trust" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Trust
            </p>
          </Reveal>
          <MaskedHeadline />
        </div>

        <div className="mt-14 border-t border-border">
          {trust.map((item, i) => (
            <TrustRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

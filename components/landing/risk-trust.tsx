'use client'

import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './reveal'
import { easeCalm } from './reveal'

const risks = [
  {
    level: 'Low risk',
    action: 'AI-Guided Support',
    desc: 'Safe, baseline guidance grounded in your medical history—hydration, sleep tracking, symptoms monitoring, and when to follow up.',
    colorClass: 'from-emerald-400 to-teal-500',
  },
  {
    level: 'Moderate risk',
    action: 'Doctor Consultation',
    desc: 'Medhee advises connection to an on-call physician and bundles your complete reports history and symptoms chronology to share automatically.',
    colorClass: 'from-amber-400 to-orange-500',
  },
  {
    level: 'High risk',
    action: 'Urgent Care Routing',
    desc: 'Bypasses autonomous triage. Flags immediate connection to a verified medical professional with instant automated priority care coordination.',
    colorClass: 'from-rose-400 to-red-500',
  },
]

const trust = [
  {
    title: 'End-to-end encryption',
    desc: 'Your private health log, history records, and physician chats are fully encrypted in transit and at rest.',
  },
  {
    title: 'Privacy by default',
    desc: 'We never sell your healthcare records. You control who views your reports and when permissions expire.',
  },
  {
    title: 'Verified doctors',
    desc: 'Every consulting physician undergoes background screening and active State Medical Council registry validation.',
  },
  {
    title: 'DPDP compliant',
    desc: 'Fully architected to meet data protection guidelines specified in the Digital Personal Data Protection Act.',
  },
  {
    title: 'Medical AI safeguards',
    desc: 'The model has strict clinical guardrails and defers triage entirely to doctors whenever symptom classification is ambiguous.',
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
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 pl-8 shadow-[0_8px_30px_rgba(17,17,17,0.02)]"
              >
                {/* 3px thick left gradient border */}
                <div 
                  aria-hidden="true"
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${risk.colorClass}`} 
                />
                
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {risk.level}
                  </p>
                </div>
                <p className="mt-4 text-xl font-semibold tracking-tight text-foreground">
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
        className="pointer-events-none absolute inset-0 bg-primary/4"
        variants={{
          hidden: { x: '-101%' },
          visible: {
            x: '101%',
            transition: { duration: 1.1, delay: index * 0.1, ease: easeCalm },
          },
        }}
      />
      {/* Hover fill in subtle primary tint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-primary/3 transition-transform duration-300 ease-out group-hover:scale-y-100"
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
        <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background md:flex">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <motion.path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
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
        <p className="text-lg font-semibold tracking-tight text-foreground">{item.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function Trust() {
  return (
    <section id="trust" className="py-24 md:py-32 bg-background">
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

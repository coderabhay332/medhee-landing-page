'use client'

import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem, easeCalm } from './reveal'

const inputs = [
  'Health Reports',
  'Medications',
  'Allergies',
  'Conditions',
  'Diet',
  'Symptoms',
]

const flow = [
  { label: 'Living Health Context', desc: 'One continuously updated record' },
  { label: 'AI', desc: 'Understands you before you finish typing' },
  { label: 'Doctor', desc: 'Joins fully briefed, never from zero' },
  { label: 'Safer Decisions', desc: 'Every time, for everyone' },
]

function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: easeCalm }}
      className="mx-auto h-10 w-px origin-top bg-gradient-to-b from-border to-primary/50"
    />
  )
}

export function Brain() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Medhee Brain
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Everything connects. Nothing is forgotten.
          </h2>
        </Reveal>

        <Stagger className="mt-12 flex flex-wrap justify-center gap-3" gap={0.08}>
          {inputs.map((input) => (
            <StaggerItem key={input}>
              <span className="inline-block rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-[0_4px_16px_rgba(17,17,17,0.04)]">
                {input}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <FlowArrow delay={0.5} />

        <div className="space-y-0">
          {flow.map((node, i) => (
            <div key={node.label}>
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: easeCalm }}
                className={`mx-auto max-w-md rounded-2xl border p-6 ${
                  i === 0
                    ? 'border-primary/30 bg-accent'
                    : i === flow.length - 1
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card'
                }`}
              >
                <p className="text-lg font-semibold tracking-tight">{node.label}</p>
                <p
                  className={`mt-1 text-sm ${
                    i === flow.length - 1
                      ? 'text-primary-foreground/75'
                      : 'text-muted-foreground'
                  }`}
                >
                  {node.desc}
                </p>
              </motion.div>
              {i < flow.length - 1 && <FlowArrow delay={0.15 * i + 0.2} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

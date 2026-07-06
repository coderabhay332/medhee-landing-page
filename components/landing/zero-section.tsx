'use client'

import { motion } from 'framer-motion'
import { easeCalm } from './reveal'

const questions = [
  '"What medicines are you taking?"',
  '"Any allergies?"',
  '"What happened?"',
  '"What reports do you have?"',
  '"When did this start?"',
  '"Have you had this before?"',
]

export function ZeroSection() {
  return (
    <section className="bg-ink py-32 text-ink-foreground md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeCalm }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-foreground/50"
        >
          The problem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeCalm }}
          className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
        >
          Healthcare starts from zero. Every single time.
        </motion.h2>

        <div className="mt-20 space-y-5">
          {questions.map((q, i) => (
            <motion.p
              key={q}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{
                opacity: [0, 0.7, 0.7, 0.18],
                y: 0,
                filter: 'blur(0px)',
              }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 2.4,
                delay: i * 0.25,
                times: [0, 0.25, 0.7, 1],
                ease: 'easeInOut',
              }}
              className="text-xl font-medium text-ink-foreground md:text-2xl"
            >
              {q}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.4, ease: easeCalm }}
          className="mt-24 text-balance text-3xl font-semibold tracking-tight text-ink-foreground md:text-5xl"
        >
          Healthcare {"shouldn't"} work like that.
        </motion.p>
      </div>
    </section>
  )
}

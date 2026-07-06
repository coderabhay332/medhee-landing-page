'use client'

import { motion } from 'framer-motion'
import { Reveal, easeCalm } from './reveal'

const beliefs = [
  { plain: 'Healthcare should', bold: 'remember.' },
  { plain: 'Healthcare should', bold: 'prevent.' },
  { plain: 'Healthcare should feel', bold: 'personal.' },
  { plain: 'Healthcare should', bold: 'empower doctors.' },
  { plain: 'Healthcare should never', bold: 'begin from zero.' },
  { plain: 'Healthcare should reduce', bold: 'uncertainty.' },
]

export function Beliefs() {
  return (
    <section id="beliefs" className="border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What we believe
          </p>
        </Reveal>
        <div className="mt-12 space-y-10 md:space-y-14">
          {beliefs.map((belief, i) => (
            <motion.p
              key={belief.bold}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: easeCalm }}
              className="text-balance text-center text-3xl font-medium leading-tight tracking-tight text-muted-foreground md:text-5xl"
            >
              {belief.plain}{' '}
              <span className="font-semibold text-foreground">{belief.bold}</span>
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

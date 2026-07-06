'use client'

import { motion } from 'framer-motion'
import { Reveal, easeCalm } from './reveal'

const today = ['Medication', 'Reports', 'AI', 'Doctor']
const tomorrow = ['Wearables', 'Family Health', 'Insurance', 'Emergency', 'Continuous Care']

export function Vision() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Vision
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            The operating system for your health.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* Timeline line */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: easeCalm }}
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-gradient-to-r from-border via-primary/50 to-primary md:block"
          />

          <div className="grid gap-16 md:grid-cols-2 md:gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: easeCalm }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="mb-6 hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Today
                </p>
              </motion.div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {today.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: easeCalm }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.3, ease: easeCalm }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="mb-6 hidden h-3 w-3 rounded-full bg-primary md:block"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Tomorrow
                </p>
              </motion.div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {tomorrow.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease: easeCalm }}
                    className="rounded-full border border-primary/25 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section id="download" className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Everyone deserves a doctor who already knows them.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Download Medhee. Never start from zero again.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              id="cta-btn-download"
              href="#"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Download Medhee
            </a>
            <a
              id="cta-btn-story"
              href="#story"
              className="rounded-full border border-border bg-card px-8 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Watch the story
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
          >
            <span className="block h-2 w-2 rounded-full bg-primary-foreground" />
          </span>
          <span className="font-semibold tracking-tight">
            <a id="footer-logo-link" href="#">Medhee</a>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Healthcare that remembers you.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a id="footer-link-privacy" href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a id="footer-link-terms" href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a id="footer-link-contact" href="#" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

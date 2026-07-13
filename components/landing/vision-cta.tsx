'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Reveal, easeCalm } from './reveal'
import { WaitlistButton } from './waitlist-button'
import { AppStoreBadges } from './app-store-badges'

const today = ['Medication', 'Reports', 'AI', 'Doctor']
const tomorrow = ['Wearables', 'Family Health', 'Insurance', 'Emergency', 'Continuous Care']

export function Vision() {
  return (
    <section className="py-24 md:py-32 bg-background">
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
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
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
    <section id="download" className="relative overflow-hidden bg-[#09090b] py-28 text-white md:py-40 border-t border-white/5">
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[400px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(14,107,82,0.18), transparent)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Everyone deserves a doctor who already knows them.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-pretty text-base leading-relaxed text-white/50 sm:text-lg">
            Join the waitlist. Never start from zero again.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <WaitlistButton
              id="cta-btn-download"
              className="bg-white! text-[#09090b]! px-8 py-3.5 hover:bg-white/90!"
            >
              Join Waitlist
            </WaitlistButton>
            <a
              id="cta-btn-story"
              href="#story"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              See how it works
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Available on mobile soon
            </p>
            <AppStoreBadges />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-foreground">
                <a id="footer-logo-link" href="#">Medhee</a>
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Healthcare that remembers you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-muted-foreground">
            <Link id="footer-link-privacy" href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link id="footer-link-terms" href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link id="footer-link-contact" href="/contact" className="transition-colors hover:text-foreground">
              Contact Us
            </Link>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Twitter / X
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-[11px] text-muted-foreground/60 sm:flex-row">
          <p>© 2026 Medhee Health Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with care in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}

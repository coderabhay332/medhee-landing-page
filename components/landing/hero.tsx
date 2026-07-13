'use client'

import { motion } from 'framer-motion'
import { easeCalm } from './reveal'
import { WaitlistButton } from './waitlist-button'

/* ─── Data ─── */

const contextPills = [
  { label: 'Medication', value: 'Metformin 500mg', tone: 'default' as const },
  { label: 'Allergy', value: 'Penicillin — Severe', tone: 'warning' as const },
  { label: 'HbA1c', value: '6.8% · 12d ago', tone: 'default' as const },
  { label: 'Condition', value: 'Type 2 Diabetes', tone: 'default' as const },
  { label: 'Diet', value: 'Low glycemic', tone: 'success' as const },
  { label: 'Symptoms', value: 'Vomiting since morning', tone: 'warning' as const },
]

/* ─── Phone Mockup ─── */

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: easeCalm }}
      className="relative z-30 mx-auto w-[240px] sm:w-[260px]"
    >
      {/* Glow behind phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 z-0 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,107,82,0.35), transparent)',
        }}
      />

      {/* Phone frame */}
      <div className="relative z-10 rounded-[2.6rem] border border-white/10 bg-white/5 p-[7px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#0f0f11]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3">
            <span className="text-[10px] font-medium text-white/40">9:41</span>
            <span className="h-4 w-16 rounded-full bg-white/10" aria-hidden="true" />
            <span className="text-[10px] font-medium text-white/40">100%</span>
          </div>

          <div className="space-y-3 px-4 pb-6 pt-2">
            {/* Greeting */}
            <div>
              <p className="text-[11px] text-white/40">Good morning, Rahul</p>
              <p className="text-sm font-semibold text-white">How are you feeling?</p>
            </div>

            {/* User message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6, ease: easeCalm }}
              className="ml-8 rounded-2xl rounded-br-md bg-[#0e6b52] px-3.5 py-2.5"
            >
              <p className="text-xs leading-relaxed text-white">
                {"I've been vomiting since this morning."}
              </p>
            </motion.div>

            {/* AI analysing */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.6, ease: easeCalm }}
              className="rounded-2xl border border-white/8 bg-white/5 p-3.5"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  aria-hidden="true"
                  className="block h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
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
                    className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/60"
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
              className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-400">
                Moderate risk
              </p>
              <p className="mt-1 text-xs font-semibold text-white">Doctor recommended</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                Given your diabetes and current medication, a doctor should take a look.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.9, duration: 0.5 }}
                className="mt-2.5 rounded-full bg-[#0e6b52] px-3 py-2 text-center text-[11px] font-semibold text-white"
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

/* ─── Hero ─── */

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#09090b] pb-20 pt-28"
      style={{ '--tw-bg-opacity': '1' } as React.CSSProperties}
    >
      {/* Radial emerald gradient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: '700px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,107,82,0.28), transparent)',
        }}
      />
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Trust pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCalm }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          500+ healthcare professionals on the waitlist
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeCalm }}
          className="mt-7 text-balance text-[3.25rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl"
        >
          Healthcare that{' '}
          <span
            className="font-display italic text-emerald-400"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            remembers
          </span>{' '}
          you.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: easeCalm }}
          className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/50 sm:text-lg"
        >
          Medhee remembers your medications, allergies, reports and history — so every health
          decision starts with context, not questions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: easeCalm }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <WaitlistButton
            id="hero-btn-waitlist"
            className="bg-white! text-[#09090b]! px-7 py-3.5 text-sm! hover:bg-white/90! shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_24px_rgba(14,107,82,0.3)]"
          >
            Join Waitlist →
          </WaitlistButton>
          <a
            id="hero-btn-story"
            href="#story"
            className="rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            See how it works
          </a>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-16"
        >
          <PhoneMockup />
        </motion.div>

        {/* Context pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: easeCalm }}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2"
        >
          {contextPills.map((pill, i) => (
            <motion.span
              key={pill.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.08 }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs backdrop-blur-sm ${
                pill.tone === 'warning'
                  ? 'border-amber-400/20 bg-amber-400/5 text-amber-300/80'
                  : pill.tone === 'success'
                    ? 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300/80'
                    : 'border-white/10 bg-white/5 text-white/50'
              }`}
            >
              <span className="font-semibold text-white/90">{pill.label}</span>
              <span className="text-white/30">·</span>
              {pill.value}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

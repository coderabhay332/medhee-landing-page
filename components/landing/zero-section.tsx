'use client'

import { motion } from 'framer-motion'
import { easeCalm } from './reveal'

const questions = [
  '"What medicines are you currently taking?"',
  '"Any known allergies or drug reactions?"',
  '"When did these symptoms first start?"',
  '"Do you have your last blood reports?"',
  '"Have you experienced this condition before?"',
]

export function ZeroSection() {
  return (
    <section className="bg-[#09090b] py-32 text-white border-y border-white/5">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeCalm }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
        >
          The Friction
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeCalm }}
          className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl lg:text-6xl"
        >
          Healthcare starts from zero. <br />Every single time.
        </motion.h2>

        {/* Staggered Repeating Questions */}
        <div className="mt-20 space-y-6">
          {questions.map((q, i) => (
            <motion.p
              key={q}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{
                opacity: [0, 0.8, 0.8, 0.35],
                y: 0,
                filter: 'blur(0px)',
              }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 2.2,
                delay: i * 0.2,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeInOut',
              }}
              className="text-lg font-medium text-white md:text-xl lg:text-2xl"
            >
              {q}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.3, ease: easeCalm }}
          className="mt-24 text-balance text-2xl font-semibold tracking-tight text-white md:text-4xl"
        >
          It doesn't have to work like that.
        </motion.p>

        {/* Before / After Split Comparison Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 text-left max-w-4xl mx-auto">
          {/* Today (Fragmented) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/2 p-6 md:p-8 backdrop-blur-sm"
          >
            <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
              Without Medhee
            </h3>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              Every consultation starts blank. You repeat your chronic history, look for dates, guess doses, and hope there's no mismatch.
            </p>
            <ul className="mt-6 space-y-3.5 text-xs text-white/40">
              <li className="flex items-center gap-2.5">✕ Manual paper files and report packets</li>
              <li className="flex items-center gap-2.5">✕ Doctors forced to rely on verbal recall</li>
              <li className="flex items-center gap-2.5">✕ Missed allergies or cross-interactions</li>
            </ul>
          </motion.div>

          {/* With Medhee (Unified) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 backdrop-blur-sm"
          >
            <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Unified by Medhee
            </h3>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Your profile is pre-filled, safety-screened, and shared with doctors instantly. Consultations start with context, not questions.
            </p>
            <ul className="mt-6 space-y-3.5 text-xs text-white/70">
              <li className="flex items-center gap-2.5">✓ Auto-analyzed history and report trend lines</li>
              <li className="flex items-center gap-2.5">✓ Real-time medication safety alerts</li>
              <li className="flex items-center gap-2.5">✓ Direct, instantaneous care provider briefings</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

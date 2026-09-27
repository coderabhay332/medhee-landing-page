'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  'What medicines are you taking right now?',
  'Are you allergic to any medicine?',
  'When did this start?',
  'Do you have your old reports with you?',
  'Any long-term conditions — diabetes, BP, thyroid?',
];

export default function SectionZero() {
  const [answered, setAnswered] = useState(false);
  const autoPlayed = useRef(false);
  const ref = useRef<HTMLElement>(null);

  // Play the transition once, the first time the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoPlayed.current) {
          autoPlayed.current = true;
          timer = setTimeout(() => setAnswered(true), 3000);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={ref} id="why-medhee" className="relative py-16 md:py-20 bg-white border-y border-border-light">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-primary-text">
            Every visit starts with the same questions.
          </h2>
          <p className="text-base text-secondary-text">New clinic, new doctor, new app — you answer them all over again.</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto min-h-[380px] flex items-center">
          <motion.ul
            animate={answered ? { opacity: 0, scale: 0.9, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full space-y-3"
            aria-hidden={answered}
          >
            {QUESTIONS.map((q) => (
              <li key={q} className="bg-bg-warm border border-border-light rounded-2xl p-4 flex items-center gap-4 text-left">
                <HelpCircle className="w-5 h-5 text-secondary-text flex-shrink-0" aria-hidden="true" />
                <p className="text-sm md:text-base font-medium text-primary-text">{q}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={false}
            animate={answered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, delay: answered ? 0.3 : 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 px-4 pointer-events-none"
            aria-hidden={!answered}
          >
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-tight">
              With Medhee, they're <span className="text-accent-emerald">already answered.</span>
            </h3>
            <p className="text-base text-secondary-text leading-relaxed max-w-xl">
              Your medicines, allergies, conditions and reports stay in one place. When you consult a doctor in the app, they see it
              before the call starts — and the AI nurse uses it to give advice that fits you.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setAnswered((v) => !v)}
            className="px-5 py-2.5 rounded-full border border-border-light bg-white hover:bg-bg-warm text-sm font-medium text-primary-text transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
            {answered ? 'Show the questions again' : 'Show the Medhee way'}
          </button>
        </div>

        {/* Founder note */}
        <figure className="max-w-2xl mx-auto pt-10 border-t border-border-light text-left space-y-3">
          <figcaption className="text-sm font-semibold text-primary-text">Why we're building Medhee</figcaption>
          <blockquote className="text-base md:text-lg text-secondary-text leading-relaxed">
            Growing up with a doctor in the family, nobody at home guessed medicines or searched Google when they fell sick. The
            doctor already knew everyone's allergies, reports and history. We want every family to have that.
          </blockquote>
        </figure>
      </div>
    </section>
  );
}

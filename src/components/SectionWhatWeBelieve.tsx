/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function SectionWhatWeBelieve() {
  const beliefs = [
    { title: "Healthcare should remember.", subtitle: "A person's health profile should live continuously, not vanish when they leave the clinic." },
    { title: "Healthcare should prevent.", subtitle: "Intervening early with deep context before a mild symptom transforms into a crisis." },
    { title: "Healthcare should feel personal.", subtitle: "Like calling the doctor in the family who has known your clinical details since childhood." },
    { title: "Healthcare should empower doctors.", subtitle: "Physicians deserve immediate, high-fidelity context instead of spending consultations filling out forms." },
    { title: "Healthcare should never begin from zero.", subtitle: "History is too critical to recreate with repetitive verbal questions in emergency rooms." },
    { title: "Healthcare should reduce uncertainty.", subtitle: "Bringing clean confidence, safe limits, and anxiety reduction to every personal medical event." }
  ];

  return (
    <section 
      id="what-we-believe" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm flex flex-col justify-center items-center border-t border-border-light/50"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        {/* Top Minimal Label */}
        <div className="text-left">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-emerald font-bold">The Founding Ethos</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-text mt-2">What We Believe.</h2>
        </div>

        {/* List of typographic declarations with clean rhythm */}
        <div className="space-y-6 md:space-y-8">
          {beliefs.map((belief, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 max-w-3xl"
            >
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-tight">
                {belief.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-secondary-text font-light leading-relaxed max-w-2xl pl-1">
                {belief.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Concluding philosophical statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pt-20 border-t border-border-light/60 text-left max-w-xl"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-secondary-text">The Inspiration</p>
          <p className="text-sm text-secondary-text leading-relaxed font-light mt-3 italic">
            "Growing up with a doctor in the family meant whenever someone fell sick, they never searched Google or guessed medications. The doctor already knew their allergies, their records, their history. Medhee exists to bring that experience to everyone."
          </p>
        </motion.div>

      </div>
    </section>
  );
}

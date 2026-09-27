'use client';

import { motion } from 'motion/react';
import { Home, Stethoscope, Siren, ArrowDown } from 'lucide-react';

const TIERS = [
  {
    id: 'low',
    icon: Home,
    title: 'Mild',
    example: 'A common cold, a mild headache, a question about diet.',
    outcome: 'The AI nurse helps',
    detail: 'You get home-care advice that takes your medicines and conditions into account, and what signs to watch for.',
    tone: { outcome: 'border-emerald-200 bg-accent-soft text-accent-emerald', icon: 'text-accent-emerald' },
  },
  {
    id: 'moderate',
    icon: Stethoscope,
    title: 'Needs a doctor',
    example: 'A symptom that is riskier because of your history — like vomiting when you have diabetes.',
    outcome: 'Medhee suggests a doctor',
    detail: 'The AI does not try to handle it. It recommends a consult, and you can start one with a doctor in the app.',
    tone: { outcome: 'border-amber-200 bg-amber-50 text-accent-amber', icon: 'text-accent-amber' },
  },
  {
    id: 'high',
    icon: Siren,
    title: 'Emergency',
    example: 'Chest pain, trouble breathing, a sudden severe headache, fainting.',
    outcome: 'Get help now',
    detail: 'The assessment stops and tells you to call 112 or go to the nearest emergency room. It does not keep chatting.',
    tone: { outcome: 'border-red-200 bg-red-50 text-accent-red', icon: 'text-accent-red' },
  },
] as const;

export default function SectionAILimits() {
  return (
    <section id="ai-limits" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-b border-border-light">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 max-w-3xl text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            The AI knows when to step back.
          </h2>
          <p className="text-base text-secondary-text leading-relaxed max-w-2xl">
            Medhee's AI is not a doctor and doesn't pretend to be one. Every symptom check ends in one of three places.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-border-light rounded-3xl p-7 flex flex-col gap-5"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-primary-text">{tier.title}</h3>
                  <Icon className={`w-5 h-5 ${tier.tone.icon}`} aria-hidden="true" />
                </div>
                <p className="text-sm text-secondary-text leading-relaxed min-h-[60px]">{tier.example}</p>
                <ArrowDown className="w-4 h-4 text-secondary-text/60 mx-auto" aria-hidden="true" />
                <p className={`p-4 rounded-2xl border text-center font-display font-semibold ${tier.tone.outcome}`}>{tier.outcome}</p>
                <p className="text-sm text-secondary-text leading-relaxed pt-4 border-t border-border-light">{tier.detail}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-secondary-text max-w-2xl">
          Medhee gives information, not a diagnosis. In an emergency, always call 112 or your local emergency number first.
        </p>
      </div>
    </section>
  );
}

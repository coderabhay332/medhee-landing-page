/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Stethoscope, AlertOctagon, ArrowDown, ShieldCheck, Heart } from 'lucide-react';
import { TriageTier } from '../types';

export default function SectionAILimits() {
  const tiers: TriageTier[] = [
    {
      id: 'low',
      title: "Low Risk",
      subtitle: "Minor, isolated events",
      description: "Mild cold symptoms, basic diet questions, or simple lifestyle advice matching normal historical parameters.",
      outcome: "Medhee AI Helps",
      colorClass: "border-accent-emerald bg-accent-soft/10 text-accent-emerald",
      actionText: "AI provides immediate, context-aware triage guidelines based on your synchronized clinical record."
    },
    {
      id: 'moderate',
      title: "Moderate Risk",
      subtitle: "Complex, coupled events",
      description: "Acute symptoms colliding with high-risk conditions (e.g., vomiting with Active Diabetes, Penicillin allergies).",
      outcome: "Doctor Recommended",
      colorClass: "border-accent-amber bg-amber-50/10 text-accent-amber",
      actionText: "The system immediately handshakes with an on-call verified doctor while transferring your clinical history."
    },
    {
      id: 'high',
      title: "High Risk",
      subtitle: "Emergency medical signals",
      description: "Severe respiratory distress, chest tightness, or acute trauma showing up on your integrated sensors.",
      outcome: "Immediate Consultation",
      colorClass: "border-accent-red bg-red-50/10 text-accent-red",
      actionText: "Medhee triggers direct cellular consultation routes to critical responders, sending a secure history snapshot."
    }
  ];

  return (
    <section 
      id="ai-limits" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm overflow-hidden flex flex-col justify-center items-center border-b border-border-light/40"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl text-left">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">Safety Principles</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            AI knows its limits.
          </h2>
          <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed max-w-2xl">
            We do not believe in unchecked chatbots playing physician. The Medhee triage matrix respects medical safeguards, setting absolute limits on automated assistance.
          </p>
        </div>

        {/* The Triage Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-border-light rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-6">
                
                {/* Header Badge */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-primary-text">{tier.title}</h3>
                    <p className="text-xs text-secondary-text font-light mt-0.5">{tier.subtitle}</p>
                  </div>
                  
                  {tier.id === 'low' && <Sparkles className="w-5 h-5 text-accent-emerald" />}
                  {tier.id === 'moderate' && <Stethoscope className="w-5 h-5 text-accent-amber animate-pulse" />}
                  {tier.id === 'high' && <AlertOctagon className="w-5 h-5 text-accent-red" />}
                </div>

                <p className="text-xs sm:text-sm text-secondary-text font-light min-h-[60px] leading-relaxed">
                  {tier.description}
                </p>

                {/* Vertical Divider / Flow Indicator */}
                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-0.5 bg-border-light/80 relative">
                    <ArrowDown className="w-3 h-3 text-secondary-text/60 absolute -bottom-1.5 -left-[5px]" />
                  </div>
                </div>

                {/* Outcome Block */}
                <div className={`p-4 rounded-2xl border text-center font-display font-semibold text-sm ${tier.colorClass} group-hover:scale-[1.02] transition-transform`}>
                  {tier.outcome}
                </div>

              </div>

              <div className="pt-6 border-t border-border-light/60 mt-6 text-xs text-secondary-text leading-relaxed font-light text-left">
                {tier.actionText}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Philosophical Declaration - Apple Style Spacing */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-12 text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft/30 text-accent-emerald text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Clinical Safeguards Active
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary-text leading-snug">
            Medhee never replaces doctors. <br />
            <span className="text-accent-emerald font-semibold">It prepares them.</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-light">
            By aggregating your health memory securely before consultations, Medhee relieves clinical overload, allowing physicians to spend their time providing human guidance instead of recording basic intake details.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

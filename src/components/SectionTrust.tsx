/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, EyeOff, CheckCircle, Lock, Award } from 'lucide-react';

export default function SectionTrust() {
  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "Every byte of your clinical memory is encrypted on-device. Your history is unlocked only when you initiate triage or explicitly share access with a consulting physician.",
      icon: <Lock className="w-4 h-4 text-accent-emerald" />
    },
    {
      title: "Privacy as a Foundation",
      description: "We do not monetize, analyze, or lease your personal history. Your medical record is a private asset owned entirely by you, governed strictly under consumer-led keys.",
      icon: <EyeOff className="w-4 h-4 text-accent-emerald" />
    },
    {
      title: "Verified Clinicians",
      description: "Every doctor available on the Medhee network is thoroughly vetted, licensed, and board-certified. They are trained specifically to leverage operating system context.",
      icon: <Award className="w-4 h-4 text-accent-emerald" />
    },
    {
      title: "DPDP Compliance",
      description: "Fully aligned with global Digital Personal Data Protection regulations. You retain absolute control over who has access, with a verifiable ledger of every data disclosure.",
      icon: <ShieldCheck className="w-4 h-4 text-accent-emerald" />
    },
    {
      title: "Clinical AI Safeguards",
      description: "Our AI Core is constrained by rigorous clinical guardrails. It does not speculate or guess. When safety criteria are met, it defers directly to human specialist hand-offs.",
      icon: <CheckCircle className="w-4 h-4 text-accent-emerald" />
    }
  ];

  return (
    <section 
      id="trust" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm overflow-hidden flex flex-col justify-center items-center border-t border-border-light/50"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">Uncompromising Integrity</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            Built for trust.
          </h2>
          <p className="text-sm md:text-base text-secondary-text font-light leading-relaxed">
            In healthcare, security is not a marketing checkbox. It is an absolute, non-negotiable architectural design principle.
          </p>
        </div>

        {/* Beautiful Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start border-t border-border-light pt-12">
          {securityFeatures.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-4 text-left lg:col-span-1"
            >
              {/* Clean layout: Simple Icon + title + crisp copy */}
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-bg-warm border border-border-light flex-shrink-0">
                  {feat.icon}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary-text">{feat.title}</h3>
              </div>
              
              <p className="text-xs text-secondary-text font-light leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Elegant summary statement */}
        <p className="text-xs text-center text-secondary-text max-w-md mx-auto italic font-light">
          "We believe you should have the same privacy inside your health app that you expect inside your consulting room."
        </p>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { HelpCircle, RefreshCcw, ShieldAlert } from 'lucide-react';

export default function SectionZero() {
  const [collapsed, setCollapsed] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      // Auto trigger collapse sequence after 3 seconds for great visual storytelling
      const timer = setTimeout(() => {
        setCollapsed(true);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      // Reset when scrolling away to keep it interactive
      setCollapsed(false);
    }
  }, [inView]);

  const questions = [
    { text: "What medications are you currently taking?", id: "q1" },
    { text: "Are you allergic to any drugs or penicillin?", id: "q2" },
    { text: "When did your current symptoms first start?", id: "q3" },
    { text: "Can you upload your previous laboratory reports?", id: "q4" },
    { text: "What chronic conditions do you have?", id: "q5" }
  ];

  return (
    <section 
      ref={ref}
      id="healthcare-starts-zero" 
      className="relative py-12 md:py-16 bg-bg-warm text-primary-text overflow-hidden flex items-center justify-center border-y border-border-light/60"
    >
      {/* Subtle warm emerald glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-radial from-accent-soft via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Dynamic Canvas Container */}
        <div className="w-full min-h-[360px] flex flex-col justify-between items-center relative">
          
          {/* Top Label */}
          <div className="text-center space-y-1.5 mb-6">
            <span className="text-xs font-mono tracking-[0.2em] text-accent-red uppercase">The Current Reality</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-primary-text">Starting From Zero</h2>
          </div>

          {/* Interactive Stack of repetitive Questions */}
          <div className="flex-1 w-full max-w-2xl flex flex-col justify-center items-center relative">
            
            {/* The collapsible stack */}
            <motion.div 
              animate={collapsed ? { 
                scale: 0.3, 
                opacity: 0, 
                y: -40,
                filter: "blur(12px)"
              } : { 
                scale: 1, 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-3.5"
            >
              {questions.map((q, index) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1 - (index * 0.12), x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-white border border-border-light rounded-2xl p-4 md:p-5 flex items-center gap-4 text-left shadow-sm hover:border-accent-emerald/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-soft border border-accent-emerald/20 flex items-center justify-center flex-shrink-0 text-accent-emerald">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary-text">Standard Medical Intake</span>
                    <p className="text-sm md:text-base font-medium text-primary-text mt-0.5">{q.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Overlap Resulting State - Healthcare shouldn't work like that */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={collapsed ? { 
                  opacity: 1, 
                  scale: 1, 
                  filter: "blur(0px)" 
                } : { 
                  opacity: 0, 
                  scale: 0.9, 
                  filter: "blur(10px)" 
                }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-xl space-y-5 px-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft border border-accent-emerald/20 text-accent-emerald text-xs font-medium">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  The Friction of Blank Diagnostics
                </div>
                
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-tight">
                  Healthcare shouldn’t <br />
                  <span className="text-accent-red font-semibold">start from zero.</span>
                </h3>
                
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-normal">
                  Every doctor’s appointment, urgent care visit, or remote consultation spends 15 vital minutes recreating your medical context. We believe a person's life history is too important to be forgotten after every visit.
                </p>
              </motion.div>
            </div>

          </div>

          {/* User Control Interface */}
          <div className="mt-8 z-20">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="px-4 py-2 rounded-full border border-border-light bg-white hover:bg-bg-warm text-xs font-mono text-primary-text shadow-xs transition-all duration-200 flex items-center gap-2"
            >
              <RefreshCcw className="w-3.5 h-3.5 text-accent-emerald" />
              {collapsed ? "Replay intake cycle" : "Simulate Medhee Memory Integration"}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, ShieldAlert, FileText, Activity, Apple, Thermometer, ArrowRight, Stethoscope, Home, Info } from 'lucide-react';
import { HealthCard } from '../types';

const CARDS: HealthCard[] = [
  { id: 'condition', type: 'chronic', label: 'Condition', value: 'Type 2 Diabetes', meta: 'Since 2024', iconName: 'Activity' },
  { id: 'medicine', type: 'medication', label: 'Medicine', value: 'Metformin 500mg', meta: 'Twice a day', iconName: 'Pill' },
  { id: 'allergy', type: 'allergy', label: 'Allergy', value: 'Penicillin', meta: 'Severe reaction', iconName: 'ShieldAlert' },
  { id: 'report', type: 'report', label: 'Latest report', value: 'HbA1c 6.8%', meta: '2 weeks ago', iconName: 'FileText' },
  { id: 'diet', type: 'diet', label: 'Diet plan', value: 'Low sugar', meta: 'Based on your medicines', iconName: 'Apple' },
  { id: 'symptom', type: 'symptom', label: 'Symptom today', value: 'Vomiting', meta: 'Started 4 hours ago', iconName: 'Thermometer' },
];

const ICONS: Record<string, typeof Pill> = { Activity, Pill, ShieldAlert, FileText, Apple, Thermometer };

type Advice = { tone: 'doctor' | 'home' | 'unknown' | 'empty'; title: string; body: string; note?: string };

/** What the assistant would say, given which parts of the profile it can see. */
function getAdvice(active: string[]): Advice {
  const has = (id: string) => active.includes(id);
  if (!has('symptom')) {
    return { tone: 'empty', title: 'No symptom added', body: 'Add the symptom card back to see what Medhee would suggest.' };
  }
  if (active.length === 1) {
    return {
      tone: 'unknown',
      title: 'Generic advice only',
      body: "With no history, any app can only say “rest and drink fluids”. It doesn't know about your diabetes or your medicines.",
    };
  }
  const allergyNote = has('allergy') ? 'Penicillin allergy will be shown to the doctor before anything is prescribed.' : undefined;
  if (has('condition') || has('medicine')) {
    return {
      tone: 'doctor',
      title: 'Talk to a doctor today',
      body: 'Vomiting with diabetes can quickly lead to dehydration, and Metformin can upset the stomach. A doctor should check whether your dose needs to change.',
      note: allergyNote,
    };
  }
  return {
    tone: 'home',
    title: 'Home care should be enough',
    body: 'Sip fluids and rest. See a doctor if the vomiting lasts more than a day.',
    note: allergyNote,
  };
}

const ADVICE_STYLE: Record<Advice['tone'], { box: string; title: string; icon: typeof Info }> = {
  doctor: { box: 'bg-red-50 border-red-100', title: 'text-accent-red', icon: Stethoscope },
  home: { box: 'bg-accent-soft border-emerald-100', title: 'text-accent-emerald', icon: Home },
  unknown: { box: 'bg-amber-50 border-amber-100', title: 'text-accent-amber', icon: Info },
  empty: { box: 'bg-bg-warm border-border-light', title: 'text-secondary-text', icon: Info },
};

export default function SectionHero() {
  const [activeCards, setActiveCards] = useState<string[]>(CARDS.map((c) => c.id));
  const [checking, setChecking] = useState(false);
  const [preset, setPreset] = useState<'full' | 'symptom' | null>('full');

  useEffect(() => {
    if (!checking) return;
    const timer = setTimeout(() => setChecking(false), 700);
    return () => clearTimeout(timer);
  }, [checking]);

  const toggleCard = (id: string) => {
    setChecking(true);
    setPreset(null);
    setActiveCards((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const applyPreset = (mode: 'full' | 'symptom') => {
    setChecking(true);
    setPreset(mode);
    setActiveCards(mode === 'full' ? CARDS.map((c) => c.id) : ['symptom']);
  };

  const advice = getAdvice(activeCards);
  const style = ADVICE_STYLE[advice.tone];
  const AdviceIcon = style.icon;

  return (
    <section id="hero" className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 bg-bg-warm overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Text */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <p className="text-sm font-medium text-accent-emerald">Now in beta · English and हिन्दी</p>

          <div className="space-y-4 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-text leading-[1.08]"
            >
              Healthcare that <br />
              <span className="text-accent-emerald">remembers you.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-secondary-text leading-relaxed"
            >
              Medhee keeps your medicines, allergies, conditions and lab reports in one place. When you feel unwell, the AI nurse
              or your doctor already has your history, so you don't have to explain it all again.
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 rounded-full bg-primary-text hover:bg-accent-emerald text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
            >
              Join the waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-bg-warm text-primary-text border border-border-light text-sm font-medium transition-colors"
            >
              See what it does
            </button>
          </div>

          {/* Demo presets */}
          <div className="pt-6 border-t border-border-light w-full space-y-3">
            <p className="text-sm font-semibold text-primary-text">Try it: the same symptom, with and without your history</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset('full')}
                aria-pressed={preset === 'full'}
                className={`text-sm px-4 py-2 rounded-full transition-colors ${
                  preset === 'full' ? 'bg-accent-emerald text-white' : 'bg-white text-secondary-text border border-border-light hover:bg-bg-warm'
                }`}
              >
                With your history
              </button>
              <button
                onClick={() => applyPreset('symptom')}
                aria-pressed={preset === 'symptom'}
                className={`text-sm px-4 py-2 rounded-full transition-colors ${
                  preset === 'symptom' ? 'bg-accent-emerald text-white' : 'bg-white text-secondary-text border border-border-light hover:bg-bg-warm'
                }`}
              >
                Symptom only
              </button>
            </div>
            <p className="text-sm text-secondary-text">Or tap the cards on the phone to add and remove details.</p>
          </div>
        </div>

        {/* Phone */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[360px] h-[600px] bg-[#0c0c0d] rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-[#2d2d30] overflow-hidden flex flex-col">
            <div aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30" />

            <div className="flex-1 bg-bg-warm rounded-[42px] overflow-hidden p-5 pt-12 flex flex-col gap-3 select-none">
              <div className="pb-2 border-b border-border-light">
                <p className="text-sm font-bold text-primary-text">Your health profile</p>
                <p className="text-[11px] text-secondary-text">What Medhee can see right now</p>
              </div>

              <ul className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                <AnimatePresence initial={false}>
                  {CARDS.map((card) => {
                    const isActive = activeCards.includes(card.id);
                    const Icon = ICONS[card.iconName] ?? Activity;
                    return (
                      <motion.li key={card.id} layout>
                        <button
                          type="button"
                          onClick={() => toggleCard(card.id)}
                          aria-pressed={isActive}
                          className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 text-left border transition-all ${
                            isActive
                              ? 'bg-white border-border-light hover:border-accent-emerald'
                              : 'bg-transparent border-dashed border-border-light opacity-50 hover:opacity-80'
                          }`}
                        >
                          <span className="p-1.5 rounded-lg bg-bg-warm flex-shrink-0">
                            <Icon className={`w-4 h-4 ${card.type === 'allergy' ? 'text-accent-red' : card.type === 'symptom' ? 'text-accent-amber' : 'text-accent-emerald'}`} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[10px] text-secondary-text">{card.label}</span>
                            <span className="block text-xs font-semibold text-primary-text truncate">{isActive ? card.value : 'Hidden'}</span>
                          </span>
                          {isActive && <span className="text-[10px] text-secondary-text flex-shrink-0">{card.meta}</span>}
                        </button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>

              <div className="bg-white border border-border-light rounded-2xl p-3.5 shadow-sm min-h-[128px]" aria-live="polite">
                {checking ? (
                  <p className="text-xs text-secondary-text flex items-center gap-2 py-6 justify-center">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-accent-soft border-t-accent-emerald animate-spin" aria-hidden="true" />
                    Checking your history…
                  </p>
                ) : (
                  <div className={`p-3 rounded-xl border ${style.box} space-y-1`}>
                    <p className={`text-xs font-bold flex items-center gap-1.5 ${style.title}`}>
                      <AdviceIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      {advice.title}
                    </p>
                    <p className="text-[11px] text-secondary-text leading-snug">{advice.body}</p>
                    {advice.note && <p className="text-[11px] text-primary-text leading-snug pt-1">{advice.note}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

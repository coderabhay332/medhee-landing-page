'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Activity, ShieldAlert, Stethoscope, Clock, Pill, CheckCircle, AlertTriangle } from 'lucide-react';

type Scene = 'wakeup' | 'history' | 'symptom' | 'check' | 'doctor' | 'prescription';

interface Step {
  id: number;
  title: string;
  description: string;
  takeaway: string;
  scene: Scene;
  screenTitle: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Rahul feels sick at 4 AM.',
    description:
      "He's been vomiting for hours and feels weak. Normally he'd guess at a medicine, wake someone up, or wait for the clinic to open.",
    takeaway: 'Instead, he opens Medhee.',
    scene: 'wakeup',
    screenTitle: 'Medhee',
  },
  {
    id: 2,
    title: 'His history is already there.',
    description:
      'Rahul added his details once: Type 2 diabetes, Metformin twice a day, and a severe penicillin allergy. He does not need to type them again.',
    takeaway: 'You enter your history once.',
    scene: 'history',
    screenTitle: 'Rahul’s profile',
  },
  {
    id: 3,
    title: 'He describes the problem in his own words.',
    description: 'No long forms. He types (or says): “I’ve been vomiting for four hours and feel very weak.”',
    takeaway: 'English or Hindi, typed or spoken.',
    scene: 'symptom',
    screenTitle: 'AI nurse',
  },
  {
    id: 4,
    title: 'Medhee checks it against his history.',
    description:
      'Vomiting is more serious for someone with diabetes because it can cause dehydration, and Metformin can upset the stomach. So Medhee does not suggest home remedies. It recommends a doctor.',
    takeaway: 'Advice changes based on your history.',
    scene: 'check',
    screenTitle: 'Assessment',
  },
  {
    id: 5,
    title: 'Dr. Priya Nair joins the call.',
    description:
      "Rahul picks a doctor who's available now. Before the video call starts, her screen already shows his diabetes, his medicines, his allergy and what he told the AI nurse. She skips the usual questions.",
    takeaway: 'The doctor starts with your full picture.',
    scene: 'doctor',
    screenTitle: 'Video consult',
  },
  {
    id: 6,
    title: 'The prescription goes into his profile.',
    description:
      'Dr. Nair prescribes an anti-nausea medicine and ORS, and asks him to pause Metformin until he can eat again. The prescription is saved to his profile, so the next doctor sees it too.',
    takeaway: 'Every visit adds to your history.',
    scene: 'prescription',
    screenTitle: 'Prescription',
  },
];

function SceneView({ scene }: { scene: Scene }) {
  switch (scene) {
    case 'wakeup':
      return (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center mx-auto text-accent-emerald">
            <Clock className="w-6 h-6" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold text-primary-text">4:12 AM</p>
          <div className="p-3 bg-white border border-border-light rounded-xl text-xs text-secondary-text max-w-[240px] mx-auto leading-relaxed">
            Good morning, Rahul. How are you feeling?
          </div>
        </div>
      );
    case 'history':
      return (
        <ul className="space-y-2.5">
          {[
            { icon: Activity, label: 'Condition', value: 'Type 2 Diabetes', danger: false },
            { icon: Pill, label: 'Medicine', value: 'Metformin 500mg · twice a day', danger: false },
            { icon: ShieldAlert, label: 'Allergy', value: 'Penicillin · severe', danger: true },
          ].map(({ icon: Icon, label, value, danger }) => (
            <li key={label} className={`bg-white border p-3 rounded-xl flex items-center gap-2.5 ${danger ? 'border-red-100' : 'border-border-light'}`}>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${danger ? 'bg-red-50 text-accent-red' : 'bg-accent-soft text-accent-emerald'}`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block text-[11px] text-secondary-text">{label}</span>
                <span className={`block text-xs font-bold ${danger ? 'text-accent-red' : 'text-primary-text'}`}>{value}</span>
              </span>
            </li>
          ))}
        </ul>
      );
    case 'symptom':
      return (
        <div className="space-y-2">
          <div className="bg-white border border-border-light rounded-xl p-3 text-xs text-secondary-text max-w-[210px] text-left">
            What's bothering you today?
          </div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent-emerald text-white rounded-xl p-3 text-xs ml-auto max-w-[220px] text-left"
          >
            I’ve been vomiting for four hours and feel very weak.
          </motion.div>
        </div>
      );
    case 'check':
      return (
        <div className="space-y-3 text-left">
          <div className="bg-white border border-border-light rounded-xl p-3 space-y-2">
            <p className="text-xs font-bold text-primary-text">Vomiting for 4 hours</p>
            <p className="text-[11px] text-secondary-text flex gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-amber flex-shrink-0 mt-px" aria-hidden="true" />
              Higher risk of dehydration with diabetes
            </p>
            <p className="text-[11px] text-secondary-text flex gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-amber flex-shrink-0 mt-px" aria-hidden="true" />
              Metformin can cause stomach upset
            </p>
          </div>
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-xs font-bold text-accent-red">Recommended: talk to a doctor today</p>
          </div>
        </div>
      );
    case 'doctor':
      return (
        <div className="space-y-3">
          <div className="bg-white border border-border-light rounded-xl p-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0" aria-hidden="true">
              PN
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-primary-text">Dr. Priya Nair</p>
              <p className="text-[11px] text-secondary-text">General Physician</p>
            </div>
          </div>
          <div className="bg-white border border-border-light rounded-xl p-3 text-left space-y-2">
            <p className="text-[11px] text-secondary-text">Shared with the doctor</p>
            <div className="flex flex-wrap gap-1.5">
              {['Type 2 Diabetes', 'Metformin 500mg', 'Penicillin allergy', 'Vomiting · 4 hrs'].map((c) => (
                <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-bg-warm border border-border-light text-primary-text">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case 'prescription':
      return (
        <div className="space-y-3">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-accent-emerald mx-auto mb-1" aria-hidden="true" />
            <p className="text-xs font-bold text-primary-text">Saved to your profile</p>
          </div>
          <ul className="bg-white border border-border-light rounded-xl p-3 text-left space-y-2.5">
            <li>
              <p className="text-xs font-bold text-primary-text">Ondansetron 4mg</p>
              <p className="text-[11px] text-secondary-text">1 tablet every 8 hours if needed</p>
            </li>
            <li>
              <p className="text-xs font-bold text-primary-text">ORS</p>
              <p className="text-[11px] text-secondary-text">Small sips through the day</p>
            </li>
            <li>
              <p className="text-xs font-bold text-accent-amber">Metformin: paused</p>
              <p className="text-[11px] text-secondary-text">Restart once you can eat normally</p>
            </li>
          </ul>
        </div>
      );
  }
}

export default function SectionRahul() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const isFirst = index === 0;
  const isLast = index === STEPS.length - 1;

  return (
    <section id="meet-rahul" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-b border-border-light">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-light pb-8">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
              One bad night, start to finish
            </h2>
            <p className="text-base text-secondary-text max-w-lg">A walk-through of what using Medhee looks like when you actually get sick.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={isFirst}
              className="p-3 rounded-full border border-primary-text text-primary-text hover:bg-white disabled:border-border-light disabled:text-border-light disabled:cursor-not-allowed transition-colors"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <p className="text-sm text-secondary-text min-w-[60px] text-center" aria-live="polite">
              {index + 1} of {STEPS.length}
            </p>
            <button
              onClick={() => setIndex((i) => Math.min(STEPS.length - 1, i + 1))}
              disabled={isLast}
              className="p-3 rounded-full border border-primary-text text-primary-text hover:bg-white disabled:border-border-light disabled:text-border-light disabled:cursor-not-allowed transition-colors"
              aria-label="Next step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm font-semibold text-accent-emerald">Step {step.id}</p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-text">{step.title}</h3>
                <p className="text-base sm:text-lg text-secondary-text leading-relaxed">{step.description}</p>
                <p className="text-base font-semibold text-primary-text border-l-4 border-accent-emerald pl-4">{step.takeaway}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border-light">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? 'step' : undefined}
                  aria-label={`Step ${s.id}: ${s.title}`}
                  className={`w-9 h-9 rounded-full text-sm border transition-colors ${
                    i === index ? 'bg-primary-text text-white border-primary-text font-bold' : 'bg-white text-secondary-text border-border-light hover:bg-bg-warm'
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[560px] bg-[#0c0c0d] rounded-[48px] p-[8px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border-4 border-[#2d2d30] overflow-hidden flex flex-col">
              <div aria-hidden="true" className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />
              <div className="flex-1 bg-bg-warm rounded-[38px] overflow-hidden p-5 pt-12 flex flex-col">
                <p className="text-sm font-bold text-primary-text pb-3 border-b border-border-light">{step.screenTitle}</p>
                <div className="flex-1 py-4 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={step.scene} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <SceneView scene={step.scene} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

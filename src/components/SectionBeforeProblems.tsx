'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, FileText, History, Apple, ShieldAlert, ChevronRight, Check, X } from 'lucide-react';

interface Check {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: typeof Pill;
  preview: ReactNode;
}

const CHECKS: Check[] = [
  {
    id: 'medicines',
    label: 'Medicine safety',
    title: 'Warnings before you take something risky',
    description:
      'Every medicine you add — typed, scanned or prescribed — is checked against your other medicines and your allergies. If there is a problem, you see a clear warning and what to do about it.',
    icon: Pill,
    preview: (
      <div className="space-y-3 text-left">
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-1.5">
          <p className="text-sm font-bold text-accent-red flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            Allergy warning
          </p>
          <p className="text-xs text-primary-text leading-relaxed">
            <strong>Amoxicillin</strong> is a penicillin-type antibiotic. Your profile says you have a <strong>severe penicillin allergy</strong>.
          </p>
          <p className="text-xs text-secondary-text">Don't take it until you've spoken to your doctor.</p>
        </div>
        <div className="p-3 bg-white border border-border-light rounded-xl text-xs flex justify-between">
          <span className="text-secondary-text">Also taking</span>
          <span className="font-semibold text-primary-text">Metformin 500mg · twice a day</span>
        </div>
      </div>
    ),
  },
  {
    id: 'reports',
    label: 'Lab reports',
    title: 'Reports you can actually understand',
    description:
      'Upload a PDF or photo of a lab report. Medhee pulls out the values, marks anything outside the normal range, and keeps every report in one place instead of lost in WhatsApp chats.',
    icon: FileText,
    preview: (
      <div className="space-y-2 text-left">
        <p className="text-xs text-secondary-text">Blood test · 12 Sep 2026</p>
        {[
          { name: 'HbA1c', value: '6.8%', status: 'High', tone: 'text-accent-red bg-red-50 border-red-100' },
          { name: 'Fasting glucose', value: '118 mg/dL', status: 'High', tone: 'text-accent-red bg-red-50 border-red-100' },
          { name: 'Creatinine', value: '0.9 mg/dL', status: 'Normal', tone: 'text-accent-emerald bg-accent-soft border-emerald-100' },
        ].map((v) => (
          <div key={v.name} className="p-3 bg-white border border-border-light rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-text">{v.name}</p>
              <p className="text-xs text-secondary-text">{v.value}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${v.tone}`}>{v.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'history',
    label: 'Health history',
    title: 'Your history, kept in one place',
    description:
      'Conditions, allergies, current and past medicines, past consultations and symptom checks all live in your profile — not scattered across clinics. You can edit it any time, or delete your account and data from settings.',
    icon: History,
    preview: (
      <ol className="space-y-3 text-left border-l border-border-light pl-4">
        {[
          { when: 'Sep 2026', what: 'Video consult · stomach infection' },
          { when: 'Jun 2026', what: 'Blood test uploaded · HbA1c 6.8%' },
          { when: '2024', what: 'Type 2 Diabetes · started Metformin' },
          { when: '2019', what: 'Penicillin allergy · hives and swelling' },
        ].map((e, i) => (
          <li key={e.when} className="relative">
            <span className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${i === 0 ? 'bg-accent-emerald' : 'bg-slate-300'}`} aria-hidden="true" />
            <p className="text-xs text-secondary-text">{e.when}</p>
            <p className="text-sm font-semibold text-primary-text">{e.what}</p>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'diet',
    label: 'Diet',
    title: 'Food advice that fits your medicines',
    description:
      'Your diet plan is built from your conditions and the medicines you take — which foods help, and which ones to cut down on — with everyday Indian meals, not generic calorie charts.',
    icon: Apple,
    preview: (
      <div className="space-y-2 text-left">
        {[
          { food: 'Poha with peanuts', note: 'Slow-release carbs', ok: true },
          { food: 'Dal, roti and sabzi', note: 'Balanced meal', ok: true },
          { food: 'Gulab jamun', note: 'Raises blood sugar fast', ok: false },
          { food: 'Packaged fruit juice', note: 'High in sugar', ok: false },
        ].map((f) => (
          <div key={f.food} className="p-3 bg-white border border-border-light rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-text">{f.food}</p>
              <p className="text-xs text-secondary-text">{f.note}</p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                f.ok ? 'bg-accent-soft text-accent-emerald' : 'bg-red-50 text-accent-red'
              }`}
            >
              {f.ok ? <Check className="w-3 h-3" aria-hidden="true" /> : <X className="w-3 h-3" aria-hidden="true" />}
              {f.ok ? 'Good' : 'Limit'}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function SectionBeforeProblems() {
  const [activeId, setActiveId] = useState(CHECKS[0].id);
  const current = CHECKS.find((c) => c.id === activeId) ?? CHECKS[0];

  return (
    <section id="safety-checks" className="relative py-16 md:py-20 px-6 md:px-12 bg-white border-t border-border-light">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        <div className="space-y-3 max-w-2xl text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            What Medhee keeps an eye on.
          </h2>
          <p className="text-base text-secondary-text leading-relaxed">
            Quiet checks in the background, so small problems get noticed before they turn into big ones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-3" role="tablist" aria-label="Health checks">
            {CHECKS.map((c) => {
              const Icon = c.icon;
              const selected = c.id === activeId;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="safety-check-panel"
                  onClick={() => setActiveId(c.id)}
                  className={`w-full p-5 rounded-2xl text-left border transition-colors flex items-start gap-4 ${
                    selected ? 'bg-bg-warm border-border-light' : 'bg-white border-transparent hover:bg-bg-warm/60'
                  }`}
                >
                  <span className={`p-2 rounded-xl bg-white border border-border-light flex-shrink-0 ${selected ? 'text-accent-emerald' : 'text-secondary-text'}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-secondary-text">{c.label}</span>
                    <span className="block text-base font-bold text-primary-text mt-0.5">{c.title}</span>
                  </span>
                  <ChevronRight className={`w-4 h-4 text-secondary-text self-center transition-transform ${selected ? 'translate-x-1' : 'opacity-40'}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div
            id="safety-check-panel"
            role="tabpanel"
            className="lg:col-span-7 bg-bg-warm border border-border-light p-6 md:p-10 rounded-[32px] flex flex-col gap-8 min-h-[460px]"
          >
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary-text leading-tight">{current.title}</h3>
                  <p className="text-base text-secondary-text leading-relaxed max-w-xl">{current.description}</p>
                </div>
                <div className="bg-white border border-border-light rounded-2xl p-5 shadow-sm max-w-md w-full mx-auto">{current.preview}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

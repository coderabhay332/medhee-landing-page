'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Pill, FileText, Mic, Video, Users, Languages, Watch, ShieldCheck, Siren, TrendingUp } from 'lucide-react';

type Phase = 'now' | 'next';

const ITEMS: { phase: Phase; title: string; description: string; icon: typeof Pill }[] = [
  { phase: 'now', title: 'Medicines and safety checks', description: 'Your schedule, dose reminders, and warnings for risky combinations or allergies.', icon: Pill },
  { phase: 'now', title: 'Lab reports', description: 'Upload a report, see what is out of range, and ask questions about it.', icon: FileText },
  { phase: 'now', title: 'AI nurse', description: 'Describe symptoms by voice or chat and get advice based on your history.', icon: Mic },
  { phase: 'now', title: 'Doctor consults', description: 'Video, voice or chat with a doctor who can already see your profile.', icon: Video },
  { phase: 'now', title: 'Family profiles', description: "Manage your parents' and children's medicines from one account.", icon: Users },
  { phase: 'now', title: 'English and Hindi', description: 'Use the whole app in either language.', icon: Languages },
  { phase: 'next', title: 'Wearables and home devices', description: 'Readings from glucose meters, BP monitors and watches added to your profile automatically.', icon: Watch },
  { phase: 'next', title: 'Early warnings from your reports', description: 'Notice when a value is slowly getting worse across reports, before it becomes a problem.', icon: TrendingUp },
  { phase: 'next', title: 'Emergency sharing', description: 'Share your key health details with family or an ambulance crew in one tap.', icon: Siren },
  { phase: 'next', title: 'Insurance help', description: 'Keep bills and prescriptions ready for claims.', icon: ShieldCheck },
];

const FILTERS: { key: 'all' | Phase; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'now', label: 'Available now' },
  { key: 'next', label: 'Coming next' },
];

export default function SectionVision() {
  const [filter, setFilter] = useState<'all' | Phase>('all');
  const visible = ITEMS.filter((i) => filter === 'all' || i.phase === filter);

  return (
    <section id="vision" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-t border-border-light">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-light pb-8">
          <div className="space-y-3 text-left">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">What's ready, and what's next.</h2>
            <p className="text-base text-secondary-text max-w-xl">Everything under “Available now” is in the app today. The rest is what we're working on.</p>
          </div>

          <div className="flex items-center gap-1 self-start md:self-auto bg-white p-1 rounded-full border border-border-light" role="group" aria-label="Filter roadmap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                  filter === f.key ? 'bg-primary-text text-white' : 'text-secondary-text hover:text-primary-text'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((item, idx) => {
            const Icon = item.icon;
            const isNow = item.phase === 'now';
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`p-6 rounded-2xl border space-y-3 ${isNow ? 'bg-white border-border-light' : 'bg-transparent border-dashed border-slate-300'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`p-2 rounded-lg ${isNow ? 'bg-accent-soft text-accent-emerald' : 'bg-amber-50 text-accent-amber'}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isNow ? 'bg-accent-soft text-accent-emerald' : 'bg-amber-50 text-amber-800'}`}>
                    {isNow ? 'Available now' : 'Coming next'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary-text">{item.title}</h3>
                <p className="text-sm text-secondary-text leading-relaxed">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

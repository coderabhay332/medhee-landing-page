'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Pill,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Apple,
  Activity,
  Camera,
  Upload,
  MessageSquare,
  Bell,
  Mic,
  Plus,
  Check,
  X,
  Info,
  AlertTriangle,
} from 'lucide-react';

type ScreenKey = 'home' | 'history' | 'interaction' | 'diet';

const SCREENS: { key: ScreenKey; label: string; desc: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', desc: "Today's medicines", icon: Home },
  { key: 'history', label: 'Health history', desc: 'Past symptoms', icon: Activity },
  { key: 'interaction', label: 'Interaction check', desc: 'Medicine combinations', icon: ShieldAlert },
  { key: 'diet', label: 'Diet plan', desc: 'What to eat', icon: Apple },
];

const INFO: Record<ScreenKey, { title: string; body: string; try: string }> = {
  home: {
    title: 'Your day at a glance',
    body: "See which medicines are due, mark doses as taken, and get reminders on your phone. If any of your medicines don't mix well, you'll see it here.",
    try: 'Tap “Take” on a medicine.',
  },
  history: {
    title: 'Every symptom check, saved',
    body: 'Each time you check a symptom, Medhee saves what happened and the advice you got. Your doctor can see the same history.',
    try: 'Tap “Details” on a past entry.',
  },
  interaction: {
    title: 'Know when two medicines don’t mix',
    body: 'When two of your medicines interact, Medhee explains why in plain words, when to be most careful during the day, and which symptoms mean you should get help.',
    try: 'Tap the times to see when the effect is strongest.',
  },
  diet: {
    title: 'Food that works with your medicines',
    body: 'A diet plan built from your conditions and medicines, with everyday Indian food — what to eat more of and what to limit.',
    try: 'Switch between “Eat” and “Limit”.',
  },
};

const TIMES = [
  { h: 8, label: '8 AM', note: 'Both taken' },
  { h: 10, label: '10 AM', note: 'Effect starts' },
  { h: 12, label: '12 PM', note: 'Strongest' },
  { h: 18, label: '6 PM', note: 'Wearing off' },
];

const TIME_ADVICE: Record<number, string> = {
  8: 'You took both medicines with breakfast.',
  10: 'You may start to feel sleepy. Avoid driving if you do.',
  12: 'Drowsiness is usually strongest now. Don’t drive or operate machinery.',
  18: 'The effect is wearing off, but take it easy if you still feel drowsy.',
};

const EAT = [
  { name: 'Khichdi with a little ghee', note: 'Easy to digest' },
  { name: 'Dal, rice and sabzi', note: 'Balanced meal' },
  { name: 'Idli with sambar', note: 'Steamed, low fat' },
  { name: 'Poha with peanuts', note: 'Slow-release carbs' },
  { name: 'Curd rice', note: 'Good for the gut' },
];

const LIMIT = [
  { name: 'Pani puri and fried snacks', note: 'Can worsen acidity' },
  { name: 'Sweets and sugary drinks', note: 'Raise blood sugar quickly' },
];

export default function SectionAppShowcase() {
  const [screen, setScreen] = useState<ScreenKey>('home');
  const [taken, setTaken] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [openEntry, setOpenEntry] = useState<string | null>('1');
  const [hour, setHour] = useState(12);
  const [dietTab, setDietTab] = useState<'eat' | 'limit'>('eat');

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const doses = [
    { id: 'med1', name: 'Cetirizine 10mg', time: '9:30 AM · after food' },
    { id: 'med2', name: 'Pantoprazole 40mg', time: '2:00 PM · 30 min before lunch' },
  ];
  const takenCount = doses.filter((d) => taken[d.id]).length;
  const pct = Math.round((takenCount / doses.length) * 100);

  const toggleDose = (id: string) => {
    setTaken((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) setToast(`Dose marked as taken (${doses.filter((d) => next[d.id]).length}/${doses.length})`);
      return next;
    });
  };

  const info = INFO[screen];

  return (
    <section id="app-showcase" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-t border-border-light">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-text tracking-tight">The everyday app.</h2>
          <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
            Medicines, reminders, history and diet — the screens you'll use most. Tap around, they work.
          </p>
        </div>

        <div className="flex gap-2 p-1.5 bg-white border border-border-light rounded-2xl max-w-4xl mx-auto overflow-x-auto no-scrollbar" role="tablist" aria-label="App screens">
          {SCREENS.map((item) => {
            const Icon = item.icon;
            const selected = screen === item.key;
            return (
              <button
                key={item.key}
                role="tab"
                aria-selected={selected}
                aria-controls="showcase-panel"
                onClick={() => setScreen(item.key)}
                className={`flex-1 min-w-[150px] flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  selected ? 'bg-accent-emerald text-white font-semibold' : 'text-secondary-text hover:text-primary-text hover:bg-bg-warm'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span className="text-left leading-tight">
                  <span className="block font-bold">{item.label}</span>
                  <span className={`block text-xs ${selected ? 'text-white/85' : 'text-secondary-text'}`}>{item.desc}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="showcase-panel" role="tabpanel" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={screen} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 text-left">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-text leading-tight">{info.title}</h3>
                <p className="text-base text-secondary-text leading-relaxed">{info.body}</p>
                <p className="text-sm text-primary-text p-4 rounded-2xl bg-white border border-border-light">
                  <span className="font-semibold">Try it:</span> {info.try}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[360px] h-[700px] bg-[#0c0c0d] rounded-[52px] p-[10px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] border-4 border-[#2d2d30] overflow-hidden flex flex-col select-none">
              <div aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40" />

              <AnimatePresence>
                {toast && (
                  <motion.div
                    role="status"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className="absolute top-12 left-4 right-4 z-50 bg-primary-text text-white text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" aria-hidden="true" />
                    {toast}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 bg-white rounded-[42px] overflow-hidden pt-10 flex flex-col">
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 text-left">
                  {/* HOME */}
                  {screen === 'home' && (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-base font-bold text-primary-text">Good evening, Abhay</p>
                          <p className="text-[11px] text-secondary-text">Tuesday, 9 June</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-primary-text" aria-hidden="true" />
                          <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold" aria-hidden="true">
                            A
                          </span>
                        </div>
                      </div>

                      <div className="bg-accent-soft border border-emerald-100 rounded-2xl p-3 space-y-2">
                        <p className="text-xs font-bold text-accent-emerald flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                          No serious interactions in your medicines
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-secondary-text">Today</span>
                            <span className="font-bold text-primary-text">
                              {takenCount}/{doses.length} taken
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Doses taken today">
                            <div className="h-full bg-accent-emerald transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-primary-text">Today's medicines</p>
                        {doses.map((d) => {
                          const done = !!taken[d.id];
                          return (
                            <div key={d.id} className="bg-bg-warm border border-border-light rounded-xl p-2.5 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${done ? 'bg-accent-emerald text-white' : 'bg-accent-soft text-accent-emerald'}`}>
                                  <Pill className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-primary-text truncate">{d.name}</p>
                                  <p className="text-[11px] text-secondary-text">{d.time}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleDose(d.id)}
                                aria-pressed={done}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors flex-shrink-0 ${
                                  done ? 'bg-accent-emerald text-white' : 'bg-primary-text text-white hover:bg-accent-emerald'
                                }`}
                              >
                                {done ? 'Taken' : 'Take'}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setScreen('diet')}
                        className="w-full rounded-2xl p-3 text-white bg-primary-text flex items-center justify-between gap-2 text-left"
                      >
                        <span>
                          <span className="block text-xs font-bold">Your diet plan</span>
                          <span className="block text-[11px] opacity-80">Matched to your medicines</span>
                        </span>
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-primary-text">Quick actions</p>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {[
                            { icon: Camera, label: 'Scan' },
                            { icon: Upload, label: 'Report' },
                            { icon: MessageSquare, label: 'Chat' },
                            { icon: Mic, label: 'AI nurse' },
                          ].map(({ icon: Icon, label }) => (
                            <button
                              key={label}
                              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-bg-warm border border-border-light hover:bg-white transition-colors"
                            >
                              <span className="w-8 h-8 rounded-lg bg-accent-soft text-accent-emerald flex items-center justify-center">
                                <Icon className="w-4 h-4" aria-hidden="true" />
                              </span>
                              <span className="text-[11px] font-medium text-primary-text">{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* HISTORY */}
                  {screen === 'history' && (
                    <>
                      <p className="text-base font-bold text-primary-text">Health history</p>
                      <ol className="space-y-3 relative pl-4 border-l-2 border-border-light ml-1">
                        {[
                          {
                            id: '1',
                            dot: 'bg-accent-emerald',
                            badge: 'Mild · getting better',
                            badgeTone: 'text-accent-emerald bg-accent-soft',
                            when: 'Today, 10:30 AM',
                            title: 'Loose motions',
                            text: 'Loose motions and stomach cramps after eating street food.',
                            advice: ['Drink ORS through the day', 'Keep taking Pantoprazole before meals', 'See a doctor if there is blood or high fever'],
                          },
                          {
                            id: '2',
                            dot: 'bg-accent-amber',
                            badge: 'Moderate · watching',
                            badgeTone: 'text-amber-800 bg-amber-50',
                            when: '8 June, 8:15 PM',
                            title: 'Headache',
                            text: 'Headache and tiredness after poor sleep and long screen time.',
                            advice: ['Rest and drink water', 'Paracetamol is fine with your current medicines'],
                          },
                          {
                            id: '3',
                            dot: 'bg-slate-300',
                            badge: 'Resolved',
                            badgeTone: 'text-secondary-text bg-bg-warm',
                            when: '5 June',
                            title: 'Fever',
                            text: 'Better after two days of rest and paracetamol.',
                            advice: [],
                          },
                        ].map((e) => (
                          <li key={e.id} className="relative">
                            <span className={`absolute -left-[23px] top-2 w-3.5 h-3.5 rounded-full ${e.dot} border-2 border-white`} aria-hidden="true" />
                            <div className="bg-white border border-border-light rounded-xl p-3 space-y-1.5">
                              <div className="flex justify-between items-center gap-2">
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${e.badgeTone}`}>{e.badge}</span>
                                <span className="text-[11px] text-secondary-text">{e.when}</span>
                              </div>
                              <p className="text-sm font-bold text-primary-text">{e.title}</p>
                              <p className="text-xs text-secondary-text leading-snug">{e.text}</p>
                              {e.advice.length > 0 && (
                                <button
                                  onClick={() => setOpenEntry(openEntry === e.id ? null : e.id)}
                                  aria-expanded={openEntry === e.id}
                                  className="text-xs font-semibold text-accent-emerald hover:underline"
                                >
                                  {openEntry === e.id ? 'Hide details' : 'Details'}
                                </button>
                              )}
                              {openEntry === e.id && e.advice.length > 0 && (
                                <ul className="pt-2 border-t border-border-light text-xs text-secondary-text space-y-1">
                                  {e.advice.map((a) => (
                                    <li key={a}>• {a}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}

                  {/* INTERACTION */}
                  {screen === 'interaction' && (
                    <>
                      <p className="text-base font-bold text-primary-text">Interaction check</p>
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-1.5 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">Moderate</span>
                        <p className="text-sm font-bold text-primary-text">Cetirizine + Alprazolam</p>
                        <p className="text-xs text-amber-900">Taking these together can make you much sleepier than usual.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-bg-warm border border-border-light space-y-1">
                        <p className="text-xs font-bold text-primary-text flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
                          Why
                        </p>
                        <p className="text-xs text-secondary-text leading-snug">Both medicines cause drowsiness. Together, the effect adds up and can slow your reactions.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-bg-warm border border-border-light space-y-2">
                        <p className="text-xs font-bold text-primary-text">When to be careful</p>
                        <div className="grid grid-cols-4 gap-1" role="group" aria-label="Time of day">
                          {TIMES.map((t) => (
                            <button
                              key={t.h}
                              onClick={() => setHour(t.h)}
                              aria-pressed={hour === t.h}
                              className={`flex flex-col items-center px-1 py-1.5 rounded-lg text-[11px] transition-colors ${
                                hour === t.h ? 'bg-accent-emerald text-white font-bold' : 'bg-white text-secondary-text border border-border-light'
                              }`}
                            >
                              <span>{t.label}</span>
                              <span className="text-[10px] opacity-90">{t.note}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-primary-text leading-snug" aria-live="polite">
                          {TIME_ADVICE[hour]}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
                        <p className="text-xs font-bold text-accent-red flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                          Get help right away if you have
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {['Trouble breathing', 'Extreme drowsiness', 'Confusion'].map((s) => (
                            <span key={s} className="bg-white px-2 py-0.5 rounded border border-red-200 text-accent-red text-[11px] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* DIET */}
                  {screen === 'diet' && (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-base font-bold text-primary-text">Diet plan</p>
                        <span className="text-[11px] font-semibold text-secondary-text bg-bg-warm border border-border-light px-2 py-0.5 rounded-full">Acidity · Loose motions</span>
                      </div>
                      <p className="text-xs text-secondary-text">Based on your 2 medicines and current symptoms.</p>

                      <div className="bg-bg-warm p-1 rounded-xl border border-border-light flex text-xs font-bold text-secondary-text" role="group" aria-label="Diet list">
                        <button
                          onClick={() => setDietTab('eat')}
                          aria-pressed={dietTab === 'eat'}
                          className={`flex-1 py-1.5 rounded-lg transition-colors ${dietTab === 'eat' ? 'bg-accent-emerald text-white' : 'hover:text-primary-text'}`}
                        >
                          Eat ({EAT.length})
                        </button>
                        <button
                          onClick={() => setDietTab('limit')}
                          aria-pressed={dietTab === 'limit'}
                          className={`flex-1 py-1.5 rounded-lg transition-colors ${dietTab === 'limit' ? 'bg-accent-red text-white' : 'hover:text-primary-text'}`}
                        >
                          Limit ({LIMIT.length})
                        </button>
                      </div>

                      <ul className="space-y-1.5">
                        {(dietTab === 'eat' ? EAT : LIMIT).map((f) => (
                          <li
                            key={f.name}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${dietTab === 'eat' ? 'bg-white border-border-light' : 'bg-red-50/50 border-red-100'}`}
                          >
                            <div>
                              <p className="text-xs font-bold text-primary-text">{f.name}</p>
                              <p className={`text-[11px] ${dietTab === 'eat' ? 'text-secondary-text' : 'text-accent-red'}`}>{f.note}</p>
                            </div>
                            {dietTab === 'eat' ? (
                              <Check className="w-4 h-4 text-accent-emerald flex-shrink-0" aria-label="Recommended" />
                            ) : (
                              <X className="w-4 h-4 text-accent-red flex-shrink-0" aria-label="Limit" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Bottom navigation */}
                <nav className="h-14 bg-white border-t border-border-light flex items-center justify-around text-secondary-text" aria-label="App navigation">
                  {[
                    { key: 'home' as const, icon: Home, label: 'Home' },
                    { key: 'history' as const, icon: Activity, label: 'History' },
                    { key: 'interaction' as const, icon: ShieldAlert, label: 'Check' },
                    { key: 'diet' as const, icon: Apple, label: 'Diet' },
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setScreen(key)}
                      aria-current={screen === key ? 'page' : undefined}
                      className={`flex flex-col items-center text-[11px] transition-colors ${screen === key ? 'text-accent-emerald font-bold' : 'hover:text-primary-text'}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center text-[11px] hover:text-primary-text"
                    aria-label="Add medicine"
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    Add
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

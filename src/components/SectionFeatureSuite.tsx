'use client';
/**
 * "Inside the app" — interactive tour of Medhee mobile features that the rest
 * of the landing page doesn't cover: live doctor consults, the AI voice nurse,
 * prescription scanning, lab report chat and family profiles. Includes an
 * English / Hindi switch because the app itself ships both languages.
 */

import { useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, ScanLine, FileText, Users, Languages, CheckCircle2, MousePointerClick } from 'lucide-react';
import { COPY, type FeatureKey, type Lang } from './features/featureCopy';
import PhoneFrame from './features/PhoneFrame';
import ConsultDemo from './features/ConsultDemo';
import VoiceNurseDemo from './features/VoiceNurseDemo';
import ScanDemo from './features/ScanDemo';
import ReportChatDemo from './features/ReportChatDemo';
import FamilyDemo from './features/FamilyDemo';

const TABS: { key: FeatureKey; icon: typeof Video }[] = [
  { key: 'consult', icon: Video },
  { key: 'nurse', icon: Mic },
  { key: 'scan', icon: ScanLine },
  { key: 'report', icon: FileText },
  { key: 'family', icon: Users },
];

const LANGS: { key: Lang; label: string; name: string }[] = [
  { key: 'en', label: 'EN', name: 'English' },
  { key: 'hi', label: 'हिं', name: 'हिन्दी' },
];

export default function SectionFeatureSuite() {
  const [lang, setLang] = useState<Lang>('en');
  const [active, setActive] = useState<FeatureKey>('consult');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = COPY[lang];
  const info = c.info[active];

  // Arrow-key navigation for the tablist (WAI-ARIA tabs pattern)
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    if (next === -1) return;
    e.preventDefault();
    setActive(TABS[next].key);
    tabRefs.current[next]?.focus();
  };

  const renderDemo = () => {
    switch (active) {
      case 'consult':
        return <ConsultDemo lang={lang} />;
      case 'nurse':
        return <VoiceNurseDemo lang={lang} onNavigate={() => setActive('consult')} />;
      case 'scan':
        return <ScanDemo lang={lang} />;
      case 'report':
        return <ReportChatDemo lang={lang} />;
      case 'family':
        return <FamilyDemo lang={lang} />;
    }
  };

  return (
    <section
      id="features"
      lang={lang}
      aria-labelledby="features-heading"
      className="relative py-12 md:py-20 px-6 md:px-12 bg-white border-t border-border-light overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl text-left">
            <h2 id="features-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-tight">
              {c.suite.title} <br className="hidden sm:block" />
              <span className="text-accent-emerald">{c.suite.titleAccent}</span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-text font-light leading-relaxed">{c.suite.subtitle}</p>
          </div>

          {/* Language switch */}
          <div className="self-start md:self-auto flex items-center gap-2">
            <Languages className="w-4 h-4 text-secondary-text" aria-hidden="true" />
            <span className="text-xs font-medium text-secondary-text">{c.suite.langLabel}</span>
            <div role="group" aria-label={c.suite.langLabel} className="flex bg-bg-warm p-1 rounded-full border border-border-light">
              {LANGS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setLang(l.key)}
                  aria-pressed={lang === l.key}
                  aria-label={l.name}
                  className={`text-xs px-4 py-1.5 rounded-full font-semibold transition-all ${
                    lang === l.key ? 'bg-accent-emerald text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={c.suite.eyebrow}
          className="flex gap-2 p-1.5 bg-bg-warm border border-border-light rounded-2xl overflow-x-auto no-scrollbar"
        >
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            const selected = active === tab.key;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`feature-tab-${tab.key}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="feature-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.key)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`flex-1 min-w-[160px] flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent-emerald ${
                  selected ? 'bg-accent-emerald text-white shadow-sm' : 'text-secondary-text hover:text-primary-text hover:bg-white'
                }`}
              >
                <span className={`p-1.5 rounded-lg flex-shrink-0 ${selected ? 'bg-white/20' : 'bg-white border border-border-light'}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-left leading-tight min-w-0">
                  <span className="block font-bold truncate">{c.tabs[tab.key].label}</span>
                  <span className={`block text-[10px] truncate ${selected ? 'text-white/80' : 'text-secondary-text'}`}>{c.tabs[tab.key].short}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={`feature-tab-${active}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Explanation */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${lang}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 text-left"
              >
                <p className="text-sm font-medium text-accent-emerald">{c.suite.available}</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary-text leading-tight">{info.title}</h3>
                <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed">{info.body}</p>
                <ul className="space-y-2.5">
                  {info.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-primary-text">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-2xl bg-bg-warm border border-border-light flex items-start gap-3">
                  <MousePointerClick className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold text-primary-text">
                      {c.suite.howToTry} · <span className="font-medium text-secondary-text">{c.suite.tryHint}</span>
                    </p>
                    <p className="text-xs text-secondary-text mt-0.5">{info.try}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <PhoneFrame label={`${c.suite.demoLabel}: ${c.tabs[active].label}`}>
              {/* keyed by feature so each demo starts fresh; language changes keep state */}
              <div key={active} className="flex-1 flex flex-col min-h-0">
                {renderDemo()}
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Camera, Images, ScanLine, Check, Pill, ShieldCheck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { COPY, fmt, type Lang } from './featureCopy';

type Stage = 'ready' | 'scanning' | 'results' | 'added';

function Prescription({ lang }: { lang: Lang }) {
  const t = COPY[lang].scan;
  return (
    <div className="relative w-[230px] bg-[#FFFDF7] rounded-md shadow-xl p-4 rotate-[-2deg] text-left" aria-hidden="true">
      <div className="flex justify-between items-start border-b border-slate-300 pb-2 mb-2">
        <div>
          <p className="text-[10px] font-bold text-slate-800">{t.rx.clinic}</p>
          <p className="text-[10px] text-slate-500">{t.rx.patient}</p>
        </div>
        <p className="text-[10px] text-slate-500">{t.rx.date}</p>
      </div>
      <p className="font-display text-lg font-bold text-slate-700 leading-none mb-2">℞</p>
      <ol className="space-y-2 font-mono italic text-[10px] text-slate-700">
        {t.meds.map((m, i) => (
          <li key={m.name}>
            {i + 1}. {m.name}
            <span className="block text-[10px] not-italic text-slate-500 pl-3">{m.dose}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 pt-1 border-t border-dashed border-slate-300 text-right text-[10px] text-slate-400 italic">{t.rx.sign}</div>
    </div>
  );
}

export default function ScanDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang].scan;
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>('ready');
  const [selected, setSelected] = useState<boolean[]>(() => t.meds.map(() => true));

  useEffect(() => {
    if (stage !== 'scanning') return;
    const id = window.setTimeout(() => setStage('results'), 2300);
    return () => window.clearTimeout(id);
  }, [stage]);

  const selectedCount = selected.filter(Boolean).length;

  const startScan = () => {
    setSelected(t.meds.map(() => true));
    setStage('scanning');
  };

  const toggle = (i: number) => setSelected((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left">
      <div className="px-4 pt-2 pb-2 flex items-center gap-2 border-b border-border-light">
        <ScanLine className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
        <p className="text-xs font-bold text-primary-text">{t.title}</p>
      </div>

      {/* Camera viewfinder (ready + scanning) */}
      {(stage === 'ready' || stage === 'scanning') && (
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 bg-slate-900 flex items-center justify-center overflow-hidden">
            <Prescription lang={lang} />

            {/* Viewfinder corners */}
            <div className="absolute inset-8 pointer-events-none" aria-hidden="true">
              {['top-0 left-0 border-t-4 border-l-4 rounded-tl-xl', 'top-0 right-0 border-t-4 border-r-4 rounded-tr-xl', 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl', 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl'].map((c) => (
                <span key={c} className={`absolute w-7 h-7 border-emerald-400 ${c}`} />
              ))}
            </div>

            {stage === 'scanning' && (
              <>
                <motion.div
                  aria-hidden="true"
                  className="absolute left-8 right-8 h-[3px] bg-emerald-400 shadow-[0_0_16px_4px_rgba(52,211,153,0.6)]"
                  initial={{ top: '12%' }}
                  animate={reduceMotion ? { top: '50%' } : { top: ['12%', '86%', '12%'] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-emerald-400/5" aria-hidden="true" />
              </>
            )}
          </div>

          <div className="p-4 space-y-2 bg-white" aria-live="polite">
            {stage === 'ready' ? (
              <>
                <p className="text-[10px] text-secondary-text text-center">{t.hint}</p>
                <button
                  type="button"
                  onClick={startScan}
                  className="w-full py-2.5 rounded-full bg-accent-emerald hover:opacity-90 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" aria-hidden="true" />
                  {t.scanBtn}
                </button>
                <button
                  type="button"
                  onClick={startScan}
                  className="w-full py-2 rounded-full bg-white border border-border-light hover:bg-bg-warm text-primary-text text-[11px] font-semibold flex items-center justify-center gap-2"
                >
                  <Images className="w-4 h-4" aria-hidden="true" />
                  {t.galleryBtn}
                </button>
              </>
            ) : (
              <div className="py-3 flex items-center justify-center gap-2 text-[11px] font-semibold text-accent-emerald">
                <span className="w-4 h-4 rounded-full border-2 border-accent-soft border-t-accent-emerald animate-spin" aria-hidden="true" />
                {t.scanning}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results: review extracted medicines */}
      {stage === 'results' && (
        <div className="flex-1 flex flex-col p-4 gap-3 min-h-0">
          <div className="p-3 rounded-2xl bg-accent-soft border border-emerald-100">
            <p className="text-xs font-bold text-accent-emerald flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              {fmt(t.found, { n: t.meds.length })}
            </p>
            <p className="text-[10px] text-secondary-text mt-0.5">{t.review}</p>
          </div>

          <ul className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
            {t.meds.map((m, i) => (
              <li key={m.name}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={selected[i]}
                  onClick={() => toggle(i)}
                  className={`w-full p-3 rounded-2xl border flex items-center gap-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-emerald ${
                    selected[i] ? 'border-accent-emerald bg-white' : 'border-border-light bg-bg-warm opacity-70'
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl bg-accent-soft text-accent-emerald flex items-center justify-center flex-shrink-0">
                    <Pill className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-primary-text">{m.name}</span>
                    <span className="block text-[10px] text-secondary-text">{m.dose}</span>
                  </span>
                  <span
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                      selected[i] ? 'bg-accent-emerald border-accent-emerald text-white' : 'border-slate-300'
                    }`}
                    aria-hidden="true"
                  >
                    {selected[i] && <Check className="w-3 h-3" />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={() => setStage('added')}
            className="w-full py-2.5 rounded-full bg-primary-text hover:bg-accent-emerald disabled:opacity-40 disabled:hover:bg-primary-text text-white text-xs font-bold transition-colors"
          >
            {selectedCount === 0 ? t.selectAtLeast : fmt(t.add, { n: selectedCount })}
          </button>
        </div>
      )}

      {/* Added confirmation */}
      {stage === 'added' && (
        <div className="flex-1 flex flex-col p-5 gap-4 items-center justify-center text-center" aria-live="polite">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center"
          >
            <CheckCircle2 className="w-9 h-9 text-accent-emerald" aria-hidden="true" />
          </motion.span>
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary-text">{t.added}</p>
            <p className="text-[11px] text-secondary-text leading-snug">{t.addedSub}</p>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-accent-soft text-accent-emerald flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            {t.safe}
          </span>
          <ul className="w-full space-y-1.5">
            {t.meds
              .filter((_, i) => selected[i])
              .map((m) => (
                <li key={m.name} className="p-2 rounded-xl bg-bg-warm border border-border-light text-left">
                  <p className="text-[11px] font-bold text-primary-text">{m.name}</p>
                  <p className="text-[10px] text-secondary-text">{m.dose}</p>
                </li>
              ))}
          </ul>
          <button
            type="button"
            onClick={() => setStage('ready')}
            className="px-5 py-2 rounded-full bg-white border border-border-light hover:bg-bg-warm text-primary-text text-[11px] font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            {t.again}
          </button>
        </div>
      )}
    </div>
  );
}

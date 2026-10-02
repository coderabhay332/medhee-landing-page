'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mic, PhoneOff, AlertTriangle, CheckCircle2, RotateCcw, Stethoscope, Phone } from 'lucide-react';
import { COPY, type Lang, type Scenario } from './featureCopy';

type Stage = 'idle' | 'connecting' | 'talking' | 'result';

// Deterministic bar heights (no Math.random → no hydration mismatch)
const BARS = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.45, 0.85, 0.55, 0.95, 0.4, 0.65];

function Waveform({ active, tone }: { active: boolean; tone: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-center justify-center gap-[3px] h-10" aria-hidden="true">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className={`w-[4px] rounded-full ${tone}`}
          style={{ height: `${h * 100}%`, originY: 0.5 }}
          animate={active && !reduceMotion ? { scaleY: [0.35, 1, 0.5, 0.85, 0.35] } : { scaleY: active ? 1 : 0.25 }}
          transition={active && !reduceMotion ? { duration: 1 + (i % 4) * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
}

export default function VoiceNurseDemo({ lang, onNavigate }: { lang: Lang; onNavigate: () => void }) {
  const t = COPY[lang].nurse;
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [stage, setStage] = useState<Stage>('idle');
  const [shown, setShown] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const script = t.scripts[scenario];
  const lastLine = shown > 0 ? script[shown - 1] : null;

  // Connecting → talking
  useEffect(() => {
    if (stage !== 'connecting') return;
    const id = window.setTimeout(() => {
      setStage('talking');
      setShown(1);
    }, 1300);
    return () => window.clearTimeout(id);
  }, [stage]);

  // Play the conversation line by line, then show the assessment
  useEffect(() => {
    if (stage !== 'talking') return;
    const done = shown >= script.length;
    const id = window.setTimeout(
      () => (done ? setStage('result') : setShown((s) => s + 1)),
      done ? 1100 : 1800,
    );
    return () => window.clearTimeout(id);
  }, [stage, shown, script.length]);

  useEffect(() => {
    const box = transcriptRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [shown, stage]);

  const start = () => {
    setShown(0);
    setStage('connecting');
  };
  const reset = () => {
    setShown(0);
    setStage('idle');
  };

  const nurseSpeaking = stage === 'talking' && lastLine?.from === 'nurse';

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left bg-white">
      {/* Header */}
      <div className="px-4 pt-2 pb-3 flex items-center gap-2 border-b border-border-light">
        <span className="w-8 h-8 rounded-full bg-accent-emerald text-white flex items-center justify-center">
          <Stethoscope className="w-4 h-4" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold text-primary-text">{t.title}</p>
          <p className="text-[10px] text-secondary-text" aria-live="polite">
            {stage === 'idle' && t.idle}
            {stage === 'connecting' && t.connecting}
            {stage === 'talking' && (nurseSpeaking ? t.speaking : t.listening)}
            {stage === 'result' && t.saved}
          </p>
        </div>
      </div>

      {/* Idle: pick scenario + connect */}
      {stage === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-5 text-center">
          <button
            type="button"
            onClick={start}
            aria-label={t.connect}
            className="relative w-28 h-28 rounded-full bg-accent-emerald text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent-emerald/40"
          >
            <span className="absolute inset-0 rounded-full ring-8 ring-accent-emerald/15" aria-hidden="true" />
            <Mic className="w-10 h-10" />
          </button>

          <fieldset className="w-full space-y-2">
            <legend className="text-[11px] font-semibold text-secondary-text mb-2 mx-auto">{t.scenarioLabel}</legend>
            <div className="flex flex-col gap-2">
              {(Object.keys(t.scenarios) as Scenario[]).map((s) => (
                <label
                  key={s}
                  className={`cursor-pointer px-3 py-2 rounded-xl border text-[11px] font-semibold flex items-center gap-2 transition-colors ${
                    scenario === s
                      ? s === 'emergency'
                        ? 'border-accent-red bg-red-50 text-accent-red'
                        : 'border-accent-emerald bg-accent-soft text-accent-emerald'
                      : 'border-border-light bg-white text-primary-text hover:bg-bg-warm'
                  }`}
                >
                  <input
                    type="radio"
                    name="nurse-scenario"
                    value={s}
                    checked={scenario === s}
                    onChange={() => setScenario(s)}
                    className="accent-teal-600"
                  />
                  {t.scenarios[s]}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={start}
            className="w-full py-2.5 rounded-full bg-primary-text hover:bg-accent-emerald text-white text-xs font-bold transition-colors"
          >
            {t.connect}
          </button>
        </div>
      )}

      {/* Connecting */}
      {stage === 'connecting' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <span className="w-12 h-12 rounded-full border-4 border-accent-soft border-t-accent-emerald animate-spin" aria-hidden="true" />
          <p className="text-[11px] text-secondary-text">{t.connecting}</p>
        </div>
      )}

      {/* Talking + result */}
      {(stage === 'talking' || stage === 'result') && (
        <div className="flex-1 flex flex-col min-h-0">
          {stage === 'talking' && (
            <div className="py-4 flex flex-col items-center gap-2">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                  nurseSpeaking ? 'bg-accent-emerald' : 'bg-primary-text'
                }`}
              >
                <Waveform active tone="bg-white" />
              </div>
              <p className="text-[10px] font-semibold text-secondary-text">
                {nurseSpeaking ? t.speaking : t.listening}
              </p>
            </div>
          )}

          <div ref={transcriptRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 space-y-2" aria-live="polite">
            <AnimatePresence initial={false}>
              {script.slice(0, shown).map((line, i) => (
                <motion.div
                  key={`${scenario}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${line.from === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[82%]">
                    <p className={`text-[10px] font-bold mb-0.5 ${line.from === 'you' ? 'text-right text-secondary-text' : 'text-accent-emerald'}`}>
                      {line.from === 'you' ? t.youLabel : t.nurseLabel}
                    </p>
                    <p
                      className={`text-[11px] leading-snug px-3 py-2 rounded-2xl ${
                        line.from === 'you'
                          ? 'bg-primary-text text-white rounded-br-sm'
                          : 'bg-white border border-border-light text-primary-text rounded-bl-sm'
                      }`}
                    >
                      {line.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {stage === 'result' && scenario === 'normal' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-primary-text flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" aria-hidden="true" />
                    {t.resultNormal.title}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {t.resultNormal.level}
                  </span>
                </div>
                <ul className="space-y-1">
                  {t.resultNormal.points.map((p) => (
                    <li key={p} className="text-[10px] text-secondary-text flex gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onNavigate}
                  className="w-full py-2 rounded-full bg-accent-emerald hover:opacity-90 text-white text-[11px] font-bold flex items-center justify-center gap-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.resultNormal.cta}
                </button>
              </motion.div>
            )}

            {stage === 'result' && scenario === 'emergency' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 p-3 rounded-2xl bg-red-50 border-2 border-accent-red space-y-2"
              >
                <p className="text-xs font-bold text-accent-red flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  {t.resultEmergency.title}
                </p>
                <p className="text-[10px] text-primary-text leading-snug">{t.resultEmergency.body}</p>
                {/* Deliberately not a tel: link — this is a marketing demo */}
                <div className="w-full py-2 rounded-full bg-accent-red text-white text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.resultEmergency.cta}
                  <span className="text-[10px] font-medium opacity-80">({t.resultEmergency.demoNote})</span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-3 border-t border-border-light space-y-2">
            {stage === 'talking' ? (
              <button
                type="button"
                onClick={reset}
                className="w-full py-2 rounded-full bg-red-50 border border-red-100 text-accent-red text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-red-100"
              >
                <PhoneOff className="w-3.5 h-3.5" aria-hidden="true" />
                {t.end}
              </button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="w-full py-2 rounded-full bg-white border border-border-light text-primary-text text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-bg-warm"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                {t.restart}
              </button>
            )}
            <p className="text-[10px] text-secondary-text text-center">{t.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

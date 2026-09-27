'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FileText, UploadCloud, Sparkles, Send, RotateCcw } from 'lucide-react';
import { COPY, type Lang, type LabStatus } from './featureCopy';

type Stage = 'upload' | 'processing' | 'ready';
// Messages reference copy by index so switching language re-renders them.
type Msg =
  | { from: 'me'; suggestion: number }
  | { from: 'me'; text: string }
  | { from: 'ai'; answer: number | 'fallback' };

const STATUS_STYLE: Record<LabStatus, string> = {
  low: 'bg-amber-50 text-amber-800 border-amber-200',
  high: 'bg-red-50 text-accent-red border-red-200',
  normal: 'bg-accent-soft text-accent-emerald border-emerald-100',
};

export default function ReportChatDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang].report;
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>('upload');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | null>(null);

  useEffect(() => {
    if (stage !== 'processing') return;
    const id = window.setTimeout(() => setStage('ready'), 1900);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => () => {
    if (replyTimer.current) window.clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    const box = chatRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [msgs, typing]);

  const reply = (answer: number | 'fallback') => {
    setTyping(true);
    replyTimer.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'ai', answer }]);
    }, 1300);
  };

  const ask = (i: number) => {
    if (typing) return;
    setMsgs((m) => [...m, { from: 'me', suggestion: i }]);
    reply(i);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim().slice(0, 200);
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: 'me', text }]);
    setInput('');
    reply('fallback');
  };

  const reset = () => {
    if (replyTimer.current) window.clearTimeout(replyTimer.current);
    setMsgs([]);
    setTyping(false);
    setInput('');
    setStage('upload');
  };

  const askedSet = new Set(msgs.flatMap((m) => ('suggestion' in m ? [m.suggestion] : [])));

  return (
    <div className="flex-1 flex flex-col min-h-0 text-left">
      <div className="px-4 pt-2 pb-2 flex items-center gap-2 border-b border-border-light">
        <FileText className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
        <p className="text-xs font-bold text-primary-text flex-1">{stage === 'ready' ? t.askTitle : t.uploadTitle}</p>
        {stage === 'ready' && (
          <button
            type="button"
            onClick={reset}
            aria-label={t.newReport}
            title={t.newReport}
            className="p-1 rounded-full hover:bg-bg-warm text-secondary-text"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Upload */}
      {stage === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4">
          <div className="w-full p-6 rounded-3xl border-2 border-dashed border-accent-emerald/40 bg-accent-soft/40 flex flex-col items-center gap-3 text-center">
            <span className="w-14 h-14 rounded-2xl bg-white border border-border-light flex items-center justify-center">
              <UploadCloud className="w-7 h-7 text-accent-emerald" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold text-primary-text">{t.uploadTitle}</p>
            <p className="text-[10px] text-secondary-text">{t.uploadSub}</p>
          </div>
          <button
            type="button"
            onClick={() => setStage('processing')}
            className="w-full py-2.5 rounded-full bg-accent-emerald hover:opacity-90 text-white text-xs font-bold"
          >
            {t.uploadBtn}
          </button>
        </div>
      )}

      {/* Processing */}
      {stage === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4" aria-live="polite">
          <FileText className="w-10 h-10 text-accent-emerald" aria-hidden="true" />
          <p className="text-[11px] font-semibold text-primary-text">{t.processing}</p>
          <div className="w-full h-1.5 bg-accent-soft rounded-full overflow-hidden" aria-hidden="true">
            <motion.div
              className="h-full bg-accent-emerald rounded-full"
              initial={{ width: reduceMotion ? '100%' : '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 1.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* Ready: values + chat */}
      {stage === 'ready' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div ref={chatRef} className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2 bg-bg-warm" aria-live="polite">
            <div className="p-3 rounded-2xl bg-white border border-border-light space-y-2">
              <p className="text-[10px] font-bold text-primary-text">{t.reportName}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {t.values.map((v) => (
                  <div key={v.name} className={`p-2 rounded-xl border ${STATUS_STYLE[v.status]}`}>
                    <p className="text-[10px] font-semibold truncate">{v.name}</p>
                    <p className="text-[11px] font-bold">{v.value}</p>
                    <p className="text-[10px] font-bold uppercase">{t.status[v.status]}</p>
                  </div>
                ))}
              </div>
            </div>

            {msgs.map((m, i) => {
              if (m.from === 'me') {
                const text = 'suggestion' in m ? t.suggestions[m.suggestion] : m.text;
                return (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[80%] text-[11px] px-3 py-2 rounded-2xl rounded-br-sm bg-primary-text text-white">{text}</p>
                  </div>
                );
              }
              const text = m.answer === 'fallback' ? t.fallback : t.answers[m.answer];
              return (
                <div key={i} className="flex justify-start gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-accent-emerald text-white flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <p className="max-w-[80%] text-[11px] leading-snug whitespace-pre-line px-3 py-2 rounded-2xl rounded-bl-sm bg-white border border-border-light text-primary-text">
                    {text}
                  </p>
                </div>
              );
            })}

            {typing && (
              <p className="text-[10px] text-accent-emerald font-medium flex items-center gap-1.5 pl-1">
                <span className="w-3 h-3 rounded-full border-2 border-accent-soft border-t-accent-emerald animate-spin" aria-hidden="true" />
                {t.typing}
              </p>
            )}
          </div>

          <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto no-scrollbar">
            {t.suggestions.map((q, i) => (
              <button
                key={q}
                type="button"
                disabled={typing}
                onClick={() => ask(i)}
                className={`flex-shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border transition-colors disabled:opacity-50 ${
                  askedSet.has(i)
                    ? 'border-border-light text-secondary-text bg-bg-warm'
                    : 'border-accent-emerald/40 text-accent-emerald bg-white hover:bg-accent-soft'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-3 pb-1 flex gap-2">
            <label htmlFor="report-chat-input" className="sr-only">
              {t.placeholder}
            </label>
            <input
              id="report-chat-input"
              type="text"
              value={input}
              maxLength={200}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 min-w-0 text-[11px] px-3 py-2 rounded-full border border-border-light bg-white outline-none focus:border-accent-emerald"
            />
            <button
              type="submit"
              aria-label={t.send}
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-full bg-accent-emerald text-white flex items-center justify-center disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-secondary-text text-center pb-2">{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

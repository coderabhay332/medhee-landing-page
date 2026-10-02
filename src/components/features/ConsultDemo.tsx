'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  PhoneCall,
  Volume2,
  VolumeX,
  MessageCircle,
  Star,
  ShieldCheck,
  Send,
  CheckCircle2,
  X,
} from 'lucide-react';
import { COPY, fmt, type DoctorId, type Lang } from './featureCopy';

type Phase = 'list' | 'waiting' | 'call' | 'ended';
type Mode = 'video' | 'voice' | 'chat';
type Msg = { from: 'me'; text: string } | { from: 'doctor'; reply: number };

const DOCTORS: { id: DoctorId; initials: string; rating: number; available: boolean; tone: string }[] = [
  { id: 'd1', initials: 'AR', rating: 4.9, available: true, tone: 'bg-teal-100 text-teal-800' },
  { id: 'd2', initials: 'VS', rating: 4.8, available: true, tone: 'bg-sky-100 text-sky-800' },
  { id: 'd3', initials: 'MI', rating: 4.7, available: false, tone: 'bg-rose-100 text-rose-800' },
];

const MODE_ICONS: Record<Mode, typeof Video> = { video: Video, voice: PhoneCall, chat: MessageCircle };

function formatTime(total: number) {
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = (total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function CallControl({
  label,
  onClick,
  pressed,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={pressed}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          danger
            ? 'bg-accent-red hover:bg-red-700 text-white'
            : pressed
              ? 'bg-white text-slate-900'
              : 'bg-white/15 hover:bg-white/25 text-white'
        }`}
      >
        {children}
      </button>
      <span className="text-[10px] text-white/80">{label}</span>
    </div>
  );
}

export default function ConsultDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang].consult;
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('list');
  const [pickerFor, setPickerFor] = useState<DoctorId | null>(null);
  const [doctorId, setDoctorId] = useState<DoctorId>('d1');
  const [mode, setMode] = useState<Mode>('video');
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [rating, setRating] = useState(0);

  const timers = useRef<number[]>([]);
  const replyIdx = useRef(0);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  // Call duration timer
  useEffect(() => {
    if (phase !== 'call') return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  // Keep the latest chat message in view (scroll the chat box only, never the page)
  useEffect(() => {
    const box = chatBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [msgs, typing]);

  const doctor = DOCTORS.find((d) => d.id === doctorId) ?? DOCTORS[0];
  const doctorName = t.doctors[doctorId].name;

  const startConsult = (id: DoctorId, m: Mode) => {
    clearTimers();
    setDoctorId(id);
    setMode(m);
    setPickerFor(null);
    setPhase('waiting');
    setSeconds(0);
    setMuted(false);
    setCamOff(false);
    setSpeakerOn(true);
    setMsgs([]);
    setTyping(false);
    setRating(0);
    replyIdx.current = 0;
    later(() => {
      setPhase('call');
      if (m === 'chat') setMsgs([{ from: 'doctor', reply: -1 }]);
    }, 2200);
  };

  const backToList = () => {
    clearTimers();
    setPhase('list');
    setTyping(false);
  };

  const endCall = () => {
    clearTimers();
    setTyping(false);
    setPhase('ended');
  };

  const sendText = (raw: string) => {
    const text = raw.trim().slice(0, 200);
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: 'me', text }]);
    setInput('');
    setTyping(true);
    const idx = replyIdx.current % t.chatReplies.length;
    replyIdx.current += 1;
    later(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'doctor', reply: idx }]);
    }, 1400);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendText(input);
  };

  const doctorText = (reply: number) =>
    reply === -1 ? fmt(t.chatGreeting, { name: doctorName }) : t.chatReplies[reply];

  const pulse = reduceMotion
    ? {}
    : { animate: { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }, transition: { duration: 2, repeat: Infinity } };

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden text-left">
      {/* ───────── Doctor list ───────── */}
      {phase === 'list' && (
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-y-auto no-scrollbar">
          <div>
            <h3 className="text-sm font-bold text-primary-text">{t.header}</h3>
            <p className="text-[10px] text-secondary-text">{t.sub}</p>
          </div>

          <div className="flex items-start gap-1.5 p-2.5 rounded-xl bg-accent-soft border border-emerald-100 text-[10px] text-accent-emerald font-medium">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 mt-px" aria-hidden="true" />
            <span>{t.sharedNote}</span>
          </div>

          <ul className="space-y-2">
            {DOCTORS.map((d) => {
              const info = t.doctors[d.id];
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    disabled={!d.available}
                    onClick={() => setPickerFor(d.id)}
                    className="w-full p-3 rounded-2xl border border-border-light bg-white hover:border-accent-emerald hover:shadow-sm disabled:opacity-55 disabled:hover:border-border-light disabled:hover:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-accent-emerald"
                  >
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold ${d.tone}`} aria-hidden="true">
                      {d.initials}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-primary-text truncate">{info.name}</span>
                      <span className="block text-[10px] text-secondary-text truncate">{info.spec}</span>
                      <span className="flex items-center gap-1 text-[10px] text-secondary-text mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                        {d.rating}
                      </span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        d.available ? 'bg-accent-soft text-accent-emerald' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {d.available ? `● ${t.available}` : t.busy}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="text-[10px] text-secondary-text text-center mt-auto">{t.pickHint}</p>
        </div>
      )}

      {/* Mode picker bottom sheet */}
      <AnimatePresence>
        {phase === 'list' && pickerFor && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black/35 flex items-end"
            onClick={() => setPickerFor(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.chooseMode}
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-primary-text">{t.chooseMode}</p>
                <button
                  type="button"
                  onClick={() => setPickerFor(null)}
                  aria-label={t.cancel}
                  className="p-1 rounded-full hover:bg-bg-warm text-secondary-text"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-secondary-text">{t.doctors[pickerFor].name}</p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(t.modes) as Mode[]).map((m) => {
                  const Icon = MODE_ICONS[m];
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => startConsult(pickerFor, m)}
                      className="p-2.5 rounded-2xl border border-border-light hover:border-accent-emerald hover:bg-accent-soft/50 transition-colors flex flex-col items-center gap-1.5 text-center focus-visible:outline-2 focus-visible:outline-accent-emerald"
                    >
                      <span className="w-9 h-9 rounded-full bg-accent-soft text-accent-emerald flex items-center justify-center">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold text-primary-text leading-tight">{t.modes[m].label}</span>
                      <span className="text-[10px] text-secondary-text leading-tight">{t.modes[m].desc}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── Waiting room ───────── */}
      {phase === 'waiting' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6 text-center bg-white" aria-live="polite">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.span className="absolute inset-0 rounded-full bg-accent-emerald/30" {...pulse} aria-hidden="true" />
            <span className={`relative w-20 h-20 rounded-full flex items-center justify-center text-lg font-bold ${doctor.tone}`} aria-hidden="true">
              {doctor.initials}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary-text">{fmt(t.waiting, { name: doctorName })}</p>
            <p className="text-[10px] text-accent-emerald font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              {t.sharedContext}
            </p>
          </div>
          <div className="w-full p-3 rounded-2xl bg-white border border-border-light space-y-2">
            <p className="text-[10px] text-secondary-text">{t.doctorSees}</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {t.contextChips.map((chip) => (
                <span key={chip} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-bg-warm border border-border-light text-primary-text">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={backToList}
            className="text-[11px] font-semibold text-secondary-text hover:text-accent-red px-4 py-1.5 rounded-full border border-border-light bg-white"
          >
            {t.cancel}
          </button>
        </div>
      )}

      {/* ───────── Video / voice call ───────── */}
      {phase === 'call' && mode !== 'chat' && (
        <div className="flex-1 relative flex flex-col bg-slate-900 text-white">
          <div className="flex items-center justify-between px-4 pt-2">
            <div>
              <p className="text-xs font-bold">{doctorName}</p>
              <p className="text-[10px] text-white/70 font-mono">{formatTime(seconds)}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              ● {t.connected}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {mode === 'voice' && speakerOn && (
              <motion.span className="absolute w-36 h-36 rounded-full bg-emerald-400/20" {...pulse} aria-hidden="true" />
            )}
            <span
              className={`relative flex items-center justify-center font-bold ${doctor.tone} ${
                mode === 'video' ? 'w-32 h-32 rounded-3xl text-3xl' : 'w-28 h-28 rounded-full text-2xl'
              }`}
              aria-hidden="true"
            >
              {doctor.initials}
            </span>

            {mode === 'video' && (
              <div className="absolute top-3 right-3 w-20 h-28 rounded-xl bg-slate-600 border border-white/20 flex flex-col items-center justify-center gap-1 text-[10px] text-white/80">
                {camOff ? (
                  <>
                    <VideoOff className="w-4 h-4" aria-hidden="true" />
                    <span>{t.cameraOff}</span>
                  </>
                ) : (
                  <>
                    <span className="w-9 h-9 rounded-full bg-slate-400" aria-hidden="true" />
                    <span>{t.you}</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mx-4 mb-3 p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
            <p className="text-[10px] text-white/60 mb-1">{t.doctorSees}</p>
            <div className="flex flex-wrap gap-1">
              {t.contextChips.map((chip) => (
                <span key={chip} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/15">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-center gap-4 pb-5">
            <CallControl label={muted ? t.unmute : t.mute} pressed={muted} onClick={() => setMuted((v) => !v)}>
              {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </CallControl>
            {mode === 'video' && (
              <CallControl label={t.camera} pressed={camOff} onClick={() => setCamOff((v) => !v)}>
                {camOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </CallControl>
            )}
            <CallControl label={t.speaker} pressed={!speakerOn} onClick={() => setSpeakerOn((v) => !v)}>
              {speakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </CallControl>
            <CallControl label={t.end} danger onClick={endCall}>
              <PhoneOff className="w-5 h-5" />
            </CallControl>
          </div>
        </div>
      )}

      {/* ───────── Chat consult ───────── */}
      {phase === 'call' && mode === 'chat' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border-light">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${doctor.tone}`} aria-hidden="true">
              {doctor.initials}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-primary-text truncate">{doctorName}</p>
              <p className="text-[10px] text-accent-emerald">{typing ? t.typing : `● ${t.connected}`}</p>
            </div>
            <button
              type="button"
              onClick={endCall}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-accent-red border border-red-100 hover:bg-red-100"
            >
              {t.end}
            </button>
          </div>

          <div ref={chatBoxRef} className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2 bg-bg-warm scroll-smooth" aria-live="polite">
            {msgs.map((m, i) =>
              m.from === 'me' ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[80%] text-[11px] leading-snug px-3 py-2 rounded-2xl rounded-br-sm bg-accent-emerald text-white">{m.text}</p>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <p className="max-w-[80%] text-[11px] leading-snug px-3 py-2 rounded-2xl rounded-bl-sm bg-white border border-border-light text-primary-text">
                    {doctorText(m.reply)}
                  </p>
                </div>
              ),
            )}
            {typing && (
              <div className="flex justify-start" aria-label={t.typing}>
                <span className="px-3 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-border-light flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-secondary-text/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto no-scrollbar">
            {t.chatQuick.map((q) => (
              <button
                key={q}
                type="button"
                disabled={typing}
                onClick={() => sendText(q)}
                className="flex-shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border border-accent-emerald/40 text-accent-emerald bg-white hover:bg-accent-soft disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-3 flex gap-2">
            <label htmlFor="consult-chat-input" className="sr-only">
              {t.chatPlaceholder}
            </label>
            <input
              id="consult-chat-input"
              type="text"
              value={input}
              maxLength={200}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatPlaceholder}
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
        </div>
      )}

      {/* ───────── Ended ───────── */}
      {phase === 'ended' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-accent-emerald" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary-text">{t.ended}</p>
            <p className="text-[11px] text-secondary-text">{t.endedSub}</p>
            {mode !== 'chat' && <p className="text-[10px] font-mono text-secondary-text">{formatTime(seconds)}</p>}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-primary-text">{t.rate}</p>
            <div className="flex gap-1 justify-center" role="group" aria-label={t.rate}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={fmt(t.star, { n })}
                  aria-pressed={rating === n}
                  className="p-0.5 rounded focus-visible:outline-2 focus-visible:outline-accent-emerald"
                >
                  <Star className={`w-6 h-6 transition-colors ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
            <p className="text-[10px] text-accent-emerald h-4" aria-live="polite">
              {rating > 0 ? t.thanks : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={backToList}
            className="px-5 py-2 rounded-full bg-primary-text hover:bg-accent-emerald text-white text-[11px] font-bold transition-colors"
          >
            {t.back}
          </button>
        </div>
      )}
    </div>
  );
}

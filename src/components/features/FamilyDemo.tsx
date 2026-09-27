'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, Pill, Check, ShieldCheck, ScanLine, X } from 'lucide-react';
import { COPY, fmt, type Lang, type MemberId } from './featureCopy';

type Member = { id: string; preset?: MemberId; custom?: { name: string; relation: number } };

const PRESET: Member[] = [
  { id: 'me', preset: 'me' },
  { id: 'mom', preset: 'mom' },
  { id: 'papa', preset: 'papa' },
  { id: 'kid', preset: 'kid' },
];

const TONES = ['bg-teal-100 text-teal-800', 'bg-rose-100 text-rose-800', 'bg-sky-100 text-sky-800', 'bg-amber-100 text-amber-800', 'bg-violet-100 text-violet-800'];

export default function FamilyDemo({ lang }: { lang: Lang }) {
  const t = COPY[lang].family;
  const [members, setMembers] = useState<Member[]>(PRESET);
  const [activeId, setActiveId] = useState('me');
  const [taken, setTaken] = useState<Record<string, boolean>>({ 'papa-0': true });
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState(0);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(id);
  }, [toast]);

  const nameOf = (m: Member) => (m.preset ? t.members[m.preset].name : m.custom?.name ?? '');
  const relationOf = (m: Member) => (m.preset ? t.members[m.preset].relation : t.relations[m.custom?.relation ?? 0]);
  const medsOf = (m: Member) => (m.preset ? t.meds[m.preset] : []);

  const active = members.find((m) => m.id === activeId) ?? members[0];
  const activeIdx = members.indexOf(active);
  const meds = medsOf(active);
  const takenCount = meds.filter((_, i) => taken[`${active.id}-${i}`]).length;
  const pct = meds.length ? Math.round((takenCount / meds.length) * 100) : 0;

  const toggleDose = (i: number) => {
    const key = `${active.id}-${i}`;
    setTaken((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addMember = (e: FormEvent) => {
    e.preventDefault();
    const clean = name.trim().slice(0, 20);
    if (!clean) {
      setError(true);
      return;
    }
    const id = `custom-${members.length}`;
    setMembers((prev) => [...prev, { id, custom: { name: clean, relation } }]);
    setActiveId(id);
    setAdding(false);
    setName('');
    setRelation(0);
    setError(false);
    setToast(fmt(t.addedToast, { name: clean }));
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0 text-left">
      <div className="px-4 pt-2 pb-2 flex items-center gap-2 border-b border-border-light">
        <Users className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
        <p className="text-xs font-bold text-primary-text flex-1">{t.title}</p>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-soft text-accent-emerald border border-emerald-100 hover:bg-emerald-50 flex items-center gap-1"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          {t.add}
        </button>
      </div>

      {/* Member switcher */}
      <div className="px-3 py-3 flex gap-3 overflow-x-auto no-scrollbar" role="group" aria-label={t.title}>
        {members.map((m, i) => {
          const isActive = m.id === active.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveId(m.id)}
              aria-pressed={isActive}
              className="flex-shrink-0 flex flex-col items-center gap-1 w-14 focus-visible:outline-2 focus-visible:outline-accent-emerald rounded-xl"
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${TONES[i % TONES.length]} ${
                  isActive ? 'ring-2 ring-accent-emerald ring-offset-2' : 'opacity-75'
                }`}
                aria-hidden="true"
              >
                {nameOf(m).charAt(0).toUpperCase()}
              </span>
              <span className={`text-[10px] truncate w-full text-center ${isActive ? 'font-bold text-primary-text' : 'text-secondary-text'}`}>
                {nameOf(m)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active profile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col px-4 pb-4 gap-3 min-h-0 overflow-y-auto no-scrollbar"
          aria-live="polite"
        >
          <div className="p-3 rounded-2xl bg-bg-warm border border-border-light space-y-2">
            <div className="flex items-center gap-2.5">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${TONES[activeIdx % TONES.length]}`} aria-hidden="true">
                {nameOf(active).charAt(0).toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-primary-text truncate">
                  {active.id === 'me' ? t.viewingSelf : fmt(t.viewing, { name: nameOf(active) })}
                </p>
                <p className="text-[10px] text-secondary-text">{relationOf(active)}</p>
              </div>
            </div>
            {meds.length > 0 && (
              <>
                <span className="inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-soft text-accent-emerald items-center gap-1">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  {t.safe}
                </span>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-secondary-text">{t.todaysMeds}</span>
                    <span className="font-bold text-primary-text">{fmt(t.progress, { taken: takenCount, total: meds.length })}</span>
                  </div>
                  <div
                    className="w-full h-1.5 bg-accent-soft rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label={t.todaysMeds}
                  >
                    <div className="h-full bg-accent-emerald rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </>
            )}
          </div>

          {meds.length > 0 ? (
            <ul className="space-y-2">
              {meds.map((med, i) => {
                const done = !!taken[`${active.id}-${i}`];
                return (
                  <li key={med.name} className="p-2.5 rounded-2xl border border-border-light bg-white flex items-center gap-2.5">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        done ? 'bg-accent-emerald text-white' : 'bg-accent-soft text-accent-emerald'
                      }`}
                    >
                      <Pill className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-primary-text truncate">{med.name}</p>
                      <p className="text-[10px] text-secondary-text">{med.time}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDose(i)}
                      aria-pressed={done}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                        done ? 'bg-accent-emerald text-white' : 'bg-primary-text text-white hover:bg-accent-emerald'
                      }`}
                    >
                      {done && <Check className="w-3 h-3" aria-hidden="true" />}
                      {done ? t.taken : t.markTaken}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 p-4 rounded-2xl border border-dashed border-border-light">
              <ScanLine className="w-8 h-8 text-accent-emerald" aria-hidden="true" />
              <p className="text-xs font-bold text-primary-text">{t.noMeds}</p>
              <p className="text-[10px] text-secondary-text">{t.noMedsSub}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 z-20 bg-primary-text text-white text-[11px] px-3 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add member sheet */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/35 flex items-end"
            onClick={() => setAdding(false)}
          >
            <motion.form
              role="dialog"
              aria-modal="true"
              aria-label={t.addTitle}
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={addMember}
              className="w-full bg-white rounded-t-3xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-primary-text">{t.addTitle}</p>
                <button type="button" onClick={() => setAdding(false)} aria-label={t.cancel} className="p-1 rounded-full hover:bg-bg-warm text-secondary-text">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <label htmlFor="family-name" className="text-[10px] font-semibold text-secondary-text">
                  {t.nameLabel}
                </label>
                <input
                  id="family-name"
                  type="text"
                  autoFocus
                  value={name}
                  maxLength={20}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={t.namePlaceholder}
                  aria-invalid={error}
                  aria-describedby={error ? 'family-name-error' : undefined}
                  className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${error ? 'border-accent-red' : 'border-border-light focus:border-accent-emerald'}`}
                />
                {error && (
                  <p id="family-name-error" className="text-[10px] text-accent-red">
                    {t.nameError}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="family-relation" className="text-[10px] font-semibold text-secondary-text">
                  {t.relationLabel}
                </label>
                <select
                  id="family-relation"
                  value={relation}
                  onChange={(e) => setRelation(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-border-light bg-white outline-none focus:border-accent-emerald"
                >
                  {t.relations.map((r, i) => (
                    <option key={r} value={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setAdding(false)} className="flex-1 py-2 rounded-full border border-border-light text-[11px] font-bold text-primary-text hover:bg-bg-warm">
                  {t.cancel}
                </button>
                <button type="submit" className="flex-1 py-2 rounded-full bg-accent-emerald text-white text-[11px] font-bold hover:opacity-90">
                  {t.save}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

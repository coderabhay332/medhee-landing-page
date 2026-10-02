'use client';

import { useState, type FormEvent } from 'react';
import { Pill, FileText, ShieldAlert, Plus, Trash2, CheckCircle2, Stethoscope } from 'lucide-react';

export default function SectionDashboard() {
  const [draft, setDraft] = useState('');
  const [items, setItems] = useState<string[]>(['Ondansetron 4mg · every 8 hours if needed', 'ORS · small sips through the day']);
  const [saved, setSaved] = useState(false);

  const add = (e: FormEvent) => {
    e.preventDefault();
    const value = draft.trim().slice(0, 80);
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setDraft('');
    setSaved(false);
  };

  const remove = (i: number) => {
    setItems((prev) => prev.filter((_, j) => j !== i));
    setSaved(false);
  };

  return (
    <section id="doctor-dashboard" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-b border-border-light">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end text-left">
          <h2 className="lg:col-span-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">What the doctor sees</h2>
          <p className="lg:col-span-7 text-base text-secondary-text leading-relaxed">
            Doctors join from the Medhee doctor app. When a consult starts, the patient's history, medicines, allergies and the
            AI nurse's notes are on one screen, so the doctor can start with the problem instead of the usual questions.
          </p>
        </div>

        <div className="w-full bg-white border border-border-light rounded-3xl overflow-hidden shadow-lg flex flex-col">
          {/* Window bar */}
          <div className="bg-bg-warm border-b border-border-light px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <p className="text-sm font-semibold text-primary-text flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
              Medhee for doctors
            </p>
            <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold" aria-label="Dr. Priya Nair">
              PN
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border-light">
            {/* Patient */}
            <div className="lg:col-span-3 bg-[#FCFCFA] p-6 space-y-6 text-left">
              <div className="space-y-2">
                <p className="text-sm text-secondary-text">Patient</p>
                <h3 className="text-lg font-bold text-primary-text">Rahul Sharma</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm text-secondary-text">
                  <div>
                    <dt className="text-xs">Age</dt>
                    <dd className="font-semibold text-primary-text">34, male</dd>
                  </div>
                  <div>
                    <dt className="text-xs">Blood group</dt>
                    <dd className="font-semibold text-primary-text">O+</dd>
                  </div>
                  <div>
                    <dt className="text-xs">Weight</dt>
                    <dd className="font-semibold text-primary-text">78 kg</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-accent-red">Allergies</p>
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-1">
                  <p className="text-sm font-bold text-accent-red flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                    Penicillin · severe
                  </p>
                  <p className="text-xs text-secondary-text">Swelling and hives in 2019. Avoid penicillin-group antibiotics.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800">Sulfa drugs · mild rash</div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary-text">Current medicines</p>
                {[
                  { name: 'Metformin 500mg', note: 'Twice a day · for diabetes' },
                  { name: 'Multivitamin', note: 'Once a day' },
                ].map((m) => (
                  <div key={m.name} className="bg-white border border-border-light p-3 rounded-xl flex items-center gap-2">
                    <Pill className="w-4 h-4 text-accent-emerald flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-primary-text truncate">{m.name}</p>
                      <p className="text-xs text-secondary-text">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI notes + timeline */}
            <div className="lg:col-span-5 bg-white p-6 space-y-6 text-left">
              <div className="p-4 bg-accent-soft/50 border border-emerald-100 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-accent-emerald">AI nurse notes</p>
                <p className="text-sm text-primary-text leading-relaxed">
                  Vomiting for about 4 hours, feels weak. No blood in vomit. Able to keep small sips of water down.
                </p>
                <ul className="space-y-1.5 text-sm text-secondary-text">
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-2 flex-shrink-0" aria-hidden="true" />
                    Type 2 diabetes: higher risk of dehydration.
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-2 flex-shrink-0" aria-hidden="true" />
                    On Metformin, which can cause stomach upset.
                  </li>
                </ul>
                <p className="text-xs text-secondary-text">Recommendation: doctor consult today.</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-primary-text">Today</p>
                <ol className="space-y-4 relative pl-4 border-l border-border-light">
                  {[
                    { time: '4:00 AM', text: 'Rahul describes his symptoms to the AI nurse', dot: 'bg-accent-red' },
                    { time: '4:02 AM', text: 'AI nurse recommends a doctor', dot: 'bg-accent-amber' },
                    { time: '4:05 AM', text: 'Video consult starts with Dr. Priya Nair', dot: 'bg-accent-emerald' },
                  ].map((e) => (
                    <li key={e.time} className="relative">
                      <span className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${e.dot}`} aria-hidden="true" />
                      <p className="text-xs text-secondary-text">{e.time}</p>
                      <p className="text-sm font-semibold text-primary-text">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Reports + prescription */}
            <div className="lg:col-span-4 bg-[#FCFCFA] p-6 space-y-6 text-left">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary-text">Recent reports</p>
                {[
                  { name: 'HbA1c', date: '20 Jun 2026', value: '6.8%', status: 'High', tone: 'bg-red-50 text-accent-red border-red-100' },
                  { name: 'Kidney function (eGFR)', date: '12 Mar 2026', value: '92 mL/min', status: 'Normal', tone: 'bg-accent-soft text-accent-emerald border-emerald-100' },
                ].map((r) => (
                  <div key={r.name} className="p-3 bg-white border border-border-light rounded-xl space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-bold text-primary-text flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
                        {r.name}
                      </p>
                      <span className="text-xs text-secondary-text">{r.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-text">{r.value}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${r.tone}`}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border-light">
                <p className="text-sm font-semibold text-primary-text">Prescription</p>
                <form onSubmit={add} className="flex gap-2">
                  <label htmlFor="rx-input" className="sr-only">
                    Add a medicine
                  </label>
                  <input
                    id="rx-input"
                    type="text"
                    value={draft}
                    maxLength={80}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Add a medicine…"
                    className="flex-1 min-w-0 bg-white border border-border-light rounded-xl px-3 py-2 text-sm outline-none focus:border-accent-emerald"
                  />
                  <button type="submit" disabled={!draft.trim()} className="p-2 rounded-xl bg-primary-text hover:bg-accent-emerald disabled:opacity-40 text-white transition-colors" aria-label="Add medicine">
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                <ul className="space-y-1.5">
                  {items.map((med, i) => (
                    <li key={`${med}-${i}`} className="p-2.5 bg-white border border-border-light rounded-xl flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-primary-text truncate">{med}</span>
                      <button onClick={() => remove(i)} className="p-1 text-secondary-text hover:text-accent-red rounded transition-colors flex-shrink-0" aria-label={`Remove ${med}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={() => setSaved(true)}
                  className="w-full py-2.5 rounded-full bg-accent-emerald hover:opacity-90 disabled:opacity-40 text-white text-sm font-bold transition-opacity flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  Send to patient
                </button>
                <p className="text-sm text-accent-emerald min-h-[20px]" aria-live="polite">
                  {saved ? 'Sent. It now appears in Rahul’s profile and medicine schedule.' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

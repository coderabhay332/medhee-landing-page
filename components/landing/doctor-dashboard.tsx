'use client'

import { Reveal } from './reveal'

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  )
}

export function DoctorDashboard() {
  return (
    <section id="doctors" className="border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            For doctors
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            The consultation starts before it begins.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The moment a doctor joins, everything is already on screen.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_80px_rgba(17,17,17,0.08)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-border" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-border" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-3 text-xs text-muted-foreground">
                Medhee for Doctors — Incoming consultation
              </span>
            </div>

            <div className="grid gap-px bg-border md:grid-cols-3">
              {/* Patient overview */}
              <div className="bg-background p-6">
                <PanelHeading>Patient</PanelHeading>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
                  >
                    RS
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Rahul Sharma</p>
                    <p className="text-xs text-muted-foreground">34 · Male · Pune</p>
                  </div>
                </div>

                <div className="mt-6">
                  <PanelHeading>Allergies</PanelHeading>
                  <p className="mt-2 inline-block rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">
                    Penicillin — severe
                  </p>
                </div>

                <div className="mt-6">
                  <PanelHeading>Active medication</PanelHeading>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex justify-between">
                      <span>Metformin 500mg</span>
                      <span className="text-muted-foreground">2x daily</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Atorvastatin 10mg</span>
                      <span className="text-muted-foreground">nightly</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* AI assessment */}
              <div className="bg-background p-6">
                <PanelHeading>AI assessment</PanelHeading>
                <div className="mt-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warning">
                    Moderate risk
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug">
                    Persistent vomiting in a T2D patient on Metformin. Dehydration
                    and lactic acidosis risk flagged.
                  </p>
                </div>

                <div className="mt-6">
                  <PanelHeading>Presenting symptom</PanelHeading>
                  <p className="mt-2 rounded-xl bg-muted p-3 text-sm leading-relaxed">
                    {'"I\u2019ve been vomiting since this morning."'}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Reported 6:14 AM · today
                  </p>
                </div>

                <div className="mt-6">
                  <PanelHeading>Recent reports</PanelHeading>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex justify-between">
                      <span>HbA1c</span>
                      <span className="font-semibold text-primary">6.8%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Creatinine</span>
                      <span className="text-muted-foreground">0.9 mg/dL</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-background p-6">
                <PanelHeading>Health timeline</PanelHeading>
                <ol className="mt-3 space-y-4">
                  {[
                    { date: 'Today', event: 'Vomiting reported · AI triage', active: true },
                    { date: 'Jan 30', event: 'Blood panel uploaded' },
                    { date: 'Jan 04', event: 'Prescription renewed' },
                    { date: 'Nov 18', event: 'Consultation · Dr. Iyer' },
                    { date: 'Sep 02', event: 'Diet plan updated' },
                  ].map((item) => (
                    <li key={item.date + item.event} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className={`mt-1.5 block h-2 w-2 shrink-0 rounded-full ${
                          item.active ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                      <div>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        <p className="text-sm font-medium leading-snug">{item.event}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

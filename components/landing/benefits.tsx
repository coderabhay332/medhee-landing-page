'use client'

import { Reveal, Stagger, StaggerItem } from './reveal'

function ScreenRow({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: string
  tone?: 'default' | 'warning' | 'success' | 'danger'
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 py-2 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-xs font-semibold ${
          tone === 'warning'
            ? 'text-warning'
            : tone === 'success'
              ? 'text-primary'
              : tone === 'danger'
                ? 'text-danger'
                : 'text-foreground'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function Screen({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

const benefits = [
  {
    title: 'Medication Safety',
    desc: 'Every new medicine is checked against everything you already take.',
    screen: (
      <Screen title="Interaction check">
        <ScreenRow label="Amoxicillin" value="Blocked · allergy" tone="danger" />
        <ScreenRow label="Ondansetron" value="Safe with Metformin" tone="success" />
        <ScreenRow label="Ibuprofen" value="Caution · kidney" tone="warning" />
      </Screen>
    ),
  },
  {
    title: 'Report Intelligence',
    desc: 'Upload any report. Medhee reads it, tracks it and remembers it.',
    screen: (
      <Screen title="Blood panel · trend">
        <ScreenRow label="HbA1c" value="7.4 → 6.8%" tone="success" />
        <ScreenRow label="Fasting glucose" value="126 mg/dL" />
        <ScreenRow label="Vitamin D" value="Low · flagged" tone="warning" />
      </Screen>
    ),
  },
  {
    title: 'Health Memory',
    desc: 'Your complete history, organized into one living timeline.',
    screen: (
      <Screen title="Timeline">
        <ScreenRow label="Feb 12" value="Consultation · Dr. Mehta" />
        <ScreenRow label="Jan 30" value="Blood report added" />
        <ScreenRow label="Jan 04" value="Prescription updated" />
      </Screen>
    ),
  },
  {
    title: 'Doctor On Call',
    desc: 'When risk rises, a verified doctor joins with your full context.',
    screen: (
      <Screen title="Consultation">
        <ScreenRow label="Dr. Mehta" value="Joining now" tone="success" />
        <ScreenRow label="Context shared" value="Full profile" />
        <ScreenRow label="Wait time" value="Under 2 min" />
      </Screen>
    ),
  },
  {
    title: 'Personal Diet',
    desc: 'Guidance that accounts for your conditions, not generic advice.',
    screen: (
      <Screen title="Today's plan">
        <ScreenRow label="Breakfast" value="Low glycemic" tone="success" />
        <ScreenRow label="Hydration" value="2.4L target" />
        <ScreenRow label="Avoid" value="Grapefruit · statin" tone="warning" />
      </Screen>
    ),
  },
  {
    title: 'AI Triage',
    desc: 'Instant risk assessment grounded in your real medical history.',
    screen: (
      <Screen title="Assessment">
        <ScreenRow label="Symptom" value="Vomiting" />
        <ScreenRow label="Risk" value="Moderate" tone="warning" />
        <ScreenRow label="Action" value="Doctor recommended" tone="success" />
      </Screen>
    ),
  },
]

export function Benefits() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What Medhee does
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Before problems become emergencies.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_8px_30px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)]">
                <h3 className="text-lg font-semibold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {benefit.desc}
                </p>
                <div className="mt-5">{benefit.screen}</div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

'use client';

const TIERS = [
  {
    id: 'low',
    title: 'Mild',
    example: 'A common cold, a mild headache, a question about diet.',
    outcome: 'The AI nurse helps',
    detail: 'You get home-care advice that takes your medicines and conditions into account, and what signs to watch for.',
    tone: { bar: 'bg-accent-emerald', text: 'text-accent-emerald' },
  },
  {
    id: 'moderate',
    title: 'Needs a doctor',
    example: 'A symptom that is riskier because of your history, like vomiting when you have diabetes.',
    outcome: 'Medhee suggests a doctor',
    detail: 'The AI does not try to handle it. It recommends a consult, and you can start one with a doctor in the app.',
    tone: { bar: 'bg-accent-amber', text: 'text-accent-amber' },
  },
  {
    id: 'high',
    title: 'Emergency',
    example: 'Chest pain, trouble breathing, a sudden severe headache, fainting.',
    outcome: 'Get help now',
    detail: 'The assessment stops and tells you to call 112 or go to the nearest emergency room. It does not keep chatting.',
    tone: { bar: 'bg-accent-red', text: 'text-accent-red' },
  },
] as const;

export default function SectionAILimits() {
  return (
    <section id="ai-limits" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-b border-border-light">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 max-w-3xl text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            The AI knows when to step back
          </h2>
          <p className="text-base text-secondary-text leading-relaxed max-w-2xl">
            Medhee's AI is not a doctor and doesn't pretend to be one. Every symptom check ends in one of three places.
          </p>
        </div>

        <div className="border-t border-primary-text text-left">
          <div className="hidden md:grid grid-cols-12 gap-8 py-3 border-b border-border-light text-sm font-semibold text-secondary-text">
            <span className="col-span-3">Situation</span>
            <span className="col-span-4">For example</span>
            <span className="col-span-5">What Medhee does</span>
          </div>
          {TIERS.map((tier) => (
            <div key={tier.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-b border-border-light">
              <div className="md:col-span-3 flex items-start gap-3">
                <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${tier.tone.bar}`} aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-primary-text">{tier.title}</h3>
              </div>
              <p className="md:col-span-4 text-sm text-secondary-text leading-relaxed">{tier.example}</p>
              <div className="md:col-span-5 space-y-1">
                <p className={`text-base font-semibold ${tier.tone.text}`}>{tier.outcome}</p>
                <p className="text-sm text-secondary-text leading-relaxed">{tier.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-secondary-text max-w-2xl">
          Medhee gives information, not a diagnosis. In an emergency, always call 112 or your local emergency number first.
        </p>
      </div>
    </section>
  );
}

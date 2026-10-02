'use client';


type Phase = 'now' | 'next';

const ITEMS: { phase: Phase; title: string; description: string }[] = [
  { phase: 'now', title: 'Medicines and safety checks', description: 'Your schedule, dose reminders, and warnings for risky combinations or allergies.' },
  { phase: 'now', title: 'Lab reports', description: 'Upload a report, see what is out of range, and ask questions about it.' },
  { phase: 'now', title: 'AI nurse', description: 'Describe symptoms by voice or chat and get advice based on your history.' },
  { phase: 'now', title: 'Doctor consults', description: 'Video, voice or chat with a doctor who can already see your profile.' },
  { phase: 'now', title: 'Family profiles', description: "Manage your parents' and children's medicines from one account." },
  { phase: 'now', title: 'English and Hindi', description: 'Use the whole app in either language.' },
  { phase: 'next', title: 'Wearables and home devices', description: 'Readings from glucose meters, BP monitors and watches added to your profile automatically.' },
  { phase: 'next', title: 'Early warnings from your reports', description: 'Notice when a value is slowly getting worse across reports, before it becomes a problem.' },
  { phase: 'next', title: 'Emergency sharing', description: 'Share your key health details with family or an ambulance crew in one tap.' },
  { phase: 'next', title: 'Insurance help', description: 'Keep bills and prescriptions ready for claims.' },
];

const COLUMNS: { phase: Phase; label: string; note: string }[] = [
  { phase: 'now', label: 'Available now', note: 'In the app today' },
  { phase: 'next', label: 'Coming next', note: 'What we are building' },
];

export default function SectionVision() {
  return (
    <section id="vision" className="relative py-16 md:py-20 px-6 md:px-12 bg-bg-warm border-t border-border-light">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 text-left max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">What's ready, and what's next</h2>
          <p className="text-base text-secondary-text">Everything under “Available now” is in the app today. The rest is what we're working on.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {COLUMNS.map((col) => (
            <div key={col.phase} className="text-left">
              <div className={`flex items-baseline justify-between pb-3 border-b-2 ${col.phase === 'now' ? 'border-accent-emerald' : 'border-accent-amber'}`}>
                <h3 className="font-display text-xl font-bold text-primary-text">{col.label}</h3>
                <span className="text-sm text-secondary-text">{col.note}</span>
              </div>
              <ul>
                {ITEMS.filter((i) => i.phase === col.phase).map((item) => (
                  <li key={item.title} className="py-4 border-b border-border-light">
                    <p className="text-base font-semibold text-primary-text">{item.title}</p>
                    <p className="text-sm text-secondary-text leading-relaxed mt-1">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

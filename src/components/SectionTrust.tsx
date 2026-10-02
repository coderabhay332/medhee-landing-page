'use client';

// Every point here must match the Privacy Policy (/privacy) and what the app actually does.
const POINTS = [
  {
    title: 'Encrypted',
    body: 'Your data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Your login is stored in your phone’s secure keystore.',
  },
  {
    title: 'Never sold',
    body: 'We don’t sell your health data or use it for advertising. It is used only to run the features you use.',
  },
  {
    title: 'Shared when you choose',
    body: 'A doctor sees your health profile when you start a consultation with them.',
  },
  {
    title: 'Yours to delete',
    body: 'Edit your details any time. Delete your account and all your data from Settings → Delete Account. Prescription and report photos are deleted after the details are extracted.',
  },
  {
    title: 'Your rights under DPDP',
    body: 'Under India’s Digital Personal Data Protection Act, 2023, you can access, correct or erase your data, and raise a grievance at privacy@medhee.com.',
  },
];

export default function SectionTrust() {
  return (
    <section id="trust" className="relative py-16 md:py-20 px-6 md:px-12 bg-white border-t border-border-light">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">Your data, handled carefully</h2>
          <p className="text-base text-secondary-text leading-relaxed">
            This is what we do with your health data. The{' '}
            <a href="/privacy" className="text-accent-emerald underline underline-offset-4 hover:opacity-80">
              privacy policy
            </a>{' '}
            has the details.
          </p>
        </div>

        <dl className="lg:col-span-8 border-t border-primary-text">
          {POINTS.map((p) => (
            <div key={p.title} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 py-5 border-b border-border-light text-left">
              <dt className="text-base font-bold text-primary-text">{p.title}</dt>
              <dd className="sm:col-span-2 text-sm text-secondary-text leading-relaxed">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

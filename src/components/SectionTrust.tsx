'use client';

import { motion } from 'motion/react';
import { Lock, Ban, UserCheck, Trash2, Scale } from 'lucide-react';

// Every point here must match the Privacy Policy (/privacy) and what the app actually does.
const POINTS = [
  {
    title: 'Encrypted',
    body: 'Your data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Your login is stored in your phone’s secure keystore.',
    icon: Lock,
  },
  {
    title: 'Never sold',
    body: 'We don’t sell your health data or use it for advertising. It is used only to run the features you use.',
    icon: Ban,
  },
  {
    title: 'Shared when you choose',
    body: 'A doctor sees your health profile when you start a consultation with them.',
    icon: UserCheck,
  },
  {
    title: 'Yours to delete',
    body: 'Edit your details any time. Delete your account and all your data from Settings → Delete Account. Prescription and report photos are deleted after the details are extracted.',
    icon: Trash2,
  },
  {
    title: 'Your rights under DPDP',
    body: 'Under India’s Digital Personal Data Protection Act, 2023, you can access, correct or erase your data, and raise a grievance at privacy@medhee.com.',
    icon: Scale,
  },
];

export default function SectionTrust() {
  return (
    <section id="trust" className="relative py-16 md:py-20 px-6 md:px-12 bg-white border-t border-border-light">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">Your data, handled carefully.</h2>
          <p className="text-base text-secondary-text leading-relaxed">
            Health information is personal. Here is exactly what we do with it —{' '}
            <a href="/privacy" className="text-accent-emerald underline underline-offset-4 hover:opacity-80">
              the full privacy policy
            </a>{' '}
            has the details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 border-t border-border-light pt-10">
          {POINTS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="space-y-2 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-accent-soft text-accent-emerald flex-shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-primary-text">{p.title}</h3>
                </div>
                <p className="text-sm text-secondary-text leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

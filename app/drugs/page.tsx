import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getAllDrugs } from '@/lib/drugs';
import DrugSearchGrid from './DrugSearchGrid';

// Rebuild this page at most once per day; content is otherwise static (SSG + ISR).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Drug Information Library — Uses, Dosage & Safety',
  description:
    'Browse plain-language medication guides covering uses, dosage, side effects, precautions, and drug interactions for over 1,300 medicines.',
  alternates: { canonical: '/drugs' },
  openGraph: {
    title: 'Drug Information Library — Medhee',
    description:
      'Plain-language medication guides: uses, dosage, side effects, precautions, and interactions.',
    url: 'https://medhee.com/drugs',
    type: 'website',
  },
};

export default async function DrugsPage() {
  const drugs = await getAllDrugs();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Drug Information Library',
    description: 'Plain-language medication guides covering uses, dosage, side effects, and interactions.',
    url: 'https://medhee.com/drugs',
    isPartOf: { '@id': 'https://medhee.com/#website' },
  };

  return (
    <div className="min-h-screen bg-bg-warm font-sans text-primary-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <header className="sticky top-0 z-20 border-b border-border-light bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-secondary-text transition-colors hover:text-primary-text">
            <ArrowLeft className="h-4 w-4" />
            Back to Medhee
          </Link>
          <Link href="/" className="flex items-center gap-2 font-display font-bold tracking-tight text-primary-text">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald" />
            Medhee
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-border-light/70 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-emerald">
                <BookOpen className="h-4 w-4" />
                {drugs.length.toLocaleString()} medication guides
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Understand your medicines.</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary-text md:text-lg">
                Search clear, detailed information about medicine uses, dosage, side effects, precautions, and interactions.
              </p>
            </div>
            <DrugSearchGrid drugs={drugs} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border-light bg-white px-5 py-8 text-center text-xs leading-relaxed text-secondary-text">
        Drug information is for education only and is not medical advice. Consult a qualified doctor or pharmacist before changing treatment.
        <div className="mt-3 flex justify-center gap-5">
          <Link href="/privacy" className="hover:text-primary-text">Privacy</Link>
          <Link href="/terms" className="hover:text-primary-text">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

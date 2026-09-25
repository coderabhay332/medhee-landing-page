import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { getAllCategories, getAllDrugs, getPopularDrugs } from '@/lib/drugs';
import DrugBrowser from './DrugBrowser';

// Rebuild this page at most once per day; content is otherwise static (SSG + ISR).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Drug Information Library — Uses, Dosage & Safety',
  description:
    'Browse plain-language medication guides A–Z covering uses, dosage, side effects, precautions, and drug interactions for over 1,300 medicines.',
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
  const [drugs, categories, popular] = await Promise.all([
    getAllDrugs(),
    getAllCategories(),
    getPopularDrugs(4),
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Drug Information Library',
    description: 'Plain-language medication guides covering uses, dosage, side effects, and interactions.',
    url: 'https://medhee.com/drugs',
    isPartOf: { '@id': 'https://medhee.com/#website' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://medhee.com/' },
      { '@type': 'ListItem', position: 2, name: 'Drugs', item: 'https://medhee.com/drugs' },
    ],
  };

  return (
    <div id="top" className="min-h-screen bg-bg-warm font-sans text-primary-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-secondary-text">
                <li><Link href="/" className="transition-colors hover:text-primary-text">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li className="font-medium text-primary-text" aria-current="page">Drugs</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-emerald">
                <BookOpen className="h-4 w-4" />
                {drugs.length.toLocaleString()} medication guides
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Understand your medicines.</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary-text md:text-lg">
                Search or browse A–Z for clear information about medicine uses, dosage, side effects, precautions, and interactions.
              </p>
            </div>

            {/* Popular Drugs */}
            {popular.length > 0 && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <Sparkles className="h-5 w-5 text-accent-emerald" /> Popular drugs
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {popular.map((d, i) => (
                    <Link
                      key={d.slug}
                      href={`/drugs/${d.slug}`}
                      className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-3xl border border-border-light bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-emerald/40 hover:shadow-xl hover:shadow-emerald-950/5"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-xs text-secondary-text/60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-secondary-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-emerald" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold leading-tight">{d.drugName}</h3>
                        {d.genericName && d.genericName.toLowerCase() !== d.drugName.toLowerCase() && (
                          <p className="mt-1 text-sm text-secondary-text">{d.genericName}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Browse by category */}
            <div className="mt-12">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">Browse by category</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/drugs/category/${c.slug}`}
                    className="rounded-full border border-border-light bg-white px-3 py-1.5 text-xs font-medium text-secondary-text transition-colors hover:border-accent-emerald/40 hover:text-primary-text"
                  >
                    {c.name} <span className="text-accent-emerald">({c.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Browse A–Z (search + letter index + grouped lists) */}
        <section className="border-t border-border-light/70">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
            <h2 className="font-display text-3xl font-bold">Browse drugs and medications</h2>
            <DrugBrowser drugs={drugs} />
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

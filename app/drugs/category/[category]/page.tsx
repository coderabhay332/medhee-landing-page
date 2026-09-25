import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, Layers } from 'lucide-react';
import { getAllCategories, getCategoryBySlug, categoryToSlug } from '@/lib/drugs';
import DrugSearchGrid from '../../DrugSearchGrid';

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = await getCategoryBySlug(category);
  if (!found) return { title: 'Category not found' };

  const canonical = `/drugs/category/${category}`;
  const description = `Browse ${found.drugs.length} ${found.name} medications with plain-language guides on uses, dosage, side effects, and interactions.`;
  return {
    title: `${found.name} Medications — Drug Guides`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${found.name} Medications | Medhee`,
      description,
      url: `https://medhee.com${canonical}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = await getCategoryBySlug(category);
  if (!found) notFound();

  const allCategories = await getAllCategories();
  const pageUrl = `https://medhee.com/drugs/category/${category}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://medhee.com/' },
      { '@type': 'ListItem', position: 2, name: 'Drugs', item: 'https://medhee.com/drugs' },
      { '@type': 'ListItem', position: 3, name: found.name, item: pageUrl },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${found.name} Medications`,
    description: `Medication guides in the ${found.name} category.`,
    url: pageUrl,
    isPartOf: { '@id': 'https://medhee.com/#website' },
  };

  return (
    <div className="min-h-screen bg-bg-warm font-sans text-primary-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <header className="sticky top-0 z-20 border-b border-border-light bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/drugs" className="flex items-center gap-2 text-sm text-secondary-text transition-colors hover:text-primary-text">
            <ArrowLeft className="h-4 w-4" />
            Drug library
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
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-secondary-text">
                <li><Link href="/" className="transition-colors hover:text-primary-text">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li><Link href="/drugs" className="transition-colors hover:text-primary-text">Drugs</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li className="font-medium text-primary-text" aria-current="page">{found.name}</li>
              </ol>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-emerald">
              <Layers className="h-4 w-4" />
              {found.drugs.length} medicines
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{found.name} medications</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary-text md:text-lg">
              Plain-language guides for {found.name.toLowerCase()} medicines — uses, dosage, side effects, precautions, and interactions.
            </p>

            {/* Category chips: internal links between hubs strengthen crawl paths. */}
            <div className="mt-6 flex flex-wrap gap-2">
              {allCategories.slice(0, 14).map((c) => (
                <Link
                  key={c.slug}
                  href={`/drugs/category/${c.slug}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    c.slug === category
                      ? 'border-accent-emerald bg-accent-emerald text-white'
                      : 'border-border-light bg-white text-secondary-text hover:border-accent-emerald/40 hover:text-primary-text'
                  }`}
                >
                  {c.name} ({c.count})
                </Link>
              ))}
            </div>

            <DrugSearchGrid drugs={found.drugs} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border-light bg-white px-5 py-8 text-center text-xs leading-relaxed text-secondary-text">
        Drug information is for education only and is not medical advice. Consult a qualified doctor or pharmacist before changing treatment.
        <div className="mt-3 flex justify-center gap-5">
          <Link href="/drugs" className="hover:text-primary-text">All drugs</Link>
          <Link href="/privacy" className="hover:text-primary-text">Privacy</Link>
          <Link href="/terms" className="hover:text-primary-text">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronDown,
  Pill,
  ShieldAlert,
  X,
} from 'lucide-react';
import { getAllDrugSlugs, getDrugBySlug, type DrugTable } from '@/lib/drugs';
import { cleanText } from '@/lib/text';

// Pre-render every drug page at build time (SSG); refresh daily (ISR).
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllDrugSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getDrugBySlug(slug);
  if (!article) return { title: 'Drug not found' };

  const description = cleanText(article.metaDescription || article.summary).slice(0, 160);
  const canonical = `/drugs/${article.slug}`;
  return {
    title: `${article.drugName} — Uses, Dosage, Side Effects & Interactions`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${article.drugName} — Medication Guide | Medhee`,
      description,
      url: `https://medhee.com${canonical}`,
      type: 'article',
    },
  };
}

const EXCLUDED_SECTION_KEYS = new Set([
  'key_takeaways', 'dosage', 'drug_interactions', 'pros_and_cons', 'faq', 'bottom_line', 'related_articles',
]);

function Table({ table }: { table: DrugTable }) {
  const headers = table.headers || [];
  const rows = table.rows || [];
  if (!headers.length && !rows.length) return null;
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-border-light">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        {!!headers.length && (
          <thead className="bg-accent-soft/70 text-primary-text">
            <tr>
              {headers.map((header, i) => (
                <th key={`${header}-${i}`} className="px-4 py-3 font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-border-light bg-white">
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top leading-relaxed text-secondary-text">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption && <p className="border-t border-border-light bg-white px-4 py-3 text-xs text-secondary-text">{table.caption}</p>}
    </div>
  );
}

function severityClasses(severity: string | null) {
  if (severity?.toLowerCase() === 'avoid') return 'bg-red-50 text-red-700 border-red-200';
  if (severity?.toLowerCase() === 'caution') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-50 text-slate-600 border-slate-200';
}

export default async function DrugDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getDrugBySlug(slug);
  if (!article) notFound();

  const summary = cleanText(article.summary);
  const sections = (article.sections || [])
    .filter((s) => !EXCLUDED_SECTION_KEYS.has(s.key || ''))
    .filter((s) => s.paragraphs.length || s.lists.some((l) => l.items.length) || s.tables.length)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: article.title,
    description: cleanText(article.metaDescription || article.summary).slice(0, 160),
    url: `https://medhee.com/drugs/${article.slug}`,
    datePublished: article.datePublished || undefined,
    dateModified: article.dateModified || undefined,
    publisher: { '@type': 'Organization', name: 'Medhee', url: 'https://medhee.com' },
    about: { '@type': 'Drug', name: article.drugName },
    ...(article.faq?.length
      ? {
          mainEntity: article.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: cleanText(f.answer) },
          })),
        }
      : {}),
  };

  return (
    <div className="min-h-screen bg-bg-warm font-sans text-primary-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <header className="sticky top-0 z-20 border-b border-border-light bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
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
          <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-emerald">
              <Pill className="h-4 w-4" /> Medication guide
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl">{article.drugName}</h1>
            {article.genericName && article.genericName.toLowerCase() !== article.drugName.toLowerCase() && (
              <p className="mt-2 text-sm font-medium text-accent-emerald">Generic name: {article.genericName}</p>
            )}
            {summary && <p className="mt-6 max-w-4xl whitespace-pre-line text-base leading-8 text-secondary-text">{summary}</p>}
            {article.dateModified && <p className="mt-5 font-mono text-xs text-secondary-text">Last updated {article.dateModified}</p>}
          </div>
        </section>

        <article className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
          {!!article.keyTakeaways?.length && (
            <section className="rounded-3xl border border-emerald-200 bg-accent-soft/70 p-6 md:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">At a glance</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Key takeaways</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-secondary-text">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-emerald text-white"><Check className="h-3 w-3" /></span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(article.pros?.length > 0 || article.cons?.length > 0) && (
            <section className="mt-8 grid gap-5 md:grid-cols-2">
              {!!article.pros?.length && (
                <div className="rounded-3xl border border-border-light bg-white p-6">
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Check className="h-5 w-5 text-accent-emerald" /> Benefits</h2>
                  <ul className="mt-4 space-y-3">
                    {article.pros.map((item, i) => <li key={i} className="flex gap-3 text-sm leading-relaxed text-secondary-text"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald" />{item}</li>)}
                  </ul>
                </div>
              )}
              {!!article.cons?.length && (
                <div className="rounded-3xl border border-border-light bg-white p-6">
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold"><X className="h-5 w-5 text-accent-red" /> Limitations &amp; risks</h2>
                  <ul className="mt-4 space-y-3">
                    {article.cons.map((item, i) => <li key={i} className="flex gap-3 text-sm leading-relaxed text-secondary-text"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-red" />{item}</li>)}
                  </ul>
                </div>
              )}
            </section>
          )}

          {(article.dosageNotes || article.dosageTables?.length > 0) && (
            <section className="mt-12">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">Taking this medicine</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Dosage information</h2>
              {article.dosageNotes && <p className="mt-4 max-w-4xl text-base leading-8 text-secondary-text">{article.dosageNotes}</p>}
              {article.dosageTables?.map((table, i) => <Table key={i} table={table} />)}
            </section>
          )}

          {!!article.interactions?.length && (
            <section className="mt-12">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">Safety</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Interactions</h2>
              <p className="mt-3 text-secondary-text">Tell your doctor or pharmacist about every medicine, supplement, and substance you use.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {article.interactions.map((interaction, i) => (
                  <div key={i} className="rounded-2xl border border-border-light bg-white p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {interaction.severityHint?.toLowerCase() === 'avoid' ? <ShieldAlert className="h-5 w-5 text-accent-red" /> : <AlertTriangle className="h-5 w-5 text-accent-amber" />}
                      <h3 className="font-display font-bold">{interaction.agent}</h3>
                      {interaction.severityHint && <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${severityClasses(interaction.severityHint)}`}>{interaction.severityHint}</span>}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-secondary-text">{interaction.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.map((section, si) => (
            <section key={`${section.key}-${si}`} id={section.anchor || undefined} className="mt-12 scroll-mt-24">
              {section.heading && <h2 className="font-display text-3xl font-bold">{section.heading}</h2>}
              {section.paragraphs.map((paragraph, i) => {
                const cleaned = cleanText(paragraph);
                return cleaned ? <p key={i} className="mt-4 max-w-4xl text-base leading-8 text-secondary-text">{cleaned}</p> : null;
              })}
              {section.lists.map((list, li) => (
                <ul key={li} className="mt-5 space-y-3 rounded-3xl border border-border-light bg-white p-6">
                  {list.items.map((item, ii) => <li key={ii} className="flex gap-3 text-sm leading-relaxed text-secondary-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />{item.description}</li>)}
                </ul>
              ))}
              {section.tables.map((table, ti) => <Table key={ti} table={table} />)}
            </section>
          ))}

          {!!article.faq?.length && (
            <section className="mt-12">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">Common questions</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-border-light rounded-3xl border border-border-light bg-white px-5 md:px-7">
                {article.faq.map((item, i) => (
                  <details key={i} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display font-semibold">
                      {item.question}
                      <ChevronDown className="h-4 w-4 shrink-0 text-secondary-text transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 pr-8 text-sm leading-7 text-secondary-text">{cleanText(item.answer)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <aside className="mt-12 rounded-3xl bg-surface-dark p-6 text-white md:p-8">
            <div className="flex items-start gap-4">
              <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-emerald-300" />
              <div>
                <h2 className="font-display text-xl font-bold">Medical information, not medical advice</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">This guide is educational. It cannot account for your diagnosis, age, pregnancy status, allergies, kidney or liver function, or other medicines. Never start, stop, or change a medicine without consulting a qualified healthcare professional.</p>
              </div>
            </div>
          </aside>
        </article>
      </main>

      <footer className="border-t border-border-light bg-white px-5 py-8 text-center text-xs text-secondary-text">
        <Link href="/drugs" className="font-semibold text-primary-text hover:text-accent-emerald">Browse the drug library</Link>
        <span className="mx-3">·</span>
        <Link href="/privacy" className="hover:text-primary-text">Privacy</Link>
        <span className="mx-3">·</span>
        <Link href="/terms" className="hover:text-primary-text">Terms</Link>
      </footer>
    </div>
  );
}

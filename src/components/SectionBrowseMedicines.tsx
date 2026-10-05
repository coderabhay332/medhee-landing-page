import Link from 'next/link';
import { getAllCategories, getPopularDrugs } from '@/lib/drugs';

/**
 * Server component: crawlable internal links from the homepage into the drug
 * library (category hubs + popular drugs). Fails soft so a data hiccup never
 * breaks the marketing page.
 */
export default async function SectionBrowseMedicines() {
  const [categories, popular] = await Promise.all([
    getAllCategories().catch(() => []),
    getPopularDrugs(8).catch(() => []),
  ]);
  if (!categories.length && !popular.length) return null;

  return (
    <section id="browse-medicines" className="relative bg-bg-warm py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
            Browse plain-language medicine guides
          </h2>
          <p className="mt-3 text-base leading-relaxed text-secondary-text">
            Uses, dosage, side effects and interactions for over 1,300 medicines, explained simply.{' '}
            <Link href="/drugs" className="font-semibold text-accent-emerald underline underline-offset-4">
              View the full drug library
            </Link>
            .
          </p>
        </div>

        {!!categories.length && (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/drugs/category/${c.slug}`}
                  prefetch={false}
                  className="inline-block rounded-full border border-border-light bg-white px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:border-accent-emerald/40 hover:text-accent-emerald"
                >
                  {c.name} <span className="text-secondary-text">({c.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!!popular.length && (
          <>
            <h3 className="mt-10 font-display text-xl font-bold text-primary-text">Popular medicines</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/drugs/${d.slug}`}
                    prefetch={false}
                    className="block rounded-2xl border border-border-light bg-white p-4 transition hover:border-accent-emerald/40 hover:shadow-md"
                  >
                    <span className="font-display font-bold text-primary-text">{d.drugName || d.title}</span>
                    {d.genericName && d.genericName.toLowerCase() !== d.drugName.toLowerCase() && (
                      <span className="mt-1 block text-xs font-medium text-accent-emerald">{d.genericName}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

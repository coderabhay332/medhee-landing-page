import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, LoaderCircle, Pill, Search, X } from 'lucide-react';
import { listDrugs, type DrugListItem } from '../drugApi';

const cleanSummary = (text: string) =>
  text
    .split(/\n?Ready to take control of your health\?/i)[0]
    .split(/\n?Get started with Doctronic/i)[0]
    .trim();

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-light bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/" className="flex items-center gap-2 text-sm text-secondary-text transition-colors hover:text-primary-text">
          <ArrowLeft className="h-4 w-4" />
          Back to Medhee
        </a>
        <a href="/" className="flex items-center gap-2 font-display font-bold tracking-tight text-primary-text">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald" />
          Medhee
        </a>
      </div>
    </header>
  );
}

export default function PageDrugs() {
  const [drugs, setDrugs] = useState<DrugListItem[]>([]);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Drug Information Library — Uses, Dosage & Safety | Medhee';
    const description = 'Browse plain-language medication guides covering uses, dosage, side effects, precautions, and drug interactions.';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    listDrugs({ q: searchQuery.length >= 2 ? searchQuery : undefined, limit: searchQuery ? 50 : 36 }, controller.signal)
      .then((result) => {
        setDrugs(result.items);
        setNextCursor(result.nextCursor);
      })
      .catch((reason: Error) => {
        if (reason.name !== 'AbortError') setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [searchQuery]);

  const loadMore = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    setError('');
    try {
      const result = await listDrugs({ limit: 36, cursor: nextCursor });
      setDrugs((current) => [...current, ...result.items]);
      setNextCursor(result.nextCursor);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setLoadingMore(false);
    }
  };

  const searching = searchQuery.length >= 2;

  return (
    <div className="min-h-screen bg-bg-warm font-sans text-primary-text">
      <Header />
      <main>
        <section className="border-b border-border-light/70 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-emerald">
                <BookOpen className="h-4 w-4" />
                1,358 medication guides
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Understand your medicines.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary-text md:text-lg">
                Search clear, detailed information about medicine uses, dosage, side effects, precautions, and interactions.
              </p>
            </div>

            <div className="relative mt-8 max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-text" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search by brand or generic name…"
                aria-label="Search the drug library"
                className="w-full rounded-2xl border border-border-light bg-bg-warm py-4 pl-12 pr-12 text-sm text-primary-text outline-none transition focus:border-accent-emerald focus:ring-4 focus:ring-accent-soft"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-secondary-text transition hover:bg-white hover:text-primary-text"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-emerald">
                {searching ? 'Search results' : 'Browse A–Z'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                {searching ? `Results for “${searchQuery}”` : 'Medication guides'}
              </h2>
            </div>
            {!loading && <span className="text-sm text-secondary-text">{drugs.length} shown</span>}
          </div>

          {error && (
            <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-accent-emerald">
              <LoaderCircle className="h-7 w-7 animate-spin" />
              <span className="sr-only">Loading drug guides</span>
            </div>
          ) : drugs.length === 0 ? (
            <div className="rounded-3xl border border-border-light bg-white px-6 py-16 text-center">
              <Pill className="mx-auto h-8 w-8 text-secondary-text" />
              <h3 className="mt-4 font-display text-xl font-bold">No medicine found</h3>
              <p className="mt-2 text-sm text-secondary-text">Try another brand or generic name.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drugs.map((drug) => (
                <a
                  key={drug.slug}
                  href={`/drugs/${drug.slug}`}
                  className="group flex min-h-48 flex-col rounded-3xl border border-border-light bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent-emerald/40 hover:shadow-xl hover:shadow-emerald-950/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-emerald">
                      <Pill className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-secondary-text transition-transform group-hover:translate-x-1 group-hover:text-accent-emerald" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-tight">{drug.drugName || drug.title}</h3>
                  {drug.genericName && drug.genericName.toLowerCase() !== drug.drugName.toLowerCase() && (
                    <p className="mt-1 text-xs font-medium text-accent-emerald">Generic: {drug.genericName}</p>
                  )}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary-text">
                    {cleanSummary(drug.summary)}
                  </p>
                </a>
              ))}
            </div>
          )}

          {!searching && nextCursor && !loading && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {loadingMore ? 'Loading…' : 'Load more drugs'}
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border-light bg-white px-5 py-8 text-center text-xs leading-relaxed text-secondary-text">
        Drug information is for education only and is not medical advice. Consult a qualified doctor or pharmacist before changing treatment.
        <div className="mt-3 flex justify-center gap-5">
          <a href="/privacy" className="hover:text-primary-text">Privacy</a>
          <a href="/terms" className="hover:text-primary-text">Terms</a>
        </div>
      </footer>
    </div>
  );
}

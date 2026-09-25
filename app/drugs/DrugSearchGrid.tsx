'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Pill, Search, X } from 'lucide-react';
import type { DrugListItem } from '@/lib/drugs';
import { cleanText } from '@/lib/text';

export default function DrugSearchGrid({ drugs }: { drugs: DrugListItem[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return drugs;
    return drugs.filter((drug) =>
      `${drug.drugName} ${drug.genericName ?? ''} ${drug.brandName ?? ''} ${drug.title}`
        .toLowerCase()
        .includes(q),
    );
  }, [drugs, query]);

  return (
    <>
      <div className="relative mt-8 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-text" />
        <input
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
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-secondary-text transition hover:bg-white hover:text-primary-text"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-secondary-text">
        {query ? `${filtered.length} of ${drugs.length} medicines` : `${drugs.length} medicines`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-border-light bg-white px-6 py-16 text-center">
          <Pill className="mx-auto h-8 w-8 text-secondary-text" />
          <h3 className="mt-4 font-display text-xl font-bold">No medicine found</h3>
          <p className="mt-2 text-sm text-secondary-text">Try another brand or generic name.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((drug) => (
            <Link
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
              <h2 className="mt-5 font-display text-lg font-bold leading-tight">{drug.drugName || drug.title}</h2>
              {drug.genericName && drug.genericName.toLowerCase() !== drug.drugName.toLowerCase() && (
                <p className="mt-1 text-xs font-medium text-accent-emerald">Generic: {drug.genericName}</p>
              )}
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary-text">{cleanText(drug.summary)}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import type { DrugListItem } from '@/lib/drugs';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function letterOf(item: DrugListItem): string {
  const ch = (item.drugName || item.title || '').trim().charAt(0).toUpperCase();
  return ch >= 'A' && ch <= 'Z' ? ch : '#';
}

export default function DrugBrowser({ drugs }: { drugs: DrugListItem[] }) {
  const [query, setQuery] = useState('');

  // Group alphabetically once.
  const groups = useMemo(() => {
    const map: Record<string, DrugListItem[]> = {};
    for (const drug of drugs) {
      (map[letterOf(drug)] ??= []).push(drug);
    }
    for (const list of Object.values(map)) {
      list.sort((a, b) => (a.drugName || a.title).localeCompare(b.drugName || b.title));
    }
    return map;
  }, [drugs]);

  const availableLetters = useMemo(
    () => new Set(Object.keys(groups)),
    [groups],
  );

  // Search filters across all drugs; when active we show a flat result list.
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return null;
    return drugs
      .filter((d) =>
        `${d.drugName} ${d.genericName ?? ''} ${d.brandName ?? ''} ${d.title}`
          .toLowerCase()
          .includes(q),
      )
      .sort((a, b) => (a.drugName || a.title).localeCompare(b.drugName || b.title));
  }, [drugs, query]);

  return (
    <div>
      {/* Search */}
      <div className="relative mt-8 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-text" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {searchResults ? (
        /* ── Search mode: flat results ── */
        <div className="mt-8">
          <p className="text-sm text-secondary-text">
            {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for “{query}”
          </p>
          {searchResults.length === 0 ? (
            <p className="mt-6 text-sm text-secondary-text">No medicine found. Try another name.</p>
          ) : (
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {searchResults.map((d) => (
                <li key={d.slug} className="border-b border-border-light/60 py-2">
                  <Link href={`/drugs/${d.slug}`} className="group flex items-baseline justify-between gap-3">
                    <span className="font-medium text-primary-text group-hover:text-accent-emerald">
                      {d.drugName || d.title}
                    </span>
                    {d.genericName && d.genericName.toLowerCase() !== d.drugName.toLowerCase() && (
                      <span className="truncate text-xs text-secondary-text">{d.genericName}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        /* ── Browse mode: A–Z index + grouped lists ── */
        <>
          {/* A–Z letter navigation */}
          <nav aria-label="Browse alphabetically" className="mt-8 flex flex-wrap gap-2">
            {ALPHABET.map((letter) => {
              const has = availableLetters.has(letter);
              return has ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-emerald/40 text-sm font-semibold text-accent-emerald transition-colors hover:bg-accent-emerald hover:text-white"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-disabled="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-sm font-semibold text-secondary-text/40"
                >
                  {letter}
                </span>
              );
            })}
          </nav>

          {/* Grouped sections */}
          <div className="mt-12 space-y-12">
            {ALPHABET.filter((l) => groups[l]?.length).map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <div className="flex items-center gap-4">
                  <h2 className="font-display text-2xl font-bold text-primary-text">
                    Topics Starting with “{letter}”
                  </h2>
                  <span className="text-xs text-secondary-text">{groups[letter].length}</span>
                  <a href="#top" className="ml-auto text-xs text-secondary-text hover:text-accent-emerald">
                    ↑ Top
                  </a>
                </div>
                <ul className="mt-5 grid gap-x-10 gap-y-1 sm:grid-cols-2">
                  {groups[letter].map((d) => (
                    <li key={d.slug} className="flex items-baseline gap-2 border-b border-border-light/50 py-2.5">
                      <span className="truncate text-primary-text">
                        {d.drugName || d.title}
                        {d.genericName && d.genericName.toLowerCase() !== d.drugName.toLowerCase() && (
                          <span className="text-secondary-text"> ({d.genericName})</span>
                        )}
                      </span>
                      <span className="mx-2 flex-1 border-b border-dotted border-border-light" />
                      <Link
                        href={`/drugs/${d.slug}`}
                        className="shrink-0 text-sm font-medium text-accent-emerald hover:underline"
                      >
                        (info)
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

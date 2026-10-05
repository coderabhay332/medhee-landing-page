import type { MetadataRoute } from 'next';
import { getAllCategories, getAllDrugSitemapEntries } from '@/lib/drugs';

const SITE = 'https://medhee.com';

// Static pages change rarely; bump these when the page content is edited.
const HOME_LAST_MODIFIED = new Date('2026-10-05');
const LEGAL_LAST_MODIFIED = new Date('2026-07-23');

export const revalidate = 86400;

/** Parse a stored date string; undefined if missing/invalid so `lastmod` is omitted rather than wrong. */
function toDate(value: string | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [drugs, categories] = await Promise.all([getAllDrugSitemapEntries(), getAllCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: HOME_LAST_MODIFIED },
    { url: `${SITE}/drugs`, lastModified: HOME_LAST_MODIFIED },
    { url: `${SITE}/privacy`, lastModified: LEGAL_LAST_MODIFIED },
    { url: `${SITE}/terms`, lastModified: LEGAL_LAST_MODIFIED },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/drugs/category/${c.slug}`,
    lastModified: HOME_LAST_MODIFIED,
  }));

  const drugRoutes: MetadataRoute.Sitemap = drugs.map(({ slug, dateModified }) => ({
    url: `${SITE}/drugs/${slug}`,
    lastModified: toDate(dateModified),
  }));

  return [...staticRoutes, ...categoryRoutes, ...drugRoutes];
}

import type { MetadataRoute } from 'next';
import { getAllDrugSlugs } from '@/lib/drugs';

const SITE = 'https://medhee.com';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllDrugSlugs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/drugs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const drugRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE}/drugs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...drugRoutes];
}

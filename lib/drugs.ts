import 'server-only';
import { cache } from 'react';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { Agent } from 'node:https';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

/**
 * Server-side data access for the drug library.
 *
 * Reads the DynamoDB `drug_articles` table directly at build/request time:
 *   - PK: slug
 *   - GSI `drugs-by-status`: pubStatus HASH + titleLower RANGE (list / sitemap)
 *   - `primaryCategory` attribute groups drugs for "related medicines" links
 *
 * This module is server-only, so AWS credentials never reach the browser and
 * drug content is present in the initial HTML (good for SEO).
 */

const REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE = process.env.DYNAMO_TABLE_DRUG_ARTICLES || 'drug_articles';
const STATUS_GSI = 'drugs-by-status';
const PUB_STATUS = 'published';

const client = new DynamoDBClient({
  region: REGION,
  // Large SSG builds fire thousands of reads; give the SDK more retries and a
  // roomier keep-alive connection pool so transient blips don't fail the build.
  maxAttempts: 5,
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({ keepAlive: true, maxSockets: 64 }),
    connectionTimeout: 3000,
    requestTimeout: 15000,
  }),
});
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
  unmarshallOptions: { wrapNumbers: false },
});

export interface DrugListItem {
  slug: string;
  title: string;
  drugName: string;
  brandName: string | null;
  genericName: string | null;
  summary: string;
}

export interface DrugTable {
  caption?: string | null;
  headers?: string[];
  rows?: string[][];
}

export interface DrugSection {
  heading: string | null;
  anchor: string | null;
  key: string | null;
  order: number | null;
  paragraphs: string[];
  lists: Array<{ items: Array<{ description: string }> }>;
  tables: DrugTable[];
}

export interface DrugArticle {
  slug: string;
  title: string;
  drugName: string;
  brandName: string | null;
  genericName: string | null;
  summary: string;
  metaDescription: string | null;
  keyTakeaways: string[];
  pros: string[];
  cons: string[];
  faq: Array<{ question: string; answer: string }>;
  dosageNotes: string | null;
  dosageTables: DrugTable[];
  interactions: Array<{ agent: string; severityHint: string | null; text: string }>;
  sideEffects: unknown[];
  sections: DrugSection[];
  ctaCategories: string[];
  primaryCategory: string | null;
  categories: string[];
  sourceUrl: string | null;
  datePublished: string | null;
  dateModified: string | null;
}

const LIST_PROJECTION = 'slug, title, drugName, brandName, genericName, summary';

function toListItem(raw: Record<string, unknown>): DrugListItem {
  return {
    slug: String(raw.slug ?? ''),
    title: String(raw.title ?? ''),
    drugName: String(raw.drugName ?? ''),
    brandName: (raw.brandName as string) ?? null,
    genericName: (raw.genericName as string) ?? null,
    summary: String(raw.summary ?? ''),
  };
}

/** Fetch a single full article by slug (null if missing).
 *  Wrapped in React `cache` so the page and its OG image share one read,
 *  and retried once to absorb transient DynamoDB blips during large SSG builds. */
export const getDrugBySlug = cache(
  async (slug: string): Promise<DrugArticle | null> => {
    if (!slug) return null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await doc.send(new GetCommand({ TableName: TABLE, Key: { slug } }));
        return (res.Item as DrugArticle) || null;
      } catch (err) {
        if (attempt === 2) throw err;
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
    return null;
  },
);

/**
 * Every published drug slug — used for SSG (generateStaticParams) and the
 * sitemap. Pages through the GSI so it scales past the 1MB query limit.
 */
export async function getAllDrugSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let lastKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: STATUS_GSI,
        KeyConditionExpression: 'pubStatus = :s',
        ExpressionAttributeValues: { ':s': PUB_STATUS },
        ProjectionExpression: 'slug',
        ExclusiveStartKey: lastKey,
      }),
    );
    for (const item of res.Items ?? []) {
      if (item.slug) slugs.push(String(item.slug));
    }
    lastKey = res.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastKey);
  return slugs;
}

/** Alphabetical list of all published drugs (paged through the GSI). */
export async function getAllDrugs(): Promise<DrugListItem[]> {
  const items: DrugListItem[] = [];
  let lastKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: STATUS_GSI,
        KeyConditionExpression: 'pubStatus = :s',
        ExpressionAttributeValues: { ':s': PUB_STATUS },
        ProjectionExpression: LIST_PROJECTION,
        ExclusiveStartKey: lastKey,
      }),
    );
    for (const raw of res.Items ?? []) items.push(toListItem(raw));
    lastKey = res.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastKey);
  return items;
}

/**
 * Other drugs in the same therapeutic category — powers the "Related medicines"
 * internal links, which spread crawl equity across the library and keep
 * readers on-site.
 *
 * Implementation note: this is built from ONE cached scan of the category index
 * rather than a query per page. Pre-rendering 1,300+ pages with a per-page
 * query saturates the DynamoDB connection pool and fails the build, so the
 * grouping is computed once and memoised for the whole build/runtime process.
 *
 * Note: the scraped source data also had a `related_articles` field, but those
 * URLs pointed to an external blog, so they are deliberately not used here.
 */
let categoryIndexPromise: Promise<Map<string, DrugListItem[]>> | null = null;

function loadCategoryIndex(): Promise<Map<string, DrugListItem[]>> {
  if (categoryIndexPromise) return categoryIndexPromise;

  categoryIndexPromise = (async () => {
    const byCategory = new Map<string, DrugListItem[]>();
    let lastKey: Record<string, unknown> | undefined;
    do {
      const res = await doc.send(
        new ScanCommand({
          TableName: TABLE,
          ProjectionExpression: 'slug, title, drugName, genericName, summary, primaryCategory',
          ExclusiveStartKey: lastKey,
        }),
      );
      for (const raw of res.Items ?? []) {
        const category = String(raw.primaryCategory ?? '').trim();
        if (!category) continue;
        const list = byCategory.get(category) ?? [];
        list.push(toListItem(raw));
        byCategory.set(category, list);
      }
      lastKey = res.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);

    for (const list of byCategory.values()) {
      list.sort((a, b) => a.drugName.localeCompare(b.drugName));
    }
    return byCategory;
  })().catch((err) => {
    // Never let related-links failure break a page; reset so a later call retries.
    categoryIndexPromise = null;
    throw err;
  });

  return categoryIndexPromise;
}

export async function getRelatedDrugs(
  category: string | null | undefined,
  excludeSlug: string,
  limit = 6,
): Promise<DrugListItem[]> {
  if (!category) return [];
  try {
    const index = await loadCategoryIndex();
    const siblings = index.get(category.trim()) ?? [];
    return siblings.filter((item) => item.slug !== excludeSlug).slice(0, limit);
  } catch {
    return [];
  }
}

// ─── Category hub pages ──────────────────────────────────────────────────────

/** URL-safe slug for a category name, e.g. "Heart Health" → "heart-health". */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** All categories with their drug counts, sorted by size (desc). */
export async function getAllCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
  const index = await loadCategoryIndex();
  return [...index.entries()]
    .map(([name, list]) => ({ name, slug: categoryToSlug(name), count: list.length }))
    .sort((a, b) => b.count - a.count);
}

/** Resolve a category slug back to its display name + drugs. */
export async function getCategoryBySlug(
  slug: string,
): Promise<{ name: string; drugs: DrugListItem[] } | null> {
  const index = await loadCategoryIndex();
  for (const [name, list] of index.entries()) {
    if (categoryToSlug(name) === slug) return { name, drugs: list };
  }
  return null;
}

// ─── A–Z index ───────────────────────────────────────────────────────────────

/** First-letter bucket for a drug (A–Z, or "#" for non-alphabetic). */
export function firstLetter(item: DrugListItem): string {
  const name = (item.drugName || item.title || '').trim();
  const ch = name.charAt(0).toUpperCase();
  return ch >= 'A' && ch <= 'Z' ? ch : '#';
}

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * All drugs grouped by first letter, each group sorted alphabetically.
 * Powers the A–Z browse index (no pagination needed — every drug is in the HTML).
 */
export async function getDrugsByLetter(): Promise<Record<string, DrugListItem[]>> {
  const drugs = await getAllDrugs();
  const groups: Record<string, DrugListItem[]> = {};
  for (const drug of drugs) {
    const letter = firstLetter(drug);
    (groups[letter] ??= []).push(drug);
  }
  for (const list of Object.values(groups)) {
    list.sort((a, b) => (a.drugName || a.title).localeCompare(b.drugName || b.title));
  }
  return groups;
}

/**
 * A curated set of well-known drugs for a "Popular Drugs" highlight strip.
 * Every slug below is verified to exist in the dataset; the fetch also falls
 * back gracefully and simply skips any slug that is missing.
 * Ordered by general recognizability across common therapeutic areas
 * (weight-loss/diabetes, mental health, pain, cardiac, allergy).
 */
const POPULAR_SLUGS = [
  'ozempic-generic-semaglutide',        // diabetes / weight loss
  'mounjaro-generic-tirzepatide-10mg',  // diabetes / weight loss
  'lexapro-generic-escitalopram',       // mental health
  'zoloft-generic-sertraline',          // mental health
  'lipitor-generic-atorvastatin',       // cholesterol
  'tylenol-generic-acetaminophen',      // pain / fever
  'advil-generic-ibuprofen',            // pain
  'amoxil-generic-amoxicillin',         // antibiotic
  'synthroid-generic-levothyroxine',    // thyroid
  'eliquis-generic-apixaban',           // blood thinner
  'zyrtec-generic-cetirizine',          // allergy
  'viagra-generic-sildenafil',          // men's health
  'prozac-generic-fluoxetine',
  'adderall-generic-amphetamine-dextroamphetamine',
  'jardiance-generic-empagliflozin',
  'nexium-generic-esomeprazole',
];

export async function getPopularDrugs(limit = 4): Promise<DrugListItem[]> {
  const results: DrugListItem[] = [];
  for (const slug of POPULAR_SLUGS) {
    if (results.length >= limit) break;
    const article = await getDrugBySlug(slug);
    if (article) {
      results.push({
        slug: article.slug,
        title: article.title,
        drugName: article.drugName,
        brandName: article.brandName,
        genericName: article.genericName,
        summary: article.summary,
      });
    }
  }
  return results;
}

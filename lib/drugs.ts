import 'server-only';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

/**
 * Server-side data access for the drug library.
 *
 * Reads the DynamoDB `drug_articles` table (PK: slug,
 * GSI `drugs-by-status`: pubStatus HASH + titleLower RANGE) directly at
 * build/request time. This runs only on the server, so AWS credentials never
 * reach the browser and the drug content is present in the initial HTML (SEO).
 */

const REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE = process.env.DYNAMO_TABLE_DRUG_ARTICLES || 'drug_articles';
const GSI = 'drugs-by-status';
const PUB_STATUS = 'published';

const client = new DynamoDBClient({ region: REGION });
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

/** Fetch a single full article by slug (null if missing). */
export async function getDrugBySlug(slug: string): Promise<DrugArticle | null> {
  if (!slug) return null;
  const res = await doc.send(new GetCommand({ TableName: TABLE, Key: { slug } }));
  return (res.Item as DrugArticle) || null;
}

/**
 * Fetch every published drug slug — used for SSG (generateStaticParams) and
 * the sitemap. Pages through the GSI so it scales past the 1MB query limit.
 */
export async function getAllDrugSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let lastKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: GSI,
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
        IndexName: GSI,
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

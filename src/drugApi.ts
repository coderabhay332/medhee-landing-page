export interface DrugListItem {
  slug: string;
  title: string;
  drugName: string;
  brandName: string | null;
  genericName: string | null;
  summary: string;
}

export interface DrugListResponse {
  items: DrugListItem[];
  nextCursor: string | null;
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
  interactions: Array<{
    agent: string;
    severityHint: string | null;
    text: string;
  }>;
  sideEffects: unknown[];
  sections: DrugSection[];
  ctaCategories: string[];
  sourceUrl: string | null;
  datePublished: string | null;
  dateModified: string | null;
}

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
};

const configuredBase = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');
export const API_BASE =
  configuredBase ||
  (import.meta.env.DEV ? 'http://localhost:8080/api' : 'https://api.medhee.com/api');

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new Error('Unable to reach the Medhee drug library. Please try again.');
  }

  const envelope = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok) {
    throw new Error(envelope.error || envelope.message || `Request failed (${response.status})`);
  }
  return (envelope.data ?? envelope) as T;
}

export function listDrugs(
  params: { q?: string; limit?: number; cursor?: string } = {},
  signal?: AbortSignal,
): Promise<DrugListResponse> {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.limit) query.set('limit', String(params.limit));
  if (params.cursor) query.set('cursor', params.cursor);
  const suffix = query.size ? `?${query.toString()}` : '';
  return request<DrugListResponse>(`/drugs${suffix}`, signal);
}

export function getDrugBySlug(slug: string, signal?: AbortSignal): Promise<DrugArticle> {
  return request<DrugArticle>(`/drugs/${encodeURIComponent(slug)}`, signal);
}

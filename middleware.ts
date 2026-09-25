import { NextResponse, type NextRequest } from 'next/server';

/**
 * Edge middleware: lightweight per-IP rate limiting to blunt bulk scraping of
 * the drug library — WITHOUT touching SEO.
 *
 * Design:
 *  - Known, legitimate search-engine crawlers are EXEMPT (never throttled), so
 *    indexing is unaffected. (Cloudflare/host-level verified-bot checks add the
 *    stronger guarantee; this UA allowlist is a fast first pass.)
 *  - Everyone else gets a generous sliding-window budget. Normal humans never
 *    hit it; a script fetching hundreds of pages quickly does.
 *  - Only the public drug library is guarded (`/drugs...`). Marketing/legal
 *    pages are untouched.
 *
 * Caveat: this in-memory limiter is per-instance. On serverless/multi-region
 * hosting it is best-effort; the authoritative rate limiting should live at the
 * Cloudflare/WAF layer (see project docs). It still meaningfully slows scrapers.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 40; // generous for humans browsing; low enough to slow scrapers

// Legitimate crawlers we never want to throttle (protects SEO).
const SEARCH_ENGINE_UA =
  /(googlebot|google-inspectiontool|bingbot|duckduckbot|slurp|yandex(bot)?|baiduspider|applebot|petalbot)/i;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';

  // Never rate-limit real search engines — SEO stays fully intact.
  if (SEARCH_ENGINE_UA.test(ua)) return NextResponse.next();

  const ip = clientIp(req);
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    bucket.count += 1;
    if (bucket.count > MAX_REQUESTS) {
      const retry = Math.ceil((bucket.resetAt - now) / 1000);
      return new NextResponse('Too many requests. Please slow down.', {
        status: 429,
        headers: {
          'Retry-After': String(retry),
          'Cache-Control': 'no-store',
        },
      });
    }
  }

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (buckets.size > 10_000) {
    for (const [key, b] of buckets) {
      if (now > b.resetAt) buckets.delete(key);
    }
  }

  return NextResponse.next();
}

// Guard only the public drug library; static assets and other routes are skipped.
export const config = {
  matcher: ['/drugs/:path*'],
};

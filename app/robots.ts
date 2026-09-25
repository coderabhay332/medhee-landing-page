import type { MetadataRoute } from 'next';

/**
 * robots.txt
 *
 * SEO-safe anti-scraping: search engines that drive traffic (Google, Bing,
 * DuckDuckGo, Yandex, etc.) get FULL access. Known AI-training crawlers and
 * generic scrapers are disallowed so the drug library isn't harvested wholesale
 * into third-party datasets / LLM training sets.
 *
 * Note: robots.txt is advisory — well-behaved crawlers obey it, malicious
 * scrapers ignore it. Enforcement against bad actors is handled by rate
 * limiting (middleware.ts) and Cloudflare bot management.
 */

// Crawlers we do NOT want harvesting the content (AI training + aggressive SEO scrapers).
const BLOCKED_BOTS = [
  'GPTBot', // OpenAI
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'anthropic-ai',
  'CCBot', // Common Crawl (feeds many LLMs)
  'Google-Extended', // opts out of Gemini/Vertex training WITHOUT affecting Google Search
  'Applebot-Extended',
  'Bytespider', // TikTok/ByteDance — aggressive
  'Amazonbot',
  'Meta-ExternalAgent',
  'FacebookBot',
  'Diffbot',
  'Omgili',
  'PerplexityBot',
  'cohere-ai',
  'AhrefsBot', // SEO scrapers
  'SemrushBot',
  'DotBot',
  'MJ12bot',
  'DataForSeoBot',
  'magpie-crawler',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone else (incl. Googlebot, Bingbot, DuckDuckBot, etc.) — full access.
      { userAgent: '*', allow: '/' },
      // Named bad/AI bots — fully disallowed.
      ...BLOCKED_BOTS.map((bot) => ({ userAgent: bot, disallow: '/' })),
    ],
    sitemap: 'https://medhee.com/sitemap.xml',
    host: 'https://medhee.com',
  };
}

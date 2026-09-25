import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://medhee.com/sitemap.xml',
    host: 'https://medhee.com',
  };
}

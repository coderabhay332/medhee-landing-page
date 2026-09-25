import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time: no render-blocking request to fonts.googleapis.com
// and no layout shift (font-display: swap + size-adjust metrics).
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = 'https://medhee.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Medhee | Official Website — Personal Health Operating System & Drug Safety',
    template: '%s | Medhee',
  },
  description:
    'Medhee (medhee.com) is the official Personal Health Operating System. Continuously link medical records, active medications, allergies, and lab reports for instant clinical context and drug safety checking.',
  keywords: [
    'Medhee', 'medhee', 'medhee.com', 'Medhee Official Website', 'Medhee Health',
    'Medhee OS', 'Drug Safety Checker', 'Medical Memory', 'Health Records App',
    'AI Doctor Context', 'Clinical History App',
  ],
  authors: [{ name: 'Medhee Inc.' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Medhee',
    locale: 'en_US',
    title: 'Medhee | Official Website — Personal Health Operating System',
    description:
      'Medhee is healthcare that remembers you. Continuously link your medical history, drug safety alerts, and doctor network context in 60 seconds.',
    // OG image is generated dynamically by app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medhee | Official Website — Personal Health Operating System',
    description:
      'Medhee is healthcare that remembers you. Continuously link your medical history, drug safety alerts, and doctor network context in 60 seconds.',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://medhee.com/#organization',
      name: 'Medhee',
      alternateName: ['Medhee Inc.', 'Medhee Health', 'medhee.com'],
      url: 'https://medhee.com/',
      logo: 'https://medhee.com/opengraph-image',
      sameAs: ['https://twitter.com/medheehealth', 'https://linkedin.com/company/medhee'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'doctors@medhee.com',
        contactType: 'customer service',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://medhee.com/#website',
      url: 'https://medhee.com/',
      name: 'Medhee',
      alternateName: 'Medhee Official Website',
      publisher: { '@id': 'https://medhee.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://medhee.com/#software',
      name: 'Medhee',
      alternateName: 'Medhee OS',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android, Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Medhee is a Personal Health Operating System that securely links medical records, drug safety checking, and instant clinical history synthesis.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

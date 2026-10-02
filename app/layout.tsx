import type { Metadata } from 'next';
import { Inter, Anek_Devanagari, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time: no render-blocking request to fonts.googleapis.com
// and no layout shift (font-display: swap + size-adjust metrics).
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Ek Type's Anek covers Latin and Devanagari, so Hindi headings match the English ones.
const anek = Anek_Devanagari({
  subsets: ['latin', 'devanagari'],
  variable: '--font-anek',
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
    default: 'Medhee | Your medicines, reports and doctor in one app',
    template: '%s | Medhee',
  },
  description:
    'Medhee keeps your medicines, allergies and lab reports in one place, warns you about risky medicine combinations, and lets you consult a doctor who already knows your history. In English and Hindi.',
  keywords: [
    'Medhee', 'medhee.com', 'drug interaction checker', 'medicine reminder app', 'lab report explained',
    'online doctor consultation', 'AI nurse', 'family health app', 'health records app India', 'Hindi health app',
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
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Medhee',
    locale: 'en_IN',
    title: 'Medhee | Healthcare that remembers you',
    description:
      'Your medicines, allergies and reports in one place. Medicine safety checks, an AI nurse, and doctor consults that start with your full history.',
    // OG image is generated dynamically by app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medhee | Healthcare that remembers you',
    description:
      'Your medicines, allergies and reports in one place. Medicine safety checks, an AI nurse, and doctor consults that start with your full history.',
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
      logo: 'https://medhee.com/medhee-logo.svg',
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
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android, iOS, Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      description:
        'Medhee keeps your medicines, allergies and lab reports in one place, checks medicine combinations for safety, and connects you with doctors who can see your history.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anek.variable} ${jetbrainsMono.variable}`}>
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

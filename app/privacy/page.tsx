import type { Metadata } from 'next';
import PagePrivacy from '@/src/components/PagePrivacy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Medhee Privacy Policy — how we collect, use, and protect your personal health data under the DPDP Act 2023.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return <PagePrivacy />;
}

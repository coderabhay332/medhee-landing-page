import type { Metadata } from 'next';
import PageTerms from '@/src/components/PageTerms';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Medhee Terms of Service governing use of the Medhee website and mobile application.',
  alternates: { canonical: '/terms' },
};

export default function Page() {
  return <PageTerms />;
}

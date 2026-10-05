import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { HistoryClient } from './HistoryClient';

export const metadata: Metadata = {
  title: 'Loan emi calculator App',
  description: 'Loan emi calculator App',
  robots: 'noindex',
  alternates: {
    canonical: `${siteConfig.url}/history`,
  },
};

export default function HistoryPage() {
  return <HistoryClient />;
}

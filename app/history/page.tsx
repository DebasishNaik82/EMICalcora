import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { HistoryClient } from './HistoryClient';

export const metadata: Metadata = {
  title: 'Calculation History - Review Your Saved Results',
  description: 'View and manage your previously saved loan EMI, SIP, and investment calculations on EMI Calcora.',
  alternates: {
    canonical: `${siteConfig.url}/history`,
  },
};

export default function HistoryPage() {
  return <HistoryClient />;
}

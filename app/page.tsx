import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'EMI Calcora | Loan EMI Calculator & Online Monthly Payment Calculator',
  description: 'EMI Calcora is your free, accurate online EMI calculator. Calculate loan monthly payments, interest, and repayment schedules for personal, home, and car loans.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return <HomeClient />;
}

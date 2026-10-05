import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'EMI Calculator Online | Calculate Loan EMI | EMI Calcora',
  description: 'Free EMI Calculator by EMI Calcora to calculate monthly EMI, total interest, principal and total repayment for home, car and personal loans.',
  keywords: [
    'EMI calculator',
    'loan EMI calculator',
    'EMI calculator online',
    'home loan EMI calculator',
    'car loan EMI calculator',
    'personal loan EMI calculator',
    'monthly EMI calculator',
    'EMI Calcora',
    'EMI Calcora calculator',
    'Emi calcora',
    'EMI CALCORA'
  ],
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return <HomeClient />;
}

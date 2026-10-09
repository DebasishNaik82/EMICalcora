import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'EMI Calcora | EMI Calculator Online',
  description: 'EMI Calcora is a free online EMI Calculator to calculate loan EMIs, interest, and total repayment for home, car, and personal loans.',
  keywords: [
    'EMI Calcora',
    'EMICalcora',
    'EMI Calcora EMI Calculator',
    'EMI calculator',
    'loan EMI calculator',
    'EMI calculator online',
    'home loan EMI calculator',
    'car loan EMI calculator',
    'personal loan EMI calculator',
    'monthly EMI calculator',
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

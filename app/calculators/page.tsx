import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { CalculatorsClient } from './CalculatorsClient';

export const metadata: Metadata = {
  title: 'All Financial Calculators - EMI, SIP, FD, Loans, Tax | EMI Calcora',
  description: 'Explore the complete directory of free financial calculators including Home Loan EMI, Personal Loan, SIP, Mutual Funds, FD, PPF, GST, and Prepayment simulators.',
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
  },
};

export default function CalculatorsIndexPage() {
  return <CalculatorsClient />;
}

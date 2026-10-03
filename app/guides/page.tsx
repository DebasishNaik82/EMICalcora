import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { GuidesClient } from './GuidesClient';

export const metadata: Metadata = {
  title: 'Financial Planning Guides & Educational Resources | EMI Calcora',
  description: 'In-depth educational guides explaining loan EMI formulas, SIP vs Fixed Deposit comparisons, PPF interest rules, and GST calculation methodologies.',
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesIndexPage() {
  return <GuidesClient />;
}

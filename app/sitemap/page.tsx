import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { SitemapClient } from './SitemapClient';

export const metadata: Metadata = {
  title: 'Sitemap - EMI Calcora Calculators & Guides Index',
  description: 'Complete HTML sitemap of all financial calculators, evergreen finance guides, and trust pages on EMI Calcora.',
  alternates: {
    canonical: `${siteConfig.url}/sitemap`,
  },
};

export default function SitemapPage() {
  return <SitemapClient />;
}

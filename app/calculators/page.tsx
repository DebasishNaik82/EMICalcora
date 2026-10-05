import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { CALCULATOR_DATA } from '@/lib/seo-data';
import { CalculatorsClient } from './CalculatorsClient';

export const metadata: Metadata = {
  title: 'All Financial Calculators - EMI, SIP, FD, Loans, Tax | EMI Calcora',
  description: 'Explore the complete directory of free financial calculators including Home Loan EMI, Personal Loan, SIP, Mutual Funds, FD, PPF, GST, and Prepayment simulators.',
  alternates: {
    canonical: `${siteConfig.url}/calculators`,
  },
};

export default function CalculatorsIndexPage() {
  const allCalcs = Object.values(CALCULATOR_DATA);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteConfig.url,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Calculators',
            'item': `${siteConfig.url}/calculators`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        'name': 'Financial Calculators Directory',
        'description': 'A list of professional financial calculation tools for borrowing, tax planning, and investment analysis.',
        'numberOfItems': allCalcs.length,
        'itemListElement': allCalcs.map((calc, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'item': {
            '@type': 'WebApplication',
            'name': calc.name,
            'url': `${siteConfig.url}/calculators/${calc.slug}`,
            'applicationCategory': 'FinanceApplication',
            'operatingSystem': 'All',
            'description': calc.description,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'INR',
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorsClient />
    </>
  );
}

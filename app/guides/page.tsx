import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { GUIDE_DATA } from '@/lib/seo-data';
import { GuidesClient } from './GuidesClient';

export const metadata: Metadata = {
  title: 'Financial Planning Guides & Educational Resources | EMI Calcora',
  description: 'In-depth educational guides explaining loan EMI formulas, SIP vs Fixed Deposit comparisons, PPF interest rules, and GST calculation methodologies.',
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesIndexPage() {
  const allGuides = Object.values(GUIDE_DATA);
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
            'name': 'Guides',
            'item': `${siteConfig.url}/guides`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        'name': 'Financial Planning Guides & Educational Resources',
        'description': 'A list of detailed guides explaining compounding math, interest formulas, and personal finance strategies.',
        'numberOfItems': allGuides.length,
        'itemListElement': allGuides.map((guide, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'item': {
            '@type': 'Article',
            'headline': guide.title,
            'description': guide.description,
            'url': `${siteConfig.url}/guides/${guide.slug}`,
            'datePublished': guide.publishedDate,
            'author': {
              '@type': 'Organization',
              'name': 'EMI Calcora Financial Editorial Team',
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
      <GuidesClient />
    </>
  );
}

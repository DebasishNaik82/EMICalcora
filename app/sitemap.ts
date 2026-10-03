import { MetadataRoute } from 'next';
import { CALCULATOR_DATA, GUIDE_DATA } from '@/lib/seo-data';
import { siteConfig } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  
  const calculatorSlugs = Object.keys(CALCULATOR_DATA);
  const guideSlugs = Object.keys(GUIDE_DATA);
  const trustPages = ['calculators', 'guides', 'about', 'contact', 'privacy', 'terms', 'disclaimer', 'methodology'];

  const calcEntries = calculatorSlugs.map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const guideEntries = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: GUIDE_DATA[slug].publishedDate ? new Date(GUIDE_DATA[slug].publishedDate) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const trustEntries = trustPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...calcEntries,
    ...guideEntries,
    ...trustEntries,
  ];
}

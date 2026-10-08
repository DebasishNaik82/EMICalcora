import { notFound, permanentRedirect } from 'next/navigation';
import { CALCULATOR_DATA, CALCULATOR_PATH_MAP, PATH_TO_SLUG_MAP } from '@/lib/seo-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CALCULATOR_DATA).map((slug) => ({ slug }));
}

export default async function CalculatorLegacyRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const calcKey = PATH_TO_SLUG_MAP[slug] || slug;

  if (!calcKey || !CALCULATOR_DATA[calcKey]) {
    notFound();
  }

  const descriptivePath = CALCULATOR_PATH_MAP[calcKey] || slug;
  permanentRedirect(`/${descriptivePath}`);
}


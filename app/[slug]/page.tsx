import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { 
  CALCULATOR_DATA, 
  CALCULATOR_PATH_MAP, 
  PATH_TO_SLUG_MAP, 
  getCalculatorUrl 
} from '@/lib/seo-data';
import { ArrowLeft, ChevronRight, HelpCircle, BookOpen, Calculator, CheckCircle2 } from 'lucide-react';
import { CalculatorClientMount } from '../calculators/[slug]/CalculatorClientMount';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/PageHeader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const descriptivePaths = Object.values(CALCULATOR_PATH_MAP);
  const shortSlugs = Object.keys(CALCULATOR_DATA);
  const allPaths = Array.from(new Set([...descriptivePaths, ...shortSlugs, 'loan-calculator']));
  return allPaths.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calcKey = PATH_TO_SLUG_MAP[slug];
  if (!calcKey) return { title: 'Calculator Not Found | EMI Calcora' };

  const calc = CALCULATOR_DATA[calcKey];
  if (!calc) return { title: 'Calculator Not Found | EMI Calcora' };

  const canonicalPath = CALCULATOR_PATH_MAP[calcKey] || slug;

  return {
    title: calc.title,
    description: calc.description,
    alternates: {
      canonical: `${siteConfig.url}/${canonicalPath}`,
    },
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: `${siteConfig.url}/${canonicalPath}`,
      siteName: `${siteConfig.name} Financial Tools`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.title,
      description: calc.description,
    },
  };
}

export default async function TopLevelCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calcKey = PATH_TO_SLUG_MAP[slug];

  if (!calcKey || !CALCULATOR_DATA[calcKey]) {
    notFound();
  }

  const canonicalPath = CALCULATOR_PATH_MAP[calcKey];

  // If accessed via non-canonical path (e.g. /emi or /loan-calculator), issue 308 permanent redirect
  if (slug !== canonicalPath) {
    permanentRedirect(`/${canonicalPath}`);
  }

  const calc = CALCULATOR_DATA[calcKey];

  // Structured Data JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': calc.name,
        'url': `${siteConfig.url}/${canonicalPath}`,
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'browser': 'Requires JavaScript. Requires HTML5.',
        'description': calc.description,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'INR'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteConfig.url
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Calculators',
            'item': `${siteConfig.url}/calculators`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': calc.name,
            'item': `${siteConfig.url}/${canonicalPath}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': calc.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader homeLabel="All Calculators" homeHref="/calculators" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb visible navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href="/calculators" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Calculators</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">{calc.name}</span>
        </nav>

        {/* Hero Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {calc.name}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {calc.description}
          </p>
        </div>

        {/* Interactive Calculator Mount */}
        <div className="mb-12 bg-white dark:bg-zinc-900 rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CalculatorClientMount slug={calcKey} />
        </div>

        {/* Comprehensive SEO & Educational Content */}
        <div className="space-y-10 bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
          
          {/* Section 1: What is this calculator */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              1. What is the {calc.name}?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              {calc.whatIsIt}
            </p>
          </section>

          {/* Section 2: Who should use it */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              2. Who Should Use This Calculator?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              {calc.whoShouldUse}
            </p>
          </section>

          {/* Section 3: How does it work */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              3. How Does It Work?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              {calc.howItWorks}
            </p>
          </section>

          {/* Section 4: Formula used */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              4. Formula Used
            </h2>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 whitespace-pre-line">
              {calc.formula}
            </div>
          </section>

          {/* Section 5: Practical Example */}
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              5. Practical Calculation Example
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
              <p className="font-semibold text-emerald-950 dark:text-emerald-200 text-sm sm:text-base">
                {calc.example.question}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                {calc.example.details}
              </p>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm sm:text-base pt-1">
                Result: {calc.example.result}
              </p>
            </div>
          </section>

          {/* Section 6: Key Inputs */}
          {calc.inputs && calc.inputs.length > 0 && (
            <section>
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                6. Key Parameters & Inputs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {calc.inputs.map((input, idx) => (
                  <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">
                      {input.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {input.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 7: FAQs */}
          {calc.faqs && calc.faqs.length > 0 && (
            <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                <HelpCircle className="text-emerald-600 shrink-0" size={24} />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4">
                {calc.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-base mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 8: Related Calculators with crawlable links */}
          {calc.relatedCalculators && calc.relatedCalculators.length > 0 && (
            <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                <Calculator className="text-emerald-600 shrink-0" size={22} />
                <span>Related Financial Calculators</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {calc.relatedCalculators.map((related) => (
                  <Link
                    key={related.slug}
                    href={getCalculatorUrl(related.slug)}
                    className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex items-center justify-between group"
                  >
                    <span className="font-display font-medium text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {related.name}
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Related Educational Guides */}
          {calc.relatedGuides && calc.relatedGuides.length > 0 && (
            <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                <BookOpen className="text-emerald-600 shrink-0" size={22} />
                <span>Related Personal Finance Guides</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {calc.relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex items-center justify-between group"
                  >
                    <span className="font-display font-medium text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {guide.title}
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

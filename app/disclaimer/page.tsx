import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Financial Disclaimer - EMI Calcora',
  description: 'Read the official financial disclaimer for EMI Calcora. Calculators and educational guides are for informational purposes only.',
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
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
            'name': 'Financial Disclaimer',
            'item': `${siteConfig.url}/disclaimer`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader homeLabel="Home" homeHref="/" />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Financial Disclaimer</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={24} />
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              EMI Calcora is strictly an educational financial calculation platform and does not provide certified financial, legal, tax, or investment advice.
            </p>
          </div>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">1. No Professional Financial Advice</h2>
          <p>
            The calculations, figures, estimates, and articles provided on EMI Calcora are for informational and illustrative purposes only. They should not be interpreted as professional financial advice, loan sanction guarantees, or investment recommendations.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">2. Bank & Lender Variances</h2>
          <p>
            Actual loan EMIs, interest rates, processing fees, and tax calculations offered by banks, housing finance companies (HFCs), mutual fund houses, or tax authorities may vary based on credit score (CIBIL), applicant profile, collateral valuation, and statutory revisions. Always verify exact terms directly with your lender or financial institution before signing agreements.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">3. Investment Risk Warning</h2>
          <p>
            Mutual fund investments (including SIPs) are subject to market risks. Past performance is no guarantee of future returns. Read all scheme-related documents carefully before investing.
          </p>
        </div>
      </main>
    </div>
  );
}

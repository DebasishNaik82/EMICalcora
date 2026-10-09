import { Metadata } from 'next';
import { Cpu, Calculator, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Calculation Methodology - EMI Calcora',
  description: 'Understand the exact mathematical formulas, reducing balance interest calculations, compounding frequencies, and algorithms used across EMI Calcora.',
  alternates: {
    canonical: `${siteConfig.url}/methodology`,
  },
};

export default function MethodologyPage() {
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
            'name': 'Methodology',
            'item': `${siteConfig.url}/methodology`,
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Data & Calculation Methodology</h1>
        
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50">Transparent Mathematical Models</h2>
              <p className="text-sm text-zinc-500">How EMI Calcora computes financial results with 100% precision</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">1. Loan EMI & Reducing Balance Amortization</h3>
            <p>
              Loans calculated on EMI Calcora use the globally standard <strong>Reducing Balance Method</strong>. In this model, interest is computed each month only on the remaining principal balance.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-emerald-700 dark:text-emerald-400">
              EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
            </div>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 pl-4">
              <li>• <strong>P (Principal Amount):</strong> Total money borrowed from the lender.</li>
              <li>• <strong>R (Monthly Rate):</strong> Annual Interest Rate divided by 12 and 100 (e.g. 10.5% per year = 10.5 / 12 / 100 = 0.00875 per month).</li>
              <li>• <strong>N (Tenure in Months):</strong> Loan tenure expressed in total monthly payments (e.g. 5 years = 60 months).</li>
              <li>• <strong>Total Repayment:</strong> <code className="font-mono">EMI × N</code></li>
              <li>• <strong>Total Interest Outgo:</strong> <code className="font-mono">(EMI × N) - P</code></li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">2. SIP Mutual Fund Future Value</h3>
            <p>
              Systematic Investment Plans (SIP) assume fixed monthly contributions compounded at an expected annualized return rate using the annuity formula:
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-emerald-700 dark:text-emerald-400">
              FV = P × [ ( (1 + i)^n - 1 ) / i ] × (1 + i)
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Where <code className="font-mono">P</code> is the monthly investment, <code className="font-mono">i</code> is the expected monthly rate of return (<code className="font-mono">Annual Rate / 12 / 100</code>), and <code className="font-mono">n</code> is the duration in months.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">3. Fixed Deposit (FD) Quarterly Compounding</h3>
            <p>
              Fixed Deposits calculate maturity values based on standard commercial banking practices in India where interest compounds quarterly (4 times per year):
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-emerald-700 dark:text-emerald-400">
              Maturity Amount (A) = P × (1 + R / 400)^(4 × t)
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Where <code className="font-mono">P</code> is the deposit amount, <code className="font-mono">R</code> is the annual interest rate, and <code className="font-mono">t</code> is the tenure in years.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

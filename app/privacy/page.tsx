import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy - EMI Calcora',
  description: 'Read the Privacy Policy for EMI Calcora. Understand how we protect your data, use cookies, and handle analytics and advertising.',
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <PageHeader />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm text-zinc-500">Last updated: August 15, 2026</p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">1. Overview</h2>
          <p>
            At EMI Calcora, accessible from calcora.in, safeguarding your privacy is a top priority. This Privacy Policy document outlines types of information that is collected and recorded by EMI Calcora and how we use it.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">2. Client-Side Calculations & Data Storage</h2>
          <p>
            All financial calculations (loan EMIs, SIP returns, FD interest, GST) are performed directly within your browser (client-side). We do not collect, transmit, store, or sell your personal financial inputs or loan numbers on our backend servers.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">3. Log Files and Analytics</h2>
          <p>
            EMI Calcora follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">4. Google AdSense & Cookies</h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies to serve ads to visitors based on their visit to this and other websites on the internet. Visitors may opt out of personalized advertising by visiting Google Ads Settings or the Network Advertising Initiative.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">5. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </main>
    </div>
  );
}

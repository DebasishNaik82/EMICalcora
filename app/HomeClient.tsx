'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Moon, Sun, Home as HomeIcon, Calculator, Wallet, Percent, 
  PieChart, FileText, ChevronRight, History, TrendingUp, 
  Landmark, ArrowRight, ShieldCheck, Sparkles, BookOpen
} from 'lucide-react';
import { EmiCalculator } from '@/components/EmiCalculator';

import { siteConfig } from '@/lib/site-config';
import { getCalculatorUrl } from '@/lib/seo-data';
import Image from 'next/image';
import { EducationalContent } from '@/components/EducationalContent';
import { motion, AnimatePresence } from 'motion/react';

export function HomeClient() {
  const [currency, setCurrency] = useState('INR');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Enhanced Structured Data JSON-LD for Search Engine Sitelinks & WebSite Recognition
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': siteConfig.name,
        'url': siteConfig.url,
        'description': siteConfig.description,
        'publisher': {
          '@type': 'Organization',
          'name': siteConfig.name,
          'url': siteConfig.url,
          'logo': `${siteConfig.url}/logo-icon.svg`,
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': `${siteConfig.url}/calculators?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        'name': siteConfig.name,
        'url': siteConfig.url,
        'logo': `${siteConfig.url}/logo-icon.svg`,
        'sameAs': [
          siteConfig.links.twitter,
          siteConfig.links.github,
        ]
      },
      {
        '@type': 'ItemList',
        'name': 'Featured Financial Calculators',
        'description': 'Core financial calculation tools available on EMI Calcora',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Loan EMI Calculator',
            'url': `${siteConfig.url}/emi-calculator`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Home Loan EMI Calculator',
            'url': `${siteConfig.url}/home-loan-calculator`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'SIP Calculator',
            'url': `${siteConfig.url}/sip-calculator`
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': 'FD Calculator',
            'url': `${siteConfig.url}/fd-calculator`
          },
          {
            '@type': 'ListItem',
            'position': 5,
            'name': 'GST Calculator',
            'url': `${siteConfig.url}/gst-calculator`
          }
        ]
      }
    ]
  };

  const calculators = [
    { id: 'LOAN_EMI', slug: 'emi', name: 'Loan EMI Calculator', icon: Calculator, category: 'Loans', desc: 'Calculate equated monthly installments, total interest, and complete amortization.' },
    { id: 'HOME_LOAN', slug: 'home-loan', name: 'Home Loan Calculator', icon: HomeIcon, category: 'Loans', desc: 'Plan residential property purchases with prepayment insights and schedules.' },
    { id: 'PERSONAL_LOAN', slug: 'personal-loan', name: 'Personal Loan', icon: Wallet, category: 'Loans', desc: 'Compute monthly budget and interest for unsecured personal borrowing.' },
    { id: 'CAR_LOAN', slug: 'car-loan', name: 'Car/Bike Loan', icon: Calculator, category: 'Loans', desc: 'Auto loan repayment projections with down payment deductions.' },
    { id: 'EDUCATION_LOAN', slug: 'education-loan', name: 'Education Loan', icon: Calculator, category: 'Loans', desc: 'Plan student loans with moratorium period interest estimations.' },
    { id: 'LOAN_ELIGIBILITY', slug: 'eligibility', name: 'Loan Eligibility', icon: FileText, category: 'Loans', desc: 'Determine maximum borrowing capacity based on FOIR and monthly income.' },
    { id: 'LOAN_COMPARISON', slug: 'comparison', name: 'Compare Loans', icon: PieChart, category: 'Loans', desc: 'Side-by-side comparison of two loans with differing interest rates and tenures.' },
    { id: 'EMI_VS_PREPAYMENT', slug: 'prepayment', name: 'EMI vs Prepayment', icon: Calculator, category: 'Loans', desc: 'Simulate lump-sum prepayments and see interest & tenure savings.' },
    { id: 'SIMPLE_INTEREST', slug: 'simple-interest', name: 'Simple Interest', icon: Percent, category: 'Investment', desc: 'Calculate flat-rate interest on principal over any chosen time horizon.' },
    { id: 'COMPOUND_INTEREST', slug: 'compound-interest', name: 'Compound Interest', icon: Percent, category: 'Investment', desc: 'Harness the power of compounding with annual, semi-annual, or quarterly intervals.' },
    { id: 'SIP', slug: 'sip', name: 'SIP Calculator', icon: PieChart, category: 'Investment', desc: 'Systematic Investment Plan mutual fund returns and wealth compounding.' },
    { id: 'FD', slug: 'fd', name: 'FD Calculator', icon: Wallet, category: 'Investment', desc: 'Fixed deposit maturity values with compounding interest calculations.' },
    { id: 'PPF', slug: 'ppf', name: 'PPF Calculator', icon: Landmark, category: 'Investment', desc: 'Public Provident Fund government guaranteed tax-free wealth accumulation.' },
    { id: 'RETIREMENT', slug: 'retirement', name: 'Retirement Planning', icon: TrendingUp, category: 'Investment', desc: 'Calculate nest egg corpus required for financial independence and retirement.' },
    { id: 'GST', slug: 'gst', name: 'GST Calculator', icon: Percent, category: 'Tax', desc: 'Compute Goods & Services Tax inclusive and exclusive price breakdowns.' },
  ];

  const guides = [
    { slug: 'emi-calculation-explained', title: 'EMI Calculation Explained' },
    { slug: 'loan-interest-calculation-explained', title: 'Loan Interest Calculation Explained' },
    { slug: 'sip-calculation-explained', title: 'SIP Calculation Explained' },
    { slug: 'sip-vs-fd', title: 'SIP vs FD Comparison' },
    { slug: 'ppf-calculation-explained', title: 'PPF Calculation Explained' },
    { slug: 'fd-maturity-calculation-explained', title: 'FD Maturity Calculation Explained' },
    { slug: 'gst-calculation-explained', title: 'GST Calculation Explained' },
    { slug: 'how-to-choose-loan-tenure', title: 'How to Choose Loan Tenure' },
    { slug: 'principal-vs-interest-explained', title: 'Principal vs Interest Explained' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src="/logo-icon.svg" alt="EMI Calcora Logo" width={32} height={32} className="rounded-lg shadow-sm" />
            </motion.div>
            <span className="text-2xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMI Calcora
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
              {[
                { name: 'Calculators', href: '/calculators' },
                { name: 'Guides', href: '/guides' },
              ].map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="relative px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span 
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-lg -z-0 opacity-0 group-hover:opacity-100"
                    layoutId="header-bg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                </Link>
              ))}
            </nav>

            <Link
              href="/history"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="View Calculation History"
            >
              <History size={17} />
              <span className="hidden md:inline">History</span>
            </Link>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
            
            <motion.div 
              initial={false}
              className="flex items-center bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 overflow-hidden"
            >
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency Selector"
                className="bg-transparent pl-2 md:pl-3 pr-8 py-1.5 text-sm font-medium cursor-pointer appearance-none outline-none"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors relative overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
              <Sparkles size={14} />
              <span>Free, 100% Client-Side & Private Financial Calculators</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
              EMI Calculator Online
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Calculate loan EMIs, simulate prepayments, model SIP returns, and compute taxes with precision. Every calculator features interactive charts, amortization schedules, and dedicated URLs.
            </p>
          </div>

          {/* Quick-Start Featured Interactive EMI Calculator */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-zinc-100 dark:border-zinc-800 gap-2">
              <div>
                <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100">
                  Instant Loan EMI Calculator
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Quick calculation tool. Or visit dedicated pages for comprehensive guides and full schedules.
                </p>
              </div>
              <Link
                href="/emi-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <span>Full Page View & Formula</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <EmiCalculator type="LOAN_EMI" currency={currency} />
          </div>
        </div>
      </motion.section>

      {/* All Calculators Directory by Category with Dedicated URLs */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-14">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Explore All Calculators
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Each calculator has its own dedicated URL, interactive amortization chart, and financial breakdown.
              </p>
            </div>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
            >
              <span>View Full Directory</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-12">
            {['Loans', 'Investment', 'Tax'].map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>{category} Calculators</span>
                </h3>
                
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calculators.filter(c => c.category === category).map((calc, idx) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (idx % 3) * 0.1,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Link
                        href={getCalculatorUrl(calc.slug)}
                        className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group flex flex-col justify-between h-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:to-emerald-500/[0.02] transition-colors" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                              <calc.icon size={22} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                {calc.name}
                              </h4>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                                {calc.desc}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <span>Open Calculator</span>
                          <ChevronRight size={16} className="text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evergreen Financial Guides Section with Dedicated URLs */}
        <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <BookOpen size={14} />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Evergreen Financial Guides
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                In-depth articles explaining formulas, rules, and smart personal finance decisions.
              </p>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
            >
              <span>All Guides</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, idx) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={`/guides/${guide.slug}`}
                  className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <span className="font-display font-medium text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {guide.title}
                  </span>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <EducationalContent />
      </div>
    </div>
  );
}

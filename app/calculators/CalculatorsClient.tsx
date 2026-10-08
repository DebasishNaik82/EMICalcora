'use client';

import Link from 'next/link';
import { Calculator, ChevronRight, TrendingUp, Percent } from 'lucide-react';
import { CALCULATOR_DATA, getCalculatorUrl } from '@/lib/seo-data';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'motion/react';

const CATEGORY_MAP: Record<string, { icon: any; description: string }> = {
  Loans: {
    icon: Calculator,
    description: 'Calculate loan EMIs, total interest, eligibility, and evaluate prepayments for home, auto, and personal financing.',
  },
  Investment: {
    icon: TrendingUp,
    description: 'Project compounding returns, maturity values, and wealth creation across SIPs, Fixed Deposits, and PPF.',
  },
  Tax: {
    icon: Percent,
    description: 'Compute inclusive and exclusive goods and services tax (GST) breakdowns instantly.',
  },
};

export function CalculatorsClient() {
  const allCalculators = Object.values(CALCULATOR_DATA);
  const categories = ['Loans', 'Investment', 'Tax'];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <PageHeader homeLabel="Home" homeHref="/" />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Financial Calculators Directory
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Choose from 15+ specialized financial calculators for loans, investments, interest, and taxes. Each calculator provides interactive charts, detailed amortization schedules, and formula breakdowns.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category) => {
            const items = allCalculators.filter((c) => c.category === category);
            const catMeta = CATEGORY_MAP[category] || { icon: Calculator, description: '' };
            const IconComponent = catMeta.icon;

            return (
              <section key={category} className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {category} Calculators
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{catMeta.description}</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((calc, idx) => (
                    <motion.div
                      key={calc.slug}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link
                        href={getCalculatorUrl(calc.slug)}
                        className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {calc.name}
                            </h3>
                            <ChevronRight size={18} className="text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {calc.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <span>Open Calculator</span>
                          <span className="text-zinc-400">{getCalculatorUrl(calc.slug)}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

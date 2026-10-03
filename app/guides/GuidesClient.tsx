'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight, Clock, ArrowLeft, Calculator } from 'lucide-react';
import { GUIDE_DATA } from '@/lib/seo-data';
import { motion } from 'motion/react';
import Image from 'next/image';

export function GuidesClient() {
  const allGuides = Object.values(GUIDE_DATA);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="EMI Calcora Logo" width={32} height={32} className="rounded-lg shadow-sm" />
            <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMI Calcora
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/calculators" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">
              Calculators
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">
              <ArrowLeft size={16} />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <BookOpen size={14} />
            <span>Educational Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Financial Planning & Calculation Guides
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Master the mathematics behind your money. Our comprehensive, editorial guides demystify loan amortizations, compounding interest, tax deductions, and investment strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGuides.map((guide, idx) => (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/guides/${guide.slug}`}
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{guide.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {guide.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span>Read Full Guide</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

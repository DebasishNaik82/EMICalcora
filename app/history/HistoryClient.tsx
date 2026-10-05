'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, History as HistoryIcon } from 'lucide-react';
import { CalculationHistory } from '@/components/CalculationHistory';
import { motion } from 'motion/react';
import Image from 'next/image';

export function HistoryClient() {
  const [currency, setCurrency] = useState('INR');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src="/logo-icon.svg" alt="EMI Calcora Logo" width={32} height={32} className="rounded-lg" />
            </motion.div>
            <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMI Calcora
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg px-2.5 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>
            <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">
              <ArrowLeft size={16} />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <HistoryIcon size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Loan emi calculator App
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Loan emi calculator App
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CalculationHistory currency={currency} />
        </div>
      </motion.main>
    </div>
  );
}

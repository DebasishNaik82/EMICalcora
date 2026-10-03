'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface PageHeaderProps {
  homeLabel?: string;
  homeHref?: string;
}

export function PageHeader({ homeLabel = 'Home', homeHref = '/' }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image src="/logo-icon.svg" alt="EMI Calcora Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          </motion.div>
          <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
            EMI Calcora
          </span>
        </Link>
        <Link 
          href={homeHref} 
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{homeLabel}</span>
        </Link>
      </div>
    </header>
  );
}

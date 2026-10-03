'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { formatCurrency } from '@/lib/finance';

interface CountUpProps {
  to: number;
  currency: string;
  className?: string;
}

export function CountUp({ to, currency, className }: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => formatCurrency(latest, currency));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1], // easeOutQuart
    });

    return controls.stop;
  }, [to, count]);

  return <motion.span className={className}>{rounded}</motion.span>;
}

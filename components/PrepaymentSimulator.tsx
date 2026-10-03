'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { formatCurrency } from '@/lib/finance';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowDownCircle, Clock, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CountUp } from './ui/CountUp';

interface PrepaymentSimulatorProps {
  currency: string;
}

export function PrepaymentSimulator({ currency }: PrepaymentSimulatorProps) {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [monthlyPrepayment, setMonthlyPrepayment] = useState(0);
  const [annualPrepayment, setAnnualPrepayment] = useState(0);
  const [oneTimePrepayment, setOneTimePrepayment] = useState(0);
  const [oneTimeMonth, setOneTimeMonth] = useState(1);
  const [emiIncreasePercent, setEmiIncreasePercent] = useState(0);

  const result = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const n = tenureYears * 12;
    const originalMonthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    // Standard Loan Schedule
    const stdSchedule = [];
    let stdBalance = principal;
    for (let i = 1; i <= n; i++) {
      const interest = stdBalance * monthlyRate;
      const principalPart = originalMonthlyEmi - interest;
      stdBalance -= principalPart;
      stdSchedule.push({ month: i, balance: Math.max(0, stdBalance) });
    }
    const stdTotalInterest = (originalMonthlyEmi * n) - principal;

    // Prepayment Loan Simulation
    let balance = principal;
    let preTotalInterest = 0;
    let monthsTaken = 0;
    let currentEmi = originalMonthlyEmi;
    const preSchedule = [];

    for (let i = 1; i <= 600; i++) { // Max 50 years safety
      if (balance <= 0.01) break;
      
      const interest = balance * monthlyRate;
      preTotalInterest += interest;
      
      // Step-up EMI calculation (Annual increase)
      if (i > 1 && i % 12 === 1 && emiIncreasePercent > 0) {
        currentEmi = currentEmi * (1 + emiIncreasePercent / 100);
      }

      let totalPayment = currentEmi + monthlyPrepayment;
      
      // One-time prepayment
      if (i === oneTimeMonth) {
        totalPayment += oneTimePrepayment;
      }

      // Annual prepayment
      if (i > 0 && i % 12 === 0) {
        totalPayment += annualPrepayment;
      }

      if (totalPayment > balance + interest) {
        totalPayment = balance + interest;
      }
      
      const principalPart = totalPayment - interest;
      balance -= principalPart;
      monthsTaken++;
      
      if (i % 12 === 0 || balance <= 0) {
        preSchedule.push({ 
          year: Math.ceil(i / 12), 
          stdBalance: stdSchedule[i-1]?.balance || 0,
          preBalance: Math.max(0, balance) 
        });
      }
    }

    const interestSaved = stdTotalInterest - preTotalInterest;
    const monthsSaved = n - monthsTaken;

    return {
      monthlyEmi: originalMonthlyEmi,
      stdTotalInterest,
      preTotalInterest,
      interestSaved,
      monthsSaved,
      monthsTaken,
      preSchedule
    };
  }, [principal, rate, tenureYears, monthlyPrepayment, annualPrepayment, oneTimePrepayment, oneTimeMonth, emiIncreasePercent]);

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-display font-bold tracking-tight mb-6 flex items-center gap-2">
            <Clock className="text-emerald-600" size={20} />
            Standard Loan Terms
          </h2>
          
          <InputSlider label="Loan Amount" value={principal} onChange={setPrincipal} min={100000} max={50000000} step={100000} prefix={prefix} />
          <InputSlider label="Interest Rate" value={rate} onChange={setRate} min={1} max={25} step={0.1} unit="%" />
          <InputSlider label="Tenure" value={tenureYears} onChange={setTenureYears} min={1} max={30} step={1} unit="Yr" />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-display font-bold tracking-tight mb-6 flex items-center gap-2">
            <Zap className="text-amber-500" size={20} />
            Prepayment Strategies
          </h2>
          
          <InputSlider label="Extra Monthly" value={monthlyPrepayment} onChange={setMonthlyPrepayment} min={0} max={200000} step={1000} prefix={prefix} tooltip="Added to every EMI" />
          <InputSlider label="Annual Lump Sum" value={annualPrepayment} onChange={setAnnualPrepayment} min={0} max={1000000} step={5000} prefix={prefix} tooltip="Paid once every 12 months" />
          
          <div className="grid grid-cols-2 gap-4">
            <InputSlider label="One-time Amount" value={oneTimePrepayment} onChange={setOneTimePrepayment} min={0} max={5000000} step={10000} prefix={prefix} />
            <InputSlider label="At Month" value={oneTimeMonth} onChange={setOneTimeMonth} min={1} max={360} step={1} unit="Mo" />
          </div>

          <InputSlider label="EMI Step-up % (Yearly)" value={emiIncreasePercent} onChange={setEmiIncreasePercent} min={0} max={20} step={1} unit="%" tooltip="Increase your EMI amount every year as your income grows" />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20"
          >
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Interest Saved</p>
            <CountUp to={result.interestSaved} currency={currency} className="text-3xl font-display font-bold" />
            <div className="mt-4 flex items-center gap-2 text-xs bg-emerald-500/30 px-3 py-1.5 rounded-full w-fit">
              <ArrowDownCircle size={14} />
              <span>Reduced from {formatCurrency(result.stdTotalInterest, currency)}</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl shadow-lg"
          >
            <p className="text-zinc-400 text-sm font-medium mb-1">Time Saved</p>
            <div className="text-3xl font-display font-bold">
              {Math.floor(result.monthsSaved / 12)} <span className="text-lg text-zinc-400">Yrs</span> {result.monthsSaved % 12} <span className="text-lg text-zinc-400">Mos</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs bg-zinc-700 px-3 py-1.5 rounded-full w-fit text-zinc-300">
              <Clock size={14} />
              <span>New Tenure: {Math.floor(result.monthsTaken / 12)} Yrs {result.monthsTaken % 12} Mos</span>
            </div>
          </motion.div>
        </div>

        {/* Balance Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-bold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" />
            Loan Balance Over Time
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.preSchedule}>
                <defs>
                  <linearGradient id="colorStd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPre" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                <YAxis tickFormatter={(val) => formatCurrency(val, currency, true)} />
                <Tooltip formatter={(val: any) => formatCurrency(val, currency)} />
                <Legend />
                <Area type="monotone" dataKey="stdBalance" name="Standard Balance" stroke="#94a3b8" fillOpacity={1} fill="url(#colorStd)" strokeWidth={2} />
                <Area type="monotone" dataKey="preBalance" name="With Prepayments" stroke="#10b981" fillOpacity={1} fill="url(#colorPre)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Base EMI</p>
              <p className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-100">{formatCurrency(result.monthlyEmi, currency)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">New Total Payment</p>
              <p className="text-xl font-display font-bold text-emerald-600">{formatCurrency(result.monthlyEmi + monthlyPrepayment, currency)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total Interest Payable</p>
              <p className="text-xl font-display font-bold text-orange-600">{formatCurrency(result.preTotalInterest, currency)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

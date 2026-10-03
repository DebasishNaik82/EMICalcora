'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateEMI, formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Printer, Download, Save, Share2, FileText, Check, Calendar, TrendingUp, Wallet } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { downloadAmortizationCSV } from '@/lib/export';
import { CountUp } from './ui/CountUp';
import { motion, AnimatePresence } from 'motion/react';

interface EmiCalculatorProps {
  type: string;
  currency: string;
}

export function EmiCalculator({ type, currency }: EmiCalculatorProps) {
  const getDefaultValues = () => {
    switch (type) {
      case 'HOME_LOAN': return { p: 5000000, r: 8.5, t: 20 };
      case 'PERSONAL_LOAN': return { p: 500000, r: 11.5, t: 3 };
      case 'CAR_LOAN': return { p: 800000, r: 9, t: 5 };
      case 'EDUCATION_LOAN': return { p: 1500000, r: 10, t: 7 };
      default: return { p: 1000000, r: 10, t: 5 };
    }
  };

  const defaults = getDefaultValues();
  const [principal, setPrincipal] = useState(defaults.p);
  const [rate, setRate] = useState(defaults.r);
  const [tenureYears, setTenureYears] = useState(defaults.t);
  const [processingFee, setProcessingFee] = useState(0);
  const [copied, setCopied] = useState(false);
  const [scheduleType, setScheduleType] = useState<'monthly' | 'yearly'>('monthly');

  const startDate = useMemo(() => new Date(), []);
  
  const result = useMemo(() => {
    return calculateEMI(principal, rate, tenureYears * 12, processingFee, 0, startDate);
  }, [principal, rate, tenureYears, processingFee, startDate]);

  const payoffDate = useMemo(() => {
    return addMonths(startDate, tenureYears * 12);
  }, [startDate, tenureYears]);

  const chartData = [
    { name: 'Principal Amount', value: result.totalPrincipal, color: '#10b981' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' }
  ];

  const yearlyData = useMemo(() => {
    const map = new Map<number, { year: number; principal: number; interest: number; balance: number; date: Date }>();
    result.amortizationSchedule.forEach((row) => {
      const yr = new Date(row.date).getFullYear();
      if (!map.has(yr)) {
        map.set(yr, { year: yr, principal: 0, interest: 0, balance: row.balance, date: row.date });
      }
      const curr = map.get(yr)!;
      curr.principal += row.principal;
      curr.interest += row.interest;
      curr.balance = row.balance; // Final balance of the year
    });
    return Array.from(map.values());
  }, [result]);

  const principalPercent = (result.totalPrincipal / result.totalRepayment) * 100 || 0;
  const interestPercent = (result.totalInterest / result.totalRepayment) * 100 || 0;

  const handlePrint = () => window.print();
  const handleExport = () => downloadAmortizationCSV(result.amortizationSchedule);

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem('emi_history') || '[]');
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type,
      principal,
      rate,
      tenureYears,
      monthlyEmi: result.monthlyEmi,
      totalInterest: result.totalInterest
    };
    localStorage.setItem('emi_history', JSON.stringify([newItem, ...history].slice(0, 50)));
    alert('Calculation saved to history!');
  };

  const handleShare = () => {
    const summary = `EMI Calcora Loan Summary:\n- Amount: ${formatCurrency(principal, currency)}\n- EMI: ${formatCurrency(result.monthlyEmi, currency)}\n- Total Int: ${formatCurrency(result.totalInterest, currency)}\n- Payoff: ${format(payoffDate, 'MMM yyyy')}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6 print:hidden">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Loan Details</h2>
          
          <InputSlider label="Loan Amount" value={principal} onChange={setPrincipal} min={10000} max={50000000} step={10000} prefix={prefix} />
          <InputSlider label="Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} unit="%" />
          <InputSlider label="Loan Tenure" value={tenureYears} onChange={setTenureYears} min={1} max={30} step={1} unit="Yr" />
          <InputSlider label="Processing Fee" value={processingFee} onChange={setProcessingFee} min={0} max={5} step={0.1} unit="%" />

          <div className="flex gap-2 mt-8">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-600/10"><Save size={18} /> Save</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl font-semibold transition-colors">
              <AnimatePresence mode="wait">
                {copied ? <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2"><Check size={18} className="text-emerald-500" /> <span>Copied!</span></motion.div> : <motion.div key="share" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2"><Share2 size={18} /> <span>Share</span></motion.div>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm"><Calendar size={18} className="text-emerald-600" /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-500 tracking-wider">Estimated Payoff Date</p>
              <p className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100">{format(payoffDate, 'MMMM yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm"><Wallet size={18} className="text-emerald-600" /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-500 tracking-wider">Total Repayment Multiple</p>
              <p className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100">{(result.totalRepayment / result.totalPrincipal).toFixed(2)}x <span className="text-xs text-zinc-500 font-normal">of principal</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 print:shadow-none">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-100">Breakdown</h2>
            <div className="flex gap-2 print:hidden">
              <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"><FileText size={14} /> PDF Report</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Monthly EMI</p>
                <CountUp to={result.monthlyEmi} currency={currency} className="text-4xl font-display font-bold text-emerald-700 dark:text-emerald-300 block" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Total Principal</p>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(result.totalPrincipal, currency)}</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Total Interest</p>
                  <CountUp to={result.totalInterest} currency={currency} className="text-lg font-bold text-amber-700 dark:text-amber-400 block" />
                </div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Total Amount Payable</p>
                <CountUp to={result.totalRepayment} currency={currency} className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-200 block" />
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                  <span className="text-emerald-600">Principal ({principalPercent.toFixed(1)}%)</span>
                  <span className="text-amber-500">Interest ({interestPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${principalPercent}%` }} transition={{ duration: 1 }} className="h-full bg-emerald-500 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)]" />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${interestPercent}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-amber-400 shadow-[inset_2px_0_4px_rgba(0,0,0,0.1)]" />
                </div>
              </div>
            </div>

            <div className="h-[280px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => formatCurrency(v, currency)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total</p>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(result.totalRepayment, currency, true)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Trend Area Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-bold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-2"><TrendingUp size={20} className="text-emerald-600" /> Outstanding Balance Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrency(v, currency, true)} />
                <Tooltip formatter={(v: any) => formatCurrency(v, currency)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="balance" name="Remaining Principal" stroke="#10b981" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-100">Amortization Schedule</h2>
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button onClick={() => setScheduleType('monthly')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scheduleType === 'monthly' ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' : 'text-zinc-500'}`}>Monthly</button>
              <button onClick={() => setScheduleType('yearly')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${scheduleType === 'yearly' ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' : 'text-zinc-500'}`}>Yearly</button>
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest bg-zinc-50/50 dark:bg-zinc-800/30 sticky top-0 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-4">{scheduleType === 'monthly' ? 'Month' : 'Year'}</th>
                  <th className="px-6 py-4 text-right">Principal</th>
                  <th className="px-6 py-4 text-right text-amber-600">Interest</th>
                  <th className="px-6 py-4 text-right">Payment</th>
                  <th className="px-6 py-4 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {(scheduleType === 'monthly' ? result.amortizationSchedule : yearlyData).map((row: any, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{scheduleType === 'monthly' ? format(row.date, 'MMM yyyy') : row.year}</td>
                    <td className="px-6 py-4 text-right font-medium">{formatCurrency(row.principal, currency)}</td>
                    <td className="px-6 py-4 text-right text-amber-600 font-medium">{formatCurrency(row.interest, currency)}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-bold">{formatCurrency(scheduleType === 'monthly' ? row.emi : (row.principal + row.interest), currency)}</td>
                    <td className="px-6 py-4 text-right font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(row.balance, currency)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center print:hidden">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Showing {scheduleType === 'monthly' ? result.amortizationSchedule.length : yearlyData.length} records</p>
            <button onClick={handleExport} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"><Download size={14} /> Export CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}

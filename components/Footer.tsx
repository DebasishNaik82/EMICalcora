import Link from 'next/link';
import Image from 'next/image';
import { Mail, ChevronRight, Calculator, ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    loans: [
      { name: 'Loan EMI Calculator', href: '/emi-calculator' },
      { name: 'Home Loan EMI Calculator', href: '/home-loan-calculator' },
      { name: 'Personal Loan Calculator', href: '/personal-loan-calculator' },
      { name: 'Car Loan EMI Calculator', href: '/car-loan-calculator' },
      { name: 'Education Loan Calculator', href: '/education-loan-calculator' },
      { name: 'Loan Eligibility Calculator', href: '/loan-eligibility-calculator' },
      { name: 'Loan Comparison Calculator', href: '/loan-comparison-calculator' },
      { name: 'Prepayment Simulator', href: '/prepayment-calculator' },
    ],
    investmentAndTax: [
      { name: 'SIP Calculator', href: '/sip-calculator' },
      { name: 'Fixed Deposit (FD) Calculator', href: '/fd-calculator' },
      { name: 'PPF Calculator', href: '/ppf-calculator' },
      { name: 'Simple Interest Calculator', href: '/simple-interest-calculator' },
      { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
      { name: 'Retirement Calculator', href: '/retirement-calculator' },
      { name: 'GST Calculator', href: '/gst-calculator' },
    ],
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'All Calculators Directory', href: '/calculators' },
      { name: 'Financial Guides', href: '/guides' },
      { name: 'About EMI Calcora', href: '/about' },
      { name: 'Data Methodology', href: '/methodology' },
      { name: 'Contact Support', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Financial Disclaimer', href: '/disclaimer' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 mt-auto">
      {/* Top Decoration */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500/10 via-emerald-600/30 to-emerald-500/10" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <Image 
                  src="/logo-icon.svg" 
                  alt="EMI Calcora Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-lg shadow-sm" 
                />
                <span className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  EMI Calcora
                </span>
              </Link>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
                Smart financial calculators and clear, practical tools for making better financial decisions. Empowering your financial future through clarity and precision.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Contact Support</p>
                  <a href="mailto:support@calcora.in" className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 transition-colors">
                    support@calcora.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Loan Calculators</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.loans.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ChevronRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Investment & Tax</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.investmentAndTax.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ChevronRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Site & Legal</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.navigation.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <ChevronRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2">
                {footerLinks.legal.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group text-zinc-500"
                  >
                    <ChevronRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800/50 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <ShieldCheck size={16} className="text-emerald-600" />
                <h5 className="text-xs font-bold uppercase tracking-wider">Calculation Disclaimer</h5>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-4xl">
                EMI Calcora provides calculation tools for informational and educational purposes only. Results are based on mathematical formulas and should be used as estimates. We do not provide financial advice, and actual loan terms, interest rates, and fees will vary by lender. Always verify calculations with your financial institution before making significant decisions.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} />
                Private & Secure
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <HelpCircle size={14} />
                v1.2.0
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-50 dark:border-zinc-900">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              © {currentYear} <span className="text-zinc-900 dark:text-zinc-100 font-bold">EMI Calcora</span>. All rights reserved. Built for clarity.
            </p>
            
            <div className="flex items-center gap-6">
              <Link href="/methodology" className="text-xs font-medium hover:text-emerald-600 transition-colors">Methodology</Link>
              <Link href="/sitemap" className="text-xs font-medium hover:text-emerald-600 transition-colors">Sitemap</Link>
              <div className="flex items-center gap-4 border-l border-zinc-200 dark:border-zinc-800 pl-6">
                <a href="#" className="text-zinc-400 hover:text-emerald-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


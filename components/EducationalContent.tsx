import React from 'react';
import { HelpCircle, Calculator, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const EducationalContent = () => {
  return (
    <div className="space-y-16">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <Info size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Understanding Loan EMIs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">What is an EMI?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              An <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
            </p>
            <h3 className="text-xl font-display font-bold">How is it Calculated?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Most banks and financial institutions use the <strong>Reducing Balance Method</strong>. In this method, the interest is calculated on the outstanding loan amount at the end of each month. As you pay back the principal, the interest component decreases.
            </p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800"
          >
            <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-emerald-600" />
              The EMI Formula
            </h3>
            <div className="font-mono text-emerald-700 dark:text-emerald-400 text-sm md:text-base bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-4 overflow-x-auto">
              EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
            </div>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong>P (Principal):</strong> The actual loan amount borrowed.</li>
              <li><strong>R (Interest Rate):</strong> Monthly interest rate (Annual rate / 12 / 100).</li>
              <li><strong>N (Tenure):</strong> Total number of monthly installments.</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      <section className="space-y-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display font-bold tracking-tight text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              q: "What factors affect my loan EMI?",
              a: "Your EMI is primarily determined by three factors: the principal amount, the interest rate, and the loan tenure. A higher principal or interest rate increases the EMI, while a longer tenure decreases the monthly payment but increases total interest paid."
            },
            {
              q: "Can I change my EMI amount later?",
              a: "In most cases, you can change your EMI by making a part-prepayment or by requesting a loan restructuring from your bank. Floating interest rate changes can also impact your EMI or tenure."
            },
            {
              q: "Is it better to have a shorter or longer tenure?",
              a: "A shorter tenure means higher EMIs but significantly lower total interest outgo. A longer tenure makes EMIs more affordable but costs much more in total interest over the life of the loan."
            },
            {
              q: "What is an amortization schedule?",
              a: "An amortization schedule is a table detailing each periodic payment on a loan. It shows the amount of principal and interest that make up each payment until the loan is paid off."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-colors group"
            >
              <h4 className="font-display font-bold text-lg mb-3 flex items-start gap-2 group-hover:text-emerald-600 transition-colors">
                <HelpCircle size={20} className="text-emerald-600 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                {item.q}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.a}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

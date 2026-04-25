import React from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import type { Milestone } from '@/lib/finance-utils';
import { motion } from 'framer-motion';

interface MonthlyBreakdownProps {
  year: number;
  monthlySavings: number;
  annualInterestRate: number;
  milestonesInYear: Milestone[];
  startBalance: number;
}

export const MonthlyBreakdown: React.FC<MonthlyBreakdownProps> = ({
  year,
  monthlySavings,
  annualInterestRate,
  milestonesInYear,
  startBalance,
}) => {
  const monthlyRate = Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;
  
  let currentBalance = startBalance;
  const months = Array.from({ length: 12 }, (_, i) => {
    const opening = currentBalance;
    const growth = opening * monthlyRate;
    const savings = monthlySavings;
    
    // Distribute drawdowns across months (simplified: first milestone in month 6, second in month 12)
    const drawdowns = milestonesInYear
      .filter((_, idx) => (idx === 0 && i === 5) || (idx === 1 && i === 11))
      .reduce((acc, m) => acc + m.cost, 0);

    const closing = opening + growth + savings - drawdowns;
    currentBalance = closing;

    return {
      month: i + 1,
      opening,
      growth,
      savings,
      drawdowns,
      closing,
    };
  });

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-white/5 text-center">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Monthly Detail Flow • Age {year}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Month</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Opening Bal</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Growth</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Savings</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Drawdowns</th>
              <th className="px-6 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Closing Bal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {months.map((m) => (
              <motion.tr 
                key={m.month}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: m.month * 0.05 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 text-xs font-black text-white">M{m.month}</td>
                <td className="px-6 py-4 text-xs font-medium text-white/60">{formatCurrency(m.opening)}</td>
                <td className="px-6 py-4 text-xs font-black text-emerald-400">+{formatCurrency(m.growth)}</td>
                <td className="px-6 py-4 text-xs font-black text-blue-400">+{formatCurrency(m.savings)}</td>
                <td className="px-6 py-4 text-xs font-black text-red-400">
                  {m.drawdowns > 0 ? `-${formatCurrency(m.drawdowns)}` : '—'}
                </td>
                <td className="px-6 py-4 text-xs font-black text-white">{formatCurrency(m.closing)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

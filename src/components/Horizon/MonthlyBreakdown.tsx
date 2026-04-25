import React from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import type { Milestone } from '@/lib/finance-utils';

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
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  let currentBalance = startBalance;
  const monthlyRate = annualInterestRate / 100 / 12;

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">Yearly Cash Flow Details — Age {year}</h3>
        <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-white/[0.02] text-white/40 uppercase font-black tracking-tighter">
            <tr>
              <th className="px-6 py-4">Month</th>
              <th className="px-6 py-4">Opening Balance</th>
              <th className="px-6 py-4">Savings (+)</th>
              <th className="px-6 py-4">Growth (+)</th>
              <th className="px-6 py-4">Milestones (-)</th>
              <th className="px-6 py-4">Closing Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {months.map((month, i) => {
              const opening = currentBalance;
              const interest = currentBalance * monthlyRate;
              const savings = monthlySavings;
              const withdrawal = i === 8 ? milestonesInYear.reduce((acc, m) => acc + m.cost, 0) : 0; // Assume September for milestones for simplicity
              
              currentBalance = opening + savings + interest - withdrawal;

              return (
                <tr key={month} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white/60">{month}</td>
                  <td className="px-6 py-4 text-white/40">{formatCurrency(opening)}</td>
                  <td className="px-6 py-4 text-emerald-400/80">+{formatCurrency(savings)}</td>
                  <td className="px-6 py-4 text-emerald-400/80">+{formatCurrency(interest)}</td>
                  <td className="px-6 py-4 text-red-400/80">{withdrawal > 0 ? `-${formatCurrency(withdrawal)}` : '—'}</td>
                  <td className="px-6 py-4 font-bold text-white">{formatCurrency(currentBalance)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import type { Milestone, FinancialSettings } from '../lib/types';
import { X, Calendar, ArrowRightLeft, DollarSign, TrendingUp } from 'lucide-react';

interface MonthlyBreakdownProps {
  settings: FinancialSettings;
  milestones: Milestone[];
  age: number;
  onClose: () => void;
}

export function MonthlyBreakdown({ settings, milestones, age, onClose }: MonthlyBreakdownProps) {
  const calculateYearlyDetails = () => {
    const { monthlySavings, annualInterestRate, currentAge, currentNetWorth } = settings;
    const monthlyRate = annualInterestRate / 100 / 12;
    
    // Simple estimation of balance at start of year 'age'
    let balance = currentNetWorth;
    for (let a = currentAge; a < age; a++) {
      for (let m = 0; m < 12; m++) {
        balance += monthlySavings;
        balance *= (1 + monthlyRate);
        if (m === 11) {
          const milestonesAtAge = milestones.filter(mil => Math.floor(mil.targetAge) === a);
          milestonesAtAge.forEach(mil => balance -= mil.cost);
        }
      }
    }

    const months = [];
    const yearMilestones = milestones.filter(m => Math.floor(m.targetAge) === age);
    
    let currentBalance = balance;
    for (let m = 0; m < 12; m++) {
      const startBalance = currentBalance;
      const interest = currentBalance * monthlyRate;
      currentBalance += monthlySavings + interest;
      
      let withdrawal = 0;
      if (m === 11) { // Apply at end of year for simplicity
        yearMilestones.forEach(mil => withdrawal += mil.cost);
        currentBalance -= withdrawal;
      }

      months.push({
        name: new Date(2026, m).toLocaleString('default', { month: 'short' }),
        start: startBalance,
        savings: monthlySavings,
        interest,
        withdrawal,
        end: currentBalance
      });
    }

    return months;
  };

  const months = calculateYearlyDetails();
  const totalSavings = months.reduce((acc, m) => acc + m.savings, 0);
  const totalInterest = months.reduce((acc, m) => acc + m.interest, 0);
  const totalWithdrawal = months.reduce((acc, m) => acc + m.withdrawal, 0);

  const formatCurrency = (v: number) => `₹${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Cash Flow Breakdown</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Year: Age {age}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Savings</p>
              <p className="text-xl font-black text-emerald-700">{formatCurrency(totalSavings)}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Interest Earned</p>
              <p className="text-xl font-black text-blue-700">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Goal Spending</p>
              <p className="text-xl font-black text-rose-700">{formatCurrency(totalWithdrawal)}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Month</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-emerald-600">Savings</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-600">Interest</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-rose-600">Withdrawal</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {months.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 text-xs font-black text-slate-900">{m.name}</td>
                    <td className="py-3 text-xs font-medium text-slate-500">{formatCurrency(m.start)}</td>
                    <td className="py-3 text-xs font-bold text-emerald-600">+{formatCurrency(m.savings)}</td>
                    <td className="py-3 text-xs font-bold text-blue-600">+{formatCurrency(m.interest)}</td>
                    <td className="py-3 text-xs font-bold text-rose-600">{m.withdrawal > 0 ? `-${formatCurrency(m.withdrawal)}` : '—'}</td>
                    <td className="py-3 text-xs font-black text-slate-900">{formatCurrency(m.end)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end">
          <button 
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Export as CSV
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import type { Milestone, SimulationResult } from '@/lib/finance-utils';
import { motion } from 'framer-motion';

interface YearlyCashflowProps {
  projection: SimulationResult[];
  milestones: Milestone[];
}

export const YearlyCashflow: React.FC<YearlyCashflowProps> = ({
  projection,
  milestones,
}) => {
  const totalSavings = projection.reduce((acc, curr) => acc + (curr.savings || 0), 0);
  const totalGrowth = projection.reduce((acc, curr) => acc + (curr.growth || 0), 0);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-white/5 bg-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Full Lifecycle Cashflow</h3>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Year-by-year accumulation & milestone drawdowns</p>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Horizon: 80 Years</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
            <span className="block text-[8px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-1">Lifetime Growth achieved</span>
            <span className="text-xl font-black text-emerald-400 tracking-tight">{formatCurrency(totalGrowth)}</span>
          </div>
          <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <span className="block text-[8px] font-black text-blue-500/50 uppercase tracking-[0.2em] mb-1">Total Lifetime Savings</span>
            <span className="text-xl font-black text-blue-400 tracking-tight">{formatCurrency(totalSavings)}</span>
          </div>
        </div>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-[#0f172a] shadow-md">
            <tr className="border-b border-white/10">
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Age</th>
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Opening Balance</th>
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Annual Growth</th>
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Savings</th>
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Dips (Drawdowns)</th>
              <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Closing Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projection.map((yearData, i) => {
              const prevYear = projection[i - 1];
              const opening = prevYear ? prevYear.balance : yearData.balance; // Simplified for first year
              const milestonesThisYear = milestones.filter(m => Math.floor(m.age) === yearData.age);
              const drawdowns = milestonesThisYear.reduce((sum, m) => sum + m.cost, 0);
              const growth = yearData.growth || 0;
              const savings = yearData.savings || 0;

              return (
                <motion.tr 
                  key={yearData.age}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-black text-white group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                      {yearData.age}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-white/60">{formatCurrency(opening)}</td>
                  <td className="px-6 py-4 text-xs font-black text-emerald-400">
                    {growth > 0 ? `+${formatCurrency(growth)}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-blue-400">
                    {savings > 0 ? `+${formatCurrency(savings)}` : '—'}
                  </td>
                  <td className="px-6 py-4">
                    {drawdowns > 0 ? (
                      <div className="space-y-1">
                        <span className="text-xs font-black text-red-400">-{formatCurrency(drawdowns)}</span>
                        {milestonesThisYear.map(m => (
                          <div key={m.id} className="text-[9px] font-bold text-white/20 uppercase truncate max-w-[120px]">
                            {m.label}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-white/20">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-white">{formatCurrency(yearData.balance)}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

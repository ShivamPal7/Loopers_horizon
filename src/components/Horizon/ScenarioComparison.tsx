import React from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import { GitCompare, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SimulationResult } from '@/lib/finance-utils';

interface ScenarioComparisonProps {
  scenarioA: SimulationResult[];
  scenarioB: SimulationResult[];
  settingsA: { savings: number; rate: number };
  settingsB: { savings: number; rate: number };
  onClose: () => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  scenarioA,
  scenarioB,
  settingsA,
  settingsB,
  onClose,
}) => {
  const terminalA = scenarioA[scenarioA.length - 1]?.balance || 0;
  const terminalB = scenarioB[scenarioB.length - 1]?.balance || 0;
  const diff = terminalB - terminalA;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GitCompare size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">Scenario Comparison</h2>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Strategy Analysis Detail</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Close Detail
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Comparison Cards */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 p-5 rounded-3xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Scenario A (Current)</span>
                <div className="text-xl font-black text-white mb-1">{formatCurrency(settingsA.savings)}/mo</div>
                <div className="text-[10px] font-medium text-white/30">{settingsA.rate}% Growth Rate</div>
              </div>
              <div className="flex-1 p-5 rounded-3xl bg-indigo-600/10 border border-indigo-500/30">
                <span className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-widest block mb-2">Scenario B (Target)</span>
                <div className="text-xl font-black text-white mb-1">{formatCurrency(settingsB.savings)}/mo</div>
                <div className="text-[10px] font-medium text-white/30">{settingsB.rate}% Growth Rate</div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Zap size={64} className="text-white" />
              </div>
              <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] block mb-2">The Wealth Delta</span>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                {formatCurrency(Math.abs(diff))}
              </div>
              <p className="text-xs font-bold text-white/60">
                {diff > 0 
                  ? `Scenario B generates ${formatCurrency(diff)} more in terminal wealth.` 
                  : `Scenario A remains the superior growth path.`}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-200">
                <span>View Full Breakdown</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Mini Comparison Chart */}
          <div className="relative h-full min-h-[300px] bg-white/[0.02] rounded-[2rem] border border-white/5 p-8">
            <div className="absolute inset-0 flex items-end p-8 gap-4">
              <div className="flex-1 flex flex-col justify-end gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(terminalA / Math.max(terminalA, terminalB)) * 100}%` }}
                  className="w-full bg-white/10 rounded-t-2xl border-t border-x border-white/10"
                />
                <span className="text-center text-[10px] font-bold text-white/30 uppercase">BASE</span>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(terminalB / Math.max(terminalA, terminalB)) * 100}%` }}
                  className="w-full bg-indigo-500 rounded-t-2xl shadow-[0_0_40px_rgba(79,70,229,0.3)]"
                />
                <span className="text-center text-[10px] font-bold text-indigo-400 uppercase">TARGET</span>
              </div>
            </div>
            <div className="absolute top-8 left-8">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Trajectory Gap</span>
            </div>
          </div>

        </div>

        <div className="p-6 bg-white/[0.01] border-t border-white/5 flex justify-center italic text-[10px] text-white/20">
          * Simulations account for compound interest and capital drawdowns across both scenarios.
        </div>
      </div>
    </motion.div>
  );
};

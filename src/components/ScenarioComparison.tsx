import { motion, AnimatePresence } from 'framer-motion';
import type { FinancialSettings, Milestone } from '../lib/types';
import { X, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { ProjectionChart } from './ProjectionChart';
import { ScenarioPanel } from './ScenarioPanel';
import { useState, useMemo } from 'react';

interface ScenarioComparisonProps {
  currentSettings: FinancialSettings;
  milestones: Milestone[];
  onClose: () => void;
}

export function ScenarioComparison({ currentSettings, milestones, onClose }: ScenarioComparisonProps) {
  const [scenarioB, setScenarioB] = useState<FinancialSettings>({
    ...currentSettings,
    monthlySavings: currentSettings.monthlySavings * 1.5,
    annualInterestRate: currentSettings.annualInterestRate + 0.5
  });

  const calculateProjection = (settings: FinancialSettings) => {
    const { currentAge, currentNetWorth, monthlySavings, annualInterestRate, lifeExpectancy } = settings;
    const data = [];
    let balance = currentNetWorth;
    const monthlyRate = annualInterestRate / 100 / 12;

    for (let age = currentAge; age <= lifeExpectancy; age++) {
      for (let month = 0; month < 12; month++) {
        balance += monthlySavings;
        balance *= (1 + monthlyRate);
        if (month === 11) {
          const milestonesAtAge = milestones.filter(m => Math.floor(m.targetAge) === age);
          milestonesAtAge.forEach(m => balance -= m.cost);
        }
      }
      data.push({ age, balance });
    }
    return data;
  };

  const projectionA = useMemo(() => calculateProjection(currentSettings), [currentSettings, milestones]);
  const projectionB = useMemo(() => calculateProjection(scenarioB), [scenarioB, milestones]);

  const finalA = projectionA[projectionA.length - 1]?.balance || 0;
  const finalB = projectionB[projectionB.length - 1]?.balance || 0;
  const delta = finalB - finalA;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
    >
      <div className="bg-slate-50 w-full max-w-[1400px] h-full max-h-[900px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Scenario Comparison</h2>
            <p className="text-sm text-slate-500 font-medium">Compare different financial strategies side-by-side</p>
          </div>
          <div className="bg-blue-600 px-6 py-3 rounded-2xl text-white shadow-xl shadow-blue-200 flex items-center gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Net Wealth Difference</p>
              <p className="text-xl font-black">₹{(delta / 10000000).toFixed(2)} Cr</p>
            </div>
            <ArrowRightLeft className="w-6 h-6 text-blue-200 opacity-50" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 custom-scrollbar">
          {/* Scenario A */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Strategy (A)</h3>
            </div>
            <ProjectionChart 
              data={projectionA} 
              milestones={milestones} 
              currentAge={currentSettings.currentAge} 
            />
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm opacity-60 pointer-events-none">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-500">MONTHLY SAVINGS</span>
                <span className="text-sm font-black">₹{currentSettings.monthlySavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">ANNUAL RETURN</span>
                <span className="text-sm font-black">{currentSettings.annualInterestRate}%</span>
              </div>
            </div>
          </div>

          {/* Scenario B */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">Growth Strategy (B)</h3>
            </div>
            <ProjectionChart 
              data={projectionB} 
              milestones={milestones} 
              currentAge={scenarioB.currentAge} 
            />
            <ScenarioPanel 
              settings={scenarioB} 
              onChange={(updates) => setScenarioB(prev => ({ ...prev, ...updates }))} 
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button 
            className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl"
          >
            Apply Scenario B
          </button>
        </div>
      </div>
    </motion.div>
  );
}

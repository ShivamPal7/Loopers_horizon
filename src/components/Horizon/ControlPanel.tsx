import React from 'react';
import { TrendingUp, Wallet, Percent, ZoomIn, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/finance-utils';
import { cn } from '../../lib/utils';

interface ControlPanelProps {
  initialNetWorth: number;
  setInitialNetWorth: (val: number) => void;
  monthlySavings: number;
  setMonthlySavings: (val: number) => void;
  annualInterestRate: number;
  setAnnualInterestRate: (val: number) => void;
  inflationRate: number;
  setInflationRate: (val: number) => void;
  zoomLevel: '5y' | '10y' | 'full';
  setZoomLevel: (level: '5y' | '10y' | 'full') => void;
  terminalBalance: number;
  onSaveScenario: () => void;
  hasSavedScenario: boolean;
  onCompare: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  initialNetWorth,
  setInitialNetWorth,
  monthlySavings,
  setMonthlySavings,
  annualInterestRate,
  setAnnualInterestRate,
  inflationRate,
  setInflationRate,
  zoomLevel,
  setZoomLevel,
  terminalBalance,
  onSaveScenario,
  hasSavedScenario,
  onCompare,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/60">
          <TrendingUp size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Monthly Savings</span>
        </div>
        <div className="text-2xl font-black text-white">
          {formatCurrency(monthlySavings)}
        </div>
        <input 
          type="range" 
          min="0" 
          max="200000" 
          step="1000"
          value={monthlySavings}
          onChange={(e) => setMonthlySavings(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60">
            <Percent size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Growth Rate</span>
          </div>
          <span className="text-xl font-black text-white">{annualInterestRate}%</span>
        </div>
        <input 
          type="range" min="0" max="20" step="0.5"
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] font-bold text-white/30 uppercase">Inflation</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/60">{inflationRate}%</span>
            <input 
              type="checkbox" 
              checked={inflationRate > 0} 
              onChange={(e) => setInflationRate(e.target.checked ? 3 : 0)}
              className="w-3 h-3 rounded bg-white/10 border-white/10 text-blue-500 focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/60">
          <Wallet size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Initial Assets</span>
        </div>
        <div className="text-2xl font-black text-white">
          {formatCurrency(initialNetWorth)}
        </div>
        <input 
          type="range" min="0" max="5000000" step="50000"
          value={initialNetWorth}
          onChange={(e) => setInitialNetWorth(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="flex gap-2 pt-2">
          <button 
            onClick={onSaveScenario}
            className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest transition-colors border border-white/5"
          >
            {hasSavedScenario ? 'Update Scenario' : 'Save Scenario'}
          </button>
          {hasSavedScenario && (
            <button 
              onClick={onCompare}
              className="flex-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[8px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-indigo-600/20"
            >
              Compare
            </button>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg border border-white/20 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1 block">Est. Terminal Wealth</span>
        <div className="text-2xl font-black text-white tracking-tight">
          {formatCurrency(terminalBalance)}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-blue-100/70">
          <Info size={10} />
          Calculated at age 80
        </div>
      </div>

      <div className="md:col-span-4 flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/40">
            <ZoomIn size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Timeline Zoom</span>
          </div>
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
            {(['full', '10y', '5y'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setZoomLevel(level)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  zoomLevel === level 
                    ? "bg-white/10 text-white shadow-inner" 
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {level === 'full' ? 'Full Life' : level}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-[10px] font-medium text-white/30 italic">
          * Drag milestones on the timeline to re-position them
        </div>
      </div>
    </div>
  );
};

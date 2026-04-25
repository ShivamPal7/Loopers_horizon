import React from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import { Settings2, Save, GitCompare, BarChart3, TrendingUp } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
      
      {/* Column 1: Core Params */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white/40 mb-2">
          <Settings2 size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">Base Parameters</span>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Monthly Savings</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" min="0" max="200000" step="5000"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="text-xs font-black text-white w-16 text-right">₹{(monthlySavings/1000).toFixed(0)}k</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Annual Growth (%)</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" min="0" max="20" step="0.5"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="text-xs font-black text-white w-12 text-right">{annualInterestRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Net Worth & Inflation */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white/40 mb-2">
          <TrendingUp size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">Initial Assets</span>
        </div>
        
        <div className="space-y-4">
           <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Current Net Worth</label>
            <input 
              type="number"
              value={initialNetWorth}
              onChange={(e) => setInitialNetWorth(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 gap-4">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-tight">Inflation Adjust</span>
            <button 
              onClick={() => setInflationRate(inflationRate === 0 ? 6 : 0)}
              className={cn(
                "w-10 h-6 rounded-full transition-all relative shrink-0",
                inflationRate > 0 ? "bg-blue-600" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                inflationRate > 0 ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>
      </div>

      {/* Column 3: Navigation & Zoom */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white/40 mb-2">
          <BarChart3 size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">Perspective Zoom</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {(['full', '10y', '5y'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setZoomLevel(level)}
              className={cn(
                "py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all",
                zoomLevel === level 
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                  : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
              )}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-[9px] font-bold text-white/20 italic text-center">
          * Drag markers to re-position life events
        </p>
      </div>

      {/* Column 4: Comparison Actions */}
      <div className="flex flex-col gap-4 justify-end">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/70 mb-2 block">Est. Terminal Wealth</span>
          <div className="text-[15px] font-black text-white tracking-[-0.05em] leading-none break-all">
            {formatCurrency(terminalBalance)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onSaveScenario}
            className="flex items-center justify-center gap-2 py-4 bg-white text-slate-900 rounded-2xl hover:bg-slate-100 transition-all active:scale-95 shadow-lg"
          >
            <Save size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Save</span>
          </button>
          <button 
            onClick={onCompare}
            disabled={!hasSavedScenario}
            className={cn(
              "flex items-center justify-center gap-2 py-4 rounded-2xl transition-all active:scale-95 shadow-lg",
              hasSavedScenario 
                ? "bg-white/10 text-white border border-white/20 hover:bg-white/20" 
                : "bg-white/5 text-white/20 border-transparent cursor-not-allowed"
            )}
          >
            <GitCompare size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for class names
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

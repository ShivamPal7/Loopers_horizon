import { Slider } from '@/components/ui/slider';
import type { FinancialSettings } from '../lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TrendingUp, Wallet, Percent, Heart } from 'lucide-react';

interface ScenarioPanelProps {
  settings: FinancialSettings;
  onChange: (settings: Partial<FinancialSettings>) => void;
}

export function ScenarioPanel({ settings, onChange }: ScenarioPanelProps) {
  const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <Card className="p-6 flex flex-col gap-8 bg-white/50 backdrop-blur-md border-slate-200 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      
      <div className="flex items-center gap-3">
        <TrendingUp className="text-blue-600 w-5 h-5" />
        <h2 className="text-lg font-bold text-slate-800">Financial Strategy</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5" /> Monthly Savings
            </Label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {formatCurrency(settings.monthlySavings)}
            </span>
          </div>
          <Slider 
            value={[settings.monthlySavings]} 
            min={10000} 
            max={500000} 
            step={5000}
            onValueChange={([val]) => onChange({ monthlySavings: val })}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
            <span>₹10k</span>
            <span>₹5L</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-3.5 h-3.5" /> Annual Return
            </Label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {settings.annualInterestRate}%
            </span>
          </div>
          <Slider 
            value={[settings.annualInterestRate]} 
            min={4} 
            max={15} 
            step={0.5}
            onValueChange={([val]) => onChange({ annualInterestRate: val })}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
            <span>4%</span>
            <span>15%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Age</Label>
            <Input 
              type="number" 
              value={settings.currentAge}
              onChange={(e) => onChange({ currentAge: parseInt(e.target.value) || 0 })}
              className="h-9 text-sm font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-3 h-3" /> Life Expectancy
            </Label>
            <Input 
              type="number" 
              value={settings.lifeExpectancy}
              onChange={(e) => onChange({ lifeExpectancy: parseInt(e.target.value) || 0 })}
              className="h-9 text-sm font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Net Worth</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
            <Input 
              type="number" 
              value={settings.currentNetWorth}
              onChange={(e) => onChange({ currentNetWorth: parseInt(e.target.value) || 0 })}
              className="h-10 pl-7 text-sm font-bold bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 italic">
          *Calculations assume monthly compounding and end-of-year milestone drawdowns.
        </p>
      </div>
    </Card>
  );
}

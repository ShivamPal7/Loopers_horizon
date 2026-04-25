import { motion, AnimatePresence } from 'framer-motion';
import type { FinancialSettings, Milestone } from '../lib/types';
import { X, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';
import { ProjectionChart } from './ProjectionChart';
import { ScenarioPanel } from './ScenarioPanel';
import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ScenarioComparisonProps {
  currentSettings: FinancialSettings;
  milestones: Milestone[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScenarioComparison({ currentSettings, milestones, open, onOpenChange }: ScenarioComparisonProps) {
  const [scenarioB, setScenarioB] = useState<FinancialSettings>({
    ...currentSettings,
    monthlySavings: Math.min(500000, currentSettings.monthlySavings * 1.5),
    annualInterestRate: Math.min(15, currentSettings.annualInterestRate + 0.5)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] lg:max-w-[1400px] w-full h-[90vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
        <DialogHeader className="p-8 border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold tracking-tight">Scenario Comparison</DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Side-by-side analysis of different financial strategies and their long-term impact.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-4 bg-primary/5 border border-primary/10 px-6 py-3 rounded-2xl">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Net Wealth Delta</p>
                <p className="text-xl font-black text-primary">₹{(delta / 10000000).toFixed(2)} Cr</p>
              </div>
              <ArrowRightLeft className="size-6 text-primary/40" />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-muted/20">
          {/* Scenario A */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background">Strategy A</Badge>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Current Baseline</h3>
              </div>
            </div>
            <ProjectionChart 
              data={projectionA} 
              milestones={milestones} 
              currentAge={currentSettings.currentAge} 
            />
            <div className="p-6 bg-card rounded-2xl border shadow-sm opacity-60 pointer-events-none space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase">Monthly Savings</span>
                <span className="text-sm font-black">₹{currentSettings.monthlySavings.toLocaleString()}</span>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase">Annual Return</span>
                <span className="text-sm font-black">{currentSettings.annualInterestRate}%</span>
              </div>
            </div>
          </div>

          {/* Scenario B */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">Strategy B</Badge>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Growth Simulation</h3>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary animate-pulse">
                <TrendingUp className="size-3" />
                REAL-TIME UPDATING
              </div>
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

        <div className="p-6 border-t bg-card flex justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="font-bold rounded-xl px-8"
          >
            Cancel
          </Button>
          <Button 
            className="font-bold rounded-xl px-10 bg-primary shadow-lg shadow-primary/20"
            onClick={() => {
              // In a real app we'd apply the settings
              onOpenChange(false);
            }}
          >
            Apply Scenario B
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

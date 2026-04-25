import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Users, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import type { Milestone, FinancialSettings } from '../lib/types';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface StatsCardProps {
  settings: FinancialSettings;
  milestones: Milestone[];
  projectionData: { age: number; balance: number }[];
}

export function StatsCard({ settings, milestones, projectionData }: StatsCardProps) {
  const currentAge = settings.currentAge;
  const lifeProgress = (currentAge / settings.lifeExpectancy) * 100;

  // Life Stage logic
  const getLifeStage = (age: number) => {
    if (age < 25) return 'EARLY_CAREER';
    if (age < 35) return 'ESTABLISHMENT';
    if (age < 50) return 'PEAK_EARNING';
    if (age < 60) return 'PRE_RETIREMENT';
    return 'RETIREMENT';
  };

  const lifeStage = getLifeStage(currentAge);

  // Peer comparison (Mock data based on Indian averages as requested)
  const avgNetWorthByAge: Record<number, number> = {
    25: 320000,
    28: 500000,
    30: 800000,
    35: 1500000,
    40: 3500000,
    50: 8500000,
    60: 15000000,
  };

  const nearestAge = Object.keys(avgNetWorthByAge).map(Number).sort((a, b) => Math.abs(a - currentAge) - Math.abs(b - currentAge))[0];
  const avgNetWorth = avgNetWorthByAge[nearestAge] || 500000;
  const netWorthDiff = settings.currentNetWorth - avgNetWorth;
  const percentAhead = (netWorthDiff / avgNetWorth) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Section A: Current Position */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2 text-blue-600">
          <Clock className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-widest">Current Position</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-black text-slate-900">{currentAge}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lifeStage.replace('_', ' ')}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-700">{settings.lifeExpectancy - currentAge}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years Left</p>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span>LIFE PROGRESS</span>
              <span>{lifeProgress.toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${lifeProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section B: Goal Tracking */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2 text-emerald-600">
          <Target className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-widest">Goal Tracking</h3>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2 no-scrollbar">
          {milestones.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No milestones set yet.</p>
          ) : (
            milestones.map((m) => {
              const yearsAway = m.targetAge - currentAge;
              const projectedAtAge = projectionData.find(d => d.age === m.targetAge)?.balance || 0;
              const completionPercent = Math.min(100, (projectedAtAge / m.cost) * 100);
              const isShortfall = projectedAtAge < m.cost;

              return (
                <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{m.label}</p>
                      <p className="text-[10px] text-slate-500">{yearsAway} years away</p>
                    </div>
                    {isShortfall ? (
                      <span className="flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase">
                        <AlertCircle className="w-3 h-3" /> At Risk
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                        <CheckCircle2 className="w-3 h-3" /> On Track
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full", isShortfall ? "bg-amber-500" : "bg-emerald-500")}
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-700">{completionPercent.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Section C: Peer Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2 text-indigo-600">
          <Users className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-widest">Peer Comparison</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">vs Average (Age {nearestAge})</span>
            <span className={cn(
              "text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1",
              percentAhead >= 0 ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
            )}>
              <ArrowUpRight className={cn("w-3 h-3", percentAhead < 0 && "rotate-90")} />
              {Math.abs(percentAhead).toFixed(0)}% {percentAhead >= 0 ? 'Ahead' : 'Behind'}
            </span>
          </div>

          <div className="flex items-end gap-2 h-24">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-slate-100 rounded-t-lg transition-all duration-1000" 
                style={{ height: '60%' }} 
              />
              <span className="text-[9px] font-black text-slate-400">AVERAGE</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-indigo-500 rounded-t-lg transition-all duration-1000 shadow-lg shadow-indigo-100" 
                style={{ height: `${60 + (percentAhead * 0.4)}%` }} 
              />
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter">YOU</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section D: Achievement Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bg-slate-50 p-6 rounded-2xl border border-slate-200 md:col-span-2 lg:col-span-2 space-y-4"
      >
        <div className="flex items-center gap-2 text-amber-600">
          <Trophy className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-widest">Achievement Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Steady Saver', icon: Activity, earned: settings.monthlySavings > 50000 },
            { label: 'Goal Setter', icon: Target, earned: milestones.length >= 3 },
            { label: 'On Track', icon: CheckCircle2, earned: milestones.every(m => (projectionData.find(d => d.age === m.targetAge)?.balance || 0) >= m.cost) },
            { label: 'Early Bird', icon: Clock, earned: settings.currentAge < 30 },
          ].map((badge, i) => (
            <div 
              key={i} 
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                badge.earned 
                  ? "bg-white border-amber-200 shadow-sm scale-105" 
                  : "bg-slate-100 border-slate-200 grayscale opacity-40"
              )}
            >
              <badge.icon className={cn("w-6 h-6", badge.earned ? "text-amber-500" : "text-slate-400")} />
              <span className="text-[10px] font-black text-slate-800 text-center uppercase tracking-tight leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section E: Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-6"
      >
        <div className="flex items-center gap-2 text-blue-400">
          <TrendingUp className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-widest">Quick Stats</h3>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Monthly Savings</p>
            <p className="text-sm font-black text-slate-200">₹{(settings.monthlySavings / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Goals</p>
            <p className="text-sm font-black text-slate-200">{milestones.length}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Avg Growth</p>
            <p className="text-sm font-black text-slate-200">{settings.annualInterestRate}%</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Time to Goal</p>
            <p className="text-sm font-black text-slate-200">
              {milestones.length > 0 ? `${Math.min(...milestones.map(m => m.targetAge - currentAge))} yrs` : 'N/A'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';
import { Award, Target, TrendingUp, Layout, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Milestone, SimulationResult } from '@/lib/finance-utils';

interface StatsDashboardProps {
  currentAge: number;
  monthlySavings: number;
  annualInterestRate: number;
  milestones: Milestone[];
  projection: SimulationResult[];
  stats: {
    lifeStage: string;
    badges: { id: string; label: string; icon: string }[];
  };
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  currentAge,
  monthlySavings,
  annualInterestRate,
  milestones,
  projection,
  stats,
}) => {
  const lifeProgress = (currentAge / 80) * 100;
  const totalGoals = milestones.length;
  const firstGoal = milestones[0];
  const timeToGoal = firstGoal ? firstGoal.age - currentAge : 0;

  return (
    <div className="space-y-8">
      {/* Top Row: Current Position & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Current Position */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-10 text-blue-400">
            <Clock size={22} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Current Position</span>
          </div>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-7xl font-black text-white tracking-tighter">{currentAge}</span>
              <span className="block text-xs font-black text-white/30 uppercase tracking-widest mt-2">{stats.lifeStage}</span>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-white tracking-tight">{80 - currentAge}</span>
              <span className="block text-xs font-black text-white/30 uppercase tracking-widest mt-2">Years Left</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
              <span>Life Progress</span>
              <span className="text-white">{Math.round(lifeProgress)}%</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${lifeProgress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-10 text-blue-400">
            <TrendingUp size={22} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/80">Quick Stats</span>
          </div>

          <div className="grid grid-cols-2 gap-y-10">
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Monthly Savings</span>
              <span className="text-3xl font-black text-white tracking-tight">₹{monthlySavings >= 1000 ? `${(monthlySavings/1000).toFixed(0)}k` : monthlySavings}</span>
            </div>
            <div className="space-y-1 text-right">
              <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Total Goals</span>
              <span className="text-3xl font-black text-white tracking-tight">{totalGoals}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Avg Growth</span>
              <span className="text-3xl font-black text-white tracking-tight">{annualInterestRate}%</span>
            </div>
            <div className="space-y-1 text-right">
              <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Time to Goal</span>
              <span className="text-3xl font-black text-white tracking-tight">{timeToGoal} yrs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Goal Tracking & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Goal Tracking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8 text-emerald-400">
            <Target size={22} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Goal Tracking</span>
          </div>

          <div className="space-y-6">
            {milestones.slice(0, 2).map((m) => {
              const pAtAge = projection.find(p => p.age === m.age);
              const progress = Math.min(100, ((pAtAge?.balance || 0) / m.cost) * 100);
              const status = pAtAge?.shortfall || 'none';
              
              return (
                <div key={m.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-white tracking-tight">{m.label}</h4>
                      <p className="text-[10px] font-bold text-white/30 uppercase mt-1">{m.age - currentAge} years away</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                      status === 'none' ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                    )}>
                      {status !== 'none' && <Clock size={12} />}
                      {status === 'none' ? "ON TRACK" : "AT RISK"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(5, progress)}%` }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 shadow-lg",
                          status === 'none' ? "bg-emerald-500 shadow-emerald-500/20" : "bg-amber-500 shadow-amber-500/20"
                        )}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
                      <span>Progress</span>
                      <span className="text-white">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-10 text-orange-400">
            <Award size={22} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Achievement Badges</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['STEADY SAVER', 'GOAL SETTER', 'ON TRACK', 'EARLY BIRD'].map((label, i) => {
              const isHighlight = i === 3;
              return (
                <div 
                  key={label}
                  className={cn(
                    "aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 transition-all",
                    isHighlight 
                      ? "bg-white/10 border-2 border-amber-500/40 shadow-lg shadow-amber-500/10" 
                      : "bg-white/5 border border-white/5 opacity-30 grayscale"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-full",
                    isHighlight ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/40"
                  )}>
                    {label === 'STEADY SAVER' && <TrendingUp size={20} />}
                    {label === 'GOAL SETTER' && <Target size={20} />}
                    {label === 'ON TRACK' && <Layout size={20} />}
                    {label === 'EARLY BIRD' && <Clock size={20} />}
                  </div>
                  <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

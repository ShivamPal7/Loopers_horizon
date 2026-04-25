import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/finance-utils';
import { Award, Users, Target, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Milestone, SimulationResult } from '@/lib/finance-utils';

interface StatsDashboardProps {
  currentAge: number;
  initialNetWorth: number;
  stats: {
    lifeStage: string;
    peerAverage: number;
    aheadOfPeers: number;
    badges: { id: string; label: string; icon: string }[];
  };
  milestones: Milestone[];
  projection: SimulationResult[];
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  currentAge,
  initialNetWorth,
  stats,
  milestones,
  projection,
}) => {
  const lifeProgress = (currentAge / 80) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Section A: Current Position */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="col-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4 text-white/40">
          <User size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Current Position</span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black text-white">{currentAge}</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">{stats.lifeStage}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${lifeProgress}%` }}
                className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] font-medium text-white/20">
              <span>AGE 20</span>
              <span>AGE 80</span>
            </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/5">
            <div>
              <div className="text-[10px] text-white/40 uppercase">Years Left</div>
              <div className="text-lg font-bold text-white">{80 - currentAge}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase">Net Worth</div>
              <div className="text-lg font-bold text-emerald-400">{formatCurrency(initialNetWorth)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section B: Peer Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="col-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4 text-white/40">
          <Users size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Cohort Analysis</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-white/40 uppercase">Vs Average (Age {currentAge})</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[9px] font-black uppercase",
              stats.aheadOfPeers > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
            )}>
              {stats.aheadOfPeers > 0 ? "Ahead" : "Behind"}
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {formatCurrency(Math.abs(stats.aheadOfPeers))}
            <span className="text-xs font-normal text-white/30 ml-2">{stats.aheadOfPeers > 0 ? 'above' : 'below'} peers</span>
          </div>
          <div className="flex gap-2 items-end h-16">
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '60%' }}
                className="absolute bottom-0 w-full bg-white/20 rounded-t-lg"
              />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white/40">PEERS</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-t-lg relative group">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg shadow-lg"
              />
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-blue-400">YOU</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section C: Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="col-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4 text-white/40">
          <Award size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Achievements</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {['steady-saver', 'goal-setter', 'on-track', 'early-bird', 'diversifier', 'compounding-champion'].map((id) => {
            const earned = stats.badges.some(b => b.id === id);
            return (
              <div 
                key={id}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  earned 
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20" 
                    : "bg-white/5 border border-white/5 grayscale opacity-30"
                )}
                title={id.replace('-', ' ')}
              >
                <Award size={20} className={cn(earned ? "text-white" : "text-white/20")} />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Section D: Goal Tracking (Full Width) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="col-span-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-6 text-white/40">
          <Target size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Active Milestones Progression</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((m) => {
            const pAtAge = projection.find(p => p.age === m.age);
            const balanceAtAge = pAtAge?.balance || 0;
            const progress = Math.min(100, (balanceAtAge / m.cost) * 100);
            const status = pAtAge?.shortfall || 'none';

            return (
              <div key={m.id} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{m.label}</h4>
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-tighter">Age {m.age} • {m.age - currentAge} years away</p>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest",
                    status === 'none' ? "bg-emerald-500/20 text-emerald-400" :
                    status === 'minor' ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                    {status === 'none' ? 'On Track' : status === 'minor' ? 'At Risk' : 'Critical'}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5">
                    <span className="text-white/60">{Math.round(progress)}% Funded</span>
                    <span className="text-white/90">{formatCurrency(m.cost)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        status === 'none' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" :
                        status === 'minor' ? "bg-amber-500" : "bg-red-500"
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
};

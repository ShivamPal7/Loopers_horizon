import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Info } from 'lucide-react';
import { type SimulationResult, type Milestone, getAIRecommendations } from '@/lib/finance-utils';

interface AIInsightsBlockProps {
  currentAge: number;
  monthlySavings: number;
  milestones: Milestone[];
  projection: SimulationResult[];
}

export const AIInsightsBlock: React.FC<AIInsightsBlockProps> = ({
  currentAge,
  monthlySavings,
  milestones,
  projection,
}) => {
  const recommendations = getAIRecommendations(currentAge, monthlySavings, milestones, projection);

  return (
    <div className="bg-card backdrop-blur-xl rounded-[2.5rem] p-8 border border-border shadow-2xl space-y-6">
      <div className="flex items-center gap-3 text-primary">
        <Sparkles size={20} strokeWidth={2.5} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Horizon AI Intelligence</span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 p-5 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-all group"
          >
            <div className="shrink-0 mt-1">
              {i === 0 ? (
                <Info size={16} className="text-primary" />
              ) : i === 1 ? (
                <Target size={16} className="text-emerald-500" />
              ) : (
                <Zap size={16} className="text-amber-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                {rec}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">
          * Recommendations are dynamically generated based on your real-time cashflow projections.
        </p>
      </div>
    </div>
  );
};

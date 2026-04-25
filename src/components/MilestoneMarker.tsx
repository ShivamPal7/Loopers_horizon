import { motion } from 'framer-motion';
import { Home, Briefcase, GraduationCap, Users, Plane, Sun, HeartPulse, Heart } from 'lucide-react';
import type { Milestone, Category } from '../lib/types';
import { cn } from '@/lib/utils';

interface MilestoneMarkerProps {
  milestone: Milestone;
  onClick?: () => void;
  className?: string;
}

const CATEGORY_ICONS: Record<Category, any> = {
  housing: Home,
  business: Briefcase,
  education: GraduationCap,
  family: Users,
  travel: Plane,
  retirement: Sun,
  health: HeartPulse,
  relationships: Heart,
};

const CATEGORY_COLORS: Record<Category, string> = {
  housing: '#FF9500',
  business: '#3B82F6',
  education: '#A855F7',
  family: '#EC4899',
  travel: '#14B8A6',
  retirement: '#FBBF24',
  health: '#10B981',
  relationships: '#EF4444',
};

export function MilestoneMarker({ milestone, onClick, className }: MilestoneMarkerProps) {
  const Icon = CATEGORY_ICONS[milestone.category];
  const color = CATEGORY_COLORS[milestone.category];

  return (
    <motion.div
      className={cn("absolute cursor-pointer flex flex-col items-center group", className)}
      style={{ left: `${((milestone.targetAge - 20) / 60) * 100}%` }}
      whileHover={{ 
        scale: 1.15,
        rotateY: 15,
        rotateZ: -5,
        z: 50
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-shadow group-hover:shadow-xl"
        style={{ backgroundColor: color }}
      >
        <Icon className="text-white w-6 h-6" />
      </div>
      
      <div className="mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        <p className="text-[10px] font-bold text-slate-800">{milestone.label}</p>
        <p className="text-[9px] text-slate-500">Age {milestone.targetAge} • ₹{(milestone.cost / 100000).toFixed(1)}L</p>
      </div>

      <div className="absolute top-10 w-0.5 h-12 bg-slate-200 -z-10 group-hover:bg-slate-300 transition-colors" />
    </motion.div>
  );
}

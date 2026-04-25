import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/finance-utils';
import type { Milestone } from '@/lib/finance-utils';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Plane, 
  Baby, 
  Stethoscope, 
  Coins,
  AlertCircle
} from 'lucide-react';

interface MilestoneMarkerProps {
  milestone: Milestone;
  x: number;
  onUpdate: (updates: Partial<Milestone>) => void;
  shortfallType: 'none' | 'minor' | 'moderate' | 'critical';
  canvasWidth: number;
  startAge: number;
  endAge: number;
}

const categoryIcons: Record<string, any> = {
  housing: Home,
  business: Briefcase,
  education: GraduationCap,
  lifestyle: Heart,
  travel: Plane,
  family: Baby,
  health: Stethoscope,
  retirement: Coins,
  other: Heart,
};

const shortfallColors = {
  none: 'bg-emerald-500 shadow-emerald-500/50',
  minor: 'bg-amber-500 shadow-amber-500/50',
  moderate: 'bg-orange-500 shadow-orange-500/50',
  critical: 'bg-red-500 shadow-red-500/50',
};

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  milestone,
  x,
  onUpdate,
  shortfallType,
  canvasWidth,
  startAge,
  endAge,
}) => {
  const Icon = categoryIcons[milestone.category] || categoryIcons.other;
  const isDragging = React.useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const startX = e.clientX;
    const startAgeVal = milestone.age;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = moveEvent.clientX - startX;
      const widthPerYear = canvasWidth / (endAge - startAge);
      const deltaAge = deltaX / widthPerYear;
      const newAge = Math.max(startAge, Math.min(endAge, startAgeVal + deltaAge));
      onUpdate({ age: Math.round(newAge) });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div 
      className="absolute flex flex-col items-center group cursor-grab active:cursor-grabbing select-none z-10"
      style={{ left: x, top: 0 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-widest z-50">
        {milestone.label} • {formatCurrency(milestone.cost)}
      </div>

      {/* Main Marker Icon */}
      <div 
        onMouseDown={handleMouseDown}
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300 relative",
          shortfallColors[shortfallType],
          "shadow-xl hover:scale-110 active:scale-95"
        )}
      >
        <Icon size={20} />
        {shortfallType !== 'none' && (
          <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
            <AlertCircle size={10} className={cn(
              shortfallType === 'minor' ? 'text-amber-500' : 'text-red-500'
            )} />
          </div>
        )}
      </div>

      <div className={cn(
        "w-px h-40 bg-gradient-to-b from-white/20 to-transparent",
        shortfallType !== 'none' && "from-amber-400/50"
      )} />
      
      <div className="mt-2 text-center">
        <span className="block text-[10px] font-black text-white uppercase tracking-tighter bg-white/10 px-2 py-0.5 rounded-lg border border-white/5">
          Age {milestone.age}
        </span>
      </div>
    </motion.div>
  );
};

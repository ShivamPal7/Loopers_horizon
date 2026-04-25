import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/finance-utils';
import type { Milestone } from '@/lib/finance-utils';
import { Home, Briefcase, GraduationCap, Heart, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MilestoneMarkerProps {
  milestone: Milestone;
  x: number;
  onUpdate: (updates: Partial<Milestone>) => void;
  shortfallType: 'none' | 'minor' | 'moderate' | 'critical';
  canvasWidth: number;
  startAge: number;
  endAge: number;
}

const categoryIcons = {
  housing: Home,
  business: Briefcase,
  education: GraduationCap,
  lifestyle: Heart,
  family: Heart,
  travel: Star,
  retirement: Star,
  health: Star,
  other: Star,
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
  const [isDragging, setIsDragging] = useState(false);
  const Icon = categoryIcons[milestone.category] || Star;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.getElementById('horizon-canvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      
      const newAge = Math.round(((relativeX / canvasWidth) * (endAge - startAge)) + startAge);
      const constrainedAge = Math.max(startAge, Math.min(endAge, newAge));
      
      onUpdate({ age: constrainedAge });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, canvasWidth, startAge, endAge, onUpdate]);

  const statusColors = {
    none: "border-emerald-500/50 shadow-emerald-500/10 text-emerald-400 bg-emerald-500/20",
    minor: "border-yellow-500/50 shadow-yellow-500/10 text-yellow-400 bg-yellow-500/20",
    moderate: "border-orange-500/50 shadow-orange-500/10 text-orange-400 bg-orange-500/20",
    critical: "border-red-500/50 shadow-red-500/10 text-red-400 bg-red-500/20",
  };

  const indicatorColors = {
    none: "bg-emerald-500",
    minor: "bg-yellow-500",
    moderate: "bg-orange-500",
    critical: "bg-red-500",
  };

  return (
    <div
      className={cn(
        "absolute top-0 -translate-x-1/2 flex flex-col items-center group cursor-grab active:cursor-grabbing transition-shadow",
        isDragging && "z-50"
      )}
      style={{ left: x }}
      onMouseDown={handleMouseDown}
    >
      <div className={cn(
        "mb-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border shadow-xl min-w-[140px] transition-all duration-300",
        statusColors[shortfallType],
        "group-hover:scale-105 group-hover:-translate-y-1"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <div className={cn(
            "p-1.5 rounded-lg",
            statusColors[shortfallType].split(' ').pop() // Get the background color
          )}>
            <Icon size={14} />
          </div>
          <span className="text-xs font-semibold text-white/90 truncate">{milestone.label}</span>
        </div>
        <div className="text-sm font-bold text-white mb-0.5">
          {formatCurrency(milestone.cost)}
        </div>
        <div className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
          Age {milestone.age}
        </div>
        
        <div className={cn(
          "absolute top-2 right-2 w-2 h-2 rounded-full",
          indicatorColors[shortfallType],
          shortfallType !== 'none' && "animate-pulse"
        )} />
      </div>

      <div className={cn(
        "w-px h-40 bg-gradient-to-b from-white/20 to-transparent",
        isDragging && "from-white/50"
      )} />
      
      <div className="absolute bottom-0 translate-y-full pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold text-white/40">{milestone.age}</span>
      </div>
    </div>
  );
};

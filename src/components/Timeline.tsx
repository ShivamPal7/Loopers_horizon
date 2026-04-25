import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MilestoneMarker } from './MilestoneMarker';
import type { Milestone } from '../lib/types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  milestones: Milestone[];
  currentAge: number;
}

type ZoomLevel = 'detail' | 'medium' | 'broad';

export function Timeline({ milestones, currentAge }: TimelineProps) {
  const [zoom, setZoom] = useState<ZoomLevel>('medium');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getWidth = () => {
    switch (zoom) {
      case 'detail': return '300%';
      case 'medium': return '150%';
      case 'broad': return '100%';
    }
  };

  const ages = Array.from({ length: 61 }, (_, i) => 20 + i);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <div className="flex justify-end gap-2 mb-2">
        {(['detail', 'medium', 'broad'] as ZoomLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => setZoom(level)}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full border transition-all",
              zoom === level 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
            )}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div 
        className="relative overflow-x-auto pb-20 pt-10 no-scrollbar cursor-grab active:cursor-grabbing"
        ref={scrollContainerRef}
      >
        <motion.div 
          className="relative h-24 border-b-2 border-slate-200"
          animate={{ width: getWidth() }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Current Age Indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-10"
            style={{ left: `${((currentAge - 20) / 60) * 100}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
              Today ({currentAge})
            </div>
          </div>

          {/* Age Markers */}
          {ages.map((age) => {
            const isDecade = age % 10 === 0;
            const isFiveYear = age % 5 === 0;
            const shouldShowLabel = zoom === 'detail' || (zoom === 'medium' && isFiveYear) || (zoom === 'broad' && isDecade);
            
            if (!shouldShowLabel && !isFiveYear && zoom !== 'detail') return null;

            return (
              <div 
                key={age}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: `${((age - 20) / 60) * 100}%` }}
              >
                <div className={cn(
                  "w-0.5 bg-slate-300",
                  isDecade ? "h-6 bg-slate-400" : isFiveYear ? "h-4" : "h-2"
                )} />
                {shouldShowLabel && (
                  <span className={cn(
                    "mt-2 text-[10px] font-medium text-slate-500",
                    isDecade && "text-slate-900 font-bold text-[11px]"
                  )}>
                    {age}
                  </span>
                )}
              </div>
            );
          })}

          {/* Milestones */}
          {milestones.map((milestone) => (
            <MilestoneMarker 
              key={milestone.id} 
              milestone={milestone}
              className="bottom-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

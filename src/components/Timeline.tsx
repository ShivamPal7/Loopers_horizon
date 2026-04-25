import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  MoreHorizontal,
  TrendingUp
} from 'lucide-react';
import type { Milestone } from '../lib/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface TimelineProps {
  milestones: Milestone[];
  currentAge: number;
  lifeExpectancy: number;
  onSelectAge: (age: number) => void;
}

export function Timeline({ milestones, currentAge, lifeExpectancy, onSelectAge }: TimelineProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const ages = Array.from(
    { length: lifeExpectancy - 17 }, 
    (_, i) => 18 + i
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing': return <Home className="size-3" />;
      case 'business': return <Briefcase className="size-3" />;
      case 'education': return <GraduationCap className="size-3" />;
      default: return <MoreHorizontal className="size-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'housing': return 'bg-orange-500 shadow-orange-500/20';
      case 'business': return 'bg-blue-500 shadow-blue-500/20';
      case 'education': return 'bg-purple-500 shadow-purple-500/20';
      default: return 'bg-slate-500 shadow-slate-500/20';
    }
  };

  return (
    <div className="relative w-full py-12 px-4 select-none">
      <div className="flex items-center justify-between mb-10 px-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            Life Roadmap
          </h3>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Visualizing milestones across the horizon
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border/50">
          <button 
            onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
            className="size-8 rounded-lg hover:bg-background flex items-center justify-center text-xs font-black"
          >
            －
          </button>
          <div className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            {Math.round(zoom * 100)}% Scale
          </div>
          <button 
            onClick={() => setZoom(Math.min(2, zoom + 0.2))}
            className="size-8 rounded-lg hover:bg-background flex items-center justify-center text-xs font-black"
          >
            ＋
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative overflow-x-auto custom-scrollbar pb-20 pt-10"
      >
        <div 
          className="flex items-end min-w-max px-[50vw]"
          style={{ gap: `${40 * zoom}px` }}
        >
          <TooltipProvider>
            {ages.map((age) => {
              const milestonesAtAge = milestones.filter(m => Math.floor(m.targetAge) === age);
              const isCurrentAge = age === currentAge;

              return (
                <div 
                  key={age} 
                  className="relative flex flex-col items-center group cursor-pointer"
                  onClick={() => onSelectAge(age)}
                >
                  {/* Milestone Pins */}
                  <div className="absolute bottom-16 flex flex-col items-center gap-2">
                    {milestonesAtAge.map((m, idx) => (
                      <Tooltip key={m.id}>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, type: "spring" }}
                            className={cn(
                              "size-8 rounded-xl flex items-center justify-center text-white shadow-lg cursor-grab active:cursor-grabbing border-2 border-background",
                              getCategoryColor(m.category)
                            )}
                          >
                            {getCategoryIcon(m.category)}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-card border-border shadow-xl p-3 rounded-xl max-w-[200px]">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-xs font-black uppercase tracking-tight">{m.label}</p>
                              <Badge variant="outline" className="text-[9px] px-1 h-4 font-bold">{m.category}</Badge>
                            </div>
                            <p className="text-sm font-black text-primary">₹{(m.cost / 100000).toFixed(1)}L</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>

                  {/* Age Marker */}
                  <div className={cn(
                    "w-0.5 h-12 transition-all duration-300",
                    isCurrentAge ? "bg-primary h-16 w-1" : "bg-border group-hover:bg-primary/50 group-hover:h-14"
                  )} />
                  
                  <div className={cn(
                    "mt-4 text-[11px] font-black tracking-tighter transition-all duration-300",
                    isCurrentAge ? "text-primary scale-125 bg-primary/10 px-2 py-0.5 rounded-md" : "text-muted-foreground group-hover:text-primary"
                  )}>
                    {age}
                  </div>

                  {isCurrentAge && (
                    <div className="absolute top-full mt-2 whitespace-nowrap">
                      <Badge className="text-[9px] font-black uppercase tracking-widest bg-primary shadow-lg shadow-primary/20">
                        Present Day
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Horizontal Line */}
        <div className="absolute bottom-[72px] left-0 right-0 h-px bg-border/50 -z-10" />
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-orange-500" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Housing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-blue-500" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Business</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-purple-500" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</span>
        </div>
      </div>
    </div>
  );
}

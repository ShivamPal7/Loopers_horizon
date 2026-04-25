import React from 'react';
import { ageToX } from '@/lib/finance-utils';
import type { Milestone, SimulationResult, LifeEvent } from '@/lib/finance-utils';
import { MilestoneMarker } from './MilestoneMarker';
import { LifeEventMarker } from './LifeEventMarker';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';


interface HorizonCanvasProps {
  milestones: Milestone[];
  lifeEvents: LifeEvent[];
  projection: SimulationResult[];
  onUpdateMilestone: (id: string, updates: Partial<Milestone>) => void;
  onSelectYear?: (year: number) => void;
  zoomLevel: '5y' | '10y' | 'full';
  startAge?: number;
  endAge?: number;
}

export const HorizonCanvas: React.FC<HorizonCanvasProps> = ({
  milestones,
  lifeEvents,
  projection,
  onUpdateMilestone,
  onSelectYear,
  zoomLevel,
  startAge = 20,
  endAge = 80,
}) => {
  const widthPerYear = zoomLevel === 'full' ? 40 : zoomLevel === '10y' ? 100 : 200;
  const canvasWidth = (endAge - startAge) * widthPerYear;
  const canvasHeight = 400;

  return (
    <div className="relative w-full h-[500px] overflow-x-auto overflow-y-auto bg-[#0a0a0b] rounded-3xl border border-white/5 shadow-2xl custom-scrollbar">
      <div 
        id="horizon-canvas"
        className="relative transition-all duration-700 ease-in-out"
        style={{ width: canvasWidth, minHeight: canvasHeight }}
      >
        {/* Background Grid & Chart */}
        <div className="absolute inset-0 pt-12 pb-8 px-4">
          <ChartContainer config={{ balance: { label: "Net Worth", color: "rgba(59, 130, 246, 0.5)" } }}>
            <AreaChart 
              data={projection} 
              width={canvasWidth} 
              height={canvasHeight - 100}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="age" hide />
              <YAxis hide domain={['dataMin - 1000000', 'dataMax + 1000000']} />
              <ReferenceLine y={0} stroke="rgba(239, 68, 68, 0.5)" strokeDasharray="3 3" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                isAnimationActive={false}
                baseValue={0}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Life Event Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {lifeEvents.map((e) => (
            <LifeEventMarker
              key={e.id}
              label={e.label}
              age={e.age}
              icon={e.icon}
              x={ageToX(e.age, startAge, endAge, canvasWidth)}
            />
          ))}
        </div>

        {/* Life Stages Background */}
        <div className="absolute inset-0 flex pointer-events-none opacity-[0.03]">
          {Array.from({ length: Math.ceil((endAge - startAge) / 10) }).map((_, i) => (
            <div 
              key={i}
              className="h-full border-r border-white flex items-end p-4"
              style={{ width: 10 * widthPerYear }}
            >
              <span className="text-8xl font-black">{startAge + (i * 10)}</span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 top-12">
          {milestones.map((m) => {
            const pAtAge = projection.find(p => p.age === m.age);
            return (
              <div key={m.id} onClick={() => onSelectYear?.(Math.floor(m.age))}>
                <MilestoneMarker
                  milestone={m}
                  x={ageToX(m.age, startAge, endAge, canvasWidth)}
                  onUpdate={(updates) => onUpdateMilestone(m.id, updates)}
                  shortfallType={pAtAge?.shortfall || 'none'}
                  canvasWidth={canvasWidth}
                  startAge={startAge}
                  endAge={endAge}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 w-full h-12 border-t border-white/10 bg-black/40 backdrop-blur-xl flex items-center">
          {Array.from({ length: (endAge - startAge) / (zoomLevel === 'full' ? 5 : 1) + 1 }).map((_, i) => {
            const age = startAge + i * (zoomLevel === 'full' ? 5 : 1);
            return (
              <div 
                key={i}
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: ageToX(age, startAge, endAge, canvasWidth) }}
              >
                <div className="w-px h-2 bg-white/20 mb-1" />
                <span className="text-[10px] font-bold text-white/30 tracking-tighter uppercase">
                  Age {age}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

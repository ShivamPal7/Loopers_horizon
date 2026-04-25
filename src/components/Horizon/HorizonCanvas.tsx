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
  currentAge: number;
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
  currentAge,
}) => {
  const widthPerYear = zoomLevel === 'full' ? 40 : zoomLevel === '10y' ? 100 : 200;
  const canvasWidth = (endAge - startAge) * widthPerYear;
  const canvasHeight = 400;

  return (
    <div className="relative w-full h-[540px] overflow-x-auto overflow-y-hidden bg-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/10 custom-scrollbar p-10">
      <div className="mb-6">
          <h3 className="text-sm font-black text-white uppercase tracking-tight">Wealth Projection</h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Compound interest & milestone drawdowns</p>
        </div>

        <div 
          id="horizon-canvas"
          className="relative transition-all duration-700 ease-in-out"
          style={{ width: canvasWidth, height: canvasHeight }}
        >
          {/* Background Grid & Chart */}
          <div className="absolute inset-0">
            <ChartContainer config={{ balance: { label: "Net Worth", color: "#3b82f6" } }}>
              <AreaChart 
                data={projection} 
                width={canvasWidth} 
                height={canvasHeight}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="age" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'rgba(255,255,255,0.2)' }}
                  dy={20}
                />
                <YAxis hide domain={['dataMin', 'dataMax + 2000000']} />
                
                {/* Today Line */}
                <ReferenceLine 
                  x={currentAge} 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ position: 'top', value: 'Today', fill: '#3b82f6', fontSize: 10, fontWeight: 900, offset: 10 }}
                />

                <ChartTooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  content={<ChartTooltipContent className="bg-slate-900 border-white/10 shadow-2xl p-4 rounded-3xl" />} 
                />
                
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  isAnimationActive={false}
                  baseValue="dataMin"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Markers Layer (Floating above chart) */}
          <div className="absolute inset-0 top-0 pointer-events-none">
            {milestones.map((m) => {
              const pAtAge = projection.find(p => p.age === m.age);
              return (
                <div key={m.id} onClick={() => onSelectYear?.(Math.floor(m.age))} className="pointer-events-auto">
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
        </div>
    </div>
  );
};

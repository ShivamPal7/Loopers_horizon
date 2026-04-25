import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import type { Milestone } from '../lib/types';

interface ProjectionChartProps {
  data: { age: number; balance: number }[];
  milestones: Milestone[];
  currentAge: number;
}

export function ProjectionChart({ data, milestones, currentAge }: ProjectionChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-sm font-bold text-slate-800">Wealth Projection</h3>
        <p className="text-[10px] text-slate-500">Compound interest & milestone drawdowns</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 50, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="age" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            ticks={[20, 30, 40, 50, 60, 70, 80]}
          />
          <YAxis 
            hide
            domain={[0, (dataMax: number) => dataMax * 1.1]}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-lg shadow-xl">
                    <p className="text-xs font-bold text-slate-900">Age {payload[0].payload.age}</p>
                    <p className="text-sm font-bold text-blue-600">{formatCurrency(payload[0].value as number)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            animationDuration={2000}
          />
          
          {/* Reference Lines for Milestones */}
          {milestones.map((m) => (
            <ReferenceLine 
              key={m.id}
              x={m.targetAge} 
              stroke={
                m.category === 'housing' ? '#FF9500' :
                m.category === 'business' ? '#3B82F6' :
                m.category === 'education' ? '#A855F7' :
                '#94a3b8'
              } 
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />
          ))}

          <ReferenceLine 
            x={currentAge} 
            stroke="#3B82F6" 
            label={{ 
              position: 'top', 
              value: 'Today', 
              fill: '#3B82F6', 
              fontSize: 10, 
              fontWeight: 'bold' 
            }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

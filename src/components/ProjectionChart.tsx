"use client"

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { TrendingUp } from 'lucide-react';

interface ProjectionChartProps {
  data: { age: number; balance: number }[];
  milestones: Milestone[];
  currentAge: number;
}

const chartConfig = {
  balance: {
    label: "Projected Wealth",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ProjectionChart({ data, milestones, currentAge }: ProjectionChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="@container/card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Wealth Trajectory</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <TrendingUp className="size-3.5 text-muted-foreground" />
            Compound growth vs. Life milestones
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis 
              dataKey="age" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontWeight: 600 }}
              ticks={[20, 30, 40, 50, 60, 70, 80]}
              tickMargin={10}
            />
            <YAxis 
              hide
              domain={[0, (dataMax: number) => dataMax * 1.1]}
            />
            <ChartTooltip 
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Age ${value}`}
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === "balance" ? "Projected Balance" : name,
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--color-balance)" 
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
                strokeDasharray="4 4"
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
            ))}

            <ReferenceLine 
              x={currentAge} 
              stroke="var(--primary)" 
              strokeWidth={2}
              label={{ 
                position: 'top', 
                value: 'Today', 
                fill: 'var(--primary)', 
                fontSize: 10, 
                fontWeight: 'black',
                className: "uppercase tracking-tighter"
              }} 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

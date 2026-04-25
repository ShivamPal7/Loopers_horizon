import { 
  Trophy, 
  Target, 
  Users, 
  Activity, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import type { Milestone, FinancialSettings } from '../lib/types';

import { Progress } from '@/components/ui/progress';
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatsCardProps {
  settings: FinancialSettings;
  milestones: Milestone[];
  projectionData: { age: number; balance: number }[];
}

export function StatsCard({ settings, milestones, projectionData }: StatsCardProps) {
  const currentAge = settings.currentAge;
  const lifeProgress = (currentAge / settings.lifeExpectancy) * 100;

  // Life Stage logic
  const getLifeStage = (age: number) => {
    if (age < 25) return 'Early Career';
    if (age < 35) return 'Establishment';
    if (age < 50) return 'Peak Earning';
    if (age < 60) return 'Pre-Retirement';
    return 'Retirement';
  };

  const lifeStage = getLifeStage(currentAge);

  // Peer comparison (Mock data based on Indian averages)
  const avgNetWorthByAge: Record<number, number> = {
    25: 320000,
    28: 500000,
    30: 800000,
    35: 1500000,
    40: 3500000,
    50: 8500000,
    60: 15000000,
  };

  const nearestAge = Object.keys(avgNetWorthByAge).map(Number).sort((a, b) => Math.abs(a - currentAge) - Math.abs(b - currentAge))[0];
  const avgNetWorth = avgNetWorthByAge[nearestAge] || 500000;
  const netWorthDiff = settings.currentNetWorth - avgNetWorth;
  const percentAhead = (netWorthDiff / avgNetWorth) * 100;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
    return `₹${(val / 1000).toFixed(0)}K`
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2 xl:grid-cols-4">
      {/* Current Position */}
      <Card className="@container/card bg-gradient-to-t from-blue-500/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            Current Position
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Age {currentAge}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400">
              {lifeStage}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm min-h-[80px] justify-end">
          <div className="flex justify-between w-full text-sm font-medium">
            <span>Life Progress</span>
            <span>{lifeProgress.toFixed(0)}%</span>
          </div>
          <Progress value={lifeProgress} className="h-1.5 w-full bg-slate-100" />
          <div className="text-muted-foreground text-xs">{settings.lifeExpectancy - currentAge} years remaining</div>
        </CardFooter>
      </Card>

      {/* Peer Comparison */}
      <Card className="@container/card bg-gradient-to-t from-indigo-500/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5">
            <Users className="size-3.5 text-muted-foreground" />
            Peer Comparison
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {Math.abs(percentAhead).toFixed(0)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={percentAhead >= 0 ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400" : "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400"}>
              {percentAhead >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {percentAhead >= 0 ? 'Ahead' : 'Behind'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm min-h-[80px] justify-end">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Vs. ₹{formatCurrency(avgNetWorth)} average
            {percentAhead >= 0 ? <TrendingUp className="size-4 text-green-500" /> : <TrendingDown className="size-4 text-red-500" />}
          </div>
          <div className="text-muted-foreground text-xs">For Age {nearestAge} bracket</div>
        </CardFooter>
      </Card>

      {/* Goal Status */}
      <Card className="@container/card bg-gradient-to-t from-emerald-500/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5">
            <Target className="size-3.5 text-muted-foreground" />
            Milestone Readiness
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {milestones.filter(m => (projectionData.find(d => d.age === m.targetAge)?.balance || 0) >= m.cost).length} / {milestones.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400">
              {milestones.length > 0 ? ((milestones.filter(m => (projectionData.find(d => d.age === m.targetAge)?.balance || 0) >= m.cost).length / milestones.length) * 100).toFixed(0) : 0}% Ready
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm min-h-[80px] justify-end">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {milestones.length - milestones.filter(m => (projectionData.find(d => d.age === m.targetAge)?.balance || 0) >= m.cost).length} goals need attention
            <Activity className="size-4 text-amber-500" />
          </div>
          <div className="text-muted-foreground text-xs">Based on current savings rate</div>
        </CardFooter>
      </Card>

      {/* Achievement Summary */}
      <Card className="@container/card bg-gradient-to-t from-amber-500/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5">
            <Trophy className="size-3.5 text-muted-foreground" />
            Achievements
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {[
              settings.monthlySavings > 50000,
              milestones.length >= 3,
              milestones.length > 0 && milestones.every(m => (projectionData.find(d => d.age === m.targetAge)?.balance || 0) >= m.cost),
              settings.currentAge < 30
            ].filter(Boolean).length} Badges
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400">
              Active Plan
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm min-h-[80px] justify-end">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {milestones.length > 0 ? "Compounding Master" : "Planning Phase"}
            <TrendingUp className="size-4 text-amber-500" />
          </div>
          <div className="text-muted-foreground text-xs">Unlock more by adding milestones</div>
        </CardFooter>
      </Card>
    </div>
  );
}

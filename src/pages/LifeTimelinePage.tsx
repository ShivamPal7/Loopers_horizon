"use client"

import { useState } from 'react';
import { 
  Download, 
  ArrowRightLeft, 
} from 'lucide-react';
import { useHorizonStore } from '../lib/useHorizonStore';
import { StatsCard } from '../components/StatsCard';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { ProjectionChart } from '../components/ProjectionChart';
import { ScenarioComparison } from '../components/ScenarioComparison';
import { Button } from "@/components/ui/button"

export function LifeTimelinePage() {
  const { settings, milestones, updateSettings, projectionData } = useHorizonStore();
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        {/* Header with Action */}
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Life Timeline</h1>
            <p className="text-sm text-muted-foreground">Projected financial journey based on current trajectory</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCompareOpen(true)}
              className="gap-2"
            >
              <ArrowRightLeft className="size-4" />
              Compare Scenarios
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-xl border border-border/50">
              <Download className="size-4" />
            </Button>
          </div>
        </div>

        {/* Executive Summary */}
        <StatsCard 
          settings={settings} 
          milestones={milestones} 
          projectionData={projectionData} 
        />

        <div className="grid grid-cols-1 px-4 lg:px-6 xl:grid-cols-12 gap-6">
          {/* Simulation Controls - Left Sidebar */}
          <div className="xl:col-span-3">
            <ScenarioPanel settings={settings} onChange={updateSettings} />
          </div>

          {/* Visualizations - Right Main Area */}
          <div className="xl:col-span-9">
            <ProjectionChart 
              data={projectionData} 
              milestones={milestones} 
              currentAge={settings.currentAge} 
            />
          </div>
        </div>
      </div>

      <ScenarioComparison 
        currentSettings={settings}
        milestones={milestones}
        open={isCompareOpen}
        onOpenChange={setIsCompareOpen}
      />
    </div>
  );
}

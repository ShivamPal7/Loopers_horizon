import { useHorizonStore } from "@/lib/useHorizonStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Target, CheckCircle2, AlertTriangle, XCircle, TrendingUpIcon, TargetIcon, WalletIcon, CalendarIcon, BriefcaseIcon, GraduationCapIcon, HeartIcon, PlaneIcon, CoffeeIcon, ActivityIcon, UsersIcon, HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function MilestonesPage() {
  const { milestones, settings, projectionData } = useHorizonStore();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  }

  const sortedMilestones = [...milestones].sort((a, b) => a.targetAge - b.targetAge);
  const totalCost = milestones.reduce((sum, m) => sum + m.cost, 0);
  const nextMilestone = sortedMilestones.find(m => m.targetAge > settings.currentAge);

  const getCategoryConfig = (category: string) => {
    const config: Record<string, any> = {
      housing: { icon: <HomeIcon className="size-3.5 text-muted-foreground" />, label: "Housing" },
      business: { icon: <BriefcaseIcon className="size-3.5 text-muted-foreground" />, label: "Business" },
      education: { icon: <GraduationCapIcon className="size-3.5 text-muted-foreground" />, label: "Education" },
      family: { icon: <HeartIcon className="size-3.5 text-muted-foreground" />, label: "Family" },
      travel: { icon: <PlaneIcon className="size-3.5 text-muted-foreground" />, label: "Travel" },
      retirement: { icon: <CoffeeIcon className="size-3.5 text-muted-foreground" />, label: "Retirement" },
      health: { icon: <ActivityIcon className="size-3.5 text-muted-foreground" />, label: "Health" },
      relationships: { icon: <UsersIcon className="size-3.5 text-muted-foreground" />, label: "Relationships" }
    };
    return config[category] || { icon: <TargetIcon className="size-3.5 text-muted-foreground" />, label: "Other" };
  };

  const getMilestoneStatus = (milestone: any) => {
    const ageData = projectionData.find(d => d.age === Math.floor(milestone.targetAge));
    const projectedBalanceAfter = ageData ? ageData.balance : 0;
    
    // Calculate the balance right before this milestone was deducted
    const available = Math.max(0, projectedBalanceAfter + milestone.cost);
    const percent = Math.min(100, (available / milestone.cost) * 100);
    
    if (projectedBalanceAfter >= 0) return { label: 'ON TRACK', icon: <CheckCircle2 className="size-3" />, class: 'text-green-600 border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400', percent: 100, progressClass: 'bg-green-500' };
    if (percent >= 70) return { label: 'AT RISK', icon: <AlertTriangle className="size-3" />, class: 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400', percent: percent, progressClass: 'bg-amber-500' };
    return { label: 'CRITICAL', icon: <XCircle className="size-3" />, class: 'text-red-600 border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400', percent: percent, progressClass: 'bg-red-500' };
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Life Milestones</h2>
            <p className="text-sm text-muted-foreground mt-1">Track and manage your major financial goals.</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Goal
          </Button>
        </div>

        {/* Overview Cards Style */}
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <TargetIcon className="size-3.5 text-muted-foreground" />
                Total Goals
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {milestones.length}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Planned across lifetime
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <WalletIcon className="size-3.5 text-muted-foreground" />
                Total Required Capital
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatCurrency(totalCost)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                <TrendingUpIcon className="size-4 text-green-500" /> Based on current plans
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5 text-muted-foreground" />
                Next Upcoming
              </CardDescription>
              <CardTitle className="text-2xl font-semibold truncate @[250px]/card:text-3xl">
                {nextMilestone ? nextMilestone.label : "No upcoming goals"}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {nextMilestone ? (
                  <>In {Math.max(0, nextMilestone.targetAge - settings.currentAge)} years</>
                ) : (
                  <>Plan your first milestone</>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Milestones List */}
        <div className="px-4 lg:px-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">Your Timeline</h3>
          
          {sortedMilestones.length === 0 ? (
            <div className="p-12 text-center rounded-xl border border-dashed bg-card">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-semibold text-foreground">No milestones yet</h4>
              <p className="text-muted-foreground text-sm mb-6 mt-1">Start planning your future by adding your first financial goal.</p>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Milestone
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
              {sortedMilestones.map((milestone) => {
                const catConfig = getCategoryConfig(milestone.category);
                const status = getMilestoneStatus(milestone);
                const yearsAway = Math.max(0, milestone.targetAge - settings.currentAge);
                
                return (
                  <Card key={milestone.id} className="@container/card relative overflow-hidden transition-all duration-300 group">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-semibold text-muted-foreground/80">
                        {catConfig.icon}
                        {catConfig.label}
                      </CardDescription>
                      <CardTitle className="text-xl font-semibold @[250px]/card:text-2xl mt-1.5 leading-tight">
                        {milestone.label}
                      </CardTitle>
                      <CardAction>
                        <Badge variant="outline" className={cn("gap-1 shadow-sm font-semibold", status.class)}>
                          {status.icon} {status.label}
                        </Badge>
                      </CardAction>
                    </CardHeader>
                    
                    <CardContent className="space-y-5 pb-4">
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-sm font-medium text-muted-foreground">Target Cost</span>
                          <span className="text-xl font-semibold tabular-nums text-foreground">{formatCurrency(milestone.cost)}</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium text-muted-foreground">
                            <span>Progress</span>
                            <span>{Math.round(status.percent)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full transition-all duration-1000 ease-out", status.progressClass)}
                              style={{ width: `${status.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex-col items-start gap-2 text-sm pt-4">
                      <div className="text-muted-foreground font-medium text-xs flex gap-2 items-center">
                        <span className="text-foreground">Age {milestone.targetAge}</span>
                        <span>•</span>
                        <span>{yearsAway === 0 ? "This year" : `${yearsAway} years away`}</span>
                      </div>
                      <Button variant="link" className="px-0 h-auto font-medium text-primary mt-1 text-xs">
                        View Details <TrendingUpIcon className="w-3 h-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

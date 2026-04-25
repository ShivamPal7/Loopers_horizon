import { useHorizonStore } from "@/lib/useHorizonStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, GraduationCap, Heart, Plane, Coffee, Activity, Users, Plus, Target, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react"
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
      housing: { icon: <Home className="w-5 h-5" />, colorClass: "text-[#FF9500] dark:text-[#FF9500]", bgClass: "bg-[#FF9500]/10 dark:bg-[#FF9500]/20", borderClass: "border-[#FF9500]/20 dark:border-[#FF9500]/30", label: "Housing" },
      business: { icon: <Briefcase className="w-5 h-5" />, colorClass: "text-[#3B82F6] dark:text-[#3B82F6]", bgClass: "bg-[#3B82F6]/10 dark:bg-[#3B82F6]/20", borderClass: "border-[#3B82F6]/20 dark:border-[#3B82F6]/30", label: "Business" },
      education: { icon: <GraduationCap className="w-5 h-5" />, colorClass: "text-[#A855F7] dark:text-[#A855F7]", bgClass: "bg-[#A855F7]/10 dark:bg-[#A855F7]/20", borderClass: "border-[#A855F7]/20 dark:border-[#A855F7]/30", label: "Education" },
      family: { icon: <Heart className="w-5 h-5" />, colorClass: "text-[#EC4899] dark:text-[#EC4899]", bgClass: "bg-[#EC4899]/10 dark:bg-[#EC4899]/20", borderClass: "border-[#EC4899]/20 dark:border-[#EC4899]/30", label: "Family" },
      travel: { icon: <Plane className="w-5 h-5" />, colorClass: "text-[#14B8A6] dark:text-[#14B8A6]", bgClass: "bg-[#14B8A6]/10 dark:bg-[#14B8A6]/20", borderClass: "border-[#14B8A6]/20 dark:border-[#14B8A6]/30", label: "Travel" },
      retirement: { icon: <Coffee className="w-5 h-5" />, colorClass: "text-[#FBBF24] dark:text-[#FBBF24]", bgClass: "bg-[#FBBF24]/10 dark:bg-[#FBBF24]/20", borderClass: "border-[#FBBF24]/20 dark:border-[#FBBF24]/30", label: "Retirement" },
      health: { icon: <Activity className="w-5 h-5" />, colorClass: "text-[#10B981] dark:text-[#10B981]", bgClass: "bg-[#10B981]/10 dark:bg-[#10B981]/20", borderClass: "border-[#10B981]/20 dark:border-[#10B981]/30", label: "Health" },
      relationships: { icon: <Users className="w-5 h-5" />, colorClass: "text-[#EF4444] dark:text-[#EF4444]", bgClass: "bg-[#EF4444]/10 dark:bg-[#EF4444]/20", borderClass: "border-[#EF4444]/20 dark:border-[#EF4444]/30", label: "Relationships" }
    };
    return config[category] || { icon: <Target className="w-5 h-5" />, colorClass: "text-muted-foreground", bgClass: "bg-muted", borderClass: "border-border", label: "Other" };
  };

  const getMilestoneStatus = (milestone: any) => {
    const ageData = projectionData.find(d => d.age === Math.floor(milestone.targetAge));
    const projectedBalanceAfter = ageData ? ageData.balance : 0;
    
    // Calculate the balance right before this milestone was deducted
    const available = Math.max(0, projectedBalanceAfter + milestone.cost);
    const percent = Math.min(100, (available / milestone.cost) * 100);
    
    if (projectedBalanceAfter >= 0) return { label: 'ON TRACK', icon: <CheckCircle2 className="w-3.5 h-3.5" />, class: 'text-green-600 border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400', percent: 100, progressClass: 'bg-green-500' };
    if (percent >= 70) return { label: 'AT RISK', icon: <AlertTriangle className="w-3.5 h-3.5" />, class: 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400', percent: percent, progressClass: 'bg-amber-500' };
    return { label: 'CRITICAL', icon: <XCircle className="w-3.5 h-3.5" />, class: 'text-red-600 border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400', percent: percent, progressClass: 'bg-red-500' };
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Life Milestones</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">Track and manage your major financial goals.</p>
        </div>
        <Button className="bg-primary text-primary-foreground shadow-lg rounded-xl font-bold h-11 px-6">
          <Plus className="w-4 h-4 mr-2" /> Add Goal
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl shadow-sm border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Total Goals</CardDescription>
            <CardTitle className="text-3xl font-black text-foreground">{milestones.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Target className="w-4 h-4 text-primary" /> Planned across lifetime
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-sm border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Total Required Capital</CardDescription>
            <CardTitle className="text-3xl font-black text-foreground">{formatCurrency(totalCost)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" /> Based on current plans
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm border-border bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-bold text-primary uppercase tracking-widest text-[10px]">Next Upcoming</CardDescription>
            <CardTitle className="text-xl font-black text-foreground truncate">
              {nextMilestone ? nextMilestone.label : "No upcoming goals"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              {nextMilestone ? (
                <>In {Math.max(0, nextMilestone.targetAge - settings.currentAge)} years</>
              ) : (
                <>Plan your first milestone</>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones List */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-foreground tracking-tight">Your Timeline</h3>
        
        {sortedMilestones.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border-2 border-dashed border-border bg-card">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h4 className="text-lg font-bold text-foreground">No milestones yet</h4>
            <p className="text-muted-foreground font-medium mb-6 mt-1">Start planning your future by adding your first financial goal.</p>
            <Button variant="outline" className="rounded-xl font-bold border-border hover:bg-muted">
              <Plus className="w-4 h-4 mr-2" /> Add Milestone
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedMilestones.map((milestone) => {
              const catConfig = getCategoryConfig(milestone.category);
              const status = getMilestoneStatus(milestone);
              const yearsAway = Math.max(0, milestone.targetAge - settings.currentAge);
              
              return (
                <Card key={milestone.id} className="relative overflow-hidden rounded-[2rem] border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group bg-card">
                  {/* Decorative background element */}
                  <div className={cn("absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150", catConfig.bgClass)} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border", catConfig.bgClass, catConfig.colorClass, catConfig.borderClass)}>
                        {catConfig.icon}
                      </div>
                      <Badge variant="outline" className={cn("rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 shadow-sm", status.class)}>
                        {status.icon} {status.label}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black text-foreground leading-tight mb-1">{milestone.label}</CardTitle>
                      <CardDescription className="flex items-center gap-2 font-medium">
                        <span className="text-foreground/80 font-bold">Age {milestone.targetAge}</span>
                        <span className="text-muted-foreground/50">•</span>
                        <span>{yearsAway === 0 ? "This year" : `${yearsAway} years away`}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative z-10 pb-6">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Target Cost</span>
                        <span className="text-xl font-black text-foreground">{formatCurrency(milestone.cost)}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>Progress</span>
                          <span>{Math.round(status.percent)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000 ease-out relative", status.progressClass)}
                            style={{ width: `${status.percent}%` }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 relative z-10 border-t border-border mt-2 bg-muted/30 p-4">
                    <Button variant="ghost" className="w-full justify-between hover:bg-muted rounded-xl font-bold text-muted-foreground text-sm h-10">
                      View Details <TrendingUp className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

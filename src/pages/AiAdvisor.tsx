import { useFinancialSimulation } from "@/hooks/useFinancialSimulation"
import { AIChatbot } from "@/components/Horizon/AIChatbot"
import { Sparkles, TrendingUp, Target, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function AiAdvisor() {
  const { projection, milestones, currentAge } = useFinancialSimulation();

  const terminalBalance = projection[projection.length - 1]?.balance || 0;
  const totalInvested = projection.reduce((sum, p) => sum + p.savings, 0);
  const totalGrowth = terminalBalance - totalInvested - projection[0].balance;

  return (
    <div className="flex-1 space-y-10 p-8 pt-6 bg-background text-foreground min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
            Strategy Intelligence
            <Sparkles className="size-5 text-primary" />
          </h2>
          <p className="text-sm text-muted-foreground">Algorithmic optimization for your long-term financial freedom.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: Chat Only */}
        <div className="lg:col-span-8 space-y-8">
          <AIChatbot 
            projection={projection} 
            milestones={milestones} 
            currentAge={currentAge} 
          />
        </div>

        {/* Sidebar: Summary & Metrics */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Target size={16} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">Executive Summary</span>
              </div>
              <div className="space-y-1">
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Terminal Wealth</CardDescription>
                <CardTitle className="text-3xl font-black tracking-tighter">
                  ₹{(terminalBalance / 10000000).toFixed(2)} Cr
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Interest Earned</p>
                <h4 className="text-xl font-black tracking-tight">
                  ₹{(totalGrowth / 10000000).toFixed(2)} Cr
                </h4>
              </div>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-t text-primary">
                <Sparkles size={12} className="fill-current" />
                AI Optimized Plan
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Growth Multiplier</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{(terminalBalance / Math.max(1, totalInvested)).toFixed(2)}x</div>
              <p className="text-[10px] text-muted-foreground mt-1">Every ₹1 saved turns into ₹{(terminalBalance / Math.max(1, totalInvested)).toFixed(2)} by age 80.</p>
            </CardContent>
          </Card>
             
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Confidence Score</CardTitle>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">
                {projection.every(p => p.shortfall === 'none') ? '98%' : '65%'}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Probability of achieving all milestones without liquidity gaps.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

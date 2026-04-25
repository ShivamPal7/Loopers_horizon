import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

function SparkLine({ up = true }: { up?: boolean }) {
  const path = up
    ? "M0,38 L20,30 L40,22 L60,27 L80,15 L100,18 L120,8"
    : "M0,12 L20,18 L40,14 L60,24 L80,16 L100,26 L120,20"
  return (
    <svg viewBox="0 0 120 48" width="100%" height="48" fill="none" className="mt-1">
      <path d={path} stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BarChart() {
  const bars = [35, 52, 28, 45, 58, 38]
  return (
    <svg viewBox="0 0 132 66" width="100%" height="66" fill="none">
      {bars.map((h, i) => (
        <rect key={i} x={i * 22 + 2} y={66 - h} width="18" height={h} rx="3"
          className={i % 2 === 0 ? "fill-primary" : "fill-primary/40"} />
      ))}
    </svg>
  )
}

function StatLabel({ children }: { children: string }) {
  return <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{children}</p>
}

export function StatsCards() {
  return (
    <section className="py-12" id="data">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Card 1 */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Secure Retirement</CardTitle>
            <CardDescription>Our application downloads reach 50 thousand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <StatLabel>Asset Generated</StatLabel>
            <p className="text-3xl font-bold text-foreground tracking-tight leading-none">128,7K</p>
            <SparkLine up />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">23 July 2025</span>
              <Badge variant="secondary" className="text-[10px]">+3.4%</Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">220,342.76</p>
            <Separator />
            <div className="flex flex-col gap-1.5">
              {["BAG", "DAY", "WIN"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full bg-foreground/${i === 0 ? "80" : i === 1 ? "40" : "20"}`} />
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Invest with Potential</CardTitle>
            <CardDescription>FlexGuard includes a Performance Lock feature for your future.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <StatLabel>Opportunities</StatLabel>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground tracking-tight leading-none">6,4K</span>
                  <Badge variant="secondary" className="text-[10px]">+94%</Badge>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Last 7 Days</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <StatLabel>Asset Received</StatLabel>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-foreground">1,1K</span>
                  <Badge variant="secondary" className="text-[10px]">+5.5%</Badge>
                </div>
              </div>
              <div>
                <StatLabel>Spending</StatLabel>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-foreground">2,3K</span>
                  <Badge variant="outline" className="text-[10px]">+78%</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Progress value={60} className="h-1.5" />
              <Progress value={40} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3 — full width */}
        <Card className="md:col-span-2 border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 items-start">
              <div>
                <CardTitle className="text-base mb-2">Stay updated with monthly statements</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  FlexGuard includes a Performance Lock feature which gives clients the flexibility to set an End Date for your Future.
                </CardDescription>
              </div>
              <div>
                <StatLabel>Accenture Analysis</StatLabel>
                <p className="text-3xl font-bold text-foreground tracking-tight leading-none mb-2">12,3K</p>
                <BarChart />
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <StatLabel>Spending</StatLabel>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-foreground">2,3K</span>
                      <Badge variant="outline" className="text-[10px]">+78%</Badge>
                    </div>
                  </div>
                  <div>
                    <StatLabel>Allocation</StatLabel>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-foreground">1,6K</span>
                      <Badge variant="secondary" className="text-[10px]">+55%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

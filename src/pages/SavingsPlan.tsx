import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
  FlameIcon,
  TargetIcon,
  PlusIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const savingsData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 67000 },
]

const summaryCards = [
  {
    icon: PiggyBankIcon,
    label: "Monthly Savings",
    value: "₹67,000",
    change: "+21.8%",
    trend: "up" as const,
    footer: "Avg. ₹54.6K / month",
    sub: "Vs. ₹55,000 last month",
  },
  {
    icon: TargetIcon,
    label: "Savings Rate",
    value: "32%",
    change: "+4.2%",
    trend: "up" as const,
    footer: "Above your 25% goal",
    sub: "Ideal rate for retirement",
  },
  {
    icon: ShieldCheckIcon,
    label: "Emergency Fund",
    value: "₹4.5 L",
    change: "90%",
    trend: "up" as const,
    footer: "5.4 months of expenses",
    sub: "Goal: 6 months (₹5.0 L)",
  },
  {
    icon: FlameIcon,
    label: "Fire Progress",
    value: "18.4%",
    change: "+0.8%",
    trend: "up" as const,
    footer: "On track for age 45",
    sub: "Projected FIRE: ₹8.5 Cr",
  },
]

const goals = [
  { name: "New Home Downpayment", target: "₹25,00,000", current: "₹12,45,000", progress: 49.8, color: "bg-primary" },
  { name: "Euro Trip 2026", target: "₹5,00,000", current: "₹3,20,000", progress: 64, color: "bg-blue-500" },
  { name: "Emergency Fund", target: "₹5,00,000", current: "₹4,50,000", progress: 90, color: "bg-green-500" },
  { name: "New Laptop", target: "₹1,50,000", current: "₹1,50,000", progress: 100, color: "bg-orange-500" },
]

const chartConfig = {
  amount: {
    label: "Savings",
    color: "var(--primary)",
  },
} satisfies ChartConfig


export function SavingsPlan() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        {/* Header with Action */}
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Savings Plan</h1>
            <p className="text-sm text-muted-foreground">Strategic wealth accumulation and goal tracking</p>
          </div>
          <Button size="sm" className="gap-2">
            <PlusIcon className="size-4" />
            Add Goal
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
          {summaryCards.map(({ icon: Icon, label, value, change, trend, footer, sub }) => (
            <Card className="@container/card" key={label}>
              <CardHeader>
                <CardDescription className="flex items-center gap-1.5">
                  <Icon className="size-3.5 text-muted-foreground" />
                  {label}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {value}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline" className={trend === "up" ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400" : "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400"}>
                    {trend === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                    {change}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {footer}
                </div>
                <div className="text-muted-foreground text-xs">{sub}</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @3xl/main:grid-cols-2">
          {/* Savings Chart */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Monthly Savings Trend</CardTitle>
              <CardDescription>Visualizing your wealth accumulation over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                <BarChart data={savingsData} margin={{ left: 12, right: 12, top: 4, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 1000}K`}
                    className="text-xs text-muted-foreground"
                    width={40}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-amount)"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Active Goals */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track progress towards your financial milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-muted-foreground">{goal.current} / {goal.target}</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className={`h-full transition-all ${goal.color}`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="text-xs font-medium">{goal.progress}% complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Goals</Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  )
}

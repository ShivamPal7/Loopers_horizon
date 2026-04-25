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
  WalletIcon,
  TargetIcon,
  PiggyBankIcon,
  LineChartIcon,
  PlusIcon,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const netWorthData = [
  { age: 25, assets: 1200000, liabilities: 800000, netWorth: 400000 },
  { age: 30, assets: 4500000, liabilities: 2500000, netWorth: 2000000 },
  { age: 35, assets: 11000000, liabilities: 6000000, netWorth: 5000000 },
  { age: 40, assets: 22000000, liabilities: 10000000, netWorth: 12000000 },
  { age: 45, assets: 40000000, liabilities: 12000000, netWorth: 28000000 },
  { age: 50, assets: 65000000, liabilities: 8000000, netWorth: 57000000 },
  { age: 55, assets: 95000000, liabilities: 3000000, netWorth: 92000000 },
  { age: 60, assets: 130000000, liabilities: 0, netWorth: 130000000 },
  { age: 65, assets: 180000000, liabilities: 0, netWorth: 180000000 },
]

const cards = [
  {
    icon: WalletIcon,
    label: "Total Assets",
    value: "₹1.8 Cr",
    change: "+12.5%",
    trend: "up" as const,
    footer: "Up ₹20L this year",
    sub: "Vs. ₹1.6 Cr last year",
  },
  {
    icon: PiggyBankIcon,
    label: "Total Liabilities",
    value: "₹25.4 L",
    change: "-4.2%",
    trend: "down" as const, // Down is good for liabilities, but let's use up icon visually indicating 'reduction' 
    footer: "Debt reduced by ₹1.1L",
    sub: "Vs. ₹26.5 L last year",
  },
  {
    icon: TargetIcon,
    label: "Net Worth",
    value: "₹1.55 Cr",
    change: "+15.8%",
    trend: "up" as const,
    footer: "Net worth up ₹21.1L",
    sub: "Vs. ₹1.34 Cr last year",
  },
  {
    icon: LineChartIcon,
    label: "Liquidity Ratio",
    value: "3.2",
    change: "+0.4",
    trend: "up" as const,
    footer: "Healthy liquidity level",
    sub: "Vs. 2.8 last year",
  },
]

const chartConfig = {
  netWorth: {
    label: "Net Worth",
    color: "var(--primary)",
  },
  assets: {
    label: "Assets",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatCurrency(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
  return `₹${(val / 1000).toFixed(0)}K`
}

export function NetWorth() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        {/* Header with Action */}
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Net Worth</h1>
            <p className="text-sm text-muted-foreground">Comprehensive tracking of your assets and liabilities</p>
          </div>
          <Button size="sm" className="gap-2">
            <PlusIcon className="size-4" />
            Add Asset
          </Button>
        </div>

        {/* Section Cards Style */}
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
          {cards.map(({ icon: Icon, label, value, change, trend, footer, sub }) => (
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
                  {trend === "up"
                    ? <TrendingUpIcon className="size-4 text-green-500" />
                    : <TrendingDownIcon className="size-4 text-red-500" />}
                </div>
                <div className="text-muted-foreground text-xs">{sub}</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Chart Area Style */}
        <div className="px-4 lg:px-6">
          <Card className="@container/card">
            <CardHeader>
              <div>
                <CardTitle>Net Worth Trajectory by Age</CardTitle>
                <CardDescription>
                  <span className="hidden @[540px]/card:block">
                    Estimated net worth growth factoring in your planned investments by age
                  </span>
                  <span className="@[540px]/card:hidden">Net worth by age</span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                <AreaChart data={netWorthData} margin={{ left: 12, right: 12, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillNetWorth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-netWorth)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--color-netWorth)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillAssets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-assets)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-assets)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="age"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `Age ${value}`}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    yAxisId="netWorth"
                    orientation="left"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatCurrency}
                    className="text-xs text-muted-foreground"
                    width={52}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => `Age ${value}`}
                        formatter={(value, name) => [
                          formatCurrency(Number(value)),
                          name === "netWorth" ? "Net Worth" : "Assets",
                        ]}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    yAxisId="netWorth"
                    dataKey="netWorth"
                    type="monotone"
                    fill="url(#fillNetWorth)"
                    stroke="var(--color-netWorth)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Area
                    yAxisId="netWorth"
                    dataKey="assets"
                    type="monotone"
                    fill="url(#fillAssets)"
                    stroke="var(--color-assets)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

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
  LineChartIcon,
  PieChartIcon,
  CoinsIcon,
  ArrowUpRightIcon,
  PlusIcon,
  ExternalLinkIcon,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const performanceData = [
  { month: "Jan", portfolio: 1000000, benchmark: 1000000 },
  { month: "Feb", portfolio: 1050000, benchmark: 1020000 },
  { month: "Mar", portfolio: 1080000, benchmark: 1010000 },
  { month: "Apr", portfolio: 1120000, benchmark: 1040000 },
  { month: "May", portfolio: 1150000, benchmark: 1060000 },
  { month: "Jun", portfolio: 1240000, benchmark: 1080000 },
]

const summaryCards = [
  {
    icon: LineChartIcon,
    label: "Portfolio Value",
    value: "₹1.24 Cr",
    change: "+12.4%",
    trend: "up" as const,
    footer: "Up ₹2.4L this month",
    sub: "Vs. ₹1.15 Cr last month",
  },
  {
    icon: ArrowUpRightIcon,
    label: "YTD Return",
    value: "18.2%",
    change: "+2.5%",
    trend: "up" as const,
    footer: "Benchmark (Nifty 50): 12%",
    sub: "Alpha: +6.2%",
  },
  {
    icon: CoinsIcon,
    label: "Annual Dividends",
    value: "₹45,200",
    change: "+8.4%",
    trend: "up" as const,
    footer: "Yield: 2.1%",
    sub: "Projected monthly: ₹3,766",
  },
  {
    icon: PieChartIcon,
    label: "Equity Allocation",
    value: "68%",
    change: "Target 70%",
    trend: "up" as const,
    footer: "Sector lead: Technology",
    sub: "Diversification score: 84/100",
  },
]

const assets = [
  { name: "Nifty 50 Index Fund", type: "Equity", allocation: "25%", value: "₹31,00,000", performance: "+14.2%" },
  { name: "Nasdaq 100 ETF", type: "International", allocation: "15%", value: "₹18,60,000", performance: "+22.5%" },
  { name: "Reliance Industries", type: "Equity", allocation: "12%", value: "₹14,88,000", performance: "+8.4%" },
  { name: "HDFC Bank", type: "Equity", allocation: "10%", value: "₹12,40,000", performance: "-2.1%" },
  { name: "Gold ETF", type: "Commodity", allocation: "8%", value: "₹9,92,000", performance: "+11.8%" },
]

const chartConfig = {
  portfolio: {
    label: "Your Portfolio",
    color: "var(--primary)",
  },
  benchmark: {
    label: "Nifty 50",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

function formatCurrency(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
  return `₹${(val / 1000).toFixed(0)}K`
}

export function Investments() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
            <p className="text-sm text-muted-foreground">Portfolio performance and asset allocation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLinkIcon className="size-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <PlusIcon className="size-4" />
              Add Asset
            </Button>
          </div>
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

        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-3">
          {/* Performance Chart */}
          <Card className="@container/card @4xl/main:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Performance vs Benchmark</CardTitle>
                <CardDescription>Trailing 6 months portfolio growth vs Nifty 50</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-primary" />
                  Portfolio
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <div className="size-2 rounded-full bg-muted-foreground/40" />
                  Benchmark
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
                <AreaChart data={performanceData} margin={{ left: 12, right: 12, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-portfolio)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-portfolio)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
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
                    tickFormatter={formatCurrency}
                    className="text-xs text-muted-foreground"
                    width={50}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="benchmark"
                    type="monotone"
                    fill="transparent"
                    stroke="var(--color-benchmark)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Area
                    dataKey="portfolio"
                    type="monotone"
                    fill="url(#fillPortfolio)"
                    stroke="var(--color-portfolio)"
                    strokeWidth={3}
                    dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Assets */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Top Holdings</CardTitle>
              <CardDescription>Major assets in your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {assets.map((asset) => (
                  <div key={asset.name} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.type} • {asset.allocation}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-semibold">{asset.value}</p>
                      <p className={`text-xs ${asset.performance.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.performance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full">View All Assets</Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  )
}

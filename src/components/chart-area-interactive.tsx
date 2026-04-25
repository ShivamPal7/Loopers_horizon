"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Monthly net worth + savings data for Project Horizon
const chartData = [
  { date: "2024-01-01", netWorth: 3850000, savings: 32000 },
  { date: "2024-02-01", netWorth: 3950000, savings: 35000 },
  { date: "2024-03-01", netWorth: 3820000, savings: 34000 }, // Dip
  { date: "2024-04-01", netWorth: 4050000, savings: 38000 },
  { date: "2024-05-01", netWorth: 4180000, savings: 36000 },
  { date: "2024-06-01", netWorth: 4120000, savings: 40000 }, // Minor dip
  { date: "2024-07-01", netWorth: 4350000, savings: 38500 },
  { date: "2024-08-01", netWorth: 4650000, savings: 41000 }, // Spike
  { date: "2024-09-01", netWorth: 4520000, savings: 39000 }, // Dip
  { date: "2024-10-01", netWorth: 4780000, savings: 42000 },
  { date: "2024-11-01", netWorth: 4950000, savings: 38000 },
  { date: "2024-12-01", netWorth: 4880000, savings: 45000 }, // Minor dip
  { date: "2025-01-01", netWorth: 5150000, savings: 38500 }, // Spike
  { date: "2025-02-01", netWorth: 5090000, savings: 40000 }, // Minor dip
  { date: "2025-03-01", netWorth: 5240000, savings: 38500 },
]

const chartConfig = {
  netWorth: {
    label: "Net Worth",
    color: "var(--primary)",
  },
  savings: {
    label: "Monthly Savings",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatCurrency(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
  return `₹${(val / 1000).toFixed(0)}K`
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("12m")

  React.useEffect(() => {
    if (isMobile) setTimeRange("3m")
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2025-03-01")
    let monthsBack = 12
    if (timeRange === "6m") monthsBack = 6
    else if (timeRange === "3m") monthsBack = 3
    const startDate = new Date(referenceDate)
    startDate.setMonth(startDate.getMonth() - monthsBack)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <div>
          <CardTitle>Net Worth Trajectory</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Monthly net worth growth and savings contribution over time
            </span>
            <span className="@[540px]/card:hidden">Net worth over time</span>
          </CardDescription>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="12m">Last 12 months</ToggleGroupItem>
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="3m">Last 3 months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">Last 12 months</SelectItem>
              <SelectItem value="6m" className="rounded-lg">Last 6 months</SelectItem>
              <SelectItem value="3m" className="rounded-lg">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <AreaChart data={filteredData} margin={{ left: 12, right: 12, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="fillNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-netWorth)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-netWorth)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-savings)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-savings)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-IN", { month: "short", year: "2-digit" })
              }
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
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                  }
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === "netWorth" ? "Net Worth" : "Monthly Savings",
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
              dataKey="savings"
              type="monotone"
              fill="url(#fillSavings)"
              stroke="var(--color-savings)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
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
} from "lucide-react"

const cards = [
  {
    icon: WalletIcon,
    label: "Net Worth",
    value: "₹52,40,000",
    change: "+8.2%",
    trend: "up" as const,
    footer: "Up ₹3.9L this quarter",
    sub: "Vs. ₹48.5L last quarter",
  },
  {
    icon: PiggyBankIcon,
    label: "Monthly Savings",
    value: "₹38,500",
    change: "+12.4%",
    trend: "up" as const,
    footer: "Savings rate: 32%",
    sub: "Target: ₹40,000 / month",
  },
  {
    icon: TargetIcon,
    label: "Milestone Progress",
    value: "6 / 12",
    change: "50%",
    trend: "up" as const,
    footer: "6 milestones on-track",
    sub: "3 need attention",
  },
  {
    icon: LineChartIcon,
    label: "Portfolio Return",
    value: "14.7%",
    change: "-1.3%",
    trend: "down" as const,
    footer: "XIRR last 12 months",
    sub: "Benchmark: 13.4% (Nifty 50)",
  },
]

export function SectionCards() {
  return (
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
  )
}

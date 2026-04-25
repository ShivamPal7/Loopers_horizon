import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { CashflowTable, type CashflowEntry } from "@/components/cashflow-table"

function formatINR(value: number) {
  return "₹" + value.toLocaleString("en-IN")
}

function buildProjection(monthlySavings: number): CashflowEntry[] {
  const annualSavings = monthlySavings * 12
  const rate = 0.00944 // ~monthly rate for ~12% annual
  const rows: CashflowEntry[] = []
  let balance = annualSavings
  for (let age = 20; age <= 25; age++) {
    const opening = age === 20 ? 0 : rows[rows.length - 1].closingBalance
    const growth = Math.round(opening * rate * 12)
    const closing = opening + growth + annualSavings
    rows.push({ age, openingBalance: opening, annualGrowth: age === 20 ? null : growth, savings: annualSavings, dips: null, closingBalance: closing })
  }
  return rows
}

export function Cashflow() {
  const [income, setIncome] = useState(120000)
  const [expenses, setExpenses] = useState(80000)
  const net = income - expenses

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cashflow</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        {/* Inflow */}
        <Card>
          <CardHeader>
            <CardTitle>Inflow</CardTitle>
            <CardDescription>Monthly Income</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-emerald-600">{formatINR(income)}</div>
            <Slider
              min={10000}
              max={500000}
              step={5000}
              value={[income]}
              onValueChange={([v]) => setIncome(v)}
              className="[&_[data-slot=slider-thumb]]:bg-blue-600 [&_[data-slot=slider-range]]:bg-blue-600"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹10k</span>
              <span>₹5L</span>
            </div>
          </CardContent>
        </Card>

        {/* Outflow */}
        <Card>
          <CardHeader>
            <CardTitle>Outflow</CardTitle>
            <CardDescription>Monthly Expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-rose-600">{formatINR(expenses)}</div>
            <Slider
              min={5000}
              max={400000}
              step={5000}
              value={[expenses]}
              onValueChange={([v]) => setExpenses(v)}
              className="[&_[data-slot=slider-thumb]]:bg-blue-600 [&_[data-slot=slider-range]]:bg-blue-600"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹5k</span>
              <span>₹4L</span>
            </div>
          </CardContent>
        </Card>

        {/* Net Cashflow */}
        <Card>
          <CardHeader>
            <CardTitle>Net Cashflow</CardTitle>
            <CardDescription>Monthly Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${net >= 0 ? "text-blue-600" : "text-rose-600"}`}>
              {formatINR(net)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Projections</h3>
          <p className="text-sm text-muted-foreground">Estimated cashflow and balance over time.</p>
        </div>
        <CashflowTable data={buildProjection(Math.max(0, net))} />
      </div>
    </div>
  )
}

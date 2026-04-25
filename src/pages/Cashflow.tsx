import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CashflowTable, type CashflowEntry } from "@/components/cashflow-table"

const mockCashflowData: CashflowEntry[] = [
  { age: 20, openingBalance: 480000, annualGrowth: null, savings: 480000, dips: null, closingBalance: 480000 },
  { age: 21, openingBalance: 480000, annualGrowth: 4528, savings: 480000, dips: null, closingBalance: 964528 },
  { age: 22, openingBalance: 964528, annualGrowth: 9099, savings: 480000, dips: null, closingBalance: 1453628 },
  { age: 23, openingBalance: 1453628, annualGrowth: 13713, savings: 480000, dips: null, closingBalance: 1947341 },
  { age: 24, openingBalance: 1947341, annualGrowth: 18371, savings: 480000, dips: null, closingBalance: 2445712 },
  { age: 25, openingBalance: 2445712, annualGrowth: 23073, savings: 480000, dips: null, closingBalance: 2948785 },
]

export function Cashflow() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cashflow</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Inflow</CardTitle>
            <CardDescription>Monthly Income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">₹1,20,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outflow</CardTitle>
            <CardDescription>Monthly Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">₹80,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Cashflow</CardTitle>
            <CardDescription>Monthly Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹40,000</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Projections</h3>
          <p className="text-sm text-muted-foreground">Estimated cashflow and balance over time.</p>
        </div>
        <CashflowTable data={mockCashflowData} />
      </div>
    </div>
  )
}

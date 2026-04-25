import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SavingsPlan() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Savings Plan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Savings Rate</CardTitle>
            <CardDescription>Monthly savings out of income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">Target: 30%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

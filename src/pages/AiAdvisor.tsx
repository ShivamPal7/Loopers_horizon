import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AiAdvisor() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Advisor</h2>
      </div>
      <div className="grid gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Based on your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-2">
                <span className="text-blue-500">💡</span>
                <p>If you increase your monthly savings by ₹5,000, you can retire 2 years earlier.</p>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">⚠️</span>
                <p>Your emergency fund is currently covering 3 months of expenses. Consider increasing it to 6 months.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

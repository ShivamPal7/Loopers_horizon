import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LifeTimelinePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Life Timeline</h2>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Life Events</CardTitle>
            <CardDescription>Major milestones mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Timeline View
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

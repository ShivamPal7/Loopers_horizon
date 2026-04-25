import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BoostSection() {
  const navigate = useNavigate()

  return (
    <section className="py-12" id="about">
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">

            {/* LEFT */}
            <div className="p-10 flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit text-xs">Start Today</Badge>
              <h2 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
                Boost your plan<br />financially today.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Transform abstract financial goals into concrete, actionable plans with exact numbers and real-time projections.
              </p>
              <Button className="w-fit gap-2" onClick={() => navigate("/auth?mode=signup")}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* RIGHT — card visuals */}
            <div className="bg-muted/40 border-l border-border flex items-center justify-center p-10 min-h-[260px]">
              <div className="relative w-[300px] h-[200px]">
                {/* Back card */}
                <div className="absolute rounded-2xl w-[200px] h-[120px] bg-secondary border border-border top-4 right-4 rotate-6 shadow-md">
                  <div className="p-4">
                    <div className="w-6 h-6 rounded-md bg-muted mb-3" />
                    <div className="h-2 w-16 bg-muted rounded mb-1.5" />
                    <div className="h-1.5 w-10 bg-muted rounded" />
                  </div>
                </div>
                {/* Front card */}
                <div className="absolute rounded-2xl w-[200px] h-[120px] bg-card border border-border top-10 left-4 -rotate-3 shadow-md">
                  <div className="p-4">
                    <div className="w-6 h-6 rounded-md bg-primary/10 mb-3" />
                    <div className="h-2 w-20 bg-muted rounded mb-1.5" />
                    <div className="h-1.5 w-12 bg-muted rounded" />
                  </div>
                </div>
                {/* Floating chip */}
                <div className="absolute bg-card border border-border rounded-xl px-3 py-2 shadow-sm bottom-0 right-6">
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest leading-none mb-0.5">Savings</p>
                  <p className="text-sm font-bold text-foreground">+₹32k/mo</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="py-12" id="home">
      <Card className="overflow-hidden border-border">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.8fr] items-center min-h-[300px]">

          {/* LEFT */}
          <div className="px-10 py-12 flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit text-xs font-semibold tracking-wide">
              The Future of Financial Planning
            </Badge>
            <h1 className="text-4xl font-bold text-foreground leading-tight tracking-tight">
              Map your{" "}
              <span className="text-muted-foreground">financial destiny.</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Horizon transforms abstract numbers into a concrete life path. Plan milestones, simulate growth, and secure your freedom.
            </p>
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate("/auth?mode=signup")} className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate("/auth?mode=login")}>
                Log In
              </Button>
            </div>
          </div>

          {/* CENTER */}
          <div className="relative flex items-center justify-center py-12 bg-muted/40 border-x border-border">
            <div className="relative w-44 h-44">
              <div className="absolute inset-0 rounded-full border border-border" />
              <div className="absolute inset-4 rounded-full border border-border" />
              <div className="absolute inset-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 border-2 border-primary-foreground rounded-full" />
              </div>
              {/* Floating chips */}
              <div className="absolute -top-4 -right-8 bg-card border border-border rounded-xl px-3 py-1.5 shadow-sm">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest leading-none mb-0.5">Growth</p>
                <p className="text-sm font-bold text-foreground">+23%</p>
              </div>
              <div className="absolute -bottom-4 -left-8 bg-card border border-border rounded-xl px-3 py-1.5 shadow-sm">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest leading-none mb-0.5">Goals</p>
                <p className="text-sm font-bold text-foreground">8.4k</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="px-8 py-12">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We take your banking to the next level. Enjoy our one-click app with advanced features and real-time projections.
            </p>
          </div>
        </div>
      </Card>
    </section>
  )
}

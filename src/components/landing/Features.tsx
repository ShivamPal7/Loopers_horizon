import { Target, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const CARDS = [
  {
    icon: Target,
    title: "Milestone Architecture",
    desc: "Drag and drop major life events onto your timeline. Visualize exactly how a house purchase or career change impacts your trajectory.",
    tall: false,
  },
  {
    icon: TrendingUp,
    title: "Real-time Simulation",
    desc: "Instantly see the compound effect of your savings rate, inflation, and market returns on your terminal wealth.",
    tall: true,
  },
  {
    icon: Shield,
    title: "AI Strategy Engine",
    desc: "Receive dynamic, intelligent recommendations based on your current trajectory to prevent shortfall risks.",
    tall: false,
  },
]

export function Features() {
  return (
    <section className="py-12" id="service">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
          Built for forward-looking finance teams<br />
          and achieve your goals with our professional team
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {CARDS.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className={`border-border hover:-translate-y-1 transition-transform duration-300 ${card.tall ? "md:min-h-[320px]" : "md:min-h-[260px]"}`}
            >
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{card.desc}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

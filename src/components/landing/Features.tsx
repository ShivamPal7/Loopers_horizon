import { useRef } from "react"
import { Target, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"

const CARDS = [
  {
    icon: Target,
    title: "Milestone Architecture",
    desc: "Drag and drop major life events onto your timeline. Visualize exactly how a house purchase or career change impacts your trajectory.",
    tall: false,
    // flies in from the left
    initial: { opacity: 0, x: -120, y: 0 },
  },
  {
    icon: TrendingUp,
    title: "Real-time Simulation",
    desc: "Instantly see the compound effect of your savings rate, inflation, and market returns on your terminal wealth.",
    tall: true,
    // flies in from below
    initial: { opacity: 0, x: 0, y: 120 },
  },
  {
    icon: Shield,
    title: "AI Strategy Engine",
    desc: "Receive dynamic, intelligent recommendations based on your current trajectory to prevent shortfall risks.",
    tall: false,
    // flies in from the right
    initial: { opacity: 0, x: 120, y: 0 },
  },
]

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  // only trigger once when the section enters the viewport
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-12" id="service" ref={ref}>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
          Built for forward-looking finance teams<br />
          and achieve your goals with our professional team
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={card.initial}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : card.initial}
              transition={{
                duration: 0.65,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card
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
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

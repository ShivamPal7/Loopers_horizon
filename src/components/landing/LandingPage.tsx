import { Navbar } from "./Navbar"
import { Hero } from "./Hero"
import { Partners } from "./Partners"
import { Features } from "./Features"
import { StatsCards } from "./StatsCards"
import { BoostSection } from "./BoostSection"
import { FAQ } from "./FAQ"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-6">
        <Hero />
        <Partners />
        <Features />
        <StatsCards />
        <BoostSection />
        <FAQ />
      </div>
    </div>
  )
}

import "./finicha.css"
import { Navbar } from "./Navbar"
import { Hero } from "./Hero"
import { Partners } from "./Partners"
import { Features } from "./Features"
import { StatsCards } from "./StatsCards"
import { BoostSection } from "./BoostSection"
import { FAQ } from "./FAQ"

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#E8EEFF", fontFamily: "'DM Sans', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      {/* Navbar + Hero share a max-width container with padding */}
      <div className="max-w-[1200px] mx-auto px-6">
        <Navbar />
        <Hero />
      </div>

      {/* Below sections are individually max-width constrained */}
      <Partners />
      <Features />
      <StatsCards />
      <BoostSection />
      <FAQ />
    </div>
  )
}

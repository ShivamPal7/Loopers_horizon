// Feature cards — 3-column layout with illustrations
// Left and right cards are shorter, center card is taller
// Each card has a light background with a centered illustration

const CARDS = [
  {
    bg: "#F3F5FF",
    illustrationStyle: { objectPosition: "15% center" },
    height: "h-[260px]",
  },
  {
    bg: "#FFF8E6",
    illustrationStyle: { objectPosition: "50% center" },
    height: "h-[320px]",
  },
  {
    bg: "#FFF0F0",
    illustrationStyle: { objectPosition: "85% center" },
    height: "h-[260px]",
  },
]

export function Features() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-12" id="service">
      {/* Section heading */}
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-[#1A1A2E] leading-[1.35] tracking-[-0.02em] m-0">
          Built for forward-looking finance teams<br />
          and achieve your goals with our<br />
          professional team
        </h2>
      </div>

      {/* 3-column card grid — sides shorter, center taller */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`rounded-[20px] overflow-hidden ${card.height} flex items-center justify-center transition-transform duration-300 hover:-translate-y-1`}
            style={{ background: card.bg, boxShadow: "0 4px 24px rgba(65,105,225,0.07)" }}
          >
            <img
              src="/features-illustration.png"
              alt="Feature illustration"
              className="w-full h-full object-cover"
              style={card.illustrationStyle}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

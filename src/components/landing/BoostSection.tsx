export function BoostSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-12" id="about">
      <div
        className="bg-white rounded-[24px] p-12 grid grid-cols-2 gap-8 items-center relative overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(65,105,225,0.08)" }}
      >
        {/* LEFT — text */}
        <div className="relative z-10">
          {/* Decorative dots */}
          <span className="absolute -top-2 -right-4 w-3.5 h-3.5 rounded-full bg-[#FF5252]" />
          <span className="absolute top-4 -right-1 w-2.5 h-2.5 rounded-full bg-[#4169E1]" />

          <h2 className="text-[36px] font-bold text-[#1A1A2E] leading-[1.2] tracking-[-0.03em] mb-4">
            Boost your business<br />
            financially today
          </h2>
          <p className="text-[14px] text-[#5C5C7A] leading-[1.75] mb-7 max-w-[340px]">
            Eleifend feugiat auctor pharetra ridiculus. imperdiet vel turpis nam amet varius dignissim tellus volutpat
          </p>
          <button className="inline-flex items-center gap-3 bg-[#1A1A2E] text-white font-semibold text-[14px] rounded-full px-7 py-4 border-none cursor-pointer hover:bg-[#2e2e4a] transition-all hover:-translate-y-0.5">
            Get Started
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* RIGHT — cards illustration */}
        <div className="relative flex items-center justify-center">
          {/* Decorative elements */}
          <span className="absolute top-1/4 left-[8%] text-[#AAAACC] text-2xl font-bold">~</span>
          <span className="absolute bottom-1/4 right-[12%] w-2 h-2 rounded-full bg-[#FFD166]" />
          <span className="absolute top-1/4 right-[6%] w-4 h-4 rounded-full bg-[#4169E1]" />
          <span className="absolute top-[38%] right-[20%] w-2 h-2 rounded-full bg-[#FF5252]" />

          {/* Two overlapping finance cards — SVG recreation */}
          <div className="relative w-[340px] h-[240px]">
            {/* Back card — coral/pink */}
            <div
              className="absolute rounded-[18px] w-[220px] h-[140px]"
              style={{
                background: "linear-gradient(135deg, #FF8A8A 0%, #FF5252 100%)",
                top: "20px",
                right: "10px",
                transform: "rotate(8deg)",
                boxShadow: "0 12px 40px rgba(255,82,82,0.25)",
              }}
            >
              <div className="p-5">
                <div className="w-8 h-8 rounded-full bg-white/30 mb-3 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>
                <div className="h-2 w-20 bg-white/40 rounded-full mb-1.5" />
                <div className="h-1.5 w-12 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Front card — blue */}
            <div
              className="absolute rounded-[18px] w-[220px] h-[140px]"
              style={{
                background: "linear-gradient(135deg, #7B9EFF 0%, #4169E1 100%)",
                top: "50px",
                left: "10px",
                transform: "rotate(-6deg)",
                boxShadow: "0 12px 40px rgba(65,105,225,0.3)",
              }}
            >
              <div className="p-5">
                <div className="w-8 h-8 rounded-full bg-white/30 mb-3 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <rect x="2" y="5" width="20" height="14" rx="3" />
                    <path d="M2 10h20" stroke="rgba(65,105,225,0.8)" strokeWidth="2" />
                  </svg>
                </div>
                <div className="h-2 w-24 bg-white/40 rounded-full mb-1.5" />
                <div className="h-1.5 w-14 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Checklist icon on top card */}
            <div
              className="absolute bg-white rounded-xl p-2 shadow-lg"
              style={{ bottom: "20px", right: "40px" }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-1 mb-0.5 last:mb-0">
                  <span className="w-2 h-2 rounded-full bg-[#FF5252] flex-shrink-0" />
                  <div className="h-1.5 rounded-full bg-[#E8EEFF]" style={{ width: `${40 + i * 8}px` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

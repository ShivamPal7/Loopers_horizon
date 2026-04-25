export function Hero() {
  return (
    <section className="pb-8" id="home">
      {/* White rounded hero card */}
      <div className="bg-white rounded-[28px] shadow-[0_4px_32px_rgba(65,105,225,0.08)] overflow-hidden relative">
        <div className="grid grid-cols-[1.1fr_1fr_0.9fr] items-center min-h-[320px]">

          {/* LEFT — text content */}
          <div className="px-10 py-10 relative z-10">
            {/* Decorative elements */}
            <span className="absolute top-[20%] left-[6%] w-2 h-2 rounded-full bg-[#FF5252]" />
            <span className="absolute top-[35%] left-[9%] w-1.5 h-1.5 rounded-full bg-[#4169E1]" />
            <svg className="absolute top-[52%] left-[5%]" width="22" height="12" viewBox="0 0 22 12" fill="none">
              <path d="M1 10 C4 3 8 3 11 6 S18 10 21 5" stroke="#4169E1" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>

            <p className="text-[13px] text-[#9999BB] font-medium mb-3 leading-none">
              Get $50 Reward on first login
            </p>
            <h1 className="text-[36px] font-bold text-[#1A1A2E] leading-[1.18] tracking-[-0.03em] mb-7">
              You can Control<br />
              All you finance<br />
              through Finicha
            </h1>
            <button className="inline-flex items-center gap-3 bg-[#FF5252] text-white font-semibold text-[14px] rounded-full px-6 py-3.5 border-none cursor-pointer hover:bg-[#e84040] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,82,82,0.35)]">
              Get Started
              <span className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* CENTER — illustration */}
          <div className="relative flex items-center justify-center py-6">
            {/* floating dots around illustration */}
            <span className="absolute top-[12%] right-[20%] w-2.5 h-2.5 rounded-full bg-[#FF5252]" />
            <span className="absolute top-[22%] left-[10%] w-2 h-2 rounded-full bg-[#4169E1]" />
            <span className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#FFD166]" />
            <span className="absolute top-[18%] left-[28%] text-[#4169E1] font-bold text-lg leading-none">+</span>
            <span className="absolute bottom-[18%] left-[18%] w-3 h-3 rounded-full border-2 border-[#FF5252] bg-transparent" />
            <img
              src="/hero-illustration.png"
              alt="Finance control illustration"
              className="w-[260px] h-auto object-contain relative z-10"
            />
          </div>

          {/* RIGHT — tagline */}
          <div className="px-8 py-10 border-l border-[#F0F2FF]">
            <p className="text-[13.5px] text-[#5C5C7A] leading-[1.75] m-0">
              we will your banking to next level. Enjoy our one click app with advanced features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── tiny inline chart components ──────────────────────────

function SparkLine({ color = "#4169E1", up = true }: { color?: string; up?: boolean }) {
  const path = up
    ? "M0,38 L20,30 L40,22 L60,27 L80,15 L100,18 L120,8"
    : "M0,12 L20,18 L40,14 L60,24 L80,16 L100,26 L120,20"
  return (
    <svg viewBox="0 0 120 48" width="100%" height="48" fill="none" className="mt-1">
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BarChart() {
  const bars = [
    { h: 35, c: "#9C8CFF" },
    { h: 52, c: "#7B6CF7" },
    { h: 28, c: "#B8AFFF" },
    { h: 45, c: "#9C8CFF" },
    { h: 58, c: "#7B6CF7" },
    { h: 38, c: "#B8AFFF" },
  ]
  return (
    <svg viewBox="0 0 132 66" width="100%" height="66" fill="none">
      {bars.map((b, i) => (
        <rect key={i} x={i * 22 + 2} y={66 - b.h} width="18" height={b.h} rx="4" fill={b.c} opacity="0.9" />
      ))}
    </svg>
  )
}

// ── badge component ─────────────────────────────────────
function Badge({ val, green }: { val: string; green?: boolean }) {
  return (
    <span
      className="text-[10px] font-semibold px-[5px] py-[2px] rounded"
      style={{
        background: green ? "rgba(76,175,130,0.12)" : "rgba(255,82,82,0.12)",
        color: green ? "#3DAA74" : "#FF5252",
      }}
    >
      {val}
    </span>
  )
}

// ── label helper ────────────────────────────────────────
function Label({ children }: { children: string }) {
  return (
    <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-[#9999BB] mb-[3px]">
      {children}
    </p>
  )
}

// ── card shell ──────────────────────────────────────────
function StatCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-[20px] p-6 ${className}`}
      style={{ boxShadow: "0 4px 24px rgba(65,105,225,0.08)" }}
    >
      {children}
    </div>
  )
}

// ================================================================
export function StatsCards() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-12" id="data">
      <div className="grid grid-cols-2 gap-5">

        {/* ── Card 1: Secure Retirement ── */}
        <StatCard>
          <h3 className="text-[17px] font-bold text-[#1A1A2E] tracking-[-0.02em] mb-1">Secure Retirement</h3>
          <p className="text-[12.5px] text-[#9999BB] leading-[1.5] mb-4">our application downloads reach to 50 thousand.</p>

          <Label>Asset Generated</Label>
          <p className="text-[28px] font-bold text-[#1A1A2E] tracking-[-0.03em] leading-none mb-1">128,7K</p>

          <SparkLine color="#4169E1" up />

          <div className="flex items-center gap-2 mt-1 mb-1">
            <span className="text-[10.5px] text-[#9999BB]">23 July 2025</span>
            <span className="text-[10px] font-semibold bg-[rgba(76,175,130,0.12)] text-[#3DAA74] px-[5px] py-[1px] rounded">
              +3.4%
            </span>
          </div>
          <p className="text-[14px] font-semibold text-[#1A1A2E] mb-2" style={{ fontVariantNumeric: "tabular-nums" }}>
            220,342.76
          </p>

          <div className="flex flex-col gap-[3px]">
            {[
              { dot: "#4169E1", label: "BAG" },
              { dot: "#9C8CFF", label: "DAY" },
              { dot: "#CCCCCC", label: "WIN" },
            ].map(({ dot, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: dot }} />
                <span className="text-[10px] font-semibold tracking-[0.04em] text-[#9999BB]">{label}</span>
              </div>
            ))}
          </div>
        </StatCard>

        {/* ── Card 2: Invest with Protential ── */}
        <StatCard>
          <h3 className="text-[17px] font-bold text-[#1A1A2E] tracking-[-0.02em] mb-1">Invest with Protential</h3>
          <p className="text-[12.5px] text-[#9999BB] leading-[1.5] mb-4">
            FlexGuard includes a Performance Lock feature which gives clients the flexibility End Date for your Future.
          </p>

          {/* Opportunities row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <Label>Opportunities</Label>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-[#4169E1] tracking-[-0.03em] leading-none">6,4K</span>
                <span className="text-[11px] font-semibold bg-[rgba(65,105,225,0.1)] text-[#4169E1] px-[6px] py-[2px] rounded-full">
                  +94%
                </span>
              </div>
            </div>
            <span className="text-[10px] text-[#9999BB]">Last 7 Days</span>
          </div>

          <div className="h-px bg-[rgba(65,105,225,0.1)] my-3" />

          {/* Two-col stats */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <Label>▲ Asset Received</Label>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#1A1A2E]">1,1K</span>
                <Badge val="+5.5%" green />
              </div>
            </div>
            <div>
              <Label>Spending</Label>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#1A1A2E]">2,3K</span>
                <Badge val="+78%" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Label>▲ Investing</Label>
            <Label>▲ Allocation</Label>
          </div>

          {/* Progress bars */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="h-[6px] rounded-full" style={{ background: "linear-gradient(90deg,#4169E1 60%,#9C8CFF 100%)" }} />
            <div className="h-[6px] rounded-full w-3/4" style={{ background: "linear-gradient(90deg,#9C8CFF 40%,#C4B8FF 100%)" }} />
          </div>
        </StatCard>

        {/* ── Card 3: Monthly Statements (full-width) ── */}
        <StatCard className="col-span-2">
          <div className="grid grid-cols-[1fr_1.4fr] gap-10 items-start">
            {/* Left */}
            <div>
              <h3 className="text-[17px] font-bold text-[#1A1A2E] tracking-[-0.02em] mb-2 leading-snug">
                Stay updated with<br />monthly statements
              </h3>
              <p className="text-[12.5px] text-[#9999BB] leading-[1.55]">
                FlexGuard includes a Performance Lock feature which gives clients the flexibility End Date for your Future.
              </p>
            </div>

            {/* Right — chart */}
            <div>
              <Label>Accenture Analysis</Label>
              <p className="text-[28px] font-bold text-[#1A1A2E] tracking-[-0.03em] leading-none mb-2">12,3K</p>

              <BarChart />

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label>Spending</Label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#1A1A2E]">2,3K</span>
                    <Badge val="+78%" />
                  </div>
                </div>
                <div>
                  <Label>Allocation</Label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#1A1A2E]">1,6K</span>
                    <Badge val="+55%" green />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <Label>Amount</Label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-[#1A1A2E]">1,1K</span>
                  <Badge val="+5.5%" green />
                </div>
              </div>
            </div>
          </div>
        </StatCard>
      </div>
    </section>
  )
}

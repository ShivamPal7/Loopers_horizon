import { useState } from "react"

const NAV_LINKS = ["Home", "About", "Service", "Data", "Clients"]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative flex items-center justify-between py-5">
      {/* Logo — two overlapping tilted squares */}
      <div className="flex items-center">
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
          <rect x="2" y="7" width="14" height="14" rx="3" fill="#FF5252" transform="rotate(-12 2 7)" />
          <rect x="14" y="4" width="14" height="14" rx="3" fill="#4169E1" transform="rotate(10 14 4)" />
        </svg>
      </div>

      {/* Center nav links */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-[#5C5C7A] text-[14px] font-medium hover:text-[#1A1A2E] transition-colors no-underline"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-2">
        {/* Search icon btn */}
        <button className="w-[34px] h-[34px] rounded-full border border-[#E0E4F8] bg-white flex items-center justify-center text-[#5C5C7A] hover:bg-[#FF5252] hover:text-white hover:border-[#FF5252] transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        {/* Bell icon btn */}
        <button className="w-[34px] h-[34px] rounded-full border border-[#E0E4F8] bg-white flex items-center justify-center text-[#5C5C7A] hover:bg-[#FF5252] hover:text-white hover:border-[#FF5252] transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
        {/* CTA button */}
        <button className="ml-1 bg-[#1A1A2E] text-white text-[11px] font-bold tracking-[0.1em] px-5 py-[10px] rounded-[6px] hover:bg-[#2e2e4a] transition-colors cursor-pointer border-none">
          LET'S TALK
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 text-[#1A1A2E] border-none bg-transparent cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-1 md:hidden">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block py-2.5 px-3 text-[#5C5C7A] text-[15px] font-medium rounded-xl hover:bg-[#F3F5FF] hover:text-[#1A1A2E] no-underline transition-colors" onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <button className="mt-2 bg-[#1A1A2E] text-white text-[11px] font-bold tracking-[0.1em] py-3 rounded-lg border-none cursor-pointer">
            LET'S TALK
          </button>
        </div>
      )}
    </nav>
  )
}

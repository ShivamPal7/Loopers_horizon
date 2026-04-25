export function Partners() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-2 pb-10 text-center" id="clients">
      <p className="text-[11px] text-[#9999BB] tracking-[0.06em] uppercase font-semibold mb-4">
        Our Partners and Clients
      </p>
      <div className="flex items-center justify-between gap-6 py-5 border-t border-b border-[rgba(65,105,225,0.1)] flex-wrap">

        {/* Amazon */}
        <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-bold text-[20px] text-[#1A1A2E] tracking-[-0.5px]" style={{ fontFamily: "Georgia, serif" }}>amazon</span>
        </div>

        {/* Apple */}
        <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 18 22" width="18" height="22" fill="#1A1A2E">
            <path d="M14.84 11.7c-.02-1.98 1.03-3.48 3.16-4.58-1.19-1.7-2.98-2.64-5.33-2.74-2.24-.1-4.68 1.31-5.57 1.31-.95 0-2.37-1.25-3.9-1.22C.85 4.52-1.43 6.3-.38 11.34c.61 2.94 2.91 8.66 5.32 8.58.76-.03 1.3-.51 2.83-.51 1.49 0 1.96.51 2.9.51 2.45-.04 4.54-5.27 5.13-8.22zM10.78 2.9c1.1-1.3 1-2.5.96-2.9-1 .06-2.13.68-2.8 1.5C8.26 2.25 7.5 3.42 7.6 4.7c1.07.08 2.16-.52 3.18-1.8z" />
          </svg>
        </div>

        {/* YouTube */}
        <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 22 16" width="22" height="16">
            <rect width="22" height="16" rx="4" fill="#FF0000" />
            <polygon points="9,4 9,12 16,8" fill="white" />
          </svg>
          <span className="font-bold text-[15px] text-[#1A1A2E]">YouTube</span>
        </div>

        {/* Figma */}
        <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-semibold text-[17px] text-[#1A1A2E]">Figma</span>
        </div>

        {/* Google */}
        <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 74 24" width="74" height="24" fill="none">
            <text x="0" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#4285F4">G</text>
            <text x="14" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#EA4335">o</text>
            <text x="26" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#FBBC05">o</text>
            <text x="38" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#4285F4">g</text>
            <text x="50" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#34A853">l</text>
            <text x="57" y="20" fontFamily="'Arial', sans-serif" fontSize="20" fontWeight="500" fill="#EA4335">e</text>
          </svg>
        </div>

        {/* X (Twitter) */}
        <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 18 18" width="18" height="18" fill="#1A1A2E">
            <path d="M14.2 1h2.5L10.8 8.3 17.5 17H12L7.8 11.4 2.9 17H.4L6.5 9.3 0 1h5.7L9.5 6.1 14.2 1zm-.9 14.4h1.4L5.2 2.4H3.7l9.6 13z" />
          </svg>
        </div>
      </div>
    </section>
  )
}

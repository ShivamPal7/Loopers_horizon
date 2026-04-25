import { Separator } from "@/components/ui/separator"

export function Partners() {
  return (
    <section className="py-8" id="clients">
      <p className="text-xs text-muted-foreground tracking-widest uppercase font-semibold text-center mb-6">
        Our Partners and Clients
      </p>
      <Separator />
      <div className="flex items-center justify-between gap-8 py-8 flex-wrap">

        {/* Amazon */}
        <span className="font-bold text-xl text-foreground" style={{ fontFamily: "Georgia, serif" }}>
          amazon
        </span>

        {/* Apple */}
        <svg viewBox="0 0 18 22" width="20" height="24" fill="currentColor" className="text-foreground">
          <path d="M14.84 11.7c-.02-1.98 1.03-3.48 3.16-4.58-1.19-1.7-2.98-2.64-5.33-2.74-2.24-.1-4.68 1.31-5.57 1.31-.95 0-2.37-1.25-3.9-1.22C.85 4.52-1.43 6.3-.38 11.34c.61 2.94 2.91 8.66 5.32 8.58.76-.03 1.3-.51 2.83-.51 1.49 0 1.96.51 2.9.51 2.45-.04 4.54-5.27 5.13-8.22zM10.78 2.9c1.1-1.3 1-2.5.96-2.9-1 .06-2.13.68-2.8 1.5C8.26 2.25 7.5 3.42 7.6 4.7c1.07.08 2.16-.52 3.18-1.8z" />
        </svg>

        {/* YouTube */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 22 16" width="24" height="18">
            <rect width="22" height="16" rx="4" fill="#FF0000" />
            <polygon points="9,4 9,12 16,8" fill="white" />
          </svg>
          <span className="font-bold text-base text-foreground">YouTube</span>
        </div>

        {/* Figma */}
        <span className="font-semibold text-lg text-foreground">Figma</span>

        {/* Google */}
        <span className="font-semibold text-lg text-foreground">Google</span>

        {/* X */}
        <svg viewBox="0 0 18 18" width="20" height="20" fill="currentColor" className="text-foreground">
          <path d="M14.2 1h2.5L10.8 8.3 17.5 17H12L7.8 11.4 2.9 17H.4L6.5 9.3 0 1h5.7L9.5 6.1 14.2 1zm-.9 14.4h1.4L5.2 2.4H3.7l9.6 13z" />
        </svg>

      </div>
      <Separator />
    </section>
  )
}

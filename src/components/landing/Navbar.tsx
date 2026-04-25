import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, X } from "lucide-react"

const NAV_LINKS = ["Home", "About", "Service", "Data", "Clients"]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">HORIZON</span>
          </div>

          {/* Center links */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth?mode=login")}>
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate("/auth?mode=signup")}>
              Get Started
            </Button>
          </div>

          {/* Mobile toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md no-underline transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <Separator className="my-2" />
          <Button variant="outline" className="w-full" onClick={() => navigate("/auth?mode=login")}>Log In</Button>
          <Button className="w-full mt-1" onClick={() => navigate("/auth?mode=signup")}>Get Started</Button>
        </div>
      )}
    </header>
  )
}

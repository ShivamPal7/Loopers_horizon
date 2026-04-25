import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BellIcon,
  PlusIcon,
  SparklesIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react"
import { useState } from "react"
import { AddGoalModal } from "@/components/add-goal-modal"

export function SiteHeader() {
  const [dark, setDark] = useState(false)

  const handleTheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle("dark")
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-30">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-3 lg:px-6">
        {/* Sidebar toggle */}
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />

        {/* Breadcrumb / Page title */}
        <div className="flex flex-col leading-none">
          <h1 className="text-sm font-semibold">Dashboard</h1>
          <p className="text-[11px] text-muted-foreground hidden sm:block">{today}</p>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* AI badge */}
          <Badge variant="outline" className="hidden md:flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium">
            <SparklesIcon className="size-3 text-primary" />
            AI Insights On
          </Badge>

          {/* Add Milestone */}
          <AddGoalModal>
            <Button size="sm" className="hidden sm:flex gap-1.5">
              <PlusIcon className="size-3.5" />
              Add Milestone
            </Button>
          </AddGoalModal>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative size-8">
            <BellIcon className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Theme toggle */}
          <Button variant="ghost" size="icon" className="size-8" onClick={handleTheme}>
            {dark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

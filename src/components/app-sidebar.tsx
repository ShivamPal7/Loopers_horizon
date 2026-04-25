import * as React from "react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  LineChartIcon,
  TargetIcon,
  WalletIcon,
  CalendarIcon,
  SparklesIcon,
  Settings2Icon,
  CircleHelpIcon,
  BellIcon,
  FileTextIcon,
  TrendingUpIcon,
  PiggyBankIcon,
  FileBarChart2Icon,
  BookOpenIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Alex Horizon",
    email: "alex@projecthorizon.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  navMain: [
    { title: "Dashboard", url: "#", icon: <LayoutDashboardIcon /> },
    { title: "Net Worth", url: "#", icon: <TrendingUpIcon /> },
    { title: "Milestones", url: "#", icon: <TargetIcon /> },
    { title: "Savings Plan", url: "#", icon: <PiggyBankIcon /> },
    { title: "Investments", url: "#", icon: <LineChartIcon /> },
    { title: "Cashflow", url: "#", icon: <WalletIcon /> },
    { title: "Life Timeline", url: "#", icon: <CalendarIcon /> },
    { title: "AI Advisor", url: "#", icon: <SparklesIcon /> },
  ],
  documents: [
    { name: "Financial Report", url: "#", icon: <FileBarChart2Icon /> },
    { name: "Tax Documents", url: "#", icon: <FileTextIcon /> },
    { name: "Learning Hub", url: "#", icon: <BookOpenIcon /> },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: <Settings2Icon /> },
    { title: "Notifications", url: "#", icon: <BellIcon /> },
    { title: "Help & Support", url: "#", icon: <CircleHelpIcon /> },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2!"
            >
              <a href="/dashboard" className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                  <LayoutDashboardIcon className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold tracking-tight">Project Horizon</span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Financial Planning</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

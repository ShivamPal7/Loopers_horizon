import * as React from "react"
import { Link, useLocation } from "react-router-dom"
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

const baseData = {
  user: {
    name: "Alex Horizon",
    email: "alex@projecthorizon.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboardIcon /> },
    { title: "Net Worth", url: "/dashboard/net-worth", icon: <TrendingUpIcon /> },
    { title: "Milestones", url: "/dashboard/milestones", icon: <TargetIcon /> },
    { title: "Savings Plan", url: "/dashboard/savings-plan", icon: <PiggyBankIcon /> },
    { title: "Investments", url: "/dashboard/investments", icon: <LineChartIcon /> },
    { title: "Cashflow", url: "/dashboard/cashflow", icon: <WalletIcon /> },
    { title: "Life Timeline", url: "/dashboard/life-timeline", icon: <CalendarIcon /> },
    { title: "AI Advisor", url: "/dashboard/ai-advisor", icon: <SparklesIcon /> },
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
  const location = useLocation();
  const navMainWithActive = baseData.navMain.map(item => ({
    ...item,
    isActive: location.pathname === item.url || (item.url !== '/dashboard' && location.pathname.startsWith(item.url))
  }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2!"
            >
              <Link to="/dashboard" className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                  <LayoutDashboardIcon className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold tracking-tight">Project Horizon</span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Financial Planning</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavDocuments items={baseData.documents} />
        <NavSecondary items={baseData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={baseData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}


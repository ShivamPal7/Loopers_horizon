import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PlusCircleIcon, BellIcon } from "lucide-react"
import { AddGoalModal } from "@/components/add-goal-modal"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* Quick action row */}
          <SidebarMenuItem className="flex items-center gap-2">
            <AddGoalModal>
              <SidebarMenuButton
                tooltip="Add Milestone"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <PlusCircleIcon />
                <span>Add Milestone</span>
              </SidebarMenuButton>
            </AddGoalModal>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <BellIcon />
              <span className="sr-only">Notifications</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Nav items */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                asChild
              >
                <Link to={item.url} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

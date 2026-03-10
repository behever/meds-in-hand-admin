'use client'

import { LogOut } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { logout } from "@/app/login/actions"

export function SidebarLogout({ email }: { email: string }) {
  return (
    <>
      <div className="text-xs font-mono text-gray-500 mb-3 truncate px-2 group-data-[collapsible=icon]:hidden">
        {email}
      </div>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Logout"
            render={<button type="submit" form="logout-form" />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut />
            <span>Terminate Session</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <form id="logout-form" action={logout} />
    </>
  )
}

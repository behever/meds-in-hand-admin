'use client'

import Link from "next/link"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { Pill, Activity, Users, History, Tags, Settings, type LucideIcon } from "lucide-react"

const NAV_ITEMS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: '/admin',             label: 'Dashboard',          Icon: Activity },
  { href: '/admin/medications', label: 'Medications',         Icon: Pill     },
  { href: '/admin/categories',  label: 'Categories',          Icon: Tags     },
  { href: '/admin/users',       label: 'Users & Corrections', Icon: Users    },
  { href: '/admin/logs',        label: 'Audit Logs',          Icon: History  },
  { href: '/admin/settings',    label: 'Settings',            Icon: Settings },
]

export function SidebarNav() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <SidebarMenu className="space-y-1.5">
      {NAV_ITEMS.map(({ href, label, Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton 
            tooltip={label} 
            className={`hover:bg-[#006338]/10 hover:text-[#006338] transition-colors rounded-md ${collapsed ? 'justify-center' : ''}`}
          >
            <Link href={href} className={`flex items-center font-medium text-gray-700 ${collapsed ? 'justify-center' : 'gap-3'}`}>
              <Icon className="size-4 text-[#006338] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

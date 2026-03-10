'use client'

import Link from "next/link"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
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
  return (
    <SidebarMenu className="space-y-1.5">
      {NAV_ITEMS.map(({ href, label, Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            tooltip={label}
            render={<Link href={href} />}
            className="hover:bg-[#006338]/10 hover:text-[#006338] transition-colors"
          >
            <Icon className="text-[#006338]" />
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

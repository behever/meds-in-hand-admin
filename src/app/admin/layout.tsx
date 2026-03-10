import { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import Link from "next/link"
import { Pill, Activity, Users, History, LogOut, Tags, type LucideIcon } from "lucide-react"
import { logout } from "@/app/login/actions"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const NAV_ITEMS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: '/admin',             label: 'Dashboard',          Icon: Activity },
  { href: '/admin/medications', label: 'Medications',         Icon: Pill     },
  { href: '/admin/categories',  label: 'Categories',          Icon: Tags     },
  { href: '/admin/users',       label: 'Users & Corrections', Icon: Users    },
  { href: '/admin/logs',        label: 'Audit Logs',          Icon: History  },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border font-sans bg-gray-50/50">
        <SidebarHeader className="border-b border-border p-5">
          <Link href="/admin" className="flex items-baseline gap-1">
            <span className="text-[#92C145] text-2xl font-serif italic pr-0.5">Rx</span>
            <span className="font-extrabold text-[#006338] tracking-tight text-lg">Meds In Hand</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-3">
          <SidebarGroup>
            <SidebarMenu className="space-y-1.5">
              {NAV_ITEMS.map(({ href, label, Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton className="hover:bg-[#006338]/10 hover:text-[#006338] transition-colors rounded-md p-2">
                    <Link href={href} className="flex items-center gap-3 font-medium text-gray-700">
                      <Icon className="size-4 text-[#006338]" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-4">
          <div className="text-xs font-mono text-gray-500 mb-4 truncate w-full px-2">{user.email}</div>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors p-2 rounded-md font-medium text-sm">
              <LogOut className="size-4" />
              <span>Terminate Session</span>
            </button>
          </form>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 min-h-screen bg-white text-gray-900 flex flex-col font-sans">
        <header className="h-16 border-b border-border flex items-center px-4 bg-white sticky top-0 z-10">
          <SidebarTrigger className="text-gray-500 hover:text-[#006338]" />
        </header>
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

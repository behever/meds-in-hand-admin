import { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import Link from "next/link"
import { Pill, Activity, Users, History, LogOut } from "lucide-react"
import { logout } from "@/app/login/actions"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border font-mono">
        <SidebarHeader className="border-b border-border p-4 flex items-center justify-between">
          <span className="font-bold text-primary tracking-widest text-lg">Meds_Admin</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/admin" className="flex items-center gap-2">
                    <Activity className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/admin/medications" className="flex items-center gap-2">
                    <Pill className="size-4" />
                    <span>Medications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/admin/users" className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Users &amp; Corrections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link href="/admin/logs" className="flex items-center gap-2">
                    <History className="size-4" />
                    <span>Audit Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-border p-4">
          <div className="text-xs text-muted-foreground mb-4 truncate w-full">
            {user.email}
          </div>
          <form action={logout}>
            <SidebarMenuButton className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <button type="submit" className="flex items-center gap-2 w-full text-left">
                <LogOut className="size-4" />
                <span>Terminate Session</span>
              </button>
            </SidebarMenuButton>
          </form>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 min-h-screen bg-background text-foreground flex flex-col font-mono">
        <header className="h-16 border-b border-border flex items-center px-4">
          <SidebarTrigger />
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

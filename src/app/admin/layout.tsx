import { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar"
import { logout } from "@/app/login/actions"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SidebarLogo } from "@/components/admin/SidebarLogo"
import { SidebarNav } from "@/components/admin/SidebarNav"
import { SidebarLogout } from "@/components/admin/SidebarLogout"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border font-sans bg-gray-50/50">
        <SidebarHeader className="border-b border-border h-16 flex items-center justify-center px-3">
          <SidebarLogo />
        </SidebarHeader>

        <SidebarContent className="p-3">
          <SidebarGroup>
            <SidebarNav />
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-4">
          <SidebarLogout email={user.email!} />
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

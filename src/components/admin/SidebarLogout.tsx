'use client'

import { LogOut } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { logout } from "@/app/login/actions"

export function SidebarLogout({ email }: { email: string }) {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <>
      {!collapsed && (
        <div className="text-xs font-mono text-gray-500 mb-4 truncate w-full px-2">{email}</div>
      )}
      <form action={logout}>
        <button 
          type="submit" 
          className={`flex items-center w-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors p-2 rounded-md font-medium text-sm ${collapsed ? 'justify-center' : 'gap-2 text-left'}`}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Terminate Session</span>}
        </button>
      </form>
    </>
  )
}

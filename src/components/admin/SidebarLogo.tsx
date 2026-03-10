'use client'

import Link from "next/link"
import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarLogo() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Link href="/admin" className="flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Meds In Hand"
        width={collapsed ? 32 : 120}
        height={collapsed ? 32 : 48}
        className={collapsed ? "h-8 w-8 object-contain" : "h-10 w-auto object-contain"}
        priority
      />
    </Link>
  )
}

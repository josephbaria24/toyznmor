"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Store } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: ShoppingCart,
    },
  ]

  return (
    <nav className="flex items-center gap-4 md:gap-6 w-full overflow-x-auto">
      <Link href="/" className="flex items-center gap-2 font-semibold text-base md:text-lg mr-2 md:mr-4 flex-shrink-0">
        <Store className="h-5 w-5 md:h-6 md:w-6" />
        <span className="hidden sm:inline">tech, toyz n mor Admin</span>
        <span className="sm:hidden">TTM Admin</span>
      </Link>

      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary flex-shrink-0",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        )
      })}

      <Link href="/" className="ml-auto text-sm font-medium text-muted-foreground hover:text-primary flex-shrink-0">
        <span className="hidden md:inline">View Store</span>
        <span className="md:hidden">Store</span>
      </Link>
    </nav>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, ShoppingCart, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/store"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const totalItems = useCart((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/categories", label: "Categories", icon: LayoutGrid },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: totalItems },
    { href: "/admin", label: "Admin", icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 relative transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {mounted && item.badge && item.badge > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-1.5 left-1/2 -translate-x-1/2 h-5 min-w-5 px-1 rounded-full flex items-center justify-center text-xs font-semibold"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
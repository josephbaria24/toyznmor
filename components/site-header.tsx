"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Store, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/store"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const totalItems = useCart((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight transition-colors hover:text-primary"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Joseph's Store
            </span>
            <span className="sm:hidden">JS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Cart Button */}
            <Link href="/cart" className="ml-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "relative gap-2 transition-all duration-200 hover:bg-accent",
                  pathname === "/cart" && "border-primary text-primary"
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden lg:inline">Cart</span>
                {mounted && totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1.5 -top-1.5 h-5 min-w-5 px-1 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Cart Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  "relative",
                  pathname === "/cart" && "text-primary"
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 min-w-5 px-1 rounded-full flex items-center justify-center text-xs font-semibold"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
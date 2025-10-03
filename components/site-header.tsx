"use client"

import Link from "next/link"
import { ShoppingCart, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/store"

export function SiteHeader() {
  const totalItems = useCart((state) => state.getTotalItems())

  return (
    <header className="pl-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Store className="h-6 w-6" />
          <span className="hidden sm:inline">Joseph's store</span>
          <span className="sm:hidden">TTM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Shop
          </Link>
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
            Admin
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

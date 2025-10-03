import type React from "react"
import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <AdminNav />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 px-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Joseph's store Admin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

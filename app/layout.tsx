import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "tech, toyz n mor - Premium Ecommerce Store",
  description: "Discover premium products curated just for you",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}font-sans`}
        style={{
          fontFamily: `var(--font-geist-sans),var(--font-inter),  system-ui, sans-serif`,
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

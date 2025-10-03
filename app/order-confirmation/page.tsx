import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 md:p-12 text-center">
            <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            <div className="bg-muted rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-xl md:text-2xl font-bold">#{Math.floor(Math.random() * 1000000)}</p>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              You will receive a confirmation email with your order details and tracking information shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/admin/orders">View Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-8 px-4 mt-auto">
        <div className="container max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Joseph's store. All rights reserved.</p>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to checkout</p>
            <Button asChild size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    clearCart()
    setIsSubmitting(false)
    router.push("/order-confirmation")
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Textarea
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St, City, State, ZIP"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Total</span>
                          <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
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

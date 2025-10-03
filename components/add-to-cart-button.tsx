"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/mock-data"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={product.stock === 0}>
      <ShoppingCart className="h-5 w-5 mr-2" />
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </Button>
  )
}

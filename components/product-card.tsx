"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
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
    <Card className="overflow-hidden group flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.featured && <Badge className="absolute top-2 right-2 text-xs">Featured</Badge>}
        </div>
      </Link>
      <CardContent className="p-3 md:p-4 flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-lg mb-1 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2 hidden md:block">
          {product.description}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-lg md:text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

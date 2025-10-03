import { notFound } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/lib/mock-data"
import { ArrowLeft, Package, Shield, Truck } from "lucide-react"
import Link from "next/link"

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <main className="flex-1 py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.featured && <Badge className="absolute top-4 right-4">Featured</Badge>}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <Badge variant="secondary" className="w-fit mb-4">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Stock:{" "}
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">{product.stock} available</span>
                  ) : (
                    <span className="text-destructive font-medium">Out of stock</span>
                  )}
                </p>
              </div>

              <AddToCartButton product={product} />

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <p className="text-xs md:text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground hidden md:block">On orders over $50</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <p className="text-xs md:text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground hidden md:block">100% protected</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <p className="text-xs md:text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground hidden md:block">30-day guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {mockProducts
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden group">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={relatedProduct.image_url || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-3 md:p-4">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1 hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="text-base md:text-lg font-bold">${relatedProduct.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 px-4 mt-auto">
        <div className="container max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 tech, toyz n mor. All rights reserved.</p>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}

import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/mock-data"
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.featured)
  const allProducts = mockProducts

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Sparkles className="h-4 w-4" />
              New Arrivals Available Now
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Discover Premium
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Quality Products
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Shop the latest collection of high-quality products curated just for you. Experience excellence in every purchase.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link href="#products">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-2" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: TrendingUp, title: "Best Quality", desc: "Premium products guaranteed" },
              { icon: Sparkles, title: "Fast Delivery", desc: "Quick & reliable shipping" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-background/60 backdrop-blur border">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Handpicked For You
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover our carefully curated selection
              </p>
            </div>
            <Button variant="ghost" className="gap-2 self-start md:self-auto" asChild>
              <Link href="/categories">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-10 space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-foreground/10 text-foreground text-xs font-semibold tracking-wide uppercase">
              Shop All
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Complete Collection
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse our full range of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 text-center text-primary-foreground shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Shopping?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of satisfied customers and experience the best in online shopping
              </p>
              <Button size="lg" variant="secondary" className="gap-2 shadow-lg" asChild>
                <Link href="/categories">
                  Explore Categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg mb-3">Joseph's Store</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Your trusted destination for premium quality products. Shop with confidence and style.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link></li>
                <li><Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link></li>
                <li><Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">Cart</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Joseph's Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}
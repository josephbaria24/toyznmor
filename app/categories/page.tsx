import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

export default function CategoriesPage() {
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)))

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
            <p className="text-muted-foreground text-lg">Browse our curated collections</p>
          </div>

          {categories.map((category) => {
            const categoryProducts = mockProducts.filter((p) => p.category === category)

            return (
              <section key={category} className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                  <span className="text-sm text-muted-foreground">{categoryProducts.length} products</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          })}
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

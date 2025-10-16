'use client'

import { Product } from '@/app/lib/sanity'
import { ProductCard } from '@/app/components/ProductCard'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const displayProducts = products.slice(0, 8) // Show max 8 products

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden" data-section="featured-products">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-white" fill="white" />
              </div>
              <span className="text-sm font-bold text-primary uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
                🔥 Mest populära
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Våra hetaste produkter
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
              Upptäck de senaste teknikprodukterna som våra kunder älskar mest. 
              <span className="text-primary font-semibold">Exklusiva erbjudanden</span> och 
              <span className="text-secondary font-semibold"> snabb leverans</span> på alla utvalda produkter.
            </p>
          </div>
          
          <div className="hidden lg:block">
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary">
              <Link href="/products" className="flex items-center gap-3 text-lg px-8 py-4">
                Se hela sortimentet
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} featured />
          ))}
        </div>

        {/* Mobile view button */}
        <div className="text-center lg:hidden mb-12">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/products" className="flex items-center gap-3 text-lg px-8 py-4">
              Se hela sortimentet
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Enhanced statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-primary/10">
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-3xl text-white">👥</span>
            </div>
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">1000+</div>
            <p className="text-muted-foreground font-medium">Nöjda kunder</p>
            <p className="text-sm text-muted-foreground/80">Femstjärniga recensioner</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-3xl text-white">🚀</span>
            </div>
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">1-2 dagar</div>
            <p className="text-muted-foreground font-medium">Express leverans</p>
            <p className="text-sm text-muted-foreground/80">Gratis över 500 kr</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-3xl text-white">🛡️</span>
            </div>
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">30 dagar</div>
            <p className="text-muted-foreground font-medium">Öppet köp</p>
            <p className="text-sm text-muted-foreground/80">Inga frågor ställs</p>
          </div>
        </div>
      </div>
    </section>
  )
}
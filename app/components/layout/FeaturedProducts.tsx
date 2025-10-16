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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Utvalda produkter
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Våra mest populära produkter
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Upptäck våra handplockade favoriter som våra kunder älskar. 
              Högkvalitativa produkter till fantastiska priser.
            </p>
          </div>
          
          <div className="hidden lg:block">
            <Button asChild variant="outline" size="lg">
              <Link href="/products" className="flex items-center gap-2">
                Se alla produkter
                <ArrowRight className="h-4 w-4" />
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
        <div className="text-center lg:hidden">
          <Button asChild size="lg">
            <Link href="/products" className="flex items-center gap-2">
              Se alla produkter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Statistics or features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Nöjda kunder</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2-4 dagar</div>
            <p className="text-muted-foreground">Snabb leverans</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">30 dagar</div>
            <p className="text-muted-foreground">Öppet köp</p>
          </div>
        </div>
      </div>
    </section>
  )
}
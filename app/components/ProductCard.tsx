'use client'

import { Product } from '@/app/lib/sanity'
import { useCart } from '@/app/context/CartContext'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(product, 1)
    setTimeout(() => setIsAddingToCart(false), 500) // Visual feedback
  }

  const imageUrl = product.images[0]?.asset?.url
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const isOutOfStock = product.trackInventory && product.stock <= 0

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${featured ? 'ring-2 ring-primary/50 shadow-lg' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.images[0]?.alt || product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <span className="text-muted-foreground text-sm">Produktbild</span>
            </div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              ⭐ Bästsäljare
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg animate-pulse">
              🔥 -{discountPercentage}%
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="bg-gray-900/80 text-white backdrop-blur-sm">
              Slut i lager
            </Badge>
          )}
          {!isOutOfStock && product.stock <= 5 && product.trackInventory && (
            <Badge className="bg-orange-500/90 text-white backdrop-blur-sm">
              ⚡ Få kvar!
            </Badge>
          )}
        </div>

        {/* Enhanced Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button size="icon" variant="secondary" className="h-9 w-9 backdrop-blur-md bg-white/90 hover:bg-white shadow-lg">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-9 w-9 backdrop-blur-md bg-white/90 hover:bg-white shadow-lg" asChild>
            <Link href={`/products/${product.slug.current}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Quick add to cart on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            className="w-full bg-primary/90 backdrop-blur-md hover:bg-primary shadow-lg"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingToCart}
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart 
              ? 'Lägger till...' 
              : isOutOfStock 
                ? 'Slut i lager' 
                : 'Snabbköp'
            }
          </Button>
        </div>
      </div>

      <CardContent className="p-5 bg-gradient-to-b from-background to-muted/20">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
              <Link 
                href={`/products/${product.slug.current}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>
          </div>

          {product.category && (
            <p className="text-sm font-medium text-primary/70 uppercase tracking-wide">
              {product.category.name}
            </p>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>
            
            {product.trackInventory && product.stock <= 10 && !isOutOfStock && (
              <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
                {product.stock} kvar
              </span>
            )}
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80 hover:bg-primary/10">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 2 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{product.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 bg-gradient-to-b from-muted/20 to-background">
        <Button
          className="w-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
          size="lg"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAddingToCart 
            ? '🔄 Lägger till...' 
            : isOutOfStock 
              ? '❌ Slut i lager' 
              : '🛒 Lägg i kundvagn'
          }
        </Button>
      </CardFooter>
    </Card>
  )
}
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
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.images[0]?.alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Ingen bild</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {featured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Utvald
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive">
              -{discountPercentage}%
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary">
              Slut i lager
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8" asChild>
            <Link href={`/products/${product.slug.current}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              <Link 
                href={`/products/${product.slug.current}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>
          </div>

          {product.category && (
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAddingToCart 
            ? 'Lägger till...' 
            : isOutOfStock 
              ? 'Slut i lager' 
              : 'Lägg i kundvagn'
          }
        </Button>
      </CardFooter>
    </Card>
  )
}
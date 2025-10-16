'use client'

import { useState } from 'react'
import { Product } from '@/app/lib/sanity'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Separator } from '@/app/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { Card, CardContent } from '@/app/components/ui/card'
import { ShoppingCart, Heart, Share, Truck, Shield, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductDetailClientProps {
  product: Product
}

type ProductVariant = NonNullable<Product['variants']>[0]

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price)
  }

  const currentPrice = selectedVariant?.price ?? product.price
  const currentStock = selectedVariant?.stock ?? product.stock
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > currentPrice
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - currentPrice) / product.compareAtPrice!) * 100)
    : 0
  const isOutOfStock = product.trackInventory && currentStock <= 0

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(
      product, 
      quantity, 
      selectedVariant ? {
        name: selectedVariant.name,
        sku: selectedVariant.sku,
        price: selectedVariant.price
      } : undefined
    )
    setTimeout(() => setIsAddingToCart(false), 500)
  }

  const currentImage = selectedImageIndex < product.images.length 
    ? product.images[selectedImageIndex] 
    : product.images[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Hem
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-foreground">
                Produkter
              </Link>
            </div>
          </li>
          {product.category && (
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <Link 
                  href={`/categories/${product.category.slug.current}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {product.category.name}
                </Link>
              </div>
            </li>
          )}
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{product.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            {currentImage ? (
              <Image
                src={currentImage.asset.url}
                alt={currentImage.alt || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">Ingen bild tillgänglig</span>
              </div>
            )}
          </div>

          {/* Image thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative overflow-hidden rounded border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.asset.url}
                    alt={image.alt || `${product.title} bild ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.featured && (
                <Badge variant="default">Utvald produkt</Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              )}
              {isOutOfStock && (
                <Badge variant="secondary">Slut i lager</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            {product.category && (
              <p className="text-muted-foreground">
                Kategori: <Link href={`/categories/${product.category.slug.current}`} className="hover:text-foreground">
                  {product.category.name}
                </Link>
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Inkl. moms, exkl. frakt
            </p>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Varianter:</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.sku}
                    variant={selectedVariant?.sku === variant.sku ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                    className="h-auto p-3 flex flex-col items-start"
                  >
                    <span className="font-medium">{variant.name}</span>
                    {variant.price && (
                      <span className="text-sm">{formatPrice(variant.price)}</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">
                Antal:
              </label>
              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.trackInventory && quantity >= currentStock}
                >
                  +
                </Button>
              </div>
              {product.trackInventory && (
                <span className="text-sm text-muted-foreground">
                  ({currentStock} i lager)
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
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
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Fri frakt över 500 kr</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>2 års garanti</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>30 dagars öppet köp</span>
            </div>
          </div>

          <Separator />

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Beskrivning</TabsTrigger>
              <TabsTrigger value="specifications">Specifikationer</TabsTrigger>
              <TabsTrigger value="shipping">Frakt & Retur</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications && product.specifications.length > 0 ? (
                    <div className="space-y-3">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                          <span className="font-medium">{spec.name}:</span>
                          <span className="text-muted-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Inga specifikationer tillgängliga.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Frakt</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fri frakt vid köp över 500 kr</li>
                      <li>• Standard frakt: 1-3 arbetsdagar (49 kr)</li>
                      <li>• Express frakt: Nästa dag (99 kr)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Retur</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 30 dagars öppet köp</li>
                      <li>• Kostnadsfri retur</li>
                      <li>• Produkten ska vara i originalförpackning</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useCart } from '../context/CartContext'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function CartIcon() {
  const { itemCount, toggleCart } = useCart()

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={toggleCart}
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  )
}

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    total, 
    itemCount,
    updateQuantity,
    removeItem,
    clearCart 
  } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Varukorg ({itemCount} {itemCount === 1 ? 'vara' : 'varor'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Din varukorg är tom</h3>
              <p className="text-muted-foreground mb-4">
                Lägg till produkter för att börja handla
              </p>
              <Button onClick={closeCart} asChild>
                <Link href="/products">Handla nu</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.selectedVariant?.price ?? item.product.price
                const imageUrl = item.product.images[0]?.asset?.url
                
                return (
                  <div key={`${item.product._id}-${item.selectedVariant?.sku || 'default'}`} className="flex gap-4 p-4 border rounded-lg">
                    {imageUrl && (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.product.images[0]?.alt || item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.product.title}</h4>
                      {item.selectedVariant && (
                        <p className="text-sm text-muted-foreground">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <p className="text-sm font-medium">{formatPrice(price)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(
                            item.product._id, 
                            item.quantity - 1, 
                            item.selectedVariant?.sku
                          )}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(
                            item.product._id, 
                            item.quantity + 1, 
                            item.selectedVariant?.sku
                          )}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeItem(item.product._id, item.selectedVariant?.sku)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Delsumma:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frakt:</span>
              <span>Beräknas vid kassan</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Totalt:</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full" size="lg" onClick={closeCart} asChild>
                <Link href="/checkout">Gå till kassan</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={closeCart}
                asChild
              >
                <Link href="/products">Fortsätt handla</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-sm" 
                onClick={clearCart}
              >
                Töm varukorg
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
'use client'

import { AlertTriangle, RefreshCw, Home, ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'

interface ErrorDisplayProps {
  title?: string
  message?: string
  type?: 'error' | 'not-found' | 'network' | 'empty'
  onRetry?: () => void
  showHomeButton?: boolean
  showShopButton?: boolean
}

export function ErrorDisplay({
  title,
  message,
  type = 'error',
  onRetry,
  showHomeButton = true,
  showShopButton = false
}: ErrorDisplayProps) {
  const getErrorContent = () => {
    switch (type) {
      case 'not-found':
        return {
          title: title || 'Sidan hittades inte',
          message: message || 'Den sida du letar efter verkar inte existera.',
          icon: <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        }
      case 'network':
        return {
          title: title || 'Anslutningsproblem',
          message: message || 'Det gick inte att ladda data. Kontrollera din internetanslutning.',
          icon: <RefreshCw className="h-12 w-12 text-muted-foreground" />
        }
      case 'empty':
        return {
          title: title || 'Inga resultat',
          message: message || 'Det finns inget att visa här för tillfället.',
          icon: <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        }
      default:
        return {
          title: title || 'Något gick fel',
          message: message || 'Ett oväntat fel inträffade. Försök igen senare.',
          icon: <AlertTriangle className="h-12 w-12 text-destructive" />
        }
    }
  }

  const content = getErrorContent()

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            {content.icon}
          </div>
          
          <h2 className="text-xl font-semibold mb-3">
            {content.title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {content.message}
          </p>

          <div className="space-y-3">
            {onRetry && (
              <Button onClick={onRetry} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Försök igen
              </Button>
            )}
            
            {showShopButton && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Gå till produkter
                </Link>
              </Button>
            )}
            
            {showHomeButton && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Tillbaka hem
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Specialized error components for common use cases
export function ProductNotFound() {
  return (
    <ErrorDisplay
      type="not-found"
      title="Produkten hittades inte"
      message="Den produkt du letar efter verkar inte existera eller har tagits bort."
      showShopButton
    />
  )
}

export function EmptyCart() {
  return (
    <ErrorDisplay
      type="empty"
      title="Din varukorg är tom"
      message="Lägg till några produkter för att komma igång med din beställning."
      showShopButton
      showHomeButton={false}
    />
  )
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      type="network"
      onRetry={onRetry}
      showHomeButton
    />
  )
}

export function EmptyProductList() {
  return (
    <ErrorDisplay
      type="empty"
      title="Inga produkter hittades"
      message="Det finns inga produkter att visa för tillfället. Försök att ändra dina sökkriterier eller kom tillbaka senare."
      showHomeButton
    />
  )
}
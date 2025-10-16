
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { DynamicIcon } from "@/app/lib/icons"
import { Hero } from "@/app/lib/sanity"

interface HeaderProps {
  heroData?: Hero | null
}

export function Header({ heroData }: HeaderProps) {
  // Fallback data if no Sanity data is available - Tech & Gadgets theme
  const fallbackData: Hero = {
    title: "TechHub",
    subtitle: "Din destination för de senaste teknikprodukterna",
    description: "Upptäck de hetaste gadgets, smartphones, laptops och smart home-produkter. Alltid bästa pris, snabb leverans och 2 års garanti. Välkommen till framtidens teknik.",
    badge: {
      text: "🔥 Cyber Week - Upp till 50% rabatt på utvalda produkter",
      icon: "zap"
    },
    primaryButton: {
      text: "Shoppa nu",
      action: "scroll-services"
    },
    secondaryButton: {
      text: "Se erbjudanden",
      phoneNumber: ""
    }
  }

  const data = heroData || fallbackData

  const handlePrimaryClick = () => {
    if (data.primaryButton?.action === 'scroll-services') {
      // Scroll to featured products instead
      const featuredSection = document.querySelector('[data-section="featured-products"]')
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback to products page
        window.location.href = '/products'
      }
    } else if (data.primaryButton?.url) {
      window.open(data.primaryButton.url, '_blank')
    }
  }

  const handleSecondaryClick = () => {
    if (data.secondaryButton?.phoneNumber) {
      window.location.href = `tel:${data.secondaryButton.phoneNumber}`
    } else {
      // Fallback to categories or special offers
      window.location.href = '/categories'
    }
  }

  const headerColor = heroData?.headerColor || 'primary'

  const gradientByColor: Record<string, string> = {
    primary: 'from-primary/20 via-background to-primary/40',
    accent: 'from-accent/20 via-background to-accent/40',
    secondary: 'from-secondary/20 via-background to-secondary/40',
    muted: 'from-muted/20 via-background to-muted/40',
    background: 'from-background/20 via-background to-foreground/10',
  }

  const gradientClasses = gradientByColor[headerColor] || gradientByColor.primary

  return (
    <header className={`relative overflow-hidden bg-gradient-to-br ${gradientClasses}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {data.badge && (
            <Badge className="mb-6 bg-accent text-accent-foreground border-accent text-sm px-4 py-2">
              <DynamicIcon name={data.badge.icon} className="w-4 h-4 mr-2" />
              {data.badge.text}
            </Badge>
          )}
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-primary leading-tight">
            {data.title}
          </h1>
          
          <p className="text-2xl lg:text-3xl text-foreground mb-6 leading-relaxed font-medium">
            {data.subtitle}
          </p>
          
          {data.description && (
            <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data.primaryButton && (
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handlePrimaryClick}
              >
                {data.primaryButton.text}
              </Button>
            )}
            {data.secondaryButton && (
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleSecondaryClick}
              >
                {data.secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
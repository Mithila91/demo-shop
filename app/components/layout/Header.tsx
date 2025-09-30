import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { DynamicIcon } from "@/app/lib/icons"
import { Hero } from "@/app/lib/sanity"

interface HeaderProps {
  heroData?: Hero | null
}

export function Header({ heroData }: HeaderProps) {
  // Fallback data if no Sanity data is available
  const fallbackData: Hero = {
    title: "TechRescue",
    subtitle: "Vi räddar din teknik när den krånglar",
    description: "Över 15 års erfarenhet av IT-support för hem och företag. Våra certifierade tekniker löser dina problem snabbt och effektivt - på plats, via fjärranslutning eller i vår verkstad. Ingen teknisk utmaning är för stor eller för liten.",
    badge: {
      text: "Tillgänglig 24/7 - Snabb & Professionell IT-Support",
      icon: "zap"
    },
    primaryButton: {
      text: "Se våra tjänster",
      action: "scroll-services"
    },
    secondaryButton: {
      text: "Ring för akut hjälp: 08-123 456 78",
      phoneNumber: "08-123 456 78"
    }
  }

  const data = heroData || fallbackData

  const handlePrimaryClick = () => {
    if (data.primaryButton?.action === 'scroll-services') {
      const servicesSection = document.getElementById('services')
      servicesSection?.scrollIntoView({ behavior: 'smooth' })
    } else if (data.primaryButton?.url) {
      window.open(data.primaryButton.url, '_blank')
    }
  }

  const handleSecondaryClick = () => {
    if (data.secondaryButton?.phoneNumber) {
      window.location.href = `tel:${data.secondaryButton.phoneNumber}`
    }
  }

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
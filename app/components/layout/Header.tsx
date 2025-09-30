import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Zap } from "lucide-react"

export function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-6 bg-accent text-accent-foreground border-accent text-sm px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Tillgänglig 24/7 - Snabb & Professionell IT-Support
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-primary leading-tight">
            TechRescue
          </h1>
          
          <p className="text-2xl lg:text-3xl text-foreground mb-6 leading-relaxed font-medium">
            Vi räddar din teknik när den krånglar
          </p>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Över 15 års erfarenhet av IT-support för hem och företag. Våra certifierade tekniker 
            löser dina problem snabbt och effektivt - på plats, via fjärranslutning eller i vår verkstad.
            Ingen teknisk utmaning är för stor eller för liten.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Se våra tjänster
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Ring för akut hjälp: 08-123 456 78
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

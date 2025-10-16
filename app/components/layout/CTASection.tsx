import { ShoppingBag, ArrowRight, Gift } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <ShoppingBag className="w-16 h-16 text-primary" />
              <Gift className="w-6 h-6 text-accent absolute -top-1 -right-1" />
            </div>
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Redo att börja handla?
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upptäck vårt fullständiga sortiment av högkvalitativa produkter. 
            Fri frakt vid köp över 500 kr och 30 dagars öppet köp på alla varor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/products" className="flex items-center gap-2">
                Se alla produkter
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/categories">
                Bläddra kategorier
              </Link>
            </Button>
          </div>

          {/* Newsletter signup */}
          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 max-w-lg mx-auto">
            <h4 className="font-semibold mb-2">Få exklusiva erbjudanden</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Prenumerera på vårt nyhetsbrev för att få tidiga tillgång till rea och nya produkter
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Din e-postadress"
                className="flex-1 px-3 py-2 rounded border border-input bg-background text-sm"
              />
              <Button size="sm">
                Prenumerera
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

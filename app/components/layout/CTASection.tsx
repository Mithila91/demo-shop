import { Computer } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4 text-center">
        <Computer className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          Behöver du hjälp med något annat?
        </h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Kontakta oss för en kostnadsfri konsultation. Vi hjälper dig hitta rätt lösning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Ring 08-123 456 78
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            Skicka mejl
          </Button>
        </div>
      </div>
    </section>
  )
}

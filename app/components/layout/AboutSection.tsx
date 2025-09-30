import { Computer, Zap, Shield } from "lucide-react"

const benefits = [
  {
    icon: Computer,
    title: "Bred expertis",
    description: "Från enkla datorproblem till komplexa nätverkslösningar - vi har kunskap inom alla områden av modern IT."
  },
  {
    icon: Zap,
    title: "Snabba lösningar", 
    description: "Majoriteten av alla problem löser vi inom samma dag. Akut support finns tillgänglig dygnet runt."
  },
  {
    icon: Shield,
    title: "Trygg hantering",
    description: "All data hanteras med största säkerhet. Vi är GDPR-certifierade och arbetar enligt branschens högsta säkerhetsstandarder."
  }
]

const promises = [
  "Fast pris - inga dolda kostnader",
  "30 dagars garanti på alla reparationer", 
  "Kostnadsfri konsultation och offert",
  "Support även efter avslutad tjänst"
]

export function AboutSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Varför välja TechRescue?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Vi förstår hur frustrerande det kan vara när tekniken inte fungerar. 
              Därför erbjuder vi snabb, pålitlig och prisvärd IT-support som fungerar.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <article key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold mb-6 text-center">Vårt löfte till dig</h3>
              <div className="space-y-4">
                {promises.map((promise, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground text-sm">✓</span>
                    </div>
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

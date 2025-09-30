import { DynamicIcon } from "@/app/lib/icons"
import { AboutSection as AboutSectionType } from "@/app/lib/sanity"

interface AboutSectionProps {
  aboutData?: AboutSectionType | null
}

export function AboutSection({ aboutData }: AboutSectionProps) {
  // Fallback data if no Sanity data is available
  const fallbackData: AboutSectionType = {
    title: "Varför välja TechRescue?",
    description: "Vi förstår hur frustrerande det kan vara när tekniken inte fungerar. Därför erbjuder vi snabb, pålitlig och prisvärd IT-support som fungerar.",
    benefits: [
      {
        title: "Bred expertis",
        description: "Från enkla datorproblem till komplexa nätverkslösningar - vi har kunskap inom alla områden av modern IT.",
        icon: "computer"
      },
      {
        title: "Snabba lösningar", 
        description: "Majoriteten av alla problem löser vi inom samma dag. Akut support finns tillgänglig dygnet runt.",
        icon: "zap"
      },
      {
        title: "Trygg hantering",
        description: "All data hanteras med största säkerhet. Vi är GDPR-certifierade och arbetar enligt branschens högsta säkerhetsstandarder.",
        icon: "shield"
      }
    ],
    promiseBox: {
      title: "Vårt löfte till dig",
      promises: [
        "Fast pris - inga dolda kostnader",
        "30 dagars garanti på alla reparationer", 
        "Kostnadsfri konsultation och offert",
        "Support även efter avslutad tjänst"
      ]
    }
  }

  const data = aboutData || fallbackData

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {data.title}
            </h2>
            {data.description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {data.description}
              </p>
            )}
          </header>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {data.benefits.map((benefit, index) => (
                <article key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <DynamicIcon name={benefit.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {data.promiseBox && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border">
                <h3 className="text-2xl font-bold mb-6 text-center">{data.promiseBox.title}</h3>
                <div className="space-y-4">
                  {data.promiseBox.promises.map((promise, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-foreground text-sm">✓</span>
                      </div>
                      <span>{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
import { DynamicIcon } from "@/app/lib/icons"
import { AboutSection as AboutSectionType } from "@/app/lib/sanity"

interface AboutSectionProps {
  aboutData?: AboutSectionType | null
}

export function AboutSection({ aboutData }: AboutSectionProps) {
  // Fallback data if no Sanity data is available - TechHub e-commerce theme
  const fallbackData: AboutSectionType = {
    title: "Varför handla hos TechHub?",
    description: "Vi är din pålitliga partner för de senaste teknikprodukterna. Med över 10 års erfarenhet levererar vi kvalitet, service och innovation till rätt pris.",
    benefits: [
      {
        title: "Handplockade produkter",
        description: "Vårt expertteam testar och väljer endast de bästa teknikprodukterna från världens ledande tillverkare.",
        icon: "star"
      },
      {
        title: "Snabb leverans", 
        description: "Beställ före 15:00 så skickas din order samma dag. Fri frakt på alla köp över 500 kr.",
        icon: "truck"
      },
      {
        title: "Trygg handel",
        description: "SSL-krypterad betalning, 2 års garanti och 30 dagars öppet köp. Din trygghet är vår prioritet.",
        icon: "shield"
      }
    ],
    promiseBox: {
      title: "Vår garanti till dig",
      promises: [
        "2 års garanti på alla produkter",
        "30 dagars öppet köp - inga frågor ställs", 
        "Fri frakt och retur över 500 kr",
        "Experthjälp och support även efter köpet"
      ]
    }
  }

  const data = aboutData || fallbackData
  const isUsingFallback = !aboutData

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            {/* Debug indicator - remove in production */}
            {isUsingFallback && (
              <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mb-4">
                🔧 Visar fallback-data (Sanity ej kopplad)
              </div>
            )}
            
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
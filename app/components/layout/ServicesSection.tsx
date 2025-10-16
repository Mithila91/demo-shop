import { ServiceCard } from "@/app/components/ServiceCard"
import { Service, ServicesSection as ServicesSectionType } from "@/app/lib/sanity"

interface ServicesSectionProps {
  services?: Service[] | null
  servicesSectionData?: ServicesSectionType | null
}

export function ServicesSection({ services, servicesSectionData }: ServicesSectionProps) {
  // Fallback data if no Sanity data is available - TechHub e-commerce services
  const fallbackServices: Service[] = [
    {
      _id: '1',
      title: "Expressfrakt",
      description: "Få dina produkter levererade samma dag. Perfect för akuta teknikbehov.",
      price: "Från 99 kr",
      duration: "Samma dag",
      features: [
        "Leverans samma dag",
        "Spårning i realtid", 
        "SMS-notifiering",
        "Säker förpackning"
      ],
      popular: true,
      order: 1,
      slug: { current: 'expressfrakt' }
    },
    {
      _id: '2',
      title: "Teknisk Support",
      description: "Få hjälp med installation och setup av dina nya produkter från våra experter.",
      price: "Gratis",
      duration: "24/7",
      features: [
        "Installation & setup",
        "Teknisk felsökning",
        "Produktvägledning",
        "Chat, telefon & e-post"
      ],
      popular: false,
      order: 2,
      slug: { current: 'teknisk-support' }
    },
    {
      _id: '3',
      title: "Utökad Garanti",
      description: "Förläng garantin på dina produkter med upp till 3 år extra skydd.",
      price: "Från 149 kr",
      duration: "Upp till 5 år",
      features: [
        "Utökad garantitid",
        "Snabb reparation", 
        "Ersättningsprodukt",
        "Inga dolda avgifter"
      ],
      popular: false,
      order: 3,
      slug: { current: 'utokad-garanti' }
    }
  ]

  const data = services && services.length > 0 ? services : fallbackServices
  
  // Fallback section data if no Sanity data is available
  const fallbackSectionData: ServicesSectionType = {
    title: "Våra Tjänster",
    description: "Vi erbjuder kompletterande tjänster för en ännu bättre shoppingupplevelse. Allt för att göra ditt köp så smidigt som möjligt."
  }
  
  const sectionData = servicesSectionData || fallbackSectionData

  return (
    <section id="services" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {sectionData.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionData.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((service) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              description={service.description}
              price={service.price}
              duration={service.duration}
              features={service.features}
              popular={service.popular}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
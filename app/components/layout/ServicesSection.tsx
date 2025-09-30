'use client'

import { ServiceCard } from "@/app/components/ServiceCard"

const services = [
  {
    id: 1,
    title: "Akut IT-Support",
    description: "Snabb hjälp när din teknik krånglar. Vi löser problemet på plats eller via fjärranslutning.",
    price: "695 kr",
    duration: "1-3 timmar",
    features: [
      "Samma dag service",
      "På plats eller fjärranslutning", 
      "Alla vanliga IT-problem",
      "Ingen startkostnad"
    ],
    popular: true
  },
  {
    id: 2,
    title: "Datorservice & Reparation",
    description: "Fullständig service av din dator. Vi fixar hårdvara, installerar program och optimerar prestanda.",
    price: "495 kr",
    duration: "2-5 dagar",
    features: [
      "Hårdvaru- och mjukvaruservice",
      "Prestandaoptimering",
      "Viruskontroll & säkerhet",
      "Gratis hämtning & leverans"
    ]
  },
  {
    id: 3,
    title: "Hemmanätverk & WiFi",
    description: "Installation och optimering av hemmanätverk. Få bästa möjliga WiFi-täckning i hela hemmet.",
    price: "895 kr",
    duration: "2-4 timmar",
    features: [
      "WiFi-täckning hela hemmet",
      "Säker nätverkskonfiguration", 
      "Smart hem-integration",
      "3 månaders support inkluderat"
    ]
  }
]

interface ServicesSectionProps {
  onServiceSelect: (service: typeof services[0]) => void
}

export function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Våra Tjänster
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vi erbjuder kompletta IT-lösningar för alla dina tekniska behov. 
          Välj den tjänst som passar dig bäst.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            duration={service.duration}
            features={service.features}
            popular={service.popular}
            onSelect={() => onServiceSelect(service)}
          />
        ))}
      </div>
    </section>
  )
}

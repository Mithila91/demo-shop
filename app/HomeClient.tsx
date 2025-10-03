'use client'

import { useState } from 'react'
import { Header } from './components/layout/Header'
import { FeatureGrid } from './components/layout/FeatureGrid'
import { AboutSection } from './components/layout/AboutSection'
import { ServicesSection } from './components/layout/ServicesSection'
import { CTASection } from './components/layout/CTASection'
import { KlarnaCheckout } from './components/KlarnaCheckout'
import type { Hero, Service, Feature, AboutSection as AboutSectionType } from './lib/sanity'

type HomeClientProps = {
  heroData: Hero | null
  servicesData: Service[]
  featuresData: Feature[]
  aboutData: AboutSectionType | null
}

export default function HomeClient({ heroData, servicesData, featuresData, aboutData }: HomeClientProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setShowCheckout(true)
  }

  const handleBackToServices = () => {
    setShowCheckout(false)
    setSelectedService(null)
  }

  if (showCheckout) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <KlarnaCheckout 
          selectedService={selectedService} 
          onBack={handleBackToServices}
        />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header heroData={heroData} />
      <section className="container mx-auto px-4 py-12">
        <FeatureGrid features={featuresData} />
      </section>
      <AboutSection aboutData={aboutData} />
      <ServicesSection services={servicesData} onServiceSelect={handleServiceSelect} />
      <CTASection />
    </main>
  )
}



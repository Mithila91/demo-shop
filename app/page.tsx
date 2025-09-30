'use client'

import { useState } from "react"
import { Header } from "./components/layout/Header"
import { FeatureGrid } from "./components/layout/FeatureGrid"
import { AboutSection } from "./components/layout/AboutSection"
import { ServicesSection } from "./components/layout/ServicesSection"
import { CTASection } from "./components/layout/CTASection"
import { KlarnaCheckout } from "./components/KlarnaCheckout"

interface Service {
  id: number
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  popular?: boolean
}

export default function HomePage() {
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
      <Header />
      
      <section className="container mx-auto px-4 py-12">
        <FeatureGrid />
      </section>
      
      <AboutSection />
      
      <ServicesSection onServiceSelect={handleServiceSelect} />
      
      <CTASection />
    </main>
  )
}

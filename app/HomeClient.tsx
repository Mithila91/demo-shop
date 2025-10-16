'use client'

import { useState } from 'react'
import { Header } from './components/layout/Header'
import { FeatureGrid } from './components/layout/FeatureGrid'
import { AboutSection } from './components/layout/AboutSection'
import { ServicesSection } from './components/layout/ServicesSection'
import { CTASection } from './components/layout/CTASection'
import { FeaturedProducts } from './components/layout/FeaturedProducts'
import { KlarnaCheckout } from './components/KlarnaCheckout'
import type { Hero, Service, Feature, AboutSection as AboutSectionType, Product } from './lib/sanity'

type HomeClientProps = {
  heroData: Hero | null
  servicesData: Service[]
  featuresData: Feature[]
  aboutData: AboutSectionType | null
  featuredProducts: Product[]
}

export default function HomeClient({ 
  heroData, 
  servicesData, 
  featuresData, 
  aboutData, 
  featuredProducts 
}: HomeClientProps) {
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
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <FeatureGrid features={featuresData} />
      </section>
      
      {/* About Section */}
      <AboutSection aboutData={aboutData} />
      
      {/* Services Section (if you still want to offer services) */}
      {servicesData.length > 0 && (
        <ServicesSection services={servicesData} onServiceSelect={handleServiceSelect} />
      )}
      
      {/* CTA Section */}
      <CTASection />
    </main>
  )
}



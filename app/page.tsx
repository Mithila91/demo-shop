'use client'

import { useState, useEffect } from "react"
import { Header } from "./components/layout/Header"
import { FeatureGrid } from "./components/layout/FeatureGrid"
import { AboutSection } from "./components/layout/AboutSection"
import { ServicesSection } from "./components/layout/ServicesSection"
import { CTASection } from "./components/layout/CTASection"
import { KlarnaCheckout } from "./components/KlarnaCheckout"
import { 
  getHero, 
  getServices, 
  getFeatures, 
  getAboutSection,
  Hero,
  Service,
  Feature,
  AboutSection as AboutSectionType
} from "./lib/sanity"

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  
  // Sanity data state
  const [heroData, setHeroData] = useState<Hero | null>(null)
  const [servicesData, setServicesData] = useState<Service[]>([])
  const [featuresData, setFeaturesData] = useState<Feature[]>([])
  const [aboutData, setAboutData] = useState<AboutSectionType | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch data from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        const [hero, services, features, about] = await Promise.all([
          getHero(),
          getServices(),
          getFeatures(),
          getAboutSection()
        ])
        
        setHeroData(hero)
        setServicesData(services)
        setFeaturesData(features)
        setAboutData(about)
      } catch (error) {
        console.error('Error fetching Sanity data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Laddar innehåll...</p>
        </div>
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

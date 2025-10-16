'use client'

import { Header } from './components/layout/Header'
import { FeatureGrid } from './components/layout/FeatureGrid'
import { AboutSection } from './components/layout/AboutSection'
import { ServicesSection } from './components/layout/ServicesSection'
import { CTASection } from './components/layout/CTASection'
import { FeaturedProducts } from '@/app/components/layout/FeaturedProducts'
import type { Hero, Service, ServicesSection as ServicesSectionType, Feature, AboutSection as AboutSectionType, Product } from './lib/sanity'

type HomeClientProps = {
  heroData: Hero | null
  servicesData: Service[]
  servicesSectionData: ServicesSectionType | null
  featuresData: Feature[]
  aboutData: AboutSectionType | null
  featuredProducts: Product[]
}

export default function HomeClient({ 
  heroData, 
  servicesData, 
  servicesSectionData,
  featuresData, 
  aboutData, 
  featuredProducts 
}: HomeClientProps) {

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
      
      {/* Services Section */}
      <ServicesSection services={servicesData} servicesSectionData={servicesSectionData} />
      
      {/* CTA Section */}
      <CTASection />
    </main>
  )
}



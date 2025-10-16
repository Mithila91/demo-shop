import { getHero, getServices, getServicesSection, getFeatures, getAboutSection, getFeaturedProducts } from "./lib/sanity"
import HomeClient from "./HomeClient"

export default async function HomePage() {
  const [heroData, servicesData, servicesSectionData, featuresData, aboutData, featuredProducts] = await Promise.all([
    getHero(),
    getServices(),
    getServicesSection(),
    getFeatures(),
    getAboutSection(),
    getFeaturedProducts()
  ])

  return (
    <HomeClient 
      heroData={heroData}
      servicesData={servicesData}
      servicesSectionData={servicesSectionData}
      featuresData={featuresData}
      aboutData={aboutData}
      featuredProducts={featuredProducts}
    />
  )
}

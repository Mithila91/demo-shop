import { getHero, getServices, getFeatures, getAboutSection, getFeaturedProducts } from "./lib/sanity"
import HomeClient from "./HomeClient"

export default async function HomePage() {
  const [heroData, servicesData, featuresData, aboutData, featuredProducts] = await Promise.all([
    getHero(),
    getServices(),
    getFeatures(),
    getAboutSection(),
    getFeaturedProducts()
  ])

  return (
    <HomeClient 
      heroData={heroData}
      servicesData={servicesData}
      featuresData={featuresData}
      aboutData={aboutData}
      featuredProducts={featuredProducts}
    />
  )
}

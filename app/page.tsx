import { getHero, getServices, getFeatures, getAboutSection } from "./lib/sanity"
import HomeClient from "./HomeClient"

export default async function HomePage() {
  const [heroData, servicesData, featuresData, aboutData] = await Promise.all([
    getHero(),
    getServices(),
    getFeatures(),
    getAboutSection()
  ])

  return (
    <HomeClient 
      heroData={heroData}
      servicesData={servicesData}
      featuresData={featuresData}
      aboutData={aboutData}
    />
  )
}

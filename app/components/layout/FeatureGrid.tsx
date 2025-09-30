import { DynamicIcon } from "@/app/lib/icons"
import { Feature } from "@/app/lib/sanity"

interface FeatureGridProps {
  features?: Feature[]
}

export function FeatureGrid({ features }: FeatureGridProps) {
  // Fallback data if no Sanity data is available
  const fallbackFeatures: Feature[] = [
    { _id: '1', title: "Samma dag", subtitle: "Snabb respons", icon: "clock", order: 1 },
    { _id: '2', title: "100% säkert", subtitle: "Trygg hantering", icon: "shield", order: 2 },
    { _id: '3', title: "Certifierat", subtitle: "Expert-tekniker", icon: "award", order: 3 },
    { _id: '4', title: "500+ kunder", subtitle: "Nöjda användare", icon: "users", order: 4 },
  ]

  const data = features && features.length > 0 ? features : fallbackFeatures

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {data.map((feature) => (
        <article key={feature._id} className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
          <DynamicIcon name={feature.icon} className="w-8 h-8 mb-3 text-accent" />
          <span className="font-semibold text-lg">{feature.title}</span>
          <span className="text-sm text-muted-foreground">{feature.subtitle}</span>
        </article>
      ))}
    </section>
  )
}
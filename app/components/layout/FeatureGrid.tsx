import { DynamicIcon } from "@/app/lib/icons"
import { Feature } from "@/app/lib/sanity"

interface FeatureGridProps {
  features?: Feature[]
}

export function FeatureGrid({ features }: FeatureGridProps) {
  // Fallback data if no Sanity data is available - Tech & Gadgets theme
  const fallbackFeatures: Feature[] = [
    { _id: '1', title: "Snabb leverans", subtitle: "1-2 arbetsdagar", icon: "truck", order: 1 },
    { _id: '2', title: "Säker betalning", subtitle: "SSL-kryptering", icon: "shield", order: 2 },
    { _id: '3', title: "2 års garanti", subtitle: "På alla produkter", icon: "award", order: 3 },
    { _id: '4', title: "Gratis retur", subtitle: "30 dagars öppet köp", icon: "refresh-cw", order: 4 },
  ]

  const data = features && features.length > 0 ? features : fallbackFeatures

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {data.map((feature, index) => (
        <article 
          key={feature._id} 
          className="group flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="w-16 h-16 mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
            <DynamicIcon name={feature.icon} className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
          </div>
          <span className="font-bold text-lg mb-1 text-center group-hover:text-primary transition-colors duration-200">{feature.title}</span>
          <span className="text-sm text-muted-foreground text-center leading-relaxed">{feature.subtitle}</span>
        </article>
      ))}
    </section>
  )
}
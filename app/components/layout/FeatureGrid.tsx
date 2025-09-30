import { Clock, Shield, Award, Users } from "lucide-react"

const features = [
  { icon: Clock, title: "Samma dag", subtitle: "Snabb respons" },
  { icon: Shield, title: "100% säkert", subtitle: "Trygg hantering" },
  { icon: Award, title: "Certifierat", subtitle: "Expert-tekniker" },
  { icon: Users, title: "500+ kunder", subtitle: "Nöjda användare" },
]

export function FeatureGrid() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {features.map((feature, index) => (
        <article key={index} className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
          <feature.icon className="w-8 h-8 mb-3 text-accent" />
          <span className="font-semibold text-lg">{feature.title}</span>
          <span className="text-sm text-muted-foreground">{feature.subtitle}</span>
        </article>
      ))}
    </section>
  )
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Clock, Shield, Star } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  popular?: boolean
  onSelect?: () => void
}

export function ServiceCard({ 
  title, 
  description, 
  price, 
  duration, 
  features, 
  popular = false,
  onSelect 
}: ServiceCardProps) {
  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      popular ? 'ring-2 ring-primary shadow-lg' : ''
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-accent text-accent-foreground shadow-md">
            <Star className="w-3 h-3 mr-1" />
            Populär
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">{price}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{duration}</span>
          </div>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm gap-2">
              <Shield className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        {onSelect ? (
          <Button 
            onClick={onSelect}
            className="w-full" 
            variant={popular ? "default" : "outline"}
          >
            Välj tjänst
          </Button>
        ) : (
          <div className="w-full text-center text-sm text-muted-foreground py-2">
            Ingår i vår service
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

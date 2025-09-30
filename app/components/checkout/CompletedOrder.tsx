import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { CheckCircle } from "lucide-react"

interface CompletedOrderProps {
  serviceName: string
  onBack: () => void
}

export function CompletedOrder({ serviceName, onBack }: CompletedOrderProps) {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tack för din beställning!</h3>
          <p className="text-muted-foreground mb-4">
            Vi kommer att kontakta dig inom 24 timmar för att boka din {serviceName.toLowerCase()}.
          </p>
          <Button onClick={onBack} variant="outline" className="w-full">
            Tillbaka till startsidan
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

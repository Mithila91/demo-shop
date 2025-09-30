import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"

interface Service {
  title: string
  price: string
  duration: string
}

interface OrderSummaryProps {
  service: Service
}

export function OrderSummary({ service }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordersammanfattning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{service.title}</h4>
              <p className="text-sm text-muted-foreground">{service.duration}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">{service.price}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center font-semibold">
            <span>Totalt</span>
            <span>{service.price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

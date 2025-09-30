'use client'

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"
import { OrderSummary } from "./checkout/OrderSummary"
import { PaymentForm } from "./checkout/PaymentForm"
import { CompletedOrder } from "./checkout/CompletedOrder"

interface Service {
  title: string
  price: string
  duration: string
}

interface KlarnaCheckoutProps {
  selectedService: Service | null
  onBack: () => void
}

export function KlarnaCheckout({ selectedService, onBack }: KlarnaCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false)
      setIsCompleted(true)
      toast({
        title: "Betalning genomförd!",
        description: "Vi kontaktar dig inom kort för att boka din tjänst.",
      })
    }, 2000)
  }

  if (isCompleted && selectedService) {
    return <CompletedOrder serviceName={selectedService.title} onBack={onBack} />
  }

  if (!selectedService) return null

  return (
    <div className="max-w-2xl mx-auto">
      <nav className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tillbaka
        </Button>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6">
        <OrderSummary service={selectedService} />
        <PaymentForm onPayment={handlePayment} isProcessing={isProcessing} />
      </div>
    </div>
  )
}

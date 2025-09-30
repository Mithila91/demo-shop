'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Separator } from "@/app/components/ui/separator"
import { CreditCard } from "lucide-react"

interface PaymentFormProps {
  onPayment: () => void
  isProcessing: boolean
}

export function PaymentForm({ onPayment, isProcessing }: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="bg-klarna-pink text-white px-3 py-1 rounded text-sm font-bold mr-3">
            klarna
          </div>
          Checkout
        </CardTitle>
        <CardDescription>
          Betala med Klarna - dela upp betalningen eller betala senare
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Förnamn</Label>
            <Input id="firstName" placeholder="Anna" />
          </div>
          <div>
            <Label htmlFor="lastName">Efternamn</Label>
            <Input id="lastName" placeholder="Andersson" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" placeholder="anna@exempel.se" />
        </div>
        
        <div>
          <Label htmlFor="phone">Telefonnummer</Label>
          <Input id="phone" placeholder="070-123 45 67" />
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium">Betalningsalternativ</h4>
          
          <div className="space-y-2">
            <PaymentOption
              id="direct"
              icon={<CreditCard className="w-5 h-5" />}
              title="Betala direkt"
              description="Betala hela beloppet nu"
              defaultChecked
            />
            
            <PaymentOption
              id="installments"
              icon={<div className="w-5 h-5 bg-klarna-pink rounded" />}
              title="Dela upp betalningen"
              description="3 delbetalningar utan ränta"
            />
            
            <PaymentOption
              id="later"
              icon={<div className="w-5 h-5 bg-klarna-pink rounded" />}
              title="Betala senare"
              description="Betala inom 30 dagar"
            />
          </div>
        </div>

        <Button 
          onClick={onPayment} 
          disabled={isProcessing}
          className="w-full bg-klarna-pink hover:bg-klarna-pink/90 text-white"
        >
          {isProcessing ? "Behandlar betalning..." : "Slutför köp"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Genom att slutföra köpet godkänner du Klarnas villkor och integritetspolicy
        </p>
      </CardContent>
    </Card>
  )
}

interface PaymentOptionProps {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  defaultChecked?: boolean
}

function PaymentOption({ id, icon, title, description, defaultChecked }: PaymentOptionProps) {
  return (
    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors">
      <input type="radio" name="payment" id={id} defaultChecked={defaultChecked} />
      {icon}
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </label>
  )
}

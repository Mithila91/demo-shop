import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KlarnaCheckoutProps {
  selectedService: {
    title: string;
    price: string;
    duration: string;
  } | null;
  onBack: () => void;
}

export const KlarnaCheckout = ({ selectedService, onBack }: KlarnaCheckoutProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulera betalningsprocess
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      toast({
        title: "Betalning genomförd!",
        description: "Vi kontaktar dig inom kort för att boka din tjänst.",
      });
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tack för din beställning!</h3>
            <p className="text-muted-foreground mb-4">
              Vi kommer att kontakta dig inom 24 timmar för att boka din {selectedService?.title.toLowerCase()}.
            </p>
            <Button onClick={onBack} variant="outline" className="w-full">
              Tillbaka till startsidan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedService) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tillbaka
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ordersammanfattning */}
        <Card>
          <CardHeader>
            <CardTitle>Ordersammanfattning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{selectedService.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedService.duration}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{selectedService.price}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center font-semibold">
                <span>Totalt</span>
                <span>{selectedService.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Klarna Checkout Mock */}
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
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/10">
                  <input type="radio" name="payment" defaultChecked />
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Betala direkt</div>
                    <div className="text-sm text-muted-foreground">Betala hela beloppet nu</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/10">
                  <input type="radio" name="payment" />
                  <div className="w-5 h-5 bg-klarna-pink rounded"></div>
                  <div>
                    <div className="font-medium">Dela upp betalningen</div>
                    <div className="text-sm text-muted-foreground">3 delbetalningar utan ränta</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/10">
                  <input type="radio" name="payment" />
                  <div className="w-5 h-5 bg-klarna-pink rounded"></div>
                  <div>
                    <div className="font-medium">Betala senare</div>
                    <div className="text-sm text-muted-foreground">Betala inom 30 dagar</div>
                  </div>
                </label>
              </div>
            </div>

            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="w-full bg-klarna-pink hover:bg-klarna-pink/90 text-white"
            >
              {isProcessing ? "Behandlar betalning..." : "Slutför köp"}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              Genom att slutföra köpet godkänner du Klarnas villkor och integritetspolicy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { KlarnaCheckout } from "@/components/KlarnaCheckout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Computer, Shield, Zap, Users, Award, Clock } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Akut IT-Support",
    description: "Snabb hjälp när din teknik krånglar. Vi löser problemet på plats eller via fjärranslutning.",
    price: "695 kr",
    duration: "1-3 timmar",
    features: [
      "Samma dag service",
      "På plats eller fjärranslutning", 
      "Alla vanliga IT-problem",
      "Ingen startkostnad"
    ],
    popular: true
  },
  {
    id: 2,
    title: "Datorservice & Reparation",
    description: "Fullständig service av din dator. Vi fixar hårdvara, installerar program och optimerar prestanda.",
    price: "495 kr",
    duration: "2-5 dagar",
    features: [
      "Hårdvaru- och mjukvaruservice",
      "Prestandaoptimering",
      "Viruskontroll & säkerhet",
      "Gratis hämtning & leverans"
    ]
  },
  {
    id: 3,
    title: "Hemmanätverk & WiFi",
    description: "Installation och optimering av hemmanätverk. Få bästa möjliga WiFi-täckning i hela hemmet.",
    price: "895 kr",
    duration: "2-4 timmar",
    features: [
      "WiFi-täckning hela hemmet",
      "Säker nätverkskonfiguration", 
      "Smart hem-integration",
      "3 månaders support inkluderat"
    ]
  }
];

const Index = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowCheckout(true);
  };

  const handleBackToServices = () => {
    setShowCheckout(false);
    setSelectedService(null);
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <KlarnaCheckout 
          selectedService={selectedService} 
          onBack={handleBackToServices}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              <Zap className="w-3 h-3 mr-1" />
              Snabb & Professionell IT-Support
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechRescue
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Vi räddar din teknik när den behöver det som mest. 
              Professionell IT-support för hem och småföretag.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-accent" />
                Snabb respons
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-accent" />
                Säker hantering
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-accent" />
                Certifierade tekniker
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-accent" />
                500+ nöjda kunder
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Våra Tjänster
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vi erbjuder kompletta IT-lösningar för alla dina tekniska behov. 
            Välj den tjänst som passar dig bäst.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              duration={service.duration}
              features={service.features}
              popular={service.popular}
              onSelect={() => handleServiceSelect(service)}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <Computer className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Behöver du hjälp med något annat?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kontakta oss för en kostnadsfri konsultation. Vi hjälper dig hitta rätt lösning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Ring 08-123 456 78
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Skicka mejl
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

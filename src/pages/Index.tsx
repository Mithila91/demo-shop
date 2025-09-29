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
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 bg-accent/10 text-accent-foreground border-accent/20 text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Tillgänglig 24/7 - Snabb & Professionell IT-Support
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              TechRescue
            </h1>
            
            <p className="text-2xl lg:text-3xl text-foreground mb-6 leading-relaxed font-medium">
              Vi räddar din teknik när den krånglar
            </p>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Över 15 års erfarenhet av IT-support för hem och företag. Våra certifierade tekniker 
              löser dina problem snabbt och effektivt - på plats, via fjärranslutning eller i vår verkstad.
              Ingen teknisk utmaning är för stor eller för liten.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <Clock className="w-8 h-8 mb-3 text-accent" />
                <span className="font-semibold text-lg">Samma dag</span>
                <span className="text-sm text-muted-foreground">Snabb respons</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <Shield className="w-8 h-8 mb-3 text-accent" />
                <span className="font-semibold text-lg">100% säkert</span>
                <span className="text-sm text-muted-foreground">Trygg hantering</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <Award className="w-8 h-8 mb-3 text-accent" />
                <span className="font-semibold text-lg">Certifierat</span>
                <span className="text-sm text-muted-foreground">Expert-tekniker</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <Users className="w-8 h-8 mb-3 text-accent" />
                <span className="font-semibold text-lg">500+ kunder</span>
                <span className="text-sm text-muted-foreground">Nöjda användare</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Se våra tjänster
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Ring för akut hjälp: 08-123 456 78
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Varför välja TechRescue?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Vi förstår hur frustrerande det kan vara när tekniken inte fungerar. 
                Därför erbjuder vi snabb, pålitlig och prisvärd IT-support som fungerar.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Computer className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bred expertis</h3>
                    <p className="text-muted-foreground">
                      Från enkla datorproblem till komplexa nätverkslösningar - vi har kunskap 
                      inom alla områden av modern IT.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Snabba lösningar</h3>
                    <p className="text-muted-foreground">
                      Majoriteten av alla problem löser vi inom samma dag. Akut support 
                      finns tillgänglig dygnet runt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trygg hantering</h3>
                    <p className="text-muted-foreground">
                      All data hanteras med största säkerhet. Vi är GDPR-certifierade 
                      och arbetar enligt branschens högsta säkerhetsstandarder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border">
                <h3 className="text-2xl font-bold mb-6 text-center">Vårt löfte till dig</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">✓</span>
                    </div>
                    <span>Fast pris - inga dolda kostnader</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">✓</span>
                    </div>
                    <span>30 dagars garanti på alla reparationer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">✓</span>
                    </div>
                    <span>Kostnadsfri konsultation och offert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">✓</span>
                    </div>
                    <span>Support även efter avslutad tjänst</span>
                  </div>
                </div>
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

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Star } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  onSelect: () => void;
}

export const ServiceCard = ({ 
  title, 
  description, 
  price, 
  duration, 
  features, 
  popular = false,
  onSelect 
}: ServiceCardProps) => {
  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-lg ${popular ? 'ring-2 ring-primary' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground">
            <Star className="w-3 h-3 mr-1" />
            Populär
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="mb-4">
          <div className="text-3xl font-bold text-primary">{price}</div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Shield className="w-4 h-4 mr-2 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onSelect}
          className="w-full" 
          variant={popular ? "default" : "outline"}
        >
          Välj tjänst
        </Button>
      </CardFooter>
    </Card>
  );
};
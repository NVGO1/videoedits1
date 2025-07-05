import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Zap } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  duration: string;
  features: string[];
}

interface PricingSectionProps {
  plans: PricingPlan[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const scrollToForm = (planId: string) => {
    setSelectedPlan(planId);
    const formSection = document.getElementById('google-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Urgency Banner */}
        <div className="text-center mb-8">
          <Badge variant="destructive" className="text-lg px-6 py-2 animate-pulse">
            <Zap className="mr-2 h-4 w-4" />
            Only 5 Spots Left This Week!
          </Badge>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional video editing services designed to fit your content creation needs and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                index === 1
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/50 scale-105'
                  : 'border-border bg-gradient-to-br from-background to-secondary/50'
              }`}
            >
              <CardHeader className="text-center pb-4">
                {index === 1 && (
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">${plan.currentPrice}</span>
                    <span className="text-xl text-muted-foreground line-through">${plan.originalPrice}</span>
                  </div>
                  <p className="text-muted-foreground">Up to {plan.duration}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    index === 1
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                  } text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105`}
                  onClick={() => scrollToForm(plan.id)}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Metrics Image */}
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
            alt="YouTube Success Metrics"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
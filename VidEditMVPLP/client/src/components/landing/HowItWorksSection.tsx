import { Upload, Edit, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const steps = [
  {
    number: '1',
    title: 'Upload & Pay',
    description: 'Secure upload portal, instant PayPal processing',
    icon: Upload,
    image: '/Images/How to step 1.jpg',
    imageAlt: 'Clean computer interface showing file upload progress, professional workspace, secure cloud upload visualization',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '2',
    title: 'Professional Editing',
    description: 'Matched with specialist editor for your content type. Updates every 12 hours',
    icon: Edit,
    image: '/Images/How to step 2.jpg',
    imageAlt: 'Professional video editing timeline with multiple tracks, color correction panels, motion graphics, clean editing interface',
    color: 'from-purple-500 to-pink-500'
  },
  {
    number: '3',
    title: 'Receive & Review',
    description: 'Delivered in 36 hours guaranteed. One revision included to perfect it',
    icon: CheckCircle,
    image: '/Images/How to step 3.jpg',
    imageAlt: 'Notification of completed video project, satisfied customer reviewing final video on laptop, professional office setting',
    color: 'from-green-500 to-emerald-500'
  }
];

export function HowItWorksSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('custom-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple 3-Step Process
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-secondary/50 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-video">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Step Number */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 mb-8">Your video journey from upload to delivery</p>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            onClick={scrollToForm}
          >
            Start Your Project Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
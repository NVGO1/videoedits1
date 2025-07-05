import { Clock, Camera, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const benefits = [
  {
    icon: Clock,
    title: '24-Hour Delivery',
    description: 'Lightning-fast turnaround without compromising quality. Get your edited videos back in just 24 hours.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Camera,
    title: 'Pro-Quality Edits',
    description: 'Professional-grade editing with motion graphics, color grading, and cinematic effects.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Affordable Growth',
    description: 'Premium editing services at prices that won\'t break your content creation budget.',
    color: 'from-green-500 to-emerald-500'
  }
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose NVGO?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine speed, quality, and affordability to help your YouTube channel reach new heights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-secondary/50 backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Satisfied Creator Image */}
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
            alt="Professional Video Editing Workspace"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
import { Clock, Zap, Users, CheckCircle, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const benefits = [
  {
    icon: Zap,
    title: 'No Platform Shopping Required',
    description: 'Skip the hassle of vetting editors on freelance platforms. We handle the matching and quality control for you.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'Guaranteed 36-Hour Delivery',
    description: 'Your video delivered in 36 hours or get a full refund. No excuses, no delays.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Expert Editors Matched to Your Content',
    description: 'Professional editors specifically chosen based on your content type and style preferences.',
    color: 'from-green-500 to-emerald-500'
  }
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skip the Platform Hassle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No more endless searching, vetting editors, or dealing with unreliable freelancers. Get professional video editing the simple way.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
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
            src="https://letsnvgo.com/Images/Benefits%20section2.jpg"
            alt="Professional Video Editing Workspace"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
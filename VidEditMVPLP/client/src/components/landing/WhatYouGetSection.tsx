import { Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const features = [
  'Pre-vetted professional editors',
  '1–15 minute final runtime',
  'Motion graphics and animations',
  'Professional captions/subtitles',
  'Color grading and correction',
  '1 free revision included',
  'Secure payment and communication',
  'Guaranteed 36-hour delivery',
  'Quality review before delivery'

];

export function WhatYouGetSection() {
  return (
    <section id="what-you-get" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              What You Get
            </h2>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 hover:shadow-lg transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background to-secondary/50">
              <CardContent className="p-0">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                  alt="Professional Video Editing Software"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
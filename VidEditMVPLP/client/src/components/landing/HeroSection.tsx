import { Button } from '../ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('google-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExamples = () => {
    const examplesSection = document.getElementById('examples');
    if (examplesSection) {
      examplesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                YouTube
              </span>{' '}
              in 24 Hours
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Pro Editing Starting at{' '}
              <span className="line-through text-red-300">$100</span>{' '}
              <span className="text-yellow-400 font-bold">$90!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
                onClick={scrollToForm}
              >
                Reserve Your Spot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/50 text-white hover:bg-white/20 hover:text-white backdrop-blur-md bg-white/10 px-8 py-4 text-lg rounded-full shadow-lg"
                onClick={scrollToExamples}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Examples
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop"
                alt="YouTube Creator Studio"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
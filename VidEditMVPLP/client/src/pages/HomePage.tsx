import { useEffect, useState } from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { WhatYouGetSection } from '../components/landing/WhatYouGetSection';
import { VideoExamplesSection } from '../components/landing/VideoExamplesSection';
import { PricingSection } from '../components/landing/PricingSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CustomFormSection } from '../components/landing/CustomFormSection';
import { FAQSection } from '../components/landing/FAQSection';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';
import { ProgressIndicator } from '../components/landing/ProgressIndicator';
import { getTestimonials, getPricingPlans } from '../api/landing';
import { useToast } from '../hooks/useToast';

export function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching homepage data');
        const [testimonialsData, pricingData] = await Promise.all([
          getTestimonials(),
          getPricingPlans()
        ]);
        
        setTestimonials((testimonialsData as any).testimonials);
        setPricingPlans((pricingData as any).plans);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        toast({
          title: "Error",
          description: "Failed to load page data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator />
      <LandingHeader />
      
      <main className="relative">
        <HeroSection />
        <BenefitsSection />
        <WhatYouGetSection />
        <VideoExamplesSection />
        <PricingSection plans={pricingPlans} />
        <HowItWorksSection />
        <TestimonialsSection testimonials={testimonials} />
        <CustomFormSection />
        <FAQSection />
      </main>

      <LandingFooter />
    </div>
  );
}
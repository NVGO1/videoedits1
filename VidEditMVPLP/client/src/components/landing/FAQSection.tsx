import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'How long does the editing process take?',
    answer: 'We guarantee a 36-hour turnaround for all our editing services. Most projects are completed within 24-30 hours, but we allow up to 36 hours to ensure the highest quality output.'
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept all major video formats including MP4, MOV, AVI, MKV, and more. We also work with raw footage from popular cameras like Canon, Sony, Panasonic, and smartphone recordings.'
  },
  {
    question: 'Can I request revisions?',
    answer: 'Yes! Each package includes 1 free revision. We want to make sure you\'re completely satisfied with the final result. Additional revisions can be requested for a small fee.'
  },
  {
    question: 'What\'s included in each pricing tier?',
    answer: 'Basic includes fundamental editing and color correction. Pro adds motion graphics and professional captions. Premium includes everything plus custom intro/outro creation and advanced effects.'
  },
  {
    question: 'How do I upload my footage?',
    answer: 'After booking, we\'ll provide you with a secure upload link where you can share your raw footage. We support files up to 50GB and provide detailed instructions for the upload process.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. Payment is required upfront to begin the editing process, and we provide detailed invoices for all transactions.'
  },
  {
    question: 'How do I know the quality will be good?',
    answer: 'We work with pre-vetted professional editors and review every project before delivery. Plus, one revision is included to ensure it meets your standards.'
  },
  {
    question: 'What if you miss the 36-hour deadline?',
    answer: 'Full refund, no questions asked. We guarantee delivery time.'
  },
  {
    question: 'Do you work with my industry?',
    answer: 'Yes! We match projects with editors who specialize in your content type and industry.'
  }
];

export function FAQSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('custom-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about our video editing services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Reserve Your Spot Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            onClick={scrollToForm}
          >
            Reserve Your Spot
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
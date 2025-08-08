import api from './api';

// Description: Submit contact form
// Endpoint: POST /api/contact
// Request: { name: string, email: string, message: string }
// Response: { success: boolean, message: string }
export const submitContactForm = (data: { name: string; email: string; message: string }) => {
  console.log('Submitting contact form:', data);
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Contact form submitted successfully' });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/contact', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get testimonials
// Endpoint: GET /api/testimonials
// Request: {}
// Response: { testimonials: Array<{ name: string, review: string, rating: number, avatar: string }> }
export const getTestimonials = () => {
  console.log('Fetching testimonials');
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        testimonials: [
          {
            name: 'Alex G.',
            review: 'Amazing 36-hour turnaround! My gaming videos look incredible now.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          {
            name: 'Sarah M.',
            review: 'Professional quality that doubled my subscriber growth!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          },
          {
            name: 'Mike T.',
            review: 'Best investment I\'ve made for my YouTube channel.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/testimonials');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get pricing plans
// Endpoint: GET /api/pricing
// Request: {}
// Response: { plans: Array<{ id: string, name: string, originalPrice: number, currentPrice: number, features: string[], duration: string }> }
export const getPricingPlans = () => {
  console.log('Fetching pricing plans');
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plans: [
          {
            id: 'basic',
            name: 'Basic',
            originalPrice: 110,
            currentPrice: 90,
            duration: '1 to 5 minutes runtime',
            features: [
              'Clean cuts & professional pacing',
              'Captions & basic color correction',
              '36-hour delivery',
              'Upload up to 15 minutes (your footage)',
              '1 revision included'
            ]
          },
          {
            id: 'pro',
            name: 'Pro',
            originalPrice: 145,
            currentPrice: 120,
            duration: '6 to 10 minutes runtime',
            features: [
              'Everything in Basic +',
              'Motion graphics & transitions',
              'Advanced color grading',
              'Platform optimization',
              'Upload up to 30 minutes (your footage)'
            ]
          },
          {
            id: 'premium',
            name: 'Premium',
            originalPrice: 180,
            currentPrice: 150,
            duration: '11 to 15 minutes runtime',
            features: [
              'Everything in Pro +',
              'More revisions so you can get your project right',
              'Priority support'
            ]
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/pricing');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};
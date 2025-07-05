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
            review: 'Amazing 24-hour turnaround! My gaming videos look incredible now.',
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
            duration: '5 minutes',
            features: [
              'Basic editing',
              '1 revision included',
              '24-hour delivery',
              'Color correction'
            ]
          },
          {
            id: 'pro',
            name: 'Pro',
            originalPrice: 145,
            currentPrice: 120,
            duration: '10 minutes',
            features: [
              'Motion graphics',
              'Color grading',
              '1 revision included',
              '24-hour delivery',
              'Professional captions'
            ]
          },
          {
            id: 'premium',
            name: 'Premium',
            originalPrice: 180,
            currentPrice: 150,
            duration: '15 minutes',
            features: [
              'Motion graphics',
              'Color grading',
              'Custom intro/outro',
              '1 revision included',
              '24-hour delivery',
              'Professional captions'
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
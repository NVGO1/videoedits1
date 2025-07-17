import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';

const ThankYouPage = () => {
  const location = useLocation();
  const [paypalLink, setPaypalLink] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paypal = params.get('paypal');
    if (paypal) {
      setPaypalLink(decodeURIComponent(paypal));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-xl text-center max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-primary">Thank You!</h1>
        <p className="text-lg text-muted-foreground">
          Your request has been successfully submitted.
        </p>
        {paypalLink ? (
          <div className="space-y-4">
            <p className="text-md text-muted-foreground">
              Please complete your payment to finalize your order.
            </p>
            <Button asChild size="lg" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <a href={paypalLink} target="_blank" rel="noopener noreferrer">Proceed to Payment</a>
            </Button>
          </div>
        ) : (
          <p className="text-md text-muted-foreground">
            We will be in touch shortly regarding your order.
          </p>
        )}
        <Button variant="outline" asChild className="w-full">
          <a href="/">Return to Homepage</a>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;

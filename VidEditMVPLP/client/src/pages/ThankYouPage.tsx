import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const paypalLink = params.get('paypal');

  useEffect(() => {
    if (paypalLink) {
      const paypalFrame = document.getElementById('paypalFrame') as HTMLIFrameElement;
      if (paypalFrame) {
        paypalFrame.src = decodeURIComponent(paypalLink);
      }
    }
  }, [paypalLink]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Thank You for Your Order!</h2>
      <p>Please complete your payment below to start the 24-hour editing process.</p>
      <iframe
        id="paypalFrame"
        title="PayPal Payment"
        width="100%"
        height="600"
        frameBorder="0"
        style={{ border: 'none' }}
      ></iframe>
      <p>If the payment doesn’t load, <a href={paypalLink ? decodeURIComponent(paypalLink) : '#'} target="_blank" rel="noopener noreferrer">click here</a>.</p>
    </div>
  );
};

export default ThankYouPage;
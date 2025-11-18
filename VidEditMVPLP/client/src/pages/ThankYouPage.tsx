import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const [paypalLink, setPaypalLink] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paypal = params.get('paypal');
    const name = params.get('name');
    const orderAmount = params.get('amount');

    if (paypal) setPaypalLink(decodeURIComponent(paypal));
    if (name) setCustomerName(decodeURIComponent(name));
    if (orderAmount) setAmount(orderAmount);
  }, [location]);

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#007cba', marginBottom: '20px' }}>
        Thank You{customerName ? `, ${customerName}` : ''}! 🎉
      </h1>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>
          Your NVGO Video Edit Request Has Been Received!
        </h2>

        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
          {amount && `Order Total: $${amount}`}
        </p>

        <p style={{ color: '#666', marginBottom: '25px' }}>
          To complete your order and start the 36-hour editing process,
          please complete your payment below:
        </p>

        {paypalLink ? (
          <div>
            <iframe
              src={paypalLink}
              width="100%"
              height="650"
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '20px',
                minHeight: '650px'
              }}
              title="PayPal Payment"
              allow="payment"
            />

            <p style={{ fontSize: '14px', color: '#888' }}>
              Having trouble with the payment form above?{' '}
              <a
                href={paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007cba' }}
              >
                Click here to pay directly
              </a>
            </p>
          </div>
        ) : (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px'
          }}>
            <p style={{ color: '#856404', margin: 0 }}>
              Payment link is being generated. Please refresh the page in a moment.
            </p>
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: '#e8f4f8',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#007cba', marginBottom: '15px' }}>
          What Happens Next?
        </h3>

        <ol style={{ color: '#666', lineHeight: '1.6' }}>
          <li><strong>Payment Confirmation:</strong> Once payment is received, you'll get an email confirmation</li>
          <li><strong>Project Assignment:</strong> Your project will be assigned to our editing team soon</li>
          <li><strong>36-Hour Delivery:</strong> Your edited video will be delivered within 36 hours of payment</li>
          <li><strong>Revisions:</strong> One round of revisions is included if needed</li>
        </ol>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, color: '#155724' }}>
            <strong>Questions?</strong> Email us at{' '}
            <a href="mailto:support@letsnvgo.com" style={{ color: '#155724' }}>
              support@letsnvgo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
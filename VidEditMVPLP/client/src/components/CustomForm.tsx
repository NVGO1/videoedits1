import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  videoLength: string;
  contentType: string;
  keyFeatures: string;
  projectDetails: string;
  uploadLink: string;
}

const CustomForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    videoLength: '',
    contentType: '',
    keyFeatures: '',
    projectDetails: '',
    uploadLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Calculate amount for PayPal link
      const priceMap = {
        '5 min': 90,
        '10 min': 120,
        '15 min': 150
      };
      const amount = priceMap[formData.videoLength as keyof typeof priceMap] || 90;
      
      // Generate PayPal link
      const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=support@letsnvgo.com&amount=${amount}&item_name=NVGO ${formData.videoLength} Edit&custom=${formData.email}&return=https://letsnvgo.com/thankyou`;
      
      // Submit form to both Netlify Forms AND our function
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      
      // Add the form-name field to ensure Netlify processes it correctly
      formDataObj.append('form-name', 'nvgo-order');
      
      // Submit to Netlify Forms first (for dashboard)
      await fetch('/', {
        method: 'POST',
        body: formDataObj
      });
      
      // Then submit to our function for Google Sheets
      const response = await fetch('/.netlify/functions/nvgo-order-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_name: 'nvgo-order',
          data: {
            name: formData.name,
            email: formData.email,
            videoLength: formData.videoLength,
            contentType: formData.contentType,
            keyFeatures: formData.keyFeatures,
            projectDetails: formData.projectDetails,
            uploadLink: formData.uploadLink
          }
        })
      });
      
      if (response.ok) {
        // Redirect to thank you page with PayPal link
        window.location.href = `/thankyou?paypal=${encodeURIComponent(paypalLink)}&name=${encodeURIComponent(formData.name)}&amount=${amount}`;
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  // Common input styles with proper contrast for both light and dark modes
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    border: '2px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box' as const,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontWeight: '600',
    color: 'inherit', // This will inherit the text color from the parent theme
    fontSize: '14px'
  };

  const containerStyle = {
    marginBottom: '20px'
  };

  const smallTextStyle = {
    color: 'rgba(156, 163, 175, 0.8)', // Semi-transparent gray that works in both modes
    fontSize: '12px',
    display: 'block' as const,
    marginTop: '4px'
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: 'inherit', marginBottom: '30px', textAlign: 'center' }}>
        NVGO Video Editing Request
      </h2>
      <form 
        name="nvgo-order" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {/* Hidden field required for Netlify Forms */}
        <input type="hidden" name="form-name" value="nvgo-order" />
        {/* Honeypot field for spam protection */}
        <input type="hidden" name="bot-field" />
        
        <div style={containerStyle}>
          <label htmlFor="name" style={labelStyle}>Name *</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            style={{
              ...inputStyle,
              ':focus': { borderColor: '#007cba', outline: 'none' }
            }}
          />
        </div>

        <div style={containerStyle}>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            style={inputStyle}
          />
        </div>

        <div style={containerStyle}>
          <label htmlFor="videoLength" style={labelStyle}>Video Length *</label>
          <select 
            id="videoLength"
            name="videoLength" 
            value={formData.videoLength}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ color: '#999' }}>Select video length</option>
            <option value="5 min" style={{ color: '#333' }}>5 min ($90)</option>
            <option value="10 min" style={{ color: '#333' }}>10 min ($120)</option>
            <option value="15 min" style={{ color: '#333' }}>15 min ($150)</option>
          </select>
        </div>

        <div style={containerStyle}>
          <label htmlFor="contentType" style={labelStyle}>Content Type</label>
          <input 
            type="text" 
            id="contentType"
            name="contentType" 
            value={formData.contentType}
            onChange={handleChange}
            placeholder="e.g., Tutorial, Vlog, Product Demo"
            style={inputStyle}
          />
        </div>

        <div style={containerStyle}>
          <label htmlFor="keyFeatures" style={labelStyle}>Key Features Needed</label>
          <input 
            type="text" 
            id="keyFeatures"
            name="keyFeatures" 
            value={formData.keyFeatures}
            onChange={handleChange}
            placeholder="e.g., Transitions, Text overlays, Music"
            style={inputStyle}
          />
        </div>

        <div style={containerStyle}>
          <label htmlFor="projectDetails" style={labelStyle}>Project Details</label>
          <textarea 
            id="projectDetails"
            name="projectDetails" 
            value={formData.projectDetails}
            onChange={handleChange}
            placeholder="Describe your vision, style preferences, target audience, etc."
            rows={4}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '100px'
            }}
          />
        </div>

        <div style={containerStyle}>
          <label htmlFor="footage" style={labelStyle}>Upload Footage (Max 100MB)</label>
          <input 
            type="file" 
            id="footage"
            name="footage" 
            accept="video/*"
            style={{
              ...inputStyle,
              paddingTop: '8px',
              paddingBottom: '8px'
            }}
          />
          <small style={smallTextStyle}>
            For files larger than 100MB, use the link field below
          </small>
        </div>

        <div style={containerStyle}>
          <label htmlFor="uploadLink" style={labelStyle}>Or Paste Upload Link</label>
          <input 
            type="url" 
            id="uploadLink"
            name="uploadLink" 
            value={formData.uploadLink}
            onChange={handleChange}
            placeholder="WeTransfer, Google Drive, Dropbox link, etc."
            style={inputStyle}
          />
          <small style={smallTextStyle}>
            Or email large files to support@letsnvgo.com with your name and email
          </small>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            width: '100%',
            padding: '16px 24px', 
            backgroundColor: isSubmitting ? '#94a3b8' : '#007cba', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            marginTop: '10px'
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#007cba';
            }
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit & Pay →'}
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
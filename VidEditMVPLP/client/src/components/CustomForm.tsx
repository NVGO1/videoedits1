import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  videoLength: string;
  contentType: string;
  keyFeatures: string[];
  projectDetails: string;
  uploadLink: string;
}

const CustomForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    videoLength: '',
    contentType: '',
    keyFeatures: [],
    projectDetails: '',
    uploadLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (feature: string) => {
    setFormData(prev => {
      let newFeatures = [...prev.keyFeatures];

      if (feature === 'All') {
        // If "All" is selected, select all options or deselect all
        if (newFeatures.includes('All')) {
          newFeatures = [];
        } else {
          newFeatures = ['Captions', 'Motion Graphics', 'Color Grading', 'All'];
        }
      } else {
        // Handle individual selections
        if (newFeatures.includes(feature)) {
          newFeatures = newFeatures.filter(f => f !== feature);
          // Remove "All" if it was selected and we're deselecting something
          newFeatures = newFeatures.filter(f => f !== 'All');
        } else {
          newFeatures.push(feature);
          // Check if all individual options are selected, then add "All"
          const individualOptions = ['Captions', 'Motion Graphics', 'Color Grading'];
          if (individualOptions.every(option => newFeatures.includes(option))) {
            newFeatures.push('All');
          }
        }
      }

      return {
        ...prev,
        keyFeatures: newFeatures
      };
    });

    // Clear error when user selects features
    if (errors.keyFeatures) {
      setErrors(prev => ({
        ...prev,
        keyFeatures: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.videoLength) {
      newErrors.videoLength = 'Please select a video length';
    }

    if (!formData.contentType) {
      newErrors.contentType = 'Please select a content type';
    }

    if (formData.keyFeatures.length === 0) {
      newErrors.keyFeatures = 'Please select at least one key feature';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required';
    }

    if (!formData.uploadLink.trim()) {
      newErrors.uploadLink = 'Upload link is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate amount for PayPal link
      const priceMap = {
        'Basic - 1 to 5 min runtime': 90,
        'Pro - 6 to 10 min runtime': 120,
        'Premium - 11 to 15 min runtime': 150
      };
      const amount = priceMap[formData.videoLength as keyof typeof priceMap] || 90;

      // Generate PayPal link
      const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=support@letsnvgo.com&amount=${amount}&item_name=NVGO ${formData.videoLength} Edit&custom=${formData.email}&return=https://letsnvgo.com/thankyou`;

      // First, submit to Netlify Forms using fetch with form-encoded data
      const formBody = new URLSearchParams();
      formBody.append('form-name', 'nvgo-order');
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('videoLength', formData.videoLength);
      formBody.append('contentType', formData.contentType);
      formBody.append('keyFeatures', formData.keyFeatures.join(', '));
      formBody.append('projectDetails', formData.projectDetails);
      formBody.append('uploadLink', formData.uploadLink);

      // Submit to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      // Then submit to our function for Google Sheets
      await fetch('/.netlify/functions/submitOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          videoLength: formData.videoLength,
          contentType: formData.contentType,
          keyFeatures: formData.keyFeatures.join(', '),
          projectDetails: formData.projectDetails,
          uploadLink: formData.uploadLink,
          paypalAmount: amount,
          paypalName: formData.name
        })
      });

      // Redirect to thank you page with PayPal link
      window.location.href = `/thankyou?paypal=${encodeURIComponent(paypalLink)}&name=${encodeURIComponent(formData.name)}&amount=${amount}`;

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

  const errorStyle = {
    color: '#dc2626', // Red color for errors
    fontSize: '12px',
    display: 'block' as const,
    marginTop: '4px',
    fontWeight: '500'
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <form
        name="nvgo-order"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Hidden field required for Netlify Forms */}
        <input type="hidden" name="form-name" value="nvgo-order" />
        {/* Honeypot field for spam protection */}
        <input type="hidden" name="bot-field" />
        {/* Hidden field for keyFeatures to submit to Netlify */}
        <input type="hidden" name="keyFeatures" value={formData.keyFeatures.join(', ')} />

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
              borderColor: errors.name ? '#dc2626' : '#d1d5db'
            }}
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
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
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#dc2626' : '#d1d5db'
            }}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
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
              borderColor: errors.videoLength ? '#dc2626' : '#d1d5db',
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ color: '#999' }}>Select video length</option>
            <option value="Basic - 1 to 5 min runtime" style={{ color: '#333' }}>Basic - 1 to 5 min runtime ($90)</option>
            <option value="Pro - 6 to 10 min runtime" style={{ color: '#333' }}>Pro - 6 to 10 min runtime ($120)</option>
            <option value="Premium - 11 to 15 min runtime" style={{ color: '#333' }}>Premium - 11 to 15 min runtime ($150)</option>
          </select>
          {errors.videoLength && <span style={errorStyle}>{errors.videoLength}</span>}
        </div>

        <div style={containerStyle}>
          <label style={labelStyle}>Content Type *</label>
          <div style={{ marginTop: '8px' }}>
            {['Business/Marketing Videos', 'Social Media Content', 'Educational/Course Content', 'Creator Content', 'Other'].map((type) => (
              <label key={type} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="radio"
                  name="contentType"
                  value={type}
                  checked={formData.contentType === type}
                  onChange={handleChange}
                  style={{
                    marginRight: '8px',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                {type}
              </label>
            ))}
          </div>
          {errors.contentType && <span style={errorStyle}>{errors.contentType}</span>}
        </div>

        <div style={containerStyle}>
          <label style={labelStyle}>Key Features Needed *</label>
          <div style={{ marginTop: '8px' }}>
            {['Captions', 'Motion Graphics', 'Color Grading', 'All'].map((feature) => (
              <label key={feature} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="checkbox"
                  checked={formData.keyFeatures.includes(feature)}
                  onChange={() => handleCheckboxChange(feature)}
                  style={{
                    marginRight: '8px',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                {feature}
              </label>
            ))}
          </div>
          {errors.keyFeatures && <span style={errorStyle}>{errors.keyFeatures}</span>}
        </div>

        <div style={containerStyle}>
          <label htmlFor="projectDetails" style={labelStyle}>Project Details *</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            required
            placeholder="Describe your vision, style preferences, target audience, etc."
            rows={4}
            style={{
              ...inputStyle,
              borderColor: errors.projectDetails ? '#dc2626' : '#d1d5db',
              resize: 'vertical',
              minHeight: '100px'
            }}
          />
          {errors.projectDetails && <span style={errorStyle}>{errors.projectDetails}</span>}
        </div>

        <div style={containerStyle}>
          <label htmlFor="uploadLink" style={labelStyle}>Upload Link *</label>
          <input
            type="text"
            id="uploadLink"
            name="uploadLink"
            value={formData.uploadLink}
            onChange={handleChange}
            placeholder="Paste your file sharing link or type 'Email' if sending files via email"
            style={{
              ...inputStyle,
              borderColor: errors.uploadLink ? '#dc2626' : '#d1d5db'
            }}
          />
          <small style={smallTextStyle}>
            Please provide a link from{' '}
            <a href="https://wetransfer.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>WeTransfer</a>,{' '}
            <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Google Drive</a>,{' '}
            <a href="https://www.dropbox.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Dropbox</a>, etc. 
            Or type "Email" in the field above and send files to{' '}
            <a href="mailto:support@letsnvgo.com?subject=NVGO Video Files" style={{ color: '#3b82f6', textDecoration: 'underline' }}>support@letsnvgo.com</a>{' '}
            with your name and email.
          </small>
          {errors.uploadLink && <span style={errorStyle}>{errors.uploadLink}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: isSubmitting ? '#94a3b8' : 'linear-gradient(to right, #facc15, #f97316)',
            color: isSubmitting ? 'white' : '#000000',
            border: 'none',
            borderRadius: '9999px', // Rounded-full like the hero button
            fontSize: '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease, transform 0.3s ease',
            marginTop: '10px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.background = 'linear-gradient(to right, #eab308, #ea580c)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.background = 'linear-gradient(to right, #facc15, #f97316)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Secure My Spot →'}
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
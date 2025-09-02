const { google } = require('googleapis');

exports.handler = async (event, context) => {
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let formData;
    let fileUploadInfo = '';
    
    console.log('Event body type:', typeof event.body);
    console.log('Content-Type:', event.headers['content-type']);
    console.log('Raw event body (first 500 chars):', event.body?.substring(0, 500));
    
    // Parse form data from URL-encoded body (Netlify processes multipart and converts to URL-encoded)
    const body = new URLSearchParams(event.body);
    formData = Object.fromEntries(body);
    
    console.log('Parsed form data:', formData);
    console.log('All form data keys:', Object.keys(formData));
    
    // Check for file uploads - Netlify converts file uploads to URLs in the form data
    if (formData.footage && formData.footage !== '') {
      fileUploadInfo = `Netlify file upload: ${formData.footage}`;
      console.log('File upload detected:', formData.footage);
    } else if (formData.uploadLink && formData.uploadLink !== '') {
      fileUploadInfo = formData.uploadLink;
      console.log('Upload link provided:', formData.uploadLink);
    } else {
      fileUploadInfo = 'No upload provided';
      console.log('No file upload or link provided');
      console.log('footage value:', formData.footage);
      console.log('uploadLink value:', formData.uploadLink);
    }
    
    console.log('Form submission received:', formData);

    const { name, email, videoLength, contentType: contentTypeField, keyFeatures, projectDetails, uploadLink, source } = formData;
    
    // If this is from our custom form, we know files were submitted to Netlify Forms separately
    if (source === 'custom-form') {
      fileUploadInfo = uploadLink || 'Files uploaded via Netlify Forms (check dashboard)';
      console.log('Custom form submission - files handled by Netlify Forms');
    }

    // Calculate amount based on video length
    const priceMap = {
      'Basic - 1 to 5 min runtime': 90,
      'Pro - 6 to 10 min runtime': 120,
      'Premium - 11 to 15 min runtime': 150
    };
    
    const amount = priceMap[videoLength] || 90;
    console.log('Video length received:', videoLength);
    console.log('Amount calculated:', amount);

    // Generate PayPal link
    const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${process.env.PAYPAL_BUSINESS_EMAIL || 'support@letsnvgo.com'}&amount=${amount}&item_name=NVGO ${videoLength} Edit&custom=${email}&return=https://letsnvgo.com/thankyou`;

    // Write to Google Sheets if credentials are available
    console.log('Checking Google Sheets credentials...');
    console.log('GOOGLE_SA exists:', !!process.env.GOOGLE_SA);
    console.log('SHEET_ID exists:', !!process.env.SHEET_ID);
    console.log('SHEET_ID value:', process.env.SHEET_ID);
    
    if (process.env.GOOGLE_SA && process.env.SHEET_ID) {
      try {
        console.log('Attempting to parse service account credentials...');
        // Parse the service account key
        const serviceAccount = JSON.parse(process.env.GOOGLE_SA);
        console.log('Service account parsed successfully');
        console.log('Service account email:', serviceAccount.client_email);
        
        // Set up Google Sheets authentication
        const auth = new google.auth.GoogleAuth({
          credentials: serviceAccount,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        console.log('Setting up Google Sheets client...');
        const sheets = google.sheets({ version: 'v4', auth });

        console.log('Attempting to write to Google Sheets...');
        console.log('Sheet ID:', process.env.SHEET_ID);
        console.log('Data to write:', [
          new Date().toISOString(),
          name,
          email,
          videoLength,
          contentType || '',
          keyFeatures || '',
          projectDetails || '',
          uploadLink || '',
          'Payment Pending'
        ]);

        // Use the file upload info we determined earlier
        
        // Append row to sheet
        const result = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SHEET_ID,
          range: 'Responses!A:I',
          valueInputOption: 'RAW',
          resource: {
            values: [[
              new Date().toISOString(),
              name,
              email,
              videoLength,
              contentTypeField || '',
              keyFeatures || '',
              projectDetails || '',
              fileUploadInfo,
              'Payment Pending'
            ]]
          },
        });

        console.log('Successfully wrote to Google Sheets');
        console.log('Sheets API response:', result.status);
      } catch (sheetsError) {
        console.error('Google Sheets error details:');
        console.error('Error message:', sheetsError.message);
        console.error('Error code:', sheetsError.code);
        console.error('Full error:', sheetsError);
        // Continue even if sheets fails - don't block the user
      }
    } else {
      console.log('Google Sheets credentials not configured:');
      console.log('- GOOGLE_SA missing:', !process.env.GOOGLE_SA);
      console.log('- SHEET_ID missing:', !process.env.SHEET_ID);
    }

    // Redirect to thank you page with PayPal link
    return {
      statusCode: 302,
      headers: {
        Location: `/thankyou?paypal=${encodeURIComponent(paypalLink)}&name=${encodeURIComponent(name)}&amount=${amount}`
      }
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
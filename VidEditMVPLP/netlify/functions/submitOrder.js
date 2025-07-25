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
    // Parse form data
    const body = new URLSearchParams(event.body);
    const formData = Object.fromEntries(body);
    
    console.log('Form submission received:', formData);

    const { name, email, videoLength, contentType, keyFeatures, projectDetails, uploadLink } = formData;

    // Calculate amount based on video length
    const priceMap = {
      '5 min': 90,
      '10 min': 120,
      '15 min': 150
    };
    
    const amount = priceMap[videoLength] || 90;

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
              contentType || '',
              keyFeatures || '',
              projectDetails || '',
              uploadLink || '',
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
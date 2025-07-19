const { google } = require('googleapis');

exports.handler = async (event, context) => {
  console.log('=== NVGO-ORDER-SUBMISSION FUNCTION TRIGGERED ===');
  console.log('Event method:', event.httpMethod);
  console.log('Event body:', event.body);
  
  try {
    // Parse the submission data from Netlify
    const submission = JSON.parse(event.body);
    console.log('Parsed submission:', JSON.stringify(submission, null, 2));
    
    // Extract form data
    const formData = submission.data;
    console.log('Form data:', JSON.stringify(formData, null, 2));
    const { name, email, videoLength, contentType, keyFeatures, projectDetails, uploadLink } = formData;
    
    console.log('Form data extracted:', { name, email, videoLength });

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
        console.log('Service account project_id:', serviceAccount.project_id);
        console.log('Service account private_key_id:', serviceAccount.private_key_id);
        
        // Test if we can access the spreadsheet metadata first
        console.log('Testing spreadsheet access...');
        
        // Set up Google Sheets authentication using JWT
        const auth = new google.auth.JWT(
          serviceAccount.client_email,
          null,
          serviceAccount.private_key,
          ['https://www.googleapis.com/auth/spreadsheets']
        );

        console.log('Setting up Google Sheets client...');
        const sheets = google.sheets({ version: 'v4', auth });

        // First, try to get spreadsheet metadata to verify access
        console.log('Testing basic spreadsheet access...');
        try {
          const metadata = await sheets.spreadsheets.get({
            spreadsheetId: process.env.SHEET_ID
          });
          console.log('✅ Successfully accessed spreadsheet metadata');
          console.log('Spreadsheet title:', metadata.data.properties.title);
          console.log('Available sheets:', metadata.data.sheets.map(sheet => sheet.properties.title));
        } catch (metadataError) {
          console.error('❌ Failed to access spreadsheet metadata:', metadataError.message);
          throw metadataError;
        }

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
      }
    } else {
      console.log('Google Sheets credentials not configured:');
      console.log('- GOOGLE_SA missing:', !process.env.GOOGLE_SA);
      console.log('- SHEET_ID missing:', !process.env.SHEET_ID);
    }

    console.log('Function completed successfully');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'NVGO order processed successfully'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
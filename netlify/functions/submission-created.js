const { google } = require('googleapis');

exports.handler = async (event) => {
  // Netlify automatically parses the submission body for this event type
  const { payload } = JSON.parse(event.body);
  const { data } = payload;
  
  const { name, email, videoLength, contentType, keyFeatures, projectDetails, uploadLink } = data;

  // Append to Google Sheet
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SA),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Responses!A:H', // Ensure this matches your sheet's columns
      valueInputOption: 'RAW',
      resource: { 
        values: [[
          new Date().toISOString(), 
          name, 
          email, 
          videoLength, 
          contentType, 
          keyFeatures, 
          projectDetails, 
          uploadLink || '' // Ensure uploadLink is not undefined
        ]] 
      },
    });

    return {
      statusCode: 200,
      body: 'Data successfully sent to Google Sheet.',
    };

  } catch (error) {
    console.error('Google Sheets API Error:', error.message);
    return {
      statusCode: 500,
      body: `Error processing submission: ${error.message}`,
    };
  }
};

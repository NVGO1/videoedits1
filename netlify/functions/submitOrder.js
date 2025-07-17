const { google } = require('googleapis');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const body = new URLSearchParams(event.body);
  const { name, email, videoLength, contentType, keyFeatures, projectDetails, uploadLink } = Object.fromEntries(body);
  const amount = { 'Up to 5 minutes - ($90)': 90, 'Up to 10 minutes - ($120)': 120, 'Up to 15 minutes - ($150)': 150 }[videoLength];
  const paypal = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=pay@letsnvgo.com&amount=${amount}&item_name=NVGO ${videoLength} Edit&custom=${email}`;

  // Append to Google Sheet
  // Ensure your GOOGLE_SA environment variable is properly set with the JSON key content
  // And your SHEET_ID is set to the correct Google Sheet ID
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SA),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Responses!A:H', // Adjusted range for new fields
      valueInputOption: 'RAW',
      resource: { values: [[new Date().toISOString(), name, email, videoLength, contentType, keyFeatures, projectDetails, uploadLink]] },
    });
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    // You might want to handle this error more gracefully, e.g., send an email notification
  }

  return {
    statusCode: 302,
    headers: { Location: `/thankyou?paypal=${encodeURIComponent(paypal)}` },
  };
};

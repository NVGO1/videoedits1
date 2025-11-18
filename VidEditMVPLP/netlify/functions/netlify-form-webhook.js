const { google } = require("googleapis");

exports.handler = async (event, context) => {
  // Only handle POST requests from Netlify webhooks
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log("Webhook received from Netlify Forms");
    console.log("Headers:", event.headers);
    
    // Parse the webhook payload
    const webhookData = JSON.parse(event.body);
    console.log("Webhook data:", JSON.stringify(webhookData, null, 2));

    // Extract form data
    const formData = webhookData.data || {};
    const attachments = webhookData.attachments || [];
    
    console.log("Form data:", formData);
    console.log("Attachments:", attachments);

    // Only process nvgo-order forms
    if (formData['form-name'] !== 'nvgo-order') {
      console.log("Ignoring non-nvgo-order form");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Form ignored" }),
      };
    }

    // Extract form fields
    const {
      name,
      email,
      videoLength,
      contentType,
      keyFeatures,
      projectDetails,
      uploadLink,
    } = formData;

    // Process file attachments to create file info
    let fileUploadInfo = "";
    if (attachments && attachments.length > 0) {
      const fileList = attachments.map(att => `${att.filename} (${att.url})`).join(', ');
      fileUploadInfo = `Files uploaded: ${fileList}`;
      console.log("File upload info:", fileUploadInfo);
    } else if (uploadLink && uploadLink.trim()) {
      fileUploadInfo = `Upload link: ${uploadLink}`;
    } else {
      fileUploadInfo = "No upload provided";
    }

    // Write to Google Sheets if credentials are available
    console.log("Checking Google Sheets credentials...");
    if (process.env.GOOGLE_SA && process.env.SHEET_ID) {
      try {
        console.log("Setting up Google Sheets...");
        const serviceAccount = JSON.parse(process.env.GOOGLE_SA);
        
        const auth = new google.auth.GoogleAuth({
          credentials: serviceAccount,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        console.log("Writing to Google Sheets...");
        const result = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SHEET_ID,
          range: "Responses!A:I",
          valueInputOption: "RAW",
          resource: {
            values: [
              [
                new Date().toISOString(),
                name || "",
                email || "",
                videoLength || "",
                contentType || "",
                keyFeatures || "",
                projectDetails || "",
                fileUploadInfo,
                "Payment Pending",
              ],
            ],
          },
        });

        console.log("Successfully wrote to Google Sheets:", result.status);
      } catch (sheetsError) {
        console.error("Google Sheets error:", sheetsError);
      }
    } else {
      console.log("Google Sheets credentials not configured");
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
      }),
    };
  } catch (error) {
    console.error("Webhook processing error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};
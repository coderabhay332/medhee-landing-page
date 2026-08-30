/**
 * Medhee — Waitlist Google Apps Script
 * =====================================
 * Deploy this as a Google Apps Script Web App to collect waitlist signups
 * directly into a Google Sheet.
 *
 * SETUP (one-time, ~3 minutes):
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this entire file, replacing the default code.
 * 3. Update SHEET_ID below with your Google Sheet ID
 *    (from the sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
 * 4. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorize when prompted, then copy the Web App URL
 * 6. Paste that URL into VITE_SHEETS_WEBHOOK in your .env file
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // ← replace this
const SHEET_NAME = 'Waitlist';            // tab name (will be created if missing)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + header row if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.source || 'landing-page',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test via GET in browser to verify deployment
function doGet() {
  return ContentService
    .createTextOutput('Medhee waitlist endpoint is live ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}

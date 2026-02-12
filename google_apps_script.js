/**
 * Google Apps Script for handling contact form submissions
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code and save.
 * 4. Deploy > New Deployment.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'.
 * 7. Copy the Web App URL and provide it to Antigravity.
 */

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents);

        // Append headers if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
        }

        sheet.appendRow([
            new Date(),
            data.name,
            data.email,
            data.message
        ]);

        return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

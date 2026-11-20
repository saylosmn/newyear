function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("NEWYEAR_FORM_SECRET");
    if (!expectedSecret || body.secret !== expectedSecret) {
      return json({ ok: false, error: "Unauthorized" });
    }

    const registration = body.registration || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const headers = ["Илгээсэн огноо", "Овог, нэр", "Санал, хүсэлт", "Арга хэмжээний санал", "Уух зүйлийн санал"];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    } else {
      const width = Math.max(sheet.getLastColumn(), 1);
      const currentHeaders = sheet.getRange(1, 1, 1, width).getValues()[0].map(String);
      if (!currentHeaders[0].trim()) currentHeaders[0] = "Илгээсэн огноо";
      const oldVoteColumn = currentHeaders.indexOf("Санал өгсөн сонголтууд");
      if (oldVoteColumn >= 0) currentHeaders[oldVoteColumn] = "Арга хэмжээний санал";
      headers.forEach((header) => {
        if (!currentHeaders.includes(header)) currentHeaders.push(header);
      });
      sheet.getRange(1, 1, 1, currentHeaders.length).setValues([currentHeaders]);
      sheet.setFrozenRows(1);
    }
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
    const row = {
      "Илгээсэн огноо": new Date(),
      "Овог, нэр": safeCell(registration.name, 120),
      "Санал, хүсэлт": safeCell(registration.feedback, 2000),
      "Арга хэмжээний санал": safeCell(Array.isArray(registration.locationVotes) ? registration.locationVotes.map(String).slice(0, 3).join("; ") : "", 250),
      "Уух зүйлийн санал": safeCell(Array.isArray(registration.drinkVotes) ? registration.drinkVotes.map(String).slice(0, 6).join("; ") : "", 300),
    };
    sheet.appendRow(currentHeaders.map((header) => row[header] || ""));
    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: "Could not save registration" });
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value, maxLength) {
  const text = String(value || "").slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

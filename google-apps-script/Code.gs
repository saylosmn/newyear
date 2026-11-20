function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("NEWYEAR_FORM_SECRET");
    if (!expectedSecret || body.secret !== expectedSecret) {
      return json({ ok: false, error: "Unauthorized" });
    }

    const registration = body.registration || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Илгээсэн огноо", "Овог, нэр", "Санал, хүсэлт", "Санал өгсөн сонголтууд"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      safeCell(registration.name, 120),
      safeCell(registration.feedback, 2000),
      safeCell(Array.isArray(registration.votes) ? registration.votes.map(String).slice(0, 3).join("; ") : "", 200),
    ]);
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

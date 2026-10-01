/** MC-App-Almara — Database Layer
 * Canonical 44-sheet schema is maintained here.
 * Business modules must access Sheets through this layer.
 */

function getDatabase_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Spreadsheet aktif tidak ditemukan.');
  return ss;
}

function getSheet_(name) {
  const sh = getDatabase_().getSheetByName(name);
  if (!sh) throw new Error('Sheet database tidak ditemukan: ' + name);
  return sh;
}

function getTableData_(name) {
  const sh = getSheet_(name);
  return sh.getDataRange().getValues();
}

function appendRecord_(name, record) {
  const sh = getSheet_(name);
  sh.appendRow(record);
  return sh.getLastRow();
}

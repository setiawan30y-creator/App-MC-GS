/** MC-App-Almara — Shared utilities */
function now_() {
  return new Date();
}

function formatDate_(date, pattern) {
  return Utilities.formatDate(
    date instanceof Date ? date : new Date(date),
    MC_CONFIG.TIMEZONE,
    pattern || 'yyyy-MM-dd HH:mm:ss'
  );
}

function generateId_(prefix) {
  return prefix + '-' + Utilities.getUuid();
}

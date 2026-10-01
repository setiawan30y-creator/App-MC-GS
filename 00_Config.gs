/** MC-App-Almara — Core Configuration */
const MC_CONFIG = {
  APP_NAME: 'MC-App-Almara',
  COMPANY_NAME: 'PT ALMARA PUTRA VALASINDO',
  VERSION: '2.0.0',
  TIMEZONE: 'Asia/Jakarta',
  DATE_FORMAT: 'dd MMM yyyy',
  INVOICE_PREFIX: 'APV'
};

function getConfig() {
  return {
    appName: MC_CONFIG.APP_NAME,
    companyName: MC_CONFIG.COMPANY_NAME,
    version: MC_CONFIG.VERSION,
    timezone: MC_CONFIG.TIMEZONE
  };
}

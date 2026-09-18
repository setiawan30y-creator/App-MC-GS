/**

* MC-App-Almara
* WEB APPLICATION CONTROLLER
*
* File: 02_WebApp.gs
*
* Menangani tampilan utama Web App.
  */

function renderApp_() {
return HtmlService
.createTemplateFromFile('Index')
.evaluate()
.setTitle(APP_CONFIG.APP_NAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**

* Memanggil file HTML pendukung.
*
* Contoh:
* <?!= include_('CSS'); ?>

*/
function include_(filename) {
return HtmlService
.createHtmlOutputFromFile(filename)
.getContent();
}

/**

* Data dasar aplikasi untuk frontend.
  */
  function getWebAppData() {
  return {
  appName: APP_CONFIG.APP_NAME,
  companyName: APP_CONFIG.COMPANY_NAME,
  version: APP_CONFIG.VERSION,
  timezone: APP_CONFIG.TIMEZONE,
  dateFormat: APP_CONFIG.DATE_FORMAT,
  businessHours: '10:00-20:30',
  permit: '27/17/KEP.GBI/SR/2025'
  };
  }

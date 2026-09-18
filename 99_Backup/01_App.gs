/**
 * MC-App-Almara
 * PT ALMARA PUTRA VALASINDO
 *
 * DATABASE INSTALLER & WEB ENTRY
 *
 * File ini berisi fungsi utama untuk:
 * - Membuat 44 sheet database
 * - Memastikan header sheet sesuai schema
 * - Mengisi setting awal
 * - Mengisi role awal
 * - Mengisi sequence nomor
 * - Mengisi daftar mata uang LKBU
 * - Informasi aplikasi
 * - Entry point Web App
 */


/**
 * ============================================================
 * SETUP DATABASE
 * ============================================================
 *
 * Jalankan satu kali dari Apps Script:
 *
 * setupDatabase()
 *
 * Fungsi hanya membuat sheet yang belum ada.
 * Sheet yang sudah ada tidak dihapus.
 * Data yang sudah ada juga tidak dihapus.
 */
function setupDatabase() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error('Spreadsheet aktif tidak ditemukan.');
  }

  let created = 0;
  let existing = 0;


  /**
   * ----------------------------------------------------------
   * Membuat seluruh sheet berdasarkan DATABASE_SCHEMA
   * ----------------------------------------------------------
   */
  Object.keys(DATABASE_SCHEMA).forEach(function(name) {

    const headers = DATABASE_SCHEMA[name].split(',');

    let sh = ss.getSheetByName(name);


    // Sheet belum ada → buat baru
    if (!sh) {

      sh = ss.insertSheet(name);

      sh.getRange(
        1,
        1,
        1,
        headers.length
      ).setValues([headers]);

      sh.setFrozenRows(1);

      sh.getRange(
        1,
        1,
        1,
        headers.length
      ).setFontWeight('bold');

      created++;

    }

    // Sheet sudah ada → pastikan header benar
    else {

      ensureHeaders_(sh, headers);

      existing++;

    }

  });


  /**
   * ----------------------------------------------------------
   * Seed / data awal
   * ----------------------------------------------------------
   */

  seedSettings_(ss);

  seedRoles_(ss);

  seedSequences_(ss);

  seedLkbuCurrencies_(ss);


  /**
   * ----------------------------------------------------------
   * Pastikan semua perubahan ditulis
   * ----------------------------------------------------------
   */

  SpreadsheetApp.flush();


  /**
   * ----------------------------------------------------------
   * Pesan hasil instalasi
   * ----------------------------------------------------------
   */

  const msg =
    'MC-App-Almara berhasil di-install. 44 sheet database siap. ' +
    created +
    ' sheet baru dibuat, ' +
    existing +
    ' sheet sudah ada.';


  Logger.log(msg);

  return msg;
}


/**
 * ============================================================
 * ENSURE HEADERS
 * ============================================================
 *
 * Memastikan header baris pertama sesuai DATABASE_SCHEMA.
 */
function ensureHeaders_(sh, headers) {

  /**
   * Jika sheet benar-benar kosong
   */
  if (sh.getLastRow() === 0) {

    sh.getRange(
      1,
      1,
      1,
      headers.length
    ).setValues([headers]);

    sh.setFrozenRows(1);

    return;
  }


  /**
   * Jika sheet sudah memiliki data,
   * periksa setiap header.
   */
  headers.forEach(function(h, i) {

    if (
      sh.getRange(1, i + 1).getValue() !== h
    ) {

      sh.getRange(
        1,
        i + 1
      ).setValue(h);

    }

  });


  sh.setFrozenRows(1);
}


/**
 * ============================================================
 * SEED SETTINGS
 * ============================================================
 *
 * Mengisi setting awal ke sheet:
 *
 * 01_settings
 */
function seedSettings_(ss) {

  const sh = ss.getSheetByName('01_settings');


  /**
   * Sheet tidak ditemukan
   */
  if (!sh) {
    return;
  }


  /**
   * Jika sudah ada data,
   * jangan overwrite.
   */
  if (sh.getLastRow() > 1) {
    return;
  }


  const now = new Date();


  const rows = DEFAULT_SETTINGS.map(function(x, i) {

    return [
      'SET-' + String(i + 1).padStart(3, '0'),
      x[0],
      x[1],
      x[2],
      x[3],
      x[4],
      'SYSTEM',
      now
    ];

  });


  sh.getRange(
    2,
    1,
    rows.length,
    8
  ).setValues(rows);
}


/**
 * ============================================================
 * SEED ROLES
 * ============================================================
 *
 * Mengisi role awal ke:
 *
 * 03_roles
 */
function seedRoles_(ss) {

  const sh = ss.getSheetByName('03_roles');


  /**
   * Sheet tidak ditemukan
   */
  if (!sh) {
    return;
  }


  /**
   * Jika sudah ada data,
   * jangan overwrite.
   */
  if (sh.getLastRow() > 1) {
    return;
  }


  const now = new Date();


  const rows = DEFAULT_ROLES.map(function(x) {

    return [
      x[0],
      x[1],
      x[2],
      x[3],
      now,
      now
    ];

  });


  sh.getRange(
    2,
    1,
    rows.length,
    6
  ).setValues(rows);
}


/**
 * ============================================================
 * SEED NUMBER SEQUENCES
 * ============================================================
 *
 * Mengisi sequence nomor awal ke:
 *
 * 15_number_sequences
 */
function seedSequences_(ss) {

  const sh = ss.getSheetByName(
    '15_number_sequences'
  );


  /**
   * Sheet tidak ditemukan
   */
  if (!sh) {
    return;
  }


  /**
   * Jika sudah ada data,
   * jangan overwrite.
   */
  if (sh.getLastRow() > 1) {
    return;
  }


  const now = new Date();


  /**
   * Format tanggal sequence:
   *
   * yyyyMMdd
   */
  const d = Utilities.formatDate(
    now,
    APP_CONFIG.TIMEZONE,
    'yyyyMMdd'
  );


  const rows = [

    [
      'SEQ-INVOICE',
      'INVOICE',
      d,
      0,
      APP_CONFIG.INVOICE_PREFIX,
      now
    ],

    [
      'SEQ-BOOKING',
      'BOOKING',
      d,
      0,
      'BOOK',
      now
    ],

    [
      'SEQ-CLOSING',
      'CLOSING',
      d,
      0,
      'CLS',
      now
    ],

    [
      'SEQ-GANTUNGAN',
      'GANTUNGAN',
      d,
      0,
      'GNT',
      now
    ]

  ];


  sh.getRange(
    2,
    1,
    rows.length,
    6
  ).setValues(rows);
}


/**
 * ============================================================
 * SEED LKBU CURRENCIES
 * ============================================================
 *
 * Mengisi 20 mata uang LKBU awal ke:
 *
 * BI_LKBU_KURS
 *
 * JPY menggunakan Basis_Kurs = 100.
 * Mata uang lainnya menggunakan Basis_Kurs = 1.
 */
function seedLkbuCurrencies_(ss) {

  const sh = ss.getSheetByName(
    'BI_LKBU_KURS'
  );


  /**
   * Sheet tidak ditemukan
   */
  if (!sh) {
    return;
  }


  /**
   * Jika sudah ada data,
   * jangan overwrite.
   */
  if (sh.getLastRow() > 1) {
    return;
  }


  const now = new Date();


  /**
   * Periode:
   *
   * yyyy-MM
   */
  const p = Utilities.formatDate(
    now,
    APP_CONFIG.TIMEZONE,
    'yyyy-MM'
  );


  const rows = LKBU_CURRENCIES.map(function(code) {

    return [

      'KURS-' + p + '-' + code,

      p,

      code,

      '',

      code === 'JPY'
        ? 100
        : 1,

      now,

      'SYSTEM',

      'MANUAL'

    ];

  });


  sh.getRange(
    2,
    1,
    rows.length,
    8
  ).setValues(rows);
}


/**
 * ============================================================
 * GET APP INFO
 * ============================================================
 *
 * Digunakan frontend untuk mendapatkan informasi aplikasi.
 */
function getAppInfo() {

  return {

    app: APP_CONFIG.APP_NAME,

    company: APP_CONFIG.COMPANY_NAME,

    version: APP_CONFIG.VERSION,

    timezone: APP_CONFIG.TIMEZONE

  };

}


/**
 * ============================================================
 * WEB APP ENTRY POINT
 * ============================================================
 *
 * Untuk sementara menampilkan halaman sederhana.
 *
 * Nanti akan kita ganti menjadi:
 *
 * Login → Dashboard → seluruh modul MC-App-Almara
 */
function doGet() {

  return HtmlService.createHtmlOutput(

    '<h1>' +
    APP_CONFIG.APP_NAME +
    '</h1>' +

    '<p>Backend Apps Script aktif.</p>'

  );

}
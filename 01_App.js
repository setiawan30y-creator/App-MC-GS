/**
 * MC-App-Almara — MASTER INSTALLER
 * PT ALMARA PUTRA VALASINDO
 *
 * Jalankan setupDatabase() sekali untuk membuat database 44 sheet.
 * Script hanya membuat sheet yang belum ada.
 */
const APP_CONFIG = {
  APP_NAME: 'MC-App-Almara',
  COMPANY_NAME: 'PT ALMARA PUTRA VALASINDO',
  VERSION: '1.0.0',
  TIMEZONE: 'Asia/Jakarta',
  DATE_FORMAT: 'dd MMM yyyy',
  INVOICE_PREFIX: 'APV',
  SMARTDEAL_URL: 'https://smartdeal.co.id/#rates'
};

const DATABASE_SCHEMA = {"01_settings": "ID_Setting,Key,Value,Description,Type,Status,Updated_By,Updated_At", "02_users": "ID_User,Username,Password_Hash,Nama,Email,ID_Role,Status,Last_Login,Created_At,Updated_At", "03_roles": "ID_Role,Nama_Role,Permissions,Status,Created_At,Updated_At", "04_nasabah": "ID_Nasabah,IDPJK,kode_nasabah,Nama,Tempat_Lahir,Tanggal_Lahir,Alamat,Warga_Negara,Jenis_Kelamin,Pekerjaan,No_HP,No_Rekening,Jenis_ID,No_KTP,Selain_KTP,No_CIF,NPWP,Local_ID,Tgl_Daftar", "04b_nasabah_dokumen": "ID_Dokumen,ID_Nasabah,Jenis_ID,No_ID,Nama_File,File_ID,File_URL,Tanggal_Upload,Uploaded_By,Status_OCR,Tanggal_OCR,OCR_Confidence,Status_Verifikasi", "04c_nasabah_ocr": "ID_OCR,ID_Dokumen,ID_Nasabah,Jenis_ID,Nama,Tempat_Lahir,Tanggal_Lahir,Alamat,Warga_Negara,Jenis_Kelamin,Pekerjaan,No_HP,No_Rekening,No_KTP,Selain_KTP,No_CIF,NPWP,Local_ID,Raw_OCR,OCR_Confidence,OCR_Date", "05_mata_uang": "ID_Mata_Uang,Kode_Mata_Uang,Nama_Mata_Uang,Negara,Kode_Negara,Gambar_Bendera_ID,Gambar_Bendera_URL,Simbol,Basis_Kurs,Status,Created_By,Created_At,Updated_By,Updated_At", "05b_mata_uang_pecahan": "ID_Pecahan,Kode_Mata_Uang,Nominal,Jenis,Jenis_Satuan,Tahun,Seri,Status_Beredar,Gambar_Depan_ID,Gambar_Depan_URL,Gambar_Belakang_ID,Gambar_Belakang_URL,Status,Created_By,Created_At,Updated_By,Updated_At", "06_rates": "ID_Rate,Tanggal,Kode_Mata_Uang,Sumber_Kurs,Kurs_Acuan,Spread_Jual,Spread_Beli,Kurs_Jual,Kurs_Beli,Status,Created_By,Created_At,Updated_By,Updated_At", "07_transaksi": "ID_Transaksi,No_Invoice,Tanggal,ID_Nasabah,Sumber_Dana,Tujuan_Transaksi,Total_Jual,Total_Beli,Net_Transaksi,Metode_Pembayaran,Status,Created_By,Created_At", "08_transaksi_detail": "ID_Detail,ID_Transaksi,Kode_Mata_Uang,Jenis,Nominal,Kurs_Acuan,Kurs_Almara,Kurs_Transaksi,Jenis_Kurs,Spread,Total_Rp,Alasan_Override", "09_stock_ledger": "ID_Mutasi,Tanggal,Kode_Mata_Uang,Jenis_Mutasi,Nominal,Qty,Nilai_Rp,Saldo,Source,ID_Transaksi,Keterangan,Created_By,Created_At", "09b_stock_lot": "ID_Lot,Kode_Mata_Uang,Tanggal,Jenis_Mutasi,Nominal,Qty,Cost_Per_Unit,Total_Cost,Qty_Tersisa,Source,ID_Transaksi,Created_By,Created_At", "10_cash_ledger": "ID_Mutasi,Tanggal,Jenis_Mutasi,Kategori,Debit,Kredit,Saldo,Keterangan,ID_Transaksi,ID_Closing,Created_By,Created_At", "11_bank_accounts": "ID_Rekening,Kode_Rekening,Nama_Rekening,Nama_Bank,No_Rekening,Nama_Pemilik,Mata_Uang,Jenis_Rekening,Cabang,Saldo_Awal,Tanggal_Saldo_Awal,Status,Created_By,Created_At,Updated_By,Updated_At", "12_bank_ledger": "ID_Mutasi,ID_Rekening,Tanggal,Tanggal_Valuta,No_Bukti,No_Referensi_Bank,Jenis_Mutasi,Kategori,Keterangan,Debit,Kredit,Saldo,Sumber,ID_Transaksi,Status_Rekonsiliasi,ID_Mutasi_Bank_External,Tanggal_Rekonsiliasi,Reconciled_By,Created_By,Created_At", "13_closing": "ID_Closing,Tanggal,Jenis_Closing,ID_Shift,ID_Kasir,Jam_Mulai,Jam_Selesai,Saldo_Awal_Cash,Saldo_Akhir_Cash_Sistem,Saldo_Akhir_Cash_Fisik,Selisih_Cash,Status,Catatan,Created_By,Created_At,Approved_By,Approved_At", "13b_closing_cash_detail": "ID_Detail,ID_Closing,Nominal,Jenis,Jumlah,Subtotal", "13b_shift_handover": "ID_Handover,Tanggal,ID_Shift_Asal,ID_Kasir_Asal,ID_Shift_Tujuan,ID_Kasir_Tujuan,Cash_Diserahkan,Cash_Diterima,Stock_Diserahkan,Stock_Diterima,Selisih,Catatan,Status,Created_At,Accepted_At", "14_audit_log": "ID_Audit,Tanggal,User,Action,Module,Record_ID,Old_Value,New_Value,IP_Session_Info,Reason,Created_At", "15_number_sequences": "ID_Sequence,Sequence_Name,Sequence_Date,Last_Number,Prefix,Updated_At", "16_koin_uang_lama": "ID_Item,Kode_Item,Kategori,Jenis,Negara,Mata_Uang,Nominal,Tahun,Seri,Kondisi,Jumlah,Harga_Beli,Harga_Jual,Foto_Depan,Foto_Belakang,Catatan,Status,Created_By,Created_At,Updated_By,Updated_At", "17_koin_uang_lama_ledger": "ID_Mutasi,ID_Item,Tanggal,Jenis_Mutasi,Qty,Harga,Keterangan,User", "18_gantungan": "ID_Gantungan,No_Gantungan,Tanggal,Jenis_Gantungan,ID_Pihak,Nama_Pihak,ID_Transaksi,Kode_Mata_Uang,Nominal_Awal,Nilai_Rp,Keterangan,Tanggal_Jatuh_Tempo,Status,Created_By,Created_At,Updated_By,Updated_At", "18b_gantungan_mutasi": "ID_Mutasi,ID_Gantungan,Tanggal,Jenis_Mutasi,Kode_Mata_Uang,Nominal,Nilai_Rp,Metode,ID_Transaksi,Keterangan,Created_By,Created_At", "19_booking": "ID_Booking,No_Booking,Tanggal_Booking,Tanggal_Rencana_Transaksi,ID_Nasabah,ID_User,Jenis_Transaksi,Status_Booking,Kurs_Status,Total_Booking,Total_DP,Total_Terealisasi,Sisa_Pembayaran,Keterangan,ID_Transaksi_Realisasi,Created_By,Created_At,Updated_By,Updated_At,Cancelled_By,Cancelled_At,Alasan_Pembatalan", "19b_booking_detail": "ID_Detail,ID_Booking,Kode_Mata_Uang,Jenis,Nominal,Kurs_Booking,Total_Rp,Kurs_Locked,Keterangan", "19c_booking_payment": "ID_Payment,ID_Booking,Tanggal,Jenis_Payment,Metode,Kode_Mata_Uang,Nominal,Nilai_Rp,ID_Rekening,ID_Transaksi,Keterangan,Created_By,Created_At", "20_compliance_rules": "ID_Rule,Nama_Rule,Status,Jenis_Threshold,Nilai_Threshold,Kode_Mata_Uang,Jenis_Transaksi,Periode_Akumulasi,Trigger_Operator,Level_Alert,Wajib_Review,Wajib_Keterangan,Recipients,Created_By,Created_At,Updated_By,Updated_At", "21_compliance_cases": "ID_Case,No_Case,ID_Nasabah,ID_Transaksi,Jenis_Case,Reason,Status,Assigned_To,Priority,Catatan,Created_By,Created_At,Closed_By,Closed_At", "22_approval": "ID_Approval,ID_Case,ID_Transaksi,Jenis_Approval,Requested_By,Requested_At,Approved_By,Approved_At,Status,Alasan,Catatan", "23_stock_opname": "ID_Opname,Tanggal,Kode_Mata_Uang,Saldo_Sistem,Saldo_Fisik,Selisih,Status,Created_By,Created_At,Approved_By,Approved_At", "24_stock_opname_detail": "ID_Detail,ID_Opname,Kode_Mata_Uang,Nominal,Jenis_Satuan,Qty_Sistem,Qty_Fisik,Selisih,Nilai_Selisih,Catatan", "25_backup_log": "ID_Backup,Tanggal,Nama_File,File_ID,File_URL,Jenis_Backup,Ukuran,Status,Created_By,Created_At,Keterangan", "BI_SIPESAT": "ID_Laporan,Tahun,Triwulan,Periode_Mulai,Periode_Selesai,Status,Version,Created_By,Created_At,Finalized_By,Finalized_At", "BI_SIPESAT_DETAIL": "ID_Detail,ID_Laporan,IDPJK,kode_nasabah,nama,tempat_lahir,tanggal_lahir,alamat,no_ktp,no_id,no_cif,npwp,local_id,Tgl_Daftar", "BI_SIPESAT_HISTORY": "ID_History,ID_Laporan,Version,Status,Action,Reason,Snapshot_Data,Created_By,Created_At", "BI_SIPESAT_MAPPING": "ID_Mapping,Field_Internal,Field_BI,Urutan,Tipe_Data,Panjang,Required,Formatter,Metadata_Version,Status", "BI_LKBU": "ID_Laporan,Periode,Tanggal_Akhir,Status,Version,Created_By,Created_At,Finalized_By,Finalized_At", "BI_LKBU_DETAIL": "ID_Detail,ID_Laporan,Kode_Mata_Uang,Sisa_Valas,Basis_Kurs,Kurs_Tengah_BI,Nilai_Rupiah", "BI_LKBU_HISTORY": "ID_History,ID_Laporan,Version,Status,Action,Reason,Snapshot_Data,Created_By,Created_At", "BI_LKBU_KURS": "ID_Kurs,Periode,Kode_Mata_Uang,Kurs_Tengah_BI,Basis_Kurs,Tanggal_Input,Input_By,Source", "BI_LKBU_MAPPING": "ID_Mapping,Field_Internal,Field_BI,Urutan,Tipe_Data,Panjang,Decimal,Padding,Required,Formatter,Metadata_Version,Status", "BI_REPORT_EXPORT": "ID_Export,ID_Laporan,Jenis_Laporan,Version,Format,Nama_File,File_ID,File_URL,Tanggal_Export,Exported_By,Status"};

const DEFAULT_SETTINGS = [
  ['APP_NAME','MC-App-Almara','Nama aplikasi','TEXT','ACTIVE'],
  ['COMPANY_NAME','PT ALMARA PUTRA VALASINDO','Nama perusahaan','TEXT','ACTIVE'],
  ['TIMEZONE','Asia/Jakarta','Zona waktu','TEXT','ACTIVE'],
  ['DATE_FORMAT','dd MMM yyyy','Format tanggal','TEXT','ACTIVE'],
  ['INVOICE_PREFIX','APV','Prefix invoice','TEXT','ACTIVE'],
  ['BUSINESS_HOURS','10:00-20:30','Jam operasional','TEXT','ACTIVE'],
  ['BI_PERMIT','27/17/KEP.GBI/SR/2025','Nomor izin BI','TEXT','ACTIVE'],
  ['SMARTDEAL_URL','https://smartdeal.co.id/#rates','Sumber kurs','URL','ACTIVE'],
  ['RATE_REFRESH_SECONDS','10','Interval refresh kurs','NUMBER','ACTIVE']
];

const DEFAULT_ROLES = [
  ['ROLE-SUPERADMIN','SUPER ADMIN','ALL','ACTIVE'],
  ['ROLE-ADMIN','ADMIN','DASHBOARD,CUSTOMER,CURRENCY,RATE,TRANSACTION,STOCK,CASH,BANK,CLOSING,REPORT,APPROVAL,COMPLIANCE','ACTIVE'],
  ['ROLE-KASIR','KASIR','DASHBOARD,CUSTOMER,TRANSACTION,BOOKING,INVOICE','ACTIVE'],
  ['ROLE-AUDITOR','AUDITOR','DASHBOARD,REPORT,CLOSING,AUDIT','ACTIVE']
];

const LKBU_CURRENCIES = ["USD", "THB", "SGD", "SEK", "PHP", "PGK", "NZD", "NOK", "MYR", "KRW", "JPY", "HKD", "GBP", "EUR", "DKK", "CNY", "CHF", "CAD", "BND", "AUD"];

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Spreadsheet aktif tidak ditemukan.');

  let created = 0, existing = 0;
  Object.keys(DATABASE_SCHEMA).forEach(function(name) {
    const headers = DATABASE_SCHEMA[name].split(',');
    let sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
      sh.getRange(1,1,1,headers.length).setValues([headers]);
      sh.setFrozenRows(1);
      sh.getRange(1,1,1,headers.length).setFontWeight('bold');
      created++;
    } else {
      ensureHeaders_(sh, headers);
      existing++;
    }
  });

  seedSettings_(ss);
  seedRoles_(ss);
  seedSequences_(ss);
  seedLkbuCurrencies_(ss);
  SpreadsheetApp.flush();

  const msg = 'MC-App-Almara berhasil di-install. 44 sheet database siap. ' +
              created + ' sheet baru dibuat, ' + existing + ' sheet sudah ada.';
  Logger.log(msg);
  return msg;
}

function ensureHeaders_(sh, headers) {
  if (sh.getLastRow() === 0) {
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    return;
  }
  headers.forEach(function(h,i) {
    if (sh.getRange(1,i+1).getValue() !== h) sh.getRange(1,i+1).setValue(h);
  });
  sh.setFrozenRows(1);
}

function seedSettings_(ss) {
  const sh = ss.getSheetByName('01_settings');
  if (!sh || sh.getLastRow() > 1) return;
  const now = new Date();
  const rows = DEFAULT_SETTINGS.map(function(x,i) {
    return ['SET-'+String(i+1).padStart(3,'0'),x[0],x[1],x[2],x[3],x[4],'SYSTEM',now];
  });
  sh.getRange(2,1,rows.length,8).setValues(rows);
}

function seedRoles_(ss) {
  const sh = ss.getSheetByName('03_roles');
  if (!sh || sh.getLastRow() > 1) return;
  const now = new Date();
  const rows = DEFAULT_ROLES.map(function(x) {
    return [x[0],x[1],x[2],x[3],now,now];
  });
  sh.getRange(2,1,rows.length,6).setValues(rows);
}

function seedSequences_(ss) {
  const sh = ss.getSheetByName('15_number_sequences');
  if (!sh || sh.getLastRow() > 1) return;
  const now = new Date();
  const d = Utilities.formatDate(now, APP_CONFIG.TIMEZONE, 'yyyyMMdd');
  const rows = [
    ['SEQ-INVOICE','INVOICE',d,0,APP_CONFIG.INVOICE_PREFIX,now],
    ['SEQ-BOOKING','BOOKING',d,0,'BOOK',now],
    ['SEQ-CLOSING','CLOSING',d,0,'CLS',now],
    ['SEQ-GANTUNGAN','GANTUNGAN',d,0,'GNT',now]
  ];
  sh.getRange(2,1,rows.length,6).setValues(rows);
}

function seedLkbuCurrencies_(ss) {
  const sh = ss.getSheetByName('BI_LKBU_KURS');
  if (!sh || sh.getLastRow() > 1) return;
  const now = new Date();
  const p = Utilities.formatDate(now, APP_CONFIG.TIMEZONE, 'yyyy-MM');
  const rows = LKBU_CURRENCIES.map(function(code) {
    return ['KURS-'+p+'-'+code,p,code,'',code === 'JPY' ? 100 : 1,now,'SYSTEM','MANUAL'];
  });
  sh.getRange(2,1,rows.length,8).setValues(rows);
}

function getAppInfo() {
  return {
    app: APP_CONFIG.APP_NAME,
    company: APP_CONFIG.COMPANY_NAME,
    version: APP_CONFIG.VERSION,
    timezone: APP_CONFIG.TIMEZONE
  };
}

function doGet() {
return renderApp_();

}

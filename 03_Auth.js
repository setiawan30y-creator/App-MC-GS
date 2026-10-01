/**
 * MC-App-Almara — AUTHENTICATION MODULE
 * Phase 0 foundation
 *
 * Login sementara berbasis sheet 02_users.
 * Password hashing/session akan diperkuat pada Phase 2.
 */

function loginUser(username, password) {
  username = String(username || '').trim();
  password = String(password || '');

  if (!username || !password) {
    return { success: false, message: 'Username dan password wajib diisi.' };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('02_users');

  if (!sh) {
    return { success: false, message: 'Sheet 02_users tidak ditemukan.' };
  }

  const data = sh.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: false, message: 'Belum ada user yang terdaftar.' };
  }

  const headers = data[0];
  const col = {};
  headers.forEach(function(header, index) {
    col[header] = index;
  });

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const dbUsername = String(row[col.Username] || '').trim();
    const dbPassword = String(row[col.Password_Hash] || '');
    const status = String(row[col.Status] || '').toUpperCase();

    if (dbUsername === username && dbPassword === password) {
      if (status !== 'ACTIVE') {
        return { success: false, message: 'Akun tidak aktif.' };
      }

      if (col.Last_Login !== undefined) {
        sh.getRange(i + 1, col.Last_Login + 1).setValue(new Date());
      }

      return {
        success: true,
        user: {
          idUser: row[col.ID_User],
          username: row[col.Username],
          nama: row[col.Nama],
          email: row[col.Email],
          idRole: row[col.ID_Role]
        }
      };
    }
  }

  return { success: false, message: 'Username atau password salah.' };
}

function createInitialAdmin() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('02_users');

  if (!sh) {
    throw new Error('Sheet 02_users tidak ditemukan.');
  }

  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const col = {};

  headers.forEach(function(header, index) {
    col[header] = index;
  });

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][col.Username] || '').toLowerCase() === 'admin') {
      return 'User admin sudah ada.';
    }
  }

  const now = new Date();
  const row = new Array(headers.length).fill('');

  row[col.ID_User] = 'USR-001';
  row[col.Username] = 'admin';
  row[col.Password_Hash] = 'admin123';
  row[col.Nama] = 'Administrator';
  row[col.Email] = '';
  row[col.ID_Role] = 'ROLE-SUPERADMIN';
  row[col.Status] = 'ACTIVE';
  row[col.Last_Login] = '';
  row[col.Created_At] = now;
  row[col.Updated_At] = now;

  sh.appendRow(row);
  return 'User admin berhasil dibuat.';
}

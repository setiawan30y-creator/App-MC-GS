/**

* MC-App-Almara
* AUTHENTICATION MODULE
*
* Login menggunakan sheet:
* 02_users
* 03_roles
  */

/**

* Login user
  */
  function loginUser(username, password) {

username = String(username || '').trim();
password = String(password || '');

if (!username || !password) {
return {
success: false,
message: 'Username dan password wajib diisi.'
};
}

const ss = SpreadsheetApp.getActiveSpreadsheet();
const sh = ss.getSheetByName('02_users');

if (!sh) {
return {
success: false,
message: 'Sheet 02_users tidak ditemukan.'
};
}

const data = sh.getDataRange().getValues();

if (data.length <= 1) {
return {
success: false,
message: 'Belum ada user yang terdaftar.'
};
}

const headers = data[0];

const col = {};

headers.forEach(function(header, index) {
col[header] = index;
});

for (let i = 1; i < data.length; i++) {

```
const row = data[i];

const dbUsername =
  String(row[col.Username] || '').trim();

const dbPassword =
  String(row[col.Password_Hash] || '');

const status =
  String(row[col.Status] || '').toUpperCase();


if (
  dbUsername === username &&
  dbPassword === password
) {

  if (status !== 'ACTIVE') {

    return {
      success: false,
      message: 'Akun tidak aktif.'
    };

  }


  const user = {

    idUser:
      row[col.ID_User],

    username:
      row[col.Username],

    nama:
      row[col.Nama],

    email:
      row[col.Email],

    idRole:
      row[col.ID_Role]

  };


  // Update Last_Login
  if (col.Last_Login !== undefined) {

    sh.getRange(
      i + 1,
      col.Last_Login + 1
    ).setValue(new Date());

  }


  return {
    success: true,
    user: user
  };

}
```

}

return {
success: false,
message: 'Username atau password salah.'
};

}

/**

* Membuat user administrator pertama.
*
* Jalankan SEKALI saja.
*
* Username:
* admin
*
* Password:
* admin123
  */
  function createInitialAdmin() {

const ss =
SpreadsheetApp.getActiveSpreadsheet();

const sh =
ss.getSheetByName('02_users');

if (!sh) {
throw new Error(
'Sheet 02_users tidak ditemukan.'
);
}

const data =
sh.getDataRange().getValues();

const headers = data[0];

const col = {};

headers.forEach(function(header, index) {
col[header] = index;
});

// Jangan membuat admin kedua
for (let i = 1; i < data.length; i++) {

```
if (
  String(data[i][col.Username] || '')
    .toLowerCase() === 'admin'
) {

  return 'User admin sudah ada.';

}
```

}

const now = new Date();

const row = new Array(headers.length).fill('');

row[col.ID_User] = 'USR-001';
row[col.Username] = 'admin';

/*

* Untuk tahap pengembangan awal,
* password disimpan sederhana.
*
* Nanti kita ganti dengan password hash
* sebelum aplikasi dipakai produksi.
  */
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

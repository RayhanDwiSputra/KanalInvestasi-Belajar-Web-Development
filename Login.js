/* ============================================================
   login.js — KanalInvestasi
   Logika autentikasi untuk halaman Login.html

   Daftar Fungsi:
   1. handleLogin()  — proses login dengan email & password
   2. handleSocial() — proses login via Google / Apple
   3. loginAsGuest() — masuk sebagai tamu tanpa akun
   ============================================================ */


/* ─── 1. handleLogin() ──────────────────────────────────────
   Dipanggil saat user menekan tombol "Masuk Sekarang".
   - Mencegah halaman reload (default behavior form)
   - Validasi email dan panjang password
   - Jika valid: simpan sesi ke sessionStorage & redirect
   - Jika tidak valid: tampilkan pesan error

   Catatan: Ini adalah autentikasi SIMULASI — tidak ada
   pengecekan ke server/database. Semua validasi di sisi client.
─────────────────────────────────────────────────────────── */
function handleLogin(e) {
    e.preventDefault(); // Cegah form submit yang me-reload halaman

    const email = document.getElementById('emailInput').value;
    const pass  = document.getElementById('passInput').value;
    const err   = document.getElementById('errorMsg');

    // Validasi sederhana: email tidak kosong & password minimal 4 karakter
    if (email && pass.length >= 4) {

        // Ambil nama dari bagian sebelum @ pada email
        // Contoh: "budi@gmail.com" → nama = "budi"
        const name = email.split('@')[0];

        // Simpan data user ke sessionStorage
        // sessionStorage: data hilang saat tab browser ditutup
        sessionStorage.setItem('KanalInvestasi_user', JSON.stringify({
            name: name,
            email: email,
            mode: 'member'
        }));

        // Arahkan ke halaman utama
        window.location.href = 'main.html';

    } else {
        // Tampilkan pesan error
        err.style.display = 'block';

        // Sembunyikan otomatis setelah 3 detik
        setTimeout(() => {
            err.style.display = 'none';
        }, 3000);
    }
}


/* ─── 2. handleSocial() ─────────────────────────────────────
   Dipanggil saat user mengklik tombol Google atau Apple ID.
   Ini adalah SIMULASI — tidak terhubung ke OAuth nyata.
   Di aplikasi nyata, di sini akan ada redirect ke OAuth provider.

   @param {string} provider - Nama provider: 'Google' atau 'Apple'
─────────────────────────────────────────────────────────── */
function handleSocial(provider) {
    // Buat nama user dummy dari nama provider
    const name = provider + 'User';

    // Simpan sesi simulasi
    sessionStorage.setItem('KanalInvestasi_user', JSON.stringify({
        name: name,
        email: name + '@' + provider.toLowerCase() + '.com',
        mode: 'member'
    }));

    // Langsung redirect ke halaman utama
    window.location.href = 'main.html';
}


/* ─── 3. loginAsGuest() ─────────────────────────────────────
   Dipanggil saat user memilih "Lanjutkan Tanpa Akun".
   User bisa menjelajah aplikasi tanpa perlu login.
   Di navbar akan tertulis "Tamu" sebagai nama pengguna.
─────────────────────────────────────────────────────────── */
function loginAsGuest() {
    // Simpan sesi dengan mode guest
    sessionStorage.setItem('KanalInvestasi_user', JSON.stringify({
        name: 'Tamu',
        email: '',
        mode: 'guest'
    }));

    // Redirect ke halaman utama
    window.location.href = 'main.html';
}
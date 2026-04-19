/* ============================================================
   main.js — KanalInvestasi
   Logika utama aplikasi untuk halaman main.html

   Daftar Fungsi:
   1. Inisialisasi sesi user
   2. navClick()       — handle klik menu navbar
   3. showPage()       — pindah halaman (SPA)
   4. logout()         — keluar & hapus sesi
   5. openLesson()     — buka modal materi belajar
   6. openBuy()        — buka modal simulasi beli saham
   7. updateBuySummary() — hitung total harga beli
   8. confirmBuy()     — konfirmasi transaksi & kurangi saldo
   9. closeModal()     — tutup modal
   ============================================================ */


/* ─── 1. INISIALISASI SESI USER ─────────────────────────────
   Membaca data user yang disimpan saat login di Login.html.
   sessionStorage menyimpan data sementara selama tab browser
   terbuka — akan hilang jika tab/browser ditutup.
   Jika tidak ada data sesi, tampilkan sebagai Tamu.
─────────────────────────────────────────────────────────── */
const user = JSON.parse(
    sessionStorage.getItem('KanalInvestasi_user') || '{"name":"Tamu","mode":"guest"}'
);

// Tampilkan nama dan inisial user di navbar
document.getElementById('userName').textContent = user.name;
document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();

// Saldo virtual awal untuk simulasi trading
let balance = 100000000; // Rp 100.000.000


/* ─── 2. navClick() ─────────────────────────────────────────
   Dipanggil saat user mengklik salah satu link di navbar.
   - Mencegah behavior default link (<a href="#">)
   - Memanggil showPage() untuk pindah halaman
   - Memperbarui visual link mana yang sedang aktif
─────────────────────────────────────────────────────────── */
function navClick(e, page) {
    e.preventDefault(); // Cegah halaman reload karena href="#"
    showPage(page);

    // Hapus kelas active dari semua link, lalu tambahkan ke yang diklik
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    e.target.closest('a').classList.add('active');
}


/* ─── 3. showPage() ─────────────────────────────────────────
   Inti dari sistem SPA (Single Page Application).
   Semua "halaman" sebenarnya adalah div yang ada di satu file.
   Fungsi ini menyembunyikan semua div .page, lalu menampilkan
   hanya div yang sesuai dengan nama yang dipanggil.

   Contoh: showPage('simulasi') akan menampilkan #page-simulasi
─────────────────────────────────────────────────────────── */
function showPage(name) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Tampilkan halaman yang dipilih
    document.getElementById('page-' + name).classList.add('active');

    // Sinkronkan state aktif pada link navbar
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.page === name) a.classList.add('active');
    });

    // Scroll ke atas saat pindah halaman
    window.scrollTo(0, 0);
}


/* ─── 4. logout() ───────────────────────────────────────────
   Menghapus data sesi user dari sessionStorage,
   lalu mengarahkan kembali ke halaman login.
─────────────────────────────────────────────────────────── */
function logout() {
    sessionStorage.removeItem('KanalInvestasi_user');
    window.location.href = 'Login.html';
}


/* ─── 5. DATA MODUL BELAJAR ─────────────────────────────────
   Object lessons berisi konten HTML untuk setiap modul.
   Key = ID modul, Value = { tag, title, body }
   Konten ini akan diinjeksikan ke dalam modal saat user
   mengklik tombol "Mulai Belajar" di suatu kartu modul.
─────────────────────────────────────────────────────────── */
const lessons = {

    'pasar-modal': {
        tag: 'Pemula',
        title: 'Pengenalan Pasar Modal',
        body: `
            <p>Pasar modal adalah tempat bertemunya pihak yang membutuhkan dana (perusahaan) dengan pihak yang memiliki kelebihan dana (investor) melalui instrumen keuangan seperti saham dan obligasi.</p>
            <h4>Apa itu Saham?</h4>
            <p>Saham adalah bukti kepemilikan sebagian dari suatu perusahaan. Ketika kamu membeli saham BBCA, berarti kamu adalah salah satu pemilik Bank BCA.</p>
            <h4>Keuntungan Investasi Saham</h4>
            <ul>
                <li><strong>Capital Gain</strong> — Keuntungan dari selisih harga beli dan jual saham.</li>
                <li><strong>Dividen</strong> — Pembagian laba perusahaan kepada pemegang saham, biasanya dibagikan setahun sekali.</li>
                <li><strong>Bonus Saham</strong> — Saham gratis yang diberikan perusahaan kepada pemegang saham.</li>
            </ul>
            <h4>Cara Mulai Berinvestasi</h4>
            <ul>
                <li>Buka Rekening Dana Nasabah (RDN) di broker terdaftar OJK.</li>
                <li>Deposit modal awal (bisa mulai dari Rp 100.000).</li>
                <li>Pilih saham berdasarkan riset fundamental dan teknikal.</li>
                <li>Beli dan pantau investasi secara berkala.</li>
            </ul>
            <p>Ingat: investasi selalu mengandung risiko. Lakukan riset mendalam sebelum mengambil keputusan.</p>
        `
    },

    'teknikal': {
        tag: 'Menengah',
        title: 'Analisis Teknikal Dasar',
        body: `
            <p>Analisis teknikal adalah metode memprediksi pergerakan harga saham di masa depan berdasarkan data historis harga dan volume perdagangan.</p>
            <h4>Candlestick Chart</h4>
            <p>Candlestick adalah representasi visual pergerakan harga dalam satu periode. Setiap candle menunjukkan harga pembukaan (Open), penutupan (Close), tertinggi (High), dan terendah (Low).</p>
            <ul>
                <li><strong>Candle Hijau/Putih</strong> — Harga penutupan lebih tinggi dari pembukaan (bullish).</li>
                <li><strong>Candle Merah/Hitam</strong> — Harga penutupan lebih rendah dari pembukaan (bearish).</li>
            </ul>
            <h4>Moving Average (MA)</h4>
            <p>MA adalah rata-rata harga saham dalam periode tertentu. MA-20 berarti rata-rata harga 20 hari terakhir. Ketika harga di atas MA-50, saham cenderung dalam tren naik.</p>
            <h4>RSI (Relative Strength Index)</h4>
            <p>RSI mengukur momentum pergerakan harga dengan skala 0–100:</p>
            <ul>
                <li>RSI > 70 → Saham <strong>overbought</strong> (harga terlalu mahal, potensi turun)</li>
                <li>RSI < 30 → Saham <strong>oversold</strong> (harga terlalu murah, potensi naik)</li>
            </ul>
        `
    },

    'fundamental': {
        tag: 'Menengah',
        title: 'Analisis Fundamental',
        body: `
            <p>Analisis fundamental adalah metode mengevaluasi nilai intrinsik suatu saham berdasarkan kondisi keuangan dan bisnis perusahaan.</p>
            <h4>Rasio Penting</h4>
            <ul>
                <li><strong>P/E Ratio (Price-to-Earnings)</strong> — Harga saham dibagi laba per lembar. P/E rendah bisa berarti saham murah.</li>
                <li><strong>PBV (Price-to-Book Value)</strong> — Perbandingan harga pasar vs nilai buku. PBV < 1 sering dianggap murah.</li>
                <li><strong>ROE (Return on Equity)</strong> — Efisiensi perusahaan menghasilkan laba dari modal sendiri. Semakin tinggi semakin baik.</li>
                <li><strong>DER (Debt-to-Equity Ratio)</strong> — Perbandingan utang dengan modal. DER rendah lebih aman.</li>
            </ul>
            <h4>Laporan Keuangan</h4>
            <p>Ada 3 laporan keuangan utama yang wajib dipahami investor:</p>
            <ul>
                <li><strong>Laporan Laba/Rugi</strong> — Menunjukkan pendapatan, biaya, dan laba perusahaan.</li>
                <li><strong>Neraca (Balance Sheet)</strong> — Menunjukkan aset, kewajiban, dan ekuitas.</li>
                <li><strong>Laporan Arus Kas</strong> — Menunjukkan aliran uang masuk dan keluar perusahaan.</li>
            </ul>
        `
    },

    'manajemen-risiko': {
        tag: 'Menengah',
        title: 'Manajemen Risiko',
        body: `
            <p>Manajemen risiko adalah kemampuan trader untuk membatasi kerugian dan memaksimalkan keuntungan melalui strategi yang terukur.</p>
            <h4>Stop Loss</h4>
            <p>Stop Loss adalah batas harga di mana kamu akan menjual saham untuk membatasi kerugian. Misalnya, beli BBCA di 9.000 dengan stop loss di 8.550 (risiko maksimal 5%).</p>
            <h4>Take Profit</h4>
            <p>Take Profit adalah target harga di mana kamu akan menjual saham untuk mengambil keuntungan. Idealnya rasio reward:risk minimal 2:1.</p>
            <h4>Diversifikasi Portofolio</h4>
            <ul>
                <li>Jangan taruh semua telur dalam satu keranjang.</li>
                <li>Sebar investasi di berbagai sektor (perbankan, konsumer, energi, teknologi).</li>
                <li>Maksimal 20% dari portofolio untuk satu emiten.</li>
            </ul>
            <h4>Aturan 1-2%</h4>
            <p>Jangan pernah risikokan lebih dari 1–2% dari total modal untuk satu trade. Ini memastikan kamu masih bisa terus berdagang meskipun mengalami serangkaian kekalahan.</p>
        `
    },

    'psikologi': {
        tag: 'Lanjutan',
        title: 'Psikologi Trading',
        body: `
            <p>70% kegagalan trader disebabkan oleh faktor psikologis, bukan kemampuan analisis. Menguasai psikologi adalah kunci menjadi trader sukses.</p>
            <h4>FOMO (Fear of Missing Out)</h4>
            <p>FOMO adalah ketakutan ketinggalan peluang profit. Ini menyebabkan trader membeli saham yang sudah naik tinggi tanpa analisis, yang sering berakhir dengan kerugian.</p>
            <h4>Greed & Fear</h4>
            <ul>
                <li><strong>Serakah (Greed)</strong> — Tidak mau take profit karena ingin untung lebih, akhirnya harga berbalik.</li>
                <li><strong>Takut (Fear)</strong> — Panik menjual saham saat harga turun sedikit, padahal tren masih bagus.</li>
            </ul>
            <h4>Tips Menjaga Psikologi</h4>
            <ul>
                <li>Selalu punya trading plan sebelum masuk posisi.</li>
                <li>Jangan trading menggunakan uang yang tidak bisa kamu rugi.</li>
                <li>Istirahat setelah mengalami kerugian besar.</li>
                <li>Journal setiap trade untuk belajar dari kesalahan.</li>
            </ul>
        `
    },

    'reksa-dana': {
        tag: 'Pemula',
        title: 'Reksa Dana untuk Pemula',
        body: `
            <p>Reksa dana adalah wadah investasi kolektif yang dikelola oleh Manajer Investasi profesional. Cocok untuk pemula yang belum berpengalaman memilih saham sendiri.</p>
            <h4>Jenis-Jenis Reksa Dana</h4>
            <ul>
                <li><strong>Reksa Dana Pasar Uang</strong> — Investasi di deposito dan obligasi jangka pendek. Risiko rendah, return 5-7% per tahun.</li>
                <li><strong>Reksa Dana Pendapatan Tetap</strong> — Mayoritas di obligasi. Risiko sedang, return 7-10% per tahun.</li>
                <li><strong>Reksa Dana Campuran</strong> — Campuran saham dan obligasi. Risiko sedang-tinggi.</li>
                <li><strong>Reksa Dana Saham</strong> — Mayoritas di saham. Risiko tinggi, potensi return tertinggi.</li>
            </ul>
            <h4>Cara Mulai</h4>
            <ul>
                <li>Daftar di platform investasi terpercaya (Bibit, Bareksa, Ajaib).</li>
                <li>Pilih reksa dana sesuai profil risiko kamu.</li>
                <li>Mulai dengan Rp 10.000 dan investasikan secara rutin setiap bulan.</li>
            </ul>
        `
    },

    'trading-strategi': {
        tag: 'Lanjutan',
        title: 'Strategi Trading Lanjutan',
        body: `
            <p>Setelah menguasai dasar analisis teknikal dan fundamental, kamu siap mempelajari strategi trading yang lebih spesifik untuk meningkatkan win rate.</p>
            <h4>Scalping</h4>
            <p>Strategi trading jangka sangat pendek (menit hingga jam) dengan target profit kecil namun frekuensi tinggi. Membutuhkan konsentrasi penuh dan spread yang rendah.</p>
            <h4>Swing Trading</h4>
            <p>Memegang posisi selama beberapa hari hingga minggu. Memanfaatkan "ayunan" harga dalam tren. Cocok untuk yang tidak bisa memantau chart sepanjang hari.</p>
            <h4>Momentum Trading</h4>
            <p>Membeli saham yang sedang bergerak kuat dalam satu arah. Menggunakan indikator volume dan MACD untuk konfirmasi momentum.</p>
            <h4>Breakout Strategy</h4>
            <ul>
                <li>Identifikasi area resistance/support kuat.</li>
                <li>Tunggu saham menembus (breakout) level tersebut dengan volume tinggi.</li>
                <li>Masuk posisi setelah konfirmasi breakout, stop loss di bawah level breakout.</li>
            </ul>
        `
    }
};


/* ─── 6. openLesson() ───────────────────────────────────────
   Dipanggil saat user mengklik kartu modul belajar.
   - Mencari data konten dari object lessons berdasarkan ID
   - Mengisi elemen-elemen di dalam modal dengan konten tersebut
   - Menampilkan modal dengan menambahkan class .open

   @param {string} id - ID modul, contoh: 'pasar-modal', 'teknikal'
─────────────────────────────────────────────────────────── */
function openLesson(id) {
    // Jika ID tidak ditemukan, tampilkan pesan default
    const lesson = lessons[id] || {
        tag: 'Info',
        title: 'Segera Hadir',
        body: '<p>Konten modul ini sedang dalam pengembangan.</p>'
    };

    // Injeksikan konten ke elemen-elemen di dalam modal
    document.getElementById('lessonTag').textContent   = lesson.tag;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonBody').innerHTML    = lesson.body;

    // Buka modal
    document.getElementById('lessonModal').classList.add('open');
}


/* ─── 7. openBuy() ──────────────────────────────────────────
   Dipanggil saat user mengklik tombol "Beli" di tabel saham.
   - Menyimpan data saham yang akan dibeli ke variabel global
   - Mengisi modal dengan informasi saham tersebut
   - Menampilkan modal pembelian

   @param {string} code  - Kode saham, contoh: 'BBCA'
   @param {string} price - Harga saham (format string), contoh: '9.450'
─────────────────────────────────────────────────────────── */

// Variabel global untuk menyimpan saham yang sedang dipilih
let currentStock = { code: '', price: 0 };

function openBuy(code, price) {
    // Simpan data saham, hapus titik ribuan lalu ubah ke integer
    currentStock = {
        code: code,
        price: parseInt(price.replace('.', ''))
    };

    // Isi judul dan harga di modal
    document.getElementById('buyTitle').textContent        = 'Beli Saham ' + code;
    document.getElementById('buyPriceDisplay').textContent = 'Rp ' + price;

    // Reset input lot ke 1 dan perbarui ringkasan
    document.getElementById('buyLot').value = 1;
    updateBuySummary();

    // Buka modal
    document.getElementById('buyModal').classList.add('open');
}


/* ─── 8. updateBuySummary() ─────────────────────────────────
   Dipanggil setiap kali user mengubah jumlah lot di input.
   Menghitung total harga berdasarkan:
   - Jumlah lot yang diinput
   - 1 lot = 100 lembar saham
   - Total = lot × 100 × harga per lembar
─────────────────────────────────────────────────────────── */
function updateBuySummary() {
    const lot   = parseInt(document.getElementById('buyLot').value) || 0;
    const total = lot * 100 * currentStock.price;

    // Tampilkan jumlah lembar dan total harga
    document.getElementById('buyLotDisplay').textContent =
        lot + ' lot (' + (lot * 100).toLocaleString('id') + ' lbr)';

    document.getElementById('buyTotal').textContent =
        'Rp ' + total.toLocaleString('id');
}


/* ─── 9. confirmBuy() ───────────────────────────────────────
   Dipanggil saat user menekan "Konfirmasi Pembelian".
   - Validasi apakah saldo mencukupi
   - Kurangi saldo virtual
   - Tutup modal dan perbarui tampilan saldo
─────────────────────────────────────────────────────────── */
function confirmBuy() {
    const lot   = parseInt(document.getElementById('buyLot').value) || 0;
    const total = lot * 100 * currentStock.price;

    // Cek apakah saldo cukup
    if (total > balance) {
        alert('Saldo tidak mencukupi!');
        return;
    }

    // Kurangi saldo virtual
    balance -= total;

    // Tutup modal
    closeModal('buyModal');

    // Perbarui tampilan saldo dan status di halaman simulasi
    document.getElementById('portfolioBalance').textContent =
        'Rp ' + balance.toLocaleString('id');

    document.getElementById('portfolioChange').innerHTML =
        '<i class="fas fa-check-circle" style="color:var(--green)"></i> Berhasil beli ' +
        lot + ' lot ' + currentStock.code;
}


/* ─── 10. closeModal() ──────────────────────────────────────
   Menutup modal dengan menghapus class .open dari overlay.
   CSS akan menyembunyikan modal secara otomatis (display: none).

   @param {string} id - ID elemen overlay modal
─────────────────────────────────────────────────────────── */
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}


/* ─── EVENT LISTENER: Tutup modal klik di luar ──────────────
   Jika user mengklik area gelap di luar kotak modal,
   modal akan tertutup secara otomatis.
   Ini dilakukan dengan mengecek apakah yang diklik adalah
   elemen overlay itu sendiri (bukan konten di dalamnya).
─────────────────────────────────────────────────────────── */
document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', function(e) {
        // e.target = elemen yang diklik
        // this = elemen yang dipasangi listener (overlay)
        // Jika sama, berarti user klik di luar modal
        if (e.target === this) {
            this.classList.remove('open');
        }
    });
});
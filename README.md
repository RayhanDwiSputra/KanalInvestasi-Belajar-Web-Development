# KanalInvestasi 📈

> Proyek pembelajaran web development — Platform edukasi investasi & simulasi saham berbasis web.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Learning%20Project-purple)

---

## Tampilan/interface
![alt text](https://github.com/RayDwi/KanalInvestasi-Belajar-Web-Development/blob/main/Interface/log%20in%20page.png?raw=true)

![alt text](https://github.com/RayDwi/KanalInvestasi-Belajar-Web-Development/blob/main/Interface/Main%20page.png?raw=true)

![alt text](https://github.com/RayDwi/KanalInvestasi-Belajar-Web-Development/blob/main/Interface/material%20page.png?raw=true)

![alt text](https://github.com/RayDwi/KanalInvestasi-Belajar-Web-Development/blob/main/Interface/Simulation%20page.png?raw=true)

![alt text](https://github.com/RayDwi/KanalInvestasi-Belajar-Web-Development/blob/main/Interface/News%20page.png?raw=true)

## 📖 Tentang Proyek

**KanalInvestasi** adalah aplikasi web yang saya buat untuk berlatih web development. Proyek ini mensimulasikan platform edukasi investasi saham dengan fitur:

- 📚 **Modul belajar** — 7 materi dari tingkat pemula hingga lanjutan
- 📊 **Simulasi trading** — beli saham dengan saldo virtual Rp 100 juta
- 📰 **Berita pasar** — tampilan berita seputar saham & ekonomi
- 🔐 **Sistem login** — dengan mode member dan mode tamu

> ⚠️ **Disclaimer:** Ini adalah proyek pembelajaran, bukan platform investasi nyata. Semua data harga saham dan berita bersifat **statis dan fiktif**. Jangan jadikan referensi untuk keputusan investasi.

---

## 🗂️ Struktur Proyek

```
KanalInvestasi/
│
├── Login.html          # Halaman autentikasi
├── main.html           # Aplikasi utama (SPA)
├── README.md           # Dokumentasi proyek
│
└── screenshots/        # (opsional) Screenshot tampilan
    ├── login.png
    ├── main.png
    └── simulasi.png
```

---

## ✨ Fitur & Status

### 🔐 Autentikasi (Login.html)
| Fitur | Status | Catatan |
|---|---|---|
| Login email & password | ✅ | Validasi sederhana di sisi client |
| Login via Google | ⚠️ | Simulasi — belum tersambung OAuth |
| Login via Apple ID | ⚠️ | Simulasi — belum tersambung OAuth |
| Mode Tamu | ✅ | Langsung masuk tanpa akun |
| Redirect otomatis ke main.html | ✅ | |
| Simpan sesi dengan `sessionStorage` | ✅ | |

### 📚 Materi Belajar
| Fitur | Status | Catatan |
|---|---|---|
| 7 modul belajar | ✅ | Konten lengkap tersedia |
| Modal detail per modul | ✅ | |
| Badge level kesulitan | ✅ | Pemula / Menengah / Lanjutan |
| Progress tracking | ❌ | Belum diimplementasi |

### 📊 Simulasi Trading
| Fitur | Status | Catatan |
|---|---|---|
| Tabel daftar saham IDX | ✅ | Data statis |
| Modal beli saham | ✅ | |
| Kalkulasi lot & total harga | ✅ | |
| Pengurangan saldo virtual | ✅ | |
| Harga saham real-time | ❌ | Perlu integrasi API |
| Fitur jual saham | ❌ | Belum diimplementasi |
| Riwayat transaksi | ❌ | Belum diimplementasi |

### 📰 Berita
| Fitur | Status | Catatan |
|---|---|---|
| Layout kartu berita | ✅ | Data statis |
| Berita dari API eksternal | ❌ | Perlu integrasi news API |

---

## 🧩 Modul Belajar

| # | Judul | Level | Durasi |
|---|---|---|---|
| 1 | Pengenalan Pasar Modal | 🟢 Pemula | 2 jam |
| 2 | Reksa Dana untuk Pemula | 🟢 Pemula | 1,5 jam |
| 3 | Analisis Teknikal Dasar | 🟡 Menengah | 4 jam |
| 4 | Analisis Fundamental | 🟡 Menengah | 3 jam |
| 5 | Manajemen Risiko | 🟡 Menengah | 2,5 jam |
| 6 | Psikologi Trading | 🔴 Lanjutan | 2 jam |
| 7 | Strategi Trading Lanjutan | 🔴 Lanjutan | 5 jam |

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling, animasi, layout |
| JavaScript ES6+ | Logika, DOM manipulation, navigasi |
| Google Fonts (Syne & DM Sans) | Tipografi |
| Font Awesome 6.4.0 | Ikon |

> Tidak menggunakan framework apapun — murni **Vanilla HTML, CSS, dan JavaScript**.

---

## 🚀 Cara Menjalankan

Tidak perlu instalasi atau build process apapun.

**Cara 1 — Buka langsung di browser:**
```
Klik dua kali file Login.html
```

**Cara 2 — Dengan Live Server (VS Code):**
```
1. Install ekstensi "Live Server" di VS Code
2. Klik kanan Login.html → Open with Live Server
```

**Cara 3 — Dengan terminal:**
```bash
npx serve .
# Lalu buka http://localhost:3000/Login.html
```

**Kredensial demo:**
```
Email    : apa saja (format email valid)
Password : minimal 4 karakter
— atau —
Klik "Lanjutkan Tanpa Akun" untuk mode tamu
```

---

## 🧠 Apa yang Saya Pelajari

Ini adalah bagian terpenting dari proyek ini. Berikut konsep yang saya praktikkan:

### HTML & Struktur
- Menyusun halaman dengan semantic HTML
- Menggunakan `<form>`, input, dan button dengan atribut yang benar
- Memahami konsep single file vs multi file dalam proyek web

### CSS
- Menggunakan **CSS Custom Properties** (variabel CSS) untuk tema warna yang konsisten
- Membuat layout dengan **Flexbox** dan **CSS Grid**
- Animasi sederhana dengan `@keyframes` dan `transition`
- Membuat tampilan **responsif** dengan `@media query`
- Menggunakan **pseudo-elements** (`::before`, `::after`) untuk dekorasi

### JavaScript
- Manipulasi DOM — `getElementById`, `querySelector`, `classList`
- Membuat **Single Page Application (SPA)** sederhana tanpa framework
- Menggunakan **`sessionStorage`** untuk menyimpan data sesi login
- Menangani **event** — `click`, `submit`, `input`
- Membuat **modal** yang bisa dibuka dan ditutup secara dinamis
- Memahami konsep **state** sederhana (contoh: saldo virtual yang berubah saat beli saham)
- Manipulasi string dan angka untuk kalkulasi harga

### Konsep Umum
- Memahami alur **autentikasi dasar** — login, sesi, dan logout
- Menulis **README** yang informatif sebagai dokumentasi proyek
- Pentingnya komentar kode untuk keterbacaan

---

## 🔮 Rencana Pengembangan

- [ ] Pisahkan ke file `style.css` dan `script.js` yang terpisah
- [ ] Integrasi API harga saham real-time (Yahoo Finance / Alpha Vantage)
- [ ] Autentikasi nyata dengan Firebase Auth atau Google OAuth
- [ ] Grafik harga saham interaktif dengan Chart.js
- [ ] Fitur jual saham dan riwayat transaksi
- [ ] Simpan portofolio dengan `localStorage` agar tidak hilang saat refresh
- [ ] Integrasi berita dari RSS feed atau NewsAPI
- [ ] Refactor ke komponen menggunakan React atau Vue.js

---

## 📝 Catatan Pengembang

Proyek ini masih jauh dari sempurna dan memang sengaja dibuat sebagai **batu loncatan belajar**. Beberapa hal yang saya sadari perlu diperbaiki:

- CSS dan JS masih berada di dalam file HTML — idealnya dipisah
- Validasi form masih sangat sederhana, belum ada sanitasi input
- Data saham dan berita masih hardcoded, belum dinamis dari API
- Belum ada error handling yang proper

Kritik dan saran sangat terbuka! 🙏

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan bebas digunakan sebagai referensi.

---

<p align="center">Dibuat dengan ☕ dan semangat belajar — KanalInvestasi © 2026</p>

# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01. Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase. Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Berhasil mengambil daftar produk langsung dari database Supabase secara *server-side*. File `lib/supabase/server.js` dibuat untuk konfigurasi Supabase. Halaman katalog (`/`) berhasil menampilkan pesan error saat gagal, pesan kosong jika tidak ada data, dan menggunakan `force-dynamic` agar tidak di-cache.

**Perbaikan:**
Terdapat kesalahan jaringan saat melakukan *fetch* (lihat bagian Debugging).

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02. Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail sukses mengambil produk spesifik berdasarkan ID-nya dari URL. Jika ID yang dituju salah atau tidak ditemukan, fungsi `notFound()` memicu halaman 404.

**Perbaikan:**
Tidak ada perbaikan signifikan, semua berjalan lancar.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)". Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Komponen `TombolWhatsApp` telah diganti menjadi tag `<a>` yang langsung mengarahkan pengguna ke *tab* baru menuju tautan *wa.me*. Teks pesan sudah menyertakan harga (dengan format rupiah) dan diproses melalui `encodeURIComponent`.

**Perbaikan:**
Tidak ada perbaikan signifikan.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04. Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
File `lib/supabase/auth.js` dibuat untuk konfigurasi sisi server berbasis *cookie*. Ditambahkan `loginAction` dan `logoutAction` ke `actions.js`. Form login di `/admin/login` kini memakai `useActionState` sehingga dapat mencetak error di layar. Tombol keluar (Logout) pada navigasi admin telah dibuat fungsional dengan form pembungkus.

**Perbaikan:**
Tidak ada perbaikan.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05. Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Menambahkan `changePasswordAction` dengan validasi kecocokan kolom password dan minimal 8 karakter, kemudian mengeksekusi `updateUser()`. Form di halaman password berhasil diintegrasikan dengan `useActionState` dan akan menunjukkan notifikasi berhasil atau gagal.

**Perbaikan:**
Tidak ada perbaikan.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06. Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
File middleware `proxy.js` berhasil dibuat di root folder, berfungsi untuk mencegat dan mengamankan rute berawalan `/admin`. Autentikasi ketat juga ditambahkan ke `changePasswordAction` (menolak akses bila user tidak login).

**Perbaikan:**
Tidak ada perbaikan.

## Debugging dan fitur bonus

### Error Fetch pada US-01
**Prompt: [SENDIRI]** 
Gagal mengambil daftar produk: TypeError: fetch failed muncul error seperti ini. cari tau letak kesalahan nya

**Hasil:**
Error tersebut muncul saat *fetch* dilakukan oleh *client* Supabase pada Server Component. Hal ini terjadi karena penulisan format `SUPABASE_URL` salah.

**Perbaikan:**
Mengubah `SUPABASE_URL` di dalam file `.env.local` dengan cara **menghapus** akhiran `/rest/v1/` yang ada. Library `@supabase/supabase-js` sudah mengurus penambahan alur rute API dengan sendirinya. Setelah menyingkirkan bagian URL tersebut, aplikasi dijalankan ulang (`npm run dev`) dan Supabase dapat memuat data produk dengan sukses.

## Prompt di Luar User Story

Catat setiap prompt tambahan (di luar daftar US resmi) yang diberikan ke AI beserta hasilnya.

### 1. Pengisian PROMPTS.md
**Prompt: [SENDIRI]**
isi @[d:\Farrel\PROJECTS\WORKSHOP\tambak-udang\PROMPTS.md] sesuai dengan prompt, hasil, dan perbaikan yang sudah aku lakukan. sesuaikan dengan user story (US) yang sudah di lakukan. tambahkan juga debugging error terkait  SUPABASE_URL yang tadi dilakukan

**Konteks:**
Mendokumentasikan seluruh riwayat pengerjaan US-01 sampai US-06 beserta penyelesaian *bug* *fetch* URL Supabase.

**Hasil:**
File `PROMPTS.md` terisi penuh dengan ringkasan instruksi, hasil fitur, dan *debugging* yang tepat.

### 2. Revisi Konsep pada README.md
**Prompt: [SENDIRI]**
revisi @[README.md] untuk membahas konsep aplikasi yang sudah dibuat. cantumkan juga dokumentasi instalasi dari project ini

**Konteks:**
Memperbarui halaman depan dari proyek ini agar menjelaskan konsep aplikasi setelah semua fitur dasar berjalan.

**Hasil:**
Berkas `README.md` memuat panduan instalasi mendetail beserta rincian fitur 6 *User Story* yang berhasil dibangun.

### 3. Penambahan Bagian Prompt Tambahan
**Prompt: [SENDIRI]**
buatkan section baru di @[d:\Farrel\PROJECTS\WORKSHOP\tambak-udang\PROMPTS.md] untuk menjelaskan prompt yang ku lakukan namun diluar dari User story. catat juga setiap prompt yang akan dilakukan. aku akan memberikan konteks apabila prompt tersebut dilakukan untuk suatu user story.

**Konteks:**
Membuat tempat pencatatan khusus bagi tugas pendukung yang tidak terikat secara langsung pada implementasi fitur *User Story*.

**Hasil:**
Bagian **Prompt di Luar User Story** (bagian ini) ditambahkan pada `PROMPTS.md` guna mencatat interaksi *custom*.

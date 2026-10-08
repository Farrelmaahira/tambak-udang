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

## US-07 List produk admin dari database

**Prompt:**
Baca docs/user-stories.md bagian US-07. Ubah app/admin/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai koneksi sesi admin di lib/supabase/auth.js. Tampilkan produk dengan komponen TabelProduk yang sudah ada, termasuk nama kategori dari relasi. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Halaman `/admin` mengambil produk dari database dengan relasi kategori (`kategori:kategori_id`). Daftar tampil lengkap dengan nama kategori dan tombol Ubah serta Hapus yang berfungsi.

**Perbaikan:**
Tidak ada perbaikan signifikan. Kolom kategori teks diganti relasi ke tabel `kategori` mengikuti perubahan skema.

## US-08 Tambah produk

**Prompt:**
Baca docs/user-stories.md bagian US-08. Buat form di /admin/produk/baru menyimpan produk baru ke tabel "produk" di Supabase lewat Server Action tambahProdukAction di app/admin/actions.js. Field kategori berupa dropdown dari tabel "kategori". Validasi di server: nama wajib diisi, harga angka nol atau lebih, kategori harus ada di database. Action memeriksa login admin. Berhasil menyimpan kembali ke /admin; gagal menampilkan pesan error yang jelas. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
`FormProduk` tersambung ke `tambahProdukAction` memakai `useActionState`. Dropdown kategori diambil dari database. Jika belum ada kategori, halaman meminta admin membuat kategori dulu. Validasi dan proteksi login berjalan di server.

**Perbaikan:**
Tidak ada perbaikan signifikan.

## US-09 Ubah produk

**Prompt:**
Baca docs/user-stories.md bagian US-09. Buat form di /admin/produk/[id]/ubah terisi data lama dari tabel "produk" di Supabase, lalu menyimpan perubahan lewat Server Action ubahProdukAction di app/admin/actions.js. Field kategori berupa dropdown dari tabel "kategori" dengan pilihan lama terpilih. Validasi dan proteksi login sama seperti tambah produk. Produk yang tidak ada menampilkan halaman "tidak ditemukan". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Halaman mengambil produk dan daftar kategori dari database. Form terisi data lama termasuk kategori terpilih. Perubahan tersimpan ke database lalu kembali ke /admin.

**Perbaikan:**
Tidak ada perbaikan signifikan.

## US-10 Hapus produk

**Prompt:**
Baca docs/user-stories.md bagian US-10. Buat tombol "Hapus" di TabelProduk meminta konfirmasi, lalu menghapus produk dari tabel "produk" lewat Server Action hapusProdukAction di app/admin/actions.js. Action memeriksa login admin di server. Setelah hapus, daftar produk dimuat ulang.

**Hasil:**
Komponen baru `TombolHapus` menampilkan dialog konfirmasi sebelum submit. `hapusProdukAction` menghapus baris dari database dan memuat ulang halaman admin. Tanpa login, aksi ditolak di server.

**Perbaikan:**
Tidak ada perbaikan signifikan.

## US-11 Filter kategori

**Prompt:**
Baca docs/user-stories.md bagian US-11. Ubah halaman / supaya pengunjung memilih kategori dulu dari tabel "kategori" di Supabase, lalu melihat produk per kategori di halaman /kategori/[slug] berdasarkan slug kategori. Setiap kartu kategori menampilkan jumlah produk. Kategori atau produk yang tidak ada menampilkan halaman "tidak ditemukan" atau pesan kosong yang jelas.

**Hasil:**
Halaman `/` menampilkan semua produk dari database beserta form pencarian. Kata kunci dibaca dari `searchParams` dan difilter di database dengan `ilike` pada kolom nama. Halaman baru `/kategori` menampilkan kartu kategori beserta jumlah produk. Navigasi Header mendapat link "Semua produk" dan "Kategori". Halaman `/kategori/[slug]` tetap menampilkan produk kategori tersebut. Kriteria "berdasarkan kategori atau mencari nama" kini terpenuhi dua-duanya.

**Perbaikan:**
Halaman `/` yang sebelumnya daftar kategori dipindah ke `/kategori` agar pencarian produk menjadi fokus utama.

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

### 4. Tema Yaya's Bakery dan Tabel Kategori
**Prompt:**
ubah tema toko ini menjadi toko roti dengan nama "yaya's bakery" yang akan kamu lakukan adalah tambahkan tabel kategori produk di schema sql nya. jangan lupa sesuaikan tabel produk yang sudah dibuat. kemudian tambah halaman agar produk dilihat dari kategori nya terlebih dahulu. tambahkan halaman CRUD kategori pada admin dan juga field kategori pada penambahan produk.

**Konteks:**
Mengubah tema toko menjadi bakery, mengganti kolom `kategori` teks di tabel `produk` menjadi relasi `kategori_id` ke tabel baru `kategori` (dengan `slug` untuk URL), menampilkan produk pengunjung per kategori, serta menambah CRUD kategori di admin.

**Hasil:**
Identitas toko di `lib/toko.js` menjadi Yaya's Bakery. `docs/schema.sql` mendapat tabel `kategori` (RLS + policy) dan migrasi `produk.kategori` menjadi `kategori_id` dengan seed bakery. Halaman `/` menampilkan daftar kategori, halaman baru `/kategori/[slug]` menampilkan produk per kategori, dan halaman detail memakai relasi kategori. Admin mendapat rute `/admin/kategori`, `/admin/kategori/baru`, `/admin/kategori/[id]/ubah` dengan Server Action tambah, ubah, hapus (hapus ditolak bila kategori masih dipakai produk). `FormProduk` memakai dropdown kategori dan simpan produk tersambung ke database. Build `npm run build` sukses.

### 5. Data Dummy Produk
**Prompt:**
buat data dummy untuk produk. buatkan dalam file yang terpisah saja

**Konteks:**
Menambah data contoh produk bakery tanpa mengotori `docs/schema.sql`.

**Hasil:**
File baru `docs/seed-dummy.sql` berisi 12 produk dummy (3 per kategori). Aman dijalankan ulang karena produk yang namanya sudah ada dilewati. Dijalankan setelah `docs/schema.sql` di SQL Editor Supabase.

### 6. Katalog Produk dan Pencarian
**Prompt:**
ubah halaman pada route / untuk menampilkan produk nya dulu, tambahkan fitur search berdasarkan nama produk nya (lakukan search nya ini menggunakan query agar lebih akurat). tambahkan navigasi pada guest user agar bisa melihat kategori yang ada. ketika masuk halaman kategori tampilkan data data produk yang ada pada kategori tersebut.

**Konteks:**
Memperbarui US-11: halaman `/` kembali menampilkan produk dengan pencarian nama di sisi server, navigasi kategori untuk tamu, dan daftar kategori pindah ke `/kategori`.

**Hasil:**
Halaman `/` menampilkan semua produk dengan form pencarian GET yang difilter via `ilike` di database. `Header` mendapat navigasi "Semua produk" dan "Kategori". Halaman baru `/kategori` menampilkan kartu kategori. Build `npm run build` sukses.

### 7. Halaman Proper: Hero, About, Contact
**Prompt:**
buatkan halaman yang lebih proper untuk website ini. tambahkan hero section, about section, contact section (beserta map). gunakan skill antislop ui untuk mengerjakan hal ini

**Konteks:**
Merapikan halaman `/` memakai skill antislop mode during: hero dengan dua CTA nyata, about dari data toko, contact dengan tombol WhatsApp dan embed peta.

**Hasil:**
Halaman `/` mendapat hero (judul, tagline, CTA ke `#produk` dan `/kategori`, foto produk asli), section `#tentang` dari data toko, dan section `#kontak` (tombol WhatsApp + iframe peta dari alamat toko). `Header` mendapat link Tentang dan Kontak path absolut. Grid produk dan pencarian tidak berubah. Build `npm run build` sukses.

### 8. Navigasi Gaya Referensi Bakery
**Prompt:**
scan DESIGN.md dan referensi di design_references, sesuaikan navigasi sesuai navigasi yang sudah dibuat. Lalu: gunakan header saja (tanpa top bar info).

**Konteks:**
Menyesuaikan `Header` dengan referensi tema bakery (logo kiri, menu, tombol pesan di kanan) memakai skill antislop mode during, tanpa top bar info.

**Hasil:**
`Header` satu baris: logo, menu Semua produk, Kategori, Tentang, Kontak, dan tombol "Pesan via WhatsApp" ke nomor toko. Sentence case ikut `DESIGN.md`, `flex-wrap` untuk HP. Build `npm run build` sukses.

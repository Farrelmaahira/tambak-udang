# Katalog UMKM + Order WhatsApp

Aplikasi katalog produk UMKM dengan fitur pemesanan langsung melalui WhatsApp. Proyek ini dibangun sebagai bagian dari workshop "Creative Hub App Talent (CHAT) 2026" dan dirancang dengan teknologi web modern untuk menampilkan produk, mengamankan rute admin, serta mempermudah pelanggan berbelanja.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUSERNAME%2Fkatalog-umkm)
> Untuk pengelola repo: ganti `USERNAME` pada link tombol di atas dengan akun GitHub pemilik repo template ini.

## Konsep Aplikasi

Aplikasi ini telah mengimplementasikan 6 *User Story* (US) utama:
1. **Katalog & Detail Produk Dinamis (US-01 & US-02):** Mengambil data produk langsung dari *database* Supabase secara *server-side* dengan mode *force-dynamic* agar produk terbaru segera tampil di layar pelanggan.
2. **Pemesanan via WhatsApp (US-03):** Pelanggan dapat mengklik tombol "Pesan via WhatsApp" di halaman detail produk. Aksi ini akan otomatis membuat format teks pesan yang berisi nama dan harga produk, lalu mengarahkannya ke nomor WhatsApp pemilik usaha.
3. **Autentikasi & Login Admin (US-04):** Form otentikasi admin diamankan menggunakan *Server Actions* (`loginAction` & `logoutAction`) serta `@supabase/ssr` berbasis *cookies*.
4. **Manajemen Akun / Ganti Password (US-05):** Pemilik toko dapat mengganti password bawaan melalui halaman khusus yang telah terintegrasi dengan fungsi autentikasi aman, beserta validasi berlapis dari sisi *server*.
5. **Keamanan & Proteksi Rute (US-06):** Menggunakan *middleware* (`proxy.js`), setiap halaman yang berawalan `/admin` diamankan dari akses publik. Seluruh aksi yang mampu mengubah data wajib melalui filter login terlebih dahulu.

## Instalasi dan Setup Lokal

Ikuti panduan berikut untuk menjalankan dan menguji aplikasi ini di komputer Anda:

1. **Clone repositori ke laptop.**
   ```bash
   git clone https://github.com/<akunmu>/<nama-repo>.git
   cd <nama-repo>
   npm install
   ```

2. **Buat proyek Supabase.** 
   - Masuk ke [supabase.com](https://supabase.com), buat proyek baru. 
   - Buka menu **SQL Editor**, tempel seluruh isi file `docs/schema.sql`, dan jalankan (*Run*). Hal ini akan membentuk tabel `produk` dan memasukkan beberapa data contoh.

3. **Buat file `.env.local`.** 
   - Salin `.env.example` menjadi `.env.local`.
   - Isi dengan kredensial dari proyek Supabase Anda (ditemukan di **Project Settings > API**):
   ```env
   SUPABASE_URL=https://<ID_PROYEK>.supabase.co
   SUPABASE_PUBLISHABLE_KEY=anon_key_anda
   SUPABASE_SECRET_KEY=service_role_key_anda
   ```
   > **Penting:** Pastikan `SUPABASE_URL` hanya memuat alamat *base* dan **tidak** diakhiri dengan `/rest/v1/`.

4. **Siapkan akun admin.** 
   - Buat satu *user* di Supabase Authentication secara manual (sebagai akun admin).
   - Masuk ke **Authentication > Sign In / Providers** di dashboard Supabase lalu matikan pendaftaran akun baru demi keamanan.

5. **Jalankan aplikasi.**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di *browser* Anda untuk melihat hasilnya.

## Alur Kerja (Pengembangan)

Saat melanjutkan proyek ini, selalu kerjakan satu fitur secara bertahap, kemudian *commit*:

```bash
git add .
git commit -m "US-01: katalog dari database"
git push
```
Setiap *push* ke repositori, Vercel akan secara otomatis men-deploy versi terbaru Anda.

## Isi Repositori

| File / Folder | Penjelasan |
| --- | --- |
| `AGENTS.md` | Aturan utama untuk AI agent, dibaca sebelum setiap prompt |
| `DESIGN.md` | Panduan warna, jenis huruf, dan antarmuka |
| `PROMPTS.md` | Jurnal prompt AI dan riwayat fitur (*debugging*) yang wajib diisi |
| `docs/` | Spesifikasi lengkap: rancangan teknis, *user story*, hingga skema *database* |
| `lib/` | Kumpulan berkas data statis (`toko.js`) dan konektor database (`supabase/server.js`, `supabase/auth.js`) |
| `app/` | Sekumpulan halaman *router* dari aplikasi Next.js |
| `components/` | Bagian UI / komponen *reusable* yang merangkai keseluruhan tata letak |
| `proxy.js` | *Middleware* keamanan yang mencegat rute `/admin` |

## Menyesuaikan dengan Usahamu

- **Identitas toko:** Ubah nama, jam buka, dan nomor WA di file `lib/toko.js`.
- **Warna & Tema:** Lakukan modifikasi variabel `@theme` di `app/globals.css`.
- **Daftar Produk:** Edit datanya secara langsung menggunakan antarmuka *Table Editor* di Supabase, atau lanjutkan dengan mengerjakan *bonus user stories* (US-08, US-09, US-10).

## Aturan Penting

- **Jangan pernah** menaruh sandi (*password*) di dalam kode, dan jangan pernah melakukan *push* pada file `.env.local`.
- Jangan menggunakan awalan `NEXT_PUBLIC_` untuk *environment variables* (untuk mencegah diekspos ke sisi klien).
- Segera isi `PROMPTS.md` tiap kali Anda menuntaskan sebuah fitur.

## Tentang Aplikasi Ini

- **Nama usaha:** Tambak Udang (default)
- **Pembuat:** Peserta CHAT 2026
- **Link aplikasi:** [Tautan Vercel/Produksi]
- **Fitur bonus yang dikerjakan:** -

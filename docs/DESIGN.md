# DESIGN.md — Bakery Landing Page

Brief desain untuk implementasi halaman landing toko roti (Bakery).
Referensi: 3 screenshot template "Bakery" (hero, services + about, product catalog).

> **Catatan untuk implementor (junior dev / AI agent):**
> - Ikuti dokumen ini secara literal. Jangan menambah section, warna, atau font di luar yang tertulis.
> - Nilai warna & ukuran adalah **estimasi dari screenshot**. Jika ragu, pakai nilai di dokumen ini.
> - Semua teks lorem ipsum di referensi boleh diganti konten asli, tapi **panjang teks harus kira-kira sama** supaya layout tidak rusak.
> - Kerjakan **mobile-first**, lalu tambahkan breakpoint desktop.

---

## 1. Ringkasan Gaya

- Gaya: **bersih, hangat, minimalis**, banyak whitespace, latar putih.
- Satu warna aksen: **oranye karamel** (warna roti panggang).
- Semua judul section, menu, dan tombol: **UPPERCASE**.
- Tombol berbentuk **outline** (garis tepi), bukan solid.
- Ikon: **line icon putih** di dalam lingkaran oranye.
- Bentuk dominan: **lingkaran** (ikon service, foto produk, panah slider).

---

## 2. Design Tokens

Taruh di `:root` (CSS variables) atau di config Tailwind.

### 2.1 Warna

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--color-primary` | `#E8B374` | Top bar, lingkaran ikon, menu aktif, harga, garis dekorasi, tab aktif |
| `--color-dark` | `#333333` | Teks menu, border tombol, logo |
| `--color-heading` | `#555555` | Judul section |
| `--color-text` | `#777777` | Paragraf / deskripsi |
| `--color-white` | `#FFFFFF` | Background utama, teks di atas oranye |
| `--color-bg-light` | `#F6F6F6` | Background section "Our Bakery", background lingkaran foto produk |
| `--color-divider` | `#DDDDDD` | Garis abu pada divider judul |
| `--color-overlay` | `rgba(0,0,0,0.55)` | Overlay gelap di atas foto hero |

### 2.2 Tipografi

| Peran | Font | Fallback |
|---|---|---|
| Heading, menu, tombol, judul produk | **Poppins** (500/600) | `sans-serif` |
| Body / paragraf | **Noto Sans** (400) | `sans-serif` |
| Logo "Bakery" | Font script/handwriting, mis. **Lobster Two** atau **Courgette** | `cursive` |

Ukuran (desktop):

| Elemen | Ukuran | Weight | Catatan |
|---|---|---|---|
| Judul section (H2) | 18–20px | 600 | uppercase, letter-spacing ±0.5px, warna `--color-heading` |
| Subjudul section | 15–16px | 400 | warna `--color-text` |
| Judul card service | 15px | 600 | uppercase |
| Nama produk | 17–18px | 500/600 | warna `#444` |
| Harga | 16–17px | 600 | warna `--color-primary` |
| Paragraf | 15px | 400 | line-height 1.6–1.7 |
| Menu nav | 14–15px | 500/600 | uppercase |
| Tombol | 14px | 600 | uppercase |

### 2.3 Spacing & Layout

- Container: `max-width: 1140px`, centered, padding horizontal 15px.
- Jarak vertikal antar section: ±80–100px (desktop), ±50px (mobile).
- Border radius: tombol `3px`, lingkaran `50%`.
- Grid: 12 kolom gaya Bootstrap (4 kolom service, 2 kolom produk).

---

## 3. Komponen Reusable

### 3.1 Section Title (dipakai di semua section)

Struktur:
1. Teks judul — uppercase, centered.
2. **Divider**: garis abu panjang (±150px, tinggi 2px) dengan garis oranye pendek (±50px, tinggi 2px) di tengahnya.
3. (Opsional) subjudul 1 baris di bawahnya.

Varian "left": judul rata kiri, hanya garis oranye pendek (±50px) di bawahnya, tanpa garis abu (dipakai di section "Our Bakery").

### 3.2 Button Outline

- Background transparan/putih, border `2px solid var(--color-dark)`, radius 3px.
- Teks uppercase bold 14px, warna `--color-dark`.
- Padding ±10px 24px.
- Hover: background `--color-dark`, teks putih (atau border + teks jadi oranye).
- Dipakai pada: "ORDER ONLINE", "VIEW ALL PRODUCTS".

### 3.3 Icon Circle (card service)

- Lingkaran diameter ±140px, background `--color-primary`.
- Ikon line putih di tengah, ±70px, stroke tipis.

### 3.4 Product Item

- Layout horizontal: **foto lingkaran kiri** + **teks kanan**.
- Foto: lingkaran ±130px, background `--color-bg-light`, gambar produk PNG transparan di tengah (object-fit: contain, padding ±15px).
- Teks: nama produk → deskripsi 2 baris → harga oranye bold, format `$ 3.99` (ada spasi setelah `$`).
- Gap antara foto dan teks ±20px.

---

## 4. Struktur Halaman (urut dari atas)

### 4.1 Top Bar

- Tinggi ±40px, background `--color-primary`, teks & ikon putih, font 14px.
- **Kiri:** teks "Follow us" + 4 ikon sosial (Facebook, Twitter, YouTube, Instagram), jarak antar ikon ±15px.
- **Kanan:** ikon telepon + `+1 0123 456 789`, lalu ikon email + `info@bakerytheme.com`.
- Mobile: boleh disembunyikan atau tampilkan hanya ikon sosial.

### 4.2 Header / Navbar

- Tinggi ±98px, background putih.
- **Kiri:** logo "Bakery" (font script, warna gelap) dengan dekorasi garis panah/zigzag oranye tipis di bawah logo.
- **Kanan (urut):** `HOME` (aktif = oranye) · `ABOUT US` · `PRODUCTS` · `FEATURES ▾` (dropdown, ada chevron kecil) · `BLOG` · `CONTACT` · tombol outline `ORDER ONLINE`.
- Jarak antar menu ±35px. Menu non-aktif warna `--color-dark`; hover → oranye.
- Mobile: menu jadi hamburger, tombol "ORDER ONLINE" masuk ke dalam menu mobile.

### 4.3 Hero Slider

- Lebar penuh (full-bleed), tinggi ±540px (desktop), ±360px (mobile).
- Background: foto roti di atas permukaan gelap bertekstur tepung, ditutup overlay `--color-overlay`.
- **Panah prev/next:** lingkaran outline putih 2px, diameter ±54px, panah chevron putih, posisi vertikal tengah, menempel ±20px dari tepi kiri dan kanan.
- **Pagination:** 3 titik bulat outline putih (±16px) di tengah bawah, jarak ±24px dari bawah. Titik aktif = terisi putih.
- Minimal 3 slide. Slide di referensi tidak menampilkan teks; teks/CTA hero **tidak wajib** (boleh ditambahkan nanti, jangan diimprovisasi).

### 4.4 Section "MAIN SERVICES WE PROVIDE"

- Background putih. Pakai Section Title (centered) + subjudul: *"Our services are the best in town, we provide great quality baked products"*.
- Grid **4 kolom** sejajar, teks centered:

| # | Ikon | Judul |
|---|---|---|
| 1 | Topi chef | TOP CHEFS |
| 2 | Croissant | FRESH INGREDIENTS |
| 3 | Pie/tart tampak atas | ATTRACTIVE FLAVORS |
| 4 | Spatula + sendok bersilang | PROFESSIONAL |

- Tiap card: Icon Circle → judul (uppercase, jarak ±30px dari lingkaran) → deskripsi abu 3 baris.
- Tablet: 2 kolom. Mobile: 1 kolom.

### 4.5 Section "OUR BAKERY"

- Layout **split 50/50 tanpa gap**, tinggi ±400px+.
- **Kiri:** foto full-bleed (koki berjanggut berseragam putih di depan oven), `object-fit: cover`, menempel ke tepi kiri layar.
- **Kanan:** background `--color-bg-light`, padding ±70px. Judul `OUR BAKERY` (varian left) + 2 paragraf abu.
- Mobile: foto di atas, teks di bawah (stack).

### 4.6 Section "WHAT WE OFFER FOR YOU"

- Background putih. Section Title centered.
- **Filter tab** (centered) di bawah judul: `All • Breads • Cakes • Cookies • Pastries • Muffins`.
  - Dipisah titik bullet kecil abu.
  - Font 17px, warna abu; tab aktif (`All`) = oranye.
  - Klik tab = filter produk berdasarkan kategori (aktif/oranye berpindah).
- **Grid produk 2 kolom × 3 baris** (6 item) memakai komponen Product Item.
- Di bawah grid: tombol outline `VIEW ALL PRODUCTS`, centered, jarak ±40px dari grid.
- Mobile: 1 kolom.

Data produk (sesuai referensi):

| Nama | Kategori | Harga |
|---|---|---|
| Sourdough | Breads | $ 3.99 |
| Maple Oat Muffin | Muffins | $ 6.95 |
| Amaretti Cookie | Cookies | $ 12.25 |
| Croissant | Pastries | $ 3.50 |
| Black forest | Cakes | $ 34.00 |
| Ciabatta | Breads | $ 4.50 |

Deskripsi tiap produk: 1–2 kalimat pendek (maks. 2 baris).

---

## 5. Responsive Breakpoints

| Breakpoint | Perilaku |
|---|---|
| ≥ 1200px | Layout desktop penuh seperti referensi |
| 992–1199px | Container mengecil, spacing menu dikurangi |
| 768–991px | Service 2 kolom, produk tetap 2 kolom (foto lebih kecil ±100px) |
| < 768px | Semua 1 kolom, navbar → hamburger, hero 360px, Our Bakery stack |

---

## 6. Interaksi & Animasi

- Hover menu / link: transisi warna 0.2–0.3s ke oranye.
- Hover tombol outline: transisi 0.2s (isi warna gelap).
- Slider: auto-play ±5 detik, bisa digeser lewat panah & dot.
- Filter produk: fade/hide sederhana, tanpa library berat.
- Dropdown "Features": muncul saat hover (desktop) / tap (mobile).

---

## 7. Aturan Tegas (Do & Don't)

**Do**
- Pakai CSS variables untuk semua warna dan font.
- Semua gambar punya atribut `alt`.
- Gambar produk pakai PNG transparan, ukuran konsisten.
- Pakai tag semantik: `header`, `nav`, `section`, `footer`.

**Don't**
- Jangan tambah warna aksen lain selain `--color-primary`.
- Jangan pakai tombol solid berwarna untuk CTA (harus outline).
- Jangan ubah bentuk lingkaran jadi kotak/rounded-rect.
- Jangan pakai shadow tebal / gradient; gaya harus flat.
- Jangan install library UI besar hanya untuk halaman ini.

---

## 8. Checklist Penerimaan (Definition of Done)

- [ ] Top bar oranye berisi sosial + kontak
- [ ] Navbar: logo kiri, 6 menu + tombol outline kanan, menu aktif oranye
- [ ] Hero slider full-width dengan overlay, 2 panah lingkaran, 3 dot
- [ ] 4 card service dengan lingkaran oranye + ikon putih
- [ ] Section Our Bakery split 50/50 (foto kiri, teks kanan abu muda)
- [ ] Filter tab 6 item berfungsi, tab aktif oranye
- [ ] 6 produk tampil 2 kolom dengan foto lingkaran + harga oranye
- [ ] Tombol "VIEW ALL PRODUCTS" outline di bawah grid
- [ ] Semua judul section punya divider abu + oranye
- [ ] Responsif: tampilan rapi di 375px, 768px, 1440px

---

## 9. Hal yang Tidak Terlihat di Referensi

Bagian di bawah ini **belum ada di screenshot**: teks hero, footer, halaman Products/Blog/Contact. Jangan dikarang detail visualnya. Jika dibutuhkan, minta brief tambahan, atau pakai gaya yang konsisten dengan token di dokumen ini (warna, font, tombol outline, divider).

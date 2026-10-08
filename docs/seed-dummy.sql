-- Data dummy produk Yaya's Bakery
-- Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi file ini > Run.
-- Aman dijalankan ulang: produk yang namanya sudah ada tidak dimasukkan lagi.
-- Jalankan docs/schema.sql dulu sebelum file ini.

insert into public.produk (nama, harga, deskripsi, foto_url, kategori_id)
select v.nama, v.harga, v.deskripsi, v.foto_url, k.id
from (values
  ('Roti Sisir Mentega 250 g', 25000, 'Roti sisir lembut dengan olesan mentega manis.', '/produk/nastar.svg', 'roti-manis'),
  ('Donat Glaze isi 4', 22000, 'Donat empuk dengan lapisan glaze gula.', '/produk/nastar.svg', 'roti-manis'),
  ('Roti Pisang Cokelat', 18000, 'Roti dengan isian pisang dan cokelat.', '/produk/nastar.svg', 'roti-manis'),
  ('Roti Abon Sapi 200 g', 32000, 'Roti gurih dengan taburan abon sapi.', '/produk/keripik.svg', 'roti-asin'),
  ('Roti Ayam Teriyaki', 20000, 'Roti dengan isian ayam saus teriyaki.', '/produk/keripik.svg', 'roti-asin'),
  ('Roti Kornet Keju', 17000, 'Roti dengan isian kornet dan keju.', '/produk/keripik.svg', 'roti-asin'),
  ('Kastengel Toples 400 g', 95000, 'Kastengel renyah dengan taburan keju.', '/produk/nastar.svg', 'kue-kering'),
  ('Lidah Kucing 300 g', 65000, 'Kue lidah kucing renyah rasa vanila.', '/produk/nastar.svg', 'kue-kering'),
  ('Putri Salju 350 g', 75000, 'Kue putri salju dengan taburan gula halus.', '/produk/nastar.svg', 'kue-kering'),
  ('Cokelat Hangat 250 ml', 20000, 'Minuman cokelat hangat yang manis dan creamy.', '/produk/kopi.svg', 'minuman'),
  ('Thai Tea 250 ml', 15000, 'Teh susu Thailand yang manis dan segar.', '/produk/kopi.svg', 'minuman'),
  ('Es Matcha Latte 250 ml', 22000, 'Minuman matcha dengan susu segar.', '/produk/kopi.svg', 'minuman')
) as v (nama, harga, deskripsi, foto_url, slug)
join public.kategori k on k.slug = v.slug
left join public.produk p on p.nama = v.nama
where p.id is null;

-- Skema database Katalog UMKM (Yaya's Bakery)
-- Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi file ini > Run.
-- Aman dijalankan ulang.

-- 1. Tabel kategori
create table if not exists public.kategori (
  id bigint generated always as identity primary key,
  nama text not null unique,
  slug text not null unique,
  deskripsi text,
  created_at timestamptz not null default now()
);

-- 2. Tabel produk (kolom kategori teks lama sudah dihapus, diganti kategori_id)
create table if not exists public.produk (
  id bigint generated always as identity primary key,
  nama text not null,
  harga integer not null check (harga >= 0),
  deskripsi text,
  foto_url text,
  kategori_id bigint references public.kategori (id) on delete restrict,
  created_at timestamptz not null default now()
);

-- Migrasi dari skema lama: tambah kategori_id bila belum ada.
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'produk' and column_name = 'kategori_id'
  ) then
    alter table public.produk
      add column kategori_id bigint references public.kategori (id) on delete restrict;
  end if;
end $$;

-- 3. Row Level Security
-- Tidak ada izin untuk publik: akses langsung ke tabel dari luar aplikasi ditolak.
-- Hanya admin yang sudah login yang boleh membaca dan mengubah data.
alter table public.produk enable row level security;
alter table public.kategori enable row level security;

drop policy if exists "admin_baca_produk" on public.produk;
drop policy if exists "admin_tambah_produk" on public.produk;
drop policy if exists "admin_ubah_produk" on public.produk;
drop policy if exists "admin_hapus_produk" on public.produk;

create policy "admin_baca_produk" on public.produk
  for select to authenticated using (true);

create policy "admin_tambah_produk" on public.produk
  for insert to authenticated with check (true);

create policy "admin_ubah_produk" on public.produk
  for update to authenticated using (true) with check (true);

create policy "admin_hapus_produk" on public.produk
  for delete to authenticated using (true);

drop policy if exists "admin_baca_kategori" on public.kategori;
drop policy if exists "admin_tambah_kategori" on public.kategori;
drop policy if exists "admin_ubah_kategori" on public.kategori;
drop policy if exists "admin_hapus_kategori" on public.kategori;

create policy "admin_baca_kategori" on public.kategori
  for select to authenticated using (true);

create policy "admin_tambah_kategori" on public.kategori
  for insert to authenticated with check (true);

create policy "admin_ubah_kategori" on public.kategori
  for update to authenticated using (true) with check (true);

create policy "admin_hapus_kategori" on public.kategori
  for delete to authenticated using (true);

-- 4. Data kategori awal
insert into public.kategori (nama, slug, deskripsi) values
  ('Roti Manis', 'roti-manis', 'Roti sobek, donat, dan roti isi manis.'),
  ('Roti Asin', 'roti-asin', 'Roti abon, sosis, dan isian gurih.'),
  ('Kue Kering', 'kue-kering', 'Nastar, kastengel, dan kue toples.'),
  ('Minuman', 'minuman', 'Kopi, teh, dan cokelat.')
on conflict (slug) do nothing;

-- 5. Migrasi data lama (hanya jika kolom kategori teks masih ada).
-- Membuat kategori dari nilai teks lama, lalu mengisi kategori_id.
do $$ begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'produk' and column_name = 'kategori'
  ) then
    insert into public.kategori (nama, slug)
    select distinct trim(p.kategori) as nama,
      lower(trim(both '-' from regexp_replace(trim(p.kategori), '[^a-zA-Z0-9]+', '-', 'g'))) as slug
    from public.produk p
    where p.kategori is not null and trim(p.kategori) <> ''
      and not exists (select 1 from public.kategori k where k.nama = trim(p.kategori))
    on conflict (slug) do nothing;

    update public.produk p set kategori_id = k.id
    from public.kategori k
    where p.kategori_id is null and k.nama = trim(p.kategori);
  end if;
end $$;

-- 6. Produk yang belum punya kategori memakai kategori pertama.
do $$ declare kategori_pertama bigint; begin
  select id into kategori_pertama from public.kategori order by id limit 1;
  if kategori_pertama is not null then
    update public.produk set kategori_id = kategori_pertama where kategori_id is null;
  end if;
end $$;

-- 7. Hapus kolom kategori teks lama (sudah diganti kategori_id).
alter table public.produk drop column if exists kategori;

-- 8. Wajibkan kategori_id bila tidak ada baris null.
do $$ begin
  if not exists (select 1 from public.produk where kategori_id is null) then
    alter table public.produk alter column kategori_id set not null;
  end if;
end $$;

-- 9. Data produk awal (hanya diisi jika tabel masih kosong)
insert into public.produk (nama, harga, deskripsi, foto_url, kategori_id)
select data_awal.nama, data_awal.harga, data_awal.deskripsi, data_awal.foto_url,
  (select id from public.kategori where slug = data_awal.slug)
from (values
  ('Roti Sobek Cokelat 300 g', 28000, 'Roti sobek lembut dengan isian cokelat lumer.', '/produk/nastar.svg', 'roti-manis'),
  ('Donat Kentang isi 6', 35000, 'Donat kentang empuk dengan topping meses dan keju.', '/produk/nastar.svg', 'roti-manis'),
  ('Roti Abon Ayam 200 g', 30000, 'Roti gurih dengan taburan abon ayam.', '/produk/keripik.svg', 'roti-asin'),
  ('Roti Sosis Keju', 15000, 'Roti dengan isian sosis dan lelehan keju.', '/produk/keripik.svg', 'roti-asin'),
  ('Kue Nastar Toples 500 g', 85000, 'Nastar lembut dengan selai nanas buatan sendiri. Dikemas toples kedap udara.', '/produk/nastar.svg', 'kue-kering'),
  ('Kopi Susu Gula Aren 250 ml', 18000, 'Es kopi susu dengan gula aren asli.', '/produk/kopi.svg', 'minuman')
) as data_awal (nama, harga, deskripsi, foto_url, slug)
where not exists (select 1 from public.produk);

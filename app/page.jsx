import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const urlPeta = `https://maps.google.com/maps?q=${encodeURIComponent(toko.alamat)}&output=embed`;
const urlWhatsAppToko = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(
  `Halo ${toko.nama}, saya ingin bertanya tentang produk Anda.`
)}`;

export default async function HalamanKatalog({ searchParams }) {
  const { q } = await searchParams;
  const kataKunci = String(q || "").trim();

  const supabase = createServerSupabase();
  let query = supabase
    .from("produk")
    .select("*, kategori:kategori_id (id, nama, slug)")
    .order("created_at", { ascending: false });

  if (kataKunci) {
    query = query.ilike("nama", `%${kataKunci}%`);
  }

  const { data: daftarProduk, error } = await query;

  return (
    <>
      <section className="grid items-center gap-8 py-10 sm:py-14 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {toko.nama}
          </h1>
          <p className="max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
          <p className="text-sm text-teks-lembut">{toko.jamBuka}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="#produk"
              className="inline-flex items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap"
            >
              Lihat semua produk
            </Link>
            <Link
              href="/kategori"
              className="inline-flex items-center justify-center rounded-lg border border-garis bg-latar px-5 py-3 font-semibold text-teks hover:border-utama hover:text-utama"
            >
              Jelajahi kategori
            </Link>
          </div>
        </div>
        <img
          src="/produk/nastar.svg"
          alt="Kue kering Yaya's Bakery"
          className="aspect-square w-full rounded-2xl border border-garis bg-permukaan object-cover"
        />
      </section>

      <section id="produk" aria-labelledby="judul-produk" className="flex scroll-mt-20 flex-col gap-5 pb-12">
        <h2 id="judul-produk" className="text-xl font-bold">
          {kataKunci ? `Hasil pencarian "${kataKunci}"` : "Semua produk"}
        </h2>
        <form method="get" action="/" className="flex max-w-xl gap-2" role="search">
          <input
            type="search"
            name="q"
            defaultValue={kataKunci}
            placeholder="Cari nama produk..."
            aria-label="Cari produk"
            className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-utama px-4 py-2.5 text-sm font-semibold text-white hover:bg-utama-gelap"
          >
            Cari
          </button>
        </form>
        {kataKunci && (
          <Link href="/" className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama">
            Hapus pencarian
          </Link>
        )}
        {error ? (
          <p className="text-bahaya">Gagal mengambil daftar produk: {error.message}</p>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <p className="text-teks-lembut">
            {kataKunci ? `Tidak ada produk bernama "${kataKunci}".` : "Belum ada produk"}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>

      <section id="tentang" aria-labelledby="judul-tentang" className="flex scroll-mt-20 flex-col gap-4 border-t border-garis py-12">
        <h2 id="judul-tentang" className="text-xl font-bold">
          Tentang {toko.nama}
        </h2>
        <p className="max-w-prose leading-relaxed text-teks-lembut">
          {toko.nama} adalah toko roti yang menjual roti segar setiap hari. Pesan langsung lewat
          WhatsApp, lalu ambil di toko pada jam buka.
        </p>
        <p className="max-w-prose text-sm text-teks-lembut">{toko.alamat}</p>
      </section>

      <section id="kontak" aria-labelledby="judul-kontak" className="flex scroll-mt-20 flex-col gap-5 border-t border-garis py-12">
        <h2 id="judul-kontak" className="text-xl font-bold">
          Hubungi kami
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="max-w-prose text-teks-lembut">
              Tanya stok atau pesan langsung lewat WhatsApp.
            </p>
            <a
              href={urlWhatsAppToko}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto sm:self-start"
            >
              Chat WhatsApp
            </a>
            <p className="text-sm text-teks-lembut">{toko.jamBuka}</p>
          </div>
          <iframe
            title={`Peta lokasi ${toko.nama}`}
            src={urlPeta}
            loading="lazy"
            className="aspect-video w-full rounded-2xl border border-garis"
          />
        </div>
      </section>
    </>
  );
}

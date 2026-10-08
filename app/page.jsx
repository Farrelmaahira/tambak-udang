import Link from "next/link";
import { toko } from "@/lib/toko";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  const supabase = createServerSupabase();
  const { data: daftarKategori, error } = await supabase
    .from("kategori")
    .select("*")
    .order("nama");

  let jumlahPerKategori = {};
  if (!error && daftarKategori) {
    const { data: daftarProduk } = await supabase.from("produk").select("kategori_id");
    jumlahPerKategori = (daftarProduk || []).reduce((acc, produk) => {
      acc[produk.kategori_id] = (acc[produk.kategori_id] || 0) + 1;
      return acc;
    }, {});
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-kategori" className="flex flex-col gap-5 pb-12">
        <h2 id="judul-kategori" className="text-xl font-bold">
          Pilih kategori
        </h2>
        {error ? (
          <p className="text-bahaya">Gagal mengambil daftar kategori: {error.message}</p>
        ) : !daftarKategori || daftarKategori.length === 0 ? (
          <p className="text-teks-lembut">Belum ada kategori</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarKategori.map((kategori) => (
              <Link
                key={kategori.id}
                href={`/kategori/${kategori.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-garis bg-latar p-5 hover:border-utama"
              >
                <h3 className="font-bold leading-snug group-hover:text-utama">
                  {kategori.nama}
                </h3>
                {kategori.deskripsi && (
                  <p className="text-sm text-teks-lembut">{kategori.deskripsi}</p>
                )}
                <p className="mt-auto text-sm font-semibold text-teks-lembut">
                  {jumlahPerKategori[kategori.id] || 0} produk
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

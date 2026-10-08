import Link from "next/link";
import { notFound } from "next/navigation";
import KartuProduk from "@/components/KartuProduk";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKategori({ params }) {
  const { slug } = await params;

  const supabase = createServerSupabase();
  const { data: kategori, error: errorKategori } = await supabase
    .from("kategori")
    .select("*")
    .eq("slug", slug)
    .single();

  if (errorKategori || !kategori) {
    notFound();
  }

  const { data: daftarProduk, error: errorProduk } = await supabase
    .from("produk")
    .select("*, kategori:kategori_id (id, nama, slug)")
    .eq("kategori_id", kategori.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="py-8">
        <Link href="/" className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama">
          Semua kategori
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">{kategori.nama}</h1>
        {kategori.deskripsi && (
          <p className="mt-2 max-w-prose text-teks-lembut">{kategori.deskripsi}</p>
        )}
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5 pb-12">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk {kategori.nama}
        </h2>
        {errorProduk ? (
          <p className="text-bahaya">Gagal mengambil daftar produk: {errorProduk.message}</p>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <p className="text-teks-lembut">Belum ada produk</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

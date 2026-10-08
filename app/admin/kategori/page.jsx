import NavAdmin from "@/components/NavAdmin";
import Tombol from "@/components/Tombol";
import TombolHapus from "@/components/TombolHapus";
import { hapusKategoriAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export default async function HalamanKategori() {
  const supabase = await createClient();
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
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Kategori</h1>
        <Tombol href="/admin/kategori/baru">Tambah kategori</Tombol>
      </div>
      {error ? (
        <p className="text-bahaya">Gagal mengambil daftar kategori: {error.message}</p>
      ) : !daftarKategori || daftarKategori.length === 0 ? (
        <p className="text-teks-lembut">Belum ada kategori.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-garis">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-permukaan text-teks-lembut">
              <tr>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Produk</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {daftarKategori.map((kategori) => (
                <tr key={kategori.id} className="border-t border-garis">
                  <td className="px-4 py-3 font-semibold">{kategori.nama}</td>
                  <td className="px-4 py-3 text-teks-lembut">{kategori.slug}</td>
                  <td className="px-4 py-3 text-teks-lembut">
                    {jumlahPerKategori[kategori.id] || 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Tombol href={`/admin/kategori/${kategori.id}/ubah`} varian="garis">
                        Ubah
                      </Tombol>
                      <TombolHapus action={hapusKategoriAction.bind(null, kategori.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

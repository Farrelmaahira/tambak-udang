import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import TombolHapus from "@/components/TombolHapus";

export default function TabelProduk({ daftarProduk, hapusAction }) {
  if (!daftarProduk || daftarProduk.length === 0) {
    return <p className="text-teks-lembut">Belum ada produk.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-garis">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-permukaan text-teks-lembut">
          <tr>
            <th className="px-4 py-3 font-semibold">Produk</th>
            <th className="px-4 py-3 font-semibold">Kategori</th>
            <th className="px-4 py-3 font-semibold">Harga</th>
            <th className="px-4 py-3 font-semibold">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {daftarProduk.map((produk) => {
            const namaKategori =
              produk.kategori && typeof produk.kategori === "object"
                ? produk.kategori.nama
                : produk.kategori;
            return (
              <tr key={produk.id} className="border-t border-garis">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={produk.foto_url} alt="" className="h-10 w-10 rounded-md object-cover" />
                    <span className="font-semibold">{produk.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-teks-lembut">{namaKategori}</td>
                <td className="px-4 py-3">{formatRupiah(produk.harga)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis">
                      Ubah
                    </Tombol>
                    {hapusAction && (
                      <TombolHapus action={hapusAction.bind(null, produk.id)} />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProdukAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/auth";

export default async function HalamanTambahProduk() {
  const supabase = await createClient();
  const { data: daftarKategori } = await supabase
    .from("kategori")
    .select("*")
    .order("nama");

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Tambah produk</h1>
      {(daftarKategori || []).length === 0 ? (
        <p className="text-teks-lembut">
          Buat kategori dulu sebelum menambah produk.
        </p>
      ) : (
        <FormProduk
          daftarKategori={daftarKategori || []}
          action={tambahProdukAction}
          labelTombol="Simpan produk"
        />
      )}
    </div>
  );
}

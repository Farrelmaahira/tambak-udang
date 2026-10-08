import NavAdmin from "@/components/NavAdmin";
import FormKategori from "@/components/FormKategori";
import { tambahKategoriAction } from "@/app/admin/actions";

export default function HalamanTambahKategori() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Tambah kategori</h1>
      <FormKategori action={tambahKategoriAction} labelTombol="Simpan kategori" />
    </div>
  );
}

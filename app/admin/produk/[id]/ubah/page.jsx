import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProdukAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/auth";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !produk) {
    notFound();
  }

  const { data: daftarKategori } = await supabase
    .from("kategori")
    .select("*")
    .order("nama");

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormProduk
        produk={produk}
        daftarKategori={daftarKategori || []}
        action={ubahProdukAction}
        labelTombol="Simpan perubahan"
      />
    </div>
  );
}

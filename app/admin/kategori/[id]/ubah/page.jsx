import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormKategori from "@/components/FormKategori";
import { ubahKategoriAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/auth";

export default async function HalamanUbahKategori({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: kategori, error } = await supabase
    .from("kategori")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !kategori) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah kategori</h1>
      <FormKategori
        kategori={kategori}
        action={ubahKategoriAction}
        labelTombol="Simpan perubahan"
      />
    </div>
  );
}

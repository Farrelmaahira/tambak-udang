"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";

// Dipakai untuk tambah kategori dan ubah kategori. Slug dibuat otomatis dari nama.
export default function FormKategori({ kategori = {}, action, labelTombol, kembaliHref = "/admin/kategori" }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {kategori.id && <input type="hidden" name="id" value={kategori.id} />}
      {state?.error && (
        <p className="rounded border border-bahaya px-3 py-2 text-sm text-bahaya">
          {state.error}
        </p>
      )}
      <Input label="Nama kategori" name="nama" defaultValue={kategori.nama} required />
      <Input
        label="Deskripsi"
        name="deskripsi"
        textarea
        defaultValue={kategori.deskripsi}
        placeholder="Keterangan singkat kategori (opsional)"
      />
      <p className="text-sm text-teks-lembut">
        Alamat halaman kategori (slug) dibuat otomatis dari nama.
      </p>
      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href={kembaliHref} varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}

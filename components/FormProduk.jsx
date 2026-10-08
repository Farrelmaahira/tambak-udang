"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";

// Dipakai untuk tambah produk dan ubah produk. Kategori dipilih dari daftar kategori.
export default function FormProduk({ produk = {}, daftarKategori = [], action, labelTombol }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}
      {state?.error && (
        <p className="rounded border border-bahaya px-3 py-2 text-sm text-bahaya">
          {state.error}
        </p>
      )}
      <Input label="Nama produk" name="nama" defaultValue={produk.nama} required />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Kategori
        <select
          name="kategori_id"
          defaultValue={produk.kategori_id ?? ""}
          required
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base font-normal text-teks focus:border-utama focus:outline-none"
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          {daftarKategori.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))}
        </select>
      </label>
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input label="Deskripsi" name="deskripsi" textarea defaultValue={produk.deskripsi} />
      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}

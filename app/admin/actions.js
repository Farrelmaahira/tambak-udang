"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/auth";
import { buatSlug } from "@/lib/slug";

async function wajibLogin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase: null, error: "Anda harus login untuk melakukan aksi ini." };
  }

  return { supabase, error: null };
}

function muatUlang() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password harus diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Login gagal: Email atau password salah." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function changePasswordAction(prevState, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Anda harus login untuk melakukan aksi ini." };
  }

  const passwordBaru = formData.get("password_baru");
  const konfirmasi = formData.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasi) {
    return { error: "Semua kolom harus diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasi) {
    return { error: "Password baru dan konfirmasi tidak cocok." };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return { error: `Gagal mengganti password: ${error.message}` };
  }

  return { success: "Password berhasil diubah." };
}

export async function tambahProdukAction(prevState, formData) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const nama = String(formData.get("nama") || "").trim();
  const harga = Number(formData.get("harga"));
  const kategori_id = Number(formData.get("kategori_id"));
  const foto_url = String(formData.get("foto_url") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!nama) {
    return { error: "Nama produk harus diisi." };
  }

  if (!Number.isFinite(harga) || harga < 0) {
    return { error: "Harga harus berupa angka nol atau lebih." };
  }

  if (!Number.isFinite(kategori_id)) {
    return { error: "Pilih kategori produk." };
  }

  const { data: kategori } = await supabase
    .from("kategori")
    .select("id")
    .eq("id", kategori_id)
    .single();

  if (!kategori) {
    return { error: "Kategori yang dipilih tidak ditemukan." };
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori_id,
    foto_url: foto_url || null,
    deskripsi: deskripsi || null,
  });

  if (error) {
    return { error: `Gagal menyimpan produk: ${error.message}` };
  }

  muatUlang();
  redirect("/admin");
}

export async function ubahProdukAction(prevState, formData) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const id = Number(formData.get("id"));
  const nama = String(formData.get("nama") || "").trim();
  const harga = Number(formData.get("harga"));
  const kategori_id = Number(formData.get("kategori_id"));
  const foto_url = String(formData.get("foto_url") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!Number.isFinite(id)) {
    return { error: "ID produk tidak valid." };
  }

  if (!nama) {
    return { error: "Nama produk harus diisi." };
  }

  if (!Number.isFinite(harga) || harga < 0) {
    return { error: "Harga harus berupa angka nol atau lebih." };
  }

  if (!Number.isFinite(kategori_id)) {
    return { error: "Pilih kategori produk." };
  }

  const { data: kategori } = await supabase
    .from("kategori")
    .select("id")
    .eq("id", kategori_id)
    .single();

  if (!kategori) {
    return { error: "Kategori yang dipilih tidak ditemukan." };
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori_id,
      foto_url: foto_url || null,
      deskripsi: deskripsi || null,
    })
    .eq("id", id);

  if (error) {
    return { error: `Gagal menyimpan perubahan: ${error.message}` };
  }

  muatUlang();
  redirect("/admin");
}

export async function hapusProdukAction(id) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    return { error: `Gagal menghapus produk: ${error.message}` };
  }

  muatUlang();
}

export async function tambahKategoriAction(prevState, formData) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const nama = String(formData.get("nama") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!nama) {
    return { error: "Nama kategori harus diisi." };
  }

  const slug = buatSlug(nama);

  if (!slug) {
    return { error: "Nama kategori harus mengandung huruf atau angka." };
  }

  const { error } = await supabase.from("kategori").insert({
    nama,
    slug,
    deskripsi: deskripsi || null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Nama kategori sudah dipakai. Gunakan nama lain." };
    }
    return { error: `Gagal menyimpan kategori: ${error.message}` };
  }

  muatUlang();
  redirect("/admin/kategori");
}

export async function ubahKategoriAction(prevState, formData) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const id = Number(formData.get("id"));
  const nama = String(formData.get("nama") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!Number.isFinite(id)) {
    return { error: "ID kategori tidak valid." };
  }

  if (!nama) {
    return { error: "Nama kategori harus diisi." };
  }

  const slug = buatSlug(nama);

  if (!slug) {
    return { error: "Nama kategori harus mengandung huruf atau angka." };
  }

  const { data: bentrok } = await supabase
    .from("kategori")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .limit(1);

  if (bentrok && bentrok.length > 0) {
    return { error: "Nama kategori sudah dipakai. Gunakan nama lain." };
  }

  const { error } = await supabase
    .from("kategori")
    .update({ nama, slug, deskripsi: deskripsi || null })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "Nama kategori sudah dipakai. Gunakan nama lain." };
    }
    return { error: `Gagal menyimpan perubahan: ${error.message}` };
  }

  muatUlang();
  redirect("/admin/kategori");
}

export async function hapusKategoriAction(id) {
  const { supabase, error: authError } = await wajibLogin();
  if (authError) {
    return { error: authError };
  }

  const { count } = await supabase
    .from("produk")
    .select("id", { count: "exact", head: true })
    .eq("kategori_id", id);

  if (count > 0) {
    return {
      error: `Kategori masih dipakai ${count} produk. Pindahkan dulu produk tersebut ke kategori lain.`,
    };
  }

  const { error } = await supabase.from("kategori").delete().eq("id", id);

  if (error) {
    return { error: `Gagal menghapus kategori: ${error.message}` };
  }

  muatUlang();
}

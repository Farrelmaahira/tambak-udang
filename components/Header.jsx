import Link from "next/link";
import { toko } from "@/lib/toko";

const urlPesan = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(
  `Halo ${toko.nama}, saya ingin bertanya tentang produk Anda.`
)}`;

export default function Header() {
  return (
    <header className="border-b border-garis bg-latar">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-utama">
          {toko.nama}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="font-semibold hover:text-utama">
            Semua produk
          </Link>
          <Link href="/kategori" className="font-semibold hover:text-utama">
            Kategori
          </Link>
          <Link href="/#tentang" className="font-semibold hover:text-utama">
            Tentang
          </Link>
          <Link href="/#kontak" className="font-semibold hover:text-utama">
            Kontak
          </Link>
        </nav>
        <a
          href={urlPesan}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-utama px-4 py-2.5 text-sm font-semibold text-white hover:bg-utama-gelap sm:ml-auto"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </header>
  );
}

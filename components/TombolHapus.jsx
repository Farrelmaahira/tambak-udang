"use client";

export default function TombolHapus({ action, label = "Hapus" }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("Hapus data ini? Tindakan ini tidak bisa dibatalkan.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg border border-garis bg-latar px-4 py-2.5 text-sm font-semibold text-bahaya transition-colors hover:border-bahaya"
      >
        {label}
      </button>
    </form>
  );
}

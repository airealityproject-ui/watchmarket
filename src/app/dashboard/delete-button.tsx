"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Remove this competitor?")) return;

    await fetch("/api/competitors/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
    >
      Remove
    </button>
  );
}

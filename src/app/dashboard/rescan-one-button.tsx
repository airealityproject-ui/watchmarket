"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RescanOneButton({ competitorId }: { competitorId: number }) {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const router = useRouter();

  async function handleRescan() {
    setStatus("loading");
    try {
      await fetch("/api/competitors/rescan-one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competitorId }),
      });
      router.refresh();
    } catch {
      // silently fail
    } finally {
      setStatus("idle");
    }
  }

  return (
    <button
      onClick={handleRescan}
      disabled={status === "loading"}
      className="text-xs text-slate-500 hover:text-blue-400 transition-colors cursor-pointer disabled:opacity-50"
    >
      {status === "loading" ? "Scanning..." : "Rescan"}
    </button>
  );
}

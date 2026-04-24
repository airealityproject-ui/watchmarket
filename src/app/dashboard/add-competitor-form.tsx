"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddCompetitorForm() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        setUrl("");
        setStatus("idle");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add competitor");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <input
          type="url"
          required
          placeholder="https://competitor.com/pricing"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          {status === "loading" ? "Scanning..." : "Add competitor"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </form>
  );
}

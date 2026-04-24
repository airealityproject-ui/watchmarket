"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DiffResult {
  competitor: string;
  diff?: {
    significantChange: boolean;
    titleChanged: boolean;
    oldTitle?: string;
    newTitle?: string;
    descriptionChanged: boolean;
    addedHeadings: string[];
    removedHeadings: string[];
    textSimilarity: number;
  };
  error?: string;
  note?: string;
}

export function RescanButton() {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [results, setResults] = useState<DiffResult[] | null>(null);
  const router = useRouter();

  async function handleRescan() {
    setStatus("loading");
    setResults(null);

    try {
      const res = await fetch("/api/competitors/rescan", { method: "POST" });
      const data = await res.json();
      setResults(data.results);
      router.refresh();
    } catch {
      setResults([{ competitor: "all", error: "Failed to rescan" }]);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div>
      <button
        onClick={handleRescan}
        disabled={status === "loading"}
        className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
      >
        {status === "loading" ? "Scanning..." : "Rescan all"}
      </button>

      {results && (
        <div className="mt-4 space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                r.error
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : r.diff?.significantChange
                    ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                    : "bg-green-500/10 border border-green-500/20 text-green-400"
              }`}
            >
              <span className="font-medium">{r.competitor}</span>
              {r.error && <span> — Error: {r.error}</span>}
              {r.note && <span> — {r.note}</span>}
              {r.diff && !r.diff.significantChange && (
                <span> — No changes detected</span>
              )}
              {r.diff?.significantChange && (
                <div className="mt-1 space-y-1">
                  {r.diff.titleChanged && (
                    <div>
                      Title: &quot;{r.diff.oldTitle}&quot; → &quot;{r.diff.newTitle}&quot;
                    </div>
                  )}
                  {r.diff.addedHeadings.length > 0 && (
                    <div>
                      New sections: {r.diff.addedHeadings.join(", ")}
                    </div>
                  )}
                  {r.diff.removedHeadings.length > 0 && (
                    <div>
                      Removed: {r.diff.removedHeadings.join(", ")}
                    </div>
                  )}
                  <div>
                    Text similarity: {Math.round(r.diff.textSimilarity * 100)}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

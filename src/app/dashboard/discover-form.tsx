"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Suggestion {
  name: string;
  url: string;
  reason: string;
}

export function DiscoverForm() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [adding, setAdding] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");
  const [limitError, setLimitError] = useState("");
  const router = useRouter();

  async function handleDiscover(e: React.FormEvent) {
    e.preventDefault();
    if (!description) return;

    setStatus("loading");
    setSuggestions([]);
    setError("");

    try {
      const res = await fetch("/api/competitors/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuggestions(data.suggestions);
        setStatus("idle");
      } else {
        setError(data.error || "Failed to discover");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong");
      setStatus("error");
    }
  }

  async function handleAdd(suggestion: Suggestion) {
    setAdding((prev) => new Set(prev).add(suggestion.url));

    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: suggestion.url, name: suggestion.name }),
      });

      if (res.ok) {
        setAdded((prev) => new Set(prev).add(suggestion.url));
        setLimitError("");
        router.refresh();
      } else {
        const data = await res.json();
        setLimitError(data.error || "Failed to add");
      }
    } catch {
      setLimitError("Something went wrong");
    } finally {
      setAdding((prev) => {
        const next = new Set(prev);
        next.delete(suggestion.url);
        return next;
      });
    }
  }

  return (
    <div className="mb-8">
      <details className="group">
        <summary className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer mb-3">
          Don&apos;t know your competitors? Let AI find them →
        </summary>

        <form onSubmit={handleDiscover} className="mt-3 space-y-3">
          <textarea
            placeholder="Describe your product (e.g. 'Mobile app for personal finance tracking with budgeting and expense categories')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm resize-none"
          />
          <button
            type="submit"
            disabled={status === "loading" || !description}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? "Finding competitors..." : "Find competitors"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </form>

        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            {limitError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {limitError}{" "}
                <a href="/pricing" className="underline hover:text-red-300">Upgrade</a>
              </div>
            )}
            <p className="text-sm text-slate-400 mb-2">
              Found {suggestions.length} competitors:
            </p>
            {suggestions.map((s) => (
              <div
                key={s.url}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-blue-400 truncate">{s.url}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.reason}</div>
                </div>
                {added.has(s.url) ? (
                  <span className="text-xs text-green-400 whitespace-nowrap">Added</span>
                ) : (
                  <button
                    onClick={() => handleAdd(s)}
                    disabled={adding.has(s.url)}
                    className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {adding.has(s.url) ? "Adding..." : "Add"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </details>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/app/navbar";

interface ReportData {
  competitors: { name: string; url: string; reason: string }[];
  report: string;
}

export default function ReportPage() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.loggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (res.ok) {
        const result = await res.json();
        setData(result);
        setStatus("done");
      } else {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">AI Competitor Report</h1>
        <p className="text-slate-400 mb-8">
          Describe your product and get an instant competitive analysis — competitors, pricing, positioning, opportunities.
        </p>

        {status !== "done" && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <textarea
              placeholder="Describe your product (e.g. 'Mobile app for personal finance tracking with budgeting, expense categories, and bank sync')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            {loggedIn === false ? (
              <a
                href="/signup?redirect=/report"
                className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500"
              >
                Sign up free to generate
              </a>
            ) : (
              <button
                type="submit"
                disabled={status === "loading" || !description || loggedIn === null}
                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
              >
                {status === "loading"
                  ? "Analyzing competitors... (30-60 sec)"
                  : "Generate free report"}
              </button>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </form>
        )}

        {data && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Report</h2>
              <button
                onClick={() => {
                  setStatus("idle");
                  setData(null);
                  setDescription("");
                }}
                className="text-sm text-slate-500 hover:text-slate-400 cursor-pointer"
              >
                Generate new report
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-500 mb-3">
                Competitors analyzed ({data.competitors.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.competitors.map((c) => (
                  <a
                    key={c.url}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm hover:border-blue-500 transition-colors"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                {data.report}
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <h3 className="font-bold mb-2">Want daily updates on these competitors?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Sign up for Watchmarket and monitor them automatically.
              </p>
              <a
                href="/signup"
                className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
              >
                Start monitoring free
              </a>
            </div>
          </div>
        )}

        {status === "idle" && !data && (
          <div className="mt-12 border-t border-slate-800 pt-8">
            <h2 className="text-lg font-bold mb-4">What you get</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <h3 className="font-medium mb-1">Competitor Discovery</h3>
                <p className="text-sm text-slate-400">AI identifies your top 5 competitors based on your product description</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <h3 className="font-medium mb-1">Pricing Analysis</h3>
                <p className="text-sm text-slate-400">See how competitors price their products and find your sweet spot</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <h3 className="font-medium mb-1">Market Gaps</h3>
                <p className="text-sm text-slate-400">Discover opportunities your competitors are missing</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <h3 className="font-medium mb-1">Positioning Strategy</h3>
                <p className="text-sm text-slate-400">Get AI recommendations on how to differentiate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Check your email to confirm your account.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
            {message}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <a href="/" className="text-sm text-slate-500 hover:text-slate-400 mb-6 inline-block">← Back to home</a>
        <h1 className="text-2xl font-bold mb-2 text-center">Create account</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Track up to 3 competitors for free. AI digests included.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? "Creating..." : "Sign up"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm">{message}</p>
          )}
        </form>
        <p className="text-sm text-slate-500 mt-4 text-center">
          Already have an account?{" "}
          <a href={`/login${redirect ? `?redirect=${redirect}` : ""}`} className="text-blue-400 hover:text-blue-300">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}

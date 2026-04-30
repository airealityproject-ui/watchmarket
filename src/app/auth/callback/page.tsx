"use client";

import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) {
      setStatus("error");
      return;
    }

    fetch("/api/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
          window.location.href = "/dashboard";
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="text-center">
        {status === "loading" && <p className="text-slate-400">Confirming your account...</p>}
        {status === "success" && <p className="text-green-400">Confirmed! Redirecting to dashboard...</p>}
        {status === "error" && (
          <div>
            <p className="text-red-400 mb-4">Something went wrong.</p>
            <a href="/login" className="text-blue-400 hover:text-blue-300">Go to login</a>
          </div>
        )}
      </div>
    </main>
  );
}

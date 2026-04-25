"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.loggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
      <a href="/" className="font-bold text-lg">
        Watchmarket
      </a>
      <div className="flex items-center gap-3">
        <a
          href="/pricing"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Pricing
        </a>
        {loggedIn === null ? null : loggedIn ? (
          <a
            href="/dashboard"
            className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            Dashboard
          </a>
        ) : (
          <>
            <a
              href="/login"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              Sign up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

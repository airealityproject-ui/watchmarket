import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watchmarket — AI Competitive Intelligence for Startups",
  description:
    "Track your competitors automatically. AI-generated digests of pricing changes, new features, and strategic moves. From $49/month.",
  openGraph: {
    title: "Watchmarket — AI Competitive Intelligence",
    description:
      "Stop stalking your competitors manually. AI monitors pricing, features, and moves 24/7. From $49/month.",
    url: "https://watchmarket-phi.vercel.app",
    siteName: "Watchmarket",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchmarket — AI Competitive Intelligence",
    description:
      "Stop stalking your competitors manually. AI monitors pricing, features, and moves 24/7. From $49/month.",
    creator: "@ai_reality_",
  },
  verification: {
    google: "8Y_SYbF5cDpO9qtOBpwgBgxm2Xj5uo-PV-Q7aNQSCWs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-white font-[family-name:var(--font-geist)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

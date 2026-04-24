import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watchmarket — AI Competitive Intelligence for Startups",
  description:
    "Track your competitors automatically. AI-generated digests of pricing changes, new features, and strategic moves. From $49/month.",
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
      </body>
    </html>
  );
}

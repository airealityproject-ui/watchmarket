import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Competitor Report — Watchmarket",
  description:
    "Get a free AI-generated competitive analysis. Describe your product and our AI will find competitors, analyze their strategy, pricing, and positioning.",
  openGraph: {
    title: "Free AI Competitor Report — Watchmarket",
    description:
      "Describe your product, get a free AI competitive analysis in minutes. No signup required.",
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

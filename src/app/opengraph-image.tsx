import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Watchmarket — AI Competitive Intelligence for Startups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#60a5fa",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Built by an AI — @ai_reality_
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
            display: "flex",
          }}
        >
          Stop stalking your competitors manually
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 800,
            display: "flex",
          }}
        >
          AI-powered competitive intelligence. From $49/month.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#475569",
            display: "flex",
          }}
        >
          watchmarket-phi.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

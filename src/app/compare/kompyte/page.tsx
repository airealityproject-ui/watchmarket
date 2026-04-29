import type { Metadata } from "next";
import { Navbar } from "@/app/navbar";

export const metadata: Metadata = {
  title: "Watchmarket vs Kompyte — AI Competitive Intelligence Alternative",
  description:
    "Looking for a Kompyte alternative? Watchmarket offers AI-powered competitive intelligence starting at $49/month with zero onboarding overhead.",
  openGraph: {
    title: "Watchmarket vs Kompyte — AI CI Alternative",
    description:
      "AI-powered competitive monitoring from $49/month. No sales calls, no complex setup.",
  },
};

export default function KompyteComparePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Watchmarket vs Kompyte
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Kompyte (now part of Semrush) focuses on enterprise sales enablement
          with battlecards and win/loss tracking. Great for large sales orgs —
          but overkill if you just need to know what your competitors are doing.
          Watchmarket gives you the intelligence without the overhead.
        </p>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 pr-4 text-slate-500 font-medium">
                  Feature
                </th>
                <th className="text-center py-3 px-4 text-blue-400 font-medium">
                  Watchmarket
                </th>
                <th className="text-center py-3 pl-4 text-slate-400 font-medium">
                  Kompyte
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Starting price</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  $49/month
                </td>
                <td className="py-3 pl-4 text-center">Custom (enterprise)</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Setup time</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  2 minutes
                </td>
                <td className="py-3 pl-4 text-center">Weeks (with onboarding)</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">AI-generated digests</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Website change tracking</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Self-serve signup</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No (demo required)</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Battlecards</td>
                <td className="py-3 px-4 text-center text-slate-500">Coming soon</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Sales enablement</td>
                <td className="py-3 px-4 text-center text-slate-500">No</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Free competitor report</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">When to choose Watchmarket over Kompyte</h2>
          <ul className="space-y-3 text-slate-400">
            <li>
              <span className="text-white">You&apos;re a startup or small team</span> — you need competitive intel, not a full sales enablement platform
            </li>
            <li>
              <span className="text-white">You want AI-powered analysis</span> — not just raw data but actionable insights explaining what changed and why it matters
            </li>
            <li>
              <span className="text-white">You don&apos;t have time for demos and onboarding</span> — sign up, add competitors, get your first digest in minutes
            </li>
            <li>
              <span className="text-white">Budget matters</span> — $49/month vs enterprise pricing that starts at thousands per year
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">When Kompyte might be better</h2>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>You have a large sales team that needs battlecards and competitive playbooks</li>
            <li>You need CRM integrations for win/loss tracking</li>
            <li>You&apos;re already in the Semrush ecosystem</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            Try Watchmarket free
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Get AI-powered competitive intelligence in 2 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/signup"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
            >
              Get started free
            </a>
            <a
              href="/report"
              className="px-8 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              Try free report first
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

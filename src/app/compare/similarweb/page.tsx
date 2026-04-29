import type { Metadata } from "next";
import { Navbar } from "@/app/navbar";

export const metadata: Metadata = {
  title: "Watchmarket vs Similarweb — Competitive Intelligence for Startups",
  description:
    "Similarweb is great for traffic analytics but costs $10k+/year. Watchmarket monitors competitor websites and sends AI digests for $49/month.",
  openGraph: {
    title: "Watchmarket vs Similarweb — CI for Startups",
    description:
      "Competitor monitoring with AI digests from $49/month. Not traffic analytics — competitive intelligence.",
  },
};

export default function SimilarwebComparePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Watchmarket vs Similarweb
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Similarweb is a traffic analytics powerhouse — website visits, traffic
          sources, audience overlap. But if you need to know when a competitor
          changes their pricing, launches a feature, or shifts strategy,
          Similarweb won&apos;t tell you. Watchmarket will.
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
                  Similarweb
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Starting price</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  $49/month
                </td>
                <td className="py-3 pl-4 text-center">$149/month (limited)</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Website content monitoring</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Pricing change detection</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">AI-generated digests</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Traffic analytics</td>
                <td className="py-3 px-4 text-center text-slate-500">No</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Audience demographics</td>
                <td className="py-3 px-4 text-center text-slate-500">No</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Email alerts on changes</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">Limited</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Self-serve (no sales call)</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Different tools for different jobs</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-slate-900 border border-blue-500/20">
              <div className="text-blue-400 text-sm font-medium mb-2">Watchmarket</div>
              <p className="text-sm text-slate-400">
                &quot;What are my competitors <span className="text-white">doing</span>?&quot;
                — pricing changes, new features, messaging shifts, strategic moves.
                AI analyzes and explains what matters.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-sm font-medium mb-2">Similarweb</div>
              <p className="text-sm text-slate-400">
                &quot;How much <span className="text-white">traffic</span> do my competitors get?&quot;
                — visits, sources, geography, audience overlap.
                Analytics for market sizing and benchmarking.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Why founders choose Watchmarket</h2>
          <ul className="space-y-3 text-slate-400">
            <li>
              <span className="text-white">Actionable over analytical</span> — you don&apos;t need traffic estimates, you need to know when a competitor drops prices by 30%
            </li>
            <li>
              <span className="text-white">AI does the work</span> — no dashboards to stare at, you get a digest explaining what changed and what to do about it
            </li>
            <li>
              <span className="text-white">10x cheaper</span> — $49/month vs $149+/month for Similarweb&apos;s limited starter plan
            </li>
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

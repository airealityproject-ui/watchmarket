import type { Metadata } from "next";
import { Navbar } from "@/app/navbar";

export const metadata: Metadata = {
  title: "Watchmarket vs Competitors.app — Smarter Competitive Monitoring",
  description:
    "Looking for a Competitors.app alternative? Watchmarket adds AI-powered analysis on top of website monitoring. From $49/month.",
  openGraph: {
    title: "Watchmarket vs Competitors.app — Smarter CI",
    description:
      "Website monitoring + AI analysis. Know what changed AND why it matters. From $49/month.",
  },
};

export default function CompetitorsAppComparePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Watchmarket vs Competitors.app
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Competitors.app monitors website changes and sends screenshots.
          Useful — but you still have to figure out what the changes mean.
          Watchmarket uses AI to analyze changes and tell you what matters
          and what to do about it.
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
                  Competitors.app
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Starting price</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  $49/month
                </td>
                <td className="py-3 pl-4 text-center">$19/month</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Website change tracking</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">AI-powered analysis</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Actionable recommendations</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Screenshot comparisons</td>
                <td className="py-3 px-4 text-center text-slate-500">No</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Email digest</td>
                <td className="py-3 px-4 text-center text-green-400">AI digest</td>
                <td className="py-3 pl-4 text-center text-green-400">Change alerts</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Social media monitoring</td>
                <td className="py-3 px-4 text-center text-slate-500">Coming soon</td>
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
          <h2 className="text-xl font-bold mb-4">Monitoring vs Intelligence</h2>
          <p className="text-slate-400 mb-4">
            Competitors.app tells you <span className="text-white">what changed</span>.
            Watchmarket tells you <span className="text-white">what it means</span>.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-sm font-medium mb-2">Competitors.app alert</div>
              <p className="text-sm text-slate-500 italic">
                &quot;competitor.com/pricing changed. View screenshot.&quot;
              </p>
            </div>
            <div className="p-5 rounded-lg bg-slate-900 border border-blue-500/20">
              <div className="text-blue-400 text-sm font-medium mb-2">Watchmarket digest</div>
              <p className="text-sm text-slate-400">
                &quot;Competitor raised Enterprise tier by 25%. They removed the free trial.
                This suggests they&apos;re moving upmarket.
                <span className="text-white"> Action: target their SMB customers with a comparison page.</span>&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Choose Watchmarket if you want</h2>
          <ul className="space-y-3 text-slate-400">
            <li>
              <span className="text-white">AI analysis, not just alerts</span> — understand the strategic meaning behind every change
            </li>
            <li>
              <span className="text-white">Less noise</span> — AI filters out insignificant changes, you only hear about what matters
            </li>
            <li>
              <span className="text-white">Instant competitive reports</span> — describe your product, get a full analysis free
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

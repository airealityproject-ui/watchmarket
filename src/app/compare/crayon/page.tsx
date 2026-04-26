import type { Metadata } from "next";
import { Navbar } from "@/app/navbar";
import { WaitlistForm } from "@/app/waitlist-form";

export const metadata: Metadata = {
  title: "Watchmarket vs Crayon — Affordable Competitive Intelligence",
  description:
    "Looking for a Crayon alternative? Watchmarket offers AI-powered competitive intelligence starting at $49/month — not $15k/year.",
  openGraph: {
    title: "Watchmarket vs Crayon — Affordable Competitive Intelligence",
    description:
      "AI-powered competitive monitoring from $49/month. No enterprise contracts.",
  },
};

export default function CrayonComparePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Watchmarket vs Crayon
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Crayon is the enterprise standard for competitive intelligence. But
          at $15,000+/year with manual curation overhead, it&apos;s not built
          for startups and small teams. Watchmarket is.
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
                  Crayon
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Starting price</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  $49/month
                </td>
                <td className="py-3 pl-4 text-center">~$15,000/year</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Setup time</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  2 minutes
                </td>
                <td className="py-3 pl-4 text-center">Days to weeks</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">AI-generated digests</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">
                  Manual curation
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Website change tracking</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Pricing page monitoring</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Self-serve (no sales call)</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Dedicated team required</td>
                <td className="py-3 px-4 text-center text-green-400">No</td>
                <td className="py-3 pl-4 text-center text-slate-500">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Battlecards</td>
                <td className="py-3 px-4 text-center text-slate-500">
                  Coming soon
                </td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Win/loss analysis</td>
                <td className="py-3 px-4 text-center text-slate-500">
                  Coming soon
                </td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Who is Watchmarket for?</h2>
          <ul className="space-y-3 text-slate-400">
            <li>
              <span className="text-white">Startups</span> — who need
              competitive intelligence but can&apos;t afford enterprise tools
            </li>
            <li>
              <span className="text-white">Solo founders</span> — who
              don&apos;t have a team to manually curate competitor data
            </li>
            <li>
              <span className="text-white">Product managers</span> — who want
              automated monitoring without the enterprise overhead
            </li>
            <li>
              <span className="text-white">Growth teams</span> — who need to
              react quickly to competitor moves
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            Common complaints about Crayon
          </h2>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              &quot;The platform requires highly manual daily curation&quot; —
              Capterra review
            </li>
            <li>
              &quot;Very cost prohibitive when upgrading plans&quot; — Capterra
              review
            </li>
            <li>
              &quot;Once selected, it was like squeezing water from a stone to
              get the vendor&apos;s attention&quot; — Capterra review
            </li>
            <li>
              &quot;UI is clunky with difficult navigation&quot; — G2 review
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            Try Watchmarket — free during early access
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Join the waitlist. Be the first to get AI-powered competitive
            intelligence at a startup-friendly price.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}

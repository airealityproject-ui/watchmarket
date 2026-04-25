import type { Metadata } from "next";
import { WaitlistForm } from "@/app/waitlist-form";

export const metadata: Metadata = {
  title: "Watchmarket vs Klue — Competitive Intelligence Without Enterprise Pricing",
  description:
    "Looking for a Klue alternative? Watchmarket offers AI-powered competitive intelligence starting at $49/month with zero setup overhead.",
  openGraph: {
    title: "Watchmarket vs Klue — CI Without Enterprise Pricing",
    description:
      "AI-powered competitive monitoring from $49/month. No battlecard maintenance. No dedicated PMM required.",
  },
};

export default function KlueComparePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a
          href="/"
          className="text-sm text-slate-500 hover:text-slate-400 mb-8 inline-block"
        >
          ← Back to Watchmarket
        </a>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Watchmarket vs Klue
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Klue is rated #1 on G2 for competitive enablement. But it requires
          dedicated PMM resources, extensive setup, and enterprise budgets.
          Watchmarket delivers the core value — knowing what your competitors
          are doing — without the overhead.
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
                  Klue
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Starting price</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  $49/month
                </td>
                <td className="py-3 pl-4 text-center">Enterprise pricing</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Setup time</td>
                <td className="py-3 px-4 text-center text-white font-medium">
                  2 minutes
                </td>
                <td className="py-3 pl-4 text-center">Weeks</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">AI-generated digests</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">
                  AI assists, needs manual review
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Dedicated PMM required</td>
                <td className="py-3 px-4 text-center text-green-400">No</td>
                <td className="py-3 pl-4 text-center text-slate-500">
                  Yes — content goes stale without it
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Website change tracking</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Self-serve</td>
                <td className="py-3 px-4 text-center text-green-400">Yes</td>
                <td className="py-3 pl-4 text-center text-slate-500">No</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Battlecards</td>
                <td className="py-3 px-4 text-center text-slate-500">
                  Coming soon
                </td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 pr-4">Win/loss analysis</td>
                <td className="py-3 px-4 text-center text-slate-500">
                  Coming soon
                </td>
                <td className="py-3 pl-4 text-center text-green-400">Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">G2 rating</td>
                <td className="py-3 px-4 text-center text-slate-500">New</td>
                <td className="py-3 pl-4 text-center text-green-400">
                  9.5/10
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            When to choose Watchmarket over Klue
          </h2>
          <ul className="space-y-3 text-slate-400">
            <li>
              You&apos;re a <span className="text-white">startup or small team</span> without
              a dedicated competitive intelligence program
            </li>
            <li>
              You want <span className="text-white">automated insights</span>, not
              another tool to manually maintain
            </li>
            <li>
              You need to <span className="text-white">start today</span>, not
              after a 2-week onboarding process
            </li>
            <li>
              Your budget is <span className="text-white">$49-299/month</span>,
              not $15k+/year
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            Common complaints about Klue
          </h2>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              &quot;Relies on curators to keep battlecards updated — without
              dedicated PMM resources, content goes stale&quot; — G2 review
            </li>
            <li>
              &quot;Alert refinement needs to be simpler, lots of noise comes
              through&quot; — G2 review
            </li>
            <li>
              &quot;AI functionality sometimes generates irrelevant noise&quot;
              — G2 review
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            Try Watchmarket — free during early access
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Join the waitlist. AI-powered competitive intelligence at a price
            that makes sense.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}

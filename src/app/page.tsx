import { Navbar } from "./navbar";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Watchmarket",
  applicationCategory: "BusinessApplication",
  description:
    "AI-powered competitive intelligence for startups. Monitor competitors 24/7 and get smart digests of pricing changes, new features, and strategic moves.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "299",
    priceCurrency: "USD",
    offerCount: "4",
  },
  operatingSystem: "Web",
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            Built by an AI — follow the journey{" "}
            <a
              href="https://x.com/ai_reality_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              @ai_reality_
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
            Stop stalking your competitors{" "}
            <span className="text-slate-400">manually</span>
          </h1>

          <p className="text-lg text-slate-400 mb-4 leading-relaxed">
            Watchmarket monitors your competitors 24/7 — pricing pages,
            features, blog posts, reviews — and sends you an{" "}
            <span className="text-white font-medium">
              AI-generated digest
            </span>{" "}
            of what actually matters.
          </p>

          <p className="text-slate-500 mb-6">
            No more 3-4 tools stitched together. No more $15k/year enterprise
            contracts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href="/signup"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
            >
              Get started free
            </a>
            <a
              href="/pricing"
              className="px-8 py-3 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-300 hover:border-blue-500 transition-colors"
            >
              See pricing
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            Free during early access
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Add competitors</h3>
              <p className="text-sm text-slate-400">
                Paste their URLs. That&apos;s it. No complex setup, no
                onboarding calls.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">AI monitors 24/7</h3>
              <p className="text-sm text-slate-400">
                We track pricing, features, blog posts, job listings, reviews,
                and social media.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get smart digests</h3>
              <p className="text-sm text-slate-400">
                Not raw data dumps. AI explains what changed, why it matters,
                and what you should do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Enterprise intelligence, startup pricing
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-red-400 text-sm font-medium mb-2">
                Without Watchmarket
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Manually checking competitor sites weekly</li>
                <li>• Juggling 3-4 different monitoring tools</li>
                <li>• Drowning in raw alerts with no context</li>
                <li>• Paying $15k+/year for enterprise tools</li>
                <li>• Missing critical changes until it&apos;s too late</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-slate-900 border border-blue-500/30">
              <div className="text-blue-400 text-sm font-medium mb-2">
                With Watchmarket
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  • <span className="text-white">One dashboard</span> for all
                  competitive intel
                </li>
                <li>
                  • <span className="text-white">AI digests</span> that explain
                  what matters
                </li>
                <li>
                  • <span className="text-white">Instant alerts</span> on
                  significant changes
                </li>
                <li>
                  • <span className="text-white">$49/month</span> — not
                  $15k/year
                </li>
                <li>
                  • <span className="text-white">Setup in 2 minutes</span> — not
                  2 weeks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sample digest */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            What you&apos;ll get every morning
          </h2>
          <p className="text-slate-500 text-center mb-8">
            A real AI-generated digest — not raw data dumps
          </p>
          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-slate-900 border border-blue-500/20">
            <div className="text-blue-400 text-sm font-medium mb-3">
              AI Digest — April 25, 2026
            </div>
            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                <span className="text-white font-medium">YNAB raised prices by 20%.</span>{" "}
                Monthly plan went from $14.99 to $17.99. New &quot;Family&quot; tier at $24.99/month added. This signals confidence in retention but may push price-sensitive users to alternatives.
              </p>
              <p>
                <span className="text-white font-medium">Suggested action:</span>{" "}
                Create a &quot;switching from YNAB&quot; landing page and target YNAB-related keywords in the next 2 weeks while frustration is fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Compare Watchmarket
          </h2>
          <p className="text-slate-500 mb-8">
            See how we stack up against enterprise tools
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/compare/crayon"
              className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              vs Crayon
            </a>
            <a
              href="/compare/klue"
              className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              vs Klue
            </a>
            <a
              href="/compare/kompyte"
              className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              vs Kompyte
            </a>
            <a
              href="/compare/similarweb"
              className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              vs Similarweb
            </a>
            <a
              href="/compare/competitors-app"
              className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-slate-600 transition-colors"
            >
              vs Competitors.app
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-600">
        <p>
          Watchmarket — built by{" "}
          <a
            href="https://x.com/ai_reality_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-400"
          >
            an AI
          </a>
        </p>
      </footer>
    </main>
  );
}

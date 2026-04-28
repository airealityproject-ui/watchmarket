import type { Metadata } from "next";
import { Navbar } from "@/app/navbar";

export const metadata: Metadata = {
  title: "Pricing — Watchmarket",
  description:
    "AI-powered competitive intelligence starting at $49/month. Track competitors, get AI digests, react faster.",
};

const plans = [
  {
    name: "Starter",
    price: 49,
    variantId: "1586309", // test: 1586309, prod: 1585516
    description: "For solo founders tracking a few competitors",
    features: [
      "3 competitors",
      "Daily AI digests",
      "Change detection",
      "Dashboard access",
      "Email alerts",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 149,
    variantId: "1586289", // test: 1586289, prod: 1585490
    description: "For growing teams that need deeper insights",
    features: [
      "10 competitors",
      "Daily AI digests",
      "Real-time alerts",
      "Scan history (90 days)",
      "API access",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: 299,
    variantId: "1586316", // test: 1586316, prod: 1585517
    description: "For teams running competitive programs",
    features: [
      "25 competitors",
      "Daily AI digests",
      "Real-time alerts",
      "Unlimited scan history",
      "API access",
      "Team members (5)",
      "Slack integration",
      "Dedicated support",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-400">
            No enterprise contracts. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-lg border ${
                plan.highlighted
                  ? "bg-slate-900 border-blue-500/50"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <div className="text-xs text-blue-400 font-medium mb-2">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`https://watchmarket.lemonsqueezy.com/checkout/buy/${plan.variantId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-2.5 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Subscribe
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">
            Start free today
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Track up to 3 competitors for free. Early adopters get 50% off paid plans.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
          >
            Get started free
          </a>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-12">
          <h2 className="text-xl font-bold text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="font-semibold mb-1">
                What counts as a &quot;competitor&quot;?
              </h3>
              <p className="text-sm text-slate-400">
                Each URL you track counts as one competitor. For example,
                tracking both stripe.com/pricing and stripe.com/blog would count
                as two competitors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                How often are competitors scanned?
              </h3>
              <p className="text-sm text-slate-400">
                All plans include daily scans. Pro and Business plans also get
                real-time alerts for significant changes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I cancel anytime?</h3>
              <p className="text-sm text-slate-400">
                Yes. No contracts, no commitments. Cancel with one click and
                you won&apos;t be charged again.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                What makes the AI digest different from raw alerts?
              </h3>
              <p className="text-sm text-slate-400">
                Instead of &quot;47 changes detected&quot;, you get a brief
                analysis: what changed, why it matters, and what you should
                consider doing. Written by AI that understands competitive
                strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

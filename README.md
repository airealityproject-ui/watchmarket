# Watchmarket

AI-powered competitive intelligence for startups.

Monitor your competitors' websites 24/7 — pricing pages, features, blog posts — and get AI-generated digests of what changed and why it matters.

## The Experiment

This entire product is built by an AI (Claude). No humans write code. The AI makes all product and technical decisions. A human admin assists with manual actions (creating accounts, publishing posts).

Follow the journey: [@ai_reality_](https://x.com/ai_reality_) on Twitter.

## Features

- **Competitor tracking** — Add any URL, we scrape and monitor it daily
- **Change detection** — Diff engine compares snapshots and finds what changed
- **AI digests** — Claude generates actionable intelligence from raw changes
- **Dashboard** — View competitors, scan history, digest history
- **Auto-scanning** — Daily cron job rescans all competitors
- **Multi-tenant** — Each user sees only their data
- **Free plan** — Track up to 3 competitors for free

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **AI:** Claude API (Haiku for digests)
- **Scraping:** Cheerio + fetch
- **Payments:** Lemon Squeezy (coming soon)
- **Hosting:** Vercel
- **Cost:** ~$5/month (all free tiers)

## Live

[watchmarket.dev](https://watchmarket.dev)

## Timeline

- **Day 1:** Product choice, strategy, Twitter setup
- **Day 2:** Landing page, scraper, dashboard, deploy
- **Day 3:** AI digests, auth, pricing, SEO pages, multi-tenant
- **Day 4:** Payments integration, outreach, scheduled agents

## License

MIT

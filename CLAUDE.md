# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
cd app
npm run dev          # Start dev server (Next.js 16)
npm run build        # Production build — run before deploying
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

Deployed on Vercel (auto-deploy on push). Production URL: `watchmarket.dev`

## Architecture

Next.js 16 App Router, TypeScript, Tailwind CSS v4. All source code lives in `app/src/`.

### Auth Flow
- Supabase Auth with manual cookie management (not `@supabase/ssr` auth helpers)
- `src/lib/auth.ts` — `getCurrentUserId()`: reads `access_token` cookie, falls back to `refresh_token` auto-renewal
- `src/middleware.ts` — protects `/dashboard/*` routes, redirects to `/login`. Also supports legacy `DASHBOARD_PASSWORD` query param
- Auth cookies: `access_token` (7d), `refresh_token` (30d), both httpOnly + secure + strict

### Two Supabase Clients
- `src/lib/supabase.ts` — **server-side** with `SUPABASE_SERVICE_ROLE_KEY` (lazy singleton via `getSupabase()`)
- `src/lib/supabase-browser.ts` — **client-side** with `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Lazy init pattern required: Vercel doesn't have env vars at import time during build

### Database Tables (Supabase PostgreSQL)
- `competitors` — user_id, url, name (duplicate check by hostname)
- `snapshots` — competitor_id, title, description, headings, body_text, links, scraped_at
- `subscriptions` — user_id, plan, status, lemon_squeezy_id
- `waitlist` — email (legacy)

### Payments
- Lemon Squeezy as Merchant of Record (Stripe unavailable)
- `src/lib/payments/lemonsqueezy.ts` — checkout URL creation, subscription status
- `src/app/api/webhooks/lemonsqueezy/route.ts` — handles subscription_created/updated events
- Pricing page uses hardcoded prod checkout Share URLs (not API-generated)
- Plan limits: free=3, starter=3, pro=10, business=25 competitors

### AI Integration
- Claude Haiku (`claude-haiku-4-5-20251001`) for competitor discovery and report generation
- `src/lib/ai/digest.ts` — AI digest generation from snapshot diffs
- `src/app/api/report/route.ts` — free report: discover competitors -> scrape each -> generate analysis
- `src/app/api/competitors/discover/route.ts` — AI competitor discovery (auth required)
- JSON parsing from Claude responses uses regex extraction: `text.match(/\[[\s\S]*\]/)`

### Scraping
- `src/lib/scraper/fetch-page.ts` — Cheerio + fetch, returns `PageSnapshot` (title, description, headings, bodyText, links)
- `src/lib/scraper/store.ts` — CRUD for competitors/snapshots, duplicate detection by hostname
- `src/lib/scraper/diff.ts` — change detection between snapshots

### Key Pages
- `/` — landing page (server component)
- `/report` — free AI competitor report (client component, requires auth via client-side check)
- `/dashboard` — main app with competitor list, add/discover/rescan/delete (auth required)
- `/pricing` — 3-tier pricing with Lemon Squeezy checkout links
- `/compare/*` — SEO comparison pages (vs Crayon, vs Klue)

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_WEBHOOK_SECRET
DASHBOARD_PASSWORD          # legacy auth
RESEND_API_KEY              # email digests
```

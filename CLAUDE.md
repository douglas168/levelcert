# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GoCertNow.com** — A platform helping young professionals and career-switchers earn beginner-to-intermediate certifications. Combines video courses, a mock exam system with AI-explained answers, and social media content automation.

**Starting vertical:** IPAS AI應用規劃師 (初級 + 中級) — used as the pilot to build and validate the content generation workflow and website before expanding to other cert verticals.

**Long-term vision:** B2C → Marketplace → SaaS layer.
1. Prove the model with IPAS (B2C, Taiwan)
2. Expand to more cert verticals using the AI workflow
3. Open the platform — invite other cert instructors and training companies to create and sell on GoCertNow (take a 20–30% platform cut)
4. Package the AI cert-content generation workflow as a paid creator tool (SaaS subscription for platform creators)

**Defensible moat:** Cert prep is outcome-binary (pass or fail). GoCertNow owns that outcome — AI-generated content + mock exam system + pass guarantee. This survives AI commoditization because the passing score can't be faked.

**Business model:** Pay-per-course with 3-month access.
- **Failed exam (1st time):** 1 free 3-month extension — student forwards official IPAS failure email (from registered email) to trigger n8n automation that verifies and extends `access_expires_at` in Supabase.
- **Failed exam (2nd time / after extension used):** 50% discount code to repurchase the course.
- **Maximum free access:** 6 months (3 + 3). No further free extensions.

## Repository Structure

This repo contains everything about the project — not just website code.

```
gocertnow/
├── web/                    # Next.js website (the product)
├── content/                # Course content creation pipeline (internal tool)
│   ├── _templates/         # Reusable prompt + lesson templates
│   ├── _scripts/           # AI generation scripts (Node.js)
│   └── ipas/               # IPAS cert vertical (pilot)
│       ├── beginner/
│       └── intermediate/
├── social/                 # Social media automation (FB, X, IG)
│   ├── n8n/                # n8n workflow JSON exports
│   ├── templates/          # Caption templates per platform
│   ├── assets/             # Brand assets, image base templates
│   └── scripts/            # sharp/canvas image card generation
├── supabase/               # DB schema & migrations (shared across web + scripts)
│   ├── migrations/
│   └── seed/
├── docs/
│   ├── brand/              # Brand reference, domain registration
│   ├── planning/           # Build plans, workflow specs
│   ├── future-courses/     # Research on future cert verticals
│   └── competitors/        # Competitor analysis
└── .github/workflows/      # CI/CD
```

## Tech Stack

### Web (`web/`)
- **Framework:** Next.js 14+ (App Router) — rendering layer only, no business logic
- **Styling:** Tailwind CSS + shadcn/ui
- **i18n:** `i18next` + `react-i18next` — shared translation files with future mobile app
- **Auth:** Clerk (Google + email login) — has React Native SDK for mobile parity
- **Payments:** Stripe — has `stripe-react-native` SDK for mobile parity
- **Deployment:** Vercel (deploys from `web/`)

### Mobile (future — `mobile/`)
- **Framework:** React Native + Expo
- **Styling:** NativeWind (Tailwind syntax in React Native) + custom components
- **Auth:** Clerk React Native SDK
- **Payments:** `stripe-react-native`
- **Deployment:** Expo EAS

### Backend (shared by web + mobile)
- **Database + business logic:** Supabase (PostgreSQL + Row Level Security + Edge Functions)
  - All business logic lives here — never in Next.js server code — so mobile can reuse it
- **Video hosting:** Bunny.net (private CDN streaming — works on any platform)
- **Automation:** n8n (self-hosted) for social media pipeline + exam failure extension
- **Image generation:** Node.js using `sharp` + `canvas`
- **AI content:** Gemini 2.0 Flash for course content generation, social media copy, and mock exam answer explanations (fallback to Claude Haiku/Sonnet if quality insufficient)

### Shared
- **i18n translation files:** `shared/locales/en.json` + `shared/locales/zh.json` — consumed by both web and mobile

## Key Architecture Decisions

- **Language strategy — Dual market:**
  - **Traditional Chinese (繁體中文):** Taiwan-specific certs (IPAS) — UI, content, and marketing all in Chinese
  - **English:** International certs (AWS, Google, PMP, etc.) — UI, content, and marketing in English
  - Pilot (IPAS) launches in Traditional Chinese first; English language support added when expanding to international cert verticals
  - Next.js i18n routing handles both — `/zh/` for Chinese, `/en/` for English (or subdomain strategy: `tw.gocertnow.com` vs `gocertnow.com`)
- Course access is time-gated via `access_expires_at` in Supabase
- Mock exam is the core differentiator: timed 60-question simulator, score breakdown by category, AI-generated explanations for wrong answers
- **Content format — Hybrid model:**
  - **Module intro (1–2 min):** AI avatar video (HeyGen + TTS) — one per module for premium feel
  - **Lesson content:** Text + diagrams + audio narration — scannable, updatable, SEO-friendly, AI-workflow-native
  - **Concept summaries:** Bullet callout boxes for fast pre-exam review
  - **Wrong answer explanations:** Text only — students re-read, not re-watch
  - Rationale: exam prep students review content 5–10× before the exam; text is scannable, video is not. Text is also trivial to update when syllabus changes and is generated natively by the Gemini content workflow.
- Social media automation: RSS → Gemini API → image cards + captions → Airtable review queue → Buffer publish
- Content generation workflow is an **internal tool first** — scripts in `content/_scripts/`, run locally, push output to Supabase

## Site Routes (`web/`)

```
/                          — Landing page
/courses                   — Course listing (filter by 初級/中級)
/courses/[slug]            — Course detail + purchase
/learn/[slug]/[lesson]     — Lesson player (auth-gated)
/exam/[slug]               — Mock exam (auth-gated)
/exam/[slug]/result        — Score report + AI explanations
/dashboard                 — User courses, progress, access expiry
/login                     — Clerk auth
```

## Build Phases

1. **Pilot — IPAS B2C (Now):** Content generation workflow for IPAS 初級/中級, website with landing page, course pages, lesson player, Stripe checkout, Clerk auth, progress tracking
2. **Mock Exam System:** Question bank in Supabase (tagged by topic + level), timed exam simulator, score reports, AI explanations for wrong answers, n8n failure-email extension automation
3. **Scale Verticals (6–18 months):** Add 2–3 more cert verticals (AWS, Google, PMP etc.) using the proven AI content workflow. Each new cert = days of work, not months.
4. **Open the Platform (18+ months):** Invite other cert instructors and training companies to create and sell on GoCertNow. Platform takes 20–30% cut. Add creator dashboard, instructor onboarding, revenue sharing.
5. **SaaS Layer:** Package the AI cert-content generation workflow as a paid add-on for platform creators (subscription for AI credits — content gen, exam question gen, explanation gen).

## Current State

Project is in **scaffolding phase** — repository structure is set up, no application code written yet. Existing files are planning documents in `docs/`.

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaaS online course platform for IPAS AI應用規劃師 certification exam prep (初級 and 中級 levels). The product combines video courses, a mock exam system with AI-explained answers, and social media content automation.

**Business model:** Pay-per-course with 3-month access. Failed exam → free extension until next exam date.

## Planned Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Clerk (Google + email login)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe (one-time payments, Taiwan credit cards)
- **Video hosting:** Bunny.net (private CDN streaming)
- **Deployment:** Vercel
- **Automation:** n8n (self-hosted) for social media pipeline
- **Image generation:** Node.js script using `sharp` + `canvas`
- **AI content:** Gemini API for social media + mock exam answer explanations (start with Gemini 2.0 Flash; upgrade to Claude Haiku/Sonnet only if explanation quality is insufficient)

## Key Architecture Decisions

- All UI text and content is in **Traditional Chinese (繁體中文)** — Taiwan market only
- Course access is time-gated via `access_expires_at` field in Supabase
- Mock exam system is the core differentiator: timed 60-question simulator, score breakdown by category, AI-generated explanations for wrong answers using Gemini 2.0 Flash (fallback to Claude if quality insufficient)
- Video content is AI-generated (HeyGen avatar + TTS), not live presenter
- Social media automation: RSS → Gemini API → image cards + captions → Airtable review queue → Buffer publish

## Site Routes

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

1. **MVP:** Landing page, course pages, lesson player, Stripe checkout, Clerk auth, progress tracking
2. **Mock Exam System:** Question bank in Supabase (tagged by topic + level), timed exam simulator, score reports, Gemini 2.0 Flash for wrong-answer explanations, retry wrong answers, failed-exam auto-extension
3. **Growth:** Newsletter, completion certificates, Discord integration, admin panel, referral system

## Current State

Project is in **planning phase** — no application code has been written yet. The repository contains planning documents (workflow specs, website build plan, competitor analysis).

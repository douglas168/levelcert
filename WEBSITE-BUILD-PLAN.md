# Online Course Website — Build Plan

## Recommended Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SEO-friendly, fast, industry standard for SaaS |
| Styling | **Tailwind CSS + shadcn/ui** | Beautiful components fast, matches Duotify's clean look |
| Auth | **Clerk** | Google login (like Duotify), free tier, dead simple with Next.js |
| Database | **Supabase** | PostgreSQL, free tier, handles user/course/progress data |
| Payments | **Stripe** | Taiwan credit cards, one-time + subscription, best DX |
| Video | **Bunny.net** | Affordable CDN streaming, private video |
| Deployment | **Vercel** | Free tier, zero-config for Next.js |

**Estimated monthly infra cost at launch: ~$5–15/mo** (Bunny.net + Supabase free + Vercel free)

---

## What You Learned From Competitors

| Competitor | Strength to Copy | Weakness to Beat |
|---|---|---|
| **Duotify** | Clean UX, Google login, Discord | No mock exams |
| **360d** | AI-powered practice, error analysis, pass guarantee | Clunky UX, LINE-based (not scalable) |
| **iSpan** | Brand trust | In-person only, NT$10,500, no self-pace |
| **CPC** | Structured modules | Remote Teams calls, not async |

**Your edge:** Duotify's UX + 360d's mock exam system + self-paced async + your own pricing model.

---

## Build Phases

### Phase 1 — MVP: Course + Payment (Launch first)

**Pages:**
- `/` — Landing page (hero, course list, pricing, social proof)
- `/courses/[slug]` — Course detail (syllabus, preview video, buy button)
- `/learn/[slug]/[lesson]` — Lesson player (Bunny.net embed, progress bar, next/prev)
- `/dashboard` — User's purchased courses + progress
- `/login` — Clerk auth (Google + email)

**Core features:**
- Stripe checkout → grant access on payment success
- 3-month access expiry stored in Supabase (`access_expires_at` field)
- Progress tracking per lesson (checked off)
- Protected routes (middleware checks auth + access)

---

### Phase 2 — Mock Exam System (Key differentiator)

This is what beats all your competitors on value. Build:

- **Question bank** — stored in Supabase, tagged by topic + exam level (初級/中級)
- **Timed exam simulator** — 60-question test, countdown timer, matches real IPAS format
- **Score report** — breakdown by category, wrong answers highlighted
- **AI error explanation** — for each wrong answer, call Claude API to explain why the correct answer is right (this is your 360d-killer feature)
- **Retry wrong answers** — filter and re-test only failed questions
- **Failed exam → free extension** — form submission or auto-extend `access_expires_at`

---

### Phase 3 — Growth Features

- Newsletter signup (Resend or ConvertKit)
- Certificate of completion (generated PDF)
- Discord deep link in dashboard
- Admin panel (upload lessons, manage users, see revenue)
- Affiliate/referral links

---

## Site Structure (Duotify-inspired)

```
/                          ← Landing page
/courses                   ← All courses (filter by level: 初級 / 中級)
/courses/ipas-junior       ← Course detail + buy
/courses/ipas-intermediate
/learn/ipas-junior/01      ← Lesson player (auth-gated)
/exam/ipas-junior          ← Mock exam (auth-gated)
/exam/ipas-junior/result   ← Score report + AI explanations
/dashboard                 ← My courses, progress, access expiry
/login
```

---

## Pricing Implementation (Stripe)

| Product | Stripe Setup |
|---|---|
| Course purchase | One-time payment → set `access_expires_at = now + 90 days` |
| Failed exam extension | Webhook or admin action → extend date to next exam window |
| Future: bundle deal | Stripe coupon or product bundle |

---

## Key Differentiators to Build In From Day 1

1. **AI-explained wrong answers** — nobody in your competitor list does this
2. **Access expiry with failed-exam guarantee** — builds trust, reduces purchase friction
3. **Clean async self-paced UX** — beats iSpan/CPC's live session model
4. **Chinese-first design** — Traditional Chinese UI, Taiwan-focused content
5. **Progress bar per course** — motivation loop Duotify doesn't have

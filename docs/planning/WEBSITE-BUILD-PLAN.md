# Online Course Website — Build Plan

## Recommended Tech Stack

### Web
| Layer | Tool | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SEO-friendly, fast — rendering layer only, no business logic |
| Styling | **Tailwind CSS + shadcn/ui** | Beautiful components fast |
| i18n | **i18next + react-i18next** | Portable to React Native — shared translation files with mobile |
| Auth | **Clerk** | Google login, free tier, has React Native SDK for mobile parity |
| Payments | **Stripe** | Taiwan + international cards, has `stripe-react-native` for mobile parity |
| Video | **Bunny.net** | Affordable CDN streaming, works on any platform |
| Deployment | **Vercel** | Free tier, zero-config for Next.js |

### Mobile (future)
| Layer | Tool | Why |
|---|---|---|
| Framework | **React Native + Expo** | Natural companion to Next.js/Supabase stack — same TypeScript, same SDKs |
| Styling | **NativeWind** | Tailwind syntax in React Native — familiar to web devs |
| Deployment | **Expo EAS** | Standard for Expo apps |

### Backend (shared — web + mobile)
| Layer | Tool | Why |
|---|---|---|
| Database | **Supabase** | PostgreSQL + RLS + Edge Functions — business logic lives here, not in Next.js |
| Automation | **n8n (self-hosted)** | Social media pipeline + exam failure email extension |
| Image gen | **Node.js sharp + canvas** | Social media image card generation |
| AI content | **Gemini 2.0 Flash** | Course content gen, exam explanations, social copy (fallback: Claude) |

### Shared
| Layer | Tool | Why |
|---|---|---|
| i18n files | **`shared/locales/en.json` + `zh.json`** | Single source of truth for all UI strings across web and mobile |

**Estimated monthly infra cost at launch: ~$5–15/mo** (Bunny.net + Supabase free + Vercel free)

**Critical architecture rule:** All business logic (access control, exam rules, extension eligibility) lives in **Supabase RLS policies and Edge Functions** — never in Next.js server components. This ensures mobile app can reuse the same backend without rewriting rules.

---

## What You Learned From Competitors

### Local (Taiwan)

| Competitor | Strength to Copy | Weakness to Beat |
|---|---|---|
| **Duotify** | Clean UX, Google login, Discord | No mock exams |
| **360d** | AI-powered practice, error analysis, pass guarantee | Clunky UX, LINE-based (not scalable) |
| **iSpan** | Brand trust | In-person only, NT$10,500, no self-pace |
| **CPC** | Structured modules | Remote Teams calls, not async |

**Near-term edge:** Duotify's UX + 360d's mock exam system + self-paced async + pass guarantee with n8n auto-extension.

### Long-term Benchmark

| Benchmark | What They Do | How GoCertNow Differs |
|---|---|---|
| **Coursebox.ai** | B2B SaaS LMS — sell course creation tools to training companies | GoCertNow is outcome-focused (pass the exam), not just content creation |
| **Udemy** | Open marketplace, any topic | GoCertNow is cert-specific — every course maps to a real exam |
| **Teachable / Kajabi** | Creator tools, B2C courses | GoCertNow adds AI exam simulation + pass guarantee as platform-level features |

**Long-term moat:** Cert prep is binary — pass or fail. GoCertNow owns the outcome, not just the content. When the platform opens to other instructors, that outcome focus (mock exams, AI explanations, pass guarantee) becomes a platform-level differentiator no generic LMS can match.

---

## Build Phases

### Phase 1 — IPAS Pilot: B2C Launch (Now)

**Pages:**
- `/` — Landing page (hero, course list, pricing, social proof)
- `/courses/[slug]` — Course detail (syllabus, preview video, buy button)
- `/learn/[slug]/[lesson]` — Lesson player (text + diagrams + audio, progress bar, next/prev)
- `/dashboard` — User's purchased courses + progress + access expiry
- `/login` — Clerk auth (Google + email)

**Content structure:**
- **Micro-lessons:** One testable concept per lesson, 5–9 minutes of reading/video each
- **Splitting rule:** If a concept needs >9 min to explain, break it into independently testable sub-concepts
- **Exam traceability:** Each mock exam question maps back to a specific micro-lesson, enabling the weakness radar to point students to the exact lesson they need to review
- **Format:** Text + diagrams + audio narration (scannable, reviewable — exam prep students review 5–10× before the exam)
- **See:** `docs/planning/RPG-LITE-SCOPE.md` for full micro-lesson rationale and RPG gamification layer

**Core features:**
- Stripe checkout → grant access on payment success
- 3-month access expiry stored in Supabase (`access_expires_at`)
- Progress tracking per lesson
- Protected routes (middleware checks auth + access)
- n8n failure-email extension automation (1 free 3-month extension, then 50% discount)

---

### Phase 2 — Mock Exam System (Core differentiator)

- **Question bank** — Supabase, tagged by topic + exam level (初級/中級)
- **Timed exam simulator** — 60-question test, countdown timer, real IPAS format
- **Score report** — breakdown by category, wrong answers highlighted
- **AI error explanation** — Gemini 2.0 Flash explains each wrong answer (fallback to Claude)
- **Retry wrong answers** — re-test failed questions only
- **Certificate of completion** — generated PDF on passing score

---

### Phase 3 — Scale Verticals (6–18 months)

- Add 2–3 more cert verticals (AWS, Google certs, PMP) using the proven AI content workflow
- Each new cert = run the generation scripts, review output, publish — days not months
- Expand social media automation to cover new cert audiences
- Admin panel: upload lessons, manage users, see revenue per vertical

---

### Phase 4 — Open the Platform (18+ months)

- Instructor onboarding flow — other cert trainers can apply to sell on GoCertNow
- Creator dashboard — upload content, set pricing, view earnings
- Platform revenue share — GoCertNow takes 20–30% of each sale
- All platform courses get access to: mock exam builder, AI explanation engine, pass guarantee framework
- Affiliate / referral links

---

### Phase 5 — SaaS Layer

- Package the AI content generation workflow as a paid creator add-on
- Subscription tiers for instructors: AI credits for content gen, exam question gen, explanation gen
- This is the Coursebox-equivalent play — but cert-focused and built on a proven learner base

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

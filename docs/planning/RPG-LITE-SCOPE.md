# RPG-Lite Scope — Gamified Learning Layer

**Purpose:** Define which RPG/gamification elements ship in each phase and how they map to specific pages and components. This document is an input to the design system — every `ui-ux-pro-max` query and page override should reference it.

**Design philosophy:** RPG as a UX metaphor and engagement layer, not a game. Every gamification element must directly serve the goal of **helping students pass the certification exam**. If it doesn't improve learning outcomes, retention, or study habits — it doesn't ship.

---

## RPG ↔ Learning Mapping

Every gamification element maps to a real RPG mechanic that students (especially gamers) will instantly recognize.

| Feature | RPG Name (中文) | RPG Name (English) | Gaming Origin | Phase |
|---|---|---|---|---|
| XP + Progress Bar | 經驗值 + 進度 | EXP + Progress | Universal RPG | 1 |
| Section Quizzes | 小怪戰鬥 | Mob Battle | RPG mob encounters | 1 |
| Mock Exam | 頭目戰 (Boss) | Boss Battle | RPG boss fight | 1 |
| Achievement Badges | 成就徽章 | Achievements | Xbox/Steam/PSN achievements | 1 |
| Weakness Radar | 能力雷達圖 | Stat Radar | RPG character stats | 1 |
| Daily Quest | 每日委託 / 每日任務 | Daily Quest | Genshin Impact, WoW dailies | 1 |

---

## Phase 1 — RPG-Lite Elements (Ship with IPAS Pilot)

### 1. XP + Progress Bar

| Aspect | Detail |
|---|---|
| **What** | Numeric XP score + visual progress bar per course |
| **Why** | Students need to feel momentum. Progress visualization is the single most validated engagement mechanic in edtech (Duolingo, Khan Academy, Coursera all use it). |
| **How it works** | Completing a lesson = XP. Progress bar maps to "% exam-ready" (not abstract levels). XP is earned, never lost. |
| **Where it appears** | Dashboard (per-course progress card), Lesson player (top bar + XP gain toast on completion), Course detail page (progress indicator for enrolled users) |
| **Data model** | `user_progress` table: `user_id`, `course_id`, `lesson_id`, `completed_at`, `xp_earned` |
| **Keep it simple** | No leveling system in Phase 1. Just XP total + progress percentage. Levels come in Phase 2 when exam scores provide meaningful tier thresholds. |

### 2. Section Quizzes as Mob Battles (小怪戰鬥)

| Aspect | Detail |
|---|---|
| **What** | 3–5 question quiz after completing all micro-lessons in a section, framed as a "mob battle" encounter |
| **Why** | **Testing effect (retrieval practice)** — recalling information strengthens memory far more than re-reading. Students who quiz themselves after learning retain 50–80% more. Immediate feedback closes the gap between "I read it" and "I can answer questions about it." |
| **How it works** | After completing all lessons in a section, a quiz appears ("Enemies ahead!"). 3–5 questions drawn from that section's topic pool. Immediate feedback on each answer — correct answer + brief AI explanation for wrong answers. No hard gate — recommend retry if <70%, but students can proceed. Unlimited retries with shuffled questions. |
| **Progression rhythm** | Lesson (XP) → Lesson (XP) → Lesson (XP) → **Section Quiz / Mob Battle** (XP + badge chance) → next section → ... → **Mock Exam / Boss Battle** |
| **Where it appears** | Section quiz page (`/learn/[slug]/quiz/[section]`) — compact quiz UI between lesson player and exam page in complexity |
| **Data model** | Reuses `exam_answers` table: `user_id`, `question_id`, `selected_answer`, `is_correct`, `category_tag`, `context` (= "section_quiz" or "mock_exam"). Question source is the same question bank, filtered by section tags. |
| **Feeds other RPG elements** | Quiz answers count toward **daily streak** (5 questions/day). Quiz scores update the **weakness radar** in real-time during the course, not just after mock exams. Quiz completion can trigger **badges**. |
| **Keep it simple** | No timer on section quizzes (unlike mock exams). No HP bar — save that for the boss battle. Keep the UI calm and learning-focused. The mob battle framing is in the copy and subtle visuals, not a full battle skin. |

### 3. Mock Exam as Boss Battle (頭目戰)

| Aspect | Detail |
|---|---|
| **What** | Frame the timed mock exam experience using boss battle metaphors — the final test after all sections and mini-bosses are cleared |
| **Why** | Makes the most stressful part of exam prep feel like a challenge to conquer rather than a test to fear. Reframes failure as "try again" not "you failed." |
| **How it works** | Entering exam = "entering the boss arena." Timer = battle clock. Wrong answers = HP loss (visual health bar drains). Score report = "battle report" with category breakdown. |
| **Progression context** | Mob battles (section quizzes) prepare students incrementally. By the time they reach the boss battle, they've already been tested on every section. The boss battle is the culmination, not a surprise. |
| **Where it appears** | Exam page (`/exam/[slug]`) — battle UI wrapper around the standard exam engine, Exam result page (`/exam/[slug]/result`) — battle report layout |
| **Data model** | Reuses `exam_answers` table (`context` = "mock_exam"). No separate data model — visual layer only. |
| **Keep it simple** | The boss battle is a **visual skin on the exam**, not a different mode. The underlying exam logic (60 questions, timer, scoring) is identical to the real IPAS format. No RPG elements that change exam behavior. |

### 4. Achievement Badges

| Aspect | Detail |
|---|---|
| **What** | Unlockable badges for real learning milestones |
| **Why** | Provides micro-rewards between the big milestones (course completion, exam pass). Shareable badges double as social proof marketing. |
| **Phase 1 badge set** | |
| | "First Steps" — Complete first lesson |
| | "Knowledge Seeker" — Complete 50% of a course |
| | "Fully Prepared" — Complete 100% of a course |
| | "Mob Slayer" — Pass first section quiz with 100% |
| | "Area Cleared" — Pass all section quizzes in a course |
| | "Streak Warrior" — Maintain a 7-day streak |
| | "Streak Master" — Maintain a 30-day streak |
| | "Mock Exam Challenger" — Complete first mock exam |
| | "Passing Score" — Score 70%+ on a mock exam |
| | "Exam Slayer" — Score 90%+ on a mock exam |
| **Where it appears** | Dashboard (badge showcase section), Exam result page (badge unlock animation on qualifying score) |
| **Data model** | `user_badges` table: `user_id`, `badge_id`, `unlocked_at`. Badge definitions in code (not DB) for Phase 1. |
| **Keep it simple** | Static badge set defined in code. No custom badge creator. No badge trading. Shareable badge images (for social media) are a Phase 2 feature. |

### 5. Weakness Radar Chart (能力雷達圖)

| Aspect | Detail |
|---|---|
| **What** | Spider/radar chart showing mastery level across exam topic categories |
| **Why** | Students instantly see where to focus study time. This is genuinely useful — it's good UX that *looks* like a game stat screen. Directly improves study efficiency. |
| **How it works** | Each exam category (e.g., 機器學習, 資料處理, AI倫理) is an axis. Score per axis = (correct answers in category / total questions in category). Updates after every section quiz, daily streak question, and mock exam — students see their radar grow throughout the course, not just at the end. |
| **Where it appears** | Dashboard (main feature — "Your Skill Radar"), Exam result page (category breakdown visualized as radar) |
| **Data model** | Derived from `exam_answers` table: `user_id`, `question_id`, `selected_answer`, `is_correct`, `category_tag`. No separate table needed — computed at query time or cached. |
| **Keep it simple** | Read-only visualization. No "skill point allocation." No AI-recommended study path in Phase 1 (add in Phase 2 after collecting enough user data to validate recommendations). |

### 6. Daily Quest (每日委託)

| Aspect | Detail |
|---|---|
| **What** | "Answer 5 questions a day" streak counter with flame/fire visual |
| **Why** | Drives spaced repetition (proven study technique) and daily return habit. Loss aversion — students don't want to break the streak. |
| **How it works** | Answer 5 practice questions (from any course) → streak day recorded. Miss a day → streak resets to 0. Questions are drawn from section quizzes the student has already encountered (shuffled from completed sections). |
| **Where it appears** | Dashboard (streak counter with flame icon, streak calendar heatmap), Navigation bar (small streak badge — always visible when logged in) |
| **Data model** | `user_streaks` table: `user_id`, `streak_date`, `questions_answered` |
| **Keep it simple** | No streak freeze or streak recovery items in Phase 1. Just the raw streak. Consider freeze mechanic in Phase 2 if data shows users churning after streak breaks. |

---

## Content Structure — Micro-Lessons

**Rule: One testable concept per lesson.**

Each lesson teaches exactly one thing the student could be tested on in the real IPAS exam. If it takes more than 9 minutes to explain, split it into separate lessons.

| Aspect | Detail |
|---|---|
| **Target length** | 5–9 minutes of video or reading per lesson |
| **Splitting rule** | If a concept requires >9 min, break it into sub-concepts that are independently testable |
| **Why this length** | Cognitive load theory — working memory handles ~4 chunks at a time. A 5–9 min micro-lesson covers 2–3 focused concepts before needing a break. |
| **Mobile-first fit** | Target users study on commute and lunch breaks (10–15 min windows). One lesson + a practice question fits in a single session. |
| **RPG synergy** | Short lessons = more completion events = more XP gains = stronger dopamine loop. A student finishing 3 lessons in 20 min feels more accomplished than being 33% through a 60-min lecture. |
| **Exam traceability** | Each mock exam question maps back to a specific lesson. The weakness radar can point students to the exact lesson they need to review — not a vague chapter. |
| **Content format** | Text + diagrams + audio narration (not video-first). Scannable, reviewable, updatable — exam prep students review content 5–10× before the exam. |

---

## Explicitly Deferred (NOT in Phase 1)

| Feature | Why Deferred | Earliest Phase |
|---|---|---|
| **Character classes / avatars** (AI 法師, 雲端戰士) | No learning benefit for single-cert launch. Maps naturally to cert paths when multiple verticals exist. | Phase 3 (multiple certs) |
| **Guild / 公會 system** | Social features need critical mass (~500+ active users). Use Discord until then. | Phase 3+ |
| **Trading post / note exchange** | Marketplace-within-a-marketplace. Massive scope, moderation overhead, zero impact on pass rates. | Phase 4 (platform) |
| **Loot boxes / gacha** | Crosses from engaging to distracting. Career switchers will find it unserious. | Likely never |
| **Leaderboard** | Can backfire — discourages lower-performing students. Revisit with opt-in design. | Phase 2 (opt-in) |
| **Level system (LV 1-100)** | Needs exam score data to create meaningful tiers. Raw XP + progress % is sufficient for launch. | Phase 2 |
| **Streak freeze / recovery items** | Need churn data from Phase 1 streak usage to know if this matters. | Phase 2+ |
| **AI-recommended study path** | Need user behavior data to validate recommendations. | Phase 2 |
| **Shareable badge images** | Nice-to-have social proof. Not core to learning. | Phase 2 |

---

## Page ↔ RPG Element Mapping

This table shows which RPG elements appear on which pages. Use this when generating `ui-ux-pro-max` page overrides.

| Page | RPG Elements | Notes |
|---|---|---|
| **Landing** (`/`) | Mention gamified experience in hero/features section | Selling point, not functional — show screenshots of dashboard with XP, radar, badges |
| **Course detail** (`/courses/[slug]`) | Progress bar (for enrolled users) | Non-enrolled users see standard course info |
| **Lesson player** (`/learn/[slug]/[lesson]`) | XP gain toast on lesson completion, progress bar in header | Minimal — don't distract from content |
| **Section quiz** (`/learn/[slug]/quiz/[section]`) | Mob battle framing, XP gain, immediate answer feedback, badge unlock | Calm UI — no HP bar or timer. Learning-focused, not battle-focused |
| **Dashboard** (`/dashboard`) | XP + progress bars, streak counter + calendar, weakness radar chart, badge showcase | This is the RPG "home screen" — most elements concentrated here |
| **Exam** (`/exam/[slug]`) | Boss battle visual skin — HP bar, battle clock, arena framing | Visual only — exam logic unchanged. The culmination after all mob battles cleared |
| **Exam result** (`/exam/[slug]/result`) | Battle report layout, radar chart, badge unlock animation | Reframes score report as victory/retry screen |

---

## Design System Implications

When running `ui-ux-pro-max` queries, include these constraints:

1. **RPG elements must feel professional, not childish** — target audience includes career switchers (25-35). Think "polished game UI" not "cartoon gamification."
2. **RPG is a layer, not the identity** — GoCertNow is a cert prep platform that uses game mechanics, not a game that teaches certs. The brand should lead with credibility and outcomes.
3. **Dashboard is the most RPG-dense page** — it needs to balance data density (courses, progress, access expiry) with the game elements (XP, streak, radar, badges) without feeling cluttered.
4. **Exam page needs maximum focus** — RPG skin should enhance the battle intensity, not add visual noise. Dark/focused color scheme during exam.
5. **Lesson player is the least gamified page** — students are reading and studying here. Only a subtle XP toast and progress bar. No distractions.
6. **Color usage** — RPG elements (XP, streaks, badges) can use accent colors for energy/reward feel, but must harmonize with the trust-first professional palette.

---

## Success Metrics

How we'll know the RPG-lite layer is working:

| Metric | Target | Measured By |
|---|---|---|
| Daily active return rate | 40%+ of enrolled users return daily | Streak data |
| Course completion rate | 70%+ complete all lessons | Progress data |
| Section quiz pass rate | 80%+ pass on first or second attempt | Quiz attempt data |
| Mock exam attempts per user | 3+ attempts before real exam | Exam attempt data |
| Time to course completion | Decreasing over first 3 cohorts | Progress timestamps |
| Exam pass rate (real IPAS) | 80%+ of students who complete the course | Self-reported or verified |

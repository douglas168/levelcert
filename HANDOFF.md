# Handoff — 2026-06-16

## Session summary

Systematic format audit of the `course-generate-lesson` skill via `/grill-me`, closing the gap between the prompt template and the L21 gold standard study guide. 17 interview questions, 14 resulting template changes. All changes are committed.

## What was done

### `study-guide-writer.md` — major format overhaul
- **Opening scoped intro paragraph** added (required before Section 1): states exam subject/cluster + names ≥1 out-of-scope topic with lesson code
- **Section 1 expanded** from 1 line → 6 sub-components: 1a 對應評鑑範圍 / 1b How to Study (numbered reading order) / 1c 標記說明 (3-tier table) / 1d 學習目標 (4–6 observable skills) / 1e 考點權重 table / 1f 先備知識
- **🔥 markers** corrected to 3-tier: `🔥 = 能認出名詞` / `🔥🔥 = 要能解釋差異` / `🔥🔥🔥 = 要能在情境題中快速判斷`
- **Visual Diagrams table** added (required between Section 1 and Section 2): `## 📊 視覺化圖表`, 3–5 planned diagrams with placeholder links
- **Section 2 reading guide** added: "這張圖不是要一次背完。先抓 N 層就好：" before the ASCII tree
- **Section 3 subsection structure** now requires in strict order per `### 3.N`:
  1. `**先懂一句話：**` (single sentence mental model, required)
  2. `**它在流程中的位置：**` (→ chain showing context, required)
  3. Teaching content
  4. `#### 情境題 Scenario Bank` (≥3 rows)
  5. `#### Code Pattern 認識就夠` — subsection-level judgment: only when `includes_code: true` AND natural sklearn/Python pattern exists; else `> 此小節無對應程式 pattern`
- **Section 4** now requires pulling from `高頻比較題型` in `L23-sample-questions-11409.md` for confirmed exam pairs; `> 考試快判：` line after each table
- **Section 7** rules added: triggers ≤5 words, no repeating full Scenario Bank sentences
- **Line target** raised: 500–650 → 600–800 lines

### `researcher.md` — math depth ceiling
Added rule: for mathematical concepts, research at exam-test level (recognition, formula ID, scenario judgment) — not derivation/proof/implementation. Deeper sources go to Scope Notes.

### `content/ipas/intermediate/exams/L23-sample-questions-11409.md` — created
L23 exam intelligence reference: community exam reports (2026-05-23 sitting), confirmed question types (code step-ordering, confusion-matrix calculation), high-frequency comparison pairs, known errata (Recall formula, `cross_val_score()` return type), sklearn code patterns.

## What's next

**Immediate:** Generate L23 study guides in sequential order:

```
/course-generate-lesson L23101
```

L23101 = 機率/統計之機器學習基礎應用 (Deep, includes code). Sequence: L23101 → L23102 → L23103 → L23201 → L23202 → L23203 → L23301 → L23302 → L23303 → L23304 → L23401 → L23402.

**Known errata to watch in L23303 (建模與參數調校):**
- Recall = TP/(TP+FN) — NOT TP/(TP+FP) (official IPAS guide has wrong formula)
- `cross_val_score()` returns array, not scalar

## Key files touched

- `.claude/skills/course-generate-lesson/prompts/study-guide-writer.md` — complete format overhaul
- `.claude/skills/course-generate-lesson/prompts/researcher.md` — math depth ceiling added
- `.claude/skills/course-generate-lesson/SKILL.md` — pipeline updates (prior session)
- `.claude/skills/course-generate-lesson/prompts/claude-adversarial-reviewer.md` — known errata section (prior session)
- `content/ipas/intermediate/exams/L23-sample-questions-11409.md` — new

## Open items carried forward

- **Landing page**: `web/app/(marketing)/page.tsx` has fake-claim 92% 通過率 badge + sampleTestimonials — must fix before sending traffic
- **Mermaid diagrams**: PNG rendering pending across all L21/L22 lessons (non-blocking)
- **Taiwan AI Basic Law dates** in L21203 — flagged for verification against Presidential Office gazette
- **ISO/IEC 27701:2025 standalone claim** in L22404 — standalone status unconfirmed
- **L21102** coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question in practice pool

## Before next session

Re-read before implementing L23 content:
- `content/ipas/intermediate/syllabus/boundary-map.md` — L23 boundary rules
- `content/ipas/intermediate/syllabus/analysis.md` — L23 exam patterns
- `content/ipas/intermediate/exams/L23-sample-questions-11409.md` — confirmed exam intelligence
- `.claude/skills/course-generate-lesson/SKILL.md` — pipeline flow
- `.claude/skills/course-generate-lesson/prompts/study-guide-writer.md` — updated format requirements

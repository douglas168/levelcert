# Handoff — 2026-06-16

## Session Summary

Completed the final two lessons of the IPAS 中級 機器學習組 curriculum, bringing total lesson count to **34/34**. Both SKUs are now content-complete and ready for mock exam assembly.

## What Was Done

### Lessons completed (parallel agents, no approval gates)

**L23401 — 數據隱私、安全與合規**
- 843-line study guide covering ML lifecycle compliance: model cards, datasheets, GDPR Art.22 right-to-explanation, 個資法 mapping, inference audit logging, consent propagation, model retirement/deletion
- 5 diagrams: ML lifecycle compliance flow, model card structure, GDPR Art.22 decision tree, 個資法 vs GDPR comparison table, audit logging architecture (ASCII+SQL)
- Claude adversarial review: 0 critical / 2 important / 4 minor → 6 fixes applied
- Key fixes: GDPR Art.22(2) exception branches added, NIST attribution corrected to AI RMF Manage 2.4, 個資法 2025-11-11 amendment noted

**L23402 — 演算法偏見與公平性** (機器學習組 capstone)
- 856-line study guide covering bias detection + mitigation: fairness metric formulas (demographic parity, equal opportunity, equalized odds, disparate impact ratio), four-fifths rule, pre/in/post-processing strategies, IBM AIF360
- 5 diagrams: bias source taxonomy, fairness metrics comparison with formulas, three-stage mitigation pipeline, four-fifths rule worked example with per-group confusion matrix, bias audit workflow
- Claude adversarial review: 0 critical / 2 important / 1 minor → 3 fixes applied
- Key fixes: aggregation bias boundary clarified (exam trap note added), reweighting locked to pre-processing only

### Commits this session
- `2d24a4c` — feat(content): complete L23401–L23402 機器學習治理 lessons, 2 study guides, 10 diagrams

### TODO.md updated
- Both rows marked ✅ Done in Lesson Progress table
- What's Next updated: "🎉 ALL 34 LESSONS COMPLETE — run `/course-generate-exam`"
- Resolved items added for both lessons

## What's Next

**Both SKUs are now content-ready:**
- `ipas-ai-intermediate-data` (L21 + L22) — 22 lessons
- `ipas-ai-intermediate-ml` (L21 + L23) — 20 lessons (9 L21 shared + 11 L23)

**Immediate next action:** Run `/course-generate-exam` to assemble mock exams for both tracks.

**Pending open items (non-blocking):**
- Diagram rendering: all 34 lessons have `.md`-source diagrams; render to PNG via Gemini when ready (not blocking publish)
- Gemini cross-review skipped on several L22 lessons (rate limit during build); can re-run before exam assembly if desired
- **Landing page**: `web/app/(marketing)/page.tsx` has fake-claim 92% 通過率 badge + `sampleTestimonials` — must fix before sending traffic
- **Taiwan AI Basic Law dates** in L21203 — flagged for verification against Presidential Office gazette
- **ISO/IEC 27701:2025 standalone claim** in L22404 — standalone status unconfirmed
- **L21102** practice pool: image-matching and Precision/Recall/F1 each have only 1 question

## Key Files Touched

```
content/ipas/intermediate/TODO.md
content/ipas/intermediate/lessons/L23401-數據隱私、安全與合規/
  study-guide.md
  research-notes.md
  diagrams/01-ml-lifecycle-compliance.md
  diagrams/02-model-card-structure.md
  diagrams/03-gdpr-art22-decision-tree.md
  diagrams/04-pdpa-vs-gdpr.md
  diagrams/05-audit-logging-architecture.md
content/ipas/intermediate/lessons/L23402-演算法偏見與公平性/
  study-guide.md
  research-notes.md
  diagrams/01-bias-source-taxonomy.md
  diagrams/02-fairness-metrics-comparison.md
  diagrams/03-mitigation-strategies-by-stage.md
  diagrams/04-four-fifths-rule-worked-example.md
  diagrams/05-bias-audit-workflow.md
```

## Before Next Session

Re-read before implementing:
- `docs/webDev-architecture/ARCHITECTURE.md` — RLS, content protection, architecture invariants
- `content/ipas/intermediate/syllabus/dependencies.md` — lesson ordering + dependency rules
- `content/ipas/intermediate/TODO.md` — current status of all 34 lessons + open items
- `CLAUDE.md` — training-data overrides (Next.js 16.2, Vercel), pricing table, known traps
- `.claude/skills/course-generate-lesson/prompts/study-guide-writer.md` — format requirements for study guides

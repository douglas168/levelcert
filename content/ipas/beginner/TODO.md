# IPAS AI應用規劃師 初級 — Content TODO

Tracks open items across all lessons that need resolution before publishing.

> **2026-05-22 Update:** All 16 study guides fully rewritten to the 8-section intermediate format (考試導覽/總覽圖/核心概念/易混淆/口訣/考試陷阱/情境題/自我檢查). Each lesson now includes ASCII diagram files in `diagrams/`. Question YAML answer distributions verified and rebalanced.

---

## Open Items

### L11101 — AI的定義與分類

- [ ] **Verify: AI中央主管機關是國科會 not 數位發展部** — Referenced in study-guide.md Section 6 (exam traps) and Q17. Must verify against the actual text of 《人工智慧基本法》before publishing. If incorrect, update both files.

### L11102 — AI治理概念

- [ ] **Verify: AI評測10項指標用詞 彈性/當責性** — 韌性→彈性、問責性→當責性 already fixed in study guide, but confirm against 數位發展部 PDF when available.
- [ ] **Verify: 公部門手冊四大評估面向 exact wording** — "技術面、法律面、組織面、效益面" needs confirmation against the full PDF.

### L11201 — 資料基本概念與來源

- [ ] **Answer distribution rebalance** — Current: b=15, c=11, a=2, d=2. Needs rebalancing to ~6-7 per option. Can be done in a dedicated pass.

### L11202 — 資料整理與分析流程

- [ ] **Answer distribution rebalance** — Current: b=16 skew. Needs rebalancing pass. (Root cause: original 30-question generation.)
- [ ] **Borderline scope item: standardization numeric properties** — Lines referencing "mean=0, SD=1" are borderline 中級. Acceptable with disclaimer; monitor.

### L11301 — 機器學習基本原理

- [ ] **Difficulty distribution skew** — D2=12 (target ~9), D4=1 (target ~5). Convert 3 D2 questions to D4 in a future pass.

---

## Lesson Progress

| # | Topic Code | Topic Name | Status | Open Items |
|---|---|---|---|---|
| 1 | L11101 | AI的定義與分類 | **Done** | 1 (verify NSTC claim) |
| 2 | L11102 | AI治理概念 | **Done** | 2 (verify 2 terms) |
| 3 | L11201 | 資料基本概念與來源 | **Done** | 1 (answer dist rebalance) |
| 4 | L11202 | 資料整理與分析流程 | **Done** | 2 (answer dist, borderline scope) |
| 5 | L11203 | 資料隱私與安全 | **Done** | 0 |
| 6 | L11301 | 機器學習基本原理 | **Done** | 1 (difficulty dist skew) |
| 7 | L11302 | 常見的機器學習模型 | **Done** | 0 |
| 8 | L11401 | 鑑別式AI與生成式AI的基本原理 | **Done** | 0 |
| 9 | L11402 | 鑑別式AI與生成式AI的整合應用 | **Done** | 0 |
| 10 | L12101 | No Code / Low Code的基本概念 | **Done** | 0 |
| 11 | L12102 | No Code / Low Code的優勢與限制 | **Done** | 0 |
| 12 | L12201 | 生成式AI應用領域與常見工具 | **Done** | 0 |
| 13 | L12202 | 如何善用生成式AI工具 | **Done** | 0 |
| 14 | L12301 | 生成式AI導入評估 | **Done** | 0 |
| 15 | L12302 | 生成式AI導入規劃 | **Done** | 0 |
| 16 | L12303 | 生成式AI風險管理 | **Done** | 0 |

---

## What's Next

**All 16 初級 lessons complete.** Run `/course-generate-exam` to assemble mock exams from the question bank.

**Remaining lessons:** 0 of 16

| Priority | Topic Code | Topic Name | Notes |
|---|---|---|---|
| ~~Done~~ | ~~L11101~~ | ~~AI的定義與分類~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11102~~ | ~~AI治理概念~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11201~~ | ~~資料基本概念與來源~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11202~~ | ~~資料整理與分析流程~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11203~~ | ~~資料隱私與安全~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11301~~ | ~~機器學習基本原理~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11302~~ | ~~常見的機器學習模型~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11401~~ | ~~鑑別式AI與生成式AI的基本原理~~ | ~~Complete~~ |
| ~~Done~~ | ~~L11402~~ | ~~鑑別式AI與生成式AI的整合應用~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12101~~ | ~~No Code / Low Code的基本概念~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12102~~ | ~~No Code / Low Code的優勢與限制~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12201~~ | ~~生成式AI應用領域與常見工具~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12202~~ | ~~如何善用生成式AI工具~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12301~~ | ~~生成式AI導入評估~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12302~~ | ~~生成式AI導入規劃~~ | ~~Complete~~ |
| ~~Done~~ | ~~L12303~~ | ~~生成式AI風險管理~~ | ~~Complete~~ |

**All 16 lessons done — ready for `/course-generate-exam`** to assemble mock exams from the 初級 question bank.

---

## Resolved Items

- All 16 study guides rewritten to 8-section format (2026-05-22)
- ASCII diagrams generated for all 16 lessons (3-5 files per lesson)
- Answer distributions rebalanced for all lessons except L11201/L11202 (flagged above)
- L11203: 個資法第27條→第20-1條 corrected; answer dist a=9/b=7/c=9/d=10
- L11302: KNN vs K-means confusion trap added; Logistic Regression correctly placed in 分類 branch
- L11401: BERT moved out of generative model list; GPT vs BERT architecture clarified
- L12201: Amazon CodeWhisperer updated to Amazon Q Developer; Sora label corrected
- L12301: Answer distribution perfectly balanced a=10/b=10/c=10/d=10
- L12303: Risk matrix Q12 contradiction fixed; hallucination wording corrected

# IPAS AI應用規劃師 中級 — Content TODO

Tracks open items across all lessons that need resolution before publishing.

> **Track rule:** 科目一 L21 必考 + (科目二 L22 或 科目三 L23) 擇一
>
> - **資料分析組 (L21 + L22)** — founder sprint, sits 2026-05-23 (priority 1, 21 items)
> - **機器學習組 (L21 + L23)** — 後續擴充 SKU (priority 2, 20 items; L21 shared with data track)

---

## Open Items

### L21102 — 電腦視覺技術與應用
- **Coverage gaps (pedagogy review):** image-matching and Precision/Recall/F1 each have only 1 question. Add 1–2 more when revisiting the pool.
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21102-電腦視覺技術與應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21103 — 生成式AI技術與應用
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21103-生成式AI技術與應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21104 — 多模態人工智慧應用
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21104-多模態人工智慧應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21201 — AI導入評估
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21201-AI導入評估/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21202 — AI導入規劃
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21202-AI導入規劃/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21203 — AI風險管理
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21203-AI風險管理/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21301 — 數據準備與模型選擇
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21301-數據準備與模型選擇/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L21302 — AI技術系統集成與部署
- **Diagram rendering:** 5 Mermaid diagrams exist as `.md` source under `lessons/L21302-AI技術系統集成與部署/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L22101 — 敘述性統計與資料摘要技術
- **Diagram rendering:** 4 Mermaid diagrams exist as `.md` source under `lessons/L22101-敘述性統計與資料摘要技術/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (HTTP 429 rate limit during build); Claude + Codex reviews both clean — re-run Gemini pass if desired before exam assembly.

### L22102 — 機率分佈與資料分佈模型
- **Diagram rendering:** 5 diagrams (1 Mermaid `.mmd` + 4 ASCII `.md`) under `lessons/L22102-機率分佈與資料分佈模型/diagrams/` — render Mermaid to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (CLI returned empty output); Claude adversarial (0 issues) + Codex auditor (6 findings resolved) — re-run Gemini pass if desired before exam assembly.

### L22103 — 假設檢定與統計推論
- **Diagram rendering:** 1 Mermaid `.mmd` (`test-selection-flowchart.mmd`) under `lessons/L22103-假設檢定與統計推論/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L22201 — 數據收集與清理
- **Diagram rendering:** 5 Mermaid diagrams (`.mmd`) under `lessons/L22201-數據收集與清理/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L22202 — 數據儲存與管理
- **Diagram rendering:** 5 Mermaid diagrams (`.mmd`) under `lessons/L22202-數據儲存與管理/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (API 429 capacity exhaustion); Claude adversarial + Codex auditor both applied — re-run Gemini pass if desired before exam assembly.

### L22203 — 數據處理技術與工具
- **Diagram rendering:** 5 Mermaid diagrams (`.mmd`) under `lessons/L22203-數據處理技術與工具/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review brief** (12-line output); Claude adversarial (4 findings) + Codex auditor (11 findings) both applied — re-run full Gemini pass if desired before exam assembly.

### L22302 — 常見的大數據分析方法
- **Diagram rendering:** 4 Mermaid diagrams under `lessons/L22302-常見的大數據分析方法/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L22303 — 數據可視化工具
- **Diagram rendering:** 5 Mermaid diagrams (`.mmd`) under `lessons/L22303-數據可視化工具/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (CLI returned empty output); Claude adversarial (1 critical resolved) + Codex auditor applied — re-run Gemini pass if desired before exam assembly.

### L22401 — 大數據與機器學習
- **Diagram rendering:** 5 Mermaid diagrams under `lessons/L22401-大數據與機器學習/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (CLI returned empty output); Claude adversarial (0 critical, 3 important resolved) + Codex auditor (3 critical resolved) — re-run Gemini pass if desired before exam assembly.

### L22403 — 大數據在生成式AI中的應用
- **Diagram rendering:** 5 Mermaid diagrams (`.mmd`) under `lessons/L22403-大數據在生成式AI中的應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review skipped** (CLI returned empty output); Claude adversarial (0 critical, 3 important resolved) + Codex auditor (11 findings resolved) — re-run Gemini pass if desired before exam assembly.

### L22404 — 大數據隱私保護、安全與合規
- **Diagram rendering:** 4 diagrams (`.md` source) under `lessons/L22404-大數據隱私保護、安全與合規/diagrams/` — render to PNG via Gemini downstream (not blocking publish).
- **Gemini cross-review failed** (CLI error); Claude adversarial (0 critical, 3 important, 5 minor resolved) + Codex auditor (13 findings resolved) — re-run `gemini` interactively once then re-run Gemini pass if desired before exam assembly.

### L23101 — 機率/統計之機器學習基礎應用
- **Diagram rendering:** 5 Mermaid diagrams (`.md` source) under `lessons/L23101-機率統計之機器學習基礎應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L23102 — 線性代數之機器學習基礎應用
- **Diagram rendering:** 5 diagrams (`.md` source) under `lessons/L23102-線性代數之機器學習基礎應用/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L23103 — 數值優化技術與方法
- **Diagram rendering:** 5 Mermaid diagrams (`.md` source) under `lessons/L23103-數值優化技術與方法/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L23201 — 機器學習原理與技術
- **Diagram rendering:** 5 Mermaid diagrams (`.md` source) under `lessons/L23201-機器學習原理與技術/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L23202 — 常見機器學習演算法
- **Diagram rendering:** 5 diagrams (`.md` source) under `lessons/L23202-常見機器學習演算法/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

### L23203 — 深度學習原理與框架
- **Diagram rendering:** 5 diagrams (`.md` source) under `lessons/L23203-深度學習原理與框架/diagrams/` — render to PNG via Gemini downstream (not blocking publish).

---

## Lesson Progress

| # | Topic Code | Topic Name | Subject | Track | Priority | Status | Open Items |
|---|---|---|---|---|---|---|---|
| 1 | L21101 | 自然語言處理技術與應用 | L21 | required | 1 | ✅ Done | 0 |
| 2 | L21102 | 電腦視覺技術與應用 | L21 | required | 1 | ✅ Done | 2 |
| 3 | L21103 | 生成式AI技術與應用 | L21 | required | 1 | ✅ Done | 1 |
| 4 | L21104 | 多模態人工智慧應用 | L21 | required | 1 | ✅ Done | 1 |
| 5 | L21201 | AI導入評估 | L21 | required | 1 | ✅ Done | 1 |
| 6 | L21202 | AI導入規劃 | L21 | required | 1 | ✅ Done | 1 |
| 7 | L21203 | AI風險管理 | L21 | required | 1 | ✅ Done | 1 |
| 8 | L21301 | 數據準備與模型選擇 | L21 | required | 1 | ✅ Done | 1 |
| 9 | L21302 | AI技術系統集成與部署 | L21 | required | 1 | ✅ Done | 1 |
| 10 | L22101 | 敘述性統計與資料摘要技術 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 11 | L22102 | 機率分佈與資料分佈模型 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 2 |
| 12 | L22103 | 假設檢定與統計推論 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 13 | L22201 | 數據收集與清理 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 14 | L22202 | 數據儲存與管理 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 15 | L22203 | 數據處理技術與工具 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 2 |
| 16 | L22301 | 統計學在大數據中的應用 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 0 |
| 17 | L22302 | 常見的大數據分析方法 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 18 | L22303 | 數據可視化工具 | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| ~~19~~ | ~~L22401~~ | ~~大數據與機器學習~~ | L22 | elective_a (資料分析組) | 1 | ✅ Done | 2 |
| ~~20~~ | ~~L22402~~ | ~~大數據應用於鑑別式AI中的應用~~ | L22 | elective_a (資料分析組) | 1 | ✅ Done | 2 |
| ~~21~~ | ~~L22403~~ | ~~大數據在生成式AI中的應用~~ | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| ~~22~~ | ~~L22404~~ | ~~大數據隱私保護、安全與合規~~ | L22 | elective_a (資料分析組) | 1 | ✅ Done | 1 |
| 23 | L23101 | 機率/統計之機器學習基礎應用 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 24 | L23102 | 線性代數之機器學習基礎應用 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 25 | L23103 | 數值優化技術與方法 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 26 | L23201 | 機器學習原理與技術 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 27 | L23202 | 常見機器學習演算法 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 28 | L23203 | 深度學習原理與框架 | L23 | elective_b (機器學習組) | 2 | ✅ Done | 1 |
| 29 | L23301 | 數據準備與特徵工程 | L23 | elective_b (機器學習組) | 2 | Not started | — |
| 30 | L23302 | 模型選擇與架構設計 | L23 | elective_b (機器學習組) | 2 | Not started | — |
| 31 | L23303 | 模型訓練、評估與驗證 | L23 | elective_b (機器學習組) | 2 | Not started | — |
| 32 | L23304 | 模型調整與優化 | L23 | elective_b (機器學習組) | 2 | Not started | — |
| 33 | L23401 | 數據隱私、安全與合規 | L23 | elective_b (機器學習組) | 2 | Not started | — |
| 34 | L23402 | 演算法偏見與公平性 | L23 | elective_b (機器學習組) | 2 | Not started | — |

---

## What's Next

**🎉 資料分析組 (L21 + L22) content complete!** All 22 priority-1 lessons done.

**Next:** `/course-generate-lesson L23301` to continue 機器學習組 SKU.

**Remaining lessons:** 6 of 34 topics left (all for 機器學習組 SKU; 資料分析組 fully done)

### Priority 1 — 資料分析組 sprint (founder 2026-05-23 exam)

Order from `syllabus/dependencies.md` §3. Build L21 (required) first, then L22.

| Priority | Topic Code | Topic Name | Notes |
|---|---|---|---|
| ~~1~~ | ~~L21101~~ | ~~自然語言處理技術與應用~~ | ✅ Done (42-question pool, 5 diagrams) |
| ~~2~~ | ~~L21102~~ | ~~電腦視覺技術與應用~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~3~~ | ~~L21103~~ | ~~生成式AI技術與應用~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~4~~ | ~~L21104~~ | ~~多模態人工智慧應用~~ | ✅ Done (38-question pool, 5 diagrams) |
| ~~5~~ | ~~L21201~~ | ~~AI導入評估~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~6~~ | ~~L21202~~ | ~~AI導入規劃~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~7~~ | ~~L21203~~ | ~~AI風險管理~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~8~~ | ~~L21301~~ | ~~數據準備與模型選擇~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~9~~ | ~~L21302~~ | ~~AI技術系統集成與部署~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~10~~ | ~~L22101~~ | ~~敘述性統計與資料摘要技術~~ | ✅ Done (40-question pool, 4 diagrams) |
| ~~11~~ | ~~L22102~~ | ~~機率分佈與資料分佈模型~~ | ✅ Done (40-question pool, 5 diagrams) |
| ~~12~~ | ~~L22103~~ | ~~假設檢定與統計推論~~ | ✅ Done (40-question pool, 4 diagrams) |
| ~~13~~ | ~~L22201~~ | ~~數據收集與清理~~ | ✅ Done (35-question pool, 5 diagrams) |
| ~~14~~ | ~~L22202~~ | ~~數據儲存與管理~~ | ✅ Done (35-question pool, 5 diagrams) |
| ~~15~~ | ~~L22203~~ | ~~數據處理技術與工具~~ | ✅ Done (35-question pool, 5 diagrams) |
| ~~16~~ | ~~L22301~~ | ~~統計學在大數據中的應用~~ | ✅ Done (35-question pool, 5 diagrams) |
| ~~17~~ | ~~L22302~~ | ~~常見的大數據分析方法~~ | ✅ Done (40-question pool, 4 diagrams) |
| ~~18~~ | ~~L22303~~ | ~~數據可視化工具~~ | ✅ Done (35-question pool, 5 diagrams) |
| ~~19~~ | ~~L22401~~ | ~~大數據與機器學習~~ | ✅ Done |
| ~~20~~ | ~~L22402~~ | ~~大數據應用於鑑別式AI中的應用~~ | ✅ Done |
| ~~21~~ | ~~L22403~~ | ~~大數據在生成式AI中的應用~~ | ✅ Done |
| ~~22~~ | ~~L22404~~ | ~~大數據隱私保護、安全與合規~~ | ✅ Done (40-question pool, 4 diagrams) |

### Priority 2 — 機器學習組 後續擴充 SKU

Order from `syllabus/dependencies.md` §4 (L21 items already covered above).

| Priority | Topic Code | Topic Name | Notes |
|---|---|---|---|
| ~~23~~ | ~~L23101~~ | ~~機率/統計之機器學習基礎應用~~ | ✅ Done (797-line study guide, 5 diagrams, 0 review findings) |
| ~~24~~ | ~~L23102~~ | ~~線性代數之機器學習基礎應用~~ | ✅ Done (1,107-line study guide, 5 diagrams, 3 important fixes applied) |
| ~~25~~ | ~~L23103~~ | ~~數值優化技術與方法~~ | ✅ Done (787-line study guide, 5 diagrams, 4 review fixes applied) |
| ~~26~~ | ~~L23201~~ | ~~機器學習原理與技術~~ | ✅ Done (763-line study guide, 5 diagrams, 1 minor fix applied) |
| ~~27~~ | ~~L23202~~ | ~~常見機器學習演算法~~ | ✅ Done (872-line study guide, 5 diagrams, 1 minor fix applied) |
| ~~28~~ | ~~L23203~~ | ~~深度學習原理與框架~~ | ✅ Done (971-line study guide, 5 diagrams, 1 important fix applied) |
| 29 | L23301 | 數據準備與特徵工程 | Deep, includes code, keywords inferred |
| 30 | L23302 | 模型選擇與架構設計 | Deep, includes code |
| 31 | L23303 | 模型訓練、評估與驗證 | Deep, includes code |
| 32 | L23304 | 模型調整與優化 | Deep, includes code |
| 33 | L23401 | 數據隱私、安全與合規 | Deep, includes code, external docs needed (個資法) |
| 34 | L23402 | 演算法偏見與公平性 | Deep, includes code |

**When priority-1 (L21 + L22) lessons are done:** First SKU `ipas-ai-intermediate-data` is ready — run `/course-generate-exam` to assemble 資料分析組 mock exams. L23 can follow.

**When all 34 lessons are done:** Both SKUs ready — assemble mock exams for 機器學習組 too.

---

## Resolved Items

- **L21101** — 自然語言處理技術與應用 (2026-04-17). 42-question pool (D1-5 balanced, 14 exam_trap), 564-line study guide, 5 Mermaid diagrams. Multi-model review clean.
- **L21102** — 電腦視覺技術與應用 (2026-04-18). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 10/10/10/10, 14 exam_trap), 682-line study guide, 5 Mermaid diagrams (CNN forward pass, task-family tree, ResNet skip connection, YOLO vs Faster R-CNN, IoU/mAP). Multi-model review resolved 11 question fixes + 12 study-guide fixes (ResNet-50 conv1 math, LINE group cultural error, Q36 receptive-field math).
- **L21103** — 生成式AI技術與應用 (2026-04-18). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 10/10/9/11, 20 exam_trap), 630-line study guide, 5 Mermaid diagrams (Transformer block, GAN loop, Diffusion process, LLM pipeline, architecture comparison). Multi-model review resolved 8 question fixes + 10 study-guide fixes (GAN Discriminator BCE, 噪聲→雜訊 Taiwan terminology, Q34 RAG scope clarification, D4 difficulty recalibration on Q25/27/28/29).
- **L21104** — 多模態人工智慧應用 (2026-04-18). 38-question pool (D1-5 = 8/10/6/7/7, a/b/c/d = 10/10/10/8), 633-line study guide, 5 Mermaid diagrams (fusion strategies, CLIP contrastive loop, Flamingo cross-attention, modality encoder comparison, use-case decision tree). Multi-model review resolved 12 question fixes + 9 study-guide fixes (CLIP fusion classification nuance, Qwen-VL→LLaVA-NeXT/TAIDE geopolitical swap on Q29, evaluation-metrics coverage gap filled with Q36 WER + Q37 Recall@K + Q38 hybrid fusion, semantic mnemonic rewrite, D-calibration on Q23/25/28/33).
- **L21201** — AI導入評估 (2026-04-18). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 11/11/9/9, 16 exam_trap), 810-line study guide + 226-line cost-arithmetic supplement, 5 Mermaid diagrams (evaluation funnel, scoring matrix template, TCO breakdown, build-vs-buy tree, dual-constraint feasible region). Multi-model review resolved 14 question fixes + 10 study-guide fixes (Q34 unit error 750萬→7.5億 token rewrite to true D5, Q32「以上皆是」→version-rocking distractor, SLA arithmetic 43.8→43.2 min/月, Gemini 2.0 sunset hedged, Haiku p95 hedged, ROI formula reconciled, accuracy bands reconciled, deadlock fallback subsection added, opportunity cost quantified, 8 D4/D5 stems upgraded with multi-constraint scenarios).
- **L21202** — AI導入規劃 (2026-04-18). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 8/12/10/10, 16 exam_trap), 800-line study guide, 5 Mermaid diagrams (5-phase roadmap + Pilot Gate, five vectors 錢人算料時 mindmap, Microsoft CAF 6 methodologies + Secure cross-cutting, RACI vs DACI A-meaning contrast, three-layer goals North Star → SMART → 3+2+1). Multi-model review resolved 18 question fixes + 9 study-guide fixes (70/20/10 canonicalized to infra/model/ops with Build-vs-Buy caveat, Q19/Q28/Q33 rewritten to match, RACI「當責簽核」→「當責（扛最終成敗責任）」with DACI contrast, Q34 governance fix 風險管理部/業務主管任 A 法遵任 C, Microsoft CAF 6+cross-cutting rewrite, Google CAF themes/pillars swapped back, Q15 fictional "2026 CAF Governance-First" removed, Spaceo.ai attribution stripped from Q07/Q20, 5-year TCO caveat, Taiwan SMB reality paragraph, final review checklist).
- **L21203** — AI風險管理 (2026-04-18). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 10/10/10/10, 25 exam_trap), 919-line study guide, 5 Mermaid diagrams (EU AI Act 4-tier pyramid, NIST AI RMF Govern-cross-cutting cycle, 定列量控治追 risk loop, Responsible-AI 5-pillar mindmap with issuer matching, cross-jurisdiction comparison EU/TW/FSC/NIST/ISO). Multi-model 3-reviewer pipeline (Claude + Gemini adversarial + Codex auditor) resolved cascading 臺灣 AI 基本法 status fix (research-notes 待公布→ 2026-01-14 公布並施行 per 總統令 華總一義字第11500001671號, Q02/Q37/Q38 rewritten), Annex III 生物辨識 vs Art.5 prohibited carve-out, FSC 公平性與以人為本 canonicalization, 5x5 可能性衝擊矩陣 standardization across guide+questions, AIIA formal definition added, NIST CSF contrast sentence, Section 1 forward-pointer, FRIA scope guard, issuer-matching warning moved earlier.
- **L21301** — 數據準備與模型選擇 (2026-04-20). 40-question pool (D1-5 = 8/8/8/8/8), 809-line study guide, 5 Mermaid diagrams (algorithm-choice flowchart, dataset-size heuristics quadrant, train/val/test split with leakage guard, feature encoding decision tree, class-imbalance strategy matrix). Multi-model 3-reviewer pipeline resolved 5 critical + 10 important + 13 minor fixes: Q18 k-NN→K-Means correction in clustering scenario, split ratio ranges capped at concrete 70/15/15 + 80/10/10, SMOTE leakage warning added to §3 + exam-trap section, terminology normalization across guide + questions.
- **L21302** — AI技術系統集成與部署 (2026-04-20). 40-question pool (D1-5 = 8/8/8/8/8, a/b/c/d = 10/10/10/10, exam_trap throughout), ~562-line study guide, 5 Mermaid diagrams (MLOps pipeline closed-loop, four deployment strategies, two-layer monitoring + drift detection, cloud MLOps comparison SageMaker/Vertex/Azure, SLI→SLO→SLA nesting). Multi-model 3-reviewer pipeline resolved 4 critical + 3 important + 3 minor fixes: answer distribution rebalanced (a:6→10/b:13→10/c:13→10/d:8→10), MLflow None stage added to §3.1.2 + Q06, Q14 Vertex AI "managed endpoint" branding corrected, terminology normalized. **L21 科目一 fully complete — all 9 required topics done.**
- **L22101** — 敘述性統計與資料摘要技術 (2026-04-20). 40-question pool (D1-5 = 8/8/8/8/8, 10 pseudocode questions, item dist A:6/B:9/C:8/D:11/E:6), 1,218-line study guide, 4 diagrams (boxplot anatomy, skewness comparison, data-cleaning flowchart, formula reference cheatsheet). 2-reviewer pipeline (Claude + Codex; Gemini 429 rate-limited) resolved 1 critical + 4 important + 3 minor fixes: Q36 redesigned (IQR fence ambiguity at exactly 68 → Q3 changed to 55, fence=65.5, 68 unambiguously outlier), Q01/Q35 why_not_b schema gaps filled, 離群值 canonicalized over 極端值 in 3 locations. **L22 資料分析組 sprint begun — 12 topics remaining.**
- **L22102** — 機率分佈與資料分佈模型 (2026-04-20). 40-question pool (D1-5 = 8/8/8/8/8, ≥6 code-style questions), 633-line study guide, 5 diagrams (distribution-selector Mermaid flowchart, normal-68-95-997 ASCII bell curve, pmf-vs-pdf-vs-cdf ASCII, clt-illustration ASCII, four-distributions-comparison table). 2-reviewer pipeline (Claude adversarial: 0 issues; Codex auditor: 6 findings; Gemini: CLI empty/skipped) resolved 2 critical + 3 important + 1 minor fixes: "三圈全包" mnemonic corrected to ~99.7%, Q27 Binomial→Normal approximation removed (untaught concept). **L22 sprint: 11 topics remaining.**
- **L22103** — 假設檢定與統計推論 (2026-04-20). 40-question pool (D1-5 = 8/8/8/8/8, ≥6 code/pseudocode questions), 631-line study guide, 4 diagrams (test-selection Mermaid flowchart, Type I/II error 2×2 grid, rejection-region bell curve + pseudocode trace, three-tests comparison table). 3-reviewer pipeline (Claude adversarial: 0 critical/1 minor; Gemini: 4 PASS; Codex auditor: 7 findings) resolved 0 critical + 5 important + 3 minor fixes: t-test English name unified (5 locations), two-tailed/two-sided standardized (4 locations), ttest_rel glossary added to study guide. **L22 sprint: 10 topics remaining.**
- **L22201** — 數據收集與清理 (2026-04-21). 35-question pool (D1-5 = 7/7/7/7/7, a/b/c/d = 9/9/9/8, 7 exam_trap, 8 pseudocode questions), 665-line study guide, 5 Mermaid diagrams (Bronze→Silver→Gold pipeline, missing-value decision tree, Spark streaming dedup watermark sequence, data-quality 6-dimension mindmap, schema-drift 4-type handling flowchart). 3-reviewer pipeline (Claude adversarial: 1 critical/1 minor; Gemini: 1 critical [CROSS]; Codex auditor fallback: 3+2+1+3 findings) resolved 9 total (1 critical + 4 important + 4 minor): Q04 correct answer flipped "d"→"a" (IQR Q3−Q2 wrong → Q3−Q1 correct, flagged by all 3 reviewers [CROSS]), Q19 str.replace() regex default corrected, Webhook row added to §3-1 collection table, schema drift forward-pointer sentence added, window() call commented, mnemonic dedup note added. **L22 sprint: 9 topics remaining.**
- **L22202** — 數據儲存與管理 (2026-04-21). 35-question pool, 1,440-line study guide, 5 Mermaid diagrams (storage-decision-tree, oltp-vs-olap, lake-warehouse-lakehouse, nosql-four-types, row-vs-column-store). 2-reviewer pipeline (Claude adversarial: 2 findings; Codex auditor: 10 findings; Gemini: API 429 skipped) resolved 10 total (1 critical [CROSS] + 6 important + 3 minor): Q07 ACID vs BASE — BASE contrast added to §3.2.3 (Claude + Codex [CROSS]). **L22 sprint: 8 topics remaining.**
- **L22203** — 數據處理技術與工具 (2026-04-21). 35-question pool (D1-5 = 7/7/7/7/7, a/b/c/d = 9/9/9/8, ≥6 pseudocode questions), ~879-line study guide, 5 Mermaid diagrams (batch-vs-stream, spark-architecture DAG flow, etl-vs-elt pipeline, sql-window-functions anatomy, mapreduce-flow). 3-reviewer pipeline (Claude adversarial: 4 findings; Gemini cross-check: brief/12 lines; Codex auditor: 11 findings) resolved 10 total (2 critical + 3 important + 5 minor): C1 [CROSS] Dataset vs DataFrame abstraction hierarchy corrected, C2 ROW_NUMBER() "no ties" oversimplification fixed across 4 sections + Q33. **L22 sprint: 7 topics remaining.**
- **L22302** — 常見的大數據分析方法 (2026-04-21). 40-question pool (deep, includes code), 663+-line study guide, 4 Mermaid diagrams (k-means convergence loop, decision-tree split criterion comparison, SMOTE interpolation geometry, imbalance strategy selection flowchart). 3-reviewer pipeline (Claude adversarial: 0 critical/3 important/2 minor; Gemini: 25-line report; Codex auditor: 11 findings) resolved 22 total (5 critical + 6 important + 11 minor): C1 `criterion='information_gain'` does not exist in sklearn — corrected to `'entropy'`/`'log_loss'`, C4 `fit_resample`/`imblearn.pipeline.Pipeline` added to study guide (tested in Q16/Q33/Q37 but missing), C2 SMOTE scoped to numeric features only. **L22 sprint: 5 topics remaining.**
- **L22303** — 數據可視化工具 (2026-04-21). 35-question pool (medium, includes code), 879-line study guide, 5 Mermaid diagrams (chart-chooser decision tree, tool positioning quadrant, pre-attentive attributes mindmap, data-ink ratio concept flow, Python library selection flowchart). 2-reviewer pipeline (Claude adversarial: 1 critical/5 important; Codex auditor: terminology + mnemonic; Gemini: CLI empty/skipped) resolved 13 total (2 critical [CROSS] + 5 important + 3 minor + 3 minor): C1 duplicate `correct:`/`explanation:` YAML keys removed from 13 questions, C2 4 mislabeled `why_not_*` explanations fixed (Q03/Q04/Q25/Q33), terminology normalized (散布圖/熱圖/箱線圖). **L22 sprint: 4 topics remaining.**
- **L22402** — 大數據應用於鑑別式AI中的應用 (2026-04-21). 40-question pool (deep, includes code), 667-line study guide, 5 diagrams (confusion-matrix→metrics derivation flowchart, ROC/AUC curve with ASCII + Mermaid, precision–recall tradeoff with scenario table, use-case catalogue mindmap 6 domains, sklearn .fit/.predict/.predict_proba inference pipeline). 3-reviewer pipeline (Claude adversarial: 2 critical/1 important/7 minor; Gemini: 1 critical/0 important/1 minor; Codex auditor: 0 critical/10 important) resolved 18 total (3 critical + 8 important + 4 minor): C1 [CROSS] Q25 Accuracy 98%→95% (confusion matrix arithmetic), C2 Q21 F1 0.66→0.67 (rounding fix), C3 confusion matrix mnemonic order TP→FP→TN→FN corrected to TP→FP→FN→TN. Open items: diagram images (02-roc-auc-curve, 04-use-case-catalogue) may benefit from Gemini rendering. **L22 sprint: 3 topics remaining.**
- **L22403** — 大數據在生成式AI中的應用 (2026-04-21). 40-question pool (deep, includes code), 877-line study guide, 5 Mermaid diagrams (三大典範資料需求金字塔, 語料清理管線, RAG資料管線, 分散式訓練三大策略比較, 分詞器技術比較). 2-reviewer pipeline (Claude adversarial: 0 critical/3 important/2 minor; Gemini: CLI empty/skipped; Codex auditor: 11 findings) resolved 13 total (1 critical [CROSS] + 5 important + 6 minor): C1 [CROSS] Dolma token count contradiction study-guide 1.715T vs Q40 3T reconciled, I1 ROOTS language count corrected (Q40 46→59: 46 natural + 13 programming languages), I2 LLaMA tokenizer classification corrected to SentencePiece-BPE (LLaMA 1/2) / tiktoken (LLaMA 3). **L22 sprint: 2 topics remaining.**
- **L23103** — 數值優化技術與方法 (2026-06-16). 787-line study guide, 5 Mermaid diagrams (損失曲面GD路徑, GD/SGD/Mini-batch收斂比較, Adam四步驟更新分解, 學習率診斷圖, 批次大小可擴展性矩陣). 1-reviewer pipeline (Claude adversarial: 0 critical/2 important/1 minor) resolved 4 total: saddle point definition corrected from "梯度可能接近0" to "梯度恰好等於0 (∇L=0)" in 3 locations (body §3.4, Scenario Bank, Exam Trap), large-batch generalization-gap downside added. **L23 機器學習組 sprint: 9 topics remaining.**
- **L23201** — 機器學習原理與技術 (2026-06-16). 763-line study guide, 5 Mermaid diagrams (偏差-變異數權衡曲線, 訓練/驗證/測試分割流程, K折交叉驗證輪轉圖, 損失函數比較圖, 過擬合診斷學習曲線). 1-reviewer pipeline (Claude adversarial: 0 critical/0 important/1 minor) resolved 1 total: LOO threshold standardized to n < 50 (was n < 100 in one location). **L23 機器學習組 sprint: 8 topics remaining.**
- **L23202** — 常見機器學習演算法 (2026-06-16). 872-line study guide, 5 diagrams (algorithm-selection-flowchart, bias-variance-positioning, split-criteria-comparison, bagging-vs-boosting, svm-margin-geometry). 1-reviewer pipeline (Claude adversarial: 0 critical/0 important/2 minor) resolved 1 total: removed outdated RF `n_features/3` regression default (sklearn 1.x changed to 1.0). **L23 機器學習組 sprint: 7 topics remaining.**
- **L23203** — 深度學習原理與框架 (2026-06-16). 971-line study guide, 5 diagrams (mlp-forward-pass, cnn-conv-pooling, rnn-lstm-unrolled, transformer-encoder, framework-arch-selection). 1-reviewer pipeline (Claude adversarial: 0 critical/1 important/2 minor) resolved 3 total: LSTM bias +1 vs +2 convention clarified (PyTorch uses +2), cell gate renamed to 候選 cell (g), tanh example labeled illustrative. **L23 機器學習組 sprint: 6 topics remaining.**

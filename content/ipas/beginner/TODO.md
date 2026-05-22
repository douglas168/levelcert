# IPAS AI應用規劃師 初級 — Content TODO

Tracks open items across all lessons that need resolution before publishing.

---

## Open Items

### L11101 — AI的定義與分類

- [ ] **Verify: AI中央主管機關是國科會 not 數位發展部** — Referenced in study-guide.md exam traps (Section 6) and questions (Q17). Must verify against the actual text of 《人工智慧基本法》before publishing. If incorrect, update both files.
- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11101-AI的定義與分類/diagrams/`. Save generated images to the same folder.

### L11102 — AI治理概念

- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11102-AI治理概念/diagrams/`. Save generated images to the same folder.
- [ ] **Verify: AI評測10項指標用詞 彈性/當責性** — Fact check flagged 韌性→彈性、問責性→當責性 as correct terms. Already fixed in study guide, but confirm against the actual 數位發展部 PDF when available.
- [ ] **Verify: 公部門手冊四大評估面向 exact wording** — "技術面、法律面、組織面、效益面" needs confirmation against the full PDF (currently based on web summaries).

### L11201 — 資料基本概念與來源

- [ ] **Generate 3 Gemini diagrams** — Prompts ready in `lessons/L11201-資料基本概念與來源/diagrams/`. Save generated images to the same folder.

### L11202 — 資料整理與分析流程

- [ ] **Generate 3 Gemini diagrams** — Prompts ready in `lessons/L11202-資料整理與分析流程/diagrams/`. Save generated images to the same folder.
  - Data pipeline 4-stage flow (收集→清理→分析→呈現)
  - Feature engineering taxonomy (selection/extraction/transformation + One-Hot Encoding)
  - 4 analytics types progression pyramid (descriptive→diagnostic→predictive→prescriptive)
- [ ] **Borderline scope item: standardization numeric properties** — Scope review flagged lines 327/388 mentioning "mean=0, SD=1" as borderline. Currently acceptable with 中級 disclaimer present. Monitor if boundary owner wants stricter enforcement.

### L11203 — 資料隱私與安全

- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11203-資料隱私與安全/diagrams/`. Save generated images to the same folder.

### L11301 — 機器學習基本原理

- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11301-機器學習基本原理/diagrams/`. Save generated images to the same folder.

### L11302 — 常見的機器學習模型

- [ ] **Generate 5 Gemini diagrams** — Prompts ready in `lessons/L11302-常見的機器學習模型/diagrams/`. Save generated images to the same folder.

### L11401 — 鑑別式AI與生成式AI的基本原理

- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11401-鑑別式AI與生成式AI的基本原理/diagrams/`. Save generated images to the same folder.

### L11402 — 鑑別式AI與生成式AI的整合應用

- [ ] **Generate 4 Gemini diagrams** — Prompts ready in `lessons/L11402-鑑別式AI與生成式AI的整合應用/diagrams/`. Save generated images to the same folder.

### L12101 ��� No Code / Low Code的基本概念

- [ ] **Generate 1 Gemini image** — Prompt ready in `lessons/L12101-NoCode-LowCode的基本概念/diagrams/gemini-prompt-citizen-developer.md`. Save generated image to the same folder.
- [ ] **Render 3 Mermaid diagrams** — `.mmd` files in `lessons/L12101-NoCode-LowCode的基本概念/diagrams/` need rendering to PNG/SVG.

### L12102 — No Code / Low Code的優勢與限制

- [ ] **Render 3 Mermaid diagrams** — `.mmd` files in `lessons/L12102-NoCode-LowCode的優勢與限制/diagrams/` need rendering to PNG/SVG.
  - Decision flowchart (NC vs LC vs Traditional)
  - Four risks relationship diagram
  - Citizen Developer vs Shadow IT comparison
- [ ] **Generate 2 Gemini images** — Prompts ready in `lessons/L12102-NoCode-LowCode的優勢與限制/diagrams/`. Save generated images to the same folder.
  - Advantages triangle infographic
  - Domain application spectrum infographic

### L12201 — 生成式AI應用領域與常見工具

- [ ] **Render 3 Mermaid diagrams** — `.mmd` files in `lessons/L12201-生成式AI應用領域與常見工具/diagrams/` need rendering to PNG/SVG.
  - Domain taxonomy tree (文本/圖像/聲音 + tools)
  - Tool selection decision flowchart
  - Microsoft Copilot ecosystem clarification
- [ ] **Generate 2 Gemini images** — Prompts ready in `lessons/L12201-生成式AI應用領域與常見工具/diagrams/`. Save generated images to the same folder.
  - Tool comparison infographic (all 8+ tools)
  - Three domains overview poster
- [ ] **D5 questions light** — Difficulty distribution is D1=8, D2=8, D3=10, D4=9, D5=5. Consider upgrading 3 stronger D4 questions to D5 if needed for adaptive testing balance.

### L12202 — 如何善用生成式AI工具

- [ ] **Render 3 Mermaid diagrams** — `.mmd` files in `lessons/L12202-如何善用生成式AI工具/diagrams/` need rendering to PNG/SVG.
  - Prompt framework comparison (RTF → CRISPE → CO-STAR)
  - RAG workflow (8-step pipeline)
  - Prompting techniques spectrum (Zero-shot → ToT)
- [ ] **Generate 2 Gemini images** — Prompts ready in `lessons/L12202-如何善用生成式AI工具/diagrams/`. Save generated images to the same folder.
  - AI tool integration four modes infographic
  - RAG vs Fine-tuning comparison poster

### L12301 — 生成式AI導入評估

- [x] **4 ASCII diagram files created** — `diagrams/01-four-phase-framework.md`, `02-evaluation-four-dimensions.md`, `03-build-buy-saas-decision.md`, `04-cost-iceberg.md` (all embedded in study-guide.md)
- [ ] **Generate 2 Gemini images** — Prompts ready in `lessons/L12301-生成式AI導入評估/diagrams/`. Save generated images to the same folder.
  - Cost iceberg infographic (顯性/隱藏成本)
  - Four-phase journey map infographic

### L12302 — 生成式AI導入規劃

- [ ] **Render 5 Mermaid diagrams** — `.mmd` files in `lessons/L12302-生成式AI導入規劃/diagrams/` need rendering to PNG/SVG.
  - Four-phase rollout flowchart with Exit Criteria gates
  - Resource allocation 4-dimensions (人/錢/料/時)
  - POC → Pilot → Scale progression
  - Contingency decision tree (Fallback / Rollback / Kill Switch / HITL)
  - Testing types comparison (UAT / A/B / Beta / Red Team / Parallel Run)
- [ ] **Generate 1 Gemini image** — Prompt ready in `lessons/L12302-生成式AI導入規劃/diagrams/gemini-prompt-rollout-roadmap.md`. Save generated image to the same folder.
  - Rollout roadmap infographic (four phases + resource pyramid + POC/Pilot/Scale bar)

### L12303 — 生成式AI風險管理

- [ ] **Render 3 Mermaid diagrams** — `.mmd` files in `lessons/L12303-生成式AI風險管理/diagrams/` need rendering to PNG/SVG.
  - Risk taxonomy tree (倫理 / 資安隱私 / 合規 three-tier hierarchy)
  - Prompt Injection vs Prompt Engineering decision tree (Direct / Indirect / Jailbreak)
  - 4-quadrant risk matrix (Likelihood × Impact → Avoid/Mitigate/Transfer/Accept)
- [ ] **Generate 1 Gemini image** — Prompt ready in `lessons/L12303-生成式AI風險管理/diagrams/gemini-prompt-governance-toolkit.md`. Save generated image to the same folder.
  - 規劃者四件套 × 三法對齊 infographic (Guardrails / HITL / Red Team / Incident Response + 人工智慧基本法 / 個資法 / 著作權法)

---

## Lesson Progress

| # | Topic Code | Topic Name | Status | Open Items |
|---|---|---|---|---|
| 1 | L11101 | AI的定義與分類 | **Done** | 2 (verify claim, generate diagrams) |
| 2 | L11102 | AI治理概念 | **Done** | 3 (generate diagrams, verify 2 terms) |
| 3 | L11201 | 資料基本概念與來源 | **Done** | 1 (generate diagrams) |
| 4 | L11202 | 資料整理與分析流程 | **Done** | 2 (generate diagrams, borderline scope item) |
| 5 | L11203 | 資料隱私與安全 | **Done** | 1 (generate diagrams) |
| 6 | L11301 | 機器學習基本原理 | **Done** | 1 (generate diagrams) |
| 7 | L11302 | 常見的機器學習模型 | **Done** | 1 (generate diagrams) |
| 8 | L11401 | 鑑別式AI與生成式AI的基本原理 | **Done** | 1 (generate diagrams) |
| 9 | L11402 | 鑑別式AI與生成式AI的整合應用 | **Done** | 1 (generate diagrams) |
| 10 | L12101 | No Code / Low Code的基本概念 | **Done** | 2 (render diagrams, generate image) |
| 11 | L12102 | No Code / Low Code的優勢與限制 | **Done** | 2 (render diagrams, generate images) |
| 12 | L12201 | 生成式AI應用領域與常見工具 | **Done** | 3 (render diagrams, generate images, D5 balance) |
| 13 | L12202 | 如何善用生成式AI工具 | **Done** | 2 (render diagrams, generate images) |
| 14 | L12301 | 生成式AI導入評估 | **Done** | 2 (render diagrams, generate images) |
| 15 | L12302 | 生成式AI導入規劃 | **Done** | 2 (render diagrams, generate image) |
| 16 | L12303 | 生成式AI風險管理 | **Done** | 2 (render diagrams, generate image) |

---

## What's Next

**All 16 初級 lessons complete.** Run `/course-generate-exam` to assemble mock exams from the question bank.

**Remaining lessons:** 0 of 16

| Priority | Topic Code | Topic Name | Notes |
|---|---|---|---|
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

*(Move items here when completed)*

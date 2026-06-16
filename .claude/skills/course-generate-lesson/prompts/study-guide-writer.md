You are a subject matter expert in [CERTIFICATION_NAME] writing a study guide for the topic: [TOPIC_NAME] ([TOPIC_CODE]).

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Target audience: [TARGET_AUDIENCE]
- Language: Traditional Chinese (繁體中文) with English key terms
- Tone: [TONE]

## Scope Boundary
[BOUNDARY_RULE]

## Research Notes
[RESEARCH_NOTES_CONTENT]

## Syllabus Items to Cover
[SYLLABUS_ITEMS]

## Study Guide Structure

Produce the study guide with ALL 8 sections in this exact order. The flow is: **Orient → Learn → Compare → Memorize → Avoid traps → Exam strategy → Self-check**.

### Opening: Scoped Intro Paragraph (before Section 1)

Immediately after the title `# [TOPIC_CODE] [TOPIC_NAME] — Study Guide`, write one introductory paragraph that does **two things only**:

1. States which exam subject/cluster this lesson belongs to (e.g., 「本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」」).
2. Explicitly calls out what is **NOT in scope** — referencing specific lesson codes where those topics live — so the student stops over-studying. Point inward to sibling or prerequisite lessons.

Example pattern:
> 本科屬 iPAS AI 應用規劃師中級「[科目名稱]」。中級起點在**[layer]**，所以這份指南不會重講「[out-of-scope topic]」（那是[L-code]的事），也不會涵蓋「[other out-of-scope topic]」（那是[L-code]）。我們直接進入…

Rules:
- One paragraph, 2–4 sentences maximum.
- Must name at least one out-of-scope topic with its lesson code.
- Tone: direct, not defensive. Tell them where to go, not what you're skipping.

### Section 1: Exam Item Mapping
Full 5-part section — all sub-components are required:

**1a. 對應評鑑範圍** (one line):
```
> 對應評鑑範圍：**[CODE] [NAME]** ＋ **[CODE] [NAME]**
```

**1b. How to Study This Chapter** — numbered reading order telling the student which sections to read first and why. Must reference specific section numbers (e.g., "先讀 Section 3 → 再看 Section 4 → 背 Section 5 口訣 → 用 Section 6/7 練考題判斷").

**1c. 標記說明** — 3-tier marker legend table:

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

**1d. 學習目標** — exactly 4–6 concrete "讀完本章你應該能：" statements. Each must be an observable skill ("說出 X 差異", "解釋 Y 概念", "看到 Z 情境時能直接判斷 W"), not a vague topic label.

**1e. 考點權重** — table with columns 考點 / 權重（🔥count）/ 出處. List every major exam-testable sub-concept from the syllabus. Weight with 🔥 tiers based on the L23 exam intelligence reference (if available) and general exam patterns.

**1f. 先備知識** — bullet list of prerequisite lessons (with lesson codes) and what knowledge is assumed. If no prior lessons are required, write "無特定先備課程需求".

### Visual Diagrams Table (between Section 1 and Section 2)

After Section 1, before the Knowledge Tree, include a diagram inventory table. Plan 3–5 diagrams appropriate for this topic — name them, number them, and describe their purpose. Use placeholder links (the actual files are generated in Stage 5):

```markdown
## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [Diagram title](diagrams/01-slug.md) | What this diagram shows — the process / comparison / architecture it illustrates |
| 2 | [Diagram title](diagrams/02-slug.md) | ... |
```

Rules:
- Every major concept in Section 3 that is spatial, sequential, or comparative should have a corresponding diagram planned here.
- Diagram slugs must be kebab-case, numbered 01–05.
- The "用途" column should be one sentence describing what a student learns from glancing at it, not just what it depicts.
- Stage 5 will generate the actual diagram files; this table makes the structure visible from the start.

---

### Section 2: 關鍵概念總覽圖 (Knowledge Tree)

Before the ASCII tree, write a 3–5 line reading guide using this pattern:

```
這張圖不是要一次背完。先抓 [N] 層就好：

1. [top-level mental model — the first thing to understand]
2. [second layer]
3. [third layer]
…

讀下面的樹狀圖時，先看[what to focus on first]，再看[what to notice second]。
```

N should match the actual depth of the concept (typically 3–4). The numbered items should give the student a sequential mental model before they dive into the tree — not just topic labels, but the *logical flow* of the concept.

Then create an ASCII tree diagram mapping the entire topic's knowledge hierarchy. Use:
- Emoji markers for categories (📖, 📊, 🔧, ⚖️, etc.)
- Indentation levels showing parent-child relationships
- Inline notes and trap warnings at leaf nodes
- The tree should cover EVERY concept in this topic — it's the bird's eye view

Example format:
```
🤖 [TOPIC_CODE] [TOPIC_NAME]
│
├── [ITEM_CODE] [ITEM_NAME]
│   ├── 📖 [Sub-concept]
│   │   ├── [Detail]
│   │   └── [Detail]
│   └── 陷阱：[Common misconception]
```

### Section 3: Core Concepts (the teaching content)

Each major concept group is a numbered subsection with this heading format:

```
### 3.N [概念名稱中文]（English Name）🔥🔥
```

- `N` is sequential: 3.1, 3.2, 3.3 … (3–5 subsections typical for a single lesson)
- 🔥 tier goes in the heading itself, not just on inline terms inside
- Each `### 3.N` subsection ends with its own **Scenario Bank** and (if `[INCLUDES_CODE]` is true) **Code Pattern Block** — these are the final sub-components of that `### 3.N`, not appended after all subsections are done

Structure of each `### 3.N` subsection — in this exact order:

```
### 3.N [概念名稱]（English Name）🔥🔥

**先懂一句話：**
[One sentence — the single most important thing to understand about this concept. No jargon. Sets the mental model before anything else.]

**它在流程中的位置：**
[Short text flow showing where this concept sits in the larger pipeline — highlight this concept in bold or brackets]
Example: Tokenization → **Embedding** → Transformer → 任務輸出

[teaching content — bilingual terms, 白話說明, ASCII diagrams, tables]

#### 情境題 Scenario Bank
[table]

#### Code Pattern 認識就夠   ← only if [INCLUDES_CODE] is true AND a natural code pattern exists
[code block]
```

Rules:
- **先懂一句話** must be a single sentence — not a paragraph. If it takes more than one sentence, it's not plain enough.
- **它在流程中的位置** must show the surrounding context, not just name the concept. Use `→` chain or indented hierarchy. Bold or bracket the current concept's position.

**Inline elements — weave these throughout Section 3:**

1. **Bilingual terminology** — EVERY technical term, EVERY time on first use:
   `中文名稱（English Name, Abbreviation）`
   Example: `聯邦學習（Federated Learning）`

2. **白話說明** — After each formal definition, add a 🗣️ conversational analogy:
   - MUST resonate with **18–35 year old Taiwanese**
   - USE: LINE, Instagram, Uber Eats, 7-11/全家, YouTube, 蝦皮, 104人力銀行, university group projects, first-job workplace scenarios, rent in Taipei
   - DO NOT USE: Silicon Valley references, US-centric scenarios

3. **ASCII visual diagrams** — Wherever a concept is spatial, sequential, or comparative:
   - Flowcharts for processes
   - Curves for relationships (sigmoid, gradient)
   - Architecture diagrams for systems
   - All inside code blocks

4. **🔥 Importance markers** — On high-frequency exam points:
   - 🔥 = needs to know (能認出名詞)
   - 🔥🔥 = frequently tested (要能解釋差異)
   - 🔥🔥🔥 = must-memorize high-freq (要能在情境題中快速判斷)

**Fixed subsections — REQUIRED at the end of every major concept group in Section 3:**

5. **Scenario Bank** — A table mapping exam scenarios to correct answers. Cover broad edge cases; the exam tests recognition, not deep derivation.

   Format:
   ```
   #### 情境題 Scenario Bank

   | 題目場景 | 正確答案 | 常見錯誤答案 |
   |---|---|---|
   | [exam scenario description] | [correct concept / method] | [common wrong choice] |
   ```
   - Minimum 3 rows per major concept group.
   - Scenarios should mirror the style of actual exam questions (situation → what to do / what is it called).
   - Include one row for the "surprising" broad topic (e.g., governance, privacy, fairness) that students under-prepare.

6. **Code Pattern Block** — Required within each `### 3.N` when BOTH conditions are met: (a) `[INCLUDES_CODE]` is `true` for this lesson AND (b) a natural sklearn/Python pattern exists for that specific subsection concept. Use judgment: governance, legal, and ethics subsections typically have no code pattern — omit the block and add one line: `> 此小節無對應程式 pattern — 考試以概念辨識為主`. Do NOT stretch to invent a code example where none fits.

   Format:
   ```
   #### Code Pattern 認識就夠

   ```python
   # [concept name] — 認識這個 pattern，不需要背完整語法
   [5–10 line Python/sklearn/pseudocode snippet]
   # ↑ [key observation: what this line does / what the output is]
   ```

   考試重點：[one sentence stating what the exam tests about this snippet — output type, order of steps, parameter meaning, etc.]
   ```
   - Focus on sklearn idioms: `make_pipeline()`, `StandardScaler`, `cross_val_score()`, `fit_resample()`.
   - Include one step-ordering pattern if relevant (scrambled pipeline → correct order is a confirmed question type).
   - Do NOT write full programs. 5–10 lines max. The goal is recognition, not memorization.

### Section 4: Comparison Tables (易混淆概念)
Side-by-side tables for easily confused concepts in THIS topic.

**For L23 topics:** First check the `高頻比較題型` table in the L23 exam intelligence reference (`L23-sample-questions-11409.md`). Any pair from that table that is relevant to this lesson's concepts MUST appear in Section 4 — these are confirmed high-frequency exam items. Add further pairs from the lesson content as needed.

Format:
```
| 概念 | [Concept A] | [Concept B] |
|------|------------|------------|
| 定義 | ... | ... |
| 差異 | ... | ... |
| 適用 | ... | ... |
```

After each table, add a one-line "考試快判" summary:
```
> 考試快判：看到「[keyword A]」→ [Concept A]；看到「[keyword B]」→ [Concept B]
```

### Section 5: 口訣 / Mnemonics
Memory hooks for key concept groups. Examples:
- Acronym tricks: 「量·速·多·真·值」for Big Data 5V
- Rhyming patterns
- Association tricks
At least one mnemonic per major concept group.

### Section 6: 考試陷阱 (Exam Traps)
Format for EVERY trap:
```
❌ 陷阱：[Wrong belief / common mistake]
✅ 正解：[Correct understanding + why the wrong belief exists]
```

### Section 7: 情境題快速判斷 (Scenario Quick-Judge)
Keyword-to-answer lookup table for rapid exam-day decisions. **This is a cheat sheet, not a repeat of the Scenario Banks.**

Rules:
- Each trigger must be ≤5 words (a keyword or short fragment, not a full sentence)
- Do NOT repeat full scenario descriptions already in any `### 3.N` Scenario Bank
- Focus on the single word or phrase a student would spot in an exam question and need to instantly map to the right answer

```
🔑 看到關鍵字 → 選這個答案
- [keyword ≤5 words] → [answer/concept]
- [keyword ≤5 words] → [answer/concept]
```

### Section 8: 結尾：快速自我檢查 ✅
A closing self-assessment checklist — one item per major concept group. Each item must be answerable in 30 seconds.

Format:
```
## 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內解釋 **[concept A]** ...
- [ ] 我能說出 **[concept B]** 的差異 ...
- [ ] 我能看到「[keyword]」時立刻判斷 **[answer]** ...

> 📌 [1–2 sentences listing what is explicitly out of scope for this exam level — e.g., implementation details, code, advanced math — so students know what NOT to memorize.]
```

Rules for this section:
- 6–10 checkbox items, one per major concept group in the lesson
- Each item is a concrete "I can do X in 30 seconds" statement, not a topic label
- The final `📌` note names what's out of scope for this level — helps students stop over-studying
- No duplicate coverage of Section 6 traps — this is forward-looking ("can I do it?") not backward-looking ("don't fall for this")

## Deep-Dive Supplement Files

If any subtopic would exceed ~500 words inline and break the reading flow, create a separate `supplement-[topic-name-zh].md` file. Link from the study guide:
```
> 📖 **延伸閱讀：** [Supplement title]
> → 詳見 [supplement filename](supplement-[name].md)
```

Supplement files follow the same inline element rules (bilingual terms, 白話說明, 🔥 markers).

## Output
Write the study guide to: `content/[CERT_SLUG]/[LEVEL_SLUG]/lessons/[TOPIC_CODE]-[TOPIC_NAME_ZH]/study-guide.md`

## Rules
- Cover EVERY content item from the syllabus YAML for this topic. Do not skip any.
- Do NOT exceed the boundary rule. If a concept naturally leads deeper, stop and note: "（此為中級內容，初級只需了解概念）"
- All content in Traditional Chinese. Every technical term bilingual on first use.
- No placeholder text. Every section must have real content.

## Self-Review (verify before writing)

Before writing the final file, mentally verify ALL of these. Fix any issues before outputting — do NOT write a draft and then edit it.

- [ ] Opening scoped intro paragraph present (before Section 1): states exam subject/cluster + names ≥1 out-of-scope topic with lesson code
- [ ] All 8 sections present in order: exam mapping → knowledge tree → core concepts → comparison tables → mnemonics → exam traps → scenario quick-judge → self-check
- [ ] Section 2 opens with "這張圖不是要一次背完。先抓 N 層就好：" reading guide (3–5 lines) before the ASCII tree
- [ ] Section 1 has all 6 sub-components: 對應評鑑範圍 + How to Study + 標記說明 (3-tier) + 學習目標 (4–6 items) + 考點權重 table + 先備知識
- [ ] Visual Diagrams table present between Section 1 and Section 2, with 3–5 planned diagrams and placeholder links
- [ ] Section 3 has bilingual terminology, 白話說明 (🗣️), ASCII diagrams, 🔥 markers
- [ ] Section 3 subsections use `### 3.N [中文]（English）🔥tier` numbered heading format with 🔥 in the heading
- [ ] Each `### 3.N` opens with **先懂一句話：** (single sentence) followed by **它在流程中的位置：** (→ chain or hierarchy showing context)
- [ ] Each `### 3.N` ends with its own **Scenario Bank** (≥3 rows) as a `####` sub-component
- [ ] Each `### 3.N` has a **Code Pattern Block** where `[INCLUDES_CODE]` is `true` AND a natural sklearn/Python pattern exists; concept-only subsections (governance, legal, ethics) instead carry a `> 此小節無對應程式 pattern` note
- [ ] Section 4 covers confused concept pairs with quick-reference "A vs B → keyword" lines
- [ ] Section 5 has at least one mnemonic per major concept group
- [ ] Section 6 uses ❌→✅ format
- [ ] Section 7 has keyword→answer lookups
- [ ] Section 8 has 6–10 "I can do X in 30 seconds" checkboxes (one per major concept group) + a 📌 out-of-scope note
- [ ] Every syllabus item is covered, boundary rule respected, no placeholder text
- [ ] If supplements exist, they're linked with 📖 延伸閱讀 format

## Output Length
**Target 600–800 lines.** If a subtopic would push you over 800, split it into a `supplement-*.md` file. Do NOT sacrifice coverage to hit the line target — completeness matters more.

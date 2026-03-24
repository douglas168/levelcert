# Video Production Workflow: Exam Topic → Published Video

**Target:** 8–12 min Mandarin Chinese videos | Slides + avatar presenter style | Budget ~$29–37/mo

---

## File Storage Structure

All generated files live in **Google Drive**, organized by topic code. This makes them accessible to n8n, Claude, and your review workflow without moving files manually.

```
Google Drive/
└── Project - IPAS 初級 Course/
    ├── [Content Calendar] (Google Sheets — master tracker)
    └── Course Production/
        └── L111 - 人工智慧概念/
            ├── research-notes.md       ← Phase 2 output (Gemini)
            ├── study-guide.md          ← Phase 3 output (Claude API)
            ├── script.md               ← Phase 4 output (Claude API)
            ├── slides/                 ← Phase 5 PNGs (exported from Canva)
            └── video/                  ← Phase 6 MP4 (downloaded from HeyGen)
        └── L112 - 資料處理與分析/
            └── ...
```

**Content Calendar (Google Sheets)** — one row per topic, columns:
| Topic Code | Topic Name | Persona | Status | Research | Study Guide | Script | Slides | Video | Notes |

Status dropdown values: `Pending` → `Researching` → `Script Review` → `Script Approved` → `Slides Ready` → `Rendering` → `Published`

---

## Automation Architecture

```
Google Sheets (Status = "Pending", trigger on new row)
  │
  ▼ n8n
  ├─ Phase 2: Gemini API → research-notes.md → Google Drive
  ├─ Phase 3: Claude API → study-guide.md → Google Drive     ← automated
  ├─ Phase 4: Claude API → script.md → Google Drive           ← automated
  │
  ├─ [GATE 1] Status → "Script Review" → notify you
  │   You read study-guide.md + script.md, edit if needed
  │   Set Status → "Script Approved"
  │
  ├─ Phase 5: Manual (Canva) — ~20 min                        ← stays manual
  │   Export PNGs → upload to Google Drive/slides/
  │   Set Status → "Slides Ready"
  │
  ├─ Phase 6: n8n detects "Slides Ready" → HeyGen API
  │   (pass script.md + slide PNG URLs)
  │   HeyGen renders → n8n polls → downloads MP4 → Google Drive
  │
  └─ Phase 7: n8n → Bunny.net API (paid course upload)
              n8n → YouTube Data API (free/preview upload)
              Status → "Published"
```

**What's automated:** Research, study guide writing, script writing, video rendering, both uploads (~85% of the pipeline by time)
**What stays manual:** Slide creation (Canva, ~20 min), script review + approval (~15 min)

**n8n implementation notes:**
- Phase 3+4: Use n8n HTTP Request node → `POST api.anthropic.com/v1/messages` with `claude-sonnet-4-6` model; pass research notes as user message; write response to Google Drive via Google Drive node
- Phase 6: Same HeyGen API pattern already used in the social media workflow
- Phase 7: Bunny.net has a REST API (`POST /library/{libraryId}/videos`) — upload via n8n HTTP node; YouTube upload via n8n YouTube node (built-in)
- CapCut step: **Drop it** — enable HeyGen's built-in subtitle generation instead (same plan tier); saves ~20 min per video

---

## Phase 1 — Topic Mapping
**Input:** Official IPAS exam syllabus PDF
**Output:** Prioritized topic list with subtopics per video

**Tool:** Claude
- Upload the exam syllabus PDF and prompt:
  > "根據這份考試綱要，幫我列出所有考試主題，按照重要性排序，每個主題列出2-3個子主題，每個主題適合做成一支8-12分鐘的影片"
- Result becomes your content calendar

---

## Phase 2 — Research & Content Gathering
**Input:** One topic from the list
**Output:** Raw notes with definitions, examples, exam angles

**Tools:**
**Automated (n8n):**
- **Gemini API (2.0 Flash + Google Search grounding)** — web research with cited sources, triggered when a topic is added to the content calendar
  - Prompt: `"搜尋並整理 IPAS AI應用規劃師 [topic name] 的考試重點，列出定義、關鍵概念、常見考題角度，附上來源"`
- **Gemini API** — synthesize research output into exam-focused notes
  - Prompt: `"整理以下資料成為考試重點筆記，加入可能的考題角度"`
- Flow: Content calendar row added → Gemini API (search grounded) researches topic → saves `research-notes.md` to Google Drive → continues to Phase 3+4 automatically

**Manual (optional, before automation runs):**
- **NotebookLM** — upload official IPAS exam syllabus PDF + reference materials; generate structured Q&A per topic to supplement Gemini's research output

---

## Phase 3 — Study Guide Writing
**Input:** `research-notes.md` from Google Drive
**Output:** `study-guide.md` saved to Google Drive (doubles as course reading material)

**Tool:** Claude API via n8n (automated) — no manual interaction needed
- Prompt template:
  > "根據以下筆記，用繁體中文寫一份 IPAS AI應用規劃師備考學習指南，格式如下：
  >
  > **## 0. 關鍵概念總覽圖**
  > 用 ASCII 樹狀圖呈現整個主題的知識地圖（emoji + 層次縮排）
  >
  > **每個子主題區塊（## 1. / 1-1 / 1-2...）包含以下元素：**
  > 1. **核心概念說明** — 正式定義與基本原理，清楚解釋「這是什麼」
  > 2. **白話說明** — 用台灣 20-35 歲年輕人熟悉的語境解釋，可以用生活化比喻、工作場景、或他們常用的 app/工具來類比，讓人一聽就懂，不需要任何背景知識
  > 3. **層次關係圖** — ASCII 樹狀圖，顯示概念的上下層關係
  > 4. **一句話串起來** — 2-3 句話把所有重點串成一個邏輯故事
  > 5. **為什麼重要？什麼時候用？** — 實際情境說明，避免死背定義
  > 6. **對比表** — Markdown 表格，比較容易混淆的相似概念（3-4欄）
  > 7. **ASCII 圖表**（如果適合）— 流程圖、曲線圖、矩陣圖等視覺化輔助
  > 8. **⚠️ 考試速記 & 常見陷阱** — 格式：陷阱：[錯誤觀念] ❌ → 解答：[正確理解] ✅
  >
  > **不要包含**：一句話速記（單句口訣）
  >
  > 風格：口語化、視覺優先、適合備考。"
- n8n saves output as `study-guide.md` to the topic's Google Drive folder; then triggers Phase 4 automatically

---

## Phase 4 — Video Script Writing
**Input:** `study-guide.md` from Google Drive
**Output:** `script.md` saved to Google Drive, with slide cue markers

**Tool:** Claude API via n8n (automated) — no manual interaction needed
- Key prompt:
  > "根據這份學習指南，寫一份8-10分鐘的影片旁白腳本，目標觀眾是台灣 20-35 歲、正在準備 IPAS AI應用規劃師考試的上班族或學生。
  >
  > 語氣與風格（根據本影片使用的 Persona 選擇其一）：
  > - **男性學長 persona**：幽默直接、有點嗆但有料。像考過的學長在分享真心話。用短句梗、一針見血的比喻，笑點要短（一句話內）避免 TTS 拖垮節奏。
  > - **女性學姐 persona**：溫暖、有自信、鼓勵。像已在業界工作的學姐帶你複習。讓聽的人覺得「這很難但我做得到」。
  > - 兩種 persona 共同要求：口語化、有節奏感、適合 TTS、用台灣年輕人熟悉的情境（工作、app、日常生活）帶入概念、避免學術感
  >
  > 結構要求：
  > - 開場 30 秒：用一個貼近生活的情境或問題吸引注意力
  > - 每段落加上 [換頁：xxx] 標記提示換投影片
  > - 結尾 30 秒：總結重點，引導訂閱／購課"
- n8n saves output as `script.md` to Google Drive → sets Content Calendar status to "Script Review" → notifies you
- The `[換頁：xxx]` markers become your slide titles in Phase 5

---

## Phase 5 — Slide Creation
**Input:** Script with slide markers
**Output:** Slide deck (10–15 slides)

**Visual standard:** Slides must look modern and social-media-native — bold typography, strong visual hierarchy, custom illustrations. Plain slides undercut the perceived value of a paid course for this audience.

**Primary workflow: Canva + Gemini image generation** (free)
1. Use Gemini to generate a concept illustration for each key slide
   - Prompt style: `"flat design illustration of [concept], modern minimalist style, for a young professional audience, no text, vibrant colors"`
2. Pick a modern Canva template (edu/tech category) → apply consistently across the series
3. Drop Gemini-generated images into slides + add bold Chinese text
4. Export as PNG → import into HeyGen

**Alternative: Gamma.app** (~$8/mo) — fastest path to polished slides; AI generates the full deck in one shot with modern aesthetics. Worth upgrading if Canva feels too manual after trying it.

**Do not use:** Plain Google Slides without custom visuals — looks like a school presentation

---

## Phase 6 — Video Production
**Input:** Script + slides
**Output:** Final MP4 with avatar presenter

**Tool:** **HeyGen API** ($29/mo Creator plan) — triggered automatically by n8n when Content Calendar status = "Slides Ready"
- n8n sends: `script.md` content + slide PNG URLs from Google Drive
- HeyGen generates TTS narration (Taiwan Mandarin), overlays avatar on slides, renders MP4
- n8n polls HeyGen until render complete (~10–20 min) → downloads MP4 → saves to Google Drive
- HeyGen's built-in subtitle generation is enabled here — **replaces CapCut** for this step

**Why HeyGen:** It's what most Chinese YouTube edu-creators use. The avatar-on-slide format matches what viewers expect in this space.

**Persona Assignment per Topic Group** (初級 only — 中級 TBD):

| Topic Group | Persona | Style |
|---|---|---|
| L111 人工智慧概念 | 男性學長 | 幽默直接、短句梗 |
| L112 資料處理與分析 | 女性學姐 | 溫暖鼓勵、有自信 |
| L113 機器學習概念 | 男性學長 | 幽默直接、短句梗 |
| L114 鑑別式AI與生成式AI | 女性學姐 | 溫暖鼓勵、有自信 |
| L121 No-Code/Low-Code | 男性學長 | 幽默直接、短句梗 |
| L122 生成式AI應用 | 女性學姐 | 溫暖鼓勵、有自信 |
| L123 生成式AI導入評估 | 男性學長 | 幽默直接、短句梗 |

**TODO:** Select and lock in one male + one female avatar in HeyGen before production starts. Use same two avatars for the entire course series to build visual consistency within each persona.

---

## Phase 7 — Post-production & Publishing
**Input:** HeyGen MP4
**Output:** Published video

**Automated (n8n):**
- **Bunny.net API** — n8n uploads MP4 from Google Drive → `POST /library/{libraryId}/videos`; returns CDN URL for the course platform
- **YouTube Data API** — n8n uploads MP4 as free/preview version; sets title, description, chapters from `script.md` markers, tags for IPAS exam keywords
- Content Calendar status → "Published"

**Manual (~15 min):**
- **Canva** — create YouTube thumbnail using the series template (one-time template setup, then ~5 min per video)
- **CapCut** — only needed for intro/outro or background music if desired; subtitles are handled by HeyGen

---

## Recommended Tool Stack Summary

| Phase | Tool | Cost |
|---|---|---|
| Research | Gemini API (2.0 Flash) + NotebookLM | $0 (free tier / Gemini Pro plan) |
| Writing — study guide + script | Claude API (via n8n) | $0 (existing plan) |
| File storage | Google Drive | Free |
| Slides | Canva + Gemini image generation | $0 |
| Video production + subtitles | HeyGen Creator (API) | $29/mo |
| Thumbnails | Canva | Free |
| Course video hosting | Bunny.net | existing |
| Slides (upgrade option) | Gamma.app | $8/mo if needed |
| **Total new spend** | | **$29/mo** |

---

## One Full Cycle Time Estimate

Once the workflow is dialed in:
- Phase 1 (topic map): one-time, ~1 hour
- Phases 2–4 (research → script): **~5 min active** (n8n runs automatically; you review outputs async)
- Phase 5 (slides): ~20–30 min manual (Canva)
- Phase 6 (HeyGen render): **~0 min active** (n8n triggers API, polls, downloads automatically)
- Phase 7 (uploads): **~0 min active** (n8n handles Bunny.net + YouTube); ~5 min for thumbnail

**Target: 1 video every ~35–40 min of actual human work** (down from 2–3 hours), with n8n handling the rest in the background.

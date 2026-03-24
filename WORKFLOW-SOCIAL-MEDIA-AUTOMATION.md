# AI News Social Media Automation Workflow

**Goal:** Daily AI news → Image cards + captions (IG/X/FB) + YouTube Shorts, with a review step before publishing.

---

## File Storage Structure

All generated files live in **Google Drive**, consistent with the video production workflow.

```
Google Drive/
└── Project - IPAS 初級 Course/
    └── Social Media/
        └── YYYY-MM-DD/
            ├── image-card-1080x1080.png    ← Phase 3 output (IG/FB)
            ├── image-card-1080x1920.png    ← Phase 3 output (Stories/Shorts thumbnail)
            └── short-video.mp4             ← Phase 4 output (HeyGen)
```

n8n uploads files here after generation and writes the Google Drive shareable URLs back to the Pipeline sheet.

---

## Overview

```
News Sources → n8n orchestrator → Gemini API (write content)
                                → Image card generator
                                → HeyGen API (YouTube Short)
                                → Google Sheets (article log + review queue)
                                → Buffer (publish to IG/X/FB)
                                → YouTube API (upload Short)
```

---

## Phase 1 — News Gathering (Automated Daily)

**Tool: n8n** (self-hosted on your GX10, free) + RSS feeds

Set up n8n to pull from these RSS sources every morning at 7am. All sources are English — Gemini translates and localizes content for the Taiwan audience in Phase 2.

| Source | RSS URL |
|---|---|
| TechCrunch AI | `https://techcrunch.com/category/artificial-intelligence/feed/` |
| MIT Technology Review | `https://www.technologyreview.com/feed/` |
| The Verge AI | `https://www.theverge.com/ai-artificial-intelligence/rss/index.xml` |
| VentureBeat AI | `https://venturebeat.com/category/ai/feed/` |
| Hugging Face Blog | `https://huggingface.co/blog/feed.xml` |

**n8n workflow step:**
1. Pull 10–20 articles from RSS
2. **Log every article to Google Sheets** (Sheet: `Article Log`) — date, source, title, URL, summary
3. Send headlines + summaries to Gemini API
4. Gemini picks the **top 1 story** of the day (most relevant, most shareable)
5. Mark selected article in `Article Log` (Selected = ✅, others = ❌ + rejection reason)
6. Outputs structured JSON: `{ title, summary_zh, hook_zh, hashtags, script_zh }`

---

## Phase 2 — Content Generation (Gemini API)

**Tool: Gemini 2.0 Flash** via Google AI Studio API key — free tier (15 RPM limit, sufficient for 1 daily call)

One API call generates all content formats at once.

Prompt template to send per story:
```
你是一位台灣AI科技內容創作者。根據以下英文AI新聞，生成以下內容：

新聞標題：{title}
新聞摘要：{summary}

請輸出 JSON 格式：
{
  "image_headline": "15字以內的吸睛標題（繁體中文）",
  "ig_caption": "IG貼文文案，150字，含3-5個hashtag，結尾引導追蹤",
  "x_caption": "X推文，100字以內，含2-3個hashtag",
  "fb_caption": "FB貼文，200字，較詳細，引導至課程連結",
  "short_script": "60秒YouTube Short旁白腳本，口語化繁體中文，開頭3秒要有吸引力"
}
```

**Also useful:**
- **NotebookLM** — upload study guides to generate Q&A for mock exams
- **Gemini Deep Research** — for deeper topic research when needed

**Cost:** Free (Gemini API free tier)

---

## Phase 3 — Image Card Generation

**Tool:** Custom Node.js script (Claude Code builds this for you)

Uses `sharp` + `canvas` libraries to:
1. Take a branded template PNG (you design once in Canva)
2. Overlay `image_headline` text + source label
3. Output a 1080×1080 PNG for IG/FB and 1080×1920 for Stories/Shorts thumbnail
4. n8n uploads both PNGs to Google Drive (`Social Media/YYYY-MM-DD/`) → gets shareable URLs → writes to Pipeline sheet

Runs locally on your GX10. One-time setup, zero ongoing cost.

---

## Phase 4 — YouTube Short Video

**Tool: HeyGen API** (included in your $29/mo Creator plan)

n8n sends the `short_script` to HeyGen API:
- Avatar: **女性學姐** (same avatar used in the video production workflow)
- Background: branded slide or gradient
- Format: 1080×1920 (vertical)
- Duration: ~60 seconds
- Language: Mandarin Chinese TTS

HeyGen returns a video URL when ready (~5–10 min render time). n8n polls → downloads MP4 → uploads to Google Drive (`Social Media/YYYY-MM-DD/short-video.mp4`) → writes Google Drive URL to Pipeline sheet.

---

## Phase 5 — Review Queue

**Tool: Google Sheets** (free, replaces Airtable — included in Google/Gemini Pro)

n8n writes one row to Sheet: `Pipeline` per day containing:

| Column | Content |
|---|---|
| Date | Auto |
| Article Title | From Phase 1 |
| Article URL | Source link |
| IG Caption | Generated |
| X Caption | Generated |
| FB Caption | Generated |
| Image Card URL | Google Drive link (from Phase 3) |
| HeyGen Video URL | Google Drive link (from Phase 4) |
| YouTube URL | Set by n8n after publishing (Phase 6) |
| Status | Dropdown: `Draft` → `Approved` → `Published` (n8n sets "Published" after Phase 6 completes) |
| Notes | Your edits / comments |

**Your daily workflow:** Open Google Sheets, review the one row, tweak captions if needed, change Status dropdown to `Approved`. n8n polls the sheet every 15 min and triggers publishing when it detects `Approved`. Takes 5 minutes.

**Google Sheets structure (3 tabs):**
- `Article Log` — every article pulled daily, selected/rejected with reason (audit trail)
- `Pipeline` — selected articles with full content + status tracking
- `Published` — completed posts; add performance notes (views, likes) for reference

---

## Phase 6 — Publishing (Triggered by Approval)

**Tool: Buffer** ($6/mo Essentials — 3 channels: IG, X, FB)

When n8n detects `Pipeline` tab Status = `Approved`, it triggers two parallel paths:

**Path A — Image posts (via Buffer API):**
- n8n calls Buffer API to schedule: image card + caption for IG, X, FB
- Buffer publishes at the configured time (default: 12pm Taiwan time)

**Path B — YouTube Short (via YouTube Data API directly):**
- n8n uploads `short-video.mp4` from Google Drive to YouTube via YouTube Data API
- Sets title, description, and tags automatically from the Gemini-generated content
- YouTube URL written back to the Pipeline sheet

After both paths complete, n8n sets row Status → `Published`.

---

## Recommended Tool Stack

| Phase | Tool | Cost |
|---|---|---|
| Orchestration | n8n (self-hosted on GX10) | Free |
| News sources | RSS feeds | Free |
| Content writing | Gemini API via Google AI Studio | Free (API free tier) |
| Image cards | Custom script (Claude Code builds) | Free |
| YouTube Short | HeyGen API | Included in $29/mo |
| Article log + review queue | Google Sheets | Free (Google/Gemini Pro) |
| Publishing | Buffer Essentials | $6/mo |
| YouTube upload | YouTube Data API | Free |
| **Total new spend** | | **~$6/mo** |

---

## Daily Time Investment (After Setup)

- Review Google Sheets Pipeline row: **5 min**
- Minor edits if needed: **5 min**
- Total: **~10 min/day** to publish across all platforms

---

## Build Order

1. Set up Google Sheets (3 tabs: Article Log, Pipeline, Published) — needed by all other steps
2. Set up n8n + RSS → Gemini API pipeline → writes to Article Log + Pipeline
3. Build image card generator (Claude Code writes this) + wire n8n to upload PNGs to Google Drive
4. Connect HeyGen API for Shorts + wire n8n to upload MP4 to Google Drive
5. Connect Buffer API for IG/X/FB scheduling
6. Connect YouTube Data API for Shorts upload
7. Test full loop with one story end-to-end

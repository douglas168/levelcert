# Handoff — 2026-05-17

## Session Summary

Single-task session: converted all 22 IPAS 中級 study-guide markdown files to PDF. Also staged and committed accumulated content from the previous session (exams, maps, supplementary files).

## What Was Done

**PDF generation** — converted all 22 `L2*-study-guide.md` files in `content/ipas/intermediate/lessons/` to PDF using pandoc (Markdown → HTML) + Chrome headless (HTML → PDF). PDFs saved flat in the lessons root directory (gitignored via `*.pdf`).

- Tool chain: `pandoc 3.9` + Chrome headless (`--print-to-pdf`) with PingFang SC CSS for CJK rendering
- Output: 22 PDFs, 1.6M–2.7M each, at `content/ipas/intermediate/lessons/L2*-study-guide.pdf`

**Also committed** (accumulated from previous session, not yet in git):
- `content/ipas/intermediate/exams/` — L21 + L22 mock exams and cheatsheets (v1 + v2)
- `content/ipas/ipas-ai-grand-map.md`, `ipas-ai-mindmap.md`, `ipas-ai-concept-graph.md`, `ipas-ai-key-terms.csv`
- `content/ipas/intermediate/lessons/study-method.md`
- `content/ipas/intermediate/notebooklm-video-prompt.md`
- `chatgpt-ai-founders20260428.md`, `gemin-ai-founders-20260428.md`
- `.claude/settings.json`, `AGENTS.md`

## What's Next

- **中級 exam is 2026-05-23** (6 days away) — all study materials ready; exam prep is the priority
- Regenerate PDFs if study guides are updated: `pandoc <md> -t html5 --standalone --css=/tmp/study-guide-style.css -o /tmp/<base>.html && /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --print-to-pdf=<output.pdf> file:///tmp/<base>.html`
- Post-exam: evaluate 中級 content quality vs actual exam, then decide next-cert expansion

## Pending Verification Before 5/23 Exam (carried from 5/16)

- **Taiwan AI Basic Law dates** in L21203 — flagged as needing verification against Presidential Office gazette / Legislative Yuan records
- **ISO/IEC 27701:2025 standalone claim** in L22404 — original is an extension to ISO 27001; 2025 edition standalone status unconfirmed

## Key File Paths

- Study guides: `content/ipas/intermediate/lessons/{code}-{topic}/{code}-{topic}-study-guide.md`
- PDFs (gitignored): `content/ipas/intermediate/lessons/L2*-study-guide.pdf`
- Exams: `content/ipas/intermediate/exams/`
- Format template: `study-guide-format-template.md`

## Open Items Carried Forward

- **Landing page**: `web/app/(marketing)/page.tsx` has fake-claim 92% 通過率 badge + sampleTestimonials — must fix before sending traffic
- **Mermaid diagrams**: PNG rendering pending across all 22 lessons (non-blocking)
- **L21102** coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question in practice pool

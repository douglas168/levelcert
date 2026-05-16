# Handoff — 2026-05-16

## Session Summary

Applied a "reading-first" v3 format upgrade across all 22 IPAS AI應用規劃師 中級 study guides, and updated the format template with the new pattern.

## What Was Done

1. **Updated `study-guide-format-template.md`** — added explicit reading-first variant:
   - `先問自己一個問題` section before technical definitions
   - `技術說法` after analogy (not before)
   - Box-formatted `先懂一句話` using code fences
   - `比較表這樣讀` hook before every comparison table
   - Instruction to show intermediate calculation steps
   - Pair Chinese terms with English (`分位數（Quantile）`)

2. **Revised all 22 intermediate study guides** with the new format:
   - L21101–L21104 (AI技術): NLP, 電腦視覺, 生成式AI, 多模態
   - L21201–L21203 (AI導入): 評估, 規劃, 風險管理
   - L21301–L21302 (AI系統): 數據準備, 集成與部署
   - L22101–L22103 (統計): 敘述性統計, 機率分佈, 假設檢定
   - L22201–L22203 (數據工程): 收集清理, 儲存管理, 處理工具
   - L22301–L22303 (大數據分析): 統計應用, 分析方法, 可視化
   - L22401–L22404 (大數據×AI): 機器學習, 鑑別式AI, 生成式AI, 隱私合規

## What's Next

- **中級 exam is 2026-05-23** (7 days away) — primary goal is exam prep, not more content generation
- **Generate 3 mock exams** for 資料分析組 SKU (`/course-generate-exam`) — highest ROI right now
- Start 機器學習組 SKU (L23xxx, 12 lessons) after the exam

## Pending Verification Before 5/23 Exam

- **Taiwan AI Basic Law dates** in L21203 — flagged as needing verification against Presidential Office gazette / Legislative Yuan records
- **ISO/IEC 27701:2025 standalone claim** in L22404 — original is an extension to ISO 27001; 2025 edition standalone status unconfirmed

## Key File Paths

- Study guides: `content/ipas/intermediate/lessons/{code}-{topic}/{code}-{topic}-study-guide.md`
- Format template: `study-guide-format-template.md`
- Accuracy reviews: `content/ipas/intermediate/lessons/{code}-{topic}/accuracy-review-2026-04-30.md`

## Open Items Carried Forward

- **Landing page**: `web/app/(marketing)/page.tsx` has fake-claim 92% 通過率 badge + sampleTestimonials — must fix before sending traffic
- **Mermaid diagrams**: PNG rendering pending across all 22 lessons (non-blocking)
- **L21102** coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question in practice pool

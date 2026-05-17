# AGENTS.md

Repository-level instructions for AI coding/content agents working in this project.

## Project Context

LevelCert is a certification-prep platform. Current primary content vertical is iPAS AI 應用規劃師, especially intermediate lesson content under:

```text
content/ipas/intermediate/
```

The project contains both course content and a web application. When working inside a subdirectory that has its own `AGENTS.md`, follow the nearest nested file first. In particular:

```text
web/AGENTS.md
```

applies to web app work.

## General Rules

- Preserve existing user or generated work unless explicitly asked to replace it.
- Do not modify original lesson source files when the task asks for a derived or rewritten version.
- Prefer adding `study-guide-v2.md` beside an existing `study-guide.md` rather than overwriting the original guide.
- Do not create separate `exam-day-cheat-sheet.md` files unless the user explicitly asks for them.
- Keep Markdown edits focused and readable.
- Use ASCII for new structural syntax where practical, but preserve Chinese text and technical notation already used in content.
- Do not invent exam claims, pass rates, official wording, or source citations.
- If a fact is current, legal, regulatory, library-version-specific, or otherwise likely to change, verify it before writing it as authoritative.

## iPAS Study Guide Rewrite Workflow

For rewriting lesson study guides, use this template:

```text
study-guide-format-template.md
```

Target output:

```text
<lesson-folder>/study-guide-v2.md
```

Do not alter:

```text
<lesson-folder>/study-guide.md
```

The rewritten guide should be beginner-friendly and exam-focused. Preserve the source guide's exam-relevant content while changing the teaching structure.

### Required Study Guide Pattern

Each major concept section should use this teaching flow:

```text
先懂一句話
→ Everyday Analogy
→ 在整體流程中的位置
→ Key concepts / tables / examples
→ Exam Rule
→ Quick Check with answer directly below
```

When the user asks for the easier personalized format, or when a section is heavy with similar methods, comparisons, formulas, or English technical terms, use this more explicit reading-first version:

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 一步一步例子
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check with answer directly below
```

The preferred explanation style is:

- Start with the mental shortcut before the formal definition.
- Pair key Chinese terms with English terms, for example `分位數（Quantile）`.
- Use concrete analogies such as `全班排名`, `排名位置`, and `百分等級（percentile rank）` when explaining ranking, quantiles, or distribution transforms.
- For comparison sections, make the table a decision helper instead of a memorization table.
- Before a comparison table, add a compact hook such as `Log Transform = 壓縮很大的數字`.
- For numeric examples, show the missing intermediate steps before the final result.

Required guide-level sections:

```text
0. How to Use This Guide
1. Big Picture / Core Pipeline
2-7. Core concept sections adapted to the lesson
8. Exam Decision Trees
9. Trap Clinic
10. Practice Questions
Final Oral Recall
Final Study Advice
```

If an extra `Task / Scenario Selection` section is useful, it may be inserted before decision trees. Keep numbering clear even if Practice Questions becomes section 11.

### Quick Check Rule

Put the answer directly below the question.

Use:

```md
### Quick Check

<question>

答案：<answer and one-sentence reason>
```

Do not collect Quick Check answers in a separate answer-key section.

### Exam Preparation Style

Use:

- Plain beginner-friendly Chinese explanations.
- English technical terms beside Chinese terms when useful.
- Everyday analogies after `先懂一句話`.
- Tables for comparisons.
- `text` code blocks for pipelines and decision trees.
- Direct exam trigger rules like `題目看到 X → 選 Y`.
- Practice questions with answers and short reasons.

Avoid:

- Dense textbook paragraphs.
- Long derivations unless the source guide marks them exam-relevant.
- Hiding answers far from questions.
- Creating a separate cheat sheet.
- Adding unsupported or outdated claims.

## Parallel Sub-Agent Workflow

Use sub-agents when rewriting multiple independent lessons.

Recommended pattern:

- One worker per lesson folder.
- Each worker owns exactly one output file: `<lesson-folder>/study-guide-v2.md`.
- Each worker must not modify the original `study-guide.md`.
- Each worker must not create `exam-day-cheat-sheet.md`.
- After workers finish, run a local verification pass.

Suggested worker prompt structure:

```text
You are not alone in the codebase; do not revert or overwrite edits made by others.
Read the template at <absolute path to study-guide-format-template.md>.
Read the source guide at <lesson-folder>/study-guide.md.
Create exactly one new/updated file: <lesson-folder>/study-guide-v2.md.
Preserve exam-relevant content, make it beginner-friendly and exam-focused, follow the template structure.
Include Quick Check answers directly below questions, Final Oral Recall, Exam Decision Trees, Trap Clinic, and Practice Questions.
Do not create a separate cheat sheet. Do not modify the original study-guide.md.
Final response: list changed file path and any notable omissions/blockers.
```

Verification commands:

```zsh
test -f "<lesson-folder>/study-guide-v2.md"
test ! -f "<lesson-folder>/exam-day-cheat-sheet.md"
rg -n "^## 0\.|^## 1\.|^## 8\.|^## 9\.|Practice Questions|^## Final Oral Recall|^## Final Study Advice|### Everyday Analogy|### Quick Check" "<lesson-folder>/study-guide-v2.md"
```

## Content Safety and Accuracy

- For legal, privacy, security, standards, software-library, or regulatory topics, verify temporally sensitive facts before updating content.
- Prefer official documentation for software/library behavior.
- Clearly avoid out-of-scope technical depth when the source guide marks it outside the exam scope.
- Preserve exam traps and likely distractor patterns if they exist in the source guide.

## Web App Work

For work under `web/`, read and follow:

```text
web/AGENTS.md
```

Also respect the root `CLAUDE.md` warnings about Next.js, Vercel, and fake marketing claims.

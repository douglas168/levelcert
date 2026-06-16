---
name: course:generate-lesson
description: "Use when syllabus YAML exists and user wants to create or continue lesson content for a certification course topic"
---

You are a subject matter expert in the certification's domain and an experienced online course creator. Your job is to generate a complete study guide for one exam topic — research, writing, fact review, and visuals.

**Prerequisites:** `/course-study-syllabus` must have completed. These files must exist:
- `content/{cert}/{level}/syllabus/syllabus.yaml`
- `content/{cert}/{level}/syllabus/dependencies.md`
- `content/{cert}/{level}/syllabus/analysis.md`
- `content/{cert}/syllabus/boundary-map.md` (or single-level equivalent)
- `content/{cert}/_config.yaml`

---

## Arguments

```
/course-generate-lesson <topic-code>
```

- **`<topic-code>`** (optional): e.g. `L23201`. If omitted, read `dependencies.md` + `TODO.md` to pick the next topic.

Pipeline is always: **Codex writes → Claude reviews → Codex fixes**.

---

## Token-budget rules (apply to every stage)

1. **Never read large artifacts into main context.** Study guide, research notes, review reports — all are read by subagents only. Main context handles paths and short summaries.
2. **Reviewer writes to canonical path.** Claude adversarial reviewer writes its report to `/tmp/review-claude-{topic-code}.md`. Main never reads it — a downstream fix-brief subagent does.
3. **Persist orchestration state to disk.** Write the Phase 1 brief and per-stage status to `/tmp/lesson-{topic-code}-state.json` so a compaction or restart does not force re-derivation.
4. **Trust subagent return summaries.** If a wrapper says "wrote N lines to X", do not re-read X to verify. Only re-verify on suspicious output (empty stdout, error markers, or wrong path).
5. **Cap reviewer output.** Instruct the reviewer to cap its report at ~120 lines of machine-parseable findings (no preamble, no closing summary).

---

## Phase 1 — Combined Brief (INTAKE + BRAINSTORM + PLAN)

**Auto-derive everything. Do not ask the user individual questions.**

**⚠️ PROMPT TEMPLATE PATH:** All prompt templates live in `.claude/skills/course-generate-lesson/prompts/` (NOT `content/{cert}/{level}/prompts/`). Do NOT search for them — use this path directly.

1. Read `dependencies.md` and `TODO.md` to identify the next topic (or use the user-specified topic).
2. Read `_config.yaml` for tone.
3. Read `syllabus.yaml`, `analysis.md`, and `boundary-map.md` — extract ONLY the items for this topic. Do not read the full files if they are large.
4. Check whether a L23 sample questions reference file exists at `content/{cert}/{level}/exams/L23-sample-questions-11409.md` — if this topic is L23*, note its path in the state file for the researcher.
5. **Persist brief to disk.** Write the brief plus derived paths to `/tmp/lesson-{topic-code}-state.json`:

   ```json
   {
     "topic_code": "L23201",
     "topic_name": "機器學習原理與技術",
     "cert": "ipas",
     "level": "intermediate",
     "paths": {
       "lesson_dir": "content/ipas/intermediate/lessons/L23201-機器學習原理與技術",
       "study_guide": "content/ipas/intermediate/lessons/L23201-機器學習原理與技術/study-guide.md",
       "research_notes": "content/ipas/intermediate/lessons/L23201-機器學習原理與技術/research-notes.md",
       "l23_sample_ref": "content/ipas/intermediate/exams/L23-sample-questions-11409.md",
       "review_claude": "/tmp/review-claude-L23201.md",
       "fix_brief": "/tmp/codex-fix-L23201.md"
     },
     "stages_completed": []
   }
   ```

   After each stage completes, the orchestration appends to `stages_completed` so a compaction or restart can resume without re-deriving.

Present **one combined brief**:

```
## Lesson Brief: [topic-code] — [topic-name]

**Tone:** [from _config.yaml]  |  **Output:** study guide only (no questions)

### Syllabus Items
- [items from syllabus.yaml]

### Keywords to Research
- [keywords]

### Boundary Rule
> [rule from boundary-map.md]

### Key Observations
- [high-frequency targets, confused pairs, scenario patterns, code question style, diagram candidates]

### Execution Plan
- Stage 1 — Researcher [codex exec] → research-notes.md
- Stage 2 — Study Guide Writer [codex exec] → study-guide.md
- Stage 3 — Claude Adversarial Review → review-claude.md
- Stage 4 — Fix Apply [codex exec] → patched study-guide.md
- Stage 5 — Auto-generate diagrams [Claude]
```

Ask: *"Approve this brief to start building?"*

**HARD-GATE:** Do not proceed to BUILD until the user approves the combined brief. This is the ONLY pre-build approval gate.

---

## Phase 2 — BUILD (runs uninterrupted after approval)

Everything below runs without asking the user any questions.

### Stage 1: Researcher (Codex)

Launch a Claude subagent (thin wrapper) that:
1. Reads the researcher prompt template from disk (`prompts/researcher.md`)
2. Fills in context vars (cert, level, topic code, topic name, syllabus items, keywords, boundary rule, target audience, language)
3. If `l23_sample_ref` path exists in state file, appends to the prompt: "Also read [path] for community-sourced exam intelligence on L23 topics."
4. Writes the filled prompt to `/tmp/codex-researcher-{topic-code}.md`
5. Runs: `cat /tmp/codex-researcher-{topic-code}.md | codex exec 2>&1`
6. Returns ≤3 lines: output path + line count + 1-line "key findings" headline. **Do not echo the file contents.**

Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/research-notes.md`

After return, append `"researcher"` to `stages_completed` in the state file.

### Stage 2: Study Guide Writer (Codex)

Launch a Claude subagent (thin wrapper) that:
1. Reads the study guide prompt template from disk (`prompts/study-guide-writer.md`)
2. Fills in context variables (topic code, level, file paths, research notes path, tone, includes_code flag from syllabus.yaml)
3. Writes the filled prompt to `/tmp/codex-study-guide-{topic-code}.md`
4. Runs: `cat /tmp/codex-study-guide-{topic-code}.md | codex exec 2>&1`
5. **Returns one line: output path + line count.** Do NOT re-read the output file unless codex stdout is empty or contains an error marker.

Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/study-guide.md`

The study guide prompt template is model-agnostic — reuse as-is. Do NOT duplicate it for codex.

Pass the research-notes.md **file path** to the author. Do not read research notes into main context.

After return, append `"study_guide"` to `stages_completed`.

### Stage 3: Claude Adversarial Review

Launch a Claude subagent with the prompt from `prompts/claude-adversarial-reviewer.md`. Fill in:
- Topic code, topic name, keywords, boundary rule
- Study guide path
- Research notes path

The reviewer reads the study guide directly, spot-checks for technical accuracy errors, and writes findings to `/tmp/review-claude-{topic-code}.md`. Cap output at ~120 lines.

The subagent returns ≤3 lines to main: report path + finding count by severity (critical / important / minor).

After return, append `"review_claude"` to `stages_completed`.

### Stage 4: Fix Apply (Codex)

Launch a Claude subagent (fix-brief builder) that:
1. Reads `/tmp/review-claude-{topic-code}.md`
2. Groups findings by severity: **Critical** (technical error with exam impact) / **Important** (clear impact) / **Minor** (suggestions)
3. Writes fix instructions to `/tmp/codex-fix-{topic-code}.md`: "Apply every fix listed below to the specified file. Preserve all other content. Report a summary of changes made."
4. Returns one paragraph (≤4 lines) to main: total findings, critical count, important count, top critical issues.

Then launch a second Claude subagent (thin wrapper) that:
1. Runs: `cat /tmp/codex-fix-{topic-code}.md | codex exec 2>&1`
2. Verifies the study guide file still exists and returns a ≤3-line change summary.

If `codex exec` fails for fix apply, fall back to a Claude subagent that reads the study guide and applies the fixes directly.

After return, append `"fix_apply"` to `stages_completed`.

### Stage 5: Auto-Generate Diagrams (Claude)

Decide which diagrams the lesson needs (typically 3–5). Create them all without asking.

- **Mermaid diagrams** — flowcharts, decision trees, comparisons
- **ASCII diagrams** — concept maps, hierarchies (may already be in study guide)

Output under `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/diagrams/`. Embed diagram references in `study-guide.md`.

---

## Phase 3 — Final Presentation and Approval

Present the completed lesson with:

1. **Artifact summary table** (files created, line counts — pulled from state file, no re-reads)
2. **Review summary** (issues found, fixes applied — from fix-brief builder return)
3. **Diagram list** (what was generated)
4. **Remaining open items** (if any — e.g., diagram images need Gemini rendering)

Ask: *"Approve this lesson?"*

**HARD-GATE:** Do not proceed to TODO Sync until the user approves.

---

## Phase 4 — TODO Sync + Commit

Once the user approves the lesson:

### 1. Update TODO.md

Read `content/{cert}/{level}/TODO.md`, then:

- **Lesson Progress table:** Set the lesson's row to **Done** with open-item count.
- **Open Items section:** Add heading with unresolved items (diagram rendering, flagged TODOs).
- **What's Next section:** Update next lesson, remaining count, move topic to ~~Done~~ list.

### 2. Auto-commit

Stage all lesson files and commit with a meaningful message:
```
feat(content): complete [topic-code] [topic-name] study guide
```

### 3. Announce

Tell the user what was updated and committed. Tell them to run `/course-generate-lesson {next-topic}`, or `/course-generate-exam` if all topics are done.

**HARD-GATE:** Do not invoke the next lesson automatically. Terminal state: approved, committed, next command told to the user.

---

## Error Handling

- WebSearch empty → ask the user for an alternative source.
- Incomplete agent output → re-run that agent only, not all agents.
- Fact-check critical errors → apply fixes, flag truly ambiguous items as TODOs.
- **Codex researcher failure** → re-run once. If it fails again, fall back to a Claude subagent for that artifact only.
- **Codex study guide failure** (empty output, wrong file) → re-run once. If it fails again, fall back to a Claude subagent.
- **Codex fix failure** → fall back to a Claude subagent that applies the fix-brief edits directly. Do NOT retry codex for fixes.
- **Compaction mid-run** → before any user-visible action, read `/tmp/lesson-{topic-code}-state.json` to recover paths and `stages_completed`. Resume from the next uncompleted stage.
- Re-running a topic overwrites all files for that topic. Old versions live in git history.

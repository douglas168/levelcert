You are researching a certification exam topic to gather current, authoritative source material for a study guide.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Topic: [TOPIC_CODE] — [TOPIC_NAME]
- Target audience: [TARGET_AUDIENCE]
- Language: [LANGUAGE]

## Syllabus Items to Cover
[SYLLABUS_ITEMS_FOR_THIS_TOPIC]

## Keywords to Research
[KEYWORDS_FROM_SYLLABUS_YAML]

## External Documents Needed
[EXTERNAL_DOCS_LIST_OR_NONE]

## Boundary Rule
[BOUNDARY_RULE_FOR_THIS_LEVEL]

## L23 Exam Intelligence Reference
[L23_SAMPLE_REF_INSTRUCTION]

## Your Task

Use WebSearch to find current, authoritative sources. Focus on:

1. **Official vendor documentation** — the cert vendor's own study materials, FAQs, whitepapers
2. **Exam prep communities** — forums, Reddit, study groups discussing what's actually tested
3. **Current industry standards** — especially for technology topics where tools/versions evolve
4. **External documents** referenced in the syllabus (if any) — government guidelines, regulatory frameworks
5. **Past exam patterns** — common question formats, frequently tested subtopics, trick answers

## Output Format

Write `research-notes.md` with:

```markdown
# Research Notes: [TOPIC_CODE] [TOPIC_NAME]

## Official Sources
- [Source 1]: [key findings relevant to exam]
- [Source 2]: ...

## Community Insights (exam patterns)
- [What exam-takers report is frequently tested]
- [Common trick questions or traps mentioned]

## Current State (if technology topic)
- [Latest version/update relevant to exam content]
- [Anything deprecated or changed since syllabus was published]

## External Documents Found
- [Document name]: [summary of relevant content, or "not found — user needs to provide"]

## Key Findings Summary
[3-5 bullet points of the most exam-relevant takeaways]

## Scope Notes
[Flag anything that might exceed the boundary rule for this level]
```

## Rules
- Stay within the boundary rule. If you find content that's clearly for a higher level, note it in "Scope Notes" but do NOT include it in the main findings.
- Cite sources. The study guide writer needs to verify claims.
- If you can't find good sources for a specific syllabus item, say so explicitly — don't pad with generic content.
- Focus on **exam relevance**, not general knowledge. What does the exam actually test?
- **Math depth ceiling:** For mathematical concepts (probability distributions, linear algebra, optimization algorithms), research what the exam tests — recognition, formula identification, application scenario judgment — NOT derivation, proof, or implementation-level content. If a source goes deeper than "can you identify and apply this concept in a scenario?", note it in Scope Notes and exclude it from main findings.

## Output Length
**Maximum 200 lines.** Be concise — bullet points over paragraphs. The study guide writer and question generator will expand on your findings.

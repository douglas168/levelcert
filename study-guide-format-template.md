# Study Guide Reformat Template for iPAS Lessons

Use this file as the instruction template when asking an AI to reformat another iPAS study guide.

Suggested prompt:

```text
Please reformat <target-study-guide.md> using the structure and rules in <this-template-file>.
Preserve the original exam-relevant content, but rewrite it so it is easier for beginners to understand and easier to use for exam preparation.
```

---

## Goal

Rewrite the target study guide as a beginner-friendly exam-prep guide.

The guide should help the learner:

1. Understand the material in plain language.
2. See where each concept fits in the bigger picture.
3. Recognize likely exam keywords and traps.
4. Practice choosing answers for scenario questions.
5. Review quickly before the exam.

The output should not feel like a dense reference document. It should feel like a guided learning path.

---

## Core Teaching Pattern

For each major concept section, use this order:

```text
先懂一句話
→ Everyday Analogy
→ 在整體流程中的位置
→ Key concepts / tables / examples
→ Exam Rule
→ Quick Check with answer directly below
```

When a section contains similar methods, comparison tables, formulas, or English technical terms, prefer this more explicit reading-first version:

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

Use this explanation style:

- Start with the mental shortcut before the formal definition.
- Pair key Chinese terms with English terms, for example `分位數（Quantile）`.
- Use concrete analogies such as `全班排名`, `排名位置`, and `百分等級（percentile rank）` when explaining ranking, quantiles, or distribution transforms.
- For comparison sections, make the table a decision helper instead of a memorization table.
- Before a comparison table, add a compact hook such as `Log Transform = 壓縮很大的數字`.
- For numeric examples, show the missing intermediate steps before the final result.

Use this section pattern:

````md
## N. Concept Name 🔥🔥

### 先懂一句話

Explain the concept in 1-3 beginner-friendly sentences.

### Everyday Analogy

Use one simple everyday analogy. Keep it short and concrete.

### 在整體流程中的位置

Show where the concept fits in the lesson's bigger workflow.

```text
Step A → This concept → Step C
```

### Key Concepts

Use tables, short examples, and decision rules.

### Exam Rule

```text
Keyword / scenario → correct concept or answer
Keyword / scenario → correct concept or answer
```

### Quick Check

Ask one short exam-style question.

答案：Give the answer directly below the question, with one sentence explaining why.
````

---

## Recommended File Structure

Use this table of contents unless the lesson topic clearly needs a small adjustment:

```md
# <Lesson Code> <Lesson Title> — Study Guide v2

## 0. How to Use This Guide
## 1. Big Picture / Core Pipeline
## 2. Core Concept 1
## 3. Core Concept 2
## 4. Core Concept 3
## 5. Core Concept 4
## 6. Task / Scenario Selection
## 7. Modern or Applied Topic
## 8. Exam Decision Trees
## 9. Trap Clinic
## 10. Practice Questions
## Final Oral Recall
## Final Study Advice
```

For NLP lessons, this maps well to:

```md
## 1. The NLP Pipeline
## 2. Tokenization
## 3. Word Embeddings
## 4. Transformer and Attention
## 5. Three Transformer Families
## 6. NLP Tasks and Architecture Selection
## 7. RAG and Modern QA
```

For non-NLP lessons, adapt Sections 2-7 to the domain while preserving the same learning flow.

---

## Section Rules

### 0. How to Use This Guide

Include:

- Recommended reading order.
- How to use practice sections.
- A fire marker legend.

Use this marker meaning:

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

### 1. Big Picture / Core Pipeline

Start with the whole map before details.

For NLP, use:

```text
Raw text
→ Tokenization
→ Embedding
→ Transformer / Attention
→ Architecture family
→ Task output
```

For other topics, create the equivalent process map.

Add a small table:

```md
| 題目問的是 | 想到 |
|---|---|
| <exam wording> | <concept> |
```

### Core Concept Sections

Each core concept should include:

- Plain-language definition.
- Everyday analogy.
- Process position.
- One concrete example.
- Comparison table if there are similar concepts.
- Exam rule block.
- Quick Check with answer immediately below.

### Task / Scenario Selection

This section should train exam reasoning.

Use:

```text
先看輸出形式 / scenario requirement
→ 判斷任務類型
→ 選方法、模型、架構、工具
```

Include a table:

```md
| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
```

### Exam Decision Trees

Use compact ASCII decision trees.

Example:

```text
題目問任務？
│
├─ 輸出是類別？
│  └─ 選 classification method
│
├─ 輸出是原文片段？
│  └─ 選 extraction method
│
└─ 需要外部資料？
   └─ 選 retrieval-based method
```

### Trap Clinic

Each trap should use this format:

````md
### Trap N：<wrong idea>

錯。<short correction>

Exam fix：

```text
Keyword / wording → correct answer
```
````

Focus on wrong answer patterns that are likely to appear in multiple-choice questions.

### Practice Questions

Include 15-25 short questions.

Group them by concept:

```md
### 10.1 <Concept>
### 10.2 <Concept>
### 10.3 Mixed Traps
```

Each question should include:

```md
**Q1.** <question>

答案：<answer>
理由：<one short explanation>
```

### Final Oral Recall

Include 5-7 sentences the learner can say out loud before the exam.

Good format:

```md
## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. ...
2. ...
```

### Final Study Advice

End with one short paragraph that reminds the learner how to think during the exam.

For example:

```md
不要只背名詞。考試真正想測的是你能不能從題目描述判斷：這是在問哪個流程、哪個任務、哪個方法。
```

---

## Writing Style Rules

Use:

- Beginner-friendly Chinese explanations.
- English technical terms next to Chinese terms when useful.
- Short paragraphs.
- Tables for comparisons.
- `text` code blocks for pipelines, formulas, and decision trees.
- Direct exam wording such as 「題目看到... → 想到...」.
- One everyday analogy per major concept section.

Avoid:

- Long textbook paragraphs.
- Too many concepts before the learner knows the big picture.
- Answers hidden far away from questions.
- Mnemonics without explanation.
- Dense trees before explaining how to read them.

---

## Exam-Prep Rules

For every major concept, add at least one exam trigger rule:

```text
keyword / scenario → answer
```

Examples:

```text
一詞多義 / 上下文改變意思 → contextualized embedding
OOV / 新詞 / 專有名詞 → subword tokenization
分類 / 情感分析 / NER → encoder-only / BERT
對話 / 續寫 / few-shot → decoder-only / GPT
翻譯 / 摘要 / seq2seq → encoder-decoder / T5/BART
最新資料 / 引用來源 / 降低幻覺 → RAG
```

For non-NLP lessons, create the equivalent mapping from exam keywords to correct concepts.

---

## Everyday Analogy Guidance

Analogies should be:

- Familiar to a beginner.
- One paragraph only.
- Immediately useful for the concept.
- Not more memorable than the actual exam rule.

Good analogy patterns:

| Concept type | Analogy style |
|---|---|
| Breaking input into parts | Cutting food into bite-size pieces |
| Turning concepts into numbers | Putting items on a map as coordinates |
| Choosing a method | Choosing the right tool |
| Searching before answering | Open-book exam |
| Combining information | Group discussion |

Do not use analogies that introduce new technical confusion.

---

## Output Checklist

Before finishing the reformatted guide, verify:

- [ ] The guide starts with a big-picture process map.
- [ ] Each major concept has `先懂一句話`.
- [ ] Each major concept has `Everyday Analogy`.
- [ ] Each major concept has an `Exam Rule`.
- [ ] Quick Check answers appear directly below the questions.
- [ ] There is an exam decision tree section.
- [ ] There is a trap clinic.
- [ ] There are practice questions with answers and reasons.
- [ ] There is a final oral recall section.
- [ ] The guide preserves original exam-relevant facts.
- [ ] The guide removes or compresses details that are not needed for this exam level.

---

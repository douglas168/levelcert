## Precision vs Recall

**比喻：** 就像蝦皮搜尋「正版球鞋」，Precision 是搜尋結果有多少真的正版，Recall 是所有正版球鞋你找到了多少。

| Feature     | Precision（精確率）                          | Recall（召回率）                                    | F1 Score（F1 分數）                             |
| ----------- | -------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| What        | Of what you **picked**, how many were right? | Of all the **right things**, how many did you find? | One score balancing both                        |
| Kid version | “Were my guesses clean?”                     | “Did I miss many?”                                  | “Am I balanced?”                                |
| How         | TP / (TP + FP)                               | TP / (TP + FN)                                      | 2PR / (P + R)                                   |
| When        | Bad picks are costly                         | Missing one is costly                               | Need both                                       |
| Example     | Security guard stops only real thieves       | Guard catches every thief                           | Guard catches thieves without annoying everyone |
| Difficulty  | Medium                                       | Medium                                              | Medium-Hard                                     |

| Situation        | Precision asks                                 | Recall asks                         |
| ---------------- | ---------------------------------------------- | ----------------------------------- |
| Spam mail        | “Marked spam: how many were spam?”             | “All spam: how many caught?”        |
| Cancer detection | “Predicted cancer: how many truly had cancer?” | “All cancer cases: how many found?” |

**Key Points:**

- ⚡ Precision（精確率） = **don’t accuse the wrong person**.
- ⚠️ Recall（召回率） = **don’t miss the real problem**.
- 💡 Cancer detection usually cares more about Recall（召回率）.

**Quiz:** For a school security guard, is Precision（精確率） or Recall（召回率） more important if missing a thief is very dangerous?

---

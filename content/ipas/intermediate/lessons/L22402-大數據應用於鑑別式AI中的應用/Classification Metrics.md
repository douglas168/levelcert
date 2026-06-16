## Classification Metrics

**比喻：** 就像夜市套圈圈，Accuracy 看整體命中率，Precision 看套中的有多少真的是獎品，Recall 看所有獎品你套中了多少。

| Feature    | Accuracy（準確率）           | Precision（精確率）                         | Recall（召回率）                    | F1 Score（F1 分數）                  |
| ---------- | ---------------------------- | ------------------------------------------- | ----------------------------------- | ------------------------------------ |
| What       | Overall correct ratio        | Predicted positives that are truly positive | Actual positives successfully found | Balance between Precision and Recall |
| How        | (TP + TN) / All              | TP / (TP + FP)                              | TP / (TP + FN)                      | 2PR / (P + R)                        |
| When       | Balanced classes             | False Positive（偽陽性） is costly          | False Negative（偽陰性） is costly  | Need one combined score              |
| Example    | Correct spam + normal emails | Flagged spam is really spam                 | Real spam gets caught               | Spam filter balance                  |
| Difficulty | Easy                         | Medium                                      | Medium                              | Medium-Hard                          |

**Key Points:**

- ⚡ Accuracy（準確率） can be misleading when data is imbalanced.
- ⚠️ Do not choose Precision（精確率） or Recall（召回率） blindly; choose based on error cost.
- 💡 F1 Score（F1 分數） matters most when both false alarms and missed cases are important.

**Quiz:** In cancer detection, which metric is usually more important: Precision（精確率） or Recall（召回率）?

---

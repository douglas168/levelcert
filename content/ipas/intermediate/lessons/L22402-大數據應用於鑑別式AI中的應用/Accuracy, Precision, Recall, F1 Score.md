## Accuracy, Precision, Recall, F1 Score

**比喻：** 就像捷運安檢要抓危險物，Precision 是不要亂抓乘客，Recall 是不要漏掉真的危險物，F1 是兩邊都顧。

| Feature             | Accuracy（準確率）                        | Precision（精確率）                                  | Recall（召回率）                               | F1 Score（F1 分數）                                      |
| ------------------- | ----------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| What                | How often the system is right overall     | When it says “yes,” how often it is right            | Of all real “yes” cases, how many it catches   | One score for both Precision and Recall                  |
| Cancer detection    | How often test results are correct        | Of people flagged cancer, how many truly have cancer | Of all people with cancer, how many are found  | Balance: catch cancer without too many false alarms      |
| Security guard      | How often guard judges people correctly   | Of people stopped, how many are real threats         | Of all real threats, how many are stopped      | Balance: stop threats without bothering everyone         |
| Navy SEAL selection | How often selection decisions are correct | Of people selected, how many truly fit               | Of all truly fit people, how many are selected | Balance: choose strong candidates without missing talent |
| Spam mail filter    | How often emails are classified correctly | Of emails sent to spam, how many are spam            | Of all spam emails, how many are caught        | Balance: block spam without hiding real emails           |

**Key Points:**

- ⚡ Precision（精確率） means **“when I say yes, am I usually right?”**
- ⚠️ Recall（召回率） means **“did I miss important cases?”**
- 💡 Cancer detection often values Recall（召回率） because missing cancer is dangerous.

**Quiz:** For spam mail, which mistake is worse: sending a real email to spam, or letting spam into the inbox?

---

Accuracy = 全班平均考幾分
Precision =被選上的人準不準
Recall = 該選的人有沒有漏
F1 = Precision 和 Recall 的平衡分數

先判斷任務，不要先套公式
輸出是類別 → classification
誤報成本高 → Precision
漏報成本高 → Recall
門檻 / 機率 / 排序 → threshold / AUC

題目問評估指標？
│
│
│
│
│
├─ 類別分布平均，只問整體答對率？
│ └─ Accuracy
├─ 少數類 / rare positive / imbalance？
│ └─ 不要只看 Accuracy
├─ 不想誤報 / 不想亂抓 / 複查很貴？
│ └─ Precision
├─ 不想漏報 / 寧可多抓 / 病患或詐欺不能漏？
│ └─ Recall
└─ Precision 與 Recall 都要兼顧？
└─ F1 Score
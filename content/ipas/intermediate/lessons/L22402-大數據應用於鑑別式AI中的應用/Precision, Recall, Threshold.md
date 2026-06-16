## Precision, Recall, Threshold

**比喻：** 就像夜市射氣球，Threshold 調低就比較容易算命中，Recall 變高但 Precision 可能變低。

| Feature    | Precision（精確率）                           | Recall（召回率）                        | Threshold（門檻值）                     |
| ---------- | --------------------------------------------- | --------------------------------------- | --------------------------------------- |
| What       | Among predicted “yes,” how many are truly yes | Among real “yes,” how many were found   | Score cutoff for saying “yes”           |
| How        | TP / (TP + FP)                                | TP / (TP + FN)                          | If score ≥ threshold → predict positive |
| When       | Use when false alarms are costly              | Use when missing positives is costly    | Adjust to trade Precision vs Recall     |
| Example    | Cancer flagged: how many truly have cancer    | Cancer patients: how many were detected | 0.7 means only ≥70% risk is positive    |
| Difficulty | Medium                                        | Medium                                  | Medium                                  |

**Key Points:**

- ⚡ Lower Threshold（門檻值） usually increases Recall（召回率） but lowers Precision（精確率）.
- ⚠️ Higher Threshold（門檻值） usually increases Precision（精確率） but lowers Recall（召回率）.
- 💡 Threshold（門檻值） matters most when the cost of False Positive（偽陽性） and False Negative（偽陰性） is different.

**Quiz:** In cancer detection, should the Threshold（門檻值） usually be higher or lower if missing cancer is very dangerous?

---

## Precision vs Recall Choice

**比喻：** 就像捷運站保全調安檢鬆緊，怕漏掉壞人就重 Recall，怕亂攔路人就重 Precision。

| Feature    | Security Guard（保全）                          | Cancer Detection（癌症檢測）              | Spam Mail Filter（垃圾郵件過濾）          | Navy SEAL Selection（海豹部隊選拔）                  |
| ---------- | ----------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| What       | Usually prioritize Recall（召回率）             | Prioritize Recall（召回率）               | Usually prioritize Precision（精確率）    | Prioritize Precision（精確率）                       |
| How        | Catch more real threats, even with extra checks | Lower threshold to find more cancer cases | Avoid sending real emails to spam         | Select only people truly qualified                   |
| When       | Missing a threat is dangerous                   | Missing cancer can delay treatment        | False spam can lose important email       | Wrong selection can risk team safety                 |
| Example    | Better to check extra people than miss attacker | Better false alarm than missed tumor      | Better spam in inbox than lost bank email | Better reject extra candidates than accept unfit one |
| Difficulty | Medium                                          | High                                      | Medium                                    | High                                                 |

**Key Points:**

- ⚡ Use Recall（召回率） when **missing a real positive is dangerous**.
- ⚠️ Use Precision（精確率） when **false alarms or wrong approvals are costly**.
- 💡 In real systems, you often tune Threshold（門檻值） to balance both.

**Quiz:** For airport security, would you choose higher Precision（精確率） or higher Recall（召回率）, and why?

---

## Precision vs Recall Memory Rule

**比喻：** 就像 LINE 群組審核，怕放進壞帳號就看 Precision，怕漏掉好朋友就看 Recall。

| Feature       | Precision（精確率）                  | Recall（召回率）                       | Threshold（門檻值）                           |
| ------------- | ------------------------------------ | -------------------------------------- | --------------------------------------------- |
| What          | “When I say YES, am I right?”        | “Did I find all real YES cases?”       | How strict the YES decision is                |
| Why confusing | Both talk about “correct positives”  | Both use TP, but different denominator | Moving it changes both                        |
| Memory rule   | **Punish false alarms**              | **Punish misses**                      | Higher = stricter, lower = looser             |
| Use when      | False Positive（偽陽性） hurts more  | False Negative（偽陰性） hurts more    | Need to trade off                             |
| Example       | Navy SEAL: don’t accept unfit people | Cancer: don’t miss sick patients       | Cancer threshold lower, SEAL threshold higher |
| Difficulty    | Medium                               | Medium                                 | Medium                                        |

**Key Points:**

- ⚡ Ask: **Which mistake is worse?** False Positive → Precision; False Negative → Recall.
- ⚠️ Trap: “Positive” does not mean “good”; it means the thing you are detecting.
- 💡 Easy memory: **Precision = careful YES. Recall = catch them ALL.**

**Quiz:** In a spam filter, if losing a real email is worse than seeing spam, should you favor Precision（精確率） or Recall（召回率）?

---

threshold 降低
→ 判正類變多
→ TP 可能增加
→ FN 可能減少
→ Recall 常升
→ FP 也可能增加，Precision 常降
threshold 提高
→ 判正類變少
→ FP 可能減少
→ Precision 常升
→ FN 可能增加，Recall 常降

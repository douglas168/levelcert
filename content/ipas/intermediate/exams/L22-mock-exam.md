# IPAS AI應用規劃師 中級 — 科目二（L22）模擬試卷

**時間：90分鐘 ｜ 題數：50題 ｜ 每題只有一個正確答案**

> 涵蓋範圍：L221 機率統計基礎、L222 大數據處理技術、L223 大數據分析方法與工具、L224 大數據在人工智慧之應用

---

### L221 機率統計基礎

**1.（L22101）** 當資料含有離群值（outlier）時，若要描述典型中心位置，通常較適合優先參考哪一個指標？

(A) 平均數（mean）
(B) 中位數（median）
(C) 變異數（variance）
(D) 全距（range）

**1. 答案：(B) 中位數（median）**

✅ **(B) 中位數（median）**：中位數只看排序後的中間位置，較不容易被極端值拉動，因此在有 outlier 時通常比平均數穩健。

❌ (A) 平均數（mean）：平均數會把所有值都納入計算，遇到極端值時容易被大幅拉高或拉低，這是常見考試陷阱。

❌ (C) 變異數（variance）：變異數描述分散程度，不是中心位置。

❌ (D) 全距（range）：全距只反映極值差距，反而更容易受極端值影響。

📖 L22101｜描述性統計

---

**2.（L22101）** 若數值欄位存在缺失值（missing values），且該欄位有明顯離群值（outliers），使用 `fillna()` 時通常較穩健的補值方式為何？

(A) 以中位數（median）補值
(B) 以最大值（max）補值
(C) 以平均數（mean）補值
(D) 以標準差（std）補值

**2. 答案：(A) 以中位數（median）補值**

✅ **(A) 以中位數（median）補值**：中位數對極端值較不敏感，因此在分布偏斜或含 outlier 時，常比平均數更穩健。

❌ (B) 以最大值（max）補值：以最大值補缺失通常會引入極端偏差。

❌ (C) 以平均數（mean）補值：平均數容易被極端值拉動，考生常因它最常見就直接選，但在此情境並非最佳。

❌ (D) 以標準差（std）補值：標準差是離散程度指標，不適合作為單一代表值來補缺失。

📖 L22101｜描述性統計

---

**3.（L22101）** 台北某補習班統計 5 位學員模擬考分數為 68、70、72、74、98。若要在招生簡報中呈現大多數學員的典型成績（typical score），哪一個指標最適合？

(A) 中位數（median）72
(B) 平均數（mean）76.4
(C) 全距（range）30
(D) 眾數（mode）不存在，因此不可摘要

**3. 答案：(A) 中位數（median）72**

✅ **(A) 中位數（median）72**：98 明顯偏高，會把平均數往上拉；中位數 72 更能代表多數學員的中心位置。

❌ (B) 平均數（mean）76.4：平均數被 98 拉高，不能代表大多數學員的典型成績。

❌ (C) 全距（range）30：全距只描述最高與最低的差距，無法當作典型成績。

❌ (D) 眾數（mode）不存在，因此不可摘要：即使沒有眾數，也仍可用平均數或中位數進行摘要。

📖 L22101｜描述性統計

---

**4.（L22101）** 某校研究室觀察實驗完成時間，已知 Q1=12、Q3=20，排序資料中最大值依序為 24、25、34。依箱型圖（boxplot）規則，右側鬚（upper whisker）應延伸到哪一個值？

(A) 20
(B) 32
(C) 25
(D) 34

**4. 答案：(C) 25**

✅ **(C) 25**：IQR = 8，上界 fence = 20 + 1.5×8 = 32。箱型圖鬚不是畫到 32，而是延伸到 fence 內最後一個資料點，因此是 25。

❌ (A) 20：20 是 Q3 本身，不是右鬚終點。

❌ (B) 32：箱型圖鬚並非畫到 fence 值本身，而是要找 fence 內的最後一個真實資料點。

❌ (D) 34：34 已超過 fence 32，應標示為離群值（outlier），而非鬚的終點。

📖 L22101｜描述性統計

---

**5.（L22102）** 若資料科學家要用 `scipy.stats` 計算 `X~N(70,5^2)` 時 `P(X<=75)`，下列哪個函式呼叫正確？

(A) `norm.pdf(75, loc=70, scale=5)`
(B) `norm.cdf(75, loc=70, scale=25)`
(C) `norm.cdf(75, loc=70, scale=5)`
(D) `binom.cdf(75, n=70, p=0.5)`

**5. 答案：(C) `norm.cdf(75, loc=70, scale=5)`**

✅ **(C) `norm.cdf(75, loc=70, scale=5)`**：`norm.cdf` 計算累積機率 `P(X<=x)`，且 `scale` 應傳入標準差 σ=5，不是變異數。

❌ (A) `norm.pdf(75, loc=70, scale=5)`：`pdf` 回傳密度，不是累積機率。看到 `P(X<=75)` 時應優先想到 `cdf`。

❌ (B) `norm.cdf(75, loc=70, scale=25)`：25 是變異數 σ²，但 SciPy 的 `scale` 參數要的是標準差。

❌ (D) `binom.cdf(75, n=70, p=0.5)`：這題是常態分佈累積機率，不是二項分佈。

📖 L22102｜機率分配

---

**6.（L22102）** 某同學要計算 `X~N(100,16)` 的累積機率，寫成 `norm.cdf(104, loc=100, scale=16)`。這段 `scipy.stats` 程式的主要錯誤是什麼？

(A) 應改用 `binom.cdf`，因為 104 是整數
(B) `scale` 應傳入標準差 4，而不是變異數 16
(C) 應改用 `norm.pdf` 才能算累積機率
(D) 常態分佈不能計算 CDF

**6. 答案：(B) `scale` 應傳入標準差 4，而不是變異數 16**

✅ **(B) `scale` 應傳入標準差 4，而不是變異數 16**：在 `scipy.stats.norm` 中，`scale` 代表標準差 σ，本題變異數為 16，所以標準差是 4。

❌ (A) 應改用 `binom.cdf`，因為 104 是整數：值是整數不代表要用二項分佈；是否用常態要看分佈型態。

❌ (C) 應改用 `norm.pdf` 才能算累積機率：`cdf` 才是累積機率，`pdf` 只是密度。

❌ (D) 常態分佈不能計算 CDF：常態分佈當然可以計算 CDF。

📖 L22102｜機率分配

---

**7.（L22102）** 某 AI 線上課程共有 8 名學員參加小測，每人答對題目的機率獨立且皆為 0.6。若要計算剛好 5 人答對的機率，哪個表示式最適合？

(A) `poisson.pmf(5, mu=4.8)`
(B) `norm.cdf(5, loc=4.8, scale=1.39)`
(C) `8C5 * 0.6^8 * 0.4^5`
(D) `8C5 * 0.6^5 * 0.4^3`

**7. 答案：(D) `8C5 * 0.6^5 * 0.4^3`**

✅ **(D) `8C5 * 0.6^5 * 0.4^3`**：Binomial 的 PMF 為 C(n,k)×p^k×(1-p)^(n-k)，本題應為 8C5 × 0.6^5 × 0.4^3。

❌ (A) `poisson.pmf(5, mu=4.8)`：雖然 np=4.8，但題目是固定 8 人、每人成功率 0.6 的典型 Binomial，不應直接改用 Poisson。

❌ (B) `norm.cdf(5, loc=4.8, scale=1.39)`：常態近似不是本題最直接且精確的表示式。

❌ (C) `8C5 * 0.6^8 * 0.4^5`：成功與失敗次方寫反了，是常見公式記憶錯誤。

📖 L22102｜機率分配

---

**8.（L22102）** 閱讀程式碼 `poisson.cdf(2, mu=4)`，下列哪一項解讀最正確？

(A) 計算平均數為 2 的 Poisson 分佈
(B) 計算剛好發生 2 次的機率
(C) 計算當平均發生率為 4 時，事件次數小於等於 2 的機率
(D) 計算事件次數大於 2 的機率

**8. 答案：(C) 計算當平均發生率為 4 時，事件次數小於等於 2 的機率**

✅ **(C) 計算當平均發生率為 4 時，事件次數小於等於 2 的機率**：`cdf` 的語意是 `P(X<=k)`，因此此程式是在算 `P(X<=2)`，其中 `mu=4`。

❌ (A) 計算平均數為 2 的 Poisson 分佈：題目中的平均發生率是 4，不是 2。

❌ (B) 計算剛好發生 2 次的機率：剛好發生 2 次應使用 `poisson.pmf(2, mu=4)`。

❌ (D) 計算事件次數大於 2 的機率：右尾機率方向相反，若要算大於 2 通常需用 `1-cdf`。

📖 L22102｜機率分配

---

**9.（L22103）** 在假設檢定（hypothesis testing）中，哪一個敘述最符合虛無假設（null hypothesis, H0）的角色？

(A) 代表目前先被假定成立、等待資料檢驗的基準敘述
(B) 一定是研究者真正想證明為真的敘述
(C) 只要設定了 H0，就不需要設定對立假設（alternative hypothesis, H1）
(D) H0 一旦被提出，就不能被拒絕

**9. 答案：(A) 代表目前先被假定成立、等待資料檢驗的基準敘述**

✅ **(A) 代表目前先被假定成立、等待資料檢驗的基準敘述**：H0 是檢定時的基準假設，研究者用樣本資料判斷是否有足夠證據拒絕它。

❌ (B) 一定是研究者真正想證明為真的敘述：考生常把 H0 誤認為研究者想證明的主張；實際上研究者通常更關注 H1。

❌ (C) 只要設定了 H0，就不需要設定對立假設：假設檢定需要 H0 與 H1 成對出現，才能明確定義拒絕方向。

❌ (D) H0 一旦被提出，就不能被拒絕：若資料提供足夠證據，H0 可以被拒絕。

📖 L22103｜假設檢定

---

**10.（L22103）** 閱讀下列 pseudocode，輸出結果為何？

```python
alpha = 0.05
p_value = 0.20
if p_value <= alpha:
    print("Reject H0")
else:
    print("Fail to reject H0")
```

(A) 程式會報錯，因為 `alpha` 不能是 0.05
(B) 輸出 `Reject H0`
(C) 輸出 `H0 is true`
(D) 輸出 `Fail to reject H0`

**10. 答案：(D) 輸出 `Fail to reject H0`**

✅ **(D) 輸出 `Fail to reject H0`**：因為 `0.20 > 0.05`，條件不成立，會走到 `else` 分支。

❌ (A) 程式會報錯：`alpha = 0.05` 是常見而且有效的設定。

❌ (B) 輸出 `Reject H0`：只有在 `p_value <= alpha` 時才會輸出這行。

❌ (C) 輸出 `H0 is true`：程式沒有這個輸出，而且 failing to reject 不等於 H0 為真。

📖 L22103｜假設檢定

---

**11.（L22103）** 某校分析 AI 輔助教學後的成績變化，得到 `p-value = 0.07`，並事先設定 `α = 0.05`。下列結論何者最適當？

(A) 應拒絕 H0，因為 0.07 已經很接近 0.05
(B) H0 已被證明為真
(C) 目前證據不足，無法拒絕 H0
(D) 必須把 α 改成 0.07 才能做結論

**11. 答案：(C) 目前證據不足，無法拒絕 H0**

✅ **(C) 目前證據不足，無法拒絕 H0**：既然 `p-value > α`，標準結論就是 evidence is insufficient to reject H0。

❌ (A) 應拒絕 H0，因為 0.07 已經很接近 0.05：接近不代表小於；門檻是事前設定，不能事後模糊處理。

❌ (B) H0 已被證明為真：無法拒絕 H0 不等於證明 H0 為真。

❌ (D) 必須把 α 改成 0.07 才能做結論：不能看到結果後再修改 α 來配合結論。

📖 L22103｜假設檢定

---

**12.（L22103）** 某主管看到報告寫著 `p-value = 0.02`，便下結論：「這表示 H0 只有 2% 的機率為真，而且效果一定很大。」下列評估何者最恰當？

(A) 完全正確，p-value 本來就是 H0 為真的機率
(B) 前半句錯、後半句對；p-value 不代表 H0 機率，但一定代表效果大
(C) 兩句都不恰當；p-value 不等於 H0 為真的機率，也不直接代表效果大小
(D) 只有在 α = 0.01 時這句話才正確

**12. 答案：(C) 兩句都不恰當；p-value 不等於 H0 為真的機率，也不直接代表效果大小**

✅ **(C) 兩句都不恰當**：p-value 只衡量資料在 H0 下的極端程度，既不是 H0 的機率，也不能單獨代表效果大小或實務重要性。

❌ (A) 完全正確：這是統計課最常見的誤解之一。

❌ (B) 前半句錯、後半句對：顯著不等於效果大，還要看估計值與區間。

❌ (D) 只有在 α = 0.01 時這句話才正確：錯誤不在 α 的值，而在 p-value 被誤解。

📖 L22103｜假設檢定

---

### L222 大數據處理技術

**13.（L22201）** pandas 的 `dropna(how='all')` 與 `dropna(how='any')` 的差異為何？

(A) `how='all'` 只刪除「該列所有欄位都是 NaN」的列；`how='any'` 只要有一欄為 NaN 就刪除
(B) `how='all'` 只要有一欄為 NaN 就刪除；`how='any'` 只刪除全列皆為 NaN 的列
(C) 兩者行為相同，差異僅在效能
(D) `how='all'` 刪除欄（columns）；`how='any'` 刪除列（rows）

**13. 答案：(A) `how='all'` 只刪除「該列所有欄位都是 NaN」的列；`how='any'` 只要有一欄為 NaN 就刪除**

✅ **(A)**：`how='all'` 表示只有當一整列的所有值都是 NaN 時才刪除，`how='any'` 表示只要該列中有任一 NaN 就刪除。

❌ (B)：選項 B 把兩個參數的意義對調，是最常見的混淆錯誤。

❌ (C)：兩者行為截然不同，`how='any'` 比 `how='all'` 刪除更多列，不僅是效能差異。

❌ (D)：`how=` 參數控制刪除條件，`axis=` 才控制刪除方向（列或欄）。

📖 L22201｜數據收集與清理

---

**14.（L22201）** 時間序列（time-series）資料中有零散缺值，希望以前一個有效觀測值填補（forward fill）。在 pandas 3.0 環境下，哪段程式碼是正確寫法？

(A) `df['col'] = df['col'].ffill()`
(B) `df['col'] = df['col'].fillna(method='ffill')`
(C) `df['col'] = df['col'].fillna(method='pad')`
(D) `df['col'] = df['col'].forward_fill()`

**14. 答案：(A) `df['col'] = df['col'].ffill()`**

✅ **(A) `df['col'] = df['col'].ffill()`**：pandas 3.0 已移除 `fillna()` 的 `method=` 參數；正確的前向填補方式是直接呼叫 `df.ffill()` 或 `Series.ffill()`。

❌ (B) `fillna(method='ffill')`：此寫法在 pandas 2.1 起發出 FutureWarning，在 3.0 已完全移除，執行時會拋出 TypeError。

❌ (C) `fillna(method='pad')`：與 B 同理，`method=` 參數在 3.0 已移除，`'pad'` 是 `'ffill'` 的別名但同樣無效。

❌ (D) `forward_fill()`：`forward_fill()` 不是 pandas 的標準方法名稱，執行會拋出 AttributeError。

📖 L22201｜數據收集與清理

---

**15.（L22201）** 工程師在 pandas 3.0 環境下執行以下程式碼：

```python
df['temperature'] = df['temperature'].fillna(method='bfill')
```

執行後發生什麼？最正確的處理方式為何？

(A) 正常執行，以後一個有效值往前填補（backward fill）
(B) 發出 FutureWarning，但仍正確執行後向填補
(C) 靜默失敗，NaN 保持不變
(D) 拋出 TypeError，應改為 `df['temperature'] = df['temperature'].bfill()`

**15. 答案：(D) 拋出 TypeError，應改為 `df['temperature'] = df['temperature'].bfill()`**

✅ **(D)**：pandas 3.0 完全移除了 `fillna()` 的 `method=` 參數，執行時拋出 TypeError。正確替換方式是直接呼叫 `Series.bfill()`。

❌ (A) 正常執行：pandas 3.0 已移除此參數，不會正常執行，直接拋出錯誤。

❌ (B) 發出 FutureWarning：FutureWarning 是 pandas 2.1–2.x 的行為；在 3.0，`method=` 已完全移除，不再只是警告。

❌ (C) 靜默失敗：不是靜默失敗，而是明確拋出 TypeError。

📖 L22201｜數據收集與清理

---

**16.（L22201）** 以下 PySpark Structured Streaming 程式碼設定了 watermark 並嘗試去重複：

```python
df_dedup = (
    streaming_df
    .withWatermark('event_time', '2 hours')
    .dropDuplicatesWithinWatermark(['session_id'])
)
query = df_dedup.writeStream.outputMode('complete').start()
```

此程式碼會出現什麼問題？

(A) 沒有問題，`complete` 模式是 watermark 的首選輸出模式
(B) `dropDuplicatesWithinWatermark` 只支援全欄位去重，不接受 `['session_id']` 參數
(C) `outputMode('complete')` 與 watermark 不相容；應改用 `append` 或 `update` 模式
(D) `withWatermark()` 必須放在 `dropDuplicatesWithinWatermark()` 之後才能正確初始化

**16. 答案：(C) `outputMode('complete')` 與 watermark 不相容；應改用 `append` 或 `update` 模式**

✅ **(C)**：Spark Structured Streaming 文件明確說明：watermark 只與 `append` 和 `update` 輸出模式相容。`complete` 模式要求 Spark 保留並重算完整結果集，這與 watermark「丟棄過時狀態」的機制相衝突，查詢會在執行時拋出 AnalysisException。

❌ (A) 沒有問題：`complete` 模式是與 watermark 不相容的輸出模式，不是首選。

❌ (B) `dropDuplicatesWithinWatermark` 只支援全欄位去重：語法正確，可接受欄位名稱列表。

❌ (D) `withWatermark()` 必須放在後面：`withWatermark()` 必須在 dedup 操作之前呼叫，現有程式碼順序正確。

📖 L22201｜數據收集與清理

---

**17.（L22202）** 下列何者最符合 ACID 與 BASE 的典型對照？

(A) ACID 常見於 NoSQL；BASE 常見於 RDBMS
(B) 兩者都保證強一致性（strong consistency）
(C) ACID 強調交易正確性；BASE 偏向可用性與最終一致性（eventual consistency）
(D) BASE 表示資料一定不會延遲同步

**17. 答案：(C) ACID 強調交易正確性；BASE 偏向可用性與最終一致性（eventual consistency）**

✅ **(C)**：ACID 著重原子性、一致性、隔離性、持久性；BASE 則常在分散式 NoSQL 中用來換取可用性與擴展性。

❌ (A) ACID 常見於 NoSQL；BASE 常見於 RDBMS：這把兩者常見應用情境反過來了，屬常見陷阱。

❌ (B) 兩者都保證強一致性：BASE 常見的是 eventual consistency，不是都保證強一致性。

❌ (D) BASE 表示資料一定不會延遲同步：BASE 並不保證立即同步，反而容許延後達成一致。

📖 L22202｜數據儲存與管理

---

**18.（L22202）** 關於 dataset versioning（資料集版本控管）與時間旅行（Time Travel），下列何者最正確？

(A) 只要把檔名改成 `final_v2_really_final.csv` 就等同資料集版本控管
(B) 時間旅行代表系統自動刪除舊資料，不保留歷史
(C) dataset versioning 只對模型程式碼有用，對訓練資料無幫助
(D) 可回到特定資料版本重現訓練輸入，有助於追溯與實驗重現

**18. 答案：(D) 可回到特定資料版本重現訓練輸入，有助於追溯與實驗重現**

✅ **(D)**：資料集版本控管的目的就是讓資料與模型訓練可重現，時間旅行則讓你查詢或還原特定時間點資料狀態。

❌ (A) 只要把檔名改成 final_v2_really_final.csv：手動改檔名無法可靠記錄 lineage、差異與版本關聯，是常見但不成熟的做法。

❌ (B) 時間旅行代表系統自動刪除舊資料：時間旅行的重點是保留可追溯歷史，不是刪除歷史。

❌ (C) dataset versioning 只對模型程式碼有用：訓練資料版本一旦不清楚，就很難重現模型結果。

📖 L22202｜數據儲存與管理

---

**19.（L22202）** 某臺灣電商平台的結帳系統需要處理訂單、付款與庫存扣減，要求交易失敗時可完整回滾（rollback）。下列哪種選擇最合適？

(A) graph database，因為關係很多
(B) document database，因為 JSON 很彈性
(C) RDBMS 搭配 ACID transaction
(D) object storage，因為成本低

**19. 答案：(C) RDBMS 搭配 ACID transaction**

✅ **(C)**：訂單結帳屬典型 OLTP，需要交易一致性與回滾能力，RDBMS + ACID 最符合需求。

❌ (A) graph database：雖然資料之間有關係，但此場景核心是交易正確性，不是關係路徑分析。

❌ (B) document database：文件型資料庫可用於部分場景，但題目強調完整交易回滾，RDBMS 更典型。

❌ (D) object storage：object storage 不是交易系統的主要儲存引擎。

📖 L22202｜數據儲存與管理

---

**20.（L22202）** 某企業要同時支援 BI 報表、資料科學探索與原始 log 長期保存，希望避免 lake 與 warehouse 完全分離造成複製成本。下列哪種判斷最合理？

(A) 只用 OLTP 資料庫即可同時滿足三者
(B) 只要有 object storage，就自然等於完整 lakehouse
(C) graph database 較適合，因為 BI 報表本質上是關係查詢
(D) lakehouse 較適合，因為能在開放儲存上兼顧分析與治理

**20. 答案：(D) lakehouse 較適合，因為能在開放儲存上兼顧分析與治理**

✅ **(D)**：題目要兼顧 raw data 保留、分析與治理，且希望降低雙重存放成本，這正是 lakehouse 的訴求。

❌ (A) 只用 OLTP 資料庫：OLTP 不適合長期承接大規模分析與原始 log 保存。

❌ (B) 只要有 object storage，就自然等於完整 lakehouse：只有 object storage 不等於具備 metadata、版本、ACID 與治理能力，這是常見誤解。

❌ (C) graph database 較適合：BI 報表需求重點是分析與治理，不是圖形路徑分析。

📖 L22202｜數據儲存與管理

---

**21.（L22203）** 在 Hadoop Distributed File System（HDFS）中，常見的預設 block size 與 replication factor 分別為何？

(A) 128 MB 與 3
(B) 64 MB 與 2
(C) 256 MB 與 1
(D) 512 MB 與 5

**21. 答案：(A) 128 MB 與 3**

✅ **(A) 128 MB 與 3**：HDFS 在 Hadoop 3.x 常見教學與官方文件脈絡下，預設 block size 為 128 MB，replication factor 常見預設為 3。

❌ (B) 64 MB 與 2：64 MB 是較舊 Hadoop 時代常見記憶數字，容易被沿用；replication factor 2 也不符合常見預設值。

❌ (C) 256 MB 與 1：256 MB 可能出現在調校後環境，但不是本題常見預設；replication factor 1 會降低容錯性。

❌ (D) 512 MB 與 5：都屬於較激進或特定情境設定，不是中級考試應記住的基準值。

📖 L22203｜大數據處理技術

---

**22.（L22203）** 關於 Spark 的 transformation 與 action，哪一項敘述正確？

(A) show() 屬於 transformation，因為只顯示結果
(B) groupBy() 屬於 action，因為會分群
(C) filter() 與 select() 都屬於 transformation，通常不會單獨觸發計算
(D) count() 屬於 transformation，因為它會產生新數值

**22. 答案：(C) filter() 與 select() 都屬於 transformation，通常不會單獨觸發計算**

✅ **(C)**：filter()、select()、groupBy() 這些會建立邏輯計畫，屬於轉換（transformation）；真正執行通常由後續 action 觸發。

❌ (A) show() 屬於 transformation：show() 會要求 Spark 取出結果顯示，因此是 action，而非 transformation。

❌ (B) groupBy() 屬於 action：groupBy() 只是定義分群邏輯，仍需後續 agg() 與 action 觸發。

❌ (D) count() 屬於 transformation：count() 會回傳列數並觸發執行，是典型 action。

📖 L22203｜大數據處理技術

---

**23.（L22203）** 閱讀下列 SQL：`SELECT dept, emp, salary, AVG(salary) OVER (PARTITION BY dept) AS dept_avg FROM t;` 關於結果的敘述何者正確？

(A) 結果會每個部門只剩一列，因為 AVG 會自動做 GROUP BY
(B) 必須加上 GROUP BY dept, emp, salary 才能執行
(C) 每一列員工資料會被保留，並附加所屬部門平均薪資
(D) 這其實等同 LAG(salary)

**23. 答案：(C) 每一列員工資料會被保留，並附加所屬部門平均薪資**

✅ **(C)**：AVG(...) OVER (PARTITION BY dept) 是聚合視窗函數，會保留原始列，並對每列附加該部門的平均值。

❌ (A) 結果會每個部門只剩一列：這把視窗函數誤認為 GROUP BY；視窗函數不會折疊成每組一列。

❌ (B) 必須加上 GROUP BY：使用視窗函數不必像一般聚合查詢那樣強制加 GROUP BY。

❌ (D) 這其實等同 LAG(salary)：LAG 是取前一列值，與部門平均薪資完全不同。

📖 L22203｜大數據處理技術

---

**24.（L22203）** 閱讀查詢需求：『列出每位員工資料，同時顯示其部門平均薪資；不能失去原始列。』下列哪種寫法方向最符合需求？

(A) 只用 `GROUP BY dept`，因為平均薪資本來就要分組
(B) 用 `AVG(salary) OVER (PARTITION BY dept)`，因為可保留原始列
(C) 用 `COUNT(*) OVER (...)`，因為平均值可由筆數推得
(D) 用 `RANK() OVER (...)`，因為排名可取代平均

**24. 答案：(B) 用 `AVG(salary) OVER (PARTITION BY dept)`，因為可保留原始列**

✅ **(B)**：需求明確要求保留員工原始列，這是視窗函數聚合的典型使用場景。

❌ (A) 只用 `GROUP BY dept`：GROUP BY 會把資料折疊成每部門一列，失去員工明細。

❌ (C) 用 `COUNT(*) OVER (...)`：COUNT 只能得到筆數，無法直接替代平均薪資。

❌ (D) 用 `RANK() OVER (...)`：排名與平均值是不同分析目標。

📖 L22203｜大數據處理技術

---

### L223 大數據分析方法與工具

**25.（L22301）** 關於正規化（Normalization）與標準化（Standardization），下列敘述何者正確？

(A) Normalization 與 Standardization 一定同時進行，不能擇一
(B) Normalization 一定比 Standardization 更適合所有機器學習模型
(C) Normalization 常強調固定邊界；Standardization 常強調以平均與標準差調整尺度
(D) Standardization 的目的就是把所有欄位都變成整數

**25. 答案：(C) Normalization 常強調固定邊界；Standardization 常強調以平均與標準差調整尺度**

✅ **(C)**：這是兩者最實務、也最符合考試命題的區分方式：一個偏重值域邊界，一個偏重統計尺度。

❌ (A) 兩者一定同時進行：兩者可依資料與模型需求擇一，不必一定同時做。

❌ (B) Normalization 一定比 Standardization 更適合所有機器學習模型：沒有任何一種縮放對所有模型與資料都絕對最佳，這種說法過度武斷。

❌ (D) Standardization 的目的就是把所有欄位都變成整數：Standardization 不會把連續值強制變整數。

📖 L22301｜統計學在大數據中的應用

---

**26.（L22301）** 某零售資料中的每日交易筆數欄位大量集中在 0 到 20，但偶爾會出現上千筆，分佈呈明顯右偏，且資料包含 0。若希望降低偏態，下列哪個作法最合適？

(A) 直接使用 ln(x)，因為任何右偏資料都可直接取對數
(B) 只做 MinMaxScaler，因為縮到 0 到 1 就會自動變常態
(C) 使用 `log1p(x)`，因為資料含 0 且呈右偏
(D) 使用 SMOTE 平衡資料，因為高交易量太少

**26. 答案：(C) 使用 `log1p(x)`，因為資料含 0 且呈右偏**

✅ **(C)**：資料右偏且包含 0，`log1p(x)` 是比直接 ln(x) 更安全的對數轉換選擇。

❌ (A) 直接使用 ln(x)：ln(0) 無法定義，因此含 0 資料不能直接一律使用 ln(x)。

❌ (B) 只做 MinMaxScaler：MinMaxScaler 只改變尺度，不會自動把偏態分佈調成常態。

❌ (D) 使用 SMOTE：SMOTE 處理的是類別不平衡，不是連續欄位偏態。

📖 L22301｜統計學在大數據中的應用

---

**27.（L22301）** 關於 `PowerTransformer(method='box-cox')` 與手寫 Box-Cox 公式的比較，下列何者最合理？

(A) 兩者都能直接處理 0 與負值，因此無須先檢查資料
(B) 手寫公式只要知道 λ 就一定比 sklearn 更正確
(C) `PowerTransformer(method='box-cox')` 只做 Box-Cox，不涉及任何標準化
(D) sklearn 的 `PowerTransformer(method='box-cox')` 會估計 λ，且預設還會再做標準化

**27. 答案：(D) sklearn 的 `PowerTransformer(method='box-cox')` 會估計 λ，且預設還會再做標準化**

✅ **(D)**：依 sklearn 官方行為，`PowerTransformer(method='box-cox')` 會估計 `lambdas_`，且預設 `standardize=True`，這與只記純公式的教材觀念不同。

❌ (A) 兩者都能直接處理 0 與負值：Box-Cox 仍要求輸入值大於 0，不能直接處理 0 或負值。

❌ (B) 手寫公式一定比 sklearn 更正確：手寫公式與 sklearn 工具各有用途，不能簡化成「手寫一定更正確」。

❌ (C) 只做 Box-Cox，不涉及任何標準化：這是常見誤解；sklearn 版本的 PowerTransformer 預設會再標準化。

📖 L22301｜統計學在大數據中的應用

---

**28.（L22302）** 關於 K-means 分群（Clustering）的用途，下列何者正確？

(A) 可直接用來預測房價等連續數值
(B) 屬於非監督式學習（Unsupervised Learning），主要用來找自然群組
(C) 一定需要已標註的類別標籤才能訓練
(D) 本質上是決策樹（Decision Tree）的一種變形

**28. 答案：(B) 屬於非監督式學習（Unsupervised Learning），主要用來找自然群組**

✅ **(B)**：K-means 是典型的非監督式學習方法，目的是把資料依相似性分成多群，而不是依標籤學習。

❌ (A) 可直接用來預測房價等連續數值：預測連續數值屬於迴歸（Regression）任務。常見誤解是以為任何輸出數字的模型都能做預測，但 K-means 輸出的是群組指派。

❌ (C) 一定需要已標註的類別標籤才能訓練：需要標籤的是監督式方法。K-means 的價值就在於資料尚未標註時仍可探索結構。

❌ (D) 本質上是決策樹（Decision Tree）的一種變形：決策樹是監督式規則模型；K-means 是以距離與中心點為核心的分群方法，兩者原理不同。

📖 L22302｜數據分析演算法

---

**29.（L22302）** 關於 SMOTE 與 train/test split 的先後順序，下列何者正確？

(A) 先對整份資料做 SMOTE，再切分 train/test，評估較穩定
(B) 先切分資料，再只對 training split 做 SMOTE，可避免 data leakage
(C) 只要 test set 很大，先做 SMOTE 也不會 leakage
(D) SMOTE 應優先對 test set 做，讓指標比較漂亮

**29. 答案：(B) 先切分資料，再只對 training split 做 SMOTE，可避免 data leakage**

✅ **(B)**：正確流程是先切分，再只在訓練資料上 resampling。若先對整體資料做 SMOTE，合成點可能帶入測試資訊，造成 data leakage。

❌ (A) 先對整份資料做 SMOTE，再切分：這是考場高頻陷阱。看似讓資料更平衡，但其實讓訓練過程間接接觸到測試集資訊。

❌ (C) 只要 test set 很大，先做 SMOTE 也不會 leakage：資料量大不能消除 leakage，本質問題是資訊邊界被破壞。

❌ (D) SMOTE 應優先對 test set 做：test set 應保留真實分布，不能為了讓分數好看而先加工。

📖 L22302｜數據分析演算法

---

**30.（L22302）** 某醫療預警任務中，陽性個案只占 3%。若專案最在意『漏掉真正陽性個案』的風險，模型評估時應優先關注哪一類指標？

(A) 只看 accuracy
(B) 只看 SSE
(C) 優先看 recall，並搭配 precision / F1
(D) 只看群中心移動距離

**30. 答案：(C) 優先看 recall，並搭配 precision / F1**

✅ **(C)**：在少數類很重要且漏判代價高時，recall 直接反映找回陽性的能力；precision、F1 可一起評估誤報與整體平衡。

❌ (A) 只看 accuracy：accuracy 在極度不平衡時容易虛高，常讓團隊誤以為模型很好。

❌ (B) 只看 SSE：SSE 是分群目標，與分類預警任務不相符。

❌ (D) 只看群中心移動距離：群中心移動只與 K-means 收斂有關，不是分類性能指標。

📖 L22302｜數據分析演算法

---

**31.（L22302）** 你要用交叉驗證（Cross-Validation）比較『決策樹（Decision Tree）+ SMOTE』與『決策樹 + class_weight』兩條流程。若想避免 data leakage，哪個設計最合理？

(A) 把 SMOTE 放進 imblearn.pipeline.Pipeline，讓每個 training fold 在 fit 時才 resample
(B) 先對全資料做一次 SMOTE，再進行交叉驗證，確保各 fold 平衡
(C) 先用 test fold 做 SMOTE，讓模型學到更多邊界資訊
(D) 把樹剪深一點，避免 leakage

**31. 答案：(A) 把 SMOTE 放進 imblearn.pipeline.Pipeline，讓每個 training fold 在 fit 時才 resample**

✅ **(A)**：把 resampling 放進 Pipeline，才能保證每個 fold 的驗證資料不被訓練階段的合成樣本污染，是避免 leakage 的標準做法。

❌ (B) 先整體 SMOTE 再切 fold：先整體 SMOTE 再切 fold 是典型 leakage。考生常因為「每折都平衡」看起來合理而中招。

❌ (C) 先用 test fold 做 SMOTE：驗證或測試 fold 不應參與 resampling，否則評估失真。

❌ (D) 把樹剪深一點：剪枝可處理 overfitting，但不能修正資料切分流程錯誤。

📖 L22302｜數據分析演算法

---

**32.（L22303）** bar chart（長條圖）與 histogram（直方圖）最核心的差異為何？

(A) 長條圖只能顯示百分比，直方圖只能顯示次數
(B) 長條圖一定水平排列，直方圖一定垂直排列
(C) 長條圖通常比較類別資料，直方圖通常呈現連續數值分布
(D) 長條圖只能用於 Excel，直方圖只能用於 Python

**32. 答案：(C) 長條圖通常比較類別資料，直方圖通常呈現連續數值分布**

✅ **(C)**：長條圖用於比較類別間的數值，直方圖則把連續數值分箱（bin）後看分布，是考試最常見的陷阱。

❌ (A) 長條圖只能顯示百分比，直方圖只能顯示次數：兩者都可呈現次數、比例或其他聚合值，差異不在於只能顯示哪一種數值。

❌ (B) 長條圖一定水平排列，直方圖一定垂直排列：兩者都可以水平或垂直呈現，這不是核心差異。

❌ (D) 長條圖只能用於 Excel，直方圖只能用於 Python：這是把工具與圖表概念混為一談，任何主流視覺化工具都可畫這兩種圖。

📖 L22303｜大數據視覺化與工具

---

**33.（L22303）** 某教師要呈現全班考試分數的分布（distribution），並觀察是否偏態（skewness）。相較於 bar chart，為何 histogram 更合適？

(A) 因為 histogram 專門比較不同班級這類類別資料
(B) 因為 histogram 將連續分數分箱（binning），可看出集中、離散與偏態
(C) 因為 histogram 一定比任何其他圖更節省空間
(D) 因為 histogram 只能顯示平均數，不受極端值影響

**33. 答案：(B) 因為 histogram 將連續分數分箱（binning），可看出集中、離散與偏態**

✅ **(B)**：分數是連續數值，histogram 透過 bins 呈現分布形狀，能看集中區、尾部與偏態。

❌ (A) 因為 histogram 專門比較不同班級這類類別資料：班級這種離散類別比較才較像 bar chart 情境。

❌ (C) 因為 histogram 一定比任何其他圖更節省空間：空間效率不是主要判準，重點是資料型態與分析目的。

❌ (D) 因為 histogram 只能顯示平均數：histogram 不是平均數圖，而且仍可能反映極端值影響。

📖 L22303｜大數據視覺化與工具

---

**34.（L22303）** 某零售團隊想比較四個產品類別在北、中、南、東四個地區的銷售額，同時希望每個地區內各類別可以直接並排比較。最適合的圖表是什麼？

(A) Stacked bar chart（堆疊長條圖）
(B) Histogram（直方圖）
(C) Grouped bar chart（分組長條圖）
(D) Pie chart（圓餅圖）

**34. 答案：(C) Grouped bar chart（分組長條圖）**

✅ **(C)**：要在每個地區內直接比較多個類別，分組長條圖能保留共同基準線，較容易橫向比較。

❌ (A) Stacked bar chart（堆疊長條圖）：堆疊長條圖適合看總量與組成，但除了第一段外，其餘段落不易跨群組精準比較。

❌ (B) Histogram（直方圖）：直方圖用於連續數值分布，不適合類別交叉比較。

❌ (D) Pie chart（圓餅圖）：圓餅圖不適合同時比較多地區多類別。

📖 L22303｜大數據視覺化與工具

---

### L224 大數據在人工智慧之應用

**35.（L22401）** 下列何者最符合線上學習（Online Learning / Incremental Learning）的特徵？

(A) 每次一定要用全部歷史資料重新訓練
(B) 模型可隨新到達資料逐步更新
(C) 只能在分散式叢集上執行
(D) 一定比 mini-batch SGD 更準確

**35. 答案：(B) 模型可隨新到達資料逐步更新**

✅ **(B)**：Online / Incremental Learning 的核心是資料到一批更新一批，甚至逐筆更新，適合資料持續流入或無法一次放入記憶體的情境。

❌ (A) 每次一定要用全部歷史資料重新訓練：那是典型 batch retraining 思維，不是 incremental 更新。

❌ (C) 只能在分散式叢集上執行：線上學習可以在單機或分散式環境進行；常見誤解是把「線上」誤解成「上線服務」或「分散式平台」。

❌ (D) 一定比 mini-batch SGD 更準確：準確度取決於資料與調參，不能一概而論。

📖 L22401｜大數據在AI應用基礎

---

**36.（L22401）** 比較批次訓練（Batch Training）與小批次隨機梯度下降（Mini-batch SGD），下列何者正確？

(A) Mini-batch 每次更新只使用部分樣本，不必一次讀入全部資料
(B) Batch Training 一定比 Mini-batch 更省記憶體
(C) Mini-batch 一定比 full-batch 更快且更準
(D) 兩者都不能在 GPU 上執行

**36. 答案：(A) Mini-batch 每次更新只使用部分樣本，不必一次讀入全部資料**

✅ **(A)**：Mini-batch 的設計就是每次抽取部分資料估計梯度，因此在記憶體壓力與運算吞吐間取得折衷。

❌ (B) Batch Training 一定比 Mini-batch 更省記憶體：full-batch 常需要一次處理完整資料，記憶體需求通常較高。

❌ (C) Mini-batch 一定比 full-batch 更快且更準：這是常見誤解。Mini-batch 常較實務可行，但速度與準確度不保證在所有情況都優於 full-batch。

❌ (D) 兩者都不能在 GPU 上執行：兩者都可在 GPU 上執行。

📖 L22401｜大數據在AI應用基礎

---

**37.（L22401）** 某台灣零售電商每天持續收到新交易資料，且希望凌晨前更新詐欺偵測模型，不想每次都重新載入全部歷史資料。此情境較適合優先考慮哪一種方法？

(A) 固定每月做一次 full retraining，平時不更新
(B) 只保留最近 10 筆資料做 full-batch training
(C) Online / Incremental Learning 搭配定期驗證
(D) 把模型拆成 model parallelism 即可

**37. 答案：(C) Online / Incremental Learning 搭配定期驗證**

✅ **(C)**：資料持續流入且有頻繁更新需求時，Incremental Learning 可逐步吸收新資料，避免每次從頭重訓全部歷史資料。

❌ (A) 固定每月做一次 full retraining：更新頻率太低，無法滿足近即時的業務需求。

❌ (B) 只保留最近 10 筆資料做 full-batch training：只留 10 筆資料會嚴重喪失歷史資訊，並非合理訓練策略。

❌ (D) 把模型拆成 model parallelism 即可：模型並行解決的是模型太大，不是資料持續到達的更新問題。

📖 L22401｜大數據在AI應用基礎

---

**38.（L22401）** 有考生把「分散式訓練（Distributed Training）」直接等同於「聯邦學習（Federated Learning）」。就考試概念而言，哪一項分析最正確？

(A) 這兩者完全相同，只是英文不同
(B) 只要有多台機器參與，就一定是 federated learning
(C) Federated Learning 只適用於 Spark MLlib，因此通常可忽略
(D) Federated Learning 是分散式訓練的一種特殊形式，但分散式訓練範圍更廣

**38. 答案：(D) Federated Learning 是分散式訓練的一種特殊形式，但分散式訓練範圍更廣**

✅ **(D)**：Distributed Training 泛指多節點協作訓練；Federated Learning 則多了資料不集中、隱私與端側協作等特殊限制。

❌ (A) 這兩者完全相同，只是英文不同：這正是命題常見陷阱，兩者不能直接畫上等號。

❌ (B) 只要有多台機器參與，就一定是 federated learning：多機協作不必然是 federated；資料是否集中、是否跨組織才是關鍵。

❌ (C) Federated Learning 只適用於 Spark MLlib：Federated Learning 並不限於 Spark MLlib。

📖 L22401｜大數據在AI應用基礎

---

**39.（L22402）** 關於混淆矩陣（Confusion Matrix）的列與欄，下列敘述何者最常見且正確？

(A) 所有教材都固定列為預測、欄為實際，因此不必看標示
(B) 混淆矩陣只能用於多類別分類，不能用於二元分類
(C) 混淆矩陣只能看整體正確率，不能看錯誤型態
(D) 閱讀混淆矩陣前，應先確認列與欄分別代表實際標籤或預測標籤

**39. 答案：(D) 閱讀混淆矩陣前，應先確認列與欄分別代表實際標籤或預測標籤**

✅ **(D)**：不同工具或教材的軸向定義可能不同，先確認標示才能正確辨識 TP、FP、TN、FN。

❌ (A) 所有教材都固定列為預測、欄為實際：這是常見誤解。若不看標示直接套公式，很容易把 FP 與 FN 對調。

❌ (B) 混淆矩陣只能用於多類別分類：混淆矩陣可用於二元或多類別分類。

❌ (C) 混淆矩陣只能看整體正確率：混淆矩陣的核心價值正是拆解不同錯誤型態，而不只是一個總體比率。

📖 L22402｜AI模型評估與分類

---

**40.（L22402）** 關於 ROC 曲線（Receiver Operating Characteristic Curve）與 AUC-ROC，下列敘述何者正確？

(A) AUC-ROC 一定要用最終 hard label 計算
(B) ROC 曲線的橫軸通常是真正率（True Positive Rate）
(C) ROC 曲線主要觀察不同門檻（threshold）下真正率與假正率的變化
(D) AUC-ROC 越低代表模型越穩定

**40. 答案：(C) ROC 曲線主要觀察不同門檻（threshold）下真正率與假正率的變化**

✅ **(C)**：ROC 曲線是以不同門檻掃描，觀察 TPR 與 FPR 的變化；AUC 則是該曲線下面積。

❌ (A) AUC-ROC 一定要用最終 hard label 計算：AUC-ROC 的標準做法是使用 prediction scores，例如 `predict_proba` 的機率，而不是只用 hard label。

❌ (B) ROC 曲線的橫軸通常是真正率（True Positive Rate）：ROC 的橫軸通常是 False Positive Rate，不是真正率。

❌ (D) AUC-ROC 越低代表模型越穩定：AUC 越高通常代表排序能力越好，越低不是越穩定。

📖 L22402｜AI模型評估與分類

---

**41.（L22402）** 某資料科學家在不平衡資料集上回報模型 Accuracy=95%，但混淆矩陣顯示 TP=5、FN=45、FP=5、TN=945。對這份報告最合理的分析是什麼？

(A) Accuracy 很高，表示模型已足以部署
(B) 因為 FP 很少，所以 Recall 一定很高
(C) 雖然 Accuracy 高，但模型漏掉多數正類，若正類重要則報告可能誤導
(D) 只要 TN 大於 TP，混淆矩陣就不能用

**41. 答案：(C) 雖然 Accuracy 高，但模型漏掉多數正類，若正類重要則報告可能誤導**

✅ **(C)**：此例正類稀少，模型主要靠判對大量負類撐高 Accuracy；但 Recall = 5 / 50 = 0.10，若正類重要，實務價值有限。

❌ (A) Accuracy 很高，表示模型已足以部署：這正是不平衡資料下只看 Accuracy 的典型陷阱。

❌ (B) 因為 FP 很少，所以 Recall 一定很高：Recall 與 FN 直接相關，本例 FN 很高，Recall 反而很低。

❌ (D) 只要 TN 大於 TP，混淆矩陣就不能用：混淆矩陣仍然非常有用，正是它揭露了 Accuracy 掩蓋的問題。

📖 L22402｜AI模型評估與分類

---

**42.（L22402）** 下列哪一組『應用情境 → 優先關注指標』的配對最合理？

(A) 信用卡詐欺初篩 → Accuracy（準確率）
(B) 垃圾郵件過濾且重視正常信件不被攔截 → Recall（召回率）
(C) 醫療初篩且可再做人工複核 → Precision（精確率）
(D) 詐欺偵測且重視不要漏掉高風險交易 → Recall（召回率）

**42. 答案：(D) 詐欺偵測且重視不要漏掉高風險交易 → Recall（召回率）**

✅ **(D)**：詐欺偵測若最怕漏掉真正詐欺，就應優先提高 Recall 以降低 False Negative。

❌ (A) 信用卡詐欺初篩 → Accuracy（準確率）：詐欺資料通常不平衡，只看 Accuracy 容易產生錯誤安全感。

❌ (B) 垃圾郵件過濾且重視正常信件不被攔截 → Recall（召回率）：垃圾郵件若重視正常信件不被攔截，應偏向 Precision，而非 Recall。

❌ (C) 醫療初篩且可再做人工複核 → Precision（精確率）：醫療初篩若可人工複核，通常先重視 Recall，避免漏診。

📖 L22402｜AI模型評估與分類

---

**43.（L22403）** 關於 Byte Pair Encoding（BPE），下列敘述何者正確？

(A) 以 chosen/rejected pair 訓練 tokenizer
(B) 先固定整個字典後不再更新
(C) 透過反覆合併高頻字元對（iterative merge）形成 subword
(D) 一定需要人工先斷詞成單字後才能運作

**43. 答案：(C) 透過反覆合併高頻字元對（iterative merge）形成 subword**

✅ **(C)**：BPE 的核心就是從較小單位開始，反覆合併高頻字元對或子詞對，建立 subword vocabulary。

❌ (A) 以 chosen/rejected pair 訓練 tokenizer：chosen/rejected pair 是 RLHF 偏好資料格式，不是 tokenizer 訓練方式。

❌ (B) 先固定整個字典後不再更新：BPE vocabulary 是經由 merge 規則逐步形成，不是先天固定後完全不更新。

❌ (D) 一定需要人工先斷詞成單字後才能運作：BPE 並不要求一定先做人工單字切分；把它和傳統斷詞流程混為一談是常見誤解。

📖 L22403｜大語言模型與生成式AI數據

---

**44.（L22403）** 為什麼在企業導入生成式 AI 時，RAG（Retrieval-Augmented Generation）通常不需要像 pretraining 那樣的 TB 級資料？

(A) 因為 RAG 不會用到 tokenizer
(B) 因為 RAG 只允許使用英文資料
(C) 因為 RAG 仍要重新訓練整個基礎模型
(D) 因為 RAG 主要是對任務相關文件做切塊、嵌入與檢索，而不是從零學語言能力

**44. 答案：(D) 因為 RAG 主要是對任務相關文件做切塊、嵌入與檢索，而不是從零學語言能力**

✅ **(D)**：RAG 的價值在補充外部知識檢索，並不等於重新建立模型的通用語言能力，因此資料量常遠小於 pretraining。

❌ (A) 因為 RAG 不會用到 tokenizer：RAG 一樣常會受 tokenizer 與 token 長度影響。

❌ (B) 因為 RAG 只允許使用英文資料：RAG 並不限於英文，中文與多語資料也可使用。

❌ (C) 因為 RAG 仍要重新訓練整個基礎模型：RAG 核心不是 full retraining，這是和 fine-tuning/pretraining 混淆的典型錯誤。

📖 L22403｜大語言模型與生成式AI數據

---

**45.（L22403）** 你要為法規文件建立 RAG 系統，若使用單一 5,000-token chunk，最可能出現哪個問題？

(A) embedding 模型一定無法運作
(B) 檢索粒度過粗，容易取回包含太多無關內容的片段
(C) 向量資料庫會自動變成關聯式資料庫
(D) 模型會自動進入 RLHF 模式

**45. 答案：(B) 檢索粒度過粗，容易取回包含太多無關內容的片段**

✅ **(B)**：chunk 太大時，單一片段涵蓋過多主題，檢索命中雖可能包含答案，卻夾帶大量噪音。

❌ (A) embedding 模型一定無法運作：embedding 模型不一定無法運作，只是效果可能下降。

❌ (C) 向量資料庫會自動變成關聯式資料庫：向量資料庫的型態不會因 chunk 變大而改變。

❌ (D) 模型會自動進入 RLHF 模式：RLHF 與 RAG chunk 大小沒有這種自動關聯。

📖 L22403｜大語言模型與生成式AI數據

---

**46.（L22403）** 下列哪一組比較最能正確反映 pretraining、SFT 與 RAG 的資料角色差異？

(A) pretraining 用來存向量；SFT 用來做網頁爬蟲；RAG 用來切 GPU
(B) pretraining 重建通用語言能力；SFT 對齊任務或指令；RAG 透過外部文件檢索補充最新知識
(C) 三者本質完全相同，只是名稱不同
(D) 只要用了 RAG，就不再需要任何資料清理

**46. 答案：(B) pretraining 重建通用語言能力；SFT 對齊任務或指令；RAG 透過外部文件檢索補充最新知識**

✅ **(B)**：這個選項同時抓到三者的功能定位，而不是只比較資料量。

❌ (A) pretraining 用來存向量；SFT 用來做網頁爬蟲；RAG 用來切 GPU：三個描述都把概念錯置到不相關的系統元件上。

❌ (C) 三者本質完全相同，只是名稱不同：三者在訓練目標、資料型態與系統架構上明顯不同。

❌ (D) 只要用了 RAG，就不再需要任何資料清理：RAG 仍需要清理、切塊與索引品質控制。

📖 L22403｜大語言模型與生成式AI數據

---

**47.（L22404）** 關於安全聚合（secure aggregation），下列敘述何者正確？

(A) 伺服器可取得各參與者的個別梯度，只是不能下載原始資料
(B) 目標是讓伺服器主要看到聚合結果，而非每個裝置的個別更新
(C) 它等同於 TLS 1.3，因此只要有 HTTPS 就已滿足
(D) 它只用於資料庫靜態加密（encryption at rest）

**47. 答案：(B) 目標是讓伺服器主要看到聚合結果，而非每個裝置的個別更新**

✅ **(B)**：secure aggregation 的目標是讓中央端只看見聚合後的更新，降低單一參與者模型更新被還原或推論的風險。

❌ (A) 伺服器可取得各參與者的個別梯度，只是不能下載原始資料：若能看見個別梯度，仍可能遭受梯度洩漏攻擊，這正是 secure aggregation 要避免的。

❌ (C) 它等同於 TLS 1.3：TLS 保護傳輸通道，但不會隱藏伺服器端可見的個別明文更新。

❌ (D) 它只用於資料庫靜態加密：靜態加密保護儲存資料，與多方更新聚合不是同一層次問題。

📖 L22404｜大數據隱私保護

---

**48.（L22404）** 關於資料靜態加密（encryption at rest）與傳輸加密（encryption in transit），下列配對何者正確？

(A) AES-256 常用於資料靜態加密；TLS 1.3 常用於傳輸加密
(B) TLS 1.3 用於硬碟加密；AES-256 用於瀏覽器連線
(C) RBAC 用於資料靜態加密；ABAC 用於傳輸加密
(D) k-anonymity 用於資料靜態加密；l-diversity 用於傳輸加密

**48. 答案：(A) AES-256 常用於資料靜態加密；TLS 1.3 常用於傳輸加密**

✅ **(A)**：AES-256 常見於磁碟、資料庫或檔案加密；TLS 1.3 則常用於通訊通道保護。

❌ (B) TLS 1.3 用於硬碟加密；AES-256 用於瀏覽器連線：這是把靜態與傳輸保護用途完全顛倒的典型誤解。

❌ (C) RBAC 與 ABAC：RBAC 與 ABAC 是授權模型，不是加密協定或演算法。

❌ (D) k-anonymity 與 l-diversity：k-anonymity 與 l-diversity 是匿名化概念，不負責通道或儲存加密。

📖 L22404｜大數據隱私保護

---

**49.（L22404）** 某政府開放資料表將準識別欄位設定為「年齡區間、郵遞區號前三碼、性別」。若等價類別筆數分別為 4、4、2、5，則此表最多符合哪一級 k-匿名（k-anonymity）？

(A) 2-anonymity
(B) 4-anonymity
(C) 5-anonymity
(D) 無法判斷，因為還缺少敏感欄位

**49. 答案：(A) 2-anonymity**

✅ **(A) 2-anonymity**：k 值由最小等價類別大小決定；四組中最小為 2，因此最多只滿足 2-anonymity。

❌ (B) 4-anonymity：雖然有些群組達到 4，但只要有一組只有 2 筆，就不能宣稱 4-anonymity。

❌ (C) 5-anonymity：5-anonymity 更不可能，因為已有小於 5 的等價類別。

❌ (D) 無法判斷，因為還缺少敏感欄位：判斷 k-anonymity 只需要準識別欄位分組後的人數，不必先看敏感欄位。

📖 L22404｜大數據隱私保護

---

**50.（L22404）** 某地方政府分別對 A 縣市居民資料與 B 縣市居民資料各做一次差分隱私統計，兩批資料主體完全不重疊，且各使用 ε=0.5。若依平行組合（parallel composition）的基本觀念，單一個體承受的隱私損失最接近何者？

(A) 1.0，因為所有 ε 都必須直接相加
(B) 無法估計，因為差分隱私不能處理不同資料集
(C) 0.5，因為任一個體只出現在其中一個互斥資料集
(D) 0.25，因為要把 ε 平均分配

**50. 答案：(C) 0.5，因為任一個體只出現在其中一個互斥資料集**

✅ **(C) 0.5**：在 parallel composition 下，若資料主體互斥，單一個體只承受自己所在那一份查詢的 ε。

❌ (A) 1.0，因為所有 ε 都必須直接相加：直接相加適用於同一個體反覆暴露於多次查詢的 sequential composition。

❌ (B) 無法估計：DP 當然可以分析互斥資料集；關鍵在組合方式。

❌ (D) 0.25，因為要把 ε 平均分配：平均分配不是平行組合的基本規則。

📖 L22404｜大數據隱私保護

---

*模擬試卷結束 ｜ 正確答案匯總*

| # | 答 | # | 答 | # | 答 | # | 答 | # | 答 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | B | 11 | C | 21 | A | 31 | A | 41 | C |
| 2 | A | 12 | C | 22 | C | 32 | C | 42 | D |
| 3 | A | 13 | A | 23 | C | 33 | B | 43 | C |
| 4 | C | 14 | A | 24 | B | 34 | C | 44 | D |
| 5 | C | 15 | D | 25 | C | 35 | B | 45 | B |
| 6 | B | 16 | C | 26 | C | 36 | A | 46 | B |
| 7 | D | 17 | C | 27 | D | 37 | C | 47 | B |
| 8 | C | 18 | D | 28 | B | 38 | D | 48 | A |
| 9 | A | 19 | C | 29 | B | 39 | D | 49 | A |
| 10 | D | 20 | D | 30 | C | 40 | C | 50 | C |

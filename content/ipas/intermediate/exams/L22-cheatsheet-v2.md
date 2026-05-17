# L22 大數據處理分析與應用考前快刷 v2
*iPAS AI 應用規劃師中級｜考試日期：2026-05-23*

> 使用方式：先讀 `0. 30-Minute Exam Warm-up`，再讀 `1. Cross-Lesson Decision Trees` 和 `2. High-Frequency Trap Clinic`。L22 公式與參數陷阱多，考前請至少掃一次 `3. Formula / Parameter Danger Zone`。

---

## 0. 30-Minute Exam Warm-up

### 最後 30 分鐘只看這些

| # | 一秒判斷 | 考試答案方向 |
|---|---|---|
| 1 | 有離群值的集中趨勢 | Median |
| 2 | Boxplot 鬚線 | Fence 內最後一個真實值，不是 fence |
| 3 | `pandas.describe()` 的 std | ddof=1，樣本標準差 |
| 4 | scipy Normal `scale` | 標準差 σ，不是變異數 σ² |
| 5 | Uniform `scale` | b - a，不是 b |
| 6 | Exponential `scale` | 1 / λ，不是 λ |
| 7 | CLT（Central Limit Theorem，中央極限定理） | 樣本平均數趨近常態，不是原始資料 |
| 8 | p-value | H0 成立下資料有多極端，不是 H0 為真的機率 |
| 9 | p > α | 無法拒絕 H0，不是證明 H0 |
| 10 | χ² 檢定輸入 | counts，不是百分比 |
| 11 | CDC（Change Data Capture，變更資料擷取） | 追蹤 DB（Database，資料庫）binlog 異動 |
| 12 | Pseudonymization | 可逆，GDPR（General Data Protection Regulation，一般資料保護規則）仍算個資 |
| 13 | OLTP（Online Transaction Processing，線上交易處理） vs OLAP（Online Analytical Processing，線上分析處理） | OLTP 行存交易；OLAP 欄存分析 |
| 14 | Delta / Iceberg / Hudi | 開放表格格式，不是完整平台 |
| 15 | Spark Transformation | Lazy，不立即執行 |
| 16 | Spark Action | 觸發執行 |
| 17 | GROUP BY | 合併列、減少行數 |
| 18 | Window Function | 保留原列，加排名 / 累計 / lag |
| 19 | 測試集 scaler | 只能 transform，不能 fit |
| 20 | SMOTE（Synthetic Minority Over-sampling Technique，合成少數類過取樣技術） | 只在 train / fold 內做 |
| 21 | Precision | FP 代價高時優先 |
| 22 | Recall | FN 代價高時優先 |
| 23 | AUC（Area Under the Curve，曲線下面積） | 用 `predict_proba()`，不是 `predict()` |
| 24 | RAG（Retrieval-Augmented Generation，檢索增強生成） | 不改權重 |
| 25 | ε 越小 | 隱私越強，雜訊越多 |

---

## 1. Cross-Lesson Decision Trees

### 統計與檢定選擇

```text
資料有離群值，想代表中心
→ Median

想比較不同單位的離散度
→ CV（Coefficient of Variation，變異係數） = SD（Standard Deviation，標準差） / Mean × 100%

連續分佈問 P(a < X <= b)
→ CDF（Cumulative Distribution Function，累積分佈函數）(b) - CDF(a)

兩組獨立平均數且變異數不等
→ Welch's t-test / ttest_ind(equal_var=False)

同一組人前後測
→ paired t-test / ttest_rel

三組以上平均數比較
→ one-way ANOVA（Analysis of Variance，變異數分析）；拒絕 H0 只代表至少一組不同

類別變數獨立性
→ chi-square；輸入 counts
```

### 資料處理與儲存選擇

```text
事件發生時對方推送
→ Webhook

定期拉 API
→ API（Application Programming Interface，應用程式介面）Polling

追蹤資料庫異動
→ CDC（Change Data Capture，變更資料擷取） / Debezium / binlog

高吞吐串流訊息
→ Kafka

分析查詢、掃少數欄位、聚合
→ OLAP（Online Analytical Processing，線上分析處理） / column store

交易系統、查整筆紀錄
→ OLTP（Online Transaction Processing，線上交易處理） / row store

資料先進湖再轉換
→ ELT（Extract, Load, Transform，擷取、載入、轉換）

先轉換再載入
→ ETL（Extract, Transform, Load，擷取、轉換、載入）
```

### Spark / SQL 選擇

```text
.filter / .select / .groupBy / .join
→ Transformation / Lazy

.show / .count / .collect / write
→ Action / 觸發執行

每組彙總成一列
→ GROUP BY

保留每筆資料並新增排名 / 累計 / 前後列
→ Window Function

並列後跳號：1,1,3
→ RANK

並列不跳號：1,1,2
→ DENSE_RANK
```

### 模型與指標選擇

```text
有標籤分類 / 回歸
→ Supervised Learning

無標籤分群
→ k-means / Unsupervised Learning

FP 代價高，例如正常信被誤刪
→ Precision

FN 代價高，例如醫療漏診 / 詐欺放過
→ Recall

類別不平衡
→ 不要只看 Accuracy；看 Precision / Recall / F1 / PR curve

資料太多
→ Data Parallelism

模型太大
→ Model Parallelism
```

### 隱私與安全選擇

```text
發布資料前降低身份揭露
→ k-anonymity / l-diversity / t-closeness

統計輸出加雜訊
→ Differential Privacy

資料不離本地，只傳模型更新
→ Federated Learning

依角色控權
→ RBAC（Role-Based Access Control，角色式存取控制）

依屬性 / 環境條件控權
→ ABAC（Attribute-Based Access Control，屬性式存取控制）

密文直接運算
→ Homomorphic Encryption
```

---

## 2. High-Frequency Trap Clinic

| 常混淆 | 一秒判斷 | 不要選 |
|---|---|---|
| ddof=0 vs ddof=1 | ÷N 是 population；÷(N-1) 是 sample | 不要忘記 pandas std 預設 ddof=1 |
| Boxplot whisker vs fence | 鬚線是真實資料點；fence 是界線 | 不要把鬚線畫在 fence 上 |
| Normal scale | scipy 傳 σ | 不要傳 σ² |
| Uniform scale | `b - a` | 不要傳 b |
| Exponential scale | `1 / λ` | 不要傳 λ |
| CLT | 樣本平均數趨近常態 | 不要說原始資料變常態 |
| p-value | H0 成立下資料有多罕見 | 不要說是 H0 為真的機率 |
| p > α | 無法拒絕 H0 | 不要說接受 H0 / 證明 H0 |
| χ² input | counts | 不要輸入百分比 |
| Pseudonymization vs Anonymization | 假名化可逆；匿名化不可逆 | 不要說假名化就不是個資 |
| Delta / Iceberg / Hudi | 開放表格格式 | 不要說是完整平台 |
| Temp View | session 暫時視圖 | 不要說寫入永久 table |
| Spark Transformation vs Action | Transformation lazy；Action 觸發 | 不要說 filter 立即執行 |
| GROUP BY vs Window | GROUP BY 減列；Window 保留列 | 不要只看都是分組 |
| RobustScaler | median + IQR（Interquartile Range，四分位距） | 不要說 mean + std |
| SMOTE | 訓練集內插值 | 不要說複製，也不要碰 test |
| AUC（Area Under the Curve，曲線下面積） | 用 y_prob | 不要用 y_pred |
| RAG vs Fine-tuning | RAG 不改權重 | 不要說 RAG 是微調 |
| ε 大小 | ε 小隱私強 | 不要反向記 |
| GDPR（General Data Protection Regulation，一般資料保護規則）Art.33 vs 個資法第12條 | GDPR 72hr 通報主管機關；個資法通知當事人 | 不要混法域 |

---

## 3. Formula / Parameter Danger Zone

| 主題 | 必記 | 常見陷阱 |
|---|---|---|
| 人口變異數 | `Σ(xi - μ)^2 / N` | ddof=0 |
| 樣本變異數 | `Σ(xi - xbar)^2 / (N - 1)` | ddof=1 |
| IQR（Interquartile Range，四分位距） | `Q3 - Q1` | Fence = Q1 - 1.5IQR / Q3 + 1.5IQR |
| CV（Coefficient of Variation，變異係數） | `(SD / Mean) × 100%` | 用於比較不同單位離散度 |
| Normal scipy | `loc=μ, scale=σ` | scale 是標準差 |
| Uniform scipy | `loc=a, scale=b-a` | scale 是寬度 |
| Exponential scipy | `scale=1/λ` | scale 不是 λ |
| Binomial mean / var | `E=np`, `Var=np(1-p)` | n 大且 np 小可近似 Poisson |
| Poisson | `Mean = Var = λ` | λ 同時是平均與變異 |
| p-value rule | `p <= α` 拒絕 H0 | `p > α` 只能無法拒絕 |
| Power | `1 - β` | β 是 Type II error |
| MinMaxScaler | `(x - min) / (max - min)` | 怕離群值 |
| StandardScaler | `(x - μ) / σ` | 無固定範圍 |
| RobustScaler | `(x - median) / IQR` | 抗離群值 |
| Gini | `1 - Σp_i^2` | sklearn decision tree 預設 gini |
| Entropy | `-Σp_i log2(p_i)` | Information Gain 看分裂前後差 |
| Precision | `TP / (TP + FP)` | 降 FP |
| Recall | `TP / (TP + FN)` | 降 FN |
| F1 | `2PR / (P + R)` | Precision / Recall 平衡 |
| DP（Differential Privacy，差分隱私）ε | ε 越小隱私越強 | 查詢多次 ε 會累加 |

---

## 4. Lesson-by-Lesson Quick Review

## L22101 敘述性統計與資料摘要技術

### 先懂一句話

這課是在問「資料中心在哪、散多開、有沒有離群值、形狀偏哪邊」。

### 題目看到什麼

- 看到離群值：中心用 Median；離散可看 IQR。
- 看到不同單位比較離散度：CV。
- 看到 Boxplot：鬚線是 fence 內最後一個實際值。
- 看到右長尾：Mean > Median > Mode。
- 看到左長尾：Mean < Median < Mode。
- 看到 scipy kurtosis：預設 Fisher / excess，常態 = 0。
- 看到 `pandas.describe()`：std 用 ddof=1。

### 考試陷阱

- Fence 不是 whisker。
- Fisher kurtosis 常態是 0；Pearson 常態是 3。
- `value_counts()` 是每個值的次數；`nunique()` 是不同值個數。

### 10 秒自問

Boxplot 的鬚線是不是 Q1 - 1.5IQR / Q3 + 1.5IQR？

答案：不是。鬚線是 fence 內最後一個真實資料點；fence 只是判斷離群值的界線。

---

## L22102 機率分佈與資料分佈模型

### 先懂一句話

先分離散或連續，再看 scipy 參數是不是在偷換 `scale` 的意思。

### 題目看到什麼

- 看到 PMF（Probability Mass Function，機率質量函數）：離散分佈的 P(X=x)。
- 看到 PDF（Probability Density Function，機率密度函數）：連續分佈的密度，不是單點機率。
- 看到連續分佈 P(a<X<=b)：CDF（Cumulative Distribution Function，累積分佈函數）(b) - CDF(a)。
- 看到 Normal：scale 是 σ。
- 看到 Uniform：scale 是 b-a。
- 看到 Exponential：scale 是 1/λ。
- 看到 Poisson：Mean = Variance = λ。
- 看到 CLT：樣本平均數趨近常態。

### 必背比較

| 分佈 | 參數 | scipy 陷阱 |
|---|---|---|
| Normal | μ, σ² | scale=σ，不是 σ² |
| Uniform | a, b | scale=b-a，不是 b |
| Exponential | λ | scale=1/λ，不是 λ |
| Poisson | λ | Mean = Variance = λ |

### 考試陷阱

- 連續分佈 P(X=某個點)=0。
- CLT 不代表原始資料變常態。
- Binomial→Normal 近似需要連續修正 ±0.5。

### 10 秒自問

`scipy.stats.norm(loc=10, scale=4)` 的 4 是變異數還是標準差？

答案：標準差 σ。scipy normal 的 scale 不是 σ²。

---

## L22103 假設檢定與統計推論

### 先懂一句話

檢定題的第一步不是算公式，而是判斷 H0、H1、p-value、錯誤類型和檢定工具。

### 題目看到什麼

- 看到 p <= α：拒絕 H0。
- 看到 p > α：無法拒絕 H0。
- 看到 p-value：H0 成立下資料這麼極端的機率。
- 看到 Type I：誤拒真 H0 / False Positive。
- 看到 Type II：誤留假 H0 / False Negative。
- 看到 Power：1 - β。
- 看到三組以上平均數：ANOVA（Analysis of Variance，變異數分析）。
- 看到類別獨立性：χ²，輸入 counts。

### 必背比較

| 函數 | 用途 | 陷阱 |
|---|---|---|
| `ttest_1samp` | 一組 vs 已知值 | - |
| `ttest_ind(equal_var=False)` | 兩獨立組，Welch | 不等方差要設 False |
| `ttest_rel` | 配對樣本 | 前後測 |
| `chi2_contingency` | 類別獨立性 | 輸入 counts |
| `f_oneway` | 3+ 組平均數 | 只知至少一組不同 |

### 考試陷阱

- p-value 不是 H0 為真的機率。
- p > α 不是接受 H0。
- ANOVA 拒絕 H0 後，不知道是哪一組不同，需事後比較。

### 10 秒自問

p = 0.08、α = 0.05 時，可以說 H0 被證明為真嗎？

答案：不可以。只能說無法拒絕 H0。

---

## L22201 數據收集與清理

### 先懂一句話

這課考「資料從哪裡來、怎麼清、串流怎麼去重、個資怎麼處理」。

### 題目看到什麼

- 看到定期抓 API（Application Programming Interface，應用程式介面）：API Polling。
- 看到事件發生時推送：Webhook。
- 看到 DB（Database，資料庫）異動即時同步：CDC / Debezium / binlog。
- 看到高吞吐串流：Kafka。
- 看到 HTML 非結構化：Web Scraping。
- 看到 `to_datetime(errors='coerce')`：轉換失敗變 NaN。
- 看到 Schema Drift：欄位名稱、新增刪除欄位、型別改變。
- 看到 PII（Personally Identifiable Information，個人可識別資訊）：Masking、Pseudonymization、Anonymization。

### 必背比較

| 方法 | 觸發場景 |
|---|---|
| API Polling | 定期拉資料 |
| Webhook | 事件推送 |
| CDC（Change Data Capture，變更資料擷取） | DB 異動 |
| Kafka | 高吞吐串流 |
| Web Scraping | HTML 頁面 |

### 考試陷阱

- pandas 3.0 後 `fillna(method='ffill')` 改用 `df.ffill()`。
- Watermark + aggregation 不支援 complete 模式。
- Pseudonymization 可逆，在 GDPR 仍算個資。

### 10 秒自問

題目說「使用者下單後系統立即通知你的服務」，是 Polling 還是 Webhook？

答案：Webhook。因為事件發生時由對方推送。

---

## L22202 數據儲存與管理

### 先懂一句話

先判斷「交易還是分析、行存還是欄存、固定 schema 還是彈性格式」。

### 題目看到什麼

- 看到 OLTP（Online Transaction Processing，線上交易處理）：交易型、行存、查整筆快。
- 看到 OLAP（Online Analytical Processing，線上分析處理）：分析型、欄存、掃少數欄位快。
- 看到 ACID（Atomicity, Consistency, Isolation, Durability，原子性、一致性、隔離性、持久性）：強一致、交易正確。
- 看到 BASE（Basically Available, Soft state, Eventual consistency，基本可用、軟狀態、最終一致）：高可用、軟狀態、最終一致。
- 看到 HDFS（Hadoop Distributed File System，Hadoop 分散式檔案系統）：NameNode 管 metadata，DataNode 存資料。
- 看到 Delta / Iceberg / Hudi：開放表格格式。
- 看到 Time Travel：查歷史快照。
- 看到 Feature Store：Offline 訓練 + Online 推論。

### 必背比較

| 類型 | 代表 | 特性 |
|---|---|---|
| Row Store | RDBMS（Relational Database Management System，關聯式資料庫管理系統） / OLTP | 查整筆快 |
| Column Store | DW（Data Warehouse，資料倉儲） / OLAP | 聚合分析快 |
| Key-Value | Redis | 快取 / session |
| Document | MongoDB | JSON 半結構 |
| Graph | Neo4j | 關係路徑 |
| Wide-Column | HBase / Cassandra | 稀疏大規模 |

### 考試陷阱

- Delta / Iceberg / Hudi 是 table format，不是完整平台。
- `createOrReplaceTempView()` 是暫時視圖。
- NameNode 是 SPOF（Single Point of Failure，單點故障），需 Active/Standby。

### 10 秒自問

題目說「查詢大量資料中少數欄位做聚合分析」，選 Row Store 還是 Column Store？

答案：Column Store。OLAP 聚合分析通常掃少數欄位，欄存較適合。

---

## L22203 數據處理技術與工具

### 先懂一句話

Spark 考題核心是「Transformation lazy、Action 觸發、GROUP BY 減列、Window 保留列」。

### 題目看到什麼

- 看到 HDFS / YARN（Yet Another Resource Negotiator，Hadoop 資源管理器） / MapReduce：Hadoop 三層。
- 看到 RDD（Resilient Distributed Dataset，彈性分散式資料集）：低層，沒有 Catalyst。
- 看到 DataFrame：有 schema，有 Catalyst，可用 SQL。
- 看到 `.filter()` / `.select()` / `.join()`：Transformation。
- 看到 `.show()` / `.count()` / `.collect()` / write：Action。
- 看到 Structured Streaming：micro-batch，不是真正 event-at-a-time。
- 看到 Flink：true streaming。
- 看到 LAG / LEAD：前一行 / 後一行。

### 必背比較

| 功能 | 結果 |
|---|---|
| GROUP BY | 每組一列，資料列變少 |
| Window Function | 原列保留，加排名 / 累計欄位 |
| ROW_NUMBER | 1,2,3，唯一序號 |
| RANK | 1,1,3，並列跳號 |
| DENSE_RANK | 1,1,2，並列不跳號 |

### 考試陷阱

- Spark Transformation 不會立即執行。
- Structured Streaming 是 micro-batch；Flink 才是 true stream。
- GROUP BY vs Window Function 是高頻混淆題。

### 10 秒自問

題目說「每筆訂單都保留，但新增該客戶消費排名」，用 GROUP BY 還是 Window Function？

答案：Window Function。因為要保留原始每筆資料列。

---

## L22301 統計學在大數據中的應用

### 先懂一句話

這課重點是「資料轉換要 fit train，test 只能 transform」。

### 題目看到什麼

- 看到縮到 [0,1]：MinMaxScaler。
- 看到 mean=0 / std=1：StandardScaler。
- 看到離群值：RobustScaler。
- 看到右偏正值：Log Transform。
- 看到含 0：`log1p(x)`。
- 看到 x > 0 且冪次變換：Box-Cox。
- 看到支援 0 和負值：Yeo-Johnson。
- 看到排名映射到均勻 / 常態：QuantileTransformer。
- 看到串流未知總數抽樣：Reservoir Sampling。

### 必背比較

| Scaler | 公式 | 特性 |
|---|---|---|
| MinMax | `(x-min)/(max-min)` | [0,1]，怕離群值 |
| Standard | `(x-μ)/σ` | mean=0, std=1 |
| Robust | `(x-median)/IQR` | 抗離群值 |

### 考試陷阱

- test 只能 transform，不能 fit。
- `log1p(x)` 處理含 0 的右偏資料。
- RobustScaler 用 median + IQR，不是 mean + std。

### 10 秒自問

測試集可以 `scaler.fit_transform(X_test)` 嗎？

答案：不可以。fit 只能在訓練集學參數；測試集只能 transform。

---

## L22302 常見的大數據分析方法

### 先懂一句話

先看有沒有標籤：無標籤常是 k-means，有標籤才是 Decision Tree 等監督式模型。

### 題目看到什麼

- 看到 k-means：無監督、最小化 SSE（Sum of Squared Errors，平方誤差和） / inertia。
- 看到 k-means++：更好的 centroid 初始化。
- 看到 Elbow Method：看 SSE 下降趨勢選 k。
- 看到 Decision Tree：有監督，最大化 Information Gain。
- 看到 sklearn Decision Tree 預設：gini。
- 看到 SMOTE：少數類鄰近點插值，不是複製。
- 看到 Class Weight：改損失權重，不改資料。

### 必背比較

| 指標 | 適合場景 |
|---|---|
| Accuracy | 類別平衡 |
| Precision | FP 代價高 |
| Recall | FN 代價高 |
| F1 | Precision / Recall 都要顧 |
| ROC AUC（Receiver Operating Characteristic Area Under the Curve，接收者操作特徵曲線下面積） | 排序能力 |
| PR Curve（Precision-Recall Curve，精確率-召回率曲線） | 少數正類 |

### 考試陷阱

- k-means 是無監督；Decision Tree 是有監督。
- SMOTE 必須在 train / fold 內做。
- Accuracy 在不平衡資料會誤導。

### 10 秒自問

醫療篩檢最怕漏掉病人，優先 Precision 還是 Recall？

答案：Recall。因為漏掉病人是 FN，Recall 降低 FN。

---

## L22303 數據可視化工具

### 先懂一句話

圖表題先看資料型態：類別比較、連續分佈、時間趨勢、兩變數關係、組成比例。

### 題目看到什麼

- 類別比較：Bar。
- 連續分佈：Histogram。
- 時間趨勢：Line。
- 兩連續變數關係：Scatter。
- 少類別占比：Pie / Donut。
- 相關矩陣 / 2D 交叉：Heatmap。
- median / IQR（Interquartile Range，四分位距） / 離群值：Boxplot。
- 分佈形狀 / 雙峰：Violin。
- 互動 hover / zoom：Plotly。
- 拖放 BI：Tableau。
- Microsoft 生態：Power BI。

### 必背比較

| 工具 | 特性 | 適用 |
|---|---|---|
| matplotlib | 靜態、低層 | 學術、精確控制 |
| seaborn | 高層統計 | EDA（Exploratory Data Analysis，探索性資料分析） |
| Plotly | 互動 | 網頁儀表板 |
| Tableau | 拖放 BI（Business Intelligence，商業智慧） | 商業使用者 |
| Power BI | Microsoft 生態 | Office / Azure |

### 考試陷阱

- Tableau Public 不能存私有資料，因為強制公開。
- data-ink ratio 要最大化。
- Histogram 是連續資料；Bar 是類別資料。
- Pre-attentive 精確度：position > color > size > shape。

### 10 秒自問

題目要看連續變數的分佈與 bins，選 Histogram 還是 Bar Chart？

答案：Histogram。Bar Chart 是類別比較。

---

## L22401 大數據與機器學習

### 先懂一句話

大數據機器學習題要先判斷瓶頸：資料量、速度、格式、品質、價值。

### 題目看到什麼

- Volume：資料量大，RAM（Random Access Memory，隨機存取記憶體） / I/O（Input/Output，輸入/輸出）成瓶頸。
- Velocity：資料持續流入，online / incremental learning。
- Variety：多來源多格式，Data Lake / schema-on-read。
- Veracity：品質差，清理與 robust 方法。
- Value：成本效益不划算，ROI（Return on Investment，投資報酬率）評估。
- Full-batch：每次 update 看完整資料。
- Mini-batch：每次 update 看固定一批。
- Online / Incremental：一筆或小段串流更新。
- Data Parallelism：切資料。
- Model Parallelism：切模型。

### 必背比較

| 題目線索 | 選擇 |
|---|---|
| 資料持續流入 | Online / Incremental Learning |
| 大資料但可離線分批 | Mini-batch |
| 單機 RAM / 時間不足 | Distributed Training |
| 資料太多 | Data Parallelism |
| 模型太大 | Model Parallelism |
| workers 彼此聚合 | AllReduce / Ring-AllReduce |

### 考試陷阱

- Big data 不一定要 distributed training。
- 有 epoch 不代表 full-batch，要看每次 update 吃多少資料。
- Online Learning 不等於 Online Serving。

### 10 秒自問

題目說「模型太大，單張 GPU（Graphics Processing Unit，圖形處理器）放不下」，是 Data Parallelism 還是 Model Parallelism？

答案：Model Parallelism。資料太多才切資料；模型太大要切模型。

---

## L22402 大數據應用於鑑別式 AI

### 先懂一句話

鑑別式 AI 考題先看輸出是類別還是數字，再看 FP / FN 誰比較貴。

### 題目看到什麼

- 輸出 spam / fraud / churn：分類。
- 輸出連續數值：回歸。
- `confusion_matrix()`：預設 `[[TN, FP], [FN, TP]]`。
- Accuracy：類別平衡時才可靠。
- Precision：判成正類有多準，降低 FP。
- Recall：真正正類抓到多少，降低 FN。
- Threshold 降低：判正類變多，Recall 常上升。
- Threshold 提高：判正類變少，Precision 常上升。
- AUC：用 `predict_proba()`。

### 必背比較

| 場景 | 代價高 | 優先指標 |
|---|---|---|
| 垃圾郵件過濾 | FP，正常信被刪 | Precision |
| 詐欺偵測 | FN，詐欺被放過 | Recall |
| 醫療診斷 | FN，病患漏判 | Recall |
| 行銷名單 | FP，浪費資源 | Precision |

### 考試陷阱

- AUC 要用 y_prob，不是 y_pred。
- 類別不平衡時 Accuracy 可能很高但模型很差。
- sklearn confusion matrix 左上是 TN，右下是 TP。

### 10 秒自問

詐欺偵測最怕詐欺被放過，優先 Precision 還是 Recall？

答案：Recall。因為詐欺被放過是 FN。

---

## L22403 大數據在生成式 AI 中的應用

### 先懂一句話

生成式 AI 的大數據題在問「語料怎麼來、怎麼清、怎麼 token、要不要改權重」。

### 題目看到什麼

- 看到 Common Crawl / C4 / The Pile / ROOTS：預訓練語料。
- 看到 Exact-match / Near-dedup：語料去重。
- 看到 MinHash + LSH（Locality-Sensitive Hashing，局部敏感雜湊）：near-dedup。
- 看到 BPE（Byte Pair Encoding，位元組對編碼）：GPT。
- 看到 WordPiece：BERT。
- 看到 SentencePiece：T5 / 多語 / raw text。
- 看到 tiktoken：OpenAI tokenizer。
- 看到 vocabulary size：詞彙表大小，萬級。
- 看到 corpus size：語料量，TB / trillion tokens。
- 看到 RAG：不改權重。
- 看到 LoRA（Low-Rank Adaptation，低秩適配） / PEFT（Parameter-Efficient Fine-Tuning，參數高效微調）：改少量權重。

### 必背比較

| 方法 | 改權重 | 適合情境 |
|---|---|---|
| Pretraining | 全部 | 建立基礎模型 |
| Fine-tuning / SFT（Supervised Fine-Tuning，監督式微調） | 是 | 調整行為 / 風格 |
| LoRA / PEFT | 少量 | 省資源客製 |
| RAG（Retrieval-Augmented Generation，檢索增強生成） | 否 | 知識常更新 / 需引用來源 |

### 考試陷阱

- vocabulary size 不等於 corpus size。
- RAG 不改模型權重。
- `temperature` / `max_new_tokens` / `do_sample` 是推論參數，不是訓練超參數。
- DPO（Direct Preference Optimization，直接偏好最佳化）不需要 Reward Model 和 PPO（Proximal Policy Optimization，近端策略最佳化）。

### 10 秒自問

題目說「公司文件常更新，希望回答能引用來源」，用 RAG 還是 LoRA？

答案：RAG。因為 RAG 查外部文件且不改權重，適合知識常更新。

---

## L22404 大數據隱私保護、安全與合規

### 先懂一句話

隱私題先看資料在哪個階段被保護：公開前、統計輸出、分散訓練、儲存、傳輸、權限。

### 題目看到什麼

- 發布資料前防身份揭露：k-anonymity。
- 群內敏感值要多元：l-diversity。
- 群內分佈接近全體：t-closeness。
- 統計輸出加雜訊：Differential Privacy。
- ε 小：隱私強、雜訊多。
- 資料不離本地：Federated Learning。
- 伺服器只看聚合結果：Secure Aggregation。
- 儲存中加密：AES（Advanced Encryption Standard，進階加密標準）-256 / At Rest。
- 傳輸中加密：TLS（Transport Layer Security，傳輸層安全）1.3 / In Transit。
- 密文可運算：Homomorphic Encryption。
- 依角色控權：RBAC（Role-Based Access Control，角色式存取控制）。
- 依屬性控權：ABAC（Attribute-Based Access Control，屬性式存取控制）。

### 必背比較

| 保護階段 | 技術 |
|---|---|
| 資料公開前 | k-anonymity / l-diversity / t-closeness |
| 統計輸出 | Differential Privacy |
| 分散訓練 | Federated Learning |
| 儲存中 | AES-256 |
| 傳輸中 | TLS 1.3 |
| 密文運算 | Homomorphic Encryption |
| 權限控管 | RBAC / ABAC |

### 考試陷阱

- ε 越小隱私越強。
- GDPR Art.33 是 72 小時通報主管機關；台灣個資法第12條是通知當事人。
- 聯邦學習不是絕對安全，梯度仍可能洩漏。
- 假名化可逆，在 GDPR 仍屬個資。

### 10 秒自問

差分隱私裡 ε 變小，隱私變強還是變弱？

答案：變強。ε 越小代表雜訊越多，隱私保護越強。

---

## Final Oral Recall

不用看上面，直接唸出答案：

1. pandas describe 的 std 預設 ddof？答案：1。
2. Normal 的 scipy scale 是什麼？答案：標準差 σ。
3. CLT 說誰趨近常態？答案：樣本平均數。
4. p-value 是什麼？答案：H0 成立下資料有多極端。
5. GROUP BY 和 Window 最大差別？答案：GROUP BY 減列，Window 保留列。
6. Spark Transformation 會不會立即執行？答案：不會，Action 才觸發。
7. RobustScaler 用什麼？答案：median + IQR。
8. Precision 和 Recall 怎麼選？答案：FP 貴選 Precision，FN 貴選 Recall。
9. RAG 會不會改權重？答案：不會。
10. ε 越小隱私？答案：越強。

---

*v2 版本：2026-05-17｜重排為 Warm-up → Decision Trees → Trap Clinic → Danger Zone → Lesson Quick Review*

# L22 情境題快速判斷 — Exam Decision Trees

> IPAS AI應用規劃師（中級）L22 科目：統計基礎、數據工程、大數據與AI

## 目錄

- [L22101 敘述性統計與資料摘要技術](#l22101-敘述性統計與資料摘要技術)
- [L22102 機率分佈與資料分佈模型](#l22102-機率分佈與資料分佈模型)
- [L22103 假設檢定與統計推論](#l22103-假設檢定與統計推論)
- [L22201 數據收集與清理](#l22201-數據收集與清理)
- [L22202 數據儲存與管理](#l22202-數據儲存與管理)
- [L22203 數據處理技術與工具](#l22203-數據處理技術與工具)
- [L22301 統計學在大數據中的應用](#l22301-統計學在大數據中的應用)
- [L22302 常見的大數據分析方法](#l22302-常見的大數據分析方法)
- [L22303 數據可視化工具](#l22303-數據可視化工具)
- [L22401 大數據與機器學習](#l22401-大數據與機器學習)
- [L22402 大數據應用於鑑別式AI中的應用](#l22402-大數據應用於鑑別式ai中的應用)
- [L22403 大數據在生成式AI中的應用](#l22403-大數據在生成式ai中的應用)
- [L22404 大數據隱私保護、安全與合規](#l22404-大數據隱私保護安全與合規)

---

## L22101 敘述性統計與資料摘要技術 — 情境題快速判斷

- 看到「有離群值 / extreme outliers / 極端值」→ 選中位數（median）比平均數（mean）穩。
- 看到「最常見類別 / most frequent / 最多人選」→ 想眾數（mode）或 `value_counts()`。
- 看到「小資料集要算整體平均」→ 想平均數（mean）。
- 看到「max - min」→ 就是全距（range）。
- 看到「平方偏差平均」→ 想變異數（variance）。
- 看到「與原單位相同的離散程度」→ 想標準差（standard deviation）。
- 看到 `np.std(x)` 沒特別寫參數 → 預設 `ddof=0`，是母體標準差語意。
- 看到 `pd.describe()` → `std` 用 `ddof=1`，也就是樣本標準差。
- 看到 `25%`、`50%`、`75%` → 分別是 `Q1`、中位數、`Q3`。
- 看到「IQR」→ 立刻寫 `Q3 - Q1`，不是 `Q3 - Q2`。
- 看到「IQR fence」→ 立刻想到 `Q1−1.5×IQR` 到 `Q3+1.5×IQR`。
- 看到「boxplot whisker」→ 想到鬚端是 fence 內最後一筆資料，不是畫到 fence 數值本身。
- 看到「|z| > 3」→ 想 Z-score 離群值判斷。
- 看到「positive skew / 右偏 / 右尾長」→ 通常 `mean > median > mode`。
- 看到「negative skew / 左偏 / 左尾長」→ 通常 `mean < median < mode`。
- 看到 `scipy.stats.skew()` → 正值右偏，負值左偏。
- 看到 `scipy.stats.kurtosis()` 沒寫參數 → 預設 Fisher，常態 = `0`。
- 看到 `scipy.stats.kurtosis(x, fisher=False)` → Pearson，常態 = `3`。
- 看到「點落在 Q-Q 圖對角線附近」→ 表示分布接近理論分布，常見是接近常態。
- 看到「大量缺值但樣本珍貴」→ 優先考慮 `fillna()`。
- 看到「缺值很少且刪除影響低」→ 可考慮 `dropna()`。
- 看到「重複訂單 / 重複會員紀錄」→ 用 `drop_duplicates()`。
- 看到「欄位型別檢查」→ 想 `df.dtypes` 或 `df.info()`。
- 看到「唯一值個數 / cardinality」→ 想 `nunique()`。

---

---

## L22102 機率分佈與資料分佈模型 — 情境題快速判斷
🔑 看到關鍵字 → 選這個答案
- 固定 `n` 次試驗、每次成功/失敗 → `二項分佈（Binomial Distribution）`
- 問成功次數、每次成功機率固定 `p` → `二項分佈（Binomial Distribution）`
- 稀有事件、單位時間/面積/長度的發生次數 → `卜瓦松分佈（Poisson Distribution）`
- 題目給平均發生率 `λ`，又問某區間內事件數 → `卜瓦松分佈（Poisson Distribution）`
- 連續型、完全對稱、中間最高、兩端較少 → `常態分佈（Normal Distribution）`
- 題目提 `μ`、`σ²`、`z-score`、68-95-99.7 → `常態分佈（Normal Distribution）`
- 每個值等可能發生、而且是連續區間 → `均勻分佈（Uniform Distribution）`
- 問 `P(X ≤ x)` → 使用`累積分配函數（Cumulative Distribution Function, CDF）`
- 問 `P(X = x)`、且 X 為離散型 → 使用`機率質量函數（Probability Mass Function, PMF）`
- 問 `P(X = x)`、且 X 為連續型 → 答案是 `0`，改想區間機率
- 問 `P(a ≤ X ≤ b)`、X 為連續型 → 用`機率密度函數（Probability Density Function, PDF）`面積或 `CDF` 相減
- 題目出現 `binom.pmf(k, n, p)` → 讀成「剛好 k 次」
- 題目出現 `poisson.cdf(k, mu=λ)` → 讀成「最多 k 次」
- 題目出現 `norm.cdf(x, loc=μ, scale=σ)` → 讀成 `P(X ≤ x)`
- `n` 很大、`p` 很小、`np` 固定 → 用 `Poisson` 近似 `Binomial`
- 問很多樣本平均數的分佈 → 想`中央極限定理（Central Limit Theorem, CLT）`
快速二分法：
| 題目線索 | 第一反應 |
|---|---|
| 問「做了幾次裡成功幾次」 | Binomial |
| 問「某段時間內發生幾次」 | Poisson |
| 問「某個連續值以下累積多少」 | CDF |
| 問「某點剛好等於多少」且連續型 | 0 |
| 問「對稱鐘形」 | Normal |
| 問「區間等可能」 | Uniform |
---

---

## L22103 假設檢定與統計推論 — 情境題快速判斷
#### 7.1 關鍵字 → 檢定方法
| 題目關鍵字 | 快速答案 |
|---|---|
| 平均數、平均時間、平均分數 | 先想 `t-test` 或 `F-test` |
| 一組樣本 vs 標準值 | `one-sample t-test` |
| 兩組不同群體平均數 | `independent two-sample t-test` |
| 前後測、同一批人、配對 | `paired t-test` |
| 三組以上平均數 | `F-test / one-way ANOVA` |
| 類別、是否獨立、是否相關、列聯表 | `chi-square test of independence` |
#### 7.2 關鍵字 → H0 / H1 句型
| 題目關鍵字 | `H0` 常見寫法 | `H1` 常見寫法 |
|---|---|---|
| 是否不同 | 相等 / 無差異 | 不相等 / 有差異 |
| 是否提升 | 不大於 / 無提升 | 大於 / 有提升 |
| 是否降低 | 不小於 / 無降低 | 小於 / 有降低 |
| 是否獨立 | 兩變數獨立 | 兩變數不獨立 |
#### 7.3 關鍵字 → 結論句
| 已知條件 | 快速結論 |
|---|---|
| `p ≤ α` | 拒絕 `H0` |
| `p > α` | 無法拒絕 `H0` |
| `95% CI` 不含假設值 | 常對應拒絕 `H0` |
| `95% CI` 含假設值 | 常對應無法拒絕 `H0` |
#### 7.4 題目描述 → 你該想到什麼
| 題目描述 | 你應該先想到 |
|---|---|
| 「某平台宣稱平均等待時間是 5 分鐘」 | 單樣本 `t-test` |
| 「比較 A/B 兩個廣告版本平均轉單金額」 | 獨立樣本 `t-test` |
| 「比較同一批員工導入系統前後平均處理時間」 | 配對樣本 `t-test` |
| 「比較北區、中區、南區三個據點平均客服分數」 | `F-test / one-way ANOVA` |
| 「會員等級與回購是否有關」 | `χ² test` |
#### 7.5 scipy 函式名 → 對應檢定
| 函式名 | 對應內容 | 快速記法 |
|---|---|---|
| `scipy.stats.ttest_ind` | 兩組獨立樣本平均數比較 | `ind = independent` |
| `scipy.stats.ttest_rel` | 配對樣本平均數比較 | `rel = related` |
| `scipy.stats.chi2_contingency` | 列聯表獨立性卡方檢定 | `contingency = 列聯表` |
| `scipy.stats.f_oneway` | 單因子 ANOVA / F 檢定 | `oneway = 單因子` |
---

---

## L22201 數據收集與清理 — 情境題快速判斷

| 題目關鍵字 | 快速判斷 | 答案方向 |
|-----------|---------|---------|
| 「時間序列缺值」 | 前向填補最合適 | `df.ffill()` |
| 「大量缺值（>50%）」 | 刪除欄位或列比填補好 | `df.dropna()` 或刪欄 |
| 「串流去重 + 記憶體爆炸」 | 缺少 watermark | 加 `withWatermark()` |
| 「串流輸出模式錯誤」 | 用了 complete + watermark | 改 `append` 或 `update` |
| 「上游改了欄位名稱導致管線中斷」 | Schema Drift | Schema Registry / dbt tests |
| 「個資可以還原身分」 | 假名化（非匿名化） | Pseudonymization |
| 「個資完全無法還原」 | 匿名化 | Anonymization |
| 「GDPR 合規，資料仍可連結分析」 | 假名化 + Token | Pseudonymization |
| 「先存原始再清理，雲端架構」 | ELT / Lakehouse | Bronze→Silver→Gold |
| 「法規要求清理後才能存儲」 | ETL | 先轉換再載入 |
| 「薪資有人填 1 億，影響平均」 | 異常值 | IQR fence 或 z-score clip |
| 「drop_duplicates 保留最後一筆」 | keep 參數 | `keep='last'` |
| 「drop_duplicates 全部重複都刪」 | keep=False | `keep=False` |
| 「資料品質：值不在合法範圍」 | Validity（有效性）| 6 維度第 6 項 |
| 「資料品質：A/B 系統值不一致」 | Consistency（一致性）| 6 維度第 3 項 |
| 「從 log 字串抽取 user_id」 | Regex 特徵提取 | `str.extract(r'user_id=(\w+)')` |
| 「pandas 3.0 fillna 方法移除」 | API 版本陷阱 | 改用 `df.ffill()` |

---

---

## L22202 數據儲存與管理 — 情境題快速判斷

#### 7.1 看到關鍵字 → 選資料庫架構

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 訂單、付款、庫存、交易一致性 | RDBMS |
| schema 固定、SQL JOIN、ACID | RDBMS |
| JSON、半結構化、欄位彈性 | Document NoSQL |
| session、cache、排行榜、快速查值 | Key-Value |
| 超大規模、稀疏欄位、分散式寫入 | Wide-Column |
| 社群關係、路徑、推薦鏈路 | Graph Database |

#### 7.2 看到關鍵字 → 選工作負載

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 即時下單、單筆更新、交易正確性 | OLTP |
| 月報表、聚合分析、歷史趨勢 | OLAP |
| 每次查一筆完整紀錄 | Row-Store |
| 只讀幾個欄位做大量統計 | Column-Store |

#### 7.3 看到關鍵字 → 選平台型態

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 原始資料先保留、多格式都收 | Data Lake |
| 整理後提供 BI / SQL 分析 | Data Warehouse |
| 想保留湖的彈性，又要治理與版本 | Data Lakehouse |
| object storage 上做可治理表格 | Lakehouse |

#### 7.4 看到關鍵字 → 選底層儲存

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| Hadoop、生態系、自建叢集、分散式檔案系統 | HDFS |
| S3、Blob、GCS、雲端儲存、bucket | Object Storage |
| 原始大檔、資料湖、長期保存 | Object Storage |

#### 7.5 看到關鍵字 → 選檔案格式

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 文字表格、交換方便、Excel 易開 | CSV |
| 巢狀結構、API 回傳、事件資料 | JSON |
| 分析查詢、欄式格式、Spark 常見 | Parquet |

#### 7.6 看到程式片段 → 快速翻譯

| 🔑 程式片段 | 代表意思 |
|---|---|
| `CREATE TABLE ...` | 在定義 schema，屬 DDL |
| `SELECT ... JOIN ... WHERE ... GROUP BY ...` | 關聯式查詢與聚合 |
| `db.collection.find({...})` | MongoDB 文件查詢 |
| `spark.read.parquet("path")` | 讀取 Parquet |
| `spark.read.format("delta").load("path")` | 讀取 Delta 格式 |
| `df.write.format("delta").save("path")` | 以 Delta 格式寫出 |
| `df.createOrReplaceTempView("name")` | 把 DataFrame 註冊成暫時 SQL 檢視 |

#### 7.7 看到關鍵字 → 選訓練資料管理概念

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 線上與離線特徵一致 | Feature Store |
| 即時推論要快速拿特徵 | Online Store |
| 產生歷史訓練資料 | Offline Store |
| 重現上次訓練資料 | Dataset Versioning |
| 回到某個時間點資料狀態 | Time Travel |
| 資料版控像 Git 概念 | DVC / lakeFS 類概念 |

#### 7.8 一眼判斷流程表

| 🔑 題目描述 | 最可能答案 |
|---|---|
| 電商結帳資料必須正確入帳 | RDBMS + OLTP |
| App 事件資料是多種 JSON 格式 | Document NoSQL 或 Data Lake |
| 分析三年銷售資料只看少數欄位 | Column-Store / OLAP |
| 全公司原始 log 先集中保存 | Data Lake + Object Storage |
| 想在資料湖上支援版本與時間旅行 | Data Lakehouse |
| 要管理模型訓練與線上推論特徵一致性 | Feature Store |

---

---

## L22203 數據處理技術與工具 — 情境題快速判斷
#### 7.1 批次處理 vs 串流處理
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 夜間批次、月結、歷史資料整批處理 | 批次處理（Batch Processing） |
| 即時監控、事件持續流入、近即時更新 | 串流處理（Stream Processing） |
| Spark 中持續接收資料並更新結果 | Structured Streaming |
| 題目強調一小批一小批更新 | micro-batch |

#### 7.2 Hadoop 生態系元件
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 分散式儲存、block、metadata | HDFS |
| 管 block 位置與檔案 metadata | NameNode |
| 實際存 block | DataNode |
| 資源協調、排程、叢集管理 | YARN |
| Map → Shuffle → Reduce | MapReduce |

#### 7.3 HDFS 記憶題
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| HDFS block 預設大小 | 128 MB |
| replication factor 常見預設 | 3 |
| 題目說副本與容錯 | replication |

#### 7.4 Spark 抽象與執行心智
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 低階分散式資料抽象、彈性高 | RDD |
| 有 schema、表格式、較易優化 | DataFrame |
| Scala / Java 型別安全常見 | Dataset |
| 轉換先記錄、action 才執行 | 延遲求值 |
| 執行步驟關係圖 | DAG |
| Spark SQL / DataFrame 最佳化 | Catalyst Optimizer |

#### 7.5 PySpark pseudocode 快速判讀
| 程式片段關鍵字 | 快速判斷答案 |
|---|---|
| `.filter()` | 篩選列 |
| `.groupBy()` | 依欄位分組 |
| `.agg()` | 聚合計算 |
| `.join(..., how=\"inner\")` | 只留兩表匹配列 |
| `.show()` / `.count()` | action，觸發執行 |
| `readStream` / `writeStream` | 串流情境 |

#### 7.6 ETL vs ELT
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 先轉換再載入 | ETL |
| 先載入再轉換 | ELT |
| 資料倉儲導向 | ETL |
| 資料湖、雲端倉儲、保留 raw data | ELT |
| dbt 做模型轉換 | 多半是 ELT 中的 T |

#### 7.7 SQL 語意判斷
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 每組一列、列數變少 | GROUP BY |
| 保留原列又要排名 | 視窗函數 |
| 分群但列數不減 | PARTITION BY |
| 組內排序 | ORDER BY in OVER(...) |
| 前一筆 / 下一筆 | LAG / LEAD |
| 並列會跳號 | RANK |
| 並列不跳號 | DENSE_RANK |
| 同分也給不同序號、每列唯一序號 | ROW_NUMBER |

#### 7.8 SQL JOIN 判斷
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 只保留兩邊都有 | INNER JOIN |
| 左表全留，右表可 NULL | LEFT JOIN |
| 題目問列數改變原因 | 先看 JOIN 類型 |

#### 7.9 考場 10 秒判斷流程
```text
看到題目
  │
  ├── 問 block / replication / metadata？→ HDFS
  ├── 問 Map → Shuffle / Shuffle and Sort → Reduce？→ MapReduce
  ├── 問 DataFrame / 延遲求值 / Catalyst？→ Spark
  ├── 問先轉再載或先載再轉？→ ETL / ELT
  └── 問排名 / 前一筆 / 保留原列？→ 視窗函數
```

---

## L22301 統計學在大數據中的應用 — 情境題快速判斷
#### 7.1 關鍵字對答案
🔑 看到關鍵字 → 選這個答案
- 「資料右偏、正值」→ `對數轉換（Log Transform）` 或 `Box-Cox 轉換（Box-Cox Transform）`
- 「資料右偏、全部大於 0、想更彈性調整」→ `Box-Cox transform`
- 「資料含 0，但仍想做類 log 壓縮」→ `log1p(x) = ln(x+1)`
- 「異常值多」→ `RobustScaler`
- 「需要 `[0,1]` 輸出範圍」→ `MinMaxScaler`
- 「想統一量級、平均 0 標準差 1」→ `StandardScaler`
- 「PCA 前常需先做前處理」→ `StandardScaler`
- 「分佈很怪、想映到 uniform 或 normal」→ `QuantileTransformer`
- 「sklearn 訓練集 fit，測試集 transform」→ 避免重新估參數的正確流程
#### 7.2 題型快判表
| 題目線索 | 快速判斷 |
|----------|----------|
| 「輸出落在 0 到 1」 | `MinMaxScaler` |
| 「離平均值多遠」 | `z-score / StandardScaler` |
| 「有很多極端大值」 | `RobustScaler` 或先考慮分佈轉換 |
| 「右偏、金額、流量、次數跨度大」 | `log transform` |
| 「右偏且正值，題目特別提 power transform」 | `Box-Cox transform` |
| 「想把資料映成常態型」 | `QuantileTransformer(output_distribution="normal")` |
| 「fit_transform vs transform」 | 前者先學參數，後者只套用 |
#### 7.3 30 秒考場流程
```text
先看題目在問什麼
   │
   ├── 問範圍？ → MinMax
   ├── 問平均 0 / 標準差 1？ → StandardScaler
   ├── 問異常值？ → RobustScaler
   ├── 問右偏正值？ → log / Box-Cox
   ├── 問映到 uniform / normal？ → QuantileTransformer
   └── 問 API：train fit、test transform
```
🗣️ 白話說明：考場上不要一看到 transformation 就腦中自動跳 `Box-Cox`。先像在滑蝦皮篩選商品一樣，先看關鍵條件：要不要固定範圍？有沒有異常值？是不是右偏？資料有沒有 0？這樣選才快。
---

---

## L22302 常見的大數據分析方法 — 情境題快速判斷
🔑 看到關鍵字 → 選這個答案
- `沒有標籤、想找自然群體` → `k-means 分群（k-means clustering）`
- `客群切分、使用者分群、群中心` → `k-means 分群（k-means clustering）`
- `inertia`、`SSE`、`群內平方和` → `k-means` 的目標函數
- `選 k`、`折線圖轉折`、`手肘` → `手肘法（Elbow Method）`
- `會停下來但不一定最好` → `k-means` 收斂到局部最佳
- `if-then`、`條件切分`、`可解釋規則` → `決策樹（Decision Tree）`
- `gini`、`entropy`、`information gain` → `決策樹` 分裂準則
- `樹太深、訓練好測試差` → `過擬合（Overfitting）`
- `刪掉不重要分支、抑制過擬合` → `剪枝（Pruning）`
- `看相似性找輪廓` → `分群式模式識別（Cluster-based Pattern Recognition）`
- `看條件規則做判斷` → `規則式模式識別（Rule-based Pattern Recognition）`
- `正類很少、類別極不平衡` → 先想到 `資料不平衡處理策略（Imbalanced Data Handling Strategies）`
- `增加少數類，但不是單純複製` → `SMOTE`
- `刪除部分多數類樣本` → `欠採樣（Undersampling）`
- `不改資料量，改模型重視程度` → `類別權重（Class Weight）`
- `先 resample 再切 train/test` → `資料洩漏（Data Leakage）`
- `Accuracy 很高但少數類抓不到` → `Accuracy` 不足，改看 `Precision / Recall / F1`
- `誤報成本高` → 重視 `精確率（Precision）`
- `漏報成本高` → 重視 `召回率（Recall）`
- `想綜合衡量 Precision 與 Recall` → `F1 分數（F1-score）`
- `TPR` 對 `FPR` → `ROC 曲線（ROC Curve）`
- `極端不平衡下更看少數類表現` → `PR 曲線（Precision-Recall Curve）`
---

---

## L22303 數據可視化工具 — 情境題快速判斷

- 「連續型資料分佈」 → `histogram` 直方圖
- 「比較各類別數量」 → `bar chart` 長條圖
- 「兩個連續變數的相關性」 → `scatter plot` 散布圖
- 「隨時間變化的趨勢」 → `line chart` 折線圖
- 「整體中各部分佔比（≤5類）」 → `pie chart` / `donut chart` 圓餅圖 / 環圈圖
- 「細緻分佈 + 離群值」 → `box plot` 箱線圖 / `violin plot` 提琴圖
- 「快速 EDA 統計圖」 → `seaborn`
- 「互動式網頁圖表」 → `Plotly`
- 「出版品質靜態圖」 → `matplotlib`
- 「給商業部門非技術主管看」 → `Tableau` / `Power BI`
- 「整合 Microsoft Office 365」 → `Power BI`
- 「`data-ink ratio` 提升」 → 移除格線、背景色、多餘標籤

補充快判規則：

- 題目先問「哪個圖」，先看分析目的。
- 題目先問「哪個工具」，先看輸出形式：
  - 靜態精修？
  - 快速 EDA？
  - 互動網頁？
  - 商業 dashboard？
- 題目如果放程式碼：
  - `plt.bar()` 幾乎就是長條圖。
  - `plt.hist(..., bins=...)` 幾乎就是直方圖。
  - `sns.heatmap()` 幾乎就是熱圖。
  - `px.scatter()` 幾乎就是互動散布圖。

30 秒情境解題流程：

```text
1. 先看資料型態：類別 / 連續 / 時間
2. 再看分析目的：比較 / 分佈 / 組成 / 關係 / 趨勢
3. 再看是否需要互動：要 -> Plotly；不要 -> Python 靜態或 BI
4. 若是商業分享：想拖拉式 -> Tableau / Power BI
5. 若問視覺原則：先找 chart junk、色階錯配、標題不清、顏色不一致
```

---

---

## L22401 大數據與機器學習 — 情境題快速判斷
#### 7.1 關鍵字 → 訓練模式
🔑 看到關鍵字 → 選這個答案
- `資料可完整載入`、`靜態資料集`、`一次看全部資料` → **Full-batch Training（全批次訓練）**
- `batch size`、`shuffle`、`切批次`、`RAM 不夠一次吞全部` → **Mini-batch Training（小批次訓練）**
- `stream`、`逐筆到來`、`即時更新`、`概念漂移` → **Online / Incremental Learning（線上/增量學習）**
#### 7.2 關鍵字 → 5V 痛點
🔑 看到關鍵字 → 選這個答案
- `裝不進記憶體`、`數十億筆`、`單機太慢` → **Volume（量）**
- `每秒進資料`、`持續追加`、`即時分析` → **Velocity（速）**
- `表格 + JSON + 文字 + 圖片`、`Data Lake` → **Variety（多樣）**
- `缺漏值`、`標註不一致`、`噪音高` → **Veracity（真實性）**
- `蒐集成本高`、`效益有限`、`ROI` → **Value（價值）**
#### 7.3 關鍵字 → 架構選擇
🔑 看到關鍵字 → 選這個答案
- `單機可完成`、`架構簡單優先` → **Centralized Training（集中式訓練）**
- `單機 RAM 不足`、`訓練時間太久`、`多節點協作` → **Distributed Training（分散式訓練）**
- `同一模型副本`、`不同資料 shard`、`多 worker 聚合` → **Data Parallelism（資料並行）**
- `模型太大放不下一張卡`、`模型切成不同部分` → **Model Parallelism（模型並行）**
#### 7.4 關鍵字 → 分散式細部架構
🔑 看到關鍵字 → 選這個答案
- `parameter server`、`worker push 梯度給中央節點` → **資料並行中的 Parameter Server 架構**
- `allreduce`、`ring-allreduce`、`沒有單一 central server 聚合` → **資料並行中的 AllReduce 架構**
- `Spark MLlib`、`cluster 上做 ML pipeline` → **分散式資料處理與訓練框架**
#### 7.5 情境句 → 快判
🔑 看到關鍵字 → 選這個答案
- `每天新增交易紀錄，模型要持續更新` → **Online / Incremental Learning**
- `資料很大但每天只離線重跑一次` → **Mini-batch 或 Out-of-core，未必一定 distributed**
- `多來源資料先做大規模清理後再訓練` → **Variety + Distributed Preprocessing**
- `模型本身超大，單卡放不下` → **Model Parallelism**
- `資料超大，但模型普通，只是想加速` → **Data Parallelism**
- `題目強調隱私、資料不出裝置` → **小心這偏向 Federated Learning，非本章主軸**
#### 7.6 排除法提示
🔑 看到關鍵字 → 排除這些答案
- `問 prediction 怎麼算` → 排除 L22401 主軸，這偏演算法內部
- `問 loss function、backprop、驗證指標數學` → 排除，本章不深入
- `問隱私保護與跨端資料不出域` → 排除，本章不是 L22404
---

---

## L22402 大數據應用於鑑別式AI中的應用 — 情境題快速判斷
🔑 看到關鍵字 → 選這個答案
- `少數類很少`、`正類不到 1%` → 不要只看 `Accuracy`
- `不想漏掉真正陽性`、`寧可多抓` → 優先看 `Recall`
- `不想誤殺正常個案`、`人工複查很貴` → 優先看 `Precision`
- `Precision 與 Recall 都要顧` → 看 `F1 Score`
- `比較不同 threshold 下表現` → 想 `ROC Curve`
- `要把 ROC 壓成一個數字` → 想 `AUC`
- `題目給 predict_proba` → 多半跟 `AUC` 或 `threshold` 有關
- `題目給 predict` → 多半跟 `Confusion Matrix`、`Precision`、`Recall`、`F1` 有關
- `score()` 出現在 classifier pseudocode → 先警覺它常是 `Accuracy`
- `spam filtering` → 常怕 `FP`，正常信被誤殺
- `fraud detection` → 常怕 `FN`，真正詐欺漏掉
- `medical diagnosis` → 常怕 `FN`，病患漏判
- `churn prediction` → 先判斷它是分類，不是自動等於回歸
- `ROC AUC` + `y_pred` 出現在選項中 → 常是陷阱，應改看 `y_prob`
- `部署後每日監控`、`看不同時段客群表現` → 這是本課的大數據工作負載視角

🔑 看到場景描述 → 快速反推
- `銀行一天數百萬筆交易，真正詐欺極少` → `類別不平衡` + `Recall / AUC` 高相關
- `郵件系統常把正常通知信丟進垃圾桶` → `Precision` 高相關
- `醫療影像模型平均很高，但某院區誤判多` → 不能只看整體平均，要分群監控
- `模型輸出 0.83、0.41、0.67` → 這是機率/分數，不是最終類別
- `同一組機率，換門檻後分類結果變了` → 在考 `threshold effect`

---

## L22403 大數據在生成式AI中的應用 — 情境題快速判斷

- 看到 `Common Crawl` / `The Pile` / `ROOTS` → 選「預訓練語料庫（Pretraining Corpus）」
- 看到 `C4` / clean crawled corpus / quality-filtered crawl → 選「清理後可用預訓練語料」
- 看到 `MinHash` / `LSH` / near-duplicate → 選「近似去重（Near-deduplication）」
- 看到 `exact-match` / identical document → 選「完全去重」
- 看到 `perplexity filtering` → 選「資料品質篩選，不是模型架構」
- 看到 `BPE` → 優先聯想 GPT / LLaMA 路線
- 看到 `WordPiece` → 選 BERT 使用的分詞
- 看到 `SentencePiece` / raw text / 不需空格前處理 → 選多語或 T5 路線 tokenizer
- 看到 `tiktoken` / `cl100k_base` → 選 OpenAI tokenizer / fast BPE implementation
- 看到 `vocabulary size` → 想詞彙表大小，不要誤當 corpus 規模
- 看到 `SFT` / instruction-response pairs → 選監督式微調資料
- 看到 `chosen` / `rejected` → 選 RLHF 偏好資料
- 看到 `LoRA` / `adapter` / `rank r` → 選 PEFT / 少量可訓參數
- 看到「訓練成本低、少量資料」→ 優先想 LoRA / PEFT
- 看到「知識庫即時更新、不改模型」→ 選 RAG
- 看到 `chunking -> embedding -> index` → 選 RAG 資料管線
- 看到 `FAISS` / `Chroma` / `Weaviate` → 選向量資料庫（Vector Store）
- 看到 `fixed-size 512 tokens` → 選固定長度分塊策略
- 看到「依句子/段落邊界切」→ 選 semantic chunking
- 看到 `recursive splitter` / LangChain splitter → 選 recursive chunking
- 看到 `return_tensors="pt"` → 選 tokenizer 輸出格式為 PyTorch tensor
- 看到 `max_new_tokens` / `do_sample` / `temperature` → 選 `model.generate()` 參數
- 看到 `pipeline("summarization")` → 選摘要任務
- 看到 `pipeline("question-answering")` → 選問答任務
- 看到 `pipeline("feature-extraction")` → 選特徵/向量抽取
- 看到「同一模型複製多 GPU、梯度平均」→ 選 Data Parallelism（DDP）
- 看到「單一大型 layer 切分多 GPU」→ 選 Tensor Parallelism
- 看到「模型分層切分、流水線」→ 選 Pipeline Parallelism

快速二分判斷：

```text
要不要改權重？
  ├─ 要 → 微調 / LoRA
  └─ 不要 → RAG

切的是什麼？
  ├─ 切 batch → Data Parallelism
  ├─ 切單層 tensor → Tensor Parallelism
  └─ 切模型 stage → Pipeline Parallelism
```

---

---

## L22404 大數據隱私保護、安全與合規 — 情境題快速判斷
- 「資料公開但不知道是誰」→ `k-匿名性（k-Anonymity）`
- 「屬性值都一樣，猜得出來」→ `ℓ-多樣性（ℓ-Diversity）`
- 「加雜訊後仍保有統計可用性（近似可用），而非保證結果精確無誤」→ `差分隱私（Differential Privacy, DP）`
- 「各醫院資料不能離院」→ `聯邦學習（Federated Learning, FL）`
- 「加密狀態下做運算」→ `同態加密（Homomorphic Encryption, HE）`
- 「隱私設計原則 / privacy by design」→ `GDPR Art.25`
- 「個資外洩通知義務」→ 先想到 `個資法第 12 條`；若題目明示 `72 小時`，答案改抓 `GDPR Art.33`
- 「直欄資料不同單位共享」→ `縱向聯邦學習（Vertical Federated Learning, VFL）`
- 「橫列資料不同裝置共享」→ `橫向聯邦學習（Horizontal Federated Learning, HFL）`
---

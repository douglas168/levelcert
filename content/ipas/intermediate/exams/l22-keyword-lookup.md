# L22 題目問的是 → 想到 快查表

> IPAS AI應用規劃師（中級）L22 科目 — 各課 Big Picture 關鍵字快速對照

## 目錄

- [L22101 敘述性統計與資料摘要技術](#l22101-敘述性統計與資料)
- [L22102 機率分佈與資料分佈模型](#l22102-機率分佈與資料分)
- [L22103 假設檢定與統計推論](#l22103-假設檢定與統計推)
- [L22201 數據收集與清理](#l22201-數據收集與清理)
- [L22202 數據儲存與管理](#l22202-數據儲存與管理)
- [L22203 數據處理技術與工具](#l22203-數據處理技術與工)
- [L22301 統計學在大數據中的應用](#l22301-統計學在大數據中)
- [L22302 常見的大數據分析方法](#l22302-常見的大數據分析)
- [L22303 數據可視化工具](#l22303-數據可視化工具)
- [L22401 大數據與機器學習](#l22401-大數據與機器學習)
- [L22402 大數據應用於鑑別式AI中的應用](#l22402-大數據應用於鑑別)
- [L22403 大數據在生成式AI中的應用](#l22403-大數據在生成式A)
- [L22404 大數據隱私保護、安全與合規](#l22404-大數據隱私保護、)

---

## L22101 敘述性統計與資料摘要技術

先看題目關鍵字，再回到表格找對應工具：

| 題目問的是 | 想到 |
|---|---|
| 典型中心位置 | mean / median / mode |
| 資料散多開 | range / variance / standard deviation / IQR（Interquartile Range，四分位距）/ CV（Coefficient of Variation，變異係數） |
| 是否右偏、左偏、尾巴厚不厚 | skewness / kurtosis / Q-Q plot |
| 缺值、重複、離群值 | dropna / fillna / drop_duplicates / IQR / Z-score |
| `describe()` 的 `25%`、`50%`、`75%` | Q1 / median / Q3 |
| `ddof=0`、`ddof=1` | 母體 vs 樣本 |

---

## L22102 機率分佈與資料分佈模型

這張表不要死背，請把它當作「看到題目關鍵字時往哪裡走」：

| 題目問的是                             | 想到                |
| -------------------------------------- | ------------------- |
| 次數、件數、成功幾次                   | 離散型隨機變數      |
| 時間、長度、重量、溫度                 | 連續型隨機變數      |
| `P(X = x)` 且 X 是離散型               | PMF                 |
| 連續型某區間的機率                     | PDF 面積或 CDF 相減 |
| `P(X ≤ x)`                             | CDF                 |
| 對稱鐘形、`μ`、`σ²`、z-score           | Normal              |
| 固定 `n` 次、成功 / 失敗、成功機率 `p` | Binomial            |
| 固定時間或空間內的事件次數、平均率 `λ` | Poisson             |
| 區間 `[a,b]` 內等可能                  | Uniform             |

---

## L22103 假設檢定與統計推論

這張表不要死背名詞，要當作「看到題目關鍵字時的選擇表」。

| 題目看到 | 先想到 | 為什麼 |
| --- | --- | --- |
| 是否有差異、有效果、有關聯 | `H0 / H1` | 先把保守說法與替代說法寫清楚 |
| `p-value = 0.03`、`α = 0.05` | 比較 `p-value` 與 `α` | 決定是否拒絕 `H0` |
| `95% CI` 是否包含假設值 | CI（Confidence Interval，信賴區間）與檢定結論 | 雙尾檢定常可用 CI 快判 |
| 平均數比較 | `t-test` 或 `F-test / ANOVA（Analysis of Variance，變異數分析）` | 平均數是數值型資料 |
| 類別變數是否獨立 | `χ² test of independence` | 兩個變數都是類別型 |

本課邊界：

- 會考：假設檢定框架、`α / β / p-value / CI`、`t-test`、`χ² test`、`F-test / one-way ANOVA`。
- 不展開：非參數檢定、效果量、貝氏推論、迴歸、機器學習專屬統計、多因子 ANOVA 與事後檢定細部計算。

---

## L22201 數據收集與清理

| 題目問的是 | 想到 |
|---|---|
| API（Application Programming Interface，應用程式介面）、IoT（Internet of Things，物聯網）、CSV（Comma-Separated Values，逗號分隔值）、Web scraping、Webhook | 數據收集方法 |
| NULL、NaN、缺資料、時間序列補值 | 缺值處理 |
| 同一訂單重複、串流去重、狀態爆記憶體 | 去重複與 watermark |
| 薪資填 1 億、極端值影響平均 | 異常值處理 |
| 日期字串、價格字串、log 抽欄位 | 型別轉換 / Regex 抽取 |
| 完整性、準確性、一致性、及時性、唯一性、有效性 | 資料品質 6 維度 |
| 上游欄位改名、新增、刪除導致管線壞掉 | Schema Drift |
| 個資能否還原 | 遮蔽、假名化、匿名化 |
| 先清理再載入 vs 先載入再清理 | ETL（Extract, Transform, Load，擷取、轉換、載入）vs ELT（Extract, Load, Transform，擷取、載入、轉換） |

---

## L22202 數據儲存與管理

| 題目問的是 | 想到 |
|---|---|
| 訂單、付款、庫存、交易正確性 | RDBMS（Relational Database Management System，關聯式資料庫管理系統） + OLTP（Online Transaction Processing，線上交易處理） + Row-Store |
| JSON、半結構化、欄位彈性 | Document NoSQL |
| session、cache、排行榜、快速查值 | Key-Value |
| 超大規模、稀疏欄位、分散式寫入 | Wide-Column |
| 社群關係、路徑、推薦鏈路 | Graph Database |
| 月報表、歷史趨勢、聚合分析 | OLAP（Online Analytical Processing，線上分析處理） + Column-Store |
| 原始資料先集中保存 | Data Lake + Object Storage |
| 整理後給 BI（Business Intelligence，商業智慧） / SQL（Structured Query Language，結構化查詢語言）分析 | Data Warehouse |
| 湖的彈性加上倉的治理 | Data Lakehouse |
| 訓練與推論特徵一致 | Feature Store |
| 重現某次訓練資料 | Dataset Versioning / Time Travel |

最重要的判斷順序：

```text
先看資料長相
→ 再看工作負載
→ 再看儲存格式
→ 最後看治理與回溯需求
```

---

## L22203 數據處理技術與工具

| 題目問的是 | 想到 |
|---|---|
| block、replication、NameNode、DataNode | HDFS（Hadoop Distributed File System，Hadoop 分散式檔案系統） |
| 資源分配、排程、ResourceManager | YARN（Yet Another Resource Negotiator，Hadoop 資源協調器） |
| Map → Shuffle and Sort → Reduce | MapReduce |
| DataFrame、DAG（Directed Acyclic Graph，有向無環圖）、Lazy Evaluation、Catalyst | Spark |
| 夜間批次、月結、歷史資料 | Batch Processing |
| 即時監控、事件持續進來 | Stream Processing / Structured Streaming |
| 先轉換再載入 | ETL（Extract, Transform, Load，擷取、轉換、載入） |
| 先載入再轉換 | ELT（Extract, Load, Transform，擷取、載入、轉換） |
| 保留原列做排名、累積、前後筆 | Window Function |
| 每組變一列 | GROUP BY |

---

## L22301 統計學在大數據中的應用

比較表這樣讀：

| 題目問的是 | 想到 |
|---|---|
| 不同欄位量級差很多 | Scaling / StandardScaler |
| 一定要輸出 `[0,1]` | MinMaxScaler |
| 異常值很多 | RobustScaler |
| 右偏、長尾、金額、流量、次數 | Log Transform / Box-Cox |
| 想映到 uniform 或 normal | QuantileTransformer |
| 程式碼問 `fit_transform()` 與 `transform()` | 訓練集學參數，測試集只套用 |

本課範圍要守住：

| 本課會考 | 本課不是重點 |
|---|---|
| Scaling、distribution transform、sklearn preprocessing | PCA（Principal Component Analysis，主成分分析）/ SVD（Singular Value Decomposition，奇異值分解）數學推導 |
| 看資料特徵選方法 | 特定機器學習模型完整假設 |
| `fit`、`transform`、`fit_transform` 差異 | SMOTE、特徵選擇、資料切分策略 |

---

## L22302 常見的大數據分析方法

先用三問法看整章：

```text
1. 沒有標籤，想找自然群體？
   → k-means 分群（k-means clustering）

2. 有標籤，想依條件做判斷，而且要能解釋？
   → 決策樹（Decision Tree）

3. 正類很少，類別比例差很多？
   → 資料不平衡處理 + Precision / Recall / F1 / AUC（Area Under the Curve，曲線下面積）
```

比較表這樣讀：

| 題目問的是 | 想到 | 白話記法 |
|---|---|---|
| 沒有標籤、客群切分、找相似群體 | `k-means 分群` | 自然分組 |
| 有標籤、if-then、條件切分、可解釋規則 | `決策樹` | 照規則判斷 |
| 找相似性或資料輪廓 | `分群式模式識別` | 看誰像誰 |
| 用條件規則做判斷 | `規則式模式識別` | 看條件規則 |
| 正類只有 1%、少數類抓不到 | `資料不平衡` | 少數類太少 |
| Accuracy 很高但少數類沒抓到 | 改看 `Precision / Recall / F1` | 不能只看總答對率 |

記憶方式：

```text
沒標籤找群 → k-means
有標籤看規則 → 決策樹
少數類太少 → 不平衡處理 + PRF 指標
```

---

## L22303 數據可視化工具

先用這張表建立全章地圖：

比較表這樣讀：

| 題目問的是 | 想到 | 白話記法 |
|---|---|---|
| 類別之間誰多誰少 | `bar chart` 長條圖 | 比高低 |
| 連續數值大多落在哪些區間 | `histogram` 直方圖 | 看區間分佈 |
| 隨時間變化 | `line chart` 折線圖 | 看走勢 |
| 兩個連續變數有沒有關係 | `scatter plot` 散布圖 | 看關係 |
| 整體中的各部分占比 | `pie chart` / `donut chart`，但類別要少 | 看占比 |
| 多組分佈、中位數、離群值 | `box plot` 箱線圖 | 看摘要分佈 |
| 分佈形狀與密度輪廓 | `violin plot` 提琴圖 | 看分佈形狀 |
| 兩維交叉資料或相關矩陣 | `heatmap` 熱圖 | 看格子高低 |
| 靜態圖、細節控制、出版品質 | `matplotlib` | 手動精修 |
| 快速 EDA（Exploratory Data Analysis，探索性資料分析）、統計視覺化 | `seaborn` | 快速統計圖 |
| hover / zoom / web dashboard | `Plotly` | 互動網頁圖 |
| 拖拉式商業 dashboard | `Tableau` | 商業拖拉 BI（Business Intelligence，商業智慧） |
| Microsoft / Office 365 / Azure 整合 | `Power BI` | Microsoft BI（Business Intelligence，商業智慧） |
| 刪掉多餘裝飾、提高有效資訊 | `data-ink ratio`、避免 `chart junk` | 清楚勝過花俏 |

記憶方式：

```text
先問目的，再選圖表；先問輸出，再選工具
```

---

## L22401 大數據與機器學習

本課的判斷順序可以濃縮成一句話：

```text
先看 5V，再看 update，最後看架構。
```

| 題目問的是 | 想到 |
|---|---|
| 資料太大、RAM（Random Access Memory，隨機存取記憶體）放不下 | Volume、mini-batch、out-of-core、必要時 distributed |
| 資料持續流入、要即時更新 | Velocity、online / incremental learning、concept drift |
| 表格、JSON、文字、圖片混在一起 | Variety、schema-on-read、Data Lake、distributed preprocessing |
| 噪音、缺漏、標註錯誤 | Veracity、robustness、generalization risk |
| 蒐集成本高但效益有限 | Value、ROI（Return on Investment，投資報酬率）、cost-benefit tradeoff |
| 每次 update 前看多少資料 | full-batch / mini-batch / online |
| 單機撐不住 | distributed training |
| 同一模型處理不同資料切片 | data parallelism |
| 模型太大需要拆到多裝置 | model parallelism |

---

## L22402 大數據應用於鑑別式AI中的應用

先看題目「卡在哪一層」，不要一看到 AI 就背演算法名稱。

| 題目問的是 | 先想到 |
|---|---|
| spam / fraud / churn / diagnosis / image recognition | 分類或類別預測場景 |
| rare event / 少數類很少 / 正類不到 1% | Accuracy 可能誤導 |
| 不想漏掉真正陽性 | Recall、FN 代價 |
| 不想誤殺正常個案 | Precision、FP 代價 |
| 不同 threshold 下的表現 | ROC Curve（Receiver Operating Characteristic Curve，接收者操作特徵曲線）、AUC（Area Under the Curve，曲線下面積） |
| `.fit()` / `.predict()` / `.predict_proba()` | sklearn 推論流程 |

---

## L22403 大數據在生成式AI中的應用

這張表不是要背所有名詞，而是用「題目關鍵字 → 該想到哪一層」來排除選項。

| 題目問的是 | 想到 |
|---|---|
| Common Crawl、C4、The Pile、ROOTS | 大規模預訓練語料庫 |
| quality filter、dedup、MinHash、perplexity filter | 語料清理與去重 |
| BPE（Byte Pair Encoding，位元組對編碼）、WordPiece、SentencePiece、tiktoken | 分詞器 tokenizer |
| SFT（Supervised Fine-Tuning，監督式微調）、instruction-response pairs | 監督式微調資料 |
| chosen/rejected responses | RLHF（Reinforcement Learning from Human Feedback，人類回饋強化學習）偏好資料 |
| LoRA、adapter、rank r | PEFT / 參數高效微調 |
| chunking、embedding、vector store | RAG 資料管線 |
| DDP（Distributed Data Parallel，分散式資料平行）、tensor parallel、pipeline parallel | 分散式訓練 |
| `pipeline(...)`、`model.generate()` | Hugging Face API 資料流 |

---

## L22404 大數據隱私保護、安全與合規

這張表不要逐格硬背。先看左欄的「題目問的是」，把它當成題目關鍵字；右欄就是最可能要選的控制。

| 題目問的是 | 想到 |
|---|---|
| 公開資料但不想被認出是誰 | k-匿名性、匿名化 |
| 同一匿名群內敏感值太一致 | ℓ-多樣性 |
| 群內敏感值分布和全體差太多 | t-相近性 |
| 加雜訊保護統計輸出 | 差分隱私 DP（Differential Privacy，差分隱私） |
| 同一資料集多次 DP 查詢 | 隱私預算組合 |
| 各醫院、各裝置資料不能離開本地 | 聯邦學習 FL（Federated Learning，聯邦學習） |
| 伺服器只能看聚合結果 | 安全聚合 |
| 儲存中資料保護 | 靜態加密、AES（Advanced Encryption Standard，進階加密標準）-256 |
| 傳輸中資料保護 | TLS（Transport Layer Security，傳輸層安全）1.3 |
| 密文狀態下仍可運算 | 同態加密 |
| 誰可以看哪些欄位 | RBAC（Role-Based Access Control，角色式存取控制）、ABAC（Attribute-Based Access Control，屬性式存取控制）、欄位層級安全 |
| Privacy by Design / Default | GDPR（General Data Protection Regulation，一般資料保護規則）Art.25 |
| 72 小時外洩通報 | GDPR Art.33 |
| 隱私資訊管理系統 | ISO/IEC 27701:2025、PIMS（Privacy Information Management System，隱私資訊管理系統） |

本課和 L23401 的邊界要記清楚：

```text
資料集在訓練前、共享前、分析前如何被保護 → L22404
模型訓練完成後的模型卡、推論稽核、生命週期文件 → L23401
```

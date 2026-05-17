# L22 大數據處理分析與應用 — 考前速查表

> 考試時間：2026-05-23（中級科目二）
> 設計用途：90 分鐘可完整瀏覽；先看陷阱欄，再看公式欄，最後掃核心概念
> 結構：每節 = 核心概念 + 必考公式／比較表 + 考試陷阱；最末為跨章 Trap Clinic

---

## L22101 敘述性統計與資料摘要技術

### 核心概念

- 集中趨勢三種：**Mean（平均數）、Median（中位數）、Mode（眾數）**；有離群值 → 優先用 Median
- 離散程度：Variance（變異數）、SD（標準差）、IQR（四分位距）、CV（變異係數）
- **IQR = Q3 − Q1**；Fence：下限 = Q1 − 1.5×IQR，上限 = Q3 + 1.5×IQR
- Boxplot 鬚線 = 資料中**最後一個落在 Fence 內的實際值**，不是 Fence 值本身
- 偏態：正偏（右長尾）→ Mean > Median > Mode；負偏（左長尾）→ Mean < Median < Mode
- 峰度（Kurtosis）：scipy 預設 = Fisher/Excess（常態 = 0）；`fisher=False` = Pearson（常態 = 3）
- `pandas.describe()`：std 用 ddof=1（樣本）；25%=Q1，50%=Median，75%=Q3
- `value_counts()` = 每個值出現次數；`nunique()` = 不同值的個數（不是計頻率）

### 必考公式／比較表

| 指標 | 公式 | ddof 注意 |
|---|---|---|
| 人口變異數 | Σ(xi−μ)² / N | ddof=0，÷N |
| 樣本變異數 | Σ(xi−x̄)² / (N−1) | ddof=1，÷(N-1) |
| IQR | Q3 − Q1 | — |
| CV | (SD / Mean) × 100% | 比較不同單位的離散度 |

```text
正偏（右長尾）：Mean > Median > Mode
負偏（左長尾）：Mean < Median < Mode
```

### 考試陷阱

- ⚠️ Boxplot 鬚線不是 Fence 值，而是 Fence 內最後一個真實資料點
- ⚠️ `scipy.stats.kurtosis()` 預設 Fisher（常態=0），不是 Pearson（常態=3）；看選項判斷題目在問哪個版本
- ⚠️ `pandas.describe()` 的 std 預設 ddof=1（樣本），不是人口標準差

---

## L22102 機率分佈與資料分佈模型

### 核心概念

- 離散分佈：PMF P(X=x)；連續分佈：PDF 是密度（非機率），P(X=x)=0，P(a<X≤b) = F(b)−F(a)
- **Normal(μ, σ²)**：scipy 用 `scale=σ`（σ，不是 σ²）；68-95-99.7% 規則；z=(x−μ)/σ
- **Binomial(n,p)**：PMF = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ；Mean=np；Var=np(1−p)
- **Poisson(λ)**：Mean = Variance = λ；PMF = e⁻ᵏ λᵏ / k!
- **Uniform(a,b)**：scipy `loc=a, scale=b−a`（注意 scale 是區間寬，不是 b）
- **Exponential(λ)**：等待下一次 Poisson 事件；無記憶性；E(X)=1/λ；scipy `scale=1/λ`
- 近似法：Binomial→Poisson（n≥100 且 np≤10，令 λ=np）；Binomial→Normal（np≥5 且 n(1−p)≥5，需連續修正 ±0.5）
- **CLT**：樣本平均數（不是原始資料）在 n 夠大時趨近常態分佈

### 必考公式／比較表

| 分佈 | 關鍵參數 | scipy 陷阱 |
|---|---|---|
| Normal(μ,σ²) | loc=μ, scale=σ | scale 是 σ，不是 σ² |
| Uniform(a,b) | loc=a, scale=b−a | scale 是寬度，不是 b |
| Exponential(λ) | scale=1/λ | scale 是 1/λ，不是 λ |
| Poisson(λ) | mu=λ | Mean = Variance = λ |

```text
P(a < X ≤ b) = CDF(b) − CDF(a)
連續分佈：P(X = 任一特定值) = 0
```

### 考試陷阱

- ⚠️ `scipy.stats.norm(loc=μ, scale=σ)`：scale 是 σ，不是 σ²（方差）
- ⚠️ `scipy.stats.uniform(loc=a, scale=b−a)`：scale 是寬度，傳入 b 是錯的
- ⚠️ CLT 說的是「樣本平均數」趨近常態，不是原始資料本身趨近常態

---

## L22103 假設檢定與統計推論

### 核心概念

- H0（虛無假設）= 無差異／無效果；H1（對立假設）= 有差異；研究問題決定單雙尾（不是看到資料才決定）
- **p ≤ α → 拒絕 H0**；p > α → 「無法拒絕 H0」（不是「H0 為真」）
- p-value = 假設 H0 為真時，出現這麼極端資料的機率（不是 H0 為真的機率）
- Type I Error（α）= 拒絕真 H0 = False Positive；Type II Error（β）= 無法拒絕假 H0 = False Negative
- Power = 1 − β
- 95% CI：若 H0 假設值落在 CI 外 → 通常拒絕 H0
- t-test 三種：`ttest_1samp`（一組對標準值）、`ttest_ind`（兩獨立組；`equal_var=False` = Welch's t-test）、`ttest_rel`（相同受試者前後）
- χ² 獨立性檢定：`chi2_contingency()` 需輸入觀察**次數**（counts），非百分比；期望次數 <5 → 改用 Fisher's Exact Test
- 單因子 ANOVA（`f_oneway`）：3+ 組比較；拒絕 H0 = 「至少一組有差異」，不知道哪組差，需事後比較

### 必考公式／比較表

| 函數 | 用途 | 常見錯誤 |
|---|---|---|
| `ttest_1samp` | 一組 vs 已知標準 | — |
| `ttest_ind(equal_var=False)` | 兩獨立組（Welch's）| equal_var 預設 True，不等方差要手動設 False |
| `ttest_rel` | 配對樣本（前後測）| — |
| `chi2_contingency` | χ² 獨立性 | 輸入要是 counts，不是比例 |
| `f_oneway` | 單因子 ANOVA | 只知道有差，不知道哪組 |

```text
Type I (α) = 拒絕真 H0 = False Positive
Type II (β) = 無法拒絕假 H0 = False Negative
Power = 1 − β
```

### 考試陷阱

- ⚠️ p-value 是「H0 成立下，資料這麼極端的機率」，不是「H0 為真的機率」
- ⚠️ p > α → 只是「無法拒絕 H0」，不能說「H0 被證實」
- ⚠️ `chi2_contingency()` 要輸入觀察次數（counts），輸入百分比會得到錯誤結果

---

## L22201 數據收集與清理

### 核心概念

- 收集方法：API Polling（定期拉取）、Webhook（事件驅動推送）、IoT（高頻串流）、Batch（定期批次）、Web Scraping（HTML 非結構化）、CDC（binlog/Debezium 即時 DB 異動）、Kafka（高吞吐串流）
- 缺失值：`dropna(how='any'/'all', subset=[], thresh=N)`；`fillna(值/mean/median/mode)`；`ffill()/bfill()`（pandas 3.0 後廢棄 `fillna(method='ffill')`）
- 去重：pandas `drop_duplicates(subset=[], keep='first'/'last'/False)`；Spark `dropDuplicates([])`
- 串流去重：`withWatermark("event_time","2 hours")` + `dropDuplicatesWithinWatermark([])` → 只支援 append/update 輸出模式（不支援 complete 模式）
- 離群值：IQR Fence（Q1−1.5×IQR / Q3+1.5×IQR）；z-score |z|>3；處理方式：drop 或 clip
- 型別轉換：`astype()`；`to_datetime(errors='coerce')`；`to_numeric(errors='coerce')` → 轉換失敗變 NaN
- 欄位抽取：`str.extract(regex)` 從 log 抽欄位（不是 sklearn 特徵工程）
- 資料品質六維度口訣：**「完準一時唯有效」**（Completeness、Accuracy、Consistency、Timeliness、Uniqueness、Validity）
- Schema Drift = 欄位名稱改變、新增欄位、刪除欄位、型別改變（不是值的錯誤）
- PII 處理：Masking/Redaction（不可逆）、Pseudonymization（假名化，可逆，GDPR 仍算個資）、Anonymization（匿名化，不可逆）

### 必考公式／比較表

| 方法 | 觸發場景 |
|---|---|
| API Polling | 定期抓外部 API 資料 |
| Webhook | 事件發生時對方推送 |
| CDC（Debezium）| 即時追蹤 DB binlog 異動 |
| Kafka | 高吞吐串流訊息佇列 |
| Web Scraping | 抓取 HTML 頁面非結構化資料 |

```text
ETL：先 Transform 再 Load → 傳統 DW
ELT：先 Load 再 Transform → 雲端 Lakehouse
Bronze（原始）→ Silver（清理）→ Gold（彙整）
```

### 考試陷阱

- ⚠️ pandas 3.0 後 `fillna(method='ffill')` 已棄用，要改用 `df.ffill()`
- ⚠️ Watermark + Aggregation 只支援 append/update 模式，不支援 complete 模式
- ⚠️ Pseudonymization（假名化）= 可逆 → 在 GDPR 中**仍屬個人資料**，不等同匿名化

---

## L22202 數據儲存與管理

### 核心概念

- RDBMS（固定 schema、SQL、ACID）vs NoSQL 四種：Document/MongoDB（半結構 JSON）、Key-Value/Redis（快取/Session）、Wide-Column/HBase/Cassandra（稀疏大規模）、Graph/Neo4j（關係路徑）
- ACID（Atomicity、Consistency、Isolation、Durability）vs BASE（Basically Available、Soft state、Eventual consistency）
- OLTP（交易型，行存儲，查整行快）vs OLAP（分析型，欄存儲，掃少數欄位快）
- HDFS：NameNode（metadata）、DataNode（資料塊）；預設塊大小 128MB、複製因子 3；NameNode = SPOF（需 Active/Standby + ZooKeeper）
- 開放表格格式：Delta Lake、Apache Iceberg、Apache Hudi（不是完整平台）
- Feature Store：Offline（訓練用）+ Online（低延遲推論用）；代表：Feast、Tecton
- Dataset Versioning（DVC、lakeFS）= 追蹤訓練用的是哪批資料
- Time Travel（Delta Lake、Iceberg）= 查詢歷史時間點的快照
- `createOrReplaceTempView()` = 暫時視圖（不是永久 Table）

### 必考公式／比較表

| 存儲類型 | 代表 | 特性 |
|---|---|---|
| 行存儲（Row-Store）| RDBMS（OLTP）| 查整筆記錄快 |
| 欄存儲（Column-Store）| DW（OLAP）| 掃少數欄位 / 聚合快 |
| Key-Value | Redis | 超低延遲快取 |
| Document | MongoDB | 半結構化 JSON |
| Graph | Neo4j | 關係查詢、路徑計算 |
| Wide-Column | HBase/Cassandra | 稀疏大規模、水平擴展 |

```text
Data Lake（多格式原始）→ 彈性但品質不保
Data Warehouse（結構化BI）→ Schema 嚴格
Data Lakehouse = Lake 彈性 + DW 治理
```

### 考試陷阱

- ⚠️ Delta Lake、Iceberg、Hudi 是「開放表格格式」，不是完整的大數據平台
- ⚠️ `createOrReplaceTempView()` 是暫時視圖，Session 結束就消失，不是寫入 Hive
- ⚠️ NameNode 是 HDFS 的 SPOF；必須搭配 Active/Standby 架構，不是單點直接用

---

## L22203 數據處理技術與工具

### 核心概念

- Hadoop 三層：HDFS（儲存）、YARN（資源管理：ResourceManager/NodeManager/ApplicationMaster）、MapReduce（批次計算：Map→Shuffle and Sort→Reduce）
- Spark 三種抽象：RDD（低層，無 Catalyst）、DataFrame（有 schema，有 Catalyst，可用 SQL）、Dataset（Scala/Java 才有型別）
- **Lazy Evaluation**：Transformation（`.filter/.select/.groupBy/.join`）只建計劃；Action（`.show/.count/.collect/write`）才觸發執行
- DAG = Transformation 依賴圖；Catalyst Optimizer 優化 Logical Plan
- Structured Streaming：`readStream/writeStream`；micro-batch 模型（**不是** true event-at-a-time）
- Apache Flink：true streaming、event-at-a-time、延遲比 Spark Streaming 低
- SQL JOIN：INNER（兩邊都有）、LEFT（左邊全保留，右邊無則 NULL）
- GROUP BY vs Window Function：GROUP BY 減少行數（每組一行）；Window Function 保留原行數 + 加排名/累計/lag/lead
- ROW_NUMBER：唯一序號（1,2,3）；RANK：並列後跳號（1,1,3）；DENSE_RANK：並列不跳號（1,1,2）
- LAG：取前一行值；LEAD：取後一行值

### 必考公式／比較表

| Spark API | 類型 | 觸發執行？ |
|---|---|---|
| `.filter()/.select()/.groupBy()/.join()` | Transformation | 否（Lazy） |
| `.show()/.count()/.collect()/write` | Action | 是 |

```text
Batch vs Stream：
Batch = 累積後處理；Stream = 持續處理
Spark Streaming = micro-batch（不是 true stream）
Flink = true event-at-a-time
```

```text
ROW_NUMBER：1,2,3（無並列跳號）
RANK：       1,1,3（並列後跳號）
DENSE_RANK： 1,1,2（並列不跳號）
```

### 考試陷阱

- ⚠️ Spark `.filter()` 等 Transformation 是 Lazy，不會立即執行，要到 Action 才觸發
- ⚠️ Structured Streaming 是 micro-batch，不是 true event-at-a-time；Flink 才是
- ⚠️ GROUP BY 會減少行數；Window Function 保留原行數，這是最常混淆的差異

---

## L22301 統計學在大數據中的應用

### 核心概念

- **MinMaxScaler**：(x−min)/(max−min) → 縮放到 [0,1]；對離群值敏感
- **StandardScaler**：(x−μ)/σ → mean=0, std=1；無固定範圍；對離群值仍有影響
- **RobustScaler**：(x−median)/IQR → 抗離群值；使用 median+IQR（不是 mean+std）
- **Log Transform**：右偏正值資料；含 0 用 `log1p(x)=ln(x+1)`；負值無法直接用
- **Box-Cox**：冪次變換，要求 x>0；λ=0 等同 log；λ 由資料估計
- **Yeo-Johnson**：類 Box-Cox，但支援 0 和負值
- **QuantileTransformer**：排名映射到均勻/常態分佈；非線性（會破壞線性關係）
- sklearn 流程：`fit()` 在訓練集學參數；`transform()` 套用已學參數；測試集只能 `transform()`（不能再 fit = data leakage）
- 抽樣：Simple Random（等機率）、Stratified（類別不平衡時保比例）、Reservoir（串流/未知總數）

### 必考公式／比較表

| Scaler | 公式 | 特性 |
|---|---|---|
| MinMax | (x−min)/(max−min) | [0,1]，怕離群值 |
| Standard | (x−μ)/σ | mean=0, std=1，無固定範圍 |
| Robust | (x−median)/IQR | 抗離群值，用 median+IQR |

```text
sklearn 正確流程：
train：scaler.fit(X_train) → scaler.transform(X_train)
test：  scaler.transform(X_test)（不能 fit）
```

### 考試陷阱

- ⚠️ 測試集只能 `transform()`，不能再 `fit()`；在測試集上 `fit` = data leakage
- ⚠️ `log1p(x)` 處理含 0 的右偏資料；`log(x)` 在 x=0 時會報錯
- ⚠️ RobustScaler 用的是 median+IQR，不是 mean+std

---

## L22302 常見的大數據分析方法

### 核心概念

- **k-means**：無監督（無標籤）；最小化 SSE/inertia；過程：隨機分配 → 更新 centroid → 重複到收斂；收斂 ≠ 全域最優（可能局部最小）
- k-means++：更好的 centroid 初始化；Elbow Method：看 SSE 下降趨勢選 k（啟發式）
- **Decision Tree**：有監督（有標籤）；Gini = 1−Σpᵢ²；Entropy = −Σpᵢlog₂(pᵢ)；Information Gain = 分裂前後 Entropy 差；貪婪分裂；過擬合 → 剪枝；sklearn 預設 criterion='gini'
- **SMOTE**：在少數類鄰近點之間插值（不是複製）；必須只在訓練集/fold 內做（分裂前做 = data leakage）
- 其他不平衡處理：Random Oversampling（複製少數類）、Undersampling（減少多數類）、Class Weight（調整損失函數權重，不改資料）
- 指標選擇：Accuracy（分佈平均時可用）、Precision（降低 FP）、Recall（降低 FN）、F1（兩者平衡）、ROC AUC（排序能力）、PR Curve（少數正類）

### 必考公式／比較表

| 方法 | 有無標籤 | 核心目標 |
|---|---|---|
| k-means | 無監督 | 最小化群內距離（SSE） |
| Decision Tree | 有監督 | 最大化 Information Gain |

```text
Gini = 1 − Σpᵢ²
Entropy = −Σpᵢ log₂(pᵢ)
Information Gain = Parent Entropy − Weighted Child Entropy
```

| 指標 | 公式 | 適合場景 |
|---|---|---|
| Precision | TP/(TP+FP) | 不能亂抓（FP 代價高）|
| Recall | TP/(TP+FN) | 不能漏抓（FN 代價高）|
| F1 | 2PR/(P+R) | 兩者都要顧 |
| Accuracy | (TP+TN)/All | 類別平衡時用 |

### 考試陷阱

- ⚠️ SMOTE 必須在訓練集/fold 內部做，分裂 train/test 之前做 = data leakage
- ⚠️ k-means 是無監督，Decision Tree 是有監督；看有沒有標籤來分
- ⚠️ Accuracy 在不平衡資料下可能誤導；全猜多數類也可能有高 Accuracy

---

## L22303 數據可視化工具

### 核心概念

- 圖表選型：Bar（類別比較）、Histogram（連續分佈/bins）、Line（時間趨勢）、Scatter（兩連續變數關係）、Pie/Donut（少類別佔比）、Heatmap（2D 交叉/相關矩陣）、Box（median/IQR/離群）、Violin（分佈形狀/雙峰）、Stacked Bar（組成）、Grouped Bar（並排比較）
- matplotlib：靜態、低層、完全控制、學術出版品質
- seaborn：建在 matplotlib 上、高層、統計 EDA、快速視覺化
- Plotly：互動（hover/zoom/pan）、網頁儀表板
- Tableau：拖放 BI、商業利害關係人；Tableau Public = 強制公開（不能存私有資料）
- Power BI：Microsoft 生態（Office 365、Excel、Azure、Teams、DAX）
- **data-ink ratio = 資料墨水 / 總墨水** → 最大化（移除裝飾）
- **chart junk**：阻礙閱讀的不必要元素
- Pre-attentive 屬性：position > color > size > shape（精確定量比較用 position）
- 色彩：sequential（低→高）、diverging（中心點）、categorical（類別）；viridis = 色盲友善

### 必考公式／比較表

| 工具 | 特性 | 適用 |
|---|---|---|
| matplotlib | 靜態、低層 | 學術、精確控制 |
| seaborn | 高層統計 | EDA、快速分析 |
| Plotly | 互動 | 網頁儀表板 |
| Tableau | 拖放 BI | 商業利害關係人 |
| Power BI | Microsoft 生態 | Office/Azure 環境 |

```text
data-ink ratio → 最大化，移除 chart junk
Pre-attentive 精確度：position > color > size > shape
Tableau Public → 不能儲存私有資料，強制公開
```

### 考試陷阱

- ⚠️ Tableau Public 是強制公開版本，不能用來存私有商業資料
- ⚠️ data-ink ratio 應**最大化**（不是最小化）；移除裝飾、留下資料墨水
- ⚠️ Histogram 是連續資料（有 bins）；Bar Chart 是類別資料；兩者外觀相似但語意不同

---

## L22401 大數據與機器學習

### 核心概念

- 5V 框架（判斷資料痛點入口）：
  - **Volume**：資料量大，RAM/IO 成瓶頸 → mini-batch、out-of-core
  - **Velocity**：資料持續流入 → online/incremental learning、concept drift
  - **Variety**：多來源多格式 → Data Lake、schema-on-read、Spark pipeline
  - **Veracity**：品質差（缺漏/噪音/標註錯） → 清理、robust 方法
  - **Value**：成本效益不划算 → ROI 評估
- 訓練模式（每次 update 前吃多少資料）：
  - **Full-batch**：每次看完整資料集
  - **Mini-batch**：每次看固定大小一批
  - **Online/Incremental**：一筆或小段串流資料
- **Centralized** vs **Distributed Training**：單機撐得住 → 集中式；RAM/時間/模型容量不足 → 分散式
- **Data Parallelism**：切資料（資料太多）；每個 worker 有同一模型副本
- **Model Parallelism**：切模型（模型太大，單卡放不下）
- Parameter Server：中央節點聚合梯度；AllReduce/Ring-AllReduce：workers 彼此聚合（無中央瓶頸）

### 必考公式／比較表

| 判斷項目 | 選擇 |
|---|---|
| 資料持續流入、需即時更新 | Online/Incremental Learning |
| 資料大但可分批離線處理 | Mini-batch |
| 單機 RAM/時間不足 | Distributed Training |
| 切資料（資料太多）| Data Parallelism |
| 切模型（模型太大）| Model Parallelism |
| Workers 彼此聚合梯度 | AllReduce/Ring-AllReduce |

### 考試陷阱

- ⚠️ Big data ≠ 一定要 Distributed Training；單機 mini-batch 可完成時選集中式
- ⚠️ 有 `epoch` 外層迴圈不代表是 Full-batch；看每次 update 前吃多少資料
- ⚠️ 資料很多 → Data Parallelism；模型太大 → Model Parallelism（不是反過來）
- ⚠️ Online Learning（持續更新模型）≠ Online Serving（部署後提供即時預測）

---

## L22402 大數據應用於鑑別式AI

### 核心概念

- 鑑別式 AI 輸出是**類別**（spam/normal、fraud/legitimate、churn/retain）；輸出是連續數字才是回歸
- 混淆矩陣：TP（判對+正類）、FP（判錯+正類 = 誤報）、FN（判錯+負類 = 漏報）、TN（判對+負類）
  - 第一個字（T/F）= 模型有沒有判對；第二個字（P/N）= 模型判成正類或負類
- sklearn `confusion_matrix()` 預設格式：`[[TN, FP], [FN, TP]]`（左上是 TN，右下才是 TP）
- **Accuracy**：(TP+TN)/全部；類別不平衡時可能誤導
- **Precision**：TP/(TP+FP)；降低 FP；適合誤報成本高的場景
- **Recall**：TP/(TP+FN)；降低 FN；適合漏報成本高的場景（醫療、詐欺）
- **F1 Score**：2PR/(P+R)；Precision 和 Recall 平衡
- **Threshold**：降低 → 判正類變多 → Recall 常升；提高 → 判正類變少 → Precision 常升；0.5 不一定最佳
- **AUC-ROC**：多個 threshold 下 TPR vs FPR 的面積；衡量排序能力；用 `predict_proba()` 不是 `predict()`
- `predict()` → 最終類別（y_pred）；`predict_proba()` → 機率（y_prob）；`score()` → 很多 classifier 預設 Accuracy

### 必考公式／比較表

| 場景 | FP or FN 代價高 | 優先指標 |
|---|---|---|
| 垃圾郵件過濾 | FP（正常信誤刪）| Precision |
| 詐欺偵測 | FN（詐欺被放過）| Recall |
| 醫療診斷 | FN（病患漏判）| Recall |
| 行銷名單 | FP（浪費資源）| Precision |

```text
Precision = TP / (TP + FP)  ← 判成正類有多準
Recall    = TP / (TP + FN)  ← 真正正類抓到多少
F1        = 2PR / (P + R)   ← 調和平均
```

### 考試陷阱

- ⚠️ `roc_auc_score(y_test, y_pred)` 是陷阱；AUC 要用 `y_prob`（機率），不是 `y_pred`（類別）
- ⚠️ 類別不平衡時，Accuracy 高不代表模型好；全猜多數類也可以有高 Accuracy
- ⚠️ sklearn `confusion_matrix` 預設左上是 TN；`cm[1][1]` 才是 TP

---

## L22403 大數據在生成式AI中的應用

### 核心概念

- 預訓練語料庫（Pretraining Corpus）：規模（TB/trillion tokens）、品質、多樣性、授權合規；Common Crawl / C4 / The Pile / ROOTS
- 語料清理：Quality filtering（移除廣告/錯碼）、Exact-match dedup、Near-dedup（MinHash + LSH）、Perplexity filtering（過濾自然度低的文本）
- Tokenizer 配對：**BPE** → GPT；**WordPiece** → BERT；**SentencePiece** → T5/多語/raw text；**tiktoken** → OpenAI（cl100k_base/o200k_base）
- vocabulary size = 詞彙表大小（萬級別）；corpus size = 訓練語料總量（TB/trillion tokens）→ 兩者相差千萬倍
- 三大典範：**Pretraining**（大量讀，改全部權重）、**Fine-tuning/SFT**（instruction-response pairs，改權重）、**LoRA/PEFT**（低秩 adapter，省資源改少量參數）、**RAG**（檢索外部文件，不改權重）
- SFT vs RLHF vs DPO：SFT = instruction/response；RLHF = chosen/rejected + Reward Model + PPO；DPO = chosen/rejected + 直接優化 LM（不需 Reward Model）
- RAG 管線口訣：**切、嵌、存、找、補、答**（Chunking→Embedding→Vector Store→Retrieval→Prompt Augmentation→Generation）
- FAISS/Chroma/Weaviate = vector store（不是語言模型本身）
- 分散式訓練：**Data Parallel/DDP**（切 batch，模型複製）、**Tensor Parallel**（切大型 layer/tensor）、**Pipeline Parallel**（切模型 stage，micro-batch 接力）
- `model.generate()` 參數（temperature、do_sample、max_new_tokens）= 推論/生成參數，不是訓練超參數

### 必考公式／比較表

| 方法 | 改權重？| 資料規模 | 適合情境 |
|---|---|---|---|
| Pretraining | 是（全部）| TB/trillion tokens | 建立基礎模型 |
| Fine-tuning/SFT | 是 | 10K-100K | 調整行為/風格 |
| LoRA/PEFT | 是（少量）| 1K-10K | 省資源快速客製 |
| RAG | 否 | 文件庫隨時更新 | 知識常更新/需引用來源 |

```text
RAG 六步：切 → 嵌 → 存 → 找 → 補 → 答
Tokenizer：BPE=GPT / WordPiece=BERT / SentencePiece=多語 / tiktoken=OpenAI
```

### 考試陷阱

- ⚠️ vocabulary size（詞彙表大小，萬）≠ corpus size（訓練語料量，TB/trillion tokens）
- ⚠️ RAG 不改模型權重；Fine-tuning/LoRA 會改權重
- ⚠️ `temperature/max_new_tokens/do_sample` 是推論參數，不是訓練超參數（learning_rate 才是）
- ⚠️ DPO 和 RLHF 都用 chosen/rejected 偏好資料；差異是 DPO 不需要 Reward Model 和 PPO

---

## L22404 大數據隱私保護、安全與合規

### 核心概念

- 匿名化三層：
  - **k-匿名性**：每個等價類至少 k 筆 → 防身份揭露
  - **ℓ-多樣性**：群內敏感值要夠多元 → 防屬性揭露（群內值全一樣時 k-anonymity 不夠）
  - **t-相近性**：群內敏感值分佈要接近全體 → 防分佈偏斜攻擊
  - 操作：Generalization（精確值改成範圍）、Suppression（遮掉高風險值）
- **假名化**（Pseudonymisation）= 可逆，有對應表 → GDPR 仍算個人資料；**匿名化** = 不可逆 → 不再算個人資料
- **差分隱私（DP）**：統計輸出加雜訊；ε 越小隱私越強（雜訊越多）；同一資料集多次查詢 → ε 累加（順序組合）；互斥子群分別查詢 → 取最大 ε（平行組合）；Local DP = 裝置端先擾動再上傳
- **聯邦學習（FL）**：資料不離本地，只傳模型更新；FedAvg = 依資料量加權平均；Secure Aggregation = 伺服器只看聚合結果；Horizontal FL（欄位相似、人不同）vs Vertical FL（同一批人、欄位不同）；FL 不是絕對安全（梯度仍可能洩漏）
- 加密三種：**At Rest（AES-256）**、**In Transit（TLS 1.3）**、**Homomorphic（密文可運算）**
- 存取控制：**RBAC**（依角色）、**ABAC**（依屬性/環境條件）、**欄位層級安全**（不同角色看不同欄位）
- 合規：個資法第5條（蒐集最小化）、第12條（外洩通知當事人）、第19條（合法蒐集基礎）；GDPR Art.25（Privacy by Design/Default）、Art.32（處理安全）、Art.33（72小時通報主管機關，視風險條件）、Art.17（被遺忘權）；ISO/IEC 27701:2025（PIMS，可獨立使用）

### 必考公式／比較表

| 保護階段 | 技術 |
|---|---|
| 資料公開前 | k-匿名性 / ℓ-多樣性 / t-相近性 |
| 統計輸出 | 差分隱私（DP，加雜訊）|
| 分散訓練 | 聯邦學習（FL）|
| 儲存中 | AES-256（At Rest）|
| 傳輸中 | TLS 1.3（In Transit）|
| 密文運算 | 同態加密（HE）|
| 存取權限 | RBAC / ABAC / 欄位層級安全 |

```text
個資法12條 = 外洩通知當事人（台灣）
GDPR Art.33 = 72小時通報主管機關（非所有外洩，視風險）
GDPR Art.25 = Privacy by Design/Default
假名化 = 可逆 = 仍屬個資
匿名化 = 不可逆 = 不再屬個資
```

### 考試陷阱

- ⚠️ ε 越小 = 隱私越強（不是越弱）；題目常把大小方向寫反
- ⚠️ 72小時通報（GDPR Art.33）是通報「主管機關」，不是台灣個資法；台灣個資法第12條是通知「當事人」
- ⚠️ 聯邦學習不是絕對安全；梯度仍可能被反推，需搭配 Secure Aggregation 或 DP
- ⚠️ 假名化（可逆）在 GDPR 仍屬個人資料，不等於匿名化

---

## 跨章 Trap Clinic（12-18 個最高頻混淆對）

| # | 常混淆的兩個概念 | 快速分辨 |
|---|---|---|
| 1 | ddof=0（人口）vs ddof=1（樣本）| ÷N = population；÷(N-1) = sample；`pandas.describe()` 預設 ddof=1 |
| 2 | Boxplot 鬚線 vs IQR Fence | 鬚線 = Fence 內最後一個真實值；Fence = Q1−1.5×IQR / Q3+1.5×IQR |
| 3 | scipy Normal `scale=σ` vs `scale=σ²` | 永遠傳 σ（標準差），不是 σ²（方差） |
| 4 | CLT 對象：原始資料 vs 樣本平均數 | CLT 說的是**樣本平均數**趨近常態，不是原始資料 |
| 5 | p-value 的定義：「H0 成立下觀察到此資料的機率」vs「H0 為真的機率」| p-value 不是 H0 為真的機率；只是假設 H0 成立下的條件機率 |
| 6 | Precision vs Recall（場景分辨）| FP 代價高（誤報貴）→ Precision；FN 代價高（漏報危險）→ Recall |
| 7 | AUC 用 y_pred vs y_prob | roc_auc_score 必須用 `predict_proba()` 的機率，不是 `predict()` 的類別 |
| 8 | GROUP BY vs Window Function | GROUP BY 減少行數（每組一行）；Window Function 保留原行數加新欄位 |
| 9 | Spark Transformation（Lazy）vs Action（觸發）| `.filter/.select/.groupBy` = Lazy；`.show/.count/.collect/write` = 觸發執行 |
| 10 | Data Parallelism vs Model Parallelism | 切**資料**（資料太多）= Data；切**模型**（模型太大）= Model |
| 11 | SMOTE 時機：split 前 vs split 後 | 必須在 train/test split 之後、只在訓練集內做；分裂前做 = data leakage |
| 12 | RAG vs Fine-tuning | RAG = 不改權重，查外部文件；Fine-tuning = 改模型權重或 adapter |
| 13 | vocabulary size vs corpus size | vocab = 詞彙表大小（萬級）；corpus = 訓練語料量（TB/trillion token 級）|
| 14 | ε 小 = 隱私強 vs ε 大 = 隱私強 | ε 越**小** = 雜訊越多 = 隱私越強（常被反向陷阱）|
| 15 | 假名化（可逆）vs 匿名化（不可逆）| 假名化有對應表可還原 → GDPR 仍屬個資；匿名化完全不可逆 → 不再屬個資 |
| 16 | GDPR Art.33（72hr 通報主管機關）vs 個資法第12條（外洩通知當事人）| 72hr = 歐盟 GDPR，通報主管機關；第12條 = 台灣，通知當事人 |
| 17 | Structured Streaming micro-batch vs Flink true stream | Spark Structured Streaming = micro-batch；Flink = true event-at-a-time |
| 18 | Online Learning（持續訓練）vs Online Serving（即時推論）| Online Learning = 模型隨新資料更新；Online Serving = 部署後提供預測服務 |

---

> 考前最後確認：先掃一遍所有 ⚠️ 陷阱欄，再看 Trap Clinic。祝 2026-05-23 旗開得勝。

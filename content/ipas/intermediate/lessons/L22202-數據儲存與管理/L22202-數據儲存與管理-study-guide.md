# L22202 數據儲存與管理 — Study Guide v2

## 0. How to Use This Guide

這份 guide 的讀法是：先看第 1 節的大地圖，再讀第 2-7 節的核心概念，最後用第 8-10 節練判斷題。

考試不太會只問「名詞定義」。更常見的是給你一個情境，要求你判斷應該選哪種資料庫、儲存格式、平台型態，或訓練資料管理方式。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

本課邊界：

- 本課談「資料怎麼存、存在哪、如何回溯」
- 不展開 ETL/ELT 轉換流程細節，那是 `L22203`
- 不展開統計分析方法，那是 `L22301`
- 不展開特徵工程演算法，那是 `L23301`
- 本課的模型訓練只談訓練資料儲存與版本管理，不談模型訓練演算法

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

`L22202` 的核心是：看到資料場景，就能選對儲存架構、儲存格式、查詢方向與訓練資料管理方式。

考試要你從「資料長相」和「使用方式」反推答案，而不是背哪個產品最有名。

### Everyday Analogy

像整理學校資料：學生繳費紀錄要放在嚴格帳本，課程影片可以放在大型雲端倉庫，歷年成績報表要放在容易分析的系統，模型訓練資料還要知道用的是哪一版。

### 在整體流程中的位置

```text
資料來源
→ 資料長相判斷
→ 資料庫 / 儲存系統選型
→ 檔案格式與平台選型
→ 分析或訓練資料管理
→ 可查詢、可治理、可回溯
```

### Key Concepts

| 題目問的是 | 想到 |
|---|---|
| 訂單、付款、庫存、交易正確性 | RDBMS + OLTP + Row-Store |
| JSON、半結構化、欄位彈性 | Document NoSQL |
| session、cache、排行榜、快速查值 | Key-Value |
| 超大規模、稀疏欄位、分散式寫入 | Wide-Column |
| 社群關係、路徑、推薦鏈路 | Graph Database |
| 月報表、歷史趨勢、聚合分析 | OLAP + Column-Store |
| 原始資料先集中保存 | Data Lake + Object Storage |
| 整理後給 BI / SQL 分析 | Data Warehouse |
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

### Exam Rule

```text
固定欄位 + SQL + 交易一致性 → RDBMS
半結構化 JSON → Document NoSQL
key 快速查 value → Key-Value
報表 / 聚合 / 歷史分析 → OLAP
大量掃描少數欄位 → Column-Store / Parquet
原始多格式資料先保存 → Data Lake
模型訓練資料要可重現 → Dataset Versioning / Time Travel
```

### Quick Check

題目說「電商結帳資料必須正確入帳，不能扣款成功但沒有訂單」，應先想到哪一類系統？

答案：`RDBMS + OLTP`。因為這是交易正確性與一致性問題，重點是 ACID 與單筆交易可靠。

## 2. Database Architecture: RDBMS and NoSQL 🔥🔥🔥

### 先懂一句話

資料庫架構先看資料長相。固定欄位、規則清楚、要交易一致性時，常先想 `RDBMS`；欄位彈性、資料模型特殊、需要水平擴充時，常先看 `NoSQL` 類型。

### Everyday Analogy

RDBMS 像格式固定的會計帳本；NoSQL 像不同用途的收納工具，有的裝文件、有的像字典、有的放超大稀疏表、有的專門畫關係網。

### 在整體流程中的位置

```text
資料長相與一致性需求
→ 選 RDBMS 或 NoSQL
→ 再搭配 OLTP / OLAP、Row / Column、平台型態
```

### Key Concepts

#### RDBMS

`關聯式資料庫（Relational Database Management System, RDBMS）`的核心是：

- 用表格（Table）存資料
- 寫入前先定義結構描述（Schema）
- 用 SQL 查詢
- 重視 ACID 與交易控制

常見場景：

- 訂單
- 金流
- 會員資料
- 庫存
- 帳戶餘額

常見 DDL：

```sql
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
);
```

這段重點是：

- `CREATE TABLE` 是 DDL
- `order_id` 是主鍵（Primary Key）
- `DECIMAL(10,2)` 適合金額
- `TIMESTAMP` 適合時間

常見 SQL 查詢：

```sql
SELECT
    c.city,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_sales
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status = 'paid'
GROUP BY c.city;
```

這段是在連接顧客與訂單，只看已付款訂單，依城市分組，計算訂單數與銷售額。

#### ACID vs BASE

ACID 和 BASE 是兩種資料庫取捨：ACID 優先「交易正確」，BASE 優先「分散式系統可用與可擴充」。

| 面向 | ACID | BASE |
|---|---|---|
| 核心想法 | 交易一定要正確可靠 | 服務先保持可用，資料之後同步到一致 |
| 一致性 | 強一致 | 最終一致 |
| 常見搭配 | RDBMS / 交易系統 | 分散式 NoSQL / 大規模服務 |
| 典型題目 | 扣款、訂單、庫存 | 按讚數、瀏覽數、推薦系統、水平擴充 |

ACID 要記：

- `Atomicity`（原子性）：要嘛整筆成功，要嘛全部失敗
- `Consistency`（一致性）：交易前後資料規則都要正確
- `Isolation`（隔離性）：多筆交易彼此不互相干擾
- `Durability`（持久性）：提交成功後，不會因當機就消失

BASE 要記：

- `Basically Available`（基本可用）：系統優先維持服務可用
- `Soft state`（軟狀態）：不同節點可能暫時看到不同狀態
- `Eventual consistency`（最終一致）：過一段時間後資料會同步到一致

```text
ACID → 銀行轉帳、扣款、訂單：不能接受「之後再一致」
BASE → 社群按讚、瀏覽數：可以短暫不一致，但服務要能撐住流量
```

#### NoSQL 四大類型

| 類型 | 核心結構 | 代表例子 | 適合場景 | 不要誤會 |
|---|---|---|---|---|
| Document | JSON-like 文件 | MongoDB | 半結構化資料、API 事件、內容資料 | 不是最強交易系統 |
| Key-Value | `key -> value` | Redis | 快取、Session、排行榜 | 不適合複雜多表查詢 |
| Wide-Column | 欄族、分散式 | HBase、Cassandra | 超大規模、稀疏欄位 | 不是一般分析用 Column-Store |
| Graph | Node / Edge | Neo4j | 社群關係、路徑分析、推薦鏈路 | 重點在關係，不是大表聚合 |

MongoDB 查詢常見形式：

```javascript
db.collection.find({"field": value})
```

例如：

```javascript
db.users.find({"city": "Taipei"})
```

### Exam Rule

```text
CREATE TABLE / schema / SQL JOIN / ACID → RDBMS
交易正確性 / 金流 / 庫存 → RDBMS
JSON / 半結構化 / find() → Document NoSQL / MongoDB
cache / session / ranking / key 查值 → Key-Value / Redis
超大規模 / 稀疏欄位 / HBase / Cassandra → Wide-Column
節點 / 邊 / 路徑 / 社群關係 / Neo4j → Graph Database
最終一致性 / 可用性 / 分散式 NoSQL → BASE
```

### Quick Check

題目說「社群平台要查朋友的朋友，並分析使用者之間的連結路徑」，最適合哪種資料庫？

答案：`Graph Database`。因為題目重點是節點、邊與路徑關係，不是表格交易或 JSON 文件。

## 3. Workload and Storage Layout: OLTP, OLAP, Row-Store, Column-Store 🔥🔥🔥

### 先懂一句話

`OLTP` 是一筆一筆交易要正確；`OLAP` 是大量資料要快速分析。`Row-Store` 常配 OLTP，`Column-Store` 常配 OLAP。

### Everyday Analogy

OLTP 像便利商店收銀機，每刷一筆都要準；OLAP 像總部看月報表，要從大量交易中快速算出趨勢。

### 在整體流程中的位置

```text
資料庫架構選型
→ 判斷工作負載 OLTP / OLAP
→ 選 Row-Store / Column-Store
→ 影響查詢與分析效率
```

### Key Concepts

| 比較面向 | OLTP | OLAP |
|---|---|---|
| 全名 | Online Transaction Processing | Online Analytical Processing |
| 主要目標 | 正確處理單筆交易 | 快速做大量分析 |
| 讀寫型態 | 高頻小量讀寫 | 大量讀取與聚合 |
| 資料更新 | 即時更新多 | 批次或分析查詢多 |
| 常見場景 | 下單、付款、登入、庫存 | 報表、趨勢分析、用戶分析 |
| 常見搭配 | RDBMS + Row-Store | Warehouse/Lakehouse + Column-Store |

`Row-Store` 會把同一列資料放在一起，適合查一筆完整紀錄。

```text
Row 1: user_id | name | city | age
Row 2: user_id | name | city | age
Row 3: user_id | name | city | age
```

`Column-Store` 會把同一欄資料放在一起，適合大量掃描少數欄位。

```text
user_id: 1001, 1002, 1003
name:    Amy,  Ben,  Cindy
city:    TPE,  TPE,  TCH
age:     24,   31,   29
```

| 比較面向 | Row-Store | Column-Store |
|---|---|---|
| 儲存方式 | 同一列資料放一起 | 同一欄資料放一起 |
| 強項 | 單筆查詢、單筆更新 | 聚合查詢、只讀部分欄位 |
| 常見工作負載 | OLTP | OLAP |
| 例子 | 查某一張訂單完整內容 | 算所有訂單平均金額 |
| 考試判斷 | 交易系統常見 | 分析系統常見 |

記憶句：

```text
查整筆，用列。
算整欄，用欄。
交易看 T，分析看 A。
```

### Exam Rule

```text
即時下單 / 單筆更新 / 交易正確性 → OLTP
月報表 / 聚合分析 / 歷史趨勢 → OLAP
每次查一筆完整紀錄 → Row-Store
只讀幾個欄位做大量統計 → Column-Store
高頻寫入交易系統 → 不要優先選 Column-Store
```

### Quick Check

題目說「分析三年訂單資料，只讀取城市與金額欄位計算各城市營收」，應偏向哪種儲存方式？

答案：`Column-Store`。因為這是大量掃描少數欄位做聚合分析，屬於 OLAP 思維。

## 4. Distributed Storage, HDFS, Object Storage, and File Formats 🔥🔥

### 先懂一句話

資料量大到單機放不下或不可靠時，就要分散式儲存。考試常把 `HDFS`、`Object Storage`、`CSV`、`JSON`、`Parquet` 放在一起考，重點是知道它們各自適合什麼。

### Everyday Analogy

HDFS 像自己在校內機房搭分散式檔案櫃；Object Storage 像租用雲端大倉庫；CSV、JSON、Parquet 則像資料裝箱的格式。

### 在整體流程中的位置

```text
資料量與部署環境
→ 選 HDFS 或 Object Storage
→ 選 CSV / JSON / Parquet
→ 供 Spark、Data Lake、Lakehouse 或分析系統讀取
```

### Key Concepts

#### 分散式儲存

`分散式儲存（Distributed Storage）`是把資料分散到多個節點上儲存與管理。

主要目的：

- 容量擴充
- 效能擴充
- 容錯（Fault Tolerance）

```text
大型檔案
→ 切成多個 block 或 object
→ 分散到多個節點 / 儲存服務
→ 用副本或高耐久機制降低風險
```

`Sharding` 是把資料水平切分到不同節點；`Replication` 是把相同資料複製到多個節點。

#### HDFS vs Object Storage

| 比較面向 | HDFS | Object Storage |
|---|---|---|
| 類型 | 分散式檔案系統 | 雲端物件儲存 |
| 抽象方式 | 檔案系統思維 | Bucket / Object 思維 |
| 部署方式 | 常見於 Hadoop 生態 / 自建叢集 | 常見於雲端服務 |
| 典型用途 | 大數據叢集儲存 | Data Lake、備存、分析資料 |
| 代表例子 | Hadoop HDFS | S3、Azure Blob、GCS |

HDFS 核心：

```text
大檔
→ 切成 block
→ 分散到 DataNode
→ 透過副本容錯
```

Object Storage 核心：

```text
Bucket / Container
├── object A
├── object B
└── object C
```

#### CSV, JSON, Parquet

| 格式 | 特色 | 適合場景 | 考試提醒 |
|---|---|---|---|
| CSV | 人眼可讀、工具相容高、表格式文字 | 簡單交換、Excel 易開 | 不支援巢狀結構，大型分析效率較差 |
| JSON | 可表達巢狀結構、常見於 API | 半結構化資料、事件資料 | 可讀不代表分析最快 |
| Parquet | 欄式儲存格式、壓縮佳、只讀需要欄位 | Spark、Data Lake、Lakehouse、分析查詢 | 常和大數據分析綁在一起 |

記憶句：

```text
CSV 好看，JSON 好裝，Parquet 好分析。
```

### Exam Rule

```text
Hadoop / 自建叢集 / 分散式檔案系統 → HDFS
S3 / Azure Blob / GCS / bucket / 雲端資料湖 → Object Storage
文字表格 / Excel 易開 / 交換方便 → CSV
API 回傳 / 巢狀結構 / 半結構化 → JSON
欄式格式 / Spark 分析 / 只讀部分欄位 → Parquet
```

### Quick Check

題目說「公司要在雲端建立資料湖，長期保存大量原始 log，並讓多個服務讀取」，底層常見選擇是什麼？

答案：`Object Storage`，例如 S3、Azure Blob 或 GCS。因為雲端資料湖常建立在高擴充、高耐久的物件儲存上。

## 5. Data Lake, Data Warehouse, and Data Lakehouse 🔥🔥🔥

### 先懂一句話

`Data Lake` 先收原始資料，`Data Warehouse` 先整理再分析，`Data Lakehouse` 想同時保留湖的彈性與倉的治理能力。

### Everyday Analogy

Data Lake 像原料倉，什麼都先收；Data Warehouse 像整理好的超市貨架，方便報表查詢；Data Lakehouse 像在原料倉上加上貨架、標籤、版本與管理制度。

### 在整體流程中的位置

```text
資料來源很多
→ 先決定平台型態：Lake / Warehouse / Lakehouse
→ 再搭配 Object Storage、Parquet、Delta Lake / Iceberg 等能力
```

### Key Concepts

| 比較面向 | Data Lake | Data Warehouse | Data Lakehouse |
|---|---|---|---|
| 主要資料型態 | 結構化 + 半結構化 + 非結構化 | 以結構化為主 | 多元資料型態，但具表格治理能力 |
| 資料狀態 | 常保留原始資料 | 常為整理後資料 | 保留彈性，同時強化治理 |
| 底層常見儲存 | Object Storage | 專用分析資料庫 / 倉儲系統 | Object Storage + Table Format |
| 查詢特性 | 彈性高，但治理未必完整 | SQL 分析強 | SQL 分析與治理能力較強 |
| 典型用途 | 原始資料保存、資料科學探索 | BI、報表、管理分析 | AI / 分析 / 治理整合平台 |
| 代表例子 | S3-based Lake | Snowflake / BigQuery 類概念 | Delta Lake、Apache Iceberg、Apache Hudi |

Lakehouse 常強調：

- metadata
- schema 管理
- ACID 或交易能力
- 版本
- 時間旅行（Time Travel）
- 可治理的表格能力

重要陷阱：`Data Lakehouse` 不是單純把 Parquet 丟進 object storage。它還需要上層表格格式與治理能力。

精確說明：**Delta Lake、Apache Iceberg、Apache Hudi** 是**開放表格式（Open Table Format）**，不是完整的 Lakehouse 平台。它們在 Data Lake 的物件儲存上提供 ACID 交易、Schema Evolution、Time Travel 等能力，使 Data Lake 具備 Data Warehouse 的可靠性。Lakehouse 平台（如 Databricks）以 Delta Lake 為底層格式。

記憶句：

```text
湖先收，倉先整，湖倉兩邊都想要。
```

### Exam Rule

```text
原始資料先保留 / 多格式都收 → Data Lake
整理後提供 BI / 報表 / SQL 分析 → Data Warehouse
Object Storage 上加 schema、ACID、版本、Time Travel → Data Lakehouse
Delta Lake / Apache Iceberg / Apache Hudi → Lakehouse 核心開放表格式（Open Table Format），不是完整平台
```

### Quick Check

題目說「企業想把資料湖建在 object storage 上，但又需要 schema 管理、版本與時間旅行」，最符合哪個概念？

答案：`Data Lakehouse`。因為它把資料湖的彈性和資料倉儲式的治理、版本能力結合起來。

## 6. Spark Storage Read/Write and Scenario Selection 🔥🔥

### 先懂一句話

本課的 Spark 重點不是轉換流程，而是看懂 Spark 如何讀寫儲存格式，以及如何把 DataFrame 暫時變成可用 SQL 查的檢視。

### Everyday Analogy

像你先把資料檔打開，命名成一張暫時表，接著就能用熟悉的查詢方式整理它。考試只要你看懂「讀什麼格式、寫什麼格式、暫存成什麼」。

### 在整體流程中的位置

```text
儲存系統 / 檔案格式
→ Spark read / write
→ DataFrame
→ Temp View
→ SQL 查詢或後續處理
```

### Key Concepts

| 程式片段 | 代表意思 |
|---|---|
| `spark.read.parquet("path")` | 讀取 Parquet |
| `spark.read.format("delta").load("path")` | 讀取 Delta 格式 |
| `df.write.format("delta").save("path")` | 以 Delta 格式寫出 |
| `df.createOrReplaceTempView("name")` | 把 DataFrame 註冊成暫時 SQL 檢視 |

讀 Parquet：

```python
df = spark.read.parquet("s3://bucket/sales/")
```

讀 Delta：

```python
df = spark.read.format("delta").load("s3://bucket/orders_delta/")
```

寫 Delta：

```python
df.write.format("delta").save("s3://bucket/orders_delta/")
```

建立暫存檢視：

```python
df.createOrReplaceTempView("orders_view")
```

之後可用 SQL：

```sql
SELECT customer_id, COUNT(*) AS cnt
FROM orders_view
GROUP BY customer_id;
```

### Task / Scenario Selection

```text
先看輸出形式 / scenario requirement
→ 判斷任務類型
→ 選資料庫、儲存格式、平台或 Spark 讀寫方式
```

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 電商下單 | 訂單、付款、庫存 | 正確交易紀錄 | RDBMS + OLTP |
| App 事件收集 | JSON 事件 | 半結構化紀錄 | Document NoSQL / Data Lake |
| 快速查登入狀態 | session key | session value | Key-Value / Redis |
| 月營收報表 | 多年訂單 | 聚合報表 | OLAP + Column-Store |
| 雲端資料湖 | 原始 log、檔案、事件 | 長期保存資料 | Object Storage + Data Lake |
| Spark 分析 | Parquet / Delta | DataFrame / Temp View | `spark.read...` / `createOrReplaceTempView()` |

### Exam Rule

```text
spark.read.parquet() → 讀 Parquet
format("delta").load() → 讀 Delta
write.format("delta").save() → 寫 Delta
createOrReplaceTempView() → 建暫時檢視，不是永久資料表
Spark 本課重點 → 儲存格式 read/write，不是 ETL API 細節
```

### Quick Check

`df.createOrReplaceTempView("orders_view")` 在考題中代表什麼？

答案：把 DataFrame 註冊成暫時 SQL 檢視。它不是建立永久資料表。

## 7. Model Training Data Management: Feature Store, Dataset Versioning, Time Travel 🔥🔥

### 先懂一句話

AI 專案不只要訓練模型，也要管好「模型到底用哪份資料訓練」。本課只考訓練資料的儲存、一致性與回溯，不考模型演算法。

### Everyday Analogy

像交報告不能只留 `final.csv`、`final_v2.csv`、`final_final.csv`。真正可管理的做法是知道每次交出去的是哪一版、何時改過、出錯能不能回查。

### 在整體流程中的位置

```text
原始資料 / 特徵資料
→ Feature Store 管一致性
→ Dataset Versioning 管版本
→ Time Travel 回查舊狀態
→ 模型訓練可重現
```

### Key Concepts

#### Feature Store

`特徵儲存庫（Feature Store）`是管理機器學習特徵資料的資料層，不是特徵工程演算法。

它解決：

- 訓練時用什麼特徵資料
- 線上推論時用什麼特徵資料
- 如何讓線上與離線特徵定義一致

代表例子：

- Feast
- Tecton

| 類型 | 用途 | 常見關鍵字 |
|---|---|---|
| Offline Store | 大量歷史特徵，用於訓練資料產生與回溯分析 | training、historical features |
| Online Store | 低延遲查詢最新特徵，用於即時推論 | real-time inference、low latency |

#### Dataset Versioning

`資料集版本控管（Dataset Versioning）`讓你知道：

- 這次模型訓練用了哪一份資料
- 資料何時被更新
- 出問題時能不能回到舊版本

代表例子：

- DVC
- lakeFS
- Delta Lake / Iceberg / Hudi 的表版本能力

#### Time Travel

`時間旅行（Time Travel）`是查到某個時間點或某個版本的資料狀態。

典型出現在：

- Delta Lake
- Apache Iceberg

它的價值：

- 重現舊版訓練資料
- 比較版本差異
- 出錯時回查

```text
Version 1 → Version 2 → Version 3
    ↑           ↑
  可回查      可回查
```

**Time Travel vs Dataset Versioning 的差異**：

| 概念 | 解決的問題 | 典型工具 |
|---|---|---|
| Time Travel | 查詢資料的歷史快照（「昨天下午 3 點的資料是什麼」） | Delta Lake、Apache Iceberg |
| Dataset Versioning | 追蹤 ML 訓練用資料集的版本，確保實驗可重現（「第 3 次訓練用的是哪一份資料」） | DVC、lakeFS |

兩者解決相近但不同的問題：Time Travel 偏資料庫層的時間查詢；Dataset Versioning 偏 ML 工作流程的資料追溯。考試若出現「確保訓練可重現」應想到 Dataset Versioning；「查某時間點資料狀態」應想到 Time Travel。

記憶句：

```text
特徵要一致，資料要有版，出事能回看。
```

### Exam Rule

```text
線上與離線特徵一致 → Feature Store
歷史訓練資料 → Offline Store
即時推論低延遲查特徵 → Online Store
重現上次訓練資料 / 追蹤訓練用哪份資料 → Dataset Versioning（DVC、lakeFS）
回到某個時間點資料狀態（「查昨天資料」）→ Time Travel（Delta Lake、Iceberg）
Delta Lake / Iceberg + 版本回查 → Time Travel / Lakehouse
```

### Quick Check

題目說「推薦模型線上推論時要快速取得使用者最新特徵，訓練時又要使用大量歷史特徵」，應想到什麼？

答案：`Feature Store`，其中線上推論偏 `Online Store`，模型訓練偏 `Offline Store`。

## 8. Exam Decision Trees

### 8.1 選資料庫架構

```text
題目問資料要放哪種資料庫？
│
├─ 欄位固定、交易正確性、SQL、ACID？
│  └─ 選 RDBMS
│
├─ JSON / 半結構化 / 文件欄位彈性？
│  └─ 選 Document NoSQL
│
├─ key 快速查 value、cache、session？
│  └─ 選 Key-Value
│
├─ 超大規模、稀疏欄位、分散式寫入？
│  └─ 選 Wide-Column
│
└─ 節點、邊、路徑、社群關係？
   └─ 選 Graph Database
```

### 8.2 選工作負載與儲存布局

```text
題目問查詢型態？
│
├─ 一筆一筆交易、即時更新、正確性高？
│  ├─ 工作負載：OLTP
│  └─ 常見儲存：Row-Store
│
└─ 大量掃描、聚合、報表、歷史分析？
   ├─ 工作負載：OLAP
   └─ 常見儲存：Column-Store
```

### 8.3 選平台型態

```text
題目問數據平台？
│
├─ 多格式原始資料先保存？
│  └─ Data Lake
│
├─ 整理後結構化資料供 BI / SQL 分析？
│  └─ Data Warehouse
│
└─ 資料湖上還要 schema、ACID、版本、Time Travel？
   └─ Data Lakehouse
```

### 8.4 選儲存與格式

```text
題目問底層儲存或檔案格式？
│
├─ Hadoop、自建叢集、分散式檔案系統？
│  └─ HDFS
│
├─ S3、Blob、GCS、bucket、雲端資料湖？
│  └─ Object Storage
│
├─ 簡單表格、人眼可讀、Excel 易開？
│  └─ CSV
│
├─ 巢狀結構、API、事件資料？
│  └─ JSON
│
└─ Spark 分析、欄式格式、壓縮、只讀部分欄位？
   └─ Parquet
```

### 8.5 選訓練資料管理概念

```text
題目問模型訓練資料？
│
├─ 線上與離線特徵定義一致？
│  └─ Feature Store
│
├─ 即時推論要低延遲查最新特徵？
│  └─ Online Store
│
├─ 產生歷史訓練資料？
│  └─ Offline Store
│
├─ 知道某次訓練用了哪份資料？
│  └─ Dataset Versioning
│
└─ 回到某時間點或某版本資料狀態？
   └─ Time Travel
```

## 9. Trap Clinic

### Trap 1：RDBMS 是所有資料的最佳解

錯。RDBMS 適合欄位穩定、交易一致性高的資料，不是所有資料都該硬塞進表格。

Exam fix：

```text
固定 schema / SQL / ACID / 交易 → RDBMS
半結構化 / 關係網 / 快取 / 超大稀疏資料 → 依場景選 NoSQL
```

### Trap 2：NoSQL 就是完全不能用 SQL

錯。NoSQL 的重點是資料模型與擴充方式不同，不是單純禁止 SQL。

Exam fix：

```text
NoSQL 題目 → 先分 Document、Key-Value、Wide-Column、Graph
```

### Trap 3：看到 JSON 就選 Key-Value

錯。JSON 文件、欄位彈性、半結構化資料通常先想 Document NoSQL。

Exam fix：

```text
JSON-like document / MongoDB / find() → Document Database
key -> value / Redis / cache → Key-Value
```

### Trap 4：Wide-Column 等於 Column-Store

錯。Wide-Column 是 NoSQL 資料模型；Column-Store 是分析型儲存布局。

Exam fix：

```text
HBase / Cassandra / 稀疏欄位 → Wide-Column
OLAP / 聚合 / 只讀少數欄位 → Column-Store
```

### Trap 5：OLTP 可以拿來做大量報表分析

錯。OLTP 是高頻小量交易；大量聚合報表通常偏 OLAP。

Exam fix：

```text
下單 / 付款 / 庫存更新 → OLTP
月營收 / 趨勢 / 城市排行 → OLAP
```

### Trap 6：Column-Store 最適合高頻更新訂單

錯。Column-Store 強在大量分析與聚合，不是高頻單筆交易更新。

Exam fix：

```text
查整筆 / 更新單筆 → Row-Store
大量掃描少數欄位 → Column-Store
```

### Trap 7：Data Lake 是整理好的報表倉庫

錯。Data Lake 重點是原始、多格式資料保存；整理後報表分析較像 Data Warehouse。

Exam fix：

```text
原始多格式先收 → Data Lake
整理後 BI / SQL 報表 → Data Warehouse
```

### Trap 8：Lakehouse 只是 S3 + Parquet

錯。Lakehouse 還強調 metadata、schema、ACID、版本與時間旅行等表格治理能力。

Exam fix：

```text
Object Storage + Table Format + 版本 / Time Travel → Data Lakehouse
```

### Trap 9：S3、Azure Blob、GCS 是資料庫

錯。它們是 Object Storage，不是 RDBMS 或 NoSQL database。

Exam fix：

```text
S3 / Blob / GCS / bucket → Object Storage
```

### Trap 10：CSV 一定比 Parquet 適合分析

錯。CSV 易讀易交換，但大型分析通常 Parquet 更有優勢。

Exam fix：

```text
Excel 易開 / 簡單交換 → CSV
Spark / 欄式 / 大數據分析 → Parquet
```

### Trap 11：createOrReplaceTempView 會建立永久資料表

錯。它建立的是暫時檢視，讓 DataFrame 可以被 SQL 查詢。

Exam fix：

```text
createOrReplaceTempView() → temporary view
```

### Trap 12：Feature Store 是特徵工程演算法

錯。Feature Store 在本課是特徵資料儲存與一致性管理，不是演算法。

Exam fix：

```text
訓練與推論特徵一致 → Feature Store
```

### Trap 13：Dataset Versioning 只是檔名加 v2

錯。版本控管重點是可追溯、可比較、可回復、可重現。

Exam fix：

```text
重現某次訓練資料 / 回滾舊版本 → Dataset Versioning
```

### Trap 15：開放表格式只有 Delta Lake 和 Iceberg 兩種

錯。三大主流開放表格式是 Delta Lake、Apache Iceberg、**Apache Hudi**。Hudi（Hadoop Upserts Deletes and Incrementals）擅長 upsert 與增量處理，在 AWS 生態（EMR、Athena）常見。

Exam fix：

```text
AWS EMR / Athena + upsert / 增量處理 → 可能是 Apache Hudi
三大開放表格式 → Delta Lake、Apache Iceberg、Apache Hudi
```

### Trap 16：Time Travel 是模型訓練技巧

錯。Time Travel 是資料版本回查能力，用來重現訓練資料狀態。

Exam fix：

```text
查某時間點 / 某版本資料狀態 → Time Travel
```

## 10. Practice Questions

### 10.1 Database Architecture

**Q1.** 訂單、付款、庫存資料欄位固定，而且不能發生扣款成功但訂單遺失，最適合先想到什麼？

答案：`RDBMS`。  
理由：題目強調 schema 固定與交易一致性，對應 RDBMS 與 ACID。

**Q2.** App 事件資料欄位常不固定，有些事件有 `image_url`，有些有 `location`，較適合哪類 NoSQL？

答案：`Document NoSQL`。  
理由：半結構化、JSON-like 文件與欄位彈性是 Document Database 的典型場景。

**Q3.** 系統要用 session id 快速查使用者登入狀態，最典型是哪類資料庫？

答案：`Key-Value Database`。  
理由：題目重點是用 key 快速查 value，常見代表是 Redis。

**Q4.** IoT 平台有超大量設備資料，每列可能只有部分欄位有值，應想到哪類 NoSQL？

答案：`Wide-Column Database`。  
理由：超大規模、稀疏欄位、分散式部署常對應 HBase 或 Cassandra。

**Q5.** 推薦系統要分析使用者、商品、朋友關係之間的路徑，應想到哪類資料庫？

答案：`Graph Database`。  
理由：節點、邊、關係與路徑查詢是 Graph Database 的強項。

### 10.2 Workload and Storage

**Q6.** 「即時下單、付款、庫存扣減」屬於 OLTP 還是 OLAP？

答案：`OLTP`。  
理由：這是高頻小量、單筆交易與即時更新。

**Q7.** 「分析三年銷售資料，計算每月營收」屬於 OLTP 還是 OLAP？

答案：`OLAP`。  
理由：這是大量掃描與聚合分析。

**Q8.** 查詢某一張訂單完整內容，較適合 Row-Store 還是 Column-Store？

答案：`Row-Store`。  
理由：Row-Store 適合一次取出一整筆資料。

**Q9.** 只讀取 `city` 和 `amount` 兩欄計算各城市總銷售額，較適合哪種儲存布局？

答案：`Column-Store`。  
理由：大量資料只讀少數欄位做聚合時，Column-Store 更符合需求。

### 10.3 Storage Systems and Formats

**Q10.** Hadoop 生態系中，把大檔切成 block 分散到多個 DataNode 的系統是什麼？

答案：`HDFS`。  
理由：HDFS 是 Hadoop 分散式檔案系統。

**Q11.** 題目出現 S3、Azure Blob、GCS、bucket，應想到什麼？

答案：`Object Storage`。  
理由：這些是雲端物件儲存服務，不是資料庫。

**Q12.** API 回傳有巢狀欄位的半結構化資料，常見格式是什麼？

答案：`JSON`。  
理由：JSON 適合表達巢狀與半結構化資料。

**Q13.** Spark 大數據分析常用、欄式、壓縮效率佳的格式是什麼？

答案：`Parquet`。  
理由：Parquet 是欄式儲存格式，適合分析型查詢。

### 10.4 Data Platforms and Spark

**Q14.** 公司想先保存原始 log、影片、事件資料，以後再決定怎麼分析，較像哪種平台？

答案：`Data Lake`。  
理由：Data Lake 的重點是先保留多格式原始資料。

**Q15.** 公司要整理後的結構化資料給主管做 BI 報表，較像哪種平台？

答案：`Data Warehouse`。  
理由：Data Warehouse 強調整理後、結構化、SQL 分析與報表。

**Q16.** 公司想在資料湖上支援 schema、ACID、版本與 Time Travel，較像哪種平台？

答案：`Data Lakehouse`。  
理由：Lakehouse 結合 Data Lake 的彈性與 Warehouse 的治理能力。

**Q17.** `spark.read.parquet("s3://bucket/sales/")` 代表什麼？

答案：用 Spark 讀取 Parquet 資料。  
理由：`read.parquet()` 是讀 Parquet 的典型語法。

**Q18.** `df.write.format("delta").save("path")` 代表什麼？

答案：把 DataFrame 以 Delta 格式寫出。  
理由：`write.format("delta").save()` 是 Delta 寫出模式。

**Q19.** `createOrReplaceTempView()` 建立的是永久資料表嗎？

答案：不是。  
理由：它建立暫時檢視，讓 DataFrame 可被 SQL 查詢。

### 10.5 Training Data Management and Mixed Traps

**Q20.** 模型訓練用歷史特徵，線上推論要低延遲查最新特徵，應想到什麼？

答案：`Feature Store`。  
理由：Feature Store 管理離線訓練與線上推論特徵的一致性。

**Q21.** 要知道某次模型訓練到底用了哪一版資料，應想到什麼？

答案：`Dataset Versioning`。  
理由：資料集版本控管用於追溯、重現、比較與回滾訓練資料。

**Q22.** 要查回「上週三訓練時的資料狀態」，應想到什麼？

答案：`Time Travel`。  
理由：Time Travel 能查某時間點或某版本的資料狀態。

**Q23.** 題目說「把 Parquet 放在 S3，就一定是完整 Lakehouse」，這個說法對嗎？

答案：不對。  
理由：Lakehouse 還需要 metadata、schema、ACID、版本或 Time Travel 等治理能力。

**Q24.** 題目說「Redis 適合複雜多表 JOIN 分析」，這個說法對嗎？

答案：不對。  
理由：Redis 典型場景是快取、Session、排行榜與快速 key-value 查詢。

**Q25.** 題目說「本課模型訓練重點是訓練演算法細節」，這個說法對嗎？

答案：不對。  
理由：本課模型訓練只談資料儲存、特徵一致性、版本與回溯。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. `L22202` 是看到資料場景後，選對資料庫、儲存格式、平台型態與訓練資料管理方式。
2. 固定欄位、SQL、ACID、交易正確性，先想 `RDBMS + OLTP + Row-Store`。
3. NoSQL 要分四類：JSON 文件看 `Document`，快速 key 查值看 `Key-Value`，超大稀疏資料看 `Wide-Column`，關係路徑看 `Graph`。
4. 交易看 `OLTP`，分析看 `OLAP`；查整筆用列式，算整欄用欄式。
5. `HDFS` 是分散式檔案系統；`S3 / Blob / GCS` 是 Object Storage；`Parquet` 比 CSV 更常用於大數據分析。
6. `Data Lake` 先收原始資料，`Data Warehouse` 先整理再分析，`Data Lakehouse` 在湖上加治理、版本與時間旅行。
7. Feature Store 管特徵一致，Dataset Versioning 管資料版號，Time Travel 讓你回查某時間點資料狀態。

## Final Study Advice

不要只背名詞。考試真正想測的是你能不能從題目描述判斷：資料長相是什麼、工作負載是交易還是分析、底層儲存在哪、格式適不適合分析，以及訓練資料能不能被追溯。

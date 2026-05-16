# L22203 數據處理技術與工具 — Study Guide v2

## 0. How to Use This Guide

這份講義是考前用的，不是工具手冊。建議先讀第 1 節的大圖，再讀第 2 到第 7 節的核心概念，最後用第 8 到第 10 節練「看到題目要選什麼」。

讀法：

1. 先背流程：資料從哪裡來、在哪裡存、用什麼算、最後怎麼查。
2. 再背差異：HDFS / YARN / MapReduce、RDD / DataFrame / Dataset、ETL / ELT、GROUP BY / Window Function。
3. 最後做題：每題都問自己「題目關鍵字指向哪個概念」。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

L22203 的核心是「資料處理管線」。考試通常不是問你調參，而是問：資料怎麼存、怎麼分散處理、怎麼轉換、怎麼用 SQL 做分析。

### Everyday Analogy

把資料處理想成一間大型物流中心：貨物先進倉、分區擺放，再由系統安排人力處理，最後依需求產出報表或查詢結果。

### 在整體流程中的位置

```text
資料來源
→ 抽取與載入（ETL / ELT）
→ 分散式儲存（HDFS / Data Lake / Data Warehouse）
→ 分散式運算（MapReduce / Spark）
→ SQL 分析（JOIN / GROUP BY / Window Function）
→ 報表、監控、商業決策
```

### Key Concepts

| 題目問的是 | 想到 |
|---|---|
| block、replication、NameNode、DataNode | HDFS |
| 資源分配、排程、ResourceManager | YARN |
| Map → Shuffle and Sort → Reduce | MapReduce |
| DataFrame、DAG、Lazy Evaluation、Catalyst | Spark |
| 夜間批次、月結、歷史資料 | Batch Processing |
| 即時監控、事件持續進來 | Stream Processing / Structured Streaming |
| 先轉換再載入 | ETL |
| 先載入再轉換 | ELT |
| 保留原列做排名、累積、前後筆 | Window Function |
| 每組變一列 | GROUP BY |

### Exam Rule

```text
分散式儲存 / block / metadata → HDFS
資源管理 / 排程 / ApplicationMaster → YARN
Map / Shuffle and Sort / Reduce → MapReduce
有 schema / DataFrame / Catalyst → Spark 結構化 API
action 才真正執行 → Lazy Evaluation
先改再放 → ETL
先放再改 → ELT
列還在又加分析欄位 → Window Function
列變少、每組一列 → GROUP BY
```

### Quick Check

題目看到「每天凌晨把前一天所有訂單整批計算成報表」，最接近哪種處理？

答案：批次處理（Batch Processing）。因為資料先累積成一批，再一次運算。

## 2. Hadoop Ecosystem: HDFS, YARN, MapReduce 🔥🔥🔥

### 先懂一句話

Hadoop 要拆成三個角色記：HDFS 負責存資料，YARN 負責分配資源，MapReduce 負責批次運算。

### Everyday Analogy

像做大型分組報告：HDFS 是共享資料夾，YARN 是分配電腦與人力的總務，MapReduce 是「先分工、再彙整、最後總結」的工作流程。

### 在整體流程中的位置

```text
大資料檔案
→ HDFS 分散儲存
→ YARN 分配叢集資源
→ MapReduce 執行批次運算
→ 輸出結果
```

### Key Concepts

#### HDFS

HDFS（Hadoop Distributed File System）是 Hadoop 的分散式檔案系統。它把大檔案切成 block，分散放在多台機器，並用副本提供容錯。

| 元件 / 數字 | 作用 | 考試記法 |
|---|---|---|
| NameNode | 管 metadata，例如檔案有哪些 block、block 在哪裡 | 管目錄，不直接存每個 block 內容 |
| DataNode | 實際存放 block | 真正放資料 |
| Block 預設大小 | `128 MB` | 不是檔案大小上限 |
| Replication factor | 預設 `3` | 每個 block 通常保留三份副本 |

```text
大檔案
→ 切成 blocks
→ 分散到多台 DataNodes
→ 每個 block 複寫多份
→ 某節點壞掉仍可讀取
```

**NameNode 單點失效（SPOF）**：DataNode 容錯靠副本解決，但 NameNode 是 HDFS 的 metadata 管理節點。若未設置 High Availability（HA），NameNode 故障將導致整個 HDFS 無法存取（DataNode 還在，但沒有目錄可查）。生產環境需部署 Active/Standby NameNode（搭配 ZooKeeper）確保高可用。考試若問「HDFS 的單點故障風險」或「為何需要 HA」，答案是 NameNode SPOF。

#### YARN

YARN（Yet Another Resource Negotiator）是資源管理層，不是儲存層。

| 角色 | 工作 |
|---|---|
| ResourceManager | 全叢集資源分配 |
| NodeManager | 單一節點資源管理 |
| ApplicationMaster | 單一應用程式的協調者 |

#### MapReduce

MapReduce 是批次運算模型，三階段最常考：

```text
Input
→ Map：轉成 key-value
→ Shuffle and Sort：同 key 重分配、彙整、排序
→ Reduce：依 key 聚合輸出
```

字數統計例：

```text
輸入:
"AI 很紅"
"AI 很重要"

Map:
(AI,1), (很紅,1), (AI,1), (很重要,1)

Shuffle and Sort:
AI → [1,1]
很紅 → [1]
很重要 → [1]

Reduce:
(AI,2), (很紅,1), (很重要,1)
```

`Shuffle and Sort` 在 Map 和 Reduce 中間。講義或口訣有時簡稱 Shuffle，但選項寫 Shuffle and Sort 也是同一個中間階段。

### Exam Rule

```text
block / replication / metadata → HDFS
實際存 block → DataNode
管 metadata → NameNode
HDFS 單點故障風險 / HA / Active Standby → NameNode SPOF
資源協調 / 排程 → YARN
全域資源分配 → ResourceManager
節點資源管理 → NodeManager
單一應用協調 → ApplicationMaster
Map → Shuffle and Sort → Reduce → MapReduce
HDFS block 預設大小 → 128 MB
replication factor 預設 → 3
```

### Quick Check

題目問「Hadoop 中負責管理檔案 block 位置與 metadata 的元件」是哪一個？

答案：NameNode。因為 NameNode 管理 HDFS metadata；DataNode 才是實際存 block 的節點。

## 3. Apache Spark: Data Abstractions and Execution 🔥🔥🔥

### 先懂一句話

Spark 是大數據運算引擎，考試重點是 DataFrame、Lazy Evaluation、DAG、Catalyst Optimizer，以及它如何同時支援批次與串流思維。

### Everyday Analogy

如果 MapReduce 像手寫分工表，Spark 比較像有排程和優化功能的協作平台：你先描述想做什麼，系統再安排怎麼做比較有效率。

### 在整體流程中的位置

```text
資料來源 / HDFS / Data Lake
→ Spark 讀入資料
→ RDD / DataFrame / Dataset 表示資料
→ Transformation 建立計畫
→ Action 觸發執行
→ 結果輸出
```

### Key Concepts

#### RDD vs DataFrame vs Dataset

| 比較面向 | RDD | DataFrame | Dataset |
|---|---|---|---|
| 定位 | 低階、彈性高 | 結構化、表格式 | 結構化、強型別 |
| Schema | 不強調 | 明確 | 明確 |
| 型別安全 | 較弱 | Scala / Java 中可視為 `Dataset[Row]` | 較強 |
| 最佳化 | 不靠 Catalyst 為主 | 可被 Catalyst 最佳化 | 可被 Catalyst 最佳化 |
| 常見考點 | 底層控制 | PySpark pseudocode 主角 | Scala / Java 型別安全 |

記憶方式：

```text
想到底層控制 → RDD
想到表格式、schema、SQL、Catalyst → DataFrame
想到 Scala / Java 強型別 → Dataset
```

#### Lazy Evaluation

Spark 的 Lazy Evaluation（延遲求值）是：先記錄 transformation，遇到 action 才真正執行。

| 類型 | 常見例子 | 作用 |
|---|---|---|
| Transformation | `.filter()`、`.select()`、`.groupBy()`、`.join()` | 建立計畫，不一定立刻跑 |
| Action | `.show()`、`.count()`、`.collect()`、寫出資料 | 觸發真正執行 |

```text
df.filter(...)
  .groupBy(...)
  .agg(...)
  .select(...)
  → 先建立計畫

show() / count() / collect()
  → 才開始執行
```

#### DAG and Catalyst

DAG（Directed Acyclic Graph）是 Spark 用來表示轉換步驟相依關係的圖。Catalyst Optimizer 是 Spark SQL / DataFrame / Dataset 背後的最佳化器，會利用 schema 與查詢邏輯最佳化執行計畫。

```text
DataFrame / SQL 邏輯
→ 形成 logical plan
→ Catalyst Optimizer 最佳化
→ 產生執行計畫
```

### Concrete Example

```python
result = (
    orders_df
    .filter(F.col("status") == "paid")
    .groupBy("customer_id")
    .agg(F.sum("amount").alias("total_amount"))
    .filter(F.col("total_amount") >= 1000)
)

result.show()
```

判讀：

1. 留下已付款訂單。
2. 依 `customer_id` 分組。
3. 算每位顧客總消費。
4. 篩出總消費至少 1000 的顧客。
5. `show()` 是 action，觸發執行。

### Exam Rule

```text
低階、彈性高、控制力高 → RDD
有 schema、表格式、SQL 風格 → DataFrame
Scala / Java 強型別 → Dataset
DataFrame / SQL 最佳化 → Catalyst Optimizer
轉換先記錄、action 才執行 → Lazy Evaluation
轉換步驟相依圖 → DAG
.show() / .count() / .collect() → Action
.filter() / .groupBy() / .join() → Transformation
```

### Quick Check

題目說「Spark 的 `.filter()` 和 `.groupBy()` 先建立計畫，直到 `.count()` 才執行」，這是在描述什麼？

答案：Lazy Evaluation。因為 Spark 會延後執行 transformation，等 action 才真正運算。

## 4. Batch, Stream, and Structured Streaming 🔥🔥

### 先懂一句話

Batch 是資料先累積再整批處理；Stream 是資料持續進來就持續處理。Spark Structured Streaming 則用類似 DataFrame / SQL 的方式寫串流邏輯，考試心智常記成 micro-batch。

### Everyday Analogy

Batch 像月底一次算薪水；Stream 像 LINE 訊息一來就跳通知；Structured Streaming 像系統很快地把事件切成一小批一小批更新。

### 在整體流程中的位置

```text
歷史資料 / 固定時間累積資料 → Batch Processing → 報表、月結、統計
持續進來的事件資料 → Stream Processing → 即時監控、近即時更新
Spark 串流資料 → Structured Streaming → DataFrame / SQL 邏輯 → micro-batch 更新
```

### Key Concepts

| 比較面向 | Batch Processing | Stream Processing |
|---|---|---|
| 資料進來方式 | 先累積一批 | 持續流入 |
| 處理時機 | 固定時間或整批處理 | 近即時處理 |
| 常見場景 | 每日報表、月結、歷史資料 | 即時監控、交易事件、感測器資料 |
| 考試關鍵字 | 夜間批次、整批、歷史資料 | 持續、即時、事件流 |

Structured Streaming 重點：

- 使用體驗接近 DataFrame / SQL。
- 看到 `readStream` / `writeStream`，通常是 Spark 串流題。
- 本課請把預設心智記成 micro-batch，不是嚴格逐事件 true streaming。

#### Spark Structured Streaming vs Apache Flink

| 比較面向 | Spark Structured Streaming | Apache Flink |
|---|---|---|
| 處理模式 | micro-batch（預設） | 真正串流，逐事件處理（event-at-a-time） |
| 延遲 | 毫秒~秒級（micro-batch 邊界） | 毫秒級（native streaming，更低延遲） |
| API 風格 | DataFrame / SQL（接近批次） | DataStream API / Table API |
| 吞吐量 | micro-batch 通常吞吐量更高 | 逐事件延遲更低，適合毫秒級需求 |
| 考試記法 | readStream / writeStream + micro-batch | 真正串流 / 逐事件 / 低延遲 / Flink |

**Apache Flink** 是 2025 年生產環境主流串流引擎之一，廣泛用於 Alibaba、Uber、LinkedIn。考試若出現「真正串流（native streaming）」、「逐事件處理」、「超低延遲」，應想到 Flink；若出現「DataFrame / SQL API + 接近即時更新」，應想到 Spark Structured Streaming。

```python
stream_df = (
    spark.readStream
    .format("json")
    .load("/data/events")
)

result = stream_df.groupBy("event_type").count()
```

### Exam Rule

```text
夜間批次 / 月結 / 歷史資料整批算 → Batch Processing
即時監控 / 事件持續進來 / 近即時更新 → Stream Processing
Spark 串流且仍像 DataFrame / SQL → Structured Streaming
readStream / writeStream → Spark 串流情境
一小批一小批快速更新 → micro-batch
真正串流 / 逐事件 / 超低延遲 → Apache Flink
Flink vs Spark Structured Streaming → Flink 逐事件延遲更低；Spark micro-batch 吞吐更高
```

### Quick Check

題目看到 `readStream`、`writeStream`，並說持續更新每種事件的 count，最可能是哪個 Spark 功能？

答案：Structured Streaming。因為 `readStream` / `writeStream` 是 Spark 串流處理的典型關鍵字。

## 5. ETL, ELT, dbt, Data Warehouse, Data Lake 🔥🔥🔥

### 先懂一句話

ETL 和 ELT 的差別只看一件事：Transform 發生在 Load 前還是 Load 後。ETL 是先轉換再載入；ELT 是先載入再轉換。

### Everyday Analogy

ETL 像把履歷修好、排版好，再上傳到平台。ELT 像先把所有原始文件放進公司雲端硬碟，之後再依報表需求整理。

### 在整體流程中的位置

```text
ETL:
Source → Extract → Transform → Load → Data Warehouse

ELT:
Source → Extract → Load → Data Lake / Cloud Warehouse → Transform
```

### Key Concepts

| 比較面向 | ETL | ELT |
|---|---|---|
| 全名 | Extract, Transform, Load | Extract, Load, Transform |
| 轉換時機 | 載入前 | 載入後 |
| 轉換位置 | 目標平台外或前置層 | 目標平台內 |
| 常見脈絡 | Data Warehouse | Data Lake / Cloud Warehouse / Lakehouse |
| 常見關鍵字 | 先清理、標準化，再進倉 | 先保留 raw data，再用平台算 |

dbt（data build tool）常被定位在 Transform 層，尤其是 ELT 架構中的 `T`。它主要做資料模型轉換，不等於所有抽取工作，也不等於完整 ETL 平台。

資料倉儲（Data Warehouse）常聯想到整理好的結構化資料；資料湖（Data Lake）常聯想到先收 raw data 再整理。這是常見搭配，不是絕對規則。

### Exam Rule

```text
進倉前先清理、標準化 → ETL
先把原始資料載入平台，再用 SQL 轉換 → ELT
保留 raw data / Data Lake / Cloud Warehouse → ELT
目標端只收整理好的資料 → ETL
dbt 最接近哪一層 → Transform
dbt 在 ELT 中常對應 → T
```

### Quick Check

公司先把交易、表單、點擊紀錄全部載入雲端資料倉儲，再用 SQL 建立報表模型，這比較像 ETL 還是 ELT？

答案：ELT。因為資料是先 Load 到平台，再在平台內 Transform。

## 6. SQL Analytics: JOIN, GROUP BY, Window Function 🔥🔥🔥

### 先懂一句話

SQL 分析題先看列數：`GROUP BY` 通常讓列數變少；Window Function 通常保留原列，再加排名、累積值、前一筆或下一筆。

### Everyday Analogy

`GROUP BY` 像每組交一張總結表；Window Function 像每個人仍保留自己的成績單，但旁邊多了組內排名與累積分數。

### 在整體流程中的位置

```text
原始資料表
→ JOIN 決定哪些列接得上
→ GROUP BY 決定是否每組彙總成一列
→ Window Function 在保留原列下做排名、累積、前後筆比較
```

### Key Concepts

#### JOIN

| JOIN 類型 | 保留邏輯 |
|---|---|
| INNER JOIN | 只保留兩邊都匹配的列 |
| LEFT JOIN | 左表全部保留，右表沒有匹配時補 NULL |

#### GROUP BY vs Window Function

```text
Window Function = 不壓縮資料列的分組計算
GROUP BY = 會把資料列合併成摘要
```

| 比較面向 | GROUP BY | Window Function |
|---|---|---|
| 列數 | 通常減少 | 通常維持不變 |
| 分組方式 | 每組彙總成結果列 | 每列保留，依 partition 做計算 |
| 適合 | 每城市平均、每部門總額 | 組內排名、累積和、前後筆 |
| 關鍵字 | 每組一列、彙總 | `OVER(...)`、保留原列 |

視窗函數骨架：

```sql
函數() OVER (
    PARTITION BY ...
    ORDER BY ...
    frame clause
)
```

| 語法 | 意義 |
|---|---|
| `PARTITION BY` | 分群，但不縮列 |
| `ORDER BY` | 決定群內順序 |
| frame clause | 決定視窗範圍，例如從第一筆到目前筆 |

排名函數：

| 函數 | 並列處理 | 會不會跳號 | 例：100,100,90 |
|---|---|---|---|
| `ROW_NUMBER()` | 同分仍給不同序號 | 不適用 | 1,2,3 |
| `RANK()` | 並列同名次 | 會跳號 | 1,1,3 |
| `DENSE_RANK()` | 並列同名次 | 不跳號 | 1,1,2 |

前後筆與聚合視窗：

| 函數 | 用途 |
|---|---|
| `LAG()` | 取前一筆 |
| `LEAD()` | 取下一筆 |
| `SUM(...) OVER(...)` | 保留原列並計算累積或分組總和 |
| `AVG(...) OVER(...)` | 保留原列並計算平均 |
| `COUNT(...) OVER(...)` | 保留原列並計算筆數 |

### Concrete Example

```sql
SELECT
    customer_id,
    order_date,
    amount,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS rn,
    LAG(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS prev_amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```

判讀：

- `PARTITION BY customer_id`：每位顧客分開算。
- `ORDER BY order_date`：依訂單日期排序。
- `ROW_NUMBER()`：每位顧客各自從 1 編號。
- `LAG(amount)`：取同一顧客的前一筆金額。
- `SUM(...) OVER(...)`：保留原列，算截至目前筆的累積金額。

### Exam Rule

```text
只保留兩表都有的列 → INNER JOIN
左表全留，右表可 NULL → LEFT JOIN
每組一列 / 列數變少 → GROUP BY
保留原列並加排名、累積、前後筆 → Window Function
分群但不縮列 → PARTITION BY
群內排序 → ORDER BY inside OVER(...)
前一筆 / 下一筆 → LAG / LEAD
同分也硬排唯一序號 → ROW_NUMBER
並列會跳號 → RANK
並列不跳號 → DENSE_RANK
```

### Quick Check

分數是 `100, 100, 90`，若要並列第一名，下一名是第三名，應選哪個函數？

答案：`RANK()`。因為 `RANK()` 會保留並列名次，而且下一名會跳號。

## 7. Task / Scenario Selection 🔥🔥

### 先懂一句話

情境題不要先背工具名，要先看題目要求的輸出：是整批報表、近即時更新、分散式儲存、資源排程，還是 SQL 分析欄位。

### Everyday Analogy

像修東西前先看問題：要收納就找倉庫，要安排人力就找排程，要算報表就找運算工具，要查排名就找 SQL 分析語法。

### 在整體流程中的位置

```text
先看 scenario requirement
→ 判斷資料處理任務
→ 選儲存、運算、轉換或 SQL 工具
→ 檢查關鍵字是否吻合
```

### Key Concepts

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 大檔案分散儲存 | 大型檔案 | 分散 block 與副本 | HDFS |
| 管叢集資源與排程 | 多個作業、節點資源 | 資源分配結果 | YARN |
| 傳統大規模批次運算 | 大量歷史資料 | 聚合結果 | MapReduce |
| 現代大數據表格式分析 | DataFrame / SQL | 查詢或聚合結果 | Spark DataFrame |
| 固定時間整批報表 | 累積一批資料 | 日報、月報 | Batch Processing |
| 持續事件近即時更新 | 事件流 | 即時監控結果 | Stream Processing |
| Spark 串流分析 | 持續資料來源 | 持續更新表 | Structured Streaming |
| 進平台前先清理 | 原始資料 | 乾淨資料進倉 | ETL |
| 先載入 raw data 再轉換 | 原始資料 | 平台內模型表 | ELT / dbt |
| 每組一列摘要 | 資料表 | 彙總列 | GROUP BY |
| 每列保留又加排名 | 資料表 | 原列加排名欄 | Window Function |

### Exam Rule

```text
問「工具角色」→ 先分儲存、資源、運算、SQL
問「處理時機」→ Batch vs Stream
問「轉換順序」→ ETL vs ELT
問「SQL 列數」→ GROUP BY vs Window Function
問「Spark pseudocode」→ 看 transformation 與 action
```

### Quick Check

題目說「要保留每筆訂單，但多加一欄顯示該顧客截至當筆的累積消費」，應想到哪類 SQL 功能？

答案：Window Function。因為題目要求保留原列，並在每列加上跨列計算結果。

## 8. Exam Decision Trees 🔥🔥🔥

### 8.1 大數據工具判斷

```text
題目在問大數據工具角色？
│
├─ 問儲存、大檔案、block、副本？
│  └─ HDFS
│
├─ 問 metadata、block 位置？
│  └─ NameNode
│
├─ 問 HDFS 單點故障 / HA / Active-Standby？
│  └─ NameNode SPOF（無 HA 時整個 HDFS 不可用）
│
├─ 問實際存 block？
│  └─ DataNode
│
├─ 問資源管理、排程、叢集資源？
│  └─ YARN
│
└─ 問 Map、Shuffle and Sort、Reduce？
   └─ MapReduce
```

### 8.2 Spark 判斷

```text
題目在問 Spark？
│
├─ 低階、彈性高、控制細？
│  └─ RDD
│
├─ 表格式、有 schema、SQL 風格？
│  └─ DataFrame
│
├─ Scala / Java 強型別？
│  └─ Dataset
│
├─ 先建立計畫，action 才執行？
│  └─ Lazy Evaluation
│
├─ 轉換步驟相依圖？
│  └─ DAG
│
└─ DataFrame / SQL 最佳化？
   └─ Catalyst Optimizer
```

### 8.3 Batch vs Stream

```text
題目問資料什麼時候處理？
│
├─ 先累積、固定時間、整批、夜間、月結？
│  └─ Batch Processing
│
└─ 持續進來、即時監控、近即時更新？
   │
   ├─ Spark + readStream / writeStream？
   │  └─ Structured Streaming（micro-batch）
   │
   ├─ 真正串流 / 逐事件 / 超低延遲 / native streaming？
   │  └─ Apache Flink
   │
   └─ 一般概念題
      └─ Stream Processing
```

### 8.4 ETL vs ELT

```text
題目問資料管線順序？
│
├─ Transform 在 Load 前？
│  └─ ETL
│
├─ Transform 在 Load 後？
│  └─ ELT
│
├─ 先保留 raw data，再於平台內轉換？
│  └─ ELT
│
└─ dbt 最接近哪個角色？
   └─ Transform
```

### 8.5 SQL 判斷

```text
題目問 SQL 結果？
│
├─ 要接兩張表？
│  ├─ 只保留兩邊都有 → INNER JOIN
│  └─ 左表全部保留 → LEFT JOIN
│
├─ 每組彙總成一列、列數變少？
│  └─ GROUP BY
│
└─ 原列保留，新增排名、累積、前後筆？
   │
   ├─ 分群但不縮列 → PARTITION BY
   ├─ 前一筆 / 下一筆 → LAG / LEAD
   ├─ 同分硬排不同序號 → ROW_NUMBER
   ├─ 並列會跳號 → RANK
   └─ 並列不跳號 → DENSE_RANK
```

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：YARN 是 Hadoop 的儲存層

錯。HDFS 才是儲存層；YARN 是資源管理與排程層。

Exam fix：

```text
儲存 / block / DataNode → HDFS
資源 / 排程 / ResourceManager → YARN
```

### Trap 1b：HDFS 有副本就不需要擔心任何單點故障

錯。DataNode 容錯靠副本（Replication）解決；但 **NameNode** 是 metadata 的單點。無 HA 配置時，NameNode 故障導致整個 HDFS 無法存取。DataNode 仍在，但無法知道 block 在哪。生產環境需設置 Active/Standby NameNode。

Exam fix：

```text
HDFS 副本 → 解決 DataNode 容錯
NameNode 故障 / 無 HA → 整個 HDFS 不可用（SPOF）
生產環境 HDFS 高可用 → Active/Standby NameNode + ZooKeeper
```

### Trap 2：HDFS block 預設大小是 64 MB

錯。本課請記 `128 MB`。`64 MB` 常是舊版印象或其他教材混淆。

Exam fix：

```text
HDFS default block size → 128 MB
replication factor default → 3
```

### Trap 3：128 MB 是單一檔案大小上限

錯。128 MB 是 block 預設大小，不是檔案大小上限。大檔案會切成多個 block。

Exam fix：

```text
大檔案 → 切成多個 blocks → 分散儲存
```

### Trap 4：Shuffle and Sort 是 Reduce 之後才做

錯。Shuffle and Sort 在 Map 和 Reduce 中間。

Exam fix：

```text
Map → Shuffle and Sort → Reduce
```

### Trap 5：RDD 和 DataFrame 只是語法不同，最佳化差不多

錯。DataFrame / Dataset 有 schema 與 logical plan，較能被 Catalyst Optimizer 最佳化；RDD 較低階，不是 Catalyst 主要優化對象。

Exam fix：

```text
schema / SQL / Catalyst → DataFrame 或 Dataset
底層控制 / 彈性高 → RDD
```

### Trap 6：Spark 每寫一個 transformation 就立刻執行

錯。Spark 是 Lazy Evaluation，通常要等 action 才真正執行。

Exam fix：

```text
.filter() / .groupBy() / .select() → transformation
.show() / .count() / .collect() → action
```

### Trap 7：Structured Streaming 預設就是嚴格逐事件 true streaming

錯。本課心智請記成 micro-batch。它看起來接近即時，但常是一小批一小批處理。

Exam fix：

```text
Structured Streaming → DataFrame / SQL API + micro-batch 心智
```

### Trap 8：ETL 是先 Load 再 Transform

錯。ETL 是 Extract → Transform → Load；ELT 才是 Extract → Load → Transform。

Exam fix：

```text
ETL → 先改再放
ELT → 先放再改
```

### Trap 9：dbt 等於完整抽取工具或完整 ETL 平台

錯。dbt 更常被視為 Transform 層，尤其是 ELT 中的 `T`。

Exam fix：

```text
dbt / SQL models / transformation → Transform
```

### Trap 10：GROUP BY 和 PARTITION BY 都會讓列數變少

錯。`GROUP BY` 通常縮列；Window Function 裡的 `PARTITION BY` 是分群計算，但保留原列。

Exam fix：

```text
每組一列 → GROUP BY
保留原列分群計算 → PARTITION BY inside OVER(...)
```

### Trap 11：ROW_NUMBER、RANK、DENSE_RANK 遇到並列都一樣

錯。`ROW_NUMBER()` 會硬排唯一序號；`RANK()` 並列後跳號；`DENSE_RANK()` 並列後不跳號。

Exam fix：

```text
100,100,90
ROW_NUMBER → 1,2,3
RANK → 1,1,3
DENSE_RANK → 1,1,2
```

### Trap 11b：Spark Structured Streaming 是唯一的串流處理引擎

錯。Spark Structured Streaming 和 **Apache Flink** 都是 2025 年主流串流引擎。Flink 是真正的 native streaming（逐事件），延遲更低；Spark Structured Streaming 預設是 micro-batch，吞吐量通常更高。考試若比較兩者，記住：「真正串流 / 逐事件 → Flink；DataFrame API / micro-batch → Spark Structured Streaming。」

Exam fix：

```text
Spark Structured Streaming → micro-batch，DataFrame / SQL API
Apache Flink → 真正串流，逐事件，低延遲
```

### Trap 12：JOIN 題只看欄位名稱能不能對上

錯。JOIN 題更常考保留哪些列。`INNER JOIN` 只保留兩邊都有；`LEFT JOIN` 保留左表全部。

Exam fix：

```text
兩邊都有才留 → INNER JOIN
左表全部保留 → LEFT JOIN
```

## 10. Practice Questions

### 10.1 Hadoop and MapReduce

**Q1.** HDFS 中實際存放 block 內容的節點是什麼？

答案：DataNode。  
理由：NameNode 管 metadata，DataNode 才存實際 block。

**Q2.** HDFS 預設 block size 本課應記多少？

答案：128 MB。  
理由：本課重點數字是 block 預設 128 MB，replication factor 預設 3。

**Q3.** Hadoop 中負責資源管理與排程的是哪一層？

答案：YARN。  
理由：YARN 管叢集資源與作業協調，不是資料儲存。

**Q4.** MapReduce 的正確流程順序是什麼？

答案：Map → Shuffle and Sort → Reduce。  
理由：Shuffle and Sort 是 Map 和 Reduce 中間的重分配、分組與排序階段。

### 10.2 Spark

**Q5.** Spark 中有 schema、表格式、能被 Catalyst Optimizer 最佳化的資料抽象通常是哪個？

答案：DataFrame。  
理由：DataFrame 是結構化資料抽象，常搭配 SQL 與 Catalyst 最佳化。

**Q6.** `.filter()`、`.groupBy()` 建立計畫，直到 `.show()` 才執行，這是什麼特性？

答案：Lazy Evaluation。  
理由：Spark 會延後 transformation 的執行，等 action 才真正運算。

**Q7.** Spark 用來表示轉換步驟相依關係的圖稱為什麼？

答案：DAG。  
理由：DAG 表示資料轉換流程中的相依關係。

**Q8.** Scala / Java 中強調型別安全的 Spark 結構化 API 是什麼？

答案：Dataset。  
理由：Dataset 是強型別版本；DataFrame 在 Scala / Java 可視為 `Dataset[Row]`。

**Q9.** 下列哪個比較像 action：`.select()`、`.filter()`、`.count()`？

答案：`.count()`。  
理由：`.count()` 會觸發實際計算；`.select()` 與 `.filter()` 是 transformation。

### 10.3 Batch, Stream, ETL, ELT

**Q10.** 每天晚上整批計算當日銷售報表，屬於 batch 還是 stream？

答案：Batch Processing。  
理由：資料先累積，固定時間整批運算。

**Q11.** 即時監控網站點擊事件，資料持續進來並持續更新結果，屬於哪種處理？

答案：Stream Processing。  
理由：題目強調持續流入與近即時更新。

**Q12.** Spark 中看到 `readStream` 和 `writeStream`，最可能是什麼？

答案：Structured Streaming。  
理由：這是 Spark 串流資料來源與輸出的典型 API 關鍵字。

**Q13.** 先把資料清理和標準化，再載入資料倉儲，屬於 ETL 還是 ELT？

答案：ETL。  
理由：Transform 發生在 Load 前。

**Q14.** 先把 raw data 載入雲端資料倉儲，再用 SQL 建立模型表，屬於 ETL 還是 ELT？

答案：ELT。  
理由：Load 發生在 Transform 前。

**Q15.** dbt 在資料管線中最常被視為哪一層？

答案：Transform 層。  
理由：dbt 主要做資料模型轉換，尤其常對應 ELT 中的 `T`。

### 10.4 SQL Analytics

**Q16.** SQL 題目要求每個城市只輸出一列平均訂單金額，通常用什麼？

答案：`GROUP BY`。  
理由：每組彙總成一列，列數通常會變少。

**Q17.** SQL 題目要求保留每筆訂單，並加上顧客內的訂單序號，通常用什麼？

答案：Window Function，例如 `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)`。  
理由：視窗函數保留原列並新增分析欄位。

**Q18.** `PARTITION BY customer_id` 在視窗函數中代表什麼？

答案：依顧客分群計算，但不縮列。  
理由：`PARTITION BY` 是視窗內分群，不同於 `GROUP BY` 的彙總縮列。

**Q19.** 要取得同一顧客上一筆訂單金額，應使用哪個視窗函數？

答案：`LAG()`。  
理由：`LAG()` 取前一列；`LEAD()` 取下一列。

**Q20.** 分數為 `100, 100, 90`，`DENSE_RANK()` 的結果是什麼？

答案：`1, 1, 2`。  
理由：`DENSE_RANK()` 保留並列名次，但下一名不跳號。

### 10.5 Mixed Traps

**Q21.** 題目說「左表所有客戶都要保留，就算沒有訂單也要顯示」，應選哪種 JOIN？

答案：`LEFT JOIN`。  
理由：LEFT JOIN 保留左表全部列，右表沒有匹配時補 NULL。

**Q22.** 「DataFrame 和 Dataset 都能透過 Spark SQL 引擎形成 logical plan 並被最佳化」最接近哪個最佳化器？

答案：Catalyst Optimizer。  
理由：Catalyst 是 Spark SQL / DataFrame / Dataset 背後的查詢最佳化器。

**Q23.** 題目問「保留原始明細列，同時顯示截至目前列的累積金額」，應避免選哪個只會彙總縮列的語法？

答案：避免只選 `GROUP BY`。  
理由：這題需要保留原列，應使用 `SUM(...) OVER(...)` 這類視窗聚合。

**Q24.** 「先分、再洗、後總結」對應哪個流程？

答案：MapReduce。  
理由：口訣對應 Map → Shuffle and Sort → Reduce。

**Q25.** 如果題目問「Spark Structured Streaming 預設心智是一小批一小批更新」，答案應選什麼概念？

答案：micro-batch。  
理由：本課把 Structured Streaming 的常見執行心智記成 micro-batch，而不是嚴格 true streaming。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. Hadoop 三件事要分清楚：HDFS 存資料，YARN 管資源，MapReduce 做批次運算。
2. HDFS 必背數字是 block 預設 `128 MB`，replication factor 預設 `3`。
3. MapReduce 的順序是 `Map → Shuffle and Sort → Reduce`，中間的 shuffle 不是最後才做。
4. Spark 的 DataFrame 有 schema，能被 Catalyst 最佳化；RDD 較低階，Dataset 強調 Scala / Java 型別安全。
5. Spark 是 Lazy Evaluation：transformation 先記計畫，`show()`、`count()`、`collect()` 這類 action 才執行。
6. ETL 是先轉換再載入，ELT 是先載入再轉換；dbt 常在 Transform 層。Spark Structured Streaming 是 micro-batch；Apache Flink 是真正串流（逐事件，低延遲）。
7. SQL 先看列數：列變少多半是 `GROUP BY`，列還在又加排名、累積、前後筆多半是 Window Function。

## Final Study Advice

不要只背名詞。考試真正想測的是你能不能從題目描述判斷：這是在問儲存、資源管理、批次或串流、轉換順序，還是 SQL 分析語意。看到題目先抓關鍵字，再用 decision tree 排除錯誤選項。

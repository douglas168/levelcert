# L22201 數據收集與清理 — Study Guide v2

> 對應評鑑範圍：**L222 大數據處理技術** ＞ **L22201 數據收集與清理**

---

## 0. How to Use This Guide

這份指南先給你整體流程，再把常考概念拆成「一句話、類比、流程位置、表格、考試規則、Quick Check」。建議先讀第 1 節的大圖，再讀第 2 到第 7 節，最後用第 8 到第 11 節做考前演練。

Practice Questions 的答案直接放在題目下方；練習時可以先遮住答案，做完再看理由。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

數據收集與清理就是把「來源很多、格式很亂、品質不穩」的資料，整理成後續分析和模型可以信任的資料。考試通常不是問你背工具名稱，而是給你一個情境，要你判斷該收集、清理、去重、轉型、保護個資，還是處理串流延遲。

### Everyday Analogy

想像你開餐廳：供應商送來的食材有不同包裝、不同新鮮度，也可能缺標籤。你要先收貨、檢查、清洗、分類、去掉壞掉的，最後才能做成客人能吃的菜。

### 在整體流程中的位置

```text
資料來源
→ 數據收集
→ Bronze 原始層
→ 清理與標準化
→ Silver 清理層
→ 聚合與服務
→ Gold 應用層
```

### Key Concepts

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

### Exam Rule

```text
題目問「資料從哪裡進來」→ data collection
題目問「資料能不能用、準不準、重不重複」→ data cleaning / data quality
題目問「雲端先存原始再處理」→ ELT / Bronze-Silver-Gold
題目問「串流資料遲到或去重」→ watermark
```

### Quick Check

**Q.** 題目說「上游 API 把 `userName` 改成 `user_name`，下游管線失敗」，最可能考哪個概念？

答案：Schema Drift。因為欄位名稱或型別在上游改變，造成下游 schema 不符合預期。

---

## 2. Data Collection Methods 數據收集方法 🔥

### 先懂一句話

數據收集是資料管線的入口。不同來源有不同速度、格式和風險：API 通常定期拉資料，IoT 是即時高頻，CSV/JSON（JavaScript Object Notation，JavaScript 物件表示法）是批次匯入，爬蟲常遇到非結構化資料，Webhook 則是事件發生時由來源主動推送。

### Everyday Analogy

像收信：你可以每天去信箱拿信（API polling），也可以手機有通知就收到訊息（Webhook），或者月底收到一整箱文件（batch import）。

### 在整體流程中的位置

```text
API / IoT / CSV / Web scraping / Webhook
→ Landing Zone / Bronze
→ 清理、去重、標準化
→ Silver / Gold
```

### Key Concepts

| 收集方式 | 特性 | 典型場景 | 考試提示 |
|---|---|---|---|
| API Polling | 系統定期主動拉取，有延遲 | 天氣、匯率、社群貼文 | 「每 5 分鐘呼叫 API」 |
| Webhook | 事件發生時來源主動推送 | 金流回調、GitHub 事件 | 「不需輪詢、事件觸發」 |
| IoT Ingestion | 即時、高頻率 | 感測器、智慧工廠 | 「串流、event time」 |
| Batch Import | 週期性、量大 | 月底報表、門市訂單 | 「每天/每月匯入 CSV」 |
| Web Scraping | 非結構化、格式多變 | 電商價格、新聞文章 | 「HTML、網頁格式變動」 |
| CDC（Change Data Capture，變更資料擷取） | 透過 binlog 或 Debezium 即時擷取資料庫異動 | 訂單異動同步、即時資料管線 | 「MySQL binlog、Debezium、資料庫異動」 |

收集端常是 Schema Drift 的源頭。例如爬蟲網頁改版、API 欄位改名、CSV 新增欄位，都可能讓後續清理流程失敗。

**CDC（Change Data Capture，異動資料擷取）**：透過資料庫 binlog（如 MySQL binlog）或 Debezium 等工具，即時捕捉資料庫的新增 / 修改 / 刪除事件，是即時數據管線的主要來源之一。不同於 API Polling（定期主動拉），CDC 是事件驅動、低延遲的資料庫異動串流。

**Apache Kafka** 不只是訊息佇列，也是主要的**串流資料收集來源**，廣泛用於日誌收集、事件串流、IoT 資料擷取等場景。生產者（Producer）寫入事件，消費者（Consumer）讀取，解耦了收集端與處理端。Kafka 常與 Spark Structured Streaming 或 CDC 工具搭配，作為串流資料管線的核心中介層。

### Exam Rule

```text
定期主動拉資料 → API Polling
事件發生後由來源主動通知 → Webhook
高頻即時感測資料 → IoT / streaming ingestion
週期性大量檔案 → batch import
網頁內容、格式常變 → web scraping
資料庫 binlog / Debezium / 異動即時捕捉 → CDC
高吞吐量串流事件 / 日誌收集 / 解耦生產者消費者 → Apache Kafka
```

### Quick Check

**Q.** 金流付款成功後，金流平台主動呼叫你的系統通知交易結果，這比較像 API Polling 還是 Webhook？

答案：Webhook。因為事件發生後由來源系統主動推送，不是你的系統定期去拉。

---

## 3. Missing Values 缺值處理 🔥🔥🔥

### 先懂一句話

缺值處理是在回答：「資料少了一格，該刪掉、補固定值、補統計量，還是沿用前後資料？」考試常用 `dropna()`、`fillna()`、`ffill()`、`bfill()` 來測你是否知道何時刪、何時補。

### Everyday Analogy

像班級成績表有人沒交作業。你可以把那筆資料排除，也可以填 0，也可以用全班平均補上；如果是每天體溫紀錄，短暫缺一天時可能沿用前一天的值。

### 在整體流程中的位置

```text
收集到原始資料
→ 檢查 NULL / NaN / 空字串
→ dropna / fillna / ffill / bfill
→ 後續分析
```

### Key Concepts

| 方法 | 何時用 | pandas 3.0 寫法 | 注意事項 |
|---|---|---|---|
| `dropna()` | 缺值比例低、樣本夠多 | `df.dropna(how='any')` | `how='all'` 比較保守 |
| `fillna()` | 固定值或統計量補值 | `df['age'].fillna(df['age'].mean())` | 全域平均可能引入偏差 |
| `ffill()` | 時間序列沿用前值 | `df.ffill()` | 不要寫 `fillna(method='ffill')` |
| `bfill()` | 時間序列沿用後值 | `df.bfill()` | 不要寫 `fillna(method='bfill')` |

常見參數：

```python
df.dropna(how='any')                 # 任一欄有缺值就刪
df.dropna(how='all')                 # 全部欄位都缺值才刪
df.dropna(subset=['price'])          # 只看指定欄位
df.dropna(thresh=3)                  # 至少要有 3 個非空值

df['score'].fillna(0)                # 固定值
df['age'].fillna(df['age'].mean())   # 統計量
df.fillna({'age': 0, 'city': '未知'}) # 不同欄位不同補值

df.ffill()                           # 前向填補
df.bfill()                           # 後向填補
df.groupby('station')['temp'].ffill() # 分群後前向填補
```

分區補值比全域補值更細緻。例如身高缺值若直接用全體平均，可能讓男生偏低、女生偏高；較合理的是依性別或群組分開補。

### Exam Rule

```text
缺值少、資料量夠 → dropna
全部欄位都空才刪 → dropna(how='all')
只檢查特定欄位 → dropna(subset=[...])
至少保留 N 個非空值 → dropna(thresh=N)
固定值或平均數補值 → fillna
時間序列短暫缺值 → ffill / bfill
pandas 3.0 出現 fillna(method='ffill') → 錯，改 df.ffill()
不同群體平均不同 → groupby 後分區補值
```

### Quick Check

**Q.** IoT 溫度資料每分鐘一筆，某分鐘缺值，最常見的簡單補法是什麼？

答案：`ffill()`。因為時間序列短暫缺值常用前一筆有效觀測值補上。

---

## 4. Deduplication and Streaming Watermark 去重複與水位線 🔥🔥🔥

### 先懂一句話

去重複是把同一筆資料只保留一次。批次資料可以用 `drop_duplicates()`；串流資料如果要去重，必須搭配 watermark，否則系統要永遠記住所有 ID，狀態會無界成長。

### Everyday Analogy

像演唱會入口檢查票券。每張票都有 ticket ID，第一次看到 `A123` 就放行並記錄；如果又看到 `A123`，就判斷是重複票。問題是：如果入口永遠不關，工作人員要不要永遠記住所有票號？Watermark 就像宣布「晚上 9 點後不再接受 7 點場的遲到票」，舊票號可以清掉。沒有 watermark → 記錄本越來越厚；有 watermark → 舊 ID 可以過期清理。

### 在整體流程中的位置

```text
原始資料
→ 判斷唯一鍵 order_id / user_id / event_id
→ 批次 drop_duplicates 或串流 watermark 去重
→ 乾淨資料表
```

### Key Concepts

#### pandas 批次去重

```python
df.drop_duplicates()
df.drop_duplicates(subset=['order_id'], keep='last')
df.drop_duplicates(subset=['order_id'], keep=False)
```

| 參數 | 意思 |
|---|---|
| `keep='first'` | 保留第一筆，預設 |
| `keep='last'` | 保留最後一筆 |
| `keep=False` | 重複的全部刪掉，一筆都不留 |

#### Spark 批次與 Delta Lake

Apache Spark 是大數據運算引擎，負責「讀資料、清理、轉換、去重、寫出」。Delta Lake 是資料湖上的可靠資料表格式，負責讓資料湖支援像資料庫一樣的 `MERGE`、`UPDATE`、`DELETE`、schema 檢查與交易一致性。

```python
# Spark DataFrame 批次去重
df.dropDuplicates(['order_id'])

# Delta Lake MERGE 前，source 要先去重
deduped_source = source_df.dropDuplicates(['order_id'])
```

`MERGE INTO` 會用 source 資料去匹配 target 資料。如果 source 有重複 key，同一個 target 可能同時被多筆 source 匹配：

```text
source:
order_id = A123, status = shipped
order_id = A123, status = canceled

target:
order_id = A123
```

這時 target 的 `A123` 到底要被更新成 `shipped` 還是 `canceled`？結果不明確，就會造成非確定性更新。所以考試看到 `MERGE source` 有重複 key，先想到：「source 先去重」。

#### Spark Structured Streaming

```python
(stream_df
  .withWatermark("event_time", "2 hours")
  .dropDuplicatesWithinWatermark(["order_id"])
)
```

| 方法 | 適用場景 | 狀態大小 | 是否需要 watermark |
|---|---|---|---|
| `dropDuplicates()` | 批次 DataFrame | 批次結束就完成 | 批次不需要 |
| `dropDuplicates()` 直接用在串流 | 不建議 | 無界成長 | 會有記憶體風險 |
| `dropDuplicatesWithinWatermark()` | Structured Streaming | 有界 | 需要 |

Watermark 規則：

```text
Watermark = 目前看過的最大 event_time - threshold
超過容忍時間才到的資料 → 可能被丟棄
Watermark + 聚合 → 支援 append / update，不支援 complete
（不加 watermark 的聚合則可使用 complete 模式）
```

### Exam Rule

```text
pandas 去重 → drop_duplicates(subset=..., keep=...)
keep=False → 重複者全部刪除
Spark 批次去重 → dropDuplicates([...])
Delta MERGE source 有重複 key → 先對 source 去重
串流去重 + 記憶體爆炸 → 缺 watermark
遲到事件、event time、2 hours → withWatermark
Watermark + 聚合輸出模式 → append / update 可以，complete 不行
不加 watermark 的聚合 → complete 可以使用
```

### Quick Check

**Q.** Spark Structured Streaming 中，題目說「同一 order_id 可能重送，但系統不能記住所有歷史 ID」，應該加什麼？

答案：`withWatermark()` 搭配 `dropDuplicatesWithinWatermark()`。因為 watermark 讓狀態有時間邊界。

---

## 5. Outliers, Type Coercion, and Field Extraction 異常值、型別轉換與欄位抽取 🔥🔥

### 先懂一句話

清理不只處理缺值，也要處理極端值、錯誤型別和藏在文字裡的欄位。考試常問「薪資極端值怎麼處理」、「日期字串怎麼轉」、「log 裡的 user_id 怎麼抽」。

### Everyday Analogy

像整理客戶表單：有人薪資填成 100 億，有人把日期寫成文字，有人把地址、電話、備註全部塞在同一格。你要先把不合理值壓回範圍，再把欄位拆乾淨。

### 在整體流程中的位置

```text
缺值與重複初步清理
→ 異常值處理
→ 型別強制轉換
→ Regex / JSON 抽取結構化欄位
→ 可分析資料
```

### Key Concepts

#### 異常值處理

IQR（Interquartile Range，四分位距）fence：

```text
IQR = Q3 - Q1
下限 = Q1 - 1.5 * IQR
上限 = Q3 + 1.5 * IQR
低於下限或高於上限 → 異常值
```

Z-score：

```text
|z| > 3 → 常視為極端值
```

| 處理方式 | 意思 | 何時用 |
|---|---|---|
| Drop | 直接刪掉異常列 | 確定是錯誤資料，且資料量夠 |
| Clip | 把極端值壓到上下限 | 想保留列，但降低極端值影響 |

```python
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

df_clean = df[(df['salary'] >= lower) & (df['salary'] <= upper)]
df['salary'] = df['salary'].clip(lower=lower, upper=upper)
```

#### 型別強制轉換

```python
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d', errors='coerce')
df['price'] = pd.to_numeric(df['price'], errors='coerce')
```

`errors='coerce'` 的意思是：轉不過去的值變成 `NaN`，讓管線不中斷，後面再處理缺值。

#### Regex / JSON 欄位抽取

```python
log = "2026-01-15 ERROR user_id=U12345 msg=login_failed"

df['user_id'] = df['log'].str.extract(r'user_id=(\w+)')
df['date'] = df['log'].str.extract(r'(\d{4}-\d{2}-\d{2})')
```

本課的「特徵提取」是 **field extraction**：從原始文字、log、JSON 中抽出結構化欄位。它不是 L23301 的 sklearn 特徵工程，例如 `SelectKBest`、`FeatureUnion`、`StandardScaler`、train/validation/test split。

### Exam Rule

```text
薪資填 1 億、平均被拉高 → outlier
四分位距、Q1、Q3 → IQR fence
|z| > 3 → z-score outlier
保留資料列但限制極端值 → clip
字串轉日期或數字 → astype / to_datetime / to_numeric
轉換失敗變 NaN → errors='coerce'
從 log 抽 user_id、timestamp → regex / str.extract
本課 field extraction → 不是 sklearn feature engineering
```

### Quick Check

**Q.** 題目說「從 `2026-01-15 ERROR user_id=U12345` 取出 `U12345`」，這是本課的哪個概念？

答案：Regex 欄位抽取 / field extraction。因為是在原始文字中抽出結構化欄位。

---

## 6. Data Quality and Schema Drift 資料品質與綱要漂移 🔥🔥

### 先懂一句話

資料品質是在問「資料值不值得信任」；Schema Drift 是在問「資料結構有沒有偷偷改變」。兩者都會讓資料管線產生錯誤結果或直接中斷。

### Everyday Analogy

像通訊錄：電話不能缺、號碼要正確、同一個人在不同系統寫法要一致、資料要夠新、不能重複、格式要合法。如果某天 App 把「手機」欄改名成「行動電話」，匯入程式也會壞掉。

### 在整體流程中的位置

```text
資料進入管線
→ 檢查資料品質 6 維度
→ 偵測 schema 是否變動
→ 通過後進入 Silver / Gold
```

### Key Concepts

資料品質 6 維度口訣：**完準一時唯有效**

| 維度 | 中文 | 定義 | 違反範例 |
|---|---|---|---|
| Completeness | 完整性 | 必填欄位無缺值 | `email` 30% 是 NULL |
| Accuracy | 準確性 | 值與現實相符 | 出生年份是 `1899` |
| Consistency | 一致性 | 跨系統/欄位值一致 | A 表 `M`，B 表 `Male` |
| Timeliness | 及時性 | 資料在可用期限內 | 昨天庫存今天才到 |
| Uniqueness | 唯一性 | 無重複記錄 | 同一訂單兩筆 |
| Validity | 有效性 | 值在合法格式或範圍 | `month=13` |

Schema 是資料的欄位名稱、型別與結構。Schema Drift 是上游資料結構未預期改變，例如欄位新增、刪除、改名、型別變更。來源 guide 提醒：管線中斷常見原因之一就是 Schema Drift，比例可達 30-40%。

| 策略 | 說明 | 適用場景 |
|---|---|---|
| Schema Registry | 集中管理 schema 版本並比對 | Kafka / Confluent |
| CDC（Change Data Capture，異動資料擷取） | 監控資料庫變更 log | 資料庫來源 |
| dbt tests（data build tool tests，資料建置工具測試） | 執行前驗證欄位與型別 | ELT / Data Warehouse |
| Schema-on-Read | 讀取時才解析 | Data Lake / Parquet |
| Flexible Schema | 允許新增欄位不破壞流程 | 半結構化 JSON |

### Exam Rule

```text
必填欄位缺值 → Completeness
值與真實世界不符 → Accuracy
A 系統與 B 系統寫法不同 → Consistency
資料太晚到或過期 → Timeliness
同一筆資料重複 → Uniqueness
格式或範圍不合法 → Validity
欄位改名 / 新增 / 刪除 / 型別改變 → Schema Drift
Kafka schema 版本管理 → Schema Registry
ELT 前檢查欄位存在 → dbt tests
```

### Quick Check

**Q.** `month=13` 違反資料品質 6 維度中的哪一個？

答案：Validity（有效性）。因為月份超出合法範圍。

---

## 7. PII Protection, ETL/ELT, and Lakehouse 個資保護與架構選擇 🔥🔥🔥

### 先懂一句話

PII（Personally Identifiable Information，個人可識別資訊）處理要先判斷「能不能還原身分」；架構選擇要先判斷「清理發生在載入前還是載入後」。考試最常混淆的是假名化 vs 匿名化，以及 ETL vs ELT。

### Everyday Analogy

個資像客戶名單：遮蔽是把電話蓋掉，假名化是用代號替換但保管對照表，匿名化是連對照表也不存在。ETL/ELT 則像食材處理：ETL 是洗好再入庫，ELT 是先入庫，需要時再洗。

### 在整體流程中的位置

```text
資料收集
→ 個資識別與保護
→ ETL 或 ELT 架構選擇
→ Bronze / Silver / Gold 管理
```

### Key Concepts

#### PII 遮蔽、假名化、匿名化

| 技術 | 英文 | 可逆性 | 保留分析連結？ | 考試重點 |
|---|---|---|---|---|
| 遮蔽 | Redaction / Masking | 通常不可逆 | 通常否 | 直接刪除或蓋住敏感欄位 |
| 假名化 | Pseudonymization | 可逆，有金鑰或對照表 | 是 | 仍受 GDPR 約束 |
| 匿名化 | Anonymization | 不可逆 | 否 | 完全無法還原身分 |

無鹽值 hash 不等於真正安全匿名化，可能被彩虹表或字典攻擊還原。

常見工具方向：

| 工具 / 服務 | 用途 |
|---|---|
| Microsoft Presidio + PySpark | 大規模 PII 偵測與遮蔽 |
| Google Cloud DLP（Data Loss Prevention，資料外洩防護） | 偵測、遮蔽、驗證、釋出 |

#### ETL vs ELT

| 維度 | ETL | ELT |
|---|---|---|
| 順序 | Extract → Transform → Load（擷取 → 轉換 → 載入） | Extract → Load → Transform（擷取 → 載入 → 轉換） |
| 清理時機 | 載入前 | 載入後 |
| 適合場景 | 法規嚴格、地端、先清理才能存 | 雲端 Lakehouse、彈性分析 |
| 原始資料保留 | 通常較少 | Bronze 層保留原始 |
| Schema 彈性 | 較低 | 較高，常搭配 schema-on-read |
| 代表工具 | Informatica, SSIS | dbt, Databricks |

Lakehouse 分層：

| 層次 | 別名 | 內容 | 清理狀態 |
|---|---|---|---|
| Bronze | Raw / Landing | 原始資料，原封不動 | 未清理 |
| Silver | Cleaned / Curated | 去重、型別轉換、PII 遮蔽 | 已清理 |
| Gold | Aggregated / Serve | 商業指標、摘要表 | 已聚合 |

### Exam Rule

```text
可逆、保留對照表、Token → Pseudonymization
不可逆、完全無法還原 → Anonymization
直接蓋掉或刪掉敏感欄位 → Redaction / Masking
先清理再載入 → ETL
先載入原始資料再清理 → ELT
雲端 Lakehouse / Bronze-Silver-Gold → ELT
法規要求清理後才能存 → ETL
Bronze → 原始；Silver → 清理；Gold → 聚合服務
```

### Quick Check

**Q.** 公司把身分證字號換成可查回原身分的 token，還能跨表分析同一個人，這是匿名化還是假名化？

答案：假名化（Pseudonymization）。因為 token 可逆，而且保留分析連結。

---

## 8. Task / Scenario Selection 情境選擇 🔥🔥🔥

### 先懂一句話

情境題先看「問題發生在哪個流程」：資料還沒進來、進來後缺值、重複、格式錯、極端值、schema 改變、個資風險，或串流遲到。定位流程後，答案通常很明顯。

### Everyday Analogy

像修理水管：先判斷是水源沒來、管線堵住、濾網髒、還是水龍頭壞掉；不是看到「水有問題」就隨便換零件。

### 在整體流程中的位置

```text
先看題目場景
→ 判斷問題類型
→ 選清理方法、品質維度、架構或工具
```

### Key Concepts

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 定期取得外部資料 | API endpoint | 原始資料 | API Polling |
| 事件發生即通知 | 事件資料 | HTTP callback | Webhook |
| 時間序列缺值 | 有時間順序資料 | 補好的資料 | `ffill()` / `bfill()` |
| 大量缺值 | 缺很多的欄位或列 | 刪除或保留策略 | `dropna()` / 刪欄 |
| 重複訂單 | order_id 重複 | 唯一資料 | `drop_duplicates()` |
| 串流去重 | event stream | 有界狀態去重 | watermark + streaming dedup |
| 極端值 | 薪資、金額異常 | 刪除或截斷後資料 | IQR / z-score / clip |
| 字串日期或價格 | raw string | 正確型別 | type coercion |
| log 抽欄位 | raw log | user_id / timestamp | regex extraction |
| 欄位改名導致壞掉 | schema 變動 | 偵測與處理策略 | Schema Drift |
| 個資仍需分析連結 | PII | tokenized data | Pseudonymization |
| 雲端先存原始 | raw data | Bronze → Silver → Gold | ELT / Lakehouse |

### Exam Rule

```text
先看問題發生在「資料進來前、進來後、串流中、架構中、合規中」
再看題目關鍵字：缺值 / 重複 / 異常 / 型別 / schema / PII / ETL
最後選最小可行方法，不要跳到機器學習特徵工程
```

### Quick Check

**Q.** 題目說「先把所有原始資料存到雲端湖倉，再用 dbt 清理成分析表」，這比較像 ETL 還是 ELT？

答案：ELT。因為資料先載入，再在倉儲或湖倉內轉換清理。

---

## 9. Exam Decision Trees

### 9.1 清理方法選擇

```text
題目問資料清理？
│
├─ 有 NULL / NaN / 空值？
│  ├─ 缺值少、樣本夠 → dropna
│  ├─ 固定值或平均數補 → fillna
│  └─ 時間序列短暫缺 → ffill / bfill
│
├─ 有重複資料？
│  ├─ 批次資料 → drop_duplicates / dropDuplicates
│  └─ 串流資料 → withWatermark + dropDuplicatesWithinWatermark
│
├─ 有極端值？
│  ├─ 四分位距 → IQR fence
│  ├─ 標準差 → z-score
│  └─ 保留列但限制值 → clip
│
└─ 格式錯或欄位藏在文字？
   ├─ 字串轉日期/數字 → type coercion
   └─ log 抽 user_id → regex extraction
```

### 9.2 資料品質 6 維度

```text
題目問資料品質？
│
├─ 有沒有缺必填欄位？ → Completeness
├─ 值是否符合真實世界？ → Accuracy
├─ 跨系統是否一致？ → Consistency
├─ 資料是否即時或過期？ → Timeliness
├─ 是否重複？ → Uniqueness
└─ 格式/範圍是否合法？ → Validity
```

### 9.3 架構與合規

```text
題目問架構或個資？
│
├─ 清理在載入前？
│  └─ ETL
│
├─ 先存原始再清理？
│  └─ ELT / Lakehouse
│     └─ Bronze 原始 → Silver 清理 → Gold 聚合
│
├─ 個資可逆、保留 token？
│  └─ Pseudonymization
│
├─ 個資完全不可逆？
│  └─ Anonymization
│
└─ 欄位被蓋掉或刪掉？
   └─ Redaction / Masking
```

### 9.4 串流與 Watermark

```text
題目問 Spark Structured Streaming？
│
├─ 有遲到事件 / event_time？
│  └─ withWatermark("event_time", "2 hours")
│
├─ 需要串流去重？
│  └─ withWatermark + dropDuplicatesWithinWatermark
│
├─ 狀態無界 / 記憶體爆炸？
│  └─ 缺少 watermark
│
└─ 問輸出模式（搭配 watermark + 聚合）？
   ├─ append / update → 支援
   └─ complete → 不支援（需保留所有歷史狀態，與 watermark 衝突）
```

---

## 10. Trap Clinic

### Trap 1：`fillna(method='ffill')` 在新版 pandas 還可以用

錯。`fillna(method=...)` 在 pandas 2.1（2023 年 9 月）開始出現 FutureWarning，在 pandas 3.0（2024 年 9 月）正式移除。pandas 2.x 用戶已會看到警告，pandas 3.0 以後直接報錯。

Exam fix：

```text
看到 fillna(method='ffill') / fillna(method='bfill') → 錯
pandas 2.1 起出現 FutureWarning，3.0 正式移除
正確寫法 → df.ffill() / df.bfill()
```

### Trap 2：串流去重直接用 `dropDuplicates()` 就好

錯。串流資料如果沒有 watermark，系統需要記住所有看過的 ID，狀態無界成長，可能 OOM。

Exam fix：

```text
Structured Streaming 去重 → withWatermark + dropDuplicatesWithinWatermark
```

### Trap 3：Watermark 搭配聚合時支援 complete 輸出模式

錯。搭配 watermark 使用聚合時，`complete` 模式不支援，因為 watermark 允許丟棄舊狀態，無法保留完整歷史輸出。`append` 和 `update` 才支援。注意：不使用 watermark 的聚合則可使用 `complete` 模式。

Exam fix：

```text
Watermark + 聚合 output mode → append / update 可以；complete 不行
不加 watermark 的聚合 → complete 可以使用
```

### Trap 4：全域平均補值永遠合理

錯。不同群體分布不同時，全域平均會引入偏差。

Exam fix：

```text
男女身高、不同站點溫度、不同地區收入 → groupby 後分區補值
```

### Trap 5：假名化和匿名化都不可逆

錯。假名化可逆，匿名化不可逆。假名化資料在 GDPR 下仍是個人資料。

Exam fix：

```text
Token / 對照表 / 金鑰可還原 → Pseudonymization
完全無法還原 → Anonymization
```

### Trap 6：L22201 的特徵提取是 sklearn 特徵工程

錯。本課的特徵提取是從 log、JSON、文字抽出結構化欄位。

Exam fix：

```text
log 抽 user_id → regex field extraction
SelectKBest / StandardScaler / train-test split → L23301，不是本課
```

### Trap 7：Delta Lake `MERGE INTO` 可以直接吃重複 source

錯。source 若有重複 key，可能讓同一 target 列被多筆 source 匹配，造成非確定性更新。

Exam fix：

```text
MERGE source 有重複 key → source 先 dropDuplicates
```

### Trap 8：Schema Drift 只是資料值錯，不是結構問題

錯。Schema Drift 指欄位名稱、型別或結構改變，不是單純某個值填錯。

Exam fix：

```text
欄位改名 / 新增 / 刪除 / 型別變更 → Schema Drift
值超出範圍 → Validity
```

---

## 11. Practice Questions

### 11.1 缺值、去重、異常值

**Q1.** `dropna(how='any')` 代表什麼？

答案：任一欄位有缺值就刪除該列。
理由：`any` 表示只要有一個缺值就符合刪除條件。

**Q2.** `dropna(how='all')` 比 `how='any'` 保守還是激進？

答案：比較保守。
理由：它只有在整列所有欄位都是缺值時才刪。

**Q3.** pandas 3.0 中，前向填補應寫 `df.fillna(method='ffill')` 還是 `df.ffill()`？

答案：`df.ffill()`。
理由：pandas 3.0 已移除 `fillna(method=...)`。

**Q4.** `drop_duplicates(subset=['order_id'], keep=False)` 會保留哪一筆重複訂單？

答案：一筆都不保留。
理由：`keep=False` 代表所有重複列都刪掉。

**Q5.** IQR fence 的上限公式是什麼？

答案：`Q3 + 1.5 * IQR`。
理由：IQR fence 用 Q1/Q3 外加 1.5 倍 IQR 定義合理範圍。

**Q6.** 題目說「不想刪除極端值資料列，只想把值限制在邊界內」，應選 drop 還是 clip？

答案：clip。
理由：clip 會把極端值壓到上下限，而不是刪除列。

### 11.2 型別、欄位抽取、資料品質

**Q7.** `pd.to_datetime(..., errors='coerce')` 中 `coerce` 的效果是什麼？

答案：轉換失敗的值變成 `NaN`。
理由：這讓管線不中斷，後續再用缺值策略處理。

**Q8.** 從 log 字串抽出 `user_id` 屬於本課哪個概念？

答案：Regex / field extraction。
理由：它是從原始文字抽出結構化欄位。

**Q9.** `email` 欄位 30% 是 NULL，違反哪個資料品質維度？

答案：Completeness（完整性）。
理由：必填欄位缺值代表資料不完整。

**Q10.** A 系統用 `M/F`，B 系統用 `Male/Female`，違反哪個維度？

答案：Consistency（一致性）。
理由：不同系統對同一概念使用不同表示。

**Q11.** `month=13` 違反哪個資料品質維度？

答案：Validity（有效性）。
理由：值不在合法範圍內。

**Q12.** 同一訂單出現兩筆，違反哪個資料品質維度？

答案：Uniqueness（唯一性）。
理由：唯一性要求同一實體不要重複。

### 11.3 Schema Drift、PII、ETL/ELT

**Q13.** 上游把 `userName` 改成 `user_name`，下游查不到欄位，這是什麼？

答案：Schema Drift。
理由：欄位名稱變動是 schema 結構改變。

**Q14.** Kafka 環境中要集中管理 schema 版本，常想到什麼？

答案：Schema Registry。
理由：Schema Registry 可管理 schema 版本並偵測變動。

**Q15.** 個資換成 token，持有對照表可還原，這是什麼？

答案：Pseudonymization（假名化）。
理由：可逆且仍保留分析連結。

**Q16.** 個資處理後無論如何都不能還原身分，這是什麼？

答案：Anonymization（匿名化）。
理由：匿名化的重點是不可逆。

**Q17.** 法規要求清理完成後才能載入資料倉儲，應選 ETL 還是 ELT？

答案：ETL。
理由：ETL 是先轉換/清理，再載入。

**Q18.** 雲端 Lakehouse 先保留原始資料，再轉成 Silver、Gold，應選 ETL 還是 ELT？

答案：ELT。
理由：ELT 是先載入，再在平台內轉換。

### 11.4 Streaming and Mixed Traps

**Q19.** Structured Streaming 中去重時沒有 watermark，最大風險是什麼？

答案：狀態無界成長，可能記憶體溢出。
理由：系統不知道何時可以忘記舊 ID。

**Q20.** Watermark 搭配聚合支援哪兩種輸出模式，不支援哪一種？

答案：支援 `append`、`update`，不支援 `complete`。
理由：搭配 watermark 的聚合需要可丟棄舊狀態，`complete` 要求保留所有歷史狀態，兩者衝突。不使用 watermark 的聚合則可使用 `complete`。

**Q21.** Delta Lake `MERGE INTO` 的 source 有重複 key，應先做什麼？

答案：先對 source 去重。
理由：避免同一 target 列被多筆 source 非確定性更新。

**Q22.** 題目出現 `StandardScaler`、`SelectKBest`、train/test split，是否屬於 L22201 重點？

答案：不是。
理由：這些屬於 L23301 模型輸入工程，不是本課資料收集與清理。

**Q23.** 題目說「事件時間是 10:00，但 12:30 才進系統」，這是在問什麼？

答案：Late-arriving record / watermark。
理由：事件時間和處理時間不同，需用 watermark 管理可容忍遲到範圍。

**Q24.** `Bronze`、`Silver`、`Gold` 中，哪一層保存原始資料？

答案：Bronze。
理由：Bronze 是 raw / landing layer，保留原封不動的資料。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 數據收集先判斷來源：API polling、Webhook、IoT、batch、web scraping。
2. 缺值處理先想刪或補：`dropna` 刪、`fillna` 補固定值或統計量、時間序列用 `ffill` / `bfill`。
3. 去重複先看批次或串流：批次用 `drop_duplicates`，串流要加 watermark 才能控制狀態。
4. 異常值看 IQR 或 z-score；要保留資料列就用 clip，不一定要 drop。
5. 資料品質背「完準一時唯有效」：完整、準確、一致、及時、唯一、有效。
6. 欄位改名、新增、刪除、型別變更是 Schema Drift，不是單純資料值錯誤。
7. 假名化可逆，匿名化不可逆；ETL 先清理再載入，ELT 先載入再清理。

---

## Final Study Advice

不要只背函式名稱。考試真正想測的是你能不能從題目描述判斷：問題在收集、缺值、去重、異常值、格式、品質、schema、個資、架構，還是串流延遲。先定位流程，再選最小而正確的方法。

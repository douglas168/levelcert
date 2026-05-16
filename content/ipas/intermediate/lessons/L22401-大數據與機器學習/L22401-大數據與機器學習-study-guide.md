# L22401 大數據與機器學習 — Study Guide v2

## 0. How to Use This Guide

這份講義的讀法是：先看第 1 節的總流程，再讀 5V、訓練模式、訓練架構與並行方式，最後用決策樹、陷阱題與練習題訓練考場判斷。

本課不是要你推導機器學習公式。考試更常問的是：資料變大、變快、變雜、變髒、變貴時，訓練方式與系統架構要怎麼調整。

每一節建議照這個順序讀：

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check
```

讀到英文技術詞時，先抓中文意思與考場觸發字，再回頭看英文。例如 `Data Parallelism（資料並行）` 先記「資料太多，所以切資料」。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

使用方式：

- 讀概念時，先背「題目看到什麼 → 想到什麼」。
- 做 Quick Check 時，不要只看答案，要看理由是否能自己說出來。
- 最後用 Final Oral Recall 口頭背一遍，確認你能快速選答案。

---

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

大數據與機器學習的核心問題是：資料條件會改變模型訓練的方法。考試通常不問模型內部怎麼算，而是問資料規模、速度、型態、品質與價值如何影響訓練模式和架構選擇。

### Everyday Analogy

想像你要準備一場大型活動。人少時一個人安排就好；人變多、資訊一直更新、需求又很雜時，你就要分工、分批處理，甚至用一套協作系統管理流程。

### 先問自己一個問題

這題是在問「模型怎麼算」，還是在問「資料條件讓訓練方式怎麼改」？

### 技術說法

大數據機器學習（Big Data and Machine Learning）重點是資料的規模、速度、種類、品質與價值會改變訓練模式（training mode）、訓練架構（training architecture）與並行方式（parallelism）。

### 流程 / 選擇流程

```text
資料條件
→ 5V 痛點判斷
→ 訓練模式選擇
→ 訓練架構選擇
→ 並行方式 / 工具選擇
→ 成本效益檢查
```

### 比較表這樣讀

本課的判斷順序可以濃縮成一句話：

```text
先看 5V，再看 update，最後看架構。
```

| 題目問的是 | 想到 |
|---|---|
| 資料太大、RAM 放不下 | Volume、mini-batch、out-of-core、必要時 distributed |
| 資料持續流入、要即時更新 | Velocity、online / incremental learning、concept drift |
| 表格、JSON、文字、圖片混在一起 | Variety、schema-on-read、Data Lake、distributed preprocessing |
| 噪音、缺漏、標註錯誤 | Veracity、robustness、generalization risk |
| 蒐集成本高但效益有限 | Value、cost-benefit tradeoff |
| 每次 update 前看多少資料 | full-batch / mini-batch / online |
| 單機撐不住 | distributed training |
| 同一模型處理不同資料切片 | data parallelism |
| 模型太大需要拆到多裝置 | model parallelism |

### 記憶方式

```text
資料問題先分類：5V
更新方式看 update：全部 / 一批 / 一筆
架構選擇看單機：撐得住 / 撐不住
並行方式看切什麼：切資料 / 切模型
```

### Exam Rule

```text
問 scale / RAM / streaming / distributed → L22401 主軸
問 loss / backprop / 權重更新公式 → 多半不是本課主軸
資料痛點 → 訓練模式 → 架構 → 成本效益
```

### Quick Check

題目說「資料每天持續新增，而且模型需要反映最新趨勢」，第一個應想到哪一類訓練方式？

答案：Online / Incremental Learning。因為題目強調資料持續流入與需要持續更新。

---

## 2. Big Data 5V 對 ML 的影響 🔥🔥🔥

### 先懂一句話

5V 是判斷大數據問題的入口。它不是只在背定義，而是在幫你判斷：資料痛點到底是量太大、速度太快、格式太多、品質太差，還是成本效益不划算。

### Everyday Analogy

像整理一間倉庫。你要先知道問題是貨太多、進貨太快、貨品種類太雜、標籤亂掉，還是整理成本根本不值得，才知道要請人、分批、改流程，還是不要做。

### 先問自己一個問題

題目描述的「卡住點」是哪一種：太多、太快、太雜、太髒，還是不划算？

### 技術說法

5V 是 Big Data 的常見判斷框架：Volume（資料量）、Velocity（資料速度）、Variety（資料多樣性）、Veracity（資料真實性 / 品質）、Value（資料價值）。在 ML 題目中，5V 不是背名詞，而是用來判斷後面要選哪種訓練與系統設計。

### 流程 / 選擇流程

```text
原始資料情境
→ 5V 判斷
→ 決定訓練模式與架構
```

### 比較表這樣讀

先不要從左欄硬背。讀題時先圈出關鍵字，再回來對到是哪一個 V。

| 5V | 白話意思 | 對 ML 的影響 | 考場關鍵字 |
|---|---|---|---|
| Volume（量） | 資料量很大 | RAM、I/O、訓練時間成為瓶頸 | 裝不進記憶體、數十億筆、單機太慢 |
| Velocity（速） | 資料快速產生或持續流入 | 需要持續更新，可能有 concept drift | stream、即時、每秒、持續追加 |
| Variety（多樣） | 資料格式與來源很多 | 前處理、特徵整合、pipeline 變複雜 | CSV + JSON + 文字 + 圖片、Data Lake |
| Veracity（真實性） | 資料品質不穩 | 模型可能學到錯誤規律，泛化變差 | 缺漏值、噪音、標註錯誤 |
| Value（價值） | 資料是否值得處理 | 評估 ROI，不一定越多越好 | 蒐集昂貴、效益有限、成本效益 |

#### Volume（量）

Volume 大時，不要只回答「資料很多」。真正考點是資料可能無法一次載入 RAM，需要 mini-batch、out-of-core learning，或在單機仍撐不住時使用 distributed training。

Out-of-core Learning（磁碟外學習）是指資料放不進記憶體，所以邊從磁碟讀取、邊分批訓練。

#### Velocity（速）

Velocity 高時，資料不是一次給你一包，而是一直進來。這會引出 Streaming Data、Online / Incremental Learning，以及 Concept Drift（概念漂移）。

Concept Drift 是資料規律隨時間改變，舊模型可能逐漸失準。若只是輸入分布改變，較接近 Data Drift / Covariate Shift；考試常用廣義說法，但遇到對比選項要會分辨。

#### Variety（多樣）

Variety 高時，難點常在資料前處理，不一定在模型本身。例如交易表、商品描述、客服文字與圖片都要進同一條 pipeline。

Schema-on-read（讀時定義結構）是先把資料放進彈性儲存環境，等分析或訓練時再決定如何解析欄位。

#### Veracity（真實性）

Veracity 差時，資料量再大也可能不可靠。噪音、缺漏值、異常值與標註錯誤會讓模型學到錯誤規律，降低 generalization（泛化）能力。

#### Value（價值）

Value 要問的是值不值得。更多資料會帶來蒐集、清理、儲存、運算與維護成本；如果模型提升有限，就不一定該上更重的架構。

### 記憶方式

```text
Volume = 貨太多
Velocity = 貨一直進來
Variety = 貨的種類太雜
Veracity = 貨的標籤不可信
Value = 整理這些貨到底值不值
```

### Exam Rule

```text
裝不進 RAM / 訓練太久 → Volume
即時 / stream / 每秒流入 → Velocity
多來源多格式 / Data Lake → Variety
缺漏 / 噪音 / 標註錯誤 → Veracity
ROI / 成本高但效益有限 → Value
```

> **框架版本注意**：部分教材（IBM、ITRI）使用 6V 或 7V 框架，加入 Visualization 或 Variability 等維度。考試以題目所使用的框架為準；IPAS 中級考題最常見的仍是 5V。

### Quick Check

題目說「公司新增昂貴資料來源，但模型準確率只提升一點點」，最像哪一個 V？

答案：Value。因為題目重點是成本效益，而不是資料量或速度。

---

## 3. 訓練模式：Full-batch、Mini-batch、Online 🔥🔥🔥

### 先懂一句話

訓練模式看的是「每次更新模型前，模型吃多少資料」。考試判斷時，不要被程式裡的 `epoch` 或 `for` 迷惑，要看 update 前用的是全部資料、一批資料，還是一筆或一小段新資料。

### Everyday Analogy

像開會做決策。Full-batch 是等所有資料都到齊才開會；mini-batch 是每收到一箱資料就處理一次；online 是資料一來就立刻調整。

### 先問自己一個問題

每次模型更新（update）之前，它到底看了多少資料？

### 技術說法

訓練模式（training mode）描述資料如何被餵進模型並觸發更新。Full-batch Training（全批次訓練）每次看全部資料；Mini-batch Training（小批次訓練）每次看一批；Online / Incremental Learning（線上 / 增量學習）會隨新資料持續更新。

### 流程 / 選擇流程

```text
5V 痛點
→ 資料到達方式 / 記憶體限制
→ Full-batch / Mini-batch / Online
→ Centralized 或 Distributed
```

### 比較表這樣讀

這張表只看一個軸：`update 前吃多少資料`。

| 訓練模式 | 每次 update 前看什麼 | 適合情境 | 主要風險 |
|---|---|---|---|
| Full-batch Training（全批次訓練） | 完整訓練資料 | 小型、靜態、可完整處理的資料 | 最吃記憶體，更新慢 |
| Mini-batch Training（小批次訓練） | 固定大小的一批資料 | 大型但可分批處理的資料 | 仍要設計批次與抽樣 |
| Online / Incremental Learning（線上 / 增量學習） | 一筆或一小段新資料 | 串流資料、需要持續更新 | 更新噪音較高，流程管理較複雜 |

#### Full-batch Training

Full-batch Training 是每次更新前都看完整份資料。它適合資料量小、靜態、記憶體足夠的情境。

```text
[全部資料] → [計算一次更新] → [下一輪再看全部資料]
```

#### Mini-batch Training

Mini-batch Training 是把資料切成固定大小的批次（batch size），每次只用一批更新模型。它是 full-batch 與 online 之間的折衷，也是在大資料但不是純串流時最常見的答案。

```text
N 筆資料
|-- Batch 1 --|-- Batch 2 --|-- Batch 3 --|
     update        update        update
```

Mini-batch SGD 是 mini-batch training 搭配 SGD 優化器；本課重點不是推導梯度，而是判斷資料餵入方式。

#### Online / Incremental Learning

Online Learning 常指一筆資料來就更新；Incremental Learning 可指一小段資料累積後更新。IPAS 題目常把兩者視為同類，重點是資料持續流入、模型持續更新。

```text
sample 1 → update
sample 2 → update
sample 3 → update
...
```

注意：Online Learning 不是 Online Serving。前者是模型持續學習，後者是模型部署後提供線上預測服務。

### 記憶方式

```text
Full-batch = 等全班作業都交齊再改一次
Mini-batch = 每收一疊作業就改一次
Online = 學生一交來就立刻改一次
```

### Exam Rule

```text
資料可完整載入 / 每次看全部資料 → Full-batch
batch size / shuffle / make_batches / RAM 不夠一次吞 → Mini-batch
stream / 逐筆到來 / 即時更新 / concept drift → Online / Incremental
有 epoch 不等於 full-batch；看每次 update 前吃多少資料
```

### Quick Check

題目程式有 `for batch in make_batches(shuffled, batch_size)`，每個 batch 都更新一次模型。這是什麼訓練模式？

答案：Mini-batch Training。因為每次更新前只使用固定大小的一批資料。

---

## 4. 訓練架構：Centralized vs Distributed 🔥🔥

### 先懂一句話

Centralized Training 是單機或單節點訓練；Distributed Training 是多機、多節點或多裝置協作訓練。考試重點不是哪個比較高級，而是單機是否已經無法在合理時間與成本內完成。

### Everyday Analogy

像做分組報告。資料少時一個人整理最快；資料太多或期限太短時才需要多人分工，但多人分工會增加溝通與同步成本。

### 先問自己一個問題

單機能不能在合理時間、合理成本內完成訓練？

### 技術說法

訓練架構（training architecture）是在問訓練工作放在哪裡做。Centralized Training（集中式訓練）把訓練放在單機或單節點；Distributed Training（分散式訓練）用多機、多節點或多裝置協作。

### 流程 / 選擇流程

```text
選完訓練模式
→ 檢查單機 RAM / I/O / compute / 時間
→ Centralized 或 Distributed
```

### 比較表這樣讀

這張表不是在背「distributed 比較強」，而是在判斷「單機是否已經不夠」。

| 架構 | 定義 | 優點 | 限制 | 考場快判 |
|---|---|---|---|---|
| Centralized Training（集中式訓練） | 單機或單節點完成訓練 | 架構簡單、除錯容易 | 受 RAM、I/O、CPU/GPU 限制 | 單機可完成、簡單優先 |
| Distributed Training（分散式訓練） | 多機、多節點或多裝置共同訓練 | 可擴展資料量、速度或模型大小 | 架構複雜，有通訊與同步成本 | 單機 RAM 不足、訓練太慢、模型太大 |

分散式訓練常見 trigger：

- 單機 RAM 放不下資料或中間表示。
- 單機訓練時間不符合需求。
- 前處理本身就是大規模分散式資料處理。
- 模型大到單一裝置放不下。

但是 Volume 大不代表一定要 distributed。如果 mini-batch 或 out-of-core 在單機可合理完成，集中式仍可能更適合。

### 記憶方式

```text
Centralized = 一個人做完，溝通成本最低
Distributed = 多人分工，能處理更大任務，但要付同步成本
```

### Exam Rule

```text
單機能在合理成本內完成 → Centralized
單機 RAM / 時間 / 模型容量不足 → Distributed
Big data → 先問單機撐不撐，不是直接選 distributed
```

### Quick Check

題目說資料量很大，但可用 mini-batch 在單機合理時間內完成。是否一定要分散式訓練？

答案：不一定。分散式訓練的 trigger 是單機資源或時間真的不夠，而不是只要資料大就必選。

---

## 5. 並行方式：Data Parallelism vs Model Parallelism 🔥🔥🔥

### 先懂一句話

Data Parallelism 是「資料太多，所以切資料」；Model Parallelism 是「模型太大，所以切模型」。考試最常混淆的是：看到 big data 就誤選 model parallelism。

### Everyday Analogy

Data parallelism 像同一份報告模板發給多個人，每人整理不同資料段落。Model parallelism 像報告檔案太大，一台電腦打不開，只好把不同章節放在不同電腦處理。

### 先問自己一個問題

需要切開的是「資料」，還是「模型本身」？

### 技術說法

並行方式（parallelism）是在 distributed training 裡決定工作怎麼分。Data Parallelism（資料並行）讓多個 worker 處理不同資料切片；Model Parallelism（模型並行）把模型不同部分放到不同裝置或節點。

### 流程 / 選擇流程

```text
Distributed Training
→ 判斷是資料太多還是模型太大
→ Data Parallelism 或 Model Parallelism
```

### 比較表這樣讀

只要抓住「切分對象」這一欄，大多數題目就能排除錯誤選項。

| 概念 | 切分對象 | Worker 持有什麼 | 主要 trigger | 常見線索 |
|---|---|---|---|---|
| Data Parallelism（資料並行） | 資料切片 | 通常持有同一份模型副本 | 資料量大、想加速 | 同一模型、不同 data shard、聚合梯度 |
| Model Parallelism（模型並行） | 模型切片 | 只持有模型的一部分 | 模型太大、單裝置放不下 | 模型切成不同區塊、跨裝置串接 |

Data Parallelism 常見流程：

```text
資料切成 shard
→ 多個 worker 各自用同一模型副本計算
→ 聚合梯度或參數
→ 更新模型
```

Model Parallelism 常見流程：

```text
Input
→ Model Part A on Device 1
→ Model Part B on Device 2
→ Output
```

### 記憶方式

```text
Data Parallelism = 切資料，同一模型做很多份資料
Model Parallelism = 切模型，一個模型拆成很多段
```

### Exam Rule

```text
同一模型 + 不同資料 shard + 聚合梯度 → Data Parallelism
模型太大 + 單卡或單裝置放不下 → Model Parallelism
資料很多但模型普通 → 優先想到 Data Parallelism，不是 Model Parallelism
```

### Quick Check

題目說「每個 worker 都有同一個模型副本，但處理不同資料切片，最後同步梯度」，這是哪一種並行？

答案：Data Parallelism。因為切分的是資料，不是模型本體。

---

## 6. Task / Scenario Selection：考場情境選型 🔥🔥🔥

### 先懂一句話

情境題要先看資料條件，再選方法。不要從名詞出發，要從題目描述的痛點出發。

### Everyday Analogy

像選交通工具。你不會先決定一定要搭高鐵，而是先看距離、時間、預算、行李量與目的地，再選車、火車或飛機。

### 先問自己一個問題

題目給我的線索是資料痛點、更新方式、單機限制，還是並行切分方式？

### 技術說法

情境選型（scenario selection）是把題目描述轉成方法選擇：先辨認 5V 痛點，再選 training mode，最後選 centralized / distributed 與 parallelism。

### 流程 / 選擇流程

```text
先看輸入資料與限制
→ 判斷 5V 痛點
→ 選訓練模式
→ 選架構 / 並行方式 / 工具
```

### 比較表這樣讀

先讀「輸入」欄和「常見答案」欄。輸出欄只是幫你確認這題是在問訓練、前處理，還是導入決策。

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 大型靜態資料，RAM 不足 | 很大但固定的資料集 | 分批完成訓練 | Mini-batch / Out-of-core |
| 串流交易，每秒新增 | 持續流入資料 | 持續更新模型 | Online / Incremental Learning |
| 多來源資料整合 | 表格、JSON、文字、圖片 | 可訓練特徵 pipeline | Variety、Data Lake、Schema-on-read、Spark |
| 單機訓練太慢 | 大資料或高吞吐需求 | 多節點共同處理 | Distributed Training |
| 同模型處理不同資料 shard | 切分後的資料 | 聚合後的新模型 | Data Parallelism |
| 模型本體太大 | 超大模型 | 跨裝置執行模型 | Model Parallelism |
| 資料品質不穩 | 噪音、缺漏、標註錯誤 | 較穩的泛化表現 | 清理資料、robust 方法、regularization |
| 新資料昂貴但提升有限 | 高成本資料來源 | 是否導入決策 | Value / Cost-benefit tradeoff |

程式判讀口訣：

```text
load_all_data + compute_on(dataset) → Full-batch
shuffle + make_batches + batch_size → Mini-batch
for sample in stream + update → Online
```

### 記憶方式

```text
看到 RAM 放不下 → 先想分批
看到 stream → 先想 online / incremental
看到多格式 → 先想 variety / preprocessing
看到單機太慢 → 先想 distributed
看到同模型不同資料 → 先想 data parallelism
看到模型太大 → 先想 model parallelism
```

### Exam Rule

```text
先看輸出形式 / scenario requirement
→ 判斷資料痛點
→ 選訓練模式
→ 選架構、並行方式或工具
```

### Quick Check

題目說「資料來自交易表、商品 JSON、客服文字與商品圖片，前處理耗時很長」，主要考哪個 5V？

答案：Variety。因為題目重點是資料來源與格式多樣，前處理 pipeline 變複雜。

---

## 7. Distributed ML Tools and Scalability Topics 🔥🔥

### 先懂一句話

本課提到工具時，通常不是要背版本或 API，而是要知道它代表哪一種系統能力。Spark MLlib 代表的是大數據情境下，把分散式資料處理與機器學習 pipeline 接在一起。

### Everyday Analogy

像大型活動不是只找一位主持人，而是需要報名、場地、分組、流程、紀錄與回饋都能串起來的一整套系統。

### 先問自己一個問題

這個名詞是在解決資料前處理、模型訓練同步，還是可擴展性問題？

### 技術說法

工具與架構名詞在本課通常代表系統能力。Spark MLlib 偏分散式資料處理與 ML pipeline；Parameter Server 和 AllReduce / Ring-AllReduce 偏分散式訓練中的參數或梯度同步。

### 流程 / 選擇流程

```text
Variety / Volume 造成資料處理瓶頸
→ Distributed preprocessing
→ Distributed ML pipeline
→ Spark MLlib 等框架

Distributed training 需要同步參數 / 梯度
→ Parameter Server 或 AllReduce / Ring-AllReduce
```

### 比較表這樣讀

先把工具分成兩類：`資料 pipeline 工具` 與 `訓練同步架構`。

#### Spark MLlib

Spark MLlib 是 Apache Spark 生態中的機器學習函式庫，可視為分散式資料處理與分散式機器學習的代表。考試重點是：

- 能在 cluster 上處理大規模資料。
- 能把資料前處理與 ML pipeline 串起來。
- 適合大數據情境下的分散式工作流。

#### Parameter Server

Parameter Server 架構會有專門節點管理模型參數。Workers 計算梯度後 push 給 Parameter Server，Parameter Server 聚合並更新，再讓 workers pull 新參數。

```text
Workers compute gradients
→ Push to Parameter Server
→ Aggregate / update parameters
→ Pull updated parameters
```

它屬於 data parallelism 常見架構，但中央節點可能成為瓶頸。

#### AllReduce / Ring-AllReduce

AllReduce 不依賴單一 Parameter Server，而是讓 workers 彼此交換與聚合梯度。**AllReduce 是分散式訓練中同步梯度的操作（抽象概念）；Ring-AllReduce 是 AllReduce 的一種高效實作，以環狀方式傳遞與聚合，由 NCCL / Horovod 廣泛採用。** 兩者不是同義詞，但在多數情境下 Ring-AllReduce 就是常見的 AllReduce 實作。

```text
每個 worker：
同一模型副本 + 不同資料 shard + 彼此聚合梯度
```

#### Scalability 相關資料問題

| 問題 | 為什麼重要 | 考場提醒 |
|---|---|---|
| High-dimensional Data（高維資料） | 特徵欄位多，記憶體與計算成本上升 | 可擴展到大樣本不代表對高維穩 |
| Sparse Data（稀疏資料） | 大量欄位多數為 0，表示與計算要小心 | 常見於 one-hot 或大量商品/文字特徵 |
| Imbalanced Data（不平衡資料） | 少數類可能在 mini-batch 中常被抽不到 | Accuracy 可能誤導，需看 precision / recall |
| Distributed Preprocessing | 瓶頸可能在模型前的清理、join、解析 | Data Lake、Spark、pipeline 是線索 |

### 記憶方式

```text
Spark MLlib = 大資料 pipeline 接 ML
Parameter Server = 梯度先送中央櫃台
AllReduce = workers 彼此對帳
高維 / 稀疏 / 不平衡 = 資料大之外，還有資料形狀問題
```

### Exam Rule

```text
Spark MLlib → 分散式資料處理 + ML pipeline
Parameter Server → 中央參數節點聚合 workers 梯度
AllReduce / Ring-AllReduce → workers 彼此聚合，避免單一中央瓶頸
高維 / 稀疏 / 不平衡 → 大資料不等於自然好訓練
```

### Quick Check

題目說「多個 worker 不透過單一中央伺服器，而是彼此交換並聚合梯度」，最像哪個架構？

答案：AllReduce / Ring-AllReduce。因為它的重點是 workers 之間互相聚合，而不是集中到 Parameter Server。

---

## 8. Exam Decision Trees 🔥🔥🔥

### 8.1 先判斷 5V

```text
題目在描述資料問題？
│
├─ 資料量大、RAM 放不下、訓練太久？
│  └─ Volume
│
├─ 資料持續流入、即時、每秒更新？
│  └─ Velocity
│
├─ 來源多、格式多、Data Lake、schema-on-read？
│  └─ Variety
│
├─ 缺漏、噪音、標註錯誤、可信度低？
│  └─ Veracity
│
└─ 蒐集成本高、效益有限、ROI？
   └─ Value
```

### 8.2 再選訓練模式

```text
題目問資料怎麼餵進模型？
│
├─ 每次 update 前看完整資料？
│  └─ Full-batch Training
│
├─ 每次 update 前看固定大小一批資料？
│  └─ Mini-batch Training
│
└─ 資料一筆一筆或一小段一小段持續來？
   └─ Online / Incremental Learning
```

### 8.3 再選架構與並行方式

```text
單機能否合理完成？
│
├─ 可以
│  └─ Centralized Training
│
└─ 不可以
   └─ Distributed Training
      │
      ├─ 主要是資料太多？
      │  └─ Data Parallelism
      │     ├─ 中央參數節點 → Parameter Server
      │     └─ workers 彼此聚合 → AllReduce / Ring-AllReduce
      │
      └─ 主要是模型太大？
         └─ Model Parallelism
```

### 8.4 排除超出本章的選項

```text
題目開始問：
│
├─ loss function 數學推導？
├─ backpropagation 內部公式？
├─ prediction 怎麼算？
└─ federated learning 隱私機制？

→ 小心，這些通常不是 L22401 的主軸
```

---

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：Big data 一定要 distributed training

錯。Big data 只代表資料條件可能造成瓶頸，不代表一定要多機。

Exam fix：

```text
資料大但單機可用 mini-batch / out-of-core 合理完成 → 不一定 distributed
單機 RAM / 時間 / 模型容量不足 → 才考慮 distributed
```

### Trap 2：Online Learning 就是 Online Serving

錯。Online Learning 是模型隨新資料持續更新；Online Serving 是模型部署後提供線上預測。

Exam fix：

```text
持續學習 / stream update → Online Learning
即時提供預測服務 → Online Serving
```

### Trap 3：看到 epoch 就選 Full-batch

錯。Mini-batch training 也常有 epoch 外層迴圈。

Exam fix：

```text
判斷訓練模式 → 看每次 update 前吃多少資料
不是看變數名稱是不是 epoch
```

### Trap 4：資料很多就選 Model Parallelism

錯。資料很多通常先想到 Data Parallelism；Model Parallelism 的 trigger 是模型本體太大。

Exam fix：

```text
資料太多 → Data Parallelism
模型太大放不下單裝置 → Model Parallelism
```

### Trap 5：資料越多，模型一定越準

錯。若 Veracity 差，更多資料可能只是更多噪音與錯誤標註。

Exam fix：

```text
噪音 / 缺漏 / label error → Veracity 問題
資料多但品質差 → 不保證 generalization 變好
```

### Trap 6：Distributed Training 等於 Federated Learning

錯。Distributed Training 重點是擴展計算與訓練能力；Federated Learning 更強調資料不出域與隱私保護，偏 L22404。

Exam fix：

```text
多節點協作、提升訓練能力 → Distributed Training
資料不出裝置、隱私保護 → Federated Learning
```

### Trap 7：Accuracy 高就代表不平衡資料處理得好

錯。不平衡資料中，全部預測成多數類也可能有高 accuracy。

Exam fix：

```text
Class imbalance → 小心 accuracy 誤導
少數類表現 → 看 precision / recall，或考慮 class weighting / resampling
```

### Trap 8：Variety 只是欄位多一點

錯。Variety 常指資料來源與格式不同，真正難點可能是前處理 pipeline。

Exam fix：

```text
表格 + JSON + 文字 + 圖片 → Variety
Data Lake / schema-on-read / distributed preprocessing → Variety 相關選項
```

---

## 10. Practice Questions

### 10.1 5V 判斷

**Q1.** 題目說資料量大到無法一次載入 RAM，應先想到哪個 V？

答案：Volume。
理由：Volume 關心資料量造成的記憶體、I/O 與訓練時間瓶頸。

**Q2.** 題目說感測器資料每秒持續流入，模型需要快速反映最新狀態，應想到哪個 V？

答案：Velocity。
理由：Velocity 關心資料產生與到達速度，常引出 online / incremental learning。

**Q3.** 題目說資料來自 CSV、JSON、文字紀錄與圖片，最像哪個 V？

答案：Variety。
理由：Variety 關心資料來源與格式多樣，會增加前處理與特徵整合成本。

**Q4.** 題目說資料中有大量缺漏值與標註錯誤，最像哪個 V？

答案：Veracity。
理由：Veracity 關心資料可信度與品質。

**Q5.** 題目說新增資料來源很昂貴，但模型提升有限，最像哪個 V？

答案：Value。
理由：Value 關心資料帶來的商業效益是否值得成本。

### 10.2 訓練模式

**Q6.** 每次模型更新前都使用完整訓練資料集，這是哪種訓練？

答案：Full-batch Training。
理由：Full-batch 的關鍵是每次 update 前看全部資料。

**Q7.** 程式先 `shuffle(dataset)`，再用 `make_batches(..., batch_size)` 分批更新，這是哪種訓練？

答案：Mini-batch Training。
理由：它每次 update 前只使用固定大小的一批資料。

**Q8.** 資料從 stream 一筆一筆進來，每來一筆就更新模型，這是哪種訓練？

答案：Online Learning。
理由：Online Learning 的核心是新資料持續到來且模型持續更新。

**Q9.** 有 `epoch` 外層迴圈就一定是 full-batch 嗎？

答案：不是。
理由：Mini-batch 也常有 epoch；要看每次 update 前吃多少資料。

**Q10.** 資料很大但不是即時串流，而且可分批離線訓練，通常先想到什麼？

答案：Mini-batch / Out-of-core。
理由：這是大型靜態資料常見的記憶體與效率折衷。

### 10.3 架構與並行

**Q11.** 單機 RAM 足夠、訓練時間可接受，架構簡單優先，應選 centralized 還是 distributed？

答案：Centralized Training。
理由：單機可合理完成時，集中式通常更簡單。

**Q12.** 單機訓練時間太久，且需要多節點共同訓練，應選什麼？

答案：Distributed Training。
理由：分散式訓練用來擴展資料處理、訓練速度或模型容量。

**Q13.** 每個 worker 有同一模型副本，但處理不同 data shard，這是哪種並行？

答案：Data Parallelism。
理由：切分的是資料，每個 worker 處理不同資料切片。

**Q14.** 模型本身大到單一 GPU 放不下，需要拆成不同區塊放到不同裝置，這是哪種並行？

答案：Model Parallelism。
理由：切分的是模型本體。

**Q15.** Workers 把梯度送到中央節點，由中央節點聚合並更新參數，這是哪種架構？

答案：Parameter Server。
理由：Parameter Server 的特徵是有中央參數節點管理與聚合。

**Q16.** 多個 workers 不依賴單一中央參數伺服器，而是彼此交換並聚合梯度，這是哪種架構？

答案：AllReduce / Ring-AllReduce。
理由：AllReduce 的特徵是 workers 之間共同完成聚合。

### 10.4 Tools and Scalability

**Q17.** Spark MLlib 在本課代表什麼概念？

答案：分散式資料處理與機器學習 pipeline。
理由：考試通常不問版本，而是問它適合大數據情境下的分散式工作流。

**Q18.** 題目說資料特徵維度很高且多數欄位為 0，這在大數據 ML 中會造成什麼問題？

答案：記憶體與計算成本上升，表示方式需要小心。
理由：高維與稀疏資料會影響可擴展性，不代表資料多就自然好訓練。

**Q19.** 題目說少數類樣本很少，mini-batch 常抽不到少數類，應注意什麼？

答案：Class imbalance 與 accuracy 誤導。
理由：不平衡資料中，模型可能偏向多數類，需看 precision / recall 或調整抽樣與權重。

**Q20.** 題目說瓶頸主要在 JSON 解析、文字清理、多來源 join，而不是模型本身，這通常在考什麼？

答案：Distributed preprocessing / Variety。
理由：多來源多格式資料的前處理常是主要瓶頸。

### 10.5 Mixed Traps

**Q21.** Big data 一定要用 distributed training 嗎？

答案：不一定。
理由：要先看單機是否能用 mini-batch、out-of-core 在合理時間內完成。

**Q22.** Online Learning 和 Online Serving 是否相同？

答案：不同。
理由：Online Learning 是持續更新模型；Online Serving 是部署模型提供線上預測。

**Q23.** 題目強調資料不出裝置、隱私保護、跨端協作，這還是本課分散式訓練主軸嗎？

答案：不完全是，這更偏 Federated Learning。
理由：Federated Learning 的核心是資料不出域與隱私，本課只需避免和 distributed training 混淆。

**Q24.** 資料量爆大但模型普通，只是想加速不同資料切片的訓練，應優先選 data parallelism 還是 model parallelism？

答案：Data Parallelism。
理由：主要問題是資料多，不是模型大到放不下。

**Q25.** 若題目開始問 loss function 推導或 backpropagation 公式，是否仍是 L22401 的主考點？

答案：通常不是。
理由：L22401 重點是大數據條件如何影響 ML 訓練模式與架構，不深入模型內部推導。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. L22401 的核心是從資料條件看機器學習，不是推導模型公式。
2. 先判斷 5V：Volume 看規模，Velocity 看速度，Variety 看格式多樣，Veracity 看品質，Value 看值不值得。
3. 訓練模式看每次 update 前吃多少資料：全部是 full-batch，一批是 mini-batch，一筆或小段串流是 online / incremental。
4. Big data 不一定要 distributed；要先問單機 RAM、時間與模型容量是否撐得住。
5. 資料太多通常先想 data parallelism，模型太大才想 model parallelism。
6. Parameter Server 和 AllReduce 都常出現在資料並行情境，只是同步方式不同。
7. 考情境題時，先看資料痛點，再選訓練模式，最後選架構與工具。

---

## Final Study Advice

不要只背名詞。考試真正想測的是你能不能從題目描述判斷：資料痛點是哪個 5V、每次更新吃多少資料、單機是否撐得住，以及該選集中式、分散式、資料並行還是模型並行。

# L21201 AI導入評估 — Study Guide v2

> 對應評鑑範圍：L212 AI導入評估規劃 > L21201 AI導入評估
>
> 關鍵字：技術效能評估（technical performance evaluation）、工具效能評估（tool/vendor evaluation）、適用解決方案選擇（solution selection）、成本效益分析（cost-benefit analysis, CBA）、加權評分矩陣（weighted scoring matrix）、雙約束過濾（dual-constraint filtering）、TCO（Total Cost of Ownership，總擁有成本）、ROI（Return on Investment，投資報酬率）、Payback Period（回收期）、Break-even（損益兩平）

---

## 0. How to Use This Guide

**建議閱讀順序：**

1. Section 1：先看整體流程地圖，知道這課在做什麼。
2. Sections 2–7：每個概念依序讀，每節都有 Quick Check——做完再往下。
3. Section 8：考試前看決策樹，練習「看題型 → 選答案」的反應速度。
4. Section 9：Trap Clinic 專治「明明懂卻選錯」。
5. Section 10：做 15–20 題，有錯就回對應 Section 複習。
6. Final Oral Recall：考前最後 3 分鐘唸一次。

**火力標記（Fire Markers）：**

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

**本課邊界（先記住，不要越界）：**

| 課程 | 範圍 |
|---|---|
| L21201（本課） | 評估到「我們選方案 X」為止 |
| L21202 | 選好之後：需求分析、RACI（Responsible, Accountable, Consulted, Informed，負責/當責/諮詢/知會）、五階段路線圖 |
| L21203 | EU AI Act（European Union Artificial Intelligence Act，歐盟人工智慧法）、NIST RMF（National Institute of Standards and Technology Risk Management Framework，NIST 風險管理框架）、風險登記冊 |

---

## 1. Big Picture — AI 導入評估 5 階段漏斗 🔥🔥🔥

```text
業務問題釐清（Business Problem Framing）
→ 候選方案盤點（Longlist 8–15 個方案）
→ 雙約束過濾（Dual-Constraint Filtering） ← 先過濾！
→ 加權評分矩陣（Weighted Scoring Matrix） ← 再評分！
→ PoC（Proof of Concept，概念驗證）試辦（4–8 週）→ Go/No-Go → 移交 L21202
```

這個流程像一個**漏斗**：從多到少，逐步縮小到「選哪一個方案」。**雙約束過濾在加權評分之前**，是本課最常考的順序陷阱。

**題目問的是什麼 → 想到什麼：**

| 題目關鍵字 | 想到 |
|---|---|
| 「選哪個方案」「如何比較多個 AI 解決方案」 | 5 階段評估漏斗 |
| 「先砍掉哪些方案」「不可行過濾」 | 雙約束過濾 |
| 「如何給方案打分」「怎麼算誰贏」 | 加權評分矩陣 |
| 「accuracy / latency / throughput」 | 技術效能評估（準·延·量·伸·靠） |
| 「API（Application Programming Interface，應用程式介面）換供應商風險」「模型被棄用」 | Vendor Lock-in |
| 「先試 prompt 還是直接 fine-tune」 | 解決方案階梯（提·檢·微·建） |
| 「TCO / ROI / Payback」 | 成本效益分析 |
| 「自建還是買 API」「break-even」 | Build vs Buy + Break-even |
| 「PoC 多久 / 成功指標誰定」 | PoC 與 Go/No-Go 閘門 |

---

## 2. 技術效能評估（Technical Performance Evaluation）🔥🔥

### 先懂一句話

評估一個 AI 模型的技術能力，不能只看「答對率」——還要看「速度夠不夠快、量撐不撐得住、出問題時多久能恢復」。五個指標缺一不可：**準·延·量·伸·靠**。

### Everyday Analogy

就像評估一家醫院的服務：光看「治癒率（accuracy）」不夠——你還要看「掛號到看診等多久（latency）」、「每天能接幾個病患（throughput）」、「遇到 SARS 能不能擴充（scalability）」、「24 小時有沒有急診（reliability）」。一家準但極慢、量少又常當機的醫院，在生產環境就是失敗的。

### 先問自己一個問題

這個 AI 方案如果「答得很準」，但回應慢、吞吐量低、尖峰會當機，還算可以上線嗎？

答案通常是：不行。L21201 的技術評估不是在找實驗室分數最高的模型，而是在找「能在真實業務環境穩定運作」的方案。

### 技術說法

技術效能評估（Technical Performance Evaluation）要同時檢查模型品質、延遲、吞吐量、擴展能力與可靠性。考試看到 accuracy、F1、p95 latency、QPS（Queries per Second，每秒查詢數）、SLA（Service Level Agreement，服務等級協議），都是在問這一組評估。

### 流程 / 選擇流程

```text
候選方案盤點
→ [技術效能評估] ← 你在這裡
→ 雙約束過濾
→ 加權評分矩陣
```

讀法：先確認任務是否準確，再確認延遲是否能達到 SLA，接著看尖峰流量、擴充能力與可用性。任何一個是硬需求卻不達標，都不應靠總分硬救。

### 比較表這樣讀

**口訣：準·延·量·伸·靠**

| 先看什麼 | 英文 | 決策用途 |
|---|---|---|
| **準** | Accuracy / F1 | 模型答案品質是否夠好；分類任務尤其要看 Precision/Recall/F1 |
| **延** | Latency | 使用者等多久；對外服務通常看 p95 / p99，不看平均值 |
| **量** | Throughput | 同時能處理多少請求；常見單位是 QPS、tokens-per-second |
| **伸** | Scalability | 流量暴增時能否水平擴展、垂直擴展或 auto-scaling |
| **靠** | Reliability / SLA | 服務可用性是否達標；常見 99%、99.9%、99.99% |

**Latency 百分位數對照（高頻必考）：**

| 指標 | 定義 | 通常用在哪裡 |
|---|---|---|
| p50（中位數） | 50% 請求比這快 | 行銷文案、內部 dashboard |
| **p95** | 95% 請求比這快（5% 比這慢） | **對外 SLA 主流選擇** 🔥 |
| p99 | 99% 請求比這快 | 金融、即時通訊高敏感系統 |
| **TTFT（Time-to-First-Token）** | 收到請求到吐出第一個字的時間 | **LLM 對話體驗關鍵指標** 🔥 |

**SLA 對照表：**

| SLA | 年度可容忍停機 | 適用場景 |
|---|---|---|
| 99.0%（兩個 9） | 約 87.6 小時 | 內部工具 |
| 99.9%（三個 9） | 約 8.76 小時 | 一般 SaaS |
| 99.99%（四個 9） | 約 52.6 分鐘 | 金融、電信 |

### 記憶方式

```text
準 = 答得對
延 = 等多久
量 = 吃多少請求
伸 = 尖峰能不能擴
靠 = 會不會常掛
```

考試看到「accuracy 很高」不要立刻選可以上線；先補問：p95 latency、throughput、scalability、SLA 有沒有一起過。

### Exam Rule

```text
題目給 accuracy 高但 p95 latency 超 SLA → 生產上「失敗」
對外 SLA 要用 p95，不是 avg → 防止尾延遲（tail latency）打臉
LLM 對話體驗、「第一個字多快出現」→ TTFT
fraud detection「為何不能只看 accuracy」→ 資料極度不平衡，看 F1/Recall
99.9% SLA 一年可容忍停機 → 約 8.76 小時
```

### Quick Check

**Q：** 某 AI 客服方案 accuracy 達 95%，但 p95 latency 為 4 秒，對外 SLA 承諾 < 1 秒。這個方案能上線嗎？

答案：不能。accuracy 只是技術效能五指標之一，p95 latency 4 秒已違反 SLA 承諾，生產上會失敗。評估時必須看「準·延·量·伸·靠」全部五個指標。

---

## 3. 工具 / 供應商評估（Tool & Vendor Evaluation）🔥🔥

### 先懂一句話

選 LLM（Large Language Model，大型語言模型）供應商不只是看「誰現在最便宜」——要評估鎖定風險（API 棄用、漲價）、資料主權（資料能不能離境）、SLA，以及「如果要換廠商，遷移成本有多高」。

### Everyday Analogy

跟外送平台簽合約：今天用 Foodpanda 很順，但人家明天宣布「不送這區了」、「改抽 35%」、「資料賣給廣告商」——你得有 Plan B。**Vendor lock-in 評估就是評估「廠商擺爛時我多快能跑」**。

### 先問自己一個問題

如果供應商明天漲價、API 改版、模型下線，或法規要求資料不能出境，我們還能不能維持服務？

這一節不是在問「哪個模型最強」，而是在問「這個工具或供應商能不能被企業長期、合規、可替換地使用」。

### 技術說法

工具 / 供應商評估（Tool & Vendor Evaluation）要看 managed API 與 self-hosted 的取捨，並把 vendor lock-in（供應商鎖定）、data residency（資料落地 / 資料主權）、SLA、遷移成本放進評分準則。

### 流程 / 選擇流程

```text
候選方案盤點
→ 技術效能評估
→ [工具/供應商評估] ← 你在這裡
→ 加入加權評分矩陣（作為評分準則）
```

讀法：先判斷資料能不能離境，再判斷上線速度、成本結構、客製深度與遷移風險。資料主權是硬限制時，要先排除不合規方案，不要被低價 API 吸走注意力。

### 比較表這樣讀

**Managed API vs Self-hosted 對照：**

| 決策問題 | Managed API（OpenAI/Anthropic/Google） | Self-hosted（TAIDE/Llama/Qwen） |
|---|---|---|
| 要很快上線？ | 適合，初期成本（CapEx, Capital Expenditure，資本支出）近 0 | 不適合，通常要數週至數月 |
| 流量初期不穩？ | 適合，用多少付多少（OpEx, Operating Expense，營運支出） | 較不適合，GPU（Graphics Processing Unit，圖形處理器）固定成本高 |
| 長期大量穩定流量？ | token 成本可能變高 | 攤提後單位成本可能較低 |
| 需要深度客製？ | 低到中，主要靠 prompt + 少量 fine-tune | 高，可做更深的微調與部署控制 |
| 資料不能離境？ | 通常不適合，除非有合規資料中心與合約 | 適合，資料可留在指定環境 |
| 能承擔維運嗎？ | 廠商扛大部分維運 | 自己扛模型、GPU、監控、資安 |
| 怕被鎖定？ | 風險高，API 變更、棄用、漲價都會影響 | 風險較低，權重與部署在自己手上 |

**Vendor Lock-in 三種形態：**

1. **API 介面鎖定**：prompt template 寫死某廠商格式，要換廠商得全部重寫。
2. **棄用風險**：廠商公告舊模型下線（如 Anthropic 棄用 Claude 1），你今天用得開心，半年後被迫遷。
3. **價格上調**：commercial API 沒有最低價保證，隨時可調；「現在最便宜」≠「總成本最低」，要看遷移成本。

**Data Residency 資料主權（政府/金融必考背景）：**

- 個資法 / 金管會規範：特定資料不可離境。
- TAIDE-LX（國科會主導，基於 Meta LLaMA 2 7B 繁中微調；後續 TAIDE-LX2 系列採 Llama 3）：開源、免費、可自建、繁中強，但 7B 參數，品質與 frontier API 有差距。（注意：不是 Llama 3.1）
- 中華電信 hicloud AI 算力雲：提供在地 GPU 算力（NVIDIA MIG, Multi-Instance GPU，多實例 GPU 切片），按 GPU 小時計費，不是 token 計費。

### 記憶方式

```text
API = 快、輕、但容易被供應商牽著走
Self-hosted = 慢、重、但資料與模型控制權在自己手上
Hybrid = 敏感資料地端，通用任務雲端
```

看到「不能離境、金融、政府、個資」先想資料主權；看到「下線、漲價、API 改版」先想 vendor lock-in。

### Exam Rule

```text
「資料不能出境 / 留台灣 / 金融 / 政府」→ TAIDE 自建 或 hicloud open-weight
「廠商宣布模型下線 / API 變更」→ Vendor lock-in 棄用風險
「現在最便宜但遷移成本高」→ 現在便宜 ≠ 總成本低，看 TCO
「按 GPU 小時計費」→ OpEx（hicloud 不是 token 計費）
資料主權作為評分準則 → 在加權評分矩陣裡作為一個 row，不是風險框架（那是 L21203）
```

### Quick Check

**Q：** 一家金融公司考慮導入 LLM 客服，IT 主管說「資料涉及客戶個資，不能傳到境外」。哪個方案最符合此限制？

答案：TAIDE 自建（部署於中華電信 hicloud GPU 切片），或其他 open-weight 模型自建，資料留台灣不離境。Managed API（OpenAI/Anthropic/Google）除非選定資料中心且簽署 DPA（Data Processing Agreement，資料處理協議），否則預設資料離境，不符需求。

---

## 4. 適用解決方案選擇（Solution Selection）🔥🔥🔥

### 先懂一句話

AI 解決方案有一個「成本與複雜度的階梯」，從低到高：Prompt → RAG → Fine-tune → From-scratch。鐵則是**永遠先試最低階**，不行再往上爬——跳階等於浪費錢。

### Everyday Analogy

想修一台壞掉的自行車：先試「重新打氣（Prompt Engineering）」；不行再試「換條鏈（RAG）」；還不行再找師傅「改裝（Fine-tune）」；最後才考慮「整台重造（From-scratch）」。沒有人一開始就整台重造——除非這台車是要拿去參加世界大賽。

### 先問自己一個問題

這個問題到底是「指令寫不好」、「缺少最新知識」、「回答風格不穩」，還是「現有模型根本不夠用」？

先判斷問題根源，才知道要選 Prompt、RAG、Fine-tuning，還是 From-scratch。不要看到 AI 專案就直接 fine-tune。

### 技術說法

適用解決方案選擇（Solution Selection）是在不同 AI 導入方式之間做成本、時間、資料需求與效果的取捨。常考核心是 solution ladder（解決方案階梯）與 Build vs Buy vs Hybrid。

### 流程 / 選擇流程

```text
業務問題釐清
→ 候選方案盤點
→ [解決方案階梯選擇] ← 你在這裡
→ 雙約束過濾 → 加權評分矩陣
```

選擇流程先從最低成本開始試：

```text
指令不清楚 → Prompt Engineering
缺內部知識 / 需即時更新 → RAG
語氣、格式、行為要穩定 → Fine-tuning
主權 AI / 極特殊需求 / 資源充足 → From-scratch
```

### 比較表這樣讀

**解決方案階梯（口訣：提·檢·微·建）：**

```text
複雜度 / 成本（低 → 高）

  [提] Prompt Engineering     70–85%* 準確率 | 近 0 成本 | 數小時
  [檢] RAG（Retrieval-Augmented Generation，檢索增強生成） 85–94%* | 中等成本 | 數天
  [微] Fine-tuning 微調        90–96%*        | 數千–萬 USD | 數天–週
  [建] From-scratch Pre-training 92–97%*     | 數百萬 USD | 數月

  * 典型範圍，依任務而定，請以實測為準
```

**何時選哪一階：**

| 題目觸發訊號 | 該爬到哪一階 |
|---|---|
| 通用任務、不要求專業詞彙 | Prompt Engineering |
| 模型答案會「掰」、需引用內部文件、需即時更新知識 | RAG |
| 答案格式或語氣需強烈一致（品牌口吻）、行為塑形 | Fine-tuning |
| 國家戰略級需求、公司有獨特訓練資料、主權 AI | From-scratch（極少數） |

**RAG vs Fine-tune 差異（高頻考點）：**

| 維度 | RAG | Fine-tuning |
|---|---|---|
| 解決問題 | 事實正確、即時更新知識、引用來源 | 行為塑形、語氣一致、格式固定 |
| 成本 | 中（向量庫 + token） | 高（數千–數萬 USD） |
| 何時用 | 模型常「幻覺」、需引用內部知識庫 | 品牌口吻需嚴格一致 |

**Build vs Buy vs Hybrid：**

| 情境 | 建議 |
|---|---|
| 通用任務、資料不敏感、初期試水 | Buy（Managed API） |
| 專業領域、資料敏感、長期穩定流量 | Build（Open-weight self-host） |
| 敏感資料地端 + 通用任務雲端 | Hybrid（2025/2026 主流） |

### 記憶方式

```text
提 = Prompt：先把問題說清楚
檢 = RAG：先查資料再回答
微 = Fine-tune：把口吻與格式練穩
建 = From-scratch：從頭養一個模型
```

RAG 管「知識」，Fine-tuning 管「行為」。考題只要說最新資料、內部文件、引用來源，先選 RAG。

### Exam Rule

```text
「客服回答常掰 / 需引用內部知識」→ RAG，不要直接 fine-tune
「品牌口吻要強烈一致 / 格式固定」→ Fine-tuning
「先試哪個」→ 永遠先試 Prompt Engineering
「資料敏感 + 流量大 + 長期使用」→ Build（自建）
「敏感資料地端 + 一般任務雲端」→ Hybrid
RAG 解決事實正確 + 即時更新；Fine-tune 解決行為塑形 + 風格
```

### Quick Check

**Q：** 某電商平台要導入 AI 客服，工程師說「模型有時候會亂回答沒有的促銷活動（幻覺問題），需要引用最新促銷資料庫」。應優先考慮哪個方案？

答案：RAG（檢索增強生成）。RAG 專門解決「事實正確 + 即時更新」問題，可讓模型在回答前先從促銷資料庫搜尋再生成，成本遠低於 fine-tuning 且可即時更新。

---

## 5. 成本效益分析（Cost-Benefit Analysis）🔥🔥🔥

### 先懂一句話

評估 AI 導入值不值得，要算「總共要花多少錢（TCO）」、「回報多少（ROI）」、「多久回本（Payback Period）」。三個公式都會考，而且都有典型陷阱——TCO 最常漏算間接成本，ROI 最常搞錯分子。

### Everyday Analogy

買一台咖啡機給辦公室：直接成本是機器售價；間接成本是每個月咖啡豆、濾紙、清潔耗材、修理費；機會成本是買了這台之後把預算用光、無法買更好的飲水機。「TCO = 全部加總」，不是只看標籤上的售價。

### 先問自己一個問題

這個 AI 專案是「看起來很酷」，還是真的能用合理成本帶來可衡量效益？

成本效益分析要把錢算完整：花多少、賺回多少、多久回本、什麼流量下自建才划算。

### 技術說法

成本效益分析（Cost-Benefit Analysis, CBA）用 TCO、ROI、Payback Period、Break-even 等指標，把 AI 導入從技術偏好轉成商業可行性判斷。

### 流程 / 選擇流程

```text
雙約束過濾
→ [成本效益分析（TCO / ROI / Payback / Break-even）] ← 你在這裡
→ 加權評分矩陣（TCO 作為一個評分準則）
```

讀法：先算 TCO（總成本），再算 ROI（報酬率），再看 Payback（多久回本），最後用 Break-even 判斷流量到哪裡時自建比 API 划算。

### 比較表這樣讀

**TCO（Total Cost of Ownership，總擁有成本）**

口訣：**直·間·機**

| 成本類別 | 問自己 | 範例 |
|---|---|---|
| **直接成本** | 帳單上看得到的成本是什麼？ | 每月 NT$30,000 OpenAI 帳單、GPU compute、storage、頻寬 |
| **間接成本** | 為了讓系統能用，還要哪些人力與工程？ | MLOps（Machine Learning Operations，機器學習維運）人力、整合工程、標註資料、安全合規 |
| **機會成本** | 團隊做這件事，犧牲了什麼？ | 工程主管 30% 時間在維運 = NT$36 萬 |

**CapEx vs OpEx：**

| 決策問題 | CapEx 資本支出 | OpEx 營運支出 |
|---|---|---|
| 範例 | 買 GPU 伺服器 | 用 OpenAI API 按 token 計費 |
| 會計處理 | 攤提 3–5 年 | 當期費用化 |
| 決策權 | 通常需董事會核准 | 部門預算內可決 |
| 適合情境 | 流量穩定、長期使用 | 流量起伏大、初期試水溫 |

### 一步一步例子

**ROI（Return on Investment，投資報酬率）：**

```text
ROI = (淨效益 ÷ 投資) × 100%
其中：淨效益 = 總效益 − 總成本
```

範例：客服 AI 每年省 NT$200 萬人力 + NT$50 萬升級營收；建置 + 維運成本 NT$100 萬。

```text
總效益 = 200 + 50 = 250 萬
總成本 = 100 萬
淨效益 = 250 − 100 = 150 萬
ROI = (150 ÷ 100) × 100% = 150%
```

**Payback Period（投資回收期）：**

```text
Payback Period = 投資 ÷ 年度淨效益（單位：年）
```

承上若題目把年度淨效益定義為「每年可帶來 NT$250 萬現金流」：

```text
Payback Period = 100 ÷ 250 = 0.4 年（約 5 個月）
```

若題目要求用 ROI 同一題的「淨效益」當年度淨效益，則是：

```text
Payback Period = 100 ÷ 150 = 0.67 年（約 8 個月）
```

考試重點不是背 0.4 或 0.67，而是看清楚題目給的是「總效益」還是「年度淨效益」。

| Payback | 解讀 |
|---|---|
| < 1 年 | 強力推進 |
| 1–2 年 | 通常可行 |
| 2–3 年 | 需董事會討論 |
| > 3 年 | 多半不通過（科技週期太快） |

**Break-even（損益兩平，自建 vs API 哪個划算）：**

```text
Break-even 請求量 = 固定成本 ÷ (API 單價 − 自建單位變動成本)
```

範例：自建 GPU 每月固定 NT$80,000；API 每萬請求 NT$1,500；自建單位變動成本先假設接近 0。

```text
每 1 萬請求，API 比自建多花約 1,500 元
Break-even = 80,000 ÷ 1,500 = 53.3（萬請求）
所以約 53.3 萬請求 / 月是交叉點
```

< 53.3 萬：用 API 划算；> 53.3 萬：自建划算。

**NPV / IRR（知道名字即可，中級不考公式）：**

- NPV（Net Present Value，淨現值）：把未來現金流折現後加總，> 0 代表創造價值。
- IRR（Internal Rate of Return，內部報酬率）：使 NPV = 0 的折現率，比 Payback 更精確，考慮時間價值。

### 記憶方式

```text
TCO = 全部成本
ROI = 賺回來的比例
Payback = 幾年回本
Break-even = 自建和 API 的交叉點
NPV = 把未來的錢折回今天
```

最常錯的是 ROI 分子。ROI 用「淨效益」，不是總營收、不是營收成長、也不是省下的人力金額直接除以投資。

### Exam Rule

```text
「TCO」→ 直接 + 間接 + 機會，三類全部算
TCO「只算 API 帳單」→ 錯，間接成本常比直接成本大
「ROI 公式分子」→ 淨效益（= 總效益 − 總成本），不是「營收成長」
「多久回本」→ Payback Period = 投資 ÷ 年度淨效益
「固定成本 vs 變動成本交叉點」→ Break-even 公式
「考慮時間價值的投資評估」→ NPV，不是 ROI 也不是 Payback
「買 GPU 伺服器」→ CapEx，攤提 3–5 年
「按 token 計費」→ OpEx，當期費用化
```

### Quick Check

**Q：** 某公司評估客服 AI，只計算了「每月 OpenAI API 帳單 NT$30,000」就稱為年度 TCO NT$360,000。這個算法有何問題？

答案：TCO 漏算了間接成本（MLOps 工程師人力、整合工程、資料標註）與機會成本（團隊精力被綁住）。這兩類成本常常比直接的 API 帳單還大，只算帳單會嚴重低估真實投入。

---

## 6. 加權評分矩陣（Weighted Scoring Matrix）🔥🔥🔥

### 先懂一句話

加權評分矩陣是「把多方案的多維度比較，用數字說清楚」的方法。五個步驟：訂準則 → 訂權重（先訂！）→ 打分 → 加權加總 → 選最高分。**「先訂權重、再打分」是本課的鐵律，違反就是確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)。**

### Everyday Analogy

選新手機前做一張比較表：先決定你最在乎的是「電池（40 分）＋相機（30 分）＋價格（30 分）」，**再**去查各機型的分數、乘以權重。如果你先查分數再決定「電池要佔 40 分」，就是因為「你喜歡的那台電池好」才這樣設——結果是假客觀、真主觀，就是確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)。

### 先問自己一個問題

如果三個方案各有優缺點，要怎麼避免「我本來喜歡哪個，就把表格調到它贏」？

答案是：先把評分準則與權重寫清楚，再打分。加權評分矩陣的目的不是假裝客觀，而是把取捨透明化。

### 技術說法

加權評分矩陣（Weighted Scoring Matrix）把多個方案放在同一組 criteria（準則）下評分，再用 weights（權重）反映業務優先順序，最後算 weighted sum（加權總分）。

### 流程 / 選擇流程

```text
雙約束過濾（先砍掉不可行方案）
→ [加權評分矩陣（剩下 2–4 個方案精算）] ← 你在這裡
→ PoC 試辦
```

決策流程：

```text
先砍掉不可行方案
→ 對剩下方案訂 4–6 個準則
→ 權重先寫死，總和 100%
→ 每個方案逐項打分
→ 權重 × 分數後加總
→ 做敏感度測試，看排序是否穩健
```

### 比較表這樣讀

**五步驟（口訣：準·重·分·乘·選）：**

| 步驟 | 動作 | 決策提醒 |
|---|---|---|
| 1. 準則（Criteria） | 訂 4–6 個評分準則 | 過多會被稀釋，無法區分方案 |
| 2. 重（Weights） | 訂每個準則的權重，總和 = 100% | **先訂，後打分！避免確認偏誤 (confirmation bias)** |
| 3. 分（Scores） | 每方案在每準則打 1–10 分 | 打分時不能回頭看已打的分 |
| 4. 乘（Weighted Sum） | Σ（wᵢ × scoreᵢ） | 加權加總 |
| 5. 選（Select） | 選加權總分最高者 | 可做敏感度測試（sensitivity analysis） |

### 一步一步例子

**Worked Example（客服 chatbot 三方案選型）：**

| 準則 | 權重 | A. GPT-4o-mini | B. TAIDE 自建 | C. Claude Haiku |
|---|---|---|---|---|
| 技術效能 | 25% | 9 | 6 | 8 |
| 整合成本 | 15% | 9 | 4 | 8 |
| TCO | 30% | 9 | 5 | 7 |
| 資料主權 | 20% | 4 | 10 | 4 |
| 供應商風險 | 10% | 5 | 9 | 6 |

A 的算法要寫得出來：

```text
A = 25%×9 + 15%×9 + 30%×9 + 20%×4 + 10%×5
  = 2.25 + 1.35 + 2.70 + 0.80 + 0.50
  = 7.60
```

同理：B = 6.50、C = 6.70 → **A. GPT-4o-mini 勝出**

敏感度測試：若資料主權權重從 20% → 40%（同時 TCO 從 30% → 10%），B. TAIDE 自建可能翻盤超越 A——這就是為什麼權重要先訂且團隊共識。

### 記憶方式

```text
準 = 要比什麼
重 = 每項多重要
分 = 各方案幾分
乘 = 權重乘分數
選 = 總分最高者
```

最重要的一句：權重先訂、分數後打。看到結果再調權重，就是確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)。

### Exam Rule

```text
「先訂權重再打分」→ 避免確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)
「看到分數後回頭調權重」→ 確認偏誤／事後合理化，錯誤，整個矩陣失效
「敏感度測試 / sensitivity analysis」→ 改 1–2 個權重看排序會不會翻盤
「準則要幾個」→ 4–6 個（過多稀釋、無法區分）
「權重總和」→ 100%
「雙約束過濾與加權評分的順序」→ 先過濾、再評分
```

### Quick Check

**Q：** 評估委員會在加權評分矩陣打完分後，發現自己最屬意的方案排第二。委員提議「把技術效能的權重從 20% 調高到 35%，讓它排第一」。這樣做有何問題？

答案：這是確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)。權重必須在打分前基於業務需求訂定並書面化。看到分數後回頭調權重，等於讓個人偏好取代客觀標準，整個加權評分矩陣失去意義。

---

## 7. 雙約束可行性過濾（Dual-Constraint Filtering）🔥🔥🔥

### 先懂一句話

雙約束過濾就是「方案必須同時滿足 A 條件 AND B 條件，兩個都過才進入下一輪」。最常見的是 **latency + cost** 雙約束。這個步驟要在加權評分矩陣**之前**做，先砍掉不可行的，剩下的才值得花時間細評。

### Everyday Analogy

在 Uber Eats 點宵夜：先勾「30 分鐘內到 + 預算 200 元以內」（雙約束），30 家店被砍到剩 5 家；再看評分和菜色（加權評分）。沒有人會把 30 家的菜單一張一張看完才決定——雙約束就是先讓大多數方案自己淘汰出局。

### 先問自己一個問題

這個方案有沒有任何一個硬性條件「不過就不能上線」？

如果有，就先過濾。雙約束不是拿來排名，而是拿來淘汰不可行方案。

### 技術說法

雙約束可行性過濾（Dual-Constraint Filtering）用兩個 must-have constraints（硬性約束）篩掉不可能上線的方案。常見寫法是 `A AND B`，代表兩個條件都要通過。

### 流程 / 選擇流程

```text
候選方案盤點（8–15 個）
→ [雙約束過濾] ← 你在這裡（先做！）
→ 加權評分矩陣（剩下 2–4 個）
```

讀法：先找題目裡的硬門檻，例如 latency、cost、privacy、SLA、budget。只要任一門檻沒過，就不能因為其他項目分數高而留下。

### 比較表這樣讀

**常見雙約束組合：**

| 題目給的硬限制 | 範例 |
|---|---|
| latency + cost（最常考） | p95 latency < 200ms AND cost < NT$50 / 萬 input tokens |
| accuracy + privacy | F1 > 0.90 AND 資料不可離境 |
| SLA + budget | 99.9% SLA AND 月費 < NT$100,000 |

### 一步一步例子

**Worked Case（p95 < 200ms AND cost < NT$50 / 萬 tokens）：**

先把條件拆開：

```text
條件 1：p95 latency < 200ms
條件 2：cost < NT$50 / 萬 tokens
判斷規則：條件 1 AND 條件 2 都通過，才保留
```

| 候選方案 | p95 latency（估） | 通過 latency? | 通過 cost? | 結果 |
|---|---|---|---|---|
| OpenAI GPT-4o | ~1,200ms | ❌ | ✅ | 淘汰 |
| OpenAI GPT-4o-mini | ~900ms | ❌ | ✅ | 淘汰 |
| Anthropic Claude Sonnet | ~900ms | ❌ | ✅ | 淘汰 |
| Google Gemini 2.5 Pro | ~1,800ms | ❌ | ✅ | 淘汰 |
| Groq（Llama 3.3 70B） | ~280ms | ⚠️ 接近邊界 | ✅ | 保留（待測） |
| TAIDE 自建（hicloud） | 視部署可達 <200ms | ✅ | ✅ | 保留 |

**結論：在 200ms p95 約束下，所有主流 frontier API 都被淘汰。**——這是雙約束最常考的反直覺答案。

**雙約束無解時的 Deadlock Fallback：**

1. 放寬約束（Relax）：確認 200ms 是硬需求還是 nice-to-have
2. 改變架構（Change architecture）：邊緣推論、預先快取常見回答
3. 混合策略（Hybrid）：80% 走快但不準的小模型，20% 走慢但準的旗艦
4. 延後決策（Defer）：等硬體/模型迭代拉低延遲門檻

### 記憶方式

```text
雙約束 = 兩道門
第一道沒過，淘汰
第二道沒過，也淘汰
兩道都過，才進加權評分
```

最常考順序：先雙約束過濾，再加權評分矩陣。不要把不可能上線的方案放進精算表。

### Exam Rule

```text
「即時客服 + 200ms 延遲」→ 主流 frontier API 全部淘汰，候選 = Groq / TAIDE 自建
「雙約束無解」→ 先考慮放寬約束或 Hybrid，不是直接放棄
「雙約束 vs 加權評分的順序」→ 先過濾（雙約束）再評分（加權矩陣），不可顛倒
「方案太多選不出來」→ 先用雙約束砍，剩下的再評分
```

### Quick Check

**Q：** 一家公司需要即時語音客服，技術需求定為「p95 latency < 200ms AND 月費 < NT$50,000」。工程師把 GPT-4o、Claude Sonnet、Gemini Pro、Groq Llama 全部放入加權評分矩陣一起評分。這樣做有何問題？

答案：應先做雙約束過濾，GPT-4o、Claude Sonnet、Gemini Pro 的 p95 latency 均超過 200ms，應在進入加權評分前就被淘汰。把無法通過約束的方案放進矩陣評分，是在不可能上線的方案上浪費時間。

---

## 8. Exam Decision Trees 🔥🔥

### 8.1 「選哪個 AI 解決方案？」決策樹

```text
題目問「選哪個技術方案」？
│
├─ 有明確的硬性約束（latency/cost/privacy）？
│  ├─ 是 → 先做雙約束過濾，砍掉不可行方案
│  │        → 剩下的進加權評分矩陣
│  └─ 否 → 直接進加權評分矩陣
│
└─ 最高分方案是否需要試驗驗證？
   ├─ 是 → PoC 4–8 週，成功指標 pre-defined
   └─ 否 → 直接移交 L21202 規劃
```

### 8.2 「RAG vs Fine-tune？」決策樹

```text
問題根源是什麼？
│
├─ 模型「掰」、事實錯誤、需引用最新內部知識？
│  └─ 選 RAG（檢索增強生成）
│
├─ 模型語氣/格式/口吻不一致，需要行為塑形？
│  └─ 選 Fine-tuning（微調）
│
├─ 都沒問題，只是任務說明不清楚？
│  └─ 先試 Prompt Engineering（成本最低）
│
└─ 國家戰略級需求 / 主權 AI / 極度差異化？
   └─ From-scratch Pre-training（極少數）
```

### 8.3 「Build vs Buy？」決策樹

```text
任務通用性高（客服問答、文件摘要）？
│
├─ 是
│  └─ 資料敏感、不可離境？
│     ├─ 否 → Buy（Managed API）
│     └─ 是 → Hybrid（地端敏感 + 雲端通用）
│
└─ 否（專業領域、特殊需求）
   └─ 資料量 > 1000 標註樣本 + 流量穩定？
      ├─ 是 → Build（Open-weight + Fine-tune）
      └─ 否 → 先 Buy 試水溫
```

### 8.4 「ROI / TCO / Payback / Break-even？」決策樹

```text
題目問的是「財務評估」？
│
├─ 「這個投資划不划算」「報酬率多少」
│  └─ ROI = (淨效益 ÷ 投資) × 100%
│         淨效益 = 總效益 − 總成本
│
├─ 「這個方案總共要花多少錢」
│  └─ TCO = 直接 + 間接 + 機會成本
│
├─ 「多久可以回本」
│  └─ Payback Period = 投資 ÷ 年度淨效益（年）
│
├─ 「自建還是 API 哪個划算」「交叉點在哪」
│  └─ Break-even = 固定成本 ÷ (API 單價 − 自建單位變動成本)
│
└─ 「考慮時間價值」「多年大型投資」
   └─ NPV（淨現值）— 中級知道名詞即可，不考公式
```

### 8.5 「選哪個 Latency 指標？」決策樹

```text
問的是哪種延遲使用場景？
│
├─ 對外 SLA 承諾、合約保證
│  └─ p95（95 百分位），防止尾延遲打臉
│
├─ 金融、即時通訊、高敏感系統
│  └─ p99（99 百分位）
│
├─ LLM 對話體驗、「第一個字多快出現」
│  └─ TTFT（Time-to-First-Token）
│
└─ 行銷文案、內部 dashboard
   └─ p50（中位數 / 平均水準）
```

---

## 9. Trap Clinic 🔥🔥

### Trap 1：只看 accuracy，忽略其他四個技術效能指標

錯。accuracy 只是「準·延·量·伸·靠」的第一個指標，accuracy 95% 但 p95 latency 8 秒、SLA 寫 99.9%，生產上就是失敗。

Exam fix：

```text
「accuracy 高但 latency 超 SLA」→ 生產失敗，不能選
「技術效能評估」→ 五個指標全看：準·延·量·伸·靠
```

### Trap 2：ROI 公式分子用「營收成長」代替「淨效益」

錯。ROI = (淨效益 ÷ 投資) × 100%，其中淨效益 = 總效益 − 總成本。直接用「營收成長」當分子，把成本節省忽略或多算，都是錯誤。

Exam fix：

```text
ROI 分子 → 淨效益（= 總效益 − 總成本）
不是「營收成長」、不是「毛利」
```

### Trap 3：TCO 只算 API 帳單

錯。TCO = 直接成本 + 間接成本 + 機會成本。MLOps 工程師薪水、整合工程、資料標註、合規時間，這些間接成本常比 API 帳單還大。

Exam fix：

```text
「TCO」→ 直·間·機，三類全部算
「只算 API 帳單 = TCO」→ 錯
```

### Trap 4：對外 SLA 用平均 latency 承諾

錯。平均 latency 會被 5% 慢的尾巴（tail latency）拉低，讓 SLA 看起來比實際好。對外 SLA 要用 p95（或 p99），不是 avg。

Exam fix：

```text
「對外 SLA」→ p95 或 p99
「用 avg 承諾 SLA」→ 會被 tail latency 打臉
```

### Trap 5：Vendor lock-in 只看當下價格

錯。鎖定風險不等於當下價格。要評估：API 介面是否寫死（換廠商要重寫）、棄用風險（廠商公告下線）、價格上調（無預警）、遷移成本（改寫 prompt template 的工程成本）。

Exam fix：

```text
「現在最便宜」≠ 鎖定風險最低
Vendor lock-in 要評估：介面鎖定 + 棄用風險 + 漲價 + 遷移成本
```

### Trap 6：看到分數後回頭調整加權評分矩陣的權重

錯。這是確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)——看到想要的結果後，反推「應該」調哪個權重來支持它。（注意：錨定偏誤/anchoring bias 是指過度依賴「第一個看到的數字」，是不同的認知偏誤。）權重必須在打分前訂定、書面化、取得團隊共識。看到分數再調權重，讓個人偏好取代客觀標準，整個矩陣失效。

Exam fix：

```text
「先訂權重再打分」→ 避免確認偏誤 (confirmation bias)
「打完分後調權重」→ 確認偏誤／事後合理化，矩陣失效
```

### Trap 7：雙約束過濾在加權評分之後做

錯。正確順序是**先雙約束過濾，再加權評分**。先過濾掉不可行方案，剩下的才值得花時間細評。反過來做是在不可能上線的方案上浪費評分時間。

Exam fix：

```text
正確順序 → 雙約束過濾 → 加權評分矩陣
「先加權評分再過濾」→ 浪費時間在不可行方案上
```

### Trap 8：忘記 Hybrid 選項，認為只有「全 API」或「全自建」

錯。Hybrid 是 2025/2026 的主流策略：敏感資料地端（TAIDE on hicloud）+ 通用任務雲端（GPT-4o-mini API）。考題若兩個極端選項都不對，多半答案是 Hybrid。

Exam fix：

```text
「敏感資料 + 通用任務並存」→ Hybrid
「金融客戶 + 個資合規 + 也要用通用 LLM」→ Hybrid
```

### Trap 9：PoC 跑完後才修改成功指標

錯。成功指標（success criteria）必須在 PoC 開始前 pre-defined 且書面化。PoC 跑出不好的數字後改寬門檻，是 post-hoc rationalization（事後合理化），讓整個 Go/No-Go 決策失去意義。

Exam fix：

```text
「PoC 成功指標何時訂」→ PoC 開始前，書面化
「PoC 後發現數字難看想改門檻」→ 禁止，post-hoc rationalization
```

### Trap 10：把「資料主權」當成 L21203 風險框架

錯。L21201 把「資料主權 / 資料隱私」作為加權評分矩陣裡的**評分準則**（一個 row），這是評估視角。風險框架（NIST RMF、EU AI Act 分級）是 L21203 的範疇，本課不展開。

Exam fix：

```text
「資料主權在 L21201 裡的角色」→ 加權評分矩陣的一個評分準則
「NIST RMF / EU AI Act 分級」→ L21203，本課不考
```

### Trap 11：直接 Fine-tune，跳過 RAG

錯。Fine-tune 解決「行為塑形 / 風格 / 格式」，RAG 解決「事實正確 / 即時更新」。需要引用內部知識庫的場景，先試 RAG——成本低 10–100 倍且可即時更新，不需要重新訓練。

Exam fix：

```text
「需要引用最新內部資料、防止幻覺」→ 先試 RAG
「直接 fine-tune 解決幻覺問題」→ 跳階，先試 RAG
RAG 解決事實；Fine-tune 解決行為
```

---

## 10. Practice Questions

### 10.1 技術效能評估（準·延·量·伸·靠）

**Q1.** 某 AI 分類系統 accuracy 達 97%，但 p95 latency 為 6 秒，SLA 承諾 < 2 秒。以下哪個敘述正確？

A) 系統可以上線，accuracy 97% 已達優秀水準
B) 系統不能上線，p95 latency 違反 SLA 承諾
C) 需要等 NPV 計算完才能決定
D) 只需做 PoC 驗證就可以上線

答案：B
理由：技術效能要看「準·延·量·伸·靠」五個指標全部，p95 latency 6 秒違反 < 2 秒 SLA，無論 accuracy 多高，生產環境都是失敗的。

---

**Q2.** 對外服務等級協議（SLA）通常使用哪個 latency 指標承諾，而不是使用 avg（平均值）？

A) p50
B) p95
C) TTFT
D) QPS

答案：B
理由：p95 代表 95% 的請求都在此時間內完成，能防止 tail latency（尾延遲）讓實際體驗超出承諾。avg 會被少數極慢的請求拉低，用 avg 承諾 SLA 容易違約。

---

**Q3.** 在 LLM 對話應用中，衡量「使用者送出訊息後看到第一個字的速度」，應使用哪個指標？

A) p95 latency
B) QPS
C) TTFT（Time-to-First-Token）
D) tokens-per-second

答案：C
理由：TTFT 專門衡量 LLM 從收到請求到輸出第一個 token 的時間，直接影響使用者感知的「回應快不快」，是 LLM 對話體驗的關鍵指標。

---

**Q4.** 下列哪個 SLA 等級的年度可容忍停機時間約為 8.76 小時？

A) 99.0%
B) 99.9%
C) 99.99%
D) 99.999%

答案：B
理由：99.9%（三個 9）= 一年 0.1% 停機 = 8,760 小時 × 0.001 ≈ 8.76 小時。金融、電信通常要求四個 9（99.99%，約 52.6 分鐘 / 年）。

---

### 10.2 成本效益分析（TCO / ROI / Payback / Break-even）

**Q5.** 某公司導入 AI 客服，每年可節省人力成本 NT$180 萬、額外帶來 NT$20 萬升級訂閱收入，建置與一年維運總成本 NT$80 萬。ROI 是多少？

A) 150%
B) 175%
C) 225%
D) 250%

答案：A
理由：總效益 = 180 + 20 = 200 萬；淨效益 = 200 − 80 = 120 萬；ROI = (120 ÷ 80) × 100% = 150%。注意：分子是「淨效益」（總效益 − 總成本），不是「總效益」。

---

**Q6.** 承 Q5，Payback Period 為多少？（投資 = NT$80 萬，年度淨效益 = NT$120 萬）

A) 約 0.5 年
B) 約 0.67 年
C) 約 1 年
D) 約 1.5 年

答案：B
理由：Payback Period = 投資 ÷ 年度淨效益 = 80 ÷ 120 ≈ 0.67 年（約 8 個月）。< 1 年，通常屬於「強力推進」等級。

---

**Q7.** 某 IT 主管說：「我已經算好 TCO 了，就是每月 OpenAI API 帳單 NT$50,000，一年 NT$60 萬。」這個 TCO 計算少算了什麼？

A) 只少算了 CapEx
B) 少算了間接成本（MLOps 人力、整合工程）和機會成本（團隊精力）
C) 少算了 NPV 折現
D) 沒有少算，TCO 就是 API 帳單

答案：B
理由：TCO = 直接成本（API 帳單）+ 間接成本（MLOps 工程師、整合開發、標註成本）+ 機會成本（團隊精力被綁住）。三類全部加總才是 TCO，只算帳單會嚴重低估。

---

**Q8.** 某公司評估自建 GPU（固定成本每月 NT$100,000）vs 使用 API（每千請求 NT$2,000）。請問每月請求量達到多少時，自建才比 API 划算？

A) 30,000 次
B) 50,000 次
C) 100,000 次
D) 200,000 次

答案：B
理由：每千請求 NT$2,000 → 每次請求 NT$2。Break-even = 固定成本 ÷ 每次請求 API 成本 = 100,000 ÷ 2 = 50,000 次 / 月。超過此量，自建划算；低於此量，用 API 划算。

---

**Q9.** 下列哪個財務指標「考慮時間價值（time value of money）」，最適合評估多年期大型 AI 建設投資？

A) ROI
B) Payback Period
C) TCO
D) NPV（淨現值）

答案：D
理由：NPV 把未來現金流折現回今天，考慮了貨幣的時間價值。ROI 和 Payback Period 都不折現，較適合短期決策。中級不考 NPV 公式，但要知道「需要考慮時間價值 → NPV」。

---

### 10.3 解決方案選擇（階梯 + Build vs Buy）

**Q10.** 某電商 AI 客服系統「常常回答過期的促銷活動（幻覺問題），需要即時引用最新商品資料庫」。應優先考慮哪個解決方案？

A) Fine-tuning（微調現有 LLM）
B) From-scratch 自建模型
C) RAG（檢索增強生成）
D) 增加更多 Few-shot 範例在 prompt 裡

答案：C
理由：RAG 專門解決「事實正確 + 即時更新」問題，讓模型在生成前先從資料庫檢索，成本遠低於 fine-tuning 且可即時更新。Fine-tuning 解決行為塑形，不解決知識過期問題。

---

**Q11.** 解決方案階梯中，「強迫品牌口吻和回答格式達到強烈一致」最應選哪個方案？

A) Prompt Engineering
B) RAG
C) Fine-tuning
D) From-scratch

答案：C
理由：Fine-tuning 解決「行為塑形 / 風格 / 格式一致性」。通過訓練資料讓模型學會特定語氣和格式，是最直接有效的方法。Prompt Engineering 可部分達到，但穩定性不如 fine-tuning。

---

**Q12.** 某政府機關要導入 LLM，規定「公民個資不可上傳至境外伺服器」。最符合需求的架構是？

A) OpenAI GPT-4o Managed API
B) Anthropic Claude Sonnet Managed API
C) TAIDE 自建（部署於 hicloud 在地 GPU）
D) Google Gemini Pro Managed API

答案：C
理由：TAIDE 自建於中華電信 hicloud GPU 切片，資料處理留在台灣境內，符合個資不可離境的規範。所有 Managed API 選項預設資料傳至境外。

---

### 10.4 加權評分矩陣 + 雙約束過濾

**Q13.** 下列關於加權評分矩陣的敘述，哪個是正確的？

A) 可以先打分，再根據分數決定最重要的準則要給多少權重
B) 準則越多越好，因為考慮越全面越能得出正確答案
C) 權重必須在打分前訂定，且所有準則權重加總 = 100%
D) 加權評分結束後，不需要做敏感度測試就可以決定方案

答案：C
理由：C 是正確的，「先訂權重再打分」是避免確認偏誤 (confirmation bias) 的鐵律。A 是確認偏誤／事後合理化（看到分數後反推權重）；B 錯，準則過多（超過 6 個）會稀釋每個準則的鑑別度；D 錯，敏感度測試可以發現決策是否穩健。

---

**Q14.** 某公司需要即時聊天功能，技術需求為「p95 latency < 300ms AND 月費 < NT$80,000」。工程師列出 8 個候選方案後，直接全部放進加權評分矩陣評分。這樣做的問題是什麼？

A) 準則不夠多
B) 沒有先做雙約束過濾，可能在不可行方案上浪費評分時間
C) 應該先做 PoC 再評分
D) ROI 算法有問題

答案：B
理由：正確流程是先做雙約束過濾（砍掉 p95 latency > 300ms 或月費 > NT$80,000 的方案），剩下可行的方案才進入加權評分。跳過雙約束直接評分，等於在不可能上線的方案上花費評分時間。

---

**Q15.** 在雙約束過濾中，「p95 latency < 200ms AND cost < NT$50/萬 tokens」的約束下，下列哪個表述通常正確？

A) 主流 frontier API（GPT-4o、Claude Sonnet、Gemini Pro）通常可以通過 latency 約束
B) 主流 frontier API 通常被 cost 約束淘汰
C) 主流 frontier API 通常被 latency 約束淘汰，候選僅剩 Groq 類專用推論或 TAIDE 自建
D) 雙約束過濾在此情境下所有方案都能通過

答案：C
理由：主流 frontier API 的 p95 TTFT 通常在 600ms–1800ms，遠超過 200ms 約束。被淘汰的是 latency 這個條件，cost 反而大多數方案都符合。這是雙約束最常考的反直覺答案。

---

### 10.5 綜合情境 / Mixed Traps

**Q16.** 評估委員會完成加權評分矩陣後，方案 A 獲得最高分 7.8 分（方案 B 7.6 分）。一位委員說「我個人覺得方案 B 的資料主權比較重要，可以把資料主權權重從 15% 調高到 30% 嗎？」應如何回應？

A) 接受，委員意見很有參考價值
B) 拒絕，這是確認偏誤 (confirmation bias)／事後合理化，權重已在打分前定案，不應事後修改
C) 接受，並要求重新打分
D) 提交給董事會決定

答案：B
理由：這是典型的確認偏誤 (confirmation bias)／事後合理化 (post-hoc rationalization)。看到分數後為了讓偏好方案勝出而調整權重，違反了加權評分矩陣的基本原則：權重必須在打分前基於業務需求決定，之後不可因「分數不如預期」而修改。若委員有正當理由，應從頭重做，但不能因看到分數才「補理由」。

---

**Q17.** 某公司 PoC 執行 6 週後，結果顯示 accuracy 達到 78%，但成功指標當初定的是 85%。一位主管說「78% 已經很不錯了，把門檻改為 75% 就好」。這樣做的問題是什麼？

A) 無問題，指標本來就可以根據實測結果彈性調整
B) 這是 post-hoc rationalization，成功指標必須在 PoC 開始前 pre-defined 且不可事後修改
C) 只要董事會同意就可以修改
D) 問題在於成功指標訂得太嚴格，下次記得訂寬一點

答案：B
理由：PoC 成功指標（success criteria）必須在開始前書面化、pre-defined。看到結果不佳後改寬門檻是 post-hoc rationalization，讓整個 Go/No-Go 評估機制失去公正性和意義。

---

**Q18.** 下列哪個情境最適合採用 Hybrid 策略（部分地端 + 部分雲端）？

A) 小型新創，全部任務通用，沒有敏感資料，資金有限
B) 金融機構，有敏感客戶資料，但也需要處理通用的市場報告摘要
C) 研究機構，需要訓練完全客製的主權 AI 模型
D) 電商平台，全部產品資料都是公開的，主要需要快速上線

答案：B
理由：Hybrid 適合「部分任務涉及敏感資料需要地端，部分通用任務可以使用雲端 API」的情境。金融機構客戶個資不可離境（→地端 TAIDE）+ 通用報告摘要（→雲端 GPT-4o-mini）是 Hybrid 的典型場景。

---

**Q19.** 「CapEx（資本支出）」與「OpEx（營運支出）」的關鍵差異是？

A) CapEx 是變動成本，OpEx 是固定成本
B) CapEx 是買斷性的大額支出（如 GPU 伺服器），攤提 3–5 年；OpEx 是按使用量計費，當期費用化
C) CapEx 適合新創，OpEx 適合大企業
D) CapEx 不需要董事會核准，OpEx 需要

答案：B
理由：CapEx（如買 GPU 伺服器）是一次性大額資本支出，會計上攤提 3–5 年，通常需要董事會核准；OpEx（如按 token 計費的 API）是按使用量計費，當期費用化，部門預算內可決。

---

**Q20.** 下列關於「解決方案階梯」的敘述，哪個是錯誤的？

A) Prompt Engineering 是成本最低、最應優先嘗試的方案
B) RAG 可以有效解決模型「知識過期 / 事實幻覺」問題
C) Fine-tuning 可以有效解決模型「知識過期」問題，因為可以把最新知識訓練進模型
D) 在 Fine-tuning 之前，通常應先嘗試 RAG

答案：C
理由：Fine-tuning 主要解決「行為塑形 / 語氣 / 格式一致性」，不是解決知識過期的最好方法。知識過期問題應用 RAG 解決——因為 RAG 可即時更新知識庫，而 Fine-tuning 訓練完成後知識就固定了，且重新 Fine-tuning 成本很高。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. **評估順序**：先雙約束過濾（砍不可行方案），再加權評分矩陣（精評剩下的），不可顛倒。
2. **技術效能五指標**：準·延·量·伸·靠——accuracy 只是其中一個，p95 latency 超 SLA 就是生產失敗。
3. **ROI 公式**：ROI = (淨效益 ÷ 投資) × 100%；淨效益 = 總效益 − 總成本；分子不是「營收成長」。
4. **TCO 三類**：直接（API 帳單）+ 間接（人力/整合）+ 機會（團隊精力）；只算帳單是錯的。
5. **加權評分矩陣鐵律**：權重先訂（100%）再打分，看到分數後調權重 = 確認偏誤 (confirmation bias)／事後合理化，違反就失效。
6. **解決方案階梯**：提（Prompt）→ 檢（RAG）→ 微（Fine-tune）→ 建（From-scratch），永遠先試最低階。
7. **PoC 成功指標**：必須在 PoC 開始前 pre-defined 書面化，跑完後不可修改——那是 post-hoc rationalization。

---

## Final Study Advice

L21201 不是在考你背名詞，而是考你能不能「從題目描述判斷：這個情境是在問評估流程的哪個環節、應該用哪個工具」。

看到題目，先問自己三個問題：

1. 題目在說什麼問題（latency？cost？知識過期？anchor 偏誤？）？
2. 這個問題屬於哪個評估環節（技術效能 / 供應商 / 方案選擇 / 成本分析 / 加權矩陣 / 雙約束 / PoC）？
3. 有沒有掉入本課的 11 個典型陷阱？

**本課不考的（別越界）**：L21202 的規劃路線圖、RACI 矩陣；L21203 的 EU AI Act 分級、NIST RMF 風險框架。本課只到「我們選方案 X」為止。

遇到不確定的選項，先用 Section 8 的決策樹過一遍，再看 Section 9 的 Trap Clinic 排除陷阱——能做到這兩步，本課的分就拿得到。

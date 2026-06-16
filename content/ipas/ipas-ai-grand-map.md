# iPAS AI 應用規劃師總覽地圖

> 重點：以中級考試為主，回扣初級基礎。
> 用途：用一張大地圖看懂 AI、資料、機器學習、生成式 AI、大數據、部署、治理與隱私之間的關係。
> 搭配檔案：[ipas-ai-key-terms.csv](./ipas-ai-key-terms.csv) 是完整關鍵詞表，已加入英文全名 / acronym 展開。

---

## 0. 這份地圖怎麼讀

### 先懂一句話

初級考的是「知道名詞是什麼」。中級考的是「看到情境後，能選對方法、流程、指標、系統、風險控制」。

### 建議閱讀順序

```text
1. 先看 Section 1：AI 全域流程
2. 再看 Section 2：初級 -> 中級銜接表
3. 依照 Section 3 的九大領域複習
4. 用 ipas-ai-key-terms.csv 查完整名詞
5. 考前最後看 Section 4：跨領域混淆地圖
```

### 全域心智模型

```text
商業問題（Business Problem）
-> 資料（Data）
-> 資料處理 / 統計（Data Processing / Statistics）
-> 機器學習（Machine Learning, ML）
-> 深度學習（Deep Learning, DL）
-> NLP（Natural Language Processing，自然語言處理） / CV（Computer Vision，電腦視覺） / Multimodal AI（多模態 AI）
-> 生成式 AI（Generative AI, GenAI）
-> 大數據 / MLOps（Machine Learning Operations）
-> 治理 / 風險 / 隱私（Governance / Risk / Privacy）
-> AI 導入與商業落地（Business Adoption）
```

---

## 1. AI 全域流程

### 一張圖看完整考試範圍

```text
需求與問題定義
Business goal / problem framing
        |
        v
資料來源與資料品質
Data source -> data quality -> cleaning -> privacy
        |
        v
統計與資料理解
Summary statistics -> probability -> hypothesis testing -> visualization
        |
        v
特徵處理與模型選擇
Preprocessing -> encoding -> scaling -> train / validation / test
        |
        v
AI 模型
Traditional ML -> Deep Learning -> NLP（Natural Language Processing，自然語言處理） / CV（Computer Vision，電腦視覺） -> Generative AI -> Multimodal AI
        |
        v
大數據與系統化
Storage -> processing -> distributed training -> serving -> monitoring
        |
        v
導入與治理
Evaluation -> planning -> deployment -> risk -> privacy -> compliance
```

### 初級 vs 中級

| 層次 | 初級在問什麼 | 中級在問什麼 |
|---|---|---|
| AI 基礎 | AI（Artificial Intelligence，人工智慧） / ML（Machine Learning，機器學習） / GenAI（Generative AI，生成式 AI）是什麼 | 這個情境要選哪種架構、模型或方法 |
| 資料 | 資料是什麼、從哪裡來 | 如何清理、儲存、處理、保護大規模資料 |
| ML（Machine Learning，機器學習） | 監督式 / 非監督式是什麼 | 指標、切分、縮放、編碼、不平衡資料怎麼選 |
| GenAI（Generative AI，生成式 AI） | 生成式 AI 可以做什麼 | RAG（Retrieval-Augmented Generation，檢索增強生成）、SFT（Supervised Fine-Tuning，監督式微調）、RLHF（Reinforcement Learning from Human Feedback，人類回饋強化學習）、DPO（Direct Preference Optimization，直接偏好最佳化）、tokenizer、corpus 怎麼分 |
| 部署 | 為什麼要導入 AI | 如何評估、規劃、部署、監控、回滾 |
| 治理 | 為什麼要管倫理與隱私 | 哪個法規、風險框架、隱私技術或控制措施適用 |

---

## 2. 初級 -> 中級銜接表

| 初級基礎 | 中級延伸 | 中級主要課程 |
|---|---|---|
| AI 定義與分類 | NLP（Natural Language Processing，自然語言處理）、CV（Computer Vision，電腦視覺）、GenAI、多模態、部署、風險 | L21101-L21302 |
| AI 治理概念 | EU AI Act、NIST AI RMF（National Institute of Standards and Technology AI Risk Management Framework，AI 風險管理框架）、ISO 42001、FRIA（Fundamental Rights Impact Assessment，基本權利影響評估）、DPIA（Data Protection Impact Assessment，資料保護影響評估）、Risk Register | L21203, L22404 |
| 資料基本概念與來源 | API（Application Programming Interface，應用程式介面）、Webhook、CDC（Change Data Capture，變更資料擷取）、Kafka、Data Lake（資料湖）、Data Warehouse（資料倉儲）、Lakehouse（資料湖倉） | L22201, L22202 |
| 資料整理與分析流程 | 缺失值、離群值、scaling（縮放）、data leakage（資料洩漏）、visualization（視覺化） | L22101, L22201, L22301, L22303 |
| 資料隱私與安全 | anonymization（匿名化）、pseudonymization（假名化）、DP（Differential Privacy，差分隱私）、FL（Federated Learning，聯邦學習）、encryption（加密）、RBAC（Role-Based Access Control，角色式存取控制） / ABAC（Attribute-Based Access Control，屬性式存取控制） | L22404 |
| 機器學習基本原理 | train / validation / test、model selection（模型選擇）、metrics（評估指標）、imbalanced data（類別不平衡資料） | L21301, L22302, L22402 |
| 常見機器學習模型 | k-means、Decision Tree、SVM（Support Vector Machine，支援向量機）、Random Forest、Neural Network | L21301, L22302 |
| 鑑別式 AI vs 生成式 AI | classifier metrics（分類指標）vs LLM（Large Language Model，大型語言模型）/ diffusion（擴散模型）/ RAG / fine-tuning（微調） | L21103, L22402, L22403 |
| No-Code / Low-Code | AI adoption（AI 導入）、tool selection（工具選擇）、governance（治理）、limitations（限制） | L21201, L21202 |
| GenAI 工具與提示 | prompt engineering（提示工程）、RAG（Retrieval-Augmented Generation，檢索增強生成）、fine-tuning（微調）、model evaluation（模型評估） | L21101, L21103, L21201, L22403 |
| GenAI 導入評估 | solution ladder（解決方案階梯）、TCO（Total Cost of Ownership，總持有成本）、ROI（Return on Investment，投資報酬率）、payback（回收期）、weighted scoring（加權評分） | L21201 |
| GenAI 導入規劃 | roadmap（路線圖）、RACI（Responsible, Accountable, Consulted, Informed，負責 / 當責 / 諮詢 / 知會）、KPI（Key Performance Indicator，關鍵績效指標）、Pilot（試行）、Rollout（擴展上線）、CRISP-DM（Cross-Industry Standard Process for Data Mining，跨產業資料探勘標準流程） | L21202 |
| GenAI 風險管理 | risk types（風險類型）、AI Act level（AI 法案分級）、FRIA（Fundamental Rights Impact Assessment，基本權利影響評估）、privacy（隱私）、security（資安） | L21203, L22404 |

---

## 3. 九大 AI 領域總覽

## Area 1：AI 基礎與分類

### 先懂一句話

這一區在回答：這是哪一種 AI？輸入是什麼？輸出是判斷、預測，還是生成內容？

### 流程 / Roadmap

```text
AI（Artificial Intelligence，人工智慧）
-> ML（Machine Learning，機器學習）
-> DL（Deep Learning，深度學習）
-> NLP / CV / Multimodal AI
-> Discriminative AI（鑑別式 AI）或 Generative AI（生成式 AI）
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| AI = Artificial Intelligence | 人工智慧 | 讓系統執行需要人類智慧的任務 |
| ML = Machine Learning | 機器學習 | 從資料中學規律，用來分類、預測、分群 |
| DL = Deep Learning | 深度學習 | 用多層神經網路自動學特徵 |
| Discriminative AI | 鑑別式 AI | 判斷輸入屬於哪一類或數值是多少 |
| Generative AI / GenAI | 生成式 AI | 產生新文字、圖片、音訊、程式碼 |
| Multimodal AI | 多模態 AI | 同時處理文字、圖片、語音等多種模態 |

### 考試判斷規則 / Exam Trigger Rules

```text
題目問分類 / 偵測 / 詐欺 / churn
-> 鑑別式 AI（Discriminative AI）

題目問生成文字 / 圖像 / 摘要 / 對話
-> 生成式 AI（Generative AI）

題目同時出現文字、圖片、語音
-> 多模態 AI（Multimodal AI）
```

---

## Area 2：資料、統計與視覺化

### 先懂一句話

AI 的品質先看資料品質。中級會把初級的資料概念加上統計公式、分佈、檢定、圖表選擇與參數陷阱。

### 流程 / Roadmap

```text
資料來源（Data Source）
-> 資料型態與資料品質（Data Type / Data Quality）
-> 敘述統計（Descriptive Statistics）
-> 機率分佈（Probability Distribution）
-> 假設檢定（Hypothesis Testing）
-> 資料視覺化（Data Visualization）
-> 決策支援（Decision Support）
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| Data Quality | 資料品質 | 完整性、準確性、一致性、即時性、唯一性、有效性 |
| Mean | 平均數 | 總和除以筆數，容易受離群值影響 |
| Median | 中位數 | 排序後中間值，有離群值時常比平均數穩健 |
| IQR = Interquartile Range | 四分位距 | Q3 - Q1，用來衡量中間 50% 的分散程度 |
| PMF = Probability Mass Function | 機率質量函數 | 離散變數的 P(X=x) |
| PDF = Probability Density Function | 機率密度函數 | 連續變數的密度，不是單點機率 |
| CDF = Cumulative Distribution Function | 累積分佈函數 | 到某個值為止的累積機率 |
| p-value | p 值 | 假設 H0 成立時，觀察到這麼極端資料的機率 |
| CI = Confidence Interval | 信賴區間 | 參數可能落入的合理範圍 |
| Data Visualization | 資料視覺化 | 用圖表比較、探索、解釋資料 |

### 考試判斷規則 / Exam Trigger Rules

```text
有離群值 -> Median / IQR / RobustScaler
連續分佈 P(a < X <= b) -> CDF(b) - CDF(a)
p <= alpha -> 拒絕 H0
p > alpha -> 無法拒絕 H0
類別比較 -> Bar Chart
連續分佈 -> Histogram
時間趨勢 -> Line Chart
兩個連續變數關係 -> Scatter Plot
```

---

## Area 3：機器學習與模型評估

### 先懂一句話

ML 題目通常不是問模型名字，而是問：任務是什麼？資料怎麼切？模型怎麼選？指標怎麼看？

### 流程 / Roadmap

```text
問題型態（Problem Type）
-> 監督式 / 非監督式（Supervised / Unsupervised）
-> 前處理（Preprocessing）
-> Train / Validation / Test
-> 模型選擇（Model Selection）
-> 評估指標（Evaluation Metrics）
-> 部署後監控（Monitoring）
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| Supervised Learning | 監督式學習 | 用有標籤資料學分類或迴歸 |
| Unsupervised Learning | 非監督式學習 | 沒有標籤，找分群或結構 |
| Regression | 迴歸 | 預測連續數值 |
| Classification | 分類 | 預測類別 |
| k-means | k 平均分群 | 無監督分群，最小化群內距離 |
| Decision Tree | 決策樹 | 用規則分裂資料的監督式模型 |
| Data Leakage | 資料洩漏 | 訓練過程偷看到測試集或未來資訊 |
| SMOTE = Synthetic Minority Over-sampling Technique | 合成少數類過採樣 | 在少數類樣本間內插產生新樣本 |
| Precision | 精確率 | 判成正類的樣本中，有多少真的正確 |
| Recall | 召回率 | 真正正類中，有多少被模型抓到 |
| F1 Score | F1 分數 | Precision 與 Recall 的調和平均 |
| AUC = Area Under the Curve | 曲線下面積 | 衡量模型排序能力，常用 y_prob |

### 考試判斷規則 / Exam Trigger Rules

```text
有標籤 -> Supervised Learning
無標籤分群 -> k-means / Unsupervised Learning
FP 代價高 -> Precision
FN 代價高 -> Recall
類別不平衡 -> 不要只看 Accuracy
SMOTE -> 只在 train / fold 內做
Target Encoding -> 切分後只用 train 算
AUC -> 用 predict_proba，不是 predict
```

---

## Area 4：深度學習、NLP、CV 與多模態

### 先懂一句話

這一區在問：非結構化資料如何變成模型可計算的格式？不同輸入與輸出要選哪種架構？

### NLP 流程 / Natural Language Processing Flow

```text
Raw Text
-> Tokenization（斷詞 / 切 token）
-> Embedding（嵌入向量）
-> Transformer
-> Task Output
```

### CV 流程 / Computer Vision Flow

```text
Image
-> Convolution / Feature Extraction
-> Classification / Detection / Segmentation
-> Accuracy / mAP / mIoU
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| NLP = Natural Language Processing | 自然語言處理 | 讓模型處理文字 |
| CV = Computer Vision | 電腦視覺 | 讓模型處理影像 |
| Tokenization | Token 化 / 斷詞 | 把文字切成模型可讀的 token |
| Embedding | 嵌入向量 | 把文字或物件轉成可計算向量 |
| Transformer | Transformer 架構 | 以 attention 處理序列資料 |
| Self-Attention | 自注意力 | 同一序列內 token 彼此參考 |
| BERT = Bidirectional Encoder Representations from Transformers | BERT | Encoder-only，雙向，適合理解、分類、NER（Named Entity Recognition，命名實體辨識）、抽取式 QA |
| GPT = Generative Pre-trained Transformer | GPT | Decoder-only，自迴歸，適合生成、對話、next-token |
| CNN = Convolutional Neural Network | 卷積神經網路 | 用卷積擷取影像局部特徵 |
| ResNet | 殘差網路 | 用 skip connection 解決 degradation |
| Object Detection | 物件偵測 | 找出物件框與類別 |
| Semantic Segmentation | 語意分割 | 每個像素分類，但不分同類個體 |
| Instance Segmentation | 實例分割 | 每個像素分類，且分不同個體 |
| CLIP = Contrastive Language-Image Pre-training | 文圖對齊模型 | 對齊文字與圖片，不生成圖片 |
| Cross-Attention | 跨注意力 | Q 來自一個模態，K/V 來自另一個模態 |

### 考試判斷規則 / Exam Trigger Rules

```text
文字分類 / NER（Named Entity Recognition，命名實體辨識）/ 抽取式 QA -> BERT
文字生成 / 對話 -> GPT
翻譯 / 摘要 / seq2seq -> T5（Text-To-Text Transfer Transformer）/ BART（Bidirectional and Auto-Regressive Transformers）
即時物件偵測 -> YOLO
高精度偵測 -> Faster R-CNN
像素分類但不分個體 -> Semantic Segmentation
像素分類且分個體 -> Instance Segmentation
文圖對齊 / zero-shot -> CLIP
文字生成圖像 -> Stable Diffusion / DALL-E
```

---

## Area 5：生成式 AI

### 先懂一句話

生成式 AI 題目要先判斷：是在改模型權重、查外部知識，還是控制生成行為？

### 流程 / Roadmap

```text
預訓練語料（Pretraining Corpus）
-> 清理 / 去重（Cleaning / Deduplication）
-> Tokenizer
-> 預訓練（Pretraining）
-> SFT（Supervised Fine-Tuning）
-> RLHF 或 DPO
-> RAG / Tool Use / Deployment
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| Foundation Model | 基礎模型 | 大量預訓練後可適配多任務的模型 |
| Pretraining | 預訓練 | 用大量語料學語言規律與世界知識 |
| SFT = Supervised Fine-Tuning | 監督式微調 | 用 instruction-response pairs 學回答格式 |
| RLHF = Reinforcement Learning from Human Feedback | 人類回饋強化學習 | 需要 Reward Model + PPO |
| DPO = Direct Preference Optimization | 直接偏好最佳化 | 直接用偏好資料最佳化，不需 Reward Model |
| RAG = Retrieval-Augmented Generation | 檢索增強生成 | 不改權重，先查文件再生成 |
| LoRA = Low-Rank Adaptation | 低秩適應 | 用低秩 adapter 省資源微調 |
| PEFT = Parameter-Efficient Fine-Tuning | 參數高效微調 | 只微調少量參數 |
| GAN = Generative Adversarial Network | 生成對抗網路 | Generator 與 Discriminator 對抗 |
| DDPM = Denoising Diffusion Probabilistic Model | 去噪擴散機率模型 | 透過學習去雜訊生成資料 |
| FID = Fréchet Inception Distance | 圖像生成品質指標 | 批次比較，越低越好 |
| PPL = Perplexity | 困惑度 | 語言模型不確定性，越低越好 |

### 考試判斷規則 / Exam Trigger Rules

```text
知識更新 / 內部文件 / 引用來源 -> RAG
回答格式 / 語氣 / 行為一致 -> SFT or Fine-tuning
少量資源客製 -> LoRA / PEFT
人類偏好 + Reward Model + PPO -> RLHF
人類偏好但不需 Reward Model -> DPO
圖片生成 + 去雜訊 -> Diffusion
Generator + Discriminator -> GAN
temperature / max_new_tokens / do_sample -> 推論參數，不是訓練超參數
```

---

## Area 6：大數據系統與處理

### 先懂一句話

大數據題目在問：資料從哪裡來、存在哪裡、怎麼流動、用什麼系統處理。

### 流程 / Roadmap

```text
資料來源（Data Source）
-> 資料收集（Ingestion）
-> 儲存（Storage）
-> 處理（Processing）
-> 特徵 / 分析層（Feature / Analytics Layer）
-> 模型訓練或 BI
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| API = Application Programming Interface | 應用程式介面 | 系統之間交換資料的介面 |
| Webhook | 事件推送 | 事件發生時由對方主動推資料 |
| CDC = Change Data Capture | 變更資料擷取 | 擷取資料庫異動，例如 binlog |
| Kafka | Kafka 串流平台 | 高吞吐量事件串流平台 |
| ETL = Extract, Transform, Load | 擷取、轉換、載入 | 先轉換再載入 |
| ELT = Extract, Load, Transform | 擷取、載入、轉換 | 先載入再轉換 |
| Data Lake | 資料湖 | 可存多格式原始資料 |
| Data Warehouse | 資料倉儲 | 結構化分析資料庫 |
| Lakehouse | 資料湖倉 | 結合資料湖彈性與資料倉儲治理 |
| Spark | Spark 分散式處理引擎 | Transformation lazy，Action 才執行 |
| Flink | Flink 串流處理 | true streaming / event-at-a-time |
| GROUP BY | 分組彙總 | 合併資料列，每組一列 |
| Window Function | 視窗函數 | 保留原列，新增排名、累計、lag、lead |

### 考試判斷規則 / Exam Trigger Rules

```text
定期拉資料 -> API Polling
事件即時推送 -> Webhook
DB 異動同步 -> CDC
高吞吐串流 -> Kafka
先 load 再 transform -> ELT
Spark filter / select / join -> Transformation / lazy
Spark show / count / collect / write -> Action
保留原列加排名 -> Window Function
每組變一列 -> GROUP BY
```

---

## Area 7：部署、MLOps 與 AI 導入

### 先懂一句話

這一區把模型放進真實商業系統：先評估、再規劃、再部署、再監控、必要時回滾或重訓。

### 流程 / Roadmap

```text
Business Framing
-> Feasibility Filtering
-> Solution Selection
-> Cost-Benefit Analysis
-> PoC / MVP / Pilot
-> Deployment
-> Monitoring
-> Retraining / Rollback
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| MLOps = Machine Learning Operations | 機器學習維運 | 模型生命週期的系統化流程 |
| Model Registry | 模型註冊庫 | 存模型版本、metadata、指標、審批狀態 |
| Feature Store | 特徵庫 | 統一訓練與推論用特徵，避免 training-serving skew |
| Shadow Test | 影子測試 | 新模型背景跑，使用者仍看舊版結果 |
| Canary Deployment | 金絲雀部署 | 小比例使用者真的收到新版 |
| Blue-Green Deployment | 藍綠部署 | 兩套環境快速切換與回滾 |
| SLI = Service Level Indicator | 服務水準指標 | 實際量測值 |
| SLO = Service Level Objective | 服務水準目標 | 內部服務目標 |
| SLA = Service Level Agreement | 服務水準協議 | 對外合約與罰則 |
| TCO = Total Cost of Ownership | 總擁有成本 | 直接成本 + 間接成本 + 機會成本 |
| ROI = Return on Investment | 投資報酬率 | 淨效益 / 投入 |
| RACI = Responsible, Accountable, Consulted, Informed | 責任分工矩陣 | A 每列只能一人 |
| PoC = Proof of Concept | 概念驗證 | 驗證技術可行性 |
| MVP = Minimum Viable Product | 最小可行產品 | 用最少功能驗證需求 |

### 考試判斷規則 / Exam Trigger Rules

```text
方案篩選 -> 先 dual-constraint，再 weighted scoring
權重 -> 必須評分前設定
AI 專案瓶頸 -> BCG 10/20/70，70% 是 people/process
RACI A -> exactly one accountable person
Pilot -> 有限真實流量
Shadow -> 不影響使用者
Canary -> 小比例使用者收到新版
Data Drift -> P(X) 改變
Concept Drift -> P(Y|X) 改變
```

---

## Area 8：治理、風險、隱私與資安

### 先懂一句話

治理題目問：什麼會出錯？誰負責？能不能做？要用什麼控制措施保護資料與使用者？

### 流程 / Roadmap

```text
風險識別（Risk Identification）
-> 風險評分（Risk Scoring）
-> 控制措施（Controls）
-> 殘餘風險（Residual Risk）
-> 法遵 / 倫理審查（Compliance / Ethics Review）
-> 監控與事件回應（Monitoring / Incident Response）
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| AI Governance | AI 治理 | 用政策、流程、責任與控制管理 AI |
| Risk Register | 風險登錄表 | 記錄風險、owner、控制措施、殘餘風險 |
| EU AI Act | 歐盟 AI 法案 | 以風險分級管理 AI 的法規框架 |
| NIST AI RMF = AI Risk Management Framework | NIST AI 風險管理框架 | Govern、Map、Measure、Manage |
| ISO 42001 | AI 管理系統標準 | 可認證的 AI 管理系統 |
| DPIA = Data Protection Impact Assessment | 資料保護影響評估 | 聚焦個資與隱私 |
| FRIA = Fundamental Rights Impact Assessment | 基本權利影響評估 | 範圍比 DPIA 更廣 |
| PII = Personally Identifiable Information | 個人可識別資訊 | 可識別個人的資料 |
| DP = Differential Privacy | 差分隱私 | 統計輸出加雜訊保護個體 |
| FL = Federated Learning | 聯邦學習 | 資料不離本地，只傳模型更新 |
| RBAC = Role-Based Access Control | 角色型存取控制 | 依角色控權 |
| ABAC = Attribute-Based Access Control | 屬性型存取控制 | 依屬性與環境條件控權 |
| HE = Homomorphic Encryption | 同態加密 | 可在密文上運算 |

### 考試判斷規則 / Exam Trigger Rules

```text
High Risk -> 可部署但需重度合規
Unacceptable -> 禁止
FRIA -> 範圍大於 DPIA
DPIA -> 聚焦資料保護
epsilon 越小 -> 隱私越強，雜訊越多
pseudonymization -> 可逆，仍可能算個資
anonymization -> 不可逆
RBAC -> role-based
ABAC -> attribute / context-based
```

---

## Area 9：No-Code / Low-Code 與商業採用

### 先懂一句話

初級會問工具可以做什麼；中級會問是否適合導入、限制在哪裡、治理怎麼補上。

### 流程 / Roadmap

```text
Business User Need
-> No-Code / Low-Code Tool
-> Workflow Automation
-> AI Capability
-> Governance and Risk Controls
-> Integration and Monitoring
```

### 關鍵名詞 / Key Terms

| 英文 / 縮寫 | 中文 | 簡短意思 |
|---|---|---|
| No-Code | 無程式碼開發 | 用視覺化工具建立流程或應用，不寫程式 |
| Low-Code | 低程式碼開發 | 少量程式搭配視覺化工具，加速開發 |
| Citizen Developer | 公民開發者 | 非工程人員用核准工具建立內部應用 |
| Workflow Automation | 流程自動化 | 自動化重複商業流程 |
| Human-in-the-loop | 人在迴圈中 | 重要決策保留人類審查或介入 |
| Vendor Lock-in | 供應商鎖定 | API、價格、版本或平台依賴造成轉移困難 |

### 考試判斷規則 / Exam Trigger Rules

```text
快速內部流程自動化 -> No-Code / Low-Code 可能適合
高客製 / 高風險 / 大規模整合 -> 注意 No-Code 限制
非工程人員建工具 -> Citizen Developer
AI 影響高風險決策 -> Human oversight / governance
```

---

## 4. 深度結構：每個領域到底怎麼接起來

> 這一段不是單純背名詞，而是看「名詞之間的依賴關係」。考題常常不是問定義，而是問你能不能把情境放到正確的位置。

## Area 1 Deep Map：AI 基礎與分類

### 這一區解決什麼問題

幫你先判斷題目屬於哪一種 AI：是「判斷 / 預測」還是「生成內容」，是單一模態還是多模態，是初級概念還是中級架構選擇。

### 層次圖

```text
AI（人工智慧）
├─ Rule-based AI（規則式 AI）
├─ ML（Machine Learning，機器學習）
│  ├─ Supervised Learning（監督式學習）
│  ├─ Unsupervised Learning（非監督式學習）
│  └─ Reinforcement Learning（強化學習）
└─ DL（Deep Learning，深度學習）
   ├─ CNN（Convolutional Neural Network，卷積神經網路）
   ├─ Transformer
   ├─ Discriminative AI（鑑別式 AI）
   ├─ Generative AI（生成式 AI）
   └─ Multimodal AI（多模態 AI）
```

### Key Terms by Layer

| 層次 | 關鍵詞 | 怎麼記 |
|---|---|---|
| 最大範圍 | AI | 任何模擬智慧任務的系統 |
| 學資料 | ML | 從資料學規律 |
| 深層模型 | DL | 多層神經網路，自動學特徵 |
| 判斷輸出 | Discriminative AI | 輸出類別 / 數值 |
| 生成輸出 | Generative AI | 輸出新內容 |
| 多種輸入 | Multimodal AI | 文字、圖片、語音一起處理 |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 3 ML | ML 是 AI 的核心方法之一 |
| Area 4 NLP / CV | DL 具體落在文字與影像任務 |
| Area 5 GenAI | 生成式 AI 是中級大量考點 |
| Area 8 Governance | AI 類型不同，風險與治理要求不同 |

### 考試常見問法

```text
輸出是「分類、預測、偵測」-> 鑑別式 AI
輸出是「新文字、新圖片、新摘要」-> 生成式 AI
輸入同時含文字與圖片 -> 多模態 AI
```

---

## Area 2 Deep Map：資料、統計與視覺化

### 這一區解決什麼問題

模型之前先懂資料。這一區把資料來源、資料品質、統計摘要、機率分佈、假設檢定、視覺化串成一條資料理解流程。

### 層次圖

```text
資料理解
├─ 資料來源
│  ├─ API / Webhook / CDC / Kafka
│  └─ Structured / Semi-structured / Unstructured
├─ 資料品質
│  ├─ Completeness / Accuracy / Consistency
│  └─ Timeliness / Uniqueness / Validity
├─ 敘述統計
│  ├─ Mean / Median / Mode
│  ├─ Variance / SD / IQR / CV
│  └─ Skewness / Kurtosis / Boxplot
├─ 機率分佈
│  ├─ PMF / PDF / CDF
│  ├─ Normal / Binomial / Poisson
│  └─ Uniform / Exponential / CLT
├─ 統計推論
│  ├─ H0 / H1 / p-value
│  ├─ Type I / Type II / Power
│  └─ t-test / chi-square / ANOVA
└─ 視覺化
   ├─ Bar / Histogram / Line / Scatter
   └─ Box / Violin / Heatmap
```

### Key Dependencies

| 如果你看到 | 先想到 | 再連到 |
|---|---|---|
| 離群值 | Median / IQR / Boxplot | RobustScaler、資料清理 |
| 分佈 | PMF / PDF / CDF | 機率題、假設檢定 |
| p-value | H0 成立下資料多罕見 | Type I / Type II |
| 圖表選擇 | 資料型態 | 類別、連續、時間、關係 |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 3 ML | 前處理與指標都依賴資料理解 |
| Area 6 Big Data | 大規模資料需要儲存與處理系統 |
| Area 8 Privacy | 資料中可能有 PII，需要保護 |

### 高頻陷阱

```text
Boxplot 鬚線 != Fence
PDF 單點不是機率
CLT 是樣本平均數趨近常態，不是原始資料
p-value 不是 H0 為真的機率
```

---

## Area 3 Deep Map：機器學習與模型評估

### 這一區解決什麼問題

把資料變成預測。核心是「任務類型 -> 資料切分 -> 前處理 -> 模型 -> 指標 -> 避免 leakage」。

### 層次圖

```text
ML Workflow
├─ 問題型態
│  ├─ Regression（連續數值）
│  ├─ Classification（類別）
│  └─ Clustering（分群）
├─ 資料切分
│  ├─ Train：學參數
│  ├─ Validation：調參 / 比較模型
│  └─ Test：最終一次驗證
├─ 前處理
│  ├─ Missing Value
│  ├─ Encoding：Ordinal / One-Hot / Target Encoding
│  ├─ Scaling：MinMax / Standard / Robust
│  └─ Leakage Control
├─ 模型
│  ├─ Linear / Logistic Regression
│  ├─ Decision Tree / Random Forest
│  ├─ SVM / k-NN
│  └─ Neural Network
└─ 指標
   ├─ Accuracy
   ├─ Precision / Recall / F1
   ├─ ROC AUC / PR Curve
   └─ MAE / MSE / RMSE / R2
```

### Key Dependencies

| 名詞 | 依賴什麼 | 連到哪裡 |
|---|---|---|
| Target Encoding | 先切 train/test | Data Leakage |
| SMOTE | 只在 train / fold 內做 | Imbalanced Data |
| Precision | FP | 誤報成本高 |
| Recall | FN | 漏報成本高 |
| AUC | y_prob | Threshold / Ranking |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 2 Statistics | 指標與檢定需要統計基礎 |
| Area 7 MLOps | 訓練後要部署與監控 |
| Area 8 Governance | 高風險模型需要風險管理與監督 |

### 高頻陷阱

```text
Accuracy 高不一定好，尤其類別不平衡
Test set 不能反覆拿來調參
SMOTE 不能在切分前做
AUC 不能用 y_pred，要用 y_prob
```

---

## Area 4 Deep Map：NLP、CV、多模態

### 這一區解決什麼問題

讓模型處理非結構化資料：文字、影像、語音，以及它們的組合。

### 層次圖

```text
非結構化資料
├─ NLP（Natural Language Processing，自然語言處理）
│  ├─ Tokenization：BPE / WordPiece / Unigram / SentencePiece
│  ├─ Embedding：Static / Contextualized
│  ├─ Transformer：Self-Attention / Multi-head / Positional Encoding
│  └─ Model Family：BERT / GPT / T5 / BART
├─ CV（Computer Vision，電腦視覺）
│  ├─ CNN：Conv / BN / ReLU / Pooling / FC
│  ├─ ResNet：Skip Connection
│  ├─ Detection：YOLO / Faster R-CNN
│  └─ Segmentation：Semantic / Instance / Panoptic
└─ Multimodal AI（多模態 AI）
   ├─ CLIP：Text-Image Alignment
   ├─ Cross-Attention
   ├─ Early / Late / Hybrid Fusion
   └─ LLaVA / Flamingo / Whisper
```

### Key Dependencies

| 名詞 | 依賴什麼 | 連到哪裡 |
|---|---|---|
| Transformer | Tokenization + Embedding | BERT / GPT / T5 |
| BERT | Encoder-only | 理解型任務 |
| GPT | Decoder-only | 生成型任務 |
| CLIP | Text encoder + image encoder | 對齊，不生成 |
| Cross-Attention | Q from one modality, K/V from another | 多模態融合 |
| ResNet | Skip Connection | Degradation |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 5 GenAI | Transformer 是 LLM 與 GenAI 基礎 |
| Area 3 ML Metrics | CV/NLP 也要選正確指標 |
| Area 7 Deployment | 模型上線後有延遲、吞吐、漂移問題 |

### 高頻陷阱

```text
BERT = 理解，不是主要生成
GPT = 生成，不是雙向理解
CLIP = 對齊，不生成圖片
Semantic Segmentation 不分個體；Instance Segmentation 分個體
ResNet 解決 Degradation，不是 Overfitting
```

---

## Area 5 Deep Map：生成式 AI

### 這一區解決什麼問題

把「生成內容」拆開看：資料從哪來、模型怎麼訓練、如何對齊人類偏好、如何補知識、如何省資源客製。

### 層次圖

```text
Generative AI
├─ 資料層
│  ├─ Pretraining Corpus
│  ├─ Quality Filtering
│  ├─ Exact Dedup / Near Dedup
│  └─ Tokenizer：BPE / WordPiece / SentencePiece / tiktoken
├─ 模型層
│  ├─ Transformer LLM
│  ├─ GAN：Generator + Discriminator
│  └─ Diffusion：Forward noise + Reverse denoise
├─ 訓練 / 對齊層
│  ├─ Pretraining
│  ├─ SFT（Supervised Fine-Tuning）
│  ├─ RLHF（Reward Model + PPO）
│  └─ DPO（No Reward Model）
├─ 客製 / 知識層
│  ├─ Fine-tuning
│  ├─ LoRA / PEFT
│  └─ RAG：Retrieval -> Augmentation -> Generation
└─ 推論層
   ├─ temperature
   ├─ max_new_tokens
   └─ do_sample
```

### RAG 深度流程

```text
文件庫
-> Chunking（切段）
-> Embedding（轉向量）
-> Vector Store（向量資料庫）
-> Retrieval（檢索）
-> Prompt Augmentation（補進提示）
-> Generation（生成答案）
```

### Key Dependencies

| 名詞 | 依賴什麼 | 解決什麼 |
|---|---|---|
| RAG | Chunking + Embedding + Vector Store | 知識更新、引用來源、降低幻覺 |
| Fine-tuning | 訓練資料 + 改權重 | 行為、格式、語氣 |
| LoRA / PEFT | Adapter / 少量參數 | 低成本客製 |
| RLHF | Reward Model + PPO | 人類偏好對齊 |
| DPO | Chosen / Rejected data | 不用 Reward Model 的偏好對齊 |
| Diffusion | 去雜訊訓練 | 圖像生成 |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 4 NLP | LLM 依賴 tokenizer、embedding、Transformer |
| Area 6 Big Data | Pretraining corpus 與向量資料庫是資料系統問題 |
| Area 7 Adoption | RAG / fine-tuning 是解決方案選擇 |
| Area 8 Governance | 幻覺、版權、隱私、濫用都需要治理 |

### 高頻陷阱

```text
RAG 不改權重；Fine-tuning / LoRA 會改權重或 adapter
RLHF 需要 Reward Model；DPO 不需要
temperature / max_new_tokens 是推論參數，不是訓練參數
vocabulary size 不是 corpus size
```

---

## Area 6 Deep Map：大數據系統與處理

### 這一區解決什麼問題

當資料量大、來源多、速度快時，單機與一般表格處理不夠，需要資料管線、儲存架構、分散式處理與串流系統。

### 層次圖

```text
Big Data System
├─ Ingestion（資料收集）
│  ├─ API Polling
│  ├─ Webhook
│  ├─ CDC / Debezium / binlog
│  └─ Kafka
├─ Storage（儲存）
│  ├─ RDBMS / NoSQL
│  ├─ Data Lake
│  ├─ Data Warehouse
│  └─ Lakehouse：Delta / Iceberg / Hudi
├─ Processing（處理）
│  ├─ Hadoop：HDFS / YARN / MapReduce
│  ├─ Spark：RDD / DataFrame / SQL
│  └─ Flink：True Streaming
├─ Query（查詢）
│  ├─ JOIN
│  ├─ GROUP BY
│  └─ Window Function
└─ ML Connection
   ├─ Feature Store
   ├─ Dataset Versioning
   └─ Distributed Training
```

### Key Dependencies

| 名詞 | 依賴什麼 | 連到哪裡 |
|---|---|---|
| CDC | DB log / binlog | 即時資料同步 |
| Kafka | Event stream | 高吞吐資料管線 |
| Spark | Cluster + lazy evaluation | 大規模批次 / micro-batch |
| Flink | Event-at-a-time | 低延遲 true streaming |
| Lakehouse | Data Lake + table format | 分析治理與 time travel |
| Window Function | Partition + ordering | 排名、累計、lag / lead |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 2 Data | 資料品質與統計理解建立在資料管線之上 |
| Area 3 ML | 訓練資料與特徵來自資料系統 |
| Area 5 GenAI | RAG、corpus、vector store 都需要資料系統 |
| Area 8 Privacy | 大數據處理常牽涉 PII 與合規 |

### 高頻陷阱

```text
Spark Transformation 是 lazy；Action 才執行
Structured Streaming 是 micro-batch；Flink 才是 true stream
GROUP BY 會減少列；Window Function 保留列
Delta / Iceberg / Hudi 是 table format，不是完整平台
```

---

## Area 7 Deep Map：部署、MLOps 與 AI 導入

### 這一區解決什麼問題

把模型從 notebook 放到真實世界。考點通常是評估、規劃、部署策略、監控、漂移、回滾與成本效益。

### 層次圖

```text
AI Adoption and MLOps
├─ Evaluation（導入評估）
│  ├─ Business Framing
│  ├─ Dual-Constraint
│  ├─ Weighted Scoring Matrix
│  ├─ TCO / ROI / Payback / Break-even
│  └─ Solution Ladder：Prompt -> RAG -> Fine-tuning -> From-scratch
├─ Planning（導入規劃）
│  ├─ Roadmap：需求 -> 方案 -> 資源 -> Pilot -> Rollout
│  ├─ RACI
│  ├─ NSM / OKR / KPI
│  └─ PoC / MVP / Pilot
├─ Deployment（部署）
│  ├─ Batch / Real-time Serving
│  ├─ Shadow / Canary / Blue-Green / A-B Testing
│  └─ Rollback
└─ Monitoring（監控）
   ├─ System：latency / throughput / error rate
   ├─ Model：accuracy / drift / confidence
   └─ SLI / SLO / SLA
```

### Key Dependencies

| 名詞 | 依賴什麼 | 連到哪裡 |
|---|---|---|
| Weighted Scoring | 先定權重 | 避免確認偏誤 |
| Dual-Constraint | AND 條件 | 先篩掉不可行方案 |
| RACI（Responsible, Accountable, Consulted, Informed，負責 / 當責 / 諮詢 / 知會） | 角色責任 | A 每列只能一人 |
| Shadow | Serving 架構 | 背景測試、不影響用戶 |
| Canary | 流量切分 | 小比例用戶收新版 |
| Data Drift | 監控輸入 P(X) | Retraining |
| Concept Drift | 監控 P(Y\|X) | 模型可能失效 |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 3 ML | 模型訓練後要部署與監控 |
| Area 5 GenAI | RAG / fine-tuning / API 選型屬於 solution ladder |
| Area 8 Governance | 高風險部署需要人類監督與風險控制 |

### 高頻陷阱

```text
雙重約束在加權評分之前
權重必須先設定，不能看結果後調整
Shadow 用戶仍收舊版；Canary 用戶真的收新版
SLA 是外部合約，SLO 是內部目標，SLI 是實測值
```

---

## Area 8 Deep Map：治理、風險、隱私與資安

### 這一區解決什麼問題

AI 不只要能用，還要能被管理、負責、合規、保護資料。中級會考框架、分級、風險處置與隱私技術。

### 層次圖

```text
AI Governance
├─ Risk Management
│  ├─ Risk Register
│  ├─ Inherent Risk = Likelihood x Impact
│  ├─ Controls
│  ├─ Residual Risk
│  └─ Risk Appetite
├─ Legal / Framework
│  ├─ EU AI Act：Unacceptable / High / Limited / Minimal
│  ├─ NIST AI RMF：Govern / Map / Measure / Manage
│  ├─ ISO 42001 / ISO 23894 / ISO 27001
│  ├─ DPIA
│  └─ FRIA
├─ Privacy Protection
│  ├─ Pseudonymization / Anonymization
│  ├─ k-anonymity / l-diversity / t-closeness
│  ├─ Differential Privacy
│  └─ Federated Learning
└─ Security Controls
   ├─ Encryption at Rest / in Transit
   ├─ Homomorphic Encryption
   ├─ RBAC / ABAC
   └─ Field-Level Security
```

### Key Dependencies

| 名詞 | 依賴什麼 | 解決什麼 |
|---|---|---|
| Risk Register | Owner + score + controls | 風險追蹤 |
| FRIA | 基本權利觀點 | 高風險 AI 部署影響 |
| DPIA | 個資保護觀點 | 資料處理風險 |
| DP | epsilon + noise | 統計輸出隱私 |
| FL | 本地資料 + 模型更新 | 資料不離本地 |
| RBAC / ABAC | 身分 / 屬性 / 條件 | 存取控制 |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 2 Data | 隱私與資料品質都是資料治理的一部分 |
| Area 5 GenAI | GenAI 有幻覺、版權、濫用、個資外洩風險 |
| Area 7 Deployment | 上線後需要監控、事件回應、人類監督 |

### 高頻陷阱

```text
High Risk 不是禁止；Unacceptable 才禁止
FRIA 範圍大於 DPIA
epsilon 越小，隱私越強
假名化可逆，仍可能屬於個資；匿名化不可逆
ISO 27001 是資安，不是完整 AI 治理框架
```

---

## Area 9 Deep Map：No-Code / Low-Code 與商業採用

### 這一區解決什麼問題

不是所有 AI 專案都要從零寫程式。這一區看工具能不能快速解決流程問題，以及何時會遇到限制、治理與整合問題。

### 層次圖

```text
Business Adoption
├─ No-Code
│  ├─ Visual Builder
│  ├─ Citizen Developer
│  └─ Workflow Automation
├─ Low-Code
│  ├─ Visual Builder + Custom Code
│  ├─ Integration
│  └─ API Connection
├─ AI Tool Use
│  ├─ Prompting
│  ├─ GenAI Assistant
│  └─ Internal Knowledge Bot
└─ Limitations
   ├─ Vendor Lock-in
   ├─ Security / Privacy
   ├─ Scalability
   └─ Governance
```

### Key Dependencies

| 名詞 | 依賴什麼 | 連到哪裡 |
|---|---|---|
| Citizen Developer | No-code governance | 權限與風險控管 |
| Workflow Automation | Business process | AI 導入規劃 |
| Vendor Lock-in | Tool / API / platform | TCO 與風險 |
| Human-in-the-loop | 高影響決策 | Governance |

### 與其他領域的關係

| 連到哪裡 | 為什麼有關 |
|---|---|
| Area 7 Adoption | No-code / low-code 是導入選項 |
| Area 8 Governance | 公民開發者與自動化流程需要控管 |
| Area 5 GenAI | GenAI 工具常被包成 no-code/low-code 功能 |

### 高頻陷阱

```text
No-code 不代表沒有風險
Low-code 不代表完全不需要工程治理
高風險 / 高客製 / 大規模整合時，要注意平台限制
```

---

## 5. 跨領域混淆地圖

| 容易混淆 | 正確分法 | 考試線索 |
|---|---|---|
| AI vs ML vs DL | AI 最大；ML 從資料學；DL 用深層神經網路 | 問層級關係 |
| 鑑別式 AI vs 生成式 AI | 鑑別式判斷；生成式產生新內容 | 輸出是類別還是內容 |
| RAG vs Fine-tuning | RAG 查外部知識不改權重；Fine-tuning 改行為 / 權重 | 知識更新 vs 回答風格 |
| SFT vs RLHF vs DPO | SFT 學格式；RLHF 有 Reward Model；DPO 沒有 Reward Model | 人類偏好資料 |
| BERT vs GPT | BERT 理解；GPT 生成 | 分類 vs 生成 |
| CLIP vs Stable Diffusion | CLIP 對齊；Stable Diffusion 生成圖片 | 對齊 vs 生成 |
| Semantic vs Instance Segmentation | Semantic 不分個體；Instance 分個體 | 兩隻同類物件能否分開 |
| Precision vs Recall | Precision 降 FP；Recall 降 FN | 誤報貴 vs 漏報危險 |
| Train vs Validation vs Test | Train 學習；Validation 調參；Test 最終驗證 | test 不能反覆調參 |
| GROUP BY vs Window Function | GROUP BY 減列；Window 保留列 | 彙總 vs 保留明細 |
| ETL vs ELT | ETL 先轉換；ELT 先載入 | 傳統 DW vs 雲端 lakehouse |
| Data Lake vs Warehouse vs Lakehouse | Lake 彈性；Warehouse 結構化；Lakehouse 兩者結合 | 儲存架構 |
| Data Drift vs Concept Drift | P(X) 變 vs P(Y\|X) 變 | 輸入分佈 vs 關係改變 |
| Shadow vs Canary | Shadow 不影響使用者；Canary 小比例收新版 | 部署策略 |
| DPIA vs FRIA | DPIA 看資料保護；FRIA 看基本權利 | 隱私 vs 基本權 |
| Pseudonymization vs Anonymization | 假名化可逆；匿名化不可逆 | 是否可還原 |
| RBAC vs ABAC | 依角色 vs 依屬性 / 情境 | 權限條件 |
| High Risk vs Unacceptable | High Risk 可做但要合規；Unacceptable 禁止 | EU AI Act 等級 |

---

## 6. 考前使用方式

### 想建立全局觀

```text
AI taxonomy
-> data and statistics
-> ML model workflow
-> NLP / CV / GenAI
-> big data systems
-> deployment and governance
```

### 想做最後快刷

```text
1. 先看 L21-cheatsheet-v2.md / L22-cheatsheet-v2.md 的 Warm-up
2. 再看本檔 Section 4：跨領域混淆地圖
3. 用 ipas-ai-key-terms.csv 搜尋不熟的名詞
4. 嘗試不看答案，自己唸出每個 area 的 roadmap
```

### 考場看到陌生名詞時

```text
1. 先判斷它屬於 data、model、system、deployment、governance 哪一類
2. 再判斷題目是在問 definition、workflow、selection 還是 trap
3. 對回本地圖中的 area
4. 用最接近的 Exam Trigger Rule 作答
```

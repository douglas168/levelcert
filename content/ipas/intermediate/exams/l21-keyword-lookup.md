# L21 題目問的是 → 想到 快查表

> IPAS AI應用規劃師（中級）L21 科目 — 各課 Big Picture 關鍵字快速對照

## 目錄

- [L21101 自然語言處理技術與應用](#l21101-自然語言處理技術)
- [L21102 電腦視覺技術與應用](#l21102-電腦視覺技術與應)
- [L21103 生成式AI技術與應用](#l21103-生成式AI技術與)
- [L21104 多模態人工智慧應用](#l21104-多模態人工智慧應)
- [L21201 AI導入評估](#l21201-AI導入評估)
- [L21202 AI導入規劃](#l21202-AI導入規劃)
- [L21203 AI風險管理](#l21203-AI風險管理)
- [L21301 數據準備與模型選擇](#l21301-數據準備與模型選)
- [L21302 AI技術系統集成與部署](#l21302-AI技術系統集成)

---

## L21101 自然語言處理技術與應用

這張表不是背名詞用的，而是看到題目關鍵字時用來定位流程。

| 題目問的是 | 想到 | 考試判斷 |
|---|---|---|
| 文字怎麼切 | Tokenization | 還沒變成向量 |
| 文字怎麼變成數字 | Embedding | token 轉向量 |
| 模型怎麼看上下文 | Self-attention / Transformer | Q/K/V、長距依賴 |
| 任務該選哪個模型 | Encoder-only / Decoder-only / Encoder-decoder | 先看輸出形式 |
| 如何查文件後回答 | RAG | 檢索 → 增強 → 生成 |

---

## L21102 電腦視覺技術與應用

這張表不是背名詞，而是用「輸出格式」判斷答案。

| 題目線索 | 你要想到 | 常見架構 / 指標 |
|---|---|---|
| 整張圖一個類別 | 影像分類 (Classification) | ResNet / Top-1 accuracy |
| bbox、方框、位置 + 類別 | 物件偵測 (Object Detection) | YOLO、Faster R-CNN / mAP |
| 每個像素標類別、不分個體 | 語意分割 (Semantic Segmentation) | U-Net、DeepLab / mIoU |
| 每個像素標類別、同類也要分開 | 實例分割 (Instance Segmentation) | Mask R-CNN / mAP-mask |
| 天空、路面、行人、車全部逐像素標 | 全景分割 (Panoptic Segmentation) | Panoptic FPN（Feature Pyramid Network，特徵金字塔網路）/ PQ（Panoptic Quality，全景品質） |

---

## L21103 生成式AI技術與應用

這張表不是要死背名詞，而是用「題目關鍵字 → 第一個想到的概念」來做選擇。

| 題目問的是 | 想到 |
|---|---|
| 兩個網路對抗訓練 | GAN |
| 正向加噪 / 反向去噪 | Diffusion |
| 下一個 token 預測 | LLM / Pretrain |
| 雙向上下文 / MLM | BERT (encoder-only) |
| 單向 / 逐字生成 | GPT (decoder-only) |
| 翻譯 / 摘要 / seq2seq | T5 / BART (encoder-decoder) |
| reward model + PPO | RLHF |
| 指令微調 | SFT |
| 圖像品質+多樣性指標 | FID |
| text-to-image 對齊指標 | CLIP Score |
| 語言模型困惑度 | PPL |

---

## L21104 多模態人工智慧應用

| 題目問的是 | 想到 |
|---|---|
| 圖文對齊、零樣本分類、共享嵌入空間 | CLIP |
| 文字→圖像生成 | Stable Diffusion / DALL-E |
| Q 來自一模態、K/V 來自另一模態 | 交叉注意力 Cross-Attention |
| 語音轉文字、ASR（Automatic Speech Recognition，自動語音辨識）、log-Mel | Whisper |
| 視覺問答 VQA（Visual Question Answering，視覺問答）、看圖說話 | Flamingo / LLaVA / GPT-4V |
| 原生多模態、端到端多模態訓練 | GPT-4o / Gemini |
| 各自獨立分類器，輸出層投票/加權 | 晚期融合 Late Fusion |
| 原始特徵直接 concat | 早期融合 Early Fusion |
| 凍結 LLM + Perceiver Resampler | Flamingo |

---

---

## L21201 AI導入評估

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

---

## L21202 AI導入規劃

| 題目問的是 | 想到 |
|---|---|
| 「需求分析」「業務流程對映 AI」 | 需求分析五層（業·流·決·資·技） |
| 「誰負責誰簽核」「跨部門分工」 | RACI（R 執行 / A 當責 / C 諮詢 / I 告知） |
| 「要多少錢、多少人、多少時間」 | 資源分配五向量（錢·人·算·料·時） |
| 「試點驗證」「小範圍真實部署」 | Pilot（P4 階段） |
| 「單一衡量整體進展的指標」 | 北極星指標 North Star Metric（只能一個） |
| 「選工具 / 算 ROI（Return on Investment，投資報酬率）/ TCO（Total Cost of Ownership，總持有成本）」 | 那是 L21201，不是本課 |
| 「EU AI Act / 風險分級」 | 那是 L21203，不是本課 |
| 「k8s / CI/CD（Continuous Integration / Continuous Delivery，持續整合 / 持續交付）/ 模型漂移」 | 那是 L21302，不是本課 |

---

---

## L21203 AI風險管理

這張表不是名詞表，而是「題目看到什麼字，就該跳到哪個概念」。

| 題目關鍵字 | 第一反應 | 為什麼 |
|---|---|---|
| owner、score、treatment、review date | 風險登記簿（Risk Register） | 這是持續追蹤風險的文件 |
| residual risk 能不能接受 | 風險胃納（Risk Appetite） | 殘餘風險要和組織可接受上限比較 |
| social scoring、職場情緒辨識 | EU AI Act 禁止實務 | 先判斷能不能做 |
| chatbot、deepfake、AI 生成內容標示 | 限制風險 / 透明義務 | 重點是告知使用者 |
| policy、RACI（Responsible / Accountable / Consulted / Informed，負責 / 當責 / 諮詢 / 告知）、治理委員會 | NIST Govern | 治理與問責 |
| stakeholders、use context、harm 假設 | NIST Map | 盤點情境 |
| metrics、fairness test、robustness test | NIST Measure | 量測與驗證 |
| mitigation、rollback、incident response | NIST Manage | 處置與回應 |
| AI 管理系統、可認證 | ISO/IEC 42001:2023 | AIMS（AI Management System，AI 管理系統）標準 |
| 7 trustworthy AI requirements | HLEG（High-Level Expert Group on AI，歐盟高階專家小組） | 發布方配對題 |

---

## L21301 數據準備與模型選擇

| 題目問的是 | 想到 |
|---|---|
| 樣本偏向某族群、地區、時段 | 代表性不足（Representativeness） |
| 資料有空值、空白欄位 | 缺失值處理（Missing Value Imputation） |
| 某值明顯偏離常識 | 異常值判斷（Outlier） |
| 特徵數值尺度差很大 | 尺度調整（Scaling） |
| 類別欄位轉數字 | 類別編碼（Categorical Encoding） |
| 模型選哪個最好 | 看任務 × 資料 × 商業 × 成本 trade-off |
| 詐欺、流失、罕見故障 | 類別不平衡（Class Imbalance）→ 不能只看 Accuracy |
| 模型離線好、上線差 | Data Leakage 或代表性問題 |
| 選哪個集合來決定最終模型 | Validation Set（驗證集） |
| 最後一次確認模型好壞 | Test Set（測試集） |

---

---

## L21302 AI技術系統集成與部署

先看題幹的動詞：保存版本、立刻預測、整批重算、變慢、退化、回復。動詞會直接指向元件或處理策略。

| 題目問的是 | 想到 |
|---|---|
| 哪一版模型可以上線、哪一版可回滾 | Model Registry |
| 使用者馬上要拿到預測 | Real-time Inference / API Serving（API = Application Programming Interface，應用程式介面） |
| 每晚重算整批名單 | Batch Inference |
| 上線後變慢、錯誤率升高 | System Monitoring |
| 輸入資料分布改變、模型準確率退化 | Model Monitoring / Drift |
| 新版本出問題要快速恢復 | Rollback |
| 少量流量先試新版本 | Canary Deployment |
| 對外承諾可用性與補償 | SLA（Service Level Agreement，服務水準協議） |

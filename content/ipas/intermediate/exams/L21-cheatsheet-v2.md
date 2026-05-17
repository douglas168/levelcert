# L21 科目一考前快刷 v2
*iPAS AI 應用規劃師中級｜考試日期：2026-05-23*

> 使用方式：先讀 `0. 30-Minute Exam Warm-up`，再讀 `1. Cross-Lesson Decision Trees` 和 `2. High-Frequency Trap Clinic`。時間足夠時，再回到各課的 `題目看到什麼` 與 `10 秒自問`。

---

## 0. 30-Minute Exam Warm-up

### 最後 30 分鐘只看這些

| # | 一秒判斷 | 考試答案方向 |
|---|---|---|
| 1 | 文字分類、NER（Named Entity Recognition，命名實體辨識）、抽取式 QA（Question Answering，問答） | BERT（Bidirectional Encoder Representations from Transformers，雙向編碼器表徵） / Encoder-only / 雙向 |
| 2 | 文字生成、對話、next-token | GPT（Generative Pre-trained Transformer，生成式預訓練 Transformer） / Decoder-only / 自迴歸 |
| 3 | 知識常更新、內部文件、降低幻覺 | RAG（Retrieval-Augmented Generation，檢索增強生成），不是 Fine-tuning |
| 4 | 行為、格式、語氣一致性 | Fine-tuning / SFT（Supervised Fine-Tuning，監督式微調） |
| 5 | 人類偏好且需要 Reward Model + PPO（Proximal Policy Optimization，近端策略最佳化） | RLHF（Reinforcement Learning from Human Feedback，人類回饋強化學習） |
| 6 | 人類偏好但不需要 Reward Model | DPO（Direct Preference Optimization，直接偏好最佳化） |
| 7 | Diffusion 固定加雜訊 | Forward process，不需學習 |
| 8 | Diffusion 去雜訊 | Reverse process，U-Net 要訓練 |
| 9 | CLIP（Contrastive Language-Image Pre-training，對比式語言-影像預訓練） | 文圖對齊 / zero-shot / 檢索，不生成圖 |
| 10 | 文字生圖 | DALL-E / Stable Diffusion |
| 11 | 兩隻同類物件能不能分開 | Semantic 不能，Instance 可以 |
| 12 | ResNet skip connection | 解決 Degradation，不是 Overfitting |
| 13 | 雙重約束 | 先篩掉不合格方案，再做加權評分 |
| 14 | 加權評分矩陣 | 權重必須評分前決定 |
| 15 | RACI（Responsible, Accountable, Consulted, Informed，負責 / 當責 / 諮詢 / 知會）的 A | Accountable，每行只能一人 |
| 16 | North Star Metric | 每專案只能一個 |
| 17 | EU AI Act High Risk | 可做但要重度合規，不是禁止 |
| 18 | EU AI Act Unacceptable | 才是禁止 |
| 19 | Data Drift | P(X) 輸入分布改變 |
| 20 | Concept Drift | P(Y\|X) 輸入與輸出關係改變 |
| 21 | Shadow deployment | 用戶仍收舊版，新版只背景跑 |
| 22 | Canary deployment | 小比例用戶真的收到新版 |
| 23 | Target Encoding | 切分資料後，只用 train 算 |
| 24 | SMOTE（Synthetic Minority Over-sampling Technique，合成少數類過取樣技術） | 只在 train / fold 內做，不碰 test |

---

## 1. Cross-Lesson Decision Trees

### AI 方法選擇

```text
題目問文字理解 / 分類 / NER / 抽取式 QA
→ BERT / Encoder-only

題目問文字生成 / 對話 / next token
→ GPT / Decoder-only

題目問翻譯 / 摘要 / seq2seq
→ T5 或 BART / Encoder-Decoder

題目問內部文件、知識時效、引用來源、降低幻覺
→ RAG（Retrieval-Augmented Generation，檢索增強生成）

題目問固定語氣、格式、行為、領域回答風格
→ Fine-tuning / SFT（Supervised Fine-Tuning，監督式微調）
```

### 視覺任務選擇

```text
只要圖片類別
→ Image Classification

要框出物件
→ Object Detection

每個像素要分類，但同類物件不用分開
→ Semantic Segmentation

每個像素要分類，且同類物件要分成不同個體
→ Instance Segmentation

背景 stuff + 個體 things 都要完整理解
→ Panoptic Segmentation
```

### AI 導入選擇

```text
題目在評估方案是否可行
→ 先 Business Framing，再雙重約束，再加權評分

題目在問導入路線
→ 需求分析 → 方案設計 → 資源規劃 → Pilot → Rollout

題目在問能不能上線
→ Pilot 五條件都通過才放行

題目在問風險合規
→ Risk Register + Owner + 固有風險 + 控制措施 + 殘餘風險
```

### 部署與監控選擇

```text
真實流量鏡像，但不影響使用者
→ Shadow Test

小比例使用者真的收新版
→ Canary

兩套完整環境瞬間切換
→ Blue-Green

比較商業轉換率
→ A/B Testing（A/B 測試）

外部合約與罰則
→ SLA（Service Level Agreement，服務水準協議）

內部服務目標
→ SLO（Service Level Objective，服務水準目標）

實際測量值
→ SLI（Service Level Indicator，服務水準指標）
```

---

## 2. High-Frequency Trap Clinic

| 常混淆 | 一秒判斷 | 不要選 |
|---|---|---|
| BERT vs GPT | BERT=理解/分類；GPT=生成/對話 | 不要把 BERT 當生成模型 |
| RAG vs Fine-tuning | RAG 修知識；Fine-tuning 修行為 | 不要說 RAG 會改權重 |
| RLHF vs DPO | RLHF 有 Reward Model；DPO 沒有 | 不要說 DPO 也要 PPO |
| Diffusion forward vs reverse | Forward 加雜訊不學；Reverse 去雜訊要學 | 不要說 forward 要訓練 |
| CLIP vs DALL-E/SD | CLIP 對齊；DALL-E/SD 生成 | 不要說 CLIP 生成圖片 |
| Semantic vs Instance | Semantic 不分個體；Instance 分個體 | 不要只看都有 segmentation |
| ResNet Degradation vs Overfitting | Degradation=深了反而差 | 不要答 Overfitting |
| 雙重約束 vs 加權評分 | 先篩後評分 | 不要先評分再篩 |
| RACI A vs R | A 一人；R 可多人 | 不要讓多個 A 同時當責 |
| High Risk vs Unacceptable | High Risk 可做但要合規；Unacceptable 禁止 | 不要把高風險當禁止 |
| FRIA（Fundamental Rights Impact Assessment，基本權利影響評估） vs DPIA（Data Protection Impact Assessment，資料保護影響評估） | FRIA 看基本權；DPIA 看資料保護 | 不要說兩者範圍相同 |
| Shadow vs Canary | Shadow 不影響用戶；Canary 影響小比例用戶 | 不要說 Shadow 用戶收到新版 |
| Data Drift vs Concept Drift | X 變 = Data；Y\|X 變 = Concept | 不要對調 |
| Target Encoding | 切分後用 train 算 | 不要全資料先算 |
| SMOTE | 只在 train / fold 做 | 不要對 test oversample |

---

## 3. Formula / Parameter Danger Zone

| 主題 | 必記 | 常見陷阱 |
|---|---|---|
| Self-Attention | `softmax(QK^T / sqrt(d_k)) × V` | Multi-head 是多組 QKV 並行 |
| Conv 輸出尺寸 | `O = floor((W - F + 2P) / S) + 1` | P 是 padding，S 是 stride |
| ResNet | `H(x) = F(x) + x` | 維度不同才用 1x1 projection |
| ROI（Return on Investment，投資報酬率） | `(淨效益 / 投入) × 100%` | 淨效益 = 總效益 - 總成本 |
| Payback Period | `投入 / 年均淨效益` | >3 年通常不佳 |
| Break-even | `固定成本 / (API（Application Programming Interface，應用程式介面）單價 - 自建變動成本)` | 分母是單位成本差 |
| 固有風險 | `可能性 × 衝擊` | 衝擊取最大值，不取平均 |
| Precision | `TP / (TP + FP)` | FP 代價高時優先 |
| Recall | `TP / (TP + FN)` | FN 代價高時優先 |
| F1 | `2PR / (P + R)` | Precision / Recall 都要顧 |

---

## 4. Lesson-by-Lesson Quick Review

## L21101 自然語言處理技術與應用

### 先懂一句話

NLP（Natural Language Processing，自然語言處理）考題大多在問「文字進模型的流程」和「BERT / GPT / T5 / BART 要選誰」。

### 題目看到什麼

- 看到 `Tokenization → Embedding → Transformer`：這是 NLP pipeline。
- 看到 BERT：Encoder-only、雙向、MLM（Masked Language Modeling，遮罩語言模型）、分類 / NER / 抽取式 QA。
- 看到 GPT：Decoder-only、單向、自迴歸、next-token、生成 / 對話。
- 看到 T5：Encoder-Decoder、Span Corruption、Sentinel Token。
- 看到 BART：Encoder-Decoder、Multi-noise Denoising。
- 看到 RAG：Retrieval → Augmentation → Generation；用來補外部知識、降低幻覺。
- 看到 BLEU：翻譯；看到 ROUGE：摘要。

### 必背比較

| 模型 | 架構 | 訓練目標 | 代表任務 |
|---|---|---|---|
| BERT | Encoder-only | MLM + NSP（Next Sentence Prediction，下一句預測） | 分類、NER、抽取式 QA |
| GPT | Decoder-only | Causal LM / Next-token | 文字生成、對話 |
| T5 | Encoder-Decoder | Span Corruption | 翻譯、摘要、seq2seq |
| BART | Encoder-Decoder | Multi-noise Denoising | 摘要、翻譯、生成 |

### 考試陷阱

- word2vec 是 prediction-based；GloVe 是 co-occurrence。
- WordPiece 用 `##` 前綴；BPE（Byte Pair Encoding，位元組對編碼）和 Unigram 不用。
- RAG 不是 Fine-tuning 的替代品：RAG 修知識，Fine-tuning 修行為。

### 10 秒自問

題目問「公司文件每週更新，希望模型回答時引用最新資料」，選 RAG 還是 Fine-tuning？

答案：RAG。因為知識常更新且需要外部文件；Fine-tuning 比較適合固定行為、格式、語氣。

---

## L21102 電腦視覺技術與應用

### 先懂一句話

CV（Computer Vision，電腦視覺）考題核心是「輸出要多細」：只分類、畫框、標像素、還是分個體。

### 題目看到什麼

- 看到 CNN（Convolutional Neural Network，卷積神經網路）：Conv → BN（Batch Normalization，批次正規化） → ReLU（Rectified Linear Unit，修正線性單元） → Pooling → FC（Fully Connected，全連接層）。
- 看到輸出尺寸：用 `floor((W - F + 2P) / S) + 1`。
- 看到 ResNet：Skip Connection，解決 Degradation。
- 看到 IoU：交集 / 聯集。
- 看到 AP（Average Precision，平均精確率）：單一類別 PR（Precision-Recall，精確率-召回率）曲線面積；mAP（mean Average Precision，平均 AP）：多類別 AP 平均。
- 看到 mAP@0.5:0.95：比 mAP@0.5 更嚴格。

### 必背比較

| 任務 | 輸出 | 能否區分同類個體 |
|---|---|---|
| Classification | 單一類別 | 否 |
| Detection | Box + Class | 用 box 區分 |
| Semantic Segmentation | 每像素類別 | 否 |
| Instance Segmentation | 每像素類別 + 個體 ID | 是 |
| Panoptic Segmentation | stuff + things | 是 |

### 考試陷阱

- ResNet 解決 Degradation，不是 Overfitting。
- Semantic Segmentation 不分同類個體；Instance Segmentation 會分。
- Projection Shortcut 只在維度不同時使用。

### 10 秒自問

題目說「要知道每個像素屬於貓或狗，但不需要分辨第 1 隻貓和第 2 隻貓」，選哪個任務？

答案：Semantic Segmentation。因為只要像素類別，不需要個體 ID。

---

## L21103 生成式 AI 技術與應用

### 先懂一句話

生成式 AI 考題常在分「GAN（Generative Adversarial Network，生成對抗網路）對抗」、「Diffusion 去雜訊」、「LLM（Large Language Model，大型語言模型）三段訓練」。

### 題目看到什麼

- 看到 Generator + Discriminator：GAN。
- 看到 Mode Collapse：GAN 多樣性不足，不是 Overfitting。
- 看到逐步加雜訊：Diffusion forward，不需訓練。
- 看到 U-Net 去雜訊：Diffusion reverse，需要訓練。
- 看到 Stable Diffusion：Latent Diffusion + CLIP text encoder + Cross-Attention。
- 看到 Pretrain → SFT → RLHF/DPO：LLM 訓練流程。

### 必背比較

| 階段 | 資料 | 目的 |
|---|---|---|
| Pretrain | 大量無標籤文字 | 學語言與世界知識 |
| SFT（Supervised Fine-Tuning，監督式微調） | 指令-回答對 | 學回答格式 |
| RLHF（Reinforcement Learning from Human Feedback，人類回饋強化學習） | chosen/rejected + Reward Model + PPO（Proximal Policy Optimization，近端策略最佳化） | 人類偏好對齊 |
| DPO（Direct Preference Optimization，直接偏好最佳化） | chosen/rejected | 直接最佳化，無 Reward Model |

### 考試陷阱

- Diffusion forward 是固定排程，不需學習。
- RLHF 需要 Reward Model；DPO 不需要。
- FID（Fréchet Inception Distance，Fréchet Inception 距離）是批次比較，數值越低越好。

### 10 秒自問

RLHF 和 DPO 都用偏好資料，最大差別是什麼？

答案：RLHF 需要 Reward Model + PPO；DPO 直接最佳化語言模型，不需要 Reward Model。

---

## L21104 多模態人工智慧應用

### 先懂一句話

多模態考題要先判斷：只是對齊？轉換？還是融合多種輸入？

### 題目看到什麼

- 看到 CLIP：文圖對齊、zero-shot、跨模態檢索；不生成圖。
- 看到 DALL-E / Stable Diffusion：文字生成圖像。
- 看到 Cross-Attention：Q 來自一個模態，K/V 來自另一個模態。
- 看到 LLaVA（Large Language and Vision Assistant，大型語言與視覺助理）：MLP（Multilayer Perceptron，多層感知器）Projection / prefix，不用 Cross-Attention。
- 看到 Flamingo：Gated Cross-Attention + Perceiver Resampler。
- 看到 Whisper：ASR（Automatic Speech Recognition，自動語音辨識），Encoder-Decoder + Cross-Attention。

### 必背比較

| 融合策略 | 時機 | 特點 |
|---|---|---|
| Early Fusion | 原始輸入層 | 簡單但容易受特徵差異影響 |
| Late Fusion | 決策層 | 模態缺失時可 graceful degradation |
| Hybrid Fusion | 中間層 | attention / gate |
| Cross-Attention | 中間層 | 最靈活，Q 與 K/V 來自不同模態 |

### 考試陷阱

- CLIP 不生成圖像。
- LLaVA 不用 Cross-Attention；Flamingo 才用。
- Late Fusion 的重點是模態缺失時仍可運作。

### 10 秒自問

題目說「模型可以用文字找圖片，也可以 zero-shot 分類，但不會生成圖片」，是哪個？

答案：CLIP。因為 CLIP 做跨模態對齊，不是生成模型。

---

## L21201 AI 導入評估

### 先懂一句話

導入評估是在回答「這個 AI 專案值不值得做、能不能做、該用哪個方案」。

### 題目看到什麼

- 看到方案初篩：先做雙重約束，再做加權評分。
- 看到 p95 latency：比平均值更適合 SLA。
- 看到知識時效 / 幻覺：RAG。
- 看到語氣 / 格式 / 行為一致性：Fine-tuning。
- 看到 TCO（Total Cost of Ownership，總持有成本）：直接成本 + 間接成本 + 機會成本。
- 看到 Payback Period：投入 / 年均淨效益。

### 必背比較

| 方案 | 解決什麼 | 不解決什麼 |
|---|---|---|
| Prompt Engineering | 簡單格式調整 | 知識缺口 |
| RAG | 知識時效、內部文件、幻覺 | 行為一致性 |
| Fine-tuning | 行為、格式、語氣 | 即時知識更新 |
| From-scratch | 全面客製 | 成本極高 |

### 考試陷阱

- 雙重約束在加權評分之前。
- 權重必須在評分前設定，事後調整是確認偏誤。
- TCO 不只是 API 或伺服器費用。

### 10 秒自問

題目說「平均延遲很好，但少數使用者等很久」，應該看平均延遲還是 p95？

答案：p95。因為對外 SLA 要看長尾體驗，平均值會掩蓋慢請求。

---

## L21202 AI 導入規劃

### 先懂一句話

導入規劃是在回答「從需求到上線，誰負責、用什麼指標、什麼時候放大」。

### 題目看到什麼

- 看到 Roadmap：需求分析 → 方案設計 → 資源規劃 → Pilot → Rollout。
- 看到需求層級：業務目標 → 流程 → 決策 → 資料 → 技術，不可跳層。
- 看到 RACI：A 每行只能一人；R 可多人。
- 看到 NSM（North Star Metric，北極星指標）：每專案只能一個。
- 看到 BCG（Boston Consulting Group，波士頓顧問公司）10/20/70：演算法 10%、資料 20%、人員與流程 70%。
- 看到 CRISP-DM（Cross-Industry Standard Process for Data Mining，跨產業資料探勘標準流程）：迭代循環，不是線性。

### 必背比較

| 概念 | 範圍 | 關鍵限制 |
|---|---|---|
| PoC（Proof of Concept，概念驗證） | 技術可行性 | 內部、小樣本 |
| MVP（Minimum Viable Product，最小可行產品） | 產品可用性 | 最小功能、早期客戶 |
| Pilot | 真實流量 | 5 條件通過才 Rollout |

### 考試陷阱

- RACI 的 A 只能一人。
- BCG 10/20/70 的 70% 是人員與流程，不是演算法。
- NSM 多個就不是 North Star。

### 10 秒自問

題目問「AI 專案最大導入瓶頸通常在哪裡」，BCG 10/20/70 要選哪一項？

答案：人員與流程。BCG 10/20/70 中 70% 是 people/process。

---

## L21203 AI 風險管理

### 先懂一句話

風險管理考題要先判斷「風險類型、風險等級、誰負責、要不要禁止」。

### 題目看到什麼

- 看到 Risk Register：Owner、固有風險、控制措施、殘餘風險、處置方式、複查日期。
- 看到風險分數：可能性 × 衝擊；衝擊取最大值。
- 看到殘餘風險 > 風險胃納：需要進一步處置。
- 看到 EU AI Act Unacceptable：禁止。
- 看到 EU AI Act High Risk：可做，但需重度合規。
- 看到 FRIA：基本權利影響評估，範圍大於 DPIA。
- 看到 NIST AI RMF（National Institute of Standards and Technology AI Risk Management Framework，美國國家標準與技術研究院 AI 風險管理框架）：Govern → Map → Measure → Manage。

### 必背比較

| 框架 / 標準 | 性質 | 重點 |
|---|---|---|
| EU AI Act | 法規風險分級 | 禁止 / 高風險 / 有限透明 / 微小 |
| NIST AI RMF | 美國風險框架 | 治盤量管 |
| ISO 42001 | 可認證 AI 管理系統 | AI 整體治理 |
| ISO 23894 | 方法指引 | AI 風險管理 |
| ISO 27001 | 可認證資安系統 | CIA（Confidentiality, Integrity, Availability，機密性、完整性、可用性），不是完整 AI 治理 |

### 考試陷阱

- High Risk 不等於禁止。
- FRIA 範圍大於 DPIA。
- ISO 27001 是資安，不是 AI 治理框架。
- 衝擊取最大值，不取平均。

### 10 秒自問

題目說「系統屬於 Annex III 高風險」，是否代表完全不能部署？

答案：不是。High Risk 可以部署，但需要重度合規；Unacceptable 才是禁止。

---

## L21301 數據準備與模型選擇

### 先懂一句話

這課考的是「先切資料、防止 leakage、再根據資料型態選處理方法與模型」。

### 題目看到什麼

- 看到偏態 / 離群值：缺失填補常用 median；縮放用 RobustScaler。
- 看到 SVM（Support Vector Machine，支援向量機） / k-NN（k-Nearest Neighbors，k 近鄰）：需要縮放。
- 看到決策樹 / Random Forest：通常不需要縮放。
- 看到 Target Encoding：切分後，只用 train 算。
- 看到 Train / Validation / Test：train 學習、validation 調參、test 最終一次驗證。
- 看到類別不平衡：不要只看 Accuracy；看 Precision / Recall / F1。

### 必背比較

| 方法 | 適用 | 陷阱 |
|---|---|---|
| Standardization | 常態、SVM、線性模型 | 無固定上下界 |
| Min-Max | 需要 0-1 範圍 | 怕離群值 |
| RobustScaler | 有離群值 | 用 median + IQR |
| One-Hot | 無順序、低基數類別 | 維度可能膨脹 |
| Target Encoding | 高基數類別 | 必須切分後處理 |

### 考試陷阱

- Target Encoding 在切分前做就是 Target Leakage。
- SMOTE 只對訓練集做。
- Test Set 只能用一次；多次用 test 調參也是 leakage。
- R2 可以是負數，不是百分比。

### 10 秒自問

題目說「資料類別極度不平衡，但 Accuracy 很高」，可不可以直接說模型好？

答案：不可以。類別不平衡時 Accuracy 可能誤導，應看 Precision、Recall、F1。

---

## L21302 AI 技術系統集成與部署

### 先懂一句話

部署考題是在分「模型怎麼上線、怎麼測、怎麼監控、漂移是哪一種」。

### 題目看到什麼

- 看到 MLOps（Machine Learning Operations，機器學習維運）：Training → Model Registry → Serving → Monitoring → Retraining/Rollback。
- 看到 Model Registry：版本、metadata、指標、審批狀態、rollback 標的；不存 active endpoint。
- 看到 Feature Store：避免 Training-Serving Skew。
- 看到 Batch 推論：排程、大量、非即時。
- 看到 Real-time 推論：低延遲、即時回應。
- 看到 Data Drift：P(X) 改。
- 看到 Concept Drift：P(Y|X) 改。

### 必背比較

| 部署策略 | 使用者收到什麼 | 風險 |
|---|---|---|
| Shadow | 舊版，新版只背景跑 | 最低 |
| Canary | 小比例收到新版 | 低 |
| A/B Testing | 分流比較商業效果 | 中 |
| Blue-Green | 切換後全部新版 | 中，回滾快 |

### 考試陷阱

- Shadow 不是 Canary；Shadow 不影響使用者。
- Data Drift 與 Concept Drift 不要對調。
- Model Registry 不存 Active Endpoint。
- SLA 是合約，SLO 是內部目標，SLI 是實測值。

### 10 秒自問

題目說「新模型接收真實流量，但使用者仍看到舊模型結果」，是哪種部署？

答案：Shadow。因為新版只在背景鏡像測試，使用者不受影響。

---

## Final Oral Recall

不用看上面，直接唸出答案：

1. BERT 適合什麼？答案：理解、分類、NER、抽取式 QA。
2. GPT 適合什麼？答案：生成、對話、next-token。
3. RAG 和 Fine-tuning 最大差別？答案：RAG 不改權重查文件；Fine-tuning 改權重或 adapter。
4. CLIP 做什麼？答案：文圖對齊，不生成圖。
5. Semantic 和 Instance Segmentation 差別？答案：Instance 分個體，Semantic 不分。
6. ResNet 解決什麼？答案：Degradation，不是 Overfitting。
7. 雙重約束在加權評分前還後？答案：前。
8. RACI 的 A 可以幾人？答案：一人。
9. High Risk 是否禁止？答案：不是，可做但要重度合規。
10. Shadow 和 Canary 差別？答案：Shadow 不讓用戶收新版，Canary 會。

---

*v2 版本：2026-05-17｜重排為 Warm-up → Decision Trees → Trap Clinic → Danger Zone → Lesson Quick Review*

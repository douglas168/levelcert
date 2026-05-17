# L21 科目一 考前速查表
*IPAS AI應用規劃師 中級 ｜ 考試日期：2026-05-23*

---

## L21101 自然語言處理技術與應用

### 核心概念

- **NLP Pipeline**：Raw text → Tokenization → Embedding → Transformer → Task output
- **Tokenizer 三家**：BPE（GPT/RoBERTa）、WordPiece（BERT，subword 加 `##` 前綴）、Unigram（T5/SentencePiece）
- **Embedding 兩代**：Static（word2vec=預測式、GloVe=共現矩陣）vs Contextualized（ELMo/BERT，同字不同義均可處理）
- **Self-Attention 公式**：`softmax(QK^T / √d_k) × V`；Multi-head = 多組 QKV 並行再拼接
- **Positional Encoding**：Transformer 本身對順序不感知，需要額外加入位置資訊
- **三大 Transformer 家族**：Encoder-only（BERT，雙向）→ Decoder-only（GPT，自迴歸）→ Encoder-Decoder（T5/BART，seq2seq）
- **訓練目標**：MLM=BERT、Next-token=GPT、Span Corruption/Sentinel=T5、Multi-noise Denoising=BART
- **RAG**：Retrieval → Augmentation → Generation；用於內部文件問答、降低幻覺、即時更新知識
- **PEFT/LoRA**：資源有限時的微調策略，只訓練少量參數
- **評估指標**：BLEU（機器翻譯，↑越好）、ROUGE（摘要，↑越好）
- **CKIP**：中研院繁體中文 NLP 工具

### 必考流程 / 比較表

| 模型 | 架構 | 訓練目標 | 代表任務 |
|------|------|---------|---------|
| BERT | Encoder-only（雙向） | MLM + NSP | 分類、NER、抽取式 QA |
| GPT | Decoder-only（單向） | Causal LM（Next-token） | 文字生成、對話 |
| T5 | Encoder-Decoder | Span Corruption + Sentinel Token | 翻譯、摘要、seq2seq |
| BART | Encoder-Decoder | Multi-noise Denoising | 摘要、翻譯、生成 |

| 嵌入類型 | 代表 | 特點 |
|---------|------|------|
| Static（靜態） | word2vec、GloVe | 一字一向量，無法處理一詞多義 |
| Contextualized（動態） | ELMo、BERT | 依上下文動態生成向量 |

### 考試陷阱

- ⚠️ **word2vec = 預測式（prediction-based）**，GloVe = 共現矩陣（co-occurrence）；兩者都是 Static Embedding，不要混淆
- ⚠️ **BERT 是 Encoder-only（雙向）**，GPT 是 Decoder-only（單向）；做分類任務選 BERT，做生成任務選 GPT
- ⚠️ **RAG 解決幻覺/知識時效問題**，不是 Fine-tuning 的替代品；Fine-tuning 解決行為/格式問題
- ⚠️ **WordPiece subword 用 `##` 前綴**（如 `playing` → `play` + `##ing`），BPE 和 Unigram 不用

---

## L21102 電腦視覺技術與應用

### 核心概念

- **CNN 五元素**：Conv（局部特徵）→ BN（訓練穩定）→ ReLU（非線性）→ Pooling（降採樣+平移不變性）→ FC（分類輸出）
- **Conv 輸出尺寸公式**：`O = floor((W - F + 2P) / S) + 1`
  - W=輸入尺寸、F=Filter 大小、P=Padding、S=Stride
- **ResNet Skip Connection**：`H(x) = F(x) + x`；dimension 不同時用 1×1 conv（Projection Shortcut）；解決 Degradation 問題（非過擬合）
- **五大視覺任務**：Classification → Detection → Semantic Segmentation → Instance Segmentation → Panoptic Segmentation
- **IoU = 交集 / 聯集**；AP = PR 曲線面積（單一類別）；mAP = 各類別 AP 平均
- **mAP@0.5**（PASCAL VOC，寬鬆）vs **mAP@0.5:0.95**（COCO，10 個閾值平均，嚴格）
- **mIoU**：Semantic/Panoptic Segmentation 的主要指標，以像素級 IoU 取平均

### 必考流程 / 比較表

| 任務 | 輸出 | 代表模型 | 主要指標 | 區分 Instance |
|------|------|---------|---------|-------------|
| Image Classification | 單一類別標籤 | ResNet | Top-1/Top-5 Accuracy | — |
| Object Detection | Bounding Box + Class | YOLO、Faster R-CNN | mAP | 否 |
| Semantic Segmentation | 每像素類別 | U-Net、DeepLab | mIoU | 否（同類合併） |
| Instance Segmentation | 每像素類別 + 個體ID | Mask R-CNN | mAP-mask | 是 |
| Panoptic Segmentation | stuff（背景）+ things（個體） | Panoptic FPN | PQ（Panoptic Quality） | 是 |

| 偵測器 | 架構 | 速度 | 精度 | 適用場景 |
|--------|------|------|------|---------|
| YOLO | 單階段（Single-stage） | 快（高 FPS） | 略低 | 即時偵測 |
| Faster R-CNN | 兩階段（RPN + NMS） | 慢 | 高 | 高精度需求 |

### 考試陷阱

- ⚠️ **ResNet 解決 Degradation（退化）問題**，不是 Overfitting；越深的網路若無 skip connection 反而準確率下降
- ⚠️ **Semantic Segmentation 無法區分同類的不同個體**（例：兩隻貓同色），Instance Segmentation 可以
- ⚠️ **mAP@0.5:0.95 比 mAP@0.5 嚴格**，COCO benchmark 用前者，PASCAL VOC 用後者
- ⚠️ **Projection Shortcut**（1×1 conv）只在 ResNet 通道數不同時使用，不是每層都用

---

## L21103 生成式 AI 技術與應用

### 核心概念

- **GAN 架構**：Generator（雜訊 z → 假樣本 G(z)）+ Discriminator（判斷真假，輸出 0-1 機率）；D 內部損失 = BCE
- **GAN 失敗模式**：Mode Collapse（生成多樣性不足）+ Training Instability（D/G 失衡）
- **Diffusion 前向過程**：固定雜訊排程（無需學習），逐步加雜訊直到純雜訊
- **Diffusion 反向過程**：U-Net 學習去雜訊；DDPM 損失 = `||ε - ε_θ||²`（MSE on noise）
- **DDIM 加速**：從 ~1000 步縮至 20-50 步，品質略降但可接受
- **Stable Diffusion = Latent Diffusion + CLIP 文字編碼器 + Cross-Attention**
- **LLM 三段訓練**：Pretrain（無監督文字，學知識/事實）→ SFT（指令-回答對，學格式）→ RLHF/DPO（人類偏好，學對齊）
- **RLHF vs DPO**：RLHF = 需要 Reward Model + PPO；DPO = 直接 LM 最佳化，無 Reward Model
- **RAG 在生成式 AI**：Retrieval-Augmented Generation，減少幻覺，適合知識型 QA

### 必考流程 / 比較表

| 階段 | 資料 | 目的 | 學到什麼 |
|------|------|------|---------|
| Pretrain | 大量無標籤文字 | Next-token prediction | 世界知識、語言規律 |
| SFT | 指令-回答對（有標籤） | 格式對齊 | 如何回答問題 |
| RLHF | 人類偏好排序（Chosen/Rejected） | 人類價值對齊 | 什麼是好的回應 |
| DPO | 同 RLHF 資料，但直接優化 | 更穩定的對齊 | 無需 Reward Model |

| 評估指標 | 用途 | 方向 |
|---------|------|------|
| PPL（Perplexity） | 文字生成品質 | ↓ 越好 |
| FID（Fréchet Inception Distance） | 圖像生成品質（批次比較） | ↓ 越好 |
| CLIP Score | 文字-圖像對齊程度 | ↑ 越好 |
| BLEU | 機器翻譯 | ↑ 越好 |
| WER（Word Error Rate） | 語音辨識（ASR） | ↓ 越好 |

### 考試陷阱

- ⚠️ **Diffusion 前向過程不需學習**（固定排程），只有反向過程（U-Net）才需要訓練
- ⚠️ **RLHF 需要 Reward Model**，DPO 不需要——題目可能混淆兩者
- ⚠️ **FID 是批次比較**（real batch vs generated batch），不是逐張比較；數值越低越好
- ⚠️ **GAN 的 Mode Collapse ≠ Overfitting**；是 Generator 只學到部分資料分布，生成多樣性不足

---

## L21104 多模態人工智慧應用

### 核心概念

- **多模態 ⊇ 跨模態**：多模態=處理多種輸入；跨模態=一種轉換另一種（方向性任務）
- **三種模態編碼器**：Text（BPE + Transformer）、Image（CNN / ViT 16×16 patches）、Audio（log-Mel 頻譜圖 + Conv/Transformer → Whisper）
- **CLIP**：雙編碼器（Dual Encoder）+ 對稱式 InfoNCE 對比損失 + 共享嵌入空間；**只做對齊，不生成圖像**
- **Cross-Attention 公式**：與 Self-Attention 相同，差別是 Q 來自模態 A，K/V 來自模態 B
- **Self-Attention vs Cross-Attention**：Self = Q/K/V 同序列；Cross = Q 一個模態，K/V 另一個模態

### 必考流程 / 比較表

| 融合策略 | 時機 | 特點 | 注意 |
|---------|------|------|------|
| Early Fusion（早融合） | 原始輸入層 | 簡單拼接 | 特徵空間差異大時易失效 |
| Late Fusion（晚融合） | 決策層 | voting/ensemble | 單一模態缺失時可 graceful degradation |
| Hybrid Fusion（混合融合） | 中間層 | attention/gate | 平衡兩者 |
| Cross-Attention（跨模態注意力） | 中間層 | Q from A，K/V from B | 最靈活，CLIP/Flamingo 等使用 |

| 架構 | 功能 | 關鍵技術 |
|------|------|---------|
| CLIP | 文圖對齊、零樣本分類、跨模態檢索 | 雙編碼器 + InfoNCE |
| DALL-E / Stable Diffusion | 文字→圖像生成 | Diffusion + CLIP encoder |
| Flamingo | 視覺語言理解（VQA等） | Gated Cross-Attention + Perceiver Resampler + 凍結 LLM |
| LLaVA | 視覺語言理解 | MLP Projection（prefix），**不用 Cross-Attention** |
| Whisper | 語音辨識（ASR） | Encoder-Decoder + Cross-Attention |
| GPT-4o | 原生多模態 | End-to-end，單一模型 |
| Gemini | 多模態 | 預訓練時即多模態 |

### 考試陷阱

- ⚠️ **CLIP 不生成圖像**，只做對齊（zero-shot 分類、跨模態檢索）；DALL-E/SD 才生成圖像
- ⚠️ **LLaVA 用 MLP Projection（prefix）而非 Cross-Attention**；Flamingo 才用 Gated Cross-Attention
- ⚠️ **Late Fusion 的優勢是模態缺失時仍可運作**（graceful degradation），不是精度最高
- ⚠️ **Whisper 是 Encoder-Decoder + Cross-Attention**，Cross-Attention 在此連接音頻 Encoder 與文字 Decoder

---

## L21201 AI 導入評估

### 核心概念

- **5 階段評估漏斗**：Business Framing → Longlist → 雙重約束過濾（先！）→ 加權評分矩陣 → PoC Go/No-Go
- **雙重約束（Dual-Constraint）**：兩個條件同時必須通過（AND 邏輯）；常見組合：延遲+成本、準確率+隱私；在加權評分**之前**執行
- **技術績效 5 指標**：準（Accuracy/F1）· 延（Latency p95/TTFT）· 量（Throughput QPS）· 伸（Scalability）· 靠（Reliability/SLA）
- **p95 Latency**：對外 SLA 用 p95（不是平均）；TTFT 用於 LLM 對話體驗
- **Solution Ladder（低→高）**：Prompt Engineering → RAG → Fine-tuning → From-scratch；永遠先試最低階
- **RAG vs Fine-tuning**：RAG=修正事實/幻覺/知識時效；Fine-tuning=修正行為/格式/語氣一致性
- **TCO**：直接成本 + 間接成本 + 機會成本（不只是 API 費用）
- **ROI = (淨效益 ÷ 投入) × 100%**；淨效益 = 總效益 − 總成本
- **Payback Period = 投入 ÷ 年均淨效益**（年）；<1年=強，2-3年=董事會討論，>3年=通常否決
- **Break-even = 固定成本 ÷ (API單價 − 自建變動成本)**
- **加權評分矩陣 5 步驟**：準·重·分·乘·選；**權重必須在評分前設定**（否則 = 確認偏誤）
- **Vendor Lock-in 三大風險**：API 格式、版本棄用、價格調漲
- **TAIDE**：NSTC 主導，繁體中文，部署於 hicloud（Taiwan 本土 LLM）

### 必考流程 / 比較表

| 指標 | 計算 | 標準解讀 |
|------|------|---------|
| ROI | (淨效益 / 投入) × 100% | >100% 代表回本 |
| Payback Period | 投入 / 年均淨效益 | <1年強，>3年通常否決 |
| Break-even | 固定成本 / (單價差) | 兩方案成本相等的數量點 |
| TCO | 直接+間接+機會成本 | 不只算 API bill |

| 方案 | 解決什麼 | 不解決什麼 |
|------|---------|-----------|
| Prompt Engineering | 格式調整、簡單任務 | 知識缺口、深度行為對齊 |
| RAG | 知識時效、幻覺、內部文件 | 行為/語氣一致性 |
| Fine-tuning | 行為/格式一致性、特定領域語氣 | 即時知識更新 |
| From-scratch | 全面客製化 | 成本極高，非必要不用 |

### 考試陷阱

- ⚠️ **雙重約束在加權評分之前**，不是之後；過濾後才做矩陣評分
- ⚠️ **加權矩陣的權重必須先設定**再評分，事後調整 = 確認偏誤（post-hoc rationalization）
- ⚠️ **Latency 用 p95，不用平均值**；平均值掩蓋長尾問題
- ⚠️ **TCO 包含機會成本**，不只是 API 費用或伺服器費用

---

## L21202 AI 導入規劃

### 核心概念

- **5 階段 Roadmap（口訣：需方資試擴）**：需求分析 → 方案設計 → 資源規劃 → 試行（Pilot）→ 擴展（Rollout）
- **5 層需求（L1→L5）**：業務目標 → 流程 → 決策 → 資料 → 技術；**不可跳層**
- **RACI**：R=執行（可多人）、A=當責（**每行只能一人**）、C=諮詢（雙向溝通）、I=告知（單向通知）
- **North Star Metric（NSM）**：每專案**只能一個**，同時反映用戶價值與業務成功
- **OKR = 1 個 Objective + 3-5 個 Key Results**（KR 須符合 SMART）
- **3+2+1 KPI**：3 個營運指標 + 2 個業務指標 + 1 個風險指標
- **資源 5 向量（口訣：錢人算料時）**：預算、人力、算力、資料、時程；AI 專案至少 6 個月
- **BCG 10/20/70**：演算法 10%、資料 20%、人員與流程 70%（違反直覺！）
- **PoC vs MVP vs Pilot**：PoC=可行性驗證（內部，1-10 樣本）；MVP=早期客戶驗證（可用性）；Pilot=P4 階段（5-20% 真實流量）
- **Pilot 放行 5 條件**：指標達標 + 使用者接受 + 風險可控 + 經濟可行 + SOP 就緒（全部通過才放行）
- **CRISP-DM 6 階段**：業務理解→資料理解→資料準備→建模→評估→部署；**迭代循環，非線性**

### 必考流程 / 比較表

| 框架 | 來源 | 重點 |
|------|------|------|
| MS CAF | Microsoft | 6 方法論 + Secure 跨切面 |
| Google 4 Pillars | Google | People / Process / Technology / Data |
| IBM AI Ladder | IBM | Collect → Organize → Analyze → Infuse |
| Gartner 5 Maturity | Gartner | 意識→主動→營運→系統→轉型；~6% 達第 5 級 |

| 概念 | 範圍/目的 | 關鍵限制 |
|------|---------|---------|
| PoC | 技術可行性，內部 | 樣本極少（1-10），非真實環境 |
| MVP | 產品可用性，早期客戶 | 功能最小化，驗證需求 |
| Pilot | 真實流量 5-20%，P4 | 5 條件全部通過才 Rollout |

### 考試陷阱

- ⚠️ **RACI 中 A（Accountable）每行只能一人**，R（Responsible）可多人
- ⚠️ **BCG 10/20/70 違反直覺**：70% 是人員與流程，不是演算法；AI 專案的瓶頸在人
- ⚠️ **CRISP-DM 是迭代的**，不是線性；評估後可回到任何前期階段
- ⚠️ **NSM 只能有一個**；多個 North Star = 沒有 North Star

---

## L21203 AI 風險管理

### 核心概念

- **7 大風險類型**：技術（模型失效/漂移）、法遵（違規）、倫理（偏見/歧視）、營運（供應鏈）、資安（Prompt Injection/資料洩漏）、聲譽（品牌損害）、基本權（隱私/平等/程序正義）
- **Risk Register**：活文件，含 Owner、固有風險分數、控制措施、殘餘風險分數、處置方式、複查日期
- **固有風險 = 可能性 × 衝擊**；衝擊 = 7 維度中取**最大值**（非平均）
- **殘餘風險 vs 風險胃納（Risk Appetite）**：由董事會/高管設定；殘餘 > 胃納 = 需進一步處置
- **風險處置 4 選項**：降低（Mitigate）/ 轉移（Transfer）/ 接受（Accept）/ 規避（Avoid）
- **EU AI Act 4 級（口訣：禁高透小）**：禁止（Unacceptable）→ 高風險（High）→ 有限/透明（Limited/Transparency）→ 微小（Minimal）
- **Art.5 禁止清單**：社會信用評分、職場/學校情緒辨識、潛意識操控、生物特徵批量抓取、預測性警務（profiling）、公共場所即時遠端生物辨識（部分例外）
- **Annex III 高風險（口訣：生基教工基執移司）**：生物特徵、關鍵基礎設施、教育、就業、基本服務、執法、移民/邊境、司法/民主
- **高風險 ≠ 禁止**：可做，但須重度合規（FRIA、透明度、人類監督等）
- **FRIA**：部署者責任、部署前執行、範圍 > DPIA（DPIA 只涵蓋資料保護，FRIA 涵蓋基本權利全面評估）
- **NIST AI RMF（口訣：治盤量管）**：Govern（政策/問責，跨切面）→ Map（情境/利害關係人/危害識別）→ Measure（指標/測試）→ Manage（緩解/回滾/事件）
- **ISO 標準三分法**：ISO 42001（AI 管理系統，可認證）、ISO 23894（AI 風險管理方法）、ISO 27001（資訊安全 CIA，不涵蓋完整 AI 治理）
- **Taiwan AI 基本法**：NSTC 主管機關、2026-01-14 施行、7 原則（永人隱安透公責）、Art.19 政府機關適用
- **金管會 AI 指引**：行政指導（非強制法律）、6 原則（治公隱安透永）

### 必考流程 / 比較表

| EU AI Act 等級 | 定義 | 行動 |
|--------------|------|------|
| Unacceptable（禁止） | Art.5 清單 | 完全禁止 |
| High Risk（高風險） | Annex III 清單 | 可做，需重度合規（FRIA、透明度、人類監督） |
| Limited/Transparency（有限/透明） | 聊天機器人、Deepfake | 揭露義務（disclosure） |
| Minimal（微小） | 垃圾郵件過濾、推薦系統 | 自願行為準則 |

| 標準/框架 | 性質 | 重點 |
|---------|------|------|
| ISO 42001 | 可認證管理系統 | AI 整體管理 |
| ISO 23894 | 方法指引（不可認證） | AI 風險管理方法 |
| ISO 27001 | 可認證管理系統 | 資訊安全（CIA），不涵蓋完整 AI 治理 |
| NIST AI RMF | 美國框架 | 治盤量管 4 函數 |
| HLEG | EU 顧問委員會 | 7 項值得信賴 AI 要求（非 EU AI Act 條文） |

### 考試陷阱

- ⚠️ **高風險 ≠ 禁止**，Annex III 高風險系統仍可部署，但須合規；Unacceptable 才是禁止
- ⚠️ **FRIA 範圍 > DPIA**；DPIA 只看資料保護，FRIA 看全面基本人權影響；兩者都是部署前評估
- ⚠️ **ISO 27001 不是 AI 治理框架**，是資訊安全（CIA）；AI 治理用 ISO 42001
- ⚠️ **衝擊取最大值**（7 維度），不是平均值；避免低估嚴重的低機率事件

---

## L21301 數據準備與模型選擇

### 核心概念

- **資料收集 4 檢查**：任務對齊、代表性、標籤品質、法律授權
- **缺失值處理**：刪除（比例低）、填補（比例高/寶貴資料）、保留（本身有意義的缺失）
  - 填補策略：中位數（偏態/有離群值）、均值（常態分佈）、眾數（類別型）
- **離群值**：先判斷是真實異常還是輸入錯誤，不可自動刪除
- **三種縮放**：Standardization/Z-score（均值≈0，標準差≈1）、Normalization/Min-Max（固定 0-1 範圍）、RobustScaler（用中位數+IQR，對離群值穩健）
- **需要縮放的模型**：SVM、k-NN；不需要的：決策樹、Random Forest（但其他前處理仍需）
- **類別編碼三選一**：Ordinal（有自然順序，如低/中/高）、One-Hot（無順序，低基數）、Target Encoding（高基數，但必須先切分資料集再處理，避免 Target Leakage）
- **鐵律：先切分，再 Fit Transformer**；Transformer 只 fit 訓練集，相同規則 apply 到 val/test
- **特徵工程三步驟**：Selection（移除不相關特徵）、Transformation（格式轉換，如日期→星期幾）、Creation（衍生新特徵，如 30 天購買次數）
- **資料集切分**：Train（學習）→ Validation（比較/調參）→ Test（最終驗證，**只能用一次**）
- **類別不平衡**：Accuracy 是危險指標；用 Precision/Recall/F1；策略：SMOTE（內插法，不是複製，只對訓練集）、Class Weight、換指標

### 必考流程 / 比較表

| 縮放方法 | 適用情境 | 特點 |
|---------|---------|------|
| Standardization (Z-score) | 常態分佈、SVM/線性模型 | 無固定上下界 |
| Normalization (Min-Max) | 需要固定範圍（0-1）、神經網路 | 對離群值敏感 |
| RobustScaler | 有離群值 | 用中位數+IQR，穩健 |

| 迴歸指標 | 計算 | 特點 |
|---------|------|------|
| MAE | 絕對誤差平均 | 對離群值穩健 |
| MSE | 誤差平方平均 | 放大大誤差 |
| RMSE | √MSE | 與目標同單位 |
| R² | 解釋變異量比例 | 越高越好，可為負 |

| 模型 | 可解釋性 | 需縮放 | 適用場景 |
|------|---------|-------|---------|
| 線性迴歸/邏輯迴歸 | 高 | 是 | 基線、可解釋性需求高 |
| 決策樹 | 高 | 否 | 混合型特徵、規則視覺化 |
| Random Forest | 中 | 否 | 中等複雜任務 |
| SVM | 低 | 是 | 小資料集、高維特徵 |
| 神經網路 | 低 | 是 | 大資料集、複雜模式 |

### 考試陷阱

- ⚠️ **Target Encoding 必須在切分後才能計算**，否則 Target Leakage（測試集資訊污染訓練集）
- ⚠️ **SMOTE 是內插法，不是複製**；且只能對訓練集使用，測試集不做 oversampling
- ⚠️ **Validation Set 是調參/比較模型用**，Test Set 只用一次做最終評估；多次用 Test = 資訊洩漏
- ⚠️ **R² 可以是負數**（模型比水平線還差）；不是百分比，不要加 %

---

## L21302 AI 技術系統集成與部署

### 核心概念

- **MLOps Pipeline**：Training → Model Registry → Serving → Monitoring → Retraining/Rollback
- **Model Registry**：版本、Metadata、評估指標、審批狀態、Rollback 標的；**不包含 Active Endpoint 位置**
- **Feature Store**：集中化特徵計算，防止 Training-Serving Skew（訓練/推論特徵不一致）
- **推論模式**：Batch（排程、大量資料、非即時）vs Real-time（即時回應、低延遲）
- **模型量化**：FP32 → FP16 → INT8 → FP8；用於邊緣裝置/資源受限環境
- **系統監控 vs 模型監控**：
  - 系統：延遲、吞吐量、錯誤率、CPU/記憶體、可用性
  - 模型：準確率、PSI（Population Stability Index）、信心分數偏移、特徵分布、漂移
- **Data Drift**：P(X) 改變（輸入分布改變）
- **Concept Drift**：P(Y|X) 改變（輸入-輸出關係改變）
- **SLI / SLO / SLA**：SLI=測量值、SLO=內部目標、SLA=外部合約+懲罰條款
- **Redundancy vs Autoscaling**：Redundancy=多實例/多區域（高可用）；Autoscaling=動態擴縮容（應對流量波動）

### 必考流程 / 比較表

| 部署策略 | 用途 | 用戶收到的回應 | 風險 |
|---------|------|------------|------|
| A/B Testing | 比較商業效果（轉換率等） | 部分用戶收新版 | 中 |
| Canary | 小比例真實流量，降低風險 | Canary 用戶收新版 | 低 |
| Shadow | 鏡像真實流量，完全無用戶影響 | **所有用戶仍收舊版** | 最低 |
| Blue-Green | 兩套完整環境，瞬間切換 | 切換後全部收新版 | 中（回滾快） |
| Rollback | 緊急回退到穩定版本 | 恢復舊版 | — |

| 測試類型 | 範圍 | 目的 |
|---------|------|------|
| Unit Test | 單一函數/模組 | 功能正確性 |
| Integration Test | 多元件介面 | 元件間互動 |
| Shadow Test | 真實流量（無用戶影響） | 新模型行為驗證 |
| Load Test | 高並發壓力 | 效能/穩定性 |

| 雲端平台 | Batch 推論 | 即時推論 | Canary/A-B |
|---------|---------|--------|-----------|
| AWS SageMaker | Batch Transform | Real-time Endpoint | Endpoint Traffic Split |
| GCP Vertex AI | Batch Prediction Job | Online Endpoint | Traffic Split for Online Endpoint |
| Azure ML | Batch Endpoint | Online Endpoint | Traffic Split on Online Endpoint |

### 考試陷阱

- ⚠️ **Shadow ≠ Canary**：Shadow 用戶永遠收到舊版回應（模型只是在背景跑）；Canary 用戶真的收到新版
- ⚠️ **Data Drift = P(X) 改變**（輸入分布）；**Concept Drift = P(Y|X) 改變**（關係改變）；不要對調
- ⚠️ **Model Registry 不存 Active Endpoint 位置**；那是 Serving 層的責任
- ⚠️ **SLA > SLO > SLI**（嚴格度）：SLA 是合約，SLO 是內部目標（通常比 SLA 嚴），SLI 是實測值

---

## Trap Clinic（高頻混淆點速記）

| 混淆組 | 錯誤直覺 | 正確區別 / 記憶法 |
|--------|---------|-----------------|
| BERT vs GPT | 都是 Transformer，功能相同 | BERT=Encoder-only（雙向，分類/NER）；GPT=Decoder-only（單向，生成）；方向相反 |
| RAG vs Fine-tuning | 兩者都能讓模型「更懂」領域知識 | RAG=修知識（即時更新/減幻覺）；Fine-tuning=修行為（格式/語氣一致性）；用途不同 |
| RLHF vs DPO | 兩者都對齊人類偏好，無差別 | RLHF=需 Reward Model + PPO；DPO=直接最佳化，無 Reward Model；DPO 更穩定 |
| Semantic vs Instance Segmentation | Segmentation 都一樣 | Semantic=pixel 類別，**不分個體**；Instance=pixel 類別 + **個體 ID**；兩隻貓能不能分 |
| ResNet Skip Connection 解決什麼 | 解決 Overfitting | 解決 **Degradation（退化）**：深網路準確率反降的問題，不是 Overfitting |
| CLIP 功能 | CLIP 能生成圖像（有 C 嗎？） | CLIP 只做**對齊**（zero-shot 分類、跨模態檢索）；DALL-E/SD 才生成圖像 |
| LLaVA vs Flamingo | 兩者都用 Cross-Attention | **LLaVA=MLP Projection（prefix）**，不用 Cross-Attention；Flamingo=Gated Cross-Attention |
| 雙重約束 vs 加權評分矩陣順序 | 先評分再篩選更有效率 | 雙重約束（AND 邏輯）先執行，通過後才做加權評分；先篩後選 |
| 加權評分矩陣的權重何時設定 | 看完結果再調整也無妨 | 必須在評分**前**設定；事後調整=確認偏誤，考題最愛考「此行為的問題是？」 |
| RACI 的 A（Accountable） | A 可以多人，代表大家都負責 | A 每行只能**一人**；多個 A = 沒有人真正負責 |
| Diffusion 前向 vs 反向過程 | 兩個過程都需要學習 | 前向=固定雜訊排程，**不需學習**；反向=U-Net 去雜訊，**需要訓練** |
| Shadow vs Canary 部署 | Shadow 也是讓部分用戶收到新版 | Shadow=用戶**全部收舊版**，模型只在背景鏡像；Canary=小比例用戶**真的收新版** |
| Data Drift vs Concept Drift | 都叫 Drift，一樣的 | Data Drift=P(X) 改變（輸入分布）；Concept Drift=P(Y|X) 改變（輸入-輸出關係）；後者更嚴重 |
| High Risk vs Unacceptable（EU AI Act） | High Risk 不能做 | High Risk=可做，需重度合規；**Unacceptable=禁止**；Annex III 高風險 ≠ 禁止 |
| FRIA vs DPIA | 兩者都是隱私評估，一樣 | DPIA=只看資料保護；FRIA=涵蓋所有基本人權；FRIA 範圍更廣，EU AI Act 高風險系統要求 FRIA |
| Target Encoding 何時計算 | 可以在切分前用全資料計算 | **必須切分後**，只用訓練集計算；全資料計算=Target Leakage（測試集資訊污染） |
| SMOTE 的操作對象 | 訓練集+測試集都做 oversample | **只對訓練集做**；測試集代表真實世界分布，不能人為改變 |

---

*速查表版本：2026-05-17 ｜ 涵蓋 L21101–L21302 全部 9 個子科目*

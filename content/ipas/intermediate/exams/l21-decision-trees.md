# L21 情境題快速判斷 — Exam Decision Trees

> IPAS AI應用規劃師（中級）L21 科目：AI技術與應用、AI導入規劃、數據準備

## 目錄

- [L21101 自然語言處理技術與應用](#l21101-自然語言處理技術與應用)
- [L21102 電腦視覺技術與應用](#l21102-電腦視覺技術與應用)
- [L21103 生成式AI技術與應用](#l21103-生成式ai技術與應用)
- [L21104 多模態人工智慧應用](#l21104-多模態人工智慧應用)
- [L21201 AI導入評估](#l21201-ai導入評估)
- [L21202 AI導入規劃](#l21202-ai導入規劃)
- [L21203 AI風險管理](#l21203-ai風險管理)
- [L21301 數據準備與模型選擇](#l21301-數據準備與模型選擇)
- [L21302 AI技術系統集成與部署](#l21302-ai技術系統集成與部署)

---

## L21101 自然語言處理技術與應用 — 情境題快速判斷

#### 7.1 Exam Decision Flow

看到情境題時，先不要急著看模型名稱。照下面順序判斷：

```text
1. 題目問的是文字處理流程哪一段？
   - 切文字 → tokenization
   - 文字變數字 → embedding
   - 理解上下文 → Transformer / attention
   - 任務選型 → encoder-only / decoder-only / encoder-decoder / RAG

2. 如果是任務選型，先看輸出形式：
   - 輸出一個類別 → BERT / encoder-only
   - 輸出原文中的片段 → BERT / encoder-only
   - 輸出新寫出來的文字 → GPT 或 T5/BART
   - 輸入一段、輸出另一段 → T5/BART / encoder-decoder

3. 再看題目關鍵字：
   - 雙向 / 理解 / classification / NER → BERT
   - autoregressive / next-token / few-shot / chat → GPT
   - translation / summarization / seq2seq → T5/BART
   - 最新資料 / 引用文件 / 降低幻覺 → RAG
```

#### 7.2 Keyword Map

看到題目關鍵字，直接對照選答案。

```
🔑 關鍵字 → 答案

─── 架構家族 ───
「雙向 / bidirectional / 理解」         → Encoder-only (BERT)
「情感分析 / NER / 抽取式 QA」          → Encoder-only (BERT)
「生成對話 / 續寫文章 / few-shot」      → Decoder-only (GPT / Llama)
「autoregressive / causal / 單向 LM」   → Decoder-only (GPT)
「翻譯 / 摘要 / seq2seq」               → Encoder-decoder (T5 / BART)
「可變長輸入輸出 / span corruption」    → Encoder-decoder (T5)

─── 詞嵌入 ───
「一詞多義 / polysemy / 語境相關」      → 語境化詞嵌入 (BERT / ELMo)
「固定向量 / 查表 / 2013」              → 靜態詞嵌入 (word2vec / GloVe)
「預測周圍詞」                          → word2vec (Skip-gram / CBOW)
「共現矩陣 / count-based / 全域統計」   → GloVe

─── Tokenization ───
「詞彙量大 / OOV / 未登錄詞」           → Subword tokenization
「BERT 家族 / ## 前綴」                  → WordPiece
「GPT / Llama / Qwen 家族 / byte-level」 → BPE (Byte Pair Encoding)
「T5 / XLNet / 多語 / 中文無空白」       → Unigram (via SentencePiece)
「最新資料 / 引用來源 / 減少幻覺」       → RAG（檢索→增強→生成）

─── Transformer 機制 ───
「自注意力 / 多頭 / 長距依賴 / 平行」   → Transformer（對照 RNN/LSTM）
「Q K V / 查詢 鍵 值」                   → Self-Attention
「沒有順序性需另加」                    → Positional Encoding
「取代 RNN / LSTM」                      → Transformer (2017)

─── 任務判斷 ───
「判斷好評負評」                        → 情感分析 (Sentiment Analysis)
「抽出人名公司金額」                    → NER
「把中文換英文」                        → 機器翻譯 → encoder-decoder
「論文變短摘要用自己的話」              → Abstractive → encoder-decoder
「從原文挑重要句子」                    → Extractive → encoder-only
```

#### 7.3 Mini Practice

先遮住答案，自己用「輸出形式 → 關鍵字 → 架構」判斷一次。

| 題目情境 | 判斷 | 答案 |
|---|---|---|
| 公司想把客服留言分成正面、負面、中性 | 輸出是類別；要理解整句 | 情感分析；Encoder-only / BERT |
| 從履歷中找出姓名、學校、技能 | 輸出是原文中的實體標記 | NER；Encoder-only / BERT |
| 把英文產品說明翻成中文 | 輸入輸出都是文字，長度可變 | Machine translation；Encoder-decoder / T5/BART |
| 把一篇長新聞用自己的話整理成三句摘要 | 生成新文字，不只是挑原句 | Abstractive summarization；Encoder-decoder / T5/BART |
| 根據前面聊天紀錄產生下一句回覆 | 續寫、對話、自回歸生成 | Decoder-only / GPT |
| 給模型三個範例，請它仿寫第四個產品文案 | few-shot + 生成文字 | Decoder-only / GPT |
| 問答系統要先查公司內部文件，再回答並附來源 | 檢索文件後再生成 | RAG |
| 題目比較 `bank` 在河岸和銀行的不同意思 | 同一詞依上下文改變語意 | 語境化 embedding；BERT / ELMo |
| 模型需要處理新品牌名與罕見專有名詞 | 降低 OOV 問題 | Subword tokenization |
| 題目問為何 Transformer 比 RNN 更適合長距依賴 | token 可直接彼此注意，且可平行 | Self-attention / Transformer |

---

---

## L21102 電腦視覺技術與應用 — 情境題快速判斷

考試當天翻這一頁——看到關鍵字直接勾答案：

```
🔑 關鍵字查找表

1. 「即時偵測 / 毫秒級 / 邊際裝置 / 監視器 / 30 FPS」
   → YOLO (single-shot detector)

2. 「最高精度 / 醫療影像 / 不計時間成本 / 小物件」
   → Faster R-CNN (two-stage detector)

3. 「醫學影像切邊 / 細胞邊界 / 腫瘤輪廓 / 像素級標註」
   → 語意分割 (Semantic Segmentation), U-Net

4. 「同類但要分個體 / 每人獨立 mask / 人群計數」
   → 實例分割 (Instance Segmentation), Mask R-CNN

5. 「只要分一個類別 / 貓還是狗 / 有沒有人」
   → 影像分類 (Image Classification), ResNet

6. 「有物件＋要位置＋要類別」
   → 物件偵測 (Object Detection), bbox 輸出

7. 「平移不變性 / 降低參數量 / 縮小特徵圖」
   → 池化層 (Pooling Layer)，最常見 max pooling

8. 「梯度消失 / 網路很深卻訓不起來 / 退化問題」
   → 加 skip connection (ResNet 殘差連接)

9. 「交集比聯集 / 預測框和真實框重疊程度」
   → IoU (Intersection over Union)

10. 「10 個門檻平均 / 嚴格評測 / COCO 標準」
    → mAP@0.5:0.95

11. 「同時處理「天空、路面」和「每個人、每台車」」
    → 全景分割 (Panoptic Segmentation)

12. 「重疊 bbox 太多、留一個信心最高的」
    → NMS (Non-Maximum Suppression)

13. 「anchor-free + NMS-free + 端對端部署」
    → YOLOv10

14. 「Conv → BN → ReLU → Conv → BN → (+) x」
    → ResNet 殘差 block
```

---

---

## L21103 生成式AI技術與應用 — 情境題快速判斷

看到題目裡的**關鍵字**，立刻對應出答案方向：

| 題目關鍵字 | 立刻想到 |
|---|---|
| 「高解析度圖片生成」「text-to-image」 | → **Diffusion / Stable Diffusion（latent diffusion）**<br/>⚠️ 易混：GAN 也能生圖，但**高解析度 + 多樣性 + 訓練穩定**是 Diffusion 的強項；GAN 現在主要用於人臉/風格轉換，不是高解析度 T2I 主流。 |
| 「文字理解」「情感分類」「雙向上下文」「抽取式 QA」 | → **BERT（encoder-only，雙向）**<br/>⚠️ 易混：GPT 也能做分類，但 GPT 是 causal 單向；看到「**雙向**上下文」或「抽取式 QA」第一反應一定是 BERT。 |
| 「對話生成」「逐字輸出」「autoregressive」「長文對話生成」 | → **GPT 系列（decoder-only，單向）**<br/>⚠️ 易混：T5 也能生成，但 T5 是 encoder-decoder，偏翻譯/摘要；純對話/長文逐字生成 = GPT decoder-only。 |
| 「翻譯」「摘要」「seq2seq」 | → **T5 / BART（encoder-decoder）**<br/>⚠️ 易混：GPT 也做翻譯/摘要，但題目若強調 **seq2seq / 輸入→輸出對齊** 就選 encoder-decoder；若只強調「生成流暢」才選 GPT。 |
| 「mode collapse」 | → **GAN 的典型失敗模式**<br/>⚠️ 易混：Diffusion 的缺點是「推論慢」，不是 mode collapse；LLM 的缺點是「幻覺」。看到 mode collapse 直接對應 GAN。 |
| 「生成對抗」「兩個網路互相對抗」 | → **GAN（Generator + Discriminator）** |
| 「reward model + PPO」「人類偏好對齊」 | → **RLHF 階段** |
| 「指令微調」「instruction tuning」 | → **SFT（Supervised Fine-Tuning）** |
| 「next-token prediction 大規模語料」 | → **Pretrain（預訓練）階段** |
| 「`softmax(QK^T/√d_k)`」 | → **自注意力 Self-Attention** |
| 「多頭」「h 個 head 並行」 | → **Multi-Head Attention** |
| 「位置資訊無感」「要加 sinusoidal/RoPE」 | → **Positional Encoding（注意力本身無順序）** |
| 「U-Net 去噪」「MSE on ε」「noise schedule」 | → **Diffusion Model（DDPM）**<br/>⚠️ 易混：U-Net 本身原本是做影像分割的，但在生成場景出現 U-Net + 去噪 + MSE 幾乎必是 Diffusion。 |
| 「Generator 輸入雜訊、輸出樣本」 | → **GAN 的 G** |
| 「Discriminator 輸出 [0,1] 機率」 | → **GAN 的 D**<br/>⚠️ 易混：D 的內部損失是 **BCE**（真/假二元分類），但 GAN **整體**仍稱為 adversarial min-max。看到「[0,1] 真假機率」就是 D。 |
| 「PPL 越低越好」 | → **LLM 語言模型困惑度** |
| 「FID 越低越好」 | → **圖像生成品質+多樣性** |
| 「CLIP score」 | → **text-to-image 對齊度** |
| 「Chatbot Arena」「ELO」 | → **LLM 人類偏好實戰評估** |
| 「CFG scale = 7.5」「guidance scale」 | → **Classifier-Free Guidance（Stable Diffusion）** |
| 「latent space」「VAE 壓縮後擴散」 | → **Latent Diffusion（Stable Diffusion）** |
| 「StyleGAN / CycleGAN / DCGAN」 | → **GAN 變體** |
| 「BERT 雙向 / GPT 單向」 | → **🔥🔥 encoder-only vs decoder-only（必考！）** |

---

---

## L21104 多模態人工智慧應用 — 情境題快速判斷

📊 **視覺化決策樹**：從「輸入/輸出模態 → 訓練資源 → 部署限制」三層挑架構的速查圖見 [`diagrams/05-use-case-decision-tree.md`](diagrams/05-use-case-decision-tree.md)。

🔑 **看到關鍵字 → 選這個答案**

- 看到「結合影像與文字」「圖文檢索」「零樣本影像分類」「共享嵌入空間」→ **CLIP** 🔥🔥
- 看到「文字生成圖像」「text-to-image」→ **DALL-E** 或 **Stable Diffusion**
- 看到「SD 文字條件如何注入 U-Net」→ **交叉注意力（Cross-Attention）**，文字編碼器是 **CLIP**
- 看到「視覺問答」「VQA」「回答圖片中的問題」→ **Flamingo / LLaVA / GPT-4V / Qwen-VL**
- 看到「語音辨識」「語音轉文字」「ASR」「log-Mel 聲譜圖 encoder-decoder」→ **Whisper** 🔥
- 看到「Q 來自一個模態，K/V 來自另一個模態」→ **交叉注意力 Cross-Attention** 🔥🔥
- 看到「Q、K、V 都來自同一序列」→ **自注意力 Self-Attention**
- 看到「原生多模態」「natively multimodal」「統一 token 空間」「端到端語音」→ **GPT-4o** 或 **Gemini**
- 看到「後接式多模態」「視覺貼在文字模型上」→ **GPT-4V** 或 **LLaVA**
- 看到「凍結 LLM + 閘控交叉注意力 + Perceiver Resampler」→ **Flamingo**
- 看到「成對圖文資料 + InfoNCE loss + 對稱」→ **CLIP contrastive pretraining** 🔥🔥
- 看到「雙編碼器輸出做 dot product」→ **CLIP 晚期融合**
- 看到「分類器加權、投票、stacking」→ **晚期融合 Late Fusion**
- 看到「低層特徵直接 concat 送同一模型」→ **早期融合 Early Fusion**
- 看到「只使用單一模態」「只使用 CNN」當作跨模態整合答案 → **多半不是最佳答案**（除非題幹明示單模態場景）（iPAS 114 醫療多模態情境題模式）
- 看到「整合醫學影像與臨床文字最能強化系統」→ **Transformer 架構整合多模態**
- 看到「繁體中文 OCR / 中文 VQA」→ **Qwen-VL / Qwen2-VL**
- 看到「文字轉影片」「spacetime patches」→ **Sora / Veo**（DiT，僅參考，非 L21104 主體）
- 看到「跨模態檢索」「cross-modal retrieval」→ **CLIP 共享嵌入空間 + dot product**

---

#### 結尾小提醒

把這張學習指南讀第三次時，你會發現 L21104 真正要你會的只有三件事：

1. **四種融合策略**（early / late / hybrid / cross-attention）對應情境。
2. **CLIP 的訓練配方**（雙編碼器 + 對稱 InfoNCE + 共享嵌入空間）與其**非生成**的本質。
3. **交叉注意力** 的 Q/K/V 來源差異，以及**哪些模型**（Flamingo、SD、Whisper）用它。

其他的名稱架構只是把這三件事排列組合。考試時先抓關鍵字 → 對應 Section 7 表 → 回去 Section 4 驗證 → 選答案。穩。

---

## L21201 AI導入評估 — 情境題快速判斷

🔑 **看到關鍵字 → 答這個**

| 關鍵字 / 情境 | 答案 |
|---|---|
| 「即時客服 + 200ms 延遲」 | **雙約束過濾**，先排除高延遲 frontier API（GPT/Claude/Gemini 都 >800ms）；候選 = Groq、SambaNova、self-host |
| 「資料不能出境 / 留台灣」 | 自建/地端：**TAIDE 在 hicloud GPU 切片** 或 open-weight self-host |
| 「投資回收期」「多久回本」 | **Payback Period = 投資 / 年度淨效益** |
| 「淨效益 / 投資 × 100%」 | **ROI 公式** |
| 「總擁有成本 / TCO」 | **直接 + 間接 + 機會** 三類成本 |
| 「先訂權重再打分」 | 避免 **anchoring bias（錨定偏誤）** |
| 「方案太多選不出來」 | 先用**雙約束過濾**砍掉不可行，剩下的才做加權評分 |
| 「買 GPU 伺服器」 | **CapEx（資本支出）**，攤提 3-5 年 |
| 「按 token 計費 / 按 GPU 小時計費」 | **OpEx（營運支出）**，當期費用化 |
| 「Anthropic 棄用 Claude 1 / Gemini 2.0 Flash 進入 sunset 排程」 | **Vendor lock-in / 棄用風險** |
| 「客服回答常掰 / 要引用內部知識」 | **RAG（檢索增強生成）**，不要直接 fine-tune |
| 「品牌口吻要強烈一致 / 格式固定」 | **Fine-tune（微調）** |
| 「公司剛開始試 AI / 不確定流量」 | **OpEx（API 計費）**，先 buy 後 build |
| 「流量穩定 + 長期 + 量大」 | 評估 **break-even**，可能轉 CapEx 自建 |
| 「金融客戶 + 個資合規」 | **Hybrid**：敏感地端 + 一般雲端 |
| 「找出固定+變動成本的交叉點」 | **Break-even（損益兩平）**：固定成本 / (API 單價 − 自建單位變動成本) |
| 「PoC 跑完成功指標未達想改寬」 | ❌ 禁止 post-hoc 修改，**指標必須 pre-defined** |
| 「為什麼選 p95 不是 avg」 | 防止被 **尾延遲（tail latency）** 拖垮對外 SLA |
| 「LLM 體驗 / 第一個字多快出現」 | **TTFT（Time-to-First-Token）** |
| 「99.9% SLA 一年可容忍多久停機」 | 約 **8.76 小時** / 年（或月度約 43.8 分鐘） |
| 「中型企業 5-50 人想用 AI」 | 經濟部產發署輔導團 + 30 人以下中小企業數位轉型培力補助（NT$10 萬） |
| 「繁體中文 OCR / 中文 VQA + 留台灣」 | **Qwen-VL / Qwen2-VL** 自建（細部見 L21104） |
| 「考慮時間價值的投資評估」 | **NPV（淨現值）**，不是 ROI 也不是 Payback |
| 「Sensitivity / 敏感度測試」 | 改 1-2 個權重看排序會不會翻盤——若會，代表決策不穩 |

---

#### 結尾小提醒

L21201 真正要你會的只有四件事：

1. **技術效能五指標**：準·延·量·伸·靠（不是只看 accuracy）
2. **TCO 三類成本 + ROI 公式 + Payback / Break-even** 算術（中級不考 NPV/IRR 公式）
3. **加權評分矩陣五步驟**：準·重·分·乘·選（**權重先訂、後打分**）
4. **雙約束過濾在加權評分之前**（boundary 必含的「p95 < 200ms AND cost < X」工作示例）

考試時的決策路徑：

```
看到題目 → Section 7 keyword 表 →（找不到再）Section 4 對照表 →（再找不到）Section 3 內文
```

L21201 沒講的、不要寫進答案：
- 「導入計畫的階段」「RACI」「roadmap」→ 那是 **L21202 規劃**
- 「EU AI Act / NIST RMF / 風險登記冊」→ 那是 **L21203 風險管理**
- 本課只到「**我們選方案 X**」為止。穩住這條線，分就拿得到。

---

## L21202 AI導入規劃 — 情境題快速判斷

🔑 **看到關鍵字 → 答這個**

| 關鍵字 / 情境 | 答案 |
|---|---|
| 「業務流程對映 AI 技術」 | **需求分析（L1-L5 五層對應）** |
| 「跨部門角色協作、誰負責誰簽核」 | **RACI**（R 執行、A 簽核、C 諮詢、I 告知） |
| 「第一次小規模真實驗證」 | **Pilot**（在 L21202 P4 階段） |
| 「可行性驗證、技術風險高」 | **PoC**（在 L21201 Go/No-Go 之前） |
| 「最小可交付、對客戶驗證」 | **MVP**（在 L21202 方案設計階段） |
| 「選工具、評估 ROI、TCO 算術」 | **這是 L21201**，不是 L21202 |
| 「EU AI Act、風險分級、NIST RMF、ISO 42001」 | **這是 L21203**，不是 L21202 |
| 「MLOps、模型部署、監控、漂移」 | **這是 L21302**，不是 L21202 |
| 「每週可衡量的單一指標」 | **北極星指標 North Star Metric**（**只能有一個**）|
| 「3 營運 + 2 業務 + 1 風險」 | **3+2+1 KPI 組合** |
| 「具體、可衡量、可達成、相關、有期限」 | **SMART 原則** |
| 「O + KR」「目標 + 關鍵成果」 | **OKR** |
| 「看了儀表板但不知道下一步要做什麼」 | **Vanity metric 反模式** |
| 「要一次算錢、人、算力、資料、時間」 | **錢人算料時（五向量資源分配）** |
| 「70% 基礎設施 + 20% 模型 + 10% 運維」 | **70/20/10 AI 預算 heuristic** |
| 「有沒有一個框架談完 AI 導入」 | **Microsoft CAF for AI**（6 方法論：Strategy / Plan / Ready / Adopt / Govern / Manage + Secure cross-cutting）|
| 「4 themes × 6 pillars（Learn/Lead/Access/Scale × People/Data/Technology/Process/Governance/Culture）」 | **Google Cloud AI Adoption Framework** |
| 「Collect / Organize / Analyze / Infuse 四階」 | **IBM AI Ladder**（資料梯度）|
| 「五級成熟度，只有 6% 到最高級」 | **Gartner AI Maturity Model** |
| 「業務理解 → 資料理解 → 準備 → 建模 → 評估 → 部署」 | **CRISP-DM**（六階段） |
| 「不想走 Waterfall，要邊做邊調」 | **Agile**（for AI，加 pilot gate） |
| 「5 階段導入路線圖順序」 | 需求 → 方案 → 資源 → **試點** → 擴展（需·方·資·試·擴） |
| 「Pilot 結束要滿足什麼才能 rollout」 | 指標達成 + 可接受度 + 風險無紅線 + 經濟效益 + SOP 就緒 |
| 「規劃時 AI 人才招不到怎麼辦」 | 預留 3-6 個月 HR buffer；評估 Buy 而非 Build 減少 MLE 需求 |
| 「AI 專案資料清洗要多久」 | 通常 **2-8 週**（比傳統 IT 專案長） |
| 「AI 落地週期至少多久」 | **6 個月起跳**（含 pilot gate） |
| 「把 A 簽核權下放給 3 個人」 | ❌ 違反 RACI，每列只能 1 個 A |
| 「規劃書只寫 WBS + Gantt」 | ❌ 失分，要補資料 / 模型不確定性 + 再訓練 + feedback loop |

---

#### 最後複習清單

考前闔上講義，用這份清單自測——答得出來才算讀懂 L21202：

- [ ] 可以說出**四大產出物**：需求書、方案設計書、資源配置表、Pilot 計畫
- [ ] 可以說出**五層需求分析**：business → process → decision → data → technique
- [ ] 可以說出**四面向方案設計**：功能、資料、模型、整合（不越界到 k8s / MLOps）
- [ ] 可以說出**三層目標架構**：North Star（一個）+ SMART + OKR（Objective + 3-5 KR）
- [ ] 可以說出**五向量資源分配**：錢、人、算、料、時（缺一不可）
- [ ] 可以說出 **Pilot Gate 五條件**（沿用 Section 5 既有內容）：成功指標達成、使用者可接受度、風險紅線無觸發、經濟效益確認、營運 SOP 就緒
- [ ] 可以說出 **RACI 每列只能 1 個 A**、A 扛最終成敗，不等於 DACI 的 A
- [ ] 可以說出 **70/20/10 是 Build 路線的預算 heuristic**，採 Managed API 比例會改變
- [ ] 可以區分 **L21201（選工具）/ L21202（規劃）/ L21203（風險）/ L21302（部署）** 的邊界

---

#### 結尾小提醒

L21202 真正要你會的只有四件事：

1. **需求分析五層對應（業·流·決·資·技）**——不跳層
2. **技術應用方案設計四面向（功能/資料/模型/整合）**——不寫 k8s
3. **目標設置三層金字塔**：North Star（**一個**）→ OKR/SMART → 3+2+1 KPI
4. **資源分配錢人算料時 + 70/20/10 預算 heuristic + 5 階段 roadmap + RACI**

考試時的決策路徑：

```
看到題目 → Section 7 keyword 表 →（找不到再）Section 4 邊界對照表 →（再找不到）Section 3 內文
```

L21202 沒講的、不要寫進答案：
- 「加權評分矩陣 / TCO / ROI / Payback Period」→ 那是 **L21201 評估**
- 「EU AI Act 分級 / NIST RMF / ISO 42001 / 風險登記冊」→ 那是 **L21203 風險**
- 「k8s / Istio / CI/CD / 監控 / 模型漂移」→ 那是 **L21302 部署**

本課只到「**我們規劃好怎麼做、交給誰、花多少、什麼時候上**」為止。穩住這條線，分就拿得到。

---

## L21203 AI風險管理 — 情境題快速判斷
🔑 看到關鍵字 → 選這個答案
- **「聊天機器人、要告知使用者不是人」** → **限制風險（Limited / Transparency Risk）**
- **「deepfake、AI 生成內容標示」** → **Article 50 透明義務**
- **「信用評分、保險定價、貸款核准」** → **EU AI Act 高風險（essential services）**
- **「履歷篩選、錄用、升遷」** → **高風險（employment）**
- **「學校情緒辨識、公司監看員工情緒」** → **禁止實務（Art.5）**
- **「政府機關用 AI 審服務 / 補助」** → **台灣 AI 基本法第 19 條風險評估；EU 情境下要想到 FRIA**
- **「public body、private entity providing public services」** → **FRIA**
- **「deployer 上線前評估 rights impact」** → **FRIA，不是 DPIA**
- **「透明、揭露、標示、讓人知道是 AI」** → **Limited / Transparency Risk**
- **「禁止、banned、cannot be used」** → **Unacceptable Risk**
- **「Annex III」** → **High Risk**
- **「Annex I regulated products safety component」** → **High Risk，但適用時程注意 2027-08-02**
- **「GPAI obligations」** → **自 2025-08-02 起適用**
- **「Annex III obligations / transparency requirements / enforcement start」** → **2026-08-02**
- **「high-risk embedded in regulated products under Annex I」** → **2027-08-02**
🔑 看到關鍵字 → 選這個 NIST AI RMF function
- **「政策、文化、責任、教育訓練、治理委員會」** → **Govern**
- **「場景盤點、利害關係人、use context、intended use」** → **Map**
- **「指標、測試、驗證、證據、評估」** → **Measure**
- **「緩解、處置、優先順序、rollback、incident response」** → **Manage**
- **「risk appetite」** → **Govern**
- **「harm scenario」** → **Map**
- **「bias test / robustness test」** → **Measure**
- **「residual risk 決定是否可上線」** → **Manage**
🔑 看到關鍵字 → 選這個標準 / 文件
- **「AI 管理系統、可認證、AIMS」** → **ISO/IEC 42001:2023**
- **「AI 風險管理方法指引」** → **ISO/IEC 23894:2023**
- **「資安管理系統、CIA」** → **ISO/IEC 27001**
- **「持續追蹤 owner / score / treatment」** → **Risk Register**
- **「模型用途與限制說明」** → **Model Card**（本課點到為止）
- **「基本權風險、public service、上線前評估」** → **FRIA**
- **「個資處理風險」** → **DPIA**
🔑 看到關鍵字 → 選這個 issuer
- **「7 trustworthy AI requirements」** → **HLEG**
- **「6 Responsible AI principles：Fairness / Reliability / Privacy / Inclusiveness / Transparency / Accountability」** → **Microsoft**
- **「金融業運用 AI 指引 6 原則」** → **FSC**
- **「永續、人類自主、隱私資料治理、資安、透明、公平、問責」** → **台灣 AI 基本法**
🔑 看到關鍵字 → 風險類型快速歸類
- **「對特定族群造成較差結果」** → **倫理 / 公平風險**
- **「模型突然失準、資料分布變了」** → **技術風險**
- **「主管機關要求揭露或文件不全」** → **法遵風險**
- **「第三方 API 掛掉，流程整段停住」** → **營運風險**
- **「資料外洩、prompt injection」** → **資安風險**
- **「社群炎上、品牌受損」** → **聲譽風險**
- **「申訴困難、程序不透明、侵害權利」** → **基本權風險**
🔑 看到情境 → 優先 artefact
- **「想先列完整風險、owner、控制項」** → **Risk Register**
- **「想把風險依分數排序」** → **5x5 Likelihood-Impact Matrix**
- **「想知道 residual risk 可不可接受」** → **Risk Appetite**
- **「公部門 / 公共服務高風險上線前 rights review」** → **FRIA**
- **「想把控制分類到治理 / 脈絡 / 衡量 / 管理」** → **NIST AI RMF mapping**
🔑 看到產業 → 第一反應
- **金融** → **FSC 指引 + fairness / explainability / customer rights**
- **醫療** → **safety + privacy + clinician oversight**
- **公部門** → **Art.19 + basic rights + complaint / remedy**

---

---

## L21301 數據準備與模型選擇 — 情境題快速判斷
🔑 看到關鍵字 → 選這個答案
- 特徵尺度差異很大 → 先想到標準化（Standardization）或正規化（Normalization）
- `SVM`、`k-NN` → 先警覺尺度敏感
- 決策樹（Decision Tree）、隨機森林（Random Forest） → 縮放通常不是第一優先考點
- 類別欄位無自然順序、類別不多 → One-Hot 編碼（One-Hot Encoding）
- 類別欄位有自然順序 → 序位編碼（Ordinal Encoding）
- 高基數類別欄位 → 小心 One-Hot 維度暴增，可考慮目標編碼（Target Encoding），但注意 leakage
- 切分前先做目標編碼 → 資料洩漏（Data Leakage）
- 切分前先用全資料算縮放統計量 → 資料洩漏（Data Leakage）
- 驗證不同模型哪個較好 → 驗證集（Validation Set）
- 最後確認模型泛化能力 → 測試集（Test Set）
- 用測試集一直調模型 → 評估不公、測試集失效
- 詐欺、流失、異常、罕見疾病 → 類別不平衡（Class Imbalance），別只看 Accuracy
- 少數類別很重要 → 想到重抽樣（Resampling）、類別權重（Class Weight）、評估不能只看 Accuracy
- 欄位很多、資訊重複、模型易過擬合 → 特徵選擇（Feature Selection）
- 日期拆成年月日星期 → 特徵轉換（Feature Transformation）
- 用交易紀錄算近 30 天總消費 → 特徵建立（Feature Creation）
- 需要高可解釋性 → 線性模型（Linear Model）或決策樹（Decision Tree）
- 表格資料、想兼顧穩健與效果 → 隨機森林（Random Forest）
- 小中型資料、分類問題、尺度已處理 → SVM 可考慮
- 小型資料、想要直觀基準法 → k-NN 可考慮
- 資料量大、模式複雜、成本可接受 → 神經網路（Neural Network）
- 題目強調「不是越複雜越好」 → 模型選擇要看 trade-off
- 題目問「公平比較模型」 → 同切分、同標準、不可偷看測試集

#### 考前 30 秒速看版
```text
先看任務
再看資料問題
再選前處理
最後才選模型

訓練學
驗證選
測試判

差很大，先縮它
少數重要，別看整體
有序用序位，無序先 One-Hot，高基數防洩漏
```

#### 最後提醒
L21301 最常考的不是公式，
而是你會不會判斷：
1. 資料哪裡有問題？
2. 哪個前處理最合理？
3. 哪個模型最符合題目條件？
這三步守住，大多數題目都不會偏。

---

---

## L21302 AI技術系統集成與部署 — 情境題快速判斷

🔑 看到關鍵字 → 選這個答案

- 每晚重算、每日批次、全量名單更新、非同步 job → **批次推論（Batch Inference）**
- request 一來就要回、聊天機器人、即時推薦、線上審核 → **即時推論（Real-time Inference）**
- 環境一致、打包依賴、開發機和正式機要一致 → **容器化（Containerisation）**
- 多個系統共用模型能力、走 endpoint 呼叫 → **API 服務（API Serving）**
- 多版本管理、核准後部署、需要可回滾 → **模型登錄（Model Registry）**
- timeout 變多、CPU 爆高、TPS 降低 → **系統監控（System Monitoring）**
- PSI 上升、資料分布改變、特徵長相變了 → **資料漂移（Data Drift）**
- 資料看似差不多，但準確率與規則一起失靈 → **概念漂移（Concept Drift）**
- 新版本先導 5% 流量試跑 → **金絲雀部署（Canary Deployment）**
- 比較哪個模型或策略轉換率更好 → **A/B 測試（A/B Testing）**
- 要用真流量觀察新模型，但不能影響正式輸出 → **影子部署（Shadow Deployment）**
- 兩套環境切換、快速整批回退 → **藍綠部署（Blue-green Deployment）**
- 驗證單一前處理函式或欄位映射 → **單元測試（Unit Testing）**
- 驗證 API、DB、model server 是否串得起來 → **整合測試（Integration Testing）**
- 壓力高峰是否守得住 300ms → **負載測試（Load Testing）**
- 內部目標寫 p95 latency < 300ms → **服務等級目標（SLO）**
- 對外承諾月可用性 99.9%，未達補償 → **服務等級協議（SLA）**
- 多區域、多實例、避免單點故障 → **備援（Redundancy）**
- 流量高時自動加實例、低時自動縮回 → **自動擴展（Autoscaling）**
- AWS 題幹看到 `batch transform` → **Amazon SageMaker AI**
- GCP 題幹看到 `traffic split`、`endpoint` → **Google Cloud Vertex AI**
- Azure 題幹看到 `online endpoint`、`batch endpoint` → **Azure Machine Learning（Azure ML）**
- 題目開始談合規、法遵、責任歸屬、治理框架 → **不是本課主軸，偏 L21203**

---

# L21103 生成式AI技術與應用 — Study Guide v2

---

## 0. How to Use This Guide

**建議閱讀順序：**

1. **Section 1** — 先看大圖，確認整堂課的結構。
2. **Sections 2–7** — 每節讀完就做 Quick Check，答錯立刻回讀。
3. **Section 8** — 用決策樹練習「看到題目關鍵字，秒選答案」。
4. **Section 9** — 對照陷阱，確認自己不會被反問砸鍋。
5. **Section 10** — 做完 15–25 題，再對答案。
6. **Final Oral Recall** — 考前 3 分鐘唸完這 6 句。

**火力標記說明：**

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture — 生成式 AI 全景圖 🔥🔥🔥

### 先懂一句話

生成式 AI（Generative AI）不是只會「分類」或「判斷」，而是會產生新內容：文字、圖片、程式碼、聲音或其他資料。考試要先判斷「要生成什麼」，再選 GAN、Diffusion、LLM、RAG、fine-tuning 或評估指標。

### Everyday Analogy

把生成式 AI 想成一間內容工廠：GAN 像兩個員工互相挑錯做出更像真的樣品；Diffusion 像從雪花雜訊慢慢擦出圖片；LLM 像逐字接話的文字助理；RAG 像助理回答前先翻公司手冊。

### 先問自己一個問題

題目到底是在問「生成架構」、還是「LLM 訓練階段」、還是「生成品質怎麼評估」？

### 技術說法

本課的核心地圖是：

- **GAN（Generative Adversarial Network，生成對抗網路）**：Generator 造假，Discriminator 抓假。
- **Diffusion Model（擴散模型）**：正向加噪固定，反向去噪要學。
- **LLM（Large Language Model，大型語言模型）**：Transformer-based，常以 next-token prediction 訓練。
- **RAG（Retrieval-Augmented Generation，檢索增強生成）**：生成前先檢索外部知識。
- **Fine-tuning（微調）/ SFT（Supervised Fine-Tuning，監督式微調）/ RLHF（Reinforcement Learning from Human Feedback，從人類回饋中進行強化學習）/ DPO（Direct Preference Optimization，直接偏好最佳化）**：讓模型從通用能力變成更會照指令、符合偏好。

### 流程 / 選擇流程

先把這堂課的所有概念定位到一張地圖。

```text
【輸入】
  隨機雜訊 z / 文字 prompt / 真實資料
        │
        ▼
┌───────────────────────────────────────────────┐
│           三大生成式架構                        │
│                                               │
│  🎨 GAN            🌫️ Diffusion       📝 LLM  │
│  G 造假 ↔ D 抓假   加噪→去噪學習      Transformer│
│  Adversarial Loss  Denoising MSE      Cross-Entropy│
│  Mode collapse     DDPM慢/DDIM快      幻覺       │
│  人臉/風格轉換      高解析度 T2I       對話/生成  │
└───────────────────────────────────────────────┘
        │
        ▼
【LLM 特有訓練管線】
  Pretrain（學通識）
       ↓
  SFT（Supervised Fine-Tuning，監督式微調；學指令遵循）
       ↓
  RLHF（Reinforcement Learning from Human Feedback，從人類回饋中進行強化學習；學人類偏好）
        │
        ▼
【生成品質評估】
  PPL（Perplexity，困惑度，文字）/ FID（Fréchet Inception Distance，Fréchet Inception 距離，圖像）/ CLIP Score（Contrastive Language-Image Pre-training，對比式語言-影像預訓練；文字-圖像對齊）/ ELO（Elo rating，對戰排名分數）
```

### 比較表這樣讀

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

### 記憶方式

```text
造圖像：GAN 對抗、Diffusion 去噪
造文字：GPT 逐字、T5 轉換、BERT 理解
補知識：RAG 先查再答
調行為：SFT 學示範、RLHF/DPO 學偏好
看品質：文字 PPL、圖像 FID、圖文 CLIP
```

### Exam Rule

```text
看到「生成圖片」→ 先在 GAN / Diffusion 之間選
看到「生成文字 / 對話 / coding」→ 先想到 LLM / GPT
看到「公司內部知識 / 最新資料 / 降低幻覺」→ RAG
看到「學指令或偏好」→ SFT / RLHF / DPO
看到「評估生成品質」→ 先判斷模態，再選 PPL / FID / CLIP Score
```

### Quick Check

題目說「模型回答前要先查公司內部文件，再根據文件生成答案」，這比較像哪個概念？

答案：RAG（Retrieval-Augmented Generation，檢索增強生成）。因為重點不是重新訓練模型，而是生成前先檢索外部知識並放進 prompt。

---

## 2. GAN — 生成對抗網路 🔥🔥🔥

### 先懂一句話

GAN 由兩個網路組成：Generator（G，造假者）和 Discriminator（D，鑑定師）。G 從隨機雜訊製造假樣本，D 判斷樣本是真是假，兩者互相對抗直到 G 造的假樣本連 D 也分不清楚為止。

### Everyday Analogy

想像夜市有個攤商（G）專門賣高仿品牌 T 恤，旁邊有個鑑定師（D）專門抓假貨。攤商每天研究怎麼做得更像正品，鑑定師每天研究怎麼看出破綻。兩人互相競爭，攤商越做越真、鑑定師越抓越準——這就是 GAN 的「對抗式學習」。

### 先問自己一個問題

題目是不是出現「兩個網路互相競爭」、「Generator / Discriminator」、「mode collapse」或「對抗式損失」？

### 技術說法

GAN（Generative Adversarial Network，生成對抗網路）是一個 **min-max 對抗賽局**：Discriminator（D，鑑別器）努力分辨真假，Generator（G，生成器）努力騙過 D。D 越會抓假，G 就越要把假樣本做得像真實資料。

### 流程 / 選擇流程

```text
隨機雜訊 z
    ↓
Generator G（造假者）→ 假樣本 G(z)
    ↓
Discriminator D（鑑定師）← 也接收真實資料 x_real
    ↓
D 輸出真假機率 D(x) ∈ [0, 1]
    ↓
兩個損失反向傳播 → G 和 D 輪流進步
```

### 一步一步例子

以人臉生成為例：

```text
Step 1: 抽一個隨機雜訊 z
Step 2: Generator 把 z 轉成一張假人臉 G(z)
Step 3: Discriminator 同時看真實人臉 x_real 和假人臉 G(z)
Step 4: D 輸出真假機率
Step 5: D 學會抓假，G 學會騙過 D
Step 6: 若 G 只會生幾種臉，叫 mode collapse（模式崩潰）
```

### 比較表這樣讀

先分清楚 G 和 D 的角色，再看變體適合什麼圖像任務。

**Min-max 目標函數（描述層）：**

```text
min_G  max_D   E[log D(x)] + E[log(1 − D(G(z)))]
```

- D 想「最大化」：把真的判對（D(x)→1）、把假的判假（D(G(z))→0）
- G 想「最小化」：讓 D 把 G(z) 誤判為真（D(G(z))→1）
- 整體是 **Adversarial min-max 對抗賽局**
- D 的內部損失本質上是 **Binary Cross-Entropy（BCE）**（真 vs 假二元分類）

**角色輸入輸出對照（常被反問）：**

| 角色 | 輸入 | 輸出 |
|---|---|---|
| Generator G | 隨機雜訊 z | 假樣本 G(z) |
| Discriminator D | 樣本（真或假） | 真假機率 ∈ [0,1] |

**代表變體：**

| 變體 | 特點 | 應用 |
|---|---|---|
| DCGAN | 卷積版 GAN | 低解析度圖像 |
| StyleGAN | 風格可控、高解析度 | 人臉生成 |
| CycleGAN | 不需成對資料 | 照片 ↔ 油畫風格轉換 |
| WGAN | Wasserstein 距離 | 訓練較穩定 |

**GAN 的失敗模式：**

- **Mode collapse（模式崩潰）**：G 找到幾個能騙過 D 的套路就不再多樣，輸出高度重複。
- **Training instability（訓練不穩定）**：D 太強時 G 收不到梯度（梯度消失），整個訓練崩潰。

### 記憶方式

```text
G = Generate = 雜訊 → 假樣本
D = Detect = 樣本 → 真假機率
GAN = 兩人對抗，所以失敗常是訓練不穩或 mode collapse
```

### Exam Rule

```text
看到「兩個網路互相對抗」→ GAN
看到「Generator 輸入雜訊、輸出樣本」→ GAN 的 G
看到「Discriminator 輸出 [0,1]」→ GAN 的 D（內部損失是 BCE）
看到「mode collapse」→ GAN 的典型失敗模式（不是 Diffusion！）
看到「訓練不穩定 / 梯度消失」→ GAN 的訓練問題
GAN 整體損失 → Adversarial min-max（不是 MSE、不是單純 cross-entropy）
```

### Quick Check

GAN 中 Generator 的輸入是什麼？輸出是什麼？

答案：輸入是隨機雜訊 z，輸出是假樣本 G(z)。不是真實資料，真實資料是 Discriminator 的其中一種輸入。

---

## 3. Diffusion Model — 擴散模型 🔥🔥🔥

### 先懂一句話

Diffusion 模型分兩個過程：正向過程把一張圖一步步加成純雜訊（這是「固定的規則」，不用學）；反向過程從純雜訊一步步去掉雜訊還原成圖片（這才是「神經網路要學的」）。

### Everyday Analogy

想像你在一張日系咖啡廳照片上慢慢塗鴉，塗了 1000 次之後，照片變成電視無訊號的雪花畫面。「塗鴉這個動作」是固定規定好的（正向加噪），不需要機器學習。AI 要學的是「反方向」——從一張雪花畫面，一步步擦掉雪花，還原出那張咖啡廳照片。這個「擦雪花的能力」就是 Diffusion 模型學到的東西。

### 先問自己一個問題

題目是不是在描述「先加噪、再去噪」、「U-Net 預測雜訊」、「DDPM（Denoising Diffusion Probabilistic Model，去噪擴散機率模型）/ DDIM（Denoising Diffusion Implicit Model，去噪擴散隱式模型）」或「Stable Diffusion」？

### 技術說法

Diffusion Model（擴散模型）把生成圖片拆成兩段：**Forward Process（正向過程）**固定加噪，不用學；**Reverse Process（反向過程）**用神經網路學會去噪。DDPM 的常見訓練目標是讓 U-Net 預測正向過程加進去的雜訊 ε。

### 流程 / 選擇流程

```text
正向過程（固定，不學習）：
x_0（原圖）→ 加噪 β₁ → x_1 → 加噪 β₂ → x_2 → ... → x_T（純雜訊）

反向過程（學習，U-Net 去噪）：
x_T（純雜訊）→ 去噪 ε_θ → x_{T-1} → 去噪 ε_θ → ... → x_0（生成圖）
```

### 一步一步例子

以「生成一張貓圖」為例：

```text
訓練時：
Step 1: 拿真實貓圖 x_0
Step 2: 隨機選一個時間 t
Step 3: 根據 noise schedule 加上雜訊，得到 x_t
Step 4: U-Net 看 x_t 和 t，預測這次加上的雜訊 ε_θ
Step 5: 用 MSE（Mean Squared Error，均方誤差）比較 ε_θ 和真實雜訊 ε

生成時：
Step 1: 從純雜訊 x_T 開始
Step 2: U-Net 一步步預測並移除雜訊
Step 3: 多步去噪後得到圖片 x_0
```

### 比較表這樣讀

Diffusion vs GAN 的表格要用來判斷「穩定性、多樣性、速度」：穩定和高品質偏 Diffusion；快速一步生成或特定舊式人臉/風格任務常看到 GAN。

**損失函數（DDPM: Denoising Diffusion Probabilistic Model，去噪擴散機率模型，描述層）：**

```text
L_simple = E[ || ε − ε_θ(x_t, t) ||² ]
```

- ε：正向過程**實際加上去**的真實雜訊
- ε_θ：U-Net **預測**的雜訊
- 損失 = MSE on predicted noise ε（均方誤差，不是 adversarial，也不是 cross-entropy）

**Diffusion vs GAN 對比（常考）：**

| 面向 | GAN | Diffusion |
|---|---|---|
| 訓練穩定性 | 不穩定，兩網路對抗 | 穩定，單一網路 MSE |
| Mode collapse | 會發生 | 不會 |
| 推論速度 | 快（一步） | 原始 DDPM 慢（T ≈ 1000 步）；DDIM 可降至 20–50 步 |
| 圖像品質 | 中 | 高，模式覆蓋好 |
| 常見 T2I | 舊式常見選項 | 常見高品質選項（Stable Diffusion） |

⚠️ 注意：原始 DDPM 需要 ~1000 步推論。但 **DDIM（Denoising Diffusion Implicit Models，2020）** 和其他加速採樣器（DPM-Solver、PLMS）可在 **20–50 步** 完成高品質生成。Stable Diffusion 類系統常搭配加速採樣器。「Diffusion 推論慢」主要是早期 DDPM 的限制，實作上可用採樣器改善。

**Stable Diffusion = Latent Diffusion（延伸）：**

| 面向 | 原版 DDPM | Stable Diffusion |
|---|---|---|
| 擴散空間 | 像素空間（大） | 潛空間（~50× 更小） |
| 文字條件注入 | 無 | CLIP text encoder + cross-attention |
| 推論速度 | 慢 | 快很多 |

**Classifier-Free Guidance（CFG）：**
- 推論時混合「有文字條件」和「無文字條件」的去噪結果
- CFG Scale 越大 → 越貼合 prompt，多樣性下降

### 記憶方式

```text
Forward = 加噪固定，不學
Reverse = 去噪生成，要學
DDPM = MSE on noise ε
Stable Diffusion = Latent + CLIP text + Cross-Attention
```

### Exam Rule

```text
看到「正向加噪 / 反向去噪」→ Diffusion
看到「U-Net 去噪 / MSE on ε / noise schedule」→ DDPM Diffusion
看到「高解析度 T2I / Stable Diffusion」→ Latent Diffusion
看到「推論慢 / T 步推論」→ 原始 DDPM 的缺點（現代實作已用 DDIM 加速）
看到「推論加速 / 減少採樣步數 / 20–50 步」→ DDIM / DPM-Solver（非原始 DDPM）
正向過程 → 固定 noise schedule，不學習
反向過程 → 神經網路（U-Net）要學習的部分
Diffusion 損失 → Denoising MSE（不是 adversarial！）
```

### Quick Check

Diffusion 的正向過程（forward process）需要神經網路學習嗎？為什麼？

答案：不需要。正向過程是固定的 noise schedule（預先設計好的加噪規則 β₁…β_T），只有反向過程（U-Net 學習去噪）才需要訓練。

---

## 4. Transformer 與 LLM 架構 🔥🔥🔥

### 先懂一句話

Transformer 是現代 LLM 的底層積木，核心是「自注意力機制」——讓每個詞根據整個句子的上下文來調整自己的表徵。BERT、GPT、T5 都是 Transformer 的不同組合方式，針對不同任務而設計。

### Everyday Analogy

想像你在 LINE 群組幫朋友猜下一句話：「今天晚餐要吃___」。你會同時看到前面所有的訊息（誰說什麼、什麼時間、什麼情境），然後根據整體上下文預測最可能的答案。這就是自注意力的本質——每個位置都可以「看到」整個序列，選擇性地注意最相關的部分。

### 先問自己一個問題

題目是在問「模型怎麼看上下文」、「BERT/GPT/T5 差異」、「Q/K/V 公式」，還是「self-attention 和 cross-attention 的差別」？

### 技術說法

Transformer 用 Attention（注意力）計算 token 之間的關係。每個 token 會被投影成 Q（Query，查詢）、K（Key，鍵）、V（Value，值），再用 `softmax(QK^T/√d_k)V` 算出「現在這個位置該注意哪些資訊」。

### 流程 / 選擇流程

```text
輸入序列 [token₁, token₂, ..., tokenₙ]
    ↓
每個 token → 投影成 Q、K、V 三個向量
    ↓
Q · K^T / √d_k → softmax → 注意力權重
    ↓
加權平均 V → 上下文表徵
    ↓
殘差連接 + LayerNorm
    ↓
Feed-Forward Network (FFN)
    ↓
殘差連接 + LayerNorm
    ↓
Transformer Block 輸出
```

### 一步一步例子

以句子「我今天想喝熱拿鐵」中的「熱」為例：

```text
Step 1: 「熱」產生自己的 Query：我想找跟溫度或飲品有關的線索
Step 2: 其他 token 產生 Key：我、今天、想、喝、拿鐵各自提供可比對的標籤
Step 3: Q 和每個 K 做內積，得到相關分數
Step 4: 除以 √d_k，避免分數太極端讓 softmax 飽和
Step 5: softmax 把分數變成權重
Step 6: 用權重加總 Value，得到帶上下文的「熱」
```

### 比較表這樣讀

三大 Transformer 變體不要只背名字，要先看「注意力方向」和「輸出任務」：

```text
需要理解整句 → encoder-only / BERT
需要逐字生成 → decoder-only / GPT
需要輸入文字轉另一段文字 → encoder-decoder / T5、BART
```

**自注意力公式（Self-Attention）🔥🔥：**

```text
Attention(Q, K, V) = softmax( Q · K^T / √d_k ) · V
```

| 符號 | 中文 | 意義 |
|---|---|---|
| Q（Query） | 查詢 | 「我在找什麼？」當前 token 投影 |
| K（Key） | 鍵 | 「我是什麼？」每個 token 供比對 |
| V（Value） | 值 | 「我帶什麼資訊？」加權平均的來源 |
| √d_k | 縮放因子 | 防止 softmax 飽和（維度大時內積極端） |
| softmax | 歸一化 | 把內積分數轉成權重（加總為 1） |

**Transformer Block 四件套 🔥：**

```text
Multi-Head Attention → 殘差連接 + LayerNorm → FFN → 殘差連接 + LayerNorm
```

- 殘差連接：防止深層梯度消失
- LayerNorm：穩定每層數值分佈

**多頭注意力（Multi-Head Attention）：**

```text
MultiHead = Concat(head_1, ..., head_h) · W_O
```

h 個頭並行，各頭學不同關係（主詞關係、時間線索、情緒關聯等）。

**位置編碼（Positional Encoding）：**

注意力本身對位置無感（打亂順序結果相同），因此要額外注入位置資訊：
- 原始 Transformer：sinusoidal 正弦/餘弦編碼
- 現代開源 LLM（Llama、Mistral）：RoPE（不考細節）

**三大 Transformer 變體 🔥🔥🔥（必背）：**

| 變體 | 代表 | 注意力方向 | Pretrain 任務 | 典型任務 |
|---|---|---|---|---|
| **Encoder-only** | BERT | **雙向**（看得到左右） | MLM（克漏字）[+ NSP，原始 BERT 包含，但 RoBERTa 2019 證明無效，現代模型已捨棄] | 分類、NER、抽取式 QA |
| **Decoder-only** | GPT / Claude / Llama | **單向**（只看左，causal） | Next-token prediction | 對話、生成、coding |
| **Encoder-decoder** | T5 / BART | 編碼雙向、解碼單向 + cross-attention | Span corruption / denoising | 翻譯、摘要（seq2seq） |

⚠️ 注意：NSP（下一句預測）是原始 BERT 的訓練目標之一，但 RoBERTa（2019）研究證明 NSP 無助於下游任務，後續模型（RoBERTa、ALBERT 等）已移除。IPAS 考試若考 BERT 預訓練，以 MLM 為核心，NSP 視題目年份判斷。

**Self-Attention vs Cross-Attention 🔥：**

| 面向 | Self-Attention | Cross-Attention |
|---|---|---|
| Q 來源 | 同一序列 | 序列 A（如 decoder） |
| K, V 來源 | 同一序列 | 序列 B（如 encoder output、CLIP 文字） |
| 典型場景 | BERT 內部、GPT 內部 | T5 decoder、Stable Diffusion 文字注入 |

### 記憶方式

```text
Q = 我在找什麼
K = 我是不是你要找的
V = 我真正提供的資訊
BERT = 雙向讀
GPT = 單向寫
T5/BART = 讀一段，寫一段
```

### Exam Rule

```text
看到「雙向上下文 / MLM / 情感分類 / 抽取式 QA」→ BERT（encoder-only）
看到「單向 / causal / 逐字生成 / 對話 / coding」→ GPT（decoder-only）
看到「翻譯 / 摘要 / seq2seq」→ T5 / BART（encoder-decoder）
看到「softmax(QK^T/√d_k)V」→ 自注意力 Self-Attention
看到「√d_k 的作用」→ 防止 softmax 飽和（d_k 大時內積極端，梯度消失）
看到「位置資訊注入」→ Positional Encoding（注意力本身無順序感）
文字條件注入 Stable Diffusion → Cross-Attention（不是 self-attention！）
```

### Quick Check

BERT 和 GPT 的注意力方向有何不同？為什麼方向不同會導致任務不同？

答案：BERT 是雙向（看得到左右兩邊的 token），適合做理解類任務（分類、抽取）；GPT 是單向（causal mask，只看左邊），適合自迴歸生成（逐字輸出）。方向決定了模型「能看到什麼資訊」，因此決定了適合的任務。

---

## 5. LLM 三段式訓練管線 🔥🔥🔥

### 先懂一句話

現代 LLM（GPT、Claude、Llama）的訓練分三個階段：Pretrain（預訓練，學通識）→ SFT（Supervised Fine-Tuning，監督式微調，學會照指令回答）→ RLHF（Reinforcement Learning from Human Feedback，從人類回饋中進行強化學習，學偏好對齊）。每個階段有不同的資料型態和訓練目標，不能混淆。

### Everyday Analogy

把 LLM 的成長過程想成一個人的培訓歷程：Pretrain 是「讀完整個圖書館」（學世界知識）；SFT 是「到禮儀學校學如何對話和回答問題」（學指令遵循）；RLHF 是「透過主管給的偏好回饋調整說話風格」（學人類偏好對齊）。三者缺一不可，順序不可打亂。

### 先問自己一個問題

題目是在問模型「學知識」、還是「學照指令回答」、還是「學人類偏好」？如果是要接最新或公司內部資料，是不是其實該用 RAG？

### 技術說法

LLM 訓練管線通常分成：

- **Pretrain（預訓練）**：用大量未標註文本做 self-supervised learning（自監督學習），核心是 next-token prediction（下一個 token 預測）。
- **SFT（Supervised Fine-Tuning，監督式微調）**：用人類寫好的指令與回答示範，讓模型學會指令遵循。
- **RLHF（Reinforcement Learning from Human Feedback，從人類回饋中進行強化學習）**：用人類偏好比較訓練 reward model，再用 PPO（Proximal Policy Optimization，近端策略最佳化）讓模型更符合偏好。
- **DPO（Direct Preference Optimization，直接偏好最佳化）**：同樣用 chosen/rejected 偏好資料，但不另外訓練 reward model。
- **RAG（Retrieval-Augmented Generation，檢索增強生成）**：不是把知識寫進模型權重，而是在生成前把外部資料查出來放進 prompt。

### 流程 / 選擇流程

```text
Stage 1: Pretrain（預訓練）
    海量文本（兆級 token）
    → 目標：預測下一個 token（next-token prediction）
    → 學到：語言結構 + 世界知識 + 事實
    ↓
Stage 2: SFT（Supervised Fine-Tuning，監督式微調）
    人類寫的（指令, 回答）示範對
    → 目標：學會「被問就回答」的格式
    → 學到：指令遵循 + 對話格式 + 禮貌用詞
    ↓
Stage 3: RLHF（Reinforcement Learning from Human Feedback）
    人類對兩個回答的偏好比較（A 比 B 好）
    → 流程：① 訓練 Reward Model → ② PPO 強化學習最大化 reward
    → 學到：有用性 + 安全性 + 人類偏好對齊
```

### 一步一步例子

**Fine-tuning / alignment 流程例子：**

```text
Step 1: Pretrain
輸入：大量網頁、書籍、程式碼等未標註文本
學到：語言結構、世界知識、常識

Step 2: SFT
輸入：人類寫的「請解釋 X」→「好的，X 是...」示範對
學到：被問問題時要用對話格式回答

Step 3: RLHF
輸入：同一題的回答 A/B，人類標出哪個比較好
學到：回答要更有用、更安全、更符合人類偏好
```

**RAG 流程例子：**

```text
員工問題：「公司報銷規定是什麼？」
    ↓
檢索公司知識庫，找出相關規章段落
    ↓
把檢索到的段落放進 prompt
    ↓
LLM 根據文件生成答案
    ↓
輸出回答，最好附來源或引用段落
```

### 比較表這樣讀

先看資料型態，就能分出訓練階段：未標註文本是 Pretrain，指令-回答示範是 SFT，偏好比較是 RLHF 或 DPO。

**三階段比較表 🔥🔥（必背）：**

| 階段 | 資料型態 | 主要目標 | 損失家族 | 類比 |
|---|---|---|---|---|
| **Pretrain** | 未標註海量文本 | 學語言 + 世界知識 | 自監督 cross-entropy | 讀完圖書館 |
| **SFT** | （指令, 回答）示範對 | 學指令遵循 + 格式 | 監督式 cross-entropy | 學待人接物 |
| **RLHF** | 人類偏好比較對 | 學人類偏好對齊 | Reward model + PPO | 學做人處世 |

#### DPO (Direct Preference Optimization) 🔥🔥

**先懂一句話**：不需要 Reward Model 和 PPO，直接用偏好資料訓練語言模型的對齊方法。

**Everyday Analogy**：RLHF 像是先訓練一位評審，再讓評審指導選手；DPO 直接讓選手看所有比賽影片自己學對錯。

| | RLHF | DPO |
|---|---|---|
| 資料格式 | (chosen, rejected) 配對 | (chosen, rejected) 配對（相同） |
| 流程 | 訓練 Reward Model → PPO | 直接優化 LM |
| 複雜度 | 高（三個模型） | 低（一個模型） |
| 常見使用情境 | 需要完整 reward model / PPO 管線 | 希望用較簡化流程做偏好對齊 |

**Exam Rule**：
```text
chosen/rejected 配對 + 無 Reward Model + 直接訓練 LM → DPO
chosen/rejected 配對 + Reward Model + PPO 強化學習 → RLHF
```

**RAG（延伸，情境題常用）🔥：**

RAG（Retrieval-Augmented Generation，檢索增強生成）= 生成前先從外部知識庫檢索相關文件，塞進 prompt 再生成。解決問題：幻覺（hallucination）、知識截止日期。看到「避免幻覺」「連接公司內部知識庫」「外部檢索後生成」→ 想到 RAG。

### 記憶方式

```text
Pretrain = 讀書，學知識
SFT = 看示範，學回答格式
RLHF = 被評分，學偏好
DPO = 直接看 chosen/rejected 學偏好
RAG = 先查資料，再回答
```

### Exam Rule

```text
看到「next-token prediction 大規模語料」→ Pretrain 階段
看到「指令微調 / instruction tuning」→ SFT 階段
看到「reward model + PPO / 人類偏好對齊」→ RLHF 階段
看到「chosen/rejected 配對 + 無 Reward Model + 直接優化 LM」→ DPO（常見的簡化偏好對齊替代方案）
看到「事實 / 世界知識 是哪個階段學的」→ Pretrain（不是 RLHF！）
看到「避免幻覺 / 連外部知識庫 / 接最新資料」→ RAG
```

### Quick Check

「用 RLHF 讓模型學到更多事實」這句話對嗎？

答案：不對。RLHF 負責的是「人類偏好對齊」，不是補充新知識/事實。事實是在 Pretrain 階段透過大規模語料學習的。RLHF 調整的是「偏好方向」，不補知識。

---

## 6. 任務與架構選擇 🔥🔥

### 先懂一句話

不同生成任務有最適合的架構。看到題目描述的輸出類型和場景，先判斷任務類型，再選對應的模型或架構。

### Everyday Analogy

選架構就像選工具：切麵包用麵包刀（BERT 做分類）、烤肉用炭火（Diffusion 生圖）、打字用鍵盤（GPT 生成文字）。工具不通用，情境決定選什麼。

### 先問自己一個問題

題目要的輸出是「類別標籤、原文片段、生成文字、摘要翻譯、圖片、還是有來源的知識型回答」？

### 技術說法

架構選擇的本質是 output format（輸出形式）和 context requirement（上下文需求）匹配：

- **分類 / NER / 抽取式 QA**：偏理解任務，常選 BERT（encoder-only）。
- **對話 / coding / 長文生成**：偏自迴歸生成，常選 GPT（decoder-only）。
- **翻譯 / 摘要**：輸入一段、輸出另一段，常選 T5 / BART（encoder-decoder）。
- **文字轉圖片**：高解析度和穩定性常選 Diffusion。
- **公司知識庫問答 / 最新資料**：常選 RAG。

### 流程 / 選擇流程

```text
看題目描述的輸出形式或場景需求
    ↓
判斷任務類型
    ↓
選對應的模型 / 架構 / 方法
```

### 一步一步例子

```text
題目：輸入公司內部 FAQ，回答員工問題，且要降低幻覺。

Step 1: 輸入是問題，外部資料是公司 FAQ
Step 2: 輸出是文字回答
Step 3: 題目強調內部知識與降低幻覺
Step 4: 不只選一般 GPT，而是選 RAG
Step 5: RAG = 先檢索 FAQ，再把相關段落交給 LLM 生成
```

### 比較表這樣讀

這張表是決策表：先看任務 / 場景，再往右讀到輸入、輸出、首選架構。

**任務對應架構速查表 🔥🔥：**

| 任務 / 場景 | 輸入 | 輸出 | 首選架構 |
|---|---|---|---|
| 文字分類 / 情感分析 / NER | 文字 | 類別標籤 | BERT（encoder-only，雙向） |
| 抽取式問答（從原文找答案） | 文字 + 問題 | 原文片段 | BERT（encoder-only） |
| 對話生成 / 逐字輸出 / coding | 文字 | 文字（生成式） | GPT（decoder-only） |
| 翻譯 / 摘要 / seq2seq | 文字 A | 文字 B | T5 / BART（encoder-decoder） |
| 高解析度文字轉圖片（T2I） | 文字 prompt | 圖片 | Diffusion（Stable Diffusion） |
| 人臉生成 / 風格轉換 | 雜訊 / 圖片 | 圖片 | GAN（StyleGAN / CycleGAN） |
| 避免幻覺 / 存取外部知識 | 問題 + 知識庫 | 文字（有來源） | RAG |

**損失函數快速辨識 🔥：**

| 模型家族 | 主要損失 | 關鍵字 |
|---|---|---|
| GAN | Adversarial (min-max) | `log D(x) + log(1−D(G(z)))` |
| Diffusion (DDPM) | Denoising MSE on ε | `‖ε − ε_θ‖²` |
| LLM / BERT | Cross-entropy | next-token / masked-token |
| CLIP | Contrastive (InfoNCE) | 文字-圖片對齊度 |

### 記憶方式

```text
分類理解 → BERT
逐字生成 → GPT
文字轉文字 → T5 / BART
文字轉圖片 → Diffusion
風格 / 人臉 → GAN
要查資料再答 → RAG
```

### Exam Rule

```text
看到「文字理解 / 雙向上下文 / 分類」→ BERT
看到「逐字生成 / 長文對話 / autoregressive」→ GPT decoder-only
看到「翻譯 / 摘要 / 輸入A→輸出B」→ T5 encoder-decoder
看到「高解析度圖像 / 訓練穩定 / 模式覆蓋好」→ Diffusion
看到「人臉 / 風格轉換 / mode collapse 問題」→ GAN
看到「連外部資料庫 / 知識截止日期 / 幻覺」→ RAG
```

### Quick Check

有一個任務：「輸入一篇新聞，輸出一段 50 字的中文摘要」。應該用哪種 Transformer 架構？為什麼？

答案：T5 或 BART（encoder-decoder）。因為這是 seq2seq 任務（輸入文本→輸出不同長度的文本），encoder-decoder 架構先用雙向 encoder 理解全文，再用 decoder 生成摘要，正好符合此需求。純 decoder-only（GPT）也可以做，但 encoder-decoder 是此類任務的標準選擇。

---

## 7. 評估指標 🔥🔥

### 先懂一句話

不同生成模態用不同指標衡量品質。文字生成用 PPL，圖像生成用 FID，文字-圖片對齊用 CLIP Score，對話品質用人類偏好 ELO。記住「指標對應模態」，而不只是背數字。

### Everyday Analogy

評估生成品質就像不同運動比賽用不同計分方式：游泳看時間（PPL，越低越好）、體操看評審打分（FID，越低表示分佈越接近真實）、歌手唱歌後觀眾票選（ELO）。同一套標準不能跨項目使用。

### 先問自己一個問題

題目要評估的是「文字模型本身」、「一批生成圖片」、「文字和圖片是否對齊」、「翻譯摘要和參考答案是否像」，還是「語音轉文字錯多少」？

### 技術說法

生成式 AI 的評估指標通常分模態（modality）使用。PPL（Perplexity，困惑度）看語言模型對文字的預測不確定性；FID（Fréchet Inception Distance）看生成圖集合和真實圖集合的分布距離；CLIP Score 看文字和圖片 embedding 的相似度。

### 流程 / 選擇流程

```text
生成結果
    ↓
選對指標
    ↓
文字生成 → PPL（困惑度）
圖像生成 → FID（分布距離）
文字-圖片對齊 → CLIP Score
機器翻譯/摘要 → BLEU（n-gram 重疊）
語音辨識 → WER（錯誤率）
聊天機器人 → Human eval / ELO
```

### 一步一步例子

```text
情境：text-to-image 模型輸入「一隻白貓坐在紅色沙發上」。

如果問圖片整體品質和多樣性：
Step 1: 生成很多張圖
Step 2: 和真實圖片集合比較特徵分布
Step 3: 用 FID，越低越好

如果問圖片是否符合 prompt：
Step 1: 用 CLIP 編碼文字 prompt
Step 2: 用 CLIP 編碼生成圖片
Step 3: 算 cosine similarity
Step 4: 用 CLIP Score，越高越好
```

### 比較表這樣讀

先看「適用模態」，再看方向是越高越好或越低越好。不要把 FID 拿來評單張圖，也不要用 PPL 評圖片。

**指標完整速查表 🔥🔥：**

| 指標 | 全名 | 適用模態 | 計算概念 | 方向 |
|---|---|---|---|---|
| **PPL** | Perplexity（困惑度） | LLM 語言模型 | exp(平均 cross-entropy) | **越低越好** |
| **FID** | Fréchet Inception Distance | 圖像生成 | Inception-v3 特徵空間，真實集 vs 生成集的高斯距離 | **越低越好** |
| **CLIP Score** | CLIP 相似度 | 文字-圖片對齊 | CLIP 文字 embedding 與圖片 embedding 的 cosine 相似度 | **越高越好** |
| **BLEU** | Bilingual Evaluation Understudy | 機器翻譯/摘要 | 生成句 vs 參考句的 n-gram 重疊率 | **越高越好** |
| **WER** | Word Error Rate | 語音辨識/字幕 | (替換+刪除+插入) / 參考詞數 | **越低越好** |
| **IS** | Inception Score | 圖像生成（舊） | 類別銳利度 × 多樣性 | 越高越好（FID 已取代） |
| **ELO / Human** | Chatbot Arena | LLM 對話 | 人類成對偏好投票 → ELO 排名 | 越高越好 |

**重要：FID 是「群體 vs 群體」，不是「單張圖」🔥：**

FID 比較的是「生成一批圖的特徵分布」vs「真實一批圖的特徵分布」。FID 低 = 整批生成品質高且多樣性好，不是指某一張圖很好看。

### 記憶方式

```text
PPL = 文字困不困惑，越低越好
FID = 圖像分布像不像真實，越低越好
CLIP Score = 圖文對不對齊，越高越好
BLEU = 翻譯摘要像不像參考句，越高越好
WER = 語音轉字錯多少，越低越好
```

### Exam Rule

```text
看到「文字生成品質 / 語言模型評估」→ PPL（越低越好）
看到「圖像生成品質 + 多樣性」→ FID（越低越好）
看到「text-to-image 對齊度 / prompt 有沒有跟上」→ CLIP Score（越高越好）
看到「機器翻譯 / 摘要品質 / 文字重疊」→ BLEU（越高越好）
看到「語音辨識錯誤 / 字幕生成」→ WER（越低越好）
看到「Chatbot Arena / 真實用戶體驗」→ Human eval / ELO
FID 評的是「一堆圖 vs 一堆圖」，不是單張 → 同時反映品質和多樣性
```

### Quick Check

一個研究者說「我這個模型的 FID 分數從 50 降到 20，代表生成的圖片更漂亮了」。這個說法精確嗎？

答案：不完全精確。FID 降低代表生成的整批圖片在 Inception 特徵空間中，分布更接近真實圖片的分布，同時反映了品質提升和多樣性改善。但 FID 評估的是「一批圖 vs 一批圖」，不是單張圖的美觀程度。

---

## 8. Exam Decision Trees — 考試決策樹 🔥🔥🔥

遇到情境題，先找關鍵字，再走決策樹。

**決策樹一：選生成架構**

```text
題目描述是什麼任務？
│
├─ 要生成圖片？
│  ├─ 高解析度 / 多樣性 / 訓練穩定？
│  │  └─ → Diffusion（Stable Diffusion）
│  └─ 人臉生成 / 快速推論 / 風格轉換？
│     └─ → GAN（StyleGAN / CycleGAN）
│
├─ 要生成文字？
│  ├─ 理解 / 分類 / 雙向上下文 / NER？
│  │  └─ → BERT（encoder-only）
│  ├─ 逐字生成 / 對話 / coding？
│  │  └─ → GPT（decoder-only）
│  └─ 翻譯 / 摘要 / seq2seq？
│     └─ → T5 / BART（encoder-decoder）
│
└─ 要避免幻覺 / 接外部知識庫？
   └─ → RAG（檢索增強生成）
```

**決策樹二：選訓練階段**

```text
題目在問 LLM 訓練的哪個環節？
│
├─ 用了兆級未標註文本 / next-token prediction？
│  └─ → Pretrain（預訓練）
│
├─ 用了（指令, 回答）人工示範對 / 格式學習？
│  └─ → SFT（監督式微調）
│
├─ 用了偏好比較對 / reward model / PPO？
│  └─ → RLHF（人類偏好強化學習）
│
└─ 用了偏好比較對（chosen/rejected）/ 無 reward model / 直接優化 LM？
   └─ → DPO（Direct Preference Optimization，簡化偏好對齊）

⚠️ 陷阱：「事實 / 知識是哪個階段學的？」→ Pretrain，不是 RLHF
```

**決策樹三：選評估指標**

```text
要評估的是什麼模態的輸出？
│
├─ 文字生成（語言模型）？
│  └─ → PPL（越低越好）
│
├─ 圖像生成（一批圖的整體品質）？
│  └─ → FID（越低越好）
│
├─ 文字 prompt 和圖片的對齊度？
│  └─ → CLIP Score（越高越好）
│
├─ 機器翻譯 / 摘要的文字相似度？
│  └─ → BLEU（越高越好）
│
├─ 語音辨識 / 字幕的錯誤率？
│  └─ → WER（越低越好）
│
└─ 聊天機器人的真實使用體驗？
   └─ → Human eval / ELO（越高越好）
```

**決策樹四：選損失函數**

```text
是什麼模型？
│
├─ GAN → Adversarial min-max（整體）/ D 內部是 BCE
├─ Diffusion（DDPM）→ Denoising MSE on ε（‖ε − ε_θ‖²）
├─ LLM / BERT → Cross-entropy（next-token / masked-token）
└─ CLIP → Contrastive（InfoNCE）
```

---

## 9. Trap Clinic — 考試陷阱診所 🔥🔥🔥

### Trap 1：BERT 和 GPT 的訓練方向搞反

錯。「BERT 單向、GPT 雙向」完全說反了。

Exam fix：

```text
BERT = encoder-only → 雙向（bidirectional）→ MLM 克漏字 → 分類/理解
GPT = decoder-only → 單向（unidirectional / causal）→ 下一個 token 預測 → 生成
記憶法：「BERT 雙向讀，GPT 單向寫」
```

### Trap 2：Diffusion 的正向過程是學出來的

錯。正向過程是固定規則，不需學習。

Exam fix：

```text
正向（Forward）→ 固定 noise schedule（β₁…β_T），不學習
反向（Reverse）→ U-Net 去噪網路，需要訓練
方向口訣：「正向加噪固定，反向去噪要學」
```

### Trap 3：GAN 的損失函數是 MSE 或普通 cross-entropy

錯。GAN 整體是 Adversarial min-max，不是 MSE，也不是一條簡單的 cross-entropy。

Exam fix：

```text
GAN 整體 → Adversarial min-max 對抗式損失
D 的內部 → BCE（Binary Cross-Entropy，真 vs 假二元分類）
MSE on ε → 這是 Diffusion 的損失，不是 GAN！
記憶法：「整體對抗式，D 內部 BCE」
```

### Trap 4：RLHF 是讓模型學新事實/知識的階段

錯。RLHF 只負責偏好對齊，不補充知識。

Exam fix：

```text
事實 / 世界知識 → Pretrain 學的
對話格式 / 指令遵循 → SFT 學的
人類偏好 / 安全對齊 → RLHF 學的
「模型知識截止日期」是 Pretrain 決定的，RLHF 無法改變
```

### Trap 5：Generator 和 Discriminator 的輸入輸出搞反

錯。G 的輸入是雜訊，D 的輸入是樣本（真或假）。

Exam fix：

```text
Generator G：輸入 = 隨機雜訊 z → 輸出 = 假樣本 G(z)
Discriminator D：輸入 = 樣本（真或假）→ 輸出 = 真假機率 [0,1]
記憶法：G 造假（雜訊→圖），D 鑑定（圖→機率）
```

### Trap 6：Stable Diffusion 的文字注入用 self-attention

錯。文字條件注入圖像是用 cross-attention，不是 self-attention。

Exam fix：

```text
Self-attention → Q、K、V 來自同一序列
Cross-attention → Q 來自圖像 latent，K/V 來自 CLIP 文字編碼器
Stable Diffusion 注入文字條件 → cross-attention
```

### Trap 7：FID 是看單張圖好不好看

錯。FID 評估的是「一批生成圖 vs 一批真實圖」的分布距離。

Exam fix：

```text
FID = Fréchet Inception Distance
評估「生成集合 vs 真實集合」在 Inception 特徵空間的分布距離
反映整體品質 + 多樣性，不是單張圖的美觀度
FID 越低 = 整批生成的分布越接近真實
```

### Trap 8：所有生成任務都能用 LLM 解決

錯。不同模態有各自最佳架構，LLM 不是萬能的。

Exam fix：

```text
高解析度圖像 → Diffusion
文字對話 → Autoregressive LLM（GPT/Claude）
人臉/風格轉換 → GAN
文字-圖片對齊測量 → CLIP（Contrastive）
```

### Trap 9：注意力公式的 √d_k 可有可無

錯。√d_k 的 scaling 是防止 softmax 飽和的必要設計。

Exam fix：

```text
d_k 大時，Q·K^T 的內積會變得很極端
softmax 輸出趨近 one-hot → 梯度消失
√d_k 縮放可以避免此問題
「softmax 飽和 / 梯度消失 → √d_k 的作用」
```

---

## 10. Practice Questions

### 10.1 GAN

**Q1.** GAN 中 Generator 的輸入和輸出分別是什麼？

答案：Generator 輸入是隨機雜訊 z，輸出是假樣本 G(z)。
理由：G 的任務是把雜訊轉換成看起來像真實數據的樣本，因此輸入端是隨機雜訊，輸出端是生成的假樣本。

**Q2.** 下列哪個選項最準確描述 GAN 的整體訓練損失？
(A) MSE 回歸損失  (B) Adversarial min-max 對抗式損失  (C) Cross-entropy 分類損失  (D) Contrastive 對比損失

答案：(B)
理由：GAN 整體是 min-max 對抗賽局，因此整體訓練稱為 Adversarial Loss。注意 D 的內部損失是 BCE，但 GAN 整體不是單純的 cross-entropy。

**Q3.** Mode collapse 是哪種生成模型的典型失敗模式？

答案：GAN（生成對抗網路）。
理由：GAN 的 Generator 可能找到幾種能騙過 Discriminator 的套路後就不再產生多樣化輸出，導致模式崩潰（mode collapse）。Diffusion 不會出現 mode collapse。

**Q4.** 以下對 GAN 訓練問題的描述，哪個是正確的？
(A) GAN 推論慢，需要跑 T ≈ 1000 步  (B) GAN 容易出現 hallucination  (C) GAN 訓練不穩定，當 D 太強時 G 的梯度會消失  (D) GAN 的正向過程不需要學習

答案：(C)
理由：GAN 訓練不穩定且 D 太強時 G 的梯度消失是典型問題。推論慢是 Diffusion 的問題，hallucination 是 LLM 的問題，「正向過程不需學習」說的是 Diffusion。

---

### 10.2 Diffusion Model

**Q5.** Diffusion 模型中，哪個過程是「固定的」、不需要神經網路學習？

答案：正向過程（Forward process）。
理由：正向加噪過程由預先設計好的 noise schedule（β₁…β_T）控制，每步加多少雜訊是固定規則，不需訓練。

**Q6.** DDPM 的訓練損失函數是什麼類型？

答案：Denoising MSE（去噪均方誤差），即 `‖ε − ε_θ(x_t, t)‖²`。
理由：模型學習預測正向過程加上去的真實雜訊 ε，損失是預測雜訊和真實雜訊之間的均方誤差，是回歸型損失，不是對抗式或 cross-entropy。

**Q7.** Stable Diffusion 和原版 DDPM 最主要的架構差異是什麼？

答案：Stable Diffusion 在「潛空間（latent space）」做擴散而非像素空間，因此稱為 Latent Diffusion。
理由：Stable Diffusion 用 VAE 把圖像壓縮到更小的潛空間（約原本的 1/50），在此低維空間做擴散，大幅加快推論速度，並透過 CLIP text encoder + cross-attention 注入文字條件。

**Q8.** 以下哪個是 Diffusion 模型相較於 GAN 的優點？
(A) 推論速度快  (B) 訓練穩定、不會出現 mode collapse  (C) 不需要任何監督訊號  (D) 可以同時做文字和圖像

答案：(B)
理由：Diffusion 採用單一網路的 MSE 訓練，沒有兩個網路對抗的不穩定問題，也不會出現 mode collapse。推論慢（需 T 步）是 Diffusion 的缺點，不是優點。

---

### 10.3 Transformer 與 LLM 架構

**Q9.** `Attention(Q, K, V) = softmax(QK^T / √d_k) V` 中，√d_k 的作用是什麼？

答案：防止 softmax 飽和（避免梯度消失）。
理由：d_k 較大時，Q 和 K 的內積值會變得很大，softmax 輸出趨近 one-hot，梯度接近零（梯度消失）。除以 √d_k 可以縮放內積，讓 softmax 維持合適的梯度範圍。

**Q10.** BERT 和 GPT 的注意力方向有何不同？各適合什麼任務？

答案：BERT 是雙向注意力（可看左右），適合分類、NER、抽取式 QA；GPT 是單向注意力（causal mask，只看左），適合對話生成、逐字輸出。
理由：雙向注意力能充分利用上下文做理解，單向注意力符合自迴歸生成的要求（不能「偷看未來」）。

**Q11.** 以下哪個任務最適合使用 encoder-decoder 架構（如 T5）？
(A) 情感分析  (B) 機器翻譯  (C) 開放式對話生成  (D) 人臉辨識

答案：(B) 機器翻譯
理由：翻譯是典型的 seq2seq 任務（輸入一段文字，輸出另一段不同語言的文字），encoder-decoder 架構（encoder 讀入全句，decoder 逐字生成譯文）最適合。情感分析用 encoder-only，對話生成用 decoder-only。

**Q12.** Transformer 中殘差連接（Residual Connection）的作用是什麼？

答案：防止深層網路梯度消失，讓梯度可以直接流回前層。
理由：殘差連接（x + Attention(x)）提供了一條「高速公路」讓梯度跳過若干層直接傳播，避免 100+ 層的深度網路在反向傳播時梯度消失。LayerNorm 則穩定數值分佈。

**Q13.** Self-attention 和 Cross-attention 的關鍵差異是什麼？舉一個 cross-attention 的應用例子。

答案：Self-attention 中 Q、K、V 都來自同一序列；Cross-attention 中 Q 來自一個序列（如 decoder），K、V 來自另一個序列（如 encoder output 或 CLIP 文字編碼）。應用例子：Stable Diffusion 把文字 prompt 注入圖像 U-Net 時，用 cross-attention（Q 來自圖像 latent，K/V 來自 CLIP 文字編碼器）。
理由：Cross-attention 讓一個序列「借助」另一個序列的資訊，是文字條件控制圖像生成的核心機制。

---

### 10.4 訓練管線與評估

**Q14.** 現代 LLM 的三段式訓練管線是什麼？每個階段分別用什麼資料？

答案：Pretrain（未標註海量文本）→ SFT（人工示範的指令-回答對）→ RLHF（人類偏好比較對，A vs B）。
理由：三階段各司其職，Pretrain 學世界知識，SFT 學指令遵循格式，RLHF 學對齊人類偏好與安全。

**Q15.** 「透過 RLHF 可以讓語言模型學到更多最新知識」，這個說法對嗎？

答案：不對。
理由：最新知識/事實是 Pretrain 階段學到的，Pretrain 的訓練資料決定了模型的知識截止日期。RLHF 只調整模型輸出的「偏好方向」（有用性、安全性），不會補充新知識。

**Q16.** 以下哪個評估指標適合衡量一個 text-to-image 模型的「文字描述和生成圖片的對齊程度」？
(A) PPL  (B) FID  (C) CLIP Score  (D) BLEU

答案：(C) CLIP Score
理由：CLIP Score 計算 CLIP 模型對文字 prompt 和生成圖片分別編碼後的 cosine 相似度，直接衡量文字描述和生成圖片有多「對齊」。

**Q17.** FID 和 IS（Inception Score）都是圖像生成的評估指標。FID 有什麼優勢？

答案：FID 同時考量品質和多樣性，且是比較「生成集合 vs 真實集合」的分布距離，比 IS 更全面。IS 只看生成集合本身的類別銳利度和多樣性，不直接和真實數據比較，因此 IS 較容易被「刷分」，實務上常以 FID 作為圖像生成的重要指標。
理由：FID 的「跟真實比」這個設計讓它更準確反映模型的生成品質。

**Q18.** 要評估一個語音識別系統把語音轉成文字的準確度，應該用哪個指標？

答案：WER（Word Error Rate，詞錯誤率）。
理由：WER = (替換 + 刪除 + 插入) / 參考詞數，越低代表辨識越準確，是語音辨識和字幕生成的標準評估指標。

---

### 10.5 Mixed Traps

**Q19.** 以下描述中，哪一個是正確的？
(A) GAN 的正向加噪過程需要訓練  
(B) Diffusion 模型的訓練目標是 adversarial min-max  
(C) BERT 是 encoder-only，訓練時使用雙向注意力  
(D) RLHF 是讓模型學習更多世界知識的階段

答案：(C)
理由：(A) 正向加噪是 Diffusion 的固定 noise schedule，不需訓練；(B) Diffusion 的損失是 MSE，不是 adversarial；(C) 正確，BERT encoder-only，雙向注意力 MLM 訓練；(D) 世界知識是 Pretrain 學的，不是 RLHF。

**Q20.** 一家公司想建立一個「能查公司內部規章手冊，然後回答員工問題」的系統，最適合哪種技術？

答案：RAG（Retrieval-Augmented Generation，檢索增強生成）。
理由：RAG 在 LLM 生成回答前，先從外部知識庫（公司規章手冊）檢索相關內容，塞進 prompt 再生成。這樣 LLM 不需要重新訓練就能存取最新文件，也能降低幻覺。

**Q21.** 「Stable Diffusion 用 self-attention 把文字 prompt 注入圖像生成過程」，這個說法正確嗎？

答案：不正確。應該是 cross-attention。
理由：Self-attention 的 Q、K、V 來自同一序列（圖像 latent）；Stable Diffusion 注入文字時，Q 來自圖像 U-Net 的 latent，K、V 來自 CLIP text encoder 的輸出，Q 和 K/V 來自不同序列，這是 cross-attention 的定義。

**Q22.** 下列各模型對應的主要失敗模式，哪個配對是錯的？
(A) GAN → mode collapse  
(B) Diffusion → 推論慢  
(C) LLM → 幻覺（hallucination）  
(D) BERT → 只能單向注意力

答案：(D)
理由：BERT 是雙向注意力（bidirectional），不是單向。BERT 的訓練用 MLM（Masked Language Model），需要同時看左右兩側的上下文。「只能單向注意力」說的是 GPT（decoder-only）。

**Q23.** 有一個研究團隊說「我們的新圖像生成模型 FID 從 30 降到 5，所以這個模型生成的每張圖都更漂亮了」。這個推斷有什麼問題？

答案：FID 評估的是「一批生成圖的分布」vs「一批真實圖的分布」的距離，反映的是整體品質和多樣性，不是單張圖的美觀程度。FID 降低說明整批生成的分布更接近真實，但不保證每一張圖都更漂亮。應該說「整體生成品質與多樣性提升」。
理由：FID 是群體統計指標，不是單張評分。

**Q24.** SFT 和 Pretrain 同樣都是「監督式學習」的變體，但它們的訓練資料和目標有何根本差異？

答案：Pretrain 用「未標註的海量文本」做自監督訓練（next-token prediction），目標是學語言結構和世界知識；SFT 用「人工撰寫的（指令, 回答）示範對」做監督式訓練，目標是學指令遵循和對話格式。
理由：Pretrain 的「標籤」是文本自己的下一個 token（自監督），SFT 的「標籤」是人類寫好的示範回答（有監督）。兩者用的資料量級和品質要求完全不同。

**Q25.** 以下哪個情境最適合使用 decoder-only 架構（如 GPT）而非 encoder-decoder（如 T5）？
(A) 把一段中文自動翻譯成英文  
(B) 對話式 AI 助理（用戶輸入問題，AI 逐字回答）  
(C) 輸入一篇文章，輸出其重點摘要  
(D) 判斷一段評論是正面還是負面情緒

答案：(B)
理由：對話生成是典型的 decoder-only（autoregressive）任務。GPT 接收對話歷史，自迴歸逐字生成回應。翻譯（A）和摘要（C）是 seq2seq，T5 encoder-decoder 更標準；情感判斷（D）是分類任務，用 BERT encoder-only 更好。

---

## Final Oral Recall

考前最後 3 分鐘，把這 6 句唸一次：

1. **GAN**：「G 輸入雜訊造假樣本，D 輸入樣本輸出真假機率，整體是 adversarial min-max，D 內部是 BCE，失敗模式是 mode collapse。」
2. **Diffusion**：「正向加噪固定不學，反向去噪要學 U-Net，損失是 MSE on ε，優點是穩定不 mode collapse，原始 DDPM 推論慢（~1000 步），DDIM 加速至 20–50 步。」
3. **Transformer**：「BERT 雙向 encoder-only 做分類，GPT 單向 decoder-only 做生成，T5 encoder-decoder 做 seq2seq 翻譯摘要。自注意力公式 `softmax(QK^T/√d_k)V`，√d_k 防止 softmax 飽和。」
4. **訓練管線**：「Pretrain 學通識（未標註海量文本），SFT 學禮儀（指令-回答示範對），RLHF 學偏好（Reward Model + PPO）或 DPO（chosen/rejected 直接優化，無 Reward Model）。事實是 Pretrain 學的，不是 RLHF。」
5. **評估指標**：「文字困惑 PPL 越低越好，圖像 FID 越低越好（群體 vs 群體），文字-圖片對齊 CLIP Score 越高越好，聊天機器人看 ELO。」
6. **Cross-attention**：「Stable Diffusion 注入文字用 cross-attention，Q 來自圖像 latent，K/V 來自 CLIP 文字編碼器。Self-attention 的 Q/K/V 全部來自同一序列。」

---

## Final Study Advice

不要只背名詞。這堂課的考題最常用情境描述的方式出現：「有一個系統需要做 X，請問應該用哪種架構 / 損失 / 指標 / 訓練階段？」

每次看到題目，先問自己三個問題：
1. **輸入是什麼、輸出是什麼？** → 判斷任務類型（分類 / 生成 / seq2seq / 圖像生成）
2. **題目有沒有出現關鍵字？** → 對應到 Section 1 的快查表
3. **有沒有踩到九個陷阱之一？** → 特別小心「BERT/GPT 方向」「Diffusion 正反向」「RLHF 教事實」這三個最高頻的錯誤

這門課的核心是三張表：三大生成架構比較、三大 Transformer 變體比較、指標對應模態表。把這三張表背到能「看到關鍵字秒反應」，本課 80% 的題目都能答對。

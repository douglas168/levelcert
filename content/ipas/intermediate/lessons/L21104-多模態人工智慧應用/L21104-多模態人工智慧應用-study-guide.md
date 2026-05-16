# L21104 多模態人工智慧應用 — Study Guide v2

> IPAS AI 應用規劃師 中級｜對應評鑑範圍：多模態（Multimodal）AI，包含文字、圖像、聲音的融合策略、CLIP、交叉注意力、GPT-4o、Gemini 等主流架構。

---

## 0. How to Use This Guide

### 建議閱讀順序

1. **Section 1**：先看大地圖，知道整個多模態流程長什麼樣子。
2. **Sections 2–7**：按順序讀，每節先看「先懂一句話」，再看 Exam Rule。
3. **Section 8**：遇到不確定的題型，用決策樹快速定位答案。
4. **Section 9**：專門對付「感覺對但其實錯」的陷阱選項。
5. **Section 10**：做練習題，計時模擬考場節奏。
6. **Final Oral Recall**：考前 3 分鐘唸一遍。

### 如何使用練習區

- 先蓋住答案，自己選，再對答案。
- 錯了就回對應 Section 重讀，不要只記答案。

### 火力標記說明

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture — 多模態 AI 核心流程

### 整體流程管線

```text
[各模態原始輸入]
    │
    ▼
[模態編碼器 Modality Encoders]
    文字 → Tokenizer + Transformer → 文字向量
    圖像 → CNN / ViT patches      → 圖像向量
    聲音 → log-Mel + Conv/Transformer → 音訊向量
    │
    ▼
[融合策略 Fusion Strategy]  ← L21104 核心考點
    早期融合 Early   → 特徵層直接 concat
    晚期融合 Late    → 各自模型，輸出層合流（決策層投票/加權）
    混合融合 Hybrid  → 中間層注意力 / 門控結合
    交叉注意力 Cross-Attention → Q 問對方，K/V 來自另一模態
    │
    ▼
[多模態表示 / 輸出]
    對齊向量 → 檢索 / 零樣本分類（CLIP）
    生成文字 → VQA / Captioning（Flamingo、LLaVA、GPT-4V）
    生成圖像 → Text-to-Image（Stable Diffusion、DALL-E）
    生成語音 → ASR 轉錄（Whisper）
    原生端到端 → GPT-4o、Gemini
```

### 流程這樣讀

讀多模態題目時，先不要急著背模型名稱。先把題目拆成三個問題：

```text
1. 輸入有哪些模態？（文字 / 圖像 / 聲音 / 影片）
2. 輸出要什麼？（分類 / 檢索 / 生成文字 / 生成圖像 / 語音轉錄）
3. 資訊在哪一層合流？（特徵層 / 決策層 / 中間層 / 交叉注意力）
```

### 一步一步例子：看懂一題多模態流程

題目：「系統接收一張商品圖和一段文字描述，判斷兩者是否相符。」

```text
Step 1：輸入 = 圖像 + 文字
Step 2：圖像 → Image Encoder → image embedding
Step 3：文字 → Text Encoder → text embedding
Step 4：在共享嵌入空間比較相似度
Step 5：輸出 = 是否相符 / 最相近配對
```

答案方向：這是圖文對齊與跨模態檢索，優先想到 CLIP。

### 考題關鍵字快速對照

| 題目問的是 | 想到 |
|---|---|
| 圖文對齊、零樣本分類、共享嵌入空間 | CLIP |
| 文字→圖像生成 | Stable Diffusion / DALL-E |
| Q 來自一模態、K/V 來自另一模態 | 交叉注意力 Cross-Attention |
| 語音轉文字、ASR、log-Mel | Whisper |
| 視覺問答 VQA、看圖說話 | Flamingo / LLaVA / GPT-4V |
| 原生多模態、端到端多模態訓練 | GPT-4o / Gemini |
| 各自獨立分類器，輸出層投票/加權 | 晚期融合 Late Fusion |
| 原始特徵直接 concat | 早期融合 Early Fusion |
| 凍結 LLM + Perceiver Resampler | Flamingo |

---

## 2. 多模態基本概念 🔥🔥

### 先懂一句話

多模態（Multimodal）AI 指一個模型能同時處理兩種以上的資訊來源（文字、圖像、聲音）；跨模態（Cross-modal）則是在不同模態之間**轉換或檢索**，是多模態的子任務。

### Everyday Analogy

你在 IG 滑一個美食 Reel：眼睛看到**影像**，耳朵聽到**聲音**，眼睛也讀到**文字說明**。你在一秒內把三條訊號合成「這家很貴但好吃」的判斷。單模態 AI 只能看其中一種；多模態 AI 要學會像你一樣把三條訊號串成一個判斷。

### 先問自己一個問題

題目是在問「模型能不能同時吃多種資料」，還是在問「能不能從一種資料找到或產生另一種資料」？

- 如果重點是**同時處理多種輸入** → 多模態（Multimodal）
- 如果重點是**文字找圖、圖找文字、文字生圖** → 跨模態（Cross-modal）

### 技術說法

多模態（Multimodal）是能力：模型能處理兩種以上模態。跨模態（Cross-modal）是任務方向：模型在不同模態之間做轉換、檢索或對齊。包含關係是：

```text
多模態 Multimodal ⊇ 跨模態 Cross-modal
```

### 流程 / 選擇流程

```text
原始資料（文字 / 圖像 / 聲音）
→ [定義這是哪類問題：單模態？多模態？跨模態？]
→ 選擇對應的架構與融合策略
→ 輸出（對齊向量 / 生成文字 / 生成圖像 / 語音轉錄）
```

### 一步一步例子

```text
例 1：只看文字做情緒分類
→ 輸入只有文字
→ 單模態 Unimodal

例 2：同時看圖片和商品文字，判斷是否違規
→ 輸入有圖片 + 文字
→ 多模態 Multimodal

例 3：輸入「紅色跑鞋」去找圖片
→ 從文字模態找圖像模態
→ 跨模態 Cross-modal
```

### 比較表這樣讀

先看「輸入有幾種」，再看「有沒有跨模態轉換或檢索」。不要只看到兩種資料就直接選跨模態，因為跨模態一定有「從 A 模態到 B 模態」的方向。

| 維度 | 單模態 Unimodal | 多模態 Multimodal | 跨模態 Cross-modal |
|---|---|---|---|
| 定義 | 只處理一種模態 | 同時處理 ≥2 種模態 | 在模態間轉換或檢索 |
| 包含關係 | — | 包含跨模態 | 是多模態的子任務 |
| 典型例子 | BERT（純文字）、ResNet（純圖像） | GPT-4o、Gemini、Flamingo | CLIP 圖文檢索、DALL-E 生圖 |
| 考試用語 | 「只用一種模態」常是錯誤選項 | 「整合 X 與 Y」 | 「文字↔圖像檢索」「文字→圖像生成」 |

**包含關係**：多模態 ⊇ 跨模態。所有跨模態任務都發生在多模態系統裡，但多模態系統不一定做跨模態轉換。

### 記憶方式

```text
多模態 = 多種感官一起用
跨模態 = 從一種感官找 / 轉成另一種感官
```

### Exam Rule

```text
看到「跨模態檢索」→ 想到 CLIP
看到「多模態 = 跨模態」這說法 → 錯，多模態包含跨模態（⊇ 關係）
看到「整合 X 種模態」→ 想到多模態 Multimodal，而非單模態
看到「只使用單一模態」當作最佳解 → 通常是錯誤選項（除非題幹明示）
```

### Quick Check

**問：「跨模態」和「多模態」是同義詞嗎？**

答案：不是。多模態是「能力」，指模型同時處理多種輸入；跨模態是「任務方向」，指在模態之間轉換或檢索。多模態包含跨模態，但不等於跨模態。

---

## 3. 模態編碼器 Modality Encoders 🔥

### 先懂一句話

多模態系統的第一步永遠是把每種模態「翻譯」成向量，讓後續的融合層能夠比對和結合。考試不考內部數學，但要能辨認「哪種模態用哪種編碼器」。

### Everyday Analogy

把文字、圖像、聲音各自編碼成向量，就像把英文、中文、日文各自翻成**同一本字典裡的座標**。只有都翻成統一格式，後面的融合層才能做比對。

### 先問自己一個問題

題目給的是哪一種原始資料？文字、圖像、聲音和影片進入模型前，會先走不同的前處理與編碼器。

### 技術說法

模態編碼器（Modality Encoder）負責把原始資料轉成嵌入向量（Embedding）。多模態模型不是直接把 JPEG、文字字串、聲波硬塞在一起，而是先各自轉成可計算的向量序列。

### 流程 / 選擇流程

```text
原始輸入（文字 / 圖像 / 聲音）
→ [各自的模態編碼器]  ← 這節在這裡
→ 向量（text embed / image embed / audio embed）
→ 融合層
→ 輸出
```

### 一步一步例子：聲音怎麼變成可理解的向量

```text
Step 1：原始音訊波形
Step 2：轉成 log-Mel 聲譜圖（像一張「時間 × 頻率」的圖）
Step 3：Conv / Transformer encoder 擷取音訊特徵
Step 4：輸出 audio embeddings
Step 5：交給 decoder 或融合層使用
```

```text
┌─────────┐    ┌──────────────────────┐    ┌──────────────┐
│  文字   │ →  │ Tokenizer +          │ →  │  文字向量    │
│  Text   │    │ Transformer(BERT/GPT)│    │  text embed  │
└─────────┘    └──────────────────────┘    └──────────────┘
                      (L21101)

┌─────────┐    ┌──────────────────────┐    ┌──────────────┐
│  圖像   │ →  │ CNN (ResNet)         │ →  │  圖像向量    │
│  Image  │    │ 或 ViT (16×16 patch) │    │  image embed │
└─────────┘    └──────────────────────┘    └──────────────┘
                      (L21102)

┌─────────┐    ┌──────────────────────┐    ┌──────────────┐
│  聲音   │ →  │ log-Mel 聲譜圖       │ →  │  音訊向量    │
│  Audio  │    │ → Conv + Transformer │    │  audio embed │
└─────────┘    └──────────────────────┘    └──────────────┘
              (Whisper encoder / Wav2Vec2)
```

### 比較表這樣讀

這張表的讀法是「看到輸入模態 → 反射出典型編碼器」。考試通常不考細節公式，而是考你能不能把 log-Mel 對到語音、ViT patch 對到圖像、Tokenizer 對到文字。

| 題目給的輸入 | 常見編碼器 | 輸出形式 | 考場反射 |
|---|---|---|---|
| 文字 Text | BPE + Transformer（BERT/GPT） | token 向量序列 | Tokenizer + Transformer |
| 圖像 Image | CNN（ResNet）或 ViT（16×16 patch embedding） | patch 向量序列 | CNN / ViT |
| 聲音 Audio | log-Mel 聲譜圖 + CNN/Transformer（Whisper）或 Wav2Vec2 | 音框向量序列 | log-Mel + Whisper |
| 影片 Video | 3D CNN（I3D）或 spacetime patches（Sora 用法） | 時空 token | 時間 + 空間一起建模 |

### 記憶方式

```text
文字切 token，圖像切 patch，聲音看聲譜，影片多了時間軸。
```

### Exam Rule

```text
聲音 → log-Mel 聲譜圖 → Whisper encoder → 音訊向量
圖像 → ViT → 16×16 patch token → 圖像向量
考試問「聲音編碼器」→ Whisper encoder、Wav2Vec2（不考內部數學）
考試問「圖像編碼器」→ CNN/ResNet 或 ViT（視架構而定）
```

### Quick Check

**問：Whisper 的音訊輸入在進入 Transformer 之前，會先轉換成什麼格式？**

答案：log-Mel 聲譜圖（log-Mel Spectrogram）。音訊先轉成這個頻率特徵圖，再通過卷積層和 Transformer encoder 處理。

---

## 4. 四種融合策略 Fusion Strategies 🔥🔥🔥

### 先懂一句話

融合策略決定「多個模態的資訊在哪一層合起來」。這是 L21104 的核心考點。不同情境下應選不同策略，沒有絕對最好的一種。

### Everyday Analogy

- **早期融合**：像情侶一起下廚，食材剛切好就在同一鍋裡烹調——從一開始就合體。
- **晚期融合**：像 7-11 的集點系統——文字店員記你的點、圖像店員記你的商品，結帳時兩邊系統才對帳。各走各的路，最後才合流。
- **混合融合**：像兩個廚師各自炒到一半，中途嚐一下對方的味道再調整。
- **交叉注意力**：像分組報告時你（Q）去問另一組的組員（K/V）「我這段邏輯對嗎？」——你帶著問題，對方手邊有筆記和答案。

### 先問自己一個問題

題目問的是「資料在哪一層合起來」嗎？如果是，先找合流時機：

```text
一開始合 → Early
最後投票 → Late
中間互動 → Hybrid
Q 問另一模態 → Cross-Attention
```

### 技術說法

融合策略（Fusion Strategy）決定不同模態的表示何時、如何交換資訊。早期融合在特徵層合併，晚期融合在決策層合併，混合融合在中間層多次互動，交叉注意力則用 Q/K/V 來源不同來做深層語意對齊。

### 流程 / 選擇流程

```text
各模態向量（text embed / image embed）
→ [選擇融合策略]  ← 這節在這裡
    ├── Early Fusion  → 最低層 concat
    ├── Late Fusion   → 輸出層投票 / 加權
    ├── Hybrid Fusion → 中間層門控 / 注意力
    └── Cross-Attention → Q 問對方，K/V 在對方手上
→ 聯合表示 / 任務輸出
```

### 一步一步例子：同樣是圖文分類，融合方式怎麼變

```text
Early Fusion：
文字特徵 + 圖像特徵一開始 concat → 同一模型分類

Late Fusion：
文字模型先分類，圖像模型也先分類 → 最後 logits 加權 / 投票

Hybrid Fusion：
文字與圖像各自抽特徵 → 中間層用注意力 / 門控互相修正

Cross-Attention：
文字 token 當 Q 去看圖像 K/V，或圖像 latent 當 Q 去看文字 K/V
```

#### 4.1 早期融合 Early Fusion（特徵層融合）

```text
[文字原始特徵] ┐
               ├→ concat → [單一聯合模型] → 輸出
[圖像原始特徵] ┘
```

- 做法：原始特徵直接串接（concatenate），一起送進同一個模型。
- 優點：能捕捉細粒度跨模態共變（例如影片中嘴型與語音對齊）。
- 缺點：對模態對齊極敏感；缺一模態整個垮掉。
- 適用：低層強相關、同時間軸的場景。

#### 4.2 晚期融合 Late Fusion（決策層融合）

```text
[文字] → [文字分類器] → logits_t ┐
                                  ├→ 加權 / 投票 → 最終輸出
[圖像] → [圖像分類器] → logits_i ┘
```

- 做法：各模態各自跑獨立模型，只在輸出層合流（平均、投票、加權、stacking）。
- 優點：模組化；缺模態也能降級運作（graceful degradation）。
- 缺點：無法在表徵層學會跨模態互動。
- 代表：各自訓練的分類器集成（ensemble）、多模態情感分析中分別預測再投票的系統。

> ⚠️ **CLIP 不是晚期融合的代表**：CLIP 的推論機制（雙編碼器 + 共享度量空間中做 cosine/dot product）屬於「雙編碼器對比學習（Dual Encoder Contrastive）」。晚期融合的核心是把**各模態的預測結果（logits / 類別機率）**做投票或加權；CLIP 比對的是**嵌入向量**，不是類別預測。考試若同時出現「CLIP 嵌入相似度」與「決策層投票集成」作為選項，兩者是不同答案。

#### 4.3 混合融合 Hybrid Fusion（中層融合）

```text
[文字 backbone 中層特徵] ┐
                          ├→ 注意力 / 門控結合 → 聯合模型 → 輸出
[圖像 backbone 中層特徵] ┘
```

- 做法：保留各模態獨立 backbone，在**中間層**透過注意力或門控機制結合。
- 2022 年後大多數主流多模態模型實際上都屬於 Hybrid。

#### 4.4 交叉注意力融合 Cross-Attention Fusion 🔥🔥（詳見 Section 5）

- 做法：Q 來自一個模態，K/V 來自另一個模態。
- 代表：Flamingo、Stable Diffusion（U-Net）、Whisper decoder。

#### 四種融合策略對照表

### 比較表這樣讀

這張表不是背名詞，而是做情境判斷：先看「合流時機」，再看「缺模態容忍」。如果題目提到缺少一種訊號仍要運作，優先選 Late Fusion；如果題目強調 Q/K/V 來源不同，直接選 Cross-Attention。

| 題目線索 | 策略 | 合流時機 | 代表 | 適用情境 | 缺模態容忍 |
|---|---|---|---|---|---|
| 原始特徵直接 concat | Early Fusion | 最低層（原始特徵） | 早期影音同步分類 | 低層強相關、同時間軸 | 差 |
| 各自模型，最後投票 / 加權 | Late Fusion | 輸出 / 決策層 | 分類器集成投票（ensemble） | 訊號獨立、可能缺模態 | 好 |
| 中間層多次注意力 / 門控 | Hybrid Fusion | 中間層（多階段） | 多數現代模型 | 中等耦合 | 中高 |
| Q 來自 A，K/V 來自 B | Cross-Attention | 注意力層（中間） | Flamingo、SD、Whisper | 深層語意對齊 | 中 |

### 記憶方式

```text
Early = 早早混
Late = 最後投
Hybrid = 中間互看
Cross-Attention = Q 問對方
```

### Exam Rule

```text
看到「低層特徵直接 concat 送同一模型」→ Early Fusion
看到「各自分類器，輸出層投票 / 加權（logits 合流）」→ Late Fusion
看到「缺模態也能降級運作（graceful degradation）」→ Late Fusion
看到「Q 來自一模態，K/V 來自另一模態」→ Cross-Attention Fusion
看到「哪種融合一定最好？」→ 沒有，看情境！
看到「同步音訊+嘴型」這類低層強相關場景 → Early Fusion
看到「CLIP = 晚期融合」→ 不精確！CLIP 是「雙編碼器對比學習」；晚期融合的代表是決策層投票的分類器集成
```

### Quick Check

**問：若系統部署時其中一種模態訊號可能遺失，應選哪種融合策略最穩定？**

答案：晚期融合（Late Fusion）。各模態獨立運作，缺少某模態時其他模態仍可繼續輸出，不會整個崩潰。

---

## 5. 對比學習與 CLIP 架構 🔥🔥🔥

### 先懂一句話

CLIP（Contrastive Language-Image Pre-training，OpenAI 2021）是 iPAS 中級最常被點名的多模態模型。它用「雙編碼器 + 對稱 InfoNCE 對比損失」，學會讓圖像向量和文字向量在同一個嵌入空間裡靠近，用於零樣本分類和跨模態檢索。**CLIP 不生成圖像。**

### Everyday Analogy

像蝦皮商城把「商品圖」和「商品描述」湊成正確配對。CLIP 學的是：「這張圖的描述應該是這句話，而不是批次裡其他 N-1 句」。學久了，相近意思的圖和文字在向量空間裡會靠在一起，不同的就被推遠。

### 先問自己一個問題

題目是在問「圖文對齊 / 檢索 / 零樣本分類」，還是在問「生成圖片」？前者選 CLIP，後者選 Stable Diffusion 或 DALL-E。

### 技術說法

CLIP 是雙編碼器對比學習（Dual Encoder Contrastive Learning）：Image Encoder 和 Text Encoder 各自把圖像與文字轉成向量，再用 dot product 或 cosine similarity 在共享嵌入空間（Shared Embedding Space）比較相似度。訓練時用對稱 InfoNCE 損失拉近正確圖文配對、推遠錯誤配對。

### 流程 / 選擇流程

```text
（訓練階段）
圖文配對資料（image_i, text_i）× N
→ Image Encoder（ViT 或 ResNet）→ image embed v_i
→ Text Encoder（Transformer）  → text embed t_i
→ 計算 N×N 相似度矩陣
→ 對角線正樣本拉近，非對角線負樣本推遠（InfoNCE 對稱損失）
→ 學到「共享嵌入空間 Shared Embedding Space」

（推論階段）
文字查詢 → text embed → dot product 與圖像庫比對 → 找最相近的圖
```

### 一步一步例子：CLIP 零樣本分類怎麼做

題目：「不用重新訓練模型，判斷圖片是貓、狗還是車。」

```text
Step 1：把候選類別改寫成文字提示
        "a photo of a cat"
        "a photo of a dog"
        "a photo of a car"

Step 2：圖片 → Image Encoder → image embedding

Step 3：三句文字 → Text Encoder → text embeddings

Step 4：計算 image embedding 與每個 text embedding 的相似度

Step 5：相似度最高的文字類別 = 預測答案
```

#### CLIP 架構圖

```text
         圖像  I₁, I₂, ..., I_N
  Image Encoder（ViT 或 ResNet）
         ↓
      image embeddings v₁...v_N ──┐
                                  │ [共享嵌入空間]
      text embeddings  t₁...t_N ──┘
         ↑
  Text Encoder（Transformer）
         文字  T₁, T₂, ..., T_N

N×N 相似度矩陣：
           t₁   t₂   t₃   t_N
      v₁ [ ● ][   ][   ][   ]   ← 正樣本（對角線）
      v₂ [   ][ ● ][   ][   ]
      v₃ [   ][   ][ ● ][   ]
      v_N[   ][   ][   ][ ● ]

目標：對角線變大，非對角線變小（雙向 → 對稱 InfoNCE）
```

#### CLIP 核心三件事

| 要素 | 說明 |
|---|---|
| 雙編碼器 Dual Encoder | 圖像編碼器 + 文字編碼器，各自獨立 |
| 共享嵌入空間 Shared Embedding Space | 圖文向量在同一個空間中比較 |
| 對稱 InfoNCE 損失 | 圖→文 loss + 文→圖 loss 取平均 |

### 比較表這樣讀

CLIP 的表格要抓「輸出形式」。只要輸出是向量相似度、檢索結果或零樣本分類，才是 CLIP 的主場；如果輸出是像素圖片，就不是 CLIP 直接完成。

#### CLIP 的用途

| 用途 | 說明 |
|---|---|
| 零樣本分類 Zero-shot Classification | 把候選類別寫成「a photo of a ___」，看哪個文字向量離圖像最近 |
| 跨模態檢索 Cross-modal Retrieval | 以文字找圖、以圖找文字 |
| 當文字編碼器 | Stable Diffusion 1.x 用 CLIP ViT-L/14 作為文字條件輸入（注意：2.x/SDXL/SD3 用不同編碼器） |

### 記憶方式

```text
CLIP = Compare, not Create
比相似，不生圖。
```

### Exam Rule

```text
看到「共享嵌入空間」「圖文對齊」「零樣本影像分類」「跨模態檢索」→ CLIP 🔥🔥🔥
看到「CLIP 能生圖」→ 錯！CLIP 輸出是向量，不是像素
看到「對稱 InfoNCE」「雙編碼器 + dot product」→ CLIP contrastive pretraining
看到「SD 不用 CLIP」→ 錯！SD 1.x 的文字編碼器是 CLIP ViT-L/14（⚠️ SD 2.x 換 OpenCLIP ViT-H/14；SDXL 用雙編碼器；SD 3.x/Flux 用 T5-XXL。考題不指定版本時預設 SD 1.5 = CLIP ViT-L/14，但不可假設所有版本皆是 CLIP）
看到「114/05/17 實際考題：結合影像與文字進行理解的技術」→ 選 CLIP
```

### Quick Check

**問：CLIP 訓練完成後，可以直接用來做「文字→生成圖像」這個任務嗎？**

答案：不行。CLIP 的輸出是向量（嵌入空間中的座標），不是像素。生成圖像需要 DALL-E 或 Stable Diffusion，它們可以「使用」CLIP 作為文字編碼器，但生圖本身不是 CLIP 的功能。

---

## 6. 交叉注意力 Cross-Attention 🔥🔥🔥

### 先懂一句話

交叉注意力（Cross-Attention）是 2022 年後多模態融合的主流機制：Q 來自一個模態（想問問題的一方），K/V 來自另一個模態（被查詢的一方）。這和自注意力（Self-Attention）的 Q、K、V 都來自同一序列不同。

### Everyday Analogy

大學分組報告時，你（Q）去找另一組的組員（K/V）說「幫我看這段邏輯對不對？」——你帶著**問題**（Query），對方手邊有**筆記**（Key）和**答案**（Value）。自注意力是同一組內部討論；交叉注意力是跨組對話。

### 先問自己一個問題

Q、K、V 是不是來自同一個來源？

- 都來自同一序列 → 自注意力（Self-Attention）
- Q 來自 A，K/V 來自 B → 交叉注意力（Cross-Attention）

### 技術說法

交叉注意力的公式和自注意力一樣，都是 `softmax(QKᵀ / √d) × V`。差別不是公式，而是來源：Q 代表「目前模態要問什麼」，K/V 代表「另一個模態提供什麼資訊」。

### 流程 / 選擇流程

```text
模態 A（query 端）提供 Q：「我想問什麼」
模態 B（被查詢端）提供 K/V：「我有什麼資訊」
→ Attention(Q, K, V) = softmax(QKᵀ / √d) × V
→ 輸出：A 整合了 B 的資訊後的新表示
```

### 一步一步例子：Stable Diffusion 的文字怎麼影響圖片

```text
Step 1：文字 prompt 進入文字編碼器（SD 1.x 常見為 CLIP text encoder）
Step 2：文字編碼器輸出 text embeddings
Step 3：U-Net 正在處理去雜訊中的 image latent
Step 4：image latent 產生 Q
Step 5：text embeddings 產生 K/V
Step 6：Cross-Attention 讓去雜訊過程知道「要往哪個文字描述靠近」
```

#### Self-Attention vs Cross-Attention

```text
Self-Attention（L21101 內容）：
序列 X ──┬── W_Q → Q ┐
         ├── W_K → K │ → Attention(Q,K,V)
         └── W_V → V ┘
（Q、K、V 來源相同 = 同源）

Cross-Attention（L21104 核心）：
模態 A ── W_Q → Q ─────────┐
                           │ → Attention(Q,K,V)
模態 B ── W_K → K ─┐      │
模態 B ── W_V → V ─┘──────┘
（Q 與 K/V 來源不同 = 異源）
```

| 維度 | Self-Attention | Cross-Attention |
|---|---|---|
| Q 來自 | 同一序列 | 模態 A |
| K/V 來自 | 同一序列（與 Q 相同） | 模態 B（與 Q 不同） |
| 功能 | 序列內部關係建模 | 跨模態條件對齊 |
| 記憶法 | 「自問自答」 | 「Q 問對方，K/V 在對方手上」 |

### 比較表這樣讀

不要用「輸入有幾個」判斷注意力類型，要用「Q 和 K/V 來源是否相同」判斷。

#### 三個經典交叉注意力例子

| 模型 | Q 來自 | K/V 來自 | 做什麼 |
|---|---|---|---|
| Flamingo | 凍結 LLM 的文字隱狀態 | Perceiver Resampler 壓縮後的視覺 token | 生成「看過圖的」文字 |
| Stable Diffusion | U-Net 正在去雜訊的圖像潛在 | CLIP 文字編碼器輸出 | 文字條件化圖像生成 |
| Whisper decoder | 文字解碼器當前狀態 | Whisper encoder 的音訊特徵 | 音訊條件化文字生成（ASR） |

### 記憶方式

```text
Self-Attention = 自問自答
Cross-Attention = Q 問對方，K/V 在對方手上
```

### Exam Rule

```text
看到「Q 來自一個模態，K/V 來自另一個模態」→ 交叉注意力 Cross-Attention 🔥🔥🔥
看到「Q、K、V 都來自同一序列」→ 自注意力 Self-Attention
看到「有兩個輸入就是交叉注意力」→ 錯！關鍵是 Q 與 K/V 的來源是否不同
看到「SD 文字條件怎麼注入 U-Net」→ 交叉注意力，CLIP text 作 K/V
看到「凍結 LLM + 閘控交叉注意力 + Perceiver Resampler」→ Flamingo
```

### Quick Check

**問：Stable Diffusion 在 U-Net 中注入文字條件時，Q 和 K/V 分別來自哪裡？**

答案：Q 來自 U-Net 中正在去雜訊的圖像潛在空間（image latent），K/V 來自 CLIP 文字編碼器的輸出。這就是交叉注意力的典型應用——圖像負責「問問題」，文字負責「提供條件」。

---

## 7. 主要架構導覽 Named Architectures 🔥🔥

### 先懂一句話

考試會點名問「這個任務選哪個架構？」記住每個架構的**融合策略 + 訓練目標 + 代表用途**三件事就夠了。

### Everyday Analogy

這些架構就像不同廚師的拿手菜：CLIP 擅長「配對」，DALL-E／SD 擅長「作畫」，Flamingo／LLaVA 擅長「看圖說故事」，Whisper 擅長「聽寫」，GPT-4o 是「樣樣通的全才主廚」。

### 先問自己一個問題

題目要的輸出是什麼？

```text
找相似圖文 → CLIP
生成圖片 → Stable Diffusion / DALL-E
看圖回答 → Flamingo / LLaVA / GPT-4V
語音轉文字 → Whisper
端到端文字 + 圖 + 音 + 影對話 → GPT-4o / Gemini
```

### 技術說法

視覺語言模型（Vision-Language Model, VLM）把圖像表示接到語言模型上，讓模型能「看圖後用文字回答」。不同 VLM 的差異常在融合方式：Flamingo 用 Gated Cross-Attention，LLaVA 用 MLP 投影 + prefix 拼接，GPT-4V 是後接式視覺能力，GPT-4o / Gemini 則以原生多模態作為考試關鍵字。

### 流程 / 選擇流程

```text
確認任務類型（對齊？生成圖？VQA？ASR？）
→ 對應到適合的架構
→ 選答案
```

### 一步一步例子：VLM 看圖回答怎麼走

```text
Step 1：使用者輸入圖片 + 問題文字
Step 2：圖片 → Vision Encoder → visual tokens
Step 3：問題文字 → Tokenizer / LLM text tokens
Step 4：用投影、prefix 或 cross-attention 把 visual tokens 接到 LLM
Step 5：LLM 生成文字答案
```

### 一步一步例子：音訊 / 影片工作流怎麼拆

```text
語音轉文字（Whisper）：
音訊 → log-Mel 聲譜圖 → encoder → decoder cross-attention → 文字轉錄

影片理解：
影片 frame / spacetime patches → video encoder → 與文字問題融合 → 文字答案 / 分類
```

#### 架構快速對照表

### 比較表這樣讀

先看「代表用途」，再看「融合策略」。如果題目只描述任務，先用用途選模型；如果題目描述 Q/K/V、MLP 投影、Perceiver Resampler，再用融合策略選模型。

| 架構 | 年份 | 融合 / 連接方式 | 訓練目標 | 代表用途 | 考試熱點 |
|---|---|---|---|---|---|
| CLIP | 2021 | 雙編碼器對比學習 | 對稱 InfoNCE 對比損失 | 零樣本分類、圖文檢索 | 🔥🔥🔥 |
| DALL-E 2 | 2022 | 交叉注意力 | CLIP prior + Diffusion decoder | 文字→圖像生成 | 🔥🔥 |
| DALL-E 3 | 2023 | 交叉注意力 | Latent Diffusion + T5 conditioning + **合成重新描述（Synthetic Recaptioning，GPT-4V 生成高品質訓練描述）** | 高文字對齊度文字→圖像生成 | 🔥🔥 |
| Stable Diffusion | 2022 | 交叉注意力（U-Net Q，CLIP text K/V） | Latent Diffusion MSE | 開源文字→圖像 | 🔥🔥 |
| Flamingo | 2022 | Gated Cross-Attention + Perceiver Resampler | 下一個 token 交叉熵 | 少樣本 VQA、看圖說故事 | 🔥🔥 |
| Whisper | 2022 | 交叉注意力（encoder-decoder） | seq2seq 交叉熵 | ASR 語音→文字 | 🔥🔥 |
| LLaVA | 2023 | MLP 投影 Prefix（LLaVA 1.5+；原版 1.0 用線性投影；非交叉注意力） | 指令微調交叉熵 | 開源 VQA 助理 | 🔥 |
| GPT-4V | 2023 | 後接式（視覺貼在文字模型上） | — | 多模態對話（視覺+文字） | 🔥 |
| GPT-4o | 2024 | 原生多模態（端到端多模態訓練；具體內部架構未公開） | — | 端到端文字+圖+音+影 | 🔥🔥 |
| Gemini | 2023– | 預訓練即多模態 | — | 原生多模態對話 | 🔥🔥 |
| Qwen-VL | 2023– | ViT + 交叉注意力 adapter + LLM | — | 繁中 OCR / 中文 VQA | 🔥 |

### 記憶方式

```text
檢：CLIP 做檢索 / 對齊
生：DALL-E / Stable Diffusion 做生圖
理：Flamingo / LLaVA / GPT-4V 做圖文理解
聽：Whisper 做聽寫
原：GPT-4o / Gemini 是原生多模態
```

#### Flamingo 特別記憶點

- **Perceiver Resampler**：把不定長視覺特徵壓成 64 個固定 token
- **Gated Cross-Attention**：閘門初始值為 0，保留預訓練 LLM 行為不被破壞
- **凍結 vision encoder 與 LLM**：只訓練交叉注意力層

#### 原生多模態 vs 後接式多模態

| 維度 | 原生多模態 Native | 後接式 Bolt-on |
|---|---|---|
| 代表 | GPT-4o、Gemini | GPT-4V、LLaVA |
| 訓練時機 | 預訓練階段就含多模態資料 | 先訓練單模態，再「貼」上別的模態 |
| Token 空間 | OpenAI 公開聲明為原生端到端；具體 token 架構未公開確認 | 各模態 token 經投影 / 交叉注意力進入 LLM |
| 延遲 | sub-second 端到端 | 通常較慢 |
| 情緒語氣保真 | 高 | 低（轉文字時中途流失） |

### Exam Rule

```text
看到「VQA」「視覺問答」→ Flamingo / LLaVA / GPT-4V
看到「語音→文字」「ASR」「多語言語音辨識」→ Whisper
看到「文字→圖像」「text-to-image」→ Stable Diffusion / DALL-E
看到「原生多模態」「端到端多模態訓練」「sub-second 語音」→ GPT-4o 或 Gemini（「統一 token 空間」是推論非確認，但若題目選項如此描述 GPT-4o 仍應選）
看到「LLaVA 用交叉注意力」→ 錯！LLaVA 用 MLP 投影 + prefix 拼接（1.5+ 為 2 層 MLP；1.0 原版才是線性投影）
看到「凍結 LLM + Gated Cross-Attention + Perceiver Resampler」→ Flamingo
看到「繁中 OCR」「中文 VQA」→ Qwen-VL
```

### Quick Check

**問：GPT-4V 和 GPT-4o 最核心的架構差異是什麼？**

答案：GPT-4V 是「後接式」——先有文字模型，再貼上視覺能力，各模態 token 空間分開；GPT-4o 是「原生多模態」——OpenAI 描述為從預訓練就端到端處理文字、圖像、音訊，支援 sub-second 語音對話、無獨立語音管線。（具體內部 token 架構未公開，考試以「原生多模態 / 端到端多模態」為準）

---

## 8. Exam Decision Trees — 考場快速決策

### 樹 1：看到任務類型，選架構

```text
題目描述一個任務類型？
│
├─ 文字 ↔ 圖像  對齊 / 檢索 / 零樣本分類？
│   └─ → CLIP（共享嵌入空間 + dot product）
│
├─ 文字 → 圖像  生成圖片？
│   ├─ 開源？ → Stable Diffusion（交叉注意力，CLIP text 作 K/V）
│   ├─ OpenAI，CLIP prior？ → DALL-E 2
│   └─ OpenAI，合成重新描述 / 高文字對齊？ → DALL-E 3（Synthetic Recaptioning，非 CLIP alignment loss）
│
├─ 圖像 + 文字 → 文字  VQA / 看圖說故事？
│   ├─ 凍結 LLM + Gated Cross-Attention？ → Flamingo
│   ├─ MLP 投影 + prefix + 開源？ → LLaVA（1.5+ 為 2 層 MLP；原版 1.0 才是線性投影）
│   ├─ OpenAI 商業產品？ → GPT-4V（後接式）
│   └─ 中文 OCR？ → Qwen-VL
│
├─ 語音 → 文字  ASR？
│   └─ → Whisper（log-Mel → encoder-decoder + 交叉注意力）
│
└─ 文字 + 圖 + 音 + 影  端到端原生多模態對話？
    ├─ OpenAI？ → GPT-4o（原生多模態，端到端多模態訓練）
    └─ Google？ → Gemini（預訓練即多模態）
```

### 樹 2：看到「融合策略」描述，選名稱

```text
題目描述如何合流？
│
├─ 原始特徵直接串接（concat）→ 同一個模型？
│   └─ → 早期融合 Early Fusion
│
├─ 各模態各自分類器，輸出層 logits 加權 / 投票？
│   └─ → 晚期融合 Late Fusion
│       （分類器集成 ensemble；注意：CLIP 是雙編碼器對比學習，不是此類）
│
├─ 中間層門控 / 注意力？
│   └─ → 混合融合 Hybrid Fusion
│
└─ Q 來自一個模態，K/V 來自另一個模態？
    └─ → 交叉注意力融合 Cross-Attention Fusion
        （Flamingo / SD / Whisper）
```

### 樹 3：區分「CLIP 做什麼 vs SD 做什麼」

```text
題目問到 CLIP 和 Stable Diffusion？
│
├─ 輸出是向量？ 做對齊 / 檢索？
│   └─ → CLIP
│
├─ 輸出是像素？ 生成圖像？
│   └─ → Stable Diffusion（但文字編碼器用的是 CLIP！）
│
└─ SD 怎麼注入文字條件？
    └─ → 交叉注意力（U-Net Q，CLIP text K/V）
```

### 樹 4：區分「注意力機制」

```text
題目問注意力機制？
│
├─ Q / K / V 來自同一序列？
│   └─ → 自注意力 Self-Attention
│
└─ Q 來自模態 A，K / V 來自模態 B？
    └─ → 交叉注意力 Cross-Attention
        （不看輸入數量，看來源！）
```

---

## 9. Trap Clinic — 考場陷阱診所

### Trap 1：ChatGPT 一定是多模態

錯。GPT-3.5 是純文字模型；只有 GPT-4V（2023，視覺）和 GPT-4o（2024，文字+圖+音+影）才是多模態。考題一定要看**版本**，不能用「ChatGPT 很強」來推論它是多模態。

Exam fix：

```text
「ChatGPT」「GPT-3.5」→ 純文字，非多模態
「GPT-4V」→ 後接式多模態（文字 + 圖像）
「GPT-4o」→ 原生多模態（文字 + 圖 + 音 + 影）
```

---

### Trap 2：CLIP 可以生成圖像

錯。CLIP 的輸出是向量（在嵌入空間的座標），不是像素。生圖是 DALL-E 或 Stable Diffusion 的工作。SD 只是**使用** CLIP 的文字編碼器作為條件輸入，這是合作關係，不是 CLIP 在生圖。

Exam fix：

```text
「CLIP 生圖」→ 錯
「CLIP 做對齊 / 零樣本分類 / 跨模態檢索」→ 對
「SD 的文字編碼器是 CLIP」→ 對
```

---

### Trap 3：多模態 = 跨模態（同義詞）

錯。多模態（Multimodal）是**能力**，指能同時處理多種模態；跨模態（Cross-modal）是**任務方向**，指在模態之間轉換或檢索。包含關係：多模態 ⊇ 跨模態。

Exam fix：

```text
「多模態」→ 能力（同時處理多種）
「跨模態」→ 任務方向（模態間轉換 / 檢索）
「跨模態是多模態的子集」→ 對
```

---

### Trap 4：「有兩個輸入」就是交叉注意力

錯。判斷關鍵是 **Q 與 K/V 的來源是否不同**，不是看輸入數量。只要 Q、K、V 都來自同一序列，就算有兩個輸入也是自注意力（或 encoder-decoder 裡各自的自注意力）。

Exam fix：

```text
「Q、K、V 來自同一序列」→ 自注意力（Self-Attention）
「Q 來自模態 A，K/V 來自模態 B」→ 交叉注意力（Cross-Attention）
```

---

### Trap 5：早期融合一定比晚期融合好

錯。沒有絕對最好的融合策略，要看情境：
- 訊號獨立、可能缺模態 → Late Fusion 更穩
- 低層強相關、同步時間軸 → Early Fusion 較好
- 深層語意對齊 → Cross-Attention 最佳

Exam fix：

```text
「哪種融合策略最好？」→ 看情境，沒有絕對答案
「缺模態也能運作」→ Late Fusion
「低層嘴型與語音對齊」→ Early Fusion
```

---

### Trap 6：Stable Diffusion 不用 CLIP

錯。SD **1.x** 的文字編碼器是 **CLIP ViT-L/14**，透過**交叉注意力**注入 U-Net 的多個解析度層。CLIP 與 SD 是合作關係，不是對立。

⚠️ 注意：SD 文字編碼器因版本不同：1.x 用 CLIP ViT-L/14；2.x 用 OpenCLIP ViT-H/14；SDXL 用雙編碼器（CLIP ViT-L/14 + OpenCLIP ViT-bigG）；SD 3.x/Flux 用 T5-XXL。考試以題目指定版本為準，不可假設所有版本皆是 CLIP ViT-L/14。

Exam fix：

```text
「SD 1.x 的文字條件」→ 來自 CLIP ViT-L/14 文字編碼器（K/V）
「SD 怎麼注入文字」→ 交叉注意力（U-Net Q，text encoder K/V）
「SD 2.x 文字編碼器」→ OpenCLIP ViT-H/14（不是 CLIP ViT-L/14）
「SDXL 文字編碼器」→ 雙編碼器（CLIP ViT-L/14 + OpenCLIP ViT-bigG）
```

---

### Trap 7：LLaVA 用交叉注意力

錯。LLaVA 用的是**MLP 投影 + 拼接（prefix pattern）**——CLIP ViT 視覺特徵經投影層，直接當作 prompt 前綴塞進 LLM 解碼器。這是刻意保持簡單的設計，不用交叉注意力。

注意：LLaVA 1.0（原版）用單層**線性投影**；**LLaVA 1.5+ 改為 2 層 MLP**，效果更好。現今引用 LLaVA 通常指 1.5 以上版本，應以 MLP 投影為答案。

Exam fix：

```text
「LLaVA 的融合方式」→ MLP 投影 + prefix 拼接（非交叉注意力）
「LLaVA 1.0 原版」→ 線性投影（單層）
「LLaVA 1.5+（主流版本）」→ 2 層 MLP 投影
「Flamingo 的融合方式」→ Gated Cross-Attention（才是交叉注意力）
```

---

### Trap 8：Whisper 是多模態聊天機器人

錯。Whisper 是 **ASR（語音轉文字）模型**，做轉錄、翻譯、語言辨識、語音活動偵測（VAD）四件事。不是對話模型，不能回答問題。對話型多模態要選 GPT-4o 或 Gemini。

Exam fix：

```text
「語音辨識 ASR」「語音轉文字」→ Whisper
「多模態對話 / 問答助理」→ GPT-4o / Gemini（非 Whisper）
```

---

### Trap 9：GPT-4o 只是 GPT-4 加了語音功能

錯。GPT-4o 是**原生多模態（Native Multimodal）**——OpenAI 公開描述其為從預訓練階段就原生端到端處理文字、圖像、音訊，不需要獨立語音管線。GPT-4V 是後接式，只是把視覺貼在文字模型上。GPT-4o 能做 sub-second 端到端語音，情緒和語氣保真度更高。

⚠️ 注意：「統一 token 空間」是技術合理推論，但 OpenAI 尚未公開完整架構確認這一點。考試以 OpenAI 公開聲明為準：**原生多模態 / 無獨立語音管線 / 端到端多模態訓練**。不要把「統一 token 空間」當作確認的架構事實。

Exam fix：

```text
「後接式多模態」「視覺貼在文字模型上」→ GPT-4V
「原生多模態」「端到端多模態訓練」「sub-second 語音」→ GPT-4o
「統一 token 空間（unified token space）」→ GPT-4o 的合理推論，但非 OpenAI 官方確認用語
```

---

### Trap 10：所有多模態模型都用 Transformer

錯。現在主流確實是 Transformer 為主（CLIP、Flamingo、Whisper、GPT-4o），但**早期多模態**常用 CNN + RNN、CNN + LSTM。Transformer 是**目前主導**，不是**唯一定義**。

Exam fix：

```text
「現代主流多模態」→ Transformer 為主，但非唯一
「早期多模態」→ CNN + RNN / CNN + LSTM 也算
```

---

## 10. Practice Questions — 練習題

### 10.1 基本概念與模態定義

**Q1.** 下列哪一個描述最能區分「多模態（Multimodal）」與「跨模態（Cross-modal）」？

A. 兩者是同義詞，都指同時處理多種模態  
B. 多模態是能力（處理多種模態），跨模態是任務方向（模態間轉換/檢索）  
C. 跨模態比多模態更廣泛，多模態是跨模態的子集  
D. 多模態只指文字與圖像的組合，跨模態包含聲音  

答案：B  
理由：多模態（能力）⊇ 跨模態（任務），跨模態是多模態的子任務，選項 B 正確描述兩者的關係。

---

**Q2.** 下列哪一個模型是「單模態（Unimodal）」？

A. GPT-4o  
B. CLIP  
C. BERT（標準版，純文字預訓練）  
D. Flamingo  

答案：C  
理由：標準 BERT 只處理文字，是單模態模型；其他三個都整合了圖像或多種模態。

---

**Q3.** iPAS 考題中看到「跨模態檢索（Cross-modal Retrieval）」這個詞，應該優先聯想到哪個架構？

答案：CLIP  
理由：CLIP 使用共享嵌入空間（Shared Embedding Space）+ dot product，是圖文跨模態檢索的代表架構。

---

### 10.2 融合策略

**Q4.** 某醫療 AI 系統同時接收「X 光影像」和「臨床病歷文字」，兩個資料來源的特徵會在最底層直接串接（concatenate），然後送進同一個模型。這是哪種融合策略？

A. 晚期融合 Late Fusion  
B. 早期融合 Early Fusion  
C. 交叉注意力融合 Cross-Attention Fusion  
D. 混合融合 Hybrid Fusion  

答案：B  
理由：「低層特徵直接 concat 送同一模型」是早期融合的定義。

---

**Q5.** 某系統針對文字和圖像各自訓練了獨立分類器，只在輸出層用加權平均決定最終分類。這是哪種融合策略？該策略對「可能缺少某一模態」的場景有什麼優勢？

答案：晚期融合 Late Fusion。優勢是各模態獨立運作，缺少某一模態時其他模態分類器仍能輸出（graceful degradation），系統不會崩潰。

---

**Q6.** CLIP 在「推論階段」的架構特徵最貼近哪個描述？

A. 早期融合（原始特徵 concat 後送同一模型）  
B. 晚期融合（各自分類器，輸出層 logits 投票/加權）  
C. 雙編碼器對比學習（各自編碼後在共享度量空間比對嵌入向量）  
D. 交叉注意力融合（Q 問對方，K/V 來自另一模態）  

答案：C  
理由：CLIP 圖像和文字各自獨立編碼，最後在**共享嵌入空間**做 dot product 比對向量相似度，而非比較分類器輸出的 logits/類別機率。晚期融合（Late Fusion）的核心是決策層投票，代表是多分類器集成；CLIP 比對的是嵌入向量，屬於「雙編碼器對比學習（Dual Encoder Contrastive）」。

---

**Q7.** 交叉注意力（Cross-Attention）和自注意力（Self-Attention）最根本的差異是什麼？

答案：自注意力的 Q、K、V 都來自同一序列（同源）；交叉注意力的 Q 來自模態 A，K/V 來自模態 B（異源）。判斷關鍵是來源，不是輸入數量。

---

### 10.3 CLIP 與對比學習

**Q8.** CLIP 的訓練目標是什麼？

A. 給定圖像生成對應的文字描述  
B. 讓配對的圖文向量靠近、非配對的推遠（對稱 InfoNCE 對比損失）  
C. 給定文字描述生成對應的圖像  
D. 對每張圖像做多類別分類  

答案：B  
理由：CLIP 使用雙編碼器 + 對稱 InfoNCE 對比損失，訓練目標是讓圖文配對的向量靠近、非配對的推遠，最終學到共享嵌入空間。

---

**Q9.** 下列關於 CLIP 的敘述，哪一個是錯誤的？

A. CLIP 可以做零樣本影像分類  
B. CLIP 的圖像和文字向量位於同一個嵌入空間  
C. CLIP 能根據文字描述生成對應的圖像  
D. Stable Diffusion 使用 CLIP 的文字編碼器  

答案：C  
理由：CLIP 只做對齊與檢索，輸出是向量不是像素。生圖是 DALL-E 或 Stable Diffusion 的工作。

---

**Q10.** 在一個 N=4 的批次中，CLIP 的 N×N 相似度矩陣共有幾個正樣本（正確配對）？

答案：4 個（對角線元素）。每一個圖文配對 (image_i, text_i) 構成一個正樣本，共 N 個。其餘 N²-N = 12 個都是負樣本。

---

### 10.4 架構辨識

**Q11.** 下列哪個架構使用了「Perceiver Resampler + Gated Cross-Attention + 凍結 LLM」的設計？

A. CLIP  
B. Whisper  
C. Flamingo  
D. LLaVA  

答案：C  
理由：Flamingo 的標誌設計是 Perceiver Resampler（壓縮視覺 token 到 64 個）+ Gated Cross-Attention（閘門初始值為 0）+ 凍結 LLM，是三者兼備的唯一架構。

---

**Q12.** 某工程師要建立一個「語音轉文字（ASR）」系統，支援多語言語音辨識，輸入為 log-Mel 聲譜圖。應選用哪個架構？

答案：Whisper。Whisper 以 log-Mel 聲譜圖為輸入，使用 encoder-decoder + 交叉注意力，支援 ASR、翻譯、語言辨識等任務，680k 小時多語言資料訓練，是此場景的標準選擇。

---

**Q13.** LLaVA 和 Flamingo 同樣是視覺語言模型（VQA），但融合方式不同。請說明差異。

答案：LLaVA 使用 **MLP 投影 + prefix 拼接**（LLaVA 1.5+ 用 2 層 MLP；原版 1.0 用單層線性投影；視覺 token 直接當作 prompt 前綴塞進 LLM）；Flamingo 使用 **Gated Cross-Attention**（Q 來自凍結 LLM 的文字狀態，K/V 來自 Perceiver Resampler 的視覺 token）。LLaVA 不用交叉注意力，Flamingo 才是交叉注意力的代表。

---

**Q14.** 下列哪個模型是「原生多模態（Native Multimodal）」，OpenAI 公開聲明其從預訓練階段就端到端處理文字、圖像、音訊，無需獨立語音管線？

A. GPT-4V  
B. LLaVA  
C. GPT-4o  
D. CLIP  

答案：C  
理由：GPT-4o 是 OpenAI 公開聲明的原生多模態（Native Multimodal），端到端訓練同時處理文字、圖像、音訊，支援 sub-second 端到端語音。GPT-4V 是後接式，LLaVA 是 bolt-on，CLIP 是對齊模型。（具體內部架構未公開，但「原生多模態 / 端到端多模態訓練」是正確考試用語）

---

### 10.5 任務與架構配對

**Q15.** 以下任務各應選用哪個架構？請配對：

(a) 用文字查詢找最相關的圖片（跨模態圖文檢索）  
(b) 根據文字描述生成一張圖片  
(c) 讓 AI 聽一段語音並轉成文字  
(d) 問 AI「這張圖片裡有什麼？」（VQA）  

答案：  
(a) → CLIP（共享嵌入空間 + dot product）  
(b) → Stable Diffusion 或 DALL-E  
(c) → Whisper  
(d) → Flamingo / LLaVA / GPT-4V（任一皆可）  

---

**Q16.** 某企業要在台灣部署一個能辨識繁體中文文件圖像並回答問題的 VQA 系統。除了 GPT-4V，還有哪個開源架構特別適合？

答案：Qwen-VL（或 Qwen2-VL）。Alibaba 出品，ViT + 交叉注意力 adapter + Qwen LLM，繁體中文 OCR 與中文 VQA 表現強，適合台灣部署場景。

---

### 10.6 評估指標與原理

**Q17.** 「跨模態檢索（Cross-modal Retrieval）」任務常用哪個評估指標？其意義是什麼？

答案：Recall@K（R@1、R@5、R@10）。意義是：查詢一次，前 K 個結果裡是否包含正確答案。K 越大越寬鬆，R@1 最嚴格。

---

**Q18.** ASR（語音辨識）任務最常用哪個評估指標？越低越好還是越高越好？

答案：WER（Word Error Rate，字錯率）。WER 越低表示錯誤越少，越低越好。

---

**Q19.** Image Captioning（圖像描述生成）常用的評估指標是？

答案：BLEU、CIDEr、METEOR。這些都是與人工撰寫的參考描述（reference caption）比對 n-gram 重疊或共識的指標。考試只考「哪個任務用哪個指標」，不考公式。

---

### 10.7 綜合與陷阱

**Q20.** 「因為 GPT 很強、ChatGPT 很流行，所以 GPT 系列都是多模態。」這個說法正確嗎？

答案：不正確。GPT-3.5 是純文字模型；只有 GPT-4V（2023，視覺）和 GPT-4o（2024，原生多模態）才具備多模態能力。必須看**版本**，不能用流行度推論。

---

**Q21.** 某題描述：「一個模型能同時接收文字、圖像、音訊，並在同一個 token 空間中端到端處理，語音延遲小於 1 秒。」應選哪個架構？

答案：GPT-4o。「原生多模態」「端到端多模態訓練」「sub-second 語音延遲」都是 GPT-4o 的標誌特徵。（「統一 token 空間」是常見描述，若題目選項如此寫仍選 GPT-4o，但更精確的官方用語是「原生端到端多模態」）

---

**Q22.** Stable Diffusion 在 U-Net 中使用交叉注意力時，Q 和 K/V 分別來自哪裡？文字條件是怎麼進來的？

答案：Q 來自 U-Net 正在去雜訊的**圖像潛在空間**（image latent）；K/V 來自**文字編碼器**的輸出（SD 1.x 用 CLIP ViT-L/14；SD 2.x 用 OpenCLIP ViT-H/14；版本不同編碼器不同）。文字透過這個交叉注意力機制「告訴」圖像的去雜訊過程「應該生成什麼樣子的圖」。

---

**Q23.** 下列哪個說法關於「交叉注意力（Cross-Attention）」是正確的？

A. Q 和 K/V 必須來自同一個模態  
B. 交叉注意力的計算公式與自注意力完全不同  
C. Q 來自模態 A，K/V 來自模態 B，計算公式相同但來源不同  
D. 交叉注意力只能在 decoder 中使用  

答案：C  
理由：交叉注意力的計算公式 softmax(QKᵀ/√d)V 與自注意力相同，差異只在 Q 與 K/V 的來源不同（異源）。

---

**Q24.** 下列四種融合策略中，哪種在「缺少某一模態訊號」時系統仍能正常降級運作（graceful degradation）？

A. 早期融合 Early Fusion  
B. 交叉注意力融合 Cross-Attention Fusion  
C. 晚期融合 Late Fusion  
D. 混合融合 Hybrid Fusion  

答案：C  
理由：Late Fusion 各模態各自有獨立模型，缺少某模態時其他模態仍可輸出並加權合流，不會整個崩潰。Early Fusion 缺模態會直接垮掉，Cross-Attention 缺 K/V 端模態需要特殊 fallback 設計。

---

**Q25.** 某系統想進行「零樣本影像分類（Zero-shot Image Classification）」，不需要針對新類別重新收集標注資料。應使用哪個架構，原理是什麼？

答案：CLIP。原理是把新類別名稱寫成「a photo of a ___」，透過 CLIP 的文字編碼器轉成文字向量，再與圖像向量做 dot product，看哪個類別的文字向量最近，即為分類結果。不需要任何新標注資料，只要類別名稱即可。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一遍：

1. 多模態是**能力**（同時處理多種），跨模態是**任務方向**（模態間轉換/檢索），多模態包含跨模態，兩者不等價。

2. 四種融合策略：**早期**（原始特徵 concat）、**晚期**（輸出層 logits 加權/投票，代表是分類器集成）、**混合**（中間層門控）、**交叉注意力**（Q 問對方，K/V 在對方手上）。CLIP 是**雙編碼器對比學習**，不是晚期融合的代表。

3. CLIP 三件事：**雙編碼器**（圖+文）+ **對稱 InfoNCE** + **共享嵌入空間**；用途是**零樣本分類和跨模態檢索**；**不生成圖像**。

4. 交叉注意力關鍵：**Q 與 K/V 異源**——Q 來自模態 A，K/V 來自模態 B；代表是 Flamingo（LLM 文字問視覺）、Stable Diffusion（圖像潛在問 CLIP 文字）、Whisper decoder（文字問音訊）。

5. 架構記法「**檢生理原**」：CLIP 做**檢**索對齊、DALL-E/SD 做**生**圖、LLaVA/GPT-4V 做圖文**理**解、GPT-4o/Gemini 是**原**生多模態端到端。

6. LLaVA **不用交叉注意力**，用的是 MLP 投影 + prefix 拼接（LLaVA 1.5+ 為 2 層 MLP；1.0 原版才是線性投影）；Flamingo 才是 Gated Cross-Attention 的代表。

7. GPT-4V 是後接式（視覺貼在文字上）；GPT-4o 是**原生多模態**（端到端多模態訓練，sub-second 語音；具體架構未公開）；Whisper 只做 ASR，不是對話機器人。

---

## Final Study Advice

不要只背架構名稱。考試真正想測的是：**看到題目的情境描述，能不能判斷出這是哪種融合策略、哪個架構、哪個概念在做這件事**。

做題時先問自己：「題目在描述的是輸入輸出模態？還是融合方式？還是訓練目標？」然後用 Section 8 的決策樹定位，再用 Section 9 排除陷阱。每一題都這樣走一遍，準確率會大幅提升。

最後，三個核心主軸確保你不會落空：**四種融合策略的情境判斷 → CLIP 的訓練配方與非生成本質 → 交叉注意力的 Q/K/V 異源原則與代表模型**。

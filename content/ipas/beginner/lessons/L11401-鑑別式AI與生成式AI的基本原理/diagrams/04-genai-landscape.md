# 圖解 04 — 生成式AI 模型全景圖

> 初級考點：能依輸出類型辨認對應的生成式AI工具和模型類型。不考各模型的內部架構細節。

## 生成式AI 輸出類型全景

```
                        生成式AI（Generative AI）
                        ────────────────────────
                                   │
      ┌──────────┬─────────────────┼─────────────────┬──────────┐
      │          │                 │                 │          │
      ▼          ▼                 ▼                 ▼          ▼
  文字生成    圖像生成           程式碼生成         音樂/語音    影片生成
  Text       Image              Code              Audio       Video
      │          │                 │                 │          │
  ChatGPT    DALL-E          GitHub Copilot       Suno        Sora
  Claude     Midjourney      Cursor               ElevenLabs  Runway
  Gemini     Stable Diffusion Codex               Udio        Gen-3
```

## 核心模型類型分類

```
生成式AI 核心模型類型
├── GAN（Generative Adversarial Network，生成對抗網路）
│   ├── 機制：生成器 vs 鑑別器對抗
│   ├── 強項：圖像生成、資料擴增
│   └── 代表：DeepFake、StyleGAN
│
├── VAE（Variational Autoencoder，變分自動編碼器）
│   ├── 機制：編碼到潛在空間後解碼生成
│   ├── 強項：圖像生成、異常偵測
│   └── ⚠️ 陷阱：名字有 Encoder 但它是生成式
│
├── Diffusion Model（擴散模型）
│   ├── 機制：逐步去雜訊（Denoising）
│   ├── 強項：高品質圖像生成
│   └── 代表：Stable Diffusion、DALL-E 3
│
└── LLM — Decoder-only（大型語言模型生成類）
    ├── 機制：自迴歸，逐字預測下一個 token
    ├── 強項：文字生成、對話、程式碼
    └── 代表：GPT 系列（ChatGPT、GPT-4o）
```

## 基礎模型（Foundation Model）與下游任務

```
                  大規模預訓練（Pre-training）
                  海量資料 + 大算力
                         │
                         ▼
              ┌──────────────────────┐
              │   基礎模型            │
              │   Foundation Model   │
              │   （通用能力）        │
              └──────────────────────┘
                    │           │
         ┌──────────┘           └──────────┐
         ▼                                  ▼
  微調（Fine-tuning）              提示工程（Prompt Engineering）
  用少量標記資料繼續訓練            設計輸入指令引導輸出
  改變模型參數                     不改模型參數
  高成本、高效果                   低成本、快速試驗
         │                                  │
         ▼                                  ▼
  醫療診斷、法律分析              客服機器人、日常問答
  特定領域高準確度任務            通用任務快速應用
```

## 多模態AI（Multimodal AI）

```
                    多模態AI（Multimodal AI）
                           │
          ┌────────────────┼───────────────┐
          │                │               │
          ▼                ▼               ▼
       文字                圖像            音頻
       Text               Image           Audio
                           │
                    → 同時輸入/輸出多種媒體類型

  代表模型：
    GPT-4o（文字 + 圖像 + 語音）
    Gemini Ultra（文字 + 圖像 + 影片）
    Claude 3.5（文字 + 圖像）
```

## ⚠️ 初級不考的中級內容

```
初級 ✓ 需知道：
  - 各模型屬於生成式還是鑑別式
  - 各模型的典型應用和工具名稱
  - 基礎模型、微調、提示工程的概念區別

中級 才考：
  - GAN / VAE / Diffusion 的架構原理和數學
  - Transformer 的 self-attention 機制
  - 各模態生成的算法家族比較
  - 微調技術細節（LoRA 等）
```

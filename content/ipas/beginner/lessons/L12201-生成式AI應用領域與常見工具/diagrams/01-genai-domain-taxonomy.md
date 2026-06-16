# Diagram 01 · GenAI 應用領域分類樹

```
GenAI（Generative AI，生成式人工智慧）
│
├── 📝 文字生成（Text Generation）
│   ├── ChatGPT             — OpenAI，對話介面，月費制，終端使用者
│   ├── OpenAI API          — OpenAI，開發者介面，按 Token 計費
│   ├── Gemini              — Google，多模態，Google 生態系整合
│   ├── Claude              — Anthropic，安全性著稱，長文本處理
│   ├── LLaMA               — Meta，🟢 開源，可本地部署
│   ├── Microsoft Copilot   — Microsoft，整合 Office 365 應用
│   └── TAIDE               — 台灣國科會，繁體中文優化，🇹🇼 本土
│
├── 🎨 圖像生成（Image Generation）
│   ├── Midjourney          — Midjourney，🔴 閉源付費，照片級品質
│   ├── DALL-E 3            — OpenAI，整合於 ChatGPT / API
│   ├── Stable Diffusion    — Stability AI，🟢 開源，可本地部署
│   └── Adobe Firefly       — Adobe，整合 Creative Cloud 生態
│
├── 🔊 聲音生成（Audio Generation）
│   ├── [TTS 文字轉語音]
│   │   └── ElevenLabs      — 語音合成領導品牌，情感控制
│   ├── [STT 語音轉文字] ⚠️ 方向相反
│   │   └── Whisper         — OpenAI，STT（非TTS），語音辨識
│   └── [AI 音樂生成]
│       └── Suno             — AI 音樂創作，文字描述→完整歌曲
│
├── 💻 程式碼輔助（Code Assistance）
│   ├── GitHub Copilot      — Microsoft/GitHub，IDE 擴充套件
│   ├── VS Code for Copilot — GitHub Copilot 在 VS Code 的整合介面
│   ├── Copilot Studio      — Microsoft 365，低程式碼 Agent 平台 ⚠️
│   ├── Cursor              — 獨立 AI IDE（VS Code fork），Vibe Coding
│   └── Amazon Q Developer  — AWS，原名 Amazon CodeWhisperer ⚠️ 更名
│
├── 🎬 影片生成（Video Generation）
│   ├── Sora                — OpenAI，文生影片（已關閉，歷史辨識）
│   ├── Runway              — 影片生成/編輯
│   └── Pika                — 短影片生成
│
└── 🌐 多模態AI（Multimodal AI）
    ├── GPT-4o              — OpenAI，文字+圖像+語音整合
    └── Gemini Ultra        — Google，文字+圖像+影片理解強項

────────────────────────────────────────────────
圖例
🟢 = 開源（Open Source）可免費下載本地部署
🔴 = 閉源（Proprietary）付費使用
🇹🇼 = 台灣本土
⚠️  = 考試常見混淆點
────────────────────────────────────────────────
```

## 背誦重點

| 需要記住的組合 | 說明 |
|---|---|
| LLaMA = Meta 開源 LLM | 唯一主流開源文字 LLM，可本地跑 |
| Stable Diffusion = 開源圖像 | 開源免費，對比 Midjourney 閉源付費 |
| Whisper = STT（不是 TTS） | 語音「辨識」不是語音「合成」|
| Amazon Q Developer = 舊 CodeWhisperer | 2024 年更名 |
| Copilot Studio ≠ GitHub Copilot | 同名不同產品，是最高頻陷阱 |

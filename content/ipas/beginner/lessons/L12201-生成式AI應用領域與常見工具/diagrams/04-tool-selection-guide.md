# Diagram 04 · 工具選擇決策流程圖

```
開始：你的使用場景是什麼？
│
├──【輸出類型判斷】────────────────────────────────────────────
│
├── 需要「文字」輸出？
│   │
│   ├── 個人直接使用（對話/寫作/翻譯）
│   │   ├── 一般用途 → ChatGPT（月費制，有免費版）
│   │   └── 多模態需求/Google生態 → Gemini（有免費版）
│   │
│   ├── 開發者要整合進系統
│   │   └── → OpenAI API（按 Token 計費，適合開發者）
│   │
│   ├── 需要台灣本土/繁體中文/資料不離境
│   │   └── → TAIDE（國科會，可本地部署）
│   │
│   └── 需要開源可自架/免費
│       └── → LLaMA（Meta 開源，可本地部署）
│
├── 需要「圖像」輸出？
│   │
│   ├── 高品質商業圖/行銷素材（不懂程式）
│   │   └── → Midjourney（付費，照片級品質）
│   │
│   ├── 開發者 API 整合圖像生成
│   │   └── → OpenAI API + DALL-E 3
│   │
│   └── 開源免費/資料不離境/本地部署
│       └── → Stable Diffusion（開源，可本地跑）
│
├── 需要「聲音」輸出？
│   │
│   ├── 文字 → 語音（配音/有聲書）[TTS]
│   │   └── → ElevenLabs（語音合成）
│   │
│   ├── 語音 → 文字（錄音逐字稿）[STT] ⚠️
│   │   └── → Whisper（OpenAI STT，非TTS）
│   │
│   └── 生成完整音樂作品
│       └── → Suno（AI 音樂創作）
│
├── 需要「程式碼」輔助？
│   │
│   ├── 想在現有 IDE（VS Code 等）中加 AI 補全
│   │   └── → GitHub Copilot（IDE 擴充套件，不換編輯器）
│   │
│   ├── 想用自然語言驅動 AI 生成整段程式碼（Vibe Coding）
│   │   └── → Cursor（獨立 AI IDE，VS Code fork）
│   │
│   └── 非技術人員要建聊天機器人（低程式碼）
│       └── → Copilot Studio（Microsoft 365 生態）
│
└── 需要「影片」輸出？（補充，非三大核心領域）
    └── → Runway / Pika（Sora 已關閉）

────────────────────────────────────────────────────────────
```

## 額外篩選條件（覆蓋以上所有選擇）

```
情況 A：「資料不能傳到海外伺服器」
  ├── 文字 → TAIDE（台灣本土）或 LLaMA（本地部署）
  └── 圖像 → Stable Diffusion（本地部署）

情況 B：「完全免費，不想付費」
  ├── 文字 → LLaMA（開源免費）或 ChatGPT Free（功能受限）
  └── 圖像 → Stable Diffusion（開源免費）

情況 C：「需要整合進自己的應用程式（API）」
  ├── 文字+圖像 → OpenAI API
  └── 語音合成 → ElevenLabs API

情況 D：「沒有技術背景，直接圖形界面操作」
  ├── 文字 → ChatGPT（網頁/App）
  ├── 圖像 → Midjourney（Discord/Web）
  └── 聊天機器人建置 → Copilot Studio（Web 拖拉操作）
```

## 記憶口訣

```
「文 ChatGPT  圖 Midjourney  聲 ElevenLabs」← 最基礎三大對應
「開源文 LLaMA  開源圖 Stable」← 開源工具對應
「程式補全 GitHub Copilot  建機器人 Copilot Studio  Vibe Coding Cursor」← Copilot三分法
「語音辨識 Whisper（STT）  語音合成 ElevenLabs（TTS）」← TTS vs STT
「台灣本土 → TAIDE」← 必考
```

# L12201 生成式AI應用領域與常見工具 — Study Guide

---

## Section 1 · 考試導覽

### 建議閱讀順序

1. Section 2（分類總覽圖）→ 2. Section 3（各領域核心概念）→ 3. Section 4（易混淆對照表）→ 4. Section 5（口訣）→ 5. Section 6（考試陷阱）→ 6. Section 7（情境題）→ 7. Section 8（自我檢查）

### 前置知識

本課建立在 **L11401**（鑑別式AI vs 生成式AI基本原理）的基礎上。你必須已知道 GenAI（Generative AI，生成式人工智慧）與鑑別式 AI 的概念差異，才能直接進入本課的「工具應用層」。

### 🔥 考試權重表

| 出題方向 | 頻率 | 典型題型 |
|---|---|---|
| 工具 ↔ 領域對應 | 🔥🔥🔥 高 | 某工具屬於哪個生成領域？ |
| Copilot 生態系辨認 | 🔥🔥🔥 高 | GitHub Copilot vs Copilot Studio vs Cursor |
| ChatGPT vs OpenAI API | 🔥🔥 中高 | 月費訂閱 vs 按 token 計費 |
| 開源 vs 閉源工具 | 🔥🔥 中高 | LLaMA / Stable Diffusion 特徵 |
| 台灣本土工具（TAIDE） | 🔥🔥 中高 | 幾乎每場必考 |
| TTS vs STT 區分 | 🔥 中 | Whisper = STT（非TTS） |
| 影片/多模態工具 | 🔥 中 | Sora / GPT-4o 定位 |
| Token 計費單位 | 🔥 中 | 不是「字數」是「token」 |

本課約出 **4–6 題**，佔第二科（生成式AI應用與規劃）約 10%。

### 課程邊界說明

| 本課（初級 L12201）考什麼 | 中級才考 — 本課不考 |
|---|---|
| 工具名稱、所屬公司、適用場景 | 模型架構（Transformer、Diffusion、U-Net） |
| 開源 vs 閉源、部署方式選擇 | 訓練流程、損失函數 |
| Token 計費概念 | CLIP 對比損失、注意力機制數學 |
| 提示工程（基礎用法） | RAG 技術架構細節（屬 L12202） |
| TTS / STT 概念區分 | 語音辨識模型內部運作 |

---

## Section 2 · 關鍵概念總覽圖

```
GenAI（Generative AI，生成式人工智慧）應用版圖
│
├── 🔥🔥🔥 文字生成（Text Generation）
│   ├── ChatGPT（OpenAI，對話介面，月費制）🔥🔥
│   ├── OpenAI API（開發者介面，按 token 計費）🔥🔥
│   ├── Gemini（Google，多模態，Google 生態）🔥
│   ├── Claude（Anthropic，以安全性著稱）
│   ├── LLM（Large Language Model，大型語言模型）開源代表：
│   │   └── LLaMA（Meta，可本地部署）🔥
│   └── TAIDE（台灣國科會，繁中模型，幾乎必考）🔥🔥
│
├── 🔥🔥 圖像生成（Image Generation）
│   ├── Midjourney（付費，照片級品質，Discord/Web）🔥
│   ├── DALL-E 3（OpenAI，整合於 ChatGPT）
│   ├── Stable Diffusion（開源，可本地部署）🔥  ⚠️ 開源
│   └── Adobe Firefly（企業版，整合 Adobe 生態）
│
├── 🔥🔥 聲音生成（Audio Generation）
│   ├── TTS（Text-to-Speech，文字轉語音）：
│   │   └── ElevenLabs（語音合成，高品質）🔥
│   ├── STT（Speech-to-Text，語音轉文字）：
│   │   └── Whisper（OpenAI，STT工具，非TTS）🔥  ⚠️ 容易混淆
│   └── AI 音樂生成：
│       └── Suno（音樂創作）
│
├── 💻 程式碼輔助（Code Assistance）
│   ├── GitHub Copilot（IDE擴充套件，行內補全）🔥🔥  ⚠️ 非Copilot Studio
│   ├── VS Code for Copilot（GitHub Copilot在VS Code的整合介面）
│   ├── Copilot Studio（低程式碼Agent建置平台）🔥🔥  ⚠️ 非GitHub Copilot
│   ├── Cursor（獨立AI IDE，VS Code fork，Vibe Coding）🔥
│   └── Amazon Q Developer（原Amazon CodeWhisperer）
│
├── 🎬 影片生成（Video Generation）
│   ├── Sora（OpenAI，文生影片 Text-to-Video）
│   ├── Runway
│   └── Pika
│
└── 🌐 多模態AI（Multimodal AI，文字+圖像+音頻整合）
    ├── GPT-4o（OpenAI，ChatGPT背後模型）
    └── Gemini Ultra（Google，影片理解強項）
```

**圖例：** 🔥 = 高頻考點；🔥🔥 = 非常高頻；⚠️ = 易混淆陷阱

---

## Section 3 · 核心概念

### 3.1 文字生成（Text Generation）

**先懂一句話：** 文字生成工具接受文字（或多模態）輸入，輸出文章、程式碼、摘要、翻譯或對話回覆。

**主要應用：** 文案撰寫、程式碼生成、文件摘要、多語言翻譯、客服對話自動化

**核心工具：**

| 工具 | 公司 | 特色 | 計費方式 |
|---|---|---|---|
| ChatGPT | OpenAI | 對話介面，一般使用者 | 月費訂閱（Free/Plus/Pro） |
| OpenAI API | OpenAI | 開發者程式介面 | 按 token 計費 |
| Gemini | Google | 多模態，Google 生態整合 | Free / Advanced 月費 |
| Claude | Anthropic | 安全性、長文本處理 | Free / 月費 |
| LLaMA | Meta | 開源，可本地部署 | 免費（自行架設） |
| TAIDE | 台灣國科會 | 繁體中文，台灣本土化 | 公開使用 |

🗣️ **白話說明：** ChatGPT 像去超商買現沖咖啡——有店面、有服務員、月繳固定費。OpenAI API 像去咖啡批發商叫豆子——沒有店面，你要自己設計杯型和包裝，但能做出自己品牌的咖啡，按你用多少豆子付錢。TAIDE 則像台灣自己種的咖啡豆——不依賴進口，適合不想把資料傳到國外的政府機關。

**Quick check：**
- 補習班要把 AI 整合進自有系統 → OpenAI API（非ChatGPT）
- 想直接用 AI 寫報告的個人使用者 → ChatGPT
- 台灣政府機關要處理公文 → TAIDE

---

### 3.2 圖像生成（Image Generation）

**先懂一句話：** 圖像生成工具接受文字提示詞（Text-to-Image，文字轉圖像），輸出靜態圖片，可用於行銷素材、插圖、產品設計概念圖。

**主要應用：** 行銷素材製作、插圖繪製、產品設計概念圖、室內設計示意

**核心工具：**

| 工具 | 公司 | 開源？ | 免費方案？ |
|---|---|---|---|
| Midjourney | Midjourney | 閉源 | ❌ 無（Basic $10/月起） |
| DALL-E 3 | OpenAI | 閉源 | ✅ 整合於 ChatGPT Free |
| Stable Diffusion | Stability AI | ✅ 開源 | ✅ 可免費本地部署 |
| Adobe Firefly | Adobe | 閉源 | 部分功能免費 |

🗣️ **白話說明：** Midjourney 是 AI 圖像生成界的 iPhone——高品質、需付費、封閉生態。Stable Diffusion 像 Android 開源版本——你可以免費下載到自己的電腦上跑，技術門檻較高但完全免費且資料不離開本地。DALL-E 3 則內嵌在 ChatGPT 裡，你在對話視窗直接說「幫我畫一張圖」就可以用。

**Quick check：**
- 行銷團隊（無技術背景）要快速生成高品質圖 → Midjourney
- 公司有資料隱私顧慮，不想上傳到雲端 → Stable Diffusion（開源，本地部署）
- 開發者要透過 API 呼叫圖像生成 → OpenAI API（含DALL-E）

---

### 3.3 聲音生成（Audio Generation）

**先懂一句話：** 聲音生成分兩大子類——TTS（Text-to-Speech，文字轉語音）將文字轉成人聲，STT（Speech-to-Text，語音轉文字）則是辨識語音轉成文字。

**⚠️ 最重要的考試陷阱在這裡：Whisper（OpenAI）是 STT 工具（語音「辨識」），不是 TTS 工具（語音「合成」）！**

**主要應用：** 有聲書製作、廣告配音、Podcast 配音、語音客服

**核心工具：**

| 工具 | 類型 | 功能 |
|---|---|---|
| ElevenLabs | TTS | 文字 → 人聲（語音合成，情感控制） |
| Suno | AI音樂 | 文字描述 → 完整歌曲（旋律+歌詞） |
| Whisper（OpenAI） | STT ⚠️ | 語音 → 文字（語音辨識，非生成） |

🗣️ **白話說明：** ElevenLabs 像一個 AI 配音演員——你把文稿交給它，它用各種聲線唸給你聽，可以控制開心、悲傷、興奮等情緒。Suno 更厲害，你說「幫我做一首台語嘻哈歌」，它直接生出一首有旋律有歌詞的完整歌曲。Whisper 則完全反過來——它是「聽」的，把會議錄音轉成逐字稿。

**Quick check：**
- Podcast 創作者要將文字腳本轉語音 → ElevenLabs（TTS）
- 需要把會議錄音轉成文字逐字稿 → Whisper（STT）
- 想做一首 AI 生成的歌曲 → Suno

---

### 3.4 程式碼輔助工具（Code Assistance）

**先懂一句話：** 程式碼輔助工具幫助開發者更快寫出程式碼，分為 IDE 擴充套件（裝進現有編輯器）和獨立 IDE（完整的程式碼編輯環境）兩類。

**🔥🔥 Copilot 三兄弟是考試最高頻混淆點：**

```
Microsoft 生態系
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  GitHub Copilot              Copilot Studio             │
│  ┌─────────────────┐        ┌─────────────────────┐     │
│  │ IDE 擴充套件     │        │ 低程式碼 Agent 平台  │     │
│  │ 幫你「寫程式碼」 │        │ 幫你「建聊天機器人」 │     │
│  │ 安裝在 IDE 裡   │        │ 獨立 Web 平台       │     │
│  │ Pro $10/月      │        │ Microsoft 365 生態  │     │
│  └────────┬────────┘        └─────────────────────┘     │
│           │ 安裝於                                       │
│           ▼                                             │
│  ┌─────────────────┐                                    │
│  │  VS Code（編輯器）│  ← VS Code for Copilot           │
│  └─────────────────┘    = Copilot 在 VS Code 的介面     │
└─────────────────────────────────────────────────────────┘

獨立生態
┌─────────────────────────────────────────┐
│  Cursor                                 │
│  ┌─────────────────────────────────┐    │
│  │ 獨立 AI IDE（VS Code fork）      │    │
│  │ Vibe Coding 代表工具             │    │
│  │ 自然語言 → 生成完整程式碼         │    │
│  │ Pro $20/月                       │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

| 工具 | 形式 | 使用者 | 核心功能 | 考試關鍵字 |
|---|---|---|---|---|
| GitHub Copilot | IDE 擴充套件 | 開發者 | 行內補全 + AI Chat | 擴充套件、行內補全 |
| VS Code for Copilot | — | 開發者 | GitHub Copilot 在 VS Code 的介面 | 非獨立產品 |
| Copilot Studio | Web 平台 | 非技術人員 | 建聊天機器人 | 低程式碼、Agent |
| Cursor | 獨立 IDE | 開發者 | 自然語言→程式碼 | Vibe Coding、fork |
| Amazon Q Developer | 雲端/IDE | 開發者 | AWS 生態程式碼輔助 | 原名 CodeWhisperer ⚠️ |

🗣️ **白話說明：** GitHub Copilot 像坐在你旁邊幫你補字的助手——你在 VS Code 裡打 code，它自動補完下半行。Copilot Studio 完全不同，它是做聊天機器人的「組裝工廠」，你用拖拉就能組出客服機器人，完全不用寫程式。Cursor 更激進，它讓你直接說「做一個登入頁面」，AI 把整段程式碼都生出來——這就是 Vibe Coding（氛圍程式設計）。

**Quick check：**
- 想在不換編輯器前提下給 VS Code 加 AI 補全 → GitHub Copilot（擴充套件）
- 非技術客服主管要建聊天機器人 → Copilot Studio（低程式碼）
- 想用自然語言描述就生出完整程式碼 → Cursor（Vibe Coding）

---

### 3.5 工具選擇考量

**先懂一句話：** 選工具時需考量四個維度——開放性、部署方式、成本、資料隱私。

| 維度 | 選項 A | 選項 B | 選 A 的情境 | 選 B 的情境 |
|---|---|---|---|---|
| 開放性 | 開源（Open Source）：LLaMA、Stable Diffusion | 閉源（Proprietary）：ChatGPT、Midjourney | 資料不能離境、需要客製化訓練 | 不想維護基礎設施、要高品質立即可用 |
| 部署 | 本地部署（On-premise） | 雲端 API | 高敏感資料（醫療、政府） | 快速上線、彈性擴展 |
| 計費 | 訂閱制（月費固定） | 按量計費（Token-based） | 高頻使用、量大固定 | 低頻使用、量少不確定 |
| 隱私 | 企業版（資料不用於訓練） | 消費者版（預設可能用於訓練） | 公司機密資料 | 一般個人用途 |

🗣️ **白話說明：** 就像選通訊軟體：LINE Pay 很方便但你的消費記錄在他們的伺服器；自建內網則隱私高但維護麻煩。選 AI 工具也一樣，方便和控制權通常是取捨的兩端。

**資料隱私選工具口訣：**
- 「資料不能離境」→ 優先選**可本地部署**的工具（TAIDE、LLaMA、Stable Diffusion）
- 開源 / open-weight 只是讓本地部署更可行（你能下載模型到自己機器），不等於「資料自動安全」
- 雲端 API 工具（ChatGPT、Midjourney）：資料必然傳到海外伺服器

**Quick check：**
- 醫療機構要 AI 分析病歷，資料絕對不能傳海外 → 本地部署（LLaMA 或 TAIDE），不用 ChatGPT API
- 個人使用者寫報告，不在意隱私 → ChatGPT（方便，免費版可用）

---

### 3.6 多模態與影片生成（補充認識）

**先懂一句話：** 多模態 AI（Multimodal AI）能同時處理文字、圖像、音頻等多種輸入/輸出形式；影片生成（Video Generation）是生成式AI的新興應用領域。

**核心工具：**

| 工具 | 公司 | 類型 | 初級考試重點 |
|---|---|---|---|
| GPT-4o | OpenAI | 多模態 LLM | ChatGPT 的底層模型之一；文字+圖像+語音整合 |
| Gemini | Google | 多模態 AI | Google 生態整合；影片理解能力強項 |
| Sora | OpenAI | 文生影片（Text-to-Video） | 考試辨識用；非 Stable Diffusion 家族 |
| Runway / Pika | 第三方 | 影片生成 | 了解即可，非核心考點 |

**考試邊界：**
- 多模態工具考「定位辨識」，不考技術原理（cross-attention、token merge 等）
- Sora 考點：OpenAI 出品的文生影片工具，不是圖像生成工具（非 Midjourney / SD）

🗣️ **白話說明：** 早期 AI 工具各自為政（文字歸文字、圖像歸圖像）；GPT-4o 和 Gemini 則像全能選手，同一次對話可以讀圖、聽音、回文字。Sora 則把這個整合再延伸——直接生成動態影片。

**Quick check：**
- 「想讓 AI 同時看圖片又回答問題」→ 多模態工具，Gemini 或 ChatGPT（含GPT-4o）
- 「文字描述生成影片」→ Sora（OpenAI），不要答 Stable Diffusion

---

## Section 4 · 易混淆概念對照表

### 4.1 ChatGPT vs OpenAI API 🔥🔥

| 比較項目 | ChatGPT | OpenAI API（Application Programming Interface，應用程式介面） |
|---|---|---|
| 適用對象 | 終端使用者（一般人） | 開發者（程式設計師） |
| 計費方式 | 月費訂閱（$0–$200/月） | 按 token 用量計費 |
| 操作方式 | 網頁/App 對話視窗 | 程式碼呼叫（HTTP Request） |
| 資料隱私 | 消費者版預設可能用於訓練 | API 呼叫資料預設不用於訓練 |
| 整合能力 | 僅能使用 OpenAI 介面 | 可嵌入任何自有系統 |

**考題判斷：** 看到「整合進自有系統/App」→ 選 OpenAI API；看到「個人直接使用」→ 選 ChatGPT。

---

### 4.2 GitHub Copilot vs Copilot Studio vs Cursor 🔥🔥

| 比較項目 | GitHub Copilot | Copilot Studio | Cursor |
|---|---|---|---|
| 形式 | IDE 擴充套件 | 獨立 Web 平台 | 獨立 IDE |
| 功能 | 程式碼補全 | 建聊天機器人 | AI 生成程式碼 |
| 使用者 | 開發者 | 非技術人員 | 開發者 |
| 生態系 | GitHub（Microsoft） | Microsoft 365 | 獨立（VS Code fork） |
| 考試關鍵字 | Extension、行內補全 | 低程式碼、Agent 平台 | Vibe Coding、fork |

**考題判斷：** 看到「低程式碼建機器人」→ Copilot Studio；看到「IDE程式碼補全」→ GitHub Copilot；看到「Vibe Coding/自然語言寫程式」→ Cursor。

---

### 4.3 TTS vs STT（Whisper 特別注意）🔥

| 縮寫 | 全名 | 方向 | 代表工具 |
|---|---|---|---|
| TTS | Text-to-Speech，文字轉語音 | 文字 → 聲音 | ElevenLabs |
| STT | Speech-to-Text，語音轉文字 | 聲音 → 文字 | Whisper（OpenAI）⚠️ |

**考題判斷：** Whisper 是 STT（語音「辨識」），不是語音「合成」。

---

### 4.4 LLaMA vs Stable Diffusion（開源工具辨識）🔥

| 工具 | 開發商 | 類型 | 開源？ | 本地部署？ |
|---|---|---|---|---|
| LLaMA（Large Language Model Meta AI） | Meta | 文字生成 LLM | ✅ 開源 | ✅ 可 |
| Stable Diffusion | Stability AI | 圖像生成 | ✅ 開源 | ✅ 可 |
| ChatGPT | OpenAI | 文字生成 | ❌ 閉源 | ❌ 不可 |
| Midjourney | Midjourney | 圖像生成 | ❌ 閉源 | ❌ 不可 |

**考題判斷：** 看到「開源LLM可本地部署」→ LLaMA（Meta）；看到「開源圖像生成可免費使用」→ Stable Diffusion。

---

### 4.5 Microsoft Copilot vs GitHub Copilot 🔥

| 工具 | 定位 | 整合點 |
|---|---|---|
| Microsoft 365 Copilot | Microsoft 365 AI 助手（Word、Excel、Teams） | Microsoft 365 文件應用 |
| GitHub Copilot | IDE 程式碼補全擴充套件 | VS Code / JetBrains 等 IDE |
| Copilot Studio | 低程式碼聊天機器人建置平台 | Microsoft 365 / Power Platform |

**考題判斷：** 三者都叫 Copilot，但場景完全不同——Office文件用 Microsoft 365 Copilot；寫程式用 GitHub Copilot；建聊天機器人用 Copilot Studio。

---

## Section 5 · 口訣

### 三大領域：「文、圖、聲」

> **文**字生成 → ChatGPT、OpenAI API、Gemini、LLaMA（開源）
> **圖**像生成 → Midjourney、DALL-E 3、Stable Diffusion（開源）
> **聲**音生成 → ElevenLabs（TTS）、Whisper（STT）、Suno（音樂）
>
> **記法：「文圖聲，像點餐：要文字找 ChatGPT，要圖片找 MJ，要聲音找 EL。」**

---

### Copilot 三兄弟：「寫、建、編」

> GitHub Copilot = **寫**（寫程式碼的 IDE 助手）
> Copilot Studio = **建**（建聊天機器人的低程式碼平台）
> Cursor = **編**（AI 程式碼編輯器，Vibe Coding）
>
> **記法：「寫建編 — Copilot 寫code、Studio 建bot、Cursor 編程式。」**

---

### 開源雙雄：「Meta文 + SD圖」

> LLaMA = Meta 開源**文**字模型（可本地跑）
> Stable Diffusion = 開源**圖**像模型（免費本地跑）
>
> **記法：「開源找 Meta（文字）或 SD（圖像）」**

---

### TTS vs STT：「S在前=說話，S在後=聽話」

> TTS = Text → Speech（你輸入文字，AI「說」出來）
> STT = Speech → Text（AI「聽」語音轉成文字）
>
> **記法：「Whisper（耳語）= 聽語音（STT）；ElevenLabs = 說語音（TTS）」**

---

## Section 6 · 考試陷阱

❌ **陷阱：** Whisper（OpenAI）是語音合成工具（TTS），可用來生成語音。
✅ **正解：** Whisper 是 STT（Speech-to-Text，語音轉文字）工具，功能是將語音「辨識」成文字，而不是生成語音。TTS 代表工具是 ElevenLabs。

---

❌ **陷阱：** LLaMA 是 OpenAI 開發的開源模型。
✅ **正解：** LLaMA 是 **Meta** 開發的開源 LLM（Large Language Model，大型語言模型）。OpenAI 開發的是 GPT 系列（ChatGPT），屬閉源模型，不能本地部署。

---

❌ **陷阱：** Stable Diffusion 是付費圖像生成工具，類似 Midjourney。
✅ **正解：** Stable Diffusion 是**開源**圖像生成模型，可完全免費下載並在本地電腦運行。Midjourney 才是付費閉源工具（無免費方案）。

---

❌ **陷阱：** Amazon CodeWhisperer 是現在的工具名稱。
✅ **正解：** Amazon CodeWhisperer 已於 2024 年更名為 **Amazon Q Developer**。考試若出現兩者，應視為同一工具。

---

❌ **陷阱：** Copilot Studio 是 GitHub Copilot 的進階版（Pro 版）。
✅ **正解：** 兩者是**完全不同**的產品線。GitHub Copilot = 程式碼補全 IDE 擴充套件；Copilot Studio = 低程式碼 AI Agent 建置平台（屬 Microsoft 365/Power Platform 生態系）。名字相似是最大陷阱。

---

❌ **陷阱：** ChatGPT Pro 方案（$200/月）包含 OpenAI API 的使用額度。
✅ **正解：** ChatGPT 訂閱與 OpenAI API 是**完全獨立**的計費系統。即使購買了 Pro $200/月，仍需另外在 OpenAI Platform 儲值才能使用 API。

---

❌ **陷阱：** API 計費的單位是「字數」（中文字數 / 英文字數）。
✅ **正解：** API 計費的單位是 **Token**（不是字數）。Token 是 AI 語言模型的基本計算單位，一個 token 不等於一個字或一個詞，確切換算比例依模型而異，不需記具體數字——記住「按 token 計費，不是按字數計費」即可。

---

❌ **陷阱：** Microsoft Copilot（Office 365 裡的 AI 助手）和 GitHub Copilot（IDE 程式碼補全）是同一個工具。
✅ **正解：** 兩者名稱相似但定位不同。Microsoft 365 Copilot 整合在 Word、Excel、Teams 等 Microsoft 365 應用中，幫助一般辦公室工作；GitHub Copilot 則是開發者用的 IDE 程式碼補全擴充套件。

---

❌ **陷阱：** 使用 ChatGPT 網頁版和使用 OpenAI API 的資料隱私政策相同。
✅ **正解：** ChatGPT 網頁/App（消費者版）的對話內容**預設可能被用於模型訓練**（除非手動關閉）；**API 呼叫的資料預設不會用於訓練**。企業部署時，這個差異是選擇 API 而非網頁版的重要理由。

---

## Section 7 · 情境題快速判斷

### 決策流程圖

```
使用者遇到情境題時的判斷步驟：

STEP 1：輸出是什麼類型？
  ├── 文字/程式碼 → 進 STEP 2
  ├── 圖片 → 圖像生成領域 → Midjourney / DALL-E / Stable Diffusion
  ├── 聲音/音樂 → 聲音生成領域 → ElevenLabs（TTS）/ Suno（音樂）/ Whisper（STT）
  └── 影片 → 影片生成領域 → Sora（已關閉）/ Runway

STEP 2（文字輸出）：誰在用？怎麼用？
  ├── 個人直接使用（對話）→ ChatGPT / Gemini
  ├── 開發者整合進系統 → OpenAI API
  ├── 寫程式碼（在IDE裡） → GitHub Copilot（擴充套件）/ Cursor（獨立IDE）
  └── 非技術人員建機器人 → Copilot Studio（低程式碼）

STEP 3（額外篩選條件）：
  ├── 「台灣自主 / 繁體中文 / 不傳海外」→ TAIDE
  ├── 「開源 / 本地部署 / 免費下載」→ LLaMA（文字）/ Stable Diffusion（圖像）
  └── 「語音辨識 / 錄音轉文字 / STT」→ Whisper（非 ElevenLabs）
```

### 關鍵字速查表

| 情境關鍵字 | 正確答案 |
|---|---|
| 「整合進自有App / 系統」 | OpenAI API |
| 「個人日常問答 / 寫報告」 | ChatGPT |
| 「多模態 / 同時處理文字圖片影片」 | Gemini |
| 「照片級 AI 繪圖 / 行銷素材」 | Midjourney |
| 「文生圖 + API 呼叫」 | OpenAI API（含DALL-E） |
| 「開源圖像 / 本地部署」 | Stable Diffusion |
| 「文字轉語音 / 有聲書配音」 | ElevenLabs（TTS） |
| 「語音轉文字 / 會議錄音逐字稿」 | Whisper（STT） |
| 「AI 作曲 / 音樂生成」 | Suno |
| 「程式碼補全 / 不換IDE」 | GitHub Copilot（擴充套件） |
| 「低程式碼 / 建聊天機器人」 | Copilot Studio |
| 「Vibe Coding / 自然語言寫程式」 | Cursor |
| 「台灣本土AI / 繁中模型 / 國科會」 | TAIDE |
| 「開源LLM / Meta / 本地部署」 | LLaMA |
| 「原Amazon CodeWhisperer」 | Amazon Q Developer |
| 「文件問答 / RAG 應用 / 上傳PDF問答」 | NotebookLM（Google） |
| 「AI 搜尋 / 附來源引用」 | Perplexity |
| 「開源模型代表 / 中文大模型」 | DeepSeek |

### 情境判斷練習（3 題）

**情境 A：** 某電商公司想讓工程師不需更換現有 VS Code 就能獲得 AI 程式碼補全支援，同時非技術的客服部門想建立自動回覆的聊天機器人。應分別選哪個工具？

→ 工程師用 **GitHub Copilot**（VS Code 擴充套件，不換 IDE）；客服部門用 **Copilot Studio**（低程式碼，建聊天機器人）。

---

**情境 B：** 一家台灣政府機關要將業務資料交給 AI 分析，資料不能傳到海外伺服器，且需要支援繁體中文。最優先評估的工具是？

→ **TAIDE**（台灣國科會主導，繁體中文優化，可搭配本地部署確保資料不離境）。

---

**情境 C：** 音頻製作公司需要兩個功能：（1）將會議錄音轉成文字逐字稿；（2）將文字稿轉成自然人聲供播放。應分別選哪個工具？

→ （1）會議錄音→文字：**Whisper**（STT，語音轉文字）；（2）文字→語音：**ElevenLabs**（TTS，文字轉語音）。

---

**情境 D：** 一家新創公司開發者想用 AI 快速開發一個 MVP（最小可行產品），他偏好「說一句話，AI 生整個功能的程式碼」的方式。他應該用哪個工具？GitHub Copilot 和 Cursor 的差別在哪？

→ 「說一句話生整段程式碼」= **Vibe Coding（氛圍程式設計）**，代表工具是 **Cursor**（獨立 AI IDE，VS Code fork）。
GitHub Copilot 是「行內補全」——你已經在寫程式，它幫你補下半行；Cursor 是「自然語言驅動」——你描述需求，AI 生成完整功能，更適合快速 MVP。

---

**情境 E：** 電商公司研究部門想建立一個工具，讓分析師可以把競品報告（PDF）上傳後直接對文件提問、取得有來源引用的摘要。這是哪種應用模式？有哪些代表工具？

→ 這是 **RAG 應用（Retrieval-Augmented Generation，檢索增強生成）/ 文件問答**模式。
- **NotebookLM**（Google）：上傳文件後直接問答，自動摘要並標示來源頁碼
- **Perplexity**：AI 搜尋引擎，每個答案都附帶來源連結
- 技術架構細節（RAG 向量資料庫等）屬中級 / L12202，初級只需認識工具定位

---

## Section 8 · 結尾：快速自我檢查

在考試前，確認你能回答以下每一項：

**工具 ↔ 領域對應**
- [ ] 說出「文圖聲」三大領域各自的代表工具（至少各2個）
- [ ] 說出 Whisper 是 STT（語音辨識）不是 TTS（語音合成）
- [ ] 說出 ElevenLabs 是 TTS（語音合成），Suno 是 AI 音樂生成
- [ ] 說出 Sora 是文生影片（Text-to-Video），不是圖像生成工具

**工具 ↔ 公司對應**
- [ ] 說出 LLaMA 是 Meta 的開源 LLM（不是 OpenAI）
- [ ] 說出 Stable Diffusion 是 Stability AI 的開源圖像模型
- [ ] 說出 Whisper 是 OpenAI 出品（但開源 STT，非ChatGPT）
- [ ] 說出 TAIDE 是台灣國科會主導的繁體中文 LLM
- [ ] 說出 Amazon Q Developer 的前身是 Amazon CodeWhisperer

**計費 & 隱私**
- [ ] 說出 ChatGPT 月費訂閱 ≠ OpenAI API 按 token 計費（完全獨立計費）
- [ ] 說出 Token 是 API 計費單位（不是字數）
- [ ] 說出「資料不能離境」→ 本地部署工具（TAIDE / LLaMA / Stable Diffusion）

**Copilot 生態系**
- [ ] 區分 GitHub Copilot（IDE擴充套件）vs Copilot Studio（低程式碼平台）vs Cursor（獨立IDE）
- [ ] 說出 VS Code for Copilot 不是獨立產品，就是 GitHub Copilot 在 VS Code 裡的介面
- [ ] 說出 Microsoft 365 Copilot（Office助手）≠ GitHub Copilot（程式碼補全）

**本課工具主要公司速查：**

| 公司 | 旗下工具（考試常出現） |
|---|---|
| OpenAI | ChatGPT、OpenAI API、DALL-E 3、Whisper、Sora |
| Google | Gemini、NotebookLM |
| Meta | LLaMA |
| Anthropic | Claude |
| Stability AI | Stable Diffusion |
| Adobe | Adobe Firefly |
| ElevenLabs | ElevenLabs（TTS） |
| Suno AI | Suno（AI音樂） |
| GitHub / Microsoft | GitHub Copilot、Copilot Studio、Microsoft 365 Copilot |
| Anysphere | Cursor |
| AWS / Amazon | Amazon Q Developer（原 CodeWhisperer） |
| 台灣國科會 | TAIDE |

📌 **本課不考：**
- Transformer、Diffusion、U-Net 等模型架構內部細節
- GAN 生成器/鑑別器訓練原理
- CLIP 對比損失函數
- 提示詞框架詳細設計（屬 L12202）
- RAG 的技術架構（屬 L12202）
- 模型微調（Fine-tuning）方法（屬中級）

---

**圖表參考：**
- 領域分類樹狀圖 → [diagrams/01-genai-domain-taxonomy.md](diagrams/01-genai-domain-taxonomy.md)
- 工具對照表（12+ 工具）→ [diagrams/02-tool-comparison-table.md](diagrams/02-tool-comparison-table.md)
- Copilot 生態系辨別圖 → [diagrams/03-microsoft-copilot-clarification.md](diagrams/03-microsoft-copilot-clarification.md)
- 工具選擇決策流程 → [diagrams/04-tool-selection-guide.md](diagrams/04-tool-selection-guide.md)

# L22403 大數據在生成式AI中的應用 — Study Guide v2

## 0. How to Use This Guide

這份 guide 的讀法是：先看第 1 節的大圖，再讀第 2-7 節核心概念，最後用第 8-10 節練情境判斷。

考前複習時，不要只背名詞。每一題都先問自己：題目在問「資料來源」、「資料處理」、「訓練/檢索典範」、「分散式訓練」，還是「API 資料流」？

每個核心章節照這個順序讀：

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check
```

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

這一課是從「資料」看生成式 AI：模型要先拿大量資料預訓練，資料要先清理與分詞；若要客製化，可以微調或用 RAG 接外部文件；模型太大時，才需要分散式訓練。

### Everyday Analogy

想像你要訓練一位客服新人。預訓練像先讓他大量閱讀世界知識，微調像教他公司回覆風格，RAG 像讓他回答前先查公司 SOP。

### 先問自己一個問題

看到生成式 AI 題目時，先不要急著選模型名稱。先問：「這題是在問資料怎麼來、資料怎麼變乾淨、模型怎麼客製化，還是回答前怎麼查資料？」

### 技術說法

生成式 AI（Generative AI）的資料生命週期可以分成五層：

1. 預訓練語料（pretraining corpus）：讓基礎模型先建立通用能力。
2. 語料處理（corpus processing）：清理、去重、分詞。
3. 客製化方法（customization）：微調（fine-tuning）、LoRA / PEFT，或 RAG。
4. 資源配置（distributed training）：資料、tensor、模型 stage 怎麼切到多張 GPU。
5. 生成 API（generation API）：tokenizer 進、`model.generate()` 出。

### 流程 / 選擇流程

```text
Raw web / documents
→ corpus cleaning and deduplication
→ tokenization
→ pretraining / fine-tuning / RAG indexing
→ generation or task output
```

### 比較表這樣讀

這張表不是要背所有名詞，而是用「題目關鍵字 → 該想到哪一層」來排除選項。

| 題目問的是 | 想到 |
|---|---|
| Common Crawl、C4、The Pile、ROOTS | 大規模預訓練語料庫 |
| quality filter、dedup、MinHash、perplexity filter | 語料清理與去重 |
| BPE、WordPiece、SentencePiece、tiktoken | 分詞器 tokenizer |
| SFT、instruction-response pairs | 監督式微調資料 |
| chosen/rejected responses | RLHF 偏好資料 |
| LoRA、adapter、rank r | PEFT / 參數高效微調 |
| chunking、embedding、vector store | RAG 資料管線 |
| DDP、tensor parallel、pipeline parallel | 分散式訓練 |
| `pipeline(...)`、`model.generate()` | Hugging Face API 資料流 |

### 記憶方式

```text
資料來源 → 清理分詞 → 客製方法 → 多卡訓練 → 生成輸出
```

口訣：`源、清、客、卡、生`。先定位題目在哪一層，再選方法。

### Exam Rule

```text
題目問「拿什麼資料訓練基礎模型」→ pretraining corpus
題目問「公司知識常更新、不想重訓」→ RAG
題目問「少量資料、低成本客製模型」→ LoRA / PEFT
題目問「同一模型複製到多張 GPU」→ Data Parallelism
```

### Quick Check

題目說：「要讓客服模型回答最新公司政策，但不想重新訓練模型權重。」最適合哪一種方法？

答案：RAG。因為 RAG 是把外部文件檢索後放進 prompt，不需要重訓基礎模型權重。

---

## 2. 大規模預訓練語料庫（Pretraining Corpus）🔥🔥🔥

### 先懂一句話

預訓練語料庫是生成式模型建立基礎能力的原料。考試重點不是模型數學，而是語料的規模、品質、多樣性與授權合規。

### Everyday Analogy

預訓練像準備國考前大量讀書：不是只讀一本筆記，而是讀新聞、書籍、論文、論壇、百科與程式碼，先建立廣泛背景知識。

### 先問自己一個問題

這題是不是在問：「模型一開始大量學世界知識時，資料從哪裡來，而且資料能不能用？」

### 技術說法

預訓練語料庫（pretraining corpus）是訓練基礎模型（foundation model）前準備的大規模文本集合。考試通常不要求你背每個資料集細節，而是要能判斷它們屬於「預訓練資料來源」，並知道資料要看規模、品質、多樣性與授權合規。

### 流程 / 選擇流程

```text
Raw web / books / code / papers
→ pretraining corpus selection
→ cleaning and deduplication
→ tokenization
→ pretraining
```

### 比較表這樣讀

先把四個面向記成一句話：`資料要大，但也要乾淨、多元、合法`。

#### 2.1 預訓練語料看四件事

| 面向 | 白話意思 | 考試判斷 |
|---|---|---|
| 規模 Scale | 資料量要很大，常到 TB 或 trillion tokens | 看到 TB-scale、兆 token，想到預訓練 |
| 品質 Quality | 移除廣告、錯碼、低資訊、重複內容 | 資料大不代表可直接訓練 |
| 多樣性 Diversity | 來源、語言、領域要多元 | 看到 multi-source、multilingual，想到語料多樣性 |
| 授權合規 Licensing | 能抓到不代表能合法商用 | open on internet 不等於 free for commercial training |

#### 2.2 常見預訓練語料庫

| 資料集 | 常見記憶點 | 題目看到什麼要想到它 |
|---|---|---|
| Common Crawl | 超大型原始網頁抓取 | crawl、HTML、巨大 web corpus |
| C4 | Common Crawl 清理後版本 | clean crawled corpus、quality-filtered crawl |
| The Pile | 825GB、22 種來源 | curated mixture、GitHub、arXiv、PubMed |
| ROOTS | 1.6TB、多語料、BigScience | 多語、資料治理、governance |
| RedPajama | 1.2T tokens、fully-open | 再現 LLaMA-style pretraining data |
| Dolma | AllenAI、大型開放語料 | open corpus、大規模 tokens |

#### 2.3 規模感

用規模感判斷題目在問哪一類資料：

```text
微調資料       : 10K → 100K → 1M examples
RAG 文件索引   : 10^3 → 10^6 chunks
預訓練語料     : 100GB → 1TB → 1T+ tokens
```

Common Crawl 原始網頁可以是百 TB 等級；C4 是清理後的可訓練語料版本。原始網頁越大，不代表最後可用語料也一樣大。

### 記憶方式

```text
Pretraining corpus = 大量讀書的書庫
Scale = 夠大
Quality = 夠乾淨
Diversity = 夠多元
Licensing = 能合法使用
```

### Exam Rule

```text
Common Crawl / C4 / The Pile / ROOTS / RedPajama / Dolma → pretraining corpus
規模 + 品質 + 多樣性 + 授權 → 預訓練語料評估重點
open web data → 仍要檢查 copyright、PII、license
資料越大就一定越好 → 錯，還要看品質與合規
```

### Quick Check

題目問：「C4 和 Common Crawl 的關係最接近哪一個？」  

答案：C4 是從 Common Crawl 類型的網頁資料清理、過濾後形成的可訓練語料。因為原始 crawl 需要先去除低品質與重複內容。

---

## 3. 語料清理、去重與分詞（Corpus Cleaning and Tokenization）🔥🔥🔥

### 先懂一句話

大型語料不能直接丟進模型。要先清理低品質內容、去除重複、過濾怪文本，最後用 tokenizer 把文字轉成 token ids。

### Everyday Analogy

這像整理一大箱考試資料：先丟掉廣告傳單，再把重複講義拿掉，接著移除亂碼或不完整頁面，最後切成可以一段一段閱讀的重點卡。

### 先問自己一個問題

這題是不是在問：「一大堆原始文字要怎麼變成模型能吃的輸入？」

### 技術說法

語料清理（corpus cleaning）處理資料品質；去重（deduplication）處理重複內容；分詞（tokenization）把文字切成 token，再映射成 token ids。模型不是直接讀中文或英文句子，而是讀一串整數 id。

### 流程 / 選擇流程

```text
Raw Data
→ format normalization
→ quality filtering
→ deduplication
→ perplexity / heuristic filtering
→ tokenizer
→ token ids
```

### 一步一步例子：tokenization 怎麼走

假設 prompt 是：

```text
生成式 AI 很重要
```

模型看到的不是這句中文，而是大致經過：

```text
文字
→ tokenizer 切成 tokens
→ tokens 對照 vocabulary 變成 token ids
→ ids 包成 tensor
→ 丟進模型
```

記法：

```text
token = 文字切片
token id = 文字切片在詞彙表中的編號
vocabulary size = 詞彙表有多少種 token，不是語料總量
```

### 比較表這樣讀

本節的表格要用兩個問題讀：先問「是在清資料還是在切文字？」再問「是完全一樣、很相似，還是文字品質怪？」

#### 3.1 清理與去重

| 方法 | 用途 | 考試關鍵字 |
|---|---|---|
| Quality filtering | 移除廣告、錯碼、過短、HTML 殘留、低資訊內容 | quality filter、heuristic rules |
| Exact-match deduplication | 移除完全相同文件或字串 | identical documents |
| Exact-substring deduplication | 移除長段完全重複片段 | duplicated passages |
| Near-deduplication | 移除高度相似但不完全相同文本 | near-duplicate、MinHash、LSH |
| Perplexity filtering | 用語言模型估計文本自然度，過濾太怪或太模板化內容 | perplexity filter |

MinHash 常搭配 LSH 做近似去重。它不是逐字比對全部文件，而是用 shingles / n-grams 與 hash signature 快速估計相似度。

#### 3.2 Tokenization 是什麼

Tokenization 是把文字切成模型能處理的 token，再轉成 token ids。

```text
Text
→ tokenizer
→ tokens
→ token ids
→ model input
```

#### 3.3 常見分詞器比較

| 方法 | 核心想法 | 代表模型 / 工具 | 常見考點 |
|---|---|---|---|
| BPE | 反覆合併常一起出現的 byte / symbol pairs | GPT-2、GPT-4、LLaMA 3 | subword、GPT 路線 |
| WordPiece | 類似 BPE，但 merge 選擇偏向提升 likelihood | BERT、DistilBERT | BERT → WordPiece |
| SentencePiece | tokenizer framework，可直接對 raw text 學切法 | T5、mT5、LLaMA 1/2 | 適合中文、日文、多語；可支援 BPE 或 Unigram |
| tiktoken | OpenAI 的 fast BPE tokenizer 實作 | GPT-3.5 / GPT-4 常見 `cl100k_base`，GPT-4o 起常見 `o200k_base` | API token 計算、成本估算 |

#### 3.4 子詞分割為什麼重要

| 做法 | 問題 |
|---|---|
| word-level | 詞彙表太大，遇到新詞或罕見詞容易出問題 |
| character-level | 序列太長，計算成本高 |
| subword tokenization | 在字與詞之間取平衡，是主流做法 |

#### 3.5 API 視角

```python
inputs = tokenizer("prompt", return_tensors="pt")
```

這段代表 tokenizer 把字串轉成 token ids，並包成 PyTorch tensor，讓模型可以接著處理。

### 記憶方式

```text
清理 = 丟掉垃圾
去重 = 拿掉重複講義
分詞 = 把句子切成模型能讀的編號卡
```

Tokenizer 配對：

```text
GPT → BPE
BERT → WordPiece
多語 / raw text → SentencePiece
OpenAI token counting → tiktoken
```

### Exam Rule

```text
MinHash / LSH / near-duplicate → 近似去重
perplexity filtering → 資料品質篩選，不是模型架構
BERT / DistilBERT → WordPiece
SentencePiece / raw text / 不依賴空格 → 多語 tokenizer framework
tiktoken / cl100k_base / o200k_base → OpenAI fast BPE tokenizer
vocabulary size → 詞彙表大小，不是 corpus size
```

### Quick Check

題目說：「`cl100k_base` 約有 100,277 個 vocabulary items，所以模型只用十萬多個 token 訓練。」這句對嗎？

答案：錯。100,277 是 vocabulary size，不是 pretraining corpus size；預訓練語料可能是數千億到數兆 token。

---

## 4. 三大資料典範：Pretraining vs Fine-tuning vs RAG 🔥🔥🔥

### 先懂一句話

Pretraining 是讓模型先大量讀世界；fine-tuning 是用任務資料調整模型行為；RAG 是回答前先查外部文件，不把新知識直接塞進權重。

### Everyday Analogy

預訓練像讀完整座圖書館，微調像上公司客服訓練課，RAG 像考試時可以翻最新政策手冊。

### 先問自己一個問題

這題到底是在問「讓模型學新行為」，還是「回答前先查外部資料」？

### 技術說法

預訓練（pretraining）建立通用能力；微調（fine-tuning）會改變模型權重或 adapter 參數；RAG（Retrieval-Augmented Generation，檢索增強生成）不改基礎模型權重，而是把外部資料檢索後放進 prompt。LoRA（Low-Rank Adaptation）是 PEFT（Parameter-Efficient Fine-Tuning，參數高效微調）的一種，常用來低成本客製模型。

### 流程 / 選擇流程

```text
Pretraining corpus → foundation model
Foundation model + task data → fine-tuned model
Foundation model + external document retrieval → RAG answer
```

### 一步一步例子：fine-tuning、LoRA、RAG 怎麼分

情境：公司客服模型要回答內部政策。

```text
政策常更新、要引用文件
→ 建文件庫
→ chunking / embedding / retrieval
→ 選 RAG
```

```text
政策不常變，但要固定客服語氣與輸出格式
→ 準備 instruction-response pairs
→ 做 SFT 或 LoRA
→ 選 fine-tuning / PEFT
```

```text
GPU 預算有限、資料不多
→ 不想更新全部權重
→ 加 LoRA adapter，只訓練少量參數
→ 選 LoRA / PEFT
```

### 比較表這樣讀

先看「有沒有改權重」。有改權重才是 fine-tuning / LoRA；沒有改權重、只查外部文件，才是 RAG。

| 項目 | Pretraining | Fine-tuning | PEFT / LoRA | RAG |
|---|---|---|---|---|
| 核心目的 | 建立通用能力 | 調整任務行為 | 低成本調整少量參數 | 查外部知識再回答 |
| 資料量 | TB-scale / trillion tokens | 常見 10K-100K，也可更高 | 常見 1K-10K 起步 | 文件切塊後索引 |
| 是否改權重 | 是 | 是 | 是，但只改少量參數 | 否 |
| 成本 | 最高 | 高 | 低到中 | 不需重訓基礎模型 |
| 更新知識 | 很慢 | 需重訓 | 換 adapter 或再訓 | 更新文件庫即可 |
| 適合情境 | 建立基礎模型 | 風格、格式、任務行為 | 預算有限、快速客製 | 知識常更新、要可追溯 |

#### 4.1 微調資料類型

| 資料類型 | 格式 | 考試關鍵字 |
|---|---|---|
| SFT | instruction / input / response | instruction-response pairs、Alpaca 52K、OpenHermes 2.5 約 1M（早期 1.0 版約 242K） |
| RLHF 偏好資料 | prompt / chosen response / rejected response | chosen/rejected、reward modeling、preference data |
| FLAN | 多任務 instruction tuning | 1.8K tasks、多任務指令調整 |

#### 4.2 DPO (Direct Preference Optimization) 🔥🔥

**一句話**：不需要 Reward Model 和 PPO，直接用偏好資料訓練語言模型的對齊方法。

**RLHF vs DPO 對比**：

| 方法 | 流程 | 特點 |
|---|---|---|
| RLHF | 偏好資料 → 訓練 Reward Model → PPO 強化學習 | 穩定但複雜，需要大量運算 |
| DPO | 偏好資料 → 直接優化 LM | 更簡單，訓練更穩定，2024 年後主流 |

**為何重要**：LLaMA 3、Zephyr、Mistral 等 2024–2026 開源模型大多使用 DPO 進行對齊。IPAS 2026 考試可能區分 RLHF 與 DPO。

**共同點**：兩者都使用 (chosen, rejected) 配對偏好資料。

#### 4.3 PEFT / LoRA

PEFT 是 Parameter-Efficient Fine-Tuning（參數高效微調），只調一小部分參數。LoRA 是 PEFT 常見方法，它加入 low-rank adapter matrices（低秩適配矩陣），不直接更新全部原始權重。

LoRA 的流程可以這樣記：

```text
凍結原始模型權重
→ 在部分 layer 加入 low-rank adapter
→ 只訓練 adapter 參數
→ 推論時把 adapter 套回模型行為
```

常見記憶點：

| 概念 | 重點 |
|---|---|
| LoRA | Low-Rank Adaptation |
| rank `r` | 常見範圍 `4-64`，常見預設可記 `r=8` |
| 優點 | 省記憶體、省訓練成本、適合少量資料快速迭代 |
| 陷阱 | low-rank 不是 low-quality |

### 記憶方式

```text
Pretraining = 讀整座圖書館
Fine-tuning = 上公司訓練課
LoRA = 只加小筆記，不重寫整本書
RAG = 開書查最新手冊
```

### Exam Rule

```text
instruction-response pairs → SFT
chosen / rejected pairs → RLHF 或 DPO（兩者都用同樣偏好資料格式）
chosen / rejected + 不需要 Reward Model → DPO
chosen / rejected + PPO + Reward Model → RLHF
LoRA / adapter / rank r → PEFT
知識常更新、要引用來源、不改權重 → RAG
改變回答風格或固定輸出格式 → fine-tuning / LoRA
```

### Quick Check

題目說：「公司只有 5,000 筆客服指令資料，GPU 預算有限，但想客製模型回答風格。」最適合先想到什麼？

答案：LoRA / PEFT。因為它適合少量資料與較低訓練成本的模型客製化。

---

## 5. RAG 資料管線（Retrieval-Augmented Generation）🔥🔥🔥

### 先懂一句話

RAG 的重點不是重新訓練模型，而是把外部文件整理成可檢索資料庫，回答時先找資料再生成。

### Everyday Analogy

RAG 像開書考。你不用把整本公司手冊背進腦袋，而是考題來時先查最相關段落，再根據段落作答。

### 先問自己一個問題

這題是不是在問：「不重訓模型，怎麼讓回答用到最新或私有文件？」

### 技術說法

RAG（Retrieval-Augmented Generation，檢索增強生成）把外部文件變成可搜尋的向量索引。使用者提問時，系統先檢索相關 chunks，再把這些 chunks 放進 prompt，最後讓生成模型回答。

### 流程 / 選擇流程

```text
Documents
→ chunking
→ embedding
→ vector store
→ retrieval
→ prompt augmentation
→ generation
```

### 一步一步例子：RAG 怎麼走

情境：公司有 500 頁客服 SOP，要讓模型回答最新規定。

```text
Step 1: Chunking
把 500 頁文件切成小段，例如每段 512 tokens。

Step 2: Embedding
把每個 chunk 轉成向量，讓系統可以用語意相似度找資料。

Step 3: Vector Store
把 chunks 和 embeddings 存進 FAISS / Chroma / Weaviate。

Step 4: Retrieval
使用者問問題時，先找最相關 chunks。

Step 5: Prompt Augmentation
把找到的 chunks 放進 prompt。

Step 6: Generation
模型根據 prompt 和檢索內容回答。
```

### 比較表這樣讀

讀 RAG 表格時，只要抓住「切、嵌、存、找、補、答」的順序；考題常把順序打亂來考你。

#### 5.1 RAG 管線

| 步驟 | 做什麼 | 考試記法 |
|---|---|---|
| Chunking | 把長文件切成小片段 | 切 |
| Embedding | 把片段轉成向量 | 嵌 |
| Vector Store | 存 embeddings，支援 similarity search | 存 |
| Retrieval | 找出與問題最相關 chunks | 找 |
| Prompt Augmentation | 把檢索內容放進 prompt | 補 |
| Generation | 由生成模型回答 | 答 |

口訣：`切、嵌、存、找、補、答`

#### 5.2 Chunking 策略

| 策略 | 意思 | 常見關鍵字 |
|---|---|---|
| Fixed-size chunking | 固定 token 長度切分，常見 512 tokens | fixed-size、512 tokens |
| Semantic chunking | 依句子、段落、語意邊界切 | semantic boundary |
| Recursive chunking | 先大後小遞迴切 | recursive splitter、LangChain |
| Recursive character chunking | 依字元與分隔符逐層回退切 | character splitter |

chunk 太大會讓噪音變多，檢索不準；chunk 太小會讓上下文破碎，語意不足。

#### 5.3 Vector Store

FAISS、Chroma、Weaviate 是常見向量資料庫或向量檢索工具。它們負責存放與索引 embeddings，支援 similarity search / semantic retrieval；它們不是語言模型本身。

### 記憶方式

```text
RAG = 不把新知識塞進腦袋，而是回答前先查筆記
chunking = 切筆記
embedding = 做語意座標
vector store = 放進可搜尋資料櫃
retrieval = 找最相關段落
generation = 根據段落回答
```

### Exam Rule

```text
chunking → embedding → vector store → retrieval → prompt augmentation → generation → RAG
FAISS / Chroma / Weaviate → vector store
固定 512 tokens → fixed-size chunking
依句子或段落邊界切 → semantic chunking
更新文件庫即可更新知識 → RAG
```

### Quick Check

題目說：「把公司 FAQ 切塊後轉成 embedding，再放進 FAISS，查詢時找相似片段放進 prompt。」這是哪一種方法？

答案：RAG。因為它的資料流是 chunking、embedding、vector store、retrieval，再生成回答。

---

## 6. 分散式訓練與資源配置（Distributed Training）🔥🔥

### 先懂一句話

分散式訓練是在模型或資料太大時，把工作分給多張 GPU。考試最常問「切的是什麼」：切 batch、切 tensor，還是切模型 stage。

### Everyday Analogy

Data parallelism 像多家分店做同一份菜單但服務不同客人；tensor parallelism 像一份超大料理切給多人同時做不同部分；pipeline parallelism 像中央廚房分成洗菜、切菜、炒菜、裝盒接力。

### 先問自己一個問題

題目說多 GPU 時，先問：「它切的是資料、單一 tensor/layer，還是模型層級 stage？」

### 技術說法

分散式訓練（distributed training）是把訓練工作拆到多張 GPU。資料平行（data parallelism）切 batch；張量平行（tensor parallelism）切單一大型 tensor 或 layer；流水線平行（pipeline parallelism）切模型 stage。

### 流程 / 選擇流程

```text
Large model / large training data
→ choose parallelism strategy
→ train across multiple GPUs
→ synchronize or pass activations
```

### 比較表這樣讀

這張表只看一個軸：`切什麼`。

| 方法 | 切分方式 | 白話記法 | 常見代表 / 關鍵字 |
|---|---|---|---|
| Data Parallelism / DDP | 切 mini-batch，模型複製到每張 GPU | 同一模型，不同資料 | gradient averaging、DDP |
| Tensor Parallelism | 切單一大型 layer 或 tensor | 同一層拆開算 | Megatron-LM、single large layer |
| Pipeline Parallelism | 切模型層或 stage | 模型分段接力 | GPipe、PipeDream、bubble overhead |

```text
Data Parallelism:
GPU1: Model + Batch 1
GPU2: Model + Batch 2
GPU3: Model + Batch 3
→ average gradients

Tensor Parallelism:
Layer W → split across GPU1 / GPU2 / GPU3

Pipeline Parallelism:
Stage 1 → Stage 2 → Stage 3 → Stage 4
```

### 記憶方式

```text
Data Parallelism = 同一模型，不同資料
Tensor Parallelism = 同一層，拆開計算
Pipeline Parallelism = 不同層，接力處理
```

### Exam Rule

```text
同一模型複製多份、不同 GPU 看不同 batch → Data Parallelism / DDP
單一大型 layer 或 tensor 切到多 GPU → Tensor Parallelism
模型層切成 stage，micro-batch 接力 → Pipeline Parallelism
bubble overhead → Pipeline Parallelism
gradient averaging → Data Parallelism
```

### Quick Check

題目說：「每張 GPU 都放同一個模型，但各自處理不同 mini-batch，最後同步梯度。」這是哪一種平行策略？

答案：Data Parallelism / DDP。因為它複製同一模型，切的是資料 batch。

---

## 7. Hugging Face API 與生成流程 🔥🔥

### 先懂一句話

本課看 Hugging Face API 是為了辨認資料流：文字先被 tokenizer 轉成模型輸入，再由 `model.generate()` 產生輸出，最後 decode 回文字。

### Everyday Analogy

tokenizer 像把人類語言翻成機器看的編號，`model.generate()` 才是根據編號產生新內容。

### 先問自己一個問題

這題是在問「文字怎麼進模型」，還是「模型怎麼生出新文字」？

### 技術說法

Hugging Face 的生成流程通常是：tokenizer 先把 prompt 轉成 `input_ids` 和 `attention_mask`，`model.generate()` 再根據輸入產生新的 token ids，最後用 `tokenizer.decode()` 轉回文字。`temperature`、`do_sample`、`max_new_tokens` 是推論/生成參數，不是訓練參數。

### 流程 / 選擇流程

```text
Prompt
→ tokenizer(...)
→ input_ids / attention_mask
→ model.generate(...)
→ generated ids
→ tokenizer.decode(...)
→ answer text
```

### 一步一步例子：generation 怎麼走

```python
inputs = tokenizer("Explain RAG", return_tensors="pt")
output_ids = model.generate(
    inputs["input_ids"],
    max_new_tokens=100,
    do_sample=True,
    temperature=0.7
)
text = tokenizer.decode(output_ids[0])
```

讀這段時照順序看：

```text
tokenizer(...) → 文字變 token ids
return_tensors="pt" → 包成 PyTorch tensor
model.generate(...) → 產生新 token ids
max_new_tokens → 最多生多少新 token
do_sample / temperature → 控制生成隨機性
decode(...) → ids 變回文字
```

### 比較表這樣讀

`pipeline(...)` 表格是在考 task name 對應任務；手動生成表格是在考每個參數出現在流程哪一步。

#### 7.1 `pipeline(...)` task names

| Pipeline task | 對應任務 |
|---|---|
| `"text-generation"` | 文字生成 |
| `"summarization"` | 摘要 |
| `"translation_en_to_fr"` | 翻譯 |
| `"question-answering"` | 問答 |
| `"text2text-generation"` | 文字到文字生成 |
| `"feature-extraction"` | 特徵 / 向量抽取 |
| `"fill-mask"` | 遮罩詞預測 |

#### 7.2 手動生成流程

```python
inputs = tokenizer("prompt", return_tensors="pt")
output = model.generate(
    inputs["input_ids"],
    max_new_tokens=100,
    do_sample=True,
    temperature=0.7
)
```

| 程式片段 | 意思 |
|---|---|
| `tokenizer(...)` | 把文字轉成 token ids |
| `return_tensors="pt"` | 回傳 PyTorch tensor |
| `model.generate(...)` | 進行生成 |
| `max_new_tokens` | 最多生成多少新 token |
| `do_sample=True` | 啟用 sampling |
| `temperature=0.7` | 調整生成隨機性 |

### 記憶方式

```text
tokenizer = 翻成模型編號
generate = 生出新編號
decode = 翻回人看得懂的文字
```

### Exam Rule

```text
return_tensors="pt" → tokenizer 輸出 PyTorch tensor
max_new_tokens / do_sample / temperature → 推論生成參數，不是訓練超參數
pipeline("summarization") → 摘要任務
pipeline("question-answering") → 問答任務
pipeline("feature-extraction") → 特徵 / 向量抽取
```

### Quick Check

題目問：「`temperature=0.7` 和 `max_new_tokens=100` 是訓練階段的 learning rate 嗎？」

答案：不是。它們是 `model.generate()` 推論/生成階段的參數。

---

## 8. Exam Decision Trees

### 8.1 先判斷題目在問哪一層

```text
題目在問生成式 AI 的資料面？
│
├─ 問資料來源很大、TB、trillion tokens？
│  └─ 選 Pretraining Corpus
│
├─ 問資料怎麼變乾淨？
│  ├─ 完全相同 → Exact-match deduplication
│  ├─ 高度相似 → Near-deduplication / MinHash / LSH
│  └─ 文字自然度很怪 → Perplexity filtering
│
├─ 問文字怎麼進模型？
│  └─ 選 Tokenization / tokenizer
│
├─ 問如何客製模型？
│  ├─ 改權重、任務資料 → Fine-tuning / SFT
│  ├─ chosen/rejected → RLHF preference data
│  └─ 少量參數、adapter、rank → LoRA / PEFT
│
└─ 問如何接最新外部知識？
   └─ 選 RAG
```

### 8.2 RAG vs 微調

```text
要不要修改模型權重？
│
├─ 要
│  ├─ 指令-回答資料 → SFT
│  ├─ 偏好比較資料 + PPO / Reward Model → RLHF
│  ├─ 偏好比較資料 + 直接優化、不需 Reward Model → DPO
│  └─ 低成本少量參數 → LoRA / PEFT
│
└─ 不要
   ├─ 文件常更新？
   ├─ 要引用來源？
   └─ 要先查知識庫？
      └─ RAG
```

### 8.3 分散式訓練

```text
題目問多 GPU 怎麼切？
│
├─ 切資料 batch，模型複製多份
│  └─ Data Parallelism / DDP
│
├─ 切單一 layer / tensor
│  └─ Tensor Parallelism
│
└─ 切模型 stage，micro-batch 接力
   └─ Pipeline Parallelism
```

### 8.4 Tokenizer 辨識

```text
題目問分詞器？
│
├─ BERT / DistilBERT
│  └─ WordPiece
│
├─ T5 / mT5 / raw text / 多語 / 不依賴空格
│  └─ SentencePiece
│
├─ OpenAI / cl100k_base / o200k_base
│  └─ tiktoken
│
└─ GPT / byte pair / symbol pair merge
   └─ BPE
```

---

## 9. Trap Clinic

### Trap 1：vocabulary size 等於 corpus size

錯。vocabulary size 是 tokenizer 詞彙表大小；corpus size 是訓練語料總量。

Exam fix：

```text
cl100k_base / 100,277 → vocabulary size
TB-scale / trillion tokens → corpus size
```

### Trap 2：資料越大一定越好

錯。預訓練語料還要看品質、多樣性與授權合規。

Exam fix：

```text
大規模網頁資料 → 還要 cleaning、dedup、quality filtering、license check
```

### Trap 3：RAG 等於微調

錯。RAG 不修改模型權重；微調會修改模型權重或 adapter 參數。

Exam fix：

```text
更新文件庫即可 → RAG
用任務資料訓練模型行為 → Fine-tuning / LoRA
```

### Trap 4：LoRA 的 low-rank 是低品質

錯。low-rank 是參數化方式，不是品質評分。

Exam fix：

```text
LoRA / adapter / rank r → PEFT，省資源客製化
```

### Trap 5：Data Parallelism 是切大型 layer

錯。Data Parallelism 切的是資料 batch；切大型 layer 是 Tensor Parallelism。

Exam fix：

```text
同一模型 + 不同 mini-batch → Data Parallelism
單一 layer / tensor 分到多卡 → Tensor Parallelism
```

### Trap 6：SentencePiece 就等於 Unigram

錯。SentencePiece 是 tokenizer framework，可支援 BPE 或 Unigram。

Exam fix：

```text
SentencePiece → framework
Unigram / BPE → 可被 SentencePiece 支援的子詞模型
```

### Trap 7：向量資料庫是語言模型本身

錯。FAISS、Chroma、Weaviate 是 RAG 檢索基礎設施，用來存 embeddings 與做 similarity search。

Exam fix：

```text
FAISS / Chroma / Weaviate → vector store，不是 LLM 權重
```

### Trap 8：`model.generate()` 參數是訓練超參數

錯。`max_new_tokens`、`do_sample`、`temperature` 是生成階段參數。

Exam fix：

```text
temperature / max_new_tokens / do_sample → inference generation parameters
```

---

## 10. Practice Questions

### 10.1 預訓練語料與清理

**Q1.** 題目看到 Common Crawl、C4、The Pile，最可能在考哪一類概念？

答案：大規模預訓練語料庫。  
理由：這些都是建立基礎模型時常見的語料來源或清理後語料。

**Q2.** 「Open on the internet」是否等於可以自由用於商業模型訓練？

答案：否。  
理由：還要檢查授權、版權、個資與資料治理風險。

**Q3.** MinHash 搭配 LSH 最常用來處理什麼問題？

答案：近似去重 near-deduplication。  
理由：它能在大規模文件中快速找出高度相似但不完全相同的文本。

**Q4.** Perplexity filtering 在本課主要是什麼用途？

答案：資料品質篩選。  
理由：極高 perplexity 可能代表亂碼、低品質或語言混亂文本。

**Q5.** Common Crawl 經清理後語料大幅縮小，代表資料處理失敗嗎？

答案：不是。  
理由：清理與去重會移除低品質、重複或不可用內容，縮小是正常現象。

### 10.2 Tokenization

**Q6.** BERT 最常對應哪一種 tokenizer？

答案：WordPiece。  
理由：BERT / DistilBERT 是 WordPiece 的高頻考試配對。

**Q7.** SentencePiece 對中文、日文、多語模型有什麼優勢？

答案：它不一定依賴空格先切詞，可直接對 raw text 學切法。  
理由：中文與日文沒有像英文一樣穩定以空格分詞。

**Q8.** `tiktoken` 在本課應該被辨識為什麼？

答案：OpenAI 使用的 fast BPE tokenizer 實作。  
理由：它決定文字如何轉 token，常用於 API token 與成本估算。

**Q9.** vocabulary size 與 corpus size 最大差別是什麼？

答案：vocabulary size 是詞彙表大小；corpus size 是訓練語料總量。  
理由：兩者不是同一個量級概念。

### 10.3 微調、LoRA 與 RAG

**Q10.** 題目出現 instruction-response pairs，最可能在考哪種資料？

答案：SFT 監督式微調資料。  
理由：SFT 常用指令與回答配對教模型如何回應。

**Q11.** 題目出現 `chosen response` 和 `rejected response`，最可能在考什麼？

答案：偏好資料（可用於 RLHF 或 DPO）。  
理由：這種資料是在比較哪個回答比較好。若搭配 Reward Model 則是 RLHF；若直接優化語言模型則是 DPO。

**Q12.** 公司知識每週更新，要求答案可追溯來源，最適合什麼方法？

答案：RAG。  
理由：RAG 可更新外部文件庫，回答時檢索來源，不必重訓模型。

**Q13.** LoRA 的 rank `r` 代表什麼方向的概念？

答案：低秩 adapter 的參數化設定。  
理由：它是 PEFT 中控制可訓練 adapter 大小的概念，不是品質高低。

**Q14.** 「把文件切塊、embedding、放入 Chroma，再檢索」是哪一種管線？

答案：RAG 資料管線。  
理由：Chroma 是 vector store，搭配 chunking 與 retrieval 是 RAG 典型流程。

### 10.4 分散式訓練與 API

**Q15.** 每張 GPU 都放同一個模型，但處理不同 batch，最後平均梯度，這是什麼？

答案：Data Parallelism / DDP。  
理由：它切的是資料 batch，模型被複製到多張 GPU。

**Q16.** 單一大型 layer 被切到多張 GPU 上運算，這是什麼？

答案：Tensor Parallelism。  
理由：它切的是 layer 或 tensor，不是資料 batch。

**Q17.** 模型分成多個 stage，micro-batch 像接力一樣往後傳，這是什麼？

答案：Pipeline Parallelism。  
理由：它切的是模型階段，常見關鍵字包含 GPipe、PipeDream、bubble overhead。

**Q18.** `return_tensors="pt"` 代表什麼？

答案：tokenizer 回傳 PyTorch tensor。  
理由：`pt` 是 PyTorch 格式，讓模型可以直接接收輸入。

**Q19.** `max_new_tokens`、`do_sample`、`temperature` 是訓練超參數嗎？

答案：不是。  
理由：它們是 `model.generate()` 的推論/生成參數。

**Q20.** `pipeline("feature-extraction")` 最接近哪一種任務？

答案：特徵或向量抽取。  
理由：feature extraction 不是直接做摘要或翻譯，而是取出可用於後續任務的表示。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. L22403 是從資料面看生成式 AI，不是考 Transformer 權重數學。
2. 預訓練語料看規模、品質、多樣性與授權合規；資料大不等於資料好。
3. 語料進模型前要清理、去重、過濾，再 tokenization；MinHash 是 near-dedup，perplexity filtering 是品質篩選。
4. BPE 常連到 GPT，WordPiece 常連到 BERT，SentencePiece 適合 raw text / 多語，tiktoken 是 OpenAI tokenizer。
5. Pretraining 是大量讀，fine-tuning 是調整回答行為，LoRA 是省資源改少量參數，RAG 是先查外部文件再回答。
6. RAG 管線是切、嵌、存、找、補、答；vector store 不是語言模型本身。
7. 分散式訓練先看切什麼：切 batch 是 data parallel，切 tensor 是 tensor parallel，切 stage 是 pipeline parallel。

---

## Final Study Advice

考試時先不要急著背名詞。先判斷題目描述的是資料來源、資料清理、tokenizer、微調/RAG 選擇、分散式訓練，還是 API 資料流；只要抓到「題目在問哪一層」，多數選項就能快速排除。

# L21101 自然語言處理技術與應用 — Study Guide v2

> 目標：用「先理解，再判斷考題」的方式準備 iPAS AI 應用規劃師中級 L21101。

這份版本不是百科式整理，而是考試訓練路線。每個主要主題都照這個閱讀順序：

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 一步一步例子
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check
```

---

## 0. How to Use This Guide

建議讀法：

1. 先讀 Section 1 的 NLP pipeline，建立整體地圖。
2. Section 2-5 照順序讀，因為這就是文字進入模型後的處理順序。
3. Section 6-7 開始練任務判斷：看到題目描述，要能選架構、任務或 RAG。
4. Section 8-9 用來考前排除陷阱。
5. Section 10 當作考前練習題。
6. 考試當天快速複習 `Final Oral Recall`、`Exam Decision Trees`、`Trap Clinic`。

### 火力標記

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. The NLP Pipeline 自然語言處理流程 🔥🔥🔥

### 先懂一句話

NLP（Natural Language Processing，自然語言處理）就是讓電腦把「人類文字」轉成「模型能計算的訊號」，再依任務輸出分類、摘要、翻譯、答案或生成文字。

### Everyday Analogy

NLP pipeline 像一條料理線：原始文字是食材，tokenization 是切材料，embedding 是把材料編成可計算格式，Transformer 才是真正理解句子結構與上下文的主廚。

### 先問自己一個問題

題目問的是哪一段？

```text
切文字？
變數字？
理解上下文？
選 BERT/GPT/T5？
查文件後回答？
```

### 技術說法

自然語言不能直接丟進模型。常見流程是：

```text
Raw text 原始文字
→ Tokenization 斷詞 / 切 token
→ Embedding 詞嵌入 / 向量化
→ Transformer / Attention 理解上下文
→ Architecture family 架構家族
→ Task output 任務輸出
```

### 流程 / 選擇流程

```text
看到「文字怎麼切」→ Tokenization
看到「文字怎麼變成模型能算」→ Embedding
看到「上下文、長距依賴、Q/K/V（Query/Key/Value，查詢/鍵/值）」→ Transformer / Attention
看到「理解、分類、NER」→ Encoder-only / BERT
看到「對話、續寫、生成」→ Decoder-only / GPT
看到「翻譯、摘要、seq2seq」→ Encoder-decoder / T5/BART
看到「查公司文件、引用來源」→ RAG（Retrieval-Augmented Generation，檢索增強生成）
```

### 一步一步例子

```text
句子：這家餐廳服務很好

Step 1 Raw text：這家餐廳服務很好
Step 2 Tokenization：這家 / 餐廳 / 服務 / 很好
Step 3 Embedding：每個 token 變成向量
Step 4 Transformer：理解「服務很好」是在表達正面情緒
Step 5 Task output：Sentiment = positive
```

### 比較表這樣讀

這張表不是背名詞用的，而是看到題目關鍵字時用來定位流程。

| 題目問的是 | 想到 | 考試判斷 |
|---|---|---|
| 文字怎麼切 | Tokenization | 還沒變成向量 |
| 文字怎麼變成數字 | Embedding | token 轉向量 |
| 模型怎麼看上下文 | Self-attention / Transformer | Q/K/V、長距依賴 |
| 任務該選哪個模型 | Encoder-only / Decoder-only / Encoder-decoder | 先看輸出形式 |
| 如何查文件後回答 | RAG | 檢索 → 增強 → 生成 |

### 記憶方式

```text
切字看 tokenization
變數字看 embedding
懂上下文看 Transformer
理解分類找 BERT
續寫對話找 GPT
翻譯摘要找 T5/BART
查資料再回答找 RAG
```

### Exam Rule

```text
Raw text 不能直接計算 → 先 tokenization，再 embedding
題目問流程順序 → Raw text → Tokenization → Embedding → Transformer → Task output
題目問任務選型 → 先看輸出形式，不要只背模型名稱
```

### Quick Check

如果題目問「為什麼模型不能直接處理文字，必須先轉成數字？」這是在問 pipeline 的哪一段？

答案：`Embedding`。因為 embedding 負責把 token 轉成模型能計算的數字向量。

---

## 2. Tokenization 斷詞 / 切 Token 🔥🔥

### 先懂一句話

Tokenization 是把原始文字切成模型可以處理的小單位，這些小單位叫 `token`。

### Everyday Analogy

Tokenization 像把一份便當切成一口大小。模型不能一口吞完整句子，所以 tokenizer 先把文字切成適合處理的小塊。

### 先問自己一個問題

這題是在問「怎麼切文字」，還是在問「切完後怎麼計算」？

如果是切文字，就是 tokenization；如果是切完變向量，就是 embedding。

### 技術說法

Tokenization 只負責把文字切成 token，還沒有把 token 變成向量。

```text
I am playing basketball
→ I / am / play / ##ing / basketball
```

`##ing` 表示它不是一個新詞的開頭，而是接在前面 token 後面的片段。

### 流程 / 選擇流程

```text
Raw text → Tokenization → Embedding
```

選切法時先看題目需求：

```text
有明確空格、詞彙穩定 → Word-level
新詞、罕見詞、專有名詞、OOV（Out-of-Vocabulary，字典外詞）→ Subword
幾乎不能有 OOV（Out-of-Vocabulary，字典外詞），但可接受序列很長 → Character-level
```

### 一步一步例子

```text
例子：unbelievable

Word-level：
unbelievable
→ 如果字典沒有這個詞，可能變成 OOV / [UNK]

Character-level：
u / n / b / e / l / i / e / v / a / b / l / e
→ 幾乎不會 OOV，但序列太長

Subword：
un / believe / able
→ 能處理新詞，又不會切得太碎
```

中文也要注意：

```text
我喜歡自然語言處理
→ 我 / 喜歡 / 自然語言處理
```

中文沒有天然空格，所以不能只靠 space 切詞。

### 比較表這樣讀

先看「會不會 OOV」與「序列會不會太長」。

| 切法 | 白話 | 適合情境 | 主要問題 |
|---|---|---|---|
| Word-level | 一個完整詞一個 token | 詞彙固定、語言有空格 | 遇到字典外詞 OOV；中文不能只靠空格 |
| Subword | 把詞拆成有意義的小片段 | 現代主流；新詞、罕見詞、專有名詞 | 需要 tokenizer 訓練與 vocab |
| Character-level | 一個字元一個 token | 幾乎不能接受 OOV | 序列太長、效率差 |

Subword 三大方法要用「模型線索」讀：

| 方法 | 常見模型 | 考試記法 |
|---|---|---|
| BPE（Byte Pair Encoding，位元組對編碼） | GPT / Llama / Qwen / Gemma / RoBERTa | 合併常一起出現的字元或子字元 pair；RoBERTa 使用 Byte-level BPE，不產生 `##` 前綴 |
| WordPiece | BERT / DistilBERT | BERT 常見；常看到 `##` 非詞首標記 |
| Unigram LM（Unigram Language Model，一元語言模型） | T5 / XLNet / ALBERT / mT5 | 常透過 SentencePiece 實作；適合無空白語言 |

常見陷阱用這張表排除：

| 錯誤說法 | 正確觀念 |
|---|---|
| 中文可以直接用空格切詞 | 中文沒有天然空格，不能只靠 space |
| SentencePiece 是一種模型 | SentencePiece 是 tokenizer 工具，不是模型 |
| 所有 Transformer 都用同一種 tokenizer | tokenizer 和模型權重通常是配套的 |

### 記憶方式

```text
BPE → GPT / RoBERTa
WordPiece → BERT / ## 前綴
Unigram → T5 / SentencePiece
```

`SentencePiece` 要記成工具 / library；`Unigram` 才是方法。T5 / ALBERT / XLNet 常見線索是 SentencePiece + Unigram。

### 中文 NLP 補充：CKIP 🔥

**CKIP（Chinese Knowledge Information Processing，中研院中文知識庫計劃）** 是台灣常被引用的繁體中文 NLP 工具組，提供：

- **中文斷詞**（Word Segmentation）
- **詞性標記**（POS Tagging）
- **命名實體識別**（NER, Named Entity Recognition）

考試記法：台灣 AI 情境提到繁體中文斷詞或中文 NLP 基礎工具 → CKIP（中研院）。

### Exam Rule

```text
OOV / 新詞 / 罕見詞 / 專有名詞 → Subword tokenization
BERT / ## 前綴 → WordPiece
GPT / byte-level → BPE
T5 / SentencePiece / 無空白語言 → Unigram
繁體中文斷詞工具 / 台灣中文 NLP → CKIP
```

### Quick Check

如果題目說「模型要處理新品牌名與罕見專有名詞」，最可能考哪個概念？

答案：`Subword tokenization`。因為 subword 能減少 OOV，又不會像 character-level 那麼長。

---

## 3. Word Embeddings 詞嵌入 🔥🔥

### 先懂一句話

Word embedding 是把 token 轉成數字向量，因為模型只能計算數字。

### Everyday Analogy

Embedding 像把每個詞放到地圖上的座標。意思接近的詞會靠得比較近，意思差很多的詞會離得比較遠。

### 先問自己一個問題

同一個詞在不同句子中，意思會不會需要變？

如果不會變，是 static embedding；如果會依上下文改變，是 contextualized embedding。

### 技術說法

Embedding 把每個 token 轉成向量（vector）：

```text
cat → [0.2, 0.8, -0.1]
dog → [0.3, 0.7, -0.2]
car → [-0.6, 0.1, 0.9]
```

意思接近的詞，向量距離通常也比較近。

### 流程 / 選擇流程

```text
Tokenization → Embedding → Transformer
```

考題選法：

```text
固定向量 / 查表 / Skip-gram / CBOW → word2vec
共現矩陣 / global co-occurrence → GloVe
同一個詞因上下文有不同意思 → Contextualized embedding → BERT / ELMo
```

### 一步一步例子

用 `bank` 理解一詞多義：

```text
river bank → 河岸
money bank → 銀行
```

Static embedding：

```text
bank 永遠同一個向量
→ 分不出河岸與銀行
```

Contextualized embedding：

```text
bank 先看上下文
→ river bank 的 bank 變成河岸語意
→ money bank 的 bank 變成銀行語意
```

### 比較表這樣讀

先看「同一個詞的向量是否會依上下文改變」。

| 類型 | 核心概念 | 代表方法 | 能否處理一詞多義 |
|---|---|---|---|
| Static embedding | 同一個詞永遠同一個向量 | word2vec / GloVe | 不能 |
| Contextualized embedding | 同一個詞會依上下文產生不同向量 | ELMo / BERT | 可以 |

四個代表方法：

| 方法 | 類型 | 考試關鍵字 |
|---|---|---|
| word2vec | 靜態 | 預測型；根據附近詞學向量 |
| GloVe | 靜態 | 共現統計型；看全域共現矩陣 |
| ELMo | 語境化 | 雙向 LSTM |
| BERT | 語境化 | Transformer encoder + MLM |

word2vec 內部兩種訓練法：

| 方法 | 白話 | 考試記法 |
|---|---|---|
| Skip-gram | 給中心詞，預測周圍詞 | 中心猜旁邊；適合小資料、冷門詞 |
| CBOW | 給周圍詞，預測中心詞 | 旁邊猜中心；訓練較快 |

### 記憶方式

```text
word2vec = 預測附近詞
GloVe = 看全域共現統計
ELMo / BERT = 看上下文，所以能處理一詞多義
```

### Exam Rule

```text
固定向量 / 查表 / Skip-gram / CBOW → word2vec
共現矩陣 / count-based / global statistics → GloVe
一詞多義 / 上下文改變意思 → BERT / ELMo
```

### Quick Check

如果題目問「哪種 embedding 可以分辨 bank 在銀行與河岸中的不同意思？」答案方向是什麼？

答案：`Contextualized embedding`，例如 `BERT / ELMo`。因為它會根據上下文改變同一個詞的向量。

---

## 4. Transformer and Attention 🔥🔥🔥

### 先懂一句話

Transformer 是用 attention 讓模型判斷「每個 token 應該注意句子裡哪些其他 token」的架構。

### Everyday Analogy

Self-attention 像小組討論。每個人都能同時看其他人的訊息，再判斷哪些訊息最重要；不是只能照座位順序一個一個聽。

### 先問自己一個問題

這題是在問：

```text
上下文怎麼互相影響？
長距依賴怎麼處理？
Q/K/V 是什麼？
為什麼需要位置資訊？
為什麼 Transformer 比 RNN 容易平行化？
```

如果是這些，就是 Transformer / Attention。

### 技術說法

RNN（Recurrent Neural Network，循環神經網路）/ LSTM（Long Short-Term Memory，長短期記憶網路）像一個字一個字照順序讀；Transformer 可以讓整句話的 token 同時彼此參考。

```text
Embedding → Transformer → Task output
```

Transformer 不負責切詞，也不負責把文字變數字。它負責讓向量吸收上下文。

### 流程 / 選擇流程

Transformer 內部可以這樣看：

```text
Token embeddings
→ 加入 positional encoding
→ self-attention 計算 token 彼此重要性
→ multi-head attention 從多個角度看關係
→ feed-forward / normalization
→ 輸出 contextualized representation
```

Attention 的 Q/K/V 流程：

```text
每個 token 產生 Query / Key / Value
→ Q 和 K 算相關性
→ softmax 變成權重
→ 用權重加總 V
→ 得到融入上下文的新表示
```

公式：

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) · V
```

`/ sqrt(d_k)` 是縮放，避免分數太大讓 softmax 太極端，訓練變不穩。

### 一步一步例子

句子：

```text
The animal did not cross the street because it was tired.
```

模型要理解 `it` 指誰：

```text
Step 1 it 產生 Query：我想找「誰很累」
Step 2 animal / street 等 token 產生 Key：我身上有哪些可被比對的特徵
Step 3 Q 和 K 比對後，it 對 animal 權重較高
Step 4 加權 Value 後，it 的表示吸收 animal 的語意
```

順序也很重要：

```text
我打你
你打我
```

這兩句 token 很像，但順序不同，意思完全不同。所以 Transformer 要加入 positional encoding 或 positional embedding。

### 比較表這樣讀

Attention 名詞先看「問的是加權方式、同句互看，還是多角度」。

| 名稱 | 問的是什麼 | 白話 |
|---|---|---|
| Soft attention | 怎麼加權 | 全部 token 都看，只是權重不同 |
| Self-attention | 看誰 | 同一句話內 token 彼此互看 |
| Multi-head attention | 看幾種角度 | 同時做多組 attention |

Transformer vs RNN/LSTM 先看「順序處理」與「長距依賴」。

| 面向 | RNN/LSTM | Transformer |
|---|---|---|
| 處理方式 | 循序 sequential | 平行 parallel |
| 長距依賴 | 較難保留遠距資訊 | token 可直接互相注意 |
| 訓練速度 | 較慢 | 較快 |
| GPU 利用率 | 較低 | 較高 |

### 記憶方式

```text
Q = 我想找什麼
K = 我有什麼特徵可被找到
V = 你關注我後，我提供什麼內容

Self-attention = 同一句話互看
Multi-head = 多個角度一起看
Positional encoding = 補上順序感
```

### Exam Rule

```text
Q/K/V → Self-attention
長距依賴 / 平行運算 / 取代 RNN → Transformer
沒有順序感 / 需要順序資訊 → Positional Encoding
同一句話內互看 → Self-attention
多個角度一起看 → Multi-head attention
```

### Quick Check

如果題目說「Transformer 為什麼比 RNN 更適合長文本？」應該提到哪些關鍵詞？

答案：`self-attention`、平行運算、長距依賴。Transformer 讓 token 直接彼此注意，不必像 RNN 一樣逐步傳遞資訊。

---

## 5. Three Transformer Families 三大 Transformer 家族 🔥🔥🔥

### 先懂一句話

Transformer 架構可以分成三大家族：`Encoder-only`、`Decoder-only`、`Encoder-decoder`。考試通常不是問你背模型，而是問你能不能從任務選對家族。

### Everyday Analogy

把三大家族想成三種角色：`BERT`（Bidirectional Encoder Representations from Transformers，雙向 Transformer 編碼器表徵）是閱讀理解高手，擅長看完整段文字後判斷；`GPT`（Generative Pre-trained Transformer，生成式預訓練 Transformer）是接話寫作高手，擅長根據前文往後寫；`T5`（Text-to-Text Transfer Transformer，文字到文字轉換 Transformer）/ `BART`（Bidirectional and Auto-Regressive Transformers，雙向與自迴歸 Transformer）是改寫與翻譯高手，擅長把一段文字變成另一段文字。

### 先問自己一個問題

任務的輸出是什麼？

```text
輸出類別或原文片段？→ BERT
輸出下一段新文字？→ GPT
輸入文字變成另一段文字？→ T5/BART
```

### 技術說法

三大家族：

```text
Encoder-only
Decoder-only
Encoder-decoder
```

### 流程 / 選擇流程

```text
先看輸出形式
│
├─ 類別 / 標籤 / 原文片段
│  └─ Encoder-only / BERT
│
├─ 根據前文繼續生成
│  └─ Decoder-only / GPT
│
└─ 一段文字轉成另一段文字
   └─ Encoder-decoder / T5/BART
```

### 一步一步例子

```text
任務 A：判斷評論是正面還是負面
Step 1 輸出是類別
Step 2 這是理解類任務
Step 3 選 Encoder-only / BERT

任務 B：根據聊天紀錄生成下一句
Step 1 輸出是接續文字
Step 2 這是自回歸生成
Step 3 選 Decoder-only / GPT

任務 C：把英文新聞翻成中文摘要
Step 1 輸入文字要變另一段文字
Step 2 這是 seq2seq
Step 3 選 Encoder-decoder / T5/BART
```

### 比較表這樣讀

這張表請用「看文字方式 → 擅長任務」來讀。

| 架構 | 代表模型 | 看文字方式 | 擅長任務 |
|---|---|---|---|
| Encoder-only | BERT / RoBERTa | 雙向理解 | 分類、情感分析、NER、抽取式 QA |
| Decoder-only | GPT / Llama / Qwen | 單向生成 | 對話、續寫、few-shot、通用生成 |
| Encoder-decoder | T5 / BART / mT5 | encoder 理解，decoder 生成 | 翻譯、摘要、生成式 QA |

訓練目標用模型線索讀：

| 訓練目標 | 白話 | 對應架構 |
|---|---|---|
| MLM（Masked Language Modeling，遮罩語言模型） | 遮住部分 token，猜回來 | Encoder-only / BERT |
| Causal LM（Causal Language Model，因果語言模型） / Next-token | 給前文，猜下一個 token | Decoder-only / GPT |
| Span corruption（sentinel token） | 用 `<extra_id_n>` 取代連續 span，還原被遮住的片段 | Encoder-decoder / T5 |
| Multi-noise Denoising | 文字填充、token 刪除、句子換序、文件旋轉等多種雜訊組合，還原原文 | Encoder-decoder / BART |

NLP 評估指標補充：

| 指標 | 全名 | 用於哪種任務 | 考試記法 |
|---|---|---|---|
| BLEU | Bilingual Evaluation Understudy | 機器翻譯、文字生成品質評估 | 翻譯 → BLEU |
| ROUGE | Recall-Oriented Understudy for Gisting Evaluation | 自動摘要評估 | 摘要 → ROUGE |

### 記憶方式

```text
BERT = 看懂整句，適合理解類任務
GPT = 根據前文往後寫，適合生成類任務
T5/BART = 先讀懂再改寫，適合 seq2seq 任務

T5 → sentinel span corruption
BART → 多種 denoising 雜訊
```

### Exam Rule

```text
雙向 / 理解 / 分類 / NER / 抽取式 QA → Encoder-only / BERT
單向 / autoregressive / next-token / 對話 / 續寫 → Decoder-only / GPT
翻譯 / 摘要 / seq2seq / 可變長輸入輸出 → Encoder-decoder / T5/BART
機器翻譯評估 → BLEU
摘要評估 → ROUGE
```

### Quick Check

如果任務是「把英文文章翻成中文摘要」，你會選哪一類架構？

答案：`Encoder-decoder / T5/BART`。因為這是輸入文字變成另一段文字的 seq2seq 任務。

---

## 6. NLP Tasks and Architecture Selection 任務與架構選型 🔥🔥🔥

### 先懂一句話

選 NLP 架構時，先看任務的輸出形式，不要先背模型名稱。

### Everyday Analogy

選 NLP 架構像選工具。要判斷評論好壞就用「分類工具」BERT；要寫下一句回覆就用「寫作工具」GPT；要翻譯或摘要就用「改寫工具」T5/BART。

### 先問自己一個問題

題目的答案長什麼樣？

```text
一個類別？
原文中的片段？
新寫出來的一段文字？
另一種語言或摘要？
需要先查資料？
```

### 技術說法

任務選型的核心是 output type：

```text
輸出類別 → BERT
輸出原文片段 → BERT
輸出新文字 → GPT 或 T5/BART
輸入文字變另一段文字 → T5/BART
需要查文件再回答 → RAG
```

### 流程 / 選擇流程

```text
先看輸出形式 / scenario requirement
→ 判斷任務類型
→ 選方法、模型、架構、工具
```

更細的判斷：

```text
類別 → Text classification / Sentiment analysis → BERT
人名、地名、日期、金額 → NER → BERT
答案在原文中 → Extractive QA → BERT
對話續寫 → Chat / continuation → GPT
翻譯或生成式摘要 → seq2seq → T5/BART
查文件再回答 → RAG
```

### 一步一步例子

```text
題目：從客服訊息中抽出訂單編號、日期、金額。

Step 1 看輸出：訂單編號、日期、金額是文字中的特定欄位
Step 2 判斷任務：這是命名實體識別 NER
Step 3 選架構：Encoder-only / BERT 類模型常用
```

```text
題目：把一篇長文章用自己的話整理成短摘要。

Step 1 看輸出：新寫出來的摘要，不只是挑原句
Step 2 判斷任務：Abstractive summarization
Step 3 選架構：Encoder-decoder / T5/BART
```

### 比較表這樣讀

這張表請先讀「輸出」，再讀「常見架構」。

| 任務 | 輸入 | 輸出 | 常見架構 |
|---|---|---|---|
| Text classification | 一段文字 | 類別 | Encoder-only / BERT |
| Sentiment analysis | 評論 | 正面 / 負面 / 中性 | Encoder-only / BERT |
| NER | 一段文字 | 人名、地名、組織、日期等標記 | Encoder-only / BERT |
| Extractive QA | 問題 + 文章 | 原文中的答案片段 | Encoder-only / BERT |
| Abstractive summarization | 長文章 | 新寫出的摘要 | Encoder-decoder / T5/BART |
| Machine translation | 一種語言 | 另一種語言 | Encoder-decoder / T5/BART |
| Chat / continuation | 前文 | 下一段生成文字 | Decoder-only / GPT |

摘要任務特別容易考，先分「抽取式」與「生成式」。

| 類型 | 做法 | 架構 |
|---|---|---|
| Extractive summary | 從原文挑重要句子 | 可用 encoder-only |
| Abstractive summary | 用自己的話重寫 | 典型 encoder-decoder |

Fine-tuning 與 PEFT 用「要更新多少參數」來讀：

| 方式 | 白話 | 代表方法 |
|---|---|---|
| Full fine-tuning | 更新模型全部參數 | 效果好，但計算與記憶體成本高 |
| PEFT（Parameter-Efficient Fine-Tuning） | 只更新少量新增參數，凍結大部分權重 | LoRA、Adapter、Prompt Tuning |

**LoRA（Low-Rank Adaptation）**：在原本權重矩陣旁邊插入低秩矩陣，只訓練新插入的參數，不動原始模型權重。資源受限環境（如邊緣裝置或預算有限的微調）的常見選擇。

### 記憶方式

```text
分類情緒 → BERT
抽人名日期金額 → NER → BERT
答案在原文 → Extractive QA → BERT
用自己的話摘要 → T5/BART
翻譯 → T5/BART
聊天續寫 → GPT
資源受限微調 → PEFT / LoRA
```

### Exam Rule

```text
判斷好評負評 → Sentiment analysis → BERT
抽出人名公司日期 → NER → BERT
答案在原文中 → Extractive QA → BERT
用自己的話摘要 → Abstractive summary → T5/BART
翻譯 → Machine translation → T5/BART
聊天續寫 → GPT
資源受限 / 不想更新全部參數 / 大型模型微調 → PEFT / LoRA
```

### Quick Check

題目說「從客服訊息中抽出訂單編號、日期、金額」，這是哪種 NLP 任務？

答案：`NER`。因為它要從文字中抽出特定實體或欄位。

---

## 7. RAG and Modern QA 檢索增強生成 🔥

### 先懂一句話

RAG（Retrieval-Augmented Generation，檢索增強生成）是「先查資料，再讓 LLM（Large Language Model，大型語言模型）回答」。

### Everyday Analogy

RAG 像開書考。你不是只靠記憶回答，而是先翻課本或公司文件找到相關內容，再根據查到的資料作答。

### 先問自己一個問題

題目有沒有強調「最新資料、公司內部文件、引用來源、降低幻覺」？

有的話，通常就是 RAG。

### 技術說法

RAG 把檢索系統和生成模型接起來：

```text
Retrieval 檢索
→ Augmentation 把檢索結果放進 prompt
→ Generation 生成答案
```

純 LLM 可能有兩個問題：

1. 不知道最新資料。
2. 可能幻覺，講得像真的但沒有依據。

RAG 的做法是先查公司文件、知識庫、網頁或資料庫，再把查到的內容交給模型回答。

### 流程 / 選擇流程

```text
使用者問題
→ 檢索相關文件 / 片段
→ 把檢索結果放進 prompt
→ LLM 根據資料生成答案
→ 回答可附來源或引用
```

選 RAG 的判斷：

```text
只需要一般生成 → GPT 類生成模型
需要根據指定文件回答 → RAG
需要最新或內部資料 → RAG
需要降低幻覺、附引用來源 → RAG
```

### 一步一步例子

```text
題目：客服系統要回答公司最新退貨政策，並附上文件來源。

Step 1 最新退貨政策可能不在模型訓練資料中
Step 2 題目要求附文件來源
Step 3 先檢索公司知識庫
Step 4 把相關政策片段放進 prompt
Step 5 LLM 根據片段生成答案
Step 6 選 RAG
```

### 比較表這樣讀

先看「答案是否必須依據外部資料」。

| 場景 | 為什麼適合 RAG |
|---|---|
| 公司內部 QA | 需要根據內部文件回答 |
| 最新政策查詢 | 模型訓練資料可能過時 |
| 法規、產品文件查詢 | 需要引用來源 |
| 客服知識庫 | 要降低亂回答風險 |

### 記憶方式

```text
RAG = Retrieval → Augmentation → Generation
RAG = 查資料後再回答
```

### Exam Rule

```text
最新資料 / 公司文件 / 引用來源 / 減少幻覺 → RAG
RAG 三步驟 → 檢索 → 增強 → 生成
```

### Quick Check

如果題目說「模型回答前要先搜尋公司內部文件，並附上引用來源」，這是哪個架構概念？

答案：`RAG`。因為它是「檢索 → 增強 → 生成」，適合查文件後再回答。

---

## 8. Exam Decision Trees

### 8.1 任務選型決策樹

```text
題目是在問 NLP 任務嗎？
│
├─ 輸出是一個類別？
│  └─ 是 → Text classification / Sentiment analysis → BERT
│
├─ 輸出是原文中的實體或答案片段？
│  └─ 是 → NER / Extractive QA → BERT
│
├─ 輸出是新生成的文字？
│  ├─ 對話 / 續寫 / few-shot → GPT
│  └─ 翻譯 / 摘要 / seq2seq → T5/BART
│
└─ 需要先查文件再回答？
   └─ 是 → RAG
```

### 8.2 概念判斷決策樹

```text
題目關鍵字是什麼？
│
├─ OOV / 新詞 / 專有名詞 → Subword tokenization
├─ BPE / WordPiece / Unigram → Tokenizer
├─ 固定向量 / 一詞多義 → Embedding
├─ Q/K/V / softmax / attention → Self-attention
├─ 位置順序 → Positional Encoding
├─ MLM / causal LM / span corruption → Training objective
└─ BERT / GPT / T5 → Architecture family
```

### 8.3 最短判斷口訣

```text
切字看 tokenization
變數字看 embedding
懂上下文看 Transformer
理解分類找 BERT
續寫對話找 GPT
翻譯摘要找 T5/BART
查資料再回答找 RAG
```

---

## 9. Trap Clinic

### Trap 1：Transformer 是一個模型

錯。Transformer 是架構，BERT / GPT / T5 才是模型。

```text
架構：Transformer
模型：BERT / GPT / T5 / BART / Llama
```

Exam fix：

```text
題目把 Transformer 和 BERT/GPT/T5 並列時，要先分清楚層級。
```

### Trap 2：BERT 可以自然生成長文

錯。BERT 是 encoder-only，擅長理解，不擅長自回歸長文生成。

Exam fix：

```text
分類 / NER / 抽取式 QA → BERT
對話 / 續寫 / 長文生成 → GPT
翻譯 / 摘要 → T5/BART
```

### Trap 3：word2vec 可以處理一詞多義

錯。word2vec 是靜態 embedding，同一個詞永遠同一個向量。

Exam fix：

```text
一詞多義 / 上下文不同 → BERT / ELMo
```

### Trap 4：GPT 是雙向模型

錯。GPT 是 decoder-only / causal / autoregressive，只看前文預測後文。

Exam fix：

```text
雙向理解 → BERT
單向生成 → GPT
```

### Trap 5：摘要任務一定選 BERT

錯。要先分抽取式還是生成式。

```text
從原文挑句子 → Extractive → 可用 BERT
用自己的話重寫 → Abstractive → T5/BART
```

### Trap 6：Attention 自帶順序資訊

錯。Self-attention 本身不自帶順序感，需要 positional encoding。

Exam fix：

```text
順序 / 位置 / 我打你 vs 你打我 → Positional Encoding
```

### Trap 7：GloVe 和 word2vec 都是預測型

錯。

```text
word2vec → 預測型
GloVe → 共現統計型
```

### Trap 8：SentencePiece 是模型或固定演算法

錯。SentencePiece 是 tokenizer 工具，可以實作 BPE 或 Unigram。T5 常見是 Unigram via SentencePiece。

---

## 10. Practice Questions

### 10.1 Tokenization

**Q1.** 模型需要處理大量新品牌名稱與罕見專有名詞，最適合的 tokenization 策略是什麼？

答案：Subword tokenization。  
理由：能減少 OOV，又不會像 character-level 那麼長。

**Q2.** 題目出現 BERT tokenizer 與 `##ing` 前綴，應想到哪個方法？

答案：WordPiece。  
理由：BERT 家族常用 WordPiece，非詞首 subword 常用 `##`。

**Q3.** T5 / XLNet / ALBERT 常見 tokenizer 實作工具是什麼？

答案：SentencePiece。  
注意：考試要知道 SentencePiece 是工具，常見方法是 Unigram。

### 10.2 Embeddings

**Q4.** 哪種 embedding 無法分辨 `bank` 是河岸還是銀行？

答案：Static embedding，例如 word2vec / GloVe。  
理由：同一個詞永遠同一個向量。

**Q5.** 題目強調同一個詞在不同上下文有不同意思，應選哪類 embedding？

答案：Contextualized embedding，例如 BERT / ELMo。

**Q6.** word2vec 和 GloVe 最大差異是什麼？

答案：word2vec 是預測型；GloVe 是共現統計型。

### 10.3 Transformer

**Q7.** Q/K/V 出現時，通常是在考哪個概念？

答案：Self-attention。

**Q8.** 為什麼 attention 公式要除以 `sqrt(d_k)`？

答案：縮放分數，避免 softmax 太極端，使訓練較穩定。

**Q9.** Transformer 為什麼需要 positional encoding？

答案：Self-attention 本身不自帶順序感，需要額外加入位置資訊。

### 10.4 Architecture Selection

**Q10.** 判斷一則餐廳評論是正面還是負面，應選哪種架構？

答案：Encoder-only / BERT。  
理由：輸出是類別，是理解類任務。

**Q11.** 從文章中抽出人名、公司名、日期，這是哪個任務？常用架構是什麼？

答案：NER；Encoder-only / BERT。

**Q12.** 根據前面聊天紀錄生成下一句回覆，應選哪種架構？

答案：Decoder-only / GPT。  
理由：對話與續寫是自回歸生成。

**Q13.** 把英文新聞翻成中文，應選哪種架構？

答案：Encoder-decoder / T5/BART。  
理由：翻譯是 seq2seq 任務。

**Q14.** 把一篇長文章用自己的話整理成短摘要，應選哪種架構？

答案：Encoder-decoder / T5/BART。  
理由：生成式摘要是 seq2seq generation。

**Q15.** 問答系統回答前要先查公司知識庫，並附引用來源，應選什麼架構概念？

答案：RAG。  
理由：檢索 → 增強 → 生成。

### 10.5 Mixed Traps

**Q16.** 「Transformer 是 BERT、GPT、T5 之外的另一個模型。」這句對嗎？

答案：錯。Transformer 是架構，BERT/GPT/T5 是模型。

**Q17.** 「BERT 的 MLM 代表它適合生成長篇文章。」這句對嗎？

答案：錯。MLM 是填空式預訓練，不是自回歸長文生成。

**Q18.** 「GPT 是 decoder-only，所以它用 causal attention 根據前文預測後文。」這句對嗎？

答案：對。

**Q19.** 「生成式摘要可能 hallucinate，但讀起來通常比抽取式摘要自然。」這句對嗎？

答案：對。

**Q20.** 「看到最新資料、引用來源、降低幻覺，應想到 RAG。」這句對嗎？

答案：對。

---

## Final Oral Recall

考前最後 3 分鐘，把這五句唸一次：

1. `BERT` 是 encoder-only，雙向理解，適合分類、情感、NER、抽取式 QA。
2. `GPT` 是 decoder-only，causal / autoregressive，適合對話、續寫、few-shot 生成。
3. `T5/BART` 是 encoder-decoder，適合翻譯、摘要、seq2seq。
4. `word2vec/GloVe` 是靜態 embedding；`BERT/ELMo` 是語境化 embedding。
5. `RAG` 是檢索 → 增強 → 生成，用來查文件、引用來源、降低幻覺。

再補兩句考前排除法：

```text
SentencePiece 是 tokenizer 工具，不是模型。
Self-attention 本身沒有順序感，所以需要 positional encoding。
```

---

## Final Study Advice

不要只背模型名稱。考試真正想測的是你能不能從題目描述判斷：

```text
這是切詞、向量化、理解、生成、seq2seq，還是查資料後回答？
```

只要這個判斷穩，L21101 的 NLP 題目大多可以快速排除錯誤選項。

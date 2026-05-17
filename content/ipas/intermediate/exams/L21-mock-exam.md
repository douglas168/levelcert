# IPAS AI應用規劃師 中級 — 科目一模擬考試
## L21 人工智慧技術應用與規劃（50 題）

> **考試說明：** 本試卷共 50 題，每題單選。建議作答時間 60 分鐘。  
> 每題答案與解析緊接在題目之後。  
> 難度分布：D1（記憶）×10、D2（理解）×12、D3（應用）×12、D4（分析）×11、D5（評鑑）×5

---

**Q1（L21101）** 在自然語言處理（NLP）流程中，將一段連續文字切分為最小處理單位（詞、子詞或字元）的步驟稱為什麼？

A. 詞幹還原（Stemming）  
B. 斷詞 / 分詞（Tokenization）  
C. 停用詞移除（Stop-word Removal）  
D. 詞形還原（Lemmatization）

### Q1（L21101）— D1 | 陷阱題

**✅ B. 斷詞 / 分詞（Tokenization）**

📖 L21101｜自然語言處理技術與應用

❌ A. 詞幹還原（Stemming）  
Stemming 是把已切好的詞去字尾（running→run），屬於詞的正規化，不是切分動作。

❌ C. 停用詞移除（Stop-word Removal）  
停用詞移除是過濾「的、是、了」等低資訊詞，前提是已經完成 tokenization。

❌ D. 詞形還原（Lemmatization）  
Lemmatization 是把詞變回字典原型（went→go），也是正規化步驟而非切分步驟。

> Tokenization（斷詞）是將原始文本切成 token 的前置步驟，所有後續 embedding、模型輸入都依賴此結果。

---

**Q2（L21101）** 為何子詞（subword）分詞比傳統「以空白切詞」更適合處理大型預訓練模型的詞彙表？

A. 子詞完全避免任何未知詞（OOV）問題，且詞彙量可無限壓縮  
B. 子詞能在固定詞彙量內兼顧常見詞完整保留與罕見詞可再拆解，降低 OOV 機率  
C. 子詞切分速度比空白切分快十倍以上  
D. 子詞是語言學正式分析單位，具備語意最小性保證

### Q2（L21101）— D2 | 陷阱題

**✅ B. 子詞能在固定詞彙量內兼顧常見詞完整保留與罕見詞可再拆解，降低 OOV 機率**

📖 L21101｜自然語言處理技術與應用

❌ A. 子詞完全避免任何未知詞（OOV）問題，且詞彙量可無限壓縮  
子詞可顯著降低但非「完全避免」OOV，且詞彙量固定並非「可無限壓縮」。

❌ C. 子詞切分速度比空白切分快十倍以上  
速度非主要優勢，空白切分其實更快；子詞的價值在模型效能而非分詞速度。

❌ D. 子詞是語言學正式分析單位，具備語意最小性保證  
子詞是統計切分結果，未必對應語言學形素，不具語意最小性保證。

> BPE/WordPiece 對高頻詞保留完整 token，對低頻詞拆成更小片段，以固定詞彙量涵蓋幾乎所有輸入，大幅降低 OOV。

---

**Q3（L21101）** 下列關於 tokenizer 與模型家族的對應，何者正確？

A. BERT → BPE；GPT → WordPiece；T5 → SentencePiece  
B. BERT → WordPiece；GPT → BPE；T5 → SentencePiece  
C. BERT → SentencePiece；GPT → WordPiece；T5 → BPE  
D. 三者皆使用字元級切分，無差別

### Q3（L21101）— D2 | 陷阱題

**✅ B. BERT → WordPiece；GPT → BPE；T5 → SentencePiece**

📖 L21101｜自然語言處理技術與應用

❌ A. BERT → BPE；GPT → WordPiece；T5 → SentencePiece  
BERT 與 GPT 的 tokenizer 對調。BERT 原論文即明確指定 WordPiece。

❌ C. BERT → SentencePiece；GPT → WordPiece；T5 → BPE  
三者全錯位，是標準干擾選項形態。

❌ D. 三者皆使用字元級切分，無差別  
現代 LLM 皆採子詞（subword）分詞，字元級序列過長、效率極差，主流模型未採用。

> Hugging Face 官方文件對應：BERT→WordPiece；GPT/Llama→BPE；T5/mT5→SentencePiece（內部演算法為 Unigram LM）。

---

**Q4（L21101）** 下列對「Transformer」一詞的定位，何者最正確？

A. Transformer 就是 ChatGPT 的商品名，指特定的聊天機器人產品  
B. Transformer 是 2017 年 Vaswani 等人提出的「架構」（encoder-decoder + self-attention），而 BERT / GPT / T5 是以此架構不同配置建出的「模型」  
C. Transformer 是 LSTM 的升級版，內部仍是 RNN 循序展開，只是多了注意力層  
D. Transformer 只能用於機器翻譯任務，不能拿來做其他 NLP 任務

### Q4（L21101）— D3 | 陷阱題

**✅ B. Transformer 是 2017 年 Vaswani 等人提出的「架構」（encoder-decoder + self-attention），而 BERT / GPT / T5 是以此架構不同配置建出的「模型」**

📖 L21101｜自然語言處理技術與應用

❌ A. Transformer 就是 ChatGPT 的商品名，指特定的聊天機器人產品  
ChatGPT 是 OpenAI 推出的產品，底層模型是 GPT 家族，Transformer 則是架構。

❌ C. Transformer 是 LSTM 的升級版，內部仍是 RNN 循序展開，只是多了注意力層  
Transformer 刻意捨棄 RNN 的循序依賴，以純 attention + 位置編碼實現平行運算，與 LSTM 本質不同。

❌ D. Transformer 只能用於機器翻譯任務，不能拿來做其他 NLP 任務  
原論文以翻譯為示範任務，但架構本身是通用的（分類、生成、摘要、ViT 等）。

> 區分「架構（architecture）/ 模型（model）/ 產品（product）」三層是 iPAS 中級常見陷阱。

---

**Q5（L21101）** 比較 Transformer 與傳統 RNN/LSTM 處理長序列時的差異，下列敘述何者最完整且正確？

A. Transformer 循序計算但不會梯度消失；RNN 可平行運算  
B. 兩者本質相同，僅名稱不同  
C. Transformer 的計算複雜度恆低於 RNN，故總是更快  
D. Transformer 以自注意力捕捉任意距離依賴並支援平行運算；RNN 依循序計算易梯度消失、難以平行

### Q5（L21101）— D4 | 陷阱題

**✅ D. Transformer 以自注意力捕捉任意距離依賴並支援平行運算；RNN 依循序計算易梯度消失、難以平行**

📖 L21101｜自然語言處理技術與應用

❌ A. Transformer 循序計算但不會梯度消失；RNN 可平行運算  
此選項把兩者特性顛倒。

❌ B. 兩者本質相同，僅名稱不同  
機制與特性差異顯著，不可等同。

❌ C. Transformer 的計算複雜度恆低於 RNN，故總是更快  
Attention 為 O(n²)，序列極長時未必快於 RNN 的 O(n)；「總是更快」錯。

> Self-Attention 任意位置兩兩相連，不受距離影響，且矩陣運算天然可平行；RNN 依時間步循序推進，長距依賴易梯度消失且難平行化。

---

**Q6（L21101）** 若要在法務文件中「同時做雙向語境理解 AND 抽取式 NER」，下列哪一種架構決策最合理？

A. word2vec + SVM  
B. decoder-only（GPT/Llama）  
C. encoder-decoder（T5/BART）  
D. encoder-only（BERT/RoBERTa）

### Q6（L21101）— D4 | 陷阱題

**✅ D. encoder-only（BERT/RoBERTa）**

📖 L21101｜自然語言處理技術與應用

❌ A. word2vec + SVM  
靜態詞向量缺乏上下文敏感性，雙向理解條件無法滿足。

❌ B. decoder-only（GPT/Llama）  
Decoder-only 是單向生成，雙向條件直接不符。

❌ C. encoder-decoder（T5/BART）  
Encoder-decoder 擅長 seq2seq 生成任務，NER 非其強項。

> 雙向語境理解是 encoder-only 的預訓練目標（MLM）直接提供；抽取式 NER 又是 token-level 分類的典型應用，兩條件共同指向 BERT 家族。

---

**Q7（L21102）** mAP@0.5:0.95（COCO 標準）實際上是幾個 IoU 門檻下的 mAP 平均？

A. 1 個（只有 0.50）  
B. 5 個（0.50、0.55、0.60、0.65、0.70）  
C. 95 個（從 0.01 到 0.95）  
D. 10 個（從 0.50 到 0.95，步長 0.05）

### Q7（L21102）— D1 | 陷阱題

**✅ D. 10 個（從 0.50 到 0.95，步長 0.05）**

📖 L21102｜電腦視覺技術與應用

❌ A. 1 個（只有 0.50）  
mAP@0.5 才是單一門檻，mAP@0.5:0.95 是多門檻平均。

❌ B. 5 個（0.50、0.55、0.60、0.65、0.70）  
只取前5個門檻是不完整的描述；COCO標準涵蓋到0.95。

❌ C. 95 個（從 0.01 到 0.95）  
步長是 0.05 而非 0.01；共 10 個門檻。

> COCO 標準 mAP@0.5:0.95 = 在 IoU 門檻 {0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95} 共 10 個下的 mAP 平均，比單一 mAP@0.5 更嚴格評估定位精度。

---

**Q8（L21102）** 語意分割（semantic segmentation）與實例分割（instance segmentation）最關鍵的差異是？

A. 語意分割用 CNN，實例分割不用 CNN  
B. 語意分割只處理圖像分類，不輸出遮罩  
C. 語意分割是邊界框偵測，實例分割是像素分類  
D. 語意分割對同類物件不區分個體；實例分割對同類物件也會區分個別實例

### Q8（L21102）— D2 | 陷阱題

**✅ D. 語意分割對同類物件不區分個體；實例分割對同類物件也會區分個別實例**

📖 L21102｜電腦視覺技術與應用

❌ A. 語意分割用 CNN，實例分割不用 CNN  
兩者都可以建立在 CNN 上（如 FCN 做語意分割、Mask R-CNN 做實例分割）。

❌ B. 語意分割只處理圖像分類，不輸出遮罩  
語意分割確實輸出像素級遮罩（每個像素有類別標籤）。

❌ C. 語意分割是邊界框偵測，實例分割是像素分類  
這把定義顛倒；邊界框偵測是目標偵測（object detection）。

> 區分兩者的核心：同一類別（例如三個人）— 語意分割全部視為「人」，不分個體；實例分割會區分「人1」「人2」「人3」。

---

**Q9（L21102）** 下列對 YOLO 與 CNN 關係的描述，何者最正確？

A. YOLO 是 CNN 的替代品，不使用任何卷積運算  
B. YOLO 建立在 CNN backbone 之上，CNN 提取特徵後 YOLO 的 detection head 再輸出邊界框與類別  
C. YOLO 是純 Transformer 架構，與 CNN 無關  
D. YOLO 只能辨識一種物件，CNN 才能做多類別偵測

### Q9（L21102）— D2 | 陷阱題

**✅ B. YOLO 建立在 CNN backbone 之上，CNN 提取特徵後 YOLO 的 detection head 再輸出邊界框與類別**

📖 L21102｜電腦視覺技術與應用

❌ A. YOLO 是 CNN 的替代品，不使用任何卷積運算  
YOLO 使用 CNN 作為骨幹網路提取特徵，並非替代。

❌ C. YOLO 是純 Transformer 架構，與 CNN 無關  
傳統 YOLO（v1-v7）以 CNN 為骨幹；即使部分新版加入 attention，也非純 Transformer。

❌ D. YOLO 只能辨識一種物件，CNN 才能做多類別偵測  
YOLO 的全名即 You Only Look Once，支援多類別同時偵測。

> YOLO 是單階段（single-stage）目標偵測器，以 CNN backbone（如 DarkNet、CSP）提取特徵後，在特徵圖上直接預測邊界框與類別機率。

---

**Q10（L21102）** 某 ML 工程師要在 ResNet-50 的第一個卷積層處理 224×224×3 的輸入影像，使用 64 個 7×7 的卷積核、stride=2、padding=3。根據卷積輸出公式，輸出特徵圖的空間解析度（H×W）為何？

A. 224×224  
B. 56×56  
C. 112×112  
D. 28×28

### Q10（L21102）— D3

**✅ C. 112×112**

📖 L21102｜電腦視覺技術與應用

❌ A. 224×224  
未套用 stride=2，輸出不會維持原始解析度。

❌ B. 56×56  
計算錯誤；以 stride=2 縮減一次，224→112，非 56。

❌ D. 28×28  
將 stride 誤套兩次或使用錯誤公式。

> 卷積輸出公式：O = (W - F + 2P)/S + 1 = (224 - 7 + 2×3)/2 + 1 = (224 - 7 + 6)/2 + 1 = 223/2 + 1 = 111.5 + 1 → 取下整數 = 112。輸出為 112×112×64。

---

**Q11（L21102）** 一名學生說：「ResNet 的 skip connection 是為了解決過擬合（overfitting）」，這個說法是否正確？請選出最準確的說明。

A. 正確，skip connection 透過正則化效果降低過擬合  
B. 部分正確，skip connection 同時解決過擬合與退化  
C. 正確，skip connection 的設計靈感來自 Dropout  
D. 錯誤，skip connection 主要是為了解決深層網路的退化（degradation）問題，而非過擬合

### Q11（L21102）— D4 | 陷阱題

**✅ D. 錯誤，skip connection 主要是為了解決深層網路的退化（degradation）問題，而非過擬合**

📖 L21102｜電腦視覺技術與應用

❌ A. 正確，skip connection 透過正則化效果降低過擬合  
Skip connection 確實有一些正則化副作用，但主要目的不是解決過擬合。

❌ B. 部分正確，skip connection 同時解決過擬合與退化  
退化問題是核心動機，過擬合是次要且並非 ResNet 論文的主要說法。

❌ C. 正確，skip connection 的設計靈感來自 Dropout  
Skip connection 與 Dropout 無關，設計靈感來自觀察深層網路退化現象。

> ResNet 的核心貢獻：隨著網路加深（50層→100層），訓練誤差反而升高（退化問題），skip connection 讓殘差學習成為可能，使超深網路（152層以上）能穩定訓練。

---

**Q12（L21102）** 一份技術文件寫道：「模型 X 在 COCO 上達到 mAP@0.5 = 0.68，但 mAP@0.5:0.95 只有 0.45」，下列對此結果的解讀，何者最合理？

A. 在寬鬆 IoU 門檻（0.5）下偵測率不錯，但在嚴格標準下定位精度仍有進步空間  
B. 模型有嚴重 overfitting，必須重新訓練  
C. mAP@0.5:0.95 的值永遠比 mAP@0.5 高，所以數據有誤  
D. 兩個指標都低，模型不可用

### Q12（L21102）— D4 | 陷阱題

**✅ A. 在寬鬆 IoU 門檻（0.5）下偵測率不錯，但在嚴格標準下定位精度仍有進步空間**

📖 L21102｜電腦視覺技術與應用

❌ B. 模型有嚴重 overfitting，必須重新訓練  
兩個 mAP 都屬合理範圍，沒有任何資訊指向 overfitting。

❌ C. mAP@0.5:0.95 的值永遠比 mAP@0.5 高，所以數據有誤  
mAP@0.5:0.95 納入了更嚴格的 IoU 門檻，幾乎必然低於 mAP@0.5；數據完全合理。

❌ D. 兩個指標都低，模型不可用  
mAP@0.5=0.68 在 COCO 上屬於相當不錯的表現；不能說模型不可用。

> 讀懂雙指標對比：mAP@0.5 高但 mAP@0.5:0.95 明顯較低，表示模型能偵測到物件，但邊界框的精準定位（精確到像素）仍有改善空間。

---

**Q13（L21103）** Diffusion Model 的「正向過程（Forward Process）」具有下列哪項特性？

A. 正向過程包含可學習的卷積層，負責提取圖像特徵  
B. 正向過程與反向過程使用相同的神經網路參數  
C. 正向過程是固定的噪聲排程（fixed noise schedule），不含可學習參數  
D. 正向過程即是 GAN 中的 Generator，負責生成假圖像

### Q13（L21103）— D1 | 陷阱題

**✅ C. 正向過程是固定的噪聲排程（fixed noise schedule），不含可學習參數**

📖 L21103｜生成式 AI 技術與應用

❌ A. 正向過程包含可學習的卷積層，負責提取圖像特徵  
正向過程是純數學噪聲排程（如 DDPM 的 βt 序列），不含任何可學習參數。

❌ B. 正向過程與反向過程使用相同的神經網路參數  
反向過程使用可學習的 U-Net；正向過程完全無參數。

❌ D. 正向過程即是 GAN 中的 Generator，負責生成假圖像  
GAN 的 Generator 和 Diffusion 的正向/反向過程是完全不同的機制。

> DDPM 的正向過程 = 固定噪聲排程逐步加噪（不可學習）；反向過程 = 可學習的 U-Net 逐步去噪。這個區分是高頻考點。

---

**Q14（L21103）** 現代大型語言模型（LLM）訓練流程中，下列哪項是最常見的三階段順序？

A. SFT → Pretrain → RLHF  
B. RLHF → SFT → Pretrain  
C. Pretrain → RLHF → SFT  
D. Pretrain → SFT → RLHF

### Q14（L21103）— D1

**✅ D. Pretrain → SFT → RLHF**

📖 L21103｜生成式 AI 技術與應用

❌ A. SFT → Pretrain → RLHF  
SFT（監督微調）必須在 Pretrain 之後，不能先做 SFT 再 Pretrain。

❌ B. RLHF → SFT → Pretrain  
RLHF 是最後的人類偏好對齊階段，不能放在最前面。

❌ C. Pretrain → RLHF → SFT  
SFT 必須在 RLHF 前提供可監督的初始對齊，順序錯誤。

> 現代 LLM 三階段：① Pretrain（大規模無監督預訓練）→ ② SFT（監督微調，學指令跟隨）→ ③ RLHF（強化學習+人類偏好對齊）。

---

**Q15（L21103）** 下列何者最準確描述「Mode Collapse（模式崩潰）」現象？

A. 訓練時 Discriminator Loss 突然歸零  
B. Generator 與 Discriminator 同時陷入過擬合  
C. 訓練集的標籤出現大量錯誤  
D. Generator 只產生極少種類的樣本，缺乏多樣性

### Q15（L21103）— D2 | 陷阱題

**✅ D. Generator 只產生極少種類的樣本，缺乏多樣性**

📖 L21103｜生成式 AI 技術與應用

❌ A. 訓練時 Discriminator Loss 突然歸零  
Discriminator Loss 歸零是 Discriminator 過強的問題，不是 Mode Collapse 的定義。

❌ B. Generator 與 Discriminator 同時陷入過擬合  
Mode Collapse 特指生成多樣性崩潰，不是過擬合概念。

❌ C. 訓練集的標籤出現大量錯誤  
這是資料品質問題，不是 GAN 訓練中的 Mode Collapse。

> Mode Collapse（模式崩潰）：GAN 訓練中，Generator 找到一個能騙過 Discriminator 的局部解，反覆輸出相似的少數幾種圖像，喪失生成多樣性。

---

**Q16（L21103）** 在 Stable Diffusion 中使用 Classifier-Free Guidance（CFG），若將 guidance scale（w）從 7.5 調高到 15，最可能出現的現象為何？

A. 生成速度加快，圖像更模糊  
B. 圖像多樣性增加，但文字對齊度下降  
C. 圖像更貼合 prompt 描述，但多樣性可能下降，可能出現過飽和或偽影  
D. CFG 值與圖像品質無關

### Q16（L21103）— D3 | 陷阱題

**✅ C. 圖像更貼合 prompt 描述，但多樣性可能下降，可能出現過飽和或偽影**

📖 L21103｜生成式 AI 技術與應用

❌ A. 生成速度加快，圖像更模糊  
CFG scale 與生成速度無關，且高 CFG 通常使圖像更清晰、更「刻板」。

❌ B. 圖像多樣性增加，但文字對齊度下降  
這是降低 CFG scale 的效果，不是調高。

❌ D. CFG 值與圖像品質無關  
CFG scale 顯著影響提示詞忠實度與圖像多樣性，並非無關。

> Classifier-Free Guidance（CFG）是 Stable Diffusion 的核心控制參數：低 CFG = 更多樣但可能偏離 prompt；高 CFG = 更符合 prompt 但過度飽和。實際最佳值通常在 7–12 之間。

---

**Q17（L21103）** 某公司的 LLM 上線後收到兩類抱怨：(a) 回答專業術語經常錯誤、(b) 偶爾生成攻擊性言論。下列分析與對策，何者最能分別對應這兩類問題？

A. 兩者都應重做 Pretrain，增加領域語料  
B. (a) 應增加 Pretrain 語料量；(b) 應增加 Discriminator 訓練  
C. (a) 應補強 Pretrain 領域語料或加 RAG；(b) 應強化 RLHF 或安全過濾  
D. 兩者都應降低 temperature 參數

### Q17（L21103）— D4 | 陷阱題

**✅ C. (a) 應補強 Pretrain 領域語料或加 RAG；(b) 應強化 RLHF 或安全過濾**

📖 L21103｜生成式 AI 技術與應用

❌ A. 兩者都應重做 Pretrain，增加領域語料  
攻擊性言論是價值對齊問題，應由 RLHF/RLAIF 或安全過濾處理，不是 Pretrain 數量問題。

❌ B. (a) 應增加 Pretrain 語料量；(b) 應增加 Discriminator 訓練  
Discriminator 是 GAN 概念，不適用於 LLM 安全問題。

❌ D. 兩者都應降低 temperature 參數  
temperature 影響生成隨機性，不能修正知識錯誤或安全對齊問題。

> 兩類問題對應不同訓練階段：術語錯誤 → Pretrain 領域覆蓋不足或需 RAG 補充；攻擊性言論 → RLHF/RLAIF 或 Safety Filter 未到位。

---

**Q18（L21103）** 比較 Transformer 三種變體的能力邊界，下列敘述何者最正確？

A. Encoder-only 擅長語境理解（分類、NER）；Decoder-only 擅長生成；Encoder-Decoder 擅長 seq2seq 轉換（翻譯、摘要）  
B. 三者能力完全相同，任何任務都可互換  
C. Decoder-only 在所有任務上表現最佳，其他兩者已被淘汰  
D. Encoder-only 擅長生成；Decoder-only 擅長分類；Encoder-Decoder 擅長語意搜尋

### Q18（L21103）— D5

**✅ A. Encoder-only 擅長語境理解（分類、NER）；Decoder-only 擅長生成；Encoder-Decoder 擅長 seq2seq 轉換（翻譯、摘要）**

📖 L21103｜生成式 AI 技術與應用

❌ B. 三者能力完全相同，任何任務都可互換  
三種架構在訓練目標、適用任務上有顯著差異，不能互換。

❌ C. Decoder-only 在所有任務上表現最佳，其他兩者已被淘汰  
BERT 家族在 NER、分類、抽取式 QA 仍是 SOTA 基準；T5/BART 在翻譯摘要依然主流。

❌ D. Encoder-only 擅長生成；Decoder-only 擅長分類；Encoder-Decoder 擅長語意搜尋  
三者功能完全顛倒，是典型干擾選項。

> iPAS 中級核心：「任務特性 → 架構家族對應」。Encoder-only（理解）/ Decoder-only（生成）/ Encoder-Decoder（seq2seq）三者互補而非替代。

---

**Q19（L21104）** 在交叉注意力（Cross-Attention）機制中，Query、Key、Value 的來源為何？

A. Query、Key、Value 均來自同一模態  
B. Query、Key、Value 均來自另一模態  
C. Query 來自某一模態；Key、Value 來自另一模態  
D. Query 來自隨機初始化；Key、Value 來自融合後的特徵

### Q19（L21104）— D1 | 陷阱題

**✅ C. Query 來自某一模態；Key、Value 來自另一模態**

📖 L21104｜多模態人工智慧應用

❌ A. Query、Key、Value 均來自同一模態  
這是自注意力（Self-Attention）的定義，不是交叉注意力。

❌ B. Query、Key、Value 均來自另一模態  
若 Q/K/V 全來自另一模態，就仍然是那個模態的自注意力。

❌ D. Query 來自隨機初始化；Key、Value 來自融合後的特徵  
隨機初始化不是注意力機制的輸入來源設計。

> Cross-Attention 的核心：Q 從一個模態（如文字/目標模態）提問，K、V 從另一個模態（如圖像/來源模態）提供答案，實現跨模態資訊查詢。

---

**Q20（L21104）** 下列關於 GPT-4o 與 GPT-4V（Vision）的比較，哪一項描述最正確？

A. 兩者皆為原生多模態模型，沒有架構差異  
B. GPT-4V 是原生多模態；GPT-4o 是在語言模型上 bolt-on 視覺模組  
C. GPT-4V 是在語言模型上 bolt-on 視覺模組（視覺接口拼接）；GPT-4o 是從訓練階段就原生整合多模態  
D. GPT-4o 僅支援音訊輸入，不支援視覺

### Q20（L21104）— D2 | 陷阱題

**✅ C. GPT-4V 是在語言模型上 bolt-on 視覺模組（視覺接口拼接）；GPT-4o 是從訓練階段就原生整合多模態**

📖 L21104｜多模態人工智慧應用

❌ A. 兩者皆為原生多模態模型，沒有架構差異  
GPT-4V 是語言模型加上視覺 adapter，非原生多模態。

❌ B. GPT-4V 是原生多模態；GPT-4o 是在語言模型上 bolt-on 視覺模組  
選項 B 把兩者定義完全顛倒。

❌ D. GPT-4o 僅支援音訊輸入，不支援視覺  
GPT-4o 是原生多模態，同時支援文字、圖像、音訊。

> Bolt-on 多模態（如 GPT-4V）= 在已訓練好的語言模型上外加視覺編碼器；原生多模態（如 GPT-4o）= 從訓練階段就以多模態資料聯合訓練。

---

**Q21（L21104）** 某監控系統要整合「攝影機畫面」與「麥克風聲音」偵測異常事件，兩模態可能其中一路訊號中斷。最適合的融合策略為何？

A. 早期融合（Early Fusion）：在像素層直接合併音訊波形  
B. 晚期融合（Late Fusion）：各模態獨立推論後才整合決策，單路中斷不影響另一路  
C. 混合融合（Hybrid Fusion）：要求兩路同時有訊號才能運作  
D. 無融合策略，只使用攝影機畫面

### Q21（L21104）— D4 | 陷阱題

**✅ B. 晚期融合（Late Fusion）：各模態獨立推論後才整合決策，單路中斷不影響另一路**

📖 L21104｜多模態人工智慧應用

❌ A. 早期融合（Early Fusion）：在像素層直接合併音訊波形  
早期融合在底層融合後，若一路中斷則整個系統失效，容錯性差。

❌ C. 混合融合（Hybrid Fusion）：要求兩路同時有訊號才能運作  
混合融合的容錯性視設計而定，但題目描述「要求兩路同時有訊號」實際上是早期融合的弱點。

❌ D. 無融合策略，只使用攝影機畫面  
放棄聲音模態違反題目多模態整合的前提。

> 當模態可能中斷時，晚期融合（late fusion）最有彈性：視覺子系統和聲音子系統各自推論後再合併決策，任一路斷線，另一路仍可獨立運作。

---

**Q22（L21104）** 有學生說：「自注意力與交叉注意力只是輸入來源是 1 個還是 2 個的差別，其餘完全一樣。」這個說法哪裡不精確？

A. 自注意力與交叉注意力的本質差異在於資訊流向與可學習的跨模態條件化（cross-modal conditioning），不只是輸入數量的差別  
B. 這個說法完全正確，沒有不精確之處  
C. 差別只在參數量，注意力機制的計算方式完全相同  
D. 自注意力比交叉注意力快，這才是最主要的差別

### Q22（L21104）— D4 | 陷阱題

**✅ A. 自注意力與交叉注意力的本質差異在於資訊流向與可學習的跨模態條件化（cross-modal conditioning），不只是輸入數量的差別**

📖 L21104｜多模態人工智慧應用

❌ B. 這個說法完全正確，沒有不精確之處  
「只是輸入數量差別」的說法遺漏了跨模態條件化的本質意義。

❌ C. 差別只在參數量，注意力機制的計算方式完全相同  
兩者使用不同的 Q/K/V 來源，語意差異顯著。

❌ D. 自注意力比交叉注意力快，這才是最主要的差別  
速度差異並非核心概念，功能差異才是。

> 自注意力：Q、K、V 全部來自同一序列（建模序列內部關係）。交叉注意力：Q 來自一個序列，K、V 來自另一個序列（建模跨序列/跨模態的條件化關係）。

---

**Q23（L21104）** 某團隊嘗試用 CLIP 直接做「台灣健保醫學影像 → 診斷報告文字生成」，結果完全失敗。最可能的根本原因是？

A. CLIP 的文字 encoder 不支援繁體中文  
B. CLIP 缺乏足夠的 GPU 算力  
C. CLIP 是對比學習的檢索模型，不具備自由文字生成能力；生成診斷報告需要具備解碼器（decoder）的生成式模型  
D. CLIP 只支援自然場景照片，不支援醫學影像格式

### Q23（L21104）— D5 | 陷阱題

**✅ C. CLIP 是對比學習的檢索模型，不具備自由文字生成能力；生成診斷報告需要具備解碼器（decoder）的生成式模型**

📖 L21104｜多模態人工智慧應用

❌ A. CLIP 的文字 encoder 不支援繁體中文  
繁中不支援不是根本原因（可用多語 CLIP），且即使支援繁中，CLIP 也無法生成報告。

❌ B. CLIP 缺乏足夠的 GPU 算力  
算力不是問題，CLIP 的架構本質限制才是。

❌ D. CLIP 只支援自然場景照片，不支援醫學影像格式  
格式支援不是問題；根本問題是 CLIP 沒有生成能力。

> CLIP（Contrastive Language-Image Pre-Training）= 雙塔對比學習，輸出圖文相似度分數，可做圖文檢索（retrieval）。但它沒有 decoder，無法生成自由文字。要生成報告需要 LLaVA、GPT-4V 等具有生成能力的多模態模型。

---

**Q24（L21201）** 下列何者是 ROI（投資報酬率）的標準計算公式？

A. ROI = 成本 / 效益 × 100%  
B. ROI = 效益 / 成本 × 100%  
C. ROI = (成本 - 效益) / 效益 × 100%  
D. ROI = (效益 - 成本) / 成本 × 100%

### Q24（L21201）— D1 | 陷阱題

**✅ D. ROI = (效益 - 成本) / 成本 × 100%**

📖 L21201｜AI 技術導入評估

❌ A. ROI = 成本 / 效益 × 100%  
分子分母顛倒，且缺少「淨利」的概念。

❌ B. ROI = 效益 / 成本 × 100%  
這是效益成本比，不是 ROI 的標準公式。

❌ C. ROI = (成本 - 效益) / 效益 × 100%  
分子分母都錯，且方向相反。

> ROI 標準公式：(Net Benefit) / Cost × 100% = (效益 - 成本) / 成本 × 100%。正值代表獲利，負值代表虧損。

---

**Q25（L21201）** 下列關於 p95 延遲與平均延遲的敘述，何者正確？

A. p95 延遲代表所有請求的平均回應時間  
B. 平均延遲永遠比 p95 延遲高  
C. p95 延遲反映大多數使用者的尾端體驗，更能揭露系統對服務品質的真實影響  
D. p95 延遲只在批次推論中才有意義

### Q25（L21201）— D2 | 陷阱題

**✅ C. p95 延遲反映大多數使用者的尾端體驗，更能揭露系統對服務品質的真實影響**

📖 L21201｜AI 技術導入評估

❌ A. p95 延遲代表所有請求的平均回應時間  
p95 是第 95 百分位數，不是平均值。

❌ B. 平均延遲永遠比 p95 延遲高  
方向相反；平均延遲通常低於 p95 延遲（p95 是慢的那批）。

❌ D. p95 延遲只在批次推論中才有意義  
p95 主要用於即時服務（real-time serving）的 SLO 管理。

> p95 延遲 = 95% 的請求在這個時間內完成。比平均延遲更能反映尾端用戶體驗（那最慢的 5% 感受最差），是 SLO 設計的核心指標。

---

**Q26（L21201）** 某 AI 專案投入成本 NT$500,000，第一年產生效益 NT$650,000。ROI 為何？

A. 65%  
B. 30%  
C. 50%  
D. 13%

### Q26（L21201）— D3

**✅ B. 30%**

📖 L21201｜AI 技術導入評估

❌ A. 65%  
65% = 效益/成本 = 650,000/500,000 × 100%，沒有扣除成本。

❌ C. 50%  
計算錯誤，50% 不符合 ROI 公式結果。

❌ D. 13%  
計算錯誤，可能用了錯誤的分母。

> ROI = (650,000 - 500,000) / 500,000 × 100% = 150,000 / 500,000 × 100% = 30%。

---

**Q27（L21201）** 在「Prompt Engineering」與「RAG」之間做選擇時，下列何種情況最應升級到 RAG？

A. 問答主題範圍廣泛  
B. 模型的推論速度不夠快  
C. 企業內部 SOP、產品手冊等私有或即時知識查詢頻繁出現幻覺錯誤  
D. 模型 API 費用超出預算

### Q27（L21201）— D4 | 陷阱題

**✅ C. 企業內部 SOP、產品手冊等私有或即時知識查詢頻繁出現幻覺錯誤**

📖 L21201｜AI 技術導入評估

❌ A. 問答主題範圍廣泛  
主題廣泛不是升級 RAG 的充分理由；通用型問題可用 Prompt Engineering 處理。

❌ B. 模型的推論速度不夠快  
RAG 會增加延遲（需先檢索），不是解決速度問題的方案。

❌ D. 模型 API 費用超出預算  
RAG 系統有額外的基礎設施成本（向量資料庫、嵌入模型），不一定節省費用。

> RAG 的核心價值：讓 LLM 能查詢私有/即時知識庫，解決訓練資料截止日期之後的新知識、企業內部機密文件等的幻覺問題。

---

**Q28（L21201）** 三個 AI 方案的加權評分如下：方案 A=88 分、方案 B=76 分、方案 C=82 分。專案硬性條件：①資料必須留台、②年 TCO ≤ NT$200 萬。其中方案 A 將資料存於境外、方案 C 年 TCO 為 NT$250 萬，方案 B 兩項均符合。下列何者為合理選擇？

A. 選方案 A（評分最高）  
B. 選方案 B（評分最高且同時通過所有硬性條件）  
C. 選方案 C（評分次高）  
D. 三方案分數接近，隨機選擇即可

### Q28（L21201）— D5 | 陷阱題

**✅ B. 選方案 B（評分最高且同時通過所有硬性條件）**

📖 L21201｜AI 技術導入評估

❌ A. 選方案 A（評分最高）  
方案 A 評分雖最高（88 分），但資料存於境外違反硬性條件①，應先濾除。

❌ C. 選方案 C（評分次高）  
方案 C 年 TCO 為 NT$250 萬，超過硬性條件② NT$200 萬上限，應先濾除。

❌ D. 三方案分數接近，隨機選擇即可  
加權評分不能用來比較未通過硬性條件的方案；必須先過濾。

> 正確評估流程：先排除未通過硬性條件（hard constraints）的方案，再從通過者中選加權評分最高者。跳過此步驟是 AI 導入評估常見錯誤。

---

**Q29（L21202）** RACI 矩陣中的 R 與 A 各自代表何種角色？

A. R = Reporter（回報者）；A = Approver（核准者）  
B. R = Reviewer（審查者）；A = Assigned（被分配者）  
C. R = Responsible（執行者）；A = Accountable（最終負責人）  
D. R = Recorder（記錄者）；A = Auditor（稽核者）

### Q29（L21202）— D1 | 陷阱題

**✅ C. R = Responsible（執行者）；A = Accountable（最終負責人）**

📖 L21202｜AI 技術導入規劃

❌ A. R = Reporter（回報者）；A = Approver（核准者）  
Reporter 和 Approver 不是 RACI 的標準用詞；Accountable 是最終負責人，不等於核准者。

❌ B. R = Reviewer（審查者）；A = Assigned（被分配者）  
Reviewer 和 Assigned 都不是 RACI 的原始定義。

❌ D. R = Recorder（記錄者）；A = Auditor（稽核者）  
記錄者和稽核者都不是 RACI 的四個角色（Responsible/Accountable/Consulted/Informed）。

> RACI 口訣：R = 動手做的人（Responsible），A = 扛責任的人（Accountable，一個工作只能有一個 A），C = 被諮詢的人，I = 被告知的人。

---

**Q30（L21202）** 在 AI 導入規劃中，「3+2+1 KPI 規則」指下列何種組合？

A. 3 個技術 KPI、2 個財務 KPI、1 個人力 KPI  
B. 3 個月短期、2 個月中期、1 個月長期觀察週期  
C. 3 個模型指標、2 個系統指標、1 個業務指標  
D. 3 個營運層（operational）KPI、2 個業務層（business）KPI、1 個風險層（risk）KPI

### Q30（L21202）— D1

**✅ D. 3 個營運層（operational）KPI、2 個業務層（business）KPI、1 個風險層（risk）KPI**

📖 L21202｜AI 技術導入規劃

❌ A. 3 個技術 KPI、2 個財務 KPI、1 個人力 KPI  
以功能部門切分不是 3+2+1 KPI 規則的定義。

❌ B. 3 個月短期、2 個月中期、1 個月長期觀察週期  
這是對時間區間的誤解，不是 KPI 分層規則。

❌ C. 3 個模型指標、2 個系統指標、1 個業務指標  
切層方式不符；業務指標只有 1 個是風險，不是正確分類。

> 3+2+1 KPI 規則：3 operational（模型精度、延遲、覆蓋率等）+ 2 business（轉換率、ROI 等）+ 1 risk（合規、FP 率、安全等）。每個 KPI 都應對齊北極星指標。

---

**Q31（L21202）** 「MVP（Minimum Viable Product）」在 AI 導入脈絡下最貼切的定義為何？

A. 以最小功能集合向真實使用者交付端對端價值，驗證是否有人願意使用並付費  
B. 技術可行性的早期展示，通常在實驗室或受控環境下進行  
C. 與 Pilot 相同，只是名稱不同  
D. 完整產品的第一個版本，功能必須完整

### Q31（L21202）— D2 | 陷阱題

**✅ A. 以最小功能集合向真實使用者交付端對端價值，驗證是否有人願意使用並付費**

📖 L21202｜AI 技術導入規劃

❌ B. 技術可行性的早期展示，通常在實驗室或受控環境下進行  
這是 PoC（Proof of Concept）的定義，不是 MVP。

❌ C. 與 Pilot 相同，只是名稱不同  
MVP 驗證使用者價值；Pilot 驗證受控場域可行性。三者不同。

❌ D. 完整產品的第一個版本，功能必須完整  
「最小可行」強調功能精簡，不是「完整」。

> PoC = 技術能否做到；Pilot = 在受控真實場域能否運作；MVP = 真實使用者是否願意用且有價值。三者問題層次不同。

---

**Q32（L21202）** 7-11 規劃導入 AI 需求預測以減少鮮食報廢。套用「業務目標 → 流程 → 決策 → 資料 → 技術」鏈條，下列哪一項屬於「決策點（Decision）」？

A. 每日鮮食報廢率降低 30%  
B. 門市店員於早班前須下訂當日鮮食數量  
C. 歷史銷售資料、天氣、節慶資料  
D. 採用時間序列 + 迴歸組合模型

### Q32（L21202）— D3 | 陷阱題

**✅ B. 門市店員於早班前須下訂當日鮮食數量**

📖 L21202｜AI 技術導入規劃

❌ A. 每日鮮食報廢率降低 30%  
報廢率是業務目標（Business Goal），位於鏈條最上層。

❌ C. 歷史銷售資料、天氣、節慶資料  
這是資料層（Data），為決策提供輸入。

❌ D. 採用時間序列 + 迴歸組合模型  
這是技術層（Technique），是決策點的技術實現。

> 「業務目標 → 流程 → 決策 → 資料 → 技術」鏈條：決策點是需要 AI 建議的關鍵人為行動（何時、訂多少），是整個導入的核心。

---

**Q33（L21202）** 關於 PoC（Proof of Concept）、Pilot、MVP 三者，下列敘述何者最能區分三者差異？

A. 三者是同義詞，可互換使用  
B. PoC 證明「技術能否做到」；Pilot 證明「在受控真實場域能否運作」；MVP 證明「真實使用者是否會用且帶來價值」  
C. PoC 是 Pilot 的子集合，MVP 是 Pilot 的別稱  
D. PoC 只談硬體、Pilot 只談軟體、MVP 只談 UI

### Q33（L21202）— D4 | 陷阱題

**✅ B. PoC 證明「技術能否做到」；Pilot 證明「在受控真實場域能否運作」；MVP 證明「真實使用者是否會用且帶來價值」**

📖 L21202｜AI 技術導入規劃

❌ A. 三者是同義詞，可互換使用  
混用三者是導入失敗常見原因之一。

❌ C. PoC 是 Pilot 的子集合，MVP 是 Pilot 的別稱  
三者並非包含關係，目的也不同。

❌ D. PoC 只談硬體、Pilot 只談軟體、MVP 只談 UI  
三者皆可跨硬/軟體/UI，以範圍切分錯誤。

> 規劃師必備三把尺：PoC（技術閘）→ Pilot（場域閘）→ MVP（市場閘），依序降低不確定性。

---

**Q34（L21202）** 某傳產企業 CEO 想了解公司目前的 AI 導入程度究竟在「哪個水平」，並據此規劃未來 3 年投資藍圖。規劃師應建議採用下列哪個框架為主要診斷工具？

A. Gartner AI Maturity Model：以五級成熟度（Awareness→Active→Operational→Systemic→Transformational）直接對應組織 AI 成熟度的當前位置，最適合「診斷現況 + 設定進階目標」  
B. CMMI：以 Ad-hoc→Managed→Defined→Quantitative→Optimizing 五級評估軟體工程能力，是 AI 導入成熟度的業界標準  
C. Microsoft CAF：以 Strategy→Plan→Ready→Adopt→Govern→Manage 六大方法論，可直接給出一個成熟度分數  
D. 不需任何框架，直接問 CEO 想聽到哪一級的結論即可

### Q34（L21202）— D4 | 陷阱題

**✅ A. Gartner AI Maturity Model：以五級成熟度（Awareness→Active→Operational→Systemic→Transformational）直接對應組織 AI 成熟度的當前位置，最適合「診斷現況 + 設定進階目標」**

📖 L21202｜AI 技術導入規劃

❌ B. CMMI：以 Ad-hoc→Managed→Defined→Quantitative→Optimizing 五級評估軟體工程能力，是 AI 導入成熟度的業界標準  
CMMI 是軟體工程能力成熟度，不是 AI 組織成熟度；套到 AI 導入會失焦。

❌ C. Microsoft CAF：以 Strategy→Plan→Ready→Adopt→Govern→Manage 六大方法論，可直接給出一個成熟度分數  
Microsoft CAF 是 lifecycle 方法論，不是用來給成熟度分數的診斷工具。

❌ D. 不需任何框架，直接問 CEO 想聽到哪一級的結論即可  
規劃師應以結構化框架做客觀診斷，迎合上意是反模式。

> Gartner AI Maturity Model 的五級能直接落點組織當前 AI 成熟度，並指出下一級需要補強的能力，對「我們現在在哪、下一步去哪」的問題最契合。IBM AI Ladder（Collect→Organize→Analyze→Infuse）則側重資料架構規劃。

---

**Q35（L21203）** 依歐盟《人工智慧法案》（EU AI Act）的風險分級，以下何者屬於不可接受風險（Unacceptable Risk）的典型例子？

A. 政府依個人社會行為建立社會評分（social scoring）並據以限制服務  
B. 銀行用於信用評分（credit scoring）的 AI 系統  
C. 電商客服聊天機器人（chatbot）未先揭露為 AI  
D. 企業內部知識搜尋工具（knowledge search）

### Q35（L21203）— D1 | 陷阱題

**✅ A. 政府依個人社會行為建立社會評分（social scoring）並據以限制服務**

📖 L21203｜AI 倫理、法規與治理

❌ B. 銀行用於信用評分（credit scoring）的 AI 系統  
信用評分常被誤選成禁止項目；但法制上它通常落在 Annex III 的高風險（High-Risk），不是一律禁止。

❌ C. 電商客服聊天機器人（chatbot）未先揭露為 AI  
聊天機器人未揭露身分是常見合規問題，但通常是限制風險（Limited Risk）的透明義務。

❌ D. 企業內部知識搜尋工具（knowledge search）  
內部知識搜尋工具多半屬最小風險（Minimal Risk）情境。

> 記憶口訣：Unacceptable Risk = EU AI Act 第 5 條明文禁止的作法，包括社會評分、某些生物辨識用途、操控弱勢族群意識等。

---

**Q36（L21203）** 某公司上線對外客服聊天機器人（chatbot），依歐盟《人工智慧法案》（EU AI Act）最合理的理解為何？

A. 通常屬限制風險（Limited Risk），重點是透明揭露義務  
B. 一律屬高風險（High-Risk），必須完成 Annex III 義務  
C. 一律屬不可接受風險（Unacceptable Risk），不得部署  
D. 自動落入最小風險（Minimal Risk），不需任何揭露

### Q36（L21203）— D2 | 陷阱題

**✅ A. 通常屬限制風險（Limited Risk），重點是透明揭露義務**

📖 L21203｜AI 倫理、法規與治理

❌ B. 一律屬高風險（High-Risk），必須完成 Annex III 義務  
只有特定高影響用途才會進入高風險；考生常把「有互動」誤判成高風險。

❌ C. 一律屬不可接受風險（Unacceptable Risk），不得部署  
被禁止的是特定作法（如社會評分），不是一般客服互動。

❌ D. 自動落入最小風險（Minimal Risk），不需任何揭露  
最小風險沒有明確透明義務，但 chatbot 正是限制風險的典型，必須揭露「您正在與 AI 互動」。

> 風險分級快查：Unacceptable（禁止）/ High-Risk（Annex III，需合規文件）/ Limited（透明義務）/ Minimal（幾乎無限制）。一般客服 chatbot = Limited Risk。

---

**Q37（L21203）** 某銀行導入 AI 信用評分（credit scoring）模型，用於決定個人貸款准駁。依歐盟《人工智慧法案》（EU AI Act）最可能的分類為何？

A. 高風險（High-Risk），屬影響個人取得基本服務的重要用途  
B. 不可接受風險（Unacceptable Risk），因為所有自動決策都被禁止  
C. 限制風險（Limited Risk），只要告知客戶有使用 AI 即可  
D. 最小風險（Minimal Risk），因為屬企業內部效率工具

### Q37（L21203）— D3 | 陷阱題

**✅ A. 高風險（High-Risk），屬影響個人取得基本服務的重要用途**

📖 L21203｜AI 倫理、法規與治理

❌ B. 不可接受風險（Unacceptable Risk），因為所有自動決策都被禁止  
不是所有自動決策都被 AI Act 禁止；真正禁止的是第 5 條列出的特定作法。

❌ C. 限制風險（Limited Risk），只要告知客戶有使用 AI 即可  
單純透明義務不足以涵蓋信用評分的權益影響。

❌ D. 最小風險（Minimal Risk），因為屬企業內部效率工具  
雖在企業內執行，但對外效果重大（影響個人取得貸款），不能因部署在銀行內部就降成最小風險。

> 信用評分屬 EU AI Act Annex III 常見高風險情境，直接影響個人獲得金融與重要服務的機會，需完成合規文件、人工監督等義務。

---

**Q38（L21203）** 下列哪一項最能正確區分歐盟高階專家小組（EU HLEG）的可信任 AI 要求與歐盟《人工智慧法案》（EU AI Act）？

A. HLEG 提供倫理與治理導向的 7 項要求；AI Act 則是具有法律拘束力的風險分級與義務架構  
B. HLEG 是 AI Act 的附件，因此兩者法律效力完全相同  
C. AI Act 只管倫理原則，不涉及高風險系統義務  
D. HLEG 只適用金融業，AI Act 才適用其他產業

### Q38（L21203）— D4 | 陷阱題

**✅ A. HLEG 提供倫理與治理導向的 7 項要求；AI Act 則是具有法律拘束力的風險分級與義務架構**

📖 L21203｜AI 倫理、法規與治理

❌ B. HLEG 是 AI Act 的附件，因此兩者法律效力完全相同  
把 HLEG 當成 AI Act 附件是經典混淆；實際上它不是法條附件。

❌ C. AI Act 只管倫理原則，不涉及高風險系統義務  
AI Act 的核心正是風險分級、禁止作法與高風險義務，並非只談倫理。

❌ D. HLEG 只適用金融業，AI Act 才適用其他產業  
HLEG 不是金融專屬框架，適用所有 AI 利害關係方。

> HLEG（2019）= 歐盟高階專家小組發布的倫理指引，非法律文件；AI Act = 具法律拘束力的法規。兩者是不同文件，法律效力不同。

---

**Q39（L21203）** 某跨國企業準備同時在歐盟與臺灣部署員工履歷篩選 AI（AI resume screening），要求法遵主管提出一個「不混淆法源、又能先行治理」的建議。哪一項最合理？

A. 在歐盟把它當作限制風險（Limited Risk）聊天機器人處理；在臺灣則等基本法公布後再說  
B. 在歐盟先視為高風險（High-Risk）就業用途並規劃相應控制；在臺灣基本法已公布施行，應依第 19 條及既有治理原則做風險評估、問責與供應商管理  
C. 在歐盟因非生物辨識所以屬最小風險；在臺灣只需採購單位簽核即可  
D. 兩地都只要提供模型可解釋性（explainability）報告，其餘控制可省略

### Q39（L21203）— D5 | 陷阱題

**✅ B. 在歐盟先視為高風險（High-Risk）就業用途並規劃相應控制；在臺灣基本法已公布施行，應依第 19 條及既有治理原則做風險評估、問責與供應商管理**

📖 L21203｜AI 倫理、法規與治理

❌ A. 在歐盟把它當作限制風險（Limited Risk）聊天機器人處理；在臺灣則等基本法公布後再說  
履歷篩選不是 chatbot；臺灣《人工智慧基本法》已於 2026-01-14 公布施行，不能再以等待法制生效為由延後治理。

❌ C. 在歐盟因非生物辨識所以屬最小風險；在臺灣只需採購單位簽核即可  
就業用途不是因為「沒有生物辨識」就自動變最小風險；就業篩選 AI 是 Annex III 高風險。

❌ D. 兩地都只要提供模型可解釋性（explainability）報告，其餘控制可省略  
可解釋性只是控制之一，無法涵蓋整體風險管理需求。

> 跨境 AI 合規注意：EU = 就業用途 → High-Risk；臺灣 = 《人工智慧基本法》2026-01-14 已施行，中央主管機關為國科會（NSTC），公部門/相關企業應依第 19 條做風險評估。

---

**Q40（L21301）** 在資料切分（Data Split）中，測試集（Test Set）的主要用途是什麼？

A. 用來反覆調整模型超參數  
B. 用來做最終泛化能力（Generalization）驗證  
C. 用來補齊缺失值  
D. 用來決定要不要收集資料

### Q40（L21301）— D1 | 陷阱題

**✅ B. 用來做最終泛化能力（Generalization）驗證**

📖 L21301｜資料準備與模型基礎

❌ A. 用來反覆調整模型超參數  
這是典型考點。反覆用測試集調參會造成 data leakage 與高估表現；調參應使用驗證集。

❌ C. 用來補齊缺失值  
缺失值處理應在資料準備流程中完成，且要避免把測試集資訊帶回訓練。

❌ D. 用來決定要不要收集資料  
資料收集決策來自業務需求與資料盤點，不是測試集的角色。

> 測試集只有一個用途：在完全獨立、從未接觸過訓練流程的情況下，做最後的泛化能力評估。一旦用測試集調參，它就不再是真正的「未見資料」。

---

**Q41（L21301）** 關於特徵縮放（Feature Scaling），下列敘述何者正確？

A. k-NN 與 SVM 通常比樹模型更受特徵尺度影響  
B. 決策樹一定必須做標準化（Standardization）才可訓練  
C. 做了縮放後就不需要資料切分  
D. 縮放只能用在影像資料，不能用在表格資料

### Q41（L21301）— D2 | 陷阱題

**✅ A. k-NN 與 SVM 通常比樹模型更受特徵尺度影響**

📖 L21301｜資料準備與模型基礎

❌ B. 決策樹一定必須做標準化（Standardization）才可訓練  
樹模型（決策樹、隨機森林）以切分點為核心，對特徵尺度不敏感，通常不需要標準化。

❌ C. 做了縮放後就不需要資料切分  
縮放無法取代資料切分；這是把預處理與評估設計混為一談。

❌ D. 縮放只能用在影像資料，不能用在表格資料  
表格資料的特徵縮放是最常見的應用場景（如年齡 vs 年收入的量綱差異）。

> 尺度敏感模型：k-NN（依距離）、SVM（依間隔/核函數）、PCA、神經網路。尺度不敏感：決策樹、隨機森林（依資訊增益 / Gini 分裂，與量綱無關）。

---

**Q42（L21301）** 在高度類別不平衡（Class Imbalance）的二元分類中，只看準確率（Accuracy）最大的風險是什麼？

A. 可能掩蓋模型對少數類別的低辨識能力  
B. 會讓資料自動產生異常值（Outlier）  
C. 會讓訓練集與測試集大小不同  
D. 會導致所有模型都無法訓練

### Q42（L21301）— D2 | 陷阱題

**✅ A. 可能掩蓋模型對少數類別的低辨識能力**

📖 L21301｜資料準備與模型基礎

❌ B. 會讓資料自動產生異常值（Outlier）  
評估指標與異常值的產生無關。

❌ C. 會讓訓練集與測試集大小不同  
評估指標選擇不影響資料切分大小。

❌ D. 會導致所有模型都無法訓練  
模型仍可訓練，只是評估方式若不當，會誤判效果。

> 例子：若 99% 為正常交易、1% 為詐欺，一個永遠預測「正常」的笨模型就有 99% accuracy，但對詐欺的 recall = 0。應改用 Precision、Recall、F1、AUC-ROC 等指標。

---

**Q43（L21301）** 某分析師先用全資料集計算平均值做缺失值插補（Imputation），再切分訓練集與測試集。這樣最大的風險是什麼？

A. 會讓模型一定變成線性模型（Linear Model）  
B. 會讓類別欄位自動消失  
C. 會讓訓練集太小  
D. 可能把測試集資訊帶入訓練流程，形成 data leakage

### Q43（L21301）— D3 | 陷阱題

**✅ D. 可能把測試集資訊帶入訓練流程，形成 data leakage**

📖 L21301｜資料準備與模型基礎

❌ A. 會讓模型一定變成線性模型（Linear Model）  
插補不會決定模型是否線性。

❌ B. 會讓類別欄位自動消失  
插補處理不會讓類別欄位消失。

❌ C. 會讓訓練集太小  
切分比例才會影響訓練集大小。

> 正確流程：先切分訓練/驗證/測試 → 再在訓練集上計算統計量（均值等）→ 用訓練集統計量插補訓練集和測試集。若先全資料插補再切分，測試集的統計資訊已洩漏入訓練流程。

---

**Q44（L21301）** 某詐欺偵測（Fraud Detection）專案中，詐欺交易只占 1%。若團隊希望模型更重視少數類別，較合理的做法是什麼？

A. 只看整體準確率（Accuracy）即可  
B. 考慮重抽樣（Resampling）或類別權重（Class Weights）等方法  
C. 先把所有少數類別刪除，讓資料平衡  
D. 改用最難解釋的模型就會改善

### Q44（L21301）— D3 | 陷阱題

**✅ B. 考慮重抽樣（Resampling）或類別權重（Class Weights）等方法**

📖 L21301｜資料準備與模型基礎

❌ A. 只看整體準確率（Accuracy）即可  
高 accuracy 可能只是一直猜多數類別，無法反映詐欺偵測的真實效果。

❌ C. 先把所有少數類別刪除，讓資料平衡  
刪除少數類別等於放棄問題本身，違反業務目標。

❌ D. 改用最難解釋的模型就會改善  
模型是否複雜與是否重視少數類別不是同一件事。

> 不平衡資料的常用解法：① 過採樣（SMOTE 等）② 欠採樣 ③ class_weight 參數（直接告訴模型少數類別更重要）。Precision/Recall/F1/AUC 比 Accuracy 更適合作為評估指標。

---

**Q45（L21301）** 某團隊先以全資料做特徵選擇（Feature Selection），再進行交叉驗證（Cross-Validation）比較模型。這個流程最大的問題是什麼？

A. 會讓交叉驗證的每折資料量不同  
B. 會讓決策樹（Decision Tree）無法訓練  
C. 會自動造成類別不平衡（Class Imbalance）  
D. 特徵選擇已看過全資料訊息，可能讓驗證結果過度樂觀

### Q45（L21301）— D4 | 陷阱題

**✅ D. 特徵選擇已看過全資料訊息，可能讓驗證結果過度樂觀**

📖 L21301｜資料準備與模型基礎

❌ A. 會讓交叉驗證的每折資料量不同  
折數設計才會影響每折大小，非題目核心。

❌ B. 會讓決策樹（Decision Tree）無法訓練  
決策樹仍可訓練，問題在評估污染。

❌ C. 會自動造成類別不平衡（Class Imbalance）  
特徵選擇不會自動改變類別比例。

> 正確流程：特徵選擇必須包在交叉驗證的每一折的訓練集裡做，不能在全資料上做完再做 CV。否則 CV 的驗證折已被「間接看過」，產生 leakage。

---

**Q46（L21302）** 在標準 MLOps 流程中，哪一個順序最符合模型生命週期？

A. Train → Registry → Serving → Monitor → Retrain  
B. Registry → Train → Serving → Retrain → Monitor  
C. Train → Serving → Registry → Monitor → Retrain  
D. Train → Monitor → Registry → Serving → Retrain

### Q46（L21302）— D1 | 陷阱題

**✅ A. Train → Registry → Serving → Monitor → Retrain**

📖 L21302｜MLOps 與模型部署

❌ B. Registry → Train → Serving → Retrain → Monitor  
Registry 管的是已產出的模型版本，不會在訓練前先出現。

❌ C. Train → Serving → Registry → Monitor → Retrain  
先進入 Serving 再 Registry 會失去正式版控與可追溯性。

❌ D. Train → Monitor → Registry → Serving → Retrain  
Monitor 必須建立在模型已上線服務後，否則無法蒐集實際推論表現。

> MLOps 生命週期順序：Train（訓練）→ Registry（版本管理與審核）→ Serving（部署服務）→ Monitor（監控效能與漂移）→ Retrain（觸發再訓練）。

---

**Q47（L21302）** 若線上輸入資料的分布與訓練資料明顯不同，但目標標籤（Label）定義本身沒有改變，這最接近哪一種漂移：資料漂移（Data Drift）或概念漂移（Concept Drift）？

A. 資料漂移（Data Drift）  
B. 標註比例偏移  
C. 概念漂移（Concept Drift）  
D. 模型洩漏（Model Leakage）

### Q47（L21302）— D1 | 陷阱題

**✅ A. 資料漂移（Data Drift）**

📖 L21302｜MLOps 與模型部署

❌ B. 標註比例偏移  
標註比例偏移著重標籤占比改變；題幹強調的是輸入資料分布，而非標籤比例。

❌ C. 概念漂移（Concept Drift）  
題幹明說標籤定義與關係沒有改變，重點在輸入分布變化，不是輸入-標籤關係改變。

❌ D. 模型洩漏（Model Leakage）  
Model leakage 發生在訓練資料洩漏未來資訊，不是線上資料分布改變。

> 區分兩種漂移：Data Drift = 輸入特徵分布改變（X 變了，X→Y 的關係不變）；Concept Drift = 輸入與標籤的關係改變（同樣的 X，Y 的意義不同了）。

---

**Q48（L21302）** 下列哪一個指標最適合用來監測資料漂移（Data Drift）而非系統資源使用率？

A. CPU 使用率  
B. 記憶體使用率  
C. 容器重啟次數  
D. PSI（Population Stability Index）

### Q48（L21302）— D2 | 陷阱題

**✅ D. PSI（Population Stability Index）**

📖 L21302｜MLOps 與模型部署

❌ A. CPU 使用率  
CPU 反映系統負載，不直接代表輸入資料分布是否偏移。

❌ B. 記憶體使用率  
記憶體高可能代表流量變大或實作問題，但不等於特徵分布改變。

❌ C. 容器重啟次數  
容器重啟次數是平台穩定性訊號，不是模型資料健康指標。

> PSI（Population Stability Index）是金融領域常用的資料分布穩定性指標，現已廣泛用於 ML 模型監控：比較線上資料與訓練基準資料的分布差異。PSI < 0.1 穩定，0.1–0.25 需注意，> 0.25 需調查。

---

**Q49（L21302）** 比較藍綠部署（Blue-Green Deployment）與金絲雀部署（Canary Deployment）時，下列哪個判斷最合理？

A. Blue-green 主要靠旁路流量比對，不會讓使用者接觸新版本  
B. Canary 適合逐步放量觀察風險；blue-green 適合快速整體切換並保留明確回切路徑  
C. 兩者都只能用在 batch inference  
D. Canary 的主要目標是比較兩個版本的商業轉換率，不是發布風險

### Q49（L21302）— D4 | 陷阱題

**✅ B. Canary 適合逐步放量觀察風險；blue-green 適合快速整體切換並保留明確回切路徑**

📖 L21302｜MLOps 與模型部署

❌ A. Blue-green 主要靠旁路流量比對，不會讓使用者接觸新版本  
旁路不影響正式結果是 shadow deployment 的概念，不是 blue-green。

❌ C. 兩者都只能用在 batch inference  
兩者都可用於線上服務部署，並非只限 batch。

❌ D. Canary 的主要目標是比較兩個版本的商業轉換率，不是發布風險  
比較商業效果更接近 A/B testing；canary 的核心仍是安全發布（逐步放量降低風險）。

> 三種部署策略比較：Canary = 逐步放量（5%→20%→50%→100%）降低發布風險；Blue-Green = 整批切換（快速回切）；Shadow = 旁路鏡像流量（不影響正式結果）。

---

**Q50（L21302）** 某推薦系統的 p95 latency、CPU 與 error rate 都維持在 SLO 內，但轉換率連續兩週下降，且 PSI 顯示部分關鍵特徵分布偏移。下列哪一個處置最合理？

A. 判定系統健康，因此不需處理  
B. 啟動模型監控調查與再訓練（Retrain）評估，而不只看基礎設施指標  
C. 直接關閉所有監控告警，以免誤報  
D. 先把 autoscaling 上限提高即可

### Q50（L21302）— D5 | 陷阱題

**✅ B. 啟動模型監控調查與再訓練（Retrain）評估，而不只看基礎設施指標**

📖 L21302｜MLOps 與模型部署

❌ A. 判定系統健康，因此不需處理  
系統層指標（latency/CPU/error rate）正常不代表模型品質正常；這是最典型的監控盲點。

❌ C. 直接關閉所有監控告警，以免誤報  
關閉告警會掩蓋問題，而不是解決問題。

❌ D. 先把 autoscaling 上限提高即可  
擴容只能改善容量問題，無法處理資料分布改變造成的效果下降。

> 系統監控（infrastructure metrics）≠ 模型監控（model metrics）。PSI 異常 + 業務 KPI 下降 = 需要從模型和資料層面調查（drift 分析、re-labeling、retrain）。

---

# L23302 模型選擇與架構設計 — Study Guide
本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」。中級起點在**模型選擇與架構配置**，所以這份指南不會涵蓋「實際訓練執行與收斂監控」（那是 L23303 的事），也不會涵蓋「超參數調校循環」（那是 L23304）。我們直接練習：看到任務、資料、限制，就能選模型家族、定架構、完成訓練前核心配置。

## 1. Exam Item Mapping
### 1a. 對應評鑑範圍
> 對應評鑑範圍：**L23302 模型選擇與架構設計** ＋ **科目三：機器學習技術與應用**

### 1b. How to Study This Chapter
1. 先讀第 2 節「關鍵概念總覽圖」：先把本課想成「選模型 → 設架構 → 配置訓練前設定」三步，不要一開始背所有名詞。
2. 再讀第 3.1 節「模型家族選擇」：這是情境題最常用的判斷入口，題目通常先給你資料型態或任務目標。
3. 接著讀第 3.2 與 3.3 節：理解層數（depth）、寬度（width/capacity）、激活函數（activation function）如何決定模型表達能力與輸出形式。
4. 再讀第 3.4 節：把損失函數（loss function）、優化器（optimizer）、初始化（initialization）放在 compile 前的檢查清單中。
5. 最後讀第 4 到第 7 節：用比較表、口訣、陷阱與關鍵字快判把考場速度練起來。
6. 考前 30 分鐘只看第 5、6、7、8 節：用口訣與 checkbox 確認自己沒有把 L23302 讀成 L23303 或 L23304。

### 1c. 標記說明
| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標
讀完本章你應該能：

- 根據任務類型、資料型態、資料量、解釋性與部署限制，選出合理的模型家族。
- 判斷模型太簡單或太複雜時，對應到高偏差（high bias）或高變異（high variance）。
- 說明神經網路架構（neural network architecture）中的層數、單元數、通道數與激活函數各自負責什麼。
- 分辨 ReLU、Sigmoid、Softmax 在隱藏層與輸出層的常見用途。
- 在訓練前為分類或回歸任務選擇合理的損失函數、優化器與權重初始化策略。
- 看懂 Keras `Sequential()` 與 `compile()` 的角色，知道 `compile()` 是訓練前配置，不是開始訓練。

### 1e. 考點權重
| 考點 | 權重（🔥count） | 出處 |
|---|---:|---|
| 任務類型與資料型態對應模型家族 | 🔥🔥🔥 | L23302 評鑑範圍、研究筆記、L23 題型情報 |
| Bias-Variance Trade-off 偏差-變異數權衡 | 🔥🔥🔥 | L23302 模型選擇核心、過擬合/欠擬合情境題 |
| CNN 局部感知與參數共享 | 🔥🔥🔥 | 官方公告題與 L23 高頻架構題 |
| RNN/LSTM/GRU 與時間序列 | 🔥🔥🔥 | L23 高頻情境：時間序列、序列依賴 |
| Transformer 與長距依賴 | 🔥🔥 | L23 架構比較與 NLP 情境題 |
| MLP / Fully Connected Network 適用表格或一般特徵 | 🔥🔥 | 架構選擇基礎 |
| 層數 depth、寬度 width/capacity、參數量 | 🔥🔥🔥 | 模型架構定義與層級設定 |
| ReLU、Sigmoid、Softmax 激活函數用途 | 🔥🔥🔥 | L23 高頻混淆配對 |
| Cross-Entropy、MSE、MAE 損失函數選擇 | 🔥🔥🔥 | 訓練前核心配置、loss function 題型 |
| SGD、RMSprop、Adam 優化器概念 | 🔥🔥 | L23 Adam 概念與 optimizer 比較 |
| Xavier/Glorot 與 He 初始化 | 🔥🔥 | 訓練前配置與初始化策略 |
| `compile()` 的位置與意義 | 🔥🔥 | 程式判讀與訓練前配置邊界 |
| 過擬合時簡化模型架構 | 🔥🔥🔥 | 官方公告題方向與 Bias-Variance 情境 |
| 解釋性與部署限制對模型選擇的影響 | 🔥🔥 | L23302 模型選擇範圍 |

### 1f. 先備知識
- L23101 基礎數學與統計概念：矩陣、機率、誤差與最佳化的基本語感。
- L23102 梯度下降與最佳化基礎：知道模型用 loss 來更新參數即可，本課不推導更新公式。
- L23201 機器學習基本流程：資料、特徵、訓練/測試、分類/回歸的基本概念。
- L23202 深度學習基本架構：知道神經元、層、權重、前向傳播的直覺。
- L23301 建模問題定義：先知道問題要預測什麼，才知道 L23302 要選什麼模型。

## 📊 視覺化圖表（Visual Diagrams）
| # | 圖表 | 用途 |
|---|---|---|
| 1 | [模型選擇決策樹](diagrams/01-model-selection-decision-tree.mmd) | 從問題類型到模型家族的快速決策路徑 |
| 2 | [神經網路架構層級圖](diagrams/02-neural-network-layers.mmd) | 輸入層→隱藏層→輸出層的結構與激活函數位置 |
| 3 | [偏差-變異數權衡視覺化](diagrams/03-bias-variance-tradeoff.mmd) | 欠擬合→最佳→過擬合的模型複雜度曲線 |
| 4 | [損失函數選擇指南](diagrams/04-loss-function-selection.mmd) | 任務類型對應損失函數的快速對照 |
| 5 | [訓練前配置清單流程圖](diagrams/05-pretraining-config-checklist.mmd) | 模型編譯前需完成的配置項目流程 |

## 2. 關鍵概念總覽圖 (Knowledge Tree)
這張圖不是要一次背完。先抓 3 層就好：

1. 本課最上層心法：先選模型家族，再定架構，再做訓練前配置。
2. 第二層：模型家族看任務與資料；架構看 depth、width、activation；配置看 loss、optimizer、initializer。
3. 第三層：每個選擇都要回到偏差-變異數權衡與考題關鍵字。

讀下面的樹狀圖時，先看「題目給了哪一種資料與輸出」，再看「它暗示模型要更簡單還是更有容量」。

```text
L23302 模型選擇與架構設計
├─ 🎯 先界定問題
│  ├─ 分類（Classification）→ 輸出類別
│  │  ├─ 二元分類 → Sigmoid / binary cross-entropy
│  │  └─ 多類別分類 → Softmax / categorical cross-entropy
│  ├─ 回歸（Regression）→ 輸出連續數值
│  │  └─ MSE / MAE；輸出層常不用分類 activation
│  ├─ 影像 / 空間資料 → CNN
│  │  └─ ⚠️ 陷阱：CNN 強在局部感知與參數共享，不是因為「層數多」而已
│  ├─ 序列 / 時間資料 → RNN / LSTM / GRU / Transformer
│  │  └─ ⚠️ 陷阱：長距依賴常想到 Transformer，不是只背 LSTM
│  └─ 表格特徵 → 線性模型 / 樹模型 / SVM / 集成 / MLP
│
├─ 🧠 模型家族選擇（Model Family Selection）
│  ├─ 資料量少 + 解釋性高 → 簡單模型、線性模型、決策樹
│  ├─ 非線性強 + 表格資料 → 樹模型、SVM、集成方法
│  ├─ 影像特徵 → CNN
│  ├─ 時間依賴 → LSTM / GRU
│  ├─ 文字長距依賴 → Transformer
│  └─ ⚠️ 陷阱：模型越複雜不一定越好，資料少時容易高變異
│
├─ ⚖️ Bias-Variance Trade-off
│  ├─ 高偏差（High Bias）→ 模型太簡單 → 欠擬合（Underfitting）
│  ├─ 高變異（High Variance）→ 模型太複雜或資料少 → 過擬合（Overfitting）
│  ├─ 降低高偏差 → 增加模型容量、加特徵、換較強模型
│  ├─ 降低高變異 → 簡化模型、正則化、更多資料
│  └─ ⚠️ 陷阱：看到訓練好測試差，通常不是「模型不夠大」
│
├─ 🏗️ 架構定義（Architecture Definition）
│  ├─ 層數（Depth）→ 模型有幾層轉換
│  ├─ 寬度 / 容量（Width / Capacity）→ 每層 units、filters、channels
│  ├─ 激活函數（Activation Function）→ 加入非線性與決定輸出形態
│  ├─ 輸入層（Input Layer）→ 接資料形狀
│  ├─ 隱藏層（Hidden Layer）→ 學特徵表示
│  └─ 輸出層（Output Layer）→ 對應任務輸出
│
├─ ⚡ 激活函數（Activation Function）
│  ├─ ReLU → 隱藏層常用，適合深層網路
│  ├─ Sigmoid → 二元分類輸出機率
│  ├─ Softmax → 多類別分類輸出機率分布
│  ├─ Tanh → 常見於 RNN/LSTM 內部狀態
│  └─ ⚠️ 陷阱：Sigmoid 不是多類別互斥分類的標準答案
│
└─ 🧩 訓練前核心配置（Pre-training Core Configuration）
   ├─ 損失函數（Loss Function）
   │  ├─ 分類 → Cross-Entropy
   │  └─ 回歸 → MSE / MAE
   ├─ 優化器（Optimizer）
   │  ├─ SGD → 基礎梯度下降概念
   │  ├─ RMSprop → 適合處理梯度尺度變化
   │  └─ Adam → 常見自適應 optimizer，整合 momentum 類概念
   ├─ 初始化（Initialization）
   │  ├─ Xavier / Glorot → 常與 tanh / sigmoid 場景連結
   │  └─ He → 常與 ReLU 場景連結
   └─ compile()
      └─ ⚠️ 陷阱：compile 是訓練前配置終點，不是 fit 訓練開始
```

## 3. Core Concepts
### 3.1 模型家族選擇（Model Family Selection）🔥🔥🔥
**先懂一句話：**
模型家族選擇就是「先看題目像哪一種資料工作，再選最像那種工作的工具」。

**它在流程中的位置：**
問題定義 → 資料型態 / 任務類型判斷 → **模型家族選擇** → 架構定義 → 訓練前配置 → L23303 訓練執行

#### 白話說明
🗣️ 把模型家族想成你在 104 人力銀行找人才。要修水管找水電師傅，要做平面設計找設計師，要送餐找 Uber Eats 外送員；不是「最厲害的人」就適合所有工作。AI 模型也是一樣，影像題先想卷積神經網路（Convolutional Neural Network, CNN），時間序列先想長短期記憶網路（Long Short-Term Memory, LSTM）或門控循環單元（Gated Recurrent Unit, GRU），文字長距依賴常想到 Transformer。

#### 先問自己一個問題
考題給我的線索是什麼？

- 它要分類、回歸、聚類，還是預測序列？
- 資料是表格、影像、文字、語音、時間序列，還是感測器資料？
- 資料量大不大？
- 需要解釋性嗎？
- 要部署在手機、邊緣裝置或即時服務嗎？

#### 技術說法
模型家族（model family）是同一類建模方法的集合，例如線性模型（linear model）、決策樹（decision tree）、支援向量機（Support Vector Machine, SVM）、集成模型（ensemble model）、多層感知器（Multilayer Perceptron, MLP）、卷積神經網路（CNN）、循環神經網路（Recurrent Neural Network, RNN）、LSTM、GRU、Transformer。

本課不要求你把每個模型的數學推導背完，而是要會做**情境配對**：

```text
題目線索
→ 任務類型
→ 資料型態
→ 模型家族
→ 大致架構方向
```

#### 選擇流程
```text
先看輸出
├─ 類別 → 分類模型
│  ├─ 表格 → 線性模型 / 樹模型 / SVM / 集成 / MLP
│  ├─ 影像 → CNN
│  └─ 文字 / 序列 → RNN / LSTM / Transformer
├─ 連續數值 → 回歸模型
│  ├─ 表格 → 線性回歸 / 樹模型 / 集成
│  └─ 時間序列 → LSTM / GRU / Transformer
└─ 無標籤分群 → 聚類模型
   └─ 本課只要知道它不是分類 supervised learning
```

#### 模型家族快選表
| 題目線索 | 優先想到 | 為什麼 |
|---|---|---|
| 客戶年齡、收入、交易次數等表格欄位 | 線性模型 / 樹模型 / SVM / 集成 | 表格特徵通常先用可解釋或強基準模型 |
| 商品圖片分類、瑕疵影像辨識 | CNN | 影像有局部空間特徵，CNN 擅長局部感知與參數共享 |
| 每小時電力需求、股價序列、感測器時間資料 | LSTM / GRU / Transformer | 時間順序與過去狀態會影響未來 |
| 長篇文字分類、問答、語意理解 | Transformer | 長距依賴與注意力機制（attention mechanism）強 |
| 資料量少、主管要求說明理由 | 線性模型 / 決策樹 | 解釋性較好，過度複雜模型容易過擬合 |
| 高維非線性資料、表格分類效果不足 | SVM / 隨機森林 / 梯度提升 / MLP | 需要更高模型容量處理非線性關係 |
| 手機端即時推論 | 較小模型 / 壓縮架構 | 部署限制會影響模型選擇 |

#### Bias-Variance 在模型選擇中的位置
偏差-變異數權衡（bias-variance trade-off）是模型選擇題的核心判斷。

```text
模型太簡單
→ 抓不到真實規律
→ 高偏差（High Bias）
→ 欠擬合（Underfitting）

模型太複雜 + 資料少
→ 把訓練資料細節也背起來
→ 高變異（High Variance）
→ 過擬合（Overfitting）
```

🗣️ 用全家店員排班來想：如果你只用「今天星期幾」安排人力，模型太簡單，可能抓不到天氣、活動、商圈人潮，這是高偏差。可是如果你把去年某一天某一位客人的購買細節都拿來排班，模型記太細，換一天就不準，這是高變異。

#### 一步一步例子
題目：某公司有 800 筆客戶資料，欄位包含年齡、職業、購買頻率、平均客單價，要預測客戶是否會續約。主管要求能說明主要判斷依據。

判斷步驟：

1. 輸出是「會 / 不會續約」→ 二元分類（binary classification）。
2. 資料是欄位式表格 → 表格資料（tabular data）。
3. 資料量 800 筆，不算大 → 不宜一開始用很深的神經網路。
4. 主管要求能說明 → 解釋性重要。
5. 合理答案 → 邏輯斯迴歸（logistic regression）、決策樹（decision tree）、隨機森林（random forest）等比大型深度模型更合理。

#### Code Pattern 認識就夠
```python
# 模型家族選擇 — 認識題目怎麼從資料型態連到模型，不需要背完整語法
from tensorflow import keras

# 表格資料可先想 MLP，但資料少或要求解釋性時，不一定是首選
tabular_model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

# 影像資料常看到 Conv2D，代表 CNN 家族
image_model = keras.Sequential([
    keras.layers.Conv2D(32, kernel_size=3, activation='relu', input_shape=(28, 28, 1)),  # Keras 3：第一層需指定 input_shape
    keras.layers.Flatten(),
    keras.layers.Dense(10, activation='softmax')
])

# 時間序列常看到 LSTM / GRU
sequence_model = keras.Sequential([
    keras.layers.LSTM(64),
    keras.layers.Dense(1)
])
```

#### Exam Rule
```text
影像 / 空間局部特徵 → CNN
時間序列 / 前後順序 → RNN / LSTM / GRU
長文字 / 長距依賴 → Transformer
表格資料 + 解釋性 → 線性模型 / 決策樹
資料少 + 複雜模型測試差 → 高變異 / 過擬合 / 簡化架構
模型太簡單、訓練也差 → 高偏差 / 欠擬合 / 增加容量
```

#### Quick Check
題目：某題描述「輸入為產品外觀照片，要辨識表面刮痕位置與類型」，最適合優先想到哪一類模型？

答案：CNN。因為影像資料有局部空間特徵，CNN 的局部感知與參數共享適合處理影像。

#### 情境題 Scenario Bank
| 情境 | 關鍵線索 | 推薦判斷 |
|---|---|---|
| 銀行用客戶欄位預測是否違約，並要能解釋原因 | 表格 + 解釋性 | 線性模型、決策樹、樹模型 |
| 工廠相機拍產品判斷瑕疵 | 影像 + 空間局部特徵 | CNN |
| 依每小時用電量預測明日尖峰 | 時間序列 + 順序依賴 | LSTM / GRU / Transformer |

### 3.2 神經網路架構定義（Neural Network Architecture Definition）🔥🔥🔥
**先懂一句話：**
架構定義就是先畫好模型的「樓層、房間數、每層功能」，讓模型知道資料要怎麼一路被轉換成答案。

**它在流程中的位置：**
模型家族選擇 → **架構定義：層數、單元、通道、激活函數** → 訓練前配置 → L23303 訓練執行

#### 白話說明
🗣️ 想像你在蝦皮開一間倉庫。第一區收貨，第二區分類，第三區包裝，最後一區出貨。神經網路也一樣：輸入層（input layer）接資料，隱藏層（hidden layer）學特徵，輸出層（output layer）產生答案。你決定幾個區、每區幾個人、每區做什麼，就是在設計架構。

#### 技術說法
神經網路架構（neural network architecture）是模型中各層的安排方式。常見設定包括：

- 層數（depth）：模型有幾層可學習轉換。
- 寬度（width）：每層有多少神經元（neurons）或單元（units）。
- 通道 / 濾波器數（channels / filters）：CNN 中每層要學多少種局部特徵。
- 激活函數（activation function）：讓模型能表達非線性關係。
- 輸出層設計（output layer design）：讓輸出符合分類或回歸任務。

#### 架構視覺圖
```text
表格資料 MLP 範例

Input features
   │
   ▼
Dense(128) + ReLU     ← hidden layer，學第一層特徵組合
   │
   ▼
Dense(64) + ReLU      ← hidden layer，學更抽象的特徵
   │
   ▼
Dense(10) + Softmax   ← output layer，多類別分類
```

```text
影像 CNN 範例

Image
  │
  ▼
Conv2D + ReLU     ← 找局部邊緣、紋理、形狀
  │
  ▼
Pooling           ← 壓縮空間尺寸，保留重要特徵
  │
  ▼
Flatten / Dense   ← 轉成分類器可用的特徵
  │
  ▼
Softmax           ← 多類別輸出
```

#### Depth、Width、Capacity 怎麼看
| 架構元素 | 中文直覺 | 太小可能 | 太大可能 |
|---|---|---|---|
| Depth 層數 | 樓層數 | 表達能力不足、高偏差 | 計算變重、梯度問題、過擬合 |
| Width 寬度 / units | 每層房間數 | 容量不足 | 參數太多、資料少時高變異 |
| Filters 濾波器 | CNN 找幾種圖像特徵 | 找不到足夠圖像模式 | 參數與計算成本增加 |
| Activation 激活函數 | 每層的轉換規則 | 只能表達線性關係 | 選錯會造成輸出解讀錯誤 |

#### 架構定義常見考法
考題常不會叫你設計完整模型，而是問「哪個敘述正確」：

- CNN 第一層常用卷積層（convolution layer）擷取局部特徵。
- CNN 相對全連接網路（Fully Connected Neural Network, FCNN）常有局部感知與參數共享。
- 增加層數與單元數會增加模型容量，但也可能增加過擬合風險。
- 輸出層單元數要對應任務：二元分類常 1 個 sigmoid，多類別分類常 N 個 softmax。

#### 一步一步例子
題目：要做 10 類商品圖片分類，輸入是商品照片。

1. 資料型態是影像 → 模型家族先想 CNN。
2. 影像需要找局部特徵 → 使用 Conv2D。
3. 隱藏層常用 ReLU → 加入非線性且計算簡單。
4. 輸出是 10 類互斥分類 → 輸出層 10 個 units。
5. 多類別分類輸出機率分布 → activation 用 Softmax。

#### Code Pattern 認識就夠
```python
# 架構定義 — 認識這個 pattern，不需要背完整語法
from tensorflow import keras
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', kernel_initializer='he_normal'),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',  # from_logits=False（預設）搭配 softmax 輸出層；若用 from_logits=True 則移除 softmax
    metrics=['accuracy']
)
# ↑ compile() 是訓練前配置的終點，不是訓練開始
```

#### Exam Rule
```text
layers / depth → 層數
units / neurons → 每層寬度
filters / channels → CNN 特徵通道數
Conv2D → CNN / 影像 / 局部特徵
Dense → MLP / 全連接層
輸出 10 類 → Dense(10) + Softmax
增加層數或 units → 容量增加，也增加過擬合風險
```

#### Quick Check
題目：模型在訓練資料和驗證資料表現都很差，可能是哪一種架構問題？

答案：模型容量不足，偏向高偏差 / 欠擬合。因為連訓練資料都學不好，通常不是過度記憶，而是模型太簡單或特徵不足。

#### 情境題 Scenario Bank
| 情境 | 關鍵線索 | 推薦判斷 |
|---|---|---|
| 題目問 CNN 為何適合影像 | 局部區塊、共享權重 | 局部感知 + 參數共享 |
| 題目問 Dense(128) 的 128 是什麼 | units / neurons | 該層單元數，代表寬度 |
| 題目問模型層數增加的效果 | depth 變大 | 容量增加，但可能過擬合 |

### 3.3 激活函數選擇（Activation Function Selection）🔥🔥🔥
**先懂一句話：**
激活函數決定每一層如何「轉彎」，輸出層的激活函數則決定答案要長得像機率、類別分布還是連續數值。

**它在流程中的位置：**
架構定義 → **選隱藏層與輸出層 activation** → loss function 配對 → compile 訓練前配置

#### 白話說明
🗣️ 在 LINE 聊天時，你不只是把文字原封不動傳出去，還會加貼圖、語氣、已讀不回的暗示。激活函數也像每層的語氣轉換器：ReLU 讓隱藏層保留有用訊號、丟掉負值；Sigmoid 把答案壓成 0 到 1；Softmax 把多個類別轉成一組加總為 1 的機率分布。

#### 技術說法
激活函數（activation function）是神經網路每層輸出前的非線性轉換。沒有非線性，多層線性轉換合在一起仍像一層線性模型，模型表達能力會受限。

常見 activation：

- ReLU（Rectified Linear Unit）：隱藏層常用，負數變 0，正數保留。
- Sigmoid（sigmoid function）：把輸出壓到 0 到 1，常用於二元分類輸出。
- Softmax（softmax function）：把多個分數轉成機率分布，常用於多類別互斥分類。
- Tanh（hyperbolic tangent）：輸出介於 -1 到 1，常見於 RNN/LSTM 內部狀態。

#### 輸出層選擇流程
```text
先問：答案長什麼樣？

二元分類：是 / 否
→ Dense(1, activation='sigmoid')
→ loss 常配 binary_crossentropy

多類別互斥分類：貓 / 狗 / 鳥 / 車
→ Dense(num_classes, activation='softmax')
→ loss 常配 categorical_crossentropy 或 sparse_categorical_crossentropy

回歸：房價、溫度、銷售額
→ Dense(1) 或 linear output
→ loss 常配 MSE / MAE
```

#### Sigmoid vs Softmax 視覺理解
```text
Sigmoid：每個輸出像一個獨立開關

輸入分數 → 0.87
          → 可解讀為「正類機率高」

Softmax：多個類別一起分配 100% 機率

貓  2.1 ┐
狗  0.4 ├─ Softmax → 貓 0.78、狗 0.14、鳥 0.08
鳥 -0.2 ┘
```

#### 常見配對表
| 場景 | 輸出層 activation | 常配 loss | 考場說法 |
|---|---|---|---|
| 二元分類 | Sigmoid | Binary Cross-Entropy | 看到 yes/no、0/1、是否違約 |
| 多類別互斥分類 | Softmax | Categorical Cross-Entropy / Sparse Categorical Cross-Entropy | 看到 N 類擇一 |
| 多標籤分類 | Sigmoid | Binary Cross-Entropy | 一筆資料可同時有多個標籤 |
| 回歸 | Linear / 無 activation | MSE / MAE | 看到連續數值 |
| 隱藏層 | ReLU | 依任務而定 | 深度網路常用 |

#### 一步一步例子
題目：一個模型要判斷圖片屬於「貓、狗、兔子」三者之一。

1. 三者之一 → 多類別互斥分類。
2. 類別數是 3 → 輸出層 units = 3。
3. 要輸出三類機率分布 → activation = Softmax。
4. loss 可選 categorical cross-entropy 或 sparse categorical cross-entropy。

如果題目改成：「一張照片可能同時包含貓與狗」，那就不是互斥多類別，而是多標籤分類（multi-label classification），輸出層常用多個 Sigmoid。

#### Code Pattern 認識就夠
```python
from tensorflow import keras

# 二元分類：一個輸出 + sigmoid
binary_model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

# 多類別分類：N 個輸出 + softmax
multi_class_model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(3, activation='softmax')
])

# 回歸：通常不加 sigmoid / softmax
regression_model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1)
])
```

#### Exam Rule
```text
hidden layer 常見非線性 → ReLU
二元分類輸出 → Sigmoid
多類別互斥分類輸出 → Softmax
多標籤分類 → 多個 Sigmoid
回歸輸出 → Linear / no activation
Sigmoid vs Softmax 是高頻混淆題
```

#### Quick Check
題目：模型要從 5 種商品類別中選出唯一一類，輸出層 activation 最適合哪一個？

答案：Softmax。因為 5 類互斥分類需要把 5 個類別分數轉成一組機率分布。

#### 情境題 Scenario Bank
| 情境 | 關鍵線索 | 推薦判斷 |
|---|---|---|
| 是否為詐欺交易 | 是 / 否、0 / 1 | Sigmoid |
| 分成 8 種產品類別之一 | 多類別擇一 | Softmax |
| 一篇文章可同時標記財經、科技、國際 | 多標籤 | 多個 Sigmoid |

### 3.4 訓練前核心配置（Pre-training Core Configuration）🔥🔥🔥
**先懂一句話：**
訓練前核心配置就是在按下訓練前，先告訴模型「怎麼算錯、怎麼改、起點怎麼放」。

**它在流程中的位置：**
架構定義 → activation 選擇 → **loss / optimizer / initializer / compile** → L23303 `fit()` 訓練執行

#### 白話說明
🗣️ 想像你要用 Uber Eats 開店。正式接單前要先設定：客訴怎麼計分（loss）、店員怎麼根據評分改善流程（optimizer）、一開始菜單價格怎麼設定（initializer）。設定完才開始營運。Keras 的 `compile()` 就像把這些規則先填好，還不是正式開始訓練。

#### 技術說法
訓練前核心配置（pre-training core configuration）通常包含：

- 損失函數（loss function）：模型錯誤程度的計分方式。
- 優化器（optimizer）：根據 loss 調整權重的策略。
- 初始化策略（initialization strategy）：訓練開始前權重的初始值設定。
- 評估指標（metric）：訓練時觀察表現的指標；本課只作辨識，不展開 L23303 評估。
- 編譯（compile）：在 Keras 中把 loss、optimizer、metrics 組合起來。

#### 配置流程圖
```text
先知道任務
  │
  ├─ 分類 → Cross-Entropy 類 loss
  │    ├─ 二元分類 → binary_crossentropy
  │    └─ 多類別分類 → categorical / sparse categorical crossentropy
  │
  ├─ 回歸 → MSE / MAE
  │
  ├─ 選 optimizer
  │    ├─ SGD → 基礎、可解釋、需較多調整
  │    ├─ RMSprop → 自適應學習率，常見於序列或非平穩梯度語境
  │    └─ Adam → 常見預設，自適應 + momentum 類概念
  │
  ├─ 選 initializer
  │    ├─ ReLU → He
  │    └─ tanh / sigmoid → Xavier / Glorot
  │
  └─ compile()
       └─ 訓練前配置完成，但還沒 fit()
```

#### Loss Function 快判
| 任務 | 常見 loss | 直覺 |
|---|---|---|
| 二元分類 | Binary Cross-Entropy（二元交叉熵） | 答案是 0/1，懲罰機率判錯 |
| 多類別分類 | Categorical Cross-Entropy（類別交叉熵） | 多類別機率分布判錯會被懲罰 |
| 標籤是整數類別 | Sparse Categorical Cross-Entropy | 類別標籤不是 one-hot，而是 0、1、2 |
| 回歸 | Mean Squared Error, MSE（均方誤差） | 大錯誤被平方放大 |
| 回歸且想較不受極端值影響 | Mean Absolute Error, MAE（平均絕對誤差） | 每個誤差用絕對值計分 |

#### Optimizer 快判
| 優化器 | 直覺 | 考場記法 |
|---|---|---|
| SGD（Stochastic Gradient Descent） | 每次看一小批資料往下降方向走 | 最基礎梯度下降 |
| RMSprop | 針對梯度尺度做自適應調整 | 自適應學習率 |
| Adam（Adaptive Moment Estimation） | 結合動量概念與自適應調整 | 深度學習常見預設 |

#### Initializer 快判
| 初始化策略 | 常搭配 | 為什麼考 |
|---|---|---|
| Xavier / Glorot Initialization | tanh / sigmoid 類 activation | 控制前後層訊號尺度，避免太快消失或爆炸 |
| He Initialization | ReLU 類 activation | ReLU 的有效輸出約為一半（p(x>0)≈0.5），He 以 2/fan_in 的方差尺度確保信號跨層不消失或爆炸。 |
| Random Normal / Random Uniform | 一般隨機初始化 | 考題可能拿來當干擾選項 |

#### compile() 與 fit() 的邊界
```text
model = define_architecture()
model.compile(optimizer=..., loss=..., metrics=...)
        ↑
        L23302：訓練前核心配置完成

model.fit(X_train, y_train, epochs=...)
        ↑
        L23303：訓練執行與監控
```

#### 一步一步例子
題目：有 10 類手寫數字分類，標籤是整數 0 到 9，模型使用 ReLU 隱藏層。

1. 任務是多類別分類 → output activation 用 Softmax。
2. 標籤是整數 0 到 9，不是 one-hot → loss 可用 sparse categorical cross-entropy。
3. 隱藏層是 ReLU → initializer 可想到 He。
4. 常見 optimizer → Adam。
5. 在 Keras 中把這些放進 `compile()`，但還沒有開始訓練。

#### Code Pattern 認識就夠
```python
# 架構定義 — 認識這個 pattern，不需要背完整語法
from tensorflow import keras
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', kernel_initializer='he_normal'),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',  # from_logits=False（預設）搭配 softmax 輸出層；若用 from_logits=True 則移除 softmax
    metrics=['accuracy']
)
# ↑ compile() 是訓練前配置的終點，不是訓練開始
```

#### Exam Rule
```text
分類 loss → Cross-Entropy
回歸 loss → MSE / MAE
ReLU → He initialization
tanh / sigmoid → Xavier / Glorot
Adam → 常見自適應 optimizer
compile() → 設定 loss / optimizer / metrics，不是 fit()
```

#### Quick Check
題目：Keras 程式中出現 `model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')`，這行代表模型已經開始訓練了嗎？

答案：沒有。`compile()` 是訓練前配置，真正開始訓練通常是呼叫 `fit()`。

#### 情境題 Scenario Bank
| 情境 | 關鍵線索 | 推薦判斷 |
|---|---|---|
| 二元分類模型需要設定 loss | 0/1、是/否 | Binary Cross-Entropy |
| 多類別分類標籤是整數 | label = 0,1,2 | Sparse Categorical Cross-Entropy |
| 預測房價 | 連續數值 | MSE / MAE |
| ReLU 深度網路初始化 | ReLU + initializer | He |

## 4. Comparison Tables (易混淆概念)
### 4.1 Sigmoid vs Softmax（輸出層激活函數）
Sigmoid = 獨立開關；Softmax = 多類別分票。

| 比較點 | Sigmoid | Softmax |
|---|---|---|
| 中文直覺 | 每個輸出各自判斷是 / 否 | 多個類別一起分配總機率 |
| 常見任務 | 二元分類、多標籤分類 | 多類別互斥分類 |
| 輸出範圍 | 每個值 0 到 1 | 每個值 0 到 1，總和為 1 |
| 輸出層型態 | `Dense(1, activation='sigmoid')` 或多個 sigmoid | `Dense(N, activation='softmax')` |
| 常配 loss | Binary Cross-Entropy | Categorical / Sparse Categorical Cross-Entropy |
| 常見陷阱 | 把多類別互斥分類誤選 sigmoid | 把二元分類或多標籤分類誤選 softmax |

> 考試快判：看到「是否 / 0 或 1」→ Sigmoid；看到「N 類擇一」→ Softmax

### 4.2 Xavier/Glorot vs He 初始化
Initializer = 一開始權重怎麼放；不是訓練後再調參。

| 比較點 | Xavier / Glorot Initialization | He Initialization |
|---|---|---|
| 常搭配 activation | tanh、sigmoid 類 | ReLU 類 |
| 核心直覺 | 讓前後層訊號尺度穩定 | 配合 ReLU 的輸出特性 |
| 常見考法 | 問 sigmoid / tanh 架構初始化 | 問 ReLU 深度網路初始化 |
| 角色 | 訓練前權重初始設定 | 訓練前權重初始設定 |
| 不要誤會 | 不是 optimizer | 不是 activation |

> 考試快判：看到「tanh / sigmoid 初始化」→ Xavier/Glorot；看到「ReLU 初始化」→ He

### 4.3 SGD vs Adam vs RMSprop（優化器比較）
Optimizer = 模型看見錯誤後，權重怎麼改。

| 比較點 | SGD | RMSprop | Adam |
|---|---|---|---|
| 全名 | Stochastic Gradient Descent | Root Mean Square Propagation | Adaptive Moment Estimation |
| 中文直覺 | 隨機小批次往下降方向走 | 根據梯度尺度調整步伐 | 結合動量與自適應調整 |
| 優點 | 概念基礎、可控 | 適合梯度尺度變化 | 常見預設、收斂通常穩 |
| 常見考法 | 問最基本 optimizer | 問自適應學習率 | 問 Adam 概念或 momentum 類設計 |
| 注意 | 可能需仔細調 learning rate | 不是 loss function | 不是初始化策略 |

> 考試快判：看到「最基本梯度下降」→ SGD；看到「常見自適應 optimizer / momentum 概念」→ Adam

### 4.4 CNN vs RNN/LSTM vs Transformer vs MLP（模型家族適用場景）
模型家族 = 看資料形狀選工具。

| 模型家族 | 最適合場景 | 核心能力 | 常見架構字眼 | 高頻陷阱 |
|---|---|---|---|---|
| MLP / FCNN | 表格特徵、一般向量輸入 | 全連接非線性映射 | Dense、units | 不一定適合影像局部特徵 |
| CNN | 影像、空間局部特徵 | 局部感知、參數共享 | Conv2D、filters、pooling | 不是因為「任何資料都可卷積」 |
| RNN / LSTM / GRU | 時間序列、短中期序列依賴 | 依序處理狀態 | recurrent、LSTM、GRU | 長距依賴不一定最佳 |
| Transformer | 文字、長距依賴、序列建模 | 注意力機制、平行處理序列關係 | attention、multi-head | 不要把它只當 NLP 名詞 |

> 考試快判：看到「影像局部特徵」→ CNN；看到「時間序列 / 長距依賴」→ LSTM 或 Transformer，長文字常偏 Transformer

### 4.5 高偏差（欠擬合）vs 高變異（過擬合）
Bias-Variance = 判斷模型現在是「太笨」還是「太會背」。

| 比較點 | 高偏差 / 欠擬合 | 高變異 / 過擬合 |
|---|---|---|
| 英文 | High Bias / Underfitting | High Variance / Overfitting |
| 模型狀態 | 太簡單，抓不到規律 | 太複雜，記住訓練資料細節 |
| 訓練表現 | 通常也不好 | 通常很好 |
| 測試表現 | 不好 | 不好 |
| 常見原因 | 特徵不足、模型容量太低 | 資料少、架構太複雜、正則化不足 |
| 改善方向 | 增加模型容量、加特徵、換更強模型 | 簡化模型、正則化、更多資料 |

> 考試快判：看到「訓練與測試都差」→ 高偏差；看到「訓練好、測試差」→ 高變異

## 5. 口訣 / Mnemonics
### 5.1 模型家族選擇口訣
```text
表格先穩、影像卷積、時間記憶、長文注意。
```

- 表格先穩：表格資料先想線性模型、樹模型、SVM、集成，必要時才 MLP。
- 影像卷積：影像或空間局部特徵先想 CNN。
- 時間記憶：時間序列先想 RNN / LSTM / GRU。
- 長文注意：文字長距依賴先想 Transformer / attention。

### 5.2 激活函數選擇口訣（輸出層）
```text
一個是非 Sigmoid，多個擇一 Softmax，數值回歸不亂壓。
```

- 一個是非：二元分類常用 Sigmoid。
- 多個擇一：多類別互斥分類常用 Softmax。
- 數值回歸：回歸輸出常用 linear / 無 activation，不要硬加 Softmax。

### 5.3 優化器選擇口訣
```text
SGD 是基本功，Adam 是常見預設，RMSprop 看梯度尺度。
```

- SGD：最基本梯度下降概念。
- Adam：常見自適應 optimizer，考題常問 momentum 類概念。
- RMSprop：看到自適應學習率與梯度尺度變化時可辨識。

補充：Adam 也是自適應學習率；考試區分 Adam vs RMSprop 的關鍵是 Adam 整合了 momentum（動量）概念，RMSprop 沒有。

### 5.4 偏差-變異數快判口訣
```text
都差是太笨；訓練好測試差是太會背。
```

- 都差：模型連訓練資料都學不好 → 高偏差 / 欠擬合。
- 訓練好測試差：模型把訓練資料記太熟 → 高變異 / 過擬合。

## 6. 考試陷阱 (Exam Traps)
❌ 陷阱：Sigmoid 和 Softmax 都輸出機率，所以多類別分類隨便選一個。  
✅ 正解：Sigmoid 常用於二元分類或多標籤分類；Softmax 常用於多類別互斥分類，會讓各類機率總和為 1。

❌ 陷阱：Xavier/Glorot 和 He 初始化只是不同名字，考試不用分。  
✅ 正解：Xavier/Glorot 常與 tanh / sigmoid 場景連結；He 常與 ReLU 場景連結。

❌ 陷阱：`compile()` 一執行，模型就開始訓練。  
✅ 正解：`compile()` 是訓練前配置 loss、optimizer、metrics；真正訓練通常是 `fit()`，屬 L23303。

❌ 陷阱：增加層數一定會提升模型效能。  
✅ 正解：增加層數會增加容量與計算成本，也可能在資料不足時造成高變異 / 過擬合。

❌ 陷阱：資料少但題目很難，所以應該直接用最大最深的模型。  
✅ 正解：資料少時複雜模型容易過擬合；要平衡模型容量、資料量、解釋性與部署限制。

❌ 陷阱：CNN 適合影像，是因為它比所有模型都深。  
✅ 正解：CNN 適合影像的關鍵是局部感知、參數共享與空間特徵抽取。

❌ 陷阱：LSTM 只要看到文字就一定是最佳答案。  
✅ 正解：LSTM 適合序列與時間依賴；長文本與長距依賴題目常會指向 Transformer。

❌ 陷阱：Cross-Entropy 是回歸任務常用 loss。  
✅ 正解：Cross-Entropy 常用於分類；回歸常用 MSE 或 MAE。

## 7. 情境題快速判斷 (Scenario Quick-Judge)
🔑 看到關鍵字 → 選這個答案

| 看到關鍵字 | 選這個答案 |
|---|---|
| 影像 | CNN |
| 局部特徵 | CNN |
| 參數共享 | CNN |
| 時間序列 | LSTM / GRU |
| 前後順序 | RNN / LSTM |
| 長距依賴 | Transformer |
| attention | Transformer |
| 表格欄位 | 線性 / 樹 / SVM / 集成 |
| 解釋性 | 線性模型 / 決策樹 |
| 資料量少 | 避免過度複雜 |
| 訓練也差 | 高偏差 |
| 測試才差 | 高變異 |
| 欠擬合 | 增加容量 |
| 過擬合 | 簡化架構 |
| 二元分類 | Sigmoid |
| 是否 | Sigmoid |
| 多類別擇一 | Softmax |
| 回歸數值 | MSE / MAE |
| 分類 loss | Cross-Entropy |
| 整數類別標籤 | Sparse Categorical Cross-Entropy |
| ReLU 初始化 | He |
| 常見自適應 optimizer | Adam |
| 基本梯度下降 | SGD |
| compile | 訓練前配置 |
| fit | 訓練執行 |
| Dense units | 寬度 / capacity |

## 8. 結尾：快速自我檢查 ✅
- [ ] 我能用一句話說明 L23302 是「選模型家族、定架構、做訓練前配置」。
- [ ] 我看到影像、局部特徵、參數共享時，能快速想到 CNN。
- [ ] 我看到時間序列或前後順序時，能快速想到 RNN / LSTM / GRU；看到長距依賴時會想到 Transformer。
- [ ] 我能分辨高偏差 / 欠擬合與高變異 / 過擬合。
- [ ] 我知道 depth 是層數，width / units 是每層容量，filters 是 CNN 通道或濾波器數。
- [ ] 我不會把 Sigmoid 和 Softmax 混用：二元分類 Sigmoid，多類別互斥分類 Softmax。
- [ ] 我能把分類 loss 對到 Cross-Entropy，把回歸 loss 對到 MSE / MAE。
- [ ] 我知道 Adam 是常見自適應 optimizer，SGD 是基本梯度下降概念。
- [ ] 我知道 ReLU 常配 He 初始化，tanh / sigmoid 常配 Xavier / Glorot 初始化。
- [ ] 我知道 `compile()` 是訓練前配置，真正訓練開始通常是 `fit()`。

📌 Out-of-scope note：本章不教 epoch、batch size、learning curve 監控、early stopping 執行細節，這些屬 L23303；也不教 Grid Search、Random Search、Bayesian Optimization、AutoML 的調參循環，這些屬 L23304。本章的任務是在訓練前先選對模型方向與架構配置。

---

## 📊 圖表附錄（Diagram Appendix）

本課共 5 張 Mermaid 圖表，可用 Mermaid 渲染器開啟：

| # | 圖表檔案 | 說明 |
|---|---|---|
| 1 | [模型選擇決策樹](diagrams/01-model-selection-decision-tree.mmd) | 從資料型態與任務類型到模型家族的完整決策路徑 |
| 2 | [神經網路架構層級圖](diagrams/02-neural-network-layers.mmd) | 輸入層→隱藏層→輸出層的結構，含激活函數選擇說明 |
| 3 | [偏差-變異數權衡視覺化](diagrams/03-bias-variance-tradeoff.mmd) | 模型複雜度vs訓練/測試誤差曲線，欠擬合→最佳→過擬合 |
| 4 | [損失函數選擇指南](diagrams/04-loss-function-selection.mmd) | 依輸出類型（回歸/二元/多類別）快速選loss function |
| 5 | [訓練前配置清單流程圖](diagrams/05-pretraining-config-checklist.mmd) | 6步驟從模型家族選擇到compile()完成的完整流程 |

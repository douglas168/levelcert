# L23203 深度學習原理與框架 學習指南

本章聚焦於深度學習的核心架構與運算機制，是 IPAS AI應用規劃師中級「機器學習組」最重的計算題與比較題來源。Diffusion Model、Vision Transformer（ViT）等新興架構超出本考科邊界，不在本章涵蓋；這些主題屬於 L23204 生成式 AI 應用範疇，請勿混入作答。

---

## Section 1：Exam Item Mapping

### 1a. 對應評鑑範圍

IPAS AI應用規劃師中級：核心技術領域 → 類神經網路架構與深度學習框架應用（佔整體題目約 20–25%）

### 1b. How to Study This Chapter（建議閱讀順序）

1. 先看 **Section 2**（概覽圖）掌握全局架構關係
2. 讀 **Section 3.1–3.2**（MLP → CNN），做完情境題，確認計算題公式能默寫
3. 讀 **Section 3.3–3.4**（RNN/LSTM → Transformer），重點記 4-gate 參數量與 LN 位置
4. 讀 **Section 3.5**（效能分析），理解 learning curve 判讀與 BN/LN/Dropout 擺放
5. **Section 4**（比較表）逐表讀完，背考試快判關鍵字
6. **Section 5–6**（口訣 + 陷阱）在考前 48 小時重讀
7. **Section 7–8** 作快速自我驗收

### 1c. 標記說明

| 標記 | 意義 |
|------|------|
| 🔥 | 考試偶爾出現，理解即可 |
| 🔥🔥 | 中頻考點，必須能選出正確答案 |
| 🔥🔥🔥 | 高頻核心考點，務必能計算或快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

1. 給定 MLP 層結構（如 784→256→10），立即算出每層參數量與總參數量
2. 給定 CNN 設定（H、K、P、S），算出輸出特徵圖大小與 Conv 層參數量
3. 區分 LSTM 與 RNN 的架構差異，說明為何 LSTM 緩解梯度消失，並計算 LSTM 參數量
4. 解釋 Transformer 使用 Layer Normalization（而非 Batch Normalization）的原因
5. 根據任務類型（影像/序列/長文本）選擇適合的架構，並說明理由
6. 判讀 learning curve，診斷 overfitting 或 underfitting，並列舉對應修正策略

### 1e. 考點權重

| 考點 | 權重 | 出處 |
|------|------|------|
| CNN 參數量 / 輸出 shape 計算 | 🔥🔥🔥 | 計算題、考綱 2.2 |
| Sigmoid vs Softmax 使用時機 | 🔥🔥🔥 | 選擇題高頻混淆 |
| BN vs LN 適用情境 | 🔥🔥🔥 | 選擇題，Transformer 必考 |
| LSTM 4-gate 架構與參數量 | 🔥🔥🔥 | 計算題 + 選擇題 |
| VGG / ResNet / Inception 差異 | 🔥🔥🔥 | 選擇題比較 |
| ReLU vs sigmoid 梯度問題 | 🔥🔥 | 選擇題 |
| Backpropagation chain rule 方向 | 🔥🔥 | 選擇題 |
| Transformer attention 機制 | 🔥🔥 | 概念題 |
| Learning curve 診斷 | 🔥🔥 | 情境題 |
| PyTorch vs Keras API 識別 | 🔥 | 選擇題 |

### 1f. 先備知識

- **L23201** 機器學習原理與技術（分類/回歸基礎、損失函數、正規化概念）
- **L23101** 機率統計之機器學習基礎應用（機率輸出、期望值概念）
- **L23102** 線性代數之機器學習基礎應用（矩陣乘法、維度推算）

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|------|------|
| 1 | [MLP前向傳播張量流程](diagrams/01-mlp-forward-pass.md) | 理解 a = σ(Wx+b) 逐層維度變換，對照參數量計算 |
| 2 | [CNN卷積池化解剖圖](diagrams/02-cnn-conv-pooling.md) | 對照 output shape 公式，辨識 VGG/ResNet/Inception 差異 |
| 3 | [RNN與LSTM展開圖](diagrams/03-rnn-lstm-unrolled.md) | 展示 time step 遞迴，標示 LSTM 4 個 gate 位置 |
| 4 | [Transformer編碼器方塊圖](diagrams/04-transformer-encoder.md) | 標示 Multi-head Attention、Add&Norm(LN)、FFN 的正確順序 |
| 5 | [框架比較與架構選擇指引](diagrams/05-framework-arch-selection.md) | 任務類型 → 架構 → 框架的選擇決策樹 |

---

## Section 2：關鍵概念總覽圖

這張圖不是要一次背完。先抓 3 層就好：
- **第一層**：四大架構族群（MLP / CNN / RNN-LSTM / Transformer）
- **第二層**：每個架構的核心運算元件（層 / gate / attention）
- **第三層**：效能分析工具與框架對應

```
深度學習原理與框架 L23203
│
├─ 架構族群
│   ├─ MLP（多層感知器）
│   │   ├─ 全連接層 nn.Linear(in, out)
│   │   ├─ a = σ(Wx + b)
│   │   └─ 參數 = in×out + out（每層）
│   │
│   ├─ CNN（卷積神經網路）
│   │   ├─ Conv2d：特徵提取
│   │   │   ├─ 輸出 shape：floor((H+2P-K)/S)+1
│   │   │   └─ 參數：(k_h×k_w×C_in+1)×C_out
│   │   ├─ Pooling：Max / Average
│   │   └─ 知名架構
│   │       ├─ VGG：3×3 堆疊，深
│   │       ├─ Inception：多 kernel 並聯
│   │       └─ ResNet：skip connection，F(x)+x
│   │
│   ├─ RNN / LSTM（序列模型）
│   │   ├─ RNN：h_t = tanh(W_h×h_{t-1} + W_x×x_t + b)
│   │   ├─ LSTM：4 gates（forget/input/cell/output）
│   │   │   └─ 參數：4×(input+hidden+1)×hidden
│   │   └─ 適用：時間序列、語音、文字序列
│   │
│   └─ Transformer（注意力機制）
│       ├─ Self-Attention：softmax(QK^T/√d_k)×V
│       ├─ Multi-head Attention
│       ├─ Layer Normalization（非 BN）
│       ├─ Positional Encoding
│       └─ 變體：BERT(Encoder) / GPT(Decoder) / T5(Enc-Dec)
│
├─ 層級運算機制
│   ├─ Forward pass：輸入 → 逐層運算 → 輸出
│   ├─ Backpropagation：∂L/∂W = (∂L/∂a)×(∂a/∂z)×(∂z/∂W)
│   ├─ 激活函數
│   │   ├─ ReLU：max(0,x)，CNN 標準，dead neuron 風險
│   │   ├─ Sigmoid：二元輸出，梯度最大 0.25
│   │   ├─ Softmax：多類別輸出，和=1
│   │   ├─ tanh：RNN hidden（已少用）
│   │   └─ GELU：Transformer FFN 標準
│   └─ 正規化 / 正則化
│       ├─ Batch Normalization：batch 維度，CNN/MLP
│       ├─ Layer Normalization：特徵維度，Transformer
│       └─ Dropout：訓練時隨機遮蔽，model.train() 才作用
│
└─ 模型效能分析
    ├─ Learning curve：train vs val loss
    │   ├─ val loss 上升 → overfitting
    │   └─ 兩者皆高 → underfitting
    ├─ 框架
    │   ├─ PyTorch：動態圖，研究首選
    │   └─ Keras/TF：靜態圖，部署首選
    └─ Batch size 效應
        ├─ 大 batch → sharp minima → 泛化差
        └─ 小 batch → 雜訊正則化 → 泛化好
```

---

## Section 3：Core Concepts

### 3.1 MLP 多層感知器（Multilayer Perceptron）🔥🔥

#### 先懂一句話：
MLP 是最基本的深度學習積木——把資料拉成一個向量，經過若干全連接層逐層變換，最後輸出預測。

#### 它在流程中的位置：
輸入向量 → **【MLP 全連接層×N】** → 激活函數 → 輸出層 → 損失函數 → 反向傳播

---

每一層的運算核心只有一行：

```
a = σ(Wx + b)
```

- **x**：輸入向量（shape = [in_features]）
- **W**：權重矩陣（shape = [out_features, in_features]）
- **b**：偏差向量（shape = [out_features]）
- **σ**：激活函數（ReLU、sigmoid、softmax 等）
- **a**：輸出向量（shape = [out_features]）

#### 參數量計算（考試必考）

每一個 Linear 層的參數量：

```
params = (in_features × out_features) + out_features
       = in_features × out_features  [W]  +  out_features  [b]
```

**實際計算範例：手寫數字辨識 MLP**

```
Input: 784（28×28 圖片攤平）
Layer 1: 784 → 256   params = 784×256 + 256 = 200,960
Layer 2: 256 → 10    params = 256×10  + 10  =   2,570
                               ─────────────────────────
Total:                                          203,530
```

🗣️ 類比：想像 784 個 LINE 好友每人傳一個數字給 256 個群組管理員（W），每個管理員還有自己的基礎分數（b）。Layer 2 就是管理員再投票給 10 個候選人（數字 0–9）。

🔥🔥 在全連接層，**每個輸出神經元都和所有輸入神經元相連**，這是 CNN 局部感受野不同之處。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|----------|----------|------------|
| MLP 層 128→64，含 bias，共幾個參數？ | 128×64 + 64 = 8,256 | 忘記加 bias：128×64 = 8,192 |
| MLP 最後輸出層有 10 個類別，應用什麼激活？ | Softmax（多類別） | Sigmoid（只適合二元） |
| 訓練資料 shape (batch=32, 784)，Linear(784,256) 輸出 shape？ | (32, 256) | (256, 784)（矩陣方向錯） |

#### Code Pattern 認識就夠

```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)   # W shape: [256, 784]
        self.fc2 = nn.Linear(256, 10)    # W shape: [10, 256]
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))       # a = ReLU(Wx + b)
        x = self.fc2(x)                  # 最後層不加激活，交給 loss fn
        return x
```

---

### 3.2 CNN 卷積神經網路（Convolutional Neural Network）🔥🔥🔥

#### 先懂一句話：
CNN 用「滑動視窗」掃描影像，自動學習局部特徵（邊緣、紋理、形狀），計算比 MLP 省，對平移具有不變性。

#### 它在流程中的位置：
影像輸入 → **【Conv→激活→Pooling×N】** → Flatten → FC 層 → Softmax 輸出

---

#### Conv 輸出大小（🔥🔥🔥 最常考）

```
H_out = floor( (H_in + 2×P - K) / S ) + 1
W_out = floor( (W_in + 2×P - K) / S ) + 1
```

- H_in / W_in：輸入高度/寬度
- K：kernel size（如 3 表示 3×3）
- P：padding（zero-padding 圈數）
- S：stride（滑動步長）

**計算範例：**

```
輸入 32×32，Conv2d(kernel=3, padding=1, stride=1)
H_out = floor( (32 + 2×1 - 3) / 1 ) + 1
      = floor( 32 / 1 ) + 1 = 32 + 1... 等等
      = floor( (32+2-3)/1 ) + 1 = floor(31/1) + 1 = 32
→ 輸出仍是 32×32（padding=1 讓 same size）
```

Pooling 同公式，K = pool_size，通常 stride = K（不重疊）。

#### Conv 參數量（🔥🔥🔥）

```
params = (k_h × k_w × C_in + 1) × C_out
```

+1 是 bias（每個輸出 channel 一個 bias）。

**計算範例：**

```
Conv2d(in_channels=3, out_channels=64, kernel_size=3)
params = (3 × 3 × 3 + 1) × 64 = (27 + 1) × 64 = 1,792
```

🗣️ 類比：把 64 個不同的「蝦皮商品篩選模板」（3×3 的玻璃板）套在 RGB 3 色的商品圖上掃描，每個模板有一個底色偏移（bias）。

#### Pooling：Max vs Average

```
Max Pooling：取區域內最大值
→ 保留「最強特徵」（是否有邊緣？）
→ 平移不變性強，降維

Average Pooling：取區域平均值
→ 保留「整體分布」
→ 常用於 Global Average Pooling（GAP）取代全連接層
```

#### VGG vs ResNet vs Inception 比較（🔥🔥🔥）

```
VGG（Visual Geometry Group）
├─ 設計：只用 3×3 conv 不斷堆疊，加 2×2 max pooling
├─ 優點：結構簡單、容易理解
└─ 缺點：層數深時梯度消失、參數量大（138M for VGG-16）

Inception（GoogLeNet）
├─ 設計：同一層同時用 1×1、3×3、5×5 conv 並聯，concat 結果
├─ 1×1 conv：先降維減少計算量，再做大 kernel
├─ 優點：多尺度特徵提取，參數量遠少於 VGG
└─ 缺點：結構複雜，難以修改

ResNet（Residual Network）
├─ 設計：skip connection → output = F(x) + x
├─ 核心價值：梯度可直接跳過若干層傳回，解決深層梯度消失
├─ 可訓練超過 100 層（ResNet-50/101/152）
└─ 現在幾乎是所有深層 CNN 的基礎設計
```

🔥🔥🔥 ResNet 的 skip connection 的核心目的是**解決梯度消失**，讓超深網路可訓練——不僅僅是提升精度。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|----------|----------|------------|
| 輸入 224×224，Conv(K=3,P=0,S=1)，輸出 H？ | floor((224+0-3)/1)+1 = 222 | 直接說 224（忘記 kernel 縮邊） |
| Conv2d(in=1, out=32, kernel=5)，參數量？ | (5×5×1+1)×32 = 832 | 5×5×32 = 800（忘 bias，忘 in_ch） |
| 為什麼 ResNet 能訓練 150 層？ | skip connection 讓梯度直接回傳，不消失 | 因為用了更多資料 |
| 影像平移幾個像素後，Max Pooling 輸出變？ | 不變（平移不變性） | 跟著改變 |

#### Code Pattern 認識就夠

```python
import torch.nn as nn

# 基本 CNN block
conv_block = nn.Sequential(
    nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1),
    nn.BatchNorm2d(64),
    nn.ReLU(),
    nn.MaxPool2d(kernel_size=2, stride=2)   # H/2, W/2
)

# Keras 版
from tensorflow.keras import layers
layers.Conv2D(filters=64, kernel_size=3, activation='relu', padding='same')
layers.MaxPooling2D(pool_size=2)
```

---

### 3.3 RNN 與 LSTM 序列模型（Recurrent Neural Network & LSTM）🔥🔥

#### 先懂一句話：
RNN 和 LSTM 是有「記憶」的網路——每個時間步的輸出都依賴前一步的隱藏狀態，專門處理序列資料。

#### 它在流程中的位置：
序列輸入 [x₁, x₂, ..., x_T] → **【RNN/LSTM 遞迴處理】** → 最後 hidden state → 輸出

---

#### RNN 基本公式

```
h_t = tanh( W_h × h_{t-1} + W_x × x_t + b )
```

- h_t：當前時間步的 hidden state
- h_{t-1}：上一時間步的 hidden state（記憶）
- x_t：當前輸入

**問題：長序列梯度消失**

tanh 的導數最大值約 1，100 步反向傳播後：`0.9`（說明用例，實際導數依輸入而異）`^100 ≈ 0.00003`——梯度幾乎消失。

#### LSTM 架構：4 個 Gate

LSTM 通過 **cell state（長期記憶）** 和 3 個 gate 克服梯度消失：

```
┌─────────────────────────────────────────────┐
│  cell state C_t ────────────────────────── →│（長期記憶高速公路）
│        ↑ ×          ↑ +                     │
│   Forget gate    Input gate                  │
│   σ(...)          σ(...) × tanh(...)         │
│                                              │
│  h_t = Output gate × tanh(C_t)              │
│        σ(...)                                │
└─────────────────────────────────────────────┘
```

| Gate | 作用 | 激活函數 |
|------|------|---------|
| **Forget gate** | 決定忘記多少過去 cell state | σ (0~1 遮罩) |
| **Input gate** | 決定加入多少新資訊 | σ × tanh |
| **Cell gate（候選 cell，g）** | 候選新記憶 | tanh |
| **Output gate** | 決定輸出多少 hidden state | σ × tanh(C_t) |

🔥🔥🔥 **LSTM 有 4 組參數**（4 個 gate 各一組 W 和 b），參數量是同 size RNN 的 4 倍。

#### LSTM 參數量（🔥🔥🔥 計算題必考）

```
params = 4 × (input_size + hidden_size + 1) × hidden_size
```

其中 +1 是 bias，每個 gate 一個 bias vector。

> ⚠️ **PyTorch 注意**：PyTorch `nn.LSTM` 實作有兩個 bias 向量（`b_ih` 和 `b_hh`），實際參數量 = `4×(input+hidden+2)×hidden`。IPAS 考試通常採簡化公式 `4×(input+hidden+1)×hidden`，以本指南公式為準答題。

**計算範例：**

```
nn.LSTM(input_size=50, hidden_size=100)
params = 4 × (50 + 100 + 1) × 100
       = 4 × 151 × 100
       = 60,400
```

🗣️ 類比：LSTM 像一個有 4 個閥門的水管系統。Forget 閥決定排掉多少舊水（記憶），Input 閥決定加入多少新水，Output 閥控制現在釋放多少水給下一站。普通 RNN 只有一條管子，長跑後壓力（梯度）消失，水流到後段幾乎沒有。

#### 何時用 RNN/LSTM vs Transformer？

```
序列短（<50 token）+ 計算資源有限  → RNN/LSTM
時間序列（股價、感測器）          → LSTM（特別是多層 LSTM）
序列長（>200 token）+ GPU 夠     → Transformer（並行效率高）
需要全局依賴（NLP 長文本）        → Transformer（BERT/GPT）
```

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|----------|----------|------------|
| LSTM input=10, hidden=20，參數量？ | 4×(10+20+1)×20 = 2,480 | (10+20+1)×20 = 620（忘乘 4） |
| 深層 RNN 訓練發現梯度接近 0，原因？ | 長序列梯度消失，因 tanh 導數連乘縮小 | learning rate 太大 |
| 股票收盤價預測（時間序列），選哪個？ | LSTM（序列記憶） | CNN（影像用） |
| Bidirectional LSTM 參數量是單向的幾倍？ | 2 倍（正反向各一個 LSTM） | 4 倍（搞混了 gate 數） |

#### Code Pattern 認識就夠

```python
import torch.nn as nn

# PyTorch LSTM
lstm = nn.LSTM(
    input_size=50,      # 每個 time step 的特徵維度
    hidden_size=100,    # hidden state 大小
    num_layers=2,       # 堆疊 2 層
    batch_first=True    # 輸入 shape: (batch, seq_len, input_size)
)
# 輸出: output (batch, seq_len, hidden_size), (h_n, c_n)

# Keras 版
from tensorflow.keras import layers
layers.LSTM(units=100, return_sequences=True)  # 輸出每個 time step
```

---

### 3.4 Transformer 與注意力機制（Transformer & Attention）🔥🔥🔥

#### 先懂一句話：
Transformer 讓每個位置的詞「直接看」序列中所有其他位置，不需依賴遞迴，可完全並行計算，是現代 NLP 的基石。

#### 它在流程中的位置：
輸入 Embedding + Positional Encoding → **【Multi-head Attention → Add&Norm(LN) → FFN → Add&Norm(LN)】×N層** → 輸出

---

#### Self-Attention 核心公式（🔥🔥🔥）

```
Attention(Q, K, V) = softmax( QK^T / √d_k ) × V
```

- **Q（Query）**：「我想查什麼？」
- **K（Key）**：「我能提供什麼？」
- **V（Value）**：「實際內容是什麼？」
- **√d_k**：縮放因子，防止點積過大導致 softmax 梯度消失

每個 token 對其他所有 token 計算相似度分數，再加權平均取 V 的組合。

🗣️ 類比：你在 Instagram 搜尋「台北咖啡廳」（Q），系統比對所有貼文的標籤（K），找出最相關的後顯示貼文內容（V）。Transformer 就是讓每個詞都這樣搜尋整個句子。

#### Multi-head Attention

```
MultiHead(Q,K,V) = Concat(head_1, ..., head_h) × W_O
head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

- h 個 head 並行，各自學習不同的注意力模式
- concat 後再線性投影

#### Transformer 層結構（順序必須正確）

```
輸入 x
  │
  ├─ Multi-head Self-Attention ─┐
  │                              │
  └──────────────────────────── Add & Norm（Layer Norm）
                                  │
                              Feed-Forward Network (FFN)─┐
                                  │                       │
                              Add & Norm（Layer Norm） ──┘
                                  │
                               輸出
```

🔥🔥🔥 **Layer Normalization 在 Add 之後**，且 Transformer 全程使用 **LN 而非 BN**。

#### Positional Encoding（位置編碼）

Transformer 本身沒有序列順序感知（不像 RNN 有 h_{t-1}），必須人工注入位置資訊：

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

也可用可學習的 positional embedding（BERT 採用此方式）。

#### 三大 Transformer 變體（🔥🔥）

| 架構 | 結構 | 代表模型 | 適用任務 |
|------|------|---------|---------|
| Encoder-only | 只有 Encoder | BERT | 分類、NER、問答（理解） |
| Decoder-only | 只有 Decoder（帶 Causal Mask） | GPT | 文本生成 |
| Encoder-Decoder | 完整 Seq2Seq | T5、BART | 翻譯、摘要 |

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|----------|----------|------------|
| Transformer 為什麼不用 BN 而用 LN？ | 序列長度可變，batch 統計不穩定；LN 在特徵維度正規化，不受 batch size 影響 | 因為 LN 效果更好（沒說出原因） |
| BERT 屬於哪種 Transformer 結構？ | Encoder-only | Encoder-Decoder |
| Attention score = softmax(QK^T/√d_k)，√d_k 的作用？ | 防止點積過大使 softmax 進入飽和區，梯度消失 | 讓結果為 1 |
| GPT 生成時為何用 Causal Mask？ | 預測下一個 token 時，不能看到未來 token | 減少計算量 |

#### Code Pattern 認識就夠

```python
import torch.nn as nn

# Multi-head Attention
mha = nn.MultiheadAttention(
    embed_dim=512,    # 模型維度
    num_heads=8,      # head 數，embed_dim 必須能被 num_heads 整除
    dropout=0.1
)
# attn_output, attn_weights = mha(query, key, value)

# Layer Norm
layer_norm = nn.LayerNorm(normalized_shape=512)

# Keras 版
from tensorflow.keras import layers
layers.MultiHeadAttention(num_heads=8, key_dim=64)
layers.LayerNormalization()
```

---

### 3.5 模型效能分析與框架比較（Performance Analysis & Framework）🔥🔥

#### 先懂一句話：
看 learning curve 判斷模型狀態，選對正規化工具對症下藥，再挑對框架部署——這三件事決定深度學習專案能否落地。

#### 它在流程中的位置：
訓練完成 → **【Learning Curve 診斷 → 正規化調整 → 框架部署決策】** → 生產環境

---

#### Learning Curve 判讀（🔥🔥）

```
          Loss
           │
           │  ● train loss
  high ──→ │● ●                    ← underfitting
           │    ● ●                （train 和 val 都高）
           │        ● ●
  low  ──→ │_____________ Epochs

          Loss
           │
           │● train loss
  low  ──→ │● ● ●
           │          ‥‥‥ val loss 上升
  high ──→ │              ‥ ‥ ‥   ← overfitting
           │_______________ Epochs
```

| 診斷 | 症狀 | 處方 |
|------|------|------|
| Underfitting | train loss 和 val loss 都高 | 增加層數/寬度、訓練更多 epoch、降低正則化 |
| Overfitting | train loss 低但 val loss 上升 | Dropout、L2 正則化、Data Augmentation、Early Stopping |
| Good fit | train ≈ val，兩者都低 | 維持現狀或輕微調整 |

#### Backpropagation Chain Rule（🔥🔥）

前向傳播（Forward Pass）：
```
x → z = Wx + b → a = f(z) → Loss(a, y)
```

反向傳播（Backward Pass，**從右到左**）：
```
∂L/∂W = (∂L/∂a) × (∂a/∂z) × (∂z/∂W)
       =    δ    ×   f'(z)  ×    x^T
```

- 梯度**從輸出層向輸入層傳遞**（右 → 左）
- 每層梯度 = 下游梯度 × 本層激活導數 × 本層輸入
- 🔥🔥🔥 Sigmoid 最大導數 = 0.25 → 多層相乘 → 趨近 0 = **梯度消失**

#### 激活函數比較（🔥🔥🔥）

| 函數 | 公式 | 輸出範圍 | 主要問題 | 使用場景 |
|------|------|---------|---------|---------|
| ReLU | max(0, x) | [0, +∞) | Dead neuron（負輸入梯度=0） | CNN hidden layer 標準 |
| Sigmoid | 1/(1+e^{-x}) | (0, 1) | 梯度消失（最大 0.25） | 二元輸出層 |
| tanh | (e^{2x}-1)/(e^{2x}+1) | (-1, 1) | 梯度消失（稍優於 sigmoid） | RNN hidden（已少用） |
| Softmax | e^{x_i}/Σe^{x_j} | (0,1)，和=1 | — | 多類別輸出層 |
| GELU | x·Φ(x) | (-∞, +∞) | 計算稍複雜 | Transformer FFN（BERT/GPT） |
| Leaky ReLU | max(αx, x) | (-∞, +∞) | 需調 α | 解決 Dead neuron |

#### Weight Initialization（🔥）

| 初始化方法 | 適合的激活函數 | 公式 |
|-----------|-------------|------|
| Xavier / Glorot | tanh、sigmoid | W ~ U[-√(6/(fan_in+fan_out)), +√] |
| He / Kaiming | ReLU、Leaky ReLU | W ~ N(0, √(2/fan_in)) |

🔥 **ReLU 配 He Init，tanh/sigmoid 配 Xavier** — 混用會造成梯度爆炸或梯度消失。

#### Batch Norm vs Layer Norm 位置

```
CNN / MLP 中 BN 擺放：
Conv → BN → ReLU（最常見）
     或
Conv → ReLU → BN（較少）

Transformer 中 LN 擺放：
Attention/FFN → Add → LN（Post-LN，原始論文）
LN → Attention/FFN → Add（Pre-LN，現代多用此，訓練更穩定）
```

#### Dropout 注意事項

```python
# PyTorch: model.eval() 時 dropout 自動關閉
model.train()   # training: dropout 啟動
model.eval()    # inference: dropout 關閉

# Keras
layers.Dropout(rate=0.5)   # 只在 training=True 時作用
```

🔥🔥 **Dropout 只在訓練時作用**，推理時不遮蔽。

#### PyTorch vs Keras/TF 比較（🔥）

| 比較項目 | PyTorch | Keras / TensorFlow |
|---------|---------|-------------------|
| 計算圖 | 動態圖（eager execution） | 靜態圖（TF 1.x）/ 動態（TF 2.x） |
| 主要用途 | 研究、快速實驗 | 生產部署、Mobile/Edge |
| API 風格 | Python 原生、Pythonic | 高階封裝，簡潔 |
| 調試 | 方便（標準 Python debug） | 較難（TF 1.x graph mode） |
| 部署工具 | TorchServe、ONNX | TFLite、TensorFlow Serving |

#### Batch Size 效應（🔥🔥）

```
大 Batch（≥512）：
  ✅ 訓練速度快（GPU 利用率高）
  ❌ 趨向 sharp minima → 泛化性差

小 Batch（16–64）：
  ✅ 梯度雜訊作正則化 → flat minima → 泛化好
  ❌ 訓練速度慢
```

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|----------|----------|------------|
| 模型 train acc=99%, val acc=72%，診斷？ | Overfitting，加 Dropout/L2/Data Aug | Underfitting |
| 為什麼深層 MLP 用 ReLU 而非 sigmoid？ | ReLU 導數為 1（z>0 時），不會梯度消失；sigmoid 最大 0.25，連乘趨零 | ReLU 計算快 |
| 增大 batch size 後，val loss 上升，原因？ | 大 batch 進入 sharp minima，泛化差 | 過擬合（原因不精確） |
| 反向傳播梯度傳播方向？ | 輸出層 → 輸入層（右 → 左） | 輸入 → 輸出 |

#### Code Pattern 認識就夠

```python
import torch.nn as nn

# 正規化層
bn = nn.BatchNorm2d(num_features=64)      # CNN 用，batch 維度
ln = nn.LayerNorm(normalized_shape=512)   # Transformer 用，特徵維度
dropout = nn.Dropout(p=0.5)              # 訓練時 50% 神經元遮蔽

# 激活函數
relu = nn.ReLU()
sigmoid = nn.Sigmoid()
softmax = nn.Softmax(dim=-1)   # dim 指定在哪個維度做 softmax

# Keras 版
layers.BatchNormalization()
layers.LayerNormalization()
layers.Dropout(rate=0.5)
```

---

## Section 4：Comparison Tables

### 4.1 Sigmoid vs Softmax（🔥🔥🔥 最高頻混淆對）

| 比較項目 | Sigmoid | Softmax |
|---------|---------|---------|
| 輸出範圍 | (0, 1) | (0, 1)，但**加總 = 1** |
| 輸出個數 | 1 個（每個節點獨立） | C 個（等於類別數） |
| 適用任務 | **二元分類**（是/否） | **多類別分類**（取最大） |
| 損失函數搭配 | Binary Cross-Entropy | Categorical Cross-Entropy |
| 節點間關係 | 互相獨立 | 互相競爭（一個大另一個小） |
| 多標籤分類（multi-label） | ✅ 可用（每個標籤獨立） | ❌ 不適合 |

> 考試快判：看到「二元」、「是否」、「0/1 輸出」→ Sigmoid；看到「多類別」、「最終分類」、「10 類別輸出」→ Softmax

---

### 4.2 Batch Normalization vs Layer Normalization（🔥🔥🔥）

| 比較項目 | Batch Normalization（BN） | Layer Normalization（LN） |
|---------|--------------------------|--------------------------|
| 正規化軸 | **batch 維度**（同一個 feature，跨 batch 樣本） | **特徵維度**（同一個樣本，跨所有 feature） |
| 統計量來源 | 當前 mini-batch 的均值/方差 | 當前樣本自身的均值/方差 |
| 推理時行為 | 用訓練期累積的 running mean/var | 當下計算（無額外維護） |
| 適合架構 | CNN、MLP（batch size 夠大） | **Transformer**、RNN（序列長度可變） |
| 對 batch size 敏感？ | ✅ 非常敏感（小 batch 不穩定） | ❌ 不敏感 |
| 參數 | γ 和 β，各 num_features 個 | γ 和 β，各 normalized_shape 個 |

> 考試快判：看到「Transformer」→ LN；看到「CNN 訓練加速」→ BN；看到「batch size 很小或序列長度可變」→ LN

---

### 4.3 ReLU vs Sigmoid vs tanh（🔥🔥🔥）

| 比較項目 | ReLU | Sigmoid | tanh |
|---------|------|---------|------|
| 公式 | max(0, x) | 1/(1+e^{-x}) | (e^{2x}-1)/(e^{2x}+1) |
| 輸出範圍 | [0, +∞) | (0, 1) | (-1, 1) |
| 導數最大值 | 1（z>0 時恆為 1） | 0.25 | 1 |
| 梯度消失？ | ❌ 不會（z>0 時） | ✅ 嚴重（多層後趨零） | ✅ 稍好於 sigmoid |
| Dead Neuron？ | ✅ 負輸入時梯度=0 | ❌ | ❌ |
| 初始化搭配 | He / Kaiming | Xavier | Xavier |
| 主要用途 | **CNN/MLP hidden layer** | 二元輸出 | RNN hidden（已少用） |

> 考試快判：看到「隱藏層標準」→ ReLU；看到「梯度消失」→ sigmoid/tanh；看到「dead neuron」→ ReLU 的問題

---

### 4.4 CNN vs RNN vs Transformer（🔥🔥🔥）

| 比較項目 | CNN | RNN / LSTM | Transformer |
|---------|-----|-----------|------------|
| 最適資料 | **影像**、固定格局格柵資料 | **序列**（時間序列、語音） | **長序列 NLP**、多模態 |
| 空間/時間感知 | 局部感受野（kernel） | 遞迴 hidden state（順序依賴） | Global attention（全局依賴） |
| 並行訓練 | ✅ | ❌（依賴前一 step） | ✅ |
| 長距依賴 | ❌ | 困難（LSTM 改善但有限） | ✅ 擅長 |
| 計算複雜度 | O(n) | O(n)（序列長度） | O(n²)（attention matrix） |
| 代表模型 | ResNet、VGG、EfficientNet | LSTM、GRU | BERT、GPT、T5 |

> 考試快判：看到「影像」→ CNN；看到「時間序列、語音」→ LSTM；看到「長文本、翻譯」→ Transformer

---

### 4.5 PyTorch vs Keras API（🔥）

| 比較項目 | PyTorch | Keras（TensorFlow 2.x backend） |
|---------|---------|--------------------------------|
| 定義方式 | `nn.Module` 子類 | `Sequential` 或 Functional API |
| 計算圖 | 動態（即時執行） | 動態（TF 2.x），可 jit_compile |
| 主要使用者 | 學術研究、快速實驗 | 工業部署、教學 |
| 全連接層 | `nn.Linear(in, out)` | `Dense(units, activation=)` |
| 卷積層 | `nn.Conv2d(in_ch, out_ch, kernel)` | `Conv2D(filters, kernel_size)` |
| LSTM | `nn.LSTM(input_size, hidden_size)` | `LSTM(units)` |
| 部署 | TorchServe、ONNX | TFLite、TF Serving、SavedModel |

> 考試快判：看到 `nn.Module`、`nn.Linear` → PyTorch；看到 `Dense()`、`Sequential()` → Keras

---

## Section 5：口訣 / Mnemonics

### 5.1 架構選擇口訣

```
「看圖用 CNN，讀句用 LSTM，長文用 Transformer」

影像 → C（CNN）
序列 → L（LSTM）
長文 → T（Transformer）

CLT：Camera、Long-sequence、Text-long
```

### 5.2 LSTM 4 Gates 口訣

```
「忘記、輸入、細胞、輸出」
 Forget → Input → Cell（候選） → Output

口訣：「先忘（forget）再輸入（input），更新細胞（cell），最後輸出（output）」
縮寫：FICO（像信用分數，先審過去再決定輸出）
```

參數量口訣：
```
「LSTM 乘 4，input 加 hidden 加 1，再乘 hidden」
4 × (I + H + 1) × H
```

### 5.3 激活函數選擇口訣

```
輸出層：
  「一個輸出 Sigmoid，多個競爭 Softmax」
  Binary → Sigmoid（一個機率）
  Multi-class → Softmax（和為 1）

隱藏層：
  「CNN 用 ReLU，Transformer 用 GELU，序列用 tanh（舊）」
  
梯度問題：
  「Sigmoid 最大 0.25，連乘就消失；ReLU 導數 1，但負半邊死去」
```

### 5.4 BN vs LN 口訣

```
「BN 跨樣本（batch 維），LN 跨特徵（feature 維）」
「CNN 用 BN，Transformer 用 LN，記不住看 batch size：小 batch → LN」
```

### 5.5 參數量公式記憶卡

```
Linear:  (in × out) + out
Conv2d:  (k × k × C_in + 1) × C_out
LSTM:    4 × (input + hidden + 1) × hidden
BN:      2 × num_features（γ 和 β）
```

---

## Section 6：考試陷阱

### ❌ 陷阱 1：Softmax 用在二元輸出

```
❌ 「輸出層有 2 個節點做貓/狗分類，用 Softmax」（但這是 multi-class 概念）
✅ 「二元分類最後一個節點用 Sigmoid，輸出 P(是貓)」
```

比較精確地說：
- **一個輸出節點 + Sigmoid**：二元分類（最常見）
- **兩個輸出節點 + Softmax**：也可以，但浪費一個節點
- 考試看到「binary classification 輸出層」→ Sigmoid 是標準答案

### ❌ 陷阱 2：Transformer 用 BN 而非 LN

```
❌ 「Transformer 的 Add&Norm 用 Batch Normalization」
✅ 「Transformer 全部用 Layer Normalization，因序列長度可變，batch 統計不穩定」
```

### ❌ 陷阱 3：ResNet skip connection 只是提升精度

```
❌ 「ResNet 的 skip connection 是為了讓模型更準確」
✅ 「ResNet 的 skip connection 核心目的是讓梯度直接跳過若干層傳回，解決深層網路梯度消失，讓超過 100 層的網路可以訓練」
   精度提升是梯度能正常傳播後的自然結果，不是直接原因
```

### ❌ 陷阱 4：LSTM 參數量忘記乘 4

```
❌ 「LSTM(input=10, hidden=20) 參數 = (10+20+1)×20 = 620」
✅ 「LSTM 有 4 個 gate，各一組參數：4 × (10+20+1) × 20 = 2,480」
```

### ❌ 陷阱 5：ReLU 沒有梯度消失問題，所以「完美」

```
❌ 「ReLU 完全解決了梯度消失，是完美的激活函數」
✅ 「ReLU 解決了梯度消失，但有 Dead Neuron 問題：
   負輸入時 f'(z) = 0，對應神經元永遠不再學習
   解法：Leaky ReLU（給負半邊一個小斜率 α）或 He 初始化」
```

### ❌ 陷阱 6：反向傳播方向搞反

```
❌ 「反向傳播從輸入層開始計算梯度」
✅ 「反向傳播從 Loss（最右側輸出）開始，向輸入層方向逐層傳遞梯度
   ∂L/∂W = (∂L/∂a) × (∂a/∂z) × (∂z/∂W)  ← 右到左」
```

### ❌ 陷阱 7：Dropout 在推理時也作用

```
❌ 「Dropout 讓推理結果更穩定（因為每次遮蔽不同節點）」
✅ 「Dropout 只在訓練時（model.train()）隨機遮蔽，
   推理時（model.eval()）全部神經元都參與，輸出確定性結果」
```

### ❌ 陷阱 8：BN 推理時用 batch 統計

```
❌ 「BN 推理時用當前 batch 的均值和方差」
✅ 「BN 推理時用訓練期間累積的 running_mean 和 running_var（移動平均），
   因為推理可能是單樣本，batch 統計不可靠」
```

### ❌ 陷阱 9：CNN 的 output shape 計算忽略 +1

```
❌ H_out = (H_in + 2P - K) / S  [忘記 +1]
✅ H_out = floor( (H_in + 2P - K) / S ) + 1
```

---

## Section 7：情境題快速判斷

| 關鍵字（≤5 字） | 正確答案 | 備注 |
|----------------|---------|------|
| 影像辨識、圖片分類 | CNN（ResNet/VGG/Inception） | 看局部特徵，空間不變性 |
| 時間序列、股價預測 | LSTM | 序列記憶，時序依賴 |
| 長距依賴、NLP長文本 | Transformer | 全局 attention，並行高效 |
| 二元輸出層、是否分類 | Sigmoid | 一個節點，輸出 0–1 機率 |
| 多類別輸出層 | Softmax | C 個節點，和為 1 |
| Transformer 正規化 | Layer Normalization（LN） | 特徵維度，不受 batch 影響 |
| CNN 正規化 | Batch Normalization（BN） | batch 維度，需夠大 batch |
| ResNet 跳躍連接、skip | 解決梯度消失，可訓 100+ 層 | F(x)+x |
| 梯度消失、深層 sigmoid | 換 ReLU，或用 ResNet/BN | sigmoid 導數 ≤0.25 |
| batch size 大、泛化差 | 趨向 sharp minima，泛化下降 | 嘗試縮小 batch |
| val loss 上升 | Overfitting → Dropout/L2/Aug | train loss 還在下降 |
| 兩者 loss 都高 | Underfitting → 加複雜度 | 模型容量不足 |
| Inception 多 kernel | 1×1+3×3+5×5 並聯 | 1×1 先降維 |
| Dead neuron | ReLU 負半邊梯度為 0 | 用 Leaky ReLU 解決 |
| LSTM 參數是 RNN 幾倍 | 4 倍 | 因為 4 個 gate |
| 訓練時 dropout 作用 | model.train() | eval() 時關閉 |

---

## Section 8：結尾 — 快速自我檢查 ✅

在正式考試前 24 小時，用這份清單快速驗收：

- [ ] 我能默寫 MLP 參數量公式：`(in × out) + out`，並算出 784→256→10 的總參數量
- [ ] 我能默寫 CNN 輸出 shape 公式：`floor((H+2P-K)/S)+1`，並算出 Conv2d(in=3, out=64, kernel=3) 的參數量
- [ ] 我能說出 LSTM 的 4 個 gate（Forget/Input/Cell/Output）和參數量公式 `4×(I+H+1)×H`
- [ ] 我能解釋 Transformer 為什麼用 LN 而非 BN（序列長度可變，batch 統計不穩定）
- [ ] 我能快速判斷：二元輸出 → Sigmoid；多類別輸出 → Softmax
- [ ] 我能在 learning curve 上找出 overfitting 和 underfitting，並列出各自的修正策略
- [ ] 我知道 ResNet skip connection 的核心價值是解決梯度消失（不只是提升精度）
- [ ] 我知道 Dropout 只在 `model.train()` 時作用，推理時關閉
- [ ] 我能區分 PyTorch（`nn.Linear`、`nn.Conv2d`）和 Keras（`Dense`、`Conv2D`）的 API 寫法
- [ ] 我能說出為何大 batch size 會導致泛化變差（Sharp minima 效應）

---

📌 **超出本章範圍的主題（不考）：**

- Diffusion Model / Stable Diffusion 架構 → 屬於 L23204 生成式 AI 應用
- Vision Transformer（ViT）詳細架構 → 超出中級邊界
- PyTorch 完整訓練迴圈（optimizer 設定、scheduler）→ 不需背誦，認識 API 即可
- Attention map 手算 → 考試以概念選擇題為主，不需矩陣演算

---

*本章是 IPAS 中級「計算題最密集」的章節。掌握公式後反覆練習計算，就能在考場快速秒殺計算題。你已經有了完整的框架，接下來只需要把公式背進肌肉記憶。加油！*

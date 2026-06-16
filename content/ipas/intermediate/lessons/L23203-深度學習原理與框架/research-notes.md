# Research Notes: L23203 深度學習原理與框架

## Official Sources
- IPAS AI應用規劃師中級考綱：涵蓋類神經網路架構、層級運算機制、模型效能分析三大主題
- L23-sample-questions-11409.md：CNN pooling/Inception/ResNet/VGG 差異、LSTM/RNN/Transformer 取捨、激活函數使用時機、BN vs LN 確認為高頻考點

## Community Insights (exam patterns)

### 高頻考點
- **Sigmoid vs Softmax**：最高頻混淆對。Sigmoid → 二元分類（輸出 0–1 機率）；Softmax → 多類別分類（輸出總和 = 1）
- **BN vs LN**：Batch Normalization 正規化 batch 維度（適合 CNN/MLP）；Layer Normalization 正規化特徵維度（Transformer 必用，因 batch size 小或 RNN 序列長度可變）
- **ReLU vs Sigmoid/tanh**：ReLU 解決 vanishing gradient，但有 dead neuron 問題；sigmoid/tanh 在深層網路梯度消失
- **CNN pooling 功能**：Max pooling 保留最強特徵 + 降維 + 平移不變性；Average pooling 保留平均特徵
- **ResNet vs VGG vs Inception**：VGG 堆疊小 kernel；Inception 多 kernel 並聯；ResNet skip connection 解梯度消失
- **RNN vs Transformer**：RNN 序列順序依賴無法並行；Transformer 自注意力全連接可並行但記憶體 O(n²)
- **計算題**：矩陣維度推算、前向傳播輸出形狀、參數量計算

### 陷阱
- BN 在推理時用移動平均（running mean/var），不用 batch 統計
- LSTM gate 數 = 4（input/forget/output/cell），參數量是 RNN 的 4 倍
- Dropout 只在訓練時啟動（`model.train()` 模式）
- GELU（Transformer/BERT 常用）≈ x·Φ(x)，不在傳統 CNN 中出現

## Current State (technology)

### PyTorch API（需能讀懂 trace）
```python
nn.Linear(in_features, out_features, bias=True)
nn.Conv2d(in_channels, out_channels, kernel_size, stride=1, padding=0)
nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
nn.BatchNorm2d(num_features)   # CNN 用
nn.LayerNorm(normalized_shape)  # Transformer 用
nn.Dropout(p=0.5)
nn.MultiheadAttention(embed_dim, num_heads)
```

### Keras/TensorFlow API
```python
layers.Dense(units, activation='relu')
layers.Conv2D(filters, kernel_size, activation='relu')
layers.LSTM(units, return_sequences=True)
layers.BatchNormalization()
layers.LayerNormalization()
layers.Dropout(rate=0.5)
```

## Parameter Count Formulas（計算題必考）

| 層類型 | 參數量公式 |
|--------|-----------|
| MLP Linear | `in × out + out`（含 bias） |
| Conv2d | `(k_h × k_w × in_ch + 1) × out_ch` |
| LSTM | `4 × (input + hidden + 1) × hidden` |
| Simple RNN | `(input + hidden + 1) × hidden` |
| BatchNorm | `2 × num_features`（γ、β） |

### Output Shape Arithmetic（CNN）
```
output_H = floor((H + 2*padding - kernel_size) / stride) + 1
output_W = floor((W + 2*padding - kernel_size) / stride) + 1
```
Max/Average Pooling 同公式，kernel = pool size。

## Backpropagation & Chain Rule

前向傳播：z = Wx + b → a = f(z) → Loss

梯度反傳（chain rule）：
```
∂L/∂W = ∂L/∂a · ∂a/∂z · ∂z/∂W
       = δ · f'(z) · xᵀ
```

- ReLU 梯度：f'(z) = 1 (z>0), 0 (z≤0) → 稀疏梯度，無 saturation
- Sigmoid 梯度：f'(z) = σ(z)(1-σ(z)) → 最大 0.25，深層連乘趨零（vanishing）
- 梯度爆炸：gradient clipping（`torch.nn.utils.clip_grad_norm_`）

## Architecture Mechanics

### MLP
- 全連接層堆疊；需手動設計 hidden size；參數量隨寬度平方增長

### CNN
- **VGG**：3×3 conv 堆疊，深但參數多
- **Inception/GoogLeNet**：1×1, 3×3, 5×5 並聯，1×1 降維減算力
- **ResNet**：skip connection → F(x)+x，解決 vanishing gradient，可訓練 100+ 層

### RNN / LSTM
- RNN：hidden state 遞迴；長序列梯度消失/爆炸
- LSTM：cell state + 3 gates（input/forget/output）+ 1 cell gate = 4 組參數
- Bidirectional LSTM：正反向各一個 hidden state，參數量加倍

### Transformer
- Self-attention：Q=xWQ, K=xWK, V=xWV
- Attention score：softmax(QKᵀ/√d_k)V
- Multi-head：h 組獨立 attention 並聯再 concat
- Position encoding：補充序列位置資訊（sin/cos 或可學習）
- 層結構：Multi-head Attention → Add&Norm(LN) → FFN → Add&Norm(LN)

### Activation Functions 使用時機

| 函數 | 公式 | 使用場景 |
|------|------|---------|
| ReLU | max(0,x) | CNN hidden layer 標準 |
| Sigmoid | 1/(1+e⁻ˣ) | 二元分類輸出層 |
| Softmax | eˣⁱ/Σeˣʲ | 多類別輸出層 |
| tanh | (e²ˣ-1)/(e²ˣ+1) | RNN hidden（已少用） |
| GELU | x·Φ(x) | BERT/GPT Transformer FFN |
| Leaky ReLU | max(αx,x) | 解 dead neuron |

## 模型效能分析

- **Learning curve**：train loss 持續降但 val loss 上升 → overfitting；兩者皆高 → underfitting
- **Overfitting 對策**：Dropout、L2 regularization（weight decay）、BatchNorm、Data augmentation
- **Batch size 效應**：large batch → sharper minima → 泛化差；small batch → 雜訊作正則化 → 泛化好
- **Framework profiling**：PyTorch `torch.utils.bottleneck`；TensorBoard `tf.profiler`

## External Documents Found
- N/A — no external regulatory documents for this topic

## Key Findings Summary
- **Sigmoid/Softmax 二選一**：二元 → Sigmoid；多類別 → Softmax；此為最高頻混淆對
- **BN vs LN 位置**：BN 適 CNN（batch 維度穩定）；LN 適 Transformer/RNN（序列長度可變）
- **LSTM 參數量 = 4×(input+hidden+1)×hidden**：計算題必背，是 RNN 的 4 倍
- **ResNet skip connection 核心價值**：F(x)+x 使梯度不消失，可訓練超深網路
- **Conv output shape**：floor((H+2p-k)/s)+1；搭配參數計算是計算題雙料考點

## Scope Notes
- Transformer 內部 attention 數學（QKV 矩陣）屬中級邊界，考試以概念 + 選擇題為主，不需手算 attention map
- Diffusion / ViT 等新架構超出此考科邊界，不納入
- PyTorch 實作細節（training loop、optimizer 設定）超出邊界——只需讀懂 API trace，不需背誦完整訓練腳本

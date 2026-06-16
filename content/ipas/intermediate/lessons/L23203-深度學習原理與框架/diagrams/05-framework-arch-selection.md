# 框架比較與架構選擇指引

## Part A：架構選擇決策樹

```
資料類型是什麼？
        │
        ├─── 影像 / 空間資料（像素、2D/3D 特徵圖）
        │         │
        │         └──► CNN (Convolutional Neural Network)
        │               • 卷積核捕捉局部空間特徵（邊緣、紋理、形狀）
        │               • 平移不變性 (translation invariance)
        │               • 典型: ResNet / VGG / Inception
        │               • 用途: 圖像分類、物件偵測、語意分割
        │
        ├─── 序列 / 時間序列資料
        │         │
        │         ├─── 序列較短（< 數百步），計算資源有限
        │         │         └──► RNN / LSTM / GRU
        │         │               • LSTM 4 gate 緩解梯度消失
        │         │               • GRU 2 gate，更輕量、速度更快
        │         │               • 用途: 時間序列預測、短文本分類
        │         │
        │         └─── 序列較長，需捕捉長距離依賴
        │                   └──► Transformer
        │                         • Self-Attention 直接建立任意距離的依賴
        │                         • 可平行化（不像 RNN 需逐步計算）
        │                         • 用途: 長文本理解、語言翻譯
        │
        ├─── 表格資料 / 特徵向量（結構化資料）
        │         │
        │         └──► MLP (Multi-Layer Perceptron)
        │               • 輸入為固定維度向量，無空間/時間結構
        │               • 全連接層逐層學習特徵組合
        │               • 用途: 表格分類/回歸、嵌入向量處理
        │
        └─── 自然語言處理（NLP）任務
                  │
                  ├─── 文本理解、分類、命名實體識別（NER）
                  │         └──► Transformer Encoder-only (BERT / RoBERTa)
                  │
                  ├─── 文本生成、對話、補全
                  │         └──► Transformer Decoder-only (GPT / LLaMA)
                  │
                  └─── 翻譯、摘要（Seq2Seq）
                            └──► Transformer Encoder-Decoder (T5 / BART)
```

---

## Part B：框架 API 對照表

| 項目 | PyTorch | Keras / TensorFlow |
|------|---------|---------------------|
| **計算圖模式** | 動態圖 (eager execution) — 即時執行，debug 友善 | 靜態圖 (graph mode) 為主；TF 2.x 默認 eager，但 `@tf.function` 編譯為靜態圖 |
| **線性層** | `nn.Linear(in_features, out_features)` | `Dense(units, activation=None)` |
| **卷積層** | `nn.Conv2d(in_channels, out_channels, kernel_size)` | `Conv2D(filters, kernel_size, activation=None)` |
| **序列模型** | `nn.LSTM(input_size, hidden_size, num_layers)` | `LSTM(units, return_sequences=False)` |
| **注意力機制** | `nn.MultiheadAttention(embed_dim, num_heads)` | `MultiHeadAttention(num_heads, key_dim)` |
| **批次正規化** | `nn.BatchNorm2d(num_features)` | `BatchNormalization()` |
| **Dropout** | `nn.Dropout(p=0.5)` | `Dropout(rate=0.5)` |
| **模型定義方式** | `class MyModel(nn.Module)`: 實作 `forward()` 方法 | `Sequential()` 或 Functional API (`tf.keras.Model`) |
| **優化器** | `torch.optim.Adam(model.parameters(), lr=1e-3)` | `model.compile(optimizer='adam', loss=...)` |
| **訓練循環** | 手動寫 `for batch in dataloader: loss.backward(); optimizer.step()` | `model.fit(X, y, epochs=10, batch_size=32)` |
| **適用場景** | 研究、靈活實驗、自定義架構 | 生產部署、快速原型、端到端流程 |
| **主要用戶群** | 學術界、研究機構 | 工業界、行動部署 (TFLite)、Google 生態 |

---

## 快速判斷口訣

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  研究 / 靈活 / 論文實作   →   PyTorch                       │
│  部署 / 生產 / 快速原型   →   Keras / TensorFlow            │
│                                                             │
│  影像                     →   CNN                          │
│  短序列 / 時間序列         →   RNN / LSTM / GRU             │
│  長序列 / NLP              →   Transformer                 │
│  表格 / 向量               →   MLP                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## API 識別練習（考試快判）

```
看到哪個 API 關鍵字？判斷框架：

nn.Linear(...)             → PyTorch
nn.Conv2d(...)             → PyTorch
nn.LSTM(...)               → PyTorch
nn.Module / forward()      → PyTorch
model.parameters()         → PyTorch

Dense(...)                 → Keras
Conv2D(...)                → Keras
LSTM(return_sequences=...) → Keras
model.compile(...)         → Keras
model.fit(...)             → Keras
```

---

## 典型任務 → 架構 → 框架 端對端範例

| 任務 | 推薦架構 | 常用框架 | 關鍵理由 |
|------|----------|----------|----------|
| 手寫數字分類 (MNIST) | CNN | PyTorch / Keras 皆可 | 2D 像素資料，CNN 提取空間特徵 |
| 股價預測（時序） | LSTM / GRU | PyTorch | 序列資料，需記憶歷史狀態 |
| 情感分析 | BERT (Transformer Encoder) | PyTorch + HuggingFace | 長文本雙向理解 |
| 機器翻譯 | T5 / mBART (Encoder-Decoder) | PyTorch + HuggingFace | Seq2Seq 任務 |
| 表格信用評分 | MLP | Keras (快速原型) | 固定維度向量輸入 |
| 手機 App 部署 | CNN / MobileNet | Keras + TFLite | TFLite 支援行動端最佳化 |

---

## 🔥🔥 考試重點

| 考點 | 核心結論 |
|------|----------|
| PyTorch vs Keras 計算圖 | PyTorch 動態圖（eager），Keras/TF 靜態圖為主 |
| 模型定義方式 | PyTorch: 繼承 `nn.Module` 寫 `forward()`；Keras: `Sequential` 或 Functional API |
| `return_sequences=True` | Keras LSTM 專用，代表輸出所有 time step 的 hidden state（接下一層 LSTM 時需設 True） |
| `model.parameters()` | PyTorch 專用，傳給 optimizer；Keras 用 `model.compile()` |
| 研究 vs 部署 | 研究 → PyTorch；部署/行動端 → Keras/TFLite |

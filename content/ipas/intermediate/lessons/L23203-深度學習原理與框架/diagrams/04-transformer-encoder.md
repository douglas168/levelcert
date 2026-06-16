# Transformer 編碼器方塊圖

## 單層 Encoder 完整結構

```
輸入 Tokens
[seq_len, d_model]
      │
      ▼
┌─────────────────────────────────────────┐
│  Token Embeddings                        │
│  每個 token → d_model 維向量            │
│  [seq_len, d_model]                      │
└─────────────────────────────────────────┘
      │
      │  ⊕  (element-wise 相加，非拼接)
      │
┌─────────────────────────────────────────┐
│  Positional Encoding                     │
│  PE(pos, 2i)   = sin(pos / 10000^{2i/d}) │
│  PE(pos, 2i+1) = cos(pos / 10000^{2i/d}) │
│  [seq_len, d_model]  → 告知模型位置順序  │
└─────────────────────────────────────────┘
      │
      ▼
 ┌────────────────────────────────────────────────────────────┐
 │  ┌──────────────────────────────────────────────────────┐  │
 │  │           Multi-Head Attention (MHA)                 │  │
 │  │                                                      │  │
 │  │  對每個 Head h = 1..H（共 H=8 個）：                 │  │
 │  │    Q_h = x · W_Q^h    shape: [seq, d_k]             │  │
 │  │    K_h = x · W_K^h    shape: [seq, d_k]             │  │
 │  │    V_h = x · W_V^h    shape: [seq, d_v]             │  │
 │  │    d_k = d_model / H  (e.g., 512/8 = 64)            │  │
 │  │                                                      │  │
 │  │    Attention(Q,K,V) = softmax(QK^T / √d_k) · V      │  │
 │  │              ─────────────────────────               │  │
 │  │              ① QK^T: 相似度得分 [seq, seq]           │  │
 │  │              ② / √d_k: 縮放防止點積過大             │  │
 │  │              ③ softmax: 正規化為注意力權重           │  │
 │  │              ④ × V: 加權聚合 Value                   │  │
 │  │                                                      │  │
 │  │    Multi-Head = Concat(head₁,...,headₕ) · W_O       │  │
 │  └──────────────────────────────────────────────────────┘  │
 │                                                             │
 │  ┌──────────────────────────────────────────────────────┐  │
 │  │  Add & Norm（殘差 + Layer Normalization）            │  │
 │  │  output = LayerNorm(x + MHA(x))                      │  │
 │  │                                                      │  │
 │  │  ⚠️  這裡用 LayerNorm，不用 BatchNorm                │  │
 │  │  原因見下方說明框                                     │  │
 │  └──────────────────────────────────────────────────────┘  │
 │                                                             │
 │  ┌──────────────────────────────────────────────────────┐  │
 │  │  Feed-Forward Network (FFN)                          │  │
 │  │  FFN(x) = max(0, x·W₁ + b₁) · W₂ + b₂             │  │
 │  │  (或用 GELU 取代 ReLU，效果更平滑)                  │  │
 │  │                                                      │  │
 │  │  維度變化：d_model → d_ff → d_model                  │  │
 │  │  d_ff 通常 = 4 × d_model（例如 512 → 2048 → 512）   │  │
 │  │  每個 token 獨立運算，無跨 token 交互                 │  │
 │  └──────────────────────────────────────────────────────┘  │
 │                                                             │
 │  ┌──────────────────────────────────────────────────────┐  │
 │  │  Add & Norm（第二個殘差 + Layer Normalization）      │  │
 │  │  output = LayerNorm(MHA_output + FFN(MHA_output))    │  │
 │  └──────────────────────────────────────────────────────┘  │
 └────────────────────────────────────────────────────────────┘
      │
      ▼
  輸出: [seq_len, d_model]
  （形狀與輸入相同，可再送入下一個 Encoder 層）
```

## LayerNorm vs BatchNorm 核心差異

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️  為什麼 Transformer 用 LayerNorm，不用 BatchNorm？           │
│                                                                   │
│  BatchNorm（BN）:                                                │
│  • 對「同一特徵維度、跨 batch 樣本」正規化                       │
│  • 需要足夠大的 batch 才穩定（統計估計依賴 batch 大小）          │
│  • 序列長度不同時，跨樣本統計無意義                              │
│  • 適合: CNN（影像 batch 尺寸固定，batch 夠大）                  │
│                                                                   │
│  LayerNorm（LN）:                                                │
│  • 對「單一樣本、所有特徵維度」正規化                            │
│  • 不依賴 batch 大小，batch=1 也能正常工作                       │
│  • 適合: 變長序列、Transformer、RNN                              │
│                                                                   │
│  考試快判:                                                        │
│    Transformer / 變長序列 → LayerNorm                            │
│    CNN / 影像固定尺寸 → BatchNorm                                │
└─────────────────────────────────────────────────────────────────┘
```

## Attention 機制視覺化

```
Q (Query)     K (Key)     V (Value)
[seq, d_k]  [seq, d_k]  [seq, d_v]
    │            │            │
    │            ▼            │
    └──► QK^T ──► / √d_k ──► softmax ──► 注意力權重 [seq, seq]
                                                    │
                                                    └──► × V ──► 輸出 [seq, d_v]

直覺解釋：
  Q ← 「我想查詢什麼」
  K ← 「每個位置能提供什麼關鍵字」
  V ← 「每個位置的實際內容」
  注意力 = 「根據 Q 與 K 的相似度，加權聚合 V」
```

## 三大 Transformer 衍生架構

```
┌────────────────┬────────────────────┬────────────────────────────────┐
│ 架構           │ 結構               │ 代表模型與用途                  │
├────────────────┼────────────────────┼────────────────────────────────┤
│ Encoder-only   │ 只有編碼器         │ BERT — 文本理解、分類、NER     │
│                │ 雙向注意力         │ RoBERTa、ALBERT               │
│                │ 看見完整上下文     │                                │
├────────────────┼────────────────────┼────────────────────────────────┤
│ Decoder-only   │ 只有解碼器         │ GPT 系列 — 文本生成、對話      │
│                │ 因果遮蔽           │ GPT-2/3/4、LLaMA              │
│                │ (Causal Mask)      │ 只看「左邊」的 token           │
│                │ 自回歸生成         │                                │
├────────────────┼────────────────────┼────────────────────────────────┤
│ Encoder-Decoder│ 兩者皆有           │ T5 — 翻譯、摘要、問答          │
│                │ 交叉注意力連接     │ BART、mT5、原始 Transformer   │
│                │ Encoder 讀入全文   │ 「Seq2Seq」任務                │
│                │ Decoder 逐步生成   │                                │
└────────────────┴────────────────────┴────────────────────────────────┘

考試快判:
  BERT → Encoder-only → 文本理解/分類
  GPT  → Decoder-only → 文本生成/補全
  T5   → Encoder-Decoder → 翻譯/摘要（Seq2Seq）
```

## PyTorch 實作對照

```python
import torch.nn as nn

# Multi-Head Attention
mha = nn.MultiheadAttention(
    embed_dim=512,    # d_model
    num_heads=8,      # H，d_k = 512/8 = 64
    dropout=0.1,
    batch_first=True  # [batch, seq, d_model]
)

# Layer Normalization
ln = nn.LayerNorm(normalized_shape=512)  # 對最後一維正規化

# Feed-Forward Network
ffn = nn.Sequential(
    nn.Linear(512, 2048),   # d_model → d_ff
    nn.ReLU(),              # 或 nn.GELU()
    nn.Linear(2048, 512),   # d_ff → d_model
)

# 單層 Encoder 前向傳播
def encoder_layer(x):
    # x: [batch, seq, 512]
    attn_out, _ = mha(x, x, x)           # Q=K=V=x (self-attention)
    x = ln(x + attn_out)                  # Add & Norm
    ffn_out = ffn(x)
    x = ln(x + ffn_out)                   # Add & Norm
    return x
```

## 🔥🔥🔥 考試重點

| 考點 | 核心結論 |
|------|----------|
| Positional Encoding | 相加（+），不是拼接（Concat） |
| Attention 縮放因子 | 除以 √d_k，防止點積過大導致 softmax 梯度消失 |
| Multi-Head 優勢 | 不同 Head 學習不同語義關係（局部/全局/句法等） |
| LayerNorm vs BatchNorm | LN 對單樣本所有維度正規化，適合變長序列 |
| 殘差連接位置 | MHA 後一次、FFN 後一次，共 2 個 Add & Norm |
| BERT / GPT / T5 區分 | Encoder-only / Decoder-only / Encoder-Decoder |

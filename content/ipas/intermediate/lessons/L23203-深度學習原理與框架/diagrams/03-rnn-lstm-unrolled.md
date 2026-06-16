# RNN 與 LSTM 展開圖

## 上半部：Simple RNN 時間展開（3 個 time step）

```
輸入序列:  x₁         x₂         x₃
            │           │           │
            ▼           ▼           ▼
h₀ ──►  ┌──────┐  ┌──────┐  ┌──────┐
        │  h₁  │──│  h₂  │──│  h₃  │──► 輸出 ŷ（最後 step 或每 step）
        └──────┘  └──────┘  └──────┘

每個 RNN Cell 運算：
  hₜ = tanh(Wₓ · xₜ + Wₕ · hₜ₋₁ + b)

  xₜ    — 當前 time step 輸入向量
  hₜ₋₁ — 前一 time step 的隱藏狀態（遞迴連接）
  Wₓ    — 輸入權重矩陣 [input_size, hidden_size]
  Wₕ    — 隱藏狀態權重矩陣 [hidden_size, hidden_size]
  b     — 偏置向量
  tanh  — 啟動函數（輸出範圍 [-1, 1]）

問題：長序列時，梯度連乘多次 tanh'(z) ≤ 1
  → 梯度逐漸縮小趨近 0（梯度消失 gradient vanishing）
  → 早期 time step 的資訊無法有效傳遞到後期
```

---

## 下半部：LSTM Cell 詳解（單一 time step）

```
           xₜ (當前輸入)
           │
           │  hₜ₋₁ (前一隱藏狀態)
           │   │
           └─┬─┘
             │
             ├──────────────────────────────────────────┐
             │                                           │
             ▼                                           ▼
    ┌──────────────────┐                     ┌──────────────────┐
    │  遺忘門 Forget    │                     │  輸入門 Input     │
    │  f_t = σ(...)    │                     │  i_t = σ(...)    │
    │  [0, 1] 每個維度 │                     │  [0, 1] 每個維度 │
    └────────┬─────────┘                     └────────┬─────────┘
             │                                         │
             │  控制：要保留多少舊 Cell State             │  控制：要加入多少新資訊
             │                                         │
             │                               ┌──────────────────┐
             │                               │  候選 Cell 門 g   │
             │                               │  g_t = tanh(...) │
             │                               │  [-1, 1] 候選值  │
             │                               └────────┬─────────┘
             │                                        │
             ▼                                        ▼
     Cₜ₋₁ ──[⊙]────────────────────────────── [⊙]──[+]──► Cₜ (新 Cell State)
      舊狀態   │  f_t ⊙ Cₜ₋₁                    i_t ⊙ g_t
               │  (保留部分)                     (新增部分)
               │
               └──────────────────────────────────────────────────┐
                                                                   │
                                              ┌──────────────────┐ │
                                              │  輸出門 Output    │ │
                                              │  o_t = σ(...)    │ │
                                              └────────┬─────────┘ │
                                                       │           │
                                                  Cₜ ──[tanh]─────►[⊙]──► hₜ
                                                       輸出門過濾 Cell State
```

## 四個 Gate 完整公式

```
輸入: xₜ ∈ R^{input_size},  hₜ₋₁ ∈ R^{hidden_size}
拼接: [hₜ₋₁, xₜ] ∈ R^{hidden_size + input_size}

遺忘門  f_t = σ(W_f · [hₜ₋₁, xₜ] + b_f)
輸入門  i_t = σ(W_i · [hₜ₋₁, xₜ] + b_i)
候選值  g_t = tanh(W_g · [hₜ₋₁, xₜ] + b_g)
輸出門  o_t = σ(W_o · [hₜ₋₁, xₜ] + b_o)

Cell State 更新:
  Cₜ = f_t ⊙ Cₜ₋₁ + i_t ⊙ g_t
        ───────────   ──────────
        保留舊資訊     加入新資訊

Hidden State 輸出:
  hₜ = o_t ⊙ tanh(Cₜ)

符號說明:
  σ  — Sigmoid 函數，輸出 [0,1]（作為「閘門」控制流量）
  ⊙  — element-wise 乘法（Hadamard product）
  +  — element-wise 加法
```

## LSTM 參數量計算

```
┌────────────────────────────────────────────────────────────────┐
│  4 個 Gate，每個 Gate 的權重矩陣作用於 [hₜ₋₁, xₜ]             │
│                                                                 │
│  每個 Gate 參數量 = (input_size + hidden_size + 1) × hidden_size│
│  (+1 為 bias)                                                   │
│                                                                 │
│  總 LSTM 參數量 = 4 × (input_size + hidden_size + 1) × hidden_size │
└────────────────────────────────────────────────────────────────┘

數值範例：input_size = 100, hidden_size = 128
  每個 Gate: (100 + 128 + 1) × 128 = 229 × 128 = 29,312
  LSTM 總計: 4 × 29,312 = 117,248

考試快判: 4 × (I + H + 1) × H  (I = input_size, H = hidden_size)
```

## RNN vs LSTM vs GRU 對比

```
┌──────────────┬────────────────┬────────────────┬──────────────────┐
│              │ Simple RNN     │ LSTM           │ GRU              │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Gate 數量    │ 無 (0)         │ 4 個           │ 2 個 (r, z)      │
│ 隱藏狀態     │ hₜ 一個        │ hₜ + Cₜ 兩個  │ hₜ 一個         │
│ 梯度消失     │ 嚴重           │ 有效緩解        │ 有效緩解         │
│ 參數量       │ 最少           │ 最多 (4× RNN)  │ 中等 (3× RNN)   │
│ 適合場景     │ 短序列         │ 長序列依賴      │ 長序列、更快訓練 │
└──────────────┴────────────────┴────────────────┴──────────────────┘

LSTM 緩解梯度消失的關鍵：
  Cell State Cₜ 透過加法（+）傳遞，梯度不經過連乘 tanh
  → 遠距離梯度信號不會指數衰減
```

## PyTorch 實作對照

```python
import torch.nn as nn

# LSTM 定義
lstm = nn.LSTM(
    input_size=100,      # 每個 time step 的輸入維度
    hidden_size=128,     # 隱藏狀態維度
    num_layers=2,        # 堆疊 LSTM 層數
    batch_first=True,    # 輸入格式 [batch, seq_len, input_size]
    dropout=0.1          # 層間 dropout（僅對多層有效）
)

# 輸入: [batch, seq_len, input_size]
# 輸出:
#   output: [batch, seq_len, hidden_size]  — 每個 time step 的 hₜ
#   (h_n, c_n): 最後一個 time step 的 hₜ 和 Cₜ（多層時 shape=[num_layers, batch, hidden]）

# GRU（較少 gate，速度快）
gru = nn.GRU(input_size=100, hidden_size=128, num_layers=2, batch_first=True)
```

## 🔥🔥🔥 考試重點

| 考點 | 核心結論 |
|------|----------|
| LSTM Gate 數 | 4 個：Forget / Input / Cell(候選) / Output |
| Cell State 更新 | 加法傳遞，非乘法 → 緩解梯度消失 |
| 參數量公式 | 4 × (I + H + 1) × H |
| GRU vs LSTM | GRU 只有 2 gate，參數更少，速度更快，效果相近 |
| h 與 C 的差異 | hₜ = 輸出隱藏狀態；Cₜ = 內部 Cell State（LSTM 獨有） |

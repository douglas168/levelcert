# 學習率診斷圖 (Learning Rate Diagnosis)

## 三種學習率症狀對比

```mermaid
flowchart LR
    subgraph HIGH["🔴 學習率過高 (η 太大)"]
        direction TB
        H1["損失曲線形狀：\n⬆️⬇️⬆️⬇️ 劇烈震盪"]
        H2["可能發散（loss → ∞）"]
        H3["診斷：訓練初期損失跳動激烈"]
        H4["解法：降低 η，或使用 warm-up"]
        H1 --> H2 --> H3 --> H4
    end

    subgraph OK["🟢 學習率適中 (η 剛好)"]
        direction TB
        O1["損失曲線形狀：\n穩定下降，有微小波動"]
        O2["逐漸收斂到最小值附近"]
        O3["診斷：訓練穩定，驗證集同步改善"]
        O4["無需調整"]
        O1 --> O2 --> O3 --> O4
    end

    subgraph LOW["🟡 學習率過低 (η 太小)"]
        direction TB
        L1["損失曲線形狀：\n緩慢下降，近乎水平"]
        L2["可能卡在鞍點或平坦區"]
        L3["診斷：訓練很多 epoch 損失幾乎不動"]
        L4["解法：提高 η，或使用 LR 調度"]
        L1 --> L2 --> L3 --> L4
    end

    HIGH -.->|"減小 η"| OK
    LOW -.->|"增大 η"| OK

    style HIGH fill:#FFF0F0,stroke:#CC0000
    style OK fill:#F0FFF0,stroke:#006600
    style LOW fill:#FFFDE7,stroke:#996600
```

## 損失曲線視覺對比

```
損失 L
  │
  │ 🔴過高：
  │╭╮╭╮╭╮╭╮╭╮╭╮╭╮╭╮╭╮╭╮
  │╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯  ← 震盪，不收斂
  │
  │ 🟢適中：
  │╭─╮╭──╮╭────╮
  │╰─╯╰──╯╰────╯──────── ← 穩定下降
  │
  │ 🟡過低：
  │╭──────────────────
  │╰────────────────── ← 幾乎不動
  │
  └─────────────────────── epoch
```

## 學習率調度策略

```mermaid
graph TD
    PROBLEM["訓練中出現的問題"] --> DIAG{"診斷症狀"}

    DIAG -->|"初期震盪不穩定"| WARMUP["✅ Warm-up\n從小 LR 逐漸升溫\n前 N 步 lr: 0 → η_max"]
    DIAG -->|"訓練中期停滯"| STEP["✅ Step Decay\n每 N epoch × gamma\n例：每 30 epoch × 0.1"]
    DIAG -->|"需要大模型平滑收斂"| COSINE["✅ Cosine Annealing\nlr 隨餘弦曲線下降\n常用於 Transformer 大模型"]
    DIAG -->|"訓練全程穩定可用固定LR"| FIXED["✅ Fixed LR\n簡單任務、快速實驗"]

    style WARMUP fill:#E3F2FD,stroke:#1565C0
    style STEP fill:#E8F5E9,stroke:#2E7D32
    style COSINE fill:#F3E5F5,stroke:#6A1B9A
    style FIXED fill:#F5F5F5,stroke:#616161
```

## 診斷速查

| 症狀 | 原因 | 解法 |
|------|------|------|
| 損失震盪激烈、發散 | 學習率過高 | 降低 η；或加 warm-up |
| 損失下降極慢、幾乎不動 | 學習率過低 或 卡在鞍點 | 提高 η；或換 Adam（更好逃離鞍點） |
| 損失突然爆炸（→ NaN） | 學習率過高 或 梯度爆炸 | 降低 η；加 gradient clipping |
| 訓練初期不穩定後期穩定 | 正常現象 或 需要 warm-up | 加 warm-up 調度 |

> 🔑 考試三字訣：**「震是高、慢是低、爆是崩」**

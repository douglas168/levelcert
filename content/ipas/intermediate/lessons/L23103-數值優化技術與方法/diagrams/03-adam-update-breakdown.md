# Adam 更新規則分解 (Adam Optimizer Update Steps)

## Adam 四步驟計算流程

```mermaid
flowchart TD
    START(["⚡ 第 t 步：Adam 更新<br/>輸入：梯度 gₜ, 參數 wₜ₋₁"])

    subgraph STEP1["Step 1：第一動量估計（First Moment）"]
        S1["mₜ = β₁·mₜ₋₁ + (1−β₁)·gₜ<br/><br/>β₁ = 0.9（預設）<br/>💡 記憶過去梯度的指數加權平均<br/>→ 動量效果（Momentum）"]
    end

    subgraph STEP2["Step 2：第二動量估計（Second Moment）"]
        S2["vₜ = β₂·vₜ₋₁ + (1−β₂)·gₜ²<br/><br/>β₂ = 0.999（預設）<br/>💡 記憶過去梯度平方的指數加權平均<br/>→ 自適應學習率縮放（RMSProp 概念）"]
    end

    subgraph STEP3["Step 3：偏差修正（Bias Correction）"]
        S3["m̂ₜ = mₜ / (1 − β₁ᵗ)<br/>v̂ₜ = vₜ / (1 − β₂ᵗ)<br/><br/>⚠️ 原因：初期 m₀=v₀=0，估計值偏小<br/>修正後還原真實動量估計"]
    end

    subgraph STEP4["Step 4：參數更新（Parameter Update）"]
        S4["wₜ = wₜ₋₁ − η · m̂ₜ / (√v̂ₜ + ε)<br/><br/>η = 0.001（預設 LR）<br/>ε = 1e-8（避免除以零）<br/>💡 每個參數有自己的有效學習率"]
    end

    RESULT(["✅ 完成一步更新<br/>wₜ 已更新，進入 t+1"])

    START --> STEP1 --> STEP2 --> STEP3 --> STEP4 --> RESULT

    style STEP1 fill:#E3F2FD,stroke:#1565C0
    style STEP2 fill:#F3E5F5,stroke:#6A1B9A
    style STEP3 fill:#FFF9C4,stroke:#F57F17
    style STEP4 fill:#E8F5E9,stroke:#2E7D32
```

## Adam vs SGD 核心差異

```
SGD 更新：
  w ← w − η · g
      ↑     ↑
   全局LR  原始梯度（所有參數同一個 η）

Adam 更新：
  w ← w − η · m̂ / (√v̂ + ε)
      ↑     ↑    ↑
   全局LR  動量  自適應尺度（每個參數 η 不同）
```

## 超參數一覽

| 超參數 | 預設值 | 角色 | 考試重點 |
|--------|--------|------|---------|
| β₁ | 0.9 | 第一動量衰減率（動量項） | β₁ 控制「動量」，是梯度的指數加權平均 |
| β₂ | 0.999 | 第二動量衰減率（自適應縮放） | β₂ 控制「梯度平方」的加權平均，接近 1 代表長記憶 |
| ε | 1e-8 | 數值穩定常數（避免除以零） | 極小值，考試認識即可，不需記數值 |
| η (lr) | 0.001 | 全局學習率 | Adam 預設 lr 比 SGD 小（SGD 常用 0.01） |

> 🔑 考試快判：β₁ → 動量（第一動量）；β₂ → 自適應縮放（第二動量）；兩個不要搞反！

## 口訣
**「動量、規模、修正、更新」**
1. **動** — m（動量，β₁）
2. **規** — v（規模/方差，β₂）  
3. **修** — 偏差修正（m̂, v̂）
4. **新** — 更新 w

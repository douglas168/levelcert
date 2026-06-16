# L23101 考題快判流程 — Exam Quick-Judge Decision Tree

> 考場上遇到 L23101 題型，按這個流程快速定位答案

```mermaid
flowchart TD
    Q([題目出現了什麼？])

    Q --> D1{資料型態 /\n分佈名稱？}
    Q --> D2{Bayes /\nprior / posterior？}
    Q --> D3{變異解釋 /\nR² / explained？}
    Q --> D4{期望值 /\nE[X] / mean？}

    D1 --> D1A{連續值？}
    D1A -->|Yes| D1A1[Gaussian 常態分佈\n→ LDA / Gaussian NB]
    D1A -->|No| D1B{0/1 事件？}
    D1B -->|Yes| D1B1[Bernoulli 伯努利\n→ Bernoulli NB]
    D1B -->|No| D1C[Poisson 卜瓦松\n→ 計數資料]

    D2 --> D2A{問更新後機率？}
    D2A -->|Yes| D2A1[Posterior P\(H|E\)\n= Likelihood × Prior / Evidence]
    D2A -->|No| D2B{問假設 H 真時看到 E？}
    D2B -->|Yes| D2B1[Likelihood P\(E|H\)]
    D2B -->|No| D2C[Prior P\(H\) — 事前信念]

    D3 --> D3A{有 y 目標變數？}
    D3A -->|Yes| D3A1[R² — 迴歸評估\nmodel.score\(X, y\)]
    D3A -->|No| D3B[PCA explained_variance_ratio_\n降維後主成分保留比例]

    D4 --> D4A[E[X] = Σ xᵢ·P\(xᵢ\)\n模型預測的加權平均]

    style D1A1 fill:#dbeafe,stroke:#3b82f6
    style D1B1 fill:#fef9c3,stroke:#eab308
    style D1C fill:#dcfce7,stroke:#22c55e
    style D2A1 fill:#fce7f3,stroke:#ec4899
    style D3A1 fill:#ede9fe,stroke:#8b5cf6
    style D3B fill:#ffedd5,stroke:#f97316
```

## 30 秒口訣

```
分佈 → 型態定模型（連/二/計 → Gaussian/Bernoulli/Poisson）
Bayes → 更新找 Posterior（Likelihood × Prior ÷ Evidence）
變異解釋 → 有 y 用 R²，沒 y 用 PCA ratio
期望值 → 加權平均中心
```

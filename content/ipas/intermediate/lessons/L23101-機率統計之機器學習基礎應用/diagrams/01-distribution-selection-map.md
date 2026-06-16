# 分佈選型地圖 — Distribution Selection Map

> 看資料型態 → 選對分佈假設 → 才能選對 ML 模型

```mermaid
flowchart TD
    START([資料特徵是什麼型態？])

    START --> A{連續實數？\ne.g. 身高、溫度、分數}
    START --> B{二元事件？\n0 或 1，是或否}
    START --> C{固定區間的計數？\ne.g. 每小時客訴次數}

    A --> A1[🔵 Gaussian 常態分佈\nN\(μ, σ²\)]
    A1 --> A2[對應模型：\nLinear Regression\nLDA\nGaussian Naive Bayes]

    B --> B1[🟡 Bernoulli 伯努利分佈\nP\(X=1\) = p]
    B1 --> B2[對應模型：\nBernoulli Naive Bayes\nLogistic Regression\n二元分類器]

    C --> C1[🟢 Poisson 卜瓦松分佈\nP\(X=k\) = λᵏe⁻λ/k!]
    C1 --> C2[對應模型：\nPoisson Regression\n計數資料預測]

    style A1 fill:#dbeafe,stroke:#3b82f6
    style B1 fill:#fef9c3,stroke:#eab308
    style C1 fill:#dcfce7,stroke:#22c55e
```

## 考試快判規則

| 資料描述 | 對應分佈 | 對應模型 |
|---|---|---|
| 身高、溫度、連續測量值 | Gaussian | LDA / Gaussian NB |
| 垃圾郵件（是/否）、點擊（有/無） | Bernoulli | Bernoulli NB |
| 每小時訂單數、缺陷計數 | Poisson | Poisson Regression |

> 🔑 看到「連續值」→ Gaussian；看到「0/1 事件」→ Bernoulli；看到「計數 per 時間」→ Poisson

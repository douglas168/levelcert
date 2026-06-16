# 偏差-變異數權衡曲線（Bias-Variance Tradeoff Curve）

```mermaid
graph LR
    subgraph 模型複雜度與誤差關係
        direction LR
        A["低複雜度<br/>（欠擬合）"] -->|"增加複雜度"| B["最佳複雜度<br/>（最小總誤差）"] -->|"繼續增加"| C["高複雜度<br/>（過擬合）"]
    end

    subgraph 誤差來源分解
        D["總期望誤差<br/>E[error]"]
        D --> E["Bias²<br/>（偏差平方）<br/>模型假設太強 → 學不到真實規律"]
        D --> F["Variance<br/>（變異數）<br/>對訓練集過度敏感 → 泛化差"]
        D --> G["Noise<br/>（不可消除的雜訊）<br/>資料本身的隨機性"]
    end

    subgraph 模型複雜度效應
        H["簡單模型<br/>（線性）"] --> I["🔺 High Bias<br/>🔻 Low Variance<br/>→ Underfitting 欠擬合"]
        J["複雜模型<br/>（深度樹/NN）"] --> K["🔻 Low Bias<br/>🔺 High Variance<br/>→ Overfitting 過擬合"]
    end

    style B fill:#90EE90,stroke:#2E8B57
    style I fill:#FFB6C1,stroke:#DC143C
    style K fill:#FFB6C1,stroke:#DC143C
```

## 曲線示意（ASCII）

```
誤差
│
│\              ← Total Error（U 形）
│ \      ___/
│  \___/
│   ↑
│  最佳複雜度
│
│‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ Bias²（隨複雜度↑而↓）
│________________________ Noise（常數，不可消除）
│               _________ Variance（隨複雜度↑而↑）
└─────────────────────────→ 模型複雜度
  欠擬合 ←──── 最佳 ────→ 過擬合
```

## 考試快判

| 情境 | 診斷 | 解法 |
|---|---|---|
| 訓練準確率高，測試準確率低 | High Variance（過擬合） | 正則化、更多資料、降低複雜度 |
| 訓練準確率低，測試準確率也低 | High Bias（欠擬合） | 增加複雜度、更多特徵、減少正則化 |
| 兩者都高 | 最佳狀態 | — |
| 兩者都低 | 嚴重 High Bias | 重新設計特徵或模型 |

## 核心公式

$$E[\text{error}] = \text{Bias}^2 + \text{Variance} + \text{Noise}$$

- **Bias²**：模型的系統性錯誤（假設不夠彈性）
- **Variance**：模型對訓練資料的敏感程度（過度擬合訓練集）
- **Noise**：資料本身的隨機性（無法消除）

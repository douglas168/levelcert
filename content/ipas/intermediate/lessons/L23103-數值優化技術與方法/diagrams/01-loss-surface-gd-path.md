# 損失曲面與梯度下降路徑 (Loss Surface & Gradient Descent Path)

## 凸函數 vs 非凸函數損失曲面

```mermaid
flowchart TD
    subgraph CONVEX["🟢 凸函數損失曲面 (Convex Loss Surface)"]
        direction TB
        C1["起始點 w₀<br/>（任意初始化）"]
        C2["梯度指向最陡下降方向<br/>∇L(w) 始終指向全局最小值"]
        C3["✅ 唯一全局最小值<br/>Global Minimum<br/>（GD 保證到達）"]
        C1 -->|"w ← w − η·∇L"| C2
        C2 -->|"反覆迭代"| C3
    end

    subgraph NONCONVEX["🔴 非凸函數損失曲面 (Non-convex Loss Surface)"]
        direction TB
        N0["起始點 w₀<br/>（初始化影響路徑）"]
        N1{"梯度方向判斷"}
        N2["鞍點 Saddle Point<br/>∇L = 0，但非最小值<br/>（某維度↑，其他維度↓）"]
        N3["局部最小值<br/>Local Minimum<br/>（梯度=0，但非全局最優）"]
        N4["全局最小值<br/>Global Minimum<br/>（可能到達，也可能不到達）"]
        N0 -->|"w ← w − η·∇L"| N1
        N1 -->|"卡住"| N2
        N1 -->|"陷入"| N3
        N1 -->|"幸運路徑"| N4
        N2 -.->|"Adam/momentum 有助逃脫"| N3
    end

    CONVEX -.->|"代表算法：<br/>線性回歸 MSE"| NONCONVEX
    NONCONVEX -.->|"代表算法：<br/>深度神經網路"| CONVEX

    style C3 fill:#90EE90,stroke:#006400
    style N4 fill:#90EE90,stroke:#006400
    style N2 fill:#FFD700,stroke:#B8860B
    style N3 fill:#FFA07A,stroke:#8B0000
    style CONVEX fill:#F0FFF0,stroke:#006400
    style NONCONVEX fill:#FFF0F0,stroke:#8B0000
```

## SGD 更新路徑示意（ASCII 輔助）

```
損失 L(w)
  │
  │    ╭──────╮                凸函數：碗形
  │   ╱        ╲               → GD 直線收斂到底部
  │  ╱    🎯    ╲
  │ ╱  Global Min ╲
  └─────────────────── w
  
  │  ╭──╮    ╭──╮             非凸函數：崎嶇地形
  │ ╱    ╲  ╱    ╲            → 可能卡在鞍點或局部最小值
  │╱  鞍點╲╱ 局部Min╲  全局Min
  └──────────────────────── w
       ⚠️        ⚠️      🎯
```

## 考試重點

| 曲面類型 | 特徵 | 代表算法 | GD 保證？ |
|---------|------|---------|---------|
| 凸函數 | 唯一全局最小值，梯度始終指向最優解 | Linear Regression MSE | ✅ 保證收斂 |
| 非凸函數 | 多局部最小值 + 鞍點，∇L=0 不代表最優 | 深度神經網路 | ❌ 不保證 |

> 🔑 考試快判：看到「深度學習」→ 非凸損失曲面；看到「線性回歸 MSE」→ 凸函數，GD 保證收斂

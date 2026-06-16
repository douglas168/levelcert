# 圖表 1：演算法選擇流程圖

> **用途：** 給定資料類型與任務目標，快速導航到最合適演算法。考試情境題最常考「給你這份資料，選哪個演算法？」用這張圖可以在 10 秒內定位。

---

## 演算法選擇決策樹

```
開始：你的任務是什麼？
│
├── 🔢 預測連續數值（迴歸）
│   │
│   ├── 特徵與目標呈線性關係？
│   │   ├── 是 + 有冗餘特徵 → Lasso（L1 正則化）
│   │   ├── 是 + 特徵多重共線性 → Ridge（L2 正則化）
│   │   └── 是 + 一般情況 → Linear Regression
│   │
│   └── 特徵關係複雜非線性？
│       └── Random Forest Regressor（或 SVM Regressor）
│
└── 🏷️ 預測類別（分類）
    │
    ├── 需要模型可解釋（給主管看）？
    │   ├── 是 → Decision Tree（或 Logistic Regression）
    │   └── 否 → 繼續往下
    │
    ├── 資料是二元分類（是/否）？
    │   └── 是 → Logistic Regression + Sigmoid
    │
    ├── 資料是多類別分類（3 類以上）？
    │   └── 是 → Logistic Regression + Softmax（或 Random Forest）
    │
    ├── 特徵空間高維稀疏（文字、TF-IDF）？
    │   └── 是 → SVM kernel='linear'
    │
    ├── 資料邊界複雜非線性？
    │   └── 是 → SVM kernel='rbf' 或 Random Forest
    │
    ├── 訓練資料量少，想保留所有資料點？
    │   └── 是 → k-NN（Lazy Learner，無訓練）
    │
    └── 一般情況，追求高準確率 + 抗過擬合？
        └── Random Forest（Bagging 集成）
```

---

## 場景 → 演算法快查表

| 場景關鍵描述 | 推薦演算法 | 關鍵理由 |
|---|---|---|
| 連續數值預測 | Linear Regression（或衍生） | 迴歸任務 |
| 二元是/否分類 | Logistic Regression | Sigmoid 輸出機率 |
| 三類以上分類 | Logistic Reg + Softmax 或 RF | 多類需 Softmax |
| 需要向業務解釋 | Decision Tree | 可視化決策路徑 |
| 高維文字特徵 | SVM kernel='linear' | 線性邊界，高維有效 |
| 非線性複雜邊界 | SVM kernel='rbf' 或 RF | Kernel/Ensemble |
| 訓練資料量少 | k-NN | 無需訓練，保留全部資料 |
| 過擬合嚴重 | Random Forest 或加正則化 | Bagging 降方差 |
| 特徵中有大量冗餘 | Lasso（L1） | 自動特徵選擇 |
| 特徵高度相關（共線） | Ridge（L2） | 穩定縮小所有係數 |

---

## 考試快判流程（30 秒版）

```
看到「連續預測」→ 線性迴歸系
看到「二元分類」→ 邏輯迴歸 / Sigmoid
看到「多類別」→ Softmax 或 Random Forest
看到「可解釋」→ Decision Tree
看到「文字/TF-IDF/高維」→ SVM linear
看到「非線性」→ SVM rbf 或 Random Forest
看到「資料量少」「懶惰」→ k-NN
看到「過擬合」→ 正則化 or Random Forest
```

---

*返回學習指南：[study-guide.md](../study-guide.md)*

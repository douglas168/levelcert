# Diagram 01 — ML Models Taxonomy（機器學習模型分類樹）

> Source: L11302 Section 2 · 關鍵概念總覽圖

```
機器學習模型 Machine Learning Models
│
├─ 🏷️ 監督式學習（Supervised Learning）── 有標籤（Labeled data）
│   │
│   ├─ 📈 迴歸 Regression ── 輸出：連續數值
│   │   └─ 線性迴歸（Linear Regression）
│   │
│   └─ 📊 分類 Classification ── 輸出：離散類別
│       ├─ ⚠️ 邏輯迴歸（Logistic Regression）── 名字含「迴歸」但任務是分類！
│       ├─ 決策樹（Decision Tree）── 易過擬合
│       ├─ 隨機森林（Random Forest）── Bagging 集成
│       ├─ SVM（Support Vector Machine，支援向量機）── 最大邊界
│       ├─ KNN（K-Nearest Neighbors，K 近鄰演算法）── 懶惰學習
│       └─ 梯度提升（Gradient Boosting）/ XGBoost ── Boosting 集成
│
├─ 🔍 非監督式學習（Unsupervised Learning）── 無標籤（Unlabeled data）
│   │
│   ├─ 🗂️ 分群 Clustering ── 把相似資料歸到同一群
│   │   ├─ K-means ⚠️ （≠ KNN！必須預先指定 K）
│   │   └─ 階層式分群（Hierarchical Clustering）── 輸出 Dendrogram，不需預先指定 K
│   │
│   └─ 📉 降維 Dimensionality Reduction ── 壓縮高維資料到低維
│       └─ PCA（Principal Component Analysis，主成分分析）
│
└─ 🧠 神經網路 / 深度學習（Neural Networks / Deep Learning）
    │   （可跨典範：監督式、非監督式、強化式均可使用）
    │
    ├─ 感知機（Perceptron）── 最基本神經元單位
    ├─ 激活函數（Activation Function）
    │   ├─ ReLU ── 隱藏層首選
    │   ├─ Sigmoid ── 二元分類輸出
    │   └─ Softmax ── 多類別分類輸出
    ├─ CNN（Convolutional Neural Network，卷積神經網路）── 影像任務
    └─ RNN（Recurrent Neural Network，循環神經網路）── 序列 / 時間序列任務
```

## 快速記憶要點

| 判斷維度 | 監督式 | 非監督式 |
|---|---|---|
| 有無標籤 | 有標籤 | 無標籤 |
| 任務類型 | 分類 / 迴歸 | 分群 / 降維 |
| 代表演算法 | KNN、決策樹、邏輯迴歸 | K-means、PCA |

> ⚠️ 最常混淆：KNN（監督式）vs K-means（非監督式）；邏輯迴歸（分類）vs 線性迴歸（迴歸）

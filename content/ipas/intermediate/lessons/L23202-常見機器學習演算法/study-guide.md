# L23202 常見機器學習演算法 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」。中級的起點在**演算法內部機制**，所以這份指南不會重講「什麼是監督學習或非監督學習」（那是 L23201 的事），也不會涵蓋神經網路架構（那是 L23203）。我們直接進入六大演算法的數學原理、sklearn API、以及情境選題邏輯。

---

## Section 1: 考試項目對應

### 1a. 對應評鑑範圍

> 對應評鑑範圍：**L23202 常見機器學習演算法** ＋ **演算法技術原理、演算法應用、演算法優化**

### 1b. How to Study This Chapter

1. **先讀 Section 2**（知識樹）— 建立六大演算法的鳥瞰圖，知道每個演算法在哪個象限
2. **逐讀 Section 3**（核心概念）— 每個 3.N 先讀「先懂一句話」，再看公式，再看情境題
3. **背 Section 4**（比較表）— L1/L2、Gini/Entropy、DT/RF 是必考比較，務必能快速說出差異
4. **記 Section 5**（口訣）— 考前 30 分鐘衝一遍口訣
5. **過 Section 6/7**（陷阱 + 快判）— 考前確保每個 ❌ 陷阱都能說出 ✅ 正解

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

1. 說出 Linear Regression / Logistic Regression / Decision Tree / Random Forest / SVM / k-NN 各自的核心數學機制（公式辨識層級）
2. 看到「L1 正則化 vs L2 正則化」時立刻說出稀疏性差異，並判斷 Ridge 或 Lasso 的適用情境
3. 計算出一個 2-class 節點的 Gini impurity 值，並說出 Gini vs Entropy 在計算成本上的差異
4. 給定資料特徵描述（線性/非線性/高維/少量），選出最合適演算法並說明理由
5. 看到 sklearn 程式碼片段（5–10 行），判斷參數設定正確性與 cross_val_score 回傳型態
6. 解讀過擬合/欠擬合症狀，選出正則化或調參解法

### 1e. 考點權重

| 考點 | 權重 | 出處 |
|---|---|---|
| L1 vs L2 正則化 / Ridge vs Lasso 選擇 | 🔥🔥🔥 | 社群考試回報、高頻比較題 |
| Gini vs Entropy 計算與速度差異 | 🔥🔥🔥 | 社群考試回報 |
| Decision Tree vs Random Forest 比較 | 🔥🔥🔥 | 社群考試回報 |
| SVM Kernel 選擇（linear/RBF/poly） | 🔥🔥🔥 | 社群考試回報 |
| cross_val_score() 回傳型態陷阱 | 🔥🔥🔥 | 社群明確標記考試陷阱 |
| Pipeline 步驟排序題 | 🔥🔥🔥 | 2026-05-17 場次新題型確認 |
| Sigmoid vs Softmax 使用時機 | 🔥🔥 | 高頻比較題 |
| k-NN 距離度量 + k 值影響 | 🔥🔥 | 演算法原理 |
| 過擬合診斷 + 解法 | 🔥🔥 | L233 跨題型 |
| Linear Regression 損失函數 MSE | 🔥 | 基礎原理 |
| Logistic Regression Sigmoid 公式 | 🔥🔥 | 基礎原理 |

### 1f. 先備知識

- **L23201 — 機器學習原理與技術**：偏差-方差權衡（bias-variance tradeoff）概念、監督/非監督分類、特徵工程基礎 — 本課直接建立在此之上
- **L23101 — 機率統計之機器學習基礎應用**：機率概念、對數運算（log）用於 Entropy 計算
- **L23103 — 數值優化技術與方法**：梯度下降基礎（本課不重講優化器細節）

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [演算法選擇流程圖](diagrams/01-algorithm-selection-flowchart.md) | 給定資料類型與任務目標，快速導航到最合適演算法 |
| 2 | [偏差-方差定位圖](diagrams/02-bias-variance-positioning.md) | 六大演算法在高/低偏差×高/低方差四象限的定位，幫助判斷調參方向 |
| 3 | [決策樹分裂準則比較](diagrams/03-split-criteria-comparison.md) | Gini vs Entropy vs Information Gain 公式並排，標示計算成本差異 |
| 4 | [隨機森林 Bagging vs Boosting 對比](diagrams/04-bagging-vs-boosting.md) | Bagging（Random Forest）與 Boosting（AdaBoost/GBM）流程圖並排比較 |
| 5 | [SVM 間隔幾何示意](diagrams/05-svm-margin-geometry.md) | Hard margin / Soft margin / Kernel trick 三層幾何圖，標示支持向量位置 |

---

## Section 2: 關鍵概念總覽圖

這張圖不是要一次背完。先抓 4 層就好：

1. **演算法家族**：六大家族（線性迴歸系、邏輯迴歸、決策樹系、SVM、k-NN）
2. **每個家族的核心機制**：損失函數 / 分裂準則 / 間隔 / 距離
3. **正則化層**：L1/L2 如何套在線性模型上；決策樹的 max_depth 如何防止過擬合
4. **應用選擇**：連續輸出 vs 分類輸出 → 不同演算法

讀下面的樹狀圖時，先看各演算法的「任務類型」（迴歸/分類），再看各演算法的「關鍵超參數」。

```
🤖 L23202 常見機器學習演算法
│
├── 📊 線性模型（Linear Models）
│   ├── Linear Regression — 連續預測，損失=MSE
│   │   ├── Ridge (L2) — Σw²懲罰，保留所有特徵
│   │   ├── Lasso (L1) — Σ|w|懲罰，稀疏特徵選擇 🔥🔥🔥
│   │   └── ElasticNet — L1+L2 混合
│   └── Logistic Regression — 分類，Sigmoid→機率
│       ├── 二元分類: Sigmoid + Binary Cross-Entropy 🔥🔥
│       ├── 多分類: Softmax
│       └── 陷阱: C=1/α，C越小正則化越強
│
├── 🌳 決策樹系（Tree-Based）
│   ├── Decision Tree — 遞迴分裂，選最純節點
│   │   ├── Gini Impurity: 1 - Σpᵢ²（計算快）🔥🔥🔥
│   │   ├── Entropy: -Σpᵢlog₂pᵢ（更敏感）
│   │   └── 陷阱: 容易過擬合，需限制 max_depth
│   └── Random Forest — Bagging + 特徵隨機
│       ├── n_estimators: 樹的數量 🔥🔥🔥
│       ├── max_features='sqrt'（分類預設）
│       └── vs DT: 偏差高但方差低，抗過擬合
│
├── 📐 SVM（支持向量機）
│   ├── 最大間隔超平面（Max Margin Hyperplane）
│   ├── Kernel Trick — 映射到高維空間 🔥🔥🔥
│   │   ├── linear: 線性可分/高維文字
│   │   ├── rbf: 非線性資料（最常用預設）
│   │   └── poly: 影像場景
│   └── 超參數: C（正則強度）, gamma（RBF寬度）
│
└── 📍 k-NN（k-最近鄰）
    ├── Lazy Learner — 無訓練階段
    ├── 距離度量: Euclidean / Manhattan 🔥
    ├── k 值: k小→高方差；k大→高偏差
    └── 陷阱: 必須特徵標準化（StandardScaler）
```

---

## Section 3: 核心概念

### 3.1 線性迴歸與正則化（Linear Regression + Regularization）🔥🔥

**先懂一句話：**
線性迴歸就是找一條直線（或超平面）讓預測值與真實值的誤差平方總和最小，而正則化是在損失函數上加「複雜度罰款」防止過擬合。

**它在流程中的位置：**
資料預處理 → 特徵工程 → **[線性迴歸建模 + 正則化選擇]** → 評估 → 超參數調整

---

#### 線性迴歸（Linear Regression）

模型形式（線性迴歸方程式）：

```
ŷ = w₀ + w₁x₁ + w₂x₂ + ... + wₙxₙ
```

損失函數（均方誤差，Mean Squared Error, MSE）🔥：

```
MSE = (1/n) Σᵢ(yᵢ - ŷᵢ)²
```

最佳化目標：最小化 MSE。可用梯度下降或正規方程（Normal Equation）求解。

🗣️ **白話說明：** 就像在 蝦皮 賣場上看「銷售量預測」——給你商品歷史價格、評分、上架天數，線性迴歸就是畫一條最逼近真實銷售量的直線。MSE 就是量化每個預測「差多遠」的那把尺。

---

#### Ridge Regression（L2 正則化）🔥🔥🔥

損失函數：

```
損失 = MSE + α · Σⱼwⱼ²
```

效果：懲罰大的權重，讓所有 w 趨近 0 但**不歸零**。保留所有特徵。

適用：多重共線性（多個特徵高度相關）、希望穩定所有係數。

---

#### Lasso Regression（L1 正則化）🔥🔥🔥

損失函數：

```
損失 = MSE + α · Σⱼ|wⱼ|
```

效果：部分權重精確歸零 → **稀疏解（Sparse Solution）**，自動做特徵選擇。

適用：高維資料、懷疑有冗餘特徵、想知道哪些特徵重要。

🗣️ **白話說明：** Lasso 像在填 104 履歷表——它會替你刪掉不重要的欄位（特徵歸零），Ridge 則是把所有欄位都留著但每個填少一點（係數縮小）。

---

#### ElasticNet（L1 + L2 混合）🔥

損失函數：

```
損失 = MSE + α₁ · Σ|wⱼ| + α₂ · Σwⱼ²
```

適用：相關特徵有群組結構，同時需要稀疏性。

---

**L1 vs L2 快速對比：**

| 面向 | L1（Lasso） | L2（Ridge） |
|------|------------|------------|
| 懲罰項 | Σ\|w\| | Σw² |
| 特徵選擇 | 自動（稀疏） | 不做 |
| 解的特性 | 部分 w = 0 | 所有 w 縮小但非零 |
| 適用場景 | 高維稀疏 | 多重共線性 |

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 100 個特徵中懷疑 80 個是冗餘的，想自動篩選 | Lasso（L1 正則化） | Ridge（L2 無法歸零） |
| 多個特徵高度相關（多重共線性），希望穩定模型 | Ridge（L2 正則化） | Lasso（稀疏解不適合相關群） |
| 需同時稀疏化且處理相關特徵群組 | ElasticNet | 只選 Lasso 或只選 Ridge |
| alpha 從 0.1 增大到 10，模型複雜度如何變化 | 複雜度降低（過擬合風險下降） | 複雜度增加（混淆 alpha 方向） |

#### Code Pattern 認識就夠

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet

# 純線性迴歸
lr = LinearRegression()

# Ridge (L2) — alpha 越大正則化越強
ridge = Ridge(alpha=1.0)

# Lasso (L1) — 稀疏特徵選擇
lasso = Lasso(alpha=0.1)

# ElasticNet — l1_ratio 控制 L1/L2 混合比例
enet = ElasticNet(alpha=0.5, l1_ratio=0.5)

ridge.fit(X_train, y_train)
# ↑ alpha 增大 → 係數縮小 → 模型簡單 → 欠擬合風險上升
```

考試重點：`alpha` 控制正則化強度（越大 → 越強懲罰 → 模型越簡單）；Lasso 的 `alpha` 夠大時特徵係數歸零。

---

### 3.2 邏輯迴歸（Logistic Regression）🔥🔥

**先懂一句話：**
邏輯迴歸把線性組合餵給 Sigmoid 函數，把任意數值壓到 (0,1) 之間，當作「屬於某類別的機率」。

**它在流程中的位置：**
特徵向量 → **[線性組合 z = wᵀx → Sigmoid(z) → 機率 p]** → 閾值判斷 → 類別輸出

---

#### Sigmoid 函數 🔥🔥

```
σ(z) = 1 / (1 + e⁻ᶻ)
```

輸出範圍：(0, 1)，即機率值。

ASCII 示意：

```
σ(z)
 1.0 |              ___________
 0.5 |          ___/
 0.0 |_________/
     ←─────────────────────── z
     -∞        0          +∞
```

🗣️ **白話說明：** 就像 LINE 通知「這封訊息是垃圾訊息的機率是 93%」——Sigmoid 把「這條訊息有多像垃圾」這個分數（-∞ 到 +∞）壓縮成 0–1 之間的機率。

---

#### 損失函數：Binary Cross-Entropy 🔥🔥

```
Loss = -[y · log(ŷ) + (1-y) · log(1-ŷ)]
```

- y=1 時：只看 -log(ŷ)，ŷ 越接近 1 Loss 越小
- y=0 時：只看 -log(1-ŷ)，ŷ 越接近 0 Loss 越小

---

#### 多分類：Softmax 🔥🔥

```
Softmax(zᵢ) = e^zᵢ / Σⱼe^zⱼ
```

輸出：各類別機率，總和 = 1。

**Sigmoid vs Softmax：**
- **Sigmoid** → 二元分類（一個節點輸出一個機率）
- **Softmax** → 多元分類（K 個節點，各輸出一個類別機率，總和=1）

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 預測用戶是否會點擊廣告（是/否） | Sigmoid + Binary Cross-Entropy | Softmax（多類才用） |
| 圖片分類為貓/狗/鳥三類 | Softmax | Sigmoid（二元才用） |
| Logistic Regression C=0.01，模型表現如何 | 正則化強，欠擬合風險上升 | C越小越複雜（方向錯） |
| 將 z=2 代入 Sigmoid，輸出約為 | 約 0.88 | 0.5 或 2（未計算） |

#### Code Pattern 認識就夠

```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# 邏輯迴歸：C = 1/alpha，C 越小正則化越強
lr = LogisticRegression(penalty='l2', C=1.0, solver='lbfgs', max_iter=1000)

# 二元分類 pipeline
pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)

# 多分類：multi_class 設定
lr_multi = LogisticRegression(multi_class='multinomial', solver='lbfgs')
# ↑ multinomial → Softmax 輸出；ovr → 一對多 Sigmoid
```

考試重點：`C` 與 `alpha` 的**反向關係**（C = 1/α）；`solver` 需與 `penalty` 搭配（L1 用 'liblinear'）。

---

### 3.3 決策樹（Decision Tree）🔥🔥🔥

**先懂一句話：**
決策樹不斷問「哪個特徵的哪個切點，能讓分裂後的子節點變得最純？」，遞迴下去直到停止條件。

**它在流程中的位置：**
資料集 → **[選最佳分裂特徵+切點 → 遞迴分裂]** → 葉節點預測 → 輸出

---

#### Gini Impurity（吉尼不純度）🔥🔥🔥

```
Gini(t) = 1 - Σᵢ pᵢ²
```

- 範圍：0（完全純）到接近 1（完全混雜）
- 對於 2-class 問題，最大不純度 = 0.5（各佔 50%）

**範例計算：**
節點有 [60 個 A 類，40 個 B 類]：
```
p_A = 0.6, p_B = 0.4
Gini = 1 - (0.6² + 0.4²) = 1 - (0.36 + 0.16) = 1 - 0.52 = 0.48
```

🗣️ **白話說明：** 就像在 7-11 門口分人群——如果進來的人 100% 都是買咖啡，這個節點「最純」（Gini=0）；如果一半買咖啡一半買飯糰，最混雜（Gini=0.5）。

---

#### Entropy（熵）與 Information Gain（資訊增益）🔥🔥

```
Entropy(t) = -Σᵢ pᵢ · log₂(pᵢ)
```

```
Information Gain = Entropy(parent) - Σ [(nₖ/n) · Entropy(childₖ)]
```

**Gini vs Entropy 關鍵差異：**

| | Gini | Entropy |
|--|------|---------|
| 計算 | 平方，無 log | 有 log 計算 |
| 速度 | 快（sklearn 預設） | 慢（計算成本高） |
| 對不純度的敏感度 | 較低 | 較高 |
| 考試快判 | 「計算較便宜」→ Gini | 「對純度更敏感」→ Entropy |

---

#### 關鍵超參數 🔥🔥

| 超參數 | 作用 | 防過擬合方向 |
|---|---|---|
| max_depth | 樹的最大深度 | 調小（限制複雜度） |
| min_samples_split | 分裂所需最少樣本數 | 調大 |
| min_samples_leaf | 葉節點最少樣本數 | 調大 |
| criterion | 'gini' 或 'entropy' | 不影響過擬合 |

決策樹的根本缺點：容易**過擬合（Overfitting）**，對訓練資料高度敏感 → 解法：Random Forest。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 節點有 [70%, 30%] 分佈，計算 Gini | 1-(0.7²+0.3²) = 0.42 | 直接回答 0.3（忘記計算） |
| 想要計算速度快的分裂準則 | criterion='gini' | criterion='entropy'（log較慢） |
| 決策樹訓練 accuracy 100% 但測試 60% | 過擬合，調小 max_depth | 增加樹的深度 |
| 需要知道哪些特徵最重要 | dt.feature_importances_ | 決策樹無法取得特徵重要性（錯） |

#### Code Pattern 認識就夠

```python
from sklearn.tree import DecisionTreeClassifier

# Gini 分裂（預設，計算快）
dt_gini = DecisionTreeClassifier(criterion='gini', max_depth=5, min_samples_leaf=10)

# Entropy 分裂（對純度更敏感）
dt_entropy = DecisionTreeClassifier(criterion='entropy', max_depth=5)

dt_gini.fit(X_train, y_train)

# 特徵重要性
importances = dt_gini.feature_importances_
# ↑ 陣列，每個特徵的重要性分數，總和=1
```

考試重點：`criterion` 預設值是 `'gini'`；`feature_importances_` 回傳的是各特徵的貢獻陣列。

---

### 3.4 隨機森林（Random Forest）🔥🔥🔥

**先懂一句話：**
隨機森林是「訓練一大群決策樹，每棵樹用不同的資料子集+不同的特徵子集，最後投票決定」——靠多樣性互補彼此的錯誤。

**它在流程中的位置：**
原始資料集 → **[Bootstrap抽樣 × n_estimators → 每棵樹隨機特徵訓練 → 整體投票/平均]** → 預測輸出

---

#### Bagging 機制 🔥🔥🔥

```
Bootstrap 抽樣 → 訓練資料1   → 決策樹1 ─┐
Bootstrap 抽樣 → 訓練資料2   → 決策樹2 ─┤→ 投票（分類）/平均（迴歸）
Bootstrap 抽樣 → 訓練資料3   → 決策樹3 ─┘
```

**隨機特徵選擇（Feature Randomness）：**
- 每個節點分裂時，只從 **√n_features**（分類預設 `max_features='sqrt'`）個特徵中選最佳分裂
- 這讓各棵樹差異更大，降低整體方差（variance）

🗣️ **白話說明：** 就像公司徵人讓 100 個不同部門的主管各自面試，每個人問不同問題、看不同角度，最後投票決定錄取——比一個人拍板更準確。

---

#### Random Forest vs Decision Tree 🔥🔥🔥

| | Decision Tree | Random Forest |
|--|--------------|--------------|
| 過擬合 | 高（容易記住訓練資料） | 低（樹間相互平衡） |
| 可解釋性 | 高（可視化樹狀圖） | 低（多棵樹難以解釋） |
| 訓練速度 | 快 | 慢（n 棵樹） |
| 預測速度 | 快 | 稍慢 |
| 特徵重要性 | 可取（一棵樹） | 平均多棵（更穩定） |
| 適用 | 需要解釋 / 資料乾淨 | 高準確率 / 防過擬合 |

---

#### 關鍵超參數 🔥🔥

| 超參數 | 作用 | 調整方向 |
|---|---|---|
| n_estimators | 決策樹數量 | 越多越穩定（但計算成本增加） |
| max_features | 每次分裂的特徵子集大小 | 'sqrt'（分類預設）, 'log2', None |
| max_depth | 每棵樹的最大深度 | 控制單棵樹複雜度 |
| min_samples_leaf | 葉節點最少樣本數 | 調大→更保守 |

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 決策樹過擬合嚴重，想提升泛化能力 | 改用 Random Forest（Bagging） | 增加 max_depth（反而更糟） |
| n_estimators 從 10 增到 200，效果如何 | 準確率提升，計算時間增加，過擬合風險降低 | 準確率不再提升（需看具體案例） |
| 需要向非技術主管解釋模型判斷邏輯 | 改用 Decision Tree（可視化） | Random Forest（黑盒，難解釋） |
| 隨機森林分類，max_features 預設值 | 'sqrt'（即 √n_features） | n_features/3（那是迴歸的預設） |

#### Code Pattern 認識就夠

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,      # 100 棵樹
    max_features='sqrt',   # 分類預設：每次分裂用 √n 個特徵
    max_depth=None,        # None = 不限深度（讓每棵樹充分生長）
    random_state=42
)
rf.fit(X_train, y_train)

# 特徵重要性（比單棵 DT 更穩定）
importances = rf.feature_importances_

# 交叉驗證（注意！回傳的是 array）
from sklearn.model_selection import cross_val_score
scores = cross_val_score(rf, X, y, cv=5)
print(scores)        # array([0.85, 0.88, 0.82, 0.87, 0.84])
print(scores.mean()) # 需要自己 .mean()！
```

考試重點：`cross_val_score()` 回傳 **array 不是 mean**——這是考試刻意設的陷阱。

---

### 3.5 支持向量機（SVM, Support Vector Machine）🔥🔥

**先懂一句話：**
SVM 找到一個超平面，讓兩類資料之間的「安全距離（間隔）」最大化，邊界由最靠近的那幾個點（支持向量）決定。

**它在流程中的位置：**
特徵空間 → **[Kernel映射（選用） → 最大化間隔 → 支持向量確定邊界]** → 分類決策

---

#### 間隔（Margin）幾何 🔥🔥

```
          Class A (+)
    ──────────────────────── 決策邊界
    ←─── margin = 2/‖w‖ ───→
    ──────────────────────── 邊界線
          Class B (-)
              ↑
         Support Vectors（最靠近邊界的點）
```

優化目標：最大化 2/‖w‖ = 最小化 ‖w‖²

---

#### Hard Margin vs Soft Margin 🔥🔥

| | Hard Margin | Soft Margin |
|--|------------|------------|
| 容忍錯誤 | 不容忍（線性可分才能用） | 允許部分資料進入間隔 |
| 超參數 C | 不存在（固定） | C 越大→邊界越硬→過擬合風險高 |
| 適用 | 資料完全線性可分 | 真實資料（噪音/重疊）|

**C 的影響（反直覺！）🔥🔥🔥**
- **C 大**（如 100）：容忍誤分類少 → 邊界緊 → 複雜 → **過擬合**
- **C 小**（如 0.01）：容忍誤分類多 → 邊界鬆 → 簡單 → **欠擬合**

---

#### Kernel Trick（核函數技巧）🔥🔥🔥

當資料在原始空間線性不可分，Kernel 將特徵隱式映射到高維空間，讓邊界變得可分。

```
原始 2D 空間（線性不可分）
●○●○●○○ ─── Kernel映射 ──▶  高維空間（線性可分）
                                ─────────── 超平面
```

**三種主要 Kernel 的選擇：**

| Kernel | 參數 | 適用場景 | 考試快判關鍵字 |
|---|---|---|---|
| linear | 無額外參數 | 線性可分、高維稀疏（文字特徵） | 「文字分類」「高維」 |
| rbf (Gaussian) | gamma | 非線性資料、一般預設 | 「非線性」「一般情境」 |
| poly | degree | 影像處理、多項式邊界 | 「影像」「多項式」 |

🗣️ **白話說明：** 就像 Uber Eats 地圖把外送範圍（平面圓形）轉換成海拔高度（3D 半球）——原本交疊的範圍在高維就變得可分了。Kernel Trick 的「巧妙」在於不需要真的計算高維座標，而是直接計算點間的「相似度」。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 文字分類（TF-IDF 特徵，數萬維） | SVM kernel='linear' | kernel='rbf'（低維非線性才用） |
| 圖像識別，特徵有複雜非線性邊界 | kernel='rbf' | kernel='linear' |
| SVM C 從 0.1 調到 100，訓練 acc 上升但測試 acc 下降 | 過擬合（C 太大） | C 太小（方向判斷錯） |
| 想在不計算高維座標的前提下處理非線性 | Kernel Trick | 手動特徵工程（不必要） |

#### Code Pattern 認識就夠

```python
from sklearn.svm import SVC

# RBF kernel（非線性預設）
svc_rbf = SVC(kernel='rbf', C=1.0, gamma='scale')
# gamma='scale' = 1/(n_features * X.var()) — 比 'auto' 更常用

# 線性 kernel（高維文字）
svc_linear = SVC(kernel='linear', C=0.5)

# Polynomial kernel
svc_poly = SVC(kernel='poly', degree=3, C=1.0)

svc_rbf.fit(X_train, y_train)
# 注意：SVM 對特徵縮放敏感，前面需加 StandardScaler
```

考試重點：`kernel` 選擇邏輯（文字→linear；非線性→rbf）；`C` 越大→過擬合風險越高。

---

### 3.6 k-最近鄰（k-NN, k-Nearest Neighbors）🔥

**先懂一句話：**
k-NN 是「懶惰學習者」——訓練階段什麼都不做，預測時找最近的 k 個鄰居，讓他們投票決定類別。

**它在流程中的位置：**
儲存所有訓練資料 → **[預測時計算距離 → 找最近 k 個鄰居 → 投票/平均]** → 輸出結果

---

#### 距離度量（Distance Metrics）🔥🔥

**Euclidean Distance（歐氏距離）：**

```
d(p,q) = √[Σᵢ(pᵢ - qᵢ)²]
```

**Manhattan Distance（曼哈頓距離）：**

```
d(p,q) = Σᵢ|pᵢ - qᵢ|
```

| 距離 | 公式 | 適用情境 |
|---|---|---|
| Euclidean | 平方和開根號 | 連續特徵、低維 |
| Manhattan | 絕對值之和 | 高維、稀疏特徵 |

---

#### k 值的影響 🔥🔥

```
小 k（如 k=1）：
  偏差低 → 邊界複雜（overfit 訓練資料）
  方差高 → 對噪音敏感

大 k（如 k=50）：
  偏差高 → 邊界平滑
  方差低 → 泛化較好但可能 underfit
```

**最佳 k 值通常用 Cross-Validation 選擇。**

---

#### k-NN 的重要特性 🔥

- **Lazy Learner（懶惰學習者）**：無顯式訓練階段，所有計算在預測時進行
- **預測速度慢**：每次預測需計算所有訓練點的距離（O(n) 複雜度）
- **必須特徵標準化**：距離對數值尺度敏感，不標準化會讓大數值特徵主導距離

🗣️ **白話說明：** 就像你在台北找房子——你不去「學習」整個租屋市場的規律，而是直接找「這間房附近 5 間最相似的房」看它們的成交價。k-NN 就是這樣：問問鄰居，多數人怎麼說就照著走。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| k=1 vs k=100，哪個更容易過擬合 | k=1（邊界複雜，高方差） | k=100（泛化太過）|
| k-NN 預測前必須做什麼前處理 | StandardScaler 標準化 | 直接輸入原始數值 |
| 訓練資料只有 500 筆，適合用哪個演算法 | k-NN（Lazy Learner，無需訓練） | SVM 或 RF（也可以，但 k-NN 無訓練成本） |
| k-NN 的預測時間複雜度 | O(n)（每次都要算全部訓練資料距離） | O(1)（誤以為有索引） |

#### Code Pattern 認識就夠

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# k-NN 必須搭配 StandardScaler！
knn_pipe = make_pipeline(
    StandardScaler(),                              # 步驟1：標準化
    KNeighborsClassifier(n_neighbors=5,            # k=5
                         metric='euclidean')        # 距離度量
)
knn_pipe.fit(X_train, y_train)

# 最佳 k 值：交叉驗證選擇
from sklearn.model_selection import cross_val_score
for k in [3, 5, 7, 11]:
    scores = cross_val_score(KNeighborsClassifier(n_neighbors=k), X, y, cv=5)
    print(f"k={k}: {scores.mean():.3f}")
```

考試重點：k-NN 忘記加 StandardScaler 是常見錯誤；距離預設為 'minkowski'（p=2 時等於 Euclidean）。

---

## Section 4: 易混淆概念比較表

### 4.1 L1 vs L2 正則化 🔥🔥🔥

| 概念 | L1 正則化（Lasso） | L2 正則化（Ridge） |
|------|------------------|------------------|
| 懲罰項 | α · Σ\|wⱼ\| | α · Σwⱼ² |
| 解的特性 | 稀疏（部分 w=0） | 平滑縮小（w 趨近 0 但非零） |
| 特徵選擇 | 自動（歸零=選掉） | 不做 |
| 適用情境 | 高維稀疏，懷疑有冗餘特徵 | 多重共線性，所有特徵都有貢獻 |
| sklearn | `Lasso(alpha=α)` | `Ridge(alpha=α)` |

> 考試快判：看到「稀疏」「特徵選擇」「歸零」→ L1/Lasso；看到「縮小係數」「多重共線性」→ L2/Ridge

---

### 4.2 Sigmoid vs Softmax 🔥🔥🔥

| 概念 | Sigmoid | Softmax |
|------|---------|---------|
| 輸出 | 單一機率 ∈ (0,1) | 各類機率，總和 = 1 |
| 用途 | 二元分類（Binary） | 多元分類（Multi-class） |
| 公式 | σ(z) = 1/(1+e⁻ᶻ) | softmax(zᵢ) = eᶻⁱ/Σⱼeᶻʲ |
| 損失函數 | Binary Cross-Entropy | Categorical Cross-Entropy |

> 考試快判：看到「是/否」「二元」→ Sigmoid；看到「三類以上」「多類別」→ Softmax

---

### 4.3 Gini vs Entropy（決策樹分裂準則）🔥🔥🔥

| 概念 | Gini Impurity | Entropy |
|------|--------------|---------|
| 公式 | 1 - Σpᵢ² | -Σpᵢ log₂(pᵢ) |
| log 計算 | 無（快） | 有（慢） |
| sklearn 預設 | ✅ 是（criterion='gini'） | 否 |
| 對不純度敏感度 | 較低 | 較高 |
| 適用 | 計算資源有限、大規模資料 | 需要更細緻的純度判斷 |

> 考試快判：看到「計算速度較快」→ Gini；看到「更敏感」「更精確」→ Entropy

---

### 4.4 Decision Tree vs Random Forest 🔥🔥🔥

| 概念 | Decision Tree | Random Forest |
|------|--------------|--------------|
| 過擬合傾向 | 高 | 低（Bagging 降低方差） |
| 可解釋性 | 高（可視化樹） | 低（黑盒集成） |
| 訓練速度 | 快 | 慢（n_estimators 棵樹） |
| 準確率 | 通常較低 | 通常較高 |
| 特徵重要性 | 可取，但不穩定 | 多棵平均，更穩定 |

> 考試快判：看到「可解釋」「快速訓練」→ Decision Tree；看到「準確率高」「抗過擬合」→ Random Forest

---

### 4.5 Hard Margin SVM vs Soft Margin SVM 🔥🔥

| 概念 | Hard Margin SVM | Soft Margin SVM |
|------|----------------|----------------|
| 容忍誤分類 | 完全不容忍 | 允許部分點進入間隔 |
| 前提條件 | 資料必須線性可分 | 適用真實資料（含噪音）|
| 超參數 C | 不適用 | C 越大→邊界越硬→過擬合 |
| 實際使用 | 幾乎不用 | 標準 SVM 實作 |

> 考試快判：看到「噪音資料」「容錯」→ Soft Margin / C 調小；看到「C 增大」→ 過擬合方向

---

## Section 5: 口訣 / Mnemonics

### 正則化口訣：「一稀二縮」
- **L1（一）→ 稀**（稀疏，特徵歸零）
- **L2（二）→ 縮**（縮小，係數均勻縮小）

### 演算法選擇口訣：「線邏樹森機鄰」
**線**性迴歸（連續預測）→ **邏**輯迴歸（二元分類）→ **樹**（決策樹，需解釋）→ **森**林（Random Forest，高準確率）→ **機**（SVM，非線性邊界）→ **鄰**（k-NN，懶惰學習）

### SVM Kernel 口訣：「文線圖RBF影Poly」
- **文**字特徵 → **線**性 kernel (linear)
- **圖**像/一般非線性 → **RBF** kernel
- **影**像多項式邊界 → **Poly** kernel

### Gini/Entropy 口訣：「Gini省電 Entropy精確」
- **Gini 省電**（無 log，計算快，省計算資源）
- **Entropy 精確**（有 log，對純度更敏感）

### k-NN 口訣：「k小過擬合，k大欠擬合」
- k 小 → 邊界複雜 → 過擬合
- k 大 → 邊界平滑 → 欠擬合

### 超參數方向口訣：「alpha大C小，正則化強」
- `alpha`（Lasso/Ridge）越大 → 懲罰越強 → 模型越簡單
- `C`（SVM/LR）越小 → 等於 alpha 越大 → 正則化越強

---

## Section 6: 考試陷阱

❌ **陷阱 1：`cross_val_score()` 回傳 mean 值**
✅ 正解：`cross_val_score()` 回傳的是一個 **numpy array**（每個 fold 的分數），需要自己呼叫 `.mean()` 才能得到平均值。許多題目會在程式碼裡直接 `print(scores)` 然後問輸出是什麼——答案是 array，不是單一數字。

❌ **陷阱 2：Pipeline 步驟順序錯誤**
✅ 正解：正確順序是 **載入 → 前處理 → 特徵工程 → 分割 → 縮放 → 建模 → 評估**。常見錯誤：把 StandardScaler 放在 split 之後（正確）但忘了 Scaler 要放在 Pipeline 的第一步（在 model 之前）。

❌ **陷阱 3：k-NN 不需要特徵標準化**
✅ 正解：k-NN 的核心是距離計算，**高度依賴特徵的數值尺度**。若一個特徵是年齡（0–100）、另一個是月薪（0–100,000），月薪會完全主導距離計算。必須加 StandardScaler。

❌ **陷阱 4：SVM 的 C 越大越好（正則化越強）**
✅ 正解：**C 越大 → 正則化越弱 → 邊界越硬 → 過擬合風險越高**。C 是容錯懲罰項的係數，C 大代表「不容忍誤分類」，反而讓模型更複雜。（與 alpha 方向相反）

❌ **陷阱 5：Gini 和 Entropy 效果沒差，可以隨便選**
✅ 正解：在大多數情況下結果相近，但考試考「哪個計算成本較低」→ 答案是 **Gini**（無 log 計算）。sklearn 預設也是 `criterion='gini'`。

❌ **陷阱 6：Recall 公式是 TP/(TP+FP)**
✅ 正解：官方教材這裡**有錯誤**。TP/(TP+FP) 是 **Precision（精確率）**，而非 Recall。**Recall（召回率）= TP/(TP+FN)**。考試依正確公式出題，不要跟官方教材的錯誤。

❌ **陷阱 7：Random Forest 的 max_features 預設是「所有特徵」**
✅ 正解：Random Forest 分類的預設 `max_features='sqrt'`（即 √n_features），**不是全部特徵**。這是 RF 隨機性的來源，確保各棵樹多樣化。

❌ **陷阱 8：Logistic Regression 的 C 越大正則化越強**
✅ 正解：Logistic Regression 的 **C = 1/alpha**（正則化強度的倒數），**C 越大 → 正則化越弱 → 模型越複雜**。C 小才是強正則化。

---

## Section 7: 情境題快速判斷

🔑 看到關鍵字 → 選這個答案

**演算法選擇：**
- 「連續數值預測」→ Linear Regression
- 「二元分類」「是/否」→ Logistic Regression + Sigmoid
- 「多類別分類」「三類以上」→ Softmax
- 「需要模型可解釋」「樹狀圖」→ Decision Tree
- 「高準確率」「防過擬合」「集成」→ Random Forest
- 「高維文字特徵」「TF-IDF」→ SVM kernel='linear'
- 「非線性邊界」「複雜分類」→ SVM kernel='rbf'
- 「訓練資料量少」「無需訓練」「Lazy」→ k-NN
- 「時間序列」→ LSTM/GRU（→ L23203 範疇）

**正則化選擇：**
- 「特徵選擇」「稀疏」「歸零」→ L1 / Lasso
- 「多重共線性」「縮小係數」→ L2 / Ridge
- 「L1 + L2」「相關特徵群」→ ElasticNet

**超參數調整方向：**
- 「alpha 增大」→ 正則化更強 → 模型更簡單
- 「C 增大（SVM）」→ 正則化更弱 → 過擬合風險高
- 「C 增大（LogisticReg）」→ 正則化更弱 → 模型更複雜
- 「k 增大（k-NN）」→ 邊界更平滑 → 偏差增加
- 「n_estimators 增大」→ RF 更穩定（至收斂為止）

**程式碼陷阱：**
- `cross_val_score()` → 回傳 array（非 mean）
- `StandardScaler` → 必須在 k-NN 和 SVM 前加
- `max_features='sqrt'` → RF 分類預設
- `criterion='gini'` → DT 預設（非 entropy）

**Gini/Entropy：**
- 「計算速度快」→ Gini（無 log）
- 「對純度更敏感」→ Entropy
- 「sklearn 預設」→ Gini

---

## Section 8: 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內說出 **L1 vs L2 正則化**的差異，以及 Lasso/Ridge 各自的適用情境
- [ ] 我能計算一個 2-class 節點的 **Gini impurity**（例如 [70%, 30%] 分佈的結果）
- [ ] 我能說出 **Gini vs Entropy** 在計算速度上的差異，以及哪個是 sklearn 的預設值
- [ ] 我能解釋 **Sigmoid vs Softmax** 各自的輸出格式和適用的分類任務
- [ ] 我能根據資料特徵（線性/非線性、高維文字）選擇 **SVM 的正確 kernel**
- [ ] 我能說出 **SVM 的 C 參數**越大代表什麼，並判斷過擬合/欠擬合方向
- [ ] 我能解釋 **k-NN** 為何必須加 StandardScaler，以及 k 值大小對偏差-方差的影響
- [ ] 我能說出 `cross_val_score()` 回傳的**型態**（array vs float），以及如何得到平均值
- [ ] 我能列出 sklearn Pipeline 的**正確步驟順序**（Scaler → Model）
- [ ] 我能說出 **Random Forest vs Decision Tree** 在過擬合、可解釋性、訓練速度上的差異

> 📌 本課不考：神經網路架構（CNN/LSTM/Transformer → L23203）、特徵工程細節（→ L23201）、超參數自動搜尋（GridSearchCV/Optuna 原理 → L23203 範疇）、梯度提升（GBM/XGBoost）的詳細機制（可能在 L23203 或更高層次）。本課考試數學深度停在「公式辨識與應用判斷」，不考推導或手算反向傳播。

# Research Notes: L23202 常見機器學習演算法

## Official Sources
- IPAS AI應用規劃師中級 教材 — 機器學習演算法章節
- 官方考試範圍: 演算法技術原理、演算法應用、演算法優化
- 注意: 官方教材 Recall 公式錯誤 → 官方寫 TP/(TP+FP) 實為 Precision；正確 Recall = TP/(TP+FN)

## Community Insights (exam patterns)
- 約 25% 為程式碼閱讀題 (Python/sklearn 5–10 行)
- 新題型: pipeline 步驟排列順序題
- 高頻: SVM kernel 選擇、Decision tree vs Random forest 比較
- 高頻: L1 vs L2 正則化
- 高頻: Overfitting 診斷 + 解法
- 關鍵陷阱: `cross_val_score()` 回傳陣列 NOT 平均值

## Algorithm Mechanics (Core Research)

### 1. Linear Regression (線性迴歸)
- **原理**: 找最佳超平面 ŷ = w₀ + w₁x₁ + ... + wₙxₙ，最小化 MSE
- **損失函數**: MSE = (1/n)Σ(yᵢ - ŷᵢ)²
- **關鍵超參數**: 無原生正則化；衍生版本 Ridge/Lasso/ElasticNet 有 alpha
- **適用**: 連續數值預測、線性關係、無嚴重多重共線性

### 2. Ridge Regression (L2 正則化)
- **損失**: MSE + α·Σwⱼ²
- **效果**: 壓縮所有權重趨近 0 但不歸零 → 保留所有特徵
- **適用**: 特徵皆相關、避免權重爆炸

### 3. Lasso Regression (L1 正則化)
- **損失**: MSE + α·Σ|wⱼ|
- **效果**: 部分權重精確歸零 → 自動特徵選擇 (sparse solution)
- **適用**: 高維資料、需要特徵稀疏化

### 4. ElasticNet
- **損失**: MSE + α₁·Σ|wⱼ| + α₂·Σwⱼ²  (L1 + L2 混合)
- **適用**: 相關特徵群組 + 需稀疏性

### 5. Logistic Regression (邏輯迴歸)
- **原理**: 線性組合 → Sigmoid → 機率
- **Sigmoid**: σ(z) = 1 / (1 + e⁻ᶻ)，輸出 ∈ (0,1)
- **損失**: Binary Cross-Entropy = -[y·log(ŷ) + (1-y)·log(1-ŷ)]
- **多分類**: 用 Softmax 取代 Sigmoid → 輸出各類機率和為 1
- **sklearn API**: `LogisticRegression(C=1.0, penalty='l2')`；C = 1/α，C 越小正則化越強

### 6. Decision Tree (決策樹)
- **分裂準則 — Gini Impurity**: Gini = 1 - Σpᵢ²；越低越純
- **分裂準則 — Entropy**: H = -Σpᵢ·log₂(pᵢ)；Information Gain = H(parent) - Σ(weighted H(child))
- **Gini vs Entropy**: Gini 計算快；Entropy 對不純度更敏感；考試常考「哪個計算較便宜」→ Gini
- **關鍵超參數**: max_depth, min_samples_split, min_samples_leaf, criterion
- **缺點**: 容易過擬合 (overfitting)，對訓練資料敏感

### 7. Random Forest (隨機森林)
- **原理**: Bagging + 隨機特徵子集 → 多棵決策樹投票 (分類) / 平均 (迴歸)
- **Bagging**: 每棵樹用 Bootstrap 取樣 (有放回抽樣)
- **特徵隨機性**: 每次分裂只考慮 √n_features 個特徵 (分類) 或 n_features/3 (迴歸)
- **關鍵超參數**: n_estimators, max_depth, max_features, min_samples_leaf
- **vs Decision Tree**: RF 抗過擬合、偏差略高但方差大幅降低
- **sklearn API**: `RandomForestClassifier(n_estimators=100, max_features='sqrt')`

### 8. SVM (支持向量機)
- **原理**: 找最大間隔超平面 (maximum margin hyperplane)
- **Margin**: 2/‖w‖；支持向量 (support vectors) 決定邊界
- **Kernel Trick**: 將資料映射到高維空間，使線性不可分 → 可分
  - **線性 kernel**: `kernel='linear'` → 線性可分資料、高維文字特徵
  - **RBF (Gaussian) kernel**: `kernel='rbf'` → 非線性資料，最常用預設
  - **Polynomial kernel**: `kernel='poly'` → 影像處理場景
- **關鍵超參數**: C (正則化強度，C 大→硬間隔→易過擬合), gamma (RBF 寬度)
- **考試高頻**: 給資料特徵描述 → 選 kernel；C 與 gamma 對過擬合影響

### 9. k-NN (k-最近鄰)
- **原理**: 預測時找訓練集最近 k 個鄰居，投票/平均
- **距離公式**:
  - Euclidean: d = √Σ(xᵢ - yᵢ)²
  - Manhattan: d = Σ|xᵢ - yᵢ|
- **k 值影響**: k 小 → 高方差低偏差；k 大 → 低方差高偏差
- **缺點**: 預測慢 (lazy learner)、對特徵縮放敏感 (必須標準化)
- **sklearn API**: `KNeighborsClassifier(n_neighbors=5, metric='euclidean')`

## Comparison Pairs (High-Freq Exam Items)

### L1 vs L2 正則化
| 面向 | L1 (Lasso) | L2 (Ridge) |
|------|-----------|-----------|
| 懲罰項 | Σ\|w\| | Σw² |
| 特徵選擇 | 自動 (稀疏) | 不做 |
| 解的特性 | 部分權重=0 | 所有權重縮小但非零 |
| 適用 | 高維稀疏 | 多重共線性 |

### Sigmoid vs Softmax
| | Sigmoid | Softmax |
|--|---------|---------|
| 輸出 | 單一機率 ∈(0,1) | 各類機率，總和=1 |
| 用途 | 二元分類 | 多元分類 |
| 公式 | 1/(1+e⁻ᶻ) | eᶻᵢ / Σeᶻⱼ |

### Gini vs Entropy (考試常問哪個速度快)
- Gini: 無需 log 計算 → 速度快，sklearn 預設
- Entropy: 有 log 計算 → 對純度更敏感

### Decision Tree vs Random Forest
| | Decision Tree | Random Forest |
|--|--------------|--------------|
| 過擬合 | 高 | 低 |
| 可解釋性 | 高 | 低 |
| 訓練速度 | 快 | 慢 |
| 特徵重要性 | 可取 | 平均多棵 |

### Overfitting 診斷與處理
- **症狀**: 訓練 accuracy 高、驗證 accuracy 低
- **解法**: 增加訓練資料、正則化 (L1/L2)、Dropout (深度學習)、減少模型複雜度、Cross-validation

## Code Patterns (sklearn)

```python
# Decision Tree with criterion
from sklearn.tree import DecisionTreeClassifier
dt = DecisionTreeClassifier(criterion='gini', max_depth=5)

# Random Forest
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, max_features='sqrt', random_state=42)

# SVM with RBF kernel
from sklearn.svm import SVC
svc = SVC(kernel='rbf', C=1.0, gamma='scale')

# Logistic Regression with L1
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression(penalty='l1', C=0.5, solver='liblinear')

# Ridge / Lasso
from sklearn.linear_model import Ridge, Lasso
ridge = Ridge(alpha=1.0)
lasso = Lasso(alpha=0.1)

# k-NN
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5)

# cross_val_score — 回傳陣列 NOT 平均值 (考試陷阱)
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)  # scores 是 array
print(scores.mean())  # 需自行取 .mean()

# Pipeline 順序題範例
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
pipe = Pipeline([
    ('scaler', StandardScaler()),   # 步驟1: 標準化
    ('clf', SVC(kernel='rbf'))       # 步驟2: 分類器
])
```

### 場景題解題框架
| 場景描述 | 推薦演算法 | 關鍵理由 |
|---------|-----------|---------|
| 嚴重類別不平衡 | SMOTE/過採樣 + 任意分類器 | 先處理資料再建模 |
| 高維稀疏文字資料 | Logistic Reg (L1) 或 SVM (linear) | 特徵選擇/線性邊界 |
| 非線性複雜邊界 | SVM (RBF) 或 Random Forest | Kernel/集成方法 |
| 時間序列預測 | LSTM/GRU | 序列記憶能力 |
| 需要可解釋性 | Decision Tree 或 Logistic Reg | 樹狀圖/係數可讀 |
| 訓練資料少 | k-NN | 無需訓練，保留所有資料 |

## Key Findings Summary
1. 考試 math 深度: **公式辨識與應用判斷**，不考推導
2. 最高頻三組: L1 vs L2 / Sigmoid vs Softmax / Gini vs Entropy
3. SVM kernel 選擇必考: RBF=非線性預設、linear=高維文字
4. `cross_val_score` 回傳 array 是刻意陷阱，務必記住
5. Pipeline 題考步驟順序: 前處理 → 特徵工程 → 模型

## Scope Notes
- **不在本課**: 神經網路架構 (→ L23203)、特徵工程細節 (→ L23201)
- **邊界**: 中級假設已知「什麼是監督學習」，直接進演算法內部原理
- **官方 Recall 錯誤警告**: 若考題給 Recall = TP/(TP+FP)，那是 Precision；正確為 TP/(TP+FN)；考試可能照官方教材出，需注意題目語境

# Research Notes: L23304 模型調整與優化

> 來源：基於 L23 考試情報、sklearn/PyTorch 文件、業界最佳實踐
> 語言：zh-TW
> 邊界規則：超參數搜尋、正則化、學習率調度、集成方法、模型壓縮；不涉及架構設計（L23302）或基礎訓練迴圈（L23303）

---

## 官方資源

- **114年9月樣題（45題）** — 高頻考點：過擬合/欠擬合診斷、L1 vs L2、Dropout 位置、集成模型比較
- **sklearn 文件** — GridSearchCV、RandomizedSearchCV、Pipeline、cross_val_score 用法
- **L23 學習指引** — 建模與參數調校佔 L233 整科，約 15 題；情境題比重高

---

## 考試情報（L23 2026-05 場次回報）

### 高頻考點（L233 模型調校）
- **過擬合診斷** — 訓練好測試差 → 過擬合；答案方向：正則化、Dropout、增加資料
- **L1 vs L2 判斷** — L1 → 稀疏解（特徵選擇）；L2 → 平滑縮小（Ridge）
- **Dropout** — 訓練時隨機丟棄神經元，防止 co-adaptation
- **集成比較** — 隨機森林（Bagging）vs AdaBoost/XGBoost（Boosting）差異
- **程式判讀** — cross_val_score 回傳 array；GridSearchCV.best_params_；.best_estimator_

### 情境題模式（L23304 直接相關）
| 場景 | 正確答案 |
|---|---|
| 模型訓練好但測試集表現差 | 過擬合 → 增加正則化/Dropout/早停 |
| 需要自動化搜尋最佳超參數 | GridSearchCV 或 RandomizedSearchCV |
| 高維稀疏特徵，想做特徵選擇 | L1 正則化（Lasso） |
| 多個弱學習器序列訓練 | Boosting（AdaBoost/XGBoost） |
| 多個學習器並行獨立訓練 | Bagging（隨機森林） |
| 模型太大，需部署到邊緣裝置 | 模型壓縮：量化 / 剪枝 / 知識蒸餾 |

---

## 核心知識點

### 1. 超參數搜尋方法

#### Grid Search（網格搜尋）
- **原理**：窮舉所有參數組合
- **優點**：保證找到網格內最優解
- **缺點**：維度爆炸，計算成本高
- **考試關鍵**：參數組合數 = 各維度選項數相乘（3×3×3 = 27 次訓練）
- **sklearn**：`GridSearchCV(estimator, param_grid, cv=5)`

```python
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC

param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['rbf', 'linear'],
    'gamma': ['scale', 'auto']
}
grid_search = GridSearchCV(SVC(), param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train, y_train)
print(grid_search.best_params_)    # 最佳參數組合
print(grid_search.best_score_)     # 驗證集最佳分數
```

#### Random Search（隨機搜尋）
- **原理**：在參數空間隨機取樣指定次數
- **優點**：相同預算下通常優於 Grid Search（Bergstra & Bengio, 2012）
- **適用**：高維參數空間；部分參數影響不大時
- **考試關鍵**：`n_iter` 控制搜尋次數；可用連續分布（不只是離散值）
- **sklearn**：`RandomizedSearchCV(estimator, param_distributions, n_iter=100)`

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import loguniform

param_dist = {
    'C': loguniform(1e-3, 1e3),
    'kernel': ['rbf', 'linear']
}
random_search = RandomizedSearchCV(SVC(), param_dist, n_iter=50, cv=5)
random_search.fit(X_train, y_train)
```

#### Bayesian Optimization（貝葉斯優化）
- **原理**：用代理模型（surrogate model）建構目標函數的概率分布，選下一個最有可能改善的點
- **優點**：每次迭代利用歷史結果，比隨機搜尋更有效率
- **考試重點**：概念理解層次 — 「利用歷史評估結果指導下一次搜尋」
- **工具**：`optuna`、`hyperopt`、`scikit-optimize`
- **考試陷阱**：不需要實作貝葉斯公式；只需知道它「比隨機搜尋更智能地利用歷史資訊」

```python
# Optuna 示例（概念層次）
import optuna

def objective(trial):
    C = trial.suggest_loguniform('C', 1e-3, 1e3)
    kernel = trial.suggest_categorical('kernel', ['rbf', 'linear'])
    svc = SVC(C=C, kernel=kernel)
    return cross_val_score(svc, X_train, y_train, cv=5).mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)
```

---

### 2. 正則化技術

#### L1 正則化（Lasso）
- **損失函數**：原始損失 + λ × Σ|wᵢ|（權重絕對值之和）
- **效果**：產生稀疏解，部分權重歸零 → 自動特徵選擇
- **適用**：高維稀疏特徵；懷疑大多數特徵無關時
- **sklearn**：`Lasso(alpha=0.1)`；`LogisticRegression(penalty='l1')`

#### L2 正則化（Ridge）
- **損失函數**：原始損失 + λ × Σwᵢ²（權重平方和）
- **效果**：所有權重均勻縮小，不會歸零；解更穩定
- **適用**：特徵多但都有貢獻；防止多重共線性
- **sklearn**：`Ridge(alpha=1.0)`；`LogisticRegression(penalty='l2')`（預設）

#### L1 vs L2 比較（高頻考題）
| 特性 | L1 (Lasso) | L2 (Ridge) |
|---|---|---|
| 正則項 | Σ\|wᵢ\| | Σwᵢ² |
| 解的稀疏性 | 稀疏（部分為零） | 平滑（都縮小） |
| 特徵選擇 | 是（隱式） | 否 |
| 適用場景 | 高維稀疏特徵 | 所有特徵都重要 |
| sklearn 參數 | `penalty='l1'` | `penalty='l2'`（預設） |

#### Dropout
- **原理**：訓練時以概率 p 隨機關閉神經元；測試時全部激活（縮放權重）
- **考試關鍵**：
  - Dropout 只在**訓練階段**起作用，推論時關閉
  - 常見 Dropout rate：0.2~0.5
  - 防止 co-adaptation（神經元過度依賴特定組合）
- **PyTorch 實作**：

```python
import torch.nn as nn

class MyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(128, 64)
        self.dropout = nn.Dropout(p=0.5)  # 50% dropout
        self.fc2 = nn.Linear(64, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)  # 訓練時隨機丟棄
        return self.fc2(x)

# 訓練時
model.train()   # dropout 啟用
# 推論時
model.eval()    # dropout 關閉
```

#### Early Stopping（早停）
- **原理**：監控驗證集損失，當連續 k 個 epoch 無改善時停止訓練
- **效果**：防止過擬合，節省計算時間
- **考試關鍵**：需設置 `patience`（容忍多少 epoch 無改善）
- **概念**：不是「停止迭代」，是「用驗證集表現決定最佳停止點」

```python
from sklearn.neural_network import MLPClassifier

# sklearn 內建 early_stopping
mlp = MLPClassifier(
    hidden_layer_sizes=(100, 50),
    early_stopping=True,
    validation_fraction=0.1,
    n_iter_no_change=10,  # patience = 10
    max_iter=500
)
```

---

### 3. 學習率調度（Learning Rate Scheduling）

#### 為什麼需要學習率調度
- 大學習率：快速收斂但可能跳過最優解
- 小學習率：穩定但訓練慢；後期需要精細調整

#### Step Decay（步進衰減）
- 每隔固定 epoch 數，學習率乘以衰減因子
- 例：每 30 個 epoch，lr × 0.1

```python
import torch.optim as optim
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)
```

#### Exponential Decay（指數衰減）
- 每個 epoch 後 lr = lr₀ × γᵉᵖᵒᶜʰ
- 更平滑的衰減曲線

#### Cosine Annealing（餘弦退火）
- 學習率按餘弦函數週期性下降再恢復
- 幫助模型逃出局部最優
- **考試重點**：餘弦退火允許週期性重啟（SGDR），是當前 SoTA 訓練常用策略

```python
scheduler = optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=100, eta_min=1e-6
)
```

#### Warmup（學習率預熱）
- 訓練初期從很小的學習率逐漸升高
- 防止初期大梯度破壞預訓練權重（遷移學習重要）
- **考試場景**：使用預訓練模型 fine-tuning 時，通常需要 warmup

#### 學習率調度比較表
| 策略 | 特點 | 適用場景 |
|---|---|---|
| Step Decay | 分段下降，簡單直觀 | 傳統 CNN 訓練 |
| Exponential | 連續平滑衰減 | 一般深度學習 |
| Cosine Annealing | 週期性，可逃出局部最優 | 大型模型、長訓練 |
| Warmup + Decay | 先升後降 | 預訓練模型 fine-tuning |

---

### 4. 集成方法（Ensemble Methods）

#### Bagging（Bootstrap Aggregating）
- **原理**：有放回抽樣，建立多個並行獨立的模型，投票（分類）或平均（回歸）
- **代表**：**Random Forest（隨機森林）**
  - 額外引入特徵隨機性（每次分裂僅考慮部分特徵）
  - `max_features` 控制每次分裂考慮的特徵數
- **效果**：降低 variance（過擬合風險）
- **考試關鍵**：多模型並行；每個模型見到不同的資料子集

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,    # 樹的數量
    max_features='sqrt', # 每次分裂考慮特徵數 = √總特徵數
    max_depth=10,
    random_state=42
)
rf.fit(X_train, y_train)
```

#### Boosting
- **原理**：序列訓練，每個新模型專注於前面模型犯錯的樣本
- **效果**：降低 bias（欠擬合風險）
- **代表方法**：

**AdaBoost**
- 提高被誤分類樣本的權重
- 最終輸出為弱學習器的加權投票

**XGBoost（eXtreme Gradient Boosting）**
- 梯度提升 + 正則化 + 並行計算（對特徵並行）
- 考試最重要的 Boosting 方法
- 支援 L1/L2 正則化

```python
from xgboost import XGBClassifier

xgb = XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_lambda=1.0,  # L2 正則化
    reg_alpha=0.0,   # L1 正則化
)
```

**LightGBM**
- 使用直方圖演算法，更快訓練
- Leaf-wise（最佳葉節點）vs Level-wise（XGBoost）
- 適合大資料集

#### Bagging vs Boosting 比較（高頻考題）
| 特性 | Bagging | Boosting |
|---|---|---|
| 訓練方式 | 並行獨立 | 序列依賴 |
| 樣本採樣 | 有放回（bootstrap） | 加權採樣（重視錯誤） |
| 目的 | 降低 variance | 降低 bias |
| 代表 | Random Forest | AdaBoost, XGBoost, LightGBM |
| 適用 | 模型過擬合 | 模型欠擬合（弱模型集成） |

#### Stacking（堆疊泛化）
- **原理**：用第一層多個模型的預測作為第二層（meta-learner）的輸入
- **考試重點**：第一層稱為 base learners；第二層稱為 meta-learner（通常是簡單模型如 LogReg）
- 比 Bagging/Boosting 更靈活，但計算成本高

```python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

estimators = [
    ('dt', DecisionTreeClassifier()),
    ('svc', SVC(probability=True))
]
stacking = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression()
)
```

---

### 5. 模型壓縮與剪枝

#### 應用場景
- 邊緣裝置部署（手機、IoT）
- 低延遲推論要求
- 記憶體/儲存空間限制

#### Weight Pruning（權重剪枝）
- **原理**：移除重要性低的權重（通常是絕對值小的）
- **效果**：模型稀疏化，減少參數量
- **考試考點**：知道「剪掉不重要的權重」的概念；不需實作具體剪枝演算法

#### Quantization（量化）
- **原理**：將浮點數（float32）轉為低精度整數（int8, int4）
- **效果**：模型體積縮小 4x，推論速度加快
- **考試考點**：量化 ≈ 用較少的位元數表示權重
- **PyTorch 支援**：`torch.quantization`

```python
# 動態量化示例（概念）
import torch
model_quantized = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)
```

#### Knowledge Distillation（知識蒸餾）
- **原理**：大模型（teacher）的軟標籤（soft label）訓練小模型（student）
- **效果**：小模型學習大模型的「行為模式」，不只是 hard label
- **考試考點**：
  - Teacher model → Student model
  - 軟標籤（soft label）包含類別間相關性資訊
  - Temperature parameter 控制軟化程度

| 壓縮方法 | 原理 | 主要收益 |
|---|---|---|
| 剪枝（Pruning） | 移除不重要的權重/神經元 | 減少參數量 |
| 量化（Quantization） | 降低數值精度 | 縮小模型體積、加速推論 |
| 知識蒸餾（Distillation） | 大模型教導小模型 | 小模型達到接近大模型的效能 |

---

## 考試重點整理

### 關鍵公式與概念
1. Grid Search 組合數 = 各參數選項數連乘
2. L1 → 稀疏；L2 → 平滑（不稀疏）
3. Dropout → 訓練 ON，推論 OFF
4. Early Stopping → patience 控制等待 epoch 數
5. Bagging → 降 variance；Boosting → 降 bias
6. Random Forest = Bagging + 特徵隨機性

### 程式判讀重點
- `GridSearchCV.best_params_`：取得最佳超參數
- `GridSearchCV.best_estimator_`：取得最佳模型
- `cross_val_score` 回傳 array，要 `.mean()` 才是平均
- `model.train()` vs `model.eval()`：Dropout 行為不同

### 常見陷阱
- 「Boosting 是並行的」→ 錯！Boosting 是序列的
- 「L2 可做特徵選擇」→ 錯！L1 才能產生稀疏解
- 「Dropout 在推論時也有效」→ 錯！推論時關閉
- 「GridSearch 一定比 RandomSearch 好」→ 錯！高維時 Random 更有效率

---

## Scope Notes

- 梯度下降的數學推導（Adam 更新公式）→ 超出 L23304 邊界，屬 L23303 或 L231
- 神經架構搜尋（NAS）→ 超出邊界，不在 L23304 範圍
- XGBoost 內部演算法（GBDT 梯度推導）→ 考試不要求，只需知道概念差異
- Transformer 架構選擇 → 屬 L23302（架構設計），不在 L23304 範圍

---

## Key Findings Summary

1. **超參數搜尋**：Grid（窮舉保證）、Random（高維推薦）、Bayesian（智能利用歷史）— 考試常出現選擇適當方法的情境題
2. **正則化配對**：L1=稀疏選特徵；L2=平滑不稀疏；Dropout=隨機丟棄神經元；Early Stopping=監控驗證集 — 四種方法各自適用場景是高頻考點
3. **集成方法**：Bagging（並行→降 variance）vs Boosting（序列→降 bias）是必考比較；Random Forest 和 XGBoost 是最重要的具體方法
4. **模型壓縮**：剪枝/量化/知識蒸餾的概念辨識題；邊緣部署場景下選擇適當壓縮方法
5. **學習率調度**：Warmup（fine-tuning 場景）和 Cosine Annealing（大模型訓練）是最常出現的考試場景

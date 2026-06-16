# L23304 模型調整與優化 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」L233 建模與參數調校。這份指南不會重講神經網路架構如何設計（那是 L23302 的事），也不會涵蓋基礎訓練迴圈的 forward/backward pass 機制（那是 L23303）。我們直接進入**訓練完成後如何調得更好**：超參數搜尋、正則化防止過擬合、學習率排程、集成方法、模型壓縮。

---

## Section 1：考試對應

**1a. 對應評鑑範圍**

> 對應評鑑範圍：**L233 建模與參數調校** ＋ **L23304 模型調整與優化**

**1b. How to Study This Chapter**

建議閱讀順序：

1. 先讀 **Section 2（知識樹）** — 建立全局觀，知道有哪些工具
2. 再讀 **Section 3.1（超參數搜尋）** — 考試程式判讀出現率高
3. 接著 **Section 3.2（正則化）** — 高頻配對題，L1/L2/Dropout/Early Stopping 必背
4. 然後 **Section 3.3（學習率調度）** — 概念辨識即可，不需推導公式
5. 接著 **Section 3.4（集成方法）** — Bagging vs Boosting 比較必考
6. 再看 **Section 3.5（模型壓縮）** — 概念層次，情境判斷題
7. 背 **Section 5（口訣）** → 用 **Section 6/7** 練考試判斷

**1c. 標記說明**

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

**1d. 學習目標**

讀完本章你應該能：

1. 看到超參數搜尋情境，立刻判斷 Grid Search / Random Search / Bayesian Optimization 哪個最適合
2. 說出 L1 vs L2 正則化的核心差異（稀疏 vs 平滑），並能解釋 Dropout 和 Early Stopping 的使用時機
3. 對應「模型訓練好但測試差」情境，快速選出正確的防過擬合策略
4. 解釋 Bagging 和 Boosting 的訓練方式差異，說出各自降低哪種誤差
5. 看到「模型部署到手機/邊緣裝置」情境，能判斷適合的模型壓縮方法

**1e. 考點權重**

| 考點 | 權重 | 出處 |
|---|---|---|
| L1 vs L2 正則化 | 🔥🔥🔥 | L23 考試情報、官方樣題 |
| 過擬合/欠擬合診斷 | 🔥🔥🔥 | 2026-05 場次高頻回報 |
| Dropout 原理與使用時機 | 🔥🔥🔥 | 考試情報：每場必考 |
| Bagging vs Boosting 比較 | 🔥🔥🔥 | 高頻比較題型 |
| Grid Search vs Random Search | 🔥🔥 | 程式判讀題（sklearn） |
| Early Stopping | 🔥🔥 | 情境題：「連續不改善就停止」 |
| XGBoost/LightGBM 概念 | 🔥🔥 | 集成方法常考具體工具 |
| Bayesian Optimization 概念 | 🔥 | 概念辨識層次 |
| 學習率調度策略 | 🔥 | 低頻；warmup 情境稍高 |
| 模型壓縮（剪枝/量化/蒸餾） | 🔥🔥 | 部署情境題 |

**1f. 先備知識**

- **L23303 模型訓練、評估與驗證** — 需知道 train/validation/test split 概念，和基本訓練流程
- **L23202 常見機器學習演算法** — 需知道決策樹、隨機森林的基礎
- **L23203 深度學習原理與框架** — 需知道神經網路層的基本概念、gradient descent

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [超參數搜尋比較](diagrams/hyperparameter-search-comparison.mmd) | 三種搜尋方法的流程差異，幫助學生判斷各自適用情境 |
| 2 | [正則化決策地圖](diagrams/regularization-decision-map.mmd) | 決策樹形式，看到不同問題場景時應選哪種正則化方法 |
| 3 | [學習率調度策略](diagrams/learning-rate-scheduling.mmd) | 四種調度策略的 LR 變化曲線，視覺化理解各策略特性 |
| 4 | [集成方法分類樹](diagrams/ensemble-methods-taxonomy.mmd) | Bagging/Boosting/Stacking 的分類關係與代表方法 |
| 5 | [模型優化工作流](diagrams/model-optimization-workflow.mmd) | 從訓練到評估到調參的循環優化流程 |

---

## Section 2：關鍵概念總覽圖

這張圖不是要一次背完。先抓 3 層就好：

1. **為什麼要調整** — 過擬合（訓練好、測試差）或效能不夠好
2. **調什麼** — 超參數搜尋找最佳設定；正則化控制過擬合；集成提升泛化
3. **怎麼讓模型更小** — 模型壓縮讓大模型可以部署到小裝置

讀下面的樹狀圖時，先看左側的「為什麼」脈絡，再看各分支的具體方法。

```
🎯 L23304 模型調整與優化
│
├── 🔍 超參數搜尋（Hyperparameter Search）
│   ├── Grid Search — 窮舉所有組合
│   │   ├── 優點：保證網格內最優解
│   │   └── 缺點：維度爆炸（3×3×3 = 27 次）
│   ├── Random Search — 隨機採樣
│   │   ├── 優點：高維空間更有效率
│   │   └── 考點：n_iter 控制次數
│   └── Bayesian Optimization — 利用歷史結果
│       ├── 代理模型（Surrogate Model）
│       └── 工具：Optuna、Hyperopt
│
├── 🛡️ 正則化（Regularization）
│   ├── L1（Lasso）— 產生稀疏解 🔥🔥🔥
│   │   └── 等同特徵選擇，部分 w → 0
│   ├── L2（Ridge）— 平滑縮小 🔥🔥🔥
│   │   └── 所有 w 縮小但不歸零
│   ├── Dropout — 隨機關閉神經元 🔥🔥🔥
│   │   ├── 訓練時 ON，推論時 OFF（model.eval()）
│   │   └── 陷阱：不要以為推論時也有 Dropout
│   └── Early Stopping — 監控驗證集 🔥🔥
│       └── patience 參數控制等待 epoch 數
│
├── 📈 學習率調度（LR Scheduling）
│   ├── Step Decay — 每 N epoch 降一次
│   ├── Exponential Decay — 連續衰減
│   ├── Cosine Annealing — 週期下降可逃出局部最優
│   └── Warmup — 先升後降（fine-tuning 常用）
│
├── 🏆 集成方法（Ensemble Methods）
│   ├── Bagging — 並行，降 variance 🔥🔥🔥
│   │   └── Random Forest = Bagging + 特徵隨機
│   ├── Boosting — 序列，降 bias 🔥🔥🔥
│   │   ├── AdaBoost — 樣本重加權
│   │   ├── XGBoost — GBDT + 正則化
│   │   └── LightGBM — 直方圖加速，大資料
│   └── Stacking — 多層預測
│       ├── Level-0：base learners
│       └── Level-1：meta-learner
│
└── 📦 模型壓縮（Model Compression）
    ├── Weight Pruning — 移除不重要的權重
    ├── Quantization — float32 → int8
    │   └── 考場景：邊緣裝置部署
    └── Knowledge Distillation — Teacher 教 Student
        └── 軟標籤（Soft Labels）傳遞知識
```

---

## Section 3：核心概念

### 3.1 超參數搜尋（Hyperparameter Search）🔥🔥

**先懂一句話：**
超參數搜尋就是「自動化地找出讓模型最好的設定值」，只差在怎麼找的策略不同。

**它在流程中的位置：**
資料準備 → 模型選擇（L23302）→ 訓練（L23303）→ **【超參數搜尋 / 調整】** → 評估 → 部署

---

#### Grid Search（網格搜尋）🔥🔥

**原理：** 把所有超參數的可能值列成一個「網格」，然後逐一試過所有組合。

🗣️ **白話說明：**
就像在蝦皮上搜尋商品時「把所有篩選條件都點一次」——尺寸 S/M/L × 顏色紅/藍 = 6 種組合全部試。保證找到最好的，但如果維度很多就爆炸了。

```
超參數組合矩陣：
C = [0.1, 1, 10]  →  3 種
kernel = ['rbf', 'linear']  →  2 種
gamma = ['scale', 'auto']  →  2 種

總共 3 × 2 × 2 = 12 次訓練 × cv=5 = 60 次訓練
```

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

print(grid_search.best_params_)     # {'C': 1, 'gamma': 'scale', 'kernel': 'rbf'}
print(grid_search.best_score_)      # 0.89
# ↑ best_estimator_ 是直接可用的最佳模型
```

#### Random Search（隨機搜尋）🔥🔥

**原理：** 在超參數空間中隨機採樣指定次數，而非窮舉。

🗣️ **白話說明：**
去夜市吃東西，不是每一攤都吃（Grid），而是隨機選 20 攤試試。Bergstra & Bengio 2012 的研究發現：在高維空間中，隨機採樣通常比窮舉更有效率，因為很多參數對結果影響不大。

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import loguniform
import numpy as np

param_dist = {
    'C': loguniform(1e-3, 1e3),          # 連續分布（不只是離散值）
    'kernel': ['rbf', 'linear'],
    'gamma': loguniform(1e-4, 1e-1)
}
random_search = RandomizedSearchCV(
    SVC(), param_dist,
    n_iter=50,   # 只試 50 組
    cv=5
)
random_search.fit(X_train, y_train)
print(random_search.best_params_)
```

> **考試重點：** `n_iter` 控制搜尋次數；可以使用連續分布（不只是離散清單）；高維空間比 Grid Search 更有效率。

#### Bayesian Optimization（貝葉斯優化）🔥

**原理：** 建立「代理模型（Surrogate Model）」預測哪裡最可能找到好超參數，每次搜尋都利用歷史結果更新預測。

🗣️ **白話說明：**
就像有個有經驗的前輩陪你找工作：前幾次面試後，他記住了哪類公司適合你，以後就推薦更精準的選項，而不是隨便投（Random Search）或把 104 上所有公司都投（Grid Search）。

```python
import optuna

def objective(trial):
    C = trial.suggest_float('C', 1e-3, 1e3, log=True)
    kernel = trial.suggest_categorical('kernel', ['rbf', 'linear'])
    svc = SVC(C=C, kernel=kernel)
    return cross_val_score(svc, X_train, y_train, cv=5).mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)
print(study.best_params)
```

> **考試重點：** 貝葉斯優化「利用歷史評估結果指導下一次搜尋」——這句話是考試答案的關鍵特徵。不需要知道 Gaussian Process 的數學細節。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 超參數只有 2 個，每個有 3 個選項，資源充足 | Grid Search（窮舉保證最優） | Bayesian（過度複雜） |
| 超參數有 10 個維度，資源有限，需在 100 次內找出好結果 | Random Search（高維有效率） | Grid Search（組合數爆炸） |
| 已跑了 30 次超參數評估，希望利用這些結果推薦下一個點 | Bayesian Optimization | Random Search（不利用歷史） |
| 需要快速取得最佳參數，整合到 sklearn Pipeline | GridSearchCV / RandomizedSearchCV | 手動迴圈（非慣用 pattern） |

#### Code Pattern 認識就夠

```python
# 比較三種搜尋方法 — 認識 API，不需背參數細節
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Grid Search
gs = GridSearchCV(estimator, param_grid, cv=5)
gs.fit(X_train, y_train)
gs.best_params_        # 最佳超參數 dict
gs.best_estimator_     # 直接可用的最佳模型

# Random Search
rs = RandomizedSearchCV(estimator, param_distributions, n_iter=50, cv=5)
rs.fit(X_train, y_train)

# 考試重點：best_params_ 和 best_estimator_ 的差異
```

---

### 3.2 正則化技術（Regularization）🔥🔥🔥

**先懂一句話：**
正則化就是「在訓練時對模型加上懲罰，讓它不要把訓練資料背太死」。

**它在流程中的位置：**
過擬合診斷 → **【選擇正則化方法】** → 重新訓練 → 在驗證集確認改善

---

#### 過擬合 vs 欠擬合 診斷 🔥🔥🔥

```
         欠擬合                        過擬合
（Underfitting）               （Overfitting）
訓練 acc 低                    訓練 acc 高
驗證 acc 低                    驗證 acc 明顯低於訓練
模型太簡單                     模型太複雜

解法：增加模型複雜度            解法：正則化、Dropout、
      更多特徵                         Early Stopping、增加資料
```

#### L1 正則化（Lasso Regularization）🔥🔥🔥

**原理：** 損失函數 = 原始損失 + λ × Σ|wᵢ|（懲罰權重的絕對值之和）

**效果：** 讓不重要的特徵權重直接縮為 0 → **稀疏解（Sparse Solution）**

🗣️ **白話說明：**
期末考準備時，L1 是「果斷刪科」策略——把沒把握的科目直接放棄，集中資源在重點科目。結果你的筆記裡有些科目完全空白（權重 = 0），有些很豐富。

```python
from sklearn.linear_model import Lasso, LogisticRegression

lasso = Lasso(alpha=0.1)         # alpha 控制正則化強度（λ）
lasso.fit(X_train, y_train)
print(lasso.coef_)               # 部分係數 = 0.0

# LogisticRegression 也支援 L1
lr_l1 = LogisticRegression(penalty='l1', solver='liblinear', C=1.0)
# C = 1/λ，C 越小正則化越強
```

#### L2 正則化（Ridge Regularization）🔥🔥🔥

**原理：** 損失函數 = 原始損失 + λ × Σwᵢ²（懲罰權重的平方和）

**效果：** 所有權重均勻縮小，但不會歸零 → **平滑解（Smooth Solution）**

🗣️ **白話說明：**
L2 是「均衡應付」策略——每科都唸，只是唸得比平時少一點。沒有科目完全放棄（不為 0），只是全部稍微縮水。

```python
from sklearn.linear_model import Ridge

ridge = Ridge(alpha=1.0)         # alpha = λ
ridge.fit(X_train, y_train)
print(ridge.coef_)               # 所有係數都非零，但比 OLS 小

# LogisticRegression 預設就是 L2
lr_l2 = LogisticRegression(penalty='l2', C=1.0)  # C=1.0 是預設
```

#### L1 vs L2 完整比較（必背）

| 特性 | L1 (Lasso) | L2 (Ridge) |
|---|---|---|
| 正則項 | λ × Σ\|wᵢ\| | λ × Σwᵢ² |
| 解的特性 | **稀疏**（部分為 0） | **平滑**（均勻縮小） |
| 隱式特徵選擇 | ✅ 是 | ❌ 否 |
| 適用場景 | 高維稀疏，多無關特徵 | 特徵都有貢獻，防多重共線性 |
| sklearn 預設 | 需指定 `penalty='l1'` | `penalty='l2'`（LogReg 預設） |

> 考試快判：看到「**特徵選擇、稀疏、部分權重為零**」→ L1；看到「**平滑、均勻縮小、穩定**」→ L2

#### Dropout 🔥🔥🔥

**原理：** 訓練時以概率 p 隨機關閉（設為 0）部分神經元；推論時全部啟用（但縮放權重以維持期望值不變）。

🗣️ **白話說明：**
像大學小組報告：每次開會隨機有幾個人「請假」，其他人得負責撐起整個報告。久而久之，每個人都能獨立作業，不依賴特定隊友。模型也一樣——神經元不會過度依賴彼此。

```
訓練時：
神經元 A ─── 隱藏層 ─── 輸出
             ╳ (B 被關閉)
神經元 C ─────────────────
             ╳ (D 被關閉)
神經元 E ─────────────────

推論時：
所有神經元都啟用，但權重 × (1-p) 以補償
```

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.Dropout(p=0.5),     # 50% 的神經元被隨機關閉
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.Dropout(p=0.3),
    nn.Linear(32, 10)
)

# 關鍵：訓練 vs 推論模式切換
model.train()   # Dropout 啟用（訓練時）
model.eval()    # Dropout 關閉（推論時）← 考試重點！
```

> **考試重點：** `model.eval()` 時 Dropout 自動關閉，這是最常考的陷阱點。

#### Early Stopping（早期停止）🔥🔥

**原理：** 在每個 epoch 後評估驗證集表現，如果連續 `patience` 個 epoch 都沒有改善，就停止訓練並返回最佳模型。

🗣️ **白話說明：**
就像考試前夜的複習：你設個規則「如果連讀 10 分鐘都沒記住新東西，就去睡覺」。這樣不只防止讀到腦袋麻木（過擬合），還節省了珍貴的睡眠時間。

```
訓練曲線：
                   ← 最佳驗證 loss 點
驗證 loss ↘↘↘●↗↗↗↗↗
                       patience = 5
                   如果 5 個 epoch 都沒改善 → 停止
```

```python
from sklearn.neural_network import MLPClassifier

mlp = MLPClassifier(
    hidden_layer_sizes=(100, 50),
    early_stopping=True,           # 開啟 early stopping
    validation_fraction=0.1,       # 10% 資料作驗證集
    n_iter_no_change=10,           # patience = 10 個 epoch
    max_iter=1000
)
mlp.fit(X_train, y_train)
```

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 模型訓練 acc 97%，測試 acc 75%，差距大 | 過擬合 → L1/L2/Dropout/Early Stopping | 繼續訓練更多 epoch |
| 有 500 個特徵，懷疑多數無用，想自動篩選 | L1 正則化（Lasso） | L2（不產生稀疏解） |
| 所有特徵都重要，只想防止過擬合 | L2 正則化（Ridge） | L1（會把有用特徵也歸零） |
| 深度學習模型過擬合，想防止神經元過度依賴 | Dropout | L1/L2（主要用於線性模型） |
| 不知道何時停止訓練，想自動選最佳點 | Early Stopping（patience） | 固定 epoch 數（可能已過擬合） |

#### Code Pattern 認識就夠

```python
# 正則化方法對照 — 認識 API 即可
from sklearn.linear_model import Lasso, Ridge, LogisticRegression

# L1
Lasso(alpha=0.1)                                   # alpha = λ
LogisticRegression(penalty='l1', solver='liblinear')

# L2（預設）
Ridge(alpha=1.0)
LogisticRegression(penalty='l2')                   # ← 這是預設

# Dropout (PyTorch)
nn.Dropout(p=0.5)          # 訓練時 50% 隨機關閉
model.train()              # Dropout ON
model.eval()               # Dropout OFF ← 考試必知

# Early Stopping (sklearn)
MLPClassifier(early_stopping=True, n_iter_no_change=10)
```

---

### 3.3 學習率調度（Learning Rate Scheduling）🔥

**先懂一句話：**
學習率調度就是「訓練過程中動態調整步伐大小」，讓模型先快速找方向，再精細地逼近最優解。

**它在流程中的位置：**
選擇優化器（L23303）→ 設定初始學習率 → **【學習率調度策略】** → 訓練 Loop → 評估

---

🗣️ **白話說明：**
學習率就像走路的步伐：剛開始找路時步伐大（快速找方向），快到目的地時步伐變小（避免衝過頭）。學習率調度就是這個「縮步計劃」。

#### 四種主要策略

**Step Decay（步進衰減）**
每隔固定 epoch 數，學習率乘以一個衰減因子。簡單直觀，傳統 CNN 訓練常用。

```python
# 每 30 個 epoch，lr × 0.1
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)
# epoch 0-29: lr=0.1, epoch 30-59: lr=0.01, epoch 60+: lr=0.001
```

**Exponential Decay（指數衰減）**
每個 epoch 後 lr = lr₀ × γᵉᵖᵒᶜʰ，曲線更平滑。

```python
scheduler = optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)
```

**Cosine Annealing（餘弦退火）🔥**
學習率沿餘弦曲線從最大值降到最小值，可設定週期性重啟（SGDR），幫助模型跳出局部最優。

```
LR
↑  \      /\      /
|    \    /  \    /
|     \  /    \  /
|      \/      \/
└──────────────────→ epoch
```

```python
scheduler = optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=100, eta_min=1e-6
)
```

**Warmup（學習率預熱）🔥**
訓練初期從很小的 lr 逐漸升高到目標值，再配合衰減策略。常見於 fine-tuning 預訓練模型。

🗣️ 就像早上剛起床不要馬上衝百米——先暖身（warmup），再開始正式訓練，避免因為初期梯度太大破壞已學好的權重。

#### 學習率調度比較表

| 策略 | 學習率曲線 | 適用場景 |
|---|---|---|
| Step Decay | 階梯狀下降 | 傳統 CNN、簡單訓練 |
| Exponential | 平滑指數曲線 | 一般深度學習 |
| Cosine Annealing | 餘弦波動 | 大型模型、長訓練週期 |
| Warmup + Decay | 先升後降 | 預訓練模型 fine-tuning |
| ReduceLROnPlateau | 驗證集停滯時降低 | 訓練過程不確定時 |

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 使用 BERT fine-tuning，初始訓練容易不穩定 | Warmup 學習率策略 | 固定學習率 |
| 訓練大型模型，擔心陷入局部最優 | Cosine Annealing（週期性重啟） | Step Decay（只降不升） |
| 訓練過程驗證集 loss 停滯，想自動調整 | ReduceLROnPlateau | 手動調整 |

#### Code Pattern 認識就夠

```python
import torch.optim as optim

optimizer = optim.SGD(model.parameters(), lr=0.1)

# Step Decay
StepLR_scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)

# Cosine Annealing
Cosine_scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100)

# ReduceLROnPlateau — 監控 val_loss
Plateau_scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5)

# 訓練迴圈中使用
for epoch in range(num_epochs):
    train(...)
    scheduler.step()     # 每個 epoch 後更新
```

---

### 3.4 集成方法（Ensemble Methods）🔥🔥🔥

**先懂一句話：**
集成方法就是「訓練多個模型，然後把它們的答案合起來」，原理是多數決比一個人更準確。

**它在流程中的位置：**
單模型訓練 → 評估（效果不足）→ **【集成策略選擇】** → 多模型合併 → 更佳的泛化效能

---

🗣️ **白話說明：**
期末考考古題：你一個人猜可能猜錯，但把班上 30 個人的答案拿來多數決，對的機率大很多。這就是集成的核心思想。

#### Bagging（Bootstrap Aggregating）🔥🔥🔥

**原理：**
1. 對訓練集做有放回抽樣（Bootstrap），產生多個不同的子集
2. 各自訓練獨立的模型（並行）
3. 分類：多數決投票；回歸：平均輸出

**代表：Random Forest（隨機森林）**

🗣️ 就像班上老師把 30 個學生分成 6 組，每組拿到不同的題目子集做報告，最後每組都呈現自己的答案，取多數決。

```
Bootstrap 採樣：
原始資料：[1,2,3,4,5]
子集1:   [1,1,3,4,5]  ← 有放回，可重複
子集2:   [2,3,3,4,5]
子集3:   [1,2,4,4,5]

並行訓練 → 各自建出決策樹 → 投票合併
```

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,       # 樹的數量
    max_features='sqrt',    # 每次分裂考慮 √n 個特徵（隨機性來源）
    max_depth=10,
    bootstrap=True,         # 預設 True，有放回抽樣
    random_state=42
)
rf.fit(X_train, y_train)
print(rf.feature_importances_)  # 特徵重要性
```

**效果：** 降低 variance（過擬合風險），因為多個不同模型的誤差互相抵消。

#### Boosting（提升法）🔥🔥🔥

**原理：**
1. 訓練第一個弱學習器
2. 找出它犯錯的樣本
3. 訓練第二個學習器，專注於這些錯誤樣本
4. 重複序列疊加

🗣️ 像你在練習考題：第一輪做完，把錯的題目標記出來，第二輪只反覆練那些題，直到全部搞懂。

```
序列訓練流程：
訓練資料 → 弱學習器₁ → 錯誤分析
                           ↓
               錯誤樣本加權 → 弱學習器₂ → 錯誤分析
                                             ↓
                               再加權 → 弱學習器₃
                                             ↓
                            最終輸出 = 加權投票
```

**AdaBoost（Adaptive Boosting）**
- 提高被錯誤分類樣本的權重
- 最終輸出為弱學習器的加權投票

```python
from sklearn.ensemble import AdaBoostClassifier
ada = AdaBoostClassifier(n_estimators=100, learning_rate=1.0)
ada.fit(X_train, y_train)
```

**XGBoost（eXtreme Gradient Boosting）** 🔥🔥
- 梯度提升樹（Gradient Boosting Decision Tree, GBDT）的高效實作
- 內建 L1/L2 正則化防止過擬合
- 支援並行計算（對特徵並行）

```python
from xgboost import XGBClassifier

xgb = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,   # Boosting 的步伐（縮減因子）
    max_depth=6,
    subsample=0.8,        # 樣本採樣比例
    colsample_bytree=0.8, # 特徵採樣比例
    reg_lambda=1.0,       # L2 正則化
    reg_alpha=0.0         # L1 正則化
)
```

**LightGBM** 🔥
- 使用直方圖（Histogram-based）演算法，更快訓練
- Leaf-wise 成長（比 XGBoost 的 Level-wise 更快）
- 適合大資料集（百萬筆以上）

```python
from lightgbm import LGBMClassifier
lgb = LGBMClassifier(n_estimators=300, learning_rate=0.05, num_leaves=31)
```

**Bagging vs Boosting 核心比較（必背）**

| 特性 | Bagging | Boosting |
|---|---|---|
| 訓練方式 | 並行獨立 | **序列依賴** |
| 樣本採樣 | 有放回（Bootstrap） | 加權採樣（聚焦錯誤） |
| 降低的誤差 | **Variance（過擬合風險）** | **Bias（欠擬合風險）** |
| 代表方法 | Random Forest | AdaBoost, XGBoost, LightGBM |
| 適合情境 | 複雜模型，容易過擬合 | 弱模型（淺樹），欠擬合 |
| 對雜訊敏感度 | 低（並行抵消誤差） | 高（會放大雜訊） |

> 考試快判：看到「**並行**」→ Bagging；看到「**序列、聚焦錯誤**」→ Boosting

#### Stacking（堆疊）🔥

**原理：** 先用多個異質基學習器（Level-0）生成預測，再用元學習器（Level-1/Meta-Learner）學習如何組合這些預測。

🗣️ 就像各科老師（Decision Tree、SVM、KNN）分別給出成績評估，再讓一個教務主任（LogisticRegression）根據各科評估做出最終判斷。

```python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

# Level-0：多個異質基學習器
estimators = [
    ('dt', DecisionTreeClassifier(max_depth=5)),
    ('svc', SVC(probability=True))
]

# Level-1：元學習器
stacking = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression()
)
stacking.fit(X_train, y_train)
```

> **考試重點：** Stacking 中 Level-0 的預測必須用 cross-validation 的 out-of-fold 預測（不能用訓練集，否則 data leakage）。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 決策樹過擬合，希望用多棵樹降低過擬合 | Random Forest（Bagging） | AdaBoost（Boosting，方向相反） |
| 多個弱分類器（淺樹），想序列提升為強分類器 | AdaBoost / XGBoost（Boosting） | Random Forest（並行，目的不同） |
| 大規模資料集，需要快速訓練梯度提升樹 | LightGBM | XGBoost（相對較慢） |
| 想結合 3 種完全不同演算法的優點 | Stacking | Bagging（同質模型） |
| Boosting 模型在測試集過擬合，想加正則化 | XGBoost（有內建 L1/L2） | AdaBoost（無正則化機制） |

#### Code Pattern 認識就夠

```python
from sklearn.ensemble import (
    RandomForestClassifier,      # Bagging
    AdaBoostClassifier,          # Boosting
    GradientBoostingClassifier,  # GBDT
    StackingClassifier           # Stacking
)
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

# 考試常考：各方法的主要超參數
rf = RandomForestClassifier(n_estimators=100, max_features='sqrt')
ada = AdaBoostClassifier(n_estimators=100, learning_rate=1.0)
xgb = XGBClassifier(n_estimators=300, learning_rate=0.05, reg_lambda=1.0)
lgb = LGBMClassifier(n_estimators=300, num_leaves=31)
```

---

### 3.5 模型壓縮（Model Compression）🔥🔥

**先懂一句話：**
模型壓縮就是「讓大模型變小、變快，方便部署到資源有限的裝置」。

**它在流程中的位置：**
訓練好的大模型 → **【壓縮策略選擇】** → 小型模型 → 邊緣裝置部署

---

🗣️ **白話說明：**
GPT 這種大模型要幾百 GB，不可能裝進手機。模型壓縮就是把這個「豪宅版」的模型壓縮成「套房版」，讓它在手機或 IoT 裝置上能跑。

#### Weight Pruning（權重剪枝）🔥

**原理：** 移除對輸出貢獻很小的權重（通常是絕對值接近 0 的），讓模型稀疏化。

```
原始：[0.8, 0.02, 0.7, 0.001, 0.5]
剪枝：[0.8,    0, 0.7,     0, 0.5]   ← 刪除小於 threshold 的權重
```

🗣️ 就像整理衣櫃時把從來不穿的衣服丟掉——衣櫃容量不變，但有用的衣服比例更高。

> **考試考點：** 「移除不重要的連接/權重」→ 剪枝（Pruning）；不需要知道具體演算法。

#### Quantization（量化）🔥🔥

**原理：** 將模型中的浮點數（float32 = 32 bits）轉換為低精度整數（int8 = 8 bits）或半精度（float16）。

```
float32: 1.23456789  →  int8: 123  （精度略降，體積縮 4x）
```

🗣️ 就像把 4K 影片壓縮成 1080p：品質稍微下降，但檔案大小大幅減少，手機才能順暢播放。

**兩種量化方式：**
- **Post-training Quantization（訓練後量化）**：模型訓練完再量化，簡單但精度損失稍大
- **Quantization-Aware Training（感知量化訓練）**：在訓練時模擬量化效果，精度更好

```python
import torch
import torch.quantization

# Post-training 動態量化（認識 pattern 即可）
model_quantized = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)
```

> **考試考點：** 量化 = 降低數值精度；邊緣裝置部署 → 想到量化或剪枝。

#### Knowledge Distillation（知識蒸餾）🔥🔥

**原理：**
1. 大模型（Teacher）已訓練好，它的 softmax 輸出包含類別間的相關性
2. 小模型（Student）不只學習 hard label（答案），還學習 Teacher 的 soft label（概率分布）

🗣️ 就像大師傅（Teacher）把幾十年的廚藝「言傳身教」給徒弟（Student）——不只告訴他「這道菜加多少鹽」（hard label），還傳授「為什麼這樣搭配更好吃」的深層理解（soft label）。

```
Hard label:    [0, 0, 1, 0, 0]          ← 「這是狗」的 one-hot
Teacher output:[0.01, 0.05, 0.85, 0.06, 0.03]  ← 「最像狗，也有點像貓」

Student 學習 Teacher 輸出 → 獲得豐富的類別關係資訊
```

**Temperature 參數：** 控制 softmax 輸出的「柔化程度」，Temperature 越高輸出越平滑。

| 壓縮方法 | 原理 | 主要收益 | 適用場景 |
|---|---|---|---|
| Weight Pruning | 移除小權重 | 模型稀疏化，減少參數 | 模型太大但還能用原架構 |
| Quantization | 降低數值精度（float→int） | 體積縮小 4x，速度加快 | 手機/IoT 邊緣部署 |
| Knowledge Distillation | 大模型教小模型 | 小模型達到接近大模型效能 | 需要全新訓練小模型 |

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 模型部署到手機，記憶體只有 200MB | 量化（Quantization）或剪枝 | 直接部署（不可行） |
| 公司有大模型，想訓練輕量版給終端用戶 | Knowledge Distillation | 直接縮小架構（效果差） |
| 已訓練好的 CNN，想快速縮小部署 | Post-training Quantization | 重新從頭訓練小模型 |
| 想讓小模型學到大模型的「類別間相關性」 | 知識蒸餾（Soft Label） | 直接用 hard label 訓練小模型 |

> 此小節壓縮方法三者都無需深入程式實作 — 考試以概念辨識為主。

---

## Section 4：易混淆概念比較

### 4.1 L1 vs L2 正則化 🔥🔥🔥

| 概念 | L1 (Lasso) | L2 (Ridge) |
|---|---|---|
| 正則項公式 | λ Σ\|wᵢ\| | λ Σwᵢ² |
| 解的特性 | 稀疏（部分 wᵢ = 0） | 平滑（所有 wᵢ 縮小但 ≠ 0） |
| 隱式特徵選擇 | ✅ | ❌ |
| 高維稀疏特徵 | ✅ 適用 | ❌ 不適用 |
| sklearn 指定 | `penalty='l1'` | `penalty='l2'`（預設） |
| 幾何直覺 | 菱形約束（頂點在軸上→稀疏） | 圓形約束（均勻縮小） |

> 考試快判：看到「**稀疏、特徵選擇、部分為零**」→ L1（Lasso）；看到「**平滑、均勻縮小、穩定**」→ L2（Ridge）

### 4.2 Bagging vs Boosting 🔥🔥🔥

| 概念 | Bagging | Boosting |
|---|---|---|
| 訓練順序 | 並行（獨立） | 序列（依賴前一個） |
| 核心思想 | 不同資料子集，投票平均 | 聚焦前一模型的錯誤 |
| 降低的誤差 | Variance | Bias |
| 適合情境 | 模型過擬合、高方差 | 模型欠擬合、弱分類器 |
| 代表方法 | Random Forest | AdaBoost, XGBoost, LightGBM |
| 對雜訊敏感 | 低 | 高 |

> 考試快判：看到「**並行、方差、隨機森林**」→ Bagging；看到「**序列、偏差、XGBoost**」→ Boosting

### 4.3 Grid Search vs Random Search vs Bayesian 🔥🔥

| 概念 | Grid Search | Random Search | Bayesian |
|---|---|---|---|
| 搜尋策略 | 窮舉所有組合 | 隨機採樣 N 次 | 利用歷史結果指導 |
| 計算成本 | 最高（維度爆炸） | 中等（N_iter 控制） | 中等（迭代效率高） |
| 高維空間 | ❌ 不適用 | ✅ 適用 | ✅ 最適用 |
| 適合場景 | 小超參數空間 | 一般情況推薦 | 評估成本高時 |
| sklearn | `GridSearchCV` | `RandomizedSearchCV` | Optuna / Hyperopt |

> 考試快判：看到「**窮舉**」→ Grid；看到「**隨機採樣、n_iter**」→ Random；看到「**利用歷史、代理模型**」→ Bayesian

### 4.4 剪枝 vs 量化 vs 知識蒸餾 🔥🔥

| 概念 | 剪枝（Pruning） | 量化（Quantization） | 知識蒸餾 |
|---|---|---|---|
| 操作對象 | 模型結構（移除連接） | 數值精度（float→int） | 訓練過程（soft label） |
| 是否需要重訓練 | 通常需要 fine-tune | 不一定 | 需要重新訓練 Student |
| 主要收益 | 減少參數量 | 縮小體積、加速 | 小模型達大模型效能 |
| 典型場景 | 大型神經網路瘦身 | 手機/IoT 部署 | 模型知識遷移 |

---

## Section 5：口訣 / 記憶術

### 5.1 超參數搜尋口訣
**「窮、採、歷」**
- **窮**舉 → Grid Search（保證找到網格最優）
- 隨機**採**樣 → Random Search（高維推薦）
- 利用**歷**史 → Bayesian Optimization（智能搜尋）

### 5.2 正則化口訣
**「L1 稀疏選特徵，L2 平滑不歸零；Dropout 訓練丟棄神經，推論全開不能忘」**

- L1 → **稀**疏（特**稀**→ Lasso = 稀疏）
- L2 → **平**滑（**Ridge** = 山脊 = 平緩不陡峭）
- Dropout → 訓練開，推論關（`.train()` ON, `.eval()` OFF）
- Early Stopping → 驗證不進步就停（patience = 耐心）

### 5.3 集成方法口訣
**「並行降方差（Bagging），序列降偏差（Boosting）」**

Bagging（B = Bootstrap = 並行）：
- 降低 Variance（方差）
- 代表：**R**andom Forest（R = B倒過來）

Boosting（B = 序列 = Bias）：
- 降低 Bias（偏差）
- 代表：**A**daBoost + **X**GBoost + **L**ightGBM（AXL）

### 5.4 模型壓縮口訣
**「剪（枝）量（化）蒸（餾）」**
- **剪**枝：剪掉小權重（移除不重要的連接）
- **量**化：降精度（float32 → int8，縮 4 倍）
- **蒸**餾：大教小（Teacher → Student，soft label）

---

## Section 6：考試陷阱

❌ 陷阱：Dropout 在推論（predict）時也會隨機丟棄神經元
✅ 正解：Dropout 只在訓練時啟用；呼叫 `model.eval()` 後 Dropout 自動關閉，推論時所有神經元都啟用。

---

❌ 陷阱：L2 正則化也可以做特徵選擇（把不重要的特徵權重歸零）
✅ 正解：只有 L1 正則化才能產生稀疏解（權重歸零）。L2 讓所有權重縮小但不歸零，沒有特徵選擇效果。

---

❌ 陷阱：Boosting 是並行訓練多個模型
✅ 正解：Boosting 是**序列**訓練，每個新模型依賴前一個模型的錯誤結果。Bagging 才是並行訓練。

---

❌ 陷阱：Grid Search 一定比 Random Search 找到更好的結果
✅ 正解：在高維超參數空間中，Random Search 通常更有效率，可以用相同的次數探索更廣的空間範圍。Grid Search 只在低維空間（2-3 個參數）才保證全面探索。

---

❌ 陷阱：cross_val_score() 的返回值直接就是準確率
✅ 正解：`cross_val_score()` 返回的是一個 **array**（每個 fold 的分數），需要 `.mean()` 才能得到平均分數。

---

❌ 陷阱：模型壓縮（量化/剪枝）一定會讓模型效能顯著下降
✅ 正解：適度的量化（如 FP32 → INT8）通常只損失少量精度（<1%），但體積縮小 4 倍。現代量化技術（如 Quantization-Aware Training）可以進一步降低精度損失。

---

❌ 陷阱：XGBoost 和 Random Forest 都是 Boosting 方法
✅ 正解：Random Forest 是 **Bagging** 方法（並行）；XGBoost 是 **Boosting** 方法（序列）。

---

❌ 陷阱：Early Stopping 就是設定固定的最大 epoch 數
✅ 正解：Early Stopping 是動態監控驗證集表現，當連續 `patience` 個 epoch 沒有改善時才停止，返回的是**歷史最佳模型**，不是最後一個 epoch 的模型。

---

## Section 7：情境題快速判斷

```
🔑 看到關鍵字 → 選這個答案

超參數搜尋：
- 窮舉所有組合 → Grid Search
- 高維空間、n_iter → Random Search
- 利用歷史、代理模型 → Bayesian Optimization
- best_params_ / best_estimator_ → GridSearchCV / RandomizedSearchCV

正則化：
- 稀疏解、特徵選擇、部分為零 → L1（Lasso）
- 平滑、均勻縮小、不歸零 → L2（Ridge）
- 隨機丟棄神經元 → Dropout
- 連續不改善就停止、patience → Early Stopping
- 訓練好測試差 → 過擬合（選正則化/Dropout/Early Stopping）

集成方法：
- 並行、Bootstrap 抽樣、降 Variance → Bagging
- 隨機森林、feature_importances_ → Random Forest（Bagging）
- 序列、聚焦錯誤、降 Bias → Boosting
- 梯度提升、內建正則化 → XGBoost
- 直方圖加速、大資料 → LightGBM
- 多種異質模型組合、meta-learner → Stacking

模型壓縮：
- 移除不重要的連接/權重 → Weight Pruning（剪枝）
- float32 → int8、體積縮小 4x → Quantization（量化）
- 大模型教小模型、soft label → Knowledge Distillation（知識蒸餾）
- 手機/IoT 部署 → 量化或剪枝

學習率調度：
- 先升後降、fine-tuning、預訓練模型 → Warmup
- 週期性、逃出局部最優 → Cosine Annealing
- 驗證集停滯時降低 → ReduceLROnPlateau
- 分段、每 N epoch 降一次 → Step Decay
```

---

## Section 8：結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內說出 **Grid Search、Random Search、Bayesian Optimization** 各自的搜尋策略，並說出「高維空間推薦哪個」
- [ ] 我能解釋 **L1 vs L2 正則化**的核心差異：L1→稀疏（特徵選擇），L2→平滑（均勻縮小）
- [ ] 我能看到「訓練 acc 高、測試 acc 低」時，立刻判斷是**過擬合**，並說出 3 種應對方法（正則化、Dropout、Early Stopping）
- [ ] 我能說出 **Dropout** 的核心考點：訓練時 ON，推論時 OFF（`model.eval()`）
- [ ] 我能比較 **Bagging vs Boosting**：Bagging 並行→降 Variance；Boosting 序列→降 Bias；分別說出代表方法
- [ ] 我能解釋 **Stacking** 的 Level-0（base learners）和 Level-1（meta-learner）
- [ ] 我能對應「手機部署」情境，選出正確的模型壓縮方法（剪枝/量化/知識蒸餾），並說出各自的原理
- [ ] 我能看到 `cross_val_score()` 相關程式，知道它返回 **array** 需要 `.mean()`
- [ ] 我能說出 **Warmup 學習率策略** 的使用場景（fine-tuning 預訓練模型時）

> 📌 本科不考神經網路架構設計（L23302）、不考 forward/backward pass 的數學推導（L23303）、不考梯度下降公式本身（L23103）。量化的具體實作細節、GBDT 的梯度推導、XGBoost 的完整參數調整也不在考試範圍內。

---

## 圖表索引

本課程包含以下 5 張 Mermaid 圖表，位於 `diagrams/` 資料夾：

| # | 檔名 | 說明 |
|---|---|---|
| 1 | [hyperparameter-search-comparison.mmd](diagrams/hyperparameter-search-comparison.mmd) | Grid vs Random vs Bayesian 搜尋比較流程圖 |
| 2 | [regularization-decision-map.mmd](diagrams/regularization-decision-map.mmd) | 正則化方法選擇決策地圖 |
| 3 | [learning-rate-scheduling.mmd](diagrams/learning-rate-scheduling.mmd) | 學習率調度策略時間軸圖 |
| 4 | [ensemble-methods-taxonomy.mmd](diagrams/ensemble-methods-taxonomy.mmd) | 集成方法分類樹狀圖 |
| 5 | [model-optimization-workflow.mmd](diagrams/model-optimization-workflow.mmd) | 模型優化循環工作流程圖 |

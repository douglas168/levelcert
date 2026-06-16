# L23303 模型訓練、評估與驗證 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用（L233 建模與參數調校）」。這份指南聚焦在**訓練迴圈機制、評估指標、交叉驗證策略、過/欠擬合診斷與學習曲線分析**，不會涉及超參數搜尋策略（那是 L23304 的事），也不涵蓋神經網路架構設計（那是 L23302）。我們直接進入訓練與評估的核心流程。

---

## Section 1: Exam Item Mapping

> 對應評鑑範圍：**L233 建模與參數調校** ＋ **模型訓練、泛化能力與穩定性評估**

### 1b. How to Study This Chapter

建議讀書順序：
1. **先讀 Section 3.1（訓練迴圈）** — 建立「資料怎麼變成模型」的基礎心智模型
2. **讀 Section 3.2（評估指標）** — 這是計算題核心，混淆矩陣公式要記熟
3. **讀 Section 3.3（交叉驗證）** — 掌握 k-fold vs stratified 的選擇邏輯
4. **讀 Section 3.4（過/欠擬合診斷）** — 情境題最高頻，學習曲線形態要能看圖判斷
5. **背 Section 5 口訣** — 考前快速複習
6. **用 Section 6/7 練考題判斷** — 考試前一天用來熱身

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：
1. 說出訓練迴圈的完整步驟（前向傳播 → 計算損失 → 反向傳播 → 更新權重），並解釋 epoch 與 batch size 的差異
2. 給定混淆矩陣數字，計算 Accuracy、Precision、Recall（TP/TP+FN）、F1 的正確值
3. 看到「類別不平衡」情境時，立刻判斷應使用 F1 或 AUC-ROC 而非 Accuracy
4. 解釋 k-fold 與 stratified k-fold 的差異，並說出各自的適用情境
5. 看到學習曲線圖形時，判斷是過擬合、欠擬合還是良好擬合
6. 說出 `cross_val_score()` 回傳的是 **array**（非 mean），知道需要 `.mean()` 才能得均值

### 1e. 考點權重

| 考點 | 權重 | 出處 |
|---|---|---|
| 混淆矩陣計算（Accuracy/Precision/Recall/F1） | 🔥🔥🔥 | 2026-05 考試回報，有計算題 |
| cross_val_score 回傳型態（array vs float） | 🔥🔥🔥 | 程式判讀常見陷阱 |
| 過/欠擬合情境診斷 | 🔥🔥🔥 | 情境題高頻 |
| k-fold vs stratified k-fold 選擇 | 🔥🔥 | 比較題常見 |
| AUC-ROC 適用情境 | 🔥🔥 | 評估指標選擇題 |
| 訓練迴圈（epoch, batch, gradient update） | 🔥🔥 | 概念理解題 |
| 學習曲線分析 | 🔥🔥 | 圖形判斷題 |
| 回歸指標（MAE/MSE/RMSE/R²） | 🔥 | 選擇題 |
| Leave-One-Out Cross Validation | 🔥 | 資料量少情境 |
| Pipeline 步驟排序 | 🔥🔥 | 程式步驟排序題（新題型） |

### 1f. 先備知識

- **L23201 機器學習原理與技術** — 了解監督/非監督學習基本概念
- **L23202 常見機器學習演算法** — 知道分類器/回歸器的基本輸入輸出
- **L23203 深度學習原理與框架** — 了解神經網路前向傳播概念（訓練迴圈前提）

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [訓練迴圈流程圖](diagrams/training-loop-flowchart.mmd) | 完整訓練迴圈（epoch → batch → 前向傳播 → 計算損失 → 反向傳播 → 更新權重），讓你一眼看清每次參數更新的路徑 |
| 2 | [學習曲線與擬合狀態圖](diagrams/learning-curves-overfitting.mmd) | 訓練/驗證損失曲線三種形態（過擬合/欠擬合/良好擬合），考試看圖判斷的速查圖 |
| 3 | [交叉驗證策略比較圖](diagrams/cross-validation-strategies.mmd) | k-fold、stratified k-fold、leave-one-out 三種策略的資料切分方式對比 |
| 4 | [評估指標選擇決策樹](diagrams/evaluation-metrics-guide.mmd) | 分類 vs 回歸指標選擇路徑，以及類別不平衡時的指標切換決策 |
| 5 | [混淆矩陣與衍生指標圖](diagrams/confusion-matrix-metrics.mmd) | 混淆矩陣四格（TP/FP/FN/TN）與 Accuracy/Precision/Recall/F1 公式的視覺對應 |

---

## Section 2: 關鍵概念總覽圖 (Knowledge Tree)

這張圖不是要一次背完。先抓 3 層就好：

1. **訓練迴圈**：資料如何通過模型、計算誤差、調整參數的完整機制
2. **評估指標**：訓練完的模型用什麼標準量測好壞（分類用混淆矩陣、回歸用 MAE/MSE）
3. **驗證策略**：如何確保評估結果可靠（單次切分 vs 交叉驗證），以及診斷過/欠擬合

讀下面的樹狀圖時，先看「核心流程」這條主線，再看每個分支的指標和策略細節。

```
🤖 L23303 模型訓練、評估與驗證
│
├── 🔧 訓練迴圈（Training Loop）
│   ├── Epoch（訓練輪次）
│   │   └── 整個訓練集跑一次 = 1 epoch
│   ├── Batch（批次）
│   │   ├── Batch Size：每次更新使用的樣本數
│   │   ├── Mini-batch GD（最常用）
│   │   └── 陷阱：batch size 大 → 更穩但可能欠擬合
│   ├── 前向傳播（Forward Pass）
│   ├── 計算損失（Loss）
│   │   ├── 分類：Cross-Entropy Loss
│   │   └── 回歸：MSE Loss
│   ├── 反向傳播（Backward Pass / Backpropagation）
│   └── 更新權重（Weight Update）
│       └── 使用優化器（Optimizer）如 SGD, Adam
│
├── 📊 評估指標（Evaluation Metrics）
│   ├── 分類指標（Classification Metrics）
│   │   ├── 混淆矩陣（Confusion Matrix）🔥🔥🔥
│   │   │   ├── TP / TN / FP / FN 定義
│   │   │   ├── Accuracy = (TP+TN)/(TP+TN+FP+FN)
│   │   │   ├── Precision = TP/(TP+FP)
│   │   │   ├── Recall = TP/(TP+FN)  ← 官方指引印錯，此為正解
│   │   │   └── F1 = 2×Precision×Recall/(Precision+Recall)
│   │   └── AUC-ROC（Area Under Curve）🔥🔥
│   │       └── ROC 曲線：TPR vs FPR，AUC=1 完美，AUC=0.5 隨機
│   └── 回歸指標（Regression Metrics）🔥
│       ├── MAE（Mean Absolute Error）
│       ├── MSE（Mean Squared Error）
│       ├── RMSE（Root MSE）
│       └── R²（Coefficient of Determination）
│
├── 🔁 驗證策略（Validation Strategy）
│   ├── Hold-out（單次切分）
│   │   └── train/val/test split
│   └── 交叉驗證（Cross-Validation）🔥🔥
│       ├── k-Fold CV（k=5 or 10 最常用）
│       ├── Stratified k-Fold（分類不平衡時必用）🔥🔥
│       └── Leave-One-Out（LOO，資料量極少時）🔥
│
└── 🩺 泛化能力診斷（Generalization Diagnosis）
    ├── 過擬合（Overfitting）🔥🔥🔥
    │   ├── 症狀：訓練 acc 高，驗證 acc 低
    │   └── 解法：正則化（L1/L2）、Dropout、更多資料、Early Stopping
    ├── 欠擬合（Underfitting）🔥🔥
    │   ├── 症狀：訓練 acc 低、驗證 acc 低（兩者都差）
    │   └── 解法：更複雜模型、更多特徵、減少正則化
    └── 學習曲線（Learning Curve）🔥🔥
        ├── x 軸：訓練樣本數 or epoch
        └── y 軸：loss 或 score（訓練集 vs 驗證集）
```

---

## Section 3: Core Concepts

### 3.1 訓練迴圈機制（Training Loop Mechanics）🔥🔥

**先懂一句話：**
訓練就是「讓模型看資料 → 計算它猜錯多少 → 反向算出該怎麼改 → 更新參數」這個迴圈重複到夠準為止。

**它在流程中的位置：**
資料準備 → 模型定義 → **[訓練迴圈]** → 評估 → 推論

訓練迴圈（Training Loop）是整個機器學習流程的核心引擎。理解它能幫助你看懂幾乎所有 ML 程式碼，也能回答「batch 大小怎麼影響訓練」這類情境題。

#### 核心概念

**Epoch（訓練輪次）**
整個訓練資料集被完整看過一次 = 1 個 epoch。

🗣️ 想像你在準備 IPAS 考試，把所有題庫做完一遍 = 1 epoch。做 50 個 epoch 就是把題庫刷了 50 遍。

**Batch Size（批次大小）** 🔥🔥
每次更新模型參數時，使用的訓練樣本數量。

| 類型 | Batch Size | 特性 |
|---|---|---|
| Batch GD | = 全部資料 | 最穩定，但更新慢、記憶體需求大 |
| Mini-batch GD（最常用） | 32 / 64 / 128 | 平衡速度與穩定性 |
| Stochastic GD（SGD） | = 1 | 更新最快，但噪聲大 |

**Batch Size 影響題型（考試常考）：**
- Batch size 增大（如 64 → 256）→ 每個 epoch 更新次數減少 → 收斂可能更穩但需要更多 epoch
- Batch size 太大 → 可能卡在 sharp minima（sharp minima → 泛化能力差）
- Batch size 太小（SGD）→ 梯度估計噪聲大，但有時跳出局部最優

**前向傳播（Forward Pass）**
輸入資料 → 通過所有層 → 得到預測輸出（ŷ）

**計算損失（Loss Computation）** 🔥
比較預測值 ŷ 與真實值 y 的差距：

| 任務 | 損失函數 | 公式 |
|---|---|---|
| 二元分類 | Binary Cross-Entropy | -[y log(ŷ) + (1-y) log(1-ŷ)] |
| 多類別分類 | Categorical Cross-Entropy | -Σ y_i log(ŷ_i) |
| 回歸 | Mean Squared Error (MSE) | (1/n) Σ (y - ŷ)² |

**反向傳播（Backpropagation）** 🔥
利用鏈式法則（Chain Rule）計算每個參數對損失的偏微分（梯度）。

🗣️ 就像你做錯題目後，追溯是哪個步驟導致出錯，然後有針對性地修正那個步驟。

**更新權重（Weight Update）**
沿梯度反方向更新參數，縮小損失：

```
新權重 = 舊權重 - 學習率（α）× 梯度
w = w - α × ∂L/∂w
```

常用優化器（Optimizer）：SGD、Adam、RMSprop（L23304 才深入比較）

#### 完整訓練迴圈流程

```
for epoch in range(num_epochs):           # 外層：epoches
    for batch in dataloader:              # 內層：批次
        # 1. 前向傳播
        y_pred = model(X_batch)
        # 2. 計算損失
        loss = criterion(y_pred, y_batch)
        # 3. 清空梯度
        optimizer.zero_grad()
        # 4. 反向傳播
        loss.backward()
        # 5. 更新參數
        optimizer.step()
```

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 模型訓練時 batch size 從 32 增加到 256，訓練速度如何？ | 每個 epoch 的梯度更新次數減少，單次更新更穩定 | 訓練速度一定加快（錯：取決於硬體和資料量）|
| 訓練完整資料集 3 次，共執行幾個 epoch？ | 3 個 epoch | 3 個 batch（誤解 batch 與 epoch）|
| 反向傳播的目的是什麼？ | 計算損失對每個參數的梯度，用於更新權重 | 計算預測值（那是前向傳播的事）|
| Mini-batch GD 比 Batch GD 的優勢？ | 更新頻率高、記憶體需求低、可並行化 | 精度更高（錯：Batch GD 梯度估計更精確）|

#### Code Pattern 認識就夠

```python
# 訓練迴圈 — 認識這個 pattern，不需要背完整語法
from sklearn.linear_model import SGDClassifier

# sklearn 的 partial_fit 等同 mini-batch 訓練
model = SGDClassifier(loss='hinge', max_iter=1000)
model.fit(X_train, y_train)  # 內部自動執行訓練迴圈

# 考試重點：fit() 內部包含完整訓練迴圈（前向→損失→反向→更新）
# 直接用 fit() 即可，不需要手動寫 for loop（PyTorch 才需要）
```

考試重點：sklearn 的 `fit()` 封裝了完整訓練迴圈；PyTorch 才需要手動寫 `for epoch` 迴圈。

---

### 3.2 評估指標（Evaluation Metrics）🔥🔥🔥

**先懂一句話：**
評估指標告訴你模型猜對的方式和比例，不同問題需要在意不同「猜錯的後果」。

**它在流程中的位置：**
訓練迴圈 → **[評估指標計算]** → 模型比較 → 超參數調整（L23304）

#### 分類指標：混淆矩陣（Confusion Matrix）🔥🔥🔥

混淆矩陣是所有分類指標的根源，必須能看表格就計算出所有衍生指標。

```
                  預測 Positive    預測 Negative
實際 Positive    TP（真正例）      FN（假負例）
實際 Negative    FP（假正例）      TN（真負例）
```

**記憶口訣**：
- **TP**：猜對了，真的是正例（True Positive，雙 T）
- **TN**：猜對了，真的是負例（True Negative，雙 T）
- **FP**：猜錯了，猜成正例但其實不是（False Positive — Type I Error 型一錯誤）
- **FN**：猜錯了，猜成負例但其實是正例（False Negative — Type II Error 型二錯誤）

🗣️ 就像醫院篩檢：FP 是把健康人誤判為生病（白跑一趟），FN 是把生病的人誤判為健康（最危險！）。

#### 四大分類指標公式 🔥🔥🔥

> ⚠️ **重要：官方 iPAS 學習指引將 Recall 公式印錯為 TP/(TP+FP)。這是錯誤的！**
> 正確公式：**Recall = TP/(TP+FN)**
> 考試按照正確公式出題。

| 指標 | 公式 | 白話意思 |
|---|---|---|
| **Accuracy（準確率）** | (TP+TN)/(TP+TN+FP+FN) | 整體猜對的比例 |
| **Precision（精確率）** | TP/(TP+FP) | 預測為正例中，真正是正例的比例 |
| **Recall（召回率）** | **TP/(TP+FN)** | 實際正例中，被正確預測的比例 |
| **F1 Score** | 2×P×R/(P+R) | Precision 與 Recall 的調和平均 |

**計算範例（考試會給數字讓你算）：**

```
混淆矩陣：
              預測 Pos   預測 Neg
實際 Pos      TP=80      FN=20
實際 Neg      FP=10      TN=90

Accuracy  = (80+90)/(80+90+10+20)  = 170/200 = 85%
Precision = 80/(80+10)             = 80/90   ≈ 88.9%
Recall    = 80/(80+20)             = 80/100  = 80%    ← 分母是 TP+FN！
F1        = 2×(0.889×0.80)/(0.889+0.80) ≈ 84.2%
```

#### Precision vs Recall 的取捨 🔥🔥

🗣️ 這就像在抓網路霸凌留言：

- **高 Precision**：抓到的都是真的霸凌（但可能漏掉很多）→ 適合「誤殺代價高」的場景（如廣告下架）
- **高 Recall**：盡量抓到所有霸凌（但可能誤殺正常留言）→ 適合「漏掉代價高」的場景（如癌症篩查）

| 場景 | 在乎哪個 | 原因 |
|---|---|---|
| 癌症篩查 | Recall（高） | 漏掉患者（FN）後果嚴重 |
| 垃圾郵件過濾 | Precision（高） | 把正常信標為垃圾（FP）後果嚴重 |
| 類別不平衡 | F1 | Accuracy 會被多數類欺騙 |

#### AUC-ROC（Area Under the ROC Curve）🔥🔥

**ROC 曲線**：以 False Positive Rate（FPR）為 x 軸，True Positive Rate（TPR = Recall）為 y 軸，繪製不同分類閾值下的效能曲線。

**AUC（Area Under Curve）**：
- AUC = 1.0：完美分類器
- AUC = 0.5：等同隨機猜測（對角線）
- AUC < 0.5：比隨機還差（通常是標籤反轉）

🗣️ ROC 曲線就像在問：「如果我把篩查門檻從嚴到寬調整，這個模型的表現曲線長什麼樣？」AUC 就是那條曲線下的面積，面積越大越好。

**AUC-ROC 的優勢**：
- 與分類閾值（threshold）無關，可以全面比較不同模型
- 特別適合類別不平衡場景的模型比較

#### 回歸指標 🔥

| 指標 | 公式 | 特點 |
|---|---|---|
| **MAE**（Mean Absolute Error）| (1/n) Σ |y - ŷ| | 對異常值不敏感，直觀 |
| **MSE**（Mean Squared Error）| (1/n) Σ (y - ŷ)² | 放大異常值影響，計算梯度方便 |
| **RMSE**（Root MSE）| √MSE | 與原始單位相同，更直觀 |
| **R²**（Coefficient of Determination）| 1 - SSres/SStot | 0~1（1=完美），負值表示比均值還差 |

🗣️ 如果你預測每個人的月薪，MAE 告訴你平均差多少元，R² 告訴你模型解釋了多少薪資變異。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 醫療診斷模型，最擔心漏掉真正患者 | 最大化 Recall（召回率） | 最大化 Precision（Precision 管的是誤判）|
| 垃圾郵件過濾，最擔心正常信被攔截 | 最大化 Precision | 最大化 Recall |
| 訓練集中正例只有 5%，Accuracy 達 95% 是否代表模型好？ | 不好，95% 可能只是全猜負例達成的；應看 F1 | Accuracy 高就代表模型好 |
| 比較兩個二元分類模型，不想固定在某個閾值 | 比較 AUC-ROC | 比較某固定閾值下的 Accuracy |
| 預測房價，想知道誤差是否受異常值影響大 | 比較 MAE vs RMSE（RMSE 受異常值影響大） | 直接看 R² |

#### Code Pattern 認識就夠

```python
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

# 混淆矩陣
cm = confusion_matrix(y_test, y_pred)
# 輸出：array([[TN, FP], [FN, TP]])

# 分類報告（Precision/Recall/F1 一次看）
print(classification_report(y_test, y_pred))
# ↑ 輸出 per-class 的 precision, recall, f1-score

# AUC-ROC（需要機率值，不是類別預測）
auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
```

考試重點：`classification_report()` 輸出包含每個類別的 Precision/Recall/F1；`confusion_matrix()` 輸出格式為 `[[TN, FP], [FN, TP]]`（二元分類時）。

---

### 3.3 交叉驗證策略（Cross-Validation Strategies）🔥🔥

**先懂一句話：**
交叉驗證讓你用整份資料的不同切法多次評估，比單次切分更能反映模型的真實能力。

**它在流程中的位置：**
模型定義 → 訓練迴圈 → **[交叉驗證評估]** → 穩定性報告 → 超參數調整（L23304）

#### k-Fold 交叉驗證 🔥🔥

將資料分成 k 等份（fold），輪流用 k-1 份訓練、1 份驗證，重複 k 次：

```
k=5，資料集 100 筆：

Fold 1: [驗證] [訓練] [訓練] [訓練] [訓練]
Fold 2: [訓練] [驗證] [訓練] [訓練] [訓練]
Fold 3: [訓練] [訓練] [驗證] [訓練] [訓練]
Fold 4: [訓練] [訓練] [訓練] [驗證] [訓練]
Fold 5: [訓練] [訓練] [訓練] [訓練] [驗證]

最終分數 = 5 個驗證分數的平均
```

🗣️ 就像一組 5 個人的讀書會，每次輪一個人出題考其他人，最後用 5 次測試的平均判斷大家的程度，比只考一次公平。

**k 值選擇**：
- k=5：速度與穩定性平衡（最常用）
- k=10：更穩定但計算成本高
- 資料量大時用 k=5；資料量小時考慮 k=10 或 LOO

#### Stratified k-Fold（分層 k-Fold）🔥🔥

在 k-fold 基礎上，確保每個 fold 內的**類別比例**與原始資料相同。

| 情境 | 使用哪種 |
|---|---|
| 一般分類問題 | k-Fold |
| 類別不平衡（如正例只有 10%）| **Stratified k-Fold**（必用）|
| 回歸問題 | k-Fold（無類別，無法分層）|

🗣️ 如果你的資料 10% 是正例，stratified k-fold 確保每個 fold 也大約有 10% 正例，不會出現某個 fold 完全沒有正例的極端情況。

#### Leave-One-Out Cross Validation（LOO-CV）🔥

將每一筆資料單獨當驗證集，其餘全部當訓練集，重複 n 次（n = 資料筆數）。

```
n=100 筆資料 → 執行 100 次訓練+評估
計算成本：LOO >> k-fold
```

**適用場景**：資料量極少（< 50 筆），要最大化訓練資料使用率

**LOO 的代價**：計算量 = n 次完整訓練，資料量大時不可行

#### `cross_val_score` 關鍵考點 🔥🔥🔥

```python
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = make_pipeline(StandardScaler(), LogisticRegression())
scores = cross_val_score(pipe, X, y, cv=5)

print(scores)         # array([0.85, 0.88, 0.82, 0.87, 0.84]) ← array！
print(scores.mean())  # 0.852  ← 需要 .mean() 才能得到均值
```

**⚠️ 考試陷阱**：`cross_val_score()` **回傳 array（每個 fold 的分數），不是單一均值！**
如果題目問「cross_val_score 的輸出是什麼」，答案是 array，不是 float/mean。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 資料集中正例 5%、負例 95%，選哪種交叉驗證？ | Stratified k-Fold | k-Fold（可能某些 fold 沒有正例）|
| 資料只有 30 筆，要最大化訓練資料利用率 | Leave-One-Out CV | 標準 k=5 fold |
| `cross_val_score(model, X, y, cv=5)` 的輸出是？ | shape=(5,) 的 array | 單一 float 均值 |
| 為什麼交叉驗證比單次 train/test split 更可靠？ | 減少評估結果對資料切分的依賴，降低高變異性 | 增加訓練資料量 |

#### Code Pattern 認識就夠

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold

# Stratified k-Fold 明確指定
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=skf, scoring='f1')

# 重要：cross_val_score 回傳 array
print(scores)          # [0.81, 0.83, 0.79, 0.82, 0.80]
print(scores.mean())   # 0.81  ← 要 .mean() 才得均值
print(scores.std())    # 穩定性指標
```

考試重點：`cross_val_score` 回傳 array，`.mean()` 才是均值；`StratifiedKFold` 用在不平衡分類資料。

---

### 3.4 過擬合/欠擬合診斷與學習曲線（Overfitting/Underfitting & Learning Curves）🔥🔥🔥

**先懂一句話：**
過擬合是模型「死背答案」，欠擬合是模型「根本沒學懂」，學習曲線就是診斷這兩種病的 X 光片。

**它在流程中的位置：**
模型訓練完 → **[診斷過/欠擬合]** → 對症調整 → 重訓練 → 最終評估

#### 過擬合（Overfitting）🔥🔥🔥

**症狀**：訓練集表現優異，驗證/測試集表現差
```
訓練 Accuracy：95%
驗證 Accuracy：62%
差距大 = 過擬合警報
```

🗣️ 就像有人把考古題全背起來，但考試出了新題就不會了。模型記住了訓練資料的雜訊（noise），而不是真正的規律。

**過擬合的成因**：
- 模型過於複雜（參數太多）
- 訓練資料太少
- 訓練太多 epoch（沒有早停）

**過擬合的解法**：

| 解法 | 機制 |
|---|---|
| L1 正則化（Lasso）| 添加 |w| 懲罰項，稀疏化特徵（部分權重變 0）|
| L2 正則化（Ridge）| 添加 w² 懲罰項，縮小所有權重 |
| Dropout | 訓練時隨機關閉部分神經元，防止依賴 |
| Early Stopping | 監控驗證損失，停止在最佳點 |
| 增加訓練資料 | 更多資料讓模型無法死背 |
| 資料增強（Data Augmentation）| 產生更多訓練樣本變體 |

#### 欠擬合（Underfitting）🔥🔥

**症狀**：訓練集和驗證集表現都差（兩者都低）
```
訓練 Accuracy：55%
驗證 Accuracy：53%
兩者都低 = 欠擬合
```

🗣️ 就像用直線去擬合一個彎曲的關係，不管怎麼調，這條直線就是無法正確描述資料的形狀。

**欠擬合的解法**：
- 增加模型複雜度（更多層、更多參數）
- 增加更多特徵
- 降低正則化強度
- 延長訓練時間（更多 epoch）

#### 學習曲線（Learning Curve）分析 🔥🔥

學習曲線呈現「訓練集分數」vs「驗證集分數」隨訓練進行的變化，是診斷過/欠擬合的最直觀工具。

**三種形態（考試重點）：**

```
形態 1：過擬合
損失 ↑
│ ●●●●●●●● ← 驗證損失持續偏高
│
│         ●●●●●●● ← 訓練損失低
└──────────────────→ Epoch/資料量

形態 2：欠擬合
損失 ↑
│ ●●●●●●●● ← 驗證損失高（與訓練損失接近）
│ ●●●●●●●● ← 訓練損失也高
└──────────────────→ Epoch/資料量

形態 3：良好擬合
損失 ↑
│ ▲▲ ← 驗證損失（下降後穩定）
│  ▲▲▲▲▲▲
│    ●●●●●●● ← 訓練損失（接近驗證）
└──────────────────→ Epoch/資料量
```

**學習曲線判斷口訣**：
- 訓練/驗證差距大 → **過擬合**（需要正則化、Dropout、更多資料）
- 訓練/驗證都爛 → **欠擬合**（需要更複雜模型）
- 訓練/驗證都好且接近 → **良好擬合** 🎉

#### Early Stopping（提早停止）🔥

監控驗證損失，當驗證損失開始上升（過擬合開始出現時），停止訓練：

```
Epoch  訓練損失  驗證損失
  1      0.80     0.82
  5      0.45     0.47
 10      0.20     0.25   ← 最佳點附近
 15      0.10     0.31   ← 驗證損失開始上升（過擬合）
 20      0.05     0.45   ← 嚴重過擬合，應在第10 epoch停止
```

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 模型訓練 accuracy 95%，測試 accuracy 60%，應該怎麼辦？ | 過擬合 → 加 L2 正則化 / Dropout / 更多資料 | 增加訓練 epoch（只會讓過擬合更嚴重）|
| 訓練與驗證 accuracy 都只有 55%，原因是什麼？ | 欠擬合 → 需更複雜模型或更多特徵 | 過擬合（過擬合是訓練高驗證低）|
| 學習曲線顯示訓練損失持續下降，但驗證損失在 epoch 10 後開始上升 | 從 epoch 10 附近開始過擬合，應使用 Early Stopping | 繼續訓練直到訓練損失最低 |
| 如何確認是否過擬合而非資料品質問題？ | 比較訓練集與驗證集的學習曲線差距 | 只看最終測試集 accuracy |

#### Code Pattern 認識就夠

> **注意兩種「學習曲線」的差異（考試可能兩種都出現）：**
> - **sklearn 的 `learning_curve()`**：x 軸 = 訓練資料量（樣本數），診斷資料不足 vs 過擬合
> - **深度學習的訓練曲線（Training Curve）**：x 軸 = epoch，上方 ASCII 圖示的是這種。PyTorch/Keras 框架才直接輸出 epoch-based 曲線

```python
from sklearn.model_selection import learning_curve
import numpy as np

# sklearn 學習曲線（x軸 = 訓練資料量）
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10)
)
# train_scores, val_scores 都是 shape=(10, 5) 的 array
# 取均值比較兩條線的差距，判斷過/欠擬合
train_mean = train_scores.mean(axis=1)  # ← 需要 axis=1
val_mean = val_scores.mean(axis=1)

# Early Stopping（sklearn 的 SGDClassifier 範例）
from sklearn.linear_model import SGDClassifier
model = SGDClassifier(early_stopping=True, validation_fraction=0.1, n_iter_no_change=5)
model.fit(X_train, y_train)
# ↑ early_stopping=True 自動在驗證損失不改善時停止
```

考試重點：`learning_curve()` 的 x 軸是訓練**資料量**（不是 epoch）；輸出的 `train_scores` 和 `val_scores` 是 2D array（需要 `.mean(axis=1)`）才能畫出曲線。

---

## Section 4: Comparison Tables（易混淆概念）

### 4.1 L1 vs L2 正則化 🔥🔥

| 概念 | L1 正則化（Lasso）| L2 正則化（Ridge）|
|---|---|---|
| 懲罰項 | Σ \|w\|（絕對值之和）| Σ w²（平方和）|
| 效果 | 稀疏化：部分權重歸零 | 平滑化：所有權重縮小但不為零 |
| 適用 | 特徵選擇（很多無關特徵）| 多重共線性、一般正則化 |
| 解的特性 | 稀疏解（特徵選擇效果）| 稠密解（保留所有特徵）|

> 考試快判：看到「稀疏」「特徵選擇」→ L1；看到「縮小所有權重」「多重共線性」→ L2

### 4.2 Precision vs Recall 取捨 🔥🔥

| 概念 | Precision（精確率）| Recall（召回率）|
|---|---|---|
| 公式 | TP/(TP+FP) | TP/(TP+FN) |
| 在意的錯誤類型 | 誤報（FP）高 = 精確率低 | 漏報（FN）高 = 召回率低 |
| 高值適用場景 | 垃圾郵件、廣告投放 | 癌症篩查、安全系統 |
| 代價 | 精確率高 → 可能漏掉真正例 | 召回率高 → 可能誤報假正例 |

> 考試快判：看到「漏掉危險」「假陰性代價高」→ Recall；看到「誤報煩人」「假陽性代價高」→ Precision

### 4.3 k-Fold vs Stratified k-Fold 🔥🔥

| 概念 | k-Fold | Stratified k-Fold |
|---|---|---|
| 切分方式 | 隨機等分成 k 份 | 每份保持原始類別比例 |
| 適用 | 類別平衡的分類；回歸 | 類別不平衡的分類任務 |
| 保證 | 每份大小相同 | 每份的類別比例與整體相同 |
| sklearn API | `KFold` | `StratifiedKFold` |

> 考試快判：看到「類別不平衡」→ Stratified k-Fold；看到「回歸問題」→ 一般 k-Fold

### 4.4 過擬合 vs 欠擬合診斷 🔥🔥🔥

| 概念 | 過擬合（Overfitting）| 欠擬合（Underfitting）|
|---|---|---|
| 訓練集表現 | 高（模型記住訓練資料）| 低（模型沒學到規律）|
| 驗證集表現 | 明顯低於訓練集 | 接近訓練集（但都低）|
| 學習曲線特徵 | 訓練/驗證差距大 | 訓練/驗證都在高損失區 |
| 解法方向 | 簡化模型、正則化、更多資料 | 複雜化模型、更多特徵 |

> 考試快判：看到「訓練好測試差」「差距大」→ 過擬合；看到「都差」「兩個都低」→ 欠擬合

### 4.5 MAE vs RMSE 🔥

| 概念 | MAE（平均絕對誤差）| RMSE（均方根誤差）|
|---|---|---|
| 公式 | (1/n) Σ \|y - ŷ\| | √[(1/n) Σ (y - ŷ)²] |
| 對異常值敏感度 | 低（線性懲罰）| 高（平方放大）|
| 直觀性 | 與原始單位相同，直觀 | 與原始單位相同，但受異常值放大 |
| 適用 | 資料有異常值、想穩健評估 | 希望嚴格懲罰大誤差 |

> 考試快判：看到「異常值問題」「穩健」→ MAE；看到「嚴格懲罰大誤差」→ RMSE

---

## Section 5: 口訣 / Mnemonics

### 5.1 混淆矩陣四格口訣：「真假配正負」

```
預測「正」且真的「正」 = TP（真正例）✓
預測「正」但實際「負」 = FP（假正例，誤報）✗
預測「負」但實際「正」 = FN（假負例，漏報）✗
預測「負」且真的「負」 = TN（真負例）✓

記憶法：T = 猜對了；F = 猜錯了
第二個字 = 猜測結果（P = 猜正，N = 猜負）
```

### 5.2 四大指標分母口訣：「準確看全局，精確看猜正，召回看真正」

```
Accuracy：全局觀察 → 分母 = 所有樣本（TP+TN+FP+FN）
Precision：猜了正例有多準 → 分母 = 所有預測正例（TP+FP）
Recall：真正正例找回多少 → 分母 = 所有真實正例（TP+FN）
F1：P 和 R 的調和平均 → 無分母，公式記「2PR/(P+R)」
```

### 5.3 過/欠擬合解法口訣：「過擬合加資料加限制，欠擬合加複雜加特徵」

```
過擬合（訓練高驗證低）：
  → 「加資料」：更多訓練資料 / 資料增強
  → 「加限制」：L1/L2 正則化、Dropout、Early Stopping

欠擬合（訓練驗證都低）：
  → 「加複雜」：更多層、更多參數
  → 「加特徵」：特徵工程、降低正則化
```

### 5.4 交叉驗證選擇口訣：「平衡用 k-fold，不平衡用分層，資料少用留一」

```
類別平衡 → k-Fold (k=5 or 10)
類別不平衡 → Stratified k-Fold
資料量極少 → Leave-One-Out (LOO)
時間序列 → Time Series Split（不在本課，了解即可）
```

### 5.5 AUC-ROC 記憶法：「1 完美，0.5 隨機，低於 0.5 比亂猜還差」

```
AUC = 1.0 → 完美分類器（不存在於真實世界）
AUC = 0.8-0.9 → 優良
AUC = 0.5 → 等於隨機猜測
AUC < 0.5 → 比隨機還差（檢查標籤是否反轉）
```

### 5.6 訓練迴圈步驟口訣：「前損清反更」

```
前（前向傳播）→ 損（計算損失）→ 清（清空梯度）→ 反（反向傳播）→ 更（更新權重）
```

---

## Section 6: 考試陷阱（Exam Traps）

❌ **陷阱 1**：官方 iPAS 學習指引的 Recall 公式是 TP/(TP+FP)
✅ **正解**：Recall = **TP/(TP+FN)**。Recall 衡量的是「所有真實正例中，被找回的比例」，分母一定是真實正例（TP+FN），不是預測正例。TP/(TP+FP) 是 **Precision** 的公式。

❌ **陷阱 2**：`cross_val_score()` 回傳一個均值（float）
✅ **正解**：回傳一個 **array**，長度 = cv 的折數（如 cv=5 就是 5 個元素的 array）。要取均值需要 `.mean()`，這是真實考試的程式判讀陷阱。

❌ **陷阱 3**：Accuracy 高就代表模型好
✅ **正解**：在**類別不平衡**資料集（如 95% 負例），全猜負例就能達到 95% Accuracy，但這個模型毫無用處。應改用 F1 Score 或 AUC-ROC。

❌ **陷阱 4**：過擬合的解法是增加 epoch
✅ **正解**：增加 epoch 只會讓過擬合更嚴重（模型記更多訓練資料）。應該是：正則化、Dropout、增加訓練資料、Early Stopping。

❌ **陷阱 5**：k-Fold 適合所有資料集（包含類別不平衡）
✅ **正解**：類別不平衡時應使用 **Stratified k-Fold**，確保每個 fold 的類別比例與原始資料一致。普通 k-Fold 可能產生某個 fold 完全沒有少數類的情況。

❌ **陷阱 6**：訓練集和驗證集損失都很高是過擬合
✅ **正解**：兩者都高是**欠擬合**的症狀。過擬合是訓練集損失低、驗證集損失高（兩者差距大）。

❌ **陷阱 7**：AUC-ROC 的 x 軸是 Recall（TPR）
✅ **正解**：ROC 曲線的 x 軸是 **FPR（False Positive Rate = FP/(FP+TN)）**，y 軸才是 TPR（= Recall）。這與 Precision-Recall 曲線（x 軸是 Recall，y 軸是 Precision）不同。

❌ **陷阱 8**：Batch Size 越大訓練越快
✅ **正解**：Batch Size 大 → 每次更新更穩定，但每個 epoch 的更新次數減少，且可能需要更多 epoch 收斂。在記憶體允許範圍內，更大的 batch 每次更新速度快，但整體 epoch 數可能增加。

---

## Section 7: 情境題快速判斷（Scenario Quick-Judge）

🔑 看到關鍵字 → 選這個答案

**訓練迴圈：**
- 「整個資料集看一次」→ 1 個 epoch
- 「每次更新用多少樣本」→ batch size
- 「計算誤差後回傳調整參數」→ 反向傳播（Backpropagation）
- 「前向傳播之後」→ 計算損失（Loss）
- 「梯度下降更新前」→ 清空梯度（zero_grad）

**評估指標：**
- 「漏掉患者/漏掉威脅」→ 最大化 Recall（召回率）
- 「誤報煩人/誤殺代價高」→ 最大化 Precision
- 「類別不平衡」→ F1 或 AUC-ROC，不用 Accuracy
- 「比較兩個模型，不固定閾值」→ AUC-ROC
- 「Recall 公式分母」→ TP+FN（不是 TP+FP）
- 「異常值影響」→ MAE 不敏感；RMSE 會放大

**交叉驗證：**
- 「類別不平衡 + 交叉驗證」→ Stratified k-Fold
- 「資料量很少（幾十筆）」→ LOO（Leave-One-Out）
- `cross_val_score` 回傳 → array，不是 float
- 「交叉驗證取均值」→ `.mean()` 需要手動呼叫

**過/欠擬合診斷：**
- 「訓練好測試差」→ 過擬合（Overfitting）
- 「兩者都差」→ 欠擬合（Underfitting）
- 「模型記住了訓練資料的雜訊」→ 過擬合
- 「複雜度不夠」→ 欠擬合
- 過擬合解法 → L1/L2 正則化、Dropout、更多資料
- 欠擬合解法 → 更複雜模型、更多特徵、減少正則化
- 「學習曲線訓練/驗證差距大」→ 過擬合
- 「驗證損失早期上升」→ 用 Early Stopping

**L1/L2 正則化（比較常考）：**
- 「稀疏特徵/部分權重為零」→ L1（Lasso）
- 「縮小所有權重/不讓任何權重為零」→ L2（Ridge）

---

## Section 8: 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能說出訓練迴圈的完整 5 步驟：**前向傳播 → 計算損失 → 清空梯度 → 反向傳播 → 更新權重**
- [ ] 我能解釋 **epoch vs batch size** 的差異，並說出 batch size 增大的影響
- [ ] 給定混淆矩陣數字，我能在 60 秒內算出 **Accuracy、Precision、Recall（TP/TP+FN）、F1**（注意 Recall 公式，官方指引有誤）
- [ ] 看到「類別不平衡」情境，我能立刻說出應用 **F1 或 AUC-ROC**，而非 Accuracy
- [ ] 我知道 **`cross_val_score()` 回傳 array**，不是 float，需 `.mean()` 才得均值
- [ ] 我能區分 **k-Fold vs Stratified k-Fold**，並說出各自適用場景
- [ ] 看到學習曲線，我能判斷是 **過擬合（訓練/驗證差距大）** 還是 **欠擬合（兩者都差）**
- [ ] 我能說出過擬合的至少 3 種解法：**L1/L2 正則化、Dropout、增加訓練資料**
- [ ] 我能區分 **L1（稀疏/特徵選擇）vs L2（縮小所有權重）**
- [ ] 我能解釋 **AUC-ROC** 的意義：AUC=1 完美，AUC=0.5 隨機

> 📌 本課不考：超參數搜尋方法（Grid Search、Random Search，那是 L23304）；神經網路架構設計（那是 L23302）；微積分層級的梯度推導（考試只考概念應用，不考公式推導）。

---

## 📊 圖表對應索引（Diagram References）

以下圖表以 Mermaid 格式存放於 `diagrams/` 資料夾：

| 檔案 | 說明 |
|---|---|
| [training-loop-flowchart.mmd](diagrams/training-loop-flowchart.mmd) | 訓練迴圈完整流程圖（epoch → batch → 前向→損失→反向→更新）|
| [learning-curves-overfitting.mmd](diagrams/learning-curves-overfitting.mmd) | 三種學習曲線形態（過擬合/欠擬合/良好擬合）|
| [cross-validation-strategies.mmd](diagrams/cross-validation-strategies.mmd) | k-fold、stratified k-fold、LOO 策略比較圖 |
| [evaluation-metrics-guide.mmd](diagrams/evaluation-metrics-guide.mmd) | 評估指標選擇決策樹（分類 vs 回歸；平衡 vs 不平衡）|
| [confusion-matrix-metrics.mmd](diagrams/confusion-matrix-metrics.mmd) | 混淆矩陣與 Accuracy/Precision/Recall/F1 公式對應 |

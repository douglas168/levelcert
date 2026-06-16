# Research Notes: L23303 模型訓練、評估與驗證

## Official Sources

- **iPAS AI 應用規劃師中級 學習指引**：L233 建模與參數調校範圍涵蓋模型訓練、評估與驗證
- **sklearn 官方文件**：cross_val_score, StratifiedKFold, confusion_matrix, classification_report — 最權威的 Python API 來源
- **已知官方指引錯誤（Critical）**：Recall 公式印錯為 TP/(TP+FP)，正確為 **TP/(TP+FN)**

## Community Insights (exam patterns)

根據 2026-05-17 實際考試回報：

- **有計算題**：混淆矩陣數字帶入計算 Accuracy、F1、Precision、Recall — 要能實際算出數值
- `cross_val_score()` 回傳 **array**（每 fold 的分數），不是 mean — 重要考點，曾出現在程式判讀題
- 過擬合/欠擬合診斷是高頻題型，常配合「模型訓練好但測試差 → 過擬合 → 正則化/Dropout」
- 程式步驟排序題（pipeline 步驟打亂排成正確順序）：load → preprocess → split → scale → fit → predict → evaluate
- batch size 效應題（64 → 256 會發生什麼）出現在 L232，L23303 以訓練概念為主
- StandardScaler mean=0, std=1 出現在程式判讀情境

## Current State (technology topic)

- **sklearn 1.x** 為考試主流版本；`cross_val_score`、`KFold`、`StratifiedKFold` 是考試常見 API
- **Python 3.10+** 環境假設；考試不考版本細節，只考 API 語意
- L1/L2 正則化（Regularization）：L1 → 稀疏特徵選擇；L2 → 平滑縮小所有權重（L23303 境內）
- SMOTE 不平衡處理：在 L23303 評估情境中出現（類別不平衡影響 accuracy，應改用 F1 或 AUC-ROC）

## External Documents Found

- **L23-sample-questions-11409.md**：L233 建模與參數調校相關考點如下
  - 混淆矩陣指標：Accuracy、F1、Precision、Recall — 有計算題
  - cross_val_score() 回傳 array
  - 過擬合/欠擬合診斷
  - L1 vs L2 正則化
  - SMOTE 與類別不平衡
  - StandardScaler：mean=0, std=1

## Key Findings Summary

1. **評估指標計算題必考**：混淆矩陣四格數字帶入公式，Recall = TP/(TP+FN)（官方指引有誤，按正確公式）
2. **cross_val_score 回傳型態**：array（per-fold scores），需 `.mean()` 才得均值 — 程式判讀常見陷阱
3. **過擬合/欠擬合診斷**：情境題高頻，"訓練好但測試差" → 過擬合，解法包含正則化、Dropout、更多資料
4. **交叉驗證策略**：k-fold 基本概念 + stratified k-fold（分類不平衡時使用）是常見比較題
5. **學習曲線分析**：訓練/驗證損失曲線形態對應過/欠擬合是情境判斷高頻考點

## Scope Notes

- **超出 L23303 範圍（屬 L23304）**：Hyperparameter search (Grid Search, Random Search, Bayesian Optimization) — 本題若出現調參方法，要意識到是 L23304
- **超出 L23303 範圍（屬 L23302）**：神經網路架構設計（layer 選擇、CNN/RNN 架構） — 屬 L23302
- **L1/L2 正則化**：作為過擬合解法在 L23303 提及是合理的；詳細比較屬 L23303 邊界內（非超出範圍）
- **Dropout**：作為過擬合解法在 L23303 提及即可，不需深入架構設計細節

---

## 考試重點考題分析（從 sample questions 萃取）

### 高頻考型 1：混淆矩陣計算題

```
給定混淆矩陣：
         預測 Positive  預測 Negative
實際 Pos      TP=80          FN=20
實際 Neg      FP=10          TN=90

計算 Precision = 80/(80+10) = 88.9%
計算 Recall    = 80/(80+20) = 80%      ← 官方指引印 TP/(TP+FP) 是錯的
計算 F1        = 2×(0.889×0.80)/(0.889+0.80) = 84.2%
計算 Accuracy  = (80+90)/(80+20+10+90) = 85%
```

### 高頻考型 2：cross_val_score 程式判讀

```python
scores = cross_val_score(model, X, y, cv=5)
# scores 是 array，不是 float！
# 要 scores.mean() 才是平均分
```

### 高頻考型 3：情境判斷（過/欠擬合）

| 情境 | 診斷 | 解法 |
|---|---|---|
| 訓練 acc 高，測試 acc 低 | 過擬合 | 正則化、Dropout、更多資料 |
| 訓練 acc 低，測試 acc 低 | 欠擬合 | 更複雜模型、更多特徵、減少正則化 |
| 訓練 acc ≈ 測試 acc（都低） | 欠擬合 | 加複雜度 |

### 高頻考型 4：評估指標選擇情境

| 情境 | 應選指標 | 原因 |
|---|---|---|
| 類別嚴重不平衡 | F1 或 AUC-ROC | Accuracy 會被多數類欺騙 |
| 假陽性代價高（如垃圾郵件） | Precision | 不希望把正常信標成垃圾 |
| 假陰性代價高（如癌症篩查） | Recall | 不希望漏掉真正患者 |
| 二元分類模型比較 | AUC-ROC | 與閾值無關，全面比較 |

### 高頻考型 5：交叉驗證策略選擇

| 情境 | 策略 | 理由 |
|---|---|---|
| 一般分類問題 | k-fold (k=5 or 10) | 平衡偏差-變異 |
| 類別不平衡資料集 | Stratified k-fold | 每折保持類別比例 |
| 資料量極少 | Leave-One-Out (LOO) | 最大化訓練資料使用 |
| 時間序列 | Time Series Split | 避免未來資料洩漏 |

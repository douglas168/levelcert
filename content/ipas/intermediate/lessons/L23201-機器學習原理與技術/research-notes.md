# Research Notes: L23201 機器學習原理與技術

## Official Sources

- **iPAS 114年9月樣題（45題更新版）** (https://vocus.cc/article/68cfb814fd897800012a73ab):
  - Q3 科目三：訓練誤差低但測試誤差高 → 過擬合（overfitting），答案 B — 確認此為考題模式
  - Q11 科目三：損失函數定義為「衡量模型預測與真實值之間的誤差」，答案 D — 功能性定義，無 MSE vs 交叉熵比較
  - Q15 科目二：train/test split 數量辨認（CIFAR-10 test set = 10,000 筆） — 資料維度辨認，非策略判斷
  - Bias-variance 分解、k-fold CV、MLE/MAP 未出現在已知樣題中 — 建議以理解性準備而非死背

- **官方學習指引重點彙整** (https://vocus.cc/article/68ecd196fd89780001f5c8f1):
  - 確認 L23 涵蓋：損失函數（MSE、交叉熵）、梯度下降、正則化（L1/L2）、過擬合/欠擬合、交叉驗證、機率/統計應用
  - 無明確 L23201 子題目權重比例

- **L21/L22/L23 科目選擇與備考資源** (https://aiterms.tw/ipas/L2/):
  - L23 共 50 題，90 分，及格 70 分
  - 約 25% 程式碼閱讀題（~12-13 題），以 scikit-learn 為主
  - 明確列出 `cross_val_score` 回傳 array（非單一 mean）為高頻考點
  - `make_pipeline(StandardScaler(), LogisticRegression())` 為標準 pattern 考題

- **scikit-learn 官方文件 cross-validation** (https://scikit-learn.org/stable/modules/cross_validation.html):
  - KFold, StratifiedKFold, LeaveOneOut 均在 sklearn.model_selection 模組
  - cross_val_score(estimator, X, y, cv=5) 回傳長度為 cv 的 numpy array
  - 驗證集不得用於訓練或超參數選擇 — data leakage 的核心定義

## Community Insights (exam patterns)

- **2026-05-17 場次真實考生回報** (來源：L23-sample-questions-11409.md 已整理):
  - 程式步驟排序題出現：給定打亂的 ML pipeline 步驟，排成正確順序
    - 正確順序：load → preprocess → split → scale → fit → predict → evaluate
  - 過擬合/欠擬合診斷 + 正則化（L1 vs L2）為高頻考點
  - cross_val_score() 回傳 array 而非 mean — 明確標記為重要考點
  - StandardScaler mean=0, std=1 出現在程式判讀情境
  - 損失函數選擇（回歸 vs 分類）有考題

- **高頻比較配對（官方指引錯誤警告）**:
  - L1 vs L2：L1 → 稀疏/特徵選擇；L2 → 平滑縮小所有權重
  - Recall 公式：官方指引誤寫 TP/(TP+FP)，正確為 **TP/(TP+FN)** — 考試按正確公式出題

- **程式判讀 pattern（已確認出題）**:
  - `scores = cross_val_score(pipe, X, y, cv=5)` → `scores` 是 array，需 `scores.mean()` 取均值
  - ML pipeline 組合：`make_pipeline(StandardScaler(), LogisticRegression())`

- **機率推論（L231 基礎數學，中頻）**:
  - 梯度下降與 Adam 概念有考
  - 貝氏定理基礎有考（非推導，概念判斷）
  - MLE/MAP：未在已知題目直接出現，但貝氏定理框架為前置知識

## Current State (technology topic)

- **scikit-learn 版本**: 目前 1.9.0（截至 2026-06）— L23201 範圍 API 穩定，無破壞性變更
  - `sklearn.model_selection.KFold`, `StratifiedKFold`, `cross_val_score`, `train_test_split` 均穩定
  - `GridSearchCV` 屬 L23202（超參數調校）範圍，非本題目
- **Bias-variance tradeoff** 作為理論仍適用於 MSE 回歸設定（Bias² + Variance + 不可約誤差）

## External Documents Found

- 無需外部文件：本題目為純機器學習理論，官方學習指引已涵蓋

## Key Findings Summary

- **考題以診斷判斷為主**：「訓練低、測試高 → 過擬合」類情境題高頻，非理論推導
- **cross_val_score 回傳 array 是確認考點**：務必強調 `.mean()` 需自行呼叫
- **L1 vs L2 正則化比較題必考**：L1 → 稀疏；L2 → 平滑縮小，要能在情境中選擇
- **損失函數以功能識別為主**：考「什麼情境用什麼損失函數」（回歸用 MSE；二元分類用 binary cross-entropy；多類別用 categorical cross-entropy）
- **機率推論（貝氏定理）為中頻概念題**：以識別公式與推論方向為主，不考推導；MLE/MAP 以概念區分（MLE=最大似然；MAP=加入先驗的 MLE）

## Scope Notes

- **Bias-variance 數學分解（Bias² + Variance 展開推導）**: 超出範圍 — 考試只測診斷（高 bias = 欠擬合；高 variance = 過擬合），不測 MSE 分解推導過程
- **MLE/MAP 具體求解（微分、log-likelihood 最大化計算）**: 超出範圍 — 考識別概念與 Bayesian 框架中的角色，不考計算步驟
- **LOO（Leave-One-Out）cross-validation**: 在 sklearn 文件中存在（`LeaveOneOut`），但未出現在已知考題；宜以 k-fold 為主，LOO 以知道存在即可
- **Data leakage 深度案例分析**: 考試層級以概念識別為主（「驗證集不得用於訓練」的原則），非複雜 pipeline leakage 偵測
- **Stratified k-fold vs. 普通 k-fold 的選擇邏輯**: 屬 L23201/L23202 邊界；保留基本概念（類別不平衡時用 stratified），不深入 stratify 的數學保證

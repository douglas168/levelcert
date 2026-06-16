# 圖表 2：公平性指標比較（Fairness Metrics Comparison）

> 用途：並排比較三大公平性指標的定義、公式、差異與適用情境，一眼辨認考試觸發詞。

## 三大指標總覽

```
公平性指標家族
│
├── 📊 Demographic Parity（人口統計均等 / 統計均等）
│   ├── 關注：預測正例的比例（Selection Rate）是否相同
│   ├── 公式：P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
│   ├── 差值：DPD = P(Ŷ=1|A=0) − P(Ŷ=1|A=1)，理想為 0
│   ├── 計算起點：只需各組 selection rate（不需 true label）
│   └── 適用：招募、廣告曝光等「曝光本身就是價值」的場景
│
├── 🎯 Equal Opportunity（機會均等）
│   ├── 關注：真正的正例（實際為正）中，被正確預測為正的比率是否相同
│   ├── 公式：TPR(A=0) = TPR(A=1)，其中 TPR = TP/(TP+FN)
│   ├── 差值：EOD = TPR(A=0) − TPR(A=1)，理想為 0
│   ├── 計算起點：需 TP 和 FN（需 true label）
│   └── 適用：貸款、醫療診斷（錯放候選人後果嚴重）
│
└── ⚖️ Equalized Odds（均等勝算）
    ├── 關注：TPR 且 FPR 在兩組都相同
    ├── 公式：TPR(A=0)=TPR(A=1)  AND  FPR(A=0)=FPR(A=1)
    │         FPR = FP/(FP+TN)
    ├── 比 Equal Opportunity 更嚴格（多了 FPR 限制）
    ├── 計算起點：需 TP、FN、FP、TN（完整混淆矩陣）
    └── 適用：刑事司法（假陰性和假陽性後果都嚴重）
```

## 公式速查卡

| 指標 | 公式 | 理想值 | 計算需要 |
|---|---|---|---|
| **Disparate Impact Ratio (DI)** | DI = P(Ŷ=1\|A=弱勢) ÷ P(Ŷ=1\|A=優勢) | ≥ 0.8（四五分之一法則） | Selection rate per group |
| **Demographic Parity Diff (DPD)** | DPD = P(Ŷ=1\|A=0) − P(Ŷ=1\|A=1) | 0 | Selection rate per group |
| **Equal Opportunity Diff (EOD)** | EOD = TPR(A=0) − TPR(A=1) | 0 | TP, FN per group |
| **Equalized Odds** | Both TPR equal AND FPR equal | Both diffs = 0 | TP, FN, FP, TN per group |

## 差異一眼看清

```
只看「有沒有被預測為正」？
    YES → Demographic Parity（不需要看 true label）
    NO  → 需要看 true label
         ↓
         只看「真正正例中被正確預測的比率」？
             YES → Equal Opportunity（只看 TPR）
             NO  → 也同時要求 FPR 相同？
                       YES → Equalized Odds（TPR + FPR）
```

## 考試快判

> 看到「預測正例比例相同」→ **Demographic Parity**
> 看到「真正正例中 TPR 相同」→ **Equal Opportunity**
> 看到「TPR 和 FPR 都要相同」→ **Equalized Odds**
> 看到「少數÷多數 < 0.8」→ **Four-fifths rule（DI < 0.8）**

## 三者不可能同時滿足（重要但不考計算）

在大多數現實情況，Demographic Parity、Equal Opportunity、Equalized Odds 三者無法同時達到（公平性不可能定理），除非模型完美或類別分布完全相同。考試只需知道這三者是不同的概念，不需證明不可能定理。

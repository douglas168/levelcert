# 圖表 5：演算法偏誤稽核流程（Algorithmic Bias Audit Workflow）

> 用途：展示從模型稽核到緩解決策的完整流程，幫助學生理解「何時該用哪種工具、做哪種判斷」。

## 偏誤稽核完整流程

```
開始：已有訓練好的模型 + 資料集
        │
        ▼
┌───────────────────────────────┐
│  Step 1：定義受保護屬性        │
│  (Protected Attributes)       │
│                               │
│  例：性別、種族、年齡、國籍   │
│  → 確認不能直接用於模型輸入   │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│  Step 2：依群體分割混淆矩陣   │
│  Per-Group Confusion Matrix   │
│                               │
│  計算每個群體的：             │
│  TP、FP、TN、FN               │
│  Selection Rate、TPR、FPR     │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│  Step 3：計算公平性指標       │
│  Fairness Metric Calculation  │
│                               │
│  ┌─────────────────────────┐  │
│  │ DI = 弱勢率 / 優勢率   │  │
│  │ DPD = Rate_A − Rate_B  │  │
│  │ EOD = TPR_A − TPR_B    │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  Step 4：是否超過閾值？                               │
│                                                     │
│  DI < 0.8？  OR  |DPD| > 0.1？  OR  |EOD| > 0.1？  │
└─────────────────────────────────────────────────────┘
        │                           │
       YES                          NO
        │                           │
        ▼                           ▼
┌───────────────┐            ┌───────────────┐
│ 需要去偏處理  │            │ 通過稽核      │
│ Bias Found    │            │ 定期重新稽核  │
└───────────────┘            └───────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────┐
│  Step 5：識別偏誤來源                                  │
│                                                       │
│  資料集偏誤？ → 查 Step 1–3（資料收集、標記、採樣）    │
│  模型結構偏誤？ → 查特徵工程、代理變數、回饋迴圈        │
│  評估偏誤？ → 查 benchmark 資料集是否代表目標群體       │
└───────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────┐
│  Step 6：選擇緩解策略                                  │
│                                                       │
│  能修改資料？ → Pre-processing（Reweighting/Resample） │
│  能修改訓練？ → In-processing（Adversarial Debiasing） │
│  只能改輸出？ → Post-processing（Reject-Option）       │
└───────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│  Step 7：重新稽核             │
│  Re-audit After Mitigation    │
│                               │
│  重算 DI、DPD、EOD            │
│  確認偏誤指標改善             │
│  注意：不要用準確度(Accuracy) │
│  單一指標判斷公平性           │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│  Step 8：文件記錄與持續監控  │
│  Documentation & Monitoring   │
│                               │
│  記錄：稽核時間、使用指標、    │
│  發現的偏誤、採取的緩解措施   │
│  定期重跑稽核（尤其部署後）   │
└───────────────────────────────┘
```

## 工具對應（IBM AIF360 / Fairlearn）

| 流程步驟 | AIF360 工具 | Fairlearn 工具 |
|---|---|---|
| Step 2：分群混淆矩陣 | `BinaryLabelDatasetMetric` | `MetricFrame` |
| Step 3：公平性指標計算 | `ClassificationMetric` | `demographic_parity_difference()` |
| Step 4：閾值判斷 | `.disparate_impact()` | `.overall` vs `.by_group` |
| Step 6：Pre-processing | `Reweighing`, `DisparateImpactRemover` | - |
| Step 6：In-processing | `AdversarialDebiasing`, `PrejudiceRemover` | `ExponentiatedGradient` |
| Step 6：Post-processing | `RejectOptionClassification` | `ThresholdOptimizer` |

## 考試速記

```
稽核流程口訣：
定義保護屬性 → 分群算矩陣 → 計算公平指標 → 超閾值去偏 → 選策略 → 再稽核

關鍵判斷點：
DI < 0.8 → 四五分之一法則違規 → 需要去偏
只能調整模型輸出 → Post-processing → Reject-Option Classification
```

## 常見錯誤

```
❌ 只用整體 Accuracy 判斷模型是否有偏見
✅ 需要分群（per-group）計算 DI、TPR、FPR

❌ 認為去偏後模型就「完全公平」
✅ 去偏是減少偏誤程度，不同公平性指標可能仍有取捨

❌ 只做一次稽核就永遠沒問題
✅ 模型部署後資料分布可能改變（模型漂移），需要持續監控
```

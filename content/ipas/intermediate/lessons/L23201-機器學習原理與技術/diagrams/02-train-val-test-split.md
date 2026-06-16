# 訓練/驗證/測試資料分割流程（Train / Val / Test Split Pipeline）

```mermaid
flowchart TD
    A["📦 原始資料集\n（Raw Dataset）"] --> B{{"資料分割\nData Splitting"}}

    B --> C["🟦 訓練集 Training Set\n典型比例：70–80%\n用途：fit() — 讓模型學習參數"]
    B --> D["🟨 驗證集 Validation Set\n典型比例：10–15%\n用途：調整超參數 Hyperparameters\n（選演算法、調 C / depth / lr…）"]
    B --> E["🟥 測試集 Test Set\n典型比例：10–15%\n用途：最終不偏估計\n⚠️ 只能看一次！"]

    C --> F["🤖 模型訓練\nmodel.fit(X_train, y_train)"]
    F --> G["📊 驗證集評估\nmodel.score(X_val, y_val)"]
    G --> H{{"超參數夠好了嗎？"}}
    H -- 否 --> I["🔄 調整超參數\n回到訓練集重跑"]
    I --> F
    H -- 是 --> J["🏁 測試集最終評估\nmodel.score(X_test, y_test)\n此為唯一 unbiased 估計"]

    J --> K["📝 報告最終效能\nAUC / Accuracy / F1…"]

    style C fill:#6699FF,color:#fff
    style D fill:#FFD700,color:#333
    style E fill:#FF6B6B,color:#fff
    style J fill:#FF6B6B,color:#fff,stroke:#CC0000,stroke-width:2px
```

## 各資料集角色對比

```
┌─────────────────────────────────────────────────────────────┐
│                     原始資料集（100%）                        │
├──────────────────────┬────────────┬────────────────────────-┤
│   訓練集 Train 70%   │  驗證集    │    測試集 Test 15%      │
│                      │  Val 15%   │                         │
│ • model.fit()        │ • 調超參數 │ • 最終報告用            │
│ • 模型學習參數       │ • 選模型   │ • 絕對不能用來調參      │
│ • 可以多次使用       │ • 可多次比 │ • 只看一次              │
└──────────────────────┴────────────┴─────────────────────────┘
```

## ⚠️ 資料洩漏（Data Leakage）警告

```
❌ 錯誤做法：
訓練 → 用測試集調參 → 測試集評估
（測試集「見過」超參數選擇過程 → 樂觀估計，部署後效能下降）

✅ 正確做法：
訓練 → 用驗證集調參 → 最後只看一次測試集
（測試集對模型選擇過程完全盲）
```

## 常見比例

| 資料量 | 訓練集 | 驗證集 | 測試集 | 備註 |
|---|---|---|---|---|
| 中等（1K–10K） | 70% | 15% | 15% | 標準切法 |
| 較大（>10K） | 80% | 10% | 10% | 訓練集更多 |
| 很小（<500） | — | — | — | 改用 k-fold CV |

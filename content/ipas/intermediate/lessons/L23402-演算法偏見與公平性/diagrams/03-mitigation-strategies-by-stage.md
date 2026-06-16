# 圖表 3：偏誤緩解策略（Bias Mitigation Strategies by Stage）

> 用途：展示三個緩解階段（Pre / In / Post-processing）的定位、代表方法與適用時機，快速判斷考試選項。

## ML Pipeline 中的緩解階段

```
原始資料
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  PRE-PROCESSING（訓練前 — 處理資料）                         │
│                                                             │
│  目標：讓訓練資料更公平，再送入模型                           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐  │
│  │ Reweighting      │  │ Resampling       │  │ Data     │  │
│  │ 重新加權         │  │ 重新採樣         │  │ Augment. │  │
│  │                  │  │ (Oversampling /  │  │ 資料增強 │  │
│  │ 弱勢群體樣本給   │  │  Undersampling)  │  │          │  │
│  │ 較高 weight      │  │                  │  │          │  │
│  └──────────────────┘  └──────────────────┘  └──────────┘  │
│                                                             │
│  AIF360 工具：Reweighing, DisparateImpactRemover            │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
訓練資料（加權 / 重採樣後）
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  IN-PROCESSING（訓練中 — 修改學習目標）                       │
│                                                             │
│  目標：在訓練過程中加入公平性限制或對抗機制                   │
│                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────┐ │
│  │ Adversarial Debiasing        │  │ Fairness Constraints │ │
│  │ 對抗去偏                     │  │ 公平性限制（如       │ │
│  │                              │  │ Fairlearn）          │ │
│  │ 主模型 ←→ 辨別器            │  │                      │ │
│  │ (discriminator 試圖猜測      │  │ 在損失函數中加入     │ │
│  │  protected attr)             │  │ 公平性懲罰項         │ │
│  │ 主模型學會讓 discriminator   │  │                      │ │
│  │ 猜不到（移除偏見信號）        │  │                      │ │
│  └──────────────────────────────┘  └──────────────────────┘ │
│                                                             │
│  AIF360 工具：AdversarialDebiasing, PrejudiceRemover        │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
模型輸出（分數 / 機率）
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  POST-PROCESSING（預測後 — 調整輸出）                         │
│                                                             │
│  目標：在不碰資料或模型的情況下，調整最終決策                  │
│  適用：無法重新訓練模型，或資料無法被修改時                   │
│                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────┐ │
│  │ Reject-Option Classification │  │ Calibrated Equal Odds│ │
│  │ 拒絕選項分類                 │  │ 校正均等勝算         │ │
│  │                              │  │                      │ │
│  │ 在決策邊界附近的樣本：        │  │ 重新校正每個群體的   │ │
│  │ 若屬於弱勢群體 → 預測正      │  │ 預測分數，使 TPR 和  │ │
│  │ 若屬於優勢群體 → 預測負      │  │ FPR 在群體間對齊     │ │
│  └──────────────────────────────┘  └──────────────────────┘ │
│                                                             │
│  AIF360 工具：RejectOptionClassification, CalibratedEqOdds  │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
最終決策
```

## 三階段選擇決策樹

```
我能修改訓練資料嗎？
    YES → Pre-processing（Reweighting / Resampling）
    NO  ↓
我能修改訓練過程嗎？
    YES → In-processing（Adversarial Debiasing / Fairness Constraints）
    NO  ↓
只能調整模型輸出嗎？
    YES → Post-processing（Reject-Option / Calibrated EqOdds）
```

## 考試快判表

| 考試關鍵詞 | 對應策略 | 階段 |
|---|---|---|
| 樣本加權 / sample_weight | Reweighting | Pre |
| 過採樣弱勢群體 | Resampling | Pre |
| 對抗去偏 / discriminator 猜不到 protected attr | Adversarial Debiasing | In |
| 損失函數加公平性懲罰 | Fairness Constraints | In |
| 決策邊界附近調整閾值 | Reject-Option Classification | Post |
| 只有模型分數，不能改資料 | Post-processing | Post |

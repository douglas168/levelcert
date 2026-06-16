# ML Lifecycle Compliance Flow
# L23401 數據隱私、安全與合規

```mermaid
flowchart TD
    A[📦 資料蒐集\nData Collection] --> B[📋 Datasheet for Datasets\n資料集文件化]
    B --> C[🔐 資料安全儲存\nSecure Storage\nACL + 加密 + 版本控管]
    C --> D[🏋️ 模型訓練\nModel Training]
    D --> E[📄 Model Card\n模型卡文件化\n意圖、評估、限制]
    E --> F[🚀 模型部署\nModel Deployment]
    F --> G[📝 推論稽核日誌\nInference Audit Logging\n時間戳、使用者ID、模型版本、同意狀態]
    G --> H{個資刪除/\n同意撤回?}
    H -->|是| I[🔍 資料血緣追蹤\nData Lineage Tracing\n找出受影響訓練資料]
    I --> J[🗑️ 刪除 / 機器遺忘\nDeletion / Machine Unlearning]
    J --> K[📋 更新文件與紀錄]
    H -->|否| L[✅ 持續監控\nContinuous Monitoring\n效能漂移 + 偏差稽核]
    L --> M{退役條件?}
    M -->|是| N[🔒 模型退役\nModel Retirement\n停用→封存→通知→替換]
    M -->|否| G
    K --> L

    style A fill:#e3f2fd,stroke:#1565c0
    style E fill:#fff3e0,stroke:#e65100
    style G fill:#fce4ec,stroke:#c62828
    style N fill:#efebe9,stroke:#4e342e
```

## 圖說

**ML lifecycle 合規鏈** 說明從資料蒐集到模型退役的完整治理流程。

| 階段 | L23401 治理動作 | 考試關鍵字 |
|------|----------------|-----------|
| 蒐集前 | Datasheet 文件化 | 資料來源、同意基礎 |
| 訓練後 | Model Card 文件化 | 意圖用途、評估結果、限制 |
| 部署中 | Inference Audit Log | 推論紀錄、稽核 |
| 刪除請求 | Data Lineage 追蹤 | 資料血緣、影響範圍 |
| 退役時 | 停用+封存+通知 | 模型退役程序 |

> 考試快判：題目描述「某公司部署模型後需要追蹤每次決策」→ Inference Audit Logging
> 題目描述「個資主體要求刪除，公司需找出哪些訓練資料受影響」→ Data Lineage Tracing

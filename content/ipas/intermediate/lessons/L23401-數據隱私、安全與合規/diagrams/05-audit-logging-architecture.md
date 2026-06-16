# Inference Audit Logging Architecture
# L23401 數據隱私、安全與合規

```
推論稽核日誌架構（Inference Audit Logging Architecture）
════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────┐
│                      使用者 / 應用層                           │
│  [用戶] ──────────────────────────────────────────────────   │
│          │ 請求（Request）                                     │
│          ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐     │
│  │           API Gateway / Inference Service            │     │
│  │                                                     │     │
│  │  ① 驗證同意狀態（Consent Check）                      │     │
│  │     └─ 查詢 Consent Store：此用戶/此用途是否有效同意?  │     │
│  │                                                     │     │
│  │  ② 執行推論（Model Inference）                        │     │
│  │     └─ 模型版本 v2.3.1 ← 記錄版本號                   │     │
│  │                                                     │     │
│  │  ③ 記錄稽核日誌（Audit Log Entry）                    │     │
│  │     └─ 寫入不可竄改日誌儲存（Append-Only Log Store）  │     │
│  └─────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   不可竄改日誌儲存                              │
│         （Immutable / Append-Only Audit Log Store）           │
│                                                              │
│  每筆推論紀錄包含：                                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ timestamp        │ 2026-06-16T14:32:01Z              │   │
│  │ request_id       │ uuid-abc-123                      │   │
│  │ requester_id     │ hash(user-id)  ← 雜湊保護隱私      │   │
│  │ model_name       │ credit-score-classifier            │   │
│  │ model_version    │ v2.3.1                            │   │
│  │ data_version     │ dataset-2025-Q3-v1                │   │
│  │ consent_status   │ GRANTED / WITHDRAWN               │   │
│  │ purpose          │ loan-application                  │   │
│  │ decision_id      │ hash(output)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
         │                         │
         ▼                         ▼
┌──────────────────┐    ┌──────────────────────────────────┐
│   Consent Store   │    │   資料血緣圖（Data Lineage Graph）  │
│  （同意管理）      │    │   用戶ID → 訓練批次 → 模型版本      │
│  用戶ID           │    │   ← 刪除請求查詢起點               │
│  同意目的         │    └──────────────────────────────────┘
│  同意時間         │
│  撤回狀態         │
└──────────────────┘
```

## 稽核日誌查詢場景

```sql
-- 場景 1：個資主體撤回同意 → 找出所有相關推論記錄
SELECT request_id, timestamp, model_version, decision_id
FROM inference_audit_log
WHERE requester_id = hash('user-123')        -- 預先計算的雜湊值
  AND consent_status = 'WITHDRAWN'
  AND timestamp > consent_withdrawal_date
ORDER BY timestamp;

-- 場景 2：資安稽核 → 找出指定模型版本的所有高風險決策
SELECT request_id, timestamp, requester_id
FROM inference_audit_log
WHERE model_name = 'credit-score-classifier'
  AND model_version = 'v2.3.1'
  AND purpose IN ('loan-application', 'insurance-underwriting')
ORDER BY timestamp DESC
LIMIT 1000;
```

## 為什麼需要稽核日誌？

| 使用場景 | 說明 |
|---------|------|
| 個資主體請求查閱 | 「你的 AI 對我做了哪些決策？」→ 查推論日誌 |
| 同意撤回後追蹤 | 「哪些決策是在我撤回後仍使用我的資料？」|
| 安全事故調查 | 「是否有未授權存取或異常推論行為？」|
| 法規稽核（GDPR/個資法） | 出示合規證明：每筆決策都有同意基礎紀錄 |
| 模型效能漂移 | 「過去 30 天決策分布是否偏移？」|

> 考試快判：看到「需要追蹤每次 AI 決策記錄」→ Inference Audit Logging
> 看到「要能回溯某用戶在某日期被 AI 決策的記錄」→ Audit Log + Data Lineage

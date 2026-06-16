# Diagram 02 — NC / LC 平台生態系分類

```
NC / LC 平台生態系
│
├─ 🟢 No Code（NC，無程式碼）平台
│   │
│   ├─ 應用程式建構（App Builder）
│   │   └─ Bubble ─────────────── Web App / MVP / SaaS 快速原型
│   │
│   ├─ 工作流程自動化（Workflow Automation）
│   │   ├─ Zapier ─────────────── 跨應用事件觸發串接（最廣泛使用）
│   │   └─ Make（Integromat）──── 多步驟複雜流程自動化
│   │
│   ├─ 資料庫 ／ 內部工具（Database / Internal Tools）
│   │   └─ Airtable ─────────────試算表式關聯資料庫（進階 Excel）
│   │
│   └─ 試算表轉 App（Spreadsheet-to-App）
│       └─ AppSheet（Google） ─── Google Sheets → 行動/網頁 App
│
├─ 🔵 Low Code（LC，低程式碼）平台
│   │
│   ├─ 企業應用建構（Enterprise App Builder）
│   │   ├─ Power Apps（Microsoft）── M365/Azure 深度整合，企業 CRM/審批
│   │   ├─ OutSystems ─────────────── 企業級安全性、擴展性、IT 治理
│   │   └─ Mendix（Siemens）──────── 企業級開發與部署
│   │
│   └─ 工作流程自動化（Enterprise Workflow）
│       └─ Power Automate（Microsoft）── M365 工作流，RPA 整合
│
└─ ⚠️ 不屬於 NC/LC 的相關工具（考試陷阱區）
    │
    ├─ AutoML（自動化機器學習）
    │   ├─ Google AutoML ─────── 目標產物是 ML 模型，不是 App
    │   └─ H2O.ai ──────────────目標是 ML Pipeline 自動化
    │
    └─ 資料視覺化工具（Data Visualization）
        ├─ Tableau ─────────────── 報表圖表工具（不是開發 App）
        └─ Power BI ─────────────── 商業智慧儀表板（不是應用開發）
```

> 判斷規則：NC/LC 的目標產物是**應用程式（App）**。
> - 目標是 ML 模型 → AutoML（不是 NC/LC）
> - 目標是資料圖表 → 視覺化工具（不是 NC/LC）
> - 目標是做 App / 流程自動化 → NC 或 LC

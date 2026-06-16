# GDPR Article 22 Decision Tree
# L23401 數據隱私、安全與合規

```mermaid
flowchart TD
    A[AI 系統做出決策] --> B{決策是否\n完全自動化？\nSolely Automated?}
    B -->|否：有人工參與| C[✅ Article 22 不適用\n但仍需一般 GDPR 義務\n如透明告知、資料最小化]
    B -->|是| D{決策是否具有\n法律效力或類似\n重大影響？\nLegal / Significant Effect?}
    D -->|否：低影響決策| E[✅ Article 22 不適用\n但記錄決策邏輯仍是最佳實踐]
    D -->|是| F{Art.22(2)\n例外條件是否成立?}

    F -->|例外 A| G[📋 合約必要性\nContract Necessity\n如信用評分為核貸前提]
    F -->|例外 B| H[⚖️ 成員國法律授權\nMember State Law\n如金融監管規定]
    F -->|例外 C| I[✍️ 當事人明確同意\nExplicit Consent\nGDPR Art.7 高門檻]
    F -->|否：無例外| J[🚫 Art.22(1) 禁止\n不得進行此自動化決策]

    G --> K[⚠️ Art.22(3) 保障措施仍須落實]
    H --> K
    I --> K
    K --> L[✅ 1. 告知資料主體決策存在]
    K --> M[✅ 2. 提供人工審查管道\nHuman Intervention]
    K --> N[✅ 3. 當事人得表達觀點\nExpress Point of View]
    K --> O[✅ 4. 當事人得提出異議\nContest the Decision]
    K --> P[✅ 5. 提供有意義的說明\nMeaningful Information\n非必須揭露模型完整邏輯]

    style J fill:#ffcdd2,stroke:#c62828
    style C fill:#e8f5e9,stroke:#2e7d32
    style E fill:#e8f5e9,stroke:#2e7d32
    style K fill:#fff8e1,stroke:#f57f17
```

## 關鍵考點

| 問題 | 答案 |
|------|------|
| Art. 22(1) 何時啟動？ | 完全自動化 **且** 具法律/類似重大影響 |
| Art. 22(2) 例外有哪三種？ | 合約必要、法律授權、當事人明確同意 |
| 例外成立後還需要什麼？ | Art. 22(3)：人工干預管道 + 表達觀點權 + 異議權 |
| 「說明權」是絕對的嗎？ | 否：是「有意義的資訊」，非必須揭露模型完整邏輯 |
| Art. 22 保護的是？ | 資料主體不受**純自動化決策**之重大影響的權利 |

## 常見陷阱

❌ 陷阱：只要是 AI 做的決策，Art. 22 就一定適用
✅ 正解：Art. 22 只有在「完全自動化」**且**「具法律或類似重大影響」時才啟動

❌ 陷阱：Art. 22 給予當事人查看模型完整算法的權利
✅ 正解：Art. 22(3) 要求「有意義的資訊（meaningful information about the logic involved）」，
         不等於必須揭露模型權重或完整推論邏輯（GDPR Recital 63 明確指出此點）

❌ 陷阱：取得明確同意後，資料主體就不再有任何保護
✅ 正解：Art. 22(2)(c) 例外 + Art. 22(4)：仍須提供人工干預、表達觀點、異議等保障措施

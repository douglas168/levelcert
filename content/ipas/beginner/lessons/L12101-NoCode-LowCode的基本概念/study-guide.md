# L12101 No Code / Low Code的基本概念 — Study Guide

> 對應評鑑範圍：**L121 No Code / Low Code** > **L12101 基本概念**
>
> 關鍵字：NC（No Code，無程式碼）、LC（Low Code，低程式碼）、公民開發者（Citizen Developer）、影子IT（Shadow IT）、視覺化開發（Visual Development）

> 圖表索引：
> - [diagrams/01-nc-lc-traditional-comparison.md](diagrams/01-nc-lc-traditional-comparison.md) — 三向比較（NC / LC / 傳統開發）
> - [diagrams/02-platform-ecosystem.md](diagrams/02-platform-ecosystem.md) — 平台生態系分類
> - [diagrams/03-citizen-developer-role.md](diagrams/03-citizen-developer-role.md) — 公民開發者角色與影子IT風險

---

## Section 1 · 考試導覽

### 建議閱讀順序

1. Section 3.1 → 3.2（先懂 NC 和 LC 的定義）
2. Section 3.3（NC vs LC vs 傳統開發三角比較）
3. Section 3.4（公民開發者 + 影子 IT）
4. Section 4（易混淆概念對照表）
5. Section 6（考試陷阱）
6. Section 7（情境題快速判斷）

### 出題權重估計

| 主題 | 重要性 | 預估題數 | 考題型態 |
|---|---|---|---|
| NC 定義與代表平台 | 🔥🔥🔥 | 2 題 | 定義題、平台辨認 |
| LC 定義與代表平台 | 🔥🔥🔥 | 2 題 | 定義題、平台辨認 |
| NC vs LC 比較 | 🔥🔥🔥 | 1-2 題 | 比較題、情境題 |
| 公民開發者 | 🔥🔥 | 1 題 | 定義題 |
| 影子 IT | 🔥🔥 | 1 題 | 情境/分析題 |

### 先備知識

本課無先備知識要求，是 L121 單元的起點。

### 邊界說明（初級 vs 中級）

| 範圍 | 初級（本課） | 中級 |
|---|---|---|
| 考法 | 概念定義、平台辨認、場景判斷 | 導入評估、選型方法、ROI 計算 |
| 深度 | 「是什麼」「用在哪」 | 「怎麼評估」「如何規劃」 |
| 陷阱 | AutoML ≠ NC/LC | 治理架構設計細節 |

---

## Section 2 · 關鍵概念總覽圖

```
🔧 L12101 No Code / Low Code的基本概念
│
├── 📖 核心三角
│   ├── 🟢 No Code（NC，無程式碼）
│   │   ├── 零程式碼、拖放操作（Drag-and-Drop）
│   │   ├── 目標：非技術業務人員
│   │   └── 代表：Bubble 🔥、Airtable 🔥、Zapier 🔥、AppSheet、Make
│   │
│   ├── 🔵 Low Code（LC，低程式碼）
│   │   ├── 視覺化為主 + 少量手寫程式碼
│   │   ├── 目標：開發者 / 公民開發者
│   │   └── 代表：Power Apps 🔥、OutSystems 🔥、Mendix
│   │
│   └── ⚫ 傳統開發（Traditional Development）
│       ├── 完整程式碼、需專業工程師
│       └── 彈性最高、門檻最高
│
├── 👤 公民開發者（Citizen Developer）🔥
│   ├── Gartner 定義：IT 部門外，使用組織核可工具開發應用的非專業人員
│   ├── 數量預測：將達專業工程師的 4 倍 🔥
│   └── ⚠️ 影子 IT（Shadow IT）風險：未經 IT 核可的自主部署
│
└── ⚠️ 高頻陷阱
    ├── AutoML ≠ NC/LC（目標物不同：模型 vs App）
    └── No Code ≠ 背後沒程式碼（使用者不寫 ≠ 不存在）
```

---

## Section 3 · 核心概念

#### 3.1 No Code（NC，無程式碼）

**先懂一句話：** NC（No Code，無程式碼）讓完全不懂程式的人，透過拖放就能做出能用的 App 或自動化流程。

NC（No Code，無程式碼）是一種**完全不需要撰寫程式碼**的軟體開發方式。使用者透過 UI（User Interface，使用者介面）的拖放操作與視覺化配置，就能建構可運作的應用程式。平台背後會自動將這些操作轉換為程式碼執行——**使用者看不到程式碼，不代表程式碼不存在**。

**核心特徵：**
- 零程式碼：使用者不需撰寫任何程式
- 視覺化編輯：拖放元件（Drag-and-Drop Components）、表單建構器（Form Builder）
- 目標用戶：非技術背景的業務人員
- 適用場景：原型驗證（Prototype）、小規模流程自動化、非核心業務應用

**代表平台：**

| 平台 | 核心用途 | 記憶關鍵 |
|---|---|---|
| **Bubble** | 全功能 Web App / MVP 快速開發 | 「泡泡做 App」 |
| **Airtable** | 試算表式關聯資料庫（Relational Database） | 「空氣桌 = 進階 Excel」 |
| **Zapier** | 跨應用流程自動化（Workflow Automation） | 「Zap = 串接」 |
| **AppSheet（Google）** | 試算表直接轉換為行動/網頁 App | 「Google 家的，試算表變 App」 |
| **Make**（前身 Integromat） | 多步驟視覺化流程自動化 | 「前身 Integromat」 |

🗣️ **白話說明：** 想像你在 Canva 做投影片——你不用學設計軟體，只要拖模板、改文字就出稿。NC 就是這個概念放大到「做 App」：行銷同事用 Zapier 把 Google 表單收到的回覆自動寄信給主管，完全不用寫一行程式。

**Quick check：** NC 的目標用戶是誰？ → 非技術背景的業務人員（不是工程師）

---

#### 3.2 Low Code（LC，低程式碼）

**先懂一句話：** LC（Low Code，低程式碼）讓有一點技術背景的人，在視覺化介面的基礎上，偶爾寫幾行程式碼處理複雜邏輯，做出企業級系統。

LC（Low Code，低程式碼）同樣以視覺化開發（Visual Development）為主，但允許開發者在需要時**加入少量手寫程式碼**來處理複雜邏輯、客製化功能或系統整合（例如串接 API（Application Programming Interface，應用程式介面））。

**核心特徵：**
- 少量程式碼：視覺化為主，可選擇加入程式碼
- 目標用戶：具備基礎技術知識的開發者或公民開發者
- 適用場景：中型企業應用、需整合 API 的場景、企業級系統

**代表平台：**

| 平台 | 核心用途 | 記憶關鍵 |
|---|---|---|
| **Power Apps（Microsoft）** | 企業應用開發，深度整合 Microsoft 365 / Azure | 「微軟 Power 家族」 |
| **OutSystems** | 企業級應用，強調安全性（Security）與擴展性（Scalability） | 「Out = 外部企業系統」 |
| **Mendix（Siemens）** | 企業級應用開發與部署 | 「西門子 Mendix」 |

🗣️ **白話說明：** 如果 NC 像是用 Canva 套模板做海報（完全不用懂設計），LC 就像用 WordPress 架部落格——大部分靠外掛搞定，但遇到特殊需求你可以自己改一點 CSS。多了一點技術操作，換來更大的彈性。台灣企業用 Power Apps 串接 Microsoft 365 的報表系統，就是 LC 的典型應用。

**Quick check：** LC 與 NC 最大的差異是什麼？ → LC 允許加入少量程式碼；NC 完全不需要程式碼。

---

#### 3.3 NC / LC / 傳統開發 三角比較 🔥🔥

這是整課最常考的重點。記住五個維度：

| 維度 | No Code（NC） | Low Code（LC） | 傳統開發 |
|---|---|---|---|
| **技術門檻** | 低（無需程式能力） | 中（需基礎技術知識） | 高（需專業工程師） |
| **開發速度** | 最快 | 快 | 最慢 |
| **彈性（Flexibility）** | 低（受限平台功能） | 中（可寫程式擴展） | 最高（完全自由） |
| **維護成本** | 最低（平台負責底層） | 低至中 | 最高（需自行維護） |
| **客製化程度** | 低 | 中至高 | 最高 |
| **適用場景** | 原型驗證、流程自動化 | 中型企業應用、API 整合 | 核心系統、高安全需求 |

**速記口訣：** 「NC 最快最省，傳統最彈最貴，LC 居中平衡」

> 詳見 [diagrams/01-nc-lc-traditional-comparison.md](diagrams/01-nc-lc-traditional-comparison.md)

---

#### 3.4 公民開發者（Citizen Developer）🔥

**先懂一句話：** 公民開發者（Citizen Developer）是不在 IT 部門的員工，用公司核可的 NC/LC 工具自己做工具、不靠工程師。

Gartner 提出的概念：**在正式 IT 部門以外，使用組織核可（Sanctioned）的 NC/LC 工具來建構應用程式的非專業開發人員**。

**重點數據（考試愛考）：**
- Gartner 預測：公民開發者數量將達到專業工程師的 **4 倍** 🔥
- 2026 年預測：**80%** 的低程式碼工具用戶來自 IT 部門以外

**兩個關鍵限制：**
1. 「組織**核可**」——必須使用 IT 批准的工具，不是亂用
2. 「IT 部門**以外**」——業務單位，不是 IT 人員轉行

🗣️ **白話說明：** 行銷組長用公司批准的 Power Apps 做了一個客戶追蹤 App，自己的需求自己解決，不用排 IT 的工單——這就是公民開發者。她不是資工系出身，但她用核可的工具做出了有用的東西。

> 詳見 [diagrams/03-citizen-developer-role.md](diagrams/03-citizen-developer-role.md)

---

#### 3.5 影子 IT（Shadow IT）⚠️

**先懂一句話：** 影子 IT（Shadow IT）是員工**未經 IT 審核**就自行部署工具或應用，帶來資安和合規風險。

影子 IT 不等於公民開發者。兩者區別：

| | 公民開發者 | 影子 IT |
|---|---|---|
| **工具狀態** | IT 核可 ✅ | 未經核可 ❌ |
| **IT 是否知情** | 是，在治理框架內 | 否，IT 不知道 |
| **風險** | 低（可管理） | 高（資安、合規漏洞） |

NC 工具門檻低 → 業務人員更容易在未知會 IT 的情況下自行部署 → **NC 比 LC 更容易產生影子 IT 風險**。

**Quick check：** 影子 IT 的核心風險是什麼？ → 未經 IT 核可，帶來資安漏洞和合規問題。

---

#### 3.6 平台生態系總覽 🔥

考試常考平台辨認題（「以下哪個屬於 LC？」、「以下哪個不屬於 NC/LC？」）。

| 類別 | 工具 | 類型 | 核心定位 |
|---|---|---|---|
| **應用建構** | Bubble | NC | Web App / MVP |
| **應用建構** | Power Apps | LC | 企業 App + M365 整合 |
| **應用建構** | OutSystems | LC | 企業級安全應用 |
| **應用建構** | Mendix | LC | 企業級部署 |
| **工作流自動化** | Zapier | NC | 跨應用串接 |
| **工作流自動化** | Make（Integromat） | NC | 多步驟流程 |
| **工作流自動化** | Power Automate | LC | M365 工作流 |
| **資料庫/內部工具** | Airtable | NC | 試算表式資料庫 |
| **試算表轉 App** | AppSheet | NC | Google Sheets → App |

**⚠️ 特別陷阱：AutoML 不屬於 NC/LC！**
- AutoML（如 Google AutoML）= 自動化 ML 模型訓練 → **目標產物是模型（Model）**
- NC/LC = 視覺化開發應用程式 → **目標產物是 App**
- 記憶關鍵：AutoML 做的是**模型**，NC/LC 做的是**應用**

> 詳見 [diagrams/02-platform-ecosystem.md](diagrams/02-platform-ecosystem.md)

---

## Section 4 · 易混淆概念對照表

### 4.1 NC vs LC 核心對比 🔥🔥

| 面向 | No Code（NC） | Low Code（LC） |
|---|---|---|
| **編碼需求** | 零——完全不寫程式 | 少量——視覺化為主，可加入程式碼 |
| **目標用戶** | 非技術業務人員 | 開發者 / 公民開發者（有基礎技術知識） |
| **應用複雜度** | 簡單（表單、報表、流程自動化） | 中至高（企業級應用、複雜整合） |
| **客製化程度** | 低（受限平台模板） | 中至高（可寫程式碼擴展） |
| **治理風險** | 較高（影子 IT 風險） | 較低（通常在 IT 監督下使用） |

**考題判斷：** 看到「零程式碼」、「拖放」、「非技術人員」→ **No Code**；看到「少量程式碼」、「企業級」、「API 整合」→ **Low Code**

---

### 4.2 NC/LC vs AutoML（高頻陷阱）🔥

| 面向 | NC / LC | AutoML（自動化機器學習） |
|---|---|---|
| **定義** | 視覺化開發**應用程式** | 自動化 ML 模型的建構與調參 |
| **目標產物** | 應用程式（App） | 機器學習模型（Model） |
| **目標用戶** | 業務人員 / 公民開發者 | 資料科學家 / ML 工程師 |
| **是否屬於 NC/LC** | 是 | **否** ❌ |

**考題判斷：** 看到「Google AutoML」「H2O.ai」「模型訓練自動化」→ **不是 NC/LC**，是 AutoML

---

### 4.3 公民開發者 vs 影子 IT

| 面向 | 公民開發者 | 影子 IT |
|---|---|---|
| **IT 核可** | ✅ 使用核可工具 | ❌ 未經核可 |
| **IT 知情** | ✅ 在治理框架內 | ❌ IT 不知情 |
| **風險等級** | 低（可管理） | 高（資安、合規漏洞） |

**考題判斷：** 「IT 部門外 + 核可工具」→ **公民開發者**；「未經核可 + 自行部署」→ **影子 IT**

---

## Section 5 · 口訣

### 口訣一：NC vs LC 主要差異

> **「零碼大眾簡，少碼進階全」**
> - **零碼** → No Code → 零程式碼
> - **大眾** → 非技術業務人員都能用
> - **簡** → 簡單應用（表單、流程）
> - **少碼** → Low Code → 少量程式碼
> - **進階** → 有技術基礎的公民開發者
> - **全** → 全功能企業級應用

---

### 口訣二：NC 五大平台（BAZAM）

> **「爸爸（BAZA）+ Make 不寫 Code」**
> - **B**ubble — Web App / MVP
> - **A**irtable — 試算表式資料庫
> - **Z**apier — 跨應用串接
> - **A**ppSheet — 試算表轉 App
> - **M**ake（Integromat）— 多步驟流程

---

### 口訣三：LC 三大平台（POM）

> **「POM（龐）大企業用 Low Code」**
> - **P**ower Apps — 微軟企業應用
> - **O**utSystems — 企業級安全
> - **M**endix — 企業部署（西門子）

---

### 口訣四：NC vs LC 三角比較記憶法

> **速度：NC > LC > 傳統（越早出現越快）**
> **彈性：傳統 > LC > NC（越晚出現越彈）**
> 口訣：「速快彈硬，剛好相反」——速度排序和彈性排序剛好相反

---

## Section 6 · 考試陷阱

❌ **陷阱 1：AutoML = No Code 工具**

> ❌ 錯：Google AutoML 是 No Code 的一種，因為不用寫程式
> ✅ 對：AutoML 做的是 ML 模型，NC/LC 做的是 App。目標產物不同，不能歸為同一類。

---

❌ **陷阱 2：No Code = 背後沒有程式碼**

> ❌ 錯：「No Code」代表這個平台完全沒有程式碼在運作
> ✅ 對：使用者不需要寫程式碼，但平台背後仍自動產生程式碼執行應用邏輯。

---

❌ **陷阱 3：Low Code 不如 No Code 方便**

> ❌ 錯：Low Code 還要寫程式，所以比 No Code 落後
> ✅ 對：LC 的「可寫程式碼」是**優勢**——提供更高客製化能力和更複雜的應用場景。NC 和 LC 沒有誰更好，適用場景不同。

---

❌ **陷阱 4：公民開發者 = 影子 IT**

> ❌ 錯：業務人員自己做工具就是影子 IT，不受管控
> ✅ 對：公民開發者使用**組織核可**的工具，在治理框架內運作。影子 IT 才是未經核可的自主部署。

---

❌ **陷阱 5：有視覺化介面 = NC/LC 工具**

> ❌ 錯：Excel 有拖放、Photoshop 有圖形介面，所以它們是 NC/LC 工具
> ✅ 對：NC/LC 的定義是「用視覺化方式**建構應用程式**」。Excel 是試算表工具，不是用來建構 App 的平台。

---

❌ **陷阱 6：NC 適合企業核心系統**

> ❌ 錯：NC 最快最省，所以企業核心系統也應該用 NC
> ✅ 對：NC 的客製化程度低、API 深度整合能力有限，不適合核心系統。核心系統應選 LC 或傳統開發。

---

❌ **陷阱 7：Zapier = 建構 App 的工具**

> ❌ 錯：Zapier 是 No Code 工具，所以可以用 Zapier 建構一個完整的 Web App
> ✅ 對：Zapier 是**流程自動化**工具，專門串接不同應用之間的工作流程，無法建構 App 介面。建 App 用 Bubble；串流程用 Zapier。

---

❌ **陷阱 8：NC 比 LC 安全（因為沒有程式碼漏洞）**

> ❌ 錯：NC 沒有程式碼，所以比 LC 更安全
> ✅ 對：NC 反而因為門檻低、業務人員容易自行部署，帶來更高的**影子 IT 和治理風險**。安全性不只看程式碼，也看治理。

---

## Section 7 · 情境題快速判斷

### 決策流程圖

```
情境題判斷三步驟
│
├─ Step 1：看使用者技術背景
│   ├─ 完全無技術背景（業務/行銷/教師）→ 偏 No Code
│   └─ 有基礎技術背景 / 公民開發者 → 偏 Low Code
│
├─ Step 2：看應用複雜度
│   ├─ 簡單（表單、報表、自動化通知）→ No Code
│   └─ 複雜（企業系統、多模組、報表整合）→ Low Code
│
└─ Step 3：看整合需求
    ├─ 無需 API 串接 → No Code 可勝任
    └─ 需要串接 ERP / CRM / 外部 API → Low Code
```

---

### 關鍵字速查表

| 看到這個關鍵字 | 應選答案 |
|---|---|
| 「零程式碼」「完全不需要寫 code」「拖放」 | No Code |
| 「少量程式碼」「企業級」「API 整合」「複雜邏輯」 | Low Code |
| 「IT 部門外 + 組織核可工具建構應用」 | 公民開發者 |
| 「未經核可」「自行部署」「IT 不知情」 | 影子 IT |
| 「ML 模型自動化」「模型訓練」「調參」 | AutoML（不是 NC/LC！）|
| 「試算表直接轉 App」 | AppSheet（NC）|
| 「MVP 快速建構 Web App」 | Bubble（NC）|
| 「Microsoft 365 深度整合企業應用」 | Power Apps（LC）|
| 「企業安全性 + 擴展性 + IT 治理」 | OutSystems（LC）|

---

### 情境題範例

| 情境 | 正確答案 | 判斷依據 |
|---|---|---|
| 補習班老師（非技術）要做學生報名表單 | No Code（Airtable 或 AppSheet） | 非技術 + 簡單應用 |
| 行銷同事要串接 Google 表單與 Gmail 自動寄信 | No Code（Zapier） | 非技術 + 流程自動化 |
| 企業 IT 部門要開發整合 ERP 的客戶管理系統 | Low Code（Power Apps） | 企業級 + API 整合 |
| 新創 CEO 要在兩週內做出 Web App MVP | No Code（Bubble） | 快速原型 + 無前端工程師 |
| 業務同事未知會 IT 就用免費工具做了客戶追蹤 | 影子 IT 風險 | 未經核可 + IT 不知情 |

---

## Section 8 · 結尾：快速自我檢查

考前請確認你能回答以下問題：

- [ ] NC（No Code，無程式碼）的核心特徵是什麼？目標用戶是誰？
- [ ] LC（Low Code，低程式碼）與 NC 最大的差異在哪裡？
- [ ] 能正確辨認：Bubble / Airtable / Zapier / AppSheet / Make → NC；Power Apps / OutSystems / Mendix → LC
- [ ] 公民開發者（Citizen Developer）的 Gartner 定義：IT 外 + 組織核可工具
- [ ] 影子 IT（Shadow IT）與公民開發者的區別：核可 vs 未核可
- [ ] AutoML 不屬於 NC/LC（目標產物是模型，不是 App）
- [ ] 三向比較：NC 最快最省但彈性低；傳統開發最彈但最慢最貴；LC 居中

📌 **本課不考：**
- NC/LC 的詳細定價或授權模式
- OutSystems / Mendix 的企業架構設計細節（中級範圍）
- AutoML 的技術實作細節（L113 範圍）
- NC/LC 導入的 ROI 計算（中級 L21201 範圍）

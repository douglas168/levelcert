# L21203 AI風險管理 — Study Guide v2

> 對應評鑑範圍：L212 AI導入評估規劃 + L21203 AI風險管理

---

## 0. How to Use This Guide

本章不要用「背法條」的方式讀。考試通常給你一個 AI 使用情境，問你要判斷風險類型、風險等級、應產出什麼文件、或該用哪個治理框架。

建議讀法：

1. 先讀 Section 1，把整體流程記成一條線。
2. Sections 2-7 每節都照同一個閱讀順序讀：先懂一句話 -> Everyday Analogy -> 先問自己一個問題 -> 技術說法 -> 流程 / 選擇流程 -> 例子 / 表格 -> 記憶方式 -> Exam Rule -> Quick Check。
3. Section 8 用來考前快速判斷情境題。
4. Section 9 Trap Clinic 專門處理常見混淆。
5. Section 10 Practice Questions 做完立刻看答案理由。
6. 最後 3 分鐘念 Final Oral Recall。

火焰標記：

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞 |
| 🔥🔥 | 常考 | 能比較差異 |
| 🔥🔥🔥 | 高頻必背 | 能做情境判斷 |

---

## 1. Big Picture — AI 風險管理核心流程

### 先懂一句話

AI 風險管理就是把「AI 可能出事」變成「風險有分類、有分數、有人負責、有控制、有回顧日期」。

### Everyday Analogy

像開餐廳前做安全檢查：不是只問「菜好不好吃」，還要看瓦斯、動線、過敏原標示、消防、客訴、供應商。AI 也不是只看準確率，還要看公平、法遵、資安、營運、基本權與聲譽。

### 先問自己一個問題

如果這個 AI 明天上線，最糟會傷害誰？誰要負責？我們怎麼知道風險已經降到可接受？

### 技術說法

AI 風險管理（AI Risk Management）是一套用來識別、評估、量化、處置、監控 AI 風險的治理流程。核心產出通常包括風險登記簿（Risk Register）、風險矩陣（Likelihood-Impact Matrix）、控制項（Controls）、殘餘風險（Residual Risk）與風險處置（Risk Treatment）。

### 流程 / 選擇流程

```text
AI use case
   ↓
1. 風險識別（Risk Identification）
   → 技術 / 法遵 / 倫理 / 營運 / 資安 / 聲譽 / 基本權
   ↓
2. 風險量化（Risk Quantification）
   → likelihood × impact
   → impact 看多面向，取最大值
   ↓
3. 法規分級與合規（Compliance Mapping）
   → EU AI Act：禁高透小
   → 台灣 AI 基本法 / FSC 指引
   ↓
4. 框架映射（Framework Mapping）
   → NIST AI RMF：Govern / Map / Measure / Manage
   → ISO/IEC 42001 / 23894 / 27001
   ↓
5. 控制項與評估文件
   → 預防 / 偵測 / 矯正 / 治理控制
   → 高風險情境注意 FRIA（基本權影響評估）
   ↓
6. 殘餘風險決策
   → residual risk vs risk appetite
   → mitigate / transfer / accept / avoid
   ↓
7. 持續監控與回顧
```

### 比較表這樣讀

這張表不是名詞表，而是「題目看到什麼字，就該跳到哪個概念」。

| 題目關鍵字 | 第一反應 | 為什麼 |
|---|---|---|
| owner、score、treatment、review date | 風險登記簿（Risk Register） | 這是持續追蹤風險的文件 |
| residual risk 能不能接受 | 風險胃納（Risk Appetite） | 殘餘風險要和組織可接受上限比較 |
| social scoring、職場情緒辨識 | EU AI Act 禁止實務 | 先判斷能不能做 |
| chatbot、deepfake、AI 生成內容標示 | 限制風險 / 透明義務 | 重點是告知使用者 |
| policy、RACI、治理委員會 | NIST Govern | 治理與問責 |
| stakeholders、use context、harm 假設 | NIST Map | 盤點情境 |
| metrics、fairness test、robustness test | NIST Measure | 量測與驗證 |
| mitigation、rollback、incident response | NIST Manage | 處置與回應 |
| AI 管理系統、可認證 | ISO/IEC 42001:2023 | AIMS 管理系統標準 |
| 7 trustworthy AI requirements | HLEG | 發布方配對題 |

### 記憶方式

```text
AI 風險管理 = 列出來 -> 量出來 -> 分級 -> 加控制 -> 看剩多少 -> 持續追
EU AI Act = 禁高透小
NIST AI RMF = 治盤量管
Treatment = 降轉收避
```

### Exam Rule

```text
題目問「哪份文件持續追蹤 AI 風險？」 → Risk Register
題目問「殘餘風險能否接受？」         → Compare with Risk Appetite
題目問「NIST 四功能」                → Govern / Map / Measure / Manage
題目問「EU AI Act 分級」             → 先看 Art.5 禁止，再看高風險，再看透明義務
```

### Quick Check

一個 AI 專案已經測出偏差，也加了人工覆核，但主管問：「上線後誰追？多久回顧一次？剩下的風險能不能接受？」最應該產出哪份文件？

答案：風險登記簿（Risk Register）。因為題目關鍵字是 owner、review date、residual risk 與 treatment，這些都是 Risk Register 的核心欄位。

---

## 2. 風險識別與分類 🔥🔥🔥

### 先懂一句話

風險識別（Risk Identification）是在問：這個 AI 可能用哪一種方式傷害人、流程、組織或社會？

### Everyday Analogy

你買二手車時，不會只看外觀。你會問引擎、煞車、里程、事故紀錄、保險、維修成本、賣家評價。AI 風險也一樣，不能只看模型準確率。

### 先問自己一個問題

這個 AI 出錯時，是「模型本身壞了」、是「對某些人不公平」、是「違反規範」、還是「流程沒人接手」？

### 技術說法

AI 風險分類常見七類：技術風險（Technical Risk）、法遵風險（Compliance Risk）、倫理風險（Ethical Risk）、營運風險（Operational Risk）、資安風險（Security Risk）、聲譽風險（Reputational Risk）、基本權風險（Fundamental Rights Risk）。

### 流程 / 選擇流程

```text
先描述 use case
   ↓
列出利害關係人（Stakeholders）
   ↓
寫出 harm scenario：「若...則...」
   ↓
判斷主要風險類型
   ↓
寫入 Risk Register
   ↓
再做 likelihood / impact 量化
```

### 比較表這樣讀

這張表的讀法是：先看「傷害來源」，再選風險類型。

| 傷害來源 | 風險類型 | 題目常見描述 | 判斷提示 |
|---|---|---|---|
| 模型或資料行為不穩 | 技術風險（Technical Risk） | 模型失準、資料漂移、幻覺 | 問題在系統技術表現 |
| 違反法令或監理要求 | 法遵風險（Compliance Risk） | 未揭露 AI、缺文件、未符主管機關要求 | 問題在規範要求 |
| 對族群不公平 | 倫理風險（Ethical Risk） | 歧視、操控、弱勢受損 | 問題在公平與自主 |
| 流程或供應商中斷 | 營運風險（Operational Risk） | 第三方 API 掛掉、人工覆核沒人接 | 問題在作業不中斷 |
| 被攻擊或資料外洩 | 資安風險（Security Risk） | prompt injection、資料外洩、模型盜用 | 問題在攻擊與防護 |
| 社會信任下降 | 聲譽風險（Reputational Risk） | 歧視文案炎上、品牌受損 | 問題在外部觀感 |
| 影響隱私、平等、程序正義 | 基本權風險（Fundamental Rights Risk） | 補助資格、社福審查、無申訴 | 問題在權利保障 |

### 記憶方式

```text
技法倫營資聲基
技術壞、法遵缺、倫理偏、營運斷、資安攻、聲譽炎、基本權傷
```

### Exam Rule

```text
對特定族群結果較差          → 倫理 / 基本權風險
模型漂移、失準、幻覺        → 技術風險
未揭露、缺文件、違反規範    → 法遵風險
第三方 API 掛掉、流程停擺   → 營運風險
prompt injection、外洩      → 資安風險
品牌炎上、信任下降          → 聲譽風險
無申訴、影響程序正義        → 基本權風險
```

### Quick Check

某家公司部署招募篩選模型，測試後發現女性求職者通過率系統性偏低。這主要屬於哪種 AI 風險？

答案：倫理風險（Ethical Risk），也可能牽涉基本權風險。因為核心是特定族群受到不公平結果，不是單純伺服器故障或資料外洩。

---

## 3. 風險登記簿與量化工具 🔥🔥🔥

### 先懂一句話

風險登記簿（Risk Register）是 AI 風險管理的主控表：每個風險都要有人負責、有分數、有控制、有剩餘風險、有下次回顧。

### Everyday Analogy

像裝修工程的缺失表：哪裡漏水、嚴重度幾分、誰修、何時修、修完還有沒有問題。Risk Register 也是這樣，只是追的是 AI 風險。

### 先問自己一個問題

如果稽核明天來問：「這個風險誰負責？你怎麼知道已經降到可接受？」我能不能指到同一張表？

### 技術說法

風險登記簿是 living document，不是一次性報告。它記錄固有風險（Inherent Risk）、目前控制項（Current Controls）、殘餘風險（Residual Risk）、處置方式（Risk Treatment）與回顧日期（Review Date）。

### 流程 / 選擇流程

```text
寫風險描述：「若 X 發生，則 Y 受影響」
   ↓
評估 likelihood（1-5）
   ↓
評估 impact（1-5，取多面向最大值）
   ↓
inherent risk = likelihood × impact
   ↓
加入 controls
   ↓
重新評估 residual risk
   ↓
和 risk appetite 比較
   ↓
選 treatment：mitigate / transfer / accept / avoid
```

### 一步一步例子

情境：銀行信用評分 AI 可能對低收入族群給出較差結果。

```text
Likelihood = 4（歷史資料偏差明顯）
Impact = max(財務2, 營運3, 法律4, 聲譽4, 安全1, 倫理5, 基本權5)
       = 5

Inherent Risk Score = 4 × 5 = 20（Critical）

加入控制：
- fairness test
- 人工覆核
- 申訴流程
- 定期監控

Residual Risk Score = 2 × 4 = 8（Medium）

若 Risk Appetite ceiling = 10
→ 8 <= 10
→ 可 Accept，但要持續監控
```

### 比較表這樣讀

Risk Register 欄位不是越多越好，重點是能支援「追蹤與決策」。

| 欄位 | 考試要懂的作用 | 少了會怎樣 |
|---|---|---|
| 風險 ID | 方便追蹤 | 風險難以引用 |
| 系統 / use case | 知道風險屬於哪個 AI | 無法定位 |
| 生命週期階段 | 設計、訓練、部署、運行、退場 | 不知道何時處理 |
| 風險描述 | 用「若...則...」說清楚 harm | 只剩模糊擔心 |
| owner | 指定負責人 | 沒人追 |
| likelihood | 發生可能性 | 無法排序 |
| impact | 影響嚴重度 | 無法排序 |
| inherent risk | 控制前風險 | 不知道原始嚴重度 |
| controls | 已採取控制 | 不知道怎麼降風險 |
| residual risk | 控制後剩餘風險 | 無法判斷能否接受 |
| treatment | 降轉收避 | 無法決策 |
| review date | 下次回顧時間 | 文件不會動 |

5×5 可能性衝擊矩陣（Likelihood-Impact Matrix）：

```text
Impact
  5 |  5 10 15 20 25
  4 |  4  8 12 16 20
  3 |  3  6  9 12 15
  2 |  2  4  6  8 10
  1 |  1  2  3  4  5
      1  2  3  4  5  → Likelihood

1-4    Low      → owner 自行追蹤
5-9    Medium   → 主管核准 + 例行 review
10-14  High     → 要緩解計畫與時限
15-25  Critical → 高層審查，不可直接上線
```

Impact 至少看 7 個面向，並取最大值：

| Impact 面向 | 例子 |
|---|---|
| 財務衝擊（Financial） | 損失、賠償、成本 |
| 營運衝擊（Operational） | 流程中斷 |
| 法律衝擊（Legal） | 違法、裁罰、訴訟 |
| 聲譽衝擊（Reputational） | 信任下降、炎上 |
| 安全衝擊（Safety） | 人身安全 |
| 倫理衝擊（Ethical） | 不公平、操控 |
| 基本權衝擊（Fundamental Rights） | 隱私、平等、程序正義 |

風險處置（Risk Treatment）決策表：

| 如果 residual risk... | 選項 | 中文記法 | 例子 |
|---|---|---|---|
| 高於 appetite，但可加控制降低 | mitigate | 降 | 加人工覆核、監控、測試 |
| 無法完全自管，可契約或保險分擔 | transfer | 轉 | SLA、保險、供應商責任 |
| 低於 appetite，且監控充分 | accept | 收 | 接受並持續追蹤 |
| 踩禁止線或壓不下來 | avoid | 避 | 不做、停用、改流程 |

### 記憶方式

```text
Risk Register = 有人追
Impact = 看七面，取最大
Treatment = 降轉收避
Accept 前一定要比 Risk Appetite
```

### Exam Rule

```text
owner / score / controls / treatment / review date → Risk Register
inherent risk                                      → 控制前
residual risk                                      → 控制後
residual risk 跟什麼比？                           → Risk Appetite
Risk Appetite 誰設定？                             → 董事會 / 高層
impact 多面向怎麼取？                              → 取最大值，不取平均
```

### Quick Check

某 AI 系統財務衝擊 2 分，但基本權衝擊 5 分。Impact 應該填幾分？

答案：5 分。AI 風險的 impact 要看多個面向並取最大值，避免用平均值把基本權等重大衝擊稀釋掉。

---

## 4. 歐盟人工智慧法（EU AI Act）四級分類 🔥🔥🔥

### 先懂一句話

EU AI Act 分級先問「能不能做」，再問「可做但要多嚴格管理」，口訣是：禁高透小。

### Everyday Analogy

像遊樂園設施：有些行為直接禁止（翻越欄杆），有些可以玩但要身高限制與安全帶（雲霄飛車），有些只要提醒注意事項（旋轉木馬），有些幾乎不用特別管（園區地圖）。

### 先問自己一個問題

這個 AI use case 是禁止、可做但高風險、只需透明揭露，還是一般低風險？

### 技術說法

EU AI Act 採風險基礎方法（risk-based approach）：不可接受風險（Unacceptable Risk）、高風險（High Risk）、限制 / 透明風險（Limited / Transparency Risk）、最小風險（Minimal Risk）。考試重點是情境判斷，不是背完整條文。

### 流程 / 選擇流程

```text
拿到 AI use case
   ↓
Step 1：是否踩 Art.5 禁止實務？
   → 是：Unacceptable Risk，不可做
   ↓ 否
Step 2：是否屬 Art.6 + Annex III 高風險場景？
   → 是：High Risk，可做但重度控管
   ↓ 否
Step 3：是否涉及 Art.50 透明義務？
   → 是：Limited / Transparency Risk，要揭露或標示
   ↓ 否
Step 4：Minimal Risk
```

### 比較表這樣讀

先看「能不能做」，再看「義務是什麼」。

| 等級 | 中文記憶 | 核心判斷 | 典型情境 |
|---|---|---|---|
| Unacceptable Risk | 禁 | 原則上禁止 | social scoring、職場情緒辨識、特定即時公共空間遠端生物辨識 |
| High Risk | 高 | 可做，但要重度合規 | 信用評分、招募、教育評分、基本服務、公部門重大服務 |
| Limited / Transparency Risk | 透 | 重點是透明揭露 | chatbot、deepfake、AI 生成內容標示 |
| Minimal Risk | 小 | 無特定 AI Act 義務 | 垃圾郵件過濾、一般內部輔助 |

Art.5 禁止實務（考試抓關鍵字）：

| 禁止實務 | 關鍵字 |
|---|---|
| 社會評分（Social Scoring） | 多維個人資料決定待遇 |
| 潛意識操控（Subliminal Manipulation） | 人不易察覺的操控 |
| 利用弱勢脆弱性（Exploitation of Vulnerabilities） | 年齡、身心狀態、社經脆弱性 |
| 無差別蒐刮人臉影像建資料庫 | untargeted facial-image scraping |
| 職場或學校情緒辨識 | emotion recognition at work / school |
| 依敏感屬性做生物特徵分類 | biometric categorisation by sensitive attributes |
| 僅依 profiling 做 predictive policing | 犯罪風險預測只靠 profiling |
| 特定公共場所即時遠端生物辨識 | law enforcement real-time remote biometric ID |

Annex III 高風險場景（口訣：生基教工基執移司）：

| 類型 | 考題描述 |
|---|---|
| 生物辨識（Biometrics） | 臉辨識、身份辨識相關用途 |
| 關鍵基礎設施（Critical Infrastructure） | 水電交通調度、安全控制 |
| 教育（Education） | 入學、評分、學習路徑 |
| 就業（Employment） | 履歷篩選、升遷、績效 |
| 基本服務（Essential Services） | 信用、保險、社福福利 |
| 執法（Law Enforcement） | 偵查、風險評估 |
| 移民邊境（Migration / Border） | 簽證、邊境審查 |
| 司法民主（Justice / Democracy） | 司法支援、投票流程 |

常見情境判斷：

| 情境 | 判斷 | 考試提醒 |
|---|---|---|
| 客服 chatbot 回答營業時間 | 限制風險 | 要揭露正在與 AI 互動 |
| 銀行 AI 信用評分 | 高風險 | essential services |
| 公司看員工表情判定情緒 | 禁止實務 | 職場情緒辨識 |
| 內部 AI 寫會議摘要 | 最小或限制風險 | 看是否涉及透明義務 |
| deepfake / AI 生成內容 | 限制風險 | 標示義務 |

### 一步一步例子

題目：某銀行用 AI 自動給信用分數，影響貸款利率。

```text
Step 1：是否 Art.5 禁止？
→ 不是 social scoring 禁止題型，也不是職場情緒辨識

Step 2：是否 Annex III？
→ 是，信用評分屬 essential services

答案：
→ High Risk
→ 可做，但要重度治理、文件、人類監督與風險管理
```

### GPAI（General Purpose AI，通用目的 AI）條款 🔥🔥

EU AI Act 對通用目的 AI 模型（General Purpose AI, GPAI）有專門義務。考試看到「大型語言模型提供者」或「基礎模型供應商」時，不要直接套 Annex III 高風險使用場景。

| 類型 | 典型義務重點 |
|---|---|
| 一般 GPAI 模型 | 技術文件、著作權政策、訓練資料摘要 |
| 具系統性風險的 GPAI 模型 | 上述義務 + 對抗性測試、重大事故通報、網路安全措施 |

> 考試提醒：EU AI Act 使用「訓練所用累積運算量大於 10^25 FLOPs」作為高影響能力的推定門檻之一。

### 記憶方式

```text
禁高透小：
禁 = 不能做
高 = 可做但重管
透 = 透明揭露
小 = 無特定 AI Act 義務
```

### Exam Rule

```text
social scoring / 職場情緒辨識 / 部分即時公共生物辨識 → 禁止
信用評分 / 招募 / 教育評分 / 社福服務               → 高風險
chatbot / deepfake / AI 生成內容標示                → 限制 / 透明風險
垃圾郵件過濾 / 一般內部輔助                         → 最小風險
high-risk ≠ 不能做                                  → 高風險可做但要重管
禁止 ≠ 加控制就能上線                               → 禁止實務原則上不能做
```

### Quick Check

某公司在辦公室部署 AI，即時分析員工開會時的臉部表情並判定情緒狀態。這屬於 EU AI Act 哪一級？

答案：不可接受風險（Unacceptable Risk），屬禁止實務。因為職場情緒辨識是 Art.5 禁止實務，不是高風險。

---

## 5. 基本權影響評估（FRIA）與 NIST AI RMF 🔥🔥🔥

### 先懂一句話

FRIA 問「這個高風險 AI 會不會傷害人的基本權」；NIST AI RMF 問「組織要怎麼把 AI 風險治理制度化」。

### Everyday Analogy

FRIA 像學校要改用 AI 決定獎學金資格前，先問學生能不能申訴、弱勢學生會不會被誤排除、老師能不能覆核。NIST AI RMF 像學校整套校務治理：誰訂規則、誰盤點影響、誰測試、誰處理事故。

### 先問自己一個問題

題目是在問「某個高風險 use case 上線前要做的基本權評估」，還是在問「治理框架中的某個 function」？

### 技術說法

基本權影響評估（Fundamental Rights Impact Assessment, FRIA）是 EU AI Act Article 27 針對特定高風險 AI 系統的 deployer（使用方 / 部署方）要求。NIST AI Risk Management Framework（NIST AI RMF）是美國 NIST 發布的志願性框架，四大 function 是 Govern / Map / Measure / Manage。

### 流程 / 選擇流程

FRIA：

```text
確認 high-risk AI use case
   ↓
確認責任方是 deployer
   ↓
上線前評估：
   - 使用目的與頻率
   - 受影響族群
   - 可能基本權損害
   - 人類監督
   - 申訴 / 救濟
   - 緩解措施
   ↓
保存文件，依情境履行通知或後續義務
```

NIST AI RMF：

```text
Govern（治） = 政策、角色、問責、文化，貫穿全程
   ↓
Map（盤） = 盤點情境、stakeholders、harm
   ↓
Measure（量） = 指標、測試、驗證、證據
   ↓
Manage（管） = 優先排序、緩解、監控、回應
```

### 比較表這樣讀

FRIA vs DPIA：先看「保護的是什麼」。

| 面向 | FRIA | DPIA |
|---|---|---|
| 全名 | Fundamental Rights Impact Assessment | Data Protection Impact Assessment |
| 法源重點 | EU AI Act Art.27 | GDPR |
| 主軸 | 基本權、平等、申訴、程序正義 | 個人資料處理風險 |
| 主要責任方 | deployer（高風險 AI 使用方） | 資料控管者 |
| 常見陷阱 | 做了 DPIA 就以為不用 FRIA | 忽略 AI 特有 harm |

NIST 四功能：先看動詞。

| 題目動詞 | Function | 常見產出 |
|---|---|---|
| 訂政策、分責任、設委員會 | Govern | policy、RACI、risk appetite |
| 盤情境、找 stakeholder、界定用途 | Map | context doc、stakeholder map |
| 測試、量測、驗證、蒐集證據 | Measure | fairness test、robustness test、metrics |
| 緩解、排優先、rollback、incident response | Manage | treatment plan、escalation、monitoring |

Artefact 對應：

| Artefact | 對應 Function | 為什麼 |
|---|---|---|
| AI policy / governance charter | Govern | 建制度 |
| 風險胃納聲明 | Govern | 高層設定可接受風險 |
| stakeholder mapping | Map | 盤利害關係人 |
| use case boundary 文件 | Map | 定義使用情境 |
| fairness / robustness evidence | Measure | 量測與驗證 |
| 監控指標儀表板 | Measure + Manage | 先量，再依結果處置 |
| risk register 更新與 treatment | Manage | 管處置 |
| escalation / incident response | Manage | 事故回應 |

### 一步一步例子

題目：公部門用 AI 輔助篩選社福補助資格，上線前該注意什麼？

```text
Step 1：是否影響基本服務 / 公部門重要決策？
→ 是，高風險思維

Step 2：誰部署？
→ 公部門是 deployer

Step 3：上線前評估什麼？
→ 受影響族群、誤判後果、申訴救濟、人類監督、緩解措施

答案：
→ 做 FRIA；同時在 NIST Map 盤情境，在 Measure 測偏差，在 Manage 設處置
```

### 記憶方式

```text
FRIA = Fundamental Rights，上線前，deployer
DPIA = Data Protection，個資風險
NIST = 治盤量管
Govern = 全程支撐，不是第一步做完就結束
```

### Exam Rule

```text
FRIA 誰做？                            → deployer
FRIA 什麼時候做？                      → 上線前
FRIA = DPIA？                          → 否
政策 / 問責 / risk appetite            → Govern
use context / stakeholder / harm        → Map
metrics / testing / validation          → Measure
mitigation / rollback / incident        → Manage
Govern 是不是只做一次？                → 否，cross-cutting
```

### Quick Check

公司 IT 部門設定 AI 偏差監測指標，每月產生測試報告。這屬於 NIST AI RMF 哪個 function？

答案：Measure。因為題目重點是指標、量測、測試與證據；如果下一步是根據報告決定 rollback，才會進入 Manage。

---

## 6. 台灣法規地景 🔥🔥

### 先懂一句話

台灣考點要分清楚：AI 基本法是法律框架；金管會金融業 AI 指引是行政指導，不是強制法律。

### Everyday Analogy

像交通規則與公司內規：法律是底線，產業指引像主管機關告訴特定行業「實務上最好這樣做」。不是法律不代表不重要，但不能把它說成強制法令。

### 先問自己一個問題

題目是在問全國性的 AI 基本原則、公部門風險評估，還是在問金融業導入 AI 的主管機關指引？

### 技術說法

台灣《人工智慧基本法》於 2026-01-14 公布施行，中央主管機關為國家科學及技術委員會（NSTC，國科會）。金管會《金融業運用人工智慧（AI）指引》於 2024-06-20 發布，定位為行政指導性質，提供金融業導入、使用與管理 AI 的參考。

> 注意：法規文字可能因後續子法、配套規範或主管機關解釋而更新。考前若遇到精確日期、條文或主管機關職掌，請以總統府公報、全國法規資料庫或主管機關公告為準。

### 流程 / 選擇流程

```text
台灣 AI 題目
   ↓
是否問中央主管機關？
   → NSTC（國科會）
   ↓
是否問政府機關使用 AI？
   → AI 基本法第 19 條：風險評估與因應措施
   ↓
是否問金融業導入 AI？
   → FSC 金融業 AI 指引：行政指導，6 核心原則
   ↓
是否問一般原則？
   → 台灣 AI 基本法 7 原則
```

### 比較表這樣讀

先看「法律位階 / 性質」，不要把所有文件都當強制法。

| 文件 / 規範 | 性質 | 考試抓法 |
|---|---|---|
| 人工智慧基本法 | 法律框架 | NSTC、7 原則、公部門風險評估 |
| AI 基本法第 19 條 | 公部門使用 AI 風險評估要求 | 政府機關、執行業務、提供服務 |
| FSC 金融業 AI 指引 | 行政指導 | 金融業、6 原則、非強制法律 |

台灣 AI 基本法 7 原則（口訣：永人隱安透公責）：

| 原則 | 英文提示 | 考試關鍵詞 |
|---|---|---|
| 永續發展與福祉 | Sustainability and Well-being | 社會公益、環境永續、數位平權 |
| 人類自主 | Human Autonomy | human oversight、以人為本 |
| 隱私保護與資料治理 | Privacy and Data Governance | 個資、最小化、資料治理 |
| 資安與安全 | Security and Safety | robustness、攻擊防護 |
| 透明與可解釋 | Transparency and Explainability | 揭露、標示、可理解 |
| 公平與不歧視 | Fairness and Non-discrimination | bias、平等、差別待遇 |
| 問責 | Accountability | 責任歸屬、可稽核 |

FSC 金融業 AI 指引 6 原則（口訣：治公隱安透永）：

| 原則 | 考場關鍵詞 |
|---|---|
| 治理及問責 | governance、責任歸屬 |
| 公平性與以人為本 | fairness、human-centered |
| 隱私及客戶權益 | privacy、customer rights |
| 穩健性與安全 | robustness、security |
| 透明與可解釋 | transparency、explainability |
| 永續發展 | sustainability |

### 一步一步例子

題目：政府機關用 AI 輔助社福補助審查，是否要做風險評估？

```text
Step 1：主體是政府機關？
→ 是

Step 2：用途是執行業務或提供服務？
→ 是，社福補助審查

Step 3：台灣法規想到什麼？
→ AI 基本法第 19 條

答案：
→ 應進行風險評估並規劃風險因應措施
```

### 記憶方式

```text
台灣 AI 基本法 = NSTC + 7 原則 + 公部門風評
FSC 指引 = 金融業 + 6 原則 + 行政指導
行政指導 ≠ 強制法律
```

### Exam Rule

```text
台灣 AI 基本法主管機關？             → NSTC（國科會）
台灣 AI 基本法公布施行日？           → 2026-01-14
政府機關使用 AI 的風險評估要求？      → AI 基本法第 19 條
FSC 金融業 AI 指引是法律嗎？          → 否，是行政指導
FSC 指引是否重要？                    → 是，金融業實務 benchmark
```

### Quick Check

題目說：「金管會金融業 AI 指引對銀行具有強制法律效力，因此違反就等同違法。」這句話對嗎？

答案：錯。FSC 金融業 AI 指引是行政指導，不是強制法律；但它仍是金融業導入與管理 AI 的重要參考。

---

## 7. ISO 標準體系與原則對照 🔥🔥

### 先懂一句話

ISO/IEC 42001 管 AI 管理系統，ISO/IEC 23894 管 AI 風險管理方法，ISO/IEC 27001 管資訊安全；27001 不是完整 AI 治理。

### Everyday Analogy

27001 像大樓保全，管門禁、監視器、誰能進機房。42001 像整間公司的 AI 管理制度，管誰能核准 AI、怎麼評風險、供應商怎麼管、出事怎麼追。

### 先問自己一個問題

題目是在問「AI 管理系統可認證」、問「AI 風險管理方法」，還是只問「資訊安全」？

### 技術說法

ISO/IEC 42001:2023 是 AI management system（AIMS）標準，規範組織如何建立、實施、維持與持續改進 AI 管理系統。ISO/IEC 23894:2023 是 AI 風險管理指引。ISO/IEC 27001 是資訊安全管理系統（ISMS）標準，核心是 confidentiality、integrity、availability（CIA）。

### 流程 / 選擇流程

```text
題目看到 ISO
   ↓
AI 管理系統、AIMS、可認證？
   → ISO/IEC 42001:2023
   ↓
AI 風險管理方法、流程指引？
   → ISO/IEC 23894:2023
   ↓
資訊安全、CIA、ISMS？
   → ISO/IEC 27001
```

### 比較表這樣讀

先看標準要解決的問題。

| 標準 | 性質 | 核心問題 | 常見誤解 |
|---|---|---|---|
| ISO/IEC 42001:2023 | AI 管理系統（AIMS）標準，可用於認證 | 組織如何治理 AI？ | 被當成單純 checklist |
| ISO/IEC 23894:2023 | AI 風險管理指引 | AI 風險管理流程怎麼做？ | 被誤以為取代 42001 |
| ISO/IEC 27001 | 資安管理系統（ISMS）標準 | 資訊安全 CIA 怎麼管？ | 被誤以為完成 AI 治理 |

27001 管不到或不足的 AI 特有議題：

| AI 議題 | 為什麼不是純資安 |
|---|---|
| 模型漂移（Model Drift） | 資料分布變了，模型表現變差 |
| 幻覺 / confabulation | 生成內容不可靠 |
| 公平性（Fairness） | 對族群差別影響 |
| 可解釋性（Explainability） | 決策理由是否可理解 |
| 人類監督（Human Oversight） | 人是否能介入與覆核 |
| 基本權衝擊（Fundamental Rights） | 隱私、平等、程序正義 |

原則 issuer 對照：考試常問「誰提出」。

| 發布方 | 原則數 | 記憶焦點 |
|---|---|---|
| Microsoft | 6 | Fairness、Reliability & Safety、Privacy & Security、Inclusiveness、Transparency、Accountability |
| Google | 7 | Socially beneficial、Avoid unfair bias、Built for safety、Accountable、Privacy design、Scientific excellence、Accord with principles |
| HLEG（歐盟高階專家小組） | 7 | 7 trustworthy AI requirements |
| 台灣 AI 基本法 | 7 | 永人隱安透公責 |
| FSC（金管會） | 6 | 治公隱安透永 |

HLEG 7 trustworthy AI requirements：

| HLEG requirement | 中文抓法 |
|---|---|
| Human Agency and Oversight | 人類自主與監督 |
| Technical Robustness and Safety | 技術穩健與安全 |
| Privacy and Data Governance | 隱私與資料治理 |
| Transparency | 透明 |
| Diversity, Non-discrimination and Fairness | 多元、非歧視與公平 |
| Societal and Environmental Well-being | 社會與環境福祉 |
| Accountability | 問責 |

### 記憶方式

```text
42001 = AI 管理系統
23894 = AI 風險方法
27001 = 資安 CIA
HLEG = 7 trustworthy AI requirements
Microsoft = 6，其中 Inclusiveness 很有辨識度
```

### Exam Rule

```text
AI 管理系統、AIMS、可認證             → ISO/IEC 42001:2023
AI 風險管理方法指引                  → ISO/IEC 23894:2023
資訊安全、CIA、ISMS                  → ISO/IEC 27001
27001 = 完整 AI 治理？               → 否
7 trustworthy AI requirements        → HLEG
Microsoft Responsible AI principles  → 6 principles，含 Inclusiveness
```

### Quick Check

公司已取得 ISO/IEC 27001 認證，主管說：「資安已做好，所以 AI 治理也完成。」這說法有什麼問題？

答案：有誤。27001 主要管資訊安全 CIA，不足以處理模型漂移、公平性、可解釋性、人類監督與基本權衝擊；完整 AI 治理要看 ISO/IEC 42001、NIST AI RMF 等 AI 專門框架。

---

## 8. Exam Decision Trees 🔥🔥🔥

### 決策樹 1：EU AI Act 級別判斷

```text
拿到 AI use case
│
├─ Art.5 禁止實務？
│  social scoring / 職場情緒辨識 / 弱勢操控 / 部分即時公共生物辨識
│  └─ YES → Unacceptable Risk（不可做）
│
├─ Annex III 高風險場景？
│  信用 / 招募 / 教育 / 基本服務 / 執法 / 邊境 / 司法民主 / 關鍵基礎設施
│  └─ YES → High Risk（可做，但重度合規）
│
├─ Art.50 透明義務？
│  chatbot / deepfake / AI 生成內容標示
│  └─ YES → Limited / Transparency Risk（揭露義務）
│
└─ 以上皆否
   └─ Minimal Risk（無特定 AI Act 義務，但仍可能受其他法規約束）
```

### 決策樹 2：NIST AI RMF Function

```text
題目描述的是什麼動作？
│
├─ 訂政策 / 問責 / 治理委員會 / risk appetite / 教育訓練
│  └─ Govern
│
├─ 盤 use case / stakeholder / harm / intended use
│  └─ Map
│
├─ 指標 / 測試 / 偏差驗證 / robustness / 日誌分析
│  └─ Measure
│
└─ 緩解 / 優先排序 / rollback / incident response / escalation
   └─ Manage

注意：Govern 是 cross-cutting，全程都在。
```

### 決策樹 3：Risk Treatment

```text
Residual Risk 怎麼辦？
│
├─ 低於 Risk Appetite，且監控充分
│  └─ Accept（收）
│
├─ 高於 Appetite，但可加控制壓低
│  └─ Mitigate（降）
│
├─ 無法自行完全控管，可保險 / 契約 / 外包分擔
│  └─ Transfer（轉）
│
└─ 踩禁止線 / 壓不下來 / 基本權不可接受
   └─ Avoid（避）
```

### 決策樹 4：誰做 FRIA？

```text
是否為 EU AI Act high-risk use case？
│
├─ YES
│  ├─ 使用方 / 部署方（deployer）？
│  │  └─ 上線前做 FRIA
│  └─ 供應商 / 開發方（provider）？
│     └─ 主要看技術文件、合格評估等 provider 義務
│
└─ NO
   └─ 不一定有強制 FRIA，但可自願用 FRIA 思維做基本權評估

FRIA ≠ DPIA
FRIA = 基本權；DPIA = 個資處理風險
```

### 決策樹 5：台灣情境

```text
題目說的是哪個主體？
│
├─ 政府機關 / 公部門
│  └─ AI 基本法第 19 條 + 風險評估 + 因應措施
│
├─ 金融業
│  └─ FSC 金融業 AI 指引（行政指導）+ 6 原則
│
└─ 一般 AI 原則
   └─ 台灣 AI 基本法 7 原則 + NSTC
```

---

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：chatbot 一定是最小風險

錯。一般互動型 chatbot 常落在限制 / 透明風險，因為使用者需要知道正在與 AI 互動。

Exam fix：

```text
chatbot / 未明示 AI → 限制風險（透明揭露），不是自動最小風險
```

### Trap 2：HLEG 7 要求是 EU AI Act 條文

錯。HLEG 7 trustworthy AI requirements 是歐盟高階專家小組提出的倫理要求，不是 EU AI Act 條文。

Exam fix：

```text
7 trustworthy AI requirements → HLEG
EU AI Act → 禁止實務 / 高風險義務 / 透明義務
```

### Trap 3：做完 DPIA 就等於做完 FRIA

錯。DPIA 主軸是個資處理風險；FRIA 主軸是更廣的基本權、申訴、程序正義與人類監督。

Exam fix：

```text
DPIA → data protection
FRIA → fundamental rights
做了 DPIA ≠ 做完 FRIA
```

### Trap 4：高風險等於不能做

錯。高風險（High Risk）是可以做但要重度控管；不能做的是不可接受風險（Unacceptable Risk）。

Exam fix：

```text
不能做 → Unacceptable Risk
可做但重管 → High Risk
```

### Trap 5：ISO 27001 做完就等於 AI 治理做完

錯。27001 管資訊安全 CIA，不足以涵蓋模型漂移、公平性、可解釋性、人類監督等 AI-specific 議題。

Exam fix：

```text
AI 管理系統 → ISO/IEC 42001
資安管理 → ISO/IEC 27001
```

### Trap 6：金管會 AI 指引是強制法律

錯。FSC 金融業 AI 指引是行政指導，不是強制法律；但它仍是金融業實務上的重要參考。

Exam fix：

```text
FSC AI 指引 → 行政指導，非強制法令
```

### Trap 7：只要涉及臉部辨識就一律禁止

錯。不是所有 biometric system 都被禁。職場情緒辨識、敏感屬性分類、特定即時公共執法辨識等才是禁止或高度敏感題型；其他生物辨識可能是高風險。

Exam fix：

```text
職場情緒辨識 → 禁止
一般 biometric access / identification → 依用途判斷，常見為高風險
```

### Trap 8：Govern 是 NIST AI RMF 第一步，做完就結束

錯。Govern 是 cross-cutting function，貫穿 Map、Measure、Manage。

Exam fix：

```text
Govern = 全程支撐
Map / Measure / Manage = 依情境反覆運作
```

### Trap 9：Risk Register 就是模型名稱加準確率

錯。那比較像 model inventory 或 model card。Risk Register 要追 owner、分數、控制、residual risk、treatment、review date。

Exam fix：

```text
模型說明與限制 → Model Card
風險持續追蹤 → Risk Register
```

### Trap 10：風險胃納越低越好

錯。風險胃納要和業務、法規與社會可接受度一致。公平、個資、基本權可以極低；一般營運波動若全部設極低，管理會癱瘓。

Exam fix：

```text
基本權 / 公平 / 個資 → 低或極低胃納
一般成本 / 效能波動 → 依業務設定
```

### Trap 11：AI 風險管理只是在管 GenAI 幻覺

錯。AI 風險管理涵蓋傳統 ML、招募、信用評分、保險、教育、公部門決策與 GenAI。幻覺只是 GenAI-specific 風險之一。

Exam fix：

```text
AI risk management → 所有 AI 系統
hallucination → GenAI 風險之一
```

### Trap 12：FRIA 是 provider 的責任

錯。FRIA 的核心責任方是 deployer；provider 主要面對技術文件、合格評估等供應方義務。

Exam fix：

```text
FRIA → deployer，上線前
技術文件 / Conformity Assessment → provider
```

---

## 10. Practice Questions

### 10.1 AI 風險類型

**Q1.** 某銀行 AI 貸款審核系統因訓練資料偏差，導致低收入族群核貸率系統性偏低。這屬於哪種 AI 風險？

答案：倫理風險（Ethical Risk）/ 基本權風險（Fundamental Rights Risk）。理由：核心是對特定族群產生不公平結果，且可能影響取得基本服務的權利。

**Q2.** AI 系統的第三方 API 突然失效，導致整條審核流程停擺。這屬於哪種 AI 風險？

答案：營運風險（Operational Risk）。理由：問題在供應商依賴與流程中斷，不是模型本身失準。

**Q3.** 招募 AI 遭 prompt injection 攻擊，導致履歷評分被操縱。這屬於哪種 AI 風險？

答案：資安風險（Security Risk）。理由：prompt injection 是攻擊型手法，屬於模型與系統被惡意操縱。

### 10.2 Risk Register 與量化工具

**Q4.** 風險登記簿最重要的三個持續治理欄位是哪些？

答案：owner、residual risk score、review date。理由：這三個欄位讓風險變成有人追、有剩餘分數、有時間點回頭看。

**Q5.** 某 AI 系統財務衝擊 2 分，但基本權衝擊 5 分。Impact 應填幾分？

答案：5 分。理由：AI 風險 impact 應看多面向並取最大值，不取平均。

**Q6.** 哪個概念決定 residual risk 低到什麼程度才可以接受上線？

答案：風險胃納（Risk Appetite）。理由：Risk Appetite 是組織設定的殘餘風險可接受上限。

### 10.3 EU AI Act

**Q7.** 某大型零售商依顧客購買紀錄、社群行為、地理位置給不同服務待遇。最可能落在 EU AI Act 哪一級？

答案：不可接受風險（Unacceptable Risk）中的 social scoring 題型。理由：題目重點是用多維個人資料評分並影響待遇。

**Q8.** 某公司在辦公室部署 AI 即時分析員工情緒。屬於哪一級？

答案：不可接受風險（禁止實務）。理由：職場情緒辨識是 Art.5 禁止實務。

**Q9.** 某銀行用 AI 模型自動給信用評分，直接影響貸款核准與利率。屬於哪一級？

答案：高風險（High Risk）。理由：信用評分屬基本服務（Essential Services）情境，可做但要重度合規。

**Q10.** 某電商使用 AI 聊天客服，但介面完全未說明正在與 AI 互動。屬於哪一級，需要做什麼？

答案：限制 / 透明風險（Limited / Transparency Risk），需要透明揭露。理由：使用者與 AI 互動時要知道對方是 AI。

**Q11.** 高風險與不可接受風險最大差異是什麼？

答案：高風險可以做，但要重度治理；不可接受風險原則上不能做。理由：前者是合規管理問題，後者是禁止線。

### 10.4 FRIA 與 NIST AI RMF

**Q12.** 公家機關計畫部署 AI 自動篩選補助申請資格，上線前需要做哪種評估？

答案：基本權影響評估（FRIA）思維最重要。理由：公部門高風險 AI 使用情境會影響申請人的基本權、申訴與程序正義。

**Q13.** FRIA 的主要責任方是誰？

答案：Deployer（使用方 / 部署方）。理由：FRIA 是高風險 AI 使用方在上線前要處理的基本權評估。

**Q14.** 設立 AI 治理委員會、訂定 AI 使用政策、設定 risk appetite，屬於 NIST AI RMF 哪個 function？

答案：Govern。理由：政策、問責、治理架構與風險胃納都是 Govern。

**Q15.** 執行 fairness test、分析 robustness 測試報告、蒐集偏差監測日誌，屬於哪個 function？

答案：Measure。理由：量測、驗證、測試、證據蒐集都是 Measure。

### 10.5 台灣法規與標準

**Q16.** 台灣《人工智慧基本法》的中央主管機關是哪個部會？

答案：國家科學及技術委員會（NSTC，國科會）。理由：AI 基本法明定中央主管機關為 NSTC。

**Q17.** 金管會 2024 年發布的《金融業運用 AI 指引》，法律性質是什麼？

答案：行政指導（Administrative Guidance），非強制法令。理由：FSC 發布時明確定位為提供金融業參考的行政指導。

**Q18.** 公司已通過 ISO/IEC 27001，想用它證明 AI 治理完整。這樣有什麼不足？

答案：27001 主要管資訊安全 CIA，不涵蓋 AI 特有的模型漂移、公平性、可解釋性、人類監督與基本權議題。理由：AI 治理需看 42001、NIST AI RMF 等 AI 專門框架。

**Q19.** 哪個標準是 AI 管理系統（AIMS）標準？

（A）ISO/IEC 23894:2023  （B）ISO/IEC 42001:2023  （C）ISO/IEC 27001  （D）NIST AI RMF

答案：（B）ISO/IEC 42001:2023。理由：42001 是 AI management system 標準；23894 是 AI 風險管理指引；27001 是資安標準；NIST AI RMF 是框架。

### 10.6 原則 Issuer 對照

**Q20.** 7 trustworthy AI requirements 包含 Human Agency and Oversight、Diversity, Non-discrimination and Fairness、Societal and Environmental Well-being。這是哪個組織提出的？

答案：HLEG（歐盟高階專家小組）。理由：這組 7 要求是 HLEG 的可信賴 AI 倫理要求，不是 EU AI Act 條文本身。

**Q21.** Microsoft 負責任 AI 6 原則中，哪一項較有辨識度？

答案：Inclusiveness（包容性）。理由：其他框架多強調 fairness / non-discrimination，Inclusiveness 是 Microsoft 原則中常被拿來辨識的項目。

### 10.7 綜合情境判斷

**Q22.** 某 AI 系統 inherent risk score 為 18，加入人工覆核與偏差監測後 residual risk 降至 8，而組織 risk appetite ceiling 為 10。應採取哪種 treatment？

答案：Accept（接受）。理由：residual risk 8 低於 appetite ceiling 10，可以接受並持續監控。

**Q23.** 某系統無論加多少控制，殘餘基本權風險仍不可接受，且使用場景落在 EU AI Act Art.5 禁止清單。應採取哪種 treatment？

答案：Avoid（避免）。理由：踩到禁止線且風險壓不下來，就應停用、取消或改變 use case。

**Q24.** 顧問建議先盤清楚 stakeholder、系統使用情境、可能影響哪些人。這對應 NIST AI RMF 哪個 function？

答案：Map。理由：盤點 use case、stakeholder、context 與 harm 都是 Map。

**Q25.** 台灣政府機關使用 AI 輔助社福審查，有沒有法規要求做風險評估？

答案：有，應想到 AI 基本法第 19 條。理由：政府使用 AI 執行業務或提供服務時，需進行風險評估並規劃風險因應措施。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. AI 風險七大類：技術、法遵、倫理、營運、資安、聲譽、基本權；impact 看多面向，取最大值。
2. Risk Register 是 living document，要有 owner、inherent score、controls、residual score、treatment、review date。
3. EU AI Act 口訣是「禁高透小」：禁止不能做，高風險可做但重管，透明風險要揭露，最小風險無特定 AI Act 義務。
4. FRIA 是 deployer 在特定高風險情境上線前做，範圍比 DPIA 廣；做了 DPIA 不等於做了 FRIA。
5. NIST AI RMF 是「治盤量管」：Govern、Map、Measure、Manage；Govern 是 cross-cutting。
6. ISO/IEC 42001 是 AI 管理系統標準；ISO/IEC 27001 管資安 CIA，不等於完整 AI 治理。
7. 台灣 AI 基本法主管機關是 NSTC；FSC 金融業 AI 指引是行政指導，不是強制法律。
8. HLEG 提出 7 trustworthy AI requirements；看到 issuer-matching 題不要把它誤認成 EU AI Act 條文。

---

## Final Study Advice

本課的核心不是背很多文件名稱，而是把情境題快速分類：

```text
這是什麼風險？        → 七大風險類型
要用什麼文件追？      → Risk Register
EU AI Act 哪一級？    → 禁高透小
NIST 對應哪個功能？   → 治盤量管
台灣是法律還是指引？  → AI 基本法 vs FSC 行政指導
ISO 在問哪種管理？    → 42001 AI / 23894 AI risk / 27001 資安
```

陷阱題大多來自混淆：把 chatbot 當最小風險、把高風險當禁止、把 DPIA 當 FRIA、把 27001 當完整 AI 治理、把 HLEG 當 EU AI Act 條文、把 FSC 指引當強制法律。考前把這六個混淆點練到能在 30 秒內判斷，本課就會穩很多。

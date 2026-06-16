# L23401 數據隱私、安全與合規 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」。中級起點在 ML lifecycle governance，所以這份指南不會重講「差分隱私機制（Differential Privacy mechanisms）」或「聯邦學習架構（Federated Learning architecture）」，那是 L22404 的事；本章直接進入資料、模型、推論、同意、刪除與退役如何被記錄、追蹤、稽核。

## 1. Exam Item Mapping

### 1a. 對應評鑑範圍

> 對應評鑑範圍：**L23401 數據隱私、安全與合規**

### 1b. How to Study This Chapter

1. 先讀 **Section 2 關鍵概念總覽圖**：先把本章想成「資料進來、模型產生、推論輸出、事後可查」的治理鏈，不要先背法條。
2. 再讀 **Section 3.1 與 3.2**：先理解資料安全性（Data Security）與資料來源溯源（Data Provenance & Lineage），因為後面的文件、稽核、刪除都要靠它們留下證據。
3. 接著讀 **Section 3.3**：模型卡（Model Card）與資料集說明書（Datasheet for Datasets）是本章最像「考試會問你選哪個文件」的高頻考點。
4. 再讀 **Section 3.4**：把個資法（Personal Data Protection Act, PDPA）與 GDPR 第 22 條（GDPR Article 22）讀成情境判斷，不要背成法學考試。
5. 最後讀 **Section 3.5、Section 4、Section 7**：把稽核日誌（Audit Log）、同意傳播（Consent Propagation）、模型退役（Model Retirement）練成「看到關鍵字就選治理措施」。
6. 考前 30 分鐘只看 **Section 5 口訣、Section 6 陷阱、Section 8 自我檢查**，用來抓易混淆選項。

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

- 判斷一個 ML 專案在資料蒐集、訓練、部署、推論、退役各階段需要留下哪些治理紀錄。
- 分辨資料來源溯源（Data Provenance）、資料血緣（Data Lineage）、資料稽核日誌（Audit Log）的用途差異。
- 說明模型卡（Model Card）與資料集說明書（Datasheet for Datasets）各自記錄什麼，以及考題場景該選哪一個。
- 將 GDPR 第 22 條（GDPR Article 22）與個資法（PDPA）映射到自動化決策、模型輸出、告知、查閱、更正、停止利用、刪除與安全維護情境。
- 為推論服務設計基本稽核紀錄欄位，能追蹤「誰在何時用哪個模型、輸入什麼類型資料、得到什麼輸出、依據哪個同意狀態」。
- 判斷同意撤回、個資刪除請求、模型退役時，應該啟動資料處理停止、模型影響評估、重新訓練或停用程序中的哪一種。

### 1e. 考點權重

| 考點 | 權重（🔥count） | 出處 |
|---|---:|---|
| 資料安全性（Data Security）與 ML 生命週期控制 | 🔥🔥 | 官方範圍「資料安全性」、NIST AI RMF 治理概念（SSDF 屬軟體開發安全框架，不適用於 AI 模型退役治理） |
| 隱私保護（Privacy Protection）與模型輸出個資風險 | 🔥🔥 | 官方範圍「隱私保護」、公告試題個資輸出情境 |
| 資料來源（Data Provenance）與資料血緣（Data Lineage） | 🔥🔥 | L23401 governance notes |
| 資料集說明書（Datasheet for Datasets） | 🔥🔥 | Datasheets for Datasets 文件化模式 |
| 模型卡（Model Card） | 🔥🔥🔥 | Model Cards for Model Reporting 文件化模式 |
| GDPR 第 22 條（GDPR Article 22）自動化決策 | 🔥🔥🔥 | GDPR / ICO automated decision-making guidance |
| 個資法（PDPA）告知、查閱、更正、停止、刪除、安全維護 | 🔥🔥🔥 | 個人資料保護法 |
| 推論稽核日誌（Inference Audit Logging） | 🔥🔥 | ML deployment governance / EU AI Act logging as background |
| 同意傳播（Consent Propagation） | 🔥🔥 | privacy governance chain |
| 模型退役（Model Retirement）與資料刪除程序 | 🔥🔥 | NIST AI RMF Manage 2.4 governance concept |
| L23401 / L22404 邊界判斷 | 🔥🔥 | scope boundary from research notes |

### 1f. 先備知識

- L22404：差分隱私（Differential Privacy）、聯邦學習（Federated Learning）、匿名化與隱私強化技術的機制層。
- L231 / L232 系列：機器學習（Machine Learning）基本訓練、驗證、部署流程。
- L233 系列：模型監控（Model Monitoring）、漂移（Drift）與重新訓練（Retraining）概念。
- 基礎法規概念：個人資料（Personal Data）、告知義務、目的限制、資料主體權利。

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [ML lifecycle compliance flow](diagrams/01-ml-lifecycle-compliance.md) | 看懂資料從蒐集到退役，每一站要留下什麼治理證據 |
| 2 | [Model card template structure](diagrams/02-model-card-structure.md) | 記住模型卡要描述用途、限制、評估、風險與監督 |
| 3 | [GDPR Article 22 decision tree](diagrams/03-gdpr-art22-decision-tree.md) | 判斷自動化決策是否落入 GDPR 第 22 條高風險情境 |
| 4 | [個資法 vs GDPR comparison](diagrams/04-pdpa-vs-gdpr.md) | 對照台灣個資權利與 GDPR 自動化決策保護重點 |
| 5 | [Inference audit logging architecture](diagrams/05-audit-logging-architecture.md) | 看懂推論服務如何記錄模型版本、請求、輸出、同意與稽核事件 |

## 2. 關鍵概念總覽圖 (Knowledge Tree)

這張圖不是要一次背完。先抓 3 層就好：
1. 最上層 mental model：L23401 是 **ML 生命週期治理（ML lifecycle governance）**。
2. 第二層：資料安全、文件化、法規遵循、推論稽核、同意與退役。
3. 第三層：每個治理動作都要留下可追蹤證據，而不是只說「我們有保護」。
讀下面的樹狀圖時，先看每一階段要回答的問題，再看哪個文件或紀錄能當證據。

```text
L23401 數據隱私、安全與合規
|
+-- A. 資料安全性 (Data Security)
|   |
|   +-- 存取控制 (Access Control)
|   +-- 加密與安全儲存 (Encryption & Secure Storage)
|   +-- 最小權限 (Least Privilege)
|   +-- 推論安全 (Inference Security)
|   +-- 安全事故紀錄與通知 (Incident Records & Notification)
|
+-- B. 隱私保護 (Privacy Protection)
|   |
|   +-- 個人資料辨識 (Personal Data Identification)
|   +-- 模型輸出是否含個資 (Personal Data in Model Outputs)
|   +-- 同意狀態 (Consent Status)
|   +-- 停止處理 / 刪除請求 (Stop Processing / Deletion Request)
|   +-- L22404 邊界：技術機制不在本章重教
|
+-- C. 資料來源與血緣 (Data Provenance & Lineage)
|   |
|   +-- 資料從哪裡來 (Source)
|   +-- 誰蒐集、何時蒐集、用於何目的 (Collector / Time / Purpose)
|   +-- 經過哪些清理與轉換 (Transformations)
|   +-- 進入哪個訓練集與模型版本 (Dataset / Model Version)
|
+-- D. 文件化 (Documentation)
|   |
|   +-- 資料集說明書 (Datasheet for Datasets)
|   |   +-- 動機、組成、蒐集、標註、限制、維護
|   |
|   +-- 模型卡 (Model Card)
|       +-- 預期用途、限制、評估、族群表現、倫理風險、監督方式
|
+-- E. 法規遵循 (Regulatory Compliance)
|   |
|   +-- 個資法 (PDPA)
|   |   +-- 告知、目的、查閱、更正、停止、刪除、安全維護
|   |
|   +-- GDPR Article 22
|       +-- solely automated decision
|       +-- legal or similarly significant effect
|       +-- human intervention / contest / meaningful information
|
+-- F. 上線後治理 (Post-deployment Governance)
    |
    +-- 推論稽核日誌 (Inference Audit Log)
    +-- 同意傳播 (Consent Propagation)
    +-- 個資刪除與模型影響評估 (Deletion & Model Impact Assessment)
    +-- 模型退役 / 停用 (Model Retirement / Deactivation)
```

## 3. Core Concepts

### 3.1 資料安全性與 ML 生命週期（Data Security in ML Lifecycle）🔥🔥

**先懂一句話：**
資料安全性不是只有把資料庫鎖起來，而是讓資料從蒐集、訓練、部署到推論都能被保護、被記錄、被追責。

**它在流程中的位置：**
資料蒐集 → 資料儲存 → 資料處理 → 模型訓練 → 模型部署 → **推論與稽核安全** → 事故回應

#### 白話說明 🗣️

想像你在 7-11 或全家使用會員 App，系統可能記錄購買品項、點數、門市與時間。這些資料如果被拿去訓練推薦模型，安全性（Data Security）就不能只看「資料庫有沒有密碼」，還要看：

- 誰可以看原始資料？
- 誰可以匯出訓練資料？
- 模型部署後，誰可以呼叫推論 API？
- 模型輸出是否可能把姓名、電話、交易資訊吐出來？
- 事後能不能查到哪個帳號、哪個模型版本、哪一次請求造成問題？

L23401 的重點是 🔥**治理證據（Governance Evidence）**。考題通常不會要你設計加密演算法，而是問你「哪個控制措施最能降低風險」或「要保留什麼紀錄才能追蹤責任」。

#### ML 生命週期的安全控制

```text
資料蒐集
  -> 告知目的、確認合法來源、記錄同意
資料儲存
  -> 加密、權限控管、備份、存取紀錄
資料處理
  -> 清理、去識別化狀態記錄、轉換紀錄
模型訓練
  -> 訓練資料版本、實驗紀錄、模型版本
模型部署
  -> API 權限、模型卡、上線審查
推論服務
  -> 請求紀錄、輸出紀錄、模型版本、同意狀態
事故回應
  -> 停用、通知、補救、稽核報告
```

#### 常見安全風險與 L23401 解法

| 風險 | 白話場景 | L23401 看到什麼 | 考試常選治理措施 |
|---|---|---|---|
| 未授權存取（Unauthorized Access）🔥 | 工讀生可以下載全公司會員資料 | 權限過大 | 最小權限（Least Privilege）、存取紀錄（Access Log） |
| 資料外洩（Data Breach）🔥🔥 | 客服模型輸出使用者電話 | 輸出含個資 | 輸出稽核、敏感資訊偵測、事故通報流程 |
| 模型反推（Model Inversion）🔥 | 從模型回覆重建訓練樣本（如還原人臉影像）；不只是推測統計特徵，而是重建原始輸入 | 隱私風險 | 風險評估、輸出限制、模型卡揭露限制 |
| 成員推論（Membership Inference）🔥 | 猜某人資料是否在訓練集中 | 隱私風險 | 測試與文件化、資料最小化、監控異常查詢 |
| 資料投毒（Data Poisoning）🔥 | 惡意標註讓模型偏向錯誤分類 | 資料完整性 | 來源追蹤、資料驗證、版本回滾 |

#### 先問自己一個問題

如果 YouTube 推薦模型突然推薦出不當內容，主管問「這個結果怎麼來的？」你要能回答四件事：

1. 用的是哪個模型版本？
2. 推論時用了哪些輸入欄位？
3. 這些輸入資料是否有合法來源與同意？
4. 當時有沒有留下可稽核紀錄？

#### Code Pattern 認識就夠

推論稽核日誌（Inference Audit Log）不是要考你寫完整後端，而是要看得懂欄位用途。

```python
# inference logging pseudocode
audit_event = {
    "event_id": "evt_20260616_0001",
    "timestamp": "2026-06-16T10:30:00+08:00",
    "user_id_hash": "hash(user-123)",
    "model_name": "credit_risk_classifier",
    "model_version": "v3.2.1",
    "dataset_version": "loan_dataset_2026Q2",
    "input_schema": ["age_range", "income_band", "employment_status"],
    "output_type": "risk_score",
    "decision_id": "decision_abc",
    "consent_status": "valid",
    "purpose": "loan_pre_screening",
    "human_review_required": True
}
write_audit_log(audit_event)
```

這段的考點不是 Python 語法，而是 🔥🔥**模型版本、資料版本、同意狀態、推論目的、人類複核** 都要能追蹤。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| GenAI 客服回覆中出現客戶姓名與電話 | 建立輸出稽核、敏感資訊偵測、事件紀錄與補救流程 | 只增加模型參數或訓練更多資料 |
| 推論 API 被內部人員大量查詢會員資料 | 啟用存取控制、速率限制、稽核日誌與異常監控 | 只把訓練資料匿名化就好 |
| 模型結果被質疑，團隊查不到當時模型版本 | 建立模型版本與推論紀錄 | 重跑最新模型並宣稱結果一致 |
| 資料可能被惡意標註污染 | 追蹤資料來源、標註者、版本與驗證紀錄 | 只在部署後看準確率 |

#### Exam Rule

題目看到「誰看過、誰呼叫、哪個版本、何時輸出、事故追查」→ 優先選 **稽核紀錄（Audit Logging）**、**存取控制（Access Control）**、**版本追蹤（Version Tracking）**。

### 3.2 資料來源與溯源（Data Provenance & Lineage）🔥🔥

**先懂一句話：**
資料來源與溯源是在回答「這筆資料從哪裡來、經過哪些處理、最後影響哪個模型」。

**它在流程中的位置：**
資料蒐集 → **資料來源與溯源** → 資料清理/轉換 → 訓練資料集版本 → 模型版本 → 推論結果追蹤

#### 白話說明 🗣️

把資料血緣（Data Lineage）想成蝦皮包裹的物流追蹤。你不只想知道包裹現在在哪裡，還想知道它從哪個倉庫出來、經過哪個轉運站、誰簽收。資料也是一樣：

- 來源（Source）：資料從 LINE 官方帳號、Instagram 表單、104 人力銀行履歷，還是內部 CRM 來？
- 目的（Purpose）：原本蒐集是為了客服、行銷、推薦，還是徵才媒合？
- 轉換（Transformation）：是否清理、合併、標註、去識別化、抽樣？
- 版本（Version）：進入哪個資料集版本與模型版本？
- 權利狀態（Rights Status）：同意是否有效？是否已撤回？是否有刪除請求？

#### Data Provenance vs Data Lineage

| 名詞 | 一句話 | 偏重問題 |
|---|---|---|
| 資料來源（Data Provenance）🔥🔥 | 資料的身分證與出生紀錄 | 這筆資料從哪裡來？誰蒐集？合法目的為何？ |
| 資料血緣（Data Lineage）🔥🔥 | 資料一路被加工的履歷 | 它經過哪些清理、轉換、合併，最後餵給哪個模型？ |

```text
LINE 問卷資料
  -> raw_survey_2026_06
  -> remove_invalid_rows
  -> join_member_profile
  -> training_dataset_v5
  -> recommendation_model_v2.0
  -> 推論結果 decision_9321
```

#### 為什麼考試愛考這個？

因為資料治理題常常不是問「模型準不準」，而是問「出事後能不能追」。例如：

- 使用者要求刪除個資時，能不能知道這筆資料進過哪些訓練資料集？
- 發現某批資料來源未取得同意時，能不能知道哪些模型受影響？
- 模型輸出疑似歧視某族群時，能不能回頭檢查資料組成與標註方式？

#### 溯源紀錄應該包含什麼？

| 欄位 | 用途 | 考試記法 |
|---|---|---|
| source_system | 原始系統 | 從哪裡來 |
| collection_time | 蒐集時間 | 何時來 |
| legal_basis / consent_id | 法律依據或同意 ID | 為什麼能用 |
| purpose | 使用目的 | 能不能拿去訓練 |
| transformation_steps | 清理與轉換 | 中間做了什麼 |
| dataset_version | 資料集版本 | 進哪包資料 |
| model_version | 模型版本 | 影響哪個模型 |
| retention_policy | 保存期限 | 何時刪或停用 |

#### Code Pattern 認識就夠

```python
# data provenance tracking pseudocode
record_provenance(
    record_id="member_789",
    source_system="LINE_campaign_form",
    collection_time="2026-06-16T09:00:00+08:00",
    consent_id="consent_456",
    purpose="personalized_coupon_recommendation",
    transformations=[
        "validate_required_fields",
        "hash_phone_number",
        "join_purchase_history",
        "bucket_age_range"
    ],
    dataset_version="coupon_dataset_v12",
    model_version="coupon_ranker_v4"
)
```

如果題目問「刪除請求要怎麼找到受影響模型？」答案通常不是「立刻刪掉所有模型」，而是先靠 🔥🔥**資料血緣（Data Lineage）** 找出受影響資料集與模型版本，再做影響評估。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 使用者撤回 LINE 活動同意，團隊不知道資料進過哪些模型 | 建立 consent_id 到 dataset_version / model_version 的 lineage | 只刪除 LINE 表單原始檔 |
| 某批 Instagram 表單來源未完成告知 | 用 provenance 查來源、目的、蒐集時間與受影響資料集 | 直接提高模型準確率 |
| 104 履歷推薦模型被質疑使用過期資料 | 檢查資料保存期限、版本與轉換紀錄 | 只更新模型卡封面日期 |
| 大學分組專題合併多份問卷，後來查不到欄位來源 | 建立欄位級 lineage 與 transformation log | 只保留最後 CSV |

#### Exam Rule

題目看到「資料從哪裡來、經過哪些轉換、影響哪個模型、刪除請求要追到哪裡」→ 選 **資料來源/血緣（Data Provenance & Lineage）**。

### 3.3 模型文件化（Model Cards & Datasheets）🔥🔥🔥

**先懂一句話：**
模型文件化是在替資料與模型留下「使用說明書」，讓別人知道它能做什麼、不能做什麼、用什麼資料做出來、有哪些限制。

**它在流程中的位置：**
資料蒐集 → 資料集建立 → **Datasheet for Datasets** → 模型訓練/評估 → **Model Card** → 部署審查 → 監控與退役

#### 白話說明 🗣️

你在蝦皮買電器會看商品規格、適用電壓、保固、注意事項。AI 模型也需要類似文件：

- 資料集說明書（Datasheet for Datasets）🔥：這包資料是怎麼來的？誰標註？有哪些限制？
- 模型卡（Model Card）🔥🔥🔥：這個模型用途是什麼？表現如何？哪些族群或場景不適合？上線後誰負責監督？

考試常用情境是：「公司要把模型交給業務、法務、資安或客戶使用，應該提供什麼文件？」如果焦點是模型本身，選模型卡；如果焦點是資料集來源與組成，選資料集說明書。

#### 文件化不是法律免死金牌

模型卡（Model Card）是文件化最佳實務（documentation best practice），不是「做了就一定合法」的法律合規證書。它可以幫助審查、溝通與風險管理，但仍需要搭配個資法、GDPR、公司內控、稽核與人類複核流程。

#### Model Card 常見內容

| 區塊 | 要回答的問題 | 考試關鍵字 |
|---|---|---|
| Model Details | 模型名稱、版本、負責團隊 | model version、owner |
| Intended Use | 預期用途與不適用用途 | intended use、out-of-scope use |
| Factors | 影響模型表現的重要因素 | subgroup、scenario |
| Metrics | 評估指標與測試資料 | accuracy、precision、recall、fairness metric |
| Evaluation Data | 評估資料來源 | validation data |
| Ethical Considerations | 風險、偏誤、隱私限制 | bias、privacy、human review |
| Caveats / Recommendations | 限制與使用建議 | limitations、monitoring |

#### Datasheet 常見內容

| 區塊 | 要回答的問題 | 考試關鍵字 |
|---|---|---|
| Motivation | 為什麼建立資料集 | purpose |
| Composition | 資料包含哪些欄位與族群 | fields、population |
| Collection Process | 如何蒐集與標註 | source、annotation |
| Preprocessing | 做了哪些清理與轉換 | transformation |
| Uses | 適合與不適合用途 | recommended use |
| Distribution | 誰可以取得 | access |
| Maintenance | 誰維護、何時更新或刪除 | retention、update |

#### 一張圖記住兩份文件

```text
資料集 (Dataset)
  |
  +-- Datasheet for Datasets
  |     -> 來源、組成、蒐集、標註、限制、維護
  |
  v
模型 (Model)
  |
  +-- Model Card
        -> 用途、版本、評估、限制、族群表現、監督
```

#### Code Pattern 認識就夠

```text
# Model Card template structure

model_card:
  model_details:
    name: "resume_screening_model"
    version: "v2.1"
    owner: "HR analytics team"
  intended_use:
    primary_use: "assist recruiter in prioritizing applications"
    out_of_scope: "fully automated hiring rejection"
  training_data:
    dataset_version: "resume_dataset_2026Q1"
    datasheet_link: "datasheets/resume_dataset_2026Q1.md"
  evaluation:
    metrics: ["precision", "recall", "false_negative_rate_by_group"]
    test_period: "2026Q1"
  limitations:
    - "not reliable for applicants outside supported job families"
    - "requires human review before final decision"
  ethical_considerations:
    - "risk of bias from historical hiring data"
    - "personal data must follow consent and retention policy"
  monitoring:
    audit_log: "enabled"
    review_owner: "model governance committee"
```

這份結構讓你在考場快速判斷：🔥🔥🔥「模型用途、限制、評估、人類監督」就是模型卡；「資料來源、組成、蒐集、維護」就是資料集說明書。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 公司要部署貸款風險模型，主管問模型適用族群與限制 | 建立模型卡（Model Card） | 只提供原始訓練 CSV |
| 團隊要檢查訓練資料是否含特定來源與標註流程 | 查資料集說明書（Datasheet） | 查模型卡的 accuracy 欄位 |
| 客戶問模型能否用在完全自動拒絕求職者 | 在 Model Card 寫明 intended use、out-of-scope、human review | 宣稱模型分數高就能自動拒絕 |
| 發現模型對某族群表現差異大 | 在 Model Card 記錄 subgroup metrics、limitations、monitoring plan | 只刪除不利案例 |

#### Exam Rule

題目看到「模型用途、限制、表現、族群差異、上線審查」→ 選 **Model Card**；看到「資料來源、組成、蒐集、標註、維護」→ 選 **Datasheet for Datasets**。

### 3.4 法規遵循：個資法與 GDPR（Regulatory Compliance）🔥🔥🔥

**先懂一句話：**
法規遵循不是叫你背完整法條，而是判斷「這個模型是否處理個資、是否做重大自動化決策、資料主體能不能行使權利」。

> ⚠️ 版本注意：台灣個資法於 2025-11-11 修正，部分條文仍在等待施行日期。本章以現行通說條文為基礎；若考題涉及具體條號，請以考前最新公告版本為準。

**它在流程中的位置：**
資料蒐集/告知 → 資料處理/利用 → 模型訓練 → 模型輸出 → **個資法與 GDPR 判斷** → 人類複核/停止處理/刪除/稽核

#### 白話說明 🗣️

想像 104 人力銀行用 AI 幫企業篩履歷。如果模型只是「排序建議」，且最後由 HR 人員判斷，風險仍然存在，但治理重點是透明、文件化與人類審查。如果模型「完全自動拒絕」某位求職者，且對工作機會造成重大影響，GDPR 第 22 條（GDPR Article 22）就會變成高風險考點。

#### 個資法（PDPA）在模型情境的讀法

個資法重點不是問你背條號，而是問你能不能把資料主體權利映射到 ML 流程。

| 個資法治理問題 | ML 情境 | 考試快判 |
|---|---|---|
| 是否為個人資料（Personal Data）🔥🔥🔥 | 模型輸出含姓名、電話、交易紀錄、履歷特徵 | 可識別自然人 → 當個資處理 |
| 是否已告知目的 | 會員資料原本只說客服，後來拿去推薦訓練 | 目的不一致 → 需檢查告知/同意/法律依據 |
| 查閱與更正 | 使用者要求查看或修正履歷資料 | 要有資料定位與更正流程 |
| 停止處理/利用 | 使用者撤回行銷推薦同意 | 停止新處理，更新 consent 狀態 |
| 刪除 | 使用者要求刪除個資 | 查 lineage，評估資料集與模型影響 |
| 安全維護 | 資料外洩或未授權存取 | 權限、加密、紀錄、事故處理 |

#### GDPR Article 22 的考試讀法

GDPR 第 22 條常被誤背成「任何 AI 輸出都有絕對解釋權」。考試要抓更精準的條件：

```text
是否 solely automated decision?
  |
  +-- No -> 仍需透明、隱私與治理，但 Article 22 強度較低
  |
  +-- Yes
       |
       +-- 是否造成 legal or similarly significant effect?
            |
            +-- No -> 注意一般資料保護與告知
            |
            +-- Yes
                 |
                 +-- 是否符合 Art. 22(2) 例外條款之一？
                 |   (a) 為訂立或履行契約所必要
                 |   (b) 歐盟或成員國法律明文授權
                 |   (c) 資料主體明確同意（explicit consent）
                 |
                 +-- 不符合任一例外 -> 禁止進行，須加入人類介入流程
                 |
                 +-- 符合例外 (a) 或 (c) -> 仍須啟動額外保障（Art. 22(4)）:
                         - human intervention（人類介入）
                         - express viewpoint（讓資料主體表達意見）
                         - contest decision（可申訴或挑戰決定）
                         - meaningful information about logic（有意義資訊）
                         - document lawful basis（記錄合法依據）
```

#### Right to Explanation 要怎麼講才安全？

在本章，建議用「有意義資訊（meaningful information）」與「保障措施（safeguards）」來講，不要說成「使用者一定可以看到完整模型內部權重」。考試看到：

- solely automated decision
- legal effect
- similarly significant effect
- 被拒貸、被拒保、被自動拒絕錄取
- 不能申訴、沒有人類審查
- ⚠️ 例外：若符合 Art. 22(2) 例外條款（契約必要、法律授權、明確同意），自動化決策仍可進行，但仍須提供 human intervention、表達意見、申訴、有意義資訊等保障（Art. 22(4)）。

就選 GDPR Article 22 相關保護：人類介入（human intervention）、表達意見（express viewpoint）、異議/挑戰決定（contest decision）、說明邏輯與影響。

#### 個資法 mapping 到模型輸出

```text
模型輸出
  |
  +-- 無法識別個人?
  |     -> 仍做安全治理，但個資法風險較低
  |
  +-- 可識別自然人?
        -> 個人資料
        -> 檢查目的、告知、同意/法律依據
        -> 提供查閱、更正、停止、刪除流程
        -> 記錄稽核與安全維護
```

#### Code Pattern 認識就夠

> 此小節無對應程式 pattern — 考試以概念辨識為主。法規題要判斷情境條件與治理措施，不是寫法條或程式。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| AI 系統完全自動拒絕貸款申請，且無人工申訴 | GDPR Article 22 safeguards：人類介入、可申訴、有意義資訊 | 說任何 AI 模型都必須公開全部參數 |
| 推薦系統輸出使用者姓名、電話、交易內容 | 視為個資風險，啟動個資法安全維護與輸出稽核 | 因為是模型輸出所以不算個資 |
| 使用者要求停止行銷推薦 | 更新同意狀態、停止相關處理/利用、記錄處理結果 | 直接刪除所有模型而不查影響 |
| HR 模型只是輔助排序，最後由人資決定 | 仍需透明、文件與人類審查紀錄；Article 22 條件需視是否 solely automated | 認定所有排序都完全禁止 |

#### Exam Rule

題目看到「完全自動化 + 法律或重大影響」→ 選 **GDPR Article 22 safeguards**；看到「可識別自然人、告知、查閱、更正、停止、刪除、安全維護」→ 選 **個資法（PDPA）治理流程**。

### 3.5 模型稽核、同意傳播與退役（Audit Logging, Consent Propagation, Model Retirement）🔥🔥

**先懂一句話：**
模型上線後不是放著就好，而是要記錄每次推論、把同意狀態一路傳到決策、並在模型不適合時停用或退役。

**它在流程中的位置：**
模型部署 → 推論服務 → **稽核日誌 + 同意檢查** → 權利請求/事故處理 → 模型監控 → **模型退役**

#### 白話說明 🗣️

想像 Uber Eats 發優惠券。使用者可能同意接收餐飲推薦，但不一定同意把資料用於信用評分。若使用者撤回同意，系統不能只在會員頁面顯示「已撤回」，還要把這個狀態傳到推薦模型、推論 API、行銷名單與後續稽核紀錄。

這就是同意傳播（Consent Propagation）🔥🔥：同意不是一張靜態表單，而是一個會影響資料處理、模型推論與決策的狀態。

#### 推論稽核日誌要記什麼？

| 類別 | 欄位例子 | 為什麼重要 |
|---|---|---|
| 身分與時間 | event_id、timestamp、requester_id | 查誰在何時呼叫 |
| 模型資訊 | model_name、model_version | 查哪個模型做出結果 |
| 資料資訊 | dataset_version、input_schema | 查資料來源與欄位 |
| 同意狀態 | consent_id、consent_status、purpose | 查是否可用於該目的 |
| 決策資訊 | output_type、decision_id、human_review_required | 查是否重大決策與是否需人工 |
| 安全事件 | anomaly_flag、incident_id | 連到事故回應 |

#### 同意傳播流程

```text
資料主體同意 / 撤回
  -> consent registry 更新
  -> data processing pipeline 檢查 purpose
  -> training dataset eligibility 更新
  -> inference service 檢查 consent_status
  -> audit log 記錄處理結果
  -> 若已影響模型，啟動 model impact assessment
```

#### 模型退役（Model Retirement）什麼時候發生？

模型退役不是「模型爛了就刪掉」。它是治理程序，常見原因包括：

- 模型使用目的已結束。
- 訓練資料的保存期限或合法使用狀態改變。
- 模型表現不再符合預期用途。
- 模型輸出造成隱私、安全或合規風險。
- 新模型取代舊模型，需要停用舊 API、封存文件與保存稽核紀錄。

```text
監控發現問題 / 合規條件改變
  -> 風險評估
  -> 暫停或限制使用
  -> 通知 owner / governance committee
  -> 決定 rollback, retrain, deactivate, retire
  -> 封存 model card, datasheet, audit logs
  -> 更新使用者或業務流程
```

#### 刪除資料後，模型就安全了嗎？

不一定。刪除原始訓練資料（training data deletion）不代表模型完全沒有個資風險，因為模型可能已學到可被反推的資訊，或仍可透過輸出洩漏敏感內容。因此 L23401 的答案通常是：

1. 先用 lineage 找受影響資料集與模型。
2. 評估模型是否仍有個資或推論風險。
3. 決定停止新處理、重新訓練、限制輸出、退役或替換模型。
4. 保存稽核證據與處理紀錄。

#### Code Pattern 認識就夠

```sql
-- audit log query snippet (pseudocode: 'hash(user-123)' 代表預先計算的雜湊值，非 SQL 函式呼叫)
SELECT
  timestamp,
  requester_id,
  model_name,
  model_version,
  decision_id,
  consent_status,
  purpose,
  human_review_required
FROM inference_audit_log
WHERE user_id_hash = 'hash(user-123)'
  AND purpose = 'personalized_marketing'
  AND timestamp >= '2026-06-01'
ORDER BY timestamp DESC;
```

```python
# consent check before inference
def predict_with_consent(user_id, purpose, features):
    consent = consent_registry.lookup(user_id=user_id, purpose=purpose)

    if consent.status != "valid":
        log_audit_event(
            user_id=user_id,
            purpose=purpose,
            result="blocked",
            reason="invalid_or_withdrawn_consent"
        )
        return {"status": "blocked", "reason": "consent_not_valid"}

    result = model.predict(features)
    log_audit_event(
        user_id=user_id,
        purpose=purpose,
        result="allowed",
        model_version=model.version
    )
    return result
```

考試要看懂：🔥🔥 同意狀態應該在推論前檢查，而且被阻擋也要記錄。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 使用者撤回個人化推薦同意，但系統仍發送推薦 | 建立 consent propagation，推論前檢查 consent_status | 只在隱私權政策加一句說明 |
| 公司要查某次拒貸決策由哪個模型產生 | 查 inference audit log 的 model_version、decision_id、timestamp | 查訓練程式碼註解 |
| 模型使用目的結束但 API 仍可呼叫 | 啟動 model retirement，停用 API、封存紀錄、通知 owner | 只把模型卡移到舊資料夾 |
| 使用者要求刪除資料，資料曾進入多個模型 | 用 lineage 做 impact assessment，再決定 retrain / restrict / retire | 立刻刪除所有模型與日誌 |

#### Exam Rule

題目看到「推論紀錄、同意撤回、決策可追蹤、模型停用、刪除後模型風險」→ 選 **Audit Logging + Consent Propagation + Model Retirement**。

## 4. Comparison Tables (易混淆概念)

### 4.1 Model Card vs Datasheet for Datasets

| 比較點 | Model Card（模型卡） | Datasheet for Datasets（資料集說明書） |
|---|---|---|
| 核心角色 | 說明模型如何被使用與限制 | 說明資料集如何被建立與維護 |
| 主要對象 | 模型使用者、產品、法務、治理委員會 | 資料科學家、資料治理、模型訓練團隊 |
| 記錄內容 | 模型版本、預期用途、評估指標、族群表現、限制、監控 | 資料來源、組成、蒐集、標註、清理、授權、保存 |
| 常見題目 | 「模型能不能用在這個場景？」 | 「資料從哪裡來、是否適合訓練？」 |
| 風險焦點 | 模型輸出、錯用、偏誤、人類監督 | 資料品質、同意、代表性、保存期限 |
| 是否等於合規證書 | 不是，是文件化最佳實務 | 不是，是資料治理文件 |

> 考試快判：看到「模型用途/限制/評估」→ Model Card；看到「資料來源/組成/蒐集」→ Datasheet for Datasets

### 4.2 GDPR Article 22 vs 個資法 第8條

| 比較點 | GDPR Article 22 | 個資法第 8 條告知義務 |
|---|---|---|
| 核心問題 | 是否受到完全自動化且有重大影響的決策 | 蒐集個資時是否告知必要事項 |
| 典型情境 | 自動拒貸、自動拒保、自動淘汰求職者 | App 蒐集姓名、電話、交易資料、履歷資料 |
| 主要保護 | 人類介入、表達意見、挑戰決定、有意義資訊 | 告知機關名稱、目的、類別、期間、地區、對象、方式、權利 |
| 考試關鍵字 | solely automated、legal effect、similarly significant effect | 告知、蒐集目的、個資類別、權利行使 |
| 常見誤解 | 不是任何 AI 輸出都有絕對解釋權 | 不是只有紙本表單才需要告知 |
| ML 治理連結 | 模型卡、人類複核、決策稽核 | consent registry、purpose mapping、data lineage |

> 考試快判：看到「完全自動化重大決策」→ GDPR Article 22；看到「蒐集個資前要說明目的與權利」→ 個資法第 8 條告知義務

### 4.3 資料稽核日誌 vs 資料溯源

| 比較點 | 資料稽核日誌（Audit Log） | 資料溯源（Data Provenance & Lineage） |
|---|---|---|
| 一句話 | 記錄誰在何時做了什麼 | 記錄資料從哪來、怎麼變、到哪去 |
| 時間焦點 | 事件發生當下 | 資料生命週期 |
| 常見欄位 | timestamp、actor、action、model_version、decision_id | source、purpose、transformation、dataset_version、model_version |
| 最適合回答 | 誰呼叫模型？哪次輸出出問題？ | 哪批資料影響哪個模型？ |
| 常見場景 | 推論查詢、事故調查、權限濫用 | 刪除請求、資料來源不合法、資料品質追蹤 |
| 考試陷阱 | 只把它當資安事件紀錄 | 只保留最終資料集，不保留加工歷程 |

> 考試快判：看到「誰/何時/哪次事件」→ Audit Log；看到「來源/轉換/影響哪個模型」→ Data Provenance & Lineage

### 4.4 同意撤回 vs 被遺忘權/刪除

| 比較點 | 同意撤回（Consent Withdrawal） | 被遺忘權/刪除（Right to Erasure / Deletion） |
|---|---|---|
| 核心意思 | 不再同意後續特定目的處理 | 要求刪除或停止保留特定個資 |
| 第一個動作 | 更新 consent_status，停止新處理 | 定位資料、確認可刪範圍、執行刪除或限制 |
| ML 影響 | 推論前目的檢查、停止個人化推薦 | lineage 追到資料集與模型，做 impact assessment |
| 不等於 | 不一定要立即刪除所有模型 | 不一定代表所有稽核紀錄都可刪 |
| 常見場景 | 取消行銷推薦、取消個人化 | 要求刪除帳號資料、刪除履歷資料 |
| 治理證據 | consent registry、blocked inference log | deletion request log、lineage report、retirement/retrain decision |

> 考試快判：看到「撤回同意/停止後續用途」→ Consent Withdrawal；看到「刪除個資/被遺忘」→ Right to Erasure / Deletion

> ⚠️ 補充：GDPR 第 17 條「被遺忘權（Right to Erasure）」有六項行使要件（同意撤回、目的已達、違法處理等），並有例外得以拒絕刪除（如法律義務、公共利益、學術研究、法律主張）。台灣個資法第 11 條刪除權條件不同。考題若問「什麼情況下可以拒絕刪除」，需區分 GDPR 第 17(3) 條例外與個資法情境。

## 5. 口訣 / Mnemonics

### 5.1 ML 治理鏈口訣：源、表、卡、記、同、退

```text
源：Data Provenance，先知道資料從哪來
表：Datasheet，把資料集說清楚
卡：Model Card，把模型用途與限制說清楚
記：Audit Log，把推論與決策記下來
同：Consent Propagation，把同意狀態一路傳下去
退：Model Retirement，不適合就停用、封存、退役
```

記法：**源表卡記同退**。像做大學分組專題，先交代資料來源，再交資料表說明，再交模型說明，展示時留下紀錄，取得同意，最後專題結束要封存。

### 5.2 GDPR Article 22 safeguards 口訣：人、說、爭、懂

```text
人：human intervention，人類介入
說：express viewpoint，讓資料主體表達意見
爭：contest decision，可以挑戰或申訴決定
懂：meaningful information，提供有意義資訊理解邏輯與影響
```

記法：看到「自動化重大決策」就想 **人說爭懂**。

### 5.3 個資法 data subject rights 口訣：查、閱、製、補、更、停、刪

```text
查：查詢
閱：閱覽
製：製給複製本
補：補充
更：更正
停：停止蒐集、處理或利用
刪：刪除
```

考試不用背成法律條文，但要知道資料主體不是只能「看資料」，也可能要求更正、停止利用與刪除。

### 5.4 Model Card key components 口訣：名、用、數、評、限、管

```text
名：model details，模型名稱、版本、負責人
用：intended use，預期用途與不適用用途
數：data，訓練/評估資料來源
評：metrics and evaluation，評估指標與族群表現
限：limitations，限制、風險、偏誤
管：monitoring and governance，監控、人類審查、退役條件
```

記法：模型卡就是模型的「名用數評限管」。

## 6. 考試陷阱 (Exam Traps)

❌ 陷阱：GDPR Article 22 gives an absolute right to explanation of any AI model output。

✅ 正解：GDPR 第 22 條重點是「完全自動化（solely automated）且造成法律或類似重大影響（legal or similarly significant effect）」的決策，並要求人類介入、可申訴與有意義資訊等保障；不是任何 AI 輸出都能要求完整公開模型內部。

❌ 陷阱：Model card is a legal compliance document。

✅ 正解：模型卡（Model Card）是文件化最佳實務，能幫助透明度、審查、風險管理與問責，但不能單獨取代個資法、GDPR、資安控制或公司稽核。

❌ 陷阱：Deleting training data after model is trained removes all personal data risks。

✅ 正解：刪除訓練資料不一定消除模型隱私風險；模型可能仍保留可被反推的資訊或在輸出中洩漏敏感資料，因此要做 lineage 追蹤、模型影響評估、重新訓練、限制或退役。

❌ 陷阱：Differential privacy implementation is an L23401 topic。

✅ 正解：差分隱私（Differential Privacy）的 epsilon、加噪、機制設計屬於 L22404；L23401 只需要知道若專案採用了隱私技術，應在 datasheet / model card / governance record 中文件化。

❌ 陷阱：Audit logs are only needed for cybersecurity incidents。

✅ 正解：稽核日誌（Audit Logs）也用於推論追蹤、模型版本追蹤、同意狀態檢查、資料主體請求處理、自動化決策申訴與合規稽核。

❌ 陷阱：Consent withdrawal means immediate model deletion。

✅ 正解：同意撤回（Consent Withdrawal）通常先停止特定目的的新處理與推論，更新 consent registry，再用 lineage 評估是否影響訓練資料與模型；不等於不分情境立即刪掉所有模型。

❌ 陷阱：只要模型準確率高，就可以用於自動拒貸或自動拒絕求職者。

✅ 正解：準確率不能取代合規。若是完全自動化且造成重大影響的決策，需要人類介入、申訴管道、文件化與可稽核紀錄。

❌ 陷阱：資料集說明書與模型卡內容差不多，可以互相替代。

✅ 正解：Datasheet 記錄資料集來源、組成與維護；Model Card 記錄模型用途、評估、限制與監督。考題會用「資料」或「模型」焦點來區分。

❌ 陷阱：模型退役只是在伺服器刪除模型檔。

✅ 正解：模型退役（Model Retirement）包含停用 API、封存模型卡與稽核紀錄、通知 owner、處理依賴系統、確認新舊模型切換與保留必要證據。

## 7. 情境題快速判斷 (Scenario Quick-Judge)

🔑 看到關鍵字 → 選這個答案

- 模型文件/透明度 → 模型卡（Model Card）
- 資料來源追蹤 → 資料來源（Data Provenance）
- 自動化決策/重大影響 → GDPR Article 22 safeguards
- 個資刪除請求/部署模型 → Data Lineage + Model Impact Assessment
- 稽核日誌/推論記錄 → Inference Audit Logging
- 同意撤回/資料處理停止 → Consent Propagation + Stop Processing
- 模型退役/停用程序 → Model Retirement / Deactivation
- 資料血緣/lineage → Data Lineage
- 安全事故通知 → Incident Response + Security Maintenance Record
- 模型輸出姓名電話 → Personal Data in Model Output + Output Audit
- 資料集組成/標註流程 → Datasheet for Datasets
- 模型族群表現差異 → Model Card + subgroup evaluation
- 權限過大/未授權下載 → Access Control + Least Privilege + Audit Log
- 找不到哪個版本做出決策 → Model Versioning + Inference Audit Log
- 目的外使用會員資料 → Purpose Limitation + Consent / Legal Basis Check
- 使用者要求更正資料 → Data Subject Rights Handling + Lineage Update
- 舊模型仍被 API 呼叫 → Retirement Governance + API Deactivation
- 法規題問人類複核 → Human Intervention / Human Review
- 資料被投毒或來源可疑 → Provenance + Data Validation + Version Rollback
- 題目選項出現 differential privacy epsilon → 多半是 L22404，除非題目只問文件化或治理紀錄

## 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內解釋 **資料安全性（Data Security）** 為什麼要涵蓋蒐集、儲存、訓練、部署、推論與事故回應。
- [ ] 我能在 30 秒內分辨 **資料來源（Data Provenance）** 與 **資料血緣（Data Lineage）**，並說出刪除請求為何需要 lineage。
- [ ] 我能在 30 秒內說出 **模型卡（Model Card）** 的「名、用、數、評、限、管」。
- [ ] 我能在 30 秒內分辨 **Model Card** 與 **Datasheet for Datasets**：一個講模型，一個講資料集。
- [ ] 我能在 30 秒內判斷 **GDPR Article 22** 何時啟動：完全自動化 + 法律或類似重大影響。
- [ ] 我能在 30 秒內把 **個資法（PDPA）** 對應到模型輸出、告知、查閱、更正、停止、刪除與安全維護。
- [ ] 我能在 30 秒內列出 **推論稽核日誌（Inference Audit Log）** 至少 5 個欄位：時間、使用者、模型版本、資料版本、同意狀態、目的、決策 ID。
- [ ] 我能在 30 秒內說明 **同意傳播（Consent Propagation）** 為何不是只更新一張表，而是要影響資料處理與推論服務。
- [ ] 我能在 30 秒內說明 **模型退役（Model Retirement）** 包含停用、封存、通知、替換與保留稽核證據。
- [ ] 我能在 30 秒內避開 **L23401 / L22404 邊界陷阱**：治理、文件、稽核、退役是 L23401；差分隱私機制與聯邦學習架構是 L22404。

📌 最後提醒：本章重點是 ML lifecycle governance。差分隱私機制（Differential Privacy mechanisms）、epsilon 加噪細節、聯邦學習架構（Federated Learning architecture）與 secure aggregation 屬於 L22404；L23401 只管它們是否被正確文件化、稽核、追蹤與納入合規流程。

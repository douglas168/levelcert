# L23402 演算法偏見與公平性 — Study Guide

本章屬於 iPAS AI 應用規劃師（中級）「科目三：機器學習技術與應用」第 4 節「機器學習治理」。L11102 已在初級處理「知道偏見會存在」的意識層次，L23201-L23304 已處理一般機器學習訓練、模型評估與混淆矩陣基礎；本章不重教那些內容，而是聚焦在 L23402 的實務能力：找出資料與模型中的偏誤來源、用公平性指標（Fairness Metrics）稽核、並選擇對應的偏誤緩解策略（Bias Mitigation Strategies）。

## 1. Orient：Exam Item Mapping

### 1a. 對應評鑑範圍

| 項目 | 本章對應內容 |
|---|---|
| 官方範圍 | 識別資料或模型中潛在的偏誤來源與調整策略 |
| 考試定位 | 機器學習治理（Machine Learning Governance）的公平性稽核 |
| 必會能力 | 看懂情境、判斷偏誤來源、計算公平性指標、選擇緩解階段 |
| 程式題方向 | 讀取群組統計、由 TP/FP/TN/FN 算 DI、DPD、EOD、TPR、FPR |
| 不考方向 | 不要求重寫訓練流程、不要求證明公平性理論、不要求背誦法律條文 |

### 1b. How to Study This Chapter

建議閱讀順序不是從名詞背誦開始，而是照考題會怎麼出現來讀。

1. 先讀第 2 節 Knowledge Tree，抓住「資料偏誤、模型偏誤、指標、調整策略」四大區塊。
2. 再讀 3.3 公平性指標計算，因為這是最高頻、最容易出現數字題的部分。
3. 接著讀 3.4 調整策略，把 pre-processing、in-processing、post-processing 對到題目關鍵字。
4. 回頭讀 3.1 和 3.2，練習從情境判斷偏誤來源。
5. 最後讀第 4、6、7 節，專門處理易混淆概念與情境快判。

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能用一句話說出概念即可 |
| 🔥🔥 | 常考，要能解釋差異 | 要能看情境判斷是哪一類 |
| 🔥🔥🔥 | 高頻必背，要能計算或快速選答案 | 要能算、能比較、能避開陷阱 |

### 1d. 學習目標

讀完本章後，你應該能做到：

1. 從招募、授信、推薦、外送等情境中指出資料偏誤來源（Data Bias Sources）。
2. 分辨模型偏誤來源（Model Bias Sources），例如回饋迴圈、代理變數、群組評估落差。
3. 由每個群組的混淆矩陣（Confusion Matrix）計算選取率、TPR、FPR。
4. 計算 Disparate Impact Ratio、Demographic Parity Difference、Equal Opportunity Difference。
5. 說明 Equal Opportunity 與 Equalized Odds 的差異。
6. 依照可控制的階段選擇 reweighting、adversarial debiasing、reject-option classification 等緩解策略。

### 1e. 考點權重

| 考點 | 權重 | 為什麼重要 |
|---|---:|---|
| Demographic Parity vs Equal Opportunity | 🔥🔥🔥 | 已確認為高頻混淆題 |
| Four-fifths rule / DI 計算 | 🔥🔥🔥 | 常以核准率或混淆矩陣數字題出現 |
| Equal Opportunity vs Equalized Odds | 🔥🔥🔥 | EO 只看 TPR；EqOdds 同時看 TPR 和 FPR |
| Pre/In/Post-processing 緩解策略 | 🔥🔥🔥 | 題目常給「能動哪個階段」要求選方法 |
| 資料偏誤來源 | 🔥🔥 | 情境題常問 historical、representation、measurement |
| 模型偏誤來源 | 🔥🔥 | 會以 proxy variable、feedback loop、evaluation gap 出現 |
| AIF360 / Fairlearn 工具識別 | 🔥 | 主要知道工具與方法分類，不要求 API 細節 |

### 1f. 先備知識

本章假設你已經懂下列基礎，但只會用到公平性相關部分：

| 先備知識 | 本章怎麼用 |
|---|---|
| 二元分類（Binary Classification） | 判斷模型輸出正類或負類 |
| 混淆矩陣（Confusion Matrix） | 由 TP/FP/TN/FN 算 TPR、FPR、選取率 |
| 敏感屬性（Sensitive Attribute） | 例如性別、年齡、地區、族群等受保護或需稽核的群組 |
| 正類預測（Positive Prediction） | 例如核准貸款、錄取面試、給優惠、判定高風險 |
| 閾值（Threshold） | post-processing 會調整決策邊界附近的結果 |

### Visual Diagrams Table

| 圖號 | Placeholder link | 圖要解決的問題 |
|---|---|---|
| 1 | [diagrams/01-bias-source-taxonomy.md](diagrams/01-bias-source-taxonomy.md) | Data bias vs model bias taxonomy tree |
| 2 | [diagrams/02-fairness-metrics-comparison.md](diagrams/02-fairness-metrics-comparison.md) | Demographic parity vs equal opportunity vs equalized odds formulas and when to use |
| 3 | [diagrams/03-mitigation-strategies-by-stage.md](diagrams/03-mitigation-strategies-by-stage.md) | Pre/in/post-processing mitigation strategies pipeline |
| 4 | [diagrams/04-four-fifths-rule-worked-example.md](diagrams/04-four-fifths-rule-worked-example.md) | Confusion matrix per group → disparate impact calculation worked example |
| 5 | [diagrams/05-bias-audit-workflow.md](diagrams/05-bias-audit-workflow.md) | Algorithmic bias detection audit flowchart |

## 2. Learn：關鍵概念總覽圖（Knowledge Tree）

這張圖不是要一次背完。先抓 4 層就好：
第一層看「偏誤從哪裡來」。
第二層看「用什麼指標量」。
第三層看「在哪個階段調整」。
第四層看「題目關鍵字要選哪個答案」。

```text
L23402 演算法偏見與公平性
├─ A. 資料偏誤來源（Data Bias Sources）
│  ├─ Historical Bias：歷史本身就不公平
│  ├─ Representation Bias：樣本代表性不足
│  ├─ Measurement Bias：量測方式或標籤有偏
│  ├─ Aggregation Bias：把不同群組硬套同一規則
│  ├─ Evaluation Bias：測試集或評估指標不代表真實使用者
│  └─ Deployment Bias：部署情境與設計假設不同
│
├─ B. 模型偏誤來源（Model Bias Sources）
│  ├─ Feedback Loops：模型輸出反過來改變未來資料
│  ├─ Proxy Variables：非敏感欄位暗藏敏感屬性訊號
│  └─ Evaluation Gaps：整體分數好，但特定群組很差
│
├─ C. 公平性指標（Fairness Metrics）
│  ├─ Demographic Parity：各群組正類預測率相近
│  ├─ Disparate Impact Ratio：少數或非優勢群組選取率 ÷ 優勢群組選取率
│  ├─ Equal Opportunity：各群組 TPR 相近
│  └─ Equalized Odds：各群組 TPR 和 FPR 都相近
│
└─ D. 調整策略（Mitigation Strategies）
   ├─ Pre-processing：訓練前改資料或權重
   ├─ In-processing：訓練中加入公平性限制
   └─ Post-processing：訓練後調整輸出或閾值
```

考試讀法：

```text
先判斷偏誤在哪裡
→ 再判斷題目要量什麼公平
→ 再依可動階段選調整策略
```

## 3. Learn：Core Concepts

### 3.1 資料偏誤來源（Data Bias Sources）🔥🔥

#### 先懂一句話

資料偏誤就是：模型還沒開始訓練，資料就已經把不公平帶進來了。
考試不是問你「偏見是什麼」，而是問你能不能看出資料在哪個環節歪掉。

#### 它在流程中的位置

```text
真實世界
→ 資料蒐集 / 標籤 / 抽樣 / 評估資料
→ 資料偏誤來源
→ 模型訓練
→ 不公平預測結果
```

#### 🗣️ 白話說明

想像用 104 人力銀行資料訓練履歷篩選模型。
如果過去某些產業較少錄用中高齡轉職者，資料裡的「錄取」標籤就已經反映歷史不公平。
模型不需要有惡意，它只要忠實學歷史資料，就可能複製過去的不公平。

再想像 Uber Eats 外送需求模型。
如果訓練資料主要來自台北市中心，模型可能覺得市中心需求最重要，卻低估偏鄉或新開發區。
這不是模型公式壞掉，而是資料代表性不足。

#### 六種資料偏誤來源

| 類型 | 中文理解 | 常見情境 | 考試觸發詞 |
|---|---|---|---|
| Historical Bias（歷史偏誤） | 真實世界過去就不公平 | 過去錄取資料偏向某群體 | 歷史資料、過去決策、系統性排除 |
| Representation Bias（代表性偏誤） | 樣本沒有代表所有群組 | 少數族群樣本太少 | 樣本不足、覆蓋不足、抽樣不均 |
| Measurement Bias（測量偏誤） | 量測工具或標籤對某群組不準 | 用申訴次數當服務品質，但不同群組申訴習慣不同 | proxy label、量測方式、標籤偏差 |
| Aggregation Bias（聚合偏誤） | 不同群組硬用同一模型假設 | 醫療模型忽略年齡族群差異 | one-size-fits-all、群組差異 |
| Evaluation Bias（評估偏誤） | 測試資料不代表部署人群 | 只在都市資料測準確率 | test set 不代表、評估資料偏 |
| Deployment Bias（部署偏誤） | 使用方式和設計假設不同 | 風險分數被主管當成唯一決策 | 上線情境、誤用、決策流程 |

#### 技術說法

資料偏誤來源（Data Bias Sources）指的是資料生命週期中，因真實世界不平等、抽樣不足、量測錯誤、標籤偏差、評估資料不匹配或部署情境改變，使模型學到不公平關聯的風險。

這些偏誤會影響後續公平性指標。
例如 representation bias 可能讓某群組樣本少，導致該群組 TPR 特別低。
measurement bias 可能讓標籤本身不準，導致模型看似準確但實際上對某群組不公平。

#### 流程 / 選擇流程

```text
題目描述「資料怎麼來」
→ 問：是不公平歷史？樣本不足？量測不準？測試集不代表？
→ 對到偏誤類型
→ 再選資料修正或後續稽核
```

#### Code Pattern：群組統計稽核 loop

```python
import pandas as pd

for group, part in df.groupby("gender"):
    n = len(part)
    positive_rate = part["y_pred"].mean()
    actual_rate = part["y_true"].mean()
    print(group, "n=", n, "pred+=", round(positive_rate, 3),
          "actual+=", round(actual_rate, 3))
```

這段程式的考點不是 pandas 語法細節，而是稽核思路：

```text
依敏感屬性切群組
→ 看樣本數是否不均
→ 看正類預測率是否差很多
→ 看真實正類比例是否和預測落差不同
```

#### Exam Rule

```text
過去資料本身有歧視或排除 → Historical Bias
某群體樣本太少或沒有被蒐集到 → Representation Bias
標籤或量測方式對某群體不準 → Measurement Bias
測試集不代表上線使用者 → Evaluation Bias
上線後被拿去做原本沒設計的決策 → Deployment Bias
```

> **📌 Aggregation Bias 歸類說明：**
> Aggregation Bias 在學術文獻（Suresh & Guttag 2019）中屬於模型/流程決策偏誤——它來自「選擇用單一模型套用到異質子群組」這個建模決策，而非來自資料蒐集本身。然而 iPAS 考試情境多將其歸在資料準備階段的決策偏誤（與 Historical / Representation / Measurement 同組），因此本章沿用此分類。
>
> ❌ 陷阱：Aggregation Bias 有時被歸類於模型偏誤
> ✅ 正解：iPAS 考試情境多歸在資料準備決策偏誤

#### Quick Check

某公司用過去 10 年主管推薦名單訓練升遷模型，但過去主管多半推薦同校、同部門的人。這最像哪一種資料偏誤？

答案：Historical Bias（歷史偏誤）。因為資料中的「推薦」標籤已經反映過去制度與人為決策的不公平。

#### Scenario Bank

| 情境 | 最可能偏誤 | 為什麼 |
|---|---|---|
| 104 履歷模型用過去錄取資料，過去女性工程師錄取率偏低 | Historical Bias | 歷史決策本身已經不公平 |
| 外送需求模型只蒐集台北市中心訂單 | Representation Bias | 樣本沒有代表偏鄉或其他城市 |
| 用「客服抱怨次數」代表服務品質，但不同年齡層抱怨習慣不同 | Measurement Bias | 指標不等於真正品質，且群組量測方式有差 |
| 醫療模型把青年與高齡族群用同一風險規則 | Aggregation Bias | 不同群組機制不同，硬聚合會失準 |
| 模型只在都市測試集表現良好，上線到全台後偏鄉錯誤率高 | Evaluation Bias | 評估資料不代表部署人群 |
| 風險分數原本只作輔助，主管上線後當成唯一淘汰依據 | Deployment Bias | 使用方式偏離原本設計情境 |

### 3.2 模型偏誤來源（Model Bias Sources）🔥🔥

#### 先懂一句話

模型偏誤就是：即使資料看起來可以用，模型學習方式、特徵選擇或評估方式仍可能讓某些群組吃虧。

#### 它在流程中的位置

```text
資料準備
→ 特徵工程 / 模型訓練 / 閾值設定 / 評估
→ 模型偏誤來源
→ 群組間錯誤率或機會不平等
```

#### 🗣️ 白話說明

想像貸款模型不能使用「性別」這個欄位。
但它使用了職業、收入中斷年數、居住地區等欄位。
如果這些欄位高度反映性別或照顧責任，模型仍可能間接學到性別訊號。
這就是代理變數（Proxy Variables）的典型考法。

另一個例子是推薦系統。
模型一開始多推薦熱門內容，熱門內容得到更多點擊，未來資料又顯示它更熱門。
模型輸出會改變未來資料，這就是回饋迴圈（Feedback Loop）。

#### 三個高頻模型偏誤來源

| 類型 | 中文理解 | 常見題目描述 | 你要想到 |
|---|---|---|---|
| Feedback Loops（回饋迴圈） | 模型決策影響未來資料 | 推薦越多越熱門、巡邏越多通報越多 | 模型輸出改變資料分布 |
| Proxy Variables（代理變數） | 非敏感欄位暗藏敏感屬性訊號 | 不用性別但用地區、職業、學校 | 間接歧視風險 |
| Evaluation Gaps（群組評估落差） | 整體分數好但某群組差 | overall accuracy 高，某群組 FNR 高 | 要分群組看混淆矩陣 |

#### 技術說法

模型偏誤來源（Model Bias Sources）指模型訓練、特徵表示、決策閾值、回饋資料收集或評估方式造成的群組不公平。
它不一定來自原始資料缺漏，也可能來自模型把某些欄位當成敏感屬性的替代訊號，或用整體平均指標掩蓋群組差異。

#### 流程 / 選擇流程

```text
題目描述「模型如何使用特徵或輸出」
→ 問：輸出是否影響未來資料？特徵是否是敏感屬性代理？整體分數是否掩蓋群組差異？
→ 判斷模型偏誤來源
→ 選擇群組評估、特徵檢查或訓練中公平限制
```

#### 重要提醒

> 此小節無對應程式 pattern — 考試以概念辨識為主。

如果題目給程式碼，通常也不會要求你寫模型訓練。
它更可能問：某段流程造成的偏誤來源是什麼，或該用哪個公平性稽核方法檢查。

#### Exam Rule

```text
模型推薦造成未來資料更偏 → Feedback Loop
不用敏感欄位但用高度相關欄位 → Proxy Variable
整體準確率高但某群組錯誤率高 → Evaluation Gap
題目問「模型本身或輸出造成」 → 優先考慮模型偏誤
```

#### Quick Check

貸款模型沒有使用族群欄位，但使用郵遞區號，而某些郵遞區號高度對應特定族群。這最像哪一種模型偏誤來源？

答案：Proxy Variables（代理變數）。因為郵遞區號雖不是敏感屬性，卻可能間接帶入族群訊號。

#### Scenario Bank

| 情境 | 最可能偏誤 | 為什麼 |
|---|---|---|
| 推薦系統一直推熱門商品，熱門商品得到更多點擊，冷門商品更難曝光 | Feedback Loop | 模型輸出改變未來訓練資料 |
| 招募模型刪除性別欄位，但保留兵役狀態與長期職涯中斷欄位 | Proxy Variables | 欄位可能間接反映性別或照顧責任 |
| 人臉模型 overall accuracy 95%，但深色膚色群組錯誤率高 | Evaluation Gap | 整體分數掩蓋群組差異 |
| 詐欺偵測模型把高風險標籤回饋給客服，客服更常檢查特定群組 | Feedback Loop | 更多檢查會產生更多通報資料 |

### 3.3 公平性指標計算（Fairness Metrics）🔥🔥🔥

#### 先懂一句話

公平性指標就是把「某群組有沒有比較吃虧」變成可計算的數字。
考試最常給你每個群組的混淆矩陣，要求你算正類率、TPR、FPR，再判斷是否需要緩解。

#### 它在流程中的位置

```text
模型已產生 y_pred
→ 依敏感屬性分組
→ 每組算 selection rate / TPR / FPR
→ 計算公平性指標
→ 決定是否 mitigation
```

#### 先問自己一個問題

題目到底在問哪一種公平？

```text
問「正類預測比例是否相同」 → Demographic Parity
問「真正有資格的人是否同樣被抓到」 → Equal Opportunity
問「TPR 和 FPR 是否都相同」 → Equalized Odds
問「少數群組選取率是否低於 80%」 → Disparate Impact / Four-fifths rule
```

#### 技術說法與公式

以下公式用 `A=0` 表示非優勢群組（unprivileged group），`A=1` 表示優勢群組（privileged group）。
若題目用 Group A / Group B，要先看誰是較低選取率或題目指定的 unprivileged。

| 指標 | 公式 | 理想值 | 考試意思 |
|---|---|---|---|
| Disparate Impact Ratio（DI） | `DI = P(Ŷ=1|A=0)/P(Ŷ=1|A=1)` | 接近 1，且通常不低於 0.8 | 非優勢群組選取率不要太低 |
| Demographic Parity Difference（DPD） | `DPD = P(Ŷ=1|A=0) - P(Ŷ=1|A=1)` | `0` | 各群組正類預測率相同 |
| Equal Opportunity Difference（EOD） | `EOD = TPR(A=0) - TPR(A=1)` | `0` | 各群組真正正類被抓到的比例相同 |
| Equalized Odds（EqOdds） | 需同時滿足 `TPR(A=0)=TPR(A=1)` 且 `FPR(A=0)=FPR(A=1)` | TPR 差與 FPR 差都接近 0 | 真陽性率與假陽性率都公平 |

核心率的計算：

```text
Selection Rate = P(Ŷ=1|A=a) = (TP + FP) / (TP + FP + TN + FN)
TPR = TP / (TP + FN)
FPR = FP / (FP + TN)
```

#### Four-fifths rule（四分之五法則 / 80% 規則）

四分之五法則是實務稽核常見 heuristic。
考試要記的是計算方式，不要把它說成台灣任何場景的最終法律結論。

```text
DI = 較低選取率 / 較高或優勢群組選取率
DI < 0.8 → potential discrimination / 需要進一步調查或 mitigation
```

必背銀行例子：

```text
Group A approval rate = 60/100 = 0.60
Group B approval rate = 40/100 = 0.40
DI = 0.40 / 0.60 = 0.667
0.667 < 0.8
→ violates four-fifths rule / 需要偏誤調查或緩解
```

#### 🗣️ 白話說明：三個容易混的公平指標

Demographic Parity（人口統計均等）像是在問：
「兩個群組拿到正類結果的比例有沒有差很多？」
它不管真實誰有資格，只看 `Ŷ=1` 的比例。

Equal Opportunity（機會均等）像是在問：
「真正有資格的人，在不同群組中被模型抓到的比例是否相同？」
它看的是 `TPR = TP/(TP+FN)`。

Equalized Odds（均等勝算）更嚴格。
它不只要求真正有資格的人被抓到比例相同，也要求不該被判正類的人被誤判比例相同。
所以它同時看 TPR 和 FPR。

#### 一步一步例子：由混淆矩陣算指標

假設貸款模型分成優勢群組 `A=1` 與非優勢群組 `A=0`：

| 群組 | TP | FP | TN | FN | 總數 |
|---|---:|---:|---:|---:|---:|
| A=1 privileged | 50 | 10 | 30 | 10 | 100 |
| A=0 unprivileged | 30 | 10 | 50 | 10 | 100 |

先算選取率：

```text
P(Ŷ=1|A=1) = (TP+FP)/Total = (50+10)/100 = 0.60
P(Ŷ=1|A=0) = (TP+FP)/Total = (30+10)/100 = 0.40
DI = 0.40 / 0.60 = 0.667
DPD = 0.40 - 0.60 = -0.20
```

再算 TPR：

```text
TPR(A=1) = TP/(TP+FN) = 50/(50+10) = 50/60 = 0.833
TPR(A=0) = TP/(TP+FN) = 30/(30+10) = 30/40 = 0.750
EOD = 0.750 - 0.833 = -0.083
```

再算 FPR：

```text
FPR(A=1) = FP/(FP+TN) = 10/(10+30) = 10/40 = 0.250
FPR(A=0) = FP/(FP+TN) = 10/(10+50) = 10/60 = 0.167
```

判斷：

```text
DI = 0.667 < 0.8 → 違反 four-fifths rule 的警戒線
EOD = -0.083 → 非優勢群組 TPR 較低
EqOdds → TPR 不同、FPR 也不同，所以不滿足
```

#### Code Pattern：從 TP/FP/TN/FN 算公平性指標

```python
import numpy as np

priv = np.array([50, 10, 30, 10])  # TP, FP, TN, FN
unpriv = np.array([30, 10, 50, 10])
def rates(cm):
    tp, fp, tn, fn = cm
    return (tp + fp) / cm.sum(), tp / (tp + fn), fp / (fp + tn)
sr_p, tpr_p, fpr_p = rates(priv)
sr_u, tpr_u, fpr_u = rates(unpriv)
di, dpd, eod = sr_u / sr_p, sr_u - sr_p, tpr_u - tpr_p
```

讀程式時要能說出：

```text
sr_u / sr_p → Disparate Impact Ratio
sr_u - sr_p → Demographic Parity Difference
tpr_u - tpr_p → Equal Opportunity Difference
Equalized Odds → 同時比較 tpr_u vs tpr_p 和 fpr_u vs fpr_p
```

#### Exam Rule

```text
題目問「選取率 / 正類預測率」 → Demographic Parity 或 DI
題目問「真正合格者被選中比例」 → Equal Opportunity / TPR
題目問「TPR 和 FPR 都要接近」 → Equalized Odds
題目出現 80% / 四分之五 → DI < 0.8
題目給每組 TP/FP/TN/FN → 先算 Selection Rate、TPR、FPR
```

#### Quick Check

兩組貸款核准率分別為 60% 與 40%，以較低選取率除以較高選取率，DI 是多少？是否低於 four-fifths rule？

答案：`DI = 0.40/0.60 = 0.667`，低於 `0.8`，所以觸發 potential discrimination 的警戒，需要進一步稽核或緩解。

#### Scenario Bank

| 情境 | 要算或判斷 | 正確解法 |
|---|---|---|
| 銀行 Group A 核准率 60%，Group B 核准率 40% | DI 與 four-fifths rule | `DI = 0.40/0.60 = 0.667 < 0.8`，違反警戒線 |
| 題目問兩性收到面試邀請的比例是否相同 | Demographic Parity | 比較 `P(Ŷ=1|A=0)` 與 `P(Ŷ=1|A=1)` |
| 題目問真正合格者在兩組中是否同樣被核准 | Equal Opportunity | 比較 `TPR = TP/(TP+FN)` |
| 題目問兩組的真陽性率與假陽性率是否都相同 | Equalized Odds | 同時比較 TPR 與 FPR |
| 題目給每組 TP/FP/TN/FN，要判斷是否需要 mitigation | Fairness audit | 先算 selection rate、DI、TPR、FPR，再看差距 |
| 某組 DPD = -0.25 | Demographic Parity Difference | 非優勢群組正類預測率比優勢群組低 25 個百分點 |

### 3.4 調整策略（Bias Mitigation Strategies）🔥🔥🔥

#### 先懂一句話

偏誤緩解策略就是：看你能動哪個階段，再選對方法。
能改資料就做 pre-processing；能改訓練就做 in-processing；只能改輸出就做 post-processing。

#### 它在流程中的位置

```text
資料
→ Pre-processing
→ 模型訓練
→ In-processing
→ 模型分數 / 預測
→ Post-processing
→ 決策
```

#### Three-stage framework

| 階段 | 中文理解 | 代表方法 | 題目觸發詞 |
|---|---|---|---|
| Pre-processing（前處理） | 訓練前改資料、樣本或權重 | reweighting、resampling、data augmentation | 訓練前、樣本權重、重抽樣、資料平衡 |
| In-processing（訓練中處理） | 訓練時加入公平性限制 | adversarial debiasing、fairness constraints | 訓練中、loss、constraint、adversary |
| Post-processing（後處理） | 訓練後調整分數、閾值或輸出 | reject-option classification、calibrated equal odds | 已訓練模型、只能改 threshold、決策邊界 |

#### AIF360 key algorithms by stage（IBM 發起、現為 LF AI & Data / Trusted-AI 生態）

| 階段 | AIF360 / 常見方法 | 考試要會認 |
|---|---|---|
| Pre-processing | Reweighing、DisparateImpactRemover、Learning Fair Representations（LFR）、Optimized Preprocessing | 還沒訓練前就修正資料分布或表示 |
| In-processing | AdversarialDebiasing、PrejudiceRemover、ExponentiatedGradientReduction、GridSearchReduction | 訓練過程把公平性納入目標或限制 |
| Post-processing | RejectOptionClassification、EqOddsPostprocessing、CalibratedEqOddsPostprocessing | 模型已完成，只調整輸出以改善公平性 |

#### 🗣️ 白話說明

Pre-processing 像是考試前先把班上練習題的來源補均衡。
如果某群組樣本太少，就用重抽樣（resampling）或權重（sample_weight）讓模型不要忽略它。

In-processing 像是在訓練時旁邊放一位公平性教練。
模型一邊學準確率，一邊被要求不要讓對抗辨別器（adversarial discriminator）猜出敏感屬性。
這就是 adversarial debiasing 的核心：讓表示或預測中盡量移除 protected attribute signal。

Post-processing 像是成績已經算出來了，但在及格線附近重新檢查。
Reject-option classification 會在決策邊界附近做調整：分數離 threshold 很遠就不動，分數很接近 threshold 才可能為了公平性改判。

#### 流程 / 選擇流程

```text
你能改訓練資料嗎？
→ 可以：優先想 pre-processing（reweighting / resampling）
→ 不可以，但能改訓練演算法？
→ 可以：想 in-processing（adversarial debiasing / fairness constraints）
→ 不能改資料也不能重訓，只能拿到模型分數？
→ 想 post-processing（reject-option classification / calibrated equal odds）
```

#### Code Pattern：reweighting trace（sample_weight assignment）

```python
import numpy as np

sample_weight = np.ones(len(y_train))
mask_unpriv_pos = (group == 0) & (y_train == 1)
mask_unpriv_neg = (group == 0) & (y_train == 0)
sample_weight[mask_unpriv_pos] = 1.8
sample_weight[mask_unpriv_neg] = 1.2
model.fit(X_train, y_train, sample_weight=sample_weight)
```

這段程式要讀成：

```text
依 protected group 與 label 組合調整 sample_weight
→ 讓模型在訓練時更重視被低估的群組 / 標籤組合
→ 屬於 pre-processing（訓練前資料權重調整）
```

#### Code Pattern：reject-option classification threshold logic

```python
threshold = 0.50
band = 0.05
y_pred = (score >= threshold).astype(int)
near = np.abs(score - threshold) <= band
y_pred[(group == 0) & near] = 1  # favor unprivileged near boundary
y_pred[(group == 1) & near] = 0  # stricter for privileged near boundary
```

這段程式要讀成：

```text
只調整 threshold 附近的不確定案例
→ 對非優勢群組給較有利輸出
→ 對優勢群組給較嚴格輸出
→ 屬於 post-processing
```

#### Exam Rule

```text
訓練前調整資料或 sample_weight → Reweighting / Pre-processing
樣本太少、分布不均 → Resampling / Data augmentation
訓練中加入 adversary，使其猜不到 protected attribute → Adversarial Debiasing
訓練中加入 fairness constraint → In-processing
模型已訓練完，只能調分數或 threshold → Post-processing
決策邊界附近調整結果 → Reject-option Classification
校準分數後改善 equalized odds → Calibrated Equal Odds
```

#### Quick Check

題目說「模型已由外部廠商訓練完成，只能拿到每筆資料的風險分數，並希望在決策邊界附近調整結果。」應選哪一類方法？

答案：Post-processing 的 Reject-option Classification。因為不能改資料或重訓，只能在模型輸出後調整 threshold 附近的決策。

#### Scenario Bank

| 情境 | 最適策略 | 為什麼 |
|---|---|---|
| 訓練前發現非優勢群組正類樣本太少 | Reweighting / Resampling | 可在資料或權重階段修正 |
| 訓練中希望模型表示不要保留性別訊號 | Adversarial Debiasing | 對抗器嘗試猜敏感屬性，主模型學會移除訊號 |
| 公司只能取得第三方模型分數，不能重新訓練 | Post-processing | 只能調整輸出或 threshold |
| 題目說「決策邊界附近給非優勢群組較有利結果」 | Reject-option Classification | 這是 post-processing 的典型描述 |
| 題目說「加入公平性限制與準確率一起最佳化」 | Fairness Constraints | 訓練中處理 |
| 題目說「校準後使 equalized odds 更接近」 | Calibrated Equal Odds | post-processing 方法 |

## 4. Compare：易混淆概念

### 4.1 Demographic Parity vs Equal Opportunity vs Equalized Odds

比較表這樣讀：
先看題目問的是「預測正類比例」還是「真正正類被抓到」。
如果只提正類預測率，選 Demographic Parity。
如果提真正有資格者的 TPR，選 Equal Opportunity。
如果同時提 TPR 和 FPR，選 Equalized Odds。

| 指標名稱 | 公平性定義 | 計算公式 | 適用情境 | 考試觸發詞 |
|---|---|---|---|---|
| Demographic Parity（人口統計均等） | 不同群組被預測為正類的比例相同 | `P(Ŷ=1|A=0) = P(Ŷ=1|A=1)`；`DPD = P(Ŷ=1|A=0) - P(Ŷ=1|A=1)` | 招募邀請率、貸款核准率、優惠發放率 | 正類預測率、選取率、selection rate |
| Disparate Impact Ratio（差別影響比） | 非優勢群組選取率不應過低 | `DI = P(Ŷ=1|A=0)/P(Ŷ=1|A=1)` | four-fifths rule、80% 規則 | 少數÷多數、低於 0.8 |
| Equal Opportunity（機會均等） | 真正正類者在各群組被抓到比例相同 | `EOD = TPR(A=0) - TPR(A=1)`；`TPR = TP/(TP+FN)` | 合格者被錄取、病患被偵測、真正高風險被攔截 | TPR、真正有資格、正類中的公平 |
| Equalized Odds（均等勝算） | 各群組 TPR 和 FPR 都相同 | `TPR(A=0)=TPR(A=1)` 且 `FPR(A=0)=FPR(A=1)` | 同時重視漏判與誤判的風險決策 | TPR and FPR、both error rates |

考試快判：看到「rate of positive prediction」選 DP；看到「true positive rate」選 EO；看到「TPR + FPR」選 Equalized Odds。

### 4.2 Pre-processing vs In-processing vs Post-processing

比較表這樣讀：
不要先背方法名。
先問「你能動哪個階段？」

| 階段 | 方法 | 代表工具 | 何時使用 |
|---|---|---|---|
| Pre-processing | Reweighting、Resampling、Data Augmentation、DisparateImpactRemover | AIF360 Reweighing | 能改訓練資料、樣本權重或資料表示 |
| In-processing | Adversarial Debiasing、Fairness Constraints、Prejudice Remover | AIF360 AdversarialDebiasing、Fairlearn reductions | 能控制訓練流程、loss 或 constraint |
| Post-processing | Reject-option Classification、Calibrated Equal Odds、Equalized Odds Postprocessing | AIF360 RejectOptionClassification | 模型已訓練，只能調整分數、threshold 或輸出 |

考試快判：訓練前改資料是 pre；訓練中改 loss 或 constraint 是 in；訓練後改 threshold 是 post。

### 4.3 資料偏誤 vs 模型偏誤

比較表這樣讀：
資料偏誤通常出現在「資料怎麼被蒐集、標記、評估」。
模型偏誤通常出現在「模型怎麼學、怎麼用特徵、怎麼回饋」。

| 類型 | 來源 | 常見例子 | 修正方向 |
|---|---|---|---|
| 資料偏誤（Data Bias） | 歷史資料、抽樣、標籤、測量、測試集、部署情境 | 過去錄取資料不公平、少數群組樣本太少、標籤代理不準 | 補資料、改標籤、重抽樣、reweighting、分群組稽核 |
| 模型偏誤（Model Bias） | 特徵表示、訓練目標、代理變數、閾值、回饋迴圈、評估落差 | 郵遞區號代理族群、推薦越推越偏、整體 accuracy 掩蓋群組錯誤 | 移除/檢查 proxy、fairness constraint、adversarial debiasing、post-processing |

考試快判：題目若強調資料來源與標籤，先想資料偏誤；若強調模型特徵、輸出回饋或整體指標掩蓋群組，先想模型偏誤。

## 5. Memorize：口訣 / Mnemonics

### 5.1 公平性指標三兄弟

```text
率相同(DP) → TPR相同(EO) → TPR+FPR相同(EqOdds)
```

讀法：

| 口訣 | 指標 | 你要看 |
|---|---|---|
| 率相同 | Demographic Parity | 正類預測率 / selection rate |
| TPR 相同 | Equal Opportunity | 真正正類被抓到比例 |
| TPR+FPR 相同 | Equalized Odds | 真陽性率與假陽性率都要接近 |

### 5.2 三階段調整策略

```text
前處(數據) → 中訓(模型) → 後調(輸出)
```

| 口訣 | 階段 | 代表方法 |
|---|---|---|
| 前處(數據) | Pre-processing | Reweighting、Resampling |
| 中訓(模型) | In-processing | Adversarial Debiasing、Fairness Constraints |
| 後調(輸出) | Post-processing | Reject-option Classification、Calibrated Equal Odds |

### 5.3 Four-fifths rule

```text
80法則：少數÷多數，低於0.8就違規
```

考試計算時寫成：

```text
DI = lower selection rate / higher selection rate
DI < 0.8 → potential discrimination / 需要調查或緩解
```

### 5.4 Bias source types

```text
歷代測聚評部
```

| 字 | 偏誤來源 |
|---|---|
| 歷 | Historical Bias（歷史偏誤） |
| 代 | Representation Bias（代表性偏誤） |
| 測 | Measurement Bias（測量偏誤） |
| 聚 | Aggregation Bias（聚合偏誤） |
| 評 | Evaluation Bias（評估偏誤） |
| 部 | Deployment Bias（部署偏誤） |

## 6. Avoid traps：考試陷阱（Exam Traps）

### Trap 1：Demographic Parity ≠ Equal Opportunity

❌ 錯誤想法：兩群組正類預測率一樣，就代表真正合格的人也被公平對待。

✅ 正確想法：Demographic Parity 看 `P(Ŷ=1)`；Equal Opportunity 看 `TPR = TP/(TP+FN)`。

```text
rate vs. TPR
正類預測率 vs. 真正正類被抓到比例
```

### Trap 2：Four-fifths rule 閾值是 0.8

❌ 錯誤想法：DI 低於 0.9 或 0.75 才算有問題。

✅ 正確想法：考試看到 four-fifths rule / 80% rule，就用 `0.8`。

```text
DI = 0.667 < 0.8 → 觸發警戒
DI = 0.85 → 未低於 four-fifths rule 的常見警戒線
```

### Trap 3：Equalized Odds ≠ Equal Opportunity

❌ 錯誤想法：Equalized Odds 只要 TPR 一樣。

✅ 正確想法：Equal Opportunity 只看 TPR；Equalized Odds 要 TPR 和 FPR 都一致。

```text
EO → TPR
EqOdds → TPR + FPR
```

### Trap 4：Pre-processing 不一定永遠最好

❌ 錯誤想法：只要有偏誤，一律先改訓練資料。

✅ 正確想法：要看你能動哪個階段。若只能取得外部模型分數，就只能做 post-processing。

```text
能改資料 → pre-processing
能改訓練 → in-processing
只能改輸出 → post-processing
```

### Trap 5：Reject-option classification 是 post-processing

❌ 錯誤想法：Reject-option classification 會重建資料或重訓模型。

✅ 正確想法：它是在模型輸出後，針對 decision boundary 附近的不確定案例調整結果。

```text
near threshold
→ favor unprivileged group
→ post-processing
```

### Trap 6：不用敏感屬性不代表公平

❌ 錯誤想法：把性別、年齡、族群欄位刪掉，模型就不會有偏誤。

✅ 正確想法：proxy variables 可能仍保留敏感屬性訊號，例如地區、職業、學校、薪資中斷。

### Trap 7：整體 accuracy 高不代表每個群組都公平

❌ 錯誤想法：overall accuracy 高，公平性就沒問題。

✅ 正確想法：公平性要分群組看 selection rate、TPR、FPR；整體平均可能掩蓋少數群組錯誤。

## 7. Exam strategy：情境題快速判斷（Scenario Quick-Judge）

### 7.1 Keyword → answer lookup

| 題目關鍵字 | 快速答案 | 理由 |
|---|---|---|
| 四比五法則 / 80%規則 | 四分之五法則；`DI < 0.8` 觸發警戒 | 用低選取率除以高選取率 |
| 正類中的公平 / 真陽性率相同 | Equal Opportunity | 看 `TPR = TP/(TP+FN)` |
| 預測正例比例相同 | Demographic Parity | 看 `P(Ŷ=1|A=a)` |
| TPR 和 FPR 都相同 | Equalized Odds | 同時限制真陽性率與假陽性率 |
| 訓練前調整樣本權重 | Reweighting（pre-processing） | 用 sample_weight 修正分布 |
| 訓練中對抗辨別器 | Adversarial Debiasing（in-processing） | 移除 protected attribute signal |
| 決策邊界附近調整閾值 | Reject-option Classification（post-processing） | 只調整 threshold 附近輸出 |
| 歷史數據中少數族群被系統性排除 | Representation Bias / Historical Bias | 若重點是樣本缺席偏 representation；若重點是過去制度不公平偏 historical |

### 7.2 混淆矩陣題解題流程

```text
Step 1：標出每個群組的 TP、FP、TN、FN
Step 2：算 selection rate = (TP+FP)/Total
Step 3：算 DI = unprivileged selection rate / privileged selection rate
Step 4：算 TPR = TP/(TP+FN)
Step 5：算 FPR = FP/(FP+TN)
Step 6：依題目問 DP、EO、EqOdds 或 four-fifths rule 作答
```

### 7.3 快速判斷題型

| 題型 | 先做什麼 | 最可能答案 |
|---|---|---|
| 給核准率 | 直接算 DI 或 DPD | Four-fifths rule / Demographic Parity |
| 給 TP/FN | 算 TPR | Equal Opportunity |
| 給 FP/TN | 算 FPR | Equalized Odds 的一部分 |
| 問方法階段 | 看能改資料、訓練或輸出 | Pre / In / Post-processing |
| 問偏誤來源 | 看問題發生在資料還是模型 | Data Bias / Model Bias |

### 7.4 迷你實戰

題目：A 組 100 人中模型核准 70 人；B 組 100 人中模型核准 49 人。若 B 是非優勢群組，是否低於 four-fifths rule？

```text
P(Ŷ=1|A=1) = 70/100 = 0.70
P(Ŷ=1|A=0) = 49/100 = 0.49
DI = 0.49 / 0.70 = 0.70
0.70 < 0.8
→ 低於 four-fifths rule 警戒線
```

題目：兩群組核准率相同，但非優勢群組真正合格者被核准比例比較低。這違反哪個指標？

答案：Equal Opportunity。因為題目問的是真正正類者中的 TPR，而不是整體正類預測率。

## 8. Self-check：結尾：快速自我檢查 ✅

完成本章後，請確認自己能做到：

- [ ] 我能說出 L23402 不重教 L11102 的「偏見存在」意識，而是聚焦 bias detection 與 mitigation。
- [ ] 我能分辨 Historical、Representation、Measurement、Aggregation、Evaluation、Deployment 六種資料偏誤來源。
- [ ] 我能分辨 Feedback Loop、Proxy Variable、Evaluation Gap 三種模型偏誤來源。
- [ ] 我能由 TP/FP/TN/FN 算 selection rate、TPR、FPR。
- [ ] 我能寫出 `DI = P(Ŷ=1|A=0)/P(Ŷ=1|A=1)`，並用 `DI < 0.8` 判斷 four-fifths rule。
- [ ] 我能分辨 Demographic Parity、Equal Opportunity、Equalized Odds 的差異。
- [ ] 我能說明 adversarial debiasing 是訓練中移除 protected attribute signal 的方法。
- [ ] 我能判斷 reweighting 是 pre-processing，reject-option classification 是 post-processing。
- [ ] 我能看到「決策邊界附近調整閾值」就想到 reject-option classification。
- [ ] 我能用情境關鍵字快速選出偏誤來源、指標或緩解策略。

📌 Out-of-scope note：本章不要求重教一般機器學習訓練流程、交叉驗證、模型選擇、深度學習架構，也不要求證明公平性不可能定理、因果公平性（Causal Fairness）或個體公平性（Individual Fairness）。考試重點是 practitioner-level 的偏誤來源辨識、群組公平性指標計算，以及 pre/in/post-processing 緩解策略選擇。

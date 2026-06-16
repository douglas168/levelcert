# L23101 機率/統計之機器學習基礎應用 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」中的 L231 機器學習基礎數學。中級起點在「用數學概念看懂模型假設」，所以這份指南不會重講資料前處理轉換如 log、Box-Cox、z-score、quantile transform（那是 L22301 的事），也不會推導特徵分解、SVD、PCA 線性代數（那是 L23102），更不處理梯度下降、Adam 等最佳化演算法（那是 L23103）。

## 1. Exam Item Mapping

### 1a. 對應評鑑範圍

> 對應評鑑範圍：**L23101 機率/統計之機器學習基礎應用** ＋ **L23 機器學習技術與應用**

### 1b. How to Study This Chapter

1. 先讀 Section 2，抓住整章的主軸：機率統計不是為了算很難的數學，而是為了判斷模型假設。
2. 再讀 Section 3.1 與 Section 3.2，先搞懂「資料長什麼樣」與「機率怎麼更新」。
3. 接著讀 Section 3.3 與 Section 3.4，把期望值（Expected Value）與變異（Variance）接到模型評估。
4. 背 Section 4 的易混淆比較，尤其 prior / likelihood / posterior 與 R² / explained_variance_ratio_。
5. 用 Section 6/7 練考題判斷：看到關鍵字，能在 5 秒內選出分佈、公式角色或指標。
6. 最後用 Section 8 自我檢查，每題都要能 30 秒內口頭講完。

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

- 說出常態分佈（Gaussian / Normal）、伯努利分佈（Bernoulli）、卜瓦松分佈（Poisson）各自適合哪種資料型態。
- 看到 LDA、BernoulliNB、Poisson regression 等模型名稱時，能解釋背後的分佈假設。
- 解釋條件機率（Conditional Probability）與貝氏定理（Bayes' Theorem）如何把 prior、likelihood 更新成 posterior。
- 分辨期望值（Expected Value）與變異數（Variance）在模型中的意義：平均傾向、分散程度與不確定性。
- 看到 R² 或 PCA `explained_variance_ratio_` 時，能判斷它是在解釋目標變異還是特徵空間變異。
- 在情境題中快速避開 PMF/PDF、Poisson/Exponential、prior/likelihood/posterior、R²/PCA ratio 的陷阱。

### 1e. 考點權重

| 考點 | 權重（🔥count） | 出處 |
|---|---:|---|
| 常態分佈（Gaussian / Normal）與連續測量、誤差、LDA 假設 | 🔥🔥 | L23101 研究筆記、官方學習指引方向 |
| 伯努利分佈（Bernoulli）與 0/1 特徵、BernoulliNB | 🔥🔥 | L23101 研究筆記、sklearn model pattern |
| 卜瓦松分佈（Poisson）與固定區間事件次數、count target | 🔥🔥 | L23101 研究筆記、官方分佈描述 |
| PMF vs PDF | 🔥🔥 | L23101 常見陷阱 |
| 條件機率（Conditional Probability） | 🔥🔥 | L23101 評鑑範圍、分類模型 P(Y\|X) |
| 貝氏定理（Bayes' Theorem）：prior / likelihood / posterior | 🔥🔥🔥 | L23 題型情報：貝氏定理基礎 |
| 期望值（Expected Value） | 🔥 | L23101 基礎統計術語 |
| 變異數（Variance）與不確定性 | 🔥🔥 | L23101 變異解釋前置概念 |
| R²（Coefficient of Determination） | 🔥🔥 | L23101 變異解釋 |
| PCA `explained_variance_ratio_` | 🔥🔥🔥 | L23 題型情報：PCA 最大變異數原則 |
| R² vs PCA explained variance ratio | 🔥🔥🔥 | L23101 研究筆記確認比較題 |

### 1f. 先備知識

- **L211 / L21 機器學習概論**：已知道分類、回歸、特徵、目標變數的基本差異。
- **L22301 資料前處理與轉換**：只需知道資料可能需要處理；本章不重教 log、Box-Cox、z-score、quantile transform。
- **L23102 線性代數之機器學習基礎應用**：PCA 的矩陣推導、特徵值、特徵向量在那一課；本章只看 explained variance ratio 的概念。
- **L23103 最佳化基礎**：梯度下降與 Adam 不在本章；本章只問「模型假設什麼資料分佈」。

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [分佈選型地圖](diagrams/01-distribution-selection-map.md) | 一眼看出連續值、0/1 事件、固定區間計數分別對應 Gaussian、Bernoulli、Poisson。 |
| 2 | [Bayes 更新流程](diagrams/02-bayes-update-flow.md) | 把 prior、likelihood、evidence、posterior 排成機率更新流程，避免背錯角色。 |
| 3 | [期望值與變異直覺圖](diagrams/03-expected-value-variance-intuition.md) | 用中心位置與分散程度理解 expected value 與 variance 在模型中的用途。 |
| 4 | [R² vs PCA 變異解釋對照](diagrams/04-r2-vs-pca-explained-variance.md) | 快速分辨「解釋 y 的變異」與「保留 X 特徵空間變異」的不同。 |
| 5 | [L23101 考題快判流程](diagrams/05-exam-quick-judge-flow.md) | 把分佈、Bayes、變異指標串成情境題的作答順序。 |

## 2. 關鍵概念總覽圖 (Knowledge Tree)

這張圖不是要一次背完。先抓 4 層就好：

1. 先判斷題目在問「資料分佈」、「機率更新」還是「變異解釋」。
2. 再看資料型態：連續測量、0/1 事件、固定區間計數，會導向不同分佈與模型假設。
3. 接著把機率語言接到模型：Bayes 更新分類信心，期望值與變異描述資料穩不穩。
4. 最後分辨指標：R² 看回歸目標，PCA explained_variance_ratio_ 看特徵空間。

讀下面的樹狀圖時，先看「題目問的對象」，再看「資料或模型假設」。

```text
🤖 L23101 機率/統計之機器學習基礎應用
│
├── 📊 數據數學分佈特性
│   ├── Gaussian / Normal 常態分佈
│   │   ├── 適合：連續測量、誤差、近似鐘形分佈
│   │   ├── ML 假設：LDA 的類別條件密度常假設 Gaussian
│   │   └── 陷阱：不要把 Gaussian 當成所有資料都適用
│   ├── Bernoulli 伯努利分佈
│   │   ├── 適合：0/1、是/否、有/無、成功/失敗
│   │   ├── ML 假設：BernoulliNB 適合 boolean features
│   │   └── 陷阱：不是 count；一次試驗只有兩種結果
│   ├── Poisson 卜瓦松分佈
│   │   ├── 適合：固定時間或空間內的事件次數
│   │   ├── ML 假設：Poisson regression 適合 count target
│   │   └── 陷阱：Poisson 是次數，Exponential 是等待時間
│   └── PMF vs PDF
│       ├── PMF：離散值某一點的機率
│       └── PDF：連續值看區間，單點是密度不是機率
│
├── 🔁 條件機率與貝氏定理
│   ├── Conditional Probability 條件機率
│   │   ├── P(A|B)：已知 B 發生時 A 的機率
│   │   └── ML 連結：分類常在估 P(Y|X)
│   ├── Bayes' Theorem 貝氏定理
│   │   ├── Prior：看到新證據前的原本相信程度
│   │   ├── Likelihood：假設類別成立時，看到證據的可能性
│   │   ├── Evidence：證據整體出現機率
│   │   └── Posterior：看到證據後更新後的機率
│   └── 陷阱：likelihood 不是 posterior；它不是最後答案
│
├── 📈 期望值與方差
│   ├── Expected Value 期望值
│   │   ├── 意義：長期平均傾向或模型 baseline
│   │   └── 陷阱：不是保證下一次會出現的值
│   ├── Variance 變異數
│   │   ├── 意義：資料分散程度、不確定性
│   │   └── ML 連結：模型想解釋、降低或保留變異
│   └── Standard Deviation 標準差
│       └── 本章只需知道它是 variance 開根號，單位回到原資料
│
└── ⚖️ 變異解釋
    ├── R² / Coefficient of Determination
    │   ├── 用在：回歸模型
    │   ├── 問題：模型解釋了多少 y 的變異？
    │   └── 陷阱：不是分類 accuracy
    ├── PCA explained_variance_ratio_
    │   ├── 用在：PCA 降維後每個主成分保留多少特徵空間變異
    │   ├── 問題：這些 component 保留了多少 X 的資訊？
    │   └── 陷阱：不等於模型預測準確率
    └── 邊界：PCA 特徵向量與 SVD 推導屬 L23102
```

## 3. Core Concepts

### 3.1 數據分佈假設（Distribution Assumptions）🔥🔥🔥

**先懂一句話：**
分佈假設是在回答「這種資料長相，適合交給哪種模型想像」。

**它在流程中的位置：**
資料型態判斷 → **[分佈假設]** → 選模型 / 解釋模型假設 → 評估結果

#### 先問自己一個問題

題目給你資料時，先不要急著套公式，先問：「它是連續測量、0/1 事件，還是固定區間內的次數？」

```text
資料型態
├── 連續測量：身高、溫度、誤差、消費金額近似鐘形 → Gaussian / Normal
├── 二元事件：有無點擊、是否詐欺、是否購買 → Bernoulli
└── 固定區間計數：每小時訂單數、每週客訴數 → Poisson
```

#### 技術說法

常態分佈（Gaussian Distribution, Normal Distribution）是連續型機率分佈，常用來描述測量值、誤差或類別內特徵值接近平均值、兩側逐漸變少的資料。

🗣️ 白話說明：像一班同學的考試成績，多數人集中在中間，特別高分或特別低分比較少，畫起來像一座小山。

伯努利分佈（Bernoulli Distribution）描述一次試驗只有兩種結果的情況，例如 1/0、成功/失敗、有/無。

🗣️ 白話說明：像你在 LINE 群組投票「今天要不要訂 Uber Eats」，每個人只有要訂或不要訂，這就是 0/1。

卜瓦松分佈（Poisson Distribution）描述固定時間或固定空間內事件發生的次數，例如一小時內客服來電數、一天內 7-11 取貨件數。

🗣️ 白話說明：你不是在問「會不會有人取貨」，而是在問「今天這間全家會有幾件取貨」，這就是 count。

#### 分佈與模型假設對照

| 分佈 | 資料長相 | ML 模型假設 | 考試快判 |
|---|---|---|---|
| 常態分佈（Gaussian / Normal）🔥🔥 | 連續值、測量值、誤差 | 線性判別分析（Linear Discriminant Analysis, LDA）常假設每一類的特徵分佈是 Gaussian | 看到 LDA、class-conditional density、連續特徵 → Gaussian |
| 伯努利分佈（Bernoulli）🔥🔥 | 0/1、有/無、是/否 | 伯努利樸素貝氏（Bernoulli Naive Bayes, BernoulliNB）適合 boolean features | 看到 binary feature、是否出現 → Bernoulli |
| 卜瓦松分佈（Poisson）🔥🔥 | 固定區間內事件次數 | 卜瓦松迴歸（Poisson Regression）適合 count target | 看到每小時幾次、每週幾件 → Poisson |

#### PMF vs PDF

PMF（Probability Mass Function, 機率質量函數）用在離散型隨機變數（Discrete Random Variable），可以問「剛好等於某個值的機率」。

PDF（Probability Density Function, 機率密度函數）用在連續型隨機變數（Continuous Random Variable），重點是區間機率，不是單點機率。

```text
離散：P(X = 3) 可以是有意義的機率
連續：P(X = 170.000...) 通常不是考點；要看 P(160 < X < 180)
```

🗣️ 白話說明：離散像蝦皮訂單「今天剛好 3 筆退貨」，可以數；連續像台北租金每坪單價，會落在一段區間，比較少問精準到無限小數的單點。

#### 一步一步例子

題目：「某公司要預測每小時客服中心收到幾通電話，且每個時段有平均來電率，應考慮哪種分佈？」

```text
Step 1：目標是「幾通電話」→ 次數 count
Step 2：次數發生在「每小時」→ 固定時間區間
Step 3：固定區間事件次數 → Poisson
Step 4：若做模型，可想到 Poisson regression 類型
```

答案：卜瓦松分佈（Poisson Distribution）。

#### Exam Rule

```text
連續測量 / 誤差 / LDA → Gaussian
0/1 / boolean feature / 是否出現 → Bernoulli
固定區間事件次數 / count target → Poisson
離散某一點機率 → PMF
連續區間密度 → PDF
```

#### Quick Check

題目：文字分類中，特徵是「某個詞是否出現」，每個詞只記 0 或 1，最貼近哪個分佈假設？

答案：伯努利分佈（Bernoulli）。因為每個特徵是二元事件：出現或不出現。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 工廠感測器溫度誤差大多集中在平均值附近，兩側逐漸變少 | Gaussian / Normal | Poisson |
| Email 特徵只記「是否含有促銷詞」0/1 | Bernoulli | Gaussian |
| 餐飲平台要預測每 10 分鐘訂單數 | Poisson | Bernoulli |
| 題目問連續變數某區間的機率密度 | PDF | PMF |
| 模型審查時發現資料欄位是「是否同意個資使用」的 0/1 欄位 | Bernoulli feature | Poisson count |

#### Code Pattern 認識就夠

```python
# 分佈假設 — 認識模型名稱和資料型態，不需要背完整語法
from sklearn.naive_bayes import BernoulliNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import PoissonRegressor

binary_clf = BernoulliNB()                 # 0/1 boolean features
lda_clf = LinearDiscriminantAnalysis()     # Gaussian class-conditional assumption
count_reg = PoissonRegressor()             # count target
# ↑ 看到模型名稱，要能反推它期待的資料/分佈假設
```

考試重點：不是要你寫完整程式，而是看到 BernoulliNB、LDA、PoissonRegressor 時能說出背後資料假設。

### 3.2 條件機率與貝氏定理（Conditional Probability and Bayes' Theorem）🔥🔥🔥

**先懂一句話：**
貝氏定理就是「看到新證據後，把原本的相信程度更新成新的相信程度」。

**它在流程中的位置：**
原始機率判斷 → 條件機率 → **[Bayes 更新]** → 分類信心 / 風險判斷 / 後驗機率

#### 先問自己一個問題

題目問 Bayes 時，先問：「我是在看新證據前、證據出現的可能性，還是看完證據後的結果？」

```text
看到證據前：prior
假設某類成立，證據會出現多常：likelihood
看到證據後，某類成立的機率：posterior
```

#### 技術說法

條件機率（Conditional Probability）是「已知某事件發生後，另一事件發生的機率」，常寫成 P(A|B)。

🗣️ 白話說明：104 人力銀行上看到「已投履歷的人裡，有多少人被邀面試」，這不是所有人的機率，而是先限定在「已投履歷」這個條件內。

貝氏定理（Bayes' Theorem）把先驗機率（Prior Probability）、似然（Likelihood）、證據機率（Evidence / Marginal Probability）組合起來，得到後驗機率（Posterior Probability）。

```text
P(A|B) = P(B|A) * P(A) / P(B)

Posterior = Likelihood * Prior / Evidence
```

在考試裡，公式辨識比推導重要；你要能看懂每個角色，不需要證明公式。

#### Bayes 角色拆解

| 角色 | 符號 | 白話 | 考題常見包裝 |
|---|---|---|---|
| 先驗機率（Prior）🔥🔥🔥 | P(A) | 還沒看新證據前，原本相信 A 的程度 | 疾病盛行率、詐欺原始比例、垃圾信比例 |
| 似然（Likelihood）🔥🔥🔥 | P(B\|A) | 假設 A 真的成立，看到證據 B 的機率 | 有病時驗出陽性、垃圾信出現促銷詞 |
| 證據機率（Evidence）🔥 | P(B) | B 整體出現的機率 | 所有人驗出陽性的比例 |
| 後驗機率（Posterior）🔥🔥🔥 | P(A\|B) | 看到證據 B 後，A 成立的更新機率 | 驗出陽性後真的有病的機率 |

#### ASCII 流程圖

```text
原本知道的背景比例
        │
        ▼
Prior 先驗 P(A)
        │
        ├── 加上：如果 A 成立，證據 B 多可能出現？
        ▼
Likelihood 似然 P(B|A)
        │
        ├── 除以：B 在整體中有多常見？
        ▼
Posterior 後驗 P(A|B)
```

#### 一步一步例子：醫療檢測

題目：「某疾病盛行率 1%，有病者檢測陽性機率高。現在某人檢測陽性，題目問他真的有病的機率，這是哪個角色？」

```text
Step 1：疾病盛行率 1% → prior P(有病)
Step 2：有病者驗出陽性機率 → likelihood P(陽性|有病)
Step 3：已知現在看到「陽性」這個證據
Step 4：問「陽性後真的有病」→ posterior P(有病|陽性)
```

答案：後驗機率（Posterior Probability）。

🗣️ 白話說明：像 Instagram 抽獎帳號很多人看起來像真的，但你看到藍勾勾、貼文紀錄、留言互動後，會更新你對「這帳號可信」的判斷；這個更新後的信心就是 posterior。

#### Naive Bayes 的考試理解

樸素貝氏（Naive Bayes）把 Bayes' theorem 用在分類，並加上一個「給定類別後，特徵彼此條件獨立」的簡化假設。

```text
文字特徵 X
→ 用每個類別下出現這些特徵的 likelihood
→ 結合每個類別的 prior
→ 選 posterior 較高的類別
```

🔥🔥🔥 考試常問的是「為什麼叫 naive」：因為它假設特徵在給定類別後彼此獨立，不是因為模型很差。

#### Exam Rule

```text
原始比例 / base rate / 盛行率 → prior
假設某類成立時看到證據 → likelihood
看到證據後重新判斷某類 → posterior
分類模型估 P(Y|X) → 條件機率 / posterior
Naive Bayes 的 naive → 條件獨立假設
```

#### Quick Check

題目：垃圾信分類中，「已知信是垃圾信時，出現免費抽獎字樣的機率」是哪個 Bayes 角色？

答案：似然（Likelihood）。因為它是假設類別已成立，問證據出現的機率。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 醫療檢測題問「驗出陽性後真的患病機率」 | Posterior | Likelihood |
| 詐欺偵測題給「交易原本為詐欺的比例」 | Prior | Posterior |
| 垃圾信題問「已知是垃圾信時，出現促銷詞的機率」 | Likelihood | Prior |
| 分類模型要估計 P(Y\|X) | Conditional probability / posterior | P(X\|Y) |
| 風險模型因某族群資料較少導致 prior 不穩，審查模型假設 | 檢查 base rate / prior 是否合理 | 只看 accuracy |

#### Code Pattern 認識就夠

```python
# Naive Bayes — 認識 fit/predict_proba 輸出的意思
from sklearn.naive_bayes import BernoulliNB

model = BernoulliNB()
model.fit(X_train_binary, y_train)
proba = model.predict_proba(X_test_binary)
pred = model.predict(X_test_binary)
# ↑ proba 可理解為各類別 posterior 機率估計，pred 是選最高者
```

考試重點：看到 `predict_proba()` 要知道它輸出各類別機率估計；Naive Bayes 的核心是 prior + likelihood 推 posterior。

### 3.3 期望值與方差（Expected Value and Variance）🔥🔥

**先懂一句話：**
期望值看資料的中心傾向，方差看資料有多分散。

**它在流程中的位置：**
收集資料 → 描述資料分佈 → **[期望值 / 方差]** → 建立 baseline / 判斷不確定性 → 模型解釋或降低變異

#### 先問自己一個問題

題目問 expected value 或 variance 時，先問：「它是在問平均會落在哪裡，還是在問資料穩不穩？」

#### 技術說法

期望值（Expected Value, EV）是隨機變數長期平均的中心傾向，可視為模型預測前的 baseline 想法。

🗣️ 白話說明：你每天午餐花費不固定，但長期看下來平均大概 120 元，這個「長期平均」比單一天的花費更像 expected value。

變異數（Variance）衡量資料離平均值的分散程度；變異越大，代表資料越不穩、越難用單一平均值描述。

🗣️ 白話說明：兩個人在台北租屋平均都花 15,000 元，但一個每月都差不多，另一個有時 8,000、有時 25,000，後者 variance 比較大。

標準差（Standard Deviation）是變異數開根號，單位會回到原本資料單位；本章只要知道它是衡量分散程度的常見形式。

#### ASCII 直覺圖

```text
低變異：資料集中

        x x x x x
----------|----------
        mean

高變異：資料分散

  x     x   x      x
----------|----------
        mean
```

#### 一步一步例子

假設兩個模型都預測便利商店每小時顧客數：

```text
A 店：10, 11, 10, 9, 10
B 店：2, 18, 5, 20, 5
```

Step 1：先看平均。

```text
A 店平均 = (10 + 11 + 10 + 9 + 10) / 5 = 50 / 5 = 10
B 店平均 = (2 + 18 + 5 + 20 + 5) / 5 = 50 / 5 = 10
```

Step 2：平均一樣，不代表資料一樣。

```text
A 店每個值都接近 10 → variance 小
B 店有 2、20 這種離平均很遠的值 → variance 大
```

Step 3：模型意義。

```text
A 店：用平均值 10 當 baseline 還算穩
B 店：只用平均值 10 可能很不準，要找造成波動的因素
```

#### 在 ML 裡怎麼用

| 概念 | 在 ML 的角色 | 考試語感 |
|---|---|---|
| 期望值（Expected Value）🔥 | 平均趨勢、baseline、長期平均預測 | 「平均而言」、「長期平均」、「期望損失」 |
| 變異數（Variance）🔥🔥 | 分散程度、不確定性、可被模型解釋或保留的變動 | 「資料波動」、「不穩定」、「解釋變異」 |
| 標準差（Standard Deviation）🔥 | 變異的同單位表達 | 「標準差大」代表資料分散 |

🔥🔥 注意：這裡的 variance 是統計分散程度；不要直接混成 bias-variance tradeoff 的完整推導，那會超出本節。

#### Exam Rule

```text
長期平均 / 平均傾向 / baseline → Expected Value
資料分散 / 波動 / 不確定性 → Variance
同單位的分散程度 → Standard Deviation
平均相同但穩定度不同 → 比 variance
```

#### Quick Check

題目：兩組資料平均相同，但其中一組數值上下起伏很大，考試問哪個統計量能描述這種差異？

答案：變異數（Variance）。因為 variance 衡量資料離平均值的分散程度。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 題目問一個隨機變數長期平均會落在哪裡 | Expected Value | Variance |
| 兩個門市平均銷售額相同，但一個每天波動很大 | Variance | Prior |
| 模型要先建立「不用特徵時的平均預測 baseline」 | Expected Value | Posterior |
| 風險管理題問模型預測在不同族群中波動很大，應注意不確定性 | Variance / spread | Gaussian 必然成立 |
| 題目說標準差大，代表資料如何 | 分散程度大 | 平均值比較大 |

#### Code Pattern 認識就夠

```python
# Expected value / variance — 認識輸出意義，不需要背語法
import numpy as np

y = np.array([10, 11, 10, 9, 10])
avg = np.mean(y)
var = np.var(y)
# ↑ avg 是中心傾向；var 是資料分散程度
```

考試重點：看到 `mean` 想到期望值/平均傾向；看到 `var` 想到分散程度與不確定性。

### 3.4 變異解釋：R² 與 PCA explained_variance_ratio_（Variance Explained Metrics）🔥🔥🔥

**先懂一句話：**
R² 問回歸模型解釋了多少目標變異，PCA ratio 問主成分保留了多少特徵變異。

**它在流程中的位置：**
資料 / 模型輸出 → **[變異解釋指標]** → 判斷模型解釋力或降維保留量 → 避免把兩種指標混用

#### 先問自己一個問題

看到「explained variance」先不要只背字面，先問：「它是在評估回歸模型對 y 的解釋力，還是在評估 PCA component 對 X 的保留量？」

#### R²：回歸模型解釋目標變異

決定係數（Coefficient of Determination, R²）常用於回歸（Regression）模型，表示模型解釋目標變數（Target Variable, y）變異的比例。

🗣️ 白話說明：像你用坪數、捷運距離、屋齡預測台北租金，R² 在問「租金高低的差異，有多少比例能被這個模型解釋」。

```text
回歸資料
X: 坪數、屋齡、距捷運距離
y: 租金
        │
        ▼
Regression model
        │
        ▼
R²：模型解釋了多少 y 的變異？
```

🔥🔥 R² = 1 代表完美解釋訓練/測試資料中的目標變異；R² 接近 0 代表模型不比只猜平均好多少。實務上 R² 也可能小於 0，但中級考試多半考概念辨識。

#### PCA explained_variance_ratio_：主成分保留特徵空間變異

主成分分析（Principal Component Analysis, PCA）的 `explained_variance_ratio_` 表示每個主成分（Principal Component）保留原始特徵空間變異的比例。

🗣️ 白話說明：像你把一份很長的 104 履歷濃縮成幾個重點標籤，`explained_variance_ratio_` 在問「這些濃縮重點保留了原本履歷差異的多少比例」。

```text
原始特徵 X：很多欄位
        │
        ▼
PCA 降維
        │
        ├── PC1：保留最多方向的變異
        ├── PC2：保留下一個方向的變異
        ▼
explained_variance_ratio_：每個 PC 保留多少 X 的變異？
```

🔥🔥🔥 本章只需知道 PCA 用「最大變異數原則」找主成分，並能解讀 `explained_variance_ratio_`；特徵向量、特徵值、SVD 推導屬 L23102。

#### 一步一步例子

題目：「PCA 模型輸出 `explained_variance_ratio_ = [0.60, 0.25, 0.10]`，前三個主成分保留多少變異？」

```text
Step 1：看每個 component 的比例
PC1 = 0.60
PC2 = 0.25
PC3 = 0.10

Step 2：題目問前三個主成分總保留量
0.60 + 0.25 + 0.10 = 0.95

Step 3：轉成百分比
0.95 = 95%
```

答案：前三個主成分保留 95% 的原始特徵空間變異。

#### R² vs PCA ratio 的核心差異

| 問題 | R² | PCA `explained_variance_ratio_` |
|---|---|---|
| 用在哪裡 | 回歸模型評估 | PCA 降維結果解讀 |
| 解釋什麼 | 目標變數 y 的變異 | 特徵矩陣 X 的變異 |
| 是否需要 y | 需要，因為是監督式回歸評估 | 不需要，PCA 是非監督式降維 |
| 常見問法 | 模型解釋租金/銷售額變動多少 | 主成分保留資料變異多少 |

#### Exam Rule

```text
回歸模型 + 目標 y + 解釋多少變異 → R²
PCA + 主成分 + 保留多少資料變異 → explained_variance_ratio_
最大變異數原則 → PCA
PCA 特徵向量推導 → L23102，不在本章
```

#### Quick Check

題目：題目說「PCA 前兩個主成分保留 85% 的資料變異」，這是在說哪個指標？

答案：`explained_variance_ratio_` 的累加。因為它描述主成分保留特徵空間變異的比例。

#### 情境題 Scenario Bank

| 題目場景 | 正確答案 | 常見錯誤答案 |
|---|---|---|
| 回歸模型預測房租，題目問模型解釋租金變動多少 | R² | PCA explained_variance_ratio_ |
| PCA 降維後問第一主成分保留多少資料變異 | explained_variance_ratio_ | R² |
| 題目提到「最大變異數原則」 | PCA | Naive Bayes |
| 模型治理報告想比較某回歸模型對不同客群目標 y 的解釋力 | R² 分群檢查 | PMF |
| 題目問 PCA 的特徵向量怎麼由 covariance matrix 推出 | L23102 範圍，不在本章 | L23101 必背推導 |

#### Code Pattern 認識就夠

```python
# R² vs PCA explained variance — 認識兩種輸出
from sklearn.metrics import r2_score
from sklearn.decomposition import PCA

r2 = r2_score(y_test, y_pred)        # 回歸模型對 y 的解釋力
pca = PCA(n_components=2).fit(X)
ratio = pca.explained_variance_ratio_
# ↑ ratio 是每個主成分保留 X 特徵空間變異的比例
```

考試重點：`r2_score(y_test, y_pred)` 看 y；`pca.explained_variance_ratio_` 看 X 的主成分保留量。

## 4. Comparison Tables（易混淆概念）

### 4.1 Prior vs Likelihood vs Posterior

這組不要硬背中文翻譯，請用「看證據前、證據多可能、看證據後」來判斷。

| 概念 | Prior 先驗 | Likelihood 似然 | Posterior 後驗 |
|------|------------|------------|------------|
| 定義 | 看到新證據前，事件或類別原本的機率 | 假設某事件/類別成立時，觀察到證據的機率 | 看到證據後，事件或類別成立的更新機率 |
| 符號 | P(A) | P(B\|A) | P(A\|B) |
| 差異 | 背景比例、base rate | 證據在某類下有多像 | 更新後的答案 |
| 適用 | 疾病盛行率、詐欺原始比例 | 有病時陽性、垃圾信出現促銷詞 | 陽性後有病、看到特徵後屬於某類 |
| 常見錯誤 | 把 prior 當最終分類結果 | 把 likelihood 當 posterior | 忘了 posterior 已經包含新證據 |

> 考試快判：看到「原本比例」→ Prior；看到「已知某類時證據」→ Likelihood；看到「看到證據後」→ Posterior

### 4.2 R² vs explained_variance_ratio_

這組的關鍵不是「都有 variance」；關鍵是它們解釋的對象不同。

| 概念 | R²（Coefficient of Determination） | PCA `explained_variance_ratio_` |
|------|------------|------------|
| 定義 | 回歸模型解釋目標變數 y 變異的比例 | PCA 每個主成分保留原始特徵 X 變異的比例 |
| 差異 | 評估 supervised regression model | 解讀 unsupervised dimensionality reduction |
| 適用 | 預測租金、銷售額、需求量等回歸任務 | 降維、視覺化、保留主要資料差異 |
| 是否看 y | 看 y | 不看 y |
| 常見錯誤 | 當成分類 accuracy | 當成模型預測準確率 |

> 考試快判：看到「回歸模型解釋目標變異」→ R²；看到「PCA 主成分保留資料變異」→ `explained_variance_ratio_`

### 4.3 Gaussian vs Bernoulli vs Poisson

分佈選型 = 看資料單位，不是看模型名字好不好聽。

| 概念 | Gaussian / Normal | Bernoulli | Poisson |
|------|------------|------------|------------|
| 定義 | 連續型資料常見的鐘形分佈 | 一次試驗只有 0/1 兩種結果 | 固定時間/空間內事件發生次數 |
| 差異 | 可有小數、連續測量 | 只有兩種結果 | 非負整數 count |
| 適用 | 身高、溫度、誤差、LDA 類別條件密度 | 是否點擊、是否購買、詞是否出現 | 每小時訂單數、每日客訴件數 |
| 常見模型 | LDA Gaussian assumption | BernoulliNB | Poisson regression |

> 考試快判：看到「連續測量」→ Gaussian；看到「0/1」→ Bernoulli；看到「固定區間次數」→ Poisson

### 4.4 PMF vs PDF

PMF/PDF 的差異是離散與連續，不是公式長得像不像。

| 概念 | PMF（Probability Mass Function） | PDF（Probability Density Function） |
|------|------------|------------|
| 定義 | 離散值某一點的機率 | 連續值的機率密度 |
| 差異 | 可直接問 P(X = k) | 通常看區間機率 |
| 適用 | Poisson、Bernoulli 等離散變數 | Gaussian 等連續變數 |
| 常見錯誤 | 把連續單點密度當機率 | 以為 PDF 某點高度就是單點機率 |

> 考試快判：看到「離散某點」→ PMF；看到「連續區間」→ PDF

### 4.5 Poisson vs Exponential

這組是常見延伸陷阱：一個數次數，一個量等待時間。

| 概念 | Poisson Distribution | Exponential Distribution |
|------|------------|------------|
| 定義 | 固定區間內事件發生次數 | 事件之間的等待時間 |
| 差異 | count，非負整數 | interval，連續時間 |
| 適用 | 每小時幾通電話、每天幾筆訂單 | 下一通電話還要等多久 |
| 本章範圍 | 需要掌握 | 只需知道不要混淆 |

> 考試快判：看到「幾次」→ Poisson；看到「等多久」→ Exponential

## 5. 口訣 / Mnemonics

### 5.1 分佈選型口訣：連高、零伯、數卜

```text
連續像高山 → Gaussian
零一像開關 → Bernoulli
數幾次 → Poisson
```

「連高」記 Gaussian 的鐘形高山；「零伯」記 Bernoulli 的 0/1；「數卜」記 Poisson 是數事件次數。

### 5.2 Bayes 口訣：前、像、後

```text
Prior：看證據前
Likelihood：假設某類時，證據有多像
Posterior：看證據後
```

背法：先抓時間點；前是 prior，像是 likelihood，後是 posterior。

### 5.3 期望與方差口訣：中間值，看穩不穩

```text
Expected Value：中間趨勢
Variance：穩不穩、散不散
```

背法：平均一樣不代表風險一樣；要問穩定度就看 variance。

### 5.4 變異解釋口訣：R 看 y，PCA 看 X

```text
R²：Regression 看 y
PCA ratio：PCA 看 X
```

背法：R² 有回歸答案 y；PCA 是把 X 壓縮成主成分。

## 6. 考試陷阱 (Exam Traps)

❌ 陷阱：看到 Gaussian 就以為所有 ML 模型都假設常態分佈。  
✅ 正解：Gaussian 只適合部分連續資料或特定模型假設，例如 LDA 的類別條件密度；許多模型不要求資料本身是 Gaussian。

❌ 陷阱：Bernoulli 和 Poisson 都是離散分佈，所以可以互換。  
✅ 正解：Bernoulli 是一次 0/1 結果；Poisson 是固定區間內事件次數。錯誤來自兩者都不是連續值，但資料型態完全不同。

❌ 陷阱：Poisson 問「等下一次事件多久」。  
✅ 正解：Poisson 問固定區間內「發生幾次」；等待時間更接近 Exponential 的語境，本章只需知道不要混淆。

❌ 陷阱：PDF 在某一點的高度就是該點機率。  
✅ 正解：連續分佈要看區間機率；PDF 是密度，單點高度不是直接的單點機率。

❌ 陷阱：Likelihood 就是最後的分類機率。  
✅ 正解：Likelihood 是「假設某類成立時看到證據的可能性」；posterior 才是看到證據後更新出的類別機率。

❌ 陷阱：Prior 不重要，反正模型會看資料。  
✅ 正解：Prior 是 Bayes 更新的起點；在醫療、詐欺、風險預測這種 base rate 很重要的題目，prior 會影響 posterior。

❌ 陷阱：Expected value 代表下一次一定會出現的值。  
✅ 正解：Expected value 是長期平均傾向，不保證單次結果；像平均午餐 120 元，不代表明天一定花 120 元。

❌ 陷阱：R² 和 PCA `explained_variance_ratio_` 都是 explained variance，所以意思一樣。  
✅ 正解：R² 解釋回歸目標 y 的變異；PCA ratio 解釋主成分保留特徵 X 的變異。

❌ 陷阱：PCA explained variance ratio 高，代表模型預測準確率高。  
✅ 正解：PCA ratio 只表示降維後保留多少資料變異，不等於分類或回歸預測表現。

❌ 陷阱：L23101 需要會推 PCA eigenvector 或 SVD。  
✅ 正解：本章只需辨識 PCA 最大變異數原則與 `explained_variance_ratio_`；推導屬 L23102。

## 7. 情境題快速判斷 (Scenario Quick-Judge)

🔑 看到關鍵字 → 選這個答案

- 連續測量 → Gaussian
- LDA 假設 → Gaussian
- 0/1 特徵 → Bernoulli
- 是否出現 → BernoulliNB
- 固定區間次數 → Poisson
- 每小時幾通 → Poisson
- 離散某點 → PMF
- 連續區間 → PDF
- 原本比例 → Prior
- 已知某類證據 → Likelihood
- 看到證據後 → Posterior
- P(Y\|X) → Conditional probability
- naive 原因 → 條件獨立
- 長期平均 → Expected Value
- 資料波動 → Variance
- 分散程度 → Variance
- 回歸解釋 y → R²
- PCA 保留變異 → explained_variance_ratio_
- 最大變異數原則 → PCA
- 特徵向量推導 → L23102
- z-score 轉換 → L22301

## 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內解釋 **Gaussian、Bernoulli、Poisson** 分別對應連續值、0/1、固定區間次數。
- [ ] 我能看到「LDA」時立刻判斷它常連到 **Gaussian class-conditional assumption**。
- [ ] 我能看到「詞是否出現」時立刻判斷 **Bernoulli / BernoulliNB**。
- [ ] 我能看到「每小時幾筆訂單」時立刻判斷 **Poisson**，而不是 Exponential。
- [ ] 我能說出 **PMF vs PDF** 的差異：離散某點 vs 連續區間密度。
- [ ] 我能在 30 秒內分辨 **prior、likelihood、posterior** 的角色。
- [ ] 我能解釋 **Expected Value** 是長期平均傾向，不是單次保證結果。
- [ ] 我能解釋 **Variance** 是資料分散程度，平均相同也可能 variance 不同。
- [ ] 我能看到「回歸模型解釋目標變異」時選 **R²**。
- [ ] 我能看到「PCA 主成分保留資料變異」時選 **`explained_variance_ratio_`**。

> 📌 本章不需要背 PCA 特徵向量、SVD、矩陣推導，也不需要背梯度下降或 Adam 更新式；那些分別屬 L23102 與 L23103。資料前處理轉換如 log、Box-Cox、z-score、quantile transform 屬 L22301，本章只在必要時辨識邊界，不展開教學。

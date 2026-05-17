# L22301 統計學在大數據中的應用 — Study Guide v2

## 0. How to Use This Guide

這份指南的讀法很簡單：先讀第 1 節的大地圖，再讀第 2 到 7 節的核心概念，最後用第 8 到 10 節練考場判斷。

本課考的不是統計證明，而是你能不能看懂資料狀況，選出正確的資料轉換或 `sklearn.preprocessing` 工具。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

考前使用方式：

1. 先背第 1 節流程圖。
2. 每個核心概念先讀 `先懂一句話` 和 `Everyday Analogy`，再看技術說法。
3. 遇到比較表時，先看表前的「先問自己一個問題」和「比較表這樣讀」。
4. 每讀完一節，立刻做該節 Quick Check。
5. 考前最後複習第 8 節 Exam Decision Trees、第 9 節 Trap Clinic、第 10 節 Practice Questions。

---

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

```text
本課核心 = 看資料症狀，選正確的數值前處理方法
```

本課主要分成兩條路：資料量級不一致時做`縮放（Scaling）`，資料分佈太偏或太怪時做`分佈轉換（Distribution Transform）`。

### Everyday Analogy

想像你要比較班上同學的身高、零用錢、通勤時間。如果每個欄位的單位和範圍都差很多，直接比較會很亂；資料轉換就像先把大家換成同一套可比較的刻度。

### 先問自己一個問題

```text
題目是在問「數字尺度」，還是「資料形狀」？
```

### 技術說法

統計學在大數據前處理中的重點，是把原始數值資料整理成「可比較、可分析、可進模型」的形式。

### 在整體流程中的位置

```text
原始數值資料
→ 觀察量級、異常值、偏態
→ 選擇縮放或分佈轉換
→ 套用 sklearn / 公式
→ 進入分析、視覺化或建模
```

### Key Concepts

比較表這樣讀：

| 題目問的是 | 想到 |
|---|---|
| 不同欄位量級差很多 | Scaling / StandardScaler |
| 一定要輸出 `[0,1]` | MinMaxScaler |
| 異常值很多 | RobustScaler |
| 右偏、長尾、金額、流量、次數 | Log Transform / Box-Cox |
| 想映到 uniform 或 normal | QuantileTransformer |
| 程式碼問 `fit_transform()` 與 `transform()` | 訓練集學參數，測試集只套用 |

本課範圍要守住：

| 本課會考 | 本課不是重點 |
|---|---|
| Scaling、distribution transform、sklearn preprocessing | PCA（Principal Component Analysis，主成分分析）/ SVD（Singular Value Decomposition，奇異值分解）數學推導 |
| 看資料特徵選方法 | 特定機器學習模型完整假設 |
| `fit`、`transform`、`fit_transform` 差異 | SMOTE、特徵選擇、資料切分策略 |

### Exam Rule

```text
題目問「資料要變得可比較」→ 先想 scaling
題目問「分佈右偏、長尾」→ 先想 log / Box-Cox
題目問「異常值很多」→ 先想 RobustScaler
題目問 sklearn API（Application Programming Interface，應用程式介面）→ 訓練集 fit，測試集 transform
```

### Quick Check

題目：如果一題描述「年收入、登入次數、停留秒數一起分析，三個欄位量級差很多」，第一個應該想到哪一類處理？

答案：`縮放（Scaling）`。因為題目重點是欄位量級差異，先把尺度整理到可比較。

---

## 2. Scaling：Min-Max、Standardization、RobustScaler 🔥🔥🔥

### 先懂一句話

```text
縮放（Scaling）= 不改變排名，只把數字換成比較公平的刻度
```

三個高頻方法要分清楚：

```text
Min-Max Normalization = 看最小值與最大值
Standardization / z-score = 看離平均數多遠
Robust Scaling = 看中位數與 IQR（Interquartile Range，四分位距），比較不怕異常值
```

### Everyday Analogy

你在比三間餐廳：價格是 100 到 3000 元，評分是 1 到 5 星，等待時間是 0 到 60 分鐘。Scaling 就像把不同單位先換成可比較的分數，否則價格欄位會因為數字大而壓過其他欄位。

### 先問自己一個問題

```text
我只是想讓不同欄位比較公平，還是想改變資料分佈形狀？
```

如果只是欄位尺度不公平，先想 `Scaling`。如果題目在講右偏、長尾、怪分佈，才往 `Distribution Transform` 想。

### 技術說法

`縮放（Scaling）`會改變數值的刻度，但通常不改變資料的大小順序。原本最大的人通常還是最大，最小的人通常還是最小。

### 在整體流程中的位置

```text
原始數值欄位
→ 發現量級差異或範圍需求
→ Scaling
→ 後續距離型、梯度型、PCA 或一般分析
```

### Key Concepts

#### 2.1 Min-Max Normalization

先懂一句話：

```text
最小最大正規化（Min-Max Normalization）= 看一個數在最小值到最大值之間的位置
```

Everyday Analogy：

像把全班成績換成 0 到 100 的相對位置。最低分變 0，最高分變 1，中間的人依照位置落在 0 到 1 之間。

技術說法：

`MinMaxScaler` 常把資料壓到 `[0,1]`。

```text
x' = (x - x_min) / (x_max - x_min)
```

一步一步例子：

```text
原始資料：[2, 5, 8]
x = 5

Step 1：找最小值與最大值
x_min = 2
x_max = 8

Step 2：套公式
x' = (5 - 2) / (8 - 2) = 0.5

Step 3：整組轉換後
轉換後：[0, 0.5, 1]
```

比較表這樣讀：

| 題目狀況 | 是否適合 Min-Max |
|---|---|
| 要固定範圍 `[0,1]` | 適合 |
| 資料有明確上下界 | 適合 |
| 異常值很多 | 不優先 |

異常值陷阱：

```text
原始資料：2, 5, 8, 100
Min-Max：0, 0.03, 0.06, 1
正常值會被擠在 0 附近
```

記憶方式：

```text
Min-Max = 固定範圍，但很怕極端最大值 / 最小值
```

#### 2.2 Standardization / z-score

先懂一句話：

```text
標準化（Standardization）/ z-score = 看一個數離平均數幾個標準差
```

Everyday Analogy：

像老師不只看你考 85 分，而是看你比全班平均高多少。如果全班平均 70 分、大家分數很集中，85 分就很突出；如果全班分數很分散，85 分可能只是稍微高一點。

技術說法：

`StandardScaler` 會把訓練資料轉成平均數為 0、標準差為 1。

> 精確度補充：`StandardScaler` 對**訓練資料**做 `fit_transform` 後，輸出結果是**精確的** mean=0, std=1（到機器精度）。對測試集或新資料套用同一個 scaler 時，因為使用的是訓練集學到的參數，結果才是**近似的** mean≈0, std≈1。

```text
z = (x - μ) / σ
```

其中 `μ` 是平均數，`σ` 是標準差。

一步一步例子：

```text
原始資料：[20, 30, 40]

Step 1：找平均數與標準差
平均數 μ = 30
標準差 σ ≈ 8.165

Step 2：計算 x = 40 的 z-score
x = 40
z = (40 - 30) / 8.165 ≈ 1.225
```

比較表這樣讀：

| 常考敘述 | 正確觀念 |
|---|---|
| 訓練集轉換後平均精確為 0、標準差精確為 1 | StandardScaler |
| 輸出一定在 `[0,1]` | 錯，StandardScaler 沒有固定範圍 |
| PCA 前常需要處理尺度 | 常想到 StandardScaler |

記憶方式：

```text
Standardization = 平均 0、標準差 1；不是固定到 [0,1]
```

#### 2.3 Robust Scaling

先懂一句話：

```text
穩健縮放（Robust Scaling）= 用中位數與 IQR 當尺，比較不被極端值影響
```

Everyday Analogy：

如果班上有一個超級富有的學生，平均零用錢會被他拉高。這時看「中位數」比較公平，因為中位數代表中間位置，不會被一個極端值拖走。

技術說法：

`RobustScaler` 用`中位數（Median）`和`IQR（Interquartile Range，四分位距）`，所以比 `StandardScaler` 或 `MinMaxScaler` 更不怕異常值。

```text
x' = (x - median) / IQR
IQR = Q3 - Q1
```

一步一步例子：

```text
資料：[80, 90, 100, 110, 500]

Step 1：找中位數與四分位距
median = 100
Q1 = 90
Q3 = 110
IQR = 20

Step 2：計算 x = 110
x = 110
x' = (110 - 100) / 20 = 0.5
```

記憶方式：

```text
Robust = median + IQR = 異常值很多時優先想到
```

#### 2.4 三種 Scaling 快速比較

先問自己一個問題：

```text
題目要固定範圍、平均標準差，還是抗異常值？
```

比較表這樣讀：

| 方法 | 先用白話記 | sklearn 類別 | 核心公式 / 參數 | 輸出範圍 | 怕不怕異常值 | 考題關鍵字 |
|---|---|---|---|---|---|---|
| Min-Max | 固定到一段範圍 | `MinMaxScaler` | `(x-min)/(max-min)` | 常見 `[0,1]` | 很怕 | 固定範圍、0 到 1 |
| Standardization | 看離平均幾個標準差 | `StandardScaler` | `(x-μ)/σ` | 無固定範圍 | 怕 | 平均 0、標準差 1、z-score |
| Robust Scaling | 用中位數和 IQR 當尺 | `RobustScaler` | `(x-median)/IQR` | 無固定範圍 | 較不怕 | 異常值、outliers、IQR |

### Exam Rule

```text
需要固定到 [0,1] → MinMaxScaler
平均 0、標準差 1 → StandardScaler
異常值很多、outliers、robust → RobustScaler
中心是 median、尺度是 IQR → RobustScaler
```

### Quick Check

題目：資料中有多數消費落在 100 到 300 元，但少數資料是 20000 元。若要縮放且不想被極端值拖走，應選哪一個 scaler？

答案：`RobustScaler`。因為它使用 median 與 IQR，比 mean/std 或 min/max 更不容易被異常值破壞。

---

## 3. Distribution Transforms：Log、Box-Cox、Quantile 🔥🔥🔥

### 先懂一句話

```text
分佈轉換（Distribution Transform）= 修資料形狀，不只是修數字大小
```

當資料右偏、長尾、跨度很大，或分佈非常不規則時，分佈轉換能讓資料更容易觀察與分析。

### Everyday Analogy

粉絲數或收入常常是少數人超大、多數人較小。直接看原始數字會被少數超大值吸走注意力；做分佈轉換就像把音量太大的地方壓小，讓整體更容易聽出差異。

### 先問自己一個問題

```text
我的問題是「欄位尺度不公平」，還是「資料分佈形狀太歪」？
```

如果題目說右偏、長尾、少數超大值、想變 normal / uniform，就往 `Distribution Transform` 想。

### 技術說法

`分佈轉換（Distribution Transform）`會改變資料的分佈形狀。它比 scaling 更積極，可能壓縮大值、調整偏態，或把資料映到指定分佈。

### 在整體流程中的位置

```text
原始數值資料
→ 發現右偏、長尾、怪分佈
→ Distribution Transform
→ 再視需要 scaling
→ 分析或建模
```

### Key Concepts

#### 3.1 Log Transform

先懂一句話：

```text
對數轉換（Log Transform）= 把很大的數字壓小，常用於右偏 / 長尾資料
```

Everyday Analogy：

像把音量太大的麥克風調小。原本 1、10、100、1000 差距很誇張，做 log 後仍保留大小順序，但大值不會那麼壓倒其他資料。

技術說法：

`Log Transform` 常用來壓縮右偏資料的大值。

```text
x' = ln(x)
```

如果資料包含 0，常用：

```text
log1p(x) = ln(x + 1)
```

一步一步例子：

```text
原始資料：[1, 10, 100, 1000]

Step 1：對每個值取自然對數 ln(x)
ln(1) = 0
ln(10) ≈ 2.303
ln(100) ≈ 4.605
ln(1000) ≈ 6.908

Step 2：看差距
原本每次差 10 倍
轉換後差距被壓縮成比較平滑的間距
```

比較表這樣讀：

| 題目狀況 | 正確判斷 | 考試記法 |
|---|---|---|
| `x > 0` 且右偏 | 可用 `ln(x)` | 正值右偏可 log |
| 有 0 | 可考慮 `log1p(x)` | `ln(0)` 不存在 |
| 有負值 | 不能直接用 `ln(x)` | log 不能直接吃負值 |
| `log1p(x)` | 是 `ln(x+1)`，不是 `ln(x)+1` | `p` 想成 plus inside |

記憶方式：

```text
Log Transform = 壓縮大值；log1p(x) = ln(x+1)
```

#### 3.2 Box-Cox Transform

先懂一句話：

```text
Box-Cox Transform = 正值資料的彈性版 log / power transform
```

Everyday Analogy：

如果 log 像固定的一段音量壓縮器，Box-Cox 像可以調旋鈕的壓縮器。旋鈕就是 `λ`，資料會幫你估比較合適的轉換強度。

技術說法：

`Box-Cox 轉換（Box-Cox Transform）`是`冪次轉換（Power Transform）`的一種，常用在右偏且全為正值的資料。

```text
x'(λ) = (x^λ - 1) / λ, λ ≠ 0
x'(0) = ln(x)
```

比較表這樣讀：

| 條件 / 參數 | 意義 |
|---|---|
| `x > 0` | Box-Cox 必須是正值資料 |
| `λ = 0` | 退化成 log transform |
| `λ = 1` | 線性偏移，分佈形狀大致不變 |
| `λ` | 通常由資料估計，不是手動亂猜 |

一步一步例子：

```text
x = 9, λ = 0.5

Step 1：代入公式
x'(0.5) = (9^0.5 - 1) / 0.5

Step 2：先算 9^0.5
9^0.5 = 3

Step 3：完成計算
        = (3 - 1) / 0.5
        = 4
```

`sklearn` 常見寫法：

```python
from sklearn.preprocessing import PowerTransformer

pt = PowerTransformer(method="box-cox", standardize=True)
X_train_bc = pt.fit_transform(X_train_positive)
X_test_bc = pt.transform(X_test_positive)
```

提醒：`PowerTransformer()` 常見預設是 `method="yeo-johnson"`；若題目要 Box-Cox，要看是否明確指定 `method="box-cox"`。

記憶方式：

```text
Box-Cox = positive only；λ = 0 時就是 log
```

#### 3.3 Yeo-Johnson Transform

先懂一句話：

```text
Yeo-Johnson Transform = 可處理 0 與負值的 power transform
```

Everyday Analogy：

Box-Cox 像只收正分數的規則；Yeo-Johnson 像比較寬鬆的規則，遇到 0 或負值也還能處理。

技術說法：

`Yeo-Johnson` 也是 `PowerTransformer` 支援的冪次轉換。它可以處理 0 與負值。

本課只要記住：

| 方法 | 是否要求正值 |
|---|---|
| Box-Cox | 要求 `x > 0` |
| Yeo-Johnson | 可處理 0 與負值 |

記憶方式：

```text
題目說 power transform + 含 0 或負值 → 不要選 Box-Cox，想到 Yeo-Johnson
```

#### 3.4 Quantile Transform

先懂一句話：

```text
分位數（Quantile）= 排名位置 / 百分等級
分位數轉換（Quantile Transform）= 先看排名，再把排名換成指定分佈
```

先不要想公式。把 `分位數（Quantile）`想成「這個數值在全班排名的位置」。重點不是原本數字有多大，而是它排在第幾名、比多少比例的資料還大。

Everyday Analogy：

像老師不直接看原始分數，而是先看百分等級（percentile rank）。

```text
90 分 → 可能是前 10%
70 分 → 可能是中間 50%
```

所以分位數轉換不是問「90 比 70 多 20 分」，而是問「90 在班上排多前面、70 在班上排哪裡」。

技術說法：

`分位數轉換（Quantile Transform）`會先把資料排序，改成「排名位置 / 百分等級」，再把這些位置重新對應到目標分佈（target distribution），例如 `uniform` 或 `normal`。

流程：

```text
原始資料
→ 排序
→ 找每個值的分位位置（排名比例）
→ 映到 output_distribution="uniform" 或 "normal"
```

一步一步例子：

```text
資料：[10, 20, 30, 100]

Step 1：排序後位置
10  → 排第 1 / 4 → 最低位置 → 0.00
20  → 排第 2 / 4 → 約 1/3 位置 → 0.33
30  → 排第 3 / 4 → 約 2/3 位置 → 0.67
100 → 排第 4 / 4 → 最高位置 → 1.00

Step 2：把原始數值改成排名位置
[10, 20, 30, 100]
→ [0.00, 0.33, 0.67, 1.00]
```

記憶方式：

```text
Quantile Transform 重點不是「縮放數字」，而是「改看排名」。
```

所以 `100` 雖然比 `30` 大很多，但轉換後只代表它是最高排名，不會保留原本 `100 - 30 = 70` 的距離。

`sklearn` 常見寫法：

```python
from sklearn.preprocessing import QuantileTransformer

qt = QuantileTransformer(
    n_quantiles=1000,
    output_distribution="normal",
    random_state=42
)
X_train_qt = qt.fit_transform(X_train)
X_test_qt = qt.transform(X_test)
```

Exam Rule：

```text
題目看到分佈很怪、想把資料轉成 uniform / normal → 想 QuantileTransformer
題目強調保留原本數值距離或線性關係 → 小心 QuantileTransformer
```

風險：`QuantileTransformer` 是非線性轉換（nonlinear transform），可能扭曲原本的線性關係。

#### 3.5 三種分佈轉換比較

先懂一句話：

```text
Log Transform = 壓縮很大的數字
Box-Cox Transform = 對正值資料做更彈性的 log 類轉換
Quantile Transform = 不看原始距離，改看排名 / 百分等級
```

Everyday Analogy：

想像老師在處理一班學生的成績或收入資料：

```text
Log Transform
→ 分數差距太誇張，先把特別大的差距壓小

Box-Cox Transform
→ 老師知道資料都是正數，想找一種比 log 更彈性的壓縮方式

Quantile Transform
→ 老師不看原始分數差多少，只看每個人在班上的百分等級（percentile rank）
```

先問自己一個問題：

```text
我現在想修的是「數值差距太大」，還是「整個分佈形狀很怪」？
```

比較表這樣讀：

| 方法 | 先用白話記 | 適合情境 | 條件 | 風險 |
|---|---|---|---|---|
| Log Transform | 把很大的差距壓小 | 右偏、長尾、倍率差距大，例如金額、流量、次數 | `ln(x)` 需 `x > 0`；有 0 可用 `log1p(x)` | 不能直接處理負值 |
| Box-Cox Transform | 正值資料的彈性版 log | 右偏且全部大於 0，題目提 power transform 或 `λ` | 必須 `x > 0` | 不是萬用答案；遇到 0 或負值不適合 |
| Quantile Transform | 改看排名 / 百分等級 | 分佈很怪，想映到 `uniform` 或 `normal` | 數值資料 | 非線性，可能扭曲原本線性關係 |

選擇流程：

```text
資料右偏、長尾、倍率差距大？
→ 先想 Log Transform

資料包含 0，但還是想做類似 log 的壓縮？
→ 想 log1p(x) = ln(x + 1)

資料全部 > 0，而且題目提 power transform / λ？
→ 想 Box-Cox Transform

資料分佈很怪，題目想轉成 uniform / normal？
→ 想 Quantile Transform / QuantileTransformer

題目強調保留原本數值距離或線性關係？
→ 小心 Quantile Transform，因為它會改看排名
```

### Exam Rule

```text
右偏、長尾、金額、流量、次數 → Log Transform
右偏且全部大於 0，題目提 power transform / λ → Box-Cox Transform
Box-Cox 的 λ = 0 → log transform
分佈很怪，想映到 uniform / normal → QuantileTransformer
資料包含 0 又想做類 log 壓縮 → log1p(x)
```

### Quick Check

題目：資料是 `[0, 1, 3, 10]`，題目希望做類似 log 的壓縮。為什麼不能直接用 `ln(x)`？應想到什麼？

答案：因為 `ln(0)` 不存在。可想到 `log1p(x) = ln(x+1)`。

---

### 3.6 大數據抽樣技術 🔥🔥

### 先懂一句話

```text
大數據抽樣（Sampling）= 資料太大不能全看時，抽一部分但盡量保持代表性
```

### Everyday Analogy

像試喝一大鍋湯，不會把整鍋喝完才判斷味道，而是取一小匙。但這一小匙要攪拌均勻後再取，才比較能代表整鍋湯。

### 先問自己一個問題

```text
資料是一般靜態資料、類別不平衡，還是資料流？
```

### 技術說法

大數據統計常需依賴抽樣而非全量計算，抽樣方法的選擇會影響統計推論的可靠性。

### Key Concepts

比較表這樣讀：

| 技術 | 說明 | 使用場景 |
|---|---|---|
| 簡單隨機抽樣 | 每筆資料被選中的機率相等 | 資料分佈均勻 |
| 分層抽樣 (Stratified Sampling) | 按類別比例抽取，確保各類別都有代表 | 類別不平衡資料 |
| 蓄水池抽樣 (Reservoir Sampling) | 在資料流中不知總量的情況下均勻抽樣 | 串流大數據、無法一次讀入記憶體 |

### Exam Rule

```text
題目問「資料太大無法全部讀入記憶體，如何抽樣」→ 蓄水池抽樣
題目問「類別不平衡，抽樣時每類都要有代表」→ 分層抽樣
題目問「最基本的隨機抽樣、每筆機率相等」→ 簡單隨機抽樣
```

### Quick Check

題目：資料是串流進來的，總筆數一開始不知道，但想維持均勻抽樣，應想到哪個方法？

答案：`蓄水池抽樣（Reservoir Sampling）`。因為它適合資料流與未知總量的抽樣情境。

---

## 4. Data Diagnostics：看資料特徵選方法 🔥🔥🔥

### 先懂一句話

```text
Data Diagnostics = 先看資料症狀，再選前處理方法
```

考試真正想測的是：你能不能先看資料問題，再選方法。不要一看到 transformation 就固定選 Box-Cox；要先判斷題目在問「範圍、尺度、異常值、右偏，還是怪分佈」。

### Everyday Analogy

這像看病：發燒、咳嗽、胃痛不會吃同一種藥。資料前處理也是一樣，先看症狀，再選工具。

### 先問自己一個問題

```text
題目描述的是哪一種資料症狀？
```

先抓症狀，再看限制條件。不要先背工具名。

### 技術說法

`資料診斷（Data Diagnostics）`不是一個單一 sklearn 類別，而是一個判斷流程：看資料特徵，選 scaling、distribution transform 或 sampling 方法。

### 在整體流程中的位置

```text
觀察資料症狀
→ 判斷是 scaling 問題或 distribution 問題
→ 選 MinMax / Standard / Robust / Log / Box-Cox / Quantile
→ 檢查轉換後是否符合需求
```

### Key Concepts

比較表這樣讀：

| 資料症狀 | 代表問題 | 優先想到 | 白話記法 |
|---|---|---|---|
| 欄位單位差很多 | 尺度不一致 | StandardScaler | 先統一尺度 |
| 後續系統要求 `[0,1]` | 固定範圍 | MinMaxScaler | 壓到指定範圍 |
| 少數極端值很大 | 異常值 | RobustScaler | 用 median / IQR 抗極端值 |
| 大多數小、少數超大 | 右偏 / 長尾 | Log Transform | 壓縮大值 |
| 右偏、全部正值、想估轉換強度 | 冪次轉換 | Box-Cox | 正值資料彈性版 log |
| 分佈多峰、很不規則 | 分佈形狀很怪 | QuantileTransformer | 改看排名 / 百分等級 |

常見情境：

| 情境 | 輸入特徵 | 常見答案 | 判斷關鍵 |
|---|---|---|---|
| 薪資、房價、流量 | 正值、右偏、少數超大 | Log / Box-Cox | 長尾與大值 |
| 感測器數值要送進只收 `[0,1]` 的系統 | 需要固定範圍 | MinMaxScaler | 題目指定範圍 |
| 消費金額混入豪客極端值 | outliers 明顯 | RobustScaler | 異常值 |
| 年收入、登入次數、停留秒數一起分析 | 量級差異大 | StandardScaler | 多欄位尺度不一 |
| 想把資料映成 normal | 目標分佈指定 | QuantileTransformer | uniform / normal |

選擇流程：

```text
題目指定 [0,1]？
→ MinMaxScaler

題目說平均 0、標準差 1、z-score？
→ StandardScaler

題目說 outliers、異常值、robust？
→ RobustScaler

題目說右偏、長尾、金額、流量？
→ Log / Box-Cox

題目說映到 uniform / normal、分佈很怪？
→ QuantileTransformer
```

記憶方式：

```text
範圍看 MinMax；平均標準差看 Standard；異常值看 Robust；形狀太歪看分佈轉換
```

### Exam Rule

```text
範圍問題 → MinMaxScaler
尺度問題 → StandardScaler
異常值問題 → RobustScaler
右偏問題 → Log / Box-Cox
怪分佈、映到 uniform / normal → QuantileTransformer
```

### Quick Check

題目：若考題說「資料分佈很不規則，想轉成近似常態分佈，而且可接受非線性轉換」，應選哪個工具？

答案：`QuantileTransformer(output_distribution="normal")`。因為題目指定目標分佈並接受非線性映射。

---

## 5. sklearn.preprocessing API 🔥🔥🔥

### 先懂一句話

```text
sklearn.preprocessing API = 訓練集學規則，測試集只套規則
```

最重要的 API 觀念是：訓練集用 `fit` 學規則，測試集只用 `transform` 套規則。

### Everyday Analogy

想像你用去年的全公司薪資訂出高、中、低標準，再拿今年新人的薪資來套同一把尺。你不能每來一批新人就重新訂標準，否則不同批次就不能公平比較。

### 先問自己一個問題

```text
這行程式是在「學規則」，還是只是「套已經學好的規則」？
```

### 技術說法

`fit()` 會從資料估參數；`transform()` 會使用已估好的參數轉換資料；`fit_transform()` 是先 `fit` 再 `transform`。

### 在整體流程中的位置

```text
X_train
→ fit 或 fit_transform：學參數並轉換訓練資料
→ X_test
→ transform：只套用訓練資料學到的參數
```

### Key Concepts

#### 5.1 fit、transform、fit_transform

比較表這樣讀：

| API | 做什麼 | 考試翻譯 | 常用在哪裡 |
|---|---|---|---|
| `fit(X_train)` | 從訓練資料學參數 | 學規則 | 訓練集 |
| `transform(X)` | 用已學參數轉換資料 | 套規則 | 訓練集或測試集 |
| `fit_transform(X_train)` | 先 `fit` 再 `transform` | 學完立刻套 | 訓練集常用 |

不同工具會學到不同參數：

| 工具 | `fit` 學到什麼 | 白話記法 |
|---|---|---|
| `StandardScaler` | mean、variance / scale | 學平均與標準差 |
| `MinMaxScaler` | min、max | 學最小與最大 |
| `RobustScaler` | median、IQR | 學中位數與四分位距 |
| `QuantileTransformer` | 分位數 / ECDF | 學排名位置 / 百分等級 |
| `PowerTransformer` | lambda 等轉換參數 | 學 power transform 強度 |

記憶方式：

```text
fit = 學尺
transform = 用尺量
fit_transform = 先做一把尺，再立刻量
```

#### 5.2 常見程式碼

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

```python
from sklearn.preprocessing import RobustScaler

scaler = RobustScaler(quantile_range=(25, 75))
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

```python
from sklearn.preprocessing import PowerTransformer

pt = PowerTransformer(method="box-cox", standardize=True)
X_train_pt = pt.fit_transform(X_train_positive)
X_test_pt = pt.transform(X_test_positive)
```

```python
from sklearn.preprocessing import QuantileTransformer

qt = QuantileTransformer(output_distribution="normal", random_state=42)
X_train_qt = qt.fit_transform(X_train)
X_test_qt = qt.transform(X_test)
```

程式碼這樣讀：

```text
X_train_* = scaler.fit_transform(X_train)
→ 用訓練集學參數，並轉換訓練集

X_test_* = scaler.transform(X_test)
→ 測試集只套用訓練集學到的參數
```

### Exam Rule

```text
fit → 學參數
transform → 套已學參數
fit_transform → 先學再套
訓練集 → fit_transform
測試集 → transform，不要重新 fit
```

### Quick Check

題目：為什麼測試集不應該重新呼叫 `fit_transform()`？

答案：因為測試集重新 `fit` 會用測試資料重新估參數，造成資料洩漏觀念錯誤，也讓訓練集和測試集使用不同尺度。

---

## 6. Task / Scenario Selection 🔥🔥🔥

### 先懂一句話

```text
Scenario Selection = 先抓題目要求，再選工具
```

本課不是問哪個方法最潮，而是問哪個方法最符合題目條件。

### Everyday Analogy

你買工具前會先看要修什麼：要量長度拿尺，要鎖螺絲拿螺絲起子，要剪紙拿剪刀。資料轉換也是先看任務需求，再拿對工具。

### 先問自己一個問題

```text
題目要求的輸出是什麼？限制條件是什麼？
```

先看輸出，再看限制條件，最後才選工具。

### 技術說法

情境選擇題通常把答案藏在關鍵字裡，例如 `[0,1]`、`mean=0`、`outliers`、`right-skewed`、`lambda`、`uniform / normal`、`fit_transform`。

### 在整體流程中的位置

```text
先看資料症狀 / scenario requirement
→ 判斷任務類型
→ 選轉換方法或 sklearn 工具
→ 檢查限制條件
```

### Key Concepts

比較表這樣讀：

| 任務 / 場景 | 輸入 | 目標輸出 | 常見答案 | 判斷關鍵 |
|---|---|---|---|---|
| 固定數值範圍 | 數值欄位 | `[0,1]` 或指定範圍 | `MinMaxScaler` | fixed range |
| 統一量級 | 多個不同單位欄位 | 平均 0、標準差 1 | `StandardScaler` | z-score / mean std |
| 降低異常值影響 | 有 outliers 的數值欄位 | 以 median / IQR 縮放 | `RobustScaler` | robust / IQR |
| 壓縮右偏長尾 | 正值、右偏資料 | 大值被壓縮 | `Log Transform` | right-skewed / long tail |
| 彈性修正右偏正值分佈 | `x > 0` | Box-Cox 轉換後資料 | `PowerTransformer(method="box-cox")` | power transform / λ |
| 映到指定分佈 | 任意數值分佈 | uniform 或 normal | `QuantileTransformer` | output_distribution |
| 套用同一組前處理規則 | train / test 資料 | 一致尺度 | train `fit_transform`、test `transform` | avoid refit |

選擇流程：

```text
先看輸出形式
→ 固定範圍？平均標準差？分位數？分佈形狀？

再看限制條件
→ 是否有 0？是否有負值？是否有異常值？是否右偏？

最後選工具
→ MinMax / Standard / Robust / Log / Box-Cox / Quantile
```

記憶方式：

```text
先需求，後限制，最後工具
```

### Exam Rule

```text
先看輸出形式 → 固定範圍、平均標準差、分位數、還是分佈形狀
再看限制條件 → 是否有 0、負值、異常值、右偏
最後選工具 → MinMax / Standard / Robust / Log / Box-Cox / Quantile
```

### Quick Check

題目：題目說「某欄位全部大於 0，分佈右偏，並希望用可估計 λ 的 power transform」，答案最可能是什麼？

答案：`Box-Cox Transform`。因為它是要求正值資料的 power transform，且會估計 `λ`。

---

## 7. High-Frequency Comparisons and Memory Hooks 🔥🔥

### 先懂一句話

```text
High-Frequency Comparisons = 考你分辨相似名詞，不是只背定義
```

最重要的三組比較是：Standardization vs Normalization、Scaling vs Distribution Transform、Log vs Box-Cox vs Quantile。

### Everyday Analogy

這像考駕照時分辨相似路標。每個標誌看起來都跟交通有關，但真正考點是你能不能看到細節後做出正確反應。

### 先問自己一個問題

```text
這兩個名詞差在哪一個判斷點？
```

不要只背名字，要背「分界線」。

### 技術說法

比較題常把錯誤選項寫得很像正確答案，例如把 `Standardization` 說成 `[0,1]`，或把 `QuantileTransformer` 說成線性縮放。

### 在整體流程中的位置

```text
看到題目關鍵字
→ 排除相似但錯的選項
→ 根據限制條件選正確答案
```

### Key Concepts

#### 7.1 Standardization vs Normalization

先懂一句話：

```text
Standardization = 看離平均幾個標準差
Normalization / Min-Max = 看在最小到最大之間的位置
```

| 概念 | Standardization | Normalization / Min-Max |
|---|---|---|
| 中文 | 標準化 | 正規化 |
| 核心 | 看離平均多遠 | 看在最小到最大之間的位置 |
| 公式 | `z = (x - μ) / σ` | `x' = (x-min)/(max-min)` |
| 輸出 | 平均 0、標準差 1 | 常見 `[0,1]` |
| 常見工具 | `StandardScaler` | `MinMaxScaler` |

記法：

```text
標準看平均，正規看區間
```

#### 7.2 Scaling vs Distribution Transform

先懂一句話：

```text
Scaling = 修尺度
Distribution Transform = 修形狀
```

| 概念 | 解決什麼 | 例子 |
|---|---|---|
| Scaling | 數值尺度、範圍、量級 | MinMax、Standard、Robust |
| Distribution Transform | 分佈形狀、右偏、長尾、怪分佈 | Log、Box-Cox、Quantile |

記法：

```text
量級不一 → Scaling
形狀太歪 → Distribution Transform
```

#### 7.3 Log vs Box-Cox vs Quantile

先懂一句話：

```text
Log = 壓縮大值
Box-Cox = 正值資料的彈性版 log
Quantile = 改看排名 / 百分等級
```

比較表這樣讀：

| 概念 | 一句話記法 | 常見陷阱 |
|---|---|---|
| Log | 右偏用 log，含 0 想 `log1p` | `log1p(x)` 不是 `log(x)+1` |
| Box-Cox | 正值可 Box，`λ=0` 變 log | 不能直接處理 0 或負值 |
| Quantile | 怪形用 Quantile，但小心非線性 | 不是線性縮放，可能扭曲線性關係 |

### Exam Rule

```text
Normalization = z-score → 錯
StandardScaler = [0,1] → 錯
Log = Box-Cox 的 λ=0 特例 → 對
QuantileTransformer 是線性縮放 → 錯
Box-Cox 可處理負值 → 錯
```

### Quick Check

題目：`StandardScaler` 和 `MinMaxScaler` 最大差異是什麼？

答案：`StandardScaler` 讓資料以平均 0、標準差 1 為尺度；`MinMaxScaler` 把資料壓到固定範圍，常見是 `[0,1]`。

---

## 8. Exam Decision Trees 🔥🔥🔥

### 8.1 先判斷題目在問哪種問題

```text
題目描述數值資料前處理？
│
├─ 強調輸出固定範圍，例如 [0,1]？
│  └─ 選 MinMaxScaler
│
├─ 強調平均 0、標準差 1、z-score？
│  └─ 選 StandardScaler
│
├─ 強調 outliers、異常值、robust？
│  └─ 選 RobustScaler
│
├─ 強調右偏、長尾、金額、流量、倍率差距？
│  └─ 看資料條件
│     ├─ 有 0 → log1p(x)
│     ├─ 全部 > 0 且題目提 λ / power transform → Box-Cox
│     └─ 一般正值右偏 → Log Transform
│
└─ 強調映到 uniform / normal 或分佈很怪？
   └─ 選 QuantileTransformer
```

### 8.2 sklearn API 判斷

```text
題目問 fit / transform？
│
├─ fit()
│  └─ 從資料學參數
│
├─ transform()
│  └─ 套用已學參數
│
├─ fit_transform()
│  └─ fit + transform，常用在訓練集
│
└─ 測試集如何處理？
   └─ 只用 transform，不重新 fit
```

### 8.3 Box-Cox / Log / Yeo-Johnson 判斷

```text
題目問 power transform？
│
├─ 資料全部 > 0？
│  ├─ 是 → 可用 Box-Cox
│  └─ 否 → Box-Cox 不適合
│
├─ λ = 0？
│  └─ 等於 log transform
│
└─ 資料含 0 或負值，仍要 power transform？
   └─ 想到 Yeo-Johnson
```

---

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：Normalization 就是 z-score

錯。`z-score` 是`標準化（Standardization）`，常見公式是 `(x-μ)/σ`。

Exam fix：

```text
平均 0、標準差 1 → Standardization / StandardScaler
固定到 [0,1] → Normalization / MinMaxScaler
```

### Trap 2：StandardScaler 會把資料壓到 0 到 1

錯。`StandardScaler` 沒有固定輸出範圍，它只把資料改成平均 0、標準差 1 的尺度。

Exam fix：

```text
[0,1] → MinMaxScaler
mean=0, std=1 → StandardScaler
```

### Trap 3：有異常值時 MinMaxScaler 最安全

錯。`MinMaxScaler` 的 `min` 和 `max` 會直接被極端值拉走。

Exam fix：

```text
outliers / 異常值很多 / robust → RobustScaler
```

### Trap 4：RobustScaler 用 mean 和 standard deviation

錯。`RobustScaler` 用的是 `median` 和 `IQR`。

Exam fix：

```text
median + IQR → RobustScaler
mean + std → StandardScaler
```

### Trap 5：Box-Cox 對所有數值資料都適用

錯。`Box-Cox` 要求資料 `x > 0`。

Exam fix：

```text
Box-Cox → positive data only
含 0 或負值 → 不可直接用 Box-Cox
```

### Trap 6：Log transform 和 Box-Cox 完全一樣

錯。`log transform` 是 `Box-Cox` 在 `λ = 0` 時的特例，不代表兩者永遠相同。

Exam fix：

```text
Box-Cox λ=0 → log
Box-Cox λ 由資料估計 → 比單純 log 更彈性
```

### Trap 7：log1p(x) = log(x) + 1

錯。`log1p(x)` 是 `ln(x+1)`。

Exam fix：

```text
資料含 0 且想做 log 類轉換 → log1p(x)=ln(x+1)
```

### Trap 8：QuantileTransformer 是線性縮放

錯。`QuantileTransformer` 是非線性分位數映射，可能扭曲原本線性關係。

Exam fix：

```text
依排序 / 分位數 / ECDF / 映到 uniform 或 normal → QuantileTransformer
可能扭曲線性關係 → QuantileTransformer 的風險
```

### Trap 9：測試集也要 fit_transform

錯。測試集應只用訓練集學到的參數做 `transform`。

Exam fix：

```text
X_train → fit_transform
X_test → transform
```

---

## 10. Practice Questions

### 10.1 Scaling

**Q1.** 題目說「希望把資料壓到 `[0,1]`」，最直接想到哪個方法？

答案：`MinMaxScaler`。
理由：Min-Max normalization 常用來輸出固定範圍 `[0,1]`。

**Q2.** `StandardScaler` 的輸出特性是什麼？

答案：對訓練資料的輸出是**精確的** mean=0, std=1；對測試集套用同一 scaler 時則是近似值。
理由：Standardization 使用公式 `z = (x - μ) / σ`，μ 與 σ 在 fit 時從訓練集精確計算，訓練集轉換結果因此精確；測試集使用相同參數，結果因資料分佈不同而近似。

**Q3.** 有大量異常值時，為什麼 `RobustScaler` 通常比 `StandardScaler` 更合適？

答案：因為 `RobustScaler` 使用 median 和 IQR。
理由：median / IQR 比 mean / std 不容易被極端值拖走。

**Q4.** `MinMaxScaler` 為什麼怕異常值？

答案：因為它依賴 `min` 和 `max`。
理由：一個極端值就會拉大範圍，讓正常資料被擠在很小區間。

**Q5.** 題目提到「PCA 前常需先統一尺度」，常見答案會是哪個？

答案：`StandardScaler`。
理由：PCA 對尺度敏感，常先做標準化。

### 10.2 Distribution Transforms

**Q6.** 資料右偏且全部是正值，想簡單壓縮大值，應想到什麼？

答案：`Log Transform`。
理由：log 常用來壓縮右偏長尾的大值。

**Q7.** 資料包含 0，但仍想做類似 log 的轉換，應想到哪個公式？

答案：`log1p(x) = ln(x+1)`。
理由：`ln(0)` 不存在，`log1p` 可以處理 0。

**Q8.** `Box-Cox Transform` 對資料有什麼重要限制？

答案：資料必須 `x > 0`。
理由：Box-Cox 不能直接用在 0 或負值資料。

**Q9.** Box-Cox 中 `λ = 0` 時代表什麼？

答案：退化成 log transform。
理由：Box-Cox 定義中 `λ = 0` 時使用 `ln(x)`。

**Q10.** 題目說「想把分佈映到 normal，而且可接受非線性轉換」，最可能是哪個工具？

答案：`QuantileTransformer(output_distribution="normal")`。
理由：QuantileTransformer 可依分位數映到 normal 或 uniform。

### 10.3 sklearn API

**Q11.** `fit()` 在 preprocessing 中代表什麼？

答案：從資料學參數。
理由：不同 scaler 會學 mean/std、min/max、median/IQR 等參數。

**Q12.** `transform()` 代表什麼？

答案：套用已經學到的參數。
理由：它不重新估參數，只用既有規則轉換資料。

**Q13.** `fit_transform()` 代表什麼？

答案：先 `fit` 再 `transform`。
理由：訓練集常用 `fit_transform()` 完成學參數與轉換。

**Q14.** 為什麼 `X_test` 不應該重新 `fit_transform()`？

答案：因為會重新用測試集估參數。
理由：這會造成資料洩漏觀念錯誤，也讓 train/test 使用不同尺度。

**Q15.** `PowerTransformer(method="box-cox")` 需要什麼樣的輸入？

答案：正值資料。
理由：Box-Cox 要求 `x > 0`。

### 10.4 Mixed Traps

**Q16.** 「Normalization 和 Standardization 是同義詞」這句對嗎？

答案：不對。
理由：考題中 Standardization 通常指 z-score；Normalization 常指 Min-Max。

**Q17.** 「QuantileTransformer 不會改變線性關係，只是線性縮放」這句對嗎？

答案：不對。
理由：QuantileTransformer 是非線性分位數映射，可能扭曲線性關係。

**Q18.** 資料是薪資欄位，少數人薪資非常高，大多數人集中在較低區間。常見處理是什麼？

答案：`Log Transform` 或 `Box-Cox Transform`。
理由：薪資常是右偏正值資料，適合壓縮長尾。

**Q19.** 題目看到「中心是 median，尺度是 IQR」，答案是什麼？

答案：`RobustScaler`。
理由：median / IQR 是 Robust Scaling 的核心。

**Q20.** 題目看到 `output_distribution="uniform"`，最可能是哪個 sklearn 類別？

答案：`QuantileTransformer`。
理由：QuantileTransformer 可把資料映到 uniform 或 normal。

**Q21.** 「Box-Cox 的 λ 一定要手動指定」這句對嗎？

答案：不對。
理由：λ 通常由資料估計，不是手動亂猜。

**Q22.** 「資料有負值，所以可直接用 Box-Cox」這句對嗎？

答案：不對。
理由：Box-Cox 要求正值；若是 power transform 且含 0 或負值，可想到 Yeo-Johnson。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 本課核心是資料前處理：量級問題做 scaling，分佈形狀問題做 distribution transform。
2. 固定到 `[0,1]` 選 `MinMaxScaler`，平均 0 標準差 1 選 `StandardScaler`。
3. 異常值多選 `RobustScaler`，因為它用 median 和 IQR。
4. 右偏、長尾、金額、流量、次數常想到 `Log Transform`。
5. `Box-Cox` 是正值資料的 power transform，`λ=0` 時是 log。
6. `QuantileTransformer` 用分位數映到 uniform 或 normal，但它是非線性轉換。
7. sklearn 記住：訓練集 `fit_transform`，測試集 `transform`。

---

## Final Study Advice

不要只背名詞。考試真正想測的是你能不能從題目描述判斷：這是在問範圍、尺度、異常值、右偏，還是 sklearn API 的參數學習流程。先抓關鍵字，再選方法，通常就能排除大部分陷阱選項。

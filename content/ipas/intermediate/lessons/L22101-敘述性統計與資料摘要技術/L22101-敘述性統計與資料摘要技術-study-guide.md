# L22101 敘述性統計與資料摘要技術 — Study Guide v2

## 0. How to Use This Guide

這份筆記的讀法是：先用一句話抓住直覺，再看生活比喻，最後才進入正式術語與公式。遇到表格時，不要一列一列死背；先看「題目問什麼」，再選對應的統計量或 API。

建議先讀第 1 節的大地圖，再讀第 2 到第 7 節的核心概念。每一節都會盡量照這個順序走：

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 一步一步例子
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check
```

讀完每一節後，立刻做該節的 Quick Check，因為答案就在題目下方，可以馬上確認自己有沒有抓到考點。

第 8 節和第 9 節是考前判斷用：看到題目關鍵字時，快速決定要用哪個統計量、哪個 API、哪個離群值規則。第 10 節是練選擇題語感，不要只背答案，要看理由。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

本課不重點考假說檢定（hypothesis testing）、p-value、PMF、CDF、機率分布推導，也不考建模特徵工程。考試重點是「小資料集計算 + 表格/API 輸出判讀」。

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

敘述性統計（Descriptive Statistics）是在建模或推論前，先把一組資料摘要成「中心在哪裡、分散多大、形狀如何、資料乾不乾淨」。考試通常不是叫你推導公式，而是要你看懂數字、表格、圖和 Python API 的意思。

### Everyday Analogy

像看一批薪資資料，你不會一筆一筆講完，而是先看平均薪資、中位數薪資、差距大不大、有沒有幾筆超高薪把平均拉高。

### 先問自己一個問題

這題是在問「資料長什麼樣」，還是在問「資料能不能拿去做更進一步分析」？

如果只是要描述資料現況，通常就是敘述性統計（Descriptive Statistics）的範圍。

### 技術說法

敘述性統計（Descriptive Statistics）不是要證明假設，也不是要預測未來，而是把資料摘要成幾個容易理解的面向：

- 中心趨勢（central tendency）：資料大概集中在哪裡。
- 離散程度（dispersion）：資料彼此差多遠。
- 分布形狀（distribution shape）：資料是否偏斜、尾巴厚不厚。
- 資料品質（data quality）：是否有缺值、重複值、離群值。

### 流程

```text
原始資料
→ 排序 / 檢查型別與缺值
→ 中心趨勢
→ 離散程度
→ 分布形狀
→ 離群值與清理
→ describe / profiling 摘要判讀
```

### 比較表這樣讀

先看題目關鍵字，再回到表格找對應工具：

| 題目問的是 | 想到 |
|---|---|
| 典型中心位置 | mean / median / mode |
| 資料散多開 | range / variance / standard deviation / IQR / CV |
| 是否右偏、左偏、尾巴厚不厚 | skewness / kurtosis / Q-Q plot |
| 缺值、重複、離群值 | dropna / fillna / drop_duplicates / IQR / Z-score |
| `describe()` 的 `25%`、`50%`、`75%` | Q1 / median / Q3 |
| `ddof=0`、`ddof=1` | 母體 vs 樣本 |

### 記憶方式

```text
中心 = 代表值
離散 = 穩不穩
形狀 = 偏不偏、尾巴厚不厚
清理 = 資料乾不乾淨
API = 表格輸出每列代表什麼
```

### Exam Rule

```text
小資料集 + 算中心 → 先排序，再算 mean / median / mode
問分散程度 → range / variance / standard deviation / IQR / CV
問 pandas.describe() → count, mean, std, min, 25%, 50%, 75%, max
題目出現 outlier / extreme value → median 或 IQR 常是關鍵
```

### Quick Check

**Q.** 本課最核心的考法是統計推論，還是資料摘要判讀？

答案：資料摘要判讀。  
理由：本課重點是描述資料現況，例如中心、離散、分布形狀、缺值與 API 輸出，不是 p-value 或假說檢定。

## 2. 中心趨勢：Mean / Median / Mode 🔥🔥🔥

### 先懂一句話

中心趨勢（Measures of Central Tendency）是在回答：「這批資料大致集中在哪裡？」最常考平均數（mean）、中位數（median）、眾數（mode）。

### Everyday Analogy

像看外送花費，平均數是大家花費加總後平分，中位數是排序後站在中間的人，眾數是最多人點的價格或品項。

### 先問自己一個問題

這批資料有沒有極端值（outlier / extreme value）？資料是數值，還是類別？

如果有極端值，平均數可能被拉歪；如果是類別資料，通常不能算平均，而是看眾數。

### 技術說法

- 平均數（Mean）：全部數值加總後除以筆數。
- 中位數（Median）：排序後位在中間的位置。
- 眾數（Mode）：出現次數最多的值。

### 流程

```text
原始數值
→ 排序 / 加總 / 統計次數
→ mean / median / mode
→ 判斷哪個最能代表資料中心
```

### 比較表這樣讀

不要先背公式，先看題目想要哪一種「代表」：

| 指標 | 怎麼算 | 適合情境 | 常見陷阱 |
|---|---|---|---|
| Mean 平均數 | 全部加總 / 筆數 | 數值型、無明顯極端值 | 容易被離群值拉動 |
| Median 中位數 | 排序後取中間 | 有離群值、偏態資料 | 偶數筆要取中間兩個平均 |
| Mode 眾數 | 出現次數最多 | 類別資料、最常見選項 | 可以多個，也可能沒有明確眾數 |

### 一步一步例子

範例資料：

```text
[2, 4, 4, 4, 5, 5, 7, 9]

mean:
全部加總 = 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40
筆數 = 8
mean = 40 / 8 = 5

median:
已排序後共有 8 筆，是偶數筆
中間兩筆是第 4 筆 4 與第 5 筆 5
median = (4 + 5) / 2 = 4.5

mode:
4 出現 3 次，是出現最多的值
mode = 4
```

有極端值時：

```text
[50, 52, 53, 55, 300]

mean = (50 + 52 + 53 + 55 + 300) / 5 = 510 / 5 = 102
median = 53
```

這時 `median = 53` 比 `mean = 102` 更能代表多數資料。

### 記憶方式

```text
Mean = 平分
Median = 排隊站中間
Mode = 最多人出現
Outlier 很大或很小 → mean 會被拉走，median 比較穩
```

### Exam Rule

```text
全部加總除以筆數 → mean
排序後中間值 → median
出現次數最多 → mode
有離群值 / 極端值 / 偏態 → median 通常比 mean 穩
類別資料 / 最常見選項 → mode 或 value_counts()
```

### Quick Check

**Q.** 資料 `[1, 2, 2, 3, 100]` 要描述「典型值」，mean 和 median 哪個較適合？

答案：median。  
理由：`100` 是極端值，會把 mean 拉高；median 對離群值較穩健。

## 3. 離散程度：Range / Variance / SD / IQR / CV 🔥🔥🔥

### 先懂一句話

離散程度（Measures of Dispersion）是在回答：「資料彼此差多遠、散得多開？」中心一樣的兩組資料，可能一組很穩、一組很分散。

### Everyday Analogy

兩家外送店平均都 40 分鐘送到，但 A 店每次都 38 到 42 分鐘，B 店有時 20 分鐘、有時 80 分鐘。平均一樣，穩定度完全不同，這就是離散程度。

### 先問自己一個問題

題目是在問「差距有多大」、「波動有多大」、「是否跟原資料同單位」，還是「不同尺度怎麼比」？

### 技術說法

離散程度（Dispersion）描述資料離中心有多遠。變異數（Variance）會把偏差平方，所以單位也被平方；標準差（Standard Deviation, SD）是變異數開根號，所以單位回到原資料。

`ddof`（Delta Degrees of Freedom，自由度調整量）是在調整分母：

```text
ddof=0 → 母體（population）→ 分母 N
ddof=1 → 樣本（sample）→ 分母 N-1
```

### 流程

```text
已知道資料中心
→ 看資料離中心多遠
→ range / variance / standard deviation / IQR / CV
→ 判斷波動大小與離群值
```

### 比較表這樣讀

先看題目想比較哪一種「散」：

| 指標 | 公式 / 規則 | 考試重點 |
|---|---|---|
| Range 全距 | `max - min` | 簡單，但很怕極端值 |
| Population Variance 母體變異數 | `Σ(xᵢ - μ)² / N` | 分母是 `N`，`ddof=0` |
| Sample Variance 樣本變異數 | `Σ(xᵢ - x̄)² / (n-1)` | 分母是 `n-1`，`ddof=1` |
| Standard Deviation 標準差 | 變異數開根號 | 單位和原資料相同 |
| IQR 四分位距 | `Q3 - Q1` | 看中間 50% 的範圍 |
| CV 變異係數 | `(標準差 / 平均數) × 100%` | 比較不同單位或不同尺度 |

### 一步一步例子

用資料 `[2, 4, 4, 4, 5, 5, 7, 9]`：

```text
Step 1: 先算平均
mean = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) / 8
     = 40 / 8
     = 5

Step 2: 每一筆減掉平均，再平方
(2-5)^2 = 9
(4-5)^2 = 1
(4-5)^2 = 1
(4-5)^2 = 1
(5-5)^2 = 0
(5-5)^2 = 0
(7-5)^2 = 4
(9-5)^2 = 16

Step 3: 加總平方偏差
SSD（Sum of Squared Deviations，平方偏差和）
= 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16
= 32

Step 4: 決定分母
母體變異數（Population Variance）= SSD / N = 32 / 8 = 4
母體標準差（Population Standard Deviation, σ）= sqrt(4) = 2

樣本變異數（Sample Variance, s^2）= SSD / (n - 1) = 32 / 7 ≈ 4.5714
樣本標準差（Sample Standard Deviation, s）= sqrt(4.5714) ≈ 2.138
```

### 記憶方式

```text
Range = 只看頭尾
Variance = 平方後的平均距離
SD = 開根號，回到原單位
IQR = 中間 50%
CV = 不同尺度比穩定度
ddof=0 = N
ddof=1 = N-1
```

### Exam Rule

```text
max - min → range
平方偏差平均 → variance
變異數開根號 → standard deviation
與原資料同單位 → standard deviation
比較不同尺度的相對波動 → coefficient of variation
ddof=0 → population / N
ddof=1 → sample / N-1
```

### Quick Check

**Q.** `np.std(x, ddof=1)` 的分母是 `N` 還是 `N-1`？

答案：`N-1`。  
理由：`ddof=1` 對應樣本標準差，用樣本估計母體時分母是 `n-1`。

## 4. 四分位數、IQR、Boxplot 與離群值 🔥🔥🔥

### 先懂一句話

IQR（Interquartile Range，四分位距）用中間 50% 的資料範圍來判斷分散程度，也常用來抓離群值。盒鬚圖（boxplot）就是把 Q1、median、Q3、鬚端與離群值畫出來。

### Everyday Analogy

像排隊看一群人的身高，不看最高和最矮的極端個案，而是看中間那一大群人的範圍。超出太多的人，就會被標成特殊點。

### 先問自己一個問題

題目是要我算中間 50% 的範圍，還是判斷哪一筆是離群值（outlier）？

### 技術說法

- 四分位數（Quartile）：把排序後的資料切成四等份的位置。
- Q1：第 25 百分位，約等於前 25% 的切點。
- Q2：第 50 百分位，也就是中位數（median）。
- Q3：第 75 百分位，約等於前 75% 的切點。
- IQR（Interquartile Range，四分位距）：`Q3 - Q1`，看中間 50% 的資料範圍。
- Fence：離群值判斷邊界，不是 boxplot 的鬚端本身。

### 流程

```text
排序資料
→ 找 Q1 / median(Q2) / Q3
→ IQR = Q3 - Q1
→ 算 fence
→ 判斷 boxplot 鬚端與 outlier
```

### 一步一步例子

公式：

```text
IQR = Q3 - Q1
Lower Fence = Q1 - 1.5 × IQR
Upper Fence = Q3 + 1.5 × IQR
```

範例資料：

```text
[1, 2, 3, 4, 5, 6, 7, 20]

Step 1: 資料已排序
[1, 2, 3, 4, 5, 6, 7, 20]

Step 2: 分成下半部與上半部
下半部 = [1, 2, 3, 4]
上半部 = [5, 6, 7, 20]

Step 3: 找 Q1 與 Q3
Q1 = 下半部中位數 = (2 + 3) / 2 = 2.5
Q3 = 上半部中位數 = (6 + 7) / 2 = 6.5

Step 4: 算 IQR
IQR = Q3 - Q1 = 6.5 - 2.5 = 4

Step 5: 算 fence
Lower Fence = Q1 - 1.5×IQR = 2.5 - 1.5×4 = 2.5 - 6 = -3.5
Upper Fence = Q3 + 1.5×IQR = 6.5 + 1.5×4 = 6.5 + 6 = 12.5

Step 6: 判斷 outlier
20 > 12.5，所以 20 是離群值
```

> **計算方法注意**：不同軟體計算四分位數的方式略有不同。Python `numpy.percentile` 預設用線性插值，結果可能與教科書（Tukey hinges 法）略有差異（例如上例 Q1 numpy 得 2.75，教科書得 2.5）。考試題目以題目給定的方法為準。

### 比較表這樣讀

| 看到題目說 | 你要想 |
|---|---|
| `25%` | Q1 |
| `50%` | median / Q2 |
| `75%` | Q3 |
| 中間 50% | IQR |
| boxplot outlier | 先算 fence |
| whisker | fence 內最後一筆實際資料 |

Boxplot 鬚端不是 fence 數值本身：

```text
fence 是判斷邊界
whisker 是 fence 範圍內最後一筆實際資料
超出 fence 的點另外畫成 outlier
```

以上例來說，上界是 `12.5`，但資料中 fence 內最大值是 `7`，所以上鬚端（upper whisker）到 `7`，不是到 `12.5`。

### 記憶方式

```text
Q1 = 25%
Q2 = 50% = median
Q3 = 75%
IQR = Q3 - Q1
Fence = 警戒線
Whisker = 警戒線內最後一筆真實資料
```

### Exam Rule

```text
IQR → Q3 - Q1，不是 Q3 - Q2
outlier fence → Q1 - 1.5×IQR, Q3 + 1.5×IQR
boxplot whisker → fence 內最後一筆資料，不是 fence 數值
describe() 的 25%, 50%, 75% → Q1, median, Q3
```

### Quick Check

**Q.** 若 `Q1=10`、`Q3=18`，IQR 與 upper fence 分別是多少？

答案：`IQR = 8`，`upper fence = 30`。  
理由：`IQR = 18 - 10 = 8`，上界是 `18 + 1.5×8 = 30`。

## 5. 分布形狀：Skewness / Kurtosis / Q-Q Plot 🔥🔥

### 先懂一句話

分布形狀是在看資料是否對稱、尾巴往哪邊拖、尾端是否厚重。考試常用偏度（skewness）、峰度（kurtosis）與 Q-Q plot 判讀。

### Everyday Analogy

像 YouTube 觀看數，多數影片觀看數普通，少數爆紅影片超高，右邊被拖出長尾，這就是右偏。

### 先問自己一個問題

資料的尾巴是往右拖、往左拖，還是尾端比常態分布更厚？

### 技術說法

- 偏度（Skewness）：看分布是否左右對稱，以及尾巴往哪邊拖。
- 峰度（Kurtosis）：看尾巴厚不厚、極端值多不多。考試常考 Fisher 與 Pearson 的基準不同。
- Q-Q plot（Quantile-Quantile plot，分位數對分位數圖）：把樣本分位數和理論分布分位數拿來比。

### 流程

```text
已掌握中心與離散
→ 看分布左右是否對稱
→ 判斷 skewness / kurtosis
→ 用 Q-Q plot 看是否接近理論分布
```

### 比較表這樣讀

偏度先看尾巴方向：

偏度：

| 分布 | 尾巴方向 | 常見大小關係 |
|---|---|---|
| Positive Skew 正偏 / 右偏 | 右尾長 | `mean > median > mode` |
| Negative Skew 負偏 / 左偏 | 左尾長 | `mean < median < mode` |
| Symmetric 對稱 | 左右差不多 | `mean ≈ median ≈ mode` |

> **注意**：mean > median > mode 的排序規則適用於**單峰連續分佈 (unimodal continuous distribution)**；對於多峰或離散分佈不一定成立。

### 一步一步例子

用薪資資料想像右偏：

```text
多數人薪資：40k, 45k, 50k, 55k
少數極高薪：300k

右邊有很大的數字 → 右尾被拉長
mean 會被 300k 拉高
median 仍比較接近多數人的位置
所以常見關係：mean > median > mode
```

```text
stats.skew(x) > 0 → 右偏
stats.skew(x) < 0 → 左偏
stats.skew(x) ≈ 0 → 接近對稱
```

峰度（Kurtosis）看的是分布「尾巴厚不厚、尖不尖」。考試最容易混淆的是 Fisher 和 Pearson 兩種尺度：

```text
Pearson kurtosis = 原始峰度，常態分布基準 = 3
Fisher kurtosis  = Excess Kurtosis（超額峰度）= Pearson kurtosis - 3
                 = 把常態分布平移成 0，方便判斷比常態更尖或更平
```

ASCII 視覺圖：

```text
比常態更平/尾巴較薄
      __________
_____/          \_____
極端值少，中心不尖
Fisher < 0 / Pearson < 3

常態分布
          /\
        /    \
______/        \______
基準形狀
Fisher = 0 / Pearson = 3

比常態更尖/尾巴較厚
*____       /\       ____*
     \     /  \     /
      \___/    \___/
極端值多，中心更尖，尾巴延伸更遠
Fisher > 0 / Pearson > 3
```

| 參數 | 定義 | 常態分布基準 |
|---|---|---|
| `stats.kurtosis(x)` | 超額峰度 (Excess Kurtosis)，預設 `fisher=True` | `0` |
| `stats.kurtosis(x, fisher=False)` | Pearson 峰度 | `3` |

### 記憶方式

考試記法：

```text
Skew = 尾巴往哪邊拖
Positive skew = 右尾長 = 大值把 mean 往右拉
Negative skew = 左尾長 = 小值把 mean 往左拉
Fisher = Pearson - 3
stats.kurtosis(x) 預設回傳 Fisher / Excess Kurtosis
Fisher > 0 → 尖峰 / 尾部較厚
Fisher = 0 → 常峰，接近常態分布
Fisher < 0 → 平峰 / 尾部較薄
```

Q-Q plot（Quantile-Quantile plot，分位數對分位數圖）：

```text
比較：樣本資料的分位數 vs 理論分布的分位數
點接近對角線 → 樣本分布接近理論分布
點系統性彎曲 → 分布與理論分布不同，可能偏態或尾部異常
```

### Exam Rule

```text
右偏 / positive skew / 右尾長 → mean > median > mode
左偏 / negative skew / 左尾長 → mean < median < mode
scipy.stats.skew() 正值 → 右偏
scipy.stats.kurtosis() 沒寫參數 → Fisher，常態 = 0
fisher=False → Pearson，常態 = 3
Q-Q plot 貼近對角線 → 接近目標分布
```

### Quick Check

**Q.** `scipy.stats.kurtosis(x)` 預設下，常態分布的基準值是 `0` 還是 `3`？

答案：`0`。  
理由：SciPy 預設 `fisher=True`，使用超額峰度 (Excess Kurtosis)；只有 `fisher=False` 時常態才是 `3`。

## 6. Data Cleaning 與 Data Profiling 🔥🔥

### 先懂一句話

資料清理是在修資料問題，資料剖析是在快速看資料長什麼樣。考試常把 `dropna()`、`fillna()`、`drop_duplicates()`、`value_counts()`、`nunique()`、`dtypes`、`info()` 放在程式題裡考用途。

### Everyday Analogy

像接手一份 Excel，分析前要先看欄位是不是填錯、缺值多不多、同一筆訂單有沒有重複匯入，否則後面平均數和圖表都可能失真。

### 先問自己一個問題

我是要「修資料」，還是只是要「快速看資料狀況」？

`dropna()`、`fillna()`、`drop_duplicates()` 偏向清理；`info()`、`dtypes`、`describe()`、`value_counts()`、`nunique()` 偏向剖析。

### 技術說法

- 資料清理（Data Cleaning）：處理缺值、重複值、錯誤型別或不合理資料。
- 資料剖析（Data Profiling）：快速摘要資料表的欄位、型別、缺值、分布與唯一值。

### 流程

```text
原始資料表
→ 檢查欄位型別 / 缺值 / 重複 / 類別分布
→ 清理或補值
→ 再做統計摘要
```

### 比較表這樣讀

先看題目想做「清理」還是「檢查」：

| API / 方法 | 做什麼 | 常見考法 |
|---|---|---|
| `dropna()` | 刪除缺失值列或欄 | 缺值很少、刪除影響小 |
| `fillna()` | 補缺失值 | 平均數、中位數、眾數補值 |
| `drop_duplicates()` | 去除重複列 | 重複訂單、重複會員資料 |
| `value_counts()` | 每個值出現幾次 | 找最常見類別、類別分布 |
| `nunique()` | 唯一值有幾種 | 檢查 cardinality，預設不算 NaN |
| `df.dtypes` | 每欄資料型別 | 型別稽核 |
| `df.info()` | 型別、非空值數量、記憶體概況 | 快速看缺值與欄位狀況 |
| `describe()` | 數值摘要 | count, mean, std, min, 25%, 50%, 75%, max |

### 選擇流程

缺值處理原則：

```text
缺值很少，刪除影響低 → dropna()
數值資料且分布大致對稱 → 可用 mean 補值
有離群值或偏態 → median 補值較穩
類別資料 → mode 補值常見
```

### 一步一步例子

`describe()` 對數值欄位的順序：

```text
count → mean → std → min → 25% → 50% → 75% → max
```

其中：

```text
std → pandas 預設樣本標準差，ddof=1
25% → Q1
50% → median / Q2
75% → Q3
```

如果題目給你：

```text
count = 100
mean = 52
std = 8
25% = 45
50% = 51
75% = 58
```

要這樣讀：

```text
count = 非缺值有 100 筆
mean = 平均數 52
std = 樣本標準差 8，pandas 預設 ddof=1
25% = Q1 = 45
50% = median = 51
75% = Q3 = 58
IQR = 75% - 25% = 58 - 45 = 13
```

### 記憶方式

```text
dropna = 丟掉缺值
fillna = 補缺值
drop_duplicates = 去重複
value_counts = 每種各幾筆
nunique = 共有幾種
dtypes = 欄位型別
info = 型別 + non-null count
describe = 數值統計摘要
```

### Exam Rule

```text
最常見類別 / 每個值幾次 → value_counts()
唯一值個數 / cardinality → nunique()
欄位型別 → df.dtypes
非空值數量與記憶體 → df.info()
缺值少 → dropna()
缺值不宜刪 → fillna()
重複列 → drop_duplicates()
describe().std → 樣本標準差，ddof=1
```

### Quick Check

**Q.** `value_counts()` 和 `nunique()` 差在哪裡？

答案：`value_counts()` 算每個值出現幾次；`nunique()` 算不同值有幾種。  
理由：前者看頻率分布，後者看唯一值數量。

## 7. Task / Scenario Selection：看到題目怎麼選 🔥🔥🔥

### 先懂一句話

情境題不要先背公式，要先看題目要你描述中心、分散、形狀、離群值、缺值，還是 API 輸出。先判斷任務，再選方法。

### Everyday Analogy

像修車前要先判斷是輪胎沒氣、電瓶沒電、還是引擎問題；不同症狀對應不同工具。

### 先問自己一個問題

題目到底是在問中心、離散、形狀、離群值、缺值，還是 API？

只要任務分類對了，公式通常就會跟著對。

### 技術說法

Scenario Selection 是把題目關鍵字翻成統計工具。考試常不是直接問「請計算 IQR」，而是問「有極端值時哪個比較穩健」、「不同單位怎麼比較波動」、「`75%` 在 describe() 裡代表什麼」。

### 選擇流程

```text
先看題目關鍵字 / 輸出要求
→ 判斷任務類型
→ 選統計量、圖表或 API
→ 檢查常見陷阱
```

### 比較表這樣讀

把這張表當成「題目關鍵字 → 答案」的對照表：

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 描述一般平均表現 | 數值資料、無極端值 | 單一中心值 | mean |
| 描述有極端值的典型值 | 偏態或有 outlier | 穩健中心 | median |
| 找最常見類別 | 類別欄位 | 出現最多的值 | mode / value_counts() |
| 看資料散多開 | 數值資料 | 離散程度 | SD / variance / IQR |
| 比較不同尺度波動 | 不同單位或均值差很多 | 相對離散程度 | CV（Coefficient of Variation，變異係數） |
| 判斷離群值 | Q1、Q3 或 mean、SD | outlier | IQR fence / Z-score |
| 快速讀數值摘要 | pandas 輸出 | 統計摘要 | describe() |
| 檢查欄位與缺值 | DataFrame | 型別與非空值 | dtypes / info() |

### 記憶方式

```text
中心 → mean / median / mode
極端值 → median / IQR
散多開 → variance / SD / IQR
不同尺度比波動 → CV
形狀 → skewness / kurtosis / Q-Q plot
缺值重複 → dropna / fillna / drop_duplicates
表格輸出 → describe / info / dtypes
```

### Exam Rule

```text
題目說 robust / extreme values → median 或 IQR
題目說 same unit as data → standard deviation
題目說 relative variability → CV
題目說 |z| > 3 → Z-score outlier
題目說 25%, 50%, 75% → Q1, median, Q3
題目說 most frequent → mode 或 value_counts()
```

### Quick Check

**Q.** 要比較「平均 20 分鐘、SD 2 分鐘」和「平均 100 分鐘、SD 8 分鐘」哪個相對更穩，應看 SD 還是 CV？

答案：CV。  
理由：兩組平均尺度不同，CV 才能比較相對波動。

## 8. Exam Decision Trees

### 8.1 選中心趨勢

```text
題目問代表值 / 中心？
│
├─ 有離群值、極端值、偏態？
│  └─ 選 median
│
├─ 問最常見、最多人選、類別資料？
│  └─ 選 mode / value_counts()
│
└─ 數值型且分布大致平均？
   └─ 選 mean
```

### 8.2 選離散程度

```text
題目問資料散多開？
│
├─ 只問最大最小差？
│  └─ range = max - min
│
├─ 問平方偏差平均？
│  └─ variance
│
├─ 問和原資料同單位？
│  └─ standard deviation
│
├─ 問中間 50% 或 boxplot？
│  └─ IQR = Q3 - Q1
│
└─ 問不同單位 / 不同尺度比較？
   └─ CV = SD / mean × 100%
```

### 8.3 判斷離群值

```text
題目問 outlier？
│
├─ 給 Q1 / Q3 / IQR？
│  ├─ IQR = Q3 - Q1
│  ├─ Lower = Q1 - 1.5×IQR
│  └─ Upper = Q3 + 1.5×IQR
│
├─ 給 mean / standard deviation / z？
│  └─ |z| > 3 常視為離群值（此規則假設資料近似常態分佈）
│
└─ 問 boxplot whisker？
   └─ 選 fence 內最後一筆實際資料
```

### 8.4 判讀 API

```text
題目出現 pandas / scipy API？
│
├─ describe()
│  └─ count, mean, std, min, 25%, 50%, 75%, max
│
├─ value_counts()
│  └─ 每個值出現幾次
│
├─ nunique()
│  └─ 唯一值個數
│
├─ np.std / np.var
│  └─ 看 ddof：0 是母體，1 是樣本
│
└─ stats.kurtosis()
   └─ 預設 Fisher，常態 = 0；fisher=False 才是 Pearson，常態 = 3
```

## 9. Trap Clinic

### Trap 1：`ddof=0` 和 `ddof=1` 只是小差異

錯。這是母體與樣本的差異，分母不同，考試很愛考。

Exam fix：

```text
ddof=0 → population → 分母 N
ddof=1 → sample → 分母 N-1
pandas.describe().std → ddof=1
```

### Trap 2：IQR 是 `Q3 - Q2`

錯。IQR 定義是 `Q3 - Q1`，看中間 50% 的範圍。

Exam fix：

```text
IQR → Q3 - Q1
Q2 → median，不拿來當 IQR 的下界
```

### Trap 3：Boxplot 鬚端畫到 fence 數值

錯。Fence 是離群值判斷邊界，鬚端是 fence 內最後一筆實際資料。

Exam fix：

```text
Q1 - 1.5×IQR / Q3 + 1.5×IQR → fence
boxplot whisker → fence 內最後資料點
```

### Trap 4：正偏代表 mean 比 median 小

錯。正偏是右尾長，大值把平均數往右拉。

Exam fix：

```text
positive skew / right skew / 右尾長 → mean > median > mode
negative skew / left skew / 左尾長 → mean < median < mode
```

### Trap 5：`scipy.stats.kurtosis()` 預設常態等於 3

錯。SciPy 預設是超額峰度 (Excess Kurtosis)，常態基準是 `0`。

Exam fix：

```text
stats.kurtosis(x) → Fisher, normal = 0
stats.kurtosis(x, fisher=False) → Pearson, normal = 3
```

### Trap 6：`describe()` 的 `50%` 是平均數

錯。`50%` 是中位數，也就是 Q2；平均數在 `mean` 那一列。

Exam fix：

```text
25% → Q1
50% → median / Q2
75% → Q3
mean → average
```

### Trap 7：眾數只能有一個

錯。眾數可以有多個，也可能沒有明確眾數。

Exam fix：

```text
多個值並列最高次數 → 多眾數
每個值都同次數 → 可能沒有明確眾數
```

### Trap 8：`value_counts()` 和 `nunique()` 一樣

錯。`value_counts()` 看每個值的次數，`nunique()` 看不同值有幾種。

Exam fix：

```text
每類幾筆 → value_counts()
共有幾種不同值 → nunique()
```

### Trap 9：有離群值也應優先用 mean，因為 mean 用到所有資料

錯。Mean 正因為用到每筆資料，所以最容易被極端值拉動。

Exam fix：

```text
outlier / skewed / extreme values → median 更穩
normal-like / no extreme values → mean 可用
```

### Trap 10：`dropna()` 一定比 `fillna()` 好

錯。刪除缺值可能損失資料或造成偏差，補值也可能引入偏差；要看情境。

Exam fix：

```text
缺值少且刪除影響小 → dropna()
資料珍貴或不能大量刪除 → fillna()
偏態 / 有離群值 → median 補值較穩
類別資料 → mode 補值常見
```

## 10. Practice Questions

### 10.1 中心趨勢

**Q1.** 資料 `[3, 5, 7, 9, 100]` 中，哪個中心指標最不容易被 `100` 影響？

答案：Median。  
理由：中位數只看排序後中間位置，對極端值較穩健。

**Q2.** 資料 `[1, 2, 2, 3, 3]` 的眾數是什麼？

答案：`2` 和 `3`。  
理由：兩者都出現 2 次，並列最高，所以有兩個眾數。

**Q3.** 類別欄位要找最常見選項，最直接想到哪個統計概念？

答案：Mode。  
理由：眾數就是出現次數最多的值。

### 10.2 離散程度與 ddof

**Q4.** `Range` 的公式是什麼？

答案：`max - min`。  
理由：全距只看最大值與最小值之差。

**Q5.** 標準差和變異數哪一個與原資料同單位？

答案：標準差。  
理由：標準差是變異數開根號，單位會回到原資料單位。

**Q6.** `np.var(x, ddof=0)` 對應母體還是樣本？

答案：母體。  
理由：`ddof=0` 分母是 `N`。

**Q7.** `pandas.describe()` 的 `std` 預設是 `ddof=0` 還是 `ddof=1`？

答案：`ddof=1`。  
理由：`describe().std` 預設是樣本標準差。

### 10.3 IQR、Boxplot、離群值

**Q8.** 若 `Q1=4`、`Q3=10`，IQR 是多少？

答案：`6`。  
理由：`IQR = Q3 - Q1 = 10 - 4`。

**Q9.** 若 `Q1=4`、`Q3=10`，upper fence 是多少？

答案：`19`。  
理由：`IQR=6`，上界是 `10 + 1.5×6 = 19`。

**Q10.** Boxplot 的 upper whisker 是否一定畫到 upper fence？

答案：不是。  
理由：鬚端畫到 upper fence 內的最大實際資料點。

**Q11.** Z-score 離群值常見判斷規則是什麼？

答案：`|z| > 3`。  
理由：距離平均數超過 3 個標準差常被視為可能離群值。

### 10.4 分布形狀

**Q12.** 右偏分布中，mean、median、mode 常見大小關係是什麼？

答案：`mean > median > mode`。  
理由：右尾的大值會把平均數往右拉。

**Q13.** `stats.skew(x)` 結果為負值，代表什麼？

答案：負偏或左偏。  
理由：偏度小於 0 表示左尾較長。

**Q14.** `stats.kurtosis(x, fisher=False)` 對常態分布的基準值是多少？

答案：`3`。  
理由：`fisher=False` 使用 Pearson 峰度，常態分布為 3。

**Q15.** Q-Q plot 的點大致貼近對角線代表什麼？

答案：樣本分布接近目標理論分布。  
理由：分位數對分位數接近線性對角線，表示兩者分布形狀相近。

### 10.5 Data Cleaning 與 Profiling

**Q16.** 缺失值很少且刪掉影響不大，常用哪個 pandas 方法？

答案：`dropna()`。  
理由：缺值少時，刪除是簡單直接的處理方式。

**Q17.** 類別資料要補缺失值，常用 mean、median、mode 哪一個？

答案：Mode。  
理由：類別資料沒有數值平均意義，通常補最常見類別。

**Q18.** 要去除重複列，使用哪個 pandas 方法？

答案：`drop_duplicates()`。  
理由：它會移除重複資料列，避免重複計算。

**Q19.** 要看每個類別各有幾筆，使用 `value_counts()` 還是 `nunique()`？

答案：`value_counts()`。  
理由：`value_counts()` 回傳每個值的出現次數。

**Q20.** `describe()` 的 `75%` 代表什麼？

答案：第三四分位數 Q3。  
理由：`describe()` 中 `25%`、`50%`、`75%` 分別對應 Q1、median、Q3。

### 10.6 Mixed Traps

**Q21.** 題目說「資料有極端高值，哪個代表值較穩健？」答案通常是什麼？

答案：Median。  
理由：中位數比平均數不容易被極端值拉動。

**Q22.** 題目要比較兩組不同單位資料的相對波動，應選哪個指標？

答案：CV。  
理由：變異係數用標準差除以平均數，可比較相對離散程度。

**Q23.** `describe()` 中要推 IQR，應該用哪兩列？

答案：`75% - 25%`。  
理由：`75%` 是 Q3，`25%` 是 Q1，IQR 是 `Q3 - Q1`。

**Q24.** `stats.kurtosis(x)` 沒寫任何參數時，若結果大於 0，通常表示什麼？

答案：超額峰度 (Excess Kurtosis) 大於 0，分布較尖或尾部較厚。  
理由：SciPy 預設 Fisher，常態基準為 0。

**Q25.** `df.info()` 和 `df.dtypes` 哪個會顯示非空值數量？

答案：`df.info()`。  
理由：`info()` 會顯示每欄 non-null count、型別與記憶體概況。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 敘述性統計是在摘要資料，不是在做假說檢定。
2. 平均看整體，中位擋極端，眾數看最多。
3. `ddof=0` 是母體、分母 `N`；`ddof=1` 是樣本、分母 `N-1`。
4. IQR 一定是 `Q3 - Q1`，離群值 fence 是左右各 `1.5×IQR`。
5. Boxplot 鬚端不是 fence，而是 fence 內最後一筆實際資料。
6. 正偏是右尾長，通常 `mean > median > mode`；負偏則相反。
7. SciPy kurtosis 預設超額峰度 (Excess Kurtosis)，常態是 `0`；`fisher=False` 才是 Pearson，常態是 `3`。

## Final Study Advice

考試時不要一看到公式就急著算。先問自己：題目是在問中心、離散、分布形狀、離群值、缺值處理，還是 API 輸出？任務判斷對了，公式和函式通常就會自然對上。

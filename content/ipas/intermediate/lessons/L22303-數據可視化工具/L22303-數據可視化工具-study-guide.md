# L22303 數據可視化工具 — Study Guide v2

## 0. How to Use This Guide

這份 guide 的讀法是：先看第 1 節大地圖，再讀第 2-7 節核心概念，最後用第 8-10 節練判斷題。考試通常不是問你背圖表名稱，而是給你一個資料情境，要求你選對圖表、工具或設計原則。

火焰標記：

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

練習時請直接遮住答案，先自己判斷，再看「答案」和「理由」。本章不深入統計檢定、機器學習專用圖如 PCA/ROC，也不考 Tableau/Power BI 的深度管理、權限治理或 ETL 架構。

閱讀方式：

1. 先讀每節的 `先懂一句話`，抓住白話定位。
2. 再看 `Everyday Analogy`，把圖表或工具想成生活中的選擇。
3. 遇到比較題，先看「先問自己一個問題」和「比較表這樣讀」。
4. 最後用 `Exam Rule` 和 `Quick Check` 檢查自己能不能選答案。

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

```text
數據可視化（Data Visualization）= 用對的圖、工具與設計，把資料問題講清楚
```

它是資料分析流程的「輸出層」：不是再算一次統計，而是把資料用對的圖、對的工具、對的設計原則講清楚。

### Everyday Analogy

像做簡報：資料是內容，圖表是說法。你不能把所有資料都塞到一張投影片，必須先知道聽眾想回答什麼問題，再選最清楚的呈現方式。

### 先問自己一個問題

```text
題目要看比較、分佈、組成、關係，還是趨勢？
```

考試最常測你能不能從題目描述判斷分析目的，再選圖表、工具或設計原則。

### 技術說法

數據可視化把資料分析結果轉成圖表或 dashboard。判斷順序通常是：先看分析目的，再看資料型態，最後才選圖表與工具。

### 在整體流程中的位置

```text
資料整理 / 統計分析
→ 選分析目的
→ 選圖表類型
→ 選工具
→ 套用設計原則
→ 產出圖表 / dashboard
```

### Key Concepts

先用這張表建立全章地圖：

比較表這樣讀：

| 題目問的是 | 想到 | 白話記法 |
|---|---|---|
| 類別之間誰多誰少 | `bar chart` 長條圖 | 比高低 |
| 連續數值大多落在哪些區間 | `histogram` 直方圖 | 看區間分佈 |
| 隨時間變化 | `line chart` 折線圖 | 看走勢 |
| 兩個連續變數有沒有關係 | `scatter plot` 散布圖 | 看關係 |
| 整體中的各部分占比 | `pie chart` / `donut chart`，但類別要少 | 看占比 |
| 多組分佈、中位數、離群值 | `box plot` 箱線圖 | 看摘要分佈 |
| 分佈形狀與密度輪廓 | `violin plot` 提琴圖 | 看分佈形狀 |
| 兩維交叉資料或相關矩陣 | `heatmap` 熱圖 | 看格子高低 |
| 靜態圖、細節控制、出版品質 | `matplotlib` | 手動精修 |
| 快速 EDA、統計視覺化 | `seaborn` | 快速統計圖 |
| hover / zoom / web dashboard | `Plotly` | 互動網頁圖 |
| 拖拉式商業 dashboard | `Tableau` | 商業拖拉 BI |
| Microsoft / Office 365 / Azure 整合 | `Power BI` | Microsoft BI |
| 刪掉多餘裝飾、提高有效資訊 | `data-ink ratio`、避免 `chart junk` | 清楚勝過花俏 |

記憶方式：

```text
先問目的，再選圖表；先問輸出，再選工具
```

### Exam Rule

```text
題目問「資料要回答什麼問題」→ 先選圖表
題目問「互動、hover、zoom、web」→ Plotly
題目問「拖拉式、商業主管、BI」→ Tableau 或 Power BI
題目問「干擾讀值的裝飾」→ chart junk
題目問「資料墨水比」→ data-ink ratio 要提高
```

### Quick Check

題目：如果題目說「要比較各平台本月銷售額」，第一個應該想到哪種圖？

答案：`bar chart` 長條圖。因為平台是類別，題目要比較各類別數值大小。

## 2. 資訊呈現原則 🔥🔥🔥

### 先懂一句話

```text
資訊呈現原則 = 讓讀者更快、更準確看懂資料，不是讓圖更花
```

好的圖表不是越花越好，而是讓讀者用最短時間看懂資料重點。

### Everyday Analogy

像整理 LINE 群組公告：真正重要的是時間、地點、待辦事項。如果貼圖、彩色字、分隔線太多，大家反而找不到重點。

### 先問自己一個問題

```text
這個視覺元素是在幫助讀資料，還是在干擾讀資料？
```

考試常用 `data-ink ratio`、`chart junk`、前注意屬性、色彩、版面配置來測你是否懂「清楚」比「裝飾」重要。

### 技術說法

資訊呈現原則關心的是視覺元素是否有效傳達資料。有效元素能降低解讀負擔；無效裝飾會增加干擾。

### 在整體流程中的位置

```text
選好圖表
→ 設計視覺編碼與版面
→ 移除干擾
→ 讓讀者更快讀懂
```

### Key Concepts

#### 2.1 `data-ink ratio` 資料墨水比

先懂一句話：

```text
資料墨水比（data-ink ratio）= 圖上有多少墨水真的用來表達資料
```

```text
data-ink ratio = data ink / total ink used
資料墨水比 = 用來表達資料的墨水 / 圖上所有墨水
```

方向要記清楚：`data-ink ratio` 要提高（maximize），不是降低。刪掉厚外框、過重格線、背景花紋、3D 陰影，通常可以提高資料墨水比。

#### 2.2 `chart junk` 圖表垃圾

先懂一句話：

```text
圖表垃圾（chart junk）= 不增加資訊、還干擾讀值的視覺元素
```

`chart junk` 是不必要、會干擾理解、沒有增加資訊價值的視覺元素。常見例子是 3D 長條圖、3D 圓餅圖、過度陰影、漸層、無關背景圖、密到看不清的刻度與標籤。

重點不是「有裝飾就錯」，而是「裝飾是否妨礙讀值」。如果柔和底色能幫助分區，不一定是垃圾；如果特效讓比例或高度難判讀，就是垃圾。

#### 2.3 前注意屬性 `pre-attentive attributes`

先懂一句話：

```text
前注意屬性（pre-attentive attributes）= 人還沒認真讀圖前，就先注意到的視覺特徵
```

前注意屬性是人眼還沒深度思考前，就能快速察覺的特徵。

比較表這樣讀：

| 屬性 | 適合用途 | 考試提醒 | 白話記法 |
|---|---|---|---|
| `position` 位置 | 比較高低、左右、對齊 | 通常最強、最精準 | 看位置最準 |
| `color` 顏色 | 分類、強調 | 不要只靠顏色傳遞資訊 | 很醒目但不一定精準 |
| `size` 大小 | 表現量感 | 面積大小不如位置精準 | 看大概量感 |
| `shape` 形狀 | 分組辨識 | 類別太多會亂 | 類別少才清楚 |

```text
記憶：位置 > 顏色 > 大小 > 形狀
```

> 注意：此排序依**任務類型**而異。
> - **精確量化比較**時：位置 > 長度 > 面積 > 色彩（Cleveland & McGill 1984 研究結論）
> - **視覺偵測／突出**時：色彩和方向的效果較強，能快速吸引注意
> - 考試若考「哪個屬性最適合精確比較數值大小」→ 位置；「哪個屬性最適合快速找出異常點」→ 色彩也是有力答案

#### 2.4 色彩設計

先問自己一個問題：

```text
資料是由低到高、有中心點，還是互相獨立的類別？
```

比較表這樣讀：

| 色階 | 適用資料 | 例子 | 常見錯誤 | 白話記法 |
|---|---|---|---|---|
| `sequential` 連續色階 | 由低到高 | 銷售額、溫度、次數 | 亂用彩虹色造成誤讀 | 低到高 |
| `diverging` 發散色階 | 有中心點，往兩側偏離 | 高於/低於平均、正/負變化 | 沒有中心值卻硬用 | 中心往兩邊 |
| `categorical` 類別色階 | 彼此獨立類別 | 部門、平台、產品類型 | 類別太多還硬分色 | 類別彼此不同 |

`viridis` 是常見色盲友善連續色盤。`ColorBrewer` 是常用配色參考，可依連續、發散、類別用途選色。

#### 2.5 版面配置

比較表這樣讀：

| 原則 | 白話意思 | 考試提醒 |
|---|---|---|
| `figure-ground contrast` 圖地對比 | 資料要從背景中清楚跳出來 | 背景不能搶資料 |
| `alignment` 對齊 | 標題、圖例、標籤、圖表本體要整齊 | 亂對齊會增加解讀負擔 |
| `whitespace` 留白 | 留白幫助分群，不是浪費 | 空白也能幫助閱讀 |
| 清楚標題 | 標題要說清內容，最好能提示結論 | 不要只寫「銷售分析」 |

記憶方式：

```text
清楚 > 花俏
資料墨水比要提高，圖表垃圾要移除
```

### Exam Rule

```text
資料墨水比 / Tufte → data-ink ratio 要提高
3D、陰影、無關背景、干擾讀值 → chart junk
快速吸引注意 / 人眼先看到 → pre-attentive attributes
比較數值高低 → 優先用 position
由低到高的數值 → sequential color scale
高於/低於中心值 → diverging color scale
不同部門、不同平台 → categorical color scale
色弱友善 / 連續色盤 → viridis
```

### Quick Check

題目：一張銷售熱圖只是表示「低到高」的銷售額，沒有平均值或 0 這種中心點，應優先用哪種色階？

答案：`sequential color scale` 連續色階。因為資料是單方向由低到高，不是從中心往兩側偏離。

## 3. 圖表類型選擇 🔥🔥🔥

### 先懂一句話

```text
圖表類型選擇 = 先問這張圖要回答什麼問題，再選圖
```

比較、分佈、組成、關係、趨勢，是本章最重要的五個判斷入口。

### Everyday Analogy

像選交通工具：去巷口買飲料不用搭高鐵，跨縣市出差也不會走路。資料問題不同，工具就不同。

### 先問自己一個問題

```text
我要看比較、分佈、組成、關係，還是趨勢？
```

不要先看圖長什麼樣子；先看資料問題。

### 技術說法

圖表選擇取決於分析目的與資料型態。類別資料、連續資料、時間資料、兩維交叉資料，各自適合不同圖表。

### 在整體流程中的位置

```text
讀題目需求
→ 判斷分析目的
→ 判斷資料型態
→ 選圖表
```

### Key Concepts

#### 3.1 五種分析目的

比較表這樣讀：

| 分析目的 | 問題長相 | 常見圖表 | 白話記法 |
|---|---|---|---|
| `comparison` 比較 | 哪個類別比較多？ | `bar chart`、`grouped bar` | 比高低 |
| `distribution` 分佈 | 數值集中在哪？有離群值嗎？ | `histogram`、`box plot`、`violin plot` | 看分布 |
| `composition` 組成 | 各部分占整體多少？ | `pie chart`、`donut chart`、`stacked bar` | 看占比 |
| `relationship` 關係 | 兩個變數有沒有關聯？ | `scatter plot`、`heatmap` | 看關聯 |
| `trend` 趨勢 | 是否隨時間上升或下降？ | `line chart` | 看走勢 |

#### 3.2 常考圖表總表

比較表這樣讀：

| 圖表 | 最適合 | 不適合 / 限制 | 考試關鍵 |
|---|---|---|---|
| `bar chart` 長條圖 | 類別比較 | 不用來看連續分佈 | 類別誰高誰低 |
| `histogram` 直方圖 | 單一連續變數分佈 | 不用來比較類別名稱 | bins / 區間 |
| `line chart` 折線圖 | 時間序列、順序變化 | X 軸無順序時不要亂連線 | time / trend |
| `scatter plot` 散布圖 | 兩個連續變數關係 | 不是用來看單一變數分佈 | x-y relationship |
| `pie/donut chart` 圓餅/環圈 | 少量類別的整體占比 | 類別太多、差異太小會難讀 | part-to-whole |
| `heatmap` 熱圖 | 兩維交叉、相關矩陣 | 配色錯會誤導 | matrix / grid |
| `box plot` 箱線圖 | 中位數、四分位、離群值 | 不完整呈現分佈形狀 | median / IQR / outliers |
| `violin plot` 提琴圖 | 分佈形狀、密度輪廓 | 對初學者較不直覺 | density / shape |
| `stacked bar` 堆疊長條 | 部分占整體 | 子類別精準比較較難 | 組成 |
| `grouped bar` 分組長條 | 並排比較群組 | 類別太多會擁擠 | 並排比較 |

#### 3.3 `bar chart` vs `histogram`

這組最高頻，因為兩者看起來都像柱子。

先懂一句話：

```text
bar chart = 類別比較
histogram = 連續數值分佈
```

| 比較 | `bar chart` 長條圖 | `histogram` 直方圖 |
|---|---|---|
| 用途 | 比較類別 | 看連續資料分佈 |
| X 軸 | 類別，例如平台、部門 | 數值區間 `bins` |
| Y 軸 | 數量、總額、平均 | 頻數或密度 |
| 柱子 | 通常有間隔 | 通常連在一起 |
| 函式 | `plt.bar()`、`sns.barplot()` | `plt.hist()`、`sns.histplot()` |

#### 3.4 `box plot` vs `violin plot`

先懂一句話：

```text
box plot = 看摘要與離群值
violin plot = 看分佈形狀與密度
```

| 比較 | `box plot` 箱線圖 | `violin plot` 提琴圖 |
|---|---|---|
| 重點 | 摘要分佈 | 顯示分佈形狀 |
| 看得到 | 中位數、四分位距、離群值 | 密度輪廓、偏態、雙峰 |
| 考試關鍵字 | `median`、`IQR`、`outliers` | 分佈形狀更細、密度 |

#### 3.5 `stacked bar` vs `grouped bar`

先懂一句話：

```text
stacked bar = 看部分占整體
grouped bar = 並排比較群組
```

| 比較 | `stacked bar` 堆疊長條 | `grouped bar` 分組長條 |
|---|---|---|
| 重點 | 部分對整體 | 群組之間並排比較 |
| 適合 | 看銷售結構、占比 | 比較每家店某品項誰最多 |
| 限制 | 除第一段外不共用起點，精準比較較難 | 類別太多時畫面很擠 |

記憶方式：

```text
類別比高低 → bar
連續看區間 → histogram
時間看走勢 → line
兩變數看關係 → scatter
兩維格子看高低 → heatmap
```

### Exam Rule

```text
類別比較 → bar chart
連續資料分佈 / bins → histogram
時間序列 / 趨勢 → line chart
兩個連續變數 → scatter plot
少量類別占比 → pie chart / donut chart
兩維交叉 / correlation matrix → heatmap
中位數 / IQR / outliers → box plot
分佈形狀 / density → violin plot
part-to-whole 組成 → stacked bar
side-by-side comparison → grouped bar
```

### Quick Check

題目：題目說「想看每位顧客單次消費金額大多落在哪些區間」，應選長條圖還是直方圖？

答案：直方圖 `histogram`。因為消費金額是連續數值，題目要看分佈區間。

## 4. Python 視覺化工具 🔥🔥

### 先懂一句話

```text
Python 視覺化工具 = matplotlib 重控制，seaborn 重快速統計圖，Plotly 重互動展示
```

考點不是誰比較高級，而是需求不同。

### Everyday Analogy

像做海報：`matplotlib` 像自己一個一個調位置，`seaborn` 像套用乾淨範本，`Plotly` 像做可以點、滑、放大的互動網頁。

### 先問自己一個問題

```text
我要靜態精修、快速 EDA，還是互動網頁圖？
```

### 技術說法

`matplotlib` 是 Python 基礎繪圖庫；`seaborn` 建立在 matplotlib 上，偏高階統計視覺化；`Plotly` 主打互動式與網頁展示。

### 在整體流程中的位置

```text
選好圖表類型
→ 判斷輸出需求：靜態 / 快速探索 / 互動
→ 選 Python 工具
```

### Key Concepts

比較表這樣讀：

| 工具 | 定位 | 優勢 | 典型情境 | 白話記法 |
|---|---|---|---|---|
| `matplotlib` | Python 基礎繪圖庫，低階 `low-level` | 細節控制高、靜態輸出強、出版品質 | 報告圖、論文圖、精準調整刻度字型 | 手動精修 |
| `seaborn` | 建立在 `matplotlib` 上的高階統計視覺化 | 快速 EDA、預設風格一致、統計圖友善 | 箱線圖、熱圖、分類比較、資料探索 | 快速統計圖 |
| `Plotly` | 互動式圖表與 web 展示 | hover、zoom、pan、dashboard、web embed | 網頁儀表板、互動探索、展示型圖表 | 可互動 |

常見程式碼判讀：

```python
plt.bar(df["platform"], df["sales"])     # bar chart 長條圖
plt.hist(df["sales"], bins=10)           # histogram 直方圖
plt.scatter(df["ad_spend"], df["sales"]) # scatter plot 散布圖
plt.plot(df["date"], df["users"])        # line chart 折線圖

sns.boxplot(data=df, x="class", y="score") # box plot 箱線圖
sns.heatmap(data, annot=True)              # heatmap 熱圖，annot=True 顯示數值

px.scatter(df, x="col1", y="col2", color="category") # Plotly 互動散布圖
```

程式碼題的讀法：

```text
先看函式名
→ 再看 x/y/color/bins
→ 再看題目問比較、分佈、關係或趨勢
```

記憶方式：

```text
matplotlib = static + control
seaborn = statistical + EDA
Plotly = interactive + web
```

### Exam Rule

```text
low-level / full control / static publication-quality → matplotlib
建立在 matplotlib 上 / high-level / statistical visualization / EDA → seaborn
interactive / hover / zoom / pan / web dashboard → Plotly
plt.bar() → 長條圖
plt.hist(..., bins=...) → 直方圖
sns.heatmap(..., annot=True) → 熱圖且顯示格子數值
px.scatter() → Plotly 互動散布圖
```

### Quick Check

題目：題目說「要做可放大、滑鼠移過去顯示數值的網頁圖表」，應優先想到哪個工具？

答案：`Plotly`。因為 hover、zoom、web 展示是 Plotly 的核心特色。

## 5. BI 工具：Tableau 與 Power BI 🔥🔥

### 先懂一句話

```text
BI 工具 = 不靠手寫程式，做商業 dashboard 與跨部門溝通
```

Tableau 和 Power BI 都是 BI 工具。Tableau 常和拖拉式商業呈現連在一起；Power BI 常和 Microsoft 生態整合連在一起。

### Everyday Analogy

像辦公室工具選擇：有人習慣用專門簡報工具快速做漂亮展示，有人整個公司都在 Microsoft 生態中工作。兩者都能做報表，但適用環境不同。

### 先問自己一個問題

```text
題目強調拖拉式商業展示，還是 Microsoft / Office / Azure 生態？
```

### 技術說法

BI 工具重點是資料儀表板、商業溝通與分享，不是低階繪圖控制。考試常用工具定位與免費版本限制來設陷阱。

### 在整體流程中的位置

```text
資料已整理
→ 需要商業 dashboard / 跨部門分享
→ 選 Tableau 或 Power BI
```

### Key Concepts

比較表這樣讀：

| 比較 | `Tableau` | `Power BI` |
|---|---|---|
| 定位 | 拖拉式 BI，強調探索與商業呈現 | Microsoft BI 平台 |
| 受眾 | 商業分析師、主管、跨部門利害關係人 | Microsoft 企業環境、內部報表使用者 |
| 強項 | 視覺探索、故事化呈現、拖拉式 dashboard | Office 365、Excel、Azure、Teams 整合 |
| 免費入口 | `Tableau Public` 可免費，但所有作品**強制公開**，不適合機密或私人資料 | `Power BI Desktop` 可免費起步 |
| 常見辨識 | drag-and-drop、business stakeholders | DAX、Microsoft ecosystem |

記憶方式：

```text
Tableau = 拖拉式商業 BI；Tableau Public = 強制公開
Power BI = Microsoft 生態；Desktop 可免費起步
```

### Exam Rule

```text
拖拉式 BI / 商業簡報 / non-technical stakeholders → Tableau
Microsoft / Office 365 / Excel / Azure / Teams / DAX → Power BI
Tableau Public → 免費，但所有作品強制公開發佈，無法儲存為私人，不適合機密資料
Power BI Desktop → 可免費起步，本機製作常見
考試陷阱：「哪個工具無法儲存私人資料？」→ Tableau Public
```

### Quick Check

題目：公司資料流程大量使用 Excel、Teams、Azure，現在要做內部 BI 報表，最直覺的工具是哪個？

答案：`Power BI`。因為它和 Microsoft 生態整合最強。

## 6. Task / Scenario Selection 🔥🔥🔥

### 先懂一句話

```text
Scenario Selection = 先看輸出想讓人判斷什麼，再選圖表或工具
```

不要看到圖名就猜，要從資料型態與分析目的反推。

### Everyday Analogy

像醫生問診：不能只看病人說「不舒服」就開藥，要先分辨是發燒、過敏、扭傷還是胃痛。圖表選擇也要先分類問題。

### 先問自己一個問題

```text
資料型態是類別、連續、時間、兩個連續變數，還是兩維交叉？
```

再問輸出需求是靜態、互動、快速 EDA，還是商業 dashboard。

### 技術說法

情境題通常把答案藏在資料型態與分析目的裡。先判斷問題，再選圖表；先判斷輸出需求，再選工具。

### 在整體流程中的位置

```text
先看輸出形式 / scenario requirement
→ 判斷任務類型
→ 選圖表、工具、設計原則
```

### Key Concepts

比較表這樣讀：

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 | 判斷關鍵 |
|---|---|---|---|---|
| 比較各部門營收 | 類別 + 數值 | 誰高誰低 | `bar chart` | 類別比較 |
| 看年齡或消費金額分佈 | 單一連續變數 | 區間頻數 | `histogram` | bins |
| 看每日活躍用戶走勢 | 時間 + 數值 | 上升/下降趨勢 | `line chart` | time trend |
| 看廣告費和銷售額關係 | 兩個連續變數 | 關聯、群聚、離群點 | `scatter plot` | x-y relationship |
| 看三個產品線占總營收比例 | 少量類別 + 占比 | part-to-whole | `pie/donut chart` | 少量占比 |
| 看不同班級成績中位數與離群值 | 多組連續資料 | 分佈摘要 | `box plot` | median / IQR |
| 看分佈是否雙峰 | 連續資料 | 密度輪廓 | `violin plot` | density shape |
| 看星期 × 時段的流量高低 | 兩維交叉 + 數值 | 高低模式 | `heatmap` | grid intensity |
| 快速探索統計圖 | DataFrame | EDA 圖表 | `seaborn` | quick stats |
| 網頁互動圖 | 資料表 | hover/zoom 圖表 | `Plotly` | interactive |
| 商業主管 dashboard | 多資料來源 | 可分享儀表板 | `Tableau` / `Power BI` | BI dashboard |

30 秒判斷流程：

```text
1. 先看資料型態：類別 / 連續 / 時間
2. 再看分析目的：比較 / 分佈 / 組成 / 關係 / 趨勢
3. 再看輸出需求：靜態 / 快速 EDA / 互動 / 商業 dashboard
4. 最後檢查設計陷阱：chart junk、色階錯、顏色不一致、標題不清
```

記憶方式：

```text
先資料型態，後分析目的，再輸出需求，最後檢查設計陷阱
```

### Exam Rule

```text
題目給資料情境 → 先判斷分析目的，不要先背圖名
題目給 Python 函式 → 函式名 + 欄位型態 + 分析目的一起看
題目給 dashboard 使用者 → 看是否商業拖拉式或 Microsoft 生態
題目問可讀性 → 找 chart junk、data-ink ratio、色彩與版面問題
```

### Quick Check

題目：題目說「要看星期幾和時段交叉後，哪個格子的網站流量最高」，應選哪種圖？

答案：`heatmap` 熱圖。因為這是兩個維度交叉後，用顏色強度表現數值大小。

## 7. 視覺化效能與 Dashboard 設計 🔥🔥

### 先懂一句話

```text
視覺化效能 = 讀者能快速、準確、低負擔地理解資料
```

有效不等於漂亮。Dashboard 的重點是清楚的問題、穩定的版面、一致的編碼。

### Everyday Analogy

像蝦皮商品頁：你要一眼看到價格、規格、評價和運送方式。如果畫面很炫但找不到重點，使用體驗仍然很差。

### 先問自己一個問題

```text
讀者看這張圖，需要花多久才知道重點？
```

如果要花很久才懂，可能是 clarity 低、decode time 高，或 dashboard 過載。

### 技術說法

視覺化效能關心 `data density`、`clarity`、`decode time`、`accessibility` 與 dashboard 的一致性設計。

### 在整體流程中的位置

```text
圖表產生後
→ 檢查讀者是否快速看懂
→ 調整 dashboard / accessibility / layout
```

### Key Concepts

比較表這樣讀：

| 效能概念 | 意思 | 考試關鍵 | 白話記法 |
|---|---|---|---|
| `data density` 資料密度 | 有限空間中呈現足夠資料 | 不是空蕩，也不是塞滿裝飾 | 資訊密度剛好 |
| `clarity` 清晰度 | 圖表訊息是否容易理解 | 看一眼知道主題 | 清楚 |
| `decode time` 解碼時間 | 從看到圖到理解要花多久 | 越短越好 | 越快懂越好 |
| `accessibility` 可及性 | 色弱、文字大小、對比、標籤 | 不只靠顏色傳遞資訊 | 所有人都能讀 |

Dashboard 設計要點：

| 原則 | 做法 | 考試提醒 |
|---|---|---|
| 一張圖一個訊息 | 每張圖回答一個主要問題 | 不要一張圖回答太多問題 |
| 一致色彩編碼 | 同一類別在不同圖中保持同色 | 同部門不要每張圖換色 |
| 清楚標題 | 標題要說明內容，最好提示結論 | 標題要幫讀者抓重點 |
| 版面一致 | 圖例、字級、排序、間距要穩定 | 降低重新解讀成本 |
| 根據顯示尺寸設計 | 手機、投影幕、桌機可讀性不同 | 字太小也是問題 |
| 可及性 | 色盲友善、文字可讀、前景背景對比足夠 | 不只靠顏色 |

記憶方式：

```text
一圖一重點，同類同色，標題講重點，不只靠顏色
```

### Exam Rule

```text
好看但看不懂 → 視覺化效能低
讀者要花很久解讀 → decode time 高，不佳
同一類別在不同圖顏色不同 → inconsistent color encoding
只靠紅綠區分 → accessibility 問題
標題只寫「銷售分析」但沒說重點 → title clarity 不足
一張圖塞太多訊息 → dashboard overload
```

### Quick Check

題目：一個 dashboard 中，A 部門在第一張圖是藍色，第二張圖又變成橘色，主要違反哪個原則？

答案：一致色彩編碼 `consistent color encoding`。因為同一類別在不同圖中應盡量維持同一顏色，降低讀者重新解讀的成本。

## 8. Exam Decision Trees

### 8.1 圖表選擇決策樹

```text
題目問要選哪種圖？
│
├─ X 軸是時間或順序，重點是變化？
│  └─ 選 line chart
│
├─ 要比較類別之間誰多誰少？
│  ├─ 類別直接比較 → bar chart
│  ├─ 類別內還要分小組並排比 → grouped bar
│  └─ 看各部分占整體 → stacked bar
│
├─ 要看連續資料分佈？
│  ├─ 單一連續變數落在哪些區間 → histogram
│  ├─ 要中位數 / IQR / 離群值 → box plot
│  └─ 要看密度形狀 / 雙峰 → violin plot
│
├─ 要看兩個變數關係？
│  ├─ 兩個連續變數 → scatter plot
│  └─ 兩維交叉或相關矩陣 → heatmap
│
└─ 要看整體中的占比？
   ├─ 類別少、比例差明顯 → pie / donut chart
   └─ 類別多或要跨組比較 → stacked bar 或 bar chart
```

### 8.2 工具選擇決策樹

```text
題目問要選哪個工具？
│
├─ Python 靜態圖，且要精細控制？
│  └─ matplotlib
│
├─ Python 快速 EDA 或統計視覺化？
│  └─ seaborn
│
├─ 需要 hover / zoom / pan / web embed？
│  └─ Plotly
│
└─ 商業 dashboard / BI？
   ├─ 拖拉式、商業呈現、跨部門主管 → Tableau
   └─ Office 365 / Excel / Azure / Teams / DAX → Power BI
```

### 8.3 設計原則決策樹

```text
題目問圖表是否有效？
│
├─ 有 3D、陰影、背景圖、過度裝飾？
│  └─ chart junk / data-ink ratio 低
│
├─ 顏色使用有問題？
│  ├─ 只靠紅綠 → accessibility 問題
│  ├─ 低到高數值 → sequential
│  ├─ 高於/低於中心 → diverging
│  └─ 不同類別 → categorical
│
├─ 讀者要花很久才懂？
│  └─ decode time 高 / clarity 低
│
└─ dashboard 中同類別顏色不一致？
   └─ inconsistent color encoding
```

## 9. Trap Clinic

### Trap 1：長條圖和直方圖都像柱子，所以可以互換

錯。`bar chart` 是類別比較，`histogram` 是連續資料分佈。

Exam fix：

```text
X 軸是類別 → bar chart
X 軸是數值區間 bins → histogram
```

### Trap 2：圓餅圖一定都是錯的

錯。圓餅圖不是禁用，而是限用。少量類別、比例差異明顯、重點是整體占比時可以用。

Exam fix：

```text
part-to-whole + 類別少 → pie / donut chart 可接受
類別多或要精準比較 → bar chart / stacked bar 較好
```

### Trap 3：`seaborn` 是和 `matplotlib` 完全無關的工具

錯。`seaborn` 是建立在 `matplotlib` 上的高階統計視覺化套件。

Exam fix：

```text
建立在 matplotlib 上 / high-level / statistical visualization → seaborn
```

### Trap 4：`data-ink ratio` 越低越乾淨

錯。方向相反，`data-ink ratio` 要提高，表示更多視覺元素真的用來表達資料。

Exam fix：

```text
移除多餘格線、背景、3D、裝飾 → 提高 data-ink ratio
```

### Trap 5：所有美化都叫 `chart junk`

錯。只有不必要且干擾理解的元素才是 `chart junk`。能幫助分群、導引或強調的設計不一定是垃圾。

Exam fix：

```text
干擾讀值 / 增加認知負擔 / 無資訊價值 → chart junk
```

### Trap 6：互動式圖表優先選 `matplotlib`

錯。`matplotlib` 強在靜態與細節控制；互動、hover、zoom、web 展示優先想到 `Plotly`。

Exam fix：

```text
interactive / hover / zoom / web dashboard → Plotly
static / publication-quality / full control → matplotlib
```

### Trap 7：`Tableau Public` 和 `Power BI Desktop` 的免費限制一樣

錯。兩者都可免費起步，但限制方向相反。`Tableau Public` 強制所有作品**公開發佈**（無法儲存私人），限制的是**私密性**；`Power BI Desktop` 免費本機製作，限制在於**分享**（分享給他人需要 Pro/Premium 訂閱）。

Exam fix：

```text
Tableau Public → 強制公開，不能存為私人，不適合機密資料
Power BI Desktop → 免費本機製作，分享他人才需付費訂閱
考試陷阱：「哪個工具無法儲存私人資料？」→ Tableau Public
```

### Trap 8：任何熱圖都適合發散色階

錯。只有資料有中心點，例如 0、平均值、目標值，才適合 `diverging`。一般低到高數值用 `sequential`。

Exam fix：

```text
低到高 → sequential
高於/低於中心 → diverging
```

### Trap 9：只要顏色夠鮮明，圖表就可讀

錯。只靠顏色傳遞資訊會造成可及性問題，尤其紅綠對比對部分色弱使用者不友善。

Exam fix：

```text
只靠顏色 / 紅綠區分 → accessibility 問題
顏色 + 標籤 / 形狀 / 位置 → 較佳
```

### Trap 10：dashboard 資訊越多越完整

錯。塞太多圖和標籤會降低清晰度，增加解碼時間。

Exam fix：

```text
一張圖一個訊息 / 清楚標題 / 一致色彩 → dashboard clarity
```

## 10. Practice Questions

### 10.1 圖表類型

**Q1.** 要比較各產品類別的銷售額，最適合哪種圖？

答案：`bar chart` 長條圖。  
理由：產品類別是類別型資料，題目要比較數值大小。

**Q2.** 要看顧客年齡大多集中在哪些區間，最適合哪種圖？

答案：`histogram` 直方圖。  
理由：年齡是連續數值，題目要看分佈區間。

**Q3.** 要看每日活躍用戶數是否逐月上升，最適合哪種圖？

答案：`line chart` 折線圖。  
理由：題目重點是時間序列趨勢。

**Q4.** 要看廣告花費和銷售額是否正相關，最適合哪種圖？

答案：`scatter plot` 散布圖。  
理由：兩個變數都是連續數值，重點是關係。

**Q5.** 要看星期幾與時段交叉後的來客量高低，最適合哪種圖？

答案：`heatmap` 熱圖。  
理由：兩個維度交叉後，可用顏色強度表示數值大小。

**Q6.** 要比較不同班級成績的中位數、四分位距與離群值，最適合哪種圖？

答案：`box plot` 箱線圖。  
理由：箱線圖適合摘要分佈並顯示離群值。

**Q7.** 要看一組分數分佈是否有雙峰形狀，箱線圖和提琴圖何者更適合？

答案：`violin plot` 提琴圖。  
理由：提琴圖比箱線圖更能呈現分佈形狀與密度輪廓。

**Q8.** 要看三個銷售通路各占總營收多少，且類別很少，可用哪種圖？

答案：`pie chart` 或 `donut chart`。  
理由：少量類別的整體占比可以用圓餅圖或環圈圖。

### 10.2 工具與程式碼判讀

**Q9.** 題目出現 `plt.hist(df["income"], bins=20)`，最可能畫出什麼？

答案：直方圖 `histogram`。  
理由：`hist` 和 `bins` 都是連續資料分佈的訊號。

**Q10.** 題目出現 `sns.heatmap(corr, annot=True)`，`annot=True` 的意思是什麼？

答案：在熱圖格子中顯示數值註記。  
理由：`annot` 是 annotation 的縮寫，用來顯示格子數字。

**Q11.** 要做靜態、出版品質、可精細控制刻度與字型的圖，優先選哪個 Python 工具？

答案：`matplotlib`。  
理由：它是低階基礎繪圖庫，細節控制能力高。

**Q12.** 要快速做 EDA 的統計圖，並且工具建立在 `matplotlib` 上，答案是什麼？

答案：`seaborn`。  
理由：seaborn 是 matplotlib 的高階統計視覺化封裝。

**Q13.** 題目強調 hover、zoom、pan、web dashboard，優先選什麼？

答案：`Plotly`。  
理由：Plotly 的核心特色是互動式圖表與網頁展示。

**Q14.** 商業部門主管想用拖拉方式做 dashboard，不想寫程式，常見答案是什麼？

答案：`Tableau`。  
理由：Tableau 是拖拉式 BI 工具，強調商業呈現。

**Q15.** 公司大量使用 Office 365、Excel、Azure，BI 報表工具最常想到什麼？

答案：`Power BI`。  
理由：Power BI 和 Microsoft 生態整合強。

### 10.3 設計原則與陷阱

**Q16.** 刪除 3D 陰影、厚背景、無關圖片後，通常會提高哪個指標？

答案：`data-ink ratio` 資料墨水比。  
理由：更多視覺元素會真正用來傳達資料。

**Q17.** 一張圖有華麗背景照片，但讓讀者看不清長條高度，這是什麼問題？

答案：`chart junk` 圖表垃圾。  
理由：背景沒有增加資訊，還干擾讀值。

**Q18.** 人眼通常最擅長用哪個前注意屬性比較數值高低？

答案：`position` 位置。  
理由：位置通常比顏色、大小、形狀更精準。

**Q19.** 資料是高於或低於平均值的差異，應選哪種色階？

答案：`diverging color scale` 發散色階。  
理由：資料有中心點，並向兩側偏離。

**Q20.** 資料只是銷售額由低到高，應選哪種色階？

答案：`sequential color scale` 連續色階。  
理由：資料是單方向大小變化。

**Q21.** 不同平台、不同部門、不同產品類型應使用哪種色階？

答案：`categorical color scale` 類別色階。  
理由：這些是互相獨立的離散類別。

**Q22.** 圖表只用紅色和綠色表示好壞，沒有標籤或其他編碼，主要問題是什麼？

答案：可及性 `accessibility` 問題。  
理由：只靠顏色會讓部分色弱使用者難以判讀。

**Q23.** dashboard 中每張圖都使用不同顏色代表同一部門，違反什麼原則？

答案：一致色彩編碼 `consistent color encoding`。  
理由：同一類別在不同圖中應盡量保持同色。

**Q24.** 題目說一張圖要同時回答五個問題，導致讀者不知道先看哪裡，問題是什麼？

答案：dashboard 或圖表過載，清晰度低。  
理由：有效圖表通常一張圖回答一個主要訊息。

**Q25.** `Tableau Public` 的常見限制是什麼？

答案：所有作品**強制公開發佈**，無法儲存為私人。  
理由：Tableau Public 是免費版本，但代價是所有工作簿必須公開，不適合包含機密或私人資料。考試陷阱：「哪個工具無法儲存私人資料？」→ Tableau Public。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 視覺化是資料分析的輸出層，先看題目要比較、分佈、組成、關係，還是趨勢。
2. 類別比較用 `bar chart`，連續分佈用 `histogram`，時間趨勢用 `line chart`，兩連續變數關係用 `scatter plot`。
3. `box plot` 看中位數、四分位、離群值；`violin plot` 看更細的分佈形狀。
4. `matplotlib` 是靜態精修與細節控制，`seaborn` 是快速 EDA 和統計圖，`Plotly` 是互動與網頁展示。
5. `Tableau` 想到拖拉式商業 BI，`Power BI` 想到 Microsoft、Office 365、Azure、DAX。
6. `data-ink ratio` 要提高，`chart junk` 是會干擾理解又沒有資訊價值的裝飾。
7. 色階要跟資料型態配對：低到高用連續，有中心點用發散，不同類別用分類。

## Final Study Advice

不要只背圖表名稱。考試真正想測的是你能不能從題目描述判斷：資料型態是什麼、分析目的要回答什麼、輸出需要靜態還是互動、圖表設計是否讓人更快看懂。

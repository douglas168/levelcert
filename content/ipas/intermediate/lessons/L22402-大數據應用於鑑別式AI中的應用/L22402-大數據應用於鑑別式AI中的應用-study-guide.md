# L22402 大數據應用於鑑別式AI中的應用 — Study Guide v2

## 0. How to Use This Guide

這一課先不要急著背公式。每一節都照同一個讀法：

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

建議閱讀順序：

1. 先讀第 1 節，建立「大數據分類工作負載」的整體流程。
2. 再讀第 2-7 節，學會場景、混淆矩陣、指標、threshold、AUC-ROC、sklearn pseudocode。
3. 考前用第 8-11 節練判斷：先看場景，再看 FP/FN 代價，再選指標或程式輸出。

火力標記：

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

本課不是演算法推導課。不要把重點放在 `邏輯斯迴歸（Logistic Regression）`、`決策樹（Decision Tree）`、`支援向量機（Support Vector Machine, SVM）` 的內部數學。本課考的是：大數據如何支撐分類 / 預測任務，以及模型部署後如何用指標判讀表現。

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

`大數據（Big Data）` 讓鑑別式 AI 可以從大量資料中判斷「這筆資料是哪一類」，但資料越多，錯誤也越容易被平均值蓋掉，所以一定要看分類指標、錯誤代價與部署後監控。

### Everyday Analogy

像便利商店總公司每天看全台交易紀錄。資料越多，越能看出異常交易或顧客流失跡象；但只看全台平均不夠，因為某些門市、時段或客群可能已經出問題。

### 先問自己一個問題

題目到底要我判斷什麼？

```text
是分類場景？
是錯誤代價？
是評估指標？
是 threshold / AUC？
是 sklearn 程式輸出？
```

### 技術說法

`鑑別式 AI（Discriminative AI）` 的重點是學會輸入資料與標籤之間的邊界，常見輸出是類別，例如 `spam / not spam`、`fraud / normal`、`churn / non-churn`。

大數據在這裡的角色不是讓模型「自動變好」，而是提供大量、多樣、持續更新的資料，讓分類 / 預測工作能在真實部署環境中運作。

### 流程

```text
大量歷史資料
→ 轉成特徵（features）
→ 訓練分類 / 預測模型
→ 新資料進來
→ 輸出類別或機率
→ 用 Confusion Matrix 與 Metrics 評估
→ 調整 threshold 或部署策略
→ 持續監控不同群體 / 時段 / 來源
```

### 比較表這樣讀

先看題目「卡在哪一層」，不要一看到 AI 就背演算法名稱。

| 題目問的是 | 先想到 |
|---|---|
| spam / fraud / churn / diagnosis / image recognition | 分類或類別預測場景 |
| rare event / 少數類很少 / 正類不到 1% | Accuracy 可能誤導 |
| 不想漏掉真正陽性 | Recall、FN 代價 |
| 不想誤殺正常個案 | Precision、FP 代價 |
| 不同 threshold 下的表現 | ROC Curve、AUC |
| `.fit()` / `.predict()` / `.predict_proba()` | sklearn 推論流程 |

### 記憶方式

```text
L22402 = 場景 → 錯誤 → 指標 → threshold → sklearn → 部署監控
```

### Exam Rule

```text
大數據 + 分類部署 → 不只看訓練，也要看部署後監控
分類 / 預測類別 → 看 Confusion Matrix 與分類指標
少數類很少 → Accuracy 可能誤導
題目問模型內部推導 → 通常不是 L22402 主軸
```

### Quick Check

某詐欺偵測系統每天處理百萬筆交易，詐欺比例很低，但報告只說 Accuracy = 99.8%。這個報告最大問題是什麼？

答案：不能只看 Accuracy。因為詐欺是少數類，模型即使漏掉大量詐欺，也可能因為正常交易很多而有很高 Accuracy。

## 2. 大數據鑑別式 AI 應用場景 🔥🔥

### 先懂一句話

鑑別式 AI 在本課常用來做「判斷這筆資料屬於哪一類」或「預測某事件會不會發生」。

### Everyday Analogy

像老師批改作業時把學生分成「及格 / 不及格」或「需要輔導 / 不需要輔導」。重點不是創作新內容，而是根據資料做分類判斷。

### 先問自己一個問題

題目的輸出是不是類別？

```text
fraud / normal → 類別
spam / not spam → 類別
churn / non-churn → 類別
有病 / 沒病 → 類別
```

如果輸出是類別，通常先往 `分類（Classification）` 想，不要自動選回歸。

### 技術說法

`分類（Classification）` 是把樣本分到離散類別。`預測（Prediction）` 在本課不一定是連續數值預測；如果預測結果是 `會 / 不會`、`是 / 否`、`類別 A / 類別 B`，它仍然是分類任務。

### 流程

```text
大量資料來源
→ 轉成特徵
→ 分類 / 預測模型
→ 輸出場景結果
→ 根據 FP / FN 代價選指標
```

### 比較表這樣讀

讀這張表時，先看「錯哪一種比較痛」，再選 Precision 或 Recall。

| 任務 / 場景 | 輸入 | 輸出 | 考場判斷 |
|---|---|---|---|
| 垃圾郵件過濾（Spam Filtering） | 郵件內容、寄件資訊 | spam / not spam | 二元分類；正常信被誤殺是 FP，常重視 Precision |
| 詐欺偵測（Fraud Detection） | 交易紀錄、帳戶行為 | fraud / normal | 類別不平衡；真詐欺被放過是 FN，常重視 Recall |
| 顧客流失預測（Churn Prediction） | 登入、消費、客服互動 | churn / non-churn | prediction 可是分類，不一定是回歸 |
| 醫療診斷（Medical Diagnosis） | 病歷、檢查或影像資料 | diseased / healthy | 漏判病患是 FN，常偏重 Recall |
| 大規模影像辨識（Image Recognition at Scale） | 大量圖片 | 類別或異常標籤 | 要看總體，也要看來源、批次、子群 |

### 一步一步例子

```text
Email
→ 取出寄件者、標題、內容等 features
→ Classifier
→ Spam / Not Spam

Transaction
→ 取出金額、地點、時間、帳戶行為等 features
→ Classifier
→ Fraud / Normal

Customer history
→ 取出登入、消費、客服互動等 features
→ Classifier
→ Churn / Non-churn
```

### 記憶方式

```text
看輸出：
類別 → Classification
連續數字 → Regression
```

### Exam Rule

```text
spam filtering → 正常信被誤殺是 FP，常重視 Precision
fraud detection → 真詐欺被放過是 FN，常重視 Recall
medical diagnosis → 漏判病患是 FN，常重視 Recall
churn prediction → 常是分類，不要自動選回歸
image recognition at scale → 看總體，也要看不同來源 / 批次 / 子群
```

### Quick Check

題目說「訂閱平台想預測客戶下個月是否會流失」。這一定是回歸問題嗎？

答案：不一定，通常是分類問題。因為輸出常是 `churn / non-churn` 這種類別。

## 3. 混淆矩陣（Confusion Matrix）🔥🔥🔥

### 先懂一句話

`混淆矩陣（Confusion Matrix）` 是分類模型的四格記分板：模型判對或判錯，都要分清楚是哪一種對、哪一種錯。

### Everyday Analogy

像保全判斷誰可以進大樓。真的住戶放進來是對的，陌生人擋下來也是對的；但把住戶擋掉或把陌生人放進來，是兩種不同錯誤。

### 先問自己一個問題

每一格都先問兩件事：

```text
1. 真實答案是正類還是負類？
2. 模型預測是正類還是負類？
```

### 技術說法

`Positive（正類）` 是題目關心要抓出來的類別，例如詐欺、有病、垃圾信。`Negative（負類）` 是相反類別，例如正常交易、沒病、正常信。

### 流程

```text
模型預測結果
→ 對照真實答案
→ 形成 TP / FP / TN / FN
→ 計算 Accuracy / Precision / Recall / F1
```

### 比較表這樣讀

先看第二個字 `Positive / Negative`，它代表模型判成什麼；再看第一個字 `True / False`，它代表模型有沒有判對。

| 名稱 | 拆開看 | 意思 | 白話記法 |
|---|---|---|---|
| TP（True Positive） | 判對 + 判正類 | 真實為正類，模型也判正類 | 該抓的有抓到 |
| FP（False Positive） | 判錯 + 判正類 | 真實為負類，模型卻判正類 | 不該抓的被抓 |
| TN（True Negative） | 判對 + 判負類 | 真實為負類，模型也判負類 | 不該抓的有放過 |
| FN（False Negative） | 判錯 + 判負類 | 真實為正類，模型卻判負類 | 該抓的漏掉 |

典型 2x2 表：

```text
                    真實類別（Actual）
                 正類（Positive）  負類（Negative）
預測為正類           TP               FP
預測為負類           FN               TN
```

### 一步一步例子

某詐欺偵測系統處理 1000 筆交易：

```text
TP = 60, FP = 30, TN = 880, FN = 30

                    Actual Fraud   Actual Normal
Pred Fraud               60              30
Pred Normal              30             880
```

這張表這樣讀：

| 問題 | 看哪一格 | 數字 |
|---|---|---|
| 抓到多少真正詐欺？ | TP | 60 |
| 多抓多少正常交易？ | FP | 30 |
| 漏掉多少詐欺？ | FN | 30 |
| 正常交易判對多少？ | TN | 880 |

### 記憶方式

```text
True / False = 模型有沒有判對
Positive / Negative = 模型判成正類或負類

FP = False alarm = 亂抓
FN = Miss = 漏抓
```

> 注意 sklearn 預設方向：`sklearn.metrics.confusion_matrix()` 的預設輸出格式為 `[[TN, FP], [FN, TP]]`（負類在左上角）。與上面的教學表（TP 在左上角）方向不同。讀程式輸出時，務必確認哪一列 / 欄代表正類。例如：`cm[1][1]` 才是 TP，`cm[0][0]` 是 TN。

### Exam Rule

```text
正常信被判成垃圾信 → FP
垃圾信被放過 → FN
病患有病卻判沒病 → FN
正常交易被判詐欺 → FP
```

### Quick Check

醫療模型把真正有病的人判成沒病，這是 TP、FP、TN、FN 哪一種？

答案：FN。因為真實是正類（有病），但模型預測成負類（沒病）。

## 4. 分類評估指標（Evaluation Metrics）🔥🔥🔥

### 先懂一句話

分類指標不是同一件事：`Accuracy` 看整體答對多少，`Precision` 看判成正類的有多準，`Recall` 看真正正類抓到多少，`F1 Score` 看 Precision 與 Recall 是否平衡。

### Everyday Analogy

像社團招募名單。你可以問「整體判斷對幾個人」，也可以問「被你選上的人有幾個真的適合」，或問「所有適合的人你有沒有漏掉」。

### 先問自己一個問題

題目真正關心哪一種問題？

```text
整體答對率？→ Accuracy
不要亂抓？→ Precision
不要漏抓？→ Recall
兩者都要顧？→ F1 Score
```

### 技術說法

所有主要分類指標都從 `TP / FP / TN / FN` 算出來。考試常見陷阱是類別不平衡時，`Accuracy（準確率）` 可能很高，但模型其實抓不到少數正類。

### 流程

```text
TP / FP / TN / FN
→ Accuracy / Precision / Recall / F1
→ 根據場景錯誤代價選主要指標
```

### 比較表這樣讀

這張表不要背公式順序，要背「每個指標在問哪一句話」。

| 指標 | 公式 | 問的是 | 適合場景 |
|---|---|---|---|
| Accuracy（準確率） | `(TP + TN) / 全部` | 全部預測中答對多少？ | 類別分布較平均 |
| Precision（精確率） | `TP / (TP + FP)` | 判成正類的有多準？ | 誤報成本高、不要亂抓 |
| Recall（召回率） | `TP / (TP + FN)` | 真正正類抓到多少？ | 漏報成本高、不要漏抓 |
| F1 Score | `2PR / (P + R)` | Precision / Recall 是否平衡？ | 不平衡分類、兩者都要顧 |

### 一步一步例子

用第 3 節詐欺例子：

```text
TP = 60, FP = 30, TN = 880, FN = 30
全部 = TP + FP + TN + FN
     = 60 + 30 + 880 + 30
     = 1000

Accuracy
= (TP + TN) / 全部
= (60 + 880) / 1000
= 940 / 1000
= 0.94 = 94%

Precision
= TP / (TP + FP)
= 60 / (60 + 30)
= 60 / 90
= 0.667 = 66.7%

Recall
= TP / (TP + FN)
= 60 / (60 + 30)
= 60 / 90
= 0.667 = 66.7%

F1 Score
= 2 × Precision × Recall / (Precision + Recall)
= 2 × 0.667 × 0.667 / (0.667 + 0.667)
= 0.667 = 66.7%
```

這個例子故意讓你看到：Accuracy 很高，不代表正類表現很好。

### 類別不平衡陷阱

```text
10000 人篩檢，只有 100 人真的有病
模型全部猜「沒病」

TP = 0
FP = 0
TN = 9900
FN = 100

Accuracy
= (TP + TN) / 全部
= (0 + 9900) / 10000
= 99%

Recall
= TP / (TP + FN)
= 0 / (0 + 100)
= 0%
```

這個模型看起來 Accuracy 很高，但完全沒有抓到病患。

### 多分類 F1：Macro vs Weighted

`Macro F1 = 每一類都同等重要`
`Weighted F1 = 樣本多的類別權重比較大`

| 計算方式 | 做法 | 適合情境 |
|---|---|---|
| Macro F1 | 各類別 F1 直接平均，不考慮樣本數 | 每個類別同等重要、想看每類均衡表現 |
| Weighted F1 | 以各類別樣本數加權平均 | 類別不平衡、希望反映整體資料分布 |

```text
Macro F1 = 各類 F1 直接取平均
Weighted F1 = Σ(類別樣本數 / 總樣本數) × 該類 F1
```

### 記憶方式

```text
Accuracy = 全班平均考幾分
Precision = 被選上的人準不準
Recall = 該選的人有沒有漏
F1 = Precision 和 Recall 的平衡分數
```

### Exam Rule

```text
全部猜對比例 → Accuracy
判正類有多準 → Precision
真正正類抓到多少 → Recall
Precision + Recall 平衡 → F1 Score
多分類 + 各類別等重要 → Macro F1
多分類 + 類別不平衡 → Weighted F1
rare positive / high imbalance → Accuracy 可能誤導
```

### Quick Check

題目說「模型不要亂把正常信件判成垃圾信，因為會造成重要郵件遺失」。應優先看 Precision 還是 Recall？

答案：Precision。因為重點是降低 FP，也就是不要把負類誤判成正類。

## 5. Precision、Recall 與 Threshold 取捨 🔥🔥🔥

### 先懂一句話

`Decision Threshold（決策門檻）` 是把機率切成類別的分界線。門檻調低通常比較敢抓正類，Recall 可能上升；門檻調高通常比較保守，Precision 可能上升。

### Everyday Analogy

像面試門檻。公司急缺人時，標準放寬，進面試的人變多，但混入不適合者也增加；公司只想找頂尖人才時，標準拉高，名單更精準，但可能漏掉一些好人。

### 先問自己一個問題

題目是在說「寧可多抓」還是「寧可少抓但準」？

```text
寧可多抓，不要漏掉 → Recall
寧可少抓，不要亂抓 → Precision
```

### 技術說法

模型常先輸出正類機率，例如 `0.62`。`threshold` 決定多高才算正類。預設常見是 `0.5`，但業務目標不同，最佳 threshold 也可能不同。

### 流程

```text
predict_proba() 輸出機率
→ 設定 threshold
→ 轉成 predict() 類別
→ 混淆矩陣改變
→ Precision / Recall 改變
```

### 選擇流程

```text
threshold 降低
  → 判正類變多
  → TP 可能增加
  → FN 可能減少
  → Recall 常升
  → FP 也可能增加，Precision 常降

threshold 提高
  → 判正類變少
  → FP 可能減少
  → Precision 常升
  → FN 可能增加，Recall 常降
```

### 一步一步例子

同一筆交易的詐欺機率是 `0.62`：

```text
正類機率 = 0.62

threshold = 0.50
0.62 >= 0.50
→ 預測為正類（Fraud）

threshold = 0.70
0.62 < 0.70
→ 預測為負類（Normal）
```

同一個機率，換 threshold，最後類別就可能改變。

### 比較表這樣讀

先看「錯誤成本」：錯抓很痛就 Precision，漏抓很痛就 Recall。

| 場景 | 常見偏重 | 為什麼 |
|---|---|---|
| 垃圾郵件過濾 | Precision | 正常信被誤殺很痛 |
| 詐欺偵測 | Recall | 真詐欺被漏掉很痛 |
| 醫療診斷 | Recall | 病患漏判風險高 |
| 行銷名單篩選 | Precision | 不想浪費資源在錯的人 |

### 記憶方式

```text
門檻低 = 比較敢抓 = Recall 常升
門檻高 = 比較保守 = Precision 常升
```

### Exam Rule

```text
寧可多抓，也不要漏掉 → 提高 Recall / 降低 threshold
寧可少抓，也不要亂抓 → 提高 Precision / 提高 threshold
0.5 threshold → 常是預設，不一定最佳
同一組 predict_proba 換門檻 → predict 類別會變
```

### Quick Check

若醫療篩檢題目說「寧可多安排複檢，也不要漏掉真正病患」，應偏向提高 Precision 還是 Recall？

答案：Recall。因為題目明確說不要漏掉真正正類，也就是要降低 FN。

## 6. AUC-ROC 曲線 🔥🔥

### 先懂一句話

`ROC Curve（接收者操作特徵曲線）` 看不同 threshold 下的抓人能力與誤抓程度；`AUC（Area Under the Curve）` 把整條 ROC 曲線壓成一個數字，摘要模型的排序能力。

### Everyday Analogy

像把履歷依適合度排名。好的排序會讓真正適合的人排在前面；`AUC` 看的是整體排序能力，不是只看最後切幾個人進面試。

### 先問自己一個問題

題目是在問「單一門檻的結果」還是「很多門檻下的整體表現」？

```text
單一 threshold → Confusion Matrix / Precision / Recall
多個 threshold → ROC Curve / AUC
```

### 技術說法

`TPR（True Positive Rate）` 就是 Recall。`FPR（False Positive Rate）` 是負類被誤判成正類的比例。

```text
TPR = Recall = TP / (TP + FN)
FPR = FP / (FP + TN)
```

### 流程

```text
predict_proba() 或 prediction score
→ 嘗試多個 threshold
→ 得到多組 TPR / FPR
→ 畫 ROC Curve
→ 用 AUC 摘要整體排序能力
```

### 比較表這樣讀

不要把 AUC 當成 Accuracy。AUC 是排序 / 區分能力的摘要。

| AUC 值 | 考場解讀 |
|---|---|
| 接近 1.0 | 排序能力通常越好 |
| 約 0.5 | 接近隨機 |
| 明顯低於 0.5 | 方向可能反了或模型有問題 |

### 一步一步例子

高頻 pseudocode：

```python
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, y_prob)
```

這段這樣讀：

```text
fit → 訓練
predict → 最終類別 y_pred
predict_proba → 正類機率 y_prob
roc_auc_score → 用 y_prob 算 AUC
```

注意：`AUC` 通常用 `y_prob` 或分數，不是只用最終類別 `y_pred`。

### 記憶方式

```text
ROC = 很多門檻的曲線
AUC = 曲線下面積 / 排序能力摘要
```

### Exam Rule

```text
比較不同 threshold 下表現 → ROC Curve
把 ROC 壓成一個數字 → AUC
AUC 接近 0.5 → 接近隨機
roc_auc_score + predict_proba / y_prob → 正確方向
roc_auc_score + predict / y_pred → 常見陷阱
```

### Quick Check

為什麼 AUC-ROC 通常要用 `predict_proba()`，而不是只用 `predict()`？

答案：因為 AUC 看的是多個 threshold 下的排序能力。`predict()` 已經切成最終類別，保留的排序資訊太少。

## 7. sklearn 推論流程與部署後監控 🔥🔥

### 先懂一句話

中級考題常要你看懂 sklearn 風格 pseudocode：`fit()` 是訓練，`predict()` 是輸出類別，`predict_proba()` 是輸出機率，`.score()` 在很多 classifier 中預設是 Accuracy。

### Everyday Analogy

像先用舊考卷教助教改題，之後給他新考卷。助教可以直接判「對 / 錯」，也可以先給信心分數；考場要能分辨這兩種輸出。

### 先問自己一個問題

程式那一行輸出的是什麼？

```text
fit → 訓練模型
predict → 類別
predict_proba → 機率
score → 很多 classifier 預設 Accuracy
```

### 技術說法

`sklearn（scikit-learn）` 常用 `fit / predict / predict_proba` 這種 API。分類指標如 `precision_score`、`recall_score`、`f1_score` 通常吃最終類別 `y_pred`；AUC 通常吃機率或分數 `y_prob`。

### 流程

```text
歷史資料
→ train_test_split()
→ model.fit(X_train, y_train)
→ model.predict(X_test)
→ model.predict_proba(X_test)
→ metrics / monitoring
```

### 一步一步例子

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

cm = confusion_matrix(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)
```

讀法：

```text
model.fit(...) → 用訓練資料學規則
model.predict(...) → 給每筆測試資料一個類別
model.predict_proba(...)[:, 1] → 取正類機率
confusion_matrix / precision / recall / f1 → 看 y_pred
roc_auc_score → 看 y_prob
```

### 比較表這樣讀

先分清楚 `類別` 和 `機率`，再決定能算什麼。

| 程式片段 | 輸出 / 意思 | 常搭配 |
|---|---|---|
| `fit(X_train, y_train)` | 訓練模型 | 歷史訓練資料 |
| `predict(X_test)` | 最終類別標籤 | confusion matrix、precision、recall、F1 |
| `predict_proba(X_test)` | 類別機率 | threshold、AUC |
| `.score(X_test, y_test)` | 很多 classifier 預設為 Accuracy | 不能當完整評估 |

大數據部署後還要看：

| 監控角度 | 為什麼重要 |
|---|---|
| 整體指標 | 看模型是否大致可用 |
| 分群指標 | 避免總平均掩蓋特定客群失準 |
| 時段 / 地區 / 來源 | 找出資料分布改變或局部問題 |
| FP / FN 成本 | 指標要對應實際業務風險 |

### 記憶方式

```text
y_pred = 已經切好的類別
y_prob = 還沒切門檻的機率

y_pred → classification metrics
y_prob → threshold / AUC
```

### Exam Rule

```text
fit → 訓練
predict → 類別標籤 y_pred
predict_proba → 機率 y_prob
y_pred → confusion matrix / precision / recall / F1
y_prob → AUC / threshold
classifier.score() → 很多情況是 Accuracy，不是完整評估報告
```

### Quick Check

題目給 `y_prob = model.predict_proba(X_test)[:, 1]`，最可能是為了計算哪個指標或處理什麼問題？

答案：AUC 或 threshold 調整。因為 `predict_proba()` 保留正類機率，可用來看排序能力或改變分類門檻。

## 8. Task / Scenario Selection 🔥🔥🔥

### 先懂一句話

考場判斷不要先背公式，要先看題目在描述哪種輸出與哪種錯誤代價。

### Everyday Analogy

像接到客服案件時，不能先背 SOP 條文，要先問「這是退貨、詐欺、帳號問題，還是醫療風險？」場景不同，優先處理的錯誤也不同。

### 先問自己一個問題

```text
1. 輸出是類別還是連續數字？
2. 正類是什麼？
3. FP 和 FN 哪個比較痛？
4. 題目要我選指標、threshold，還是程式輸出？
```

### 技術說法

`Task / Scenario Selection` 是把題目文字翻譯成任務類型與評估重點。這一節不是多背一張表，而是練習「看到題目線索 → 選答案」。

### 選擇流程

```text
先看輸出形式 / scenario requirement
→ 判斷任務類型
→ 找出 FP 或 FN 哪個更痛
→ 選方法、指標或 pseudocode 輸出
```

### 比較表這樣讀

先看場景，再看錯誤代價，最後才看指標。

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| Spam filtering | 郵件 | spam / not spam | 二元分類、Precision、FP |
| Fraud detection | 交易 | fraud / normal | 類別不平衡、Recall、AUC |
| Churn prediction | 客戶紀錄 | churn / non-churn | 類別預測，不一定是回歸 |
| Medical diagnosis | 病歷或影像 | 有病 / 沒病 | Recall、FN |
| Marketing targeting | 客戶名單 | 目標 / 非目標 | Precision、FP |
| Image recognition at scale | 圖片 | 類別或異常 | 分群監控、來源批次監控 |
| sklearn pseudocode | X/y、model calls | y_pred / y_prob | 看 `predict` vs `predict_proba` |

### 記憶方式

```text
場景字眼 → 錯誤代價 → 指標

spam normal mail killed → FP → Precision
fraud missed → FN → Recall
patient missed → FN → Recall
review resources expensive → FP → Precision
```

### Exam Rule

```text
先判斷任務，不要先套公式
輸出是類別 → classification
誤報成本高 → Precision
漏報成本高 → Recall
門檻 / 機率 / 排序 → threshold / AUC
```

### Quick Check

若題目說「人工複查資源很貴，所以希望模型列出的可疑名單越準越好」，應想到哪個指標？

答案：Precision。因為題目在意「被模型判成正類的名單」是否真的正確，也就是要減少 FP。

## 9. Exam Decision Trees

### 9.1 場景先判斷

```text
題目問大數據中的鑑別式 AI 應用？
│
├─ 輸出是類別？
│  └─ 分類 / 類別預測
│
├─ 場景是 spam / fraud / churn / diagnosis / image？
│  └─ 套用該場景的 FP/FN 代價
│
└─ 題目問模型內部數學推導？
   └─ 通常不是本課主軸
```

### 9.2 指標選擇

```text
題目問評估指標？
│
├─ 類別分布平均，只問整體答對率？
│  └─ Accuracy
│
├─ 少數類 / rare positive / imbalance？
│  └─ 不要只看 Accuracy
│
├─ 不想誤報 / 不想亂抓 / 複查很貴？
│  └─ Precision
│
├─ 不想漏報 / 寧可多抓 / 病患或詐欺不能漏？
│  └─ Recall
│
└─ Precision 與 Recall 都要兼顧？
   └─ F1 Score
```

### 9.3 Threshold 與 AUC

```text
題目出現機率或門檻？
│
├─ 同一組機率，改 threshold？
│  └─ 混淆矩陣與 Precision/Recall 會變
│
├─ threshold 降低？
│  └─ 判正類變多，Recall 常升
│
├─ threshold 提高？
│  └─ 判正類變少，Precision 常升
│
└─ 比較多個 threshold 下整體表現？
   └─ ROC Curve / AUC
```

### 9.4 sklearn pseudocode

```text
題目給 sklearn 程式？
│
├─ model.fit(X_train, y_train)
│  └─ 訓練
│
├─ model.predict(X_test)
│  └─ y_pred，最終類別
│
├─ model.predict_proba(X_test)
│  └─ y_prob，機率 / 分數
│
├─ precision / recall / f1 / confusion_matrix
│  └─ 通常配 y_pred
│
└─ roc_auc_score
   └─ 通常配 y_prob
```

## 10. Trap Clinic

### Trap 1：Accuracy 高，所以模型一定好

錯。類別不平衡時，模型可能只會猜多數類，卻仍有很高 Accuracy。

Exam fix：

```text
rare positive / minority class / high imbalance → 不要只看 Accuracy
```

### Trap 2：Prediction 一定是連續數值預測

錯。本課的 `prediction` 常指類別預測，例如 churn / non-churn。

Exam fix：

```text
輸出是類別 → 分類任務
輸出是連續數值 → 回歸任務
```

### Trap 3：Precision 高代表沒有漏掉正類

錯。Precision 只看「判成正類的那些有多準」，漏掉多少要看 Recall。

Exam fix：

```text
漏掉正類 / FN → Recall
判正類有多準 / FP → Precision
```

### Trap 4：Recall 高代表模型很精準

錯。Recall 高代表抓到多數真正正類，但也可能多抓很多負類。

Exam fix：

```text
Recall 高 → 漏抓少
Precision 高 → 亂抓少
```

### Trap 5：F1 Score 是 Accuracy 的另一種寫法

錯。F1 是 Precision 與 Recall 的調和平均，特別常用在不平衡分類。

Exam fix：

```text
Precision + Recall 平衡 → F1 Score
全部預測答對率 → Accuracy
```

### Trap 6：ROC AUC 直接用 `predict()` 類別算就好

錯。AUC 通常要用機率或分數，因為它看多個 threshold 下的排序能力。

Exam fix：

```text
roc_auc_score(y_test, y_prob) → 正確方向
roc_auc_score(y_test, y_pred) → 常見陷阱
```

### Trap 7：threshold = 0.5 永遠最佳

錯。0.5 常只是預設值。不同業務目標可以調整 threshold。

Exam fix：

```text
寧可多抓 → threshold 可降低
寧可少抓但準 → threshold 可提高
```

### Trap 8：不同場景都看同一個指標

錯。Spam、fraud、diagnosis 的錯誤代價不同。

Exam fix：

```text
spam normal mail killed → FP / Precision
fraud missed → FN / Recall
diagnosis missed patient → FN / Recall
```

### Trap 9：`.score()` 就是完整評估

錯。很多 sklearn classifier 的 `.score()` 預設是 Accuracy。

Exam fix：

```text
classifier.score() → 常是 Accuracy
完整評估 → confusion matrix + precision + recall + F1 + AUC
```

### Trap 10：大數據只要看總平均

錯。總平均可能掩蓋某地區、時段、客群或來源的失準。

Exam fix：

```text
deployment monitoring / subgroup / region / time period → 分群監控
```

### Trap 11：分類題可以用 MSE、MAE、R2 當主指標

錯。這些通常是回歸指標。Spam、fraud、churn、diagnosis 多半先想到分類指標。

Exam fix：

```text
classification → Accuracy / Precision / Recall / F1 / AUC
regression → MSE / MAE / RMSE / R2
```

## 11. Practice Questions

### 11.1 場景與任務

**Q1.** 銀行用大量交易紀錄判斷每筆交易是否詐欺，這最接近哪種任務？

答案：二元分類。
理由：輸出是 `fraud / normal` 兩種類別。

**Q2.** 顧客流失預測一定要用回歸指標評估嗎？

答案：不一定。
理由：如果輸出是 `churn / non-churn`，它是分類問題。

**Q3.** 大規模影像辨識部署後，為什麼不能只看總體 Accuracy？

答案：因為總平均可能掩蓋某些來源、批次或子群的失準。
理由：大數據工作負載常需要分群監控。

**Q4.** 本課是否要求背熟 Logistic Regression 的梯度推導？

答案：不是。
理由：L22402 重點是大數據分類應用、評估指標與部署判讀。

### 11.2 混淆矩陣

**Q5.** 正常信被判成垃圾信，是 TP、FP、TN、FN 哪一種？

答案：FP。
理由：真實是負類，但模型判成正類。

**Q6.** 真正詐欺交易被模型判成正常交易，是哪一種錯誤？

答案：FN。
理由：真實是正類，但模型預測成負類。

**Q7.** TP = 40, FP = 10, TN = 900, FN = 50。模型抓到多少真正正類？

答案：40。
理由：抓到真正正類看 TP。

**Q8.** 同一題中，漏掉多少真正正類？

答案：50。
理由：漏掉真正正類看 FN。

### 11.3 指標選擇與計算

**Q9.** TP = 60, FP = 30, TN = 880, FN = 30。Accuracy 是多少？

答案：94%。
理由：

```text
全部 = 60 + 30 + 880 + 30 = 1000
Accuracy = (TP + TN) / 全部
         = (60 + 880) / 1000
         = 940 / 1000
         = 94%
```

**Q10.** 同一組數字，Precision 是多少？

答案：66.7%。
理由：

```text
Precision = TP / (TP + FP)
          = 60 / (60 + 30)
          = 60 / 90
          = 66.7%
```

**Q11.** 同一組數字，Recall 是多少？

答案：66.7%。
理由：

```text
Recall = TP / (TP + FN)
       = 60 / (60 + 30)
       = 60 / 90
       = 66.7%
```

**Q12.** 題目說「正類不到 1%，模型 Accuracy 很高」。最該警覺什麼？

答案：Accuracy 可能誤導。
理由：模型可能幾乎都猜多數類，卻抓不到少數正類。

**Q13.** 若「人工複查成本很高，不想讓錯誤警報太多」，優先看哪個指標？

答案：Precision。
理由：錯誤警報多代表 FP 多，Precision 直接關心判正類是否準。

**Q14.** 若「病患不能被漏判」，優先看哪個指標？

答案：Recall。
理由：漏判病患是 FN，Recall 關心真正正類抓到多少。

**Q15.** 若想同時考慮 Precision 與 Recall 的平衡，選哪個指標？

答案：F1 Score。
理由：F1 是 Precision 與 Recall 的調和平均。

### 11.4 Threshold、AUC 與 sklearn

**Q16.** threshold 降低時，模型通常更容易判成正類，哪個指標常上升？

答案：Recall。
理由：判正類變多，通常會抓到更多真正正類，但 FP 也可能增加。

**Q17.** threshold 提高時，模型更保守，哪個指標常上升？

答案：Precision。
理由：判成正類的數量變少，通常比較不亂抓。

**Q18.** AUC 約等於 0.5 代表什麼？

答案：模型排序能力接近隨機。
理由：ROC 對角線附近通常表示接近 random baseline。

**Q19.** `roc_auc_score(y_test, y_prob)` 中的 `y_prob` 通常來自哪個 sklearn method？

答案：`predict_proba()`。
理由：AUC 通常需要機率或分數，而不是最終類別。

**Q20.** `model.predict(X_test)` 的輸出通常是什麼？

答案：最終類別標籤。
理由：例如 `[0, 1, 0, 0, 1]` 或 `spam / not spam`。

**Q21.** `model.predict_proba(X_test)[:, 1]` 在二元分類常代表什麼？

答案：屬於正類的機率。
理由：`[:, 1]` 常取第二欄，也就是正類機率。

**Q22.** 很多 sklearn classifier 的 `.score(X_test, y_test)` 預設代表什麼？

答案：Accuracy。
理由：所以不能把 `.score()` 當成完整評估報告。

### 11.5 Mixed Traps

**Q23.** 選項中同時有 `precision_score(y_test, y_pred)` 與 `roc_auc_score(y_test, y_pred)`，哪個比較可疑？

答案：`roc_auc_score(y_test, y_pred)` 比較可疑。
理由：AUC 通常應使用 `y_prob` 或 prediction scores。

**Q24.** 題目說「郵件系統常把正常通知信放進垃圾桶」，應先想到 FP 還是 FN？

答案：FP。
理由：正常信是真實負類，被判成垃圾信這個正類。

**Q25.** 題目說「模型平均表現很好，但某院區病患常被漏判」，應選「只看總平均」還是「分群監控」？

答案：分群監控。
理由：部署後的大數據評估要避免平均值掩蓋局部失準。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. L22402 考的是大數據如何支撐鑑別式 AI 的分類 / 預測工作負載，以及部署後如何評估，不是演算法推導。
2. 混淆矩陣四格是 TP、FP、TN、FN；第一個字看對錯，第二個字看模型判成正類或負類。
3. Accuracy 看全部答對率，但在類別不平衡時可能很誤導。
4. Precision 看判成正類的有多準，適合不想亂抓或誤報成本高的場景。
5. Recall 看真正正類抓到多少，適合不想漏掉詐欺、病患或高風險個案的場景。
6. Threshold 降低通常 Recall 會升，threshold 提高通常 Precision 會升；0.5 不一定最佳。
7. `fit()` 是訓練，`predict()` 出類別，`predict_proba()` 出機率；AUC 通常看 `y_prob`，不是只看 `y_pred`。

## Final Study Advice

不要只背名詞。考試真正想測的是你能不能從題目描述判斷：這是分類還是回歸、哪種錯誤代價比較高、該選哪個指標，以及 sklearn pseudocode 中哪一行對應訓練、類別、機率或 AUC。

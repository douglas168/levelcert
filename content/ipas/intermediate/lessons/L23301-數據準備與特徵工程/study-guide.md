# L23301 數據準備與特徵工程 — Study Guide
本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」。本課的起點是**已清洗乾淨的 DataFrame**，所以不重講資料清洗、處理缺失值（那是 L22201 的範疇），也不涵蓋 Spark/大數據管線。模型選擇與超參數調整屬 L23303/L23302；本課只聚焦：如何把乾淨資料準備成模型能正確學習的特徵。
## 1. Exam Item Mapping
### 1a. 對應評鑑範圍
對應評鑑範圍：**L23301 數據準備與特徵工程** ＋ **L233 建模與參數調校**
### 1b. How to Study This Chapter
1. 先讀 Section 2 知識樹，抓住整體流程：clean DataFrame → split → preprocess → model。
2. 依序讀 Section 3 各小節，把 scaling、encoding、imbalance、feature selection、leakage-safe discipline 分開理解。
3. 重點背 Section 5 口訣，因為 L23 題目常用 5-10 行程式或短情境考你判斷。
4. 用 Section 6 考試陷阱練「看到錯誤順序要立刻抓出 leakage」。
5. 用 Section 7 情境題快速判斷，把關鍵字轉成答案。
6. 最後用 Section 8 checkbox 自我檢查，確認每個高頻概念都能用一句話講出來。
### 1c. 標記說明
| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能看懂名詞與基本用途即可 |
| 🔥🔥 | 常考，要能比較 | 要能分辨相似方法的差異與適用情境 |
| 🔥🔥🔥 | 高頻必背 | 要能做情境判斷、程式判讀、步驟排序 |
### 1d. 學習目標
讀完本章後，你應該能做到：
1. 判斷哪些演算法需要特徵縮放（Feature Scaling），哪些通常不需要。
2. 分辨 One-Hot Encoding、Ordinal Encoding、Label Encoding 的正確使用對象。
3. 在類別不平衡（Class Imbalance）情境中選擇 SMOTE、`class_weight="balanced"` 或分層切分。
4. 說明 Filter、Wrapper、Embedded 三種特徵選擇（Feature Selection）方法的差異。
5. 寫出或讀懂 leakage-safe 的 `train_test_split`、scaler、encoder、SMOTE、Pipeline 順序。
6. 看懂 `cross_val_score()` 回傳的是每個 fold 的分數陣列，而不是單一平均值。
### 1e. 考點權重
| 子概念 | 權重 | 考試常見問法 |
|---|---:|---|
| SMOTE / `class_weight="balanced"` | 🔥🔥🔥 | 少數類別太少、Recall 低、Accuracy 看起來高但模型偏向多數類別 |
| StandardScaler / MinMaxScaler | 🔥🔥🔥 | SVM、KNN、Logistic Regression、梯度下降是否需要 scaling |
| Pipeline leakage-safe / train-val-test split | 🔥🔥🔥 | 先 split 還是先 fit？test data 是否被 scaler/SMOTE 看過 |
| Feature selection: Filter / Wrapper / Embedded | 🔥🔥 | SelectKBest、RFE、L1、feature_importances_ 的方法分類 |
| One-Hot Encoding vs LabelEncoder trap | 🔥🔥 | `LabelEncoder` 是否能直接用在 feature matrix `X` |
| Feature importance / L1 embedded | 🔥🔥 | L1 產生稀疏係數，tree model 用 `feature_importances_` |
### 1f. 先備知識
本課假設你已經知道 L22201 的資料清洗概念，例如缺失值、重複值、異常值的基本處理；但本課不再重教那些內容。也建議先具備 L23101 的統計基礎，例如平均數、標準差、分布、分類評估指標，這樣讀 StandardScaler、F1、Recall 會更順。
## 📊 視覺化圖表（Visual Diagrams）
| # | 圖表 | 用途 |
|---|---|---|
| 1 | [特徵工程流程圖](diagrams/01-feature-engineering-pipeline.mmd) | 展示從 clean DataFrame 到模型輸入的完整流程，含 split → fit → transform 各步驟 |
| 2 | [SMOTE 合成少數類別示意圖](diagrams/02-smote-class-imbalance.mmd) | 視覺化 SMOTE 如何在少數類別樣本之間插值產生合成樣本 |
| 3 | [漏洞安全的資料切分流程圖](diagrams/03-train-val-test-leakage.mmd) | 對比「先 fit 再 split（漏洞）」vs「先 split 再 fit（正確）」的決策路徑 |
| 4 | [特徵選擇方法比較圖](diagrams/04-feature-selection-methods.mmd) | 並排比較 Filter / Wrapper / Embedded 三種方法的流程與代表 API |
| 5 | [特徵縮放決策地圖](diagrams/05-normalization-scaling-decision.mmd) | 根據演算法類型（距離/線性/樹狀）引導選擇正確縮放策略 |
## 2. 關鍵概念總覽圖（Knowledge Tree）
這張圖不是要一次背完。先抓 3 層就好：
1. 整體流程：clean data → split → preprocess → model。
2. 每個步驟的主要工具：scaling / encoding / imbalance / feature selection。
3. 每個工具的關鍵決策點和陷阱。
讀下面的樹狀圖時，先看大分類，再看每類下的 API 和陷阱警告。
```text
L23301 數據準備與特徵工程
|
+-- 起點：已清洗乾淨的 DataFrame
|   |
|   +-- 不處理缺失值、不做資料清洗、不做 Spark ingestion
|   +-- 目標：把資料準備成特定模型可學習的 X / y
|
+-- 0. 漏洞安全紀律（Leakage-safe Discipline）🔥🔥🔥
|   |
|   +-- split FIRST
|   |   +-- train / validation / test
|   |   +-- imbalanced classification 要考慮 stratify
|   |
|   +-- fit on train only
|   |   +-- scaler.fit(X_train)
|   |   +-- encoder.fit(X_train)
|   |   +-- selector.fit(X_train, y_train)
|   |   +-- SMOTE.fit_resample(X_train, y_train)
|   |
|   +-- val/test only transform or evaluate
|   |   +-- X_val_scaled = scaler.transform(X_val)
|   |   +-- X_test_scaled = scaler.transform(X_test)
|   |
|   +-- Pipeline
|       +-- make_pipeline(StandardScaler(), LogisticRegression())
|       +-- cross_val_score returns array, not mean
|
+-- 1. 特徵縮放（Feature Scaling）🔥🔥🔥
|   |
|   +-- StandardScaler
|   |   +-- z-score: (x - mean) / std
|   |   +-- output: mean approx 0, std approx 1
|   |   +-- common for SVM / Logistic Regression / KNN / neural networks
|   |
|   +-- MinMaxScaler
|   |   +-- maps values to fixed range, usually [0, 1]
|   |   +-- useful when scale bounds are expected
|   |
|   +-- Normalizer
|   |   +-- scales each sample vector by norm
|   |   +-- less central in this lesson than StandardScaler / MinMaxScaler
|   |
|   +-- Algorithm decision
|       +-- Distance / gradient / linear models -> usually scale
|       +-- Tree models -> usually not necessary
|
+-- 2. 類別編碼（Categorical Encoding）🔥🔥
|   |
|   +-- OneHotEncoder
|   |   +-- nominal categories: color, city, job type
|   |   +-- no artificial order
|   |   +-- use sparse_output=True
|   |
|   +-- OrdinalEncoder
|   |   +-- ordered categories: low/medium/high, education level
|   |   +-- order must be meaningful
|   |
|   +-- LabelEncoder trap
|       +-- for target y only
|       +-- NOT for feature matrix X
|
+-- 3. 類別不平衡（Class Imbalance）🔥🔥🔥
|   |
|   +-- SMOTE
|   |   +-- synthetic minority oversampling
|   |   +-- fit_resample on training data only
|   |
|   +-- class_weight="balanced"
|   |   +-- no data change
|   |   +-- adjusts loss penalty by class frequency
|   |
|   +-- stratified split / CV
|       +-- keep class ratio in train/test or folds
|       +-- evaluate with F1 / Recall, not accuracy only
|
+-- 4. 特徵選擇（Feature Selection）🔥🔥
    |
    +-- Filter methods
    |   +-- SelectKBest
    |   +-- chi2 / f_classif / mutual_info
    |   +-- fast, model-agnostic
    |
    +-- Wrapper methods
    |   +-- RFE
    |   +-- model iterates over feature subsets
    |   +-- slower but tied to model behavior
    |
    +-- Embedded methods
        +-- SelectFromModel
        +-- L1 regularization / Lasso -> sparse coefficients
        +-- tree feature_importances_
```
## 3. Core Concepts
### 3.1 特徵縮放（Feature Scaling）🔥🔥🔥
#### 先懂一句話
特徵縮放（Feature Scaling）不是為了讓資料「看起來整齊」，而是為了讓模型不要被單位大小騙走。只要模型會算距離、看梯度、比較係數大小，尺度差異就會影響學習；樹狀模型通常不在乎。
#### Everyday Analogy
想像你在比較學生表現，一欄是「考試分數 0-100」，另一欄是「身高 150-190 公分」。如果直接把數字丟進 KNN，模型可能以為身高差 20 比分數差 5 更重要；scaling 就像先把不同量尺換成可比較的量尺。
#### 先問自己一個問題
題目中的模型是否會受到「距離大小」或「梯度更新」影響？
如果答案是會，例如 SVM、KNN、Logistic Regression、Neural Network，通常要 scaling。若是 Decision Tree、Random Forest、XGBoost，通常不需要為了模型本身做 scaling。
#### 技術說法
StandardScaler（標準化器）把每個特徵轉成 z-score：
```text
z = (x - mean) / std
```
轉換後訓練資料的該欄位平均值約為 0，標準差約為 1。這是 L23 很容易考的記憶點：`mean=0, std=1`。
MinMaxScaler（最小最大縮放器）把每個特徵線性縮放到固定範圍，常見是 `[0, 1]`。它不會消除 outlier 的影響，只是把最大值與最小值對應到區間兩端。
Normalizer（正規化器）常指把每一筆樣本向量依照 norm 重新縮放；本課考點主軸仍是 StandardScaler 與 MinMaxScaler，不要把它和 Batch Normalization 或資料清洗混在一起。
#### 它在流程中的位置
```text
clean DataFrame
→ split train/val/test
→ fit scaler on X_train
→ transform X_train, X_val, X_test
→ fit model
→ evaluate
```
#### 演算法綁定
| 模型 / 演算法 | 是否通常需要 scaling | 原因 |
|---|---|---|
| Linear Regression（線性迴歸） | 通常需要 | 係數與梯度會受尺度影響 |
| Logistic Regression（邏輯斯迴歸） | 通常需要 | 梯度下降與正則化對尺度敏感 |
| SVM（支援向量機） | 通常需要 | margin 與 kernel 距離會受尺度影響 |
| KNN（K-Nearest Neighbors） | 必須高度注意 | 距離計算直接受特徵尺度影響 |
| Neural Network（神經網路） | 通常需要 | 有助於梯度穩定與收斂 |
| Decision Tree（決策樹） | 通常不需要 | 依切分門檻分裂，不依距離大小 |
| Random Forest（隨機森林） | 通常不需要 | 多棵樹的切分不依賴特徵尺度 |
| XGBoost | 通常不需要 | tree-based boosting 對單調縮放較不敏感 |
#### Scenario Bank
| 情境 | 快速判斷 | 答案 |
|---|---|---|
| SVM，特徵有收入 0-2,000,000 與年齡 18-80 | 尺度差很多，SVM 看 margin / distance | 用 StandardScaler |
| KNN，特徵包含公里數、年齡、點擊次數 | KNN 直接算距離 | 一定要 scaling |
| Random Forest，特徵有不同單位 | tree split 看門檻，不靠距離 | 通常不需要 scaling |
| Logistic Regression 題目提到 gradient descent convergence | 梯度法對尺度敏感 | scaling 有助收斂 |
| MinMaxScaler 題目問輸出範圍 | 固定縮到 0 到 1 | 選 MinMaxScaler |
#### Code Pattern
StandardScaler 正確順序：先切資料，再只用訓練集 fit。
```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)
print(accuracy_score(y_test, y_pred))
```
用 `make_pipeline()` 可以把 scaling 與 model 串在一起，降低漏掉 transform 或資料外洩的風險。
```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)
pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
```
#### Exam Rule
```text
題目看到 SVM / KNN / Logistic Regression / gradient descent → 想 StandardScaler
題目看到 Decision Tree / Random Forest / XGBoost → 通常不需要 scaling
題目問 mean=0, std=1 → StandardScaler
題目問縮放到 [0, 1] → MinMaxScaler
題目先 fit scaler on all data 再 split → Data Leakage
```
### Quick Check
某題使用 KNN 分類，特徵包含「年收入」與「年齡」。應該優先做什麼前處理？
答案：做 Feature Scaling，常見選 StandardScaler；因為 KNN 直接計算距離，年收入的大尺度會壓過年齡。
### 3.2 類別特徵編碼（Categorical Encoding）🔥🔥
#### 先懂一句話
類別編碼（Categorical Encoding）是把文字類別變成模型能讀的數字，但不能亂編。名目類別不能偷偷塞順序；有序類別才可以保留順序；`LabelEncoder` 主要是給目標 `y`，不是給特徵矩陣 `X`。
#### Everyday Analogy
把「紅、藍、綠」編成 0、1、2，就像把三種飲料硬排成第一名、第二名、第三名。除非題目真的有順序，否則模型可能誤以為「綠色 > 藍色 > 紅色」，這就是錯誤訊號。
#### 先問自己一個問題
這個類別本身有沒有自然順序？
如果沒有，例如顏色、職業、城市，通常用 One-Hot Encoding。若有，例如低/中/高、國中/高中/大學，才考慮 Ordinal Encoding。
#### 技術說法
One-Hot Encoding（獨熱編碼）把每個類別變成一個 0/1 欄位。它適合 nominal categorical feature（名目類別特徵），因為不假裝類別之間有大小順序。
Ordinal Encoding（序位編碼）把有順序的類別轉成整數，例如 `low=0, medium=1, high=2`。重點是順序必須真的有意義。
Label Encoding（標籤編碼）在 sklearn 中的典型用途是把 target labels `y` 轉成數字，例如 `spam/ham` 轉成 `1/0`。考試陷阱是把 `LabelEncoder` 用在 feature matrix `X` 的多個類別欄位。
#### 它在流程中的位置
```text
clean DataFrame
→ split train/val/test
→ fit encoder on X_train categorical columns
→ transform X_train, X_val, X_test
→ model
```
#### Key Concepts
| 編碼方法 | 適合資料 | 不適合資料 | 考點 |
|---|---|---|---|
| OneHotEncoder | 顏色、職業、城市、產品類別 | 類別太多時欄位會膨脹 | 不製造假順序 |
| OrdinalEncoder | 滿意度低/中/高、教育程度 | 顏色、城市這種無順序類別 | 順序必須有意義 |
| LabelEncoder | target `y` | feature matrix `X` | 經典陷阱：不是拿來編 X |
#### Scenario Bank
| 情境 | 快速判斷 | 答案 |
|---|---|---|
| 特徵是顏色：red / blue / green | 顏色無自然順序 | OneHotEncoder |
| 特徵是學歷：高中 / 大學 / 研究所 | 有自然順序 | OrdinalEncoder |
| 目標 y 是 spam / ham | target label | LabelEncoder 可以用 |
| 把 X 的城市欄位用 LabelEncoder 編成 0,1,2 | 城市無大小順序 | 錯，應考慮 OneHotEncoder |
| 題目說 high cardinality 類別 | 類別數太多 | One-Hot 可能造成欄位爆炸，本課只需知道風險 |
#### Code Pattern
OneHotEncoder 使用 `sparse_output=True`，不是舊參數 `sparse=`。
```python
from sklearn.preprocessing import OneHotEncoder
encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=True)
X_train_cat_encoded = encoder.fit_transform(X_train[["city", "job"]])
X_test_cat_encoded = encoder.transform(X_test[["city", "job"]])
```
搭配 Pipeline 時，實務常見會用 `ColumnTransformer` 指定哪些欄位做 One-Hot。考試如果只問概念，重點仍是「fit on train only」。
```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
numeric_features = ["age", "income"]
categorical_features = ["city", "job"]
preprocess = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=True), categorical_features),
    ]
)
pipe = make_pipeline(
    preprocess,
    LogisticRegression(max_iter=1000)
)
pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
```
LabelEncoder 正確用途：target `y`。
```python
from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)
y_test_encoded = label_encoder.transform(y_test)
```
#### Exam Rule
```text
名目類別 feature：顏色 / 城市 / 職業 → OneHotEncoder
有序類別 feature：低中高 / 等級 / 學歷 → OrdinalEncoder
target y：類別標籤 → LabelEncoder 可用
feature matrix X：不要用 LabelEncoder 當通用編碼器
OneHotEncoder 新參數 → sparse_output=True
```
### Quick Check
題目把 `city` 特徵用 `LabelEncoder` 轉成 0、1、2，再丟進 Logistic Regression。這裡最可能的問題是什麼？
答案：把無順序的名目特徵製造出假的大小順序；`LabelEncoder` 主要給 target `y`，`city` 這類 feature 通常應用 OneHotEncoder。
### 3.3 類別不平衡處理（Class Imbalance）🔥🔥🔥
#### 先懂一句話
類別不平衡（Class Imbalance）時，accuracy 可能會騙你。當 99% 都是正常交易時，模型全部猜正常也有 99% accuracy，但它完全抓不到詐欺；這時要處理資料比例或調整模型損失。
#### Everyday Analogy
想像全班 100 人，只有 2 人會某種罕見技能。如果老師只看「猜中大多數人」的正確率，永遠猜不會也很高分；但真正重要的是找出那 2 個人。
#### 先問自己一個問題
題目在抱怨「少數類別抓不到」還是「資料比例懸殊」嗎？
如果是，優先想到 SMOTE、`class_weight="balanced"`、stratified split，以及 F1/Recall 評估。
#### 技術說法
SMOTE（Synthetic Minority Over-sampling Technique，合成少數類別過採樣）會在少數類別樣本之間插值，產生新的合成樣本。它不是單純複製資料，而是製造少數類別附近的新點。
`class_weight="balanced"`（類別權重平衡）不改變資料筆數，而是在模型訓練時提高少數類別錯誤的懲罰。它常出現在 LogisticRegression、RandomForestClassifier 等 sklearn estimator。
Stratified split（分層切分）讓 train/test 或 cross-validation folds 保持類別比例，避免少數類別剛好被切到某一邊。
#### 它在流程中的位置
```text
clean DataFrame
→ split train/test with stratify
→ SMOTE on X_train/y_train only
→ scaling / model fitting
→ evaluate with F1 / Recall, not accuracy only
```
注意：如果先 SMOTE 再 split，合成樣本可能把訓練資訊洩漏到測試集，這是高頻陷阱。
#### SMOTE vs class_weight
| 方法 | 做了什麼 | 優點 | 注意 |
|---|---|---|---|
| SMOTE | 產生少數類別合成樣本 | 讓模型看到更多少數類別附近的資料點 | 只能在 training set 做，不能碰 test |
| `class_weight="balanced"` | 調整不同類別錯誤的懲罰 | 快速、不改資料、程式簡單 | 不會增加少數類別樣本本身 |
#### Scenario Bank
| 情境 | 快速判斷 | 答案 |
|---|---|---|
| 詐欺偵測，詐欺樣本只有 1% | 少數類別極少 | SMOTE 或 class_weight，評估 Recall/F1 |
| 醫療診斷，漏掉陽性病患代價高 | 少數類別 Recall 重要 | 重視 Recall，考慮 class_weight / SMOTE |
| 先對全部資料做 SMOTE，再 train_test_split | test 可能看到合成資訊 | 資料外洩，錯 |
| 想快速修正不平衡但不改資料 | 不想增減樣本 | `class_weight="balanced"` |
| 題目只用 accuracy 評估罕見事件分類 | accuracy 會被多數類別騙 | 改看 F1 / Recall |
#### Code Pattern
SMOTE 來自 imbalanced-learn，不是 sklearn 本體。
```python
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)
```
`class_weight="balanced"` 是模型參數，不會產生新樣本。
```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
log_model = LogisticRegression(
    class_weight="balanced",
    max_iter=1000
)
rf_model = RandomForestClassifier(
    class_weight="balanced",
    random_state=42
)
```
評估時不要只看 accuracy。
```python
from sklearn.metrics import classification_report, f1_score, recall_score
model.fit(X_train_resampled, y_train_resampled)
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
print("F1:", f1_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
```
#### Exam Rule
```text
少數類別太少 → SMOTE / class_weight
不改資料、只調整懲罰 → class_weight="balanced"
產生少數類別合成樣本 → SMOTE
SMOTE on full data before split → Data Leakage
不平衡資料只看 Accuracy → 錯，應看 F1 / Recall
```
### Quick Check
某模型在詐欺偵測資料上 accuracy 99%，但幾乎抓不到詐欺交易。考試最可能期待你提出什麼方向？
答案：這是 Class Imbalance 問題；應考慮 SMOTE 或 `class_weight="balanced"`，並用 Recall/F1 評估少數類別表現。
### 3.4 特徵選擇（Feature Selection）🔥🔥
#### 先懂一句話
特徵選擇（Feature Selection）是在問：哪些欄位真的值得留下？留下較少但相關的特徵，通常能降低 overfitting、加快訓練，也讓模型比較好解釋。
#### Everyday Analogy
準備考試時，你不會把所有網頁都印出來背，而是先挑出和考題最相關的重點。Feature selection 就是在幫模型挑重點欄位。
#### 先問自己一個問題
題目要的是「快速統計篩選」、還是「模型反覆測試特徵組合」、還是「模型訓練中自然選出重要特徵」？
這三種答案分別對應 Filter、Wrapper、Embedded。
#### 技術說法
Filter methods（過濾法）用統計分數先篩特徵，不依賴最後使用的模型。常見 API 是 `SelectKBest`，常見 score function 包含 `chi2`、`f_classif`、`mutual_info_classif`。
Wrapper methods（包裝法）用模型反覆訓練不同特徵子集，觀察哪些特徵組合表現好。代表方法是 RFE（Recursive Feature Elimination，遞迴特徵消除）。
Embedded methods（嵌入法）在模型訓練過程中完成特徵選擇。例子包括 L1 regularization（L1 正則化）讓部分係數變成 0，或 tree-based model 的 `feature_importances_`。
#### 它在流程中的位置
```text
clean data
→ split train/test
→ feature selection fit on X_train/y_train
→ transform X_train and X_test
→ fit model
→ evaluate
```
如果 feature selection 先看過 test data，評估會過度樂觀，這也是 data leakage。
#### L1 vs L2
L1 regularization（L1 正則化）會傾向把一些係數壓成 0，因此自然形成稀疏模型（sparse model），可以做特徵選擇。L2 regularization（L2 正則化）通常會縮小所有係數，但不一定把係數變成 0，所以它主要是穩定模型，不是自然的特徵選擇工具。
#### Scenario Bank
| 情境 | 快速判斷 | 答案 |
|---|---|---|
| 100 個特徵，想先快速篩出前 20 個 | 快速統計分數 | Filter: SelectKBest |
| 希望用模型反覆刪掉較弱特徵 | 模型迭代選子集 | Wrapper: RFE |
| Lasso 讓很多係數變成 0 | L1 稀疏 | Embedded: SelectFromModel + Lasso |
| Random Forest 產生 `feature_importances_` | 模型內建重要性 | Embedded |
| 題目在 test set 上挑特徵 | test 被用來決策 | Data Leakage |
#### Code Pattern
Filter method：`SelectKBest`。
```python
from sklearn.feature_selection import SelectKBest, f_classif
selector = SelectKBest(score_func=f_classif, k=10)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)
```
Wrapper method：RFE。
```python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
estimator = LogisticRegression(max_iter=1000)
selector = RFE(estimator=estimator, n_features_to_select=10)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)
```
Embedded method：`SelectFromModel` 搭配 Lasso。
```python
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import Lasso
selector = SelectFromModel(
    estimator=Lasso(alpha=0.01, random_state=42)
)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)
```
Embedded method：tree-based `feature_importances_`。
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
selector = SelectFromModel(
    estimator=RandomForestClassifier(random_state=42)
)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)
```
#### Exam Rule
```text
統計分數、快速、模型無關 → Filter / SelectKBest
模型反覆選子集、遞迴刪特徵 → Wrapper / RFE
訓練過程內建選特徵 → Embedded / SelectFromModel
L1 / Lasso / sparse coefficients → Embedded feature selection
L2 shrink all weights → 不等於自然選特徵
feature selection fit on test data → Data Leakage
```
### Quick Check
題目說「使用模型反覆移除最不重要的特徵，直到剩下 10 個特徵」。這是哪一類 feature selection？
答案：Wrapper method，代表是 RFE；因為它用模型反覆評估並遞迴移除特徵。
### 3.5 漏洞安全的資料切分紀律（Leakage-safe Train/Val/Test Discipline）🔥🔥🔥
#### 先懂一句話
如果 preprocessing 在訓練前先看過 test data，你的評估就不可信。正確紀律是：先切資料，再只在 training data 上 fit，validation/test 只能 transform 或 evaluate。
#### Everyday Analogy
考試前不能先偷看答案卷再說自己考得很好。Test set 就是答案卷；scaler、encoder、feature selector、SMOTE 都不能先從答案卷學資訊。
#### 先問自己一個問題
這個步驟有沒有「學到資料的統計資訊」？
如果有，例如 scaler 學 mean/std、encoder 學 categories、feature selector 學分數、SMOTE 學少數類別鄰近關係，就只能在 training data 上 fit。
#### 技術說法
Data Leakage（資料外洩）是指模型訓練流程使用了在真實預測時不該知道的資訊。最常見的 L23301 leakage 是：先對全部資料做 scaling、encoding、feature selection 或 SMOTE，再切 train/test。
Pipeline（管線）可以把 preprocessing 與 model 包成一個 estimator，讓 cross-validation 時每個 fold 都只在該 fold 的 training part 上 fit preprocessing。這是考試很愛用的程式判讀題型。
`cross_val_score()` 回傳的是 score array（分數陣列），一個 fold 一個分數；如果要平均，才呼叫 `.mean()`。
#### 它在流程中的位置
```text
raw clean DataFrame
→ split FIRST
→ train: fit + transform
→ validation/test: transform only
→ fit model on train
→ evaluate on val/test
```
#### 正確與錯誤流程
```text
錯誤：
clean DataFrame
→ scaler.fit_transform(all X)
→ train_test_split
→ model fit/evaluate
→ leakage
正確：
clean DataFrame
→ train_test_split
→ scaler.fit_transform(X_train)
→ scaler.transform(X_test)
→ model fit/evaluate
```
#### Scenario Bank
| 情境 | 快速判斷 | 答案 |
|---|---|---|
| `scaler.fit_transform(X)` 後才 `train_test_split` | scaler 看過 test 分布 | Data Leakage |
| `SMOTE().fit_resample(X, y)` 後才 split | 合成樣本污染 test | Data Leakage |
| `make_pipeline(StandardScaler(), LogisticRegression())` 搭配 CV | 每個 fold 內部正確 fit | leakage-safe pattern |
| 用 test set 選 feature，再回報 test accuracy | test 參與模型設計 | test contamination |
| `cross_val_score(model, X, y, cv=5)` | 回傳 5 個分數 | array，不是 mean |
#### Code Pattern
Pipeline with scaler + classifier。
```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)
pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
```
`cross_val_score()` 回傳 array。
```python
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)
scores = cross_val_score(pipe, X, y, cv=5)
print(scores)        # array-like, one score per fold
print(scores.mean()) # average score
```
搭配 imbalanced data 時，先分層切分。
```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```
#### Exam Rule
```text
先 fit 再 split → 錯，Data Leakage
先 split 再 fit on train → 對
test / validation → 只能 transform，不可以 fit
SMOTE → 只在 training data fit_resample
Pipeline / make_pipeline → leakage-safe 串接常見答案
cross_val_score → returns array; use .mean() for average
```
### Quick Check
下面哪個順序正確：A. 先 StandardScaler fit all X 再 split；B. 先 split，再對 X_train fit scaler，X_test 只 transform？
答案：B；因為 scaler 的 mean/std 只能從 training data 學，test data 不能提前參與 preprocessing。
## 4. Comparison Tables（易混淆概念）
### 4.1 StandardScaler vs MinMaxScaler
Scaling 快判：`mean=0/std=1` 是 StandardScaler；`[0,1]` 是 MinMaxScaler。
| 比較點 | StandardScaler | MinMaxScaler |
|---|---|---|
| 中文理解 | 標準化到平均 0、標準差 1 | 線性縮放到固定區間 |
| 公式直覺 | 減掉平均，再除以標準差 | 依最小值與最大值壓到範圍內 |
| 常見輸出 | mean approx 0, std approx 1 | feature range 通常是 `[0, 1]` |
| 適合題型 | SVM、Logistic Regression、KNN、梯度下降 | 題目明確要求固定上下界 |
| 對 outlier | outlier 仍會影響 mean/std | outlier 會決定 min/max |
| 考試關鍵字 | z-score、mean=0、std=1 | 0 到 1、feature_range |
考試快判：看到 `mean=0, std=1` 選 StandardScaler；看到 `[0,1]` 選 MinMaxScaler。
### 4.2 OneHotEncoder vs LabelEncoder
Encoding 快判：名目特徵用 One-Hot；LabelEncoder 只給 target `y`。
| 比較點 | OneHotEncoder | LabelEncoder |
|---|---|---|
| 主要用途 | 編碼 feature matrix `X` 的名目類別欄位 | 編碼 target labels `y` |
| 是否製造順序 | 不會，每個類別獨立成 0/1 欄位 | 會變成 0、1、2，可能造成假順序 |
| 適合例子 | 顏色、城市、職業 | spam/ham、yes/no target |
| 常見 API | `OneHotEncoder(sparse_output=True)` | `LabelEncoder()` |
| 經典陷阱 | 類別太多欄位會膨脹 | 不要拿來當 X 的通用編碼器 |
考試快判：題目把 feature `X` 的城市、顏色用 `LabelEncoder` 直接編碼，多半是陷阱。
### 4.3 SMOTE vs class_weight
Imbalance 快判：SMOTE 改資料，class_weight 改懲罰。
| 比較點 | SMOTE | `class_weight="balanced"` |
|---|---|---|
| 中文理解 | 合成少數類別樣本 | 提高少數類別錯誤的懲罰 |
| 是否改變資料筆數 | 會 | 不會 |
| 常見 API | `SMOTE().fit_resample(X_train, y_train)` | model parameter |
| 適合情境 | 少數類別太少，希望模型看到更多少數類別附近樣本 | 想快速處理不平衡、不想改資料 |
| leakage 風險 | 很高，不能在 split 前做 | 較低，但仍要正確切分 |
| 評估指標 | F1 / Recall / precision-recall | F1 / Recall / precision-recall |
考試快判：題目說「產生 synthetic samples」選 SMOTE；題目說「不改資料，只調整 loss」選 `class_weight="balanced"`。
### 4.4 Filter vs Wrapper vs Embedded Feature Selection
Feature selection 快判：篩（Filter）看統計，選（Wrapper）反覆試，嵌（Embedded）訓練中選。
| 方法 | 一句話 | 代表 API / 技術 | 優點 | 注意 |
|---|---|---|---|---|
| Filter | 不管模型，先用統計分數篩 | `SelectKBest`, `chi2`, `f_classif`, mutual information | 快、簡單、可先降維 | 可能忽略特徵交互作用 |
| Wrapper | 用模型反覆測特徵子集 | RFE | 和模型表現更貼近 | 通常較慢 |
| Embedded | 模型訓練中產生選擇訊號 | `SelectFromModel`, L1, `feature_importances_` | 訓練與選擇整合 | 依賴模型本身 |
考試快判：看到 `SelectKBest` 選 Filter；看到 RFE 選 Wrapper；看到 L1 / `feature_importances_` / `SelectFromModel` 選 Embedded。
### 4.5 L1 vs L2 正則化
Regularization 快判：L1 會稀疏，L2 會縮小。
| 比較點 | L1 Regularization | L2 Regularization |
|---|---|---|
| 中文理解 | 讓部分係數變成 0 | 讓係數整體變小 |
| 特徵選擇 | 可以自然做 feature selection | 通常不會直接選掉特徵 |
| 模型效果 | 產生 sparse coefficients | 穩定模型、降低過大權重 |
| 代表 | Lasso、L1 penalty | Ridge、L2 penalty |
| 考試關鍵字 | sparse、zero coefficients、feature selection | shrink、smaller weights、regularization |
考試快判：看到「稀疏」「係數變 0」「特徵選擇」選 L1；看到「縮小所有權重」選 L2。
## 5. 口訣 / Mnemonics
### 5.1 Scaling 口訣
```text
距梯需縮，樹不在乎
```
距 = 距離模型，例如 KNN、SVM。梯 = 梯度或線性模型，例如 Logistic Regression、Neural Network。樹 = Decision Tree、Random Forest、XGBoost，通常不需要為模型本身 scaling。
### 5.2 Leakage 口訣
```text
先切後 fit，test 只 transform
```
先切 train/test，再用 train fit scaler、encoder、selector、SMOTE。Test set 只能 transform 或 evaluate，不能拿來學任何 preprocessing 統計。
### 5.3 Feature Selection 口訣
```text
篩（Filter）選（Wrapper）嵌（Embedded）
```
篩 = 用統計分數先篩。選 = 模型反覆選特徵子集。嵌 = 模型訓練中自然嵌入選擇，例如 L1 或 feature importance。
### 5.4 Encoding 口訣
```text
名目→One-Hot，有序→Ordinal，標籤→只給 y
```
名目類別沒有順序，避免亂編 0/1/2。有序類別可以保留順序。`LabelEncoder` 的典型考點是 target `y`，不是 feature matrix `X`。
### 5.5 Class Imbalance 口訣
```text
合成補少（SMOTE），權重壓多（class_weight）
```
SMOTE 產生少數類別合成樣本。`class_weight` 不改資料，而是讓少數類別被錯分時懲罰更重。
### 5.6 Cross-validation 口訣
```text
CV 給一排，平均自己算
```
`cross_val_score()` 回傳每個 fold 的 score array；要平均才使用 `.mean()`。
## 6. 考試陷阱（Exam Traps）
### 6.1 LabelEncoder on feature matrix X
❌ 錯誤：把 `LabelEncoder` 用在 `X["city"]`、`X["color"]`，再直接訓練模型。
✅ 正確：`LabelEncoder` 主要用在 target `y`。名目類別特徵用 OneHotEncoder；有序類別特徵才考慮 OrdinalEncoder。
### 6.2 Fitting scaler on ALL data before split
❌ 錯誤：`X_scaled = scaler.fit_transform(X)` 後才 `train_test_split`。
✅ 正確：先 split，再 `scaler.fit_transform(X_train)`，並對 `X_test` 使用 `scaler.transform(X_test)`。
### 6.3 Applying SMOTE before train/test split
❌ 錯誤：`SMOTE().fit_resample(X, y)` 後才切 train/test。
✅ 正確：先切資料，再只對 `X_train, y_train` 做 `fit_resample()`。
### 6.4 Assuming cross_val_score returns a single mean
❌ 錯誤：以為 `cross_val_score(model, X, y, cv=5)` 直接回傳平均分數。
✅ 正確：它回傳每個 fold 的分數陣列；平均值要用 `scores.mean()`。
### 6.5 StandardScaler vs MinMaxScaler for SVM
❌ 錯誤：看到 SVM 卻完全忽略 scaling，或只因為想把數字變成 0-1 就盲選 MinMaxScaler。
✅ 正確：SVM 對尺度敏感；常見考試答案是 StandardScaler，尤其題目提到 z-score、mean=0、std=1。
### 6.6 Feature selection fit on test data
❌ 錯誤：先用全部資料跑 `SelectKBest`，挑完特徵才 split。
✅ 正確：feature selector 也會學資料訊號，必須只在 training data 上 `fit`。
### 6.7 Using accuracy alone for imbalanced datasets
❌ 錯誤：類別極度不平衡時，只用 accuracy 說模型很好。
✅ 正確：要看 F1、Recall、precision-recall 等能反映少數類別表現的指標。
## 7. 情境題快速判斷（Scenario Quick-Judge）
| 題目關鍵字 / 情境 | 快速答案 |
|---|---|
| 類別嚴重不平衡 | SMOTE / `class_weight="balanced"` |
| 少數類別 Recall 低 | SMOTE + F1/Recall 評估 |
| Accuracy 高但少數類別抓不到 | 不平衡資料陷阱，看 Recall/F1 |
| SVM / KNN / 梯度下降 | StandardScaler 必要或高度建議 |
| Logistic Regression + regularization | scaling 通常重要 |
| 隨機森林 / XGBoost | 通常不需要 scaling |
| 題目問 mean=0, std=1 | StandardScaler |
| 題目問縮放到 [0,1] | MinMaxScaler |
| 名目類別特徵：顏色 / 職業 / 城市 | OneHotEncoder |
| 有序類別特徵：學歷 / 等級 / 低中高 | OrdinalEncoder |
| target y 是文字標籤 | LabelEncoder 可以用 |
| feature X 使用 LabelEncoder | 經典陷阱，通常錯 |
| 特徵選擇 + 快速 | Filter method / SelectKBest |
| 特徵選擇 + 模型解釋性、反覆刪特徵 | Wrapper method / RFE |
| L1 正則化 + 稀疏 | Embedded / SelectFromModel + Lasso |
| tree model 的 `feature_importances_` | Embedded feature selection |
| cross_val_score 回傳結果 | array，需要 `.mean()` 才是平均 |
| 先 fit 再 split | 資料外洩（Data Leakage） |
| make_pipeline | 安全串接，防止外洩 |
| 想快速修正不平衡、不改資料 | `class_weight="balanced"` |
| SMOTE import | `from imblearn.over_sampling import SMOTE` |
| SMOTE method | `fit_resample()` |
| OneHotEncoder 新參數 | `sparse_output=True` |
| validation/test preprocessing | 只能 transform，不能 fit |
### 快速決策樹
```text
題目是在問前處理順序嗎？
|
+-- 有看到 fit before split?
|   +-- 是 → Data Leakage
|   +-- 否 → 看是否 train fit、test transform
|
+-- 題目是在問模型需要 scaling 嗎？
|   +-- SVM / KNN / Logistic / gradient → 需要
|   +-- Tree / Random Forest / XGBoost → 通常不需要
|
+-- 題目是在問類別欄位嗎？
|   +-- 無順序 → OneHotEncoder
|   +-- 有順序 → OrdinalEncoder
|   +-- target y → LabelEncoder
|
+-- 題目是在問不平衡嗎？
    +-- 要合成少數類別 → SMOTE on train only
    +-- 不改資料、調 loss → class_weight="balanced"
    +-- 評估 → Recall / F1
```
## 8. 結尾：快速自我檢查 ✅
請在考前用下面清單快速確認：
- [ ] 我能說出 L23301 的起點是已清洗乾淨的 DataFrame，不是資料清洗或 ETL。
- [ ] 我知道 StandardScaler 代表 mean=0、std=1，MinMaxScaler 代表縮放到固定範圍。
- [ ] 我能判斷 SVM、KNN、Logistic Regression 通常需要 scaling，而 tree-based models 通常不需要。
- [ ] 我知道 OneHotEncoder 用於名目類別 feature，OrdinalEncoder 用於有序類別 feature。
- [ ] 我記得 LabelEncoder 主要是 target `y`，不是 feature matrix `X` 的通用編碼器。
- [ ] 我能分辨 SMOTE 是合成少數類別樣本，`class_weight="balanced"` 是調整損失權重。
- [ ] 我知道 SMOTE、scaler、encoder、feature selector 都只能在 training data 上 fit。
- [ ] 我能分辨 Filter = SelectKBest、Wrapper = RFE、Embedded = L1 / SelectFromModel / feature_importances_。
- [ ] 我知道 L1 會產生稀疏係數並可做 feature selection，L2 主要是縮小權重。
- [ ] 我知道 `cross_val_score()` 回傳 array，不是單一 mean。
📌 本課不考 Spark ML pipelines、大數據資料源、資料清洗細節（L22201），也不考超參數調校（L23302/L23303）。考試最該抓的是：先切後 fit、test 只 transform；scaling 綁演算法；不平衡看 SMOTE/class_weight；feature selection 分清 Filter/Wrapper/Embedded。

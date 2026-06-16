# Research Notes: L23301 數據準備與特徵工程

## Official Sources
- [iPAS AI應用規劃師學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方入口列出學習指引、考試樣題、歷屆考題、參考書目與雲端課程；教材主張應回到官方範圍驗證。
- [115年度AI應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0105_20260105184002.pdf): 官方說明中級能力鑑定定位；不要把社群心得當官方命題範圍。
- [sklearn StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html): 標準化為 `z = (x - u) / s`；以訓練資料的 mean 與 std 各特徵獨立計算，考點可抓「mean=0, std=1」與 `fit` 後再 `transform`。
- [sklearn MinMaxScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html): 將每個特徵線性縮放到 `feature_range`，預設常見為 0 到 1；不會降低 outlier 影響，只是把最大最小值映射到區間端點。
- [sklearn Common pitfalls: data leakage](https://scikit-learn.org/stable/common_pitfalls.html): 官方明確建議先切 train/test，再做 preprocessing；不要在 test data 上 `fit` 或 `fit_transform`；Pipeline 可降低漏做 transform 與資料外洩風險。
- [sklearn train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html): 官方 API 是把 arrays/matrices 切成 random train/test subsets；考點適合放在 pipeline 步驟排序。
- [sklearn cross_val_score](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html): 評估 cross-validation score；官方範例印出多個 fold 分數陣列，支援「回傳 array，不是 mean」的程式判讀陷阱。
- [sklearn Feature selection](https://scikit-learn.org/stable/modules/feature_selection.html): `SelectKBest` / `SelectPercentile` 是 univariate/filter 型；`RFE` 是遞迴移除特徵；`SelectFromModel` 依 `coef_` 或 `feature_importances_` 等模型重要性選特徵；官方建議放進 Pipeline。
- [sklearn OneHotEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html): 將 categorical feature 編成 binary columns；官方指出常用於 linear models 與 standard-kernel SVM。
- [sklearn LabelEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html): 只應用於 target labels `y`，不是 input features `X`；這是很適合設計成選項陷阱的 API 細節。
- [sklearn compute_class_weight](https://scikit-learn.org/stable/modules/generated/sklearn.utils.class_weight.compute_class_weight.html): `class_weight="balanced"` 權重和類別頻率成反比；可和 SMOTE 做「不平衡資料處理方法」比較。
- [imbalanced-learn SMOTE](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html): SMOTE 是 over-sampling，產生少數類別合成樣本；重點是只能在 training set/每個 CV training fold 內使用，避免驗證資料外洩。

## Community Insights (exam patterns)
- Local exam intelligence file: `content/ipas/intermediate/exams/L23-sample-questions-11409.md`
  - L23 真實回報約 25% Python/sklearn 程式判讀題，常見 5-10 行 code。
  - 新題型：程式步驟排序題；典型順序 `load -> preprocess -> split -> scale -> fit -> predict -> evaluate`，但 L23301 建議更嚴格教成 `clean input DataFrame -> split -> fit preprocessing on train -> transform val/test -> train -> evaluate`。
  - 高頻：SMOTE / 類別不平衡、StandardScaler mean=0 std=1、`cross_val_score()` 回傳 array、L1 vs L2 正則化。
- [AITerms L2 備考頁](https://aiterms.tw/ipas/L2/): 社群整理指出 L23 含約 25% Python/scikit-learn 閱讀題；範例直接列 `make_pipeline(StandardScaler(), LogisticRegression())` 與 `cross_val_score` 回傳陣列。
- [HackMD 5/17 考題範圍整理](https://hackmd.io/%40Saint918/r1JwP2LXxe): 考生心得列出「標準化（Normalization）」與 F1 計算題；可作社群訊號，不可當官方命題保證。
- [Vocus 11/08 中級第二場考試分析](https://vocus.cc/article/6910a926fd89780001452b48): 社群分析提到 Feature Scaling 對距離模型重要、SMOTE + F1 + stratified CV 的綜合情境；適合轉成情境判斷題。
- 找不到高品質 Reddit/PTT 專帖可直接佐證 L23301；目前較有用的社群來源集中在 Vocus、AITerms、HackMD 與本 repo 的 L23 情報檔。

## Current State (if technology topic)
- scikit-learn stable docs currently show 1.9.0, released June 2026; L23301 涉及的 `StandardScaler`, `MinMaxScaler`, `OneHotEncoder`, `LabelEncoder`, `train_test_split`, `cross_val_score`, feature selection API 均屬穩定常用 API。
- imbalanced-learn docs currently show 0.14.2 for SMOTE; SMOTE 屬 imbalanced-learn，不是 scikit-learn 本體，教材 code import 應用 `from imblearn.over_sampling import SMOTE`。
- `OneHotEncoder` 目前參數使用 `sparse_output=True`；舊教材可能出現 `sparse=`，study guide 若放 code 應避免舊參數。
- `LabelEncoder` 官方明確寫給 `y` 用，不是給 feature matrix `X`；若要編類別特徵，優先講 `OneHotEncoder` / `OrdinalEncoder`，避免把 label encoding 泛化到名目特徵。
- `cross_val_score(..., cv=5)` 的考點不在交叉驗證推導，而在「每 fold 一個分數陣列；需要 `.mean()` 才是平均」。

## External Documents Found
- None requested.
- Official iPAS learning resources page found, but no separate L23301-specific external document was identified in this pass.

## Key Findings Summary
- L23301 應主打「已清乾淨資料 -> 為特定模型準備訓練資料」，不是資料收集、ETL、Spark 或資料清洗。
- 最考試相關的流程紀律：先切 train/val/test，再只在 training data 上 `fit` scaler/encoder/feature selector/SMOTE；val/test 只能 `transform` 或 evaluate。
- Scaling 要綁模型假設：距離模型、SVM、Logistic Regression/linear models、梯度法常需要；tree-based models 通常較不敏感，這適合做選擇題。
- 類別不平衡高頻：題目看到 minority class 太少、accuracy 高但少數類別 recall/F1 差 -> 考 SMOTE、class weight、stratified split/CV、F1/Recall。
- Feature selection 建議以 exam recognition 為主：Filter = 統計分數先篩；Wrapper = 用模型反覆試特徵子集；Embedded = 模型訓練時產生重要性或稀疏係數。

## Scope Notes
- 不要教 Spark ML pipelines、資料來源 ingestion、資料清洗細節；這些屬 L22201/L22203 或大數據處理範圍。
- SMOTE 變體（BorderlineSMOTE、ADASYN、SMOTEENN）可在陷阱或補充一句提到，但不要展開成主內容。
- Feature selection 不要做證明、統計檢定推導或高維稀疏恢復條件；考試重點是方法辨識、API pattern、leakage-safe pipeline。
- Normalization 一詞容易混用：本課應清楚區分 StandardScaler（標準化到 mean 0/std 1）與 MinMaxScaler（縮放到固定區間），不要深入向量 norm 或 batch normalization。
- Target encoding、高基數類別編碼、production drift monitoring、PSI、MLOps governance 屬較高階或 L234/L21 交界；若來源提到，只作 scope warning。

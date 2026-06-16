# Research Notes: L23101 機率/統計之機器學習基礎應用

## Official Sources
- [iPAS AI應用規劃師學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方頁列出中級科目3學習指引、勘誤表、歷屆/公告試題；可作為教材來源入口與版本查核點。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): L23101 屬「機器學習基礎數學」，官方明確定位為用機率分佈、條件機率、假設檢定等統計方法支撐模型學習與推論。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 官方內容提到離散分佈含 Bernoulli、Binomial、Poisson；Poisson 用於固定時間/空間區間事件次數，假設事件彼此獨立且平均發生率固定。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 官方內容提到連續分佈含 Normal/Gaussian，常用於誤差建模、參數估計、特徵分數標準化與生成模型。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 官方內容把條件機率寫成 P(A|B)=P(A∩B)/P(B)，並說分類模型常學習 P(Y|X)；邏輯迴歸、貝氏分類器是應用例。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 官方內容列 Bayes' theorem 組成：prior P(A)、likelihood P(B|A)、marginal P(B)、posterior P(A|B)，考點適合做「新證據如何更新機率」情境題。
- [iPAS 中級科目3學習指引 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 官方內容列期望值、變異數、標準差、偏態、峰度；本課只取 expected value/variance 作模型假設與變異解釋基礎，偏態/轉換應讓位給 L22301。
- [115年 AI應用規劃師能力鑑定簡章 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0105_20260105184002.pdf): 考綱列 L23101「機率/統計之機器學習基礎應用」，可用於確認科目歸屬；不提供更細題型。
- [11502 評鑑內容範圍參考 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): L23101 備註為「如數據的數學分佈特性、變異解釋等」，支持本課聚焦分佈假設與 explained variance。

## Community Insights (exam patterns)
- Local exam-intelligence file: `/Users/douglaskuo/Projects/70-Saas-LevelCert/content/ipas/intermediate/exams/L23-sample-questions-11409.md`
  - L231 被標為中頻；已回報考點含 PCA「最大變異數原則」與貝氏定理基礎。
  - L23 整體常見題型含情境判斷、程式判讀、pipeline 步驟排序；L23101 應準備「給資料/模型場景，選正確分佈或解釋指標」。
- [Vocus L23101 快速重點整理](https://vocus.cc/article/6a01aa44fd89780001bbf273): 社群筆記將 L23101 聚焦為常見機率分佈選型、PMF vs PDF、Bayes 後驗更新、假設檢定流程、易混淆概念；可作出題靈感但不可當官方答案依據。
- [Vocus 中級科目三整理](https://vocus.cc/article/68074e04fd897800013f4d3f): 社群整理把 L23101 核心列為 Bayes/conditional probability、常見分佈、統計推論、MLE/MAP；MLE/MAP 若寫入教材應只作名詞辨識，避免推導。
- [S學院 L23101 題庫頁](https://sustainnovation.cc/ipas-ai%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E7%A7%91%E7%9B%AE3_-l23101-%E6%A9%9F%E7%8E%87-%E7%B5%B1%E8%A8%88%E4%B9%8B%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E5%9F%BA%E7%A4%8E/): 模擬題含 PCA 主要目標、假設檢定力、標準化等；部分題目跨到 L22301/L23102，需篩掉超界內容。
- Common traps to prepare:
  - PMF vs PDF: 離散值「某一點機率」 vs 連續值「區間機率密度」。
  - Poisson vs Exponential: 事件次數 count vs 等待時間 interval。
  - prior / likelihood / posterior: 題目常用醫療檢測、風險預測、分類信心包裝。
  - R² vs PCA explained_variance_ratio_: 前者評估回歸模型解釋目標變異；後者評估每個主成分保留資料變異比例。

## Current State (if technology topic)
- [scikit-learn Naive Bayes user guide](https://scikit-learn.org/stable/modules/naive_bayes.html): Naive Bayes 是套用 Bayes theorem 並加上「給定類別後特徵條件獨立」假設；適合教為模型假設，不需推導。
- [scikit-learn BernoulliNB](https://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.BernoulliNB.html): BernoulliNB 適合 binary/boolean features；考點可設為「文字是否出現、是否點擊、是否購買」等 0/1 特徵。
- [scikit-learn LDA/QDA user guide](https://scikit-learn.org/stable/modules/lda_qda.html): LDA/QDA 假設各類別條件下資料為 Gaussian；LDA 共享 covariance，QDA 不共享。L23101 只需辨識 Gaussian assumption。
- [scikit-learn LinearDiscriminantAnalysis](https://scikit-learn.org/stable/modules/generated/sklearn.discriminant_analysis.LinearDiscriminantAnalysis.html): LDA fitting Gaussian density per class and shared covariance is a direct source for「Gaussian for LDA」。
- [scikit-learn PoissonRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.PoissonRegressor.html): PoissonRegressor uses Poisson deviance and log link; useful for count target examples such as visits/calls/events, but implementation details are beyond exam depth.
- [scikit-learn PCA](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html): `explained_variance_ratio_` is the percentage of variance explained by each selected component; if all components are kept, ratios sum to 1.0.
- [scikit-learn r2_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html): R² is coefficient of determination for regression; best score 1.0, can be lower, and can be non-finite for constant targets unless force handling is applied.
- [scikit-learn explained_variance_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.explained_variance_score.html): Explained variance score is similar to R² but does not account for systematic offsets; for study guide, prefer R² as standard regression metric and PCA ratio as dimensionality metric.
- [SciPy Bernoulli tutorial](https://docs.scipy.org/doc/scipy/tutorial/stats/discrete_bernoulli.html): Bernoulli variable takes X=0 or X=1 with probability p for success; good authoritative support for binary-event examples.
- [SciPy Normal docs](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html): Normal/Gaussian is continuous; `loc` is mean and `scale` is standard deviation, useful for term mapping only.
- [NIST Poisson glossary](https://csrc.nist.gov/glossary/term/poisson_distribution): Poisson models discrete random variables; typically counts rare events in a time interval.
- [NIST Poisson distribution handbook](https://www.itl.nist.gov/div898/handbook/eda/section3/eda366j.htm): Poisson PMF and lambda as average number of events in a time interval; good source for count-event scenario questions.
- No syllabus-relevant deprecation found. Current docs still support the planned mappings: BernoulliNB for binary features, LDA Gaussian class-conditional assumption, PoissonRegressor for count targets, PCA explained variance ratio, and R² for regression fit.

## External Documents Found
- No external syllabus-specific document was provided or discovered beyond official iPAS learning resources, exam scope PDFs, scikit-learn/SciPy docs, and NIST statistical references.
- Official sample/公告試題 are listed on the iPAS learning-resource page, but the local L23 intelligence file already summarizes the relevant community findings for this task.

## Key Findings Summary
- L23101 should teach probability/statistics as the reason ML algorithms make assumptions: distribution choice explains what kind of data/model target an algorithm expects.
- High-yield model-assumption mapping:
  - Gaussian/Normal → continuous measurements, errors, class-conditional densities in LDA.
  - Bernoulli → binary 0/1 event or feature; BernoulliNB for boolean features.
  - Poisson → count of events in fixed interval; count models such as Poisson regression.
- Bayes theorem should be taught as probability updating: prior + likelihood → posterior; use medical test, spam filtering, fraud/risk scenarios.
- Variance explanation should be separated:
  - R² → regression model explains target variance.
  - PCA `explained_variance_ratio_` → component keeps a percentage of feature-space variance.
- Expected value and variance are foundation terms: expected value = average tendency/model baseline; variance = spread/uncertainty that models either explain, reduce, or preserve.

## Scope Notes
- Exclude PCA eigendecomposition, SVD, covariance-matrix derivation, and eigenvector calculation; those belong to L23102.
- Exclude log transform, Box-Cox, z-score, quantile transform as data-prep teaching; those belong to L22301 unless only mentioned as official-source context.
- Exclude gradient descent, Adam, optimizer math; those belong to L23103.
- Hypothesis testing appears in the official guide and community notes, but this lesson request focuses on distributions, Bayes, expected value/variance, R²/PCA variance. If included, keep to p-value/significance decision recognition only.
- MLE/MAP appears in community notes but is beyond this boundary unless used as a one-line relation to likelihood/prior/posterior; avoid formula derivation.
- PoissonRegressor implementation details, GLM link functions, deviance, covariance estimators, and LDA/QDA derivations exceed the math ceiling; keep only scenario recognition and model-assumption mapping.

# iPAS AI Concept Graph

> 這份檔案用「關係」來讀名詞，而不是只看分類。格式是：
>
> `A --關係--> B：原因 / 考試線索`

---

## 0. 關係類型

| 關係 | 意思 |
|---|---|
| `is-a` | A 是 B 的一種 |
| `depends-on` | A 需要 B 才能成立 |
| `uses` | A 使用 B |
| `solves` | A 解決 B 問題 |
| `contrasts-with` | A 常與 B 混淆 |
| `evaluated-by` | A 用 B 評估 |
| `risk-controlled-by` | A 的風險用 B 控制 |
| `exam-trap` | 高頻考試陷阱 |

---

## 1. AI 基礎關係

```text
ML（Machine Learning，機器學習） --is-a--> AI（Artificial Intelligence，人工智慧）：機器學習是人工智慧的一種方法。
DL（Deep Learning，深度學習） --is-a--> ML：深度學習是機器學習的一種。
NLP（Natural Language Processing，自然語言處理） --uses--> Transformer：中級 NLP 很多考點建立在 Transformer。
CV（Computer Vision，電腦視覺） --uses--> CNN（Convolutional Neural Network，卷積神經網路）：CNN 是影像特徵抽取核心。
Generative AI --contrasts-with--> Discriminative AI：生成內容 vs 判斷類別 / 數值。
Multimodal AI --uses--> multiple modalities：文字、圖片、語音一起處理。
```

## 2. 資料與統計關係

```text
Mean --contrasts-with--> Median：平均數怕離群值，中位數較穩健。
IQR（Interquartile Range，四分位距） --uses--> Q1 and Q3：IQR = Q3 - Q1。
Boxplot Whisker --depends-on--> IQR Fence：鬚線是 fence 內最後真實值。
PDF（Probability Density Function，機率密度函數） --contrasts-with--> PMF（Probability Mass Function，機率質量函數）：連續密度 vs 離散機率。
CDF（Cumulative Distribution Function，累積分佈函數） --solves--> interval probability：P(a<X<=b)=CDF(b)-CDF(a)。
p-value --depends-on--> H0：p-value 是 H0 成立下資料多極端。
Type I Error --contrasts-with--> Type II Error：誤拒真 H0 vs 誤留假 H0。
ANOVA（Analysis of Variance，變異數分析） --solves--> 3+ group comparison：拒絕後只知道至少一組不同。
Visualization --depends-on--> data type：圖表選擇先看類別、連續、時間、關係。
```

## 3. ML 與評估關係

```text
Supervised Learning --depends-on--> labels：有標籤才是監督式。
Unsupervised Learning --contrasts-with--> Supervised Learning：沒有標籤，常見 k-means。
Train Set --contrasts-with--> Test Set：train 學參數，test 最終驗證。
Validation Set --uses--> model comparison：驗證集用於調參與模型比較。
Target Encoding --depends-on--> train split：必須切分後只用 train 算。
SMOTE（Synthetic Minority Over-sampling Technique，合成少數類過取樣技術） --depends-on--> train fold only：只能在訓練集或 fold 內做。
Data Leakage --caused-by--> fitting on test：測試集 fit scaler 或 encoding 會洩漏。
Precision --solves--> high false positive cost：誤報成本高選 precision。
Recall --solves--> high false negative cost：漏報成本高選 recall。
F1 --uses--> Precision and Recall：兩者都要顧時用 F1。
ROC AUC（Receiver Operating Characteristic Area Under the Curve，接收者操作特徵曲線下面積） --depends-on--> y_prob：AUC 要用機率，不是類別。
```

## 4. NLP / CV / Multimodal 關係

```text
Tokenization --feeds--> Embedding：文字先切 token，再轉向量。
Embedding --feeds--> Transformer：向量才可進模型計算。
BPE（Byte Pair Encoding，位元組對編碼） --associated-with--> GPT（Generative Pre-trained Transformer，生成式預訓練 Transformer）：常見 GPT / RoBERTa tokenizer。
WordPiece --associated-with--> BERT：常見 `##` prefix。
BERT（Bidirectional Encoder Representations from Transformers，雙向編碼器表徵） --is-a--> Encoder-only Transformer：適合理解、分類、NER（Named Entity Recognition，命名實體辨識）、抽取式 QA（Question Answering，問答）。
GPT --is-a--> Decoder-only Transformer：適合生成與對話。
T5 --is-a--> Encoder-Decoder Transformer：適合 text-to-text / seq2seq。
CNN --uses--> Conv / ReLU（Rectified Linear Unit，修正線性單元） / Pooling：影像局部特徵抽取。
ResNet --uses--> Skip Connection：解決 degradation。
Object Detection --evaluated-by--> mAP：偵測任務常看 mAP。
Semantic Segmentation --contrasts-with--> Instance Segmentation：是否分同類個體。
CLIP（Contrastive Language-Image Pre-training，對比式語言-影像預訓練） --solves--> text-image alignment：文圖對齊，不生成圖像。
Cross-Attention --connects--> modalities：Q 來自一個模態，K/V 來自另一個模態。
```

## 5. 生成式 AI 關係

```text
Pretraining --depends-on--> Pretraining Corpus：大量語料建立基礎能力。
Tokenizer --contrasts--> vocabulary size vs corpus size：詞彙表大小不是語料量。
SFT（Supervised Fine-Tuning，監督式微調） --uses--> instruction-response pairs：學回答格式與任務行為。
RLHF（Reinforcement Learning from Human Feedback，人類回饋強化學習） --depends-on--> Reward Model and PPO（Proximal Policy Optimization，近端策略最佳化）：偏好對齊，需要 reward model。
DPO（Direct Preference Optimization，直接偏好最佳化） --contrasts-with--> RLHF：同樣用偏好資料，但不需要 reward model。
RAG（Retrieval-Augmented Generation，檢索增強生成） --depends-on--> Chunking / Embedding / Vector Store / Retrieval：查外部文件再生成。
RAG --solves--> knowledge freshness：適合知識更新、內部文件、引用來源。
RAG --contrasts-with--> Fine-tuning：RAG 不改權重，fine-tuning 改權重或 adapter。
LoRA（Low-Rank Adaptation，低秩適配） --is-a--> PEFT（Parameter-Efficient Fine-Tuning，參數高效微調）：低秩 adapter，省資源微調。
GAN（Generative Adversarial Network，生成對抗網路） --uses--> Generator and Discriminator：生成器與鑑別器對抗。
Mode Collapse --risk-of--> GAN：生成多樣性不足，不是 overfitting。
Diffusion --uses--> forward noise and reverse denoise：前向加雜訊固定，反向去雜訊要訓練。
FID（Fréchet Inception Distance，Fréchet Inception 距離） --evaluates--> image generation quality：批次比較，越低越好。
temperature --is-a--> inference parameter：不是訓練超參數。
```

## 6. 大數據系統關係

```text
API（Application Programming Interface，應用程式介面） Polling --contrasts-with--> Webhook：定期拉取 vs 事件推送。
CDC（Change Data Capture，變更資料擷取） --uses--> database log：追蹤 DB（Database，資料庫）binlog 異動。
Kafka --solves--> high-throughput event streaming：高吞吐串流。
ETL（Extract, Transform, Load，擷取、轉換、載入） --contrasts-with--> ELT（Extract, Load, Transform，擷取、載入、轉換）：先轉換再載入 vs 先載入再轉換。
OLTP（Online Transaction Processing，線上交易處理） --contrasts-with--> OLAP（Online Analytical Processing，線上分析處理）：交易查整筆 vs 分析掃欄位。
Data Lake --contrasts-with--> Data Warehouse：多格式原始資料 vs 結構化 BI。
Lakehouse --combines--> Data Lake and Data Warehouse：彈性 + 治理。
Delta Lake / Iceberg / Hudi --is-a--> table format：不是完整平台。
Spark Transformation --contrasts-with--> Spark Action：lazy plan vs trigger execution。
Structured Streaming --contrasts-with--> Flink：micro-batch vs true stream。
GROUP BY --contrasts-with--> Window Function：減少列 vs 保留列。
Window Function --uses--> partition and order：排名、累計、lag、lead。
```

## 7. 部署、MLOps 與導入關係

```text
Solution Ladder --orders--> Prompt / RAG / Fine-tuning / From-scratch：先低成本低複雜度。
Dual-Constraint --precedes--> Weighted Scoring：先篩掉不可行方案。
Weighted Scoring --depends-on--> pre-set weights：權重必須先設定。
TCO（Total Cost of Ownership，總持有成本） --includes--> direct / indirect / opportunity cost：不只 API 或伺服器費。
ROI（Return on Investment，投資報酬率） --depends-on--> net benefit and investment：淨效益 / 投入。
RACI（Responsible, Accountable, Consulted, Informed，負責 / 當責 / 諮詢 / 知會）A --contrasts-with--> RACI R：A 每列只能一人，R 可多人。
PoC（Proof of Concept，概念驗證） --contrasts-with--> MVP（Minimum Viable Product，最小可行產品） --contrasts-with--> Pilot：技術可行性 vs 產品可用性 vs 真實試行。
Model Registry --stores--> version / metadata / metrics / approval：不存 active endpoint。
Feature Store --solves--> training-serving skew：統一訓練與推論特徵。
Shadow --contrasts-with--> Canary：不影響用戶 vs 小比例用戶收新版。
Data Drift --means--> P(X) changes：輸入分佈變。
Concept Drift --means--> P(Y|X) changes：輸入輸出關係變。
SLA（Service Level Agreement，服務水準協議） --contrasts-with--> SLO（Service Level Objective，服務水準目標） --contrasts-with--> SLI（Service Level Indicator，服務水準指標）：外部合約 vs 內部目標 vs 實測值。
```

## 8. 治理、風險、隱私與資安關係

```text
Risk Register --contains--> owner / score / controls / residual risk：風險活文件。
Inherent Risk --precedes--> Controls：控制前風險。
Residual Risk --compared-with--> Risk Appetite：超過胃納要處置。
EU AI Act High Risk --contrasts-with--> Unacceptable：高風險可做但要合規；不可接受才禁止。
FRIA（Fundamental Rights Impact Assessment，基本權利影響評估） --broader-than--> DPIA（Data Protection Impact Assessment，資料保護影響評估）：基本權利影響大於資料保護。
ISO 42001 --contrasts-with--> ISO 27001：AI 管理系統 vs 資訊安全管理。
Pseudonymization --contrasts-with--> Anonymization：可逆 vs 不可逆。
k-anonymity --solves--> identity disclosure：防身份揭露。
l-diversity --solves--> attribute disclosure：防敏感屬性單一。
t-closeness --solves--> distribution skew attack：防分佈偏斜攻擊。
Differential Privacy --uses--> noise and epsilon：epsilon 越小隱私越強。
Federated Learning --solves--> data locality：資料不離本地。
Secure Aggregation --protects--> client updates：伺服器只看聚合結果。
RBAC（Role-Based Access Control，角色式存取控制） --contrasts-with--> ABAC（Attribute-Based Access Control，屬性式存取控制）：依角色 vs 依屬性 / 情境。
Homomorphic Encryption --allows--> computation on encrypted data：密文可運算。
```

## 9. No-Code / Low-Code 與商業採用關係

```text
No-Code --enables--> Citizen Developer：非工程人員建立流程或應用。
Low-Code --adds--> custom code：比 no-code 更可客製。
Workflow Automation --solves--> repetitive business process：自動化重複流程。
Citizen Developer --risk-controlled-by--> governance：需要權限、審核、監控。
Vendor Lock-in --affects--> TCO and risk：平台依賴影響成本與轉移。
Human-in-the-loop --risk-controls--> high-impact AI decisions：高影響決策保留人類審查。
```

---

## 10. Exam-Trap Relationship List

| Trap | 正確關係 |
|---|---|
| RAG 被當成 fine-tuning | RAG 不改權重；fine-tuning 改模型行為 / 權重 |
| RLHF 和 DPO 被混淆 | RLHF 需要 Reward Model + PPO；DPO 不需要 |
| CLIP 被當成圖像生成 | CLIP 是文圖對齊；Stable Diffusion / DALL-E 才生成 |
| Semantic / Instance Segmentation 混淆 | Instance 會分同類個體；Semantic 不會 |
| GROUP BY / Window Function 混淆 | GROUP BY 減少列；Window 保留列 |
| Data Drift / Concept Drift 混淆 | P(X) 變 vs P(Y\|X) 變 |
| Shadow / Canary 混淆 | Shadow 用戶仍收舊版；Canary 小比例用戶收新版 |
| High Risk / Unacceptable 混淆 | High Risk 可部署但要合規；Unacceptable 禁止 |
| DPIA / FRIA 混淆 | DPIA 看資料保護；FRIA 看基本權利 |
| Pseudonymization / Anonymization 混淆 | 假名化可逆；匿名化不可逆 |

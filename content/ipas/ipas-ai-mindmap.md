# iPAS AI 應用規劃師 Mindmap

> 這份檔案使用 Mermaid `mindmap` 語法。用途是快速看「層級結構」：每個名詞大概屬於哪一區、上下游是什麼。

---

## Overview Mindmap

```mermaid
mindmap
  root((iPAS AI 應用規劃師))
    AI 基礎與分類
      AI / Artificial Intelligence / 人工智慧
      ML / Machine Learning / 機器學習
      DL / Deep Learning / 深度學習
      鑑別式 AI
      生成式 AI
      多模態 AI
    資料 統計 視覺化
      資料來源
      資料品質
      敘述統計
      機率分佈
      假設檢定
      視覺化
    機器學習與評估
      Supervised Learning
      Unsupervised Learning
      前處理
      Train Validation Test
      模型選擇
      指標
    NLP / Natural Language Processing / 自然語言處理；CV / Computer Vision / 電腦視覺；多模態
      Tokenization
      Embedding
      Transformer
      CNN / Convolutional Neural Network / 卷積神經網路
      Segmentation
      CLIP / Contrastive Language-Image Pre-training / 文圖對齊
      Cross-Attention
    生成式 AI
      Pretraining
      SFT / Supervised Fine-Tuning / 監督式微調
      RLHF / Reinforcement Learning from Human Feedback / 人類回饋強化學習
      DPO / Direct Preference Optimization / 直接偏好最佳化
      RAG / Retrieval-Augmented Generation / 檢索增強生成
      LoRA / Low-Rank Adaptation / 低秩適配；PEFT / Parameter-Efficient Fine-Tuning / 參數高效微調
      Diffusion
      GAN / Generative Adversarial Network / 生成對抗網路
    大數據系統
      Ingestion
      Storage
      Processing
      SQL / Structured Query Language / 結構化查詢語言
      Feature Store
      Distributed Training
    部署與導入
      Evaluation
      Planning
      PoC / Proof of Concept / 概念驗證；MVP / Minimum Viable Product / 最小可行產品；Pilot / 試行
      MLOps / Machine Learning Operations / 機器學習維運
      Serving
      Monitoring
    治理 風險 隱私
      Risk Register
      EU AI Act
      NIST AI RMF / AI Risk Management Framework / AI 風險管理框架
      ISO
      DPIA / Data Protection Impact Assessment / 資料保護影響評估；FRIA / Fundamental Rights Impact Assessment / 基本權利影響評估
      DP / Differential Privacy / 差分隱私；FL / Federated Learning / 聯邦學習
      RBAC / Role-Based Access Control / 角色式存取控制；ABAC / Attribute-Based Access Control / 屬性式存取控制
    No-Code Low-Code
      Citizen Developer
      Workflow Automation
      Tool Limitation
      Governance
```

---

## Area 1 Mindmap：AI 基礎與分類

```mermaid
mindmap
  root((AI 基礎與分類))
    AI / Artificial Intelligence / 人工智慧
      Rule-based AI
      Machine Learning / ML / 機器學習
        Supervised Learning
          Classification
          Regression
        Unsupervised Learning
          Clustering
        Reinforcement Learning
      Deep Learning / DL / 深度學習
        CNN / Convolutional Neural Network / 卷積神經網路
        Transformer
        Foundation Model
    輸出類型
      鑑別式 AI
        分類
        預測
        偵測
      生成式 AI
        文字
        圖像
        音訊
        程式碼
      多模態 AI
        Text
        Image
        Audio
```

## Area 2 Mindmap：資料、統計與視覺化

```mermaid
mindmap
  root((資料 統計 視覺化))
    資料來源
      API / Application Programming Interface / 應用程式介面
      Webhook
      CDC / Change Data Capture / 變更資料擷取
      Kafka
      Web Scraping
    資料品質
      Completeness
      Accuracy
      Consistency
      Timeliness
      Uniqueness
      Validity
    敘述統計
      Mean
      Median
      Mode
      Variance
      SD / Standard Deviation / 標準差
      IQR / Interquartile Range / 四分位距
      CV / Coefficient of Variation / 變異係數
      Boxplot
    機率分佈
      PMF / Probability Mass Function / 機率質量函數
      PDF / Probability Density Function / 機率密度函數
      CDF / Cumulative Distribution Function / 累積分佈函數
      Normal
      Binomial
      Poisson
      Uniform
      Exponential
      CLT / Central Limit Theorem / 中央極限定理
    假設檢定
      H0 H1
      p-value
      Type I
      Type II
      Power
      t-test
      Chi-square
      ANOVA / Analysis of Variance / 變異數分析
    視覺化
      Bar
      Histogram
      Line
      Scatter
      Heatmap
      Box
      Violin
```

## Area 3 Mindmap：機器學習與模型評估

```mermaid
mindmap
  root((機器學習與模型評估))
    任務型態
      Regression
      Classification
      Clustering
    資料切分
      Train
      Validation
      Test
    前處理
      Missing Value
      Ordinal Encoding
      One-Hot Encoding
      Target Encoding
      MinMaxScaler
      StandardScaler
      RobustScaler
    模型
      Linear Regression
      Logistic Regression
      Decision Tree
      Random Forest
      SVM / Support Vector Machine / 支援向量機
      k-NN / k-Nearest Neighbors / k 近鄰
      Neural Network
      k-means
    類別不平衡
      SMOTE / Synthetic Minority Over-sampling Technique / 合成少數類過取樣
      Random Oversampling
      Undersampling
      Class Weight
    指標
      Accuracy
      Precision
      Recall
      F1
      ROC AUC / Receiver Operating Characteristic Area Under the Curve / 接收者操作特徵曲線下面積
      PR Curve / Precision-Recall Curve / 精確率-召回率曲線
      MAE / Mean Absolute Error / 平均絕對誤差；MSE / Mean Squared Error / 均方誤差；RMSE / Root Mean Squared Error / 均方根誤差；R2 / 決定係數
```

## Area 4 Mindmap：NLP、CV、多模態

```mermaid
mindmap
  root((NLP CV 多模態))
    NLP / Natural Language Processing / 自然語言處理
      Tokenization
        BPE / Byte Pair Encoding / 位元組對編碼
        WordPiece
        Unigram
        SentencePiece
        tiktoken
      Embedding
        Static
          word2vec
          GloVe
        Contextualized
          ELMo
          BERT / Bidirectional Encoder Representations from Transformers / 雙向編碼器表徵
      Transformer
        Self-Attention
        Multi-head Attention
        Positional Encoding
      Model Family
        BERT / Bidirectional Encoder Representations from Transformers / 雙向編碼器表徵
        GPT / Generative Pre-trained Transformer / 生成式預訓練 Transformer
        T5
        BART
    CV / Computer Vision / 電腦視覺
      CNN / Convolutional Neural Network / 卷積神經網路
        Conv
        BN / Batch Normalization / 批次正規化
        ReLU / Rectified Linear Unit / 修正線性單元
        Pooling
        FC / Fully Connected / 全連接層
      ResNet
        Skip Connection
      Tasks
        Classification
        Detection
        Semantic Segmentation
        Instance Segmentation
        Panoptic Segmentation
      Metrics
        IoU
        AP / Average Precision / 平均精確率
        mAP / mean Average Precision / 平均 AP
        mIoU / mean Intersection over Union / 平均交並比
    Multimodal
      CLIP / Contrastive Language-Image Pre-training / 文圖對齊
      Cross-Attention
      Early Fusion
      Late Fusion
      Hybrid Fusion
      LLaVA
      Flamingo
      Whisper
```

## Area 5 Mindmap：生成式 AI

```mermaid
mindmap
  root((生成式 AI))
    資料層
      Pretraining Corpus
      Quality Filtering
      Exact Dedup
      Near Dedup
      Perplexity Filtering
      Tokenizer
    模型層
      Transformer LLM / Large Language Model / 大型語言模型
      GAN / Generative Adversarial Network / 生成對抗網路
        Generator
        Discriminator
        Mode Collapse
      Diffusion
        Forward Process
        Reverse Process
        DDPM / Denoising Diffusion Probabilistic Model / 去噪擴散機率模型
        DDIM / Denoising Diffusion Implicit Model / 去噪擴散隱式模型
        Stable Diffusion
    訓練與對齊
      Pretraining
      SFT / Supervised Fine-Tuning / 監督式微調
      RLHF / Reinforcement Learning from Human Feedback / 人類回饋強化學習
        Reward Model
        PPO / Proximal Policy Optimization / 近端策略最佳化
      DPO / Direct Preference Optimization / 直接偏好最佳化
    客製與知識
      Fine-tuning
      LoRA / Low-Rank Adaptation / 低秩適配
      PEFT / Parameter-Efficient Fine-Tuning / 參數高效微調
      RAG / Retrieval-Augmented Generation / 檢索增強生成
        Chunking
        Embedding
        Vector Store
        Retrieval
        Prompt Augmentation
        Generation
    推論參數
      Temperature
      max_new_tokens
      do_sample
```

## Area 6 Mindmap：大數據系統與處理

```mermaid
mindmap
  root((大數據系統與處理))
    Ingestion
      API / Application Programming Interface / 應用程式介面 Polling
      Webhook
      CDC / Change Data Capture / 變更資料擷取
      Kafka
    Storage
      RDBMS / Relational Database Management System / 關聯式資料庫管理系統
      NoSQL
        Document
        Key-Value
        Wide-Column
        Graph
      Data Lake
      Data Warehouse
      Lakehouse
        Delta Lake
        Iceberg
        Hudi
      HDFS / Hadoop Distributed File System / Hadoop 分散式檔案系統
    Processing
      Hadoop
        HDFS / Hadoop Distributed File System / Hadoop 分散式檔案系統
        YARN / Yet Another Resource Negotiator / Hadoop 資源管理器
        MapReduce
      Spark
        RDD / Resilient Distributed Dataset / 彈性分散式資料集
        DataFrame
        Lazy Evaluation
        Transformation
        Action
      Flink
    SQL / Structured Query Language / 結構化查詢語言
      JOIN
      GROUP BY / 分組彙總
      Window Function
        ROW_NUMBER
        RANK
        DENSE_RANK
        LAG
        LEAD
    ML Connection
      Feature Store
      Dataset Versioning
      Distributed Training
```

## Area 7 Mindmap：部署、MLOps 與 AI 導入

```mermaid
mindmap
  root((部署 MLOps AI 導入))
    Evaluation
      Business Framing
      Dual-Constraint
      Weighted Scoring
      TCO / Total Cost of Ownership / 總持有成本
      ROI / Return on Investment / 投資報酬率
      Payback Period
      Break-even
      Solution Ladder
    Planning
      Roadmap
      RACI / Responsible Accountable Consulted Informed / 責任分工矩陣
      NSM / North Star Metric / 北極星指標
      OKR / Objectives and Key Results / 目標與關鍵成果
      KPI / Key Performance Indicator / 關鍵績效指標
      PoC / Proof of Concept / 概念驗證
      MVP / Minimum Viable Product / 最小可行產品
      Pilot
      Rollout
      CRISP-DM / Cross-Industry Standard Process for Data Mining / 跨產業資料探勘標準流程
    MLOps / Machine Learning Operations / 機器學習維運
      Training
      Model Registry
      Feature Store
      Serving
      Monitoring
      Retraining
      Rollback
    Deployment Strategy
      Batch Inference
      Real-time Inference
      Shadow
      Canary
      Blue-Green
      A-B Testing
    Monitoring
      SLI / Service Level Indicator / 服務水準指標
      SLO / Service Level Objective / 服務水準目標
      SLA / Service Level Agreement / 服務水準協議
      Data Drift
      Concept Drift
```

## Area 8 Mindmap：治理、風險、隱私與資安

```mermaid
mindmap
  root((治理 風險 隱私 資安))
    Risk Management
      Risk Register
      Inherent Risk
      Controls
      Residual Risk
      Risk Appetite
      Mitigate
      Transfer
      Accept
      Avoid
    Frameworks
      EU AI Act
        Unacceptable
        High Risk
        Limited
        Minimal
      NIST AI RMF / National Institute of Standards and Technology AI Risk Management Framework / AI 風險管理框架
        Govern
        Map
        Measure
        Manage
      ISO 42001
      ISO 23894
      ISO 27001
      DPIA / Data Protection Impact Assessment / 資料保護影響評估
      FRIA / Fundamental Rights Impact Assessment / 基本權利影響評估
    Privacy
      PII / Personally Identifiable Information / 個人可識別資訊
      Masking
      Redaction
      Pseudonymization
      Anonymization
      k-anonymity
      l-diversity
      t-closeness
      Differential Privacy
      Federated Learning
    Security
      Encryption at Rest
      Encryption in Transit
      Homomorphic Encryption
      RBAC / Role-Based Access Control / 角色式存取控制
      ABAC / Attribute-Based Access Control / 屬性式存取控制
      Field-Level Security
```

## Area 9 Mindmap：No-Code / Low-Code 與商業採用

```mermaid
mindmap
  root((No-Code Low-Code 商業採用))
    No-Code
      Visual Builder
      Citizen Developer
      Workflow Automation
    Low-Code
      Visual Builder
      Custom Code
      API / Application Programming Interface / 應用程式介面 Integration
    GenAI Tool Use
      Prompt Engineering
      Assistant
      Knowledge Bot
      Document Workflow
    Limitations
      Vendor Lock-in
      Security
      Privacy
      Scalability
      Governance
    Controls
      Human-in-the-loop
      Access Control
      Approval Workflow
      Monitoring
```

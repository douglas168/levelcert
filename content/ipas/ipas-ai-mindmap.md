# iPAS AI 應用規劃師 Mindmap

> 這份檔案使用 Mermaid `mindmap` 語法。用途是快速看「層級結構」：每個名詞大概屬於哪一區、上下游是什麼。

---

## Overview Mindmap

```mermaid
mindmap
  root((iPAS AI 應用規劃師))
    AI 基礎與分類
      AI 人工智慧
      ML 機器學習
      DL 深度學習
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
    NLP CV 多模態
      Tokenization
      Embedding
      Transformer
      CNN
      Segmentation
      CLIP
      Cross-Attention
    生成式 AI
      Pretraining
      SFT
      RLHF
      DPO
      RAG
      LoRA PEFT
      Diffusion
      GAN
    大數據系統
      Ingestion
      Storage
      Processing
      SQL
      Feature Store
      Distributed Training
    部署與導入
      Evaluation
      Planning
      PoC MVP Pilot
      MLOps
      Serving
      Monitoring
    治理 風險 隱私
      Risk Register
      EU AI Act
      NIST AI RMF
      ISO
      DPIA FRIA
      DP FL
      RBAC ABAC
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
    AI Artificial Intelligence
      Rule-based AI
      Machine Learning ML
        Supervised Learning
          Classification
          Regression
        Unsupervised Learning
          Clustering
        Reinforcement Learning
      Deep Learning DL
        CNN
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
      API
      Webhook
      CDC
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
      SD
      IQR
      CV
      Boxplot
    機率分佈
      PMF
      PDF
      CDF
      Normal
      Binomial
      Poisson
      Uniform
      Exponential
      CLT
    假設檢定
      H0 H1
      p-value
      Type I
      Type II
      Power
      t-test
      Chi-square
      ANOVA
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
      SVM
      k-NN
      Neural Network
      k-means
    類別不平衡
      SMOTE
      Random Oversampling
      Undersampling
      Class Weight
    指標
      Accuracy
      Precision
      Recall
      F1
      ROC AUC
      PR Curve
      MAE MSE RMSE R2
```

## Area 4 Mindmap：NLP、CV、多模態

```mermaid
mindmap
  root((NLP CV 多模態))
    NLP
      Tokenization
        BPE
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
          BERT
      Transformer
        Self-Attention
        Multi-head Attention
        Positional Encoding
      Model Family
        BERT
        GPT
        T5
        BART
    CV
      CNN
        Conv
        BN
        ReLU
        Pooling
        FC
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
        AP
        mAP
        mIoU
    Multimodal
      CLIP
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
      Transformer LLM
      GAN
        Generator
        Discriminator
        Mode Collapse
      Diffusion
        Forward Process
        Reverse Process
        DDPM
        DDIM
        Stable Diffusion
    訓練與對齊
      Pretraining
      SFT
      RLHF
        Reward Model
        PPO
      DPO
    客製與知識
      Fine-tuning
      LoRA
      PEFT
      RAG
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
      API Polling
      Webhook
      CDC
      Kafka
    Storage
      RDBMS
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
      HDFS
    Processing
      Hadoop
        HDFS
        YARN
        MapReduce
      Spark
        RDD
        DataFrame
        Lazy Evaluation
        Transformation
        Action
      Flink
    SQL
      JOIN
      GROUP BY
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
      TCO
      ROI
      Payback Period
      Break-even
      Solution Ladder
    Planning
      Roadmap
      RACI
      NSM
      OKR
      KPI
      PoC
      MVP
      Pilot
      Rollout
      CRISP-DM
    MLOps
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
      SLI
      SLO
      SLA
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
      NIST AI RMF
        Govern
        Map
        Measure
        Manage
      ISO 42001
      ISO 23894
      ISO 27001
      DPIA
      FRIA
    Privacy
      PII
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
      RBAC
      ABAC
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
      API Integration
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


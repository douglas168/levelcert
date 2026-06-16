# Research Notes: L23302 模型選擇與架構設計

## Official Sources
- [iPAS AI應用規劃師(中級)-學習指引-科目3 機器學習技術與應用](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI應用規劃師(中級)-學習指引-科目3機器學習技術與應用_20251222101907.pdf): 5.2 明確把「模型選擇與架構設計」定位為依任務類型、資料規模、特徵性質、解釋性、運算資源與部署限制選模型；核心是模型選擇會影響後續訓練成效、泛化能力與部署可用性。
- [iPAS 學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方目前列出中級學習指引、勘誤表與歷屆公告試題；截至 2026-06-16，頁面已有 114-2 與 115-1 中級公告試題，表示備考應以最新公告題型校準，不只看早期樣題。
- [114年第二梯次中級AI應用規劃師第三科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114年第二梯次中級AI應用規劃師第三科機器學習技術與應用(當次試題公告114_20251226000650.pdf): 題目直接考 CNN 第一層卷積功能、CNN vs FCNN 的局部感知與參數共享、LSTM 適用時間序列、Adam 內建 momentum 設計、overfitting 情境下簡化模型架構等；考法偏情境判斷與選項辨識。
- [iPAS 中級學習指引勘誤表](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI應用規劃師(中級)_學習指引勘誤表_1150410_20260410150331.pdf): 寫作時需同步核對勘誤，尤其 L23 指標與公式類內容；本課若提到評估指標，應只作邊界提醒，不展開到 L23303。

## Community Insights (exam patterns)
- [Local exam intelligence file: `content/ipas/intermediate/exams/L23-sample-questions-11409.md`](../../exams/L23-sample-questions-11409.md): 社群整理指出 L23 高頻包含 CNN pooling / Inception / ResNet / VGG、LSTM 時間序列、RNN vs Transformer、ReLU / Sigmoid vs Softmax 使用時機、loss function 選擇（回歸 vs 分類）、Adam 優化器概念、過擬合/欠擬合診斷。
- [CCChen: 2026 iPAS AI中級最新備考全解析](https://vocus.cc/article/6a0e8059fd89780001db06a9): 考生/講師觀察 114-2 科目三轉向「模型決策題」，常考 Cross Validation、L1 Regularization、DBSCAN、CNN、LSTM、Random Search、AutoML、Information Gain；Bias-Variance、Overfitting、Regularization、Loss Function、AUC-ROC 被標為 2026 重要主題。
- [CCChen: iPAS AI應用規劃師中級科目三考試整理](https://vocus.cc/article/68074e04fd897800013f4d3f): 將 L23302 摘為依問題特點（分類、回歸、聚類等）選演算法並設計架構；進一步列出任務驅動模型選擇、模型複雜度與資料量匹配、層數/神經元設定、ensemble、AutoML 等準備方向。
- [阿摩 114-2 第三科公告試題索引](https://yamol.tw/exam-114%E5%B9%B4%2B%2B1142%2BAI%2B%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E5%85%AC%E5%91%8A%E8%A9%A6%E9%A1%8C_%E7%AC%AC%E4%B8%89%E7%A7%91%EF%BC%9A%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93-136329.htm): 公開題目索引顯示第三科為 50 題選擇題、無申論；前段即有 cross-validation、L1 regularization、非凸局部最佳、CNN、LSTM 等情境題。
- Reddit / 大型英文論壇未找到 iPAS L23302 直接考題討論；可用價值低，不建議作為教材依據。

## Current State (if technology topic)
- [Keras Dense layer](https://keras.io/api/layers/core_layers/dense/): Dense layer 以 `units`、`activation`、`kernel_initializer` 等定義基本網路層；可支撐「層級設定 = 層數、每層單元數、激活函數、初始化」的寫法。
- [Keras Conv2D layer](https://keras.io/api/layers/convolution_layers/convolution2d/): Conv2D 以 `filters`、`kernel_size`、`strides`、`activation`、initializer 等配置卷積層；官方 114-2 題目也考 CNN 第一層提取局部特徵與參數共享，因此 CNN 應作為影像/空間資料的典型模型家族。
- [Keras LSTM layer](https://keras.io/api/layers/recurrent_layers/lstm/): LSTM 文件列出 `units`、`activation=tanh`、`recurrent_activation=sigmoid`、kernel/recurrent initializer；支撐序列/時間序列選 LSTM/GRU 的 exam rule，但不需教 gate 公式。
- [Keras MultiHeadAttention layer](https://keras.io/api/layers/attention_layers/multi_head_attention/): Keras 3 文件將 multi-head attention 對應 Vaswani et al. 2017，含 `num_heads`、`key_dim` 等架構參數；L23302 可教 Transformer 適合長距依賴與文字/序列，但細部 Q/K/V 推導屬 L211/L232 或較高階。
- [TensorFlow/Keras losses](https://www.tensorflow.org/api_docs/python/tf/keras/losses): 官方列出 MSE/MAE 等回歸損失與 Binary/Categorical/Sparse Categorical Crossentropy；考試應停在「回歸常用 MSE/MAE，分類常用交叉熵」的任務配對。
- [Keras optimizers](https://keras.io/api/optimizers/): Keras 3 compile 範例把 loss 與 optimizer 作為編譯模型的核心配置；L23302 可比較 SGD、RMSprop、Adam 的選用概念，避免展開更新公式。
- [Keras activations](https://keras.io/api/layers/activations/): Softmax 會把向量轉成總和為 1 的機率分佈，常用於分類網路最後一層；ReLU/Sigmoid/Tanh/Softmax 應用情境是高機率考點。
- [Keras initializers](https://keras.io/api/layers/initializers/): Glorot/Xavier 與 He initializer 仍是 Keras 3 官方初始化器；考點可寫成「Xavier/Glorot 常與 tanh/sigmoid 類場景連結，He 常與 ReLU 類場景連結」，避免推導 fan-in/fan-out 公式。
- [scikit-learn learning curve / bias-variance docs](https://scikit-learn.org/stable/modules/learning_curve.html): 官方說高 bias 代表模型太簡單、fit 差；高 variance 代表對訓練資料變動敏感；增加資料可降低 variance，但若真實函數太複雜，應選較能表達的模型。

## Key Findings Summary
- L23302 最像「選型與架構配置」考點：看到題目任務、資料型態、資料量、解釋性、部署限制，要能選模型家族與大致架構，而不是跑訓練流程。
- 任務類型快判：表格資料分類/回歸可先想線性模型、樹模型、SVM、集成；影像/空間特徵選 CNN；序列/時間依賴選 RNN/LSTM/GRU 或 Transformer；文字長距依賴常連到 Transformer。
- 架構定義快判：層數 = depth、每層單元/通道 = width/capacity、activation 負責非線性與輸出型態；過深/過寬會增加容量、參數、計算成本與過擬合風險。
- 訓練前配置快判：分類 loss 常配 cross-entropy，回歸 loss 常配 MSE/MAE；Adam 是常見自適應 optimizer，SGD 概念最基本；Xavier/Glorot、He 是常見初始化策略。
- Bias-Variance 在本課應作「模型選擇判斷」：模型太簡單 → 高偏差/欠擬合；模型太複雜且資料少 → 高變異/過擬合；資料量、模型容量、正則化需求一起判斷。

## Scope Notes
- L23302 可講「選什麼模型、架構如何定義、訓練前 loss/optimizer/initializer 怎麼選」；不要深入 epoch、batch training、learning curve 診斷與 validation protocol，這些屬 L23303。
- Hyperparameter tuning loops（Grid Search、Random Search、Bayesian Optimization、AutoML 搜尋流程）屬 L23304；本課最多提到它們是後續調校方法，不當主軸。
- Optimizer 數學推導、Adam bias correction 公式、backpropagation、梯度消失完整推導不應放入主 findings；考試重點是辨識與情境配對。
- Regularization、Dropout、Early Stopping 可作為過擬合陷阱提示，但深入比較與調整策略屬 L23304 / L23303。
- 找不到 iPAS 官方針對 L23302 的 FAQ 或白皮書；可靠官方來源主要是學習指引、勘誤表、公告試題。

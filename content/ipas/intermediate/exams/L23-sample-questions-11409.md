# L23 機器學習技術與應用 — 考試情報參考檔

> 本檔為研究員 (researcher) 使用的社群考試情報彙整。
> 來源：2026-06 研究，基於真實考生心得與官方樣題更新。
> **不可直接引用為教材內容** — 作為研究起點，researcher 應自行查證。

---

## 官方資源

- **114年9月樣題更新（45題，每科15題）** — 目前最接近考試風格的官方參考
  - 整理分析：https://vocus.cc/article/68cfb814fd897800012a73ab
- **學習指引重點彙整分析** — 官方學習指引的結構解析
  - https://vocus.cc/article/68ecd196fd89780001f5c8f1
- **L21/L22/L23 科目選擇與題庫解析**
  - https://aiterms.tw/ipas/L2/

---

## 真實考試回報（2026-05-17 場次）

來源：https://vocus.cc/article/68288518fd89780001cf1c5f

### 實際出現的題型
- 約 25% 為程式判讀題（~12-13 題），Python/sklearn 5-10 行程式碼片段
- **新題型確認：程式步驟排序題** — 給定打亂的 ML pipeline 步驟，要求排成正確順序
  - 典型場景：「顧客年齡+消費 → 預測高價值顧客，以下程式碼步驟何者順序正確？」
  - 正確順序：load → preprocess → split → scale → fit → predict → evaluate

### 重點主題（按出現頻率）

**L232 機器學習與深度學習（高頻）**
- CNN 架構：pooling layer 功能、Inception/ResNet/VGG 設計差異
- LSTM 時間序列、RNN vs Transformer 取捨
- SVM kernel 選擇
- 決策樹 vs 隨機森林比較
- batch size 效應（64 → 256 會發生什麼）
- 激活函數：ReLU、Sigmoid vs Softmax 使用時機
- Batch Normalization 目的與位置

**L233 建模與參數調校（高頻）**
- 混淆矩陣指標：Accuracy、F1、Precision、Recall — **有計算題（實際數字）**
- cross_val_score() 回傳 array，不是 mean — 重要考點
- 過擬合/欠擬合診斷；L1 vs L2 正則化；Dropout
- SMOTE 與類別不平衡處理
- StandardScaler：mean=0, std=1 — 出現在程式判讀情境
- loss function 選擇（回歸 vs 分類）

**L234 機器學習治理（比預期重，佔比約 25%）**
- GDPR 被遺忘權（right to erasure / machine unlearning）
- 差分隱私（Differential Privacy）— 考生驚訝此主題出現，需理解 ε (epsilon) 隱私預算
- 公平性指標：Demographic Parity vs Equal Opportunity 區別
- 演算法偏見與事後去偏方法
- 模型漂移監控與再訓練觸發

**L231 基礎數學（中頻）**
- 梯度下降與 Adam 優化器概念
- PCA（最大變異數原則）
- 矩陣乘法 / 前向傳播計算（有計算題）
- 貝氏定理基礎

---

## 已知官方學習指引錯誤（Critical — 必須修正）

| 指標 | 官方指引（錯誤） | 正確公式 |
|---|---|---|
| Recall（召回率） | TP/(TP+FP) | **TP/(TP+FN)** |

社群強烈標記此錯誤，考試按正確公式出題，勿信官方指引。

---

## 高頻比較題型（易混淆配對）

| 配對 | 考試判斷關鍵 |
|---|---|
| L1 vs L2 正則化 | L1 → 稀疏特徵選擇；L2 → 平滑縮小所有權重 |
| Sigmoid vs Softmax | Sigmoid → 二元分類；Softmax → 多類別分類 |
| Demographic Parity vs Equal Opportunity | DP → 預測分布相同；EO → TPR 相同 |
| Batch Normalization vs Layer Normalization | BN → batch 維度；LN → 特徵維度（Transformer 用） |
| BERT vs GPT（架構差異） | BERT → encoder-only/MLM；GPT → decoder-only/Causal LM |

---

## 情境題常見模式

| 題目場景描述 | 正確答案方向 |
|---|---|
| 資料集類別嚴重不平衡 | SMOTE / 重採樣 |
| 醫療影像腫瘤邊界偵測 | Instance Segmentation |
| 模型訓練好但測試差 | 過擬合 → 正則化/Dropout/更多資料 |
| GDPR 使用者要求刪除其資料影響 | Machine Unlearning（機器遺忘） |
| 需在訓練過程中保護使用者隱私 | 差分隱私（Differential Privacy） |
| 模型在某族群表現明顯較差 | 演算法偏見 → 去偏處理 |
| 時間序列預測 | LSTM / GRU |

---

## 程式判讀常見 Pattern（sklearn 慣用語）

```python
# Pipeline 組合 — 最常見 pattern
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)

# cross_val_score 回傳 array，不是 mean！
scores = cross_val_score(pipe, X, y, cv=5)
print(scores)        # array([0.85, 0.88, 0.82, 0.87, 0.84])
print(scores.mean()) # 需要自己 .mean()
```

```python
# SMOTE 不平衡處理
from imblearn.over_sampling import SMOTE
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X_train, y_train)
```

---

## 通過率資訊（參考）

- 114年第1場：70.88%
- 114年第2場：45.28%

難度在不同場次間差異顯著；不要只憑通過率判斷備考充分度。

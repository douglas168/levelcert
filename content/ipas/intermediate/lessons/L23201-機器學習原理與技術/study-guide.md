# L23201 機器學習原理與技術 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」第二大主題 L232。中級起點在**學習機制的數學原理**，所以這份指南不會重講「什麼是監督式學習」（那是初級 L113 的事），也不會深入特定演算法內部（那是 L23202/L23203 的事）。我們直接進入損失函數、偏差-變異數分解、與驗證技術。

---

## Section 1: Exam Item Mapping

### 1a. 對應評鑑範圍

> 對應評鑑範圍：**L23201 機器學習原理與技術**（L232 機器學習與深度學習）

---

### 1b. How to Study This Chapter

1. **先讀 Section 2（知識樹）** — 用 3 分鐘建立全局輪廓，不求背，只求看懂三大支柱。
2. **接著讀 Section 3.1（基礎理論）** — 最高頻考點在這，損失函數與 bias-variance 要能應用到情境。
3. **讀 Section 3.3（驗證技術）** — `cross_val_score` 回傳 array 是確認考點，Code Pattern 必看。
4. **讀 Section 3.2（機率推論）** — 概念識別層級即可，不需推導；用 5 分鐘掃過定義。
5. **過 Section 4（比較表）** — L1 vs L2、過擬合 vs 欠擬合、validation vs test set 三組最重要。
6. **最後看 Section 6（陷阱）+ Section 7（快判）** — 考前複習用。

---

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

---

### 1d. 學習目標

讀完本章你應該能：

1. 給定一個訓練誤差低、測試誤差高的情境，立即判斷是過擬合並說出對應補救方法。
2. 根據任務類型（回歸 or 分類）選擇正確的損失函數（MSE、Cross-entropy）並說明理由。
3. 解釋 bias-variance tradeoff：高複雜度模型為何 variance 高、低複雜度為何 bias 高。
4. 說明 L1 vs L2 正則化各自對權重的效果（L1 稀疏 / L2 縮小）及適用情境。
5. 描述 k-fold cross-validation 的流程，並說明 `cross_val_score` 回傳的是 array 而非單一數值。
6. 區分 validation set 與 test set 的角色，並解釋為何不能用 test set 調超參數。

---

### 1e. 考點權重

| 考點 | 權重 | 出處 |
|---|---|---|
| 損失函數選擇（MSE/Cross-entropy） | 🔥🔥🔥 | 樣題 Q11、真實考場回報 |
| 過擬合 vs 欠擬合診斷 | 🔥🔥🔥 | 樣題 Q3、真實考場高頻 |
| Bias-Variance 分解概念 | 🔥🔥🔥 | 官方學習指引核心 |
| L1 vs L2 正則化比較 | 🔥🔥🔥 | 真實考場確認高頻 |
| K-fold cross-validation 流程 | 🔥🔥🔥 | 官方樣題、社群整理 |
| `cross_val_score` 回傳 array | 🔥🔥🔥 | 明確標記考點（aiterms.tw） |
| Train/Val/Test 分割角色 | 🔥🔥🔥 | 官方學習指引 |
| MLE/MAP 概念識別 | 🔥🔥 | 機率推論、貝氏框架 |
| Stratified k-fold 適用情境 | 🔥🔥 | 類別不平衡情境題 |
| Bootstrap 概念 | 🔥 | 知道存在即可 |
| LOO cross-validation | 🔥 | 知道存在即可 |

---

### 1f. 先備知識

- **初級 L113**（機器學習概念）：假設你已知道監督式 / 非監督式 / 強化學習的分類，本章不再重講。
- **L23101**（機率統計基礎）：條件機率、期望值概念 — 3.2 機率推論的前置知識。
- **L23102**（線性代數）：向量/矩陣概念 — 損失函數理解的背景知識，不需計算。
- **L23103**（數值優化）：梯度下降概念 — 理解「最小化損失函數」的方向。

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [偏差-變異數權衡曲線](diagrams/01-bias-variance-tradeoff.md) | 顯示模型複雜度如何驅動 bias-variance-error 權衡 |
| 2 | [訓練/驗證/測試分割流程](diagrams/02-train-val-test-split.md) | 顯示各資料集角色與從資料到最終評估的流程 |
| 3 | [K折交叉驗證輪轉圖](diagrams/03-kfold-rotation.md) | 顯示 k-fold 如何在 k 次迭代中輪轉保留折 |
| 4 | [損失函數比較圖](diagrams/04-loss-function-comparison.md) | 視覺化比較 MSE vs cross-entropy — 各自適用情境 |
| 5 | [過擬合診斷學習曲線](diagrams/05-overfitting-learning-curves.md) | 顯示欠擬合/正好/過擬合三種訓練 vs 驗證誤差曲線 |

---

## Section 2: 關鍵概念總覽圖

這張圖不是要一次背完。先抓 3 層就好：

1. **頂層：三大支柱** — 基礎理論（學習如何運作）、機率推論（用機率語言建模）、驗證技術（如何確認模型真的學到東西）
2. **第二層：每根支柱的核心子題** — 損失函數、過擬合/欠擬合、bias-variance / MLE、MAP、Bayesian / train-val-test、k-fold、stratified
3. **第三層：考試直接問的細節** — MSE vs cross-entropy、L1 vs L2、k-fold vs LOO、`cross_val_score` 回傳型態

讀下面的樹狀圖時，先看三大主幹（基礎理論/機率推論/驗證技術），再看常考的葉節點（MSE、cross-entropy、bias-variance、k-fold）。

```
L23201 機器學習原理與技術
│
├── 3.1 機器學習基礎理論
│   ├── 學習問題框架
│   │   ├── 訓練誤差（training error）
│   │   ├── 泛化誤差（generalization error）
│   │   └── 誤差差距（gap） ← 過擬合信號
│   │
│   ├── 損失函數（Loss Function）🔥🔥🔥
│   │   ├── MSE（均方誤差）← 回歸任務
│   │   ├── Cross-entropy / Log loss ← 分類任務
│   │   │   ├── Binary cross-entropy ← 二元分類
│   │   │   └── Categorical cross-entropy ← 多類別
│   │   └── Hinge loss ← SVM
│   │
│   ├── 過擬合 vs 欠擬合 🔥🔥🔥
│   │   ├── 過擬合（Overfitting）= 高 Variance
│   │   │   ├── 診斷：訓練低、測試高
│   │   │   └── 補救：正則化、更多資料、Dropout
│   │   └── 欠擬合（Underfitting）= 高 Bias
│   │       ├── 診斷：訓練高、測試也高（兩個都爛）
│   │       └── 補救：更複雜模型、更多特徵
│   │
│   ├── Bias-Variance 分解 🔥🔥🔥
│   │   ├── E[誤差] = Bias² + Variance + 不可約誤差
│   │   ├── 高複雜度 → 低 Bias、高 Variance
│   │   └── 低複雜度 → 高 Bias、低 Variance
│   │
│   └── 正則化（Regularization）🔥🔥
│       ├── L1（Lasso）→ 稀疏、特徵選擇
│       └── L2（Ridge）→ 縮小所有權重、平滑
│
├── 3.2 機率推論
│   ├── 機率建模框架
│   │   └── 模型輸出 = 機率分布（非確定值）
│   │
│   ├── MLE（最大似然估計）🔥🔥
│   │   └── 找 θ 使 P(data|θ) 最大
│   │
│   ├── MAP（最大後驗估計）🔥
│   │   └── MLE + 先驗（prior）= 有正則化效果的 MLE
│   │
│   └── 貝氏推論概念 🔥
│       └── 後驗 ∝ 似然 × 先驗
│
└── 3.3 模擬驗證技術
    ├── Train / Val / Test 分割 🔥🔥🔥
    │   ├── 訓練集（Train）← 模型學習用
    │   ├── 驗證集（Validation）← 超參數調整用
    │   └── 測試集（Test）← 最終無偏評估（只用一次！）
    │
    ├── K-fold 交叉驗證 🔥🔥🔥
    │   ├── 演算法：k 次輪轉，每次一折為驗證集
    │   ├── 回傳：k 個分數的 array（非 mean）
    │   └── `cross_val_score(model, X, y, cv=5)`
    │
    ├── Stratified K-fold 🔥🔥
    │   └── 類別不平衡時使用，保持類別比例
    │
    ├── Leave-One-Out（LOO）🔥
    │   └── k = n，超慢，小資料集用
    │
    └── Bootstrap 🔥
        └── 有放回抽樣，估計模型穩定性
```

---

## Section 3: Core Concepts

### 3.1 機器學習基礎理論（ML Foundations）🔥🔥🔥

**先懂一句話：** 學習 = 在訓練資料上最小化損失，但真正的目標是在沒見過的資料上也表現好。

**它在流程中的位置：** 資料收集 → 特徵工程 → **[定義損失函數 → 最佳化 → 評估泛化]** → 調參 → 部署

---

#### 學習問題框架

機器學習（Machine Learning, ML）的本質是：給定訓練資料 (X_train, y_train)，找到一個函數 f，使得在**未見過的資料**上的預測誤差最小。

```
訓練誤差（Training Error）  ← 模型在訓練集上的錯誤率
泛化誤差（Generalization Error） ← 模型在真實世界（新資料）上的錯誤率
誤差差距（Gap）= 泛化誤差 - 訓練誤差  ← 差距大 → 過擬合信號
```

🗣️ 白話說明：就像你在 7-11 打工，師傅教你的 SOP（訓練資料）你背得滾瓜爛熟（訓練誤差低）。但換一家店你完全不知道東西放哪（泛化誤差高）— 這就是過擬合：只背住了「那家店」的規則，沒學到通用原則。

---

#### 損失函數（Loss Function）🔥🔥🔥

損失函數（Loss Function）衡量模型預測與真實值之間的差距，是「機器學習目標」的數學表達。

| 損失函數 | 適用任務 | 直覺 |
|---|---|---|
| **MSE**（均方誤差, Mean Squared Error） | 回歸（Regression） | 預測房價，差多少平方懲罰 |
| **Binary Cross-entropy**（二元交叉熵） | 二元分類（Binary Classification） | 預測是/否，懲罰錯誤的信心 |
| **Categorical Cross-entropy**（類別交叉熵） | 多類別分類（Multi-class） | 預測貓/狗/鳥，多選一情境 |
| **Hinge loss**（鉸鏈損失） | SVM | 只用在 SVM，不在深度學習 |

$$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

$$\text{Cross-entropy} = -\sum_{i} y_i \log(\hat{y}_i)$$

🗣️ 白話說明：MSE 就像你猜朋友在 IG 上的粉絲數，猜錯 100 人比猜錯 10 人要被扣更多分（平方放大誤差）。Cross-entropy 是猜「這位網紅今天會不會發文」，你越有信心猜錯，罰得越重。

---

#### 過擬合（Overfitting）vs 欠擬合（Underfitting）🔥🔥🔥

```
                  訓練誤差    驗證/測試誤差
欠擬合（高 Bias）   高           高       ← 兩個都爛
正好（Good Fit）    低           低       ← 理想
過擬合（高 Variance） 低        高       ← 訓練棒、現實爛
```

**學習曲線（Learning Curves）診斷：**

```
誤差
 |  訓練誤差       驗證誤差
 |  ___________      _______________
 | /           \    /
 |/             \  /   ← 差距越大 = 過擬合
 +--------------------------------→ 訓練資料量
```

- 過擬合補救：L1/L2 正則化、Dropout（神經網路）、增加訓練資料、減少特徵數
- 欠擬合補救：增加模型複雜度、增加特徵、延長訓練時間

🗣️ 白話說明：過擬合就像有個同學只背歷屆考古題答案，期末考遇到「同類型但不同數字」的題目就傻了。欠擬合是連課本都沒讀完，考古題也錯很多。

---

#### Bias-Variance 分解（偏差-變異數分解）🔥🔥🔥

$$E[\text{誤差}] = \text{Bias}^2 + \text{Variance} + \text{不可約誤差（Irreducible Noise）}$$

| 名詞 | 意思 | 直覺 |
|---|---|---|
| **Bias（偏差）** | 模型假設太簡單，系統性偏離真實值 | 瞄準靶心但每次都偏左 |
| **Variance（變異）** | 模型對訓練資料變動太敏感，每次預測差很多 | 彈孔散落各處 |
| **不可約誤差** | 資料本身的噪音，任何模型都無法消除 | 靶本身在晃 |

```
模型複雜度低 → Bias 高、Variance 低（欠擬合）
模型複雜度高 → Bias 低、Variance 高（過擬合）
最佳複雜度 → Bias² + Variance 總和最小
```

🗣️ 白話說明：你在蝦皮開店，用「昨天賣了多少」預測今天銷量（超簡單模型）→ 偏差大（週末效應沒考慮到）。你用「昨天每小時銷量 + 天氣 + 時事 + 廣告」預測（超複雜模型）→ 變異大（今天訓練的模型跟昨天差很多，不穩定）。

---

#### 正則化（Regularization）🔥🔥

正則化（Regularization）是對損失函數加入懲罰項，防止模型過度擬合訓練資料。

| 種類 | 全名 | 懲罰項 | 效果 |
|---|---|---|---|
| **L1**（Lasso） | Least Absolute Shrinkage | \|w\| | 讓部分權重**歸零**（稀疏），等於自動特徵選擇 |
| **L2**（Ridge） | Ridge Regression | w² | 所有權重**均勻縮小**，不歸零，平滑效果 |

🗣️ 白話說明：考試前你要精簡筆記。L1 像「只留重要的章節，其他直接刪掉」（稀疏）。L2 像「每個章節都縮短一點，但都還在」（均勻縮小）。

---

#### 情境題 Scenario Bank

| 情境描述 | 正確判斷 | 關鍵線索 |
|---|---|---|
| 模型在訓練集準確率 98%，但測試集只有 62% | 過擬合（Overfitting）→ 加 L2 正則化或增加資料 | 訓練低、測試高 = 過擬合 |
| 模型訓練集 65%、測試集 63%，都不理想 | 欠擬合（Underfitting）→ 換更複雜模型或增加特徵 | 兩個都低 = 欠擬合 |
| 做回歸任務預測房價，選哪個損失函數？ | MSE（均方誤差） | 回歸 → MSE |
| 做二元分類判斷郵件是否為垃圾郵件，選哪個損失函數？ | Binary Cross-entropy | 二元分類 → Binary CE |
| 想讓模型自動忽略不重要的特徵，用哪種正則化？ | L1（Lasso）— 稀疏歸零 | 特徵選擇 → L1 |
| 模型權重很多但不想讓任何一個特徵被完全忽略，用哪種正則化？ | L2（Ridge）— 均勻縮小 | 不要歸零 → L2 |

---

#### Code Pattern 認識就夠

```python
from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# 訓練測試分割
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 訓練模型（Ridge = L2 正則化）
model = Ridge(alpha=1.0)
model.fit(X_train, y_train)

# 診斷過擬合：訓練誤差 vs 測試誤差
train_error = mean_squared_error(y_train, model.predict(X_train))
test_error  = mean_squared_error(y_test,  model.predict(X_test))

# 如果 train_error 遠小於 test_error → 過擬合！
print(f"Train MSE: {train_error:.4f}, Test MSE: {test_error:.4f}")
```

---

### 3.2 機率推論（Probabilistic Inference）🔥🔥

**先懂一句話：** 機率推論把 ML 模型的輸出視為「對不確定性的分布」，而不是單一確定的預測值。

**它在流程中的位置：** 問題定義 → **[選擇機率模型框架 → 定義 prior/likelihood → 用 MLE/MAP 估計參數]** → 預測

---

#### 機率建模框架

傳統 ML：輸入 X → 輸出確定值 ŷ
機率 ML（Probabilistic ML）：輸入 X → 輸出分布 P(y|X, θ)

🗣️ 白話說明：一般模型說「這張圖是貓的機率是 0.87」，而機率推論框架更嚴格：它不只給你一個數字，而是問「這個 0.87 有多可信？考慮你之前的先驗知識，答案會怎麼修正？」— 就像你 LINE 上問朋友「這部電影好看嗎？」，你會同時考慮他說的（likelihood）和你對他品味的了解（prior）。

---

#### MLE（最大似然估計, Maximum Likelihood Estimation）🔥🔥

$$\hat{\theta}_{MLE} = \arg\max_{\theta} P(\text{data} | \theta)$$

- **目標**：找到參數 θ，使觀測到的訓練資料出現機率最大
- **直覺**：「哪組參數最能解釋我看到的資料？」
- **特性**：不考慮任何事先對 θ 的假設（無 prior）

🗣️ 白話說明：你在蝦皮買了 10 個賣家的商品，有 8 個準時到。MLE 就是算：「如果這個賣家的準時率是 θ，在 10 次中觀察到 8 次準時的機率最大時，θ 是多少？」答案是 θ=0.8（直觀上就是樣本比例）。

---

#### MAP（最大後驗估計, Maximum A Posteriori）🔥

$$\hat{\theta}_{MAP} = \arg\max_{\theta} P(\theta | \text{data}) = \arg\max_{\theta} P(\text{data}|\theta) \cdot P(\theta)$$

- **目標**：找到參數 θ，同時考慮資料（likelihood）和事先知識（prior）
- **對比 MLE**：MAP = MLE + Prior
- **效果**：先驗（Prior）的加入，等同於對參數加入正則化

🗣️ 白話說明：同樣是蝦皮賣家，你知道這個賣家以前被很多人投訴（prior：準時率應該不高）。MAP 就是把這個先驗知識也考慮進去，就算觀測到 8/10 準時，你估計的準時率也不會直接給 0.8，而是受 prior 拉低一點。

---

#### 貝氏推論（Bayesian Inference）🔥

$$P(\theta | \text{data}) \propto P(\text{data}|\theta) \cdot P(\theta)$$

| 名詞 | 符號 | 意思 |
|---|---|---|
| **Prior（先驗）** | P(θ) | 看資料前對 θ 的信念 |
| **Likelihood（似然）** | P(data\|θ) | 給定 θ，資料有多可能出現 |
| **Posterior（後驗）** | P(θ\|data) | 看到資料後更新的信念 |

- **MAP vs 完整貝氏推論**：MAP 只找後驗分布的**最高點**（點估計），完整貝氏推論使用整個後驗**分布**
- **何時重要**：不確定性量化（醫療 AI、風險評估）需要完整後驗，一般 ML 用 MLE/MAP 即可

---

#### 情境題 Scenario Bank

| 情境描述 | 正確判斷 | 關鍵線索 |
|---|---|---|
| 想找最能解釋訓練資料的模型參數，不考慮任何先驗知識 | MLE（最大似然估計） | 無 prior → MLE |
| 在資料量很少時，想把領域知識（prior）融入參數估計 | MAP（最大後驗估計） | 有 prior + 資料少 → MAP |
| 醫療影像診斷系統需要輸出「診斷的不確定性範圍」，不只是一個數字 | 完整貝氏推論 | 需要分布而非點估計 → Bayesian |
| 後驗 ∝ 似然 × 先驗，這是什麼公式？ | 貝氏定理（Bayes' Theorem） | 識別公式結構 |

> 此小節無對應程式 pattern — 機率推論在 L23201 以概念識別層級出題，不考程式碼。

---

### 3.3 模擬驗證技術（Simulation & Validation Techniques）🔥🔥🔥

**先懂一句話：** 驗證技術回答的問題是「模型的表現是真實的，還是我碰巧用了有利的資料？」

**它在流程中的位置：** 資料準備 → 模型訓練 → **[資料分割 → 交叉驗證 → 選模型/調超參數 → 最終測試]** → 部署

---

#### Train / Validation / Test 分割 🔥🔥🔥

| 資料集 | 角色 | 使用時機 | 可重複使用？ |
|---|---|---|---|
| **訓練集（Train）** | 模型學習 | 每個 epoch 都用 | ✅ 是 |
| **驗證集（Validation）** | 超參數調整、早停（early stopping） | 每次調參後評估 | ⚠️ 有限次（避免 leakage） |
| **測試集（Test）** | 最終無偏評估，模擬真實世界表現 | 只用**一次**，在所有調參結束後 | ❌ 不能重複用來調參 |

常見比例：
- 70/15/15（訓練/驗證/測試）
- 80/10/10（資料量大時）

**Data Leakage（資料洩漏）警告：**

> 如果用測試集來選超參數或選模型，你的「最終評估」就已經偏樂觀了 — 因為你在測試集上做了隱性的「訓練決策」。

🗣️ 白話說明：期末考的題目你要到考場才能看到。如果你在念書時就提前看到一部份「考試題目」，然後說你拿到高分 — 這分數有參考價值嗎？測試集就是這道「考場題目」，只能最後用一次。

---

#### K-fold 交叉驗證（K-fold Cross-Validation）🔥🔥🔥

**演算法步驟：**

```
資料集 D（n 筆）
↓
分成 k 個等大的折（fold）
↓
重複 k 次：
  - 第 i 次：用 fold i 當驗證集，其餘 k-1 個折當訓練集
  - 訓練模型 → 記錄驗證分數
↓
回傳：k 個驗證分數（array）
最終報告：mean ± std
```

```
K=5 示意：
Fold 1: [VAL][TRN][TRN][TRN][TRN]  → 分數 s1
Fold 2: [TRN][VAL][TRN][TRN][TRN]  → 分數 s2
Fold 3: [TRN][TRN][VAL][TRN][TRN]  → 分數 s3
Fold 4: [TRN][TRN][TRN][VAL][TRN]  → 分數 s4
Fold 5: [TRN][TRN][TRN][TRN][VAL]  → 分數 s5
                   ↓
        報告：mean([s1,s2,s3,s4,s5]) ± std(...)
```

**何時用：** 資料量少、需要穩健的模型評估（每筆資料都當過驗證集）

---

#### Stratified K-fold（分層 K 折）🔥🔥

- 適用：類別**不平衡**（Imbalanced Classes）資料集
- 功能：確保每個折的**類別比例**與整體資料集相同
- 例：正例 10%、負例 90% → 每折都保持 10%/90% 比例

🗣️ 白話說明：你在調查校內手機使用習慣，全校有 10% iPhone、90% Android。如果你隨機抽樣，有可能某一折全是 Android 用戶，那這折的評估就有偏誤。Stratified k-fold 確保每折的比例跟全校一樣。

---

#### Leave-One-Out（LOO）🔥

- k = n（n 為資料集大小）
- 每次只留 1 筆當驗證集，訓練集有 n-1 筆
- 優點：充分利用資料
- 缺點：計算量極大（n 個模型），只適合極小資料集（n < 50）

---

#### Bootstrap 🔥

- 有放回抽樣（Sampling with Replacement）
- 從 n 筆資料中抽 n 次（有放回），形成「bootstrap 樣本」
- 用於估計模型穩定性、信賴區間
- 考試：知道「有放回抽樣」定義即可

---

#### 情境題 Scenario Bank

| 情境描述 | 正確判斷 | 關鍵線索 |
|---|---|---|
| 看到 `scores = cross_val_score(model, X, y, cv=5)`，scores 是什麼型態？ | numpy array，長度為 5；要用 `scores.mean()` 取均值 | cross_val_score 回傳 array |
| 資料集只有 200 筆，怕 holdout 評估太不穩定 | 用 k-fold（如 k=10）交叉驗證 | 資料少 → k-fold |
| 分類任務，正例只有 5%，如何做交叉驗證？ | 用 Stratified K-fold，保持每折 5% 正例比例 | 類別不平衡 → Stratified |
| 資料集只有 30 筆，需要最大化訓練資料利用 | LOO（Leave-One-Out），k=30 | 極少資料 → LOO |
| 工程師在調完超參數後，用同一個測試集確認表現，並想再次調整。可以嗎？ | 不可以 — 這是 data leakage，測試集只能用一次 | 測試集 = 只用一次 |
| ML pipeline 步驟正確順序？ | load → preprocess → split → scale → fit → predict → evaluate | 2026-05 考場真實出題 |

---

#### Code Pattern 認識就夠

```python
from sklearn.model_selection import (
    train_test_split,
    KFold,
    StratifiedKFold,
    cross_val_score
)
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 1. Holdout 分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. Pipeline（先 scale 再 fit，防止 leakage）
pipe = make_pipeline(StandardScaler(), LogisticRegression())

# 3. K-fold 交叉驗證
# ⚠️ cross_val_score 回傳 array，不是 mean！
scores = cross_val_score(pipe, X_train, y_train, cv=5)
print(scores)         # array([0.85, 0.88, 0.82, 0.87, 0.84])
print(scores.mean())  # 需要自己呼叫 .mean()
print(scores.std())   # 穩定性指標

# 4. Stratified K-fold（類別不平衡時）
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores_strat = cross_val_score(pipe, X_train, y_train, cv=skf)
```

---

## Section 4: Comparison Tables（易混淆概念）

### 比較表 1：MSE vs Cross-Entropy（損失函數選擇）

| | MSE（均方誤差） | Cross-Entropy（交叉熵） |
|---|---|---|
| **適用任務** | 回歸（Regression） | 分類（Classification） |
| **輸出格式** | 連續數值（房價、溫度） | 機率分布（類別標籤） |
| **懲罰邏輯** | 預測值與真實值的距離平方 | 預測分布與真實分布的差距 |
| **變種** | — | Binary CE（二元）/ Categorical CE（多類別） |
| **sklearn 對應** | `mean_squared_error` | `log_loss` |

> 考試快判：看到「回歸」→ MSE；看到「分類」→ Cross-entropy（二元用 Binary；多類別用 Categorical）

---

### 比較表 2：高偏差（High Bias）vs 高變異（High Variance）

| | 高 Bias（偏差）| 高 Variance（變異）|
|---|---|---|
| **別名** | 欠擬合（Underfitting） | 過擬合（Overfitting） |
| **訓練誤差** | 高 | 低 |
| **測試誤差** | 高 | 高 |
| **兩者差距** | 小（都高） | 大（訓練低/測試高）|
| **根本原因** | 模型太簡單 | 模型太複雜，死記訓練資料 |
| **補救** | 更複雜模型、更多特徵 | 正則化、Dropout、更多資料 |

> 考試快判：訓練和測試都高 = 高 Bias；訓練低但測試高 = 高 Variance

---

### 比較表 3：Overfitting vs Underfitting 診斷

| 指標 | Underfitting（欠擬合） | Good Fit | Overfitting（過擬合） |
|---|---|---|---|
| 訓練準確率 | 低 | 高 | 非常高 |
| 驗證/測試準確率 | 低 | 接近訓練準確率 | 明顯低於訓練 |
| 學習曲線 | 兩條線都在高誤差區 | 兩條線收斂且靠近 | 兩條線越拉越遠 |
| 補救方向 | ↑ 增加複雜度 | — | ↓ 減少複雜度 / 正則化 |

> 考試快判：「訓練誤差低但測試誤差高」= 過擬合（樣題 Q3 原型）

---

### 比較表 4：Validation Set vs Test Set

| | 驗證集（Validation Set） | 測試集（Test Set） |
|---|---|---|
| **角色** | 超參數調整、模型選擇 | 最終無偏效能評估 |
| **使用時機** | 訓練過程中、多次 | 所有決策完成後，只用**一次** |
| **可重複使用？** | 有限次（避免 leakage） | 絕對不能用來做任何選擇 |
| **洩漏風險** | 超參數搜索時間長可能 overfit val | 一旦用來決策就污染了 |

> 考試快判：超參數搜索 → 看驗證集；最終報告模型成效 → 只看測試集（且只看一次）

---

### 比較表 5：K-fold vs LOO

| | K-fold（K 折交叉驗證）| LOO（留一法）|
|---|---|---|
| **k 值** | 通常 5 或 10 | k = n（樣本數）|
| **每次訓練集大小** | (k-1)/k × n | n-1 |
| **計算成本** | 中等 | 極高（需訓練 n 個模型）|
| **適用資料量** | 中至大（100 筆以上） | 極小（< 50 筆）|
| **偏差** | 略高於 LOO | 幾乎無偏 |
| **方差** | 較低（穩定） | 較高（依賴單筆資料）|

> 考試快判：資料量超少（< 50）→ LOO；一般情況 → k=5 或 k=10 的 k-fold

---

### 比較表 6：L1（Lasso）vs L2（Ridge）正則化

| | L1 正則化（Lasso） | L2 正則化（Ridge） |
|---|---|---|
| **懲罰項** | Σ\|w_i\| | Σw_i² |
| **對權重的效果** | 部分權重變成**零**（稀疏） | 所有權重**均勻縮小**，不歸零 |
| **功能** | 自動特徵選擇 | 防止任一特徵主導，平滑 |
| **適用情境** | 特徵很多，想自動篩選 | 特徵都有用，不想刪除任何一個 |
| **sklearn** | `Lasso(alpha=1.0)` | `Ridge(alpha=1.0)` |

> 考試快判：「稀疏」/「特徵選擇」→ L1；「縮小所有權重」/「不歸零」→ L2

---

## Section 5: 口訣 / Mnemonics

### 損失函數選擇口訣

```
回歸用均方（MSE）
分類用交叉熵（CE）
二選一用 Binary，
多選一用 Categorical
SVM 才用 Hinge
```

---

### Bias-Variance 記憶勾

```
Bias = 偏心（系統性偏離目標）
Variance = 不穩定（每次射偏不同方向）

高複雜 → 低 Bias 高 Variance（會考，不穩）
低複雜 → 高 Bias 低 Variance（不會但穩）
```

快速口訣：**「複雜 Bias 低 Var 高，簡單 Bias 高 Var 低」**

---

### Train/Val/Test 角色口訣

```
Train = 學   → 每次都用
Val   = 調   → 調超參數，有限次
Test  = 考   → 只考一次，考完不能翻
```

「**學 → 調 → 考（只考一次）**」— 測試集就是大學聯考，交卷就不能改了。

---

### K-fold vs LOO 選擇口訣

```
資料多 → K-fold（k=5 或 10）
資料少（< 50）→ LOO
都不確定 → K-fold（k=10）是最安全的預設
```

---

### cross_val_score 陷阱口訣

```
scores = cross_val_score(...)
scores 是 array，不是 mean！
要 mean 自己 .mean()，
要 std 自己 .std()
```

---

## Section 6: 考試陷阱（Exam Traps）

#### 陷阱 1：cross_val_score 回傳的不是 mean

❌ 錯誤認知：`cross_val_score(model, X, y, cv=5)` 回傳的是平均分數 0.85

✅ 正確：回傳 numpy array，長度為 5（每折一個分數）。要取均值需自己呼叫 `.mean()`

```python
scores = cross_val_score(model, X, y, cv=5)
# scores = array([0.85, 0.88, 0.82, 0.87, 0.84])  ← array!
print(scores.mean())  # 0.852 ← 需要自己算
```

---

#### 陷阱 2：測試集絕對不能用來調超參數

❌ 錯誤：「我用測試集評估，發現準確率低，所以我調高了 C 值，再評估一次。」

✅ 正確：超參數調整必須使用**驗證集**（或 cross-validation）。測試集只在所有決策完成後使用一次，否則即為 data leakage（資料洩漏）。

---

#### 陷阱 3：訓練準確率高 ≠ 好模型

❌ 錯誤：「訓練準確率 99%，這個模型很棒！」

✅ 正確：必須同時看測試集準確率。訓練高但測試低 = 過擬合，不是好模型。**考試原型：樣題 Q3**

---

#### 陷阱 4：L1 vs L2 效果混淆

❌ 錯誤：L1 讓所有權重縮小；L2 讓部分權重歸零

✅ 正確：
- L1（Lasso）→ **部分歸零**（稀疏、特徵選擇）
- L2（Ridge）→ **均勻縮小**（不歸零、平滑）

---

#### 陷阱 5：MAP ≠ 完整貝氏推論

❌ 錯誤：「MAP 就是貝氏推論。」

✅ 正確：MAP 是後驗分布的**最高點（點估計）**，完整貝氏推論使用整個**後驗分布**。MAP 比 MLE 多了 prior，但仍是點估計。

---

#### 陷阱 6：驗證集 ≠ 測試集

❌ 錯誤：「我把資料分成訓練集和測試集，用測試集調參，最後再用測試集報告結果。」

✅ 正確：應分成三份。驗證集調參、測試集只報告最終結果。「test set 就是最終考試卷，不是練習卷。」

---

## Section 7: 情境題快速判斷（Quick-Judge）

| 關鍵字（≤5 詞） | 直接答案 |
|---|---|
| 訓練低 測試高 | 過擬合 → 正則化 / 更多資料 |
| 訓練高 測試也高 | 欠擬合 → 換更複雜模型 |
| 回歸 損失函數 | MSE（均方誤差） |
| 分類 損失函數 | Cross-entropy |
| 二元分類 損失 | Binary Cross-entropy |
| 多類別分類 損失 | Categorical Cross-entropy |
| 稀疏 特徵選擇 | L1 正則化（Lasso） |
| 縮小所有權重 | L2 正則化（Ridge） |
| cross_val_score 回傳型態 | array（不是 mean） |
| 類別不平衡 交叉驗證 | Stratified K-fold |
| 資料量少 超少 | LOO（Leave-One-Out） |
| 資料量少 一般 | K-fold（k=5 或 10） |
| 測試集 調超參數 | ❌ 不可以 — data leakage |
| 超參數調整 用哪個集 | 驗證集（Validation Set） |
| ML pipeline 正確順序 | load→preprocess→split→scale→fit→predict→evaluate |
| 找使資料最大可能的參數 | MLE（最大似然估計） |
| MLE + 先驗知識 | MAP（最大後驗估計） |
| 後驗 ∝ 似然 × 先驗 | 貝氏定理（Bayes' Theorem） |
| Bias² + Variance + 噪音 | 期望誤差分解（Bias-Variance 分解） |
| 高複雜度 Bias Variance | Bias 低、Variance 高 |

---

## Section 8: 結尾：快速自我檢查 ✅

考前給自己 5 分鐘，每題問自己「30 秒內能說出來嗎？」

- [ ] 給定訓練誤差低、測試誤差高的情境 → 我能在 10 秒內說出「過擬合」和一個補救方法。
- [ ] 回歸任務 vs 二元分類任務 → 我能說出對應的損失函數（MSE / Binary CE）。
- [ ] Bias-Variance 分解的三個項目 → 我能說出 Bias²、Variance、不可約誤差各代表什麼。
- [ ] L1 vs L2 正則化差異 → 我能在 15 秒內說出 L1 稀疏歸零 / L2 均勻縮小。
- [ ] `cross_val_score` 的輸出 → 我能說出「回傳 array，需要 `.mean()` 取均值」。
- [ ] Train / Val / Test 三個集合的角色 → 我能說出各自的用途和「測試集只用一次」。
- [ ] K-fold vs Stratified K-fold → 我能說出「類別不平衡時用 Stratified」。
- [ ] MLE vs MAP 的差別 → 我能說出「MAP = MLE + Prior，多了先驗知識的考量」。

📌 **超出本章範圍（不用在此處深究）：**
- 監督式/非監督式/強化學習的分類定義 → 初級 L113
- 決策樹如何分裂、SVM 如何找邊界、神經網路反向傳播 → L23202/L23203
- 超參數搜索（GridSearchCV、RandomizedSearchCV）→ L23202
- SMOTE 不平衡處理 → L23202/L23203（評估指標範疇）
- Bias-Variance 的數學推導展開 → 超出考試範圍，識別概念即可
- MLE/MAP 的微分求解過程 → 超出考試範圍，識別概念即可

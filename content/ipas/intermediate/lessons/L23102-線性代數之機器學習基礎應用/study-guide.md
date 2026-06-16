# L23102 線性代數之機器學習基礎應用 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」L231 機器學習基礎數學。本章只處理線性代數在機器學習中的基礎應用：向量、矩陣、特徵空間幾何、PCA、SVD、低秩近似；機率與統計基礎是 L23101，資料標準化/正規化的選擇是 L22301，梯度下降與數值優化是 L23103，這些不要在本章過度延伸。

## 1. Exam Item Mapping

### 1a. 對應評鑑範圍

對應評鑑範圍：**L23102 線性代數之機器學習基礎應用**（L231 機器學習基礎數學）

### 1b. How to Study This Chapter

1. 先讀 **Section 2 關鍵概念總覽圖**：先看到整張地圖，知道向量、矩陣、特徵值、PCA、SVD 是同一條線。
2. 再讀 **Section 3.1**：把「樣本是向量、資料集是矩陣」先站穩，後面所有降維都靠這個語言。
3. 接著讀 **Section 3.2 和 3.3**：考試常用「最大變異方向」問 PCA，所以要先懂特徵值與特徵向量。
4. 再讀 **Section 3.4**：SVD 常跟 PCA、資料壓縮、推薦系統、LSA 放在一起比較。
5. 最後讀 **Section 4、Section 6、Section 7**：這三段是考前判斷用，重點是看到關鍵字能選對方法。
6. 考前 10 分鐘只看 **Section 5 口訣** 與 **Section 8 自我檢查**：確認自己能快速說出差異，而不是背一堆公式。

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

1. 說明樣本、特徵、資料集如何表示成向量（Vector）與矩陣（Matrix）。
2. 用白話解釋點積（Dot Product）、餘弦相似度（Cosine Similarity）、範數（Norm）在機器學習中的用途。
3. 判斷特徵值（Eigenvalue）與特徵向量（Eigenvector）在 PCA 中代表什麼。
4. 寫出 PCA（Principal Component Analysis）的 5 個步驟，並用 explained variance ratio 選擇主成分數。
5. 分辨 SVD（Singular Value Decomposition）與 PCA 的關係、差異與應用場景。
6. 在情境題中快速判斷要選 PCA、SVD、t-SNE、UMAP、特徵提取或特徵選擇。

### 1e. 考點權重

| 考點 | 權重（🔥count） | 出處 |
|---|---:|---|
| 樣本向量、資料矩陣、特徵空間幾何 | 🔥🔥 | L23102 syllabus、research notes |
| Dot product、cosine similarity、L1/L2 norm | 🔥🔥 | L23102 research notes、NumPy 程式判讀題型 |
| 矩陣乘法與輸出維度判斷 | 🔥🔥🔥 | L23 sample intelligence：矩陣乘法/前向傳播計算 |
| Embedding 作為幾何向量 | 🔥 | L23102 syllabus、ML feature space |
| 特徵值與特徵向量 Av = λv | 🔥🔥🔥 | L23102 syllabus、PCA 基礎 |
| 對稱矩陣與共變異數矩陣的 eigendecomposition | 🔥🔥 | L23102 research notes |
| PCA 5 步驟與最大變異方向 | 🔥🔥🔥 | L23 sample intelligence：PCA 最大變異數原則 |
| explained variance ratio 與 cumulative variance | 🔥🔥🔥 | L23102 research notes、sklearn PCA pattern |
| SVD: A = UΣV^T | 🔥🔥 | L23102 syllabus、SVD/矩陣分解段落 |
| 低秩近似與資料壓縮 | 🔥🔥 | L23102 syllabus、影像壓縮/推薦系統/LSA |
| PCA vs SVD | 🔥🔥🔥 | L23102 research notes、混淆配對 |
| 特徵提取 vs 特徵選擇 | 🔥🔥 | L23102 syllabus、情境判斷 |
| PCA vs t-SNE/UMAP | 🔥🔥 | L23102 research notes、降維方法段落 |
| NumPy/sklearn code reading | 🔥🔥 | L23 sample intelligence：程式判讀題 |

### 1f. 先備知識

| 先備課程 | 你需要會什麼 | 本章怎麼用 |
|---|---|---|
| L11301 機器學習基本原理 | 知道資料、特徵、模型、預測的基本流程 | 理解「特徵空間」是模型看資料的座標系 |
| L21301 數據準備與模型選擇 | 知道資料會先整理再建模 | 本章只看整理後的特徵矩陣如何被線性變換 |
| L22301 統計學在大數據中的應用 | 知道平均、變異、共變異的基本概念 | PCA 用共變異數矩陣找最大變異方向，但不重教標準化選擇 |
| L23101 機率統計之機器學習基礎應用 | 知道變異量與分布概念 | 本章只借用「變異」語言，不教模型分布假設 |
| L23103 數值優化之機器學習基礎應用 | 知道後面會學優化 | 本章不教梯度下降，只教線性代數底層表示 |

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [向量與矩陣幾何直覺](diagrams/01-vector-matrix-geometry.md) | 展示樣本=向量、資料集=矩陣、點積=相似度、矩陣乘法=維度變換的幾何直覺 |
| 2 | [特徵值與特徵向量幾何圖解](diagrams/02-eigenvalue-eigenvector.md) | 圖解特徵向量在矩陣作用下方向不變的幾何意義，及共變異數矩陣特徵向量 = 最大變異方向 |
| 3 | [PCA 降維步驟流程](diagrams/03-pca-step-by-step.md) | PCA 完整 5 步驟（中心化→共變異數→特徵值分解→排序選k→投影）含 2D 範例追蹤 |
| 4 | [SVD 三矩陣分解解剖](diagrams/04-svd-decomposition.md) | U Σ Vᵀ 三矩陣結構、與 PCA 的關係、低秩近似的空間節省計算 |
| 5 | [降維方法選擇決策樹](diagrams/05-dimensionality-reduction-decision-tree.md) | PCA vs SVD vs t-SNE vs UMAP 的選擇決策流程與方法比較總表 |

## 2. 關鍵概念總覽圖 (Knowledge Tree)

這張圖不是要一次背完。先抓 4 層就好：

1. 第一層：資料如何被表示，樣本是向量，資料集是矩陣。
2. 第二層：矩陣如何改變資料，線性變換會旋轉、縮放、投影特徵空間。
3. 第三層：特徵值、特徵向量、SVD 幫我們找「重要方向」。
4. 第四層：PCA、低秩近似把重要方向拿來做特徵提取、降維、壓縮。

```text
L23102 線性代數之機器學習基礎應用
│
├─ Vectors / Matrices：資料的幾何語言
│  │
│  ├─ 樣本 = 向量（Vector）
│  │  └─ 一筆資料在 d 維特徵空間中的一個點
│  │
│  ├─ 資料集 = 矩陣（Matrix）
│  │  └─ n 個樣本 × d 個特徵 = X(n×d)
│  │
│  ├─ Embedding = 幾何向量
│  │  └─ 文字、商品、使用者可變成向量後比較相似度
│  │
│  └─ 矩陣乘法 = 線性變換
│     └─ 旋轉 / 縮放 / 投影 / 特徵重組
│
├─ Eigenvalues / Eigenvectors：找不會被轉彎的方向
│  │
│  ├─ Av = λv
│  │  ├─ v = 特徵向量，方向不變
│  │  └─ λ = 特徵值，拉伸倍數
│  │
│  └─ 共變異數矩陣
│     └─ 大特徵值 = 資料變異量大的方向
│
├─ PCA：用最大變異方向做線性降維
│  │
│  ├─ Center data
│  ├─ Covariance matrix
│  ├─ Eigendecomposition / SVD
│  ├─ Sort components
│  └─ Project to k dimensions
│
├─ SVD：任意矩陣的三段式分解
│  │
│  ├─ A = UΣV^T
│  ├─ 奇異值代表方向重要性
│  └─ 保留前 k 個奇異值 = 低秩近似
│
└─ Applications：考試情境
   │
   ├─ Feature Extraction：用線性組合產生新特徵
   ├─ Dimensionality Reduction：把高維資料投影到低維
   ├─ Data Compression：用較少數字近似原矩陣
   ├─ Denoising：保留主要方向，丟掉小雜訊方向
   └─ Visualization：PCA / t-SNE / UMAP 做 2D 或 3D 探索
```

## 3. Core Concepts

### 3.1 向量與矩陣的機器學習語言（Vectors and Matrices in ML）🔥🔥

#### 先懂一句話

機器學習不是直接「看懂」商品、履歷或句子，而是先把它們變成一串數字。這串數字就是向量（Vector），很多筆向量排在一起就是矩陣（Matrix）。

#### Everyday Analogy

想像蝦皮商品可以用「價格、評分、銷量、折扣」四個特徵描述。每個商品就是一個 4 維向量；整個搜尋結果頁的商品清單，就是一個「商品數 × 4 特徵」的矩陣。

104 人力銀行也一樣：一位求職者可以被表示成「年資、技能數、期望薪資、地區距離、作品集分數」等向量。公司和求職者的向量越接近，推薦系統越可能判斷匹配。

#### 它在流程中的位置

```text
原始資料
→ 抽出特徵
→ 形成向量 / 矩陣  ← 本節
→ 線性變換 / 降維 / 模型訓練
→ 預測或推薦
```

#### Teaching Content

| 概念 | 白話說法 | 考試讀法 |
|---|---|---|
| 樣本（Sample） | 一筆資料 | 在 d 維特徵空間中的一個點 |
| 向量（Vector） | 一筆資料的一串特徵值 | 例如 `x = [價格, 評分, 銷量, 折扣]` |
| 矩陣（Matrix） | 很多筆向量排成表 | `X` 通常是 n 樣本 × d 特徵 |
| Embedding（嵌入向量） | 把文字、商品、使用者變成可比較的向量 | BERT 常見 768 維，Word2Vec 常見 300 維 |
| 點積（Dot Product） | 兩個向量方向與大小的合併比較 | `a·b = |a||b|cos(θ)` |
| 餘弦相似度（Cosine Similarity） | 只看方向像不像 | `a·b / (|a|×|b|)` |
| 矩陣乘法（Matrix Multiplication） | 把資料投影或轉到新座標 | `n×d @ d×k = n×k` |
| L1 範數（L1 Norm） | 各座標絕對值加總 | `Σ|xi|` |
| L2 範數（L2 Norm） | 向量的幾何長度 | `√(Σxi²)` |

點積（Dot Product）的公式：

```text
a·b = |a||b|cos(θ)
```

如果兩個向量方向很像，夾角 θ 小，`cos(θ)` 接近 1，點積通常較大。這就是為什麼 embedding 常用 cosine similarity 比較語意、商品或使用者偏好的相似度。

餘弦相似度（Cosine Similarity）的公式：

```text
cosine_similarity(a, b) = a·b / (|a| × |b|)
```

它把向量長度的影響除掉，讓比較更偏向「方向」。例如一個買很多東西的人和一個買很少東西的人，只要偏好方向類似，cosine similarity 仍可能很高。

矩陣乘法（Matrix Multiplication）在本章最重要的考點是維度：

```text
X: n×d
W: d×k
X @ W: n×k
```

意思是：原本每筆資料有 d 個特徵，經過投影矩陣 W 後，每筆資料變成 k 個新特徵。

#### Scenario Bank

| 情境 | 看到的關鍵字 | 應想到 |
|---|---|---|
| 比較兩篇文章語意是否接近 | embedding、cosine similarity | 向量方向相似度 |
| 商品推薦要比較使用者偏好 | user vector、item vector | 點積或餘弦相似度 |
| 題目問 `100×20 @ 20×3` 的結果 | 矩陣乘法維度 | 輸出是 `100×3` |
| 把 50 維資料變成 2 維 | projection matrix | 線性變換 / 降維 |
| 問 L2 norm 是什麼 | `sqrt(sum(x_i^2))` | 向量長度 |

#### Code Pattern Block

```python
import numpy as np

# 資料矩陣 X: 3 樣本 × 4 特徵
X = np.array([[1, 2, 0, 3],
              [4, 0, 1, 2],
              [0, 3, 2, 1]])

# 兩向量的點積與餘弦相似度
a, b = X[0], X[1]
dot = np.dot(a, b)                        # 純量 → 相似度
cos_sim = dot / (np.linalg.norm(a) * np.linalg.norm(b))

# 矩陣乘法：W 是 4×2 投影矩陣
W = np.random.randn(4, 2)
X_proj = X @ W                            # 3×2 — 降到 2 維
```

考試重點：矩陣乘法後的輸出維度是 `n×d × d×k = n×k`。如果內側維度不同，例如 `3×4 @ 2×4`，不能相乘。

#### Exam Rule

```text
題目看到「一筆資料在多維特徵空間」→ 向量
題目看到「n 筆資料 × d 個特徵」→ 矩陣
題目看到「embedding 相似度」→ dot product / cosine similarity
題目看到「X @ W 後維度」→ 看內側維度是否相同，外側維度留下來
題目看到「L2 norm」→ 向量長度
```

#### Quick Check

`X` 是 `200×50` 的資料矩陣，`W` 是 `50×10` 的投影矩陣，`X @ W` 的維度是多少？

答案：`200×10`。因為 `200×50 @ 50×10` 的內側 50 抵消，外側留下 200 與 10。

### 3.2 特徵值與特徵向量（Eigenvalues and Eigenvectors）🔥🔥🔥

#### 先懂一句話

特徵向量（Eigenvector）是矩陣作用後「方向不變」的方向；特徵值（Eigenvalue）是這個方向被拉長或縮短的倍數。

#### Everyday Analogy

想像你把一張橡皮紙往某些方向拉伸。大部分畫在紙上的箭頭會被拉歪，但有些箭頭剛好沿著拉伸軸，方向不變，只是變長或變短；那些方向就是特徵向量，拉伸倍數就是特徵值。

用學生考試成績比喻：共變異數矩陣的特徵向量就像找出全班成績最分散的方向。特徵值越大，代表沿著這個方向看，學生差異越明顯。

#### 它在流程中的位置

```text
資料矩陣 X
→ 中心化
→ 共變異數矩陣
→ 特徵值 / 特徵向量  ← 本節
→ PCA 主成分方向
→ 降維投影
```

#### Teaching Content

核心公式：

```text
Av = λv
```

| 符號 | 意思 | 白話 |
|---|---|---|
| `A` | 矩陣 | 對資料做線性變換的規則 |
| `v` | 特徵向量（Eigenvector） | 被 A 作用後方向不變的向量 |
| `λ` | 特徵值（Eigenvalue） | v 被拉伸或縮短的比例 |
| `λv` | 縮放後的 v | 方向仍是 v，只是長度變了 |

在 PCA 裡，常見的 `A` 是共變異數矩陣（Covariance Matrix）。共變異數矩陣是對稱矩陣（Symmetric Matrix），它的特徵向量會互相正交（Orthogonal），很適合當新的座標軸。

考試白話：

```text
大特徵值
→ 這個方向的資料變異量大
→ PCA 會優先保留
```

`np.linalg.eig` 與 `np.linalg.eigh` 的考試差異：

| 函式 | 適合情境 | 考試記法 |
|---|---|---|
| `np.linalg.eig` | 一般方陣 | 通用，但對稱矩陣不一定最穩 |
| `np.linalg.eigh` | 對稱矩陣 / Hermitian matrix | 共變異數矩陣常用，較快也較穩定 |

一步一步看 explained ratio：

```text
假設 eigenvalues = [9, 3, 0]
總變異 = 9 + 3 + 0 = 12
第一主成分 explained ratio = 9 / 12 = 0.75
第二主成分 explained ratio = 3 / 12 = 0.25
累積前 2 個 = 0.75 + 0.25 = 1.00
```

#### Scenario Bank

| 情境 | 看到的關鍵字 | 應想到 |
|---|---|---|
| 題目寫 `Av = λv` | eigenvalue/eigenvector | λ 是純量，v 是向量 |
| 問 PCA 的主成分方向怎麼來 | covariance matrix | 特徵向量 |
| 問最大變異方向 | largest eigenvalue | 對應的 eigenvector |
| 問共變異數矩陣分解用什麼較穩 | symmetric matrix | `np.linalg.eigh` |
| 問 eigenvalue 是不是向量 | scalar | 不是，特徵值是純量 |

#### Code Pattern Block

```python
import numpy as np

X = np.array([[2.5, 2.4], [0.5, 0.7], [2.2, 2.9],
              [1.9, 2.2], [3.1, 3.0], [2.3, 2.7]])

X_centered = X - X.mean(axis=0)
cov = np.cov(X_centered.T)               # 2×2 共變異數矩陣

eigenvalues, eigenvectors = np.linalg.eigh(cov)

# 排序：由大到小
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

# 解釋變異比例
explained = eigenvalues / eigenvalues.sum()
# ↑ explained[0] = 第一主成分解釋的變異比例
```

考試重點：`argsort()[::-1]` 是由大到小排序；`explained ratio = eigenvalue / sum(eigenvalues)`。

#### Exam Rule

```text
題目看到 Av = λv → 特徵值分解
題目問方向不變 → 特徵向量
題目問拉伸比例 → 特徵值
題目問 PCA 最大變異方向 → 最大特徵值對應的特徵向量
題目問 covariance matrix → 對稱矩陣，常用 eigh
```

#### Quick Check

在 PCA 中，若某個特徵向量對應的特徵值最大，代表什麼？

答案：代表沿著這個方向資料變異量最大，PCA 會優先把它當作第一主成分。

### 3.3 主成分分析（PCA, Principal Component Analysis）🔥🔥🔥

#### 先懂一句話

PCA（Principal Component Analysis，主成分分析）是在找「資料最分散的幾個方向」，然後把資料投影到這些方向上，用較少維度保留最多變異量。

#### Everyday Analogy

PCA 像是找到學生考試成績最分散的方向，然後把全班成績投影到那個方向上排名。不是只看某一科，而是把多科成績線性組合成一個「最能看出差異」的新軸。

#### 它在流程中的位置

```text
高維特徵矩陣
→ 中心化
→ 找最大變異方向
→ 投影到前 k 個主成分  ← 本節
→ 視覺化 / 降噪 / 建模加速
```

#### Teaching Content

PCA 的完整 5 步驟：

```text
① 資料中心化
→ ② 計算共變異數矩陣
→ ③ 特徵值分解
→ ④ 選前 k 個特徵向量
→ ⑤ 投影到 k 維子空間
```

用一句話記：**中心化→共變異→分解→排序→投影**。

PCA 每一步在做什麼：

| 步驟 | 技術說法 | 白話 |
|---|---|---|
| 1 | 中心化（Centering） | 把每個特徵扣掉平均值，讓資料以 0 為中心 |
| 2 | 共變異數矩陣（Covariance Matrix） | 看特徵之間如何一起變動 |
| 3 | 特徵值分解（Eigendecomposition） | 找出資料變異最大的方向 |
| 4 | 選前 k 個特徵向量 | 保留最重要的 k 個方向 |
| 5 | 投影（Projection） | 把原始資料轉到 k 維主成分空間 |

解釋變異量（Explained Variance Ratio）：

```text
第 i 個主成分解釋比例 = λ_i / Σλ_j
```

一步一步例子：

```text
eigenvalues = [8, 1.5, 0.5]
總變異 = 8 + 1.5 + 0.5 = 10
explained ratios = [8/10, 1.5/10, 0.5/10]
                 = [0.80, 0.15, 0.05]
累積解釋變異量 = [0.80, 0.95, 1.00]
若題目要求至少 95% → 選 k = 2
```

PCA 常見應用：

| 應用 | 為什麼用 PCA |
|---|---|
| 資料視覺化 | 高維資料投影成 2D 或 3D |
| 降噪 | 小變異方向常可能是雜訊 |
| 加速後續模型訓練 | 特徵變少，模型運算較快 |
| 特徵提取（Feature Extraction） | 產生主成分這種新特徵 |

PCA 限制：

| 限制 | 考試怎麼問 |
|---|---|
| 線性方法（Linear Method） | 非線性流形結構可能要 t-SNE/UMAP |
| 無監督（Unsupervised） | PCA 不使用標籤 y |
| 主成分較難直覺解釋 | 主成分是原特徵線性組合，不是原始欄位 |
| 保留最大變異不等於找因果 | 變異量大不代表對目標最重要 |

#### Scenario Bank

| 情境 | 看到的關鍵字 | 應想到 |
|---|---|---|
| 高維資料要降到 2D 看圖 | PCA 或 t-SNE/UMAP | 若要線性、快速、保全域，選 PCA |
| 題目問最大化投影後變異量 | PCA | 第一主成分 |
| 題目問累積解釋變異量 0.95 | cumsum | 選最小 k |
| 題目問 PCA 是否使用 y | unsupervised | 不使用標籤 |
| 題目問 PCA 是不是挑原特徵 | feature extraction | 不是，是線性組合新特徵 |

#### Code Pattern Block

```python
from sklearn.decomposition import PCA
import numpy as np

X = np.random.randn(100, 10)             # 100 樣本, 10 特徵

pca = PCA(n_components=2)                # 保留前 2 主成分
X_reduced = pca.fit_transform(X)         # 100×10 → 100×2
# ↑ fit 計算主成分; transform 投影

print(pca.explained_variance_ratio_)     # 每個主成分解釋的變異比例
print(pca.explained_variance_ratio_.cumsum())  # 累積解釋變異量

# 選擇 n_components: 使 cumsum ≥ 0.95
n = np.argmax(pca.explained_variance_ratio_.cumsum() >= 0.95) + 1
```

考試重點：`fit_transform()` 等於先 `fit()` 找主成分，再 `transform()` 投影；`explained_variance_ratio_` 是每個主成分的變異比例；`cumsum()` 用來選 k。

#### Exam Rule

```text
題目看到「最大變異方向」→ PCA
題目看到「center → covariance → eigenvectors → project」→ PCA
題目看到「explained_variance_ratio_」→ PCA 保留變異比例
題目看到「cumsum ≥ 0.95」→ 選最小 k 個主成分
題目看到「PCA 是否用 label」→ 不用，PCA 是無監督
```

#### Quick Check

若 PCA 的 explained ratios 是 `[0.70, 0.20, 0.06, 0.04]`，要保留至少 95% 變異量，k 應該選多少？

答案：k = 3。因為前 1 個是 0.70，前 2 個是 0.90，前 3 個是 0.96，第一次達到 0.95。

### 3.4 奇異值分解（SVD, Singular Value Decomposition）🔥🔥

#### 先懂一句話

SVD（Singular Value Decomposition，奇異值分解）是把任意矩陣拆成三個部分：左方向、重要程度、右方向。它讓我們知道矩陣中哪些方向最重要，也能用少數方向近似原資料。

#### Everyday Analogy

SVD 像把一張照片拆成很多層「主要輪廓」。前幾層保留大部分畫面結構，後面很多層只補細節；如果只保留前 k 層，照片會變模糊一點，但檔案可以小很多。

#### 它在流程中的位置

```text
任意資料矩陣 A
→ SVD: A = UΣV^T  ← 本節
→ 保留前 k 個奇異值
→ 低秩近似 / 壓縮 / 降噪 / LSA / 推薦系統
```

#### Teaching Content

SVD 定義：

```text
A = UΣV^T
```

| 部分 | 維度概念 | 意思 | 白話記法 |
|---|---|---|---|
| `U` | m×m 或 thin SVD 的 m×r | 左奇異向量（Left Singular Vectors） | 樣本方向 / 列空間方向 |
| `Σ` | m×n 對角矩陣 | 奇異值（Singular Values） | 方向的重要程度 |
| `V^T` | n×n 或 r×n | 右奇異向量（Right Singular Vectors） | 特徵方向 / 行空間方向 |

NumPy 常回傳：

```text
U, S, Vt = np.linalg.svd(A)
```

注意：NumPy 回傳的 `S` 是一維奇異值向量，不是完整 `Σ` 矩陣；要重建時常用 `np.diag(S)`。

奇異值與特徵值的關係：

```text
σ_i = √λ_i
```

更精準地說，奇異值平方會對應到 `A^T A` 或 `A A^T` 的特徵值。考試通常只要記：奇異值是非負、按大小排序，代表重要方向強度。

低秩近似（Low-rank Approximation）：

```text
A_k = U_k Σ_k V_k^T
```

意思是只保留前 k 個奇異值與對應方向，用較少資訊近似原矩陣。

一步一步例子：

```text
原矩陣 A 是 50×30，共 1500 個數字
若保留 k = 5：
U_k 需要 50×5 = 250 個數字
Σ_k 需要 5 個奇異值
V_k^T 需要 5×30 = 150 個數字
總共約 250 + 5 + 150 = 405 個數字
405 < 1500，所以可以壓縮
```

SVD 常見應用：

| 應用 | SVD 做什麼 |
|---|---|
| 影像壓縮 | 保留前 k 個奇異值重建圖像 |
| 推薦系統 | 找出使用者與物品的潛在因子 |
| LSA（Latent Semantic Analysis） | 對文字矩陣做潛在語意降維 |
| PCA 底層計算 | sklearn PCA 常用 SVD 路線 |
| 降噪 | 丟掉很小的奇異值方向 |

#### Scenario Bank

| 情境 | 看到的關鍵字 | 應想到 |
|---|---|---|
| 任意 m×n 矩陣要分解 | SVD | 不要求方陣 |
| 影像壓縮 | low-rank approximation | 保留前 k 個奇異值 |
| 推薦系統矩陣分解 | user-item matrix | SVD / matrix factorization |
| LSA / term-document matrix | sparse text matrix | TruncatedSVD |
| 題目問 `U, S, Vt` | NumPy SVD | `S` 是奇異值向量 |

#### Code Pattern Block

```python
import numpy as np

A = np.random.randn(50, 30)              # 原始矩陣 50×30
U, S, Vt = np.linalg.svd(A, full_matrices=False)
# U: 50×30, S: 30 (奇異值向量), Vt: 30×30

# 低秩近似：保留前 k=5 個奇異值
k = 5
A_k = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]  # 50×30 重建

# 解釋比例
explained = (S**2).cumsum() / (S**2).sum()
print(f"前 {k} 個奇異值解釋 {explained[k-1]:.1%} 的變異")
```

考試重點：SVD 輸出順序是 `U, S, Vt`；低秩近似保留前 k 列/行；奇異值和特徵值的關係常以平方或開根號出現。

#### Exam Rule

```text
題目看到任意 m×n 矩陣 → SVD
題目看到 A = UΣV^T → SVD
題目看到 low-rank approximation → 保留前 k 個奇異值
題目看到 image compression / recommendation / LSA → SVD
題目看到 sklearn PCA 底層 → 可能用 SVD 計算
```

#### Quick Check

為什麼 SVD 比特徵值分解更常被說成「可用於任意矩陣」？

答案：因為 SVD 可分解任意 m×n 矩陣；特徵值分解通常針對方陣，PCA 中常用的是共變異數矩陣這種方陣。

### 3.5 降維應用與方法比較（Dimensionality Reduction Applications）🔥🔥

#### 先懂一句話

降維（Dimensionality Reduction）是在保留重要資訊的前提下，把高維資料變成低維資料。考試重點不是背所有方法，而是判斷「要壓縮、要視覺化、要可逆、要非線性」時該選哪一種。

#### Everyday Analogy

t-SNE 像是把複雜的三維城市地圖畫成容易看的 2D 示意圖，但不能靠它導航，因為距離和方向不一定能精準還原。PCA 比較像正式的座標投影，雖然簡化了，但仍保留全域方向感，也比較容易重建。

#### 它在流程中的位置

```text
高維資料 / embedding / 特徵矩陣
→ 選降維方法  ← 本節
→ 2D/3D 視覺化、壓縮、降噪、下游建模
```

#### Teaching Content

為什麼要降維？

| 原因 | 白話 | 考試關鍵 |
|---|---|---|
| 維度災難（Curse of Dimensionality） | 維度太高時，距離變得不直覺 | 高維空間距離失效 |
| 視覺化 | 人很難看 50 維，只能看 2D/3D | PCA/t-SNE/UMAP |
| 壓縮 | 用較少數字保存主要資訊 | SVD/PCA |
| 降噪 | 小變異方向可能是雜訊 | PCA/SVD |
| 加速 | 特徵變少，後續模型較快 | PCA 預處理 |

特徵提取（Feature Extraction）vs 特徵選擇（Feature Selection）：

| 方法 | 做法 | 輸出 |
|---|---|---|
| 特徵提取（Feature Extraction） | 把原特徵線性或非線性組合成新特徵 | 新特徵，例如主成分 |
| 特徵選擇（Feature Selection） | 從原特徵中挑一部分保留 | 原本欄位的子集合 |

PCA vs t-SNE vs UMAP：

| 方法 | 線性/非線性 | 可逆 | 適用 | 速度 |
|------|------------|------|------|------|
| PCA | 線性 | ✅ | 降噪/壓縮/預處理 | 快 |
| t-SNE | 非線性 | ❌ | 視覺化 (2D/3D) | 慢 |
| UMAP | 非線性 | 新樣本可 `transform()`，但不完全可逆 | 視覺化+下游任務 | 中 |

Embedding 降維的直覺：

```text
文字 / 商品 / 使用者
→ embedding 向量
→ PCA / t-SNE / UMAP
→ 看群聚、相似度、主要方向
```

注意：embedding 本身常是高維向量表示；降維方法只是把它投影到較容易看或較容易處理的空間。不要把 embedding 降維誤解成資料標準化或正規化，那是 L22301 的資料前處理判斷。

重建誤差（Reconstruction Error）：

```text
原資料 X
→ 降維成 Z
→ 再升回 X_hat
→ reconstruction error = X 與 X_hat 的差距
```

PCA 的一個重要直覺是：在固定維度 k 下，PCA 找到的線性子空間會讓重建誤差最小；這和「最大化投影後變異量」是同一件事的兩種說法。

#### Scenario Bank

| 情境 | 看到的關鍵字 | 應想到 |
|---|---|---|
| 要保留全域結構、可重建 | linear、inverse_transform | PCA |
| 只想看高維資料 2D 群聚 | visualization、local neighborhood | t-SNE/UMAP |
| 題目說不可對新樣本單獨 transform | no transform | t-SNE |
| 影像壓縮 | low-rank | SVD |
| 文字 TF-IDF 矩陣降維 | sparse text matrix、LSA | TruncatedSVD |

注意：UMAP 有 `transform()` 方法可對新樣本嵌入，與 t-SNE 不同；考題若以「可否對新樣本 transform」區分，答案為 t-SNE（不可）vs UMAP（可）。

#### Code Pattern Block

```python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import numpy as np

X = np.random.randn(200, 50)            # 200 樣本, 50 維

# PCA: 可逆, 快, 保留全域結構
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)           # 用於預處理

# t-SNE: 不可逆, 慢, 保留局部結構
tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(X)         # 僅用於視覺化

# ↑ t-SNE 沒有 transform() 方法 — 不能對新樣本單獨轉換
```

考試重點：t-SNE 沒有一般 PCA 那種 `transform()` 可對新樣本單獨轉換；PCA 有 `inverse_transform()` 可近似重建；兩者適用場景不同。

#### Exam Rule

```text
題目看到「特徵提取」→ 產生新特徵，PCA 是典型例子
題目看到「特徵選擇」→ 挑原本欄位
題目看到「可逆 / 重建」→ PCA
題目看到「非線性視覺化 / 局部鄰近」→ t-SNE 或 UMAP
題目看到「高維距離失效」→ 維度災難
```

#### Quick Check

題目說「想把 BERT embedding 畫成 2D 圖看語意群聚，而且主要用於探索視覺化」，PCA 與 t-SNE 哪個更常被選？

答案：t-SNE 或 UMAP 更常被選，因為題目強調非線性局部群聚視覺化；若題目強調可逆、快速、預處理，才優先選 PCA。

## 4. Comparison Tables

### 4.1 PCA vs SVD

先懂一句話：**PCA 是一個降維方法；SVD 是一個矩陣分解工具。** PCA 可以用特徵值分解或 SVD 來算，SVD 也可獨立用於壓縮、推薦系統與 LSA。

| 比較面 | PCA（Principal Component Analysis） | SVD（Singular Value Decomposition） |
|---|---|---|
| 定義 | 找最大變異方向並投影降維 | 把矩陣分解成 `UΣV^T` |
| 目標 | 降維、特徵提取、降噪、視覺化 | 分解矩陣、低秩近似、壓縮、找潛在因子 |
| 適用矩陣類型 | 通常處理資料矩陣，常經中心化 | 任意 m×n 矩陣 |
| 底層計算 | 可用 covariance eigendecomposition 或 SVD | 直接做矩陣分解 |
| 輸出重點 | 主成分、explained variance ratio | U、奇異值 S、Vt |
| 典型應用 | 2D/3D 視覺化、降噪、建模前處理 | 影像壓縮、推薦系統、LSA、低秩近似 |
| 考試陷阱 | PCA 不是挑原欄位 | SVD 不只用在方陣 |

考試快判：

```text
最大變異方向 / explained_variance_ratio_ → PCA
A = UΣV^T / 任意 m×n 矩陣 / low-rank → SVD
```

### 4.2 特徵提取 vs 特徵選擇

先懂一句話：**提取是做新特徵；選擇是挑舊特徵。**

| 比較面 | 特徵提取（Feature Extraction） | 特徵選擇（Feature Selection） |
|---|---|---|
| 操作 | 把原特徵轉換或組合成新特徵 | 從原特徵中挑一部分 |
| 輸出特徵類型 | 新特徵，例如 PCA 主成分 | 原始欄位，例如保留年齡、收入 |
| 可解釋性 | 通常較低，因為是組合後的新軸 | 通常較高，因為仍是原欄位 |
| 代表方法 | PCA、SVD、embedding | filter/wrapper/embedded selection |
| 是否改變特徵空間 | 會 | 不一定，只是刪減欄位 |
| L23102 重點 | 線性變換、投影、主成分 | 只需知道差異，不展開演算法 |

考試快判：

```text
線性組合 / 主成分 / projection → 特徵提取
挑出原本欄位 / remove irrelevant features → 特徵選擇
```

### 4.3 線性降維 vs 非線性降維

先懂一句話：**要可逆、穩定、保全域，看 PCA；要看複雜局部群聚，看 t-SNE/UMAP。**

| 比較面 | 線性降維（PCA） | 非線性降維（t-SNE/UMAP） |
|---|---|---|
| 核心假設 | 重要結構可用線性方向表示 | 資料可能在非線性流形上 |
| 保留重點 | 全域變異方向 | 局部鄰近關係 |
| 可逆性 | PCA 可用 `inverse_transform()` 近似重建 | 通常不可逆 |
| 對新樣本 | PCA 可 `transform()` | t-SNE（sklearn）無 `transform()` 方法，不能對新樣本轉換；UMAP（`umap-learn`）有 `transform()` 方法，可將新樣本嵌入已學習的空間，但嵌入不等於完全可逆 |
| 速度 | 快 | t-SNE 慢，UMAP 中等 |
| 常見用途 | 預處理、壓縮、降噪 | 視覺化、探索群聚 |
| 考試陷阱 | PCA 不是非線性方法 | t-SNE 圖不適合當精準距離地圖 |

考試快判：

```text
線性 / 快 / 可重建 / explained variance → PCA
非線性 / 視覺化 / 局部鄰近 / 不可逆 → t-SNE 或 UMAP
```

### 4.4 特徵值 vs 奇異值

先懂一句話：**特徵值描述方陣某些方向的拉伸；奇異值描述任意矩陣的重要方向強度。**

| 比較面 | 特徵值（Eigenvalue） | 奇異值（Singular Value） |
|---|---|---|
| 定義 | `Av = λv` 中的 `λ` | `A = UΣV^T` 中 `Σ` 對角線上的 `σ` |
| 矩陣條件 | 通常針對方陣 | 任意 m×n 矩陣 |
| 數值性質 | 可能為正、負或複數 | 非負，通常由大到小排列 |
| 對應方向 | 特徵向量 | 左/右奇異向量 |
| 與 PCA 關係 | covariance matrix 的 eigenvalue 代表變異量 | SVD 的 singular values 可用來算變異保留 |
| 關係 | `A^T A` 的特徵值開根號可得奇異值 | `σ_i = √λ_i` |
| 考試陷阱 | 特徵值是純量，不是向量 | 奇異值不是特徵向量 |

考試快判：

```text
Av = λv → 特徵值 / 特徵向量
U, S, Vt 或 Σ → 奇異值
```

## 5. 口訣 / Mnemonics

### 5.1 PCA 5 步驟口訣

```text
中心化 → 共變異 → 分解 → 排序 → 投影
縮寫：中共分排投
```

讀法：

| 口訣 | 對應動作 |
|---|---|
| 中 | 資料中心化（center data） |
| 共 | 計算共變異數矩陣（covariance matrix） |
| 分 | 特徵值分解或 SVD |
| 排 | 按特徵值或奇異值由大到小排序 |
| 投 | 投影到前 k 個主成分 |

### 5.2 SVD 三矩陣記憶

```text
U左Σ中Vᵀ右，奇異值對角排由大到小
```

讀法：

| 符號 | 記法 |
|---|---|
| U | 左邊，樣本/列空間方向 |
| Σ | 中間，奇異值在對角線 |
| Vᵀ | 右邊，特徵/行空間方向 |
| 前 k 個奇異值 | 最重要的 k 個方向 |

### 5.3 線性 vs 非線性降維判斷

```text
要可逆保全域用 PCA，要視覺化局部用 t-SNE/UMAP
```

補一句：

```text
PCA = 工程前處理常用
t-SNE/UMAP = 探索視覺化常用
```

### 5.4 向量相似度

```text
點積看夾角，cosine 看方向，L2 範數看長度
```

讀法：

| 口訣 | 意思 |
|---|---|
| 點積看夾角 | 點積含有 `cos(θ)`，方向越接近通常越大 |
| cosine 看方向 | 除掉長度後，比較方向相似 |
| L2 範數看長度 | `√(Σxi²)` 是向量在空間中的長度 |

## 6. 考試陷阱

### Trap 1：把特徵值和特徵向量搞混

❌ 錯誤想法：特徵值是一個方向，特徵向量是一個數字。

✅ 正確想法：特徵值（Eigenvalue）是純量（Scalar），特徵向量（Eigenvector）是向量（Vector）。

```text
Av = λv
λ = scalar
v = vector
```

Exam fix：

```text
題目問「拉伸比例」→ 特徵值
題目問「方向不變」→ 特徵向量
```

### Trap 2：以為 PCA 降維等於特徵選擇

❌ 錯誤想法：PCA 是挑出最重要的原始欄位。

✅ 正確想法：PCA 是特徵提取（Feature Extraction），主成分是原特徵的線性組合，不是原欄位。

```text
原特徵：[年齡, 收入, 消費次數]
PCA 主成分：0.3×年齡 + 0.6×收入 + 0.7×消費次數
```

Exam fix：

```text
題目看到「主成分」→ 新特徵
題目看到「挑原欄位」→ 特徵選擇
```

### Trap 3：以為 SVD 和特徵值分解都只能處理方陣

❌ 錯誤想法：SVD 也必須是方陣才能做。

✅ 正確想法：SVD 可用於任意 m×n 矩陣；特徵值分解通常要求方陣。

```text
50×30 矩陣 → 可以做 SVD
50×30 矩陣 → 不能直接做一般 Av = λv 的方陣特徵值分解
```

Exam fix：

```text
任意 m×n 矩陣 → SVD
方陣 / covariance matrix → eigendecomposition
```

### Trap 4：以為 t-SNE 可以像 PCA 一樣 transform 新樣本

❌ 錯誤想法：t-SNE 訓練完後，可以直接對單一新樣本呼叫 `transform()`。

✅ 正確想法：常見 sklearn t-SNE 用法是 `fit_transform()` 做視覺化，沒有像 PCA 那樣一般可用的 `transform()`。

```text
PCA: fit → transform → inverse_transform
t-SNE: fit_transform for visualization
```

Exam fix：

```text
不可逆 / 新樣本無法單獨轉換 → t-SNE
可投影新樣本 / 可近似重建 → PCA
```

### Trap 5：「解釋變異量最高」不等於「最重要的特徵」

❌ 錯誤想法：第一主成分就是最重要的原始特徵。

✅ 正確想法：第一主成分是最大變異方向，是多個原特徵的線性組合；它不是單一欄位，也不代表因果重要性。

```text
高 explained variance
→ 代表資料在該方向分散程度高
→ 不代表該方向一定最能預測 y
```

Exam fix：

```text
題目問「最大變異」→ PCA 主成分
題目問「對標籤 y 最重要」→ 不是 PCA 本身能直接回答
```

### Trap 6：看不出 PCA 的兩種等價說法

❌ 錯誤想法：PCA 最大化投影後變異量，和最小化重建誤差是兩件完全不同的事。

✅ 正確想法：在固定線性維度 k 下，PCA 最大化投影後變異量，也等價於最小化重建誤差。

```text
保留最大變異方向
→ 主要資訊留下
→ 重建時誤差最小
```

Exam fix：

```text
最大化投影變異量 → PCA 正確描述
最小化重建誤差 → PCA 正確描述
```

### Trap 7：把 `v1 * v2` 當成 dot product

❌ 錯誤想法：NumPy 裡 `v1 * v2` 就是向量點積。

✅ 正確想法：`v1 * v2` 是 elementwise multiplication；`np.dot(v1, v2)` 或 `v1 @ v2` 才是點積。

```python
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

v1 * v2        # array([4, 10, 18])
np.dot(v1, v2) # 1*4 + 2*5 + 3*6 = 32
```

Exam fix：

```text
題目問逐元素相乘 → *
題目問點積 / 相似度純量 → np.dot 或 @
```

### Trap 8：把 PCA 的中心化誤讀成 L22301 的標準化選擇題

❌ 錯誤想法：本章要判斷所有資料標準化、正規化、log transform 何時使用。

✅ 正確想法：L23102 只需要知道 PCA 計算會中心化資料；標準化/正規化如何選是 L22301。

Exam fix：

```text
PCA API / center data → L23102 可考
StandardScaler vs Normalizer vs log transform 選擇 → L22301
```

## 7. 情境題快速判斷

### 7.1 Keyword → Answer Lookup

| 題目關鍵字 | 快速答案 | 一句理由 |
|---|---|---|
| 任意 m×n 矩陣 | SVD | SVD 不要求方陣 |
| 共變異數矩陣→特徵值分解 | PCA | PCA 用最大變異方向做主成分 |
| 視覺化高維資料 | t-SNE 或 UMAP | 非線性方法常用於 2D/3D 視覺化 |
| 累積解釋變異量 0.95 | 選 k 主成分 | 找 cumsum 第一次達到 0.95 的 k |
| 影像壓縮/推薦系統矩陣分解 | SVD 低秩近似 | 保留前 k 個奇異值重建 |
| 不可逆/新樣本無法單獨轉換 | t-SNE | 常見 t-SNE 只做 fit_transform 視覺化 |
| 餘弦相似度/embedding 比較 | 向量點積 | cosine similarity 由 dot product 正規化而來 |
| `Av = λv` | 特徵值分解（Eigendecomposition） | λ 是特徵值，v 是特徵向量 |
| 最大化投影後變異量 | PCA | PCA 主成分按變異量排序 |
| 最小化重建誤差 | PCA | 與最大化投影變異量等價 |
| `U, S, Vt = np.linalg.svd(A)` | SVD | `S` 是奇異值向量 |
| `explained_variance_ratio_` | sklearn PCA | 代表各主成分保留的變異比例 |
| `n×d @ d×k` | 輸出 `n×k` | 矩陣乘法外側維度留下 |
| 主成分是原特徵線性組合 | 特徵提取 | 不是特徵選擇 |
| 挑出原本幾個欄位 | 特徵選擇 | 保留原特徵，不創造新軸 |

### 7.2 Mini Decision Tree

```text
題目問降維或矩陣分解？
│
├─ 寫 A = UΣV^T、任意 m×n、低秩近似？
│  └─ 選 SVD
│
├─ 寫最大變異方向、explained variance、主成分？
│  └─ 選 PCA
│
├─ 寫 2D 視覺化、局部鄰近、非線性群聚？
│  └─ 選 t-SNE / UMAP
│
├─ 寫 cosine similarity、embedding 比較？
│  └─ 用 dot product / cosine similarity
│
└─ 寫挑原始欄位？
   └─ 選 feature selection，不是 PCA
```

### 7.3 Code Reading 快速判斷

```text
看到 np.linalg.inv(A)
→ 矩陣反矩陣

看到 v1 * v2
→ 逐元素相乘，不是點積

看到 np.dot(v1, v2)
→ 點積，輸出純量

看到 np.linalg.eig(A)
→ 特徵值與特徵向量

看到 np.linalg.eigh(cov)
→ 對稱矩陣的特徵值分解，常見於 covariance matrix

看到 PCA(n_components=2).fit_transform(X)
→ 先找主成分，再投影成 2 維

看到 pca.explained_variance_ratio_.cumsum()
→ 用累積解釋變異量選 k

看到 np.linalg.svd(A, full_matrices=False)
→ thin SVD，常用於低秩近似
```

## 8. 結尾：快速自我檢查 ✅

- [ ] 能解釋向量點積（Dot Product）= 相似度量，並知道 cosine similarity 是正規化後的點積。
- [ ] 能判斷資料矩陣 `n×d` 乘上投影矩陣 `d×k` 後輸出是 `n×k`。
- [ ] 能寫出 PCA 5 步驟：中心化→共變異→分解→排序→投影。
- [ ] 能說出特徵值（Eigenvalue）vs 奇異值（Singular Value）的差異。
- [ ] 能判斷 PCA vs t-SNE 的適用場景：可逆保全域用 PCA，視覺化局部用 t-SNE/UMAP。
- [ ] 能解釋低秩近似（Low-rank Approximation）是保留前 k 個奇異值重建矩陣。
- [ ] 能計算 `explained_variance_ratio_` 的累積值，並選出達到 0.95 的最小 k。
- [ ] 能分辨 PCA 是特徵提取（Feature Extraction），不是特徵選擇（Feature Selection）。

📌 out-of-scope note：考試不考 PCA 數學推導/正規方程式、梯度下降（L23103）、資料標準化的選擇（L22301）。本章要會的是線性代數直覺、矩陣維度判斷、PCA/SVD 情境選擇與基礎程式判讀。

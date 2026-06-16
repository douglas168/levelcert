# L23103 數值優化技術與方法 — Study Guide

本科屬 iPAS AI 應用規劃師中級「科目三：機器學習技術與應用」L231 數學基礎群，接在 L23101 機率統計基礎與 L23102 線性代數之後，並銜接 L23201 機器學習原理。這章只處理一階梯度下降家族、學習率、損失曲面與效率/可擴展性判斷；二階方法（Newton's method / Hessian）、constrained optimization、combinatorial optimization 不在 L23103 的中級考試範圍，看到時先當成超綱延伸。

## 1. Exam Item Mapping

### 1a. 對應評鑑範圍

> 對應評鑑範圍：**L23103 數值優化技術與方法** ＋ **L231 數學基礎群**

### 1b. How to Study This Chapter

1. 先讀 Section 3：把核心概念放進機器學習訓練流程，尤其是 `w ← w − η∇L(w)`。
2. 再讀 Section 4：用比較表整理 GD、SGD、Mini-batch SGD、Adam 與 loss surface 的差異。
3. 接著讀 Section 5：背更新規則、Adam 步驟、學習率診斷的口訣。
4. 考前快速掃 Section 6/7：用陷阱與情境關鍵字做快速判斷。
5. 最後用 Section 8：檢查自己能不能在 30 秒內完成每一類題型。

### 1c. 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 1d. 學習目標

讀完本章你應該能：

1. 說出梯度下降（Gradient Descent）更新規則中 `−η∇L` 每一段代表什麼。
2. 在算術追蹤題中代入學習率（learning rate）與梯度（gradient），算出 `w0 → w1 → w2`。
3. 說出 GD、SGD、Mini-batch SGD 在批次大小、噪聲、效率、GPU 適合度上的差異。
4. 在情境題中看到稀疏梯度、快速收斂、大模型，能立刻想到 Adam Optimizer。
5. 在情境題中看到 loss 震盪、下降很慢、突然爆炸，能判斷學習率太高或太低。
6. 說出凸函數（convex function）與非凸函數（non-convex function）損失曲面的考試差異。

### 1e. 考點權重

| 考點 | 權重（🔥count） | 出處 |
|---|---:|---|
| SGD 更新規則 `w ← w − η∇L`（arithmetic trace） | 🔥🔥🔥 | iPAS 學習指引公式 + confirmed code-style item |
| GD vs SGD vs mini-batch 差異（comparison） | 🔥🔥🔥 | iPAS 學習指引明列三者定義與適用情境 |
| Adam 優化器 β₁/β₂/ε 參數（recognition） | 🔥🔥 | iPAS 學習指引 Adam 公式與公告題型 |
| 學習率過高/過低診斷（scenario judgment） | 🔥🔥🔥 | iPAS 學習指引 + 公告試題考學習率角色 |
| 凸函數 vs 非凸函數損失曲面（recognition） | 🔥🔥 | 公告試題考非凸函數與局部最優 |
| 批次大小影響效率與可擴展性（scalability） | 🔥🔥 | L23103 備註「演算法效率與可擴展性評估」 |

### 1f. 先備知識

- L23101 機率統計基礎：理解抽樣、估計、資料分布，才能理解 SGD 的「隨機樣本」。
- L23102 線性代數：理解向量、矩陣、梯度（gradient）與偏微分（partial derivative）的方向感。
- L21301 數據準備與模型選擇基礎：知道訓練資料、驗證資料、模型訓練流程，才能把 optimizer 放在正確位置。
- L23201 機器學習原理：本章是前置數學工具，下一章才會把 optimizer 放進模型訓練與泛化問題。

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [損失曲面與梯度下降路徑](diagrams/01-loss-surface-gd-path.md) | 顯示凸函數與非凸函數損失曲面，GD路徑如何收斂或卡在鞍點/局部最小值 |
| 2 | [GD vs SGD vs Mini-batch 收斂比較](diagrams/02-gd-sgd-convergence.md) | 三種批次策略在損失曲線上的震盪程度與收斂速度對比 |
| 3 | [Adam 更新規則分解](diagrams/03-adam-update-breakdown.md) | Adam 四步驟計算流程：m/v估計 → 偏差修正 → 參數更新 |
| 4 | [學習率診斷圖](diagrams/04-learning-rate-diagnosis.md) | 學習率過高（震盪）/適中（穩定收斂）/過低（慢收斂）的損失曲線形狀對比 |
| 5 | [批次大小與可擴展性權衡](diagrams/05-batch-size-scalability.md) | 批次大小（小→大）對訓練噪聲、記憶體使用、GPU利用率的影響矩陣 |

## 2. 關鍵概念總覽圖 (Knowledge Tree)

這張圖不是要一次背完。先抓 N 層就好：

1. [top-level: 優化的目標是什麼?]
2. [second: 梯度下降家族三兄弟]
3. [third: Adam 怎麼改進 SGD]
4. [fourth: 學習率調度 + 可擴展性]

讀下面的樹狀圖時，先看「我們要把 loss 變小」，再看「每次用多少資料算梯度」，最後才看 Adam 與 learning-rate schedule 怎麼讓訓練更穩。

```text
L23103 數值優化技術與方法
|
+-- 數值優化目標
|   |
|   +-- minimize loss L(w)
|   |   |
|   |   +-- w = 模型參數 / 權重
|   |   +-- L(w) = 預測錯誤的量化結果
|   |   +-- 目標：找到讓 L(w) 盡量小的 w
|   |
|   +-- 訓練流程位置
|       |
|       +-- data -> model -> prediction -> loss -> gradient -> update weights
|
+-- 梯度下降家族
|   |
|   +-- GD / Full-batch Gradient Descent
|   |   |
|   |   +-- 每一步用全部訓練資料
|   |   +-- 梯度穩定
|   |   +-- 每步成本高
|   |
|   +-- SGD / Stochastic Gradient Descent
|   |   |
|   |   +-- 每一步用 1 筆資料
|   |   +-- 更新快
|   |   +-- loss 曲線震盪較大
|   |
|   +-- Mini-batch SGD
|   |   |
|   |   +-- 每一步用一小批資料，例如 32 / 64 / 128
|   |   +-- 效率與穩定性的平衡
|   |   +-- 現實深度學習最常見
|   |   +-- 適合 GPU 並行
|   |
|   +-- Adam Optimizer
|       |
|       +-- Adaptive Moment Estimation
|       +-- 一階動量 m：記住梯度方向趨勢
|       +-- 二階動量 v：估計梯度平方大小
|       +-- 每個參數有自適應步伐
|
+-- 學習率 learning rate
|   |
|   +-- fixed learning rate
|   |   |
|   |   +-- 固定 η
|   |   +-- 簡單但不一定穩
|   |
|   +-- schedules
|       |
|       +-- step decay：每 N epoch 乘以 gamma
|       +-- cosine annealing：用餘弦曲線平滑下降
|       +-- warm-up：初期從小 lr 慢慢升高
|
+-- 損失曲面 loss surface
|   |
|   +-- convex
|   |   |
|   |   +-- 像單一碗狀
|   |   +-- 有唯一全局最小值
|   |   +-- 線性回歸 MSE 常作直覺例子
|   |
|   +-- non-convex
|       |
|       +-- 多個局部最小值 local minima
|       +-- 可能有鞍點 saddle points
|       +-- 深度學習常見
|
+-- 演算法效率 algorithm efficiency
|   |
|   +-- time per step
|   |   |
|   |   +-- 每次更新要算多少資料
|   |   +-- GD 高，SGD 低，Mini-batch 中間
|   |
|   +-- convergence rate
|       |
|       +-- loss 變小的速度
|       +-- 受 learning rate / optimizer / batch size 影響
|
+-- 可擴展性 scalability
    |
    +-- batch size
    |   |
    |   +-- 太小：GPU 利用率低、噪聲大
    |   +-- 太大：記憶體壓力高、可能 OOM
    |
    +-- GPU parallelism
    |   |
    |   +-- Mini-batch 適合矩陣化與平行計算
    |
    +-- memory footprint
        |
        +-- batch_X / activation / gradient 都會吃記憶體
        +-- 大模型與大 batch 要一起評估
```

## 3. Core Concepts

### 3.1 梯度下降基礎與更新規則（Gradient Descent & Update Rule）🔥🔥🔥

**先懂一句話：**梯度下降就是每次看「錯誤往哪邊變大」，然後往反方向走一小步。

**它在流程中的位置：**資料輸入 → 模型預測 → 計算損失 L(w) → 計算梯度 ∇L(w) → 更新權重 w → 重複訓練。

#### 先問自己一個問題

- 模型為什麼需要「優化」？
- 因為一開始的權重（weights）通常不好，模型預測會錯。
- 損失函數（loss function）`L(w)` 就是把「錯得多嚴重」變成一個數字。
- 數值優化（numerical optimization）要做的事，就是讓這個數字越來越小。

#### 技術說法

- 參數（parameter）或權重（weight）記作 `w`。
- 損失函數（loss function）記作 `L(w)`。
- 梯度（gradient）記作 `∇L(w)`。
- 梯度代表「讓 loss 上升最快的方向」。
- 所以更新時要往梯度的反方向走。
- 核心公式是：

```text
w ← w − η · ∇L(w)
```

- `η` 是學習率（learning rate）。
- `∇L(w)` 是目前位置的梯度。
- `−` 是考試最重要的方向：不是往錯誤變大的方向走，而是往錯誤變小的方向走。

#### Everyday Analogy

🗣️ 想像你晚上在陽明山一條沒有路燈的步道上找最低點。

- 你看不到整座山的地圖。
- 你只能用腳感覺現在地面往哪邊比較陡。
- 如果左邊比較往上，你就不要往左。
- 你往「最陡上坡的反方向」慢慢踩一步。
- 每一步不要太大，否則可能踩過頭。
- 這個「每一步多大」就是學習率（learning rate）。

#### 一步一步例子：2-step SGD update trace

題目給：

```text
w0 = 1.0
η = 0.1
∇L(w0) = 2.0
```

第 1 步：

```text
w1 = w0 − η × ∇L(w0)
   = 1.0 − 0.1 × 2.0
   = 1.0 − 0.2
   = 0.8
```

若下一步題目再給：

```text
∇L(w1) = 1.5
```

第 2 步：

```text
w2 = w1 − η × ∇L(w1)
   = 0.8 − 0.1 × 1.5
   = 0.8 − 0.15
   = 0.65
```

考試讀法：

- 先找 `η`。
- 再找 `gradient`。
- 先乘 `η × gradient`。
- 最後用目前的 `w` 減掉它。
- 不要把 `−` 看成 `+`。

#### Update rule ASCII 圖

```text
Loss L(w)
^
|              *
|            *   ← gradient points uphill
|          *
|       *
|    *
|  *  ← move opposite direction
+----------------------> w
      w1     w0

更新方向：w0 --(−η∇L)--> w1
```

#### 超參數要記什麼

| 超參數 | English | 功能 | 考試讀法 |
|---|---|---|---|
| 學習率 | learning rate, η | 控制每一步走多大 | 太大震盪，太小很慢 |
| 迭代次數 | iterations / steps | 更新幾次 | 越多不一定越好，要看 validation |
| 訓練輪數 | epochs | 全部資料被看過幾輪 | 常和 batch size 一起出現 |

#### 情境題 Scenario Bank

| 題目線索 | 快速判斷 | 理由 |
|---|---|---|
| `w=1.0, η=0.1, gradient=2.0`，問下一步 | `w=0.8` | `1.0 − 0.1×2.0 = 0.8` |
| loss 在最低點附近左右跳動 | learning rate 太高 | 步伐太大，越過低點 |
| loss 有下降但非常慢 | learning rate 可能太低 | 每步太小，收斂速度差 |
| 題目問 `w ← w − η∇L` 的減號 | 往梯度反方向 | 梯度是上升最快方向 |
| 題目問 gradient 的直覺 | 最陡上升方向 | 更新時用負梯度下降 |

#### Code Pattern Block

```python
# SGD 更新規則 — 認識這個 pattern，不需要背完整語法
w = 1.0
learning_rate = 0.1
for step in range(3):
    gradient = compute_gradient(w)   # ← 由損失函數對 w 偏微分得到
    w = w - learning_rate * gradient # ← 核心：w ← w − η∇L
    # ↑ 每次往梯度相反方向走一小步
```

考試重點：更新公式 `w ← w − η∇L` 的「減號」方向 + `η` 的角色。

### 3.2 批次策略比較（Batch Strategy: GD / SGD / Mini-batch）🔥🔥🔥

**先懂一句話：**GD、SGD、Mini-batch 的差別不是公式不同，而是「每次用多少資料算梯度」。

**它在流程中的位置：**資料集切批次 → 用一批資料算 loss → 反向傳播算 gradient → optimizer 更新權重 → 下一批資料。

#### 先問自己一個問題

- 為什麼不每次都用全部資料？
- 因為資料量大時，用全部資料算一次梯度很慢、記憶體也大。
- 為什麼不每次只用 1 筆資料？
- 因為 1 筆資料代表性不足，梯度方向容易很吵。
- 所以實務上常用 Mini-batch SGD。

#### Everyday Analogy

🗣️ 想像 7-11 想知道新口味御飯糰好不好吃。

- Full-batch GD：問全台灣每一個顧客，再做一次決策。
- SGD：只問一個路人，就立刻改配方。
- Mini-batch SGD：問一間分店今天的 64 位顧客，再微調配方。
- 全台灣最穩，但慢。
- 一個人最快，但可能偏。
- 一間分店剛剛好，速度與代表性平衡。

#### 技術說法

- Full-batch Gradient Descent（全批次梯度下降）：每一步用全部訓練資料。
- SGD / Stochastic Gradient Descent（隨機梯度下降）：每一步用 1 筆訓練資料。
- Mini-batch SGD（小批次隨機梯度下降）：每一步用一小批資料，例如 32、64、128。
- 三者核心更新規則仍然是 `w ← w − η∇L`。
- 差別只在 `∇L` 是用多少資料估出來。

#### 批次大小影響效率與可擴展性

- 批次越大，梯度估計通常越穩。
- 批次越大，記憶體需求越高。
- 批次越大，不代表永遠越快，因為可能遇到 GPU memory bottleneck。
- 批次太小，GPU 平行計算資源可能吃不滿。
- Mini-batch 天然適合矩陣化運算（matrix operations）與 GPU parallelism。
- 可擴展性（scalability）題目常問：資料量變大、模型變大、GPU 記憶體不足時，該怎麼調。

#### 比較表這樣讀

先抓一句話：

```text
全批穩、單批快、小批剛剛好
```

| 批次策略 | 計算量/次 | 記憶體 | 噪聲 | 收斂穩定性 | GPU 適合度 |
|---|---|---|---|---|---|
| Full-batch GD | 最高 | 最高 | 最低 | 最穩 | 資料太大時不理想 |
| SGD | 最低 | 最低 | 最高 | 最不穩 | 小矩陣不易吃滿 GPU |
| Mini-batch SGD | 中等 | 中等 | 中等 | 平衡 | 最常見、最實用 |

#### 情境題 Scenario Bank

| 題目線索 | 快速判斷 | 理由 |
|---|---|---|
| loss 曲線上下震盪但整體下降 | SGD 或 batch 太小 | 梯度估計噪聲高 |
| 訓練時出現 OOM / GPU memory 不足 | 減小 batch size | 每批資料與 activation 都吃記憶體 |
| GPU 使用率很低，記憶體還很多 | 可嘗試增大 batch size | 提高矩陣化與平行效率 |
| 題目問最常用深度學習批次策略 | Mini-batch SGD | 效率與穩定性平衡 |
| 題目問用全部資料算一次梯度 | Full-batch GD | 穩定但每步成本高 |

#### Code Pattern Block

```python
# Mini-batch SGD — DataLoader 分批訓練 pattern
for epoch in range(num_epochs):
    for batch_X, batch_y in dataloader:     # ← batch_size=64
        optimizer.zero_grad()
        loss = criterion(model(batch_X), batch_y)
        loss.backward()                     # ← 計算批次梯度
        optimizer.step()                    # ← 套用更新規則
```

考試重點：`batch_size` 設定在 DataLoader，`optimizer.step()` 對應更新規則一次執行。

### 3.3 Adam 優化器（Adam Optimizer）🔥🔥

**先懂一句話：**Adam 是會幫每個參數調整步伐大小的 SGD 改良版。

**它在流程中的位置：**計算 batch gradient → Adam 記錄梯度歷史 m/v → 做偏差修正 → 用自適應步伐更新每個參數。

#### 先問自己一個問題

- SGD 的問題是什麼？
- 它通常用同一個 global learning rate 控制所有參數。
- 但不同參數的梯度大小、更新頻率、歷史方向可能不一樣。
- Adam 的考試重點是：它用一階與二階動量估計，讓每個參數有比較合適的更新尺度。

#### Everyday Analogy

🗣️ Adam 像 YouTube 演算法。

- SGD 像所有頻道都用同一個曝光率。
- Adam 會看每個頻道自己的歷史互動。
- 有些頻道互動穩定，就可以穩定推。
- 有些頻道互動忽高忽低，就要調整推播節奏。
- 在模型裡，「每個頻道」就是每個參數。

#### 技術說法

- Adam 全名是 Adaptive Moment Estimation（自適應矩估計）。
- First moment（一階動量）記作 `m_t`，近似 momentum。
- Second moment（二階動量）記作 `v_t`，近似 RMSProp 的梯度平方尺度。
- Bias correction（偏差修正）用來修正初期 `m` 與 `v` 從 0 開始造成的低估。
- Adaptive update（自適應更新）讓每個參數的步伐依照歷史梯度調整。

#### Adam 四步驟

1. `m_t = β₁·m_{t-1} + (1-β₁)·g_t`
2. `v_t = β₂·v_{t-1} + (1-β₂)·g_t²`
3. `m̂_t = m_t / (1-β₁ᵗ)`，同理可修正 `v̂_t`
4. `w ← w − η · m̂_t / (√v̂_t + ε)`

#### 每個符號考試怎麼讀

| 符號 | English | 直覺 | 考試重點 |
|---|---|---|---|
| `g_t` | gradient | 目前這一步的梯度 | 來自 loss 對參數微分 |
| `m_t` | first moment | 梯度方向的移動平均 | momentum |
| `v_t` | second moment | 梯度平方的移動平均 | adaptive scale |
| `β₁` | beta one | 控制一階動量保留多少歷史 | 常見預設 0.9 |
| `β₂` | beta two | 控制二階動量保留多少歷史 | 常見預設 0.999 |
| `ε` | epsilon | 防止除以 0 | 常見很小，例如 1e-8 |
| `η` | learning rate | 全局基礎步伐 | Adam 仍需要 learning rate |

#### 預設超參數

- `β₁ = 0.9`
- `β₂ = 0.999`
- `ε = 1e-8`
- `η = 0.001`
- 考試多半是辨識與角色判斷，不要求手算完整 Adam。

#### Adam vs SGD 什麼時候選

- Adam 適合快速收斂。
- Adam 適合稀疏梯度（sparse gradients）。
- Adam 常見於 NLP、大模型、深度網路初期調參。
- SGD + momentum 在某些 CV 任務可能有更好泛化，但需要較細 learning-rate tuning。
- 如果題目強調「自適應學習率」「內建 momentum」「一階二階動量」，選 Adam。

#### Exam Trap

- `β₁ ≠ β₂`。
- `β₁` 控制 momentum / first moment。
- `β₂` 控制 adaptive scaling / second moment。
- Adam 是 per-parameter adaptive learning rate，但不是說 global learning rate 不重要。

#### 情境題 Scenario Bank

| 題目線索 | 快速判斷 | 理由 |
|---|---|---|
| 稀疏梯度、NLP、大模型、想快速收斂 | Adam | 自適應調整各參數步伐 |
| 問 β₁ 控制什麼 | 一階動量 / momentum | 記住梯度方向趨勢 |
| 問 β₂ 控制什麼 | 二階動量 / adaptive scale | 記住梯度平方尺度 |
| 問 Adam 為何比傳統 GD 有效 | 自動調整各參數 learning rate | 不是只因為「算比較快」 |
| 問 betas=(0.9, 0.999) 順序 | β₁ 在前，β₂ 在後 | PyTorch/常見寫法 |

#### Code Pattern Block

```python
# Adam vs SGD — torch.optim 選擇 pattern
optimizer_sgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
optimizer_adam = torch.optim.Adam(model.parameters(), lr=0.001,
                                   betas=(0.9, 0.999), eps=1e-8)
# ↑ betas[0] = β₁ (momentum), betas[1] = β₂ (adaptive scale)
```

考試重點：`betas=(β₁, β₂)` 順序 + Adam 預設 `lr=0.001`（比 SGD 常用的 `0.01` 小）。

### 3.4 學習率調度與損失曲面（Learning Rate Schedules & Loss Surface）🔥🔥

**先懂一句話：**學習率決定每一步走多大，損失曲面決定你走的地形有多好走。

**它在流程中的位置：**optimizer 更新前讀取目前 learning rate → 沿 loss surface 走一步 → scheduler 依 epoch 或訓練狀態調整下一步 learning rate。

#### 先問自己一個問題

- 為什麼有了 optimizer 還要調 learning rate？
- 因為步伐太大會震盪或發散。
- 步伐太小會收斂很慢。
- 訓練初期、中期、後期需要的步伐可能不同。
- 所以會用 learning-rate schedules（學習率調度）控制訓練節奏。

#### Everyday Analogy

🗣️ 學習率像你找工作時談薪資的出價策略。

- 一開始太激進，可能讓對方嚇到，對應 loss 震盪。
- 一直太保守，可能永遠談不到好 offer，對應 loss 下降太慢。
- Warm-up 像先低調實習，熟悉環境後再談正式薪資。
- Step decay 像每到一個階段就降低調整幅度。
- Cosine annealing 像越接近定案，調整越平滑。

#### 學習率調度（LR Schedules）

| 調度法 | English | 做法 | 讀題關鍵字 |
|---|---|---|---|
| 固定學習率 | fixed learning rate | 全程使用同一個 η | 簡單、但可能不穩 |
| 階梯衰減 | Step Decay | 每 N epoch 乘以衰減係數 | `step_size`, `gamma` |
| 餘弦退火 | Cosine Annealing | 依餘弦曲線平滑下降 | 平滑下降、大模型常見 |
| 暖身 | Warm-up | 初期從小 LR 慢慢升高 | 初期不穩定、防爆炸 |

#### 診斷情境

| loss 現象 | 可能原因 | 常見解法 |
|---|---|---|
| 損失震盪激烈 | LR 太高 | 降低 learning rate |
| 損失下降極慢 | LR 太低 / 平坦區 | 提高 LR 或調 scheduler |
| 損失突然爆炸 | LR 過高或梯度爆炸 | 降 LR、檢查梯度 |
| 初期訓練不穩 | LR 一開始太大 | 使用 warm-up |

#### 損失曲面（Loss Surface）

- 損失曲面（loss surface）是把不同參數 `w` 對應到 loss 的地形。
- 凸函數（convex function）像一個單一碗狀地形。
- 凸函數有唯一全局最小值（global minimum）。
- 在理想條件下，GD 在凸函數上比較容易保證收斂到全局最小值。
- 非凸函數（non-convex function）像山谷、坑洞、鞍點很多的地形。
- 深度學習常見的 loss surface 通常是非凸。
- 局部最小值（local minimum）是在附近最低，但不一定是全局最低。
- 鞍點（saddle point）是某些方向像谷底、某些方向像山頂，梯度等於 0（∇L = 0），但在某些方向是局部最小值、某些方向是局部最大值，因此不是局部最小值。

#### ASCII loss surface 直覺

```text
Convex:

Loss
^
|       \     /
|        \   /
|         \_/
+----------------> w
        global minimum

Non-convex:

Loss
^
|    \_/ \__     __/
|        local\_/     saddle?
|             \__
+----------------------> w
   local minima + saddle points
```

#### 情境題 Scenario Bank

| 題目線索 | 快速判斷 | 理由 |
|---|---|---|
| loss 來回震盪、不穩定 | learning rate 太高 | 步伐太大越過低點 |
| loss 很久才下降一點 | learning rate 太低 | 步伐太小 |
| 初期 loss 爆炸 | 可能需要 warm-up 或降低 LR | 初期更新過大 |
| 題目說唯一全局最小值 | convex function | 凸函數典型特徵 |
| 題目說多局部最小值、鞍點 | non-convex function | 深度學習常見 |
| 題目問 saddle point | 梯度等於 0（∇L = 0），但不是最小值 | 某些方向是局部最小，某些方向是局部最大 |

#### Code Pattern Block

```python
# 學習率調度 — StepLR pattern
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)
for epoch in range(num_epochs):
    train_one_epoch()
    scheduler.step()   # ↑ 每 30 epoch，lr = lr × 0.1
```

考試重點：`step_size` = 幾個 epoch 衰減一次，`gamma` = 衰減倍率。

## 4. Comparison Tables (易混淆概念)

### 4.1 GD vs SGD vs Mini-batch SGD

| 面向 | GD | SGD | Mini-batch SGD |
|---|---|---|---|
| 定義 | 每一步用全部資料 | 每一步用 1 筆資料 | 每一步用一小批資料 |
| 批次大小 | 全資料集 | 1 | 32 / 64 / 128 常見 |
| 噪聲 | 最低 | 最高 | 中等 |
| 收斂穩定性 | 最穩 | 最震盪 | 平衡 |
| 每步計算成本 | 高 | 低 | 中 |
| 記憶體需求 | 高 | 低 | 中 |
| GPU 適合度 | 大資料時可能卡記憶體 | 不易吃滿 GPU | 最適合實務 |
| 適用場景 | 小資料、教學直覺 | 線上更新、資料很大時的概念 | 深度學習主流 |

考試快判：題目問「穩定但慢」選 GD；問「每次一筆、噪聲大」選 SGD；問「效率穩定平衡、GPU」選 Mini-batch。

### 4.2 Adam vs SGD

| 面向 | Adam 特點 | SGD 特點 | 選擇原則 |
|---|---|---|---|
| 學習率 | 每個參數有自適應尺度 | 通常依 global LR 更新 | 題目說 adaptive 選 Adam |
| 動量 | 內建一階動量 | plain SGD 沒有，SGD+momentum 才有 | 題目說內建 momentum 選 Adam |
| 調參難度 | 通常較容易開始 | 對 learning rate 較敏感 | 快速 baseline 常選 Adam |
| 稀疏梯度 | 表現常較好 | 可能更新較不穩 | NLP / sparse gradient 選 Adam |
| 泛化 | 不一定永遠最好 | 某些 CV 任務可搭 momentum 表現好 | 題目強調 CV 泛化可選 SGD+momentum |
| 考試深度 | 認 β₁/β₂/ε 與概念 | 認 update rule 與 momentum | 不手算完整 Adam |

考試快判：看到「一階/二階動量」「自適應學習率」「稀疏梯度」優先想 Adam。

### 4.3 凸函數 vs 非凸函數損失曲面

| 面向 | 凸函數 Convex | 非凸函數 Non-convex |
|---|---|---|
| 地形直覺 | 單一碗狀 | 多山谷、多坑洞 |
| 全局最小值 | 通常唯一 | 可能有多個候選低點 |
| 保證收斂 | 條件合適時較容易保證到 global minimum | 不保證找到 global minimum |
| 局部最小值 | 不會有壞的局部最小值 | 常見 local minima |
| 鞍點 | 較不是主要考點 | 深度學習常見 |
| 代表情境 | 線性回歸 MSE 的直覺例子 | 深度神經網路 loss surface |
| 代表算法 | GD 可作基礎算法 | SGD/Adam/momentum 幫助實務訓練 |

考試快判：看到「多個極值點、局部最優、鞍點、深度學習」就是非凸函數。

### 4.4 學習率診斷

| 症狀 | 原因 | 解法 |
|---|---|---|
| loss 上下大幅震盪 | learning rate 太高 | 降低 LR |
| loss 下降極慢 | learning rate 太低 | 提高 LR 或調 scheduler |
| loss 突然爆炸 | LR 過高或梯度爆炸 | 降 LR，必要時梯度裁剪 |
| 初期就不穩定 | 初始 LR 太大 | 使用 warm-up |
| 後期卡住不進步 | LR 沒有下降或卡平坦區 | step decay / cosine / plateau-based 調整 |
| validation loss 變差 | 可能更新過度或過擬合 | 降 LR，搭配早停概念判斷 |

考試快判：震盪先想 LR 太高；慢先想 LR 太低；爆炸先想 LR 過高或梯度爆炸。

## 5. 口訣 / Mnemonics

### 5.1 SGD 更新口訣

「**減梯乘率走一步**」

```text
w = w − η × ∇L
```

- 減：往反方向。
- 梯：梯度 gradient。
- 乘率：乘學習率 η。
- 走一步：只更新一次，不是直接到最低點。

### 5.2 GD 家族三兄弟口訣

「**全批穩、單批快、小批剛剛好**」

- 全批穩：Full-batch GD 用全部資料，方向穩。
- 單批快：SGD 用一筆資料，更新快但吵。
- 小批剛剛好：Mini-batch SGD 平衡速度、記憶體與穩定性。

### 5.3 Adam 四步驟口訣

「**動量、規模、修正、更新**」

```text
m → v → m̂/v̂ → w
```

- 動量：`m_t` 記住方向。
- 規模：`v_t` 記住梯度平方尺度。
- 修正：bias correction。
- 更新：自適應步伐更新 `w`。

### 5.4 學習率診斷三字訣

「**震是高、慢是低、爆是崩**」

- 震：loss 震盪，learning rate 太高。
- 慢：loss 下降慢，learning rate 太低。
- 爆：loss 爆炸，可能 LR 過高或梯度爆炸。

### 5.5 損失曲面口訣

「**凸有保證、非凸有陷**」

- 凸有保證：凸函數在條件合適時較容易收斂到全局最小值。
- 非凸有陷：非凸函數可能有局部最小值與鞍點。
- 深度學習：通常屬非凸情境。

### 5.6 Batch size 口訣

「**大批穩但吃記憶，小批吵但更新勤**」

- 大 batch：梯度穩，記憶體高。
- 小 batch：噪聲高，單步快。
- Mini-batch：實務平衡點。

## 6. 考試陷阱 (Exam Traps)

### Trap 1：β₁ vs β₂ in Adam

❌ `β₁` 和 `β₂` 都只是 learning rate 的別名。

✅ `β₁` 控制一階動量（first moment / momentum），`β₂` 控制二階動量（second moment / adaptive scale）。

### Trap 2：SGD 的「隨機」意思

❌ SGD 是隨機亂更新權重，所以沒有固定公式。

✅ SGD 是隨機抽樣資料來估梯度，更新公式仍然是 `w ← w − η∇L`。

### Trap 3：Adam 的 learning rate

❌ Adam 會自適應，所以 global learning rate 不重要。

✅ Adam 會做 per-parameter adaptive scaling，但仍然需要 global learning rate，例如常見 `lr=0.001`。

### Trap 4：Saddle point vs local minimum

❌ 梯度等於 0 就一定是全局最小值。

✅ 鞍點（saddle point）與局部最小值（local minimum）梯度都等於 0（∇L = 0），但幾何意義不同：鞍點在某些方向是局部最小、某些方向是局部最大，而局部最小值在所有方向都是局部最小。

### Trap 5：Mini-batch vs full-batch GPU memory

❌ batch size 越大一定越快。

✅ batch size 變大可能提高 GPU 利用率，但也可能因記憶體不足、資料搬移或 activation 太大而變慢或 OOM，且大批次訓練可能導致泛化能力下降（generalization gap）。

### Trap 6：凸函數保證收斂

❌ 所有機器學習模型都能用 GD 保證找到全局最小值。

✅ 只有在 truly convex surface 且條件合適時才談全局收斂保證；深度學習 loss surface 通常是 non-convex。

### Trap 7：降低 learning rate 不是萬用解

❌ 遇到局部最小值或鞍點，只要把 learning rate 降低就會逃出來。

✅ 降低 LR 可能更慢或更卡；題目若問 escape saddle / local traps，常見答案是 momentum 或 Adam 類改良。

### Trap 8：Adam 不是二階方法

❌ Adam 用二階動量，所以是 Newton's method。

✅ Adam 用梯度平方的移動平均做自適應尺度，不是 Hessian / Newton's method；二階方法不在本章範圍。

## 7. 情境題快速判斷 (Scenario Quick-Judge)

| 題目關鍵字 | 快速答案 | 一句理由 |
|---|---|---|
| 損失震盪 / 不穩定 | 學習率過高 | 步伐太大越過低點 |
| 損失下降極慢 / 平坦 | 學習率過低或卡在鞍點 | 步伐太小或地形平坦 |
| 稀疏梯度 / NLP | Adam | 自適應參數步伐適合 sparse gradients |
| 大型 CV 任務 / SGD+momentum | SGD with momentum | 某些 CV 任務泛化表現常被拿來比較 |
| `β₁` | 動量項（first moment） | 記住梯度方向趨勢 |
| `β₂` | 自適應尺度（second moment） | 記住梯度平方大小 |
| `ε` | 防止除以 0 | 放在分母穩定計算 |
| Warm-up | 訓練初期 LR 從小逐漸增大 | 防止初期不穩定 |
| Cosine Annealing | 學習率呈餘弦曲線衰減 | 平滑降低步伐 |
| Step Decay | 每 N epoch 乘以 gamma | `step_size` 與 `gamma` 是關鍵 |
| 唯一全局最小值 | 凸函數 | 單一碗狀地形 |
| 鞍點 / 多局部最小值 | 非凸函數（深度學習損失曲面） | 多坑洞、多地形陷阱 |
| OOM / 記憶體不足 | 減小 batch_size | batch 越大記憶體需求越高 |
| GPU 並行效率低 | 增大 batch_size within memory | 讓矩陣運算更能吃滿 GPU |
| 每一步用全部訓練資料 | Full-batch GD | 梯度穩但每步慢 |
| 每一步用 1 筆資料 | SGD | 快但梯度噪聲高 |
| 每一步用 32/64/128 筆 | Mini-batch SGD | 實務常用平衡點 |
| 題目問 optimizer 內建 momentum | Adam | Adam 追蹤一階動量 |
| `optimizer.step()` | 套用參數更新 | 對應 `w ← w − η∇L` |
| `loss.backward()` | 計算梯度 | 反向傳播取得 gradient |

## 8. 結尾：快速自我檢查 ✅

- [ ] I can do SGD 更新規則算術 in 30 seconds：代入 `η`、`∇L`，追蹤 `w0 → w1 → w2`。
- [ ] I can explain GD vs SGD vs Mini-batch in 30 seconds：說出批次大小、噪聲、穩定性與 GPU 適合度。
- [ ] I can identify Adam β₁/β₂ in 30 seconds：`β₁ = first moment / momentum`，`β₂ = second moment / adaptive scale`。
- [ ] I can diagnose learning-rate symptoms in 30 seconds：震盪=太高，慢=太低，爆炸=可能太高或梯度爆炸。
- [ ] I can separate convex vs non-convex in 30 seconds：凸=唯一全局最小值，非凸=局部最小值與鞍點。
- [ ] I can judge batch size scalability in 30 seconds：batch 大較穩但吃記憶體，batch 小較吵但單步輕。
- [ ] I can read optimizer pseudocode in 30 seconds：`loss.backward()` 算梯度，`optimizer.step()` 更新權重。
- [ ] I can choose Adam vs SGD in 30 seconds：稀疏梯度/快速 baseline 想 Adam，特定 CV 泛化情境可想 SGD+momentum。
- [ ] I can spot out-of-scope distractors in 30 seconds：Newton、Hessian、KKT、constrained optimization 不要深入算。

📌 out-of-scope note：二階方法（Newton's method / Hessian）、constrained optimization、完整 Adam 數學推導、分散式訓練實作細節 → 超出中級考試範圍。

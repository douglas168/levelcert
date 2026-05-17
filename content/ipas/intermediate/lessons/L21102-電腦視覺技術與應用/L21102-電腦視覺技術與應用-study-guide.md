# L21102 電腦視覺技術與應用 - Study Guide

> 一句話定位：這章不是只背「什麼是電腦視覺」，而是要會判斷 **CNN（Convolutional Neural Network，卷積神經網路）怎麼抽特徵、分類/偵測/分割差在哪、YOLO（You Only Look Once，一次看完整張圖的單階段偵測器）/ Faster R-CNN（Faster Region-based Convolutional Neural Network，區域式卷積神經網路）怎麼選、IoU（Intersection over Union，交並比）/ mAP（mean Average Precision，平均精度均值）怎麼評估**。

---

## 0. How to Use This Guide

這份 guide 用閱讀優先的方式整理。每個核心主題都照這個順序讀：

```text
先懂一句話
→ Everyday Analogy
→ 先問自己一個問題
→ 技術說法
→ 流程 / 選擇流程
→ 一步一步例子（有計算或流程時）
→ 比較表這樣讀
→ 記憶方式
→ Exam Rule
→ Quick Check（答案直接放下面）
```

讀的時候不要先背表格，先問兩件事：

1. 題目要模型輸出什麼？一個 label、bbox、每個像素，還是每個個體的 mask？
2. 題目重視什麼？即時速度、最高精度、像素邊界，還是同類物件分開？

---

## 1. Big Picture / Core Pipeline

### 先懂一句話

電腦視覺（Computer Vision, CV）的考點可以分成三層：**底層 CNN 元件負責看懂圖片特徵，任務類型決定輸出格式，評估指標判斷模型做得好不好**。

### Everyday Analogy

想像你在檢查一張超市貨架照片：

- 先看局部特徵：瓶蓋、包裝邊緣、文字紋理，這像 CNN 在抽特徵。
- 再決定任務：只問「這張圖有飲料嗎」是分類；要框出每瓶飲料是偵測；要描出每瓶輪廓是分割。
- 最後評分：框有沒有框準，輪廓有沒有貼齊，這就是 IoU、mAP、mIoU 的角色。

### 先問自己一個問題

題目是在問「模型內部怎麼看圖」，還是在問「輸出結果長什麼樣」？

- 問內部：想 CNN、卷積、ReLU、BN、Pooling、ResNet。
- 問輸出：想分類、偵測、語意分割、實例分割、全景分割。
- 問評分：想 Top-1、IoU、mAP、mIoU。

### 技術說法

```text
原始影像 (Raw Image)
  │
  ▼
CNN Backbone
  ├─ 卷積層 (Convolutional Layer) - 抽局部特徵
  ├─ 批次正規化 (Batch Normalization, BN) - 穩定訓練
  ├─ 激活函數 (Activation Function, ReLU) - 加入非線性
  ├─ 池化層 (Pooling Layer) - 縮小特徵圖 + 平移不變性
  ├─ 殘差連接 (Skip Connection, ResNet) - 解決退化問題
  └─ 全連接層 (Fully Connected Layer, FC) - 做最後分類
  │
  ▼
任務選擇 (Task Selection)
  ├─ 影像分類 (Image Classification) → 單一 label
  ├─ 物件偵測 (Object Detection) → bbox + 類別 + 信心
  ├─ 語意分割 (Semantic Segmentation) → 每像素類別
  ├─ 實例分割 (Instance Segmentation) → 每像素類別 + 個體 ID
  └─ 全景分割 (Panoptic Segmentation) → stuff + things 全部標
  │
  ▼
評估指標 (Evaluation Metrics)
  ├─ 分類 → Top-1 / Top-5 accuracy
  ├─ 偵測 → IoU → Precision / Recall → AP（Average Precision，平均精度）→ mAP
  └─ 分割 → mIoU（mean IoU，平均交並比）/ mAP-mask / PQ（Panoptic Quality，全景品質）
```

### 流程 / 選擇流程

```text
看到圖片任務
│
├─ 只要整張圖一個答案？→ Image Classification → ResNet
├─ 要框出物件位置？→ Object Detection
│    ├─ 即時 / 高 FPS（Frames Per Second，每秒影格數）→ YOLO
│    └─ 高精度 / 不計速度 → Faster R-CNN
└─ 要每個像素都有答案？→ Segmentation
     ├─ 同類不分個體 → Semantic Segmentation → U-Net / DeepLab
     ├─ 同類要分個體 → Instance Segmentation → Mask R-CNN
     └─ 背景 stuff 也要全標 → Panoptic Segmentation → Panoptic FPN（Feature Pyramid Network，特徵金字塔網路）
```

### 比較表這樣讀

這張表不是背名詞，而是用「輸出格式」判斷答案。

| 題目線索 | 你要想到 | 常見架構 / 指標 |
|---|---|---|
| 整張圖一個類別 | 影像分類 (Classification) | ResNet / Top-1 accuracy |
| bbox、方框、位置 + 類別 | 物件偵測 (Object Detection) | YOLO、Faster R-CNN / mAP |
| 每個像素標類別、不分個體 | 語意分割 (Semantic Segmentation) | U-Net、DeepLab / mIoU |
| 每個像素標類別、同類也要分開 | 實例分割 (Instance Segmentation) | Mask R-CNN / mAP-mask |
| 天空、路面、行人、車全部逐像素標 | 全景分割 (Panoptic Segmentation) | Panoptic FPN（Feature Pyramid Network，特徵金字塔網路）/ PQ（Panoptic Quality，全景品質） |

### 記憶方式

```text
一張標 = 分類
有框 = 偵測
每個像素 = 分割
每個像素 + 分個體 = 實例分割
stuff + things 全部標 = 全景分割
```

### Exam Rule

```text
題目問 CNN 元件 → 先分辨卷積 / ReLU / BN / Pooling / FC / ResNet
題目問任務 → 先看輸出格式
題目問速度 vs 精度 → YOLO 快，Faster R-CNN 傳統高精度
題目問偵測評估 → IoU、AP、mAP
題目問分割評估 → mIoU 或 mask mAP，不要混成分類 accuracy
```

### Quick Check

題目說「模型要框出影像中的每一台車，並標出車型與信心分數」，這是分類、偵測，還是分割？

答案：物件偵測（Object Detection）。因為輸出是 `bbox + 類別 + 信心分數`，不是整張圖一個 label，也不是每個像素的 mask。

---

## 2. CNN 底層元件

### 先懂一句話

CNN（Convolutional Neural Network，卷積神經網路）用「小視窗掃圖片」來抽局部特徵，避免把整張影像攤平成全連接網路造成**參數爆炸**與**位置太敏感**。

### Everyday Analogy

你認貓不會把照片每個像素都重新背一遍，而是掃到「耳朵、鬍鬚、眼睛形狀」就能判斷。卷積核（kernel/filter）就像小型特徵偵測器，在圖片上滑動，看到相似局部特徵就會有反應。

### 先問自己一個問題

為什麼影像不用一般全連接網路（Fully Connected Network）直接處理？

因為影像很大。`224 x 224 x 3 = 150,528` 個輸入，如果接 1,000 個神經元，就需要約 1.5 億個權重，而且貓往右移幾個像素，權重關係就變了。

### 技術說法

CNN 的基本 block 常見寫法是：

```text
Conv → BN → ReLU → Pool
```

在簡化教科書題目中，也常看到：

```text
Conv → ReLU → Pool
```

各元件職責：

| 元件 | 中文重點 | 技術作用 | 考試口訣 |
|---|---|---|---|
| 卷積層 (Convolutional Layer) | 找局部特徵 | kernel 滑過圖片，抽邊緣、紋理、形狀 | 卷積抽特徵 |
| 批次正規化 (Batch Normalization, BN) | 穩定訓練 | 對 mini-batch 特徵正規化，再用可學參數縮放平移 | BN 穩訓練 |
| 激活函數 (Activation Function, ReLU) | 加非線性 | `max(0, x)`，讓模型能學複雜模式 | ReLU 加彎度 |
| 池化層 (Pooling Layer) | 縮小尺寸 | 降低特徵圖大小，提升平移不變性 | Pooling 縮維度 |
| 全連接層 (Fully Connected Layer, FC) | 做最後判斷 | 根據高階特徵輸出類別分數 | FC 說答案 |

Batch Normalization（批次正規化）的三個考點：

1. 加速訓練，允許較大的學習率。
2. 緩解梯度消失 / 爆炸，讓深層網路更穩。
3. mini-batch 統計量帶來輕微正則化效果。

### 流程 / 選擇流程

```text
輸入圖片
  │
  ├─ Conv：用 kernel 找邊緣 / 紋理 / 局部形狀
  ├─ BN：把每層輸出調穩，訓練比較順
  ├─ ReLU：加入非線性，負值歸零
  ├─ Pool：縮小特徵圖，保留重要訊號
  └─ FC / Softmax：輸出分類機率
```

### 一步一步例子

卷積輸出尺寸公式必背：

```text
O = floor((W - F + 2P) / S) + 1

W = 輸入邊長
F = kernel / filter size
P = padding
S = stride
```

例題：輸入 `224 x 224`，kernel `7 x 7`，stride `2`，padding `3`。

```text
O = floor((224 - 7 + 2 x 3) / 2) + 1
  = floor((224 - 7 + 6) / 2) + 1
  = floor(223 / 2) + 1
  = 111 + 1
  = 112

若有 64 個 filters，輸出是 112 x 112 x 64。
```

池化例子：

```text
2 x 2 Max Pooling 視窗：

[1, 3]
[2, 8]

輸出 = 8
```

最大池化保留最強訊號；平均池化取平均；全域平均池化（Global Average Pooling, GAP）常用在 ResNet 最後，把整張特徵圖壓成每個 channel 一個值。

### 比較表這樣讀

讀這張表時只看「這層在回答什麼問題」。

| 問題 | 對應元件 | 不要誤選 |
|---|---|---|
| 圖中有哪些局部特徵？ | 卷積層 (Conv) | 不是 Pooling |
| 要讓網路學非線性模式？ | ReLU | 不是 FC |
| 要讓深層訓練穩定？ | BN | 不是單靠 Pooling |
| 要縮小特徵圖、提升平移不變性？ | 池化層 (Pooling) | 不是抽新特徵 |
| 要輸出最終類別分數？ | 全連接層 (FC) | 不是 Conv 本身 |

### 記憶方式

```text
Conv 找特徵
BN 穩訓練
ReLU 加非線性
Pool 縮尺寸
FC 說答案
```

### Exam Rule

```text
影像參數爆炸 / 位置不變性需求 → CNN
抽局部特徵 / 邊緣 / 紋理 → 卷積層
每次跳幾格 → stride
邊緣補零保尺寸 → padding
縮小特徵圖 / 平移不變性 → Pooling
Pooling 不是抽特徵，抽特徵是 Conv
卷積輸出尺寸 → O = floor((W - F + 2P) / S) + 1
```

### Quick Check

池化層（Pooling Layer）最主要的目的，是抽取更多特徵嗎？

答案：不是。池化層主要是縮小特徵圖、保留關鍵訊號、提升平移不變性；抽取局部特徵是卷積層的工作。

---

## 3. ResNet 殘差連接

### 先懂一句話

ResNet 用殘差連接（skip connection / shortcut connection）讓輸入 `x` 可以直接繞過幾層後加回輸出，核心是解決**網路越深、訓練誤差反而變大**的退化問題（degradation problem）。

### Everyday Analogy

你請 10 個人接力轉述一句話，很容易越傳越歪。skip connection 像是把原話也一起附上，後面的人不用從零重建整句，只要補充「需要修正的部分」。ResNet 也是這樣：block 不必硬學完整輸出，只要學殘差（residual）修正量。

### 先問自己一個問題

如果加深網路後「訓練誤差」也變大，這是過擬合嗎？

不是。過擬合是訓練誤差低、測試誤差高；退化問題是連訓練資料都學不好。ResNet 的核心動機是解決退化問題。

### 技術說法

```text
普通 CNN block：
x → [Conv → BN → ReLU → Conv → BN] → H(x)

ResNet block：
x ──────────────── shortcut ───────────────┐
│                                           ▼
└→ [Conv → BN → ReLU → Conv → BN] → F(x) → (+) → H(x)
```

核心公式：

```text
H(x) = F(x) + x

x    = 原始輸入
F(x) = block 學到的修正量，也就是殘差
H(x) = 原輸入 + 修正量
```

如果這個 block 沒什麼可學，`F(x) → 0`，就會變成：

```text
H(x) = x
```

也就是恆等映射（identity mapping），最壞情況只是把輸入原樣傳下去，不會因為加深而更難訓練。

### 流程 / 選擇流程

```text
題目問深層網路問題
│
├─ 訓練誤差也變大、越深越難訓？→ 退化問題 → ResNet skip connection
├─ 梯度越傳越弱？→ 梯度消失 → BN + ReLU 是主要解法，skip connection 有次要幫助
└─ 訓練誤差低、測試誤差高？→ 過擬合 → Dropout / 正規化 / 資料擴增
```

### 一步一步例子

假設某個 ResNet block 收到輸入 `x`：

```text
Step 1：x 走主路徑，經過 Conv / BN / ReLU，學到 F(x)
Step 2：x 也走捷徑 shortcut，直接保留下來
Step 3：把 F(x) 和 x 相加
Step 4：得到 H(x) = F(x) + x
```

如果輸入輸出維度相同：

```text
H(x) = F(x) + x
```

如果輸入輸出維度不同，例如 channel 從 256 變 512，就不能直接相加，要用 `1 x 1 conv` 對齊：

```text
H(x) = F(x) + Ws x
```

### 比較表這樣讀

這張表要抓「維度是否相同」。

| shortcut 類型 | 什麼時候用 | 公式 | 考試判斷 |
|---|---|---|---|
| Identity shortcut | 輸入輸出維度相同 | `H(x) = F(x) + x` | 直接相加，無額外參數 |
| Projection shortcut | 輸入輸出維度不同 | `H(x) = F(x) + Ws x` | 用 `1 x 1 conv` 對齊維度 |

普通 CNN vs ResNet：

| 比較項目 | 普通 CNN | ResNet |
|---|---|---|
| block 輸出 | `H(x) = F(x)` | `H(x) = F(x) + x` |
| 深層訓練 | 容易遇到退化問題 | 加深後仍較容易訓練 |
| 最壞情況 | 可能比淺層更差 | 可退回 identity mapping |
| 核心解法 | 無捷徑 | skip connection |

### 記憶方式

```text
ResNet = 原本答案 + 修正量
H(x) = x + F(x)
同維度直接加，不同維度 1 x 1 conv 對齊再加
```

### Exam Rule

```text
訓練誤差也隨深度增加 → 退化問題 (degradation)
ResNet 核心動機 → 解決退化問題，不是解決過擬合
H(x) = F(x) + x → identity shortcut
H(x) = F(x) + Ws x → projection shortcut，用 1 x 1 conv 對齊維度
梯度消失主要靠 BN + ReLU，skip connection 是次要幫助
ResNet-50 的 50 → 網路總共有 50 層可訓練層
```

### Quick Check

ResNet 的 skip connection 主要解決什麼問題？

答案：退化問題（degradation problem）。它指的是網路加深後，訓練誤差本身也變大；這不是過擬合。skip connection 對梯度流動有幫助，但考試問核心動機時要選退化問題。

---

## 4. 三大任務族：分類、偵測、分割

### 先懂一句話

分類、偵測、分割的差別，不是模型名字，而是**模型要回答得多細**：分類回答「是什麼」，偵測回答「在哪裡 + 是什麼」，分割回答「每個像素屬於誰」。

### Everyday Analogy

用一張外送照片來想：

- 分類：這張照片裡有食物嗎？
- 偵測：便當、飲料、餐具各在哪裡？請用方框圈出來。
- 語意分割：哪些像素是便當、哪些像素是飲料？
- 實例分割：三杯飲料要分成飲料 1、飲料 2、飲料 3。
- 全景分割：桌面、背景、餐具、每杯飲料全部逐像素標清楚。

### 先問自己一個問題

題目要的是一個答案、一堆框，還是一張像素級地圖？

這是所有 CV 情境題的第一個判斷點。

### 技術說法

| 任務 | 英文 | 輸出 | 代表架構 | 常見指標 |
|---|---|---|---|---|
| 影像分類 | Image Classification | 單一類別 label | ResNet | Top-1 / Top-5 accuracy |
| 物件偵測 | Object Detection | bbox + 類別 + 信心 list | YOLO / Faster R-CNN | mAP |
| 語意分割 | Semantic Segmentation | 每像素類別 map | U-Net / FCN / DeepLab | mIoU |
| 實例分割 | Instance Segmentation | 每像素類別 + 個體 ID | Mask R-CNN | mAP-mask |
| 全景分割 | Panoptic Segmentation | 所有像素的類別 + 個體 ID | Panoptic FPN | PQ |

### 流程 / 選擇流程

```text
題目描述影像輸出需求
│
├─ 只要「這張圖是什麼」→ Classification
├─ 要「物件在哪裡」→ Object Detection
└─ 要「每個像素是什麼」→ Segmentation
     ├─ 同類不用分個體 → Semantic Segmentation
     ├─ 同類要分個體 → Instance Segmentation
     └─ stuff + things 都要完整標 → Panoptic Segmentation
```

### 一步一步例子

情境：草地上有 1 隻狗和 3 隻羊。

```text
Classification：
輸出 = 「動物」或「草地動物」

Object Detection：
輸出 = [狗 bbox] + [羊1 bbox] + [羊2 bbox] + [羊3 bbox]

Semantic Segmentation：
狗的像素 → 狗
羊的像素 → 羊
三隻羊不分第幾隻，全部都是同一種「羊」標籤

Instance Segmentation：
狗的像素 → 狗-1
羊的像素 → 羊-1、羊-2、羊-3，各自獨立 mask

Panoptic Segmentation：
狗、羊要分個體；草地、天空、路面這類背景也要逐像素標
```

### 比較表這樣讀

讀這張表時用「同類要不要分個體」當關鍵。

| 比較面向 | 語意分割 | 實例分割 | 全景分割 |
|---|---|---|---|
| 像素標籤內容 | 類別 | 類別 + 個體 ID | 類別 + 個體 ID |
| 三台車怎麼標 | 全部同一種「車」色 | 車1、車2、車3 各自 mask | 車1、車2、車3，加上道路天空等背景 |
| 是否處理 stuff（天空、路面） | 會 | 通常不強調 | 會，而且所有像素都要標 |
| 代表架構 | U-Net / DeepLab | Mask R-CNN | Panoptic FPN |

### 記憶方式

```text
分類：一張圖一個答案
偵測：每個物件一個框
語意分割：同類一片色
實例分割：同類也點名
全景分割：things + stuff 全包辦
```

### Exam Rule

```text
整張圖一個答案 / 貓還是狗 → Classification / ResNet
框出物件位置 + 類別 + 信心 → Object Detection / YOLO / Faster R-CNN
醫學影像切邊 / 腫瘤輪廓 / 像素級標記 → Semantic Segmentation / U-Net
3 隻羊要分開 / 每人獨立 mask → Instance Segmentation / Mask R-CNN
天空 + 路面 + 每個人都要標 → Panoptic Segmentation / Panoptic FPN
mAP 是偵測常用指標，mIoU 是語意分割常用指標
```

### Quick Check

「醫院想讓 AI 在 CT 圖中標出每個腫瘤的輪廓，且每個腫瘤要獨立標記」，應選哪種任務和架構？

答案：實例分割（Instance Segmentation）/ Mask R-CNN。因為需要像素級輪廓，而且每個腫瘤個體要分開；語意分割只能標「腫瘤」類別，不能分第幾顆。

---

## 5. 物件偵測：YOLO vs Faster R-CNN

### 先懂一句話

物件偵測（Object Detection）要輸出 `bbox + 類別 + 信心分數`；YOLO 是單階段（single-stage / single-shot）代表，重點是快，Faster R-CNN 是兩階段（two-stage）代表，傳統重點是準。

### Everyday Analogy

找餐廳時：

- YOLO 像直接問手機「附近最高評分牛肉麵在哪」，一次給你結果，速度快。
- Faster R-CNN 像先列出一堆候選店，再逐家檢查評分、距離、評論，流程較慢但傳統上更細。

### 先問自己一個問題

題目比較的是「即時速度」還是「最高精度」？

- 看到即時、毫秒級、高 FPS、邊際裝置、監視器、產線：先想 YOLO。
- 看到醫療、離線分析、不計時間、小物件、最高精度：先想 Faster R-CNN。

### 技術說法

```text
YOLO（單階段）：
Image → Backbone → Neck → Detection Head → bbox + class + confidence

Faster R-CNN（兩階段）：
Image → Backbone → RPN 提候選框 → NMS 篩選 → RoI 分類 + bbox refine
```

RPN（Region Proposal Network）先提出可能有物件的候選區域，再交給後面分類與修框。

NMS（Non-Maximum Suppression，非最大值抑制）用來刪掉同一物件的重複框，只留下信心最高的框。

### 流程 / 選擇流程

```text
題目要做 Object Detection
│
├─ 需要即時 / 30 FPS / 邊際裝置 / 產線 → YOLO
├─ 需要最高精度 / 醫療 / 離線 / 小物件 → Faster R-CNN
└─ 題目問重複框如何處理 → NMS
```

### 一步一步例子

YOLO 偵測流程：

```text
Step 1：圖片進入 CNN backbone 抽特徵
Step 2：detection head 直接預測多個 bbox
Step 3：每個 bbox 都有類別與信心分數
Step 4：用 NMS 移除高度重疊的重複框（YOLOv5-v8 常見）
Step 5：輸出最後 bbox list
```

Faster R-CNN 偵測流程：

```text
Step 1：圖片進入 CNN backbone 抽特徵
Step 2：RPN 產生候選框 proposals
Step 3：NMS 篩選候選框
Step 4：RoI head 對候選框分類，並精修 bbox
Step 5：輸出 bbox + 類別 + 信心
```

考試陷阱：Faster R-CNN 的「約 2000 個 proposals」常指訓練或 RPN 候選階段；推論時經 NMS 篩選後通常剩較少候選框再分類精修。題目若拿候選框數量比較速度，要先看描述情境。

### 比較表這樣讀

這張表用「考題線索」讀，不要死背哪個永遠比較好。

| 比較面向 | YOLO（單階段） | Faster R-CNN（兩階段） |
|---|---|---|
| 流程 | 一次 forward 直接預測 bbox | 先提候選框，再分類與修框 |
| 主要優勢 | 快、適合即時 | 傳統精度高、細緻 |
| 常見場景 | 監視器、產線、邊際裝置、自駕即時 | 醫療影像、離線精密分析、小物件 |
| 速度線索 | 毫秒級、30+ FPS | 數十至上百 ms |
| NMS | v5-v8 常需要；v10 強調 NMS-free | 需要 |

YOLO 世代考點：

| 版本 | 考試抓法 |
|---|---|
| YOLOv3-v7 | anchor-based，要用 anchor / prior box |
| YOLOv8 | anchor-free，仍常見 NMS |
| YOLOv10 | NMS-free，訓練一對多、推論一對一 |

### 記憶方式

```text
YOLO = You Only Look Once = 看一次就出框 = 快
Faster R-CNN = 先找候選，再細判斷 = 傳統高精度
NMS = 同一物件多個框，只留信心最高
```

### Exam Rule

```text
即時偵測 / 毫秒級 / 高 FPS / 監視器 / 邊際裝置 → YOLO
最高精度 / 醫療影像 / 離線分析 / 小物件 → Faster R-CNN
先提候選框再分類 → Faster R-CNN / two-stage detector
一次 forward 直接出框 → YOLO / single-stage detector
重疊 bbox 太多，留信心最高 → NMS
工廠產線即時瑕疵偵測 → YOLO
```

### Quick Check

某工廠要在產線上即時偵測瑕疵品，要求每秒處理 30 幀以上，應選哪種偵測器？

答案：YOLO（單階段偵測器）。因為題目重點是即時性與高 FPS；Faster R-CNN 傳統精度高，但不適合這種速度優先的場景。

---

## 6. 任務與架構選型

### 先懂一句話

選架構不要靠名字熟不熟，而要照順序判斷：**輸出格式 → 場景限制 → 架構 → 評估指標**。

### Everyday Analogy

選 CV 架構像選工具。要鎖螺絲用螺絲起子，要切紙用剪刀；不是工具越複雜越好，而是任務需要什麼輸出。只要整張圖答案就用分類，需要即時方框就用 YOLO，需要像素邊界就用 U-Net，需要每個人分開 mask 就用 Mask R-CNN。

### 先問自己一個問題

題目真正要的是哪一種輸出？

```text
一個 label？
一串 bbox？
每個像素一個類別？
每個像素 + 同類個體也要分開？
```

### 技術說法

| 場景 | 任務類型 | 代表架構 | 評估指標 |
|---|---|---|---|
| 整張圖判斷有沒有人 | 影像分類 | ResNet | Top-1 accuracy |
| 產線即時瑕疵偵測 | 物件偵測（即時） | YOLO | mAP |
| 醫療 CT 精準偵測腫瘤位置 | 物件偵測（高精度） | Faster R-CNN | mAP |
| 手術或醫療影像切腫瘤邊界 | 語意分割 | U-Net | mIoU |
| 自駕路面逐像素分類 | 語意分割 | DeepLab / FCN | mIoU |
| 人群計數且每個人分開 | 實例分割 | Mask R-CNN | mAP-mask |
| 天空、道路、行人、車全部標 | 全景分割 | Panoptic FPN | PQ |

### 流程 / 選擇流程

```text
Step 1：先看輸出格式
│
├─ 單一 label → Classification → ResNet
├─ bbox list → Detection
│    ├─ 要即時 → YOLO
│    └─ 要高精度 → Faster R-CNN
└─ pixel map → Segmentation
     ├─ 不分個體 → Semantic Segmentation → U-Net / DeepLab
     ├─ 分個體 → Instance Segmentation → Mask R-CNN
     └─ stuff + things 全標 → Panoptic Segmentation → Panoptic FPN

Step 2：再看評估指標
│
├─ Classification → Accuracy
├─ Detection → mAP
├─ Semantic Segmentation → mIoU
└─ Instance Segmentation → mAP-mask
```

### 一步一步例子

題目：「自動駕駛攝影機要把天空、道路、行人 1、行人 2、車 1、車 2 全部標出來。」

```text
Step 1：需要每個像素都有標籤 → segmentation，不是 classification / detection
Step 2：行人和車要分個體 → instance-level
Step 3：天空、道路這種 stuff 也要標 → panoptic segmentation
Step 4：代表架構 → Panoptic FPN
```

題目：「MRI 影像要標出腫瘤輪廓，但不要求每顆腫瘤分開。」

```text
Step 1：需要像素級輪廓 → segmentation
Step 2：不分個體 → semantic segmentation
Step 3：醫學影像常見架構 → U-Net
Step 4：評估指標 → mIoU
```

### 比較表這樣讀

這張表用「輸出」直接配答案。

| 輸出形式 | 任務 | 架構 | 指標 |
|---|---|---|---|
| 單一 label | Classification | ResNet | Top-1 / Top-5 |
| bbox + 類別 + 信心，速度優先 | Detection | YOLO | mAP |
| bbox + 類別 + 信心，精度優先 | Detection | Faster R-CNN | mAP |
| 逐像素類別，不分個體 | Semantic Segmentation | U-Net / DeepLab | mIoU |
| 逐像素類別 + 個體 ID | Instance Segmentation | Mask R-CNN | mAP-mask |
| 所有像素 + things/stuff | Panoptic Segmentation | Panoptic FPN | PQ |

### 記憶方式

```text
label → ResNet
bbox + fast → YOLO
bbox + precise → Faster R-CNN
pixel class → U-Net / DeepLab
pixel + instance → Mask R-CNN
pixel + everything → Panoptic FPN
```

### Exam Rule

```text
輸出 = 一個 label → 分類 → ResNet
輸出 = bbox list，且要即時 → YOLO
輸出 = bbox list，且要高精度 → Faster R-CNN
輸出 = 每像素類別（不分個體）→ U-Net / DeepLab
輸出 = 每像素類別 + 個體 → Mask R-CNN
醫學影像切邊 / 細胞邊界 → U-Net（若不分個體）
人群計數 / 每人獨立 mask → Mask R-CNN
```

### Quick Check

「自動駕駛系統需要將攝影機影像的每個像素分類為天空、道路、行人 1、行人 2，且行人之間必須分開標記」，應選哪種架構？

答案：最完整選全景分割（Panoptic Segmentation）/ Panoptic FPN。因為天空、道路屬於 stuff，行人又需要分個體；若題目只強調行人分個體、不強調背景全標，則可選實例分割 / Mask R-CNN。

---

## 7. 評估指標：IoU 與 mAP

### 先懂一句話

物件偵測不能只問「有沒有找到」，還要問「框得準不準」。IoU 量單一預測框和真實框的重疊度，mAP 量整個偵測模型在所有類別上的平均表現。

### Everyday Analogy

你和朋友各畫一個圈，想圈出同一塊地。IoU 就是「你們兩個圈重疊的部分」除以「兩個圈合起來覆蓋的總範圍」。重疊越多，IoU 越高，代表定位越準。

`mAP@0.5` 像寬鬆老師，只要求 IoU 過 0.5；`mAP@0.5:0.95` 像 10 位老師從寬到嚴一起打分，最後取平均。

### 先問自己一個問題

題目問的是單一框、單一類別，還是整個資料集平均？

- 單一預測框 vs 真實框：IoU。
- 某一類別的 PR 曲線下面積：AP。
- 所有類別 AP 平均：mAP。
- 語意分割逐像素平均：mIoU。

### 技術說法

```text
IoU = Intersection / Union
    = 交集面積 / 聯集面積
```

常見判斷：

```text
IoU >= 0.5 → 通常可算 True Positive
IoU < 0.5  → False Positive
```

Precision / Recall：

```text
Precision = TP / (TP + FP)  ← 你說有的，有多少是真的
Recall    = TP / (TP + FN)  ← 真的有的，你抓到幾個
F1        = 2PR / (P + R)
```

AP / mAP：

| 指標 | 中文意思 | 技術定義 |
|---|---|---|
| AP (Average Precision) | 單一類別平均精度 | 某類別 Precision-Recall 曲線下面積 |
| mAP (mean Average Precision) | 多類別平均精度 | 所有類別 AP 的平均 |
| mIoU (mean IoU) | 多類別平均交並比 | 分割任務中各類別 IoU 的平均 |

### 流程 / 選擇流程

```text
偵測模型輸出 bbox
│
├─ 和 ground truth 比重疊 → IoU
├─ IoU 過門檻 → TP，沒過 → FP
├─ 用 TP / FP / FN 算 Precision 和 Recall
├─ 畫 PR curve，曲線下面積 → AP（單一類別）
└─ 所有類別 AP 平均 → mAP
```

### 一步一步例子

IoU 計算：

```text
預測框面積 = 100 x 100 = 10,000
真實框面積 = 100 x 100 = 10,000
交集面積 = 50 x 50 = 2,500

聯集面積 = 預測框 + 真實框 - 交集
        = 10,000 + 10,000 - 2,500
        = 17,500

IoU = 2,500 / 17,500
    = 0.143
```

如果門檻是 `IoU >= 0.5` 才算 True Positive，這個偵測就是 False Positive。

mAP@0.5:0.95 計算概念：

```text
Step 1：在 IoU=0.50 算一次 mAP
Step 2：在 IoU=0.55 算一次 mAP
Step 3：一路算到 IoU=0.95
Step 4：共 10 個門檻，把 10 個 mAP 平均
```

### 比較表這樣讀

這張表用「嚴格度」看。

| 指標 | IoU 門檻 | 嚴格度 | 常見資料集 / 用法 |
|---|---|---|---|
| mAP@0.5 | 單一門檻 0.5 | 較寬鬆 | PASCAL VOC |
| mAP@0.5:0.95 | 0.50, 0.55, ..., 0.95，共 10 個門檻 | 較嚴格 | COCO / 現代論文常見 |

不要把 mAP 和 mIoU 混在一起：

| 任務 | 常見指標 | 判斷重點 |
|---|---|---|
| Object Detection | mAP | bbox 是否框準、類別是否對 |
| Semantic Segmentation | mIoU | 每個像素類別是否標準 |
| Instance Segmentation | mAP-mask | mask 是否準、個體是否分對 |

### 記憶方式

```text
IoU = 交集 / 聯集
AP = 一個類別的 PR 曲線面積
mAP = 多個類別 AP 平均
0.5:0.95 = 10 個門檻平均，COCO，比較嚴格
```

### Exam Rule

```text
交集面積 / 聯集面積 → IoU
IoU >= 0.5 → 常見 TP 判斷門檻，但不是完美偵測
某一類別 PR 曲線下面積 → AP
各類別 AP 平均 → mAP
PASCAL VOC / 單一門檻 0.5 → mAP@0.5
COCO / 10 個門檻平均 / 嚴格評測 → mAP@0.5:0.95
語意分割 → mIoU，不是 mAP
```

### Quick Check

「某論文報告 mAP@0.5:0.95 = 0.52」，這個指標是怎麼計算的？

答案：在 IoU 門檻 `0.50, 0.55, 0.60, ..., 0.95` 共 10 個門檻下分別計算 mAP，再取平均。這是 COCO 慣例，比只看 `mAP@0.5` 嚴格。

---

## 8. Exam Decision Trees

### Tree A：看到「任務需求」→ 選架構

```text
題目描述應用場景，問要用什麼架構？
│
├─ 輸出是整張圖的類別？
│     └─ 影像分類 (Image Classification) / ResNet
│
├─ 輸出是物件位置框 + 類別？
│     ├─ 需要即時 / 高 FPS / 毫秒級？
│     │     └─ YOLO（單階段偵測器）
│     └─ 需要最高精度 / 不計速度？
│           └─ Faster R-CNN（兩階段偵測器）
│
└─ 輸出是每個像素的標籤？
      ├─ 同類不需要分個體？
      │     └─ 語意分割 / U-Net / DeepLab
      ├─ 同類也要分個體？
      │     └─ 實例分割 / Mask R-CNN
      └─ 所有像素都要標，包含天空 / 路面 + 個體分開？
            └─ 全景分割 / Panoptic FPN
```

### Tree B：看到「CNN 元件問題」→ 判斷是哪個元件

```text
題目在問 CNN 某個元件的目的或效果？
│
├─ 抽取局部特徵 / 邊緣 / 紋理？
│     └─ 卷積層 (Convolutional Layer)
│
├─ 穩定每層輸出 / 加速訓練 / 緩解梯度問題？
│     └─ 批次正規化 (Batch Normalization, BN)
│
├─ 縮小特徵圖 / 平移不變性 / 降低參數量？
│     └─ 池化層 (Pooling Layer)
│        注意：不是抽特徵，那是卷積層
│
├─ 引入非線性 / 讓網路學複雜模式？
│     └─ 激活函數 (ReLU)
│
└─ 根據特徵做最後分類 / 輸出類別機率？
      └─ 全連接層 (Fully Connected Layer)
```

### Tree C：看到「深層網路問題」→ 判斷解法

```text
題目提到深層網路訓練問題？
│
├─ 訓練誤差也在增加，越深越差？
│     └─ 退化問題 (degradation)，解法：ResNet skip connection
│
├─ 梯度在深層越傳越弱 / 消失？
│     └─ 梯度消失 (vanishing gradient)，主要解法：BN + ReLU
│        skip connection 有幫助，但核心動機是退化問題
│
└─ 訓練誤差低，但測試誤差高？
      └─ 過擬合 (overfitting)，解法：Dropout / 正規化 / 資料擴增
```

### Tree D：看到「mAP 指標問題」→ 判斷標準

```text
題目問評估指標或比較嚴格度？
│
├─ 單一 IoU 門檻 / 寬鬆評測 / PASCAL VOC？
│     └─ mAP@0.5
│
├─ 10 個門檻平均 / 嚴格 / COCO 標準？
│     └─ mAP@0.5:0.95
│
├─ 逐像素精度 / 語意分割評測？
│     └─ mIoU
│
└─ 偵測框重疊度 / 預測框和真實框？
      └─ IoU = 交集 / 聯集
```

---

## 9. Trap Clinic

### Trap 1：池化層的目的是「抽取更多特徵」

錯。池化層的目的是縮小特徵圖尺寸、保留關鍵訊號、降低參數量、提升平移不變性。抽特徵是卷積層的工作。

Exam fix：

```text
縮小特徵圖 / 降維 / 平移不變性 → 池化層
抽取特徵 / 找邊緣 / 找紋理 → 卷積層
```

### Trap 2：ResNet 的 skip connection 是為了解決過擬合

錯。skip connection 的核心是解決退化問題（degradation）：網路加深後，訓練誤差也變大。過擬合是訓練誤差低、測試誤差高，兩者不同。

Exam fix：

```text
過擬合 → Dropout / 正規化 / 資料擴增
梯度消失 → BN + ReLU 是主要解法
退化問題 / 訓練誤差隨深度增加 → ResNet skip connection
```

### Trap 3：語意分割和實例分割是同一件事

錯。語意分割只標像素類別，同類不分個體；實例分割標像素類別加個體 ID。照片裡 3 隻羊，語意分割是一片「羊」，實例分割是羊 1、羊 2、羊 3。

Exam fix：

```text
同類不分個體 / 一片色塊 → 語意分割 / U-Net
同類要分個體 / 3 隻羊 3 個 mask → 實例分割 / Mask R-CNN
```

### Trap 4：mAP 就是在 IoU=0.5 下的平均精度

不一定。`mAP@0.5` 是單一門檻；`mAP@0.5:0.95` 是 10 個 IoU 門檻的平均，較嚴格。

Exam fix：

```text
單一門檻 0.5 / PASCAL VOC → mAP@0.5
10 個門檻平均 / COCO / 嚴格 → mAP@0.5:0.95
```

### Trap 5：Faster R-CNN 一定比 YOLO 更精準

這句太絕對。傳統上兩階段偵測器精度較高，但新版 YOLO 已大幅追平。考試通常要抓的是情境：即時速度選 YOLO，最高精度或離線精密分析才偏 Faster R-CNN。

Exam fix：

```text
即時 / 高 FPS → YOLO
傳統高精度 / 不計速度 → Faster R-CNN
一定 / 必定兩階段更準 → 小心絕對化陷阱
```

### Trap 6：卷積輸出尺寸公式是 `O = W / S`

錯，漏掉 kernel size、padding 和最後 `+1`。

```text
O = floor((W - F + 2P) / S) + 1
```

Exam fix：

```text
先寫 W - F + 2P
再除以 S
再 floor
最後 + 1
```

### Trap 7：IoU >= 0.5 代表完美偵測

錯。IoU >= 0.5 只是常見及格線，不代表完美。COCO 嚴格評測會看 0.5 到 0.95 的多個門檻。

Exam fix：

```text
IoU >= 0.5 → 常見 True Positive 門檻
IoU 越高 → 定位越準
COCO → 0.5 到 0.95 多門檻平均
```

### Trap 8：YOLO 和 CNN 是競爭關係

錯。YOLO 通常建立在 CNN backbone 之上。CNN 是底層特徵抽取方法，YOLO 是物件偵測架構，兩者是層級關係，不是替代關係。

Exam fix：

```text
CNN → backbone / 特徵抽取
YOLO → 使用 backbone 的物件偵測器
```

---

## 10. Practice Questions

### 10.1 CNN 元件與公式

**Q1.** 卷積層（Convolutional Layer）最主要的功能是什麼？

答案：從影像中抽取局部特徵，例如邊緣、紋理、形狀。
理由：卷積層用 kernel 在影像上滑動做局部運算；降維是池化層的工作。

---

**Q2.** 以下哪個參數決定卷積核每次在影像上移動的距離？

A. Padding　B. Kernel size　C. Stride　D. Channel

答案：C. Stride（步長）
理由：Stride 控制 kernel 每次移動幾格，`S=2` 時輸出尺寸通常約縮半。

---

**Q3.** 輸入影像 `32 x 32`，使用 `3 x 3` kernel，stride=1，padding=0，輸出特徵圖尺寸是？

答案：`30 x 30`
理由：`O = floor((32 - 3 + 2 x 0) / 1) + 1 = 29 + 1 = 30`。

---

**Q4.** 輸入影像 `64 x 64`，使用 `5 x 5` kernel，stride=2，padding=2，輸出尺寸是？

答案：`32 x 32`
理由：`O = floor((64 - 5 + 2 x 2) / 2) + 1 = floor(63 / 2) + 1 = 31 + 1 = 32`。

---

**Q5.** 池化層（Pooling Layer）最主要的目的是？

A. 抽取更細緻的局部特徵
B. 縮小特徵圖尺寸、提升平移不變性
C. 引入非線性，讓網路學習複雜模式
D. 輸出最終的分類機率

答案：B
理由：池化層做的是降維與提升平移不變性；抽特徵是卷積層，非線性是 ReLU。

---

**Q6.** 最大池化（Max Pooling）和平均池化（Average Pooling）最主要的差異是？

答案：最大池化取視窗內最大值，常保留銳利特徵；平均池化取平均值，輸出較平滑，也常出現在 Global Average Pooling。
理由：兩者都是降維，差異在取最大值或取平均值。

---

### 10.2 ResNet 殘差連接

**Q7.** ResNet 的 skip connection（殘差連接）主要解決了什麼問題？

A. 過擬合 (overfitting)
B. 退化問題 (degradation)
C. 池化層丟失特徵資訊
D. 卷積核尺寸不足

答案：B
理由：退化問題是訓練誤差隨網路加深而增大；skip connection 的核心動機是讓深層網路更容易訓練。

---

**Q8.** ResNet 的 block 公式 `H(x) = F(x) + x` 中，`x` 代表什麼？

答案：`x` 是原始輸入，透過 identity shortcut 直接加到輸出。
理由：`F(x)` 是 block 學到的修正量；若 `F(x)` 接近 0，輸出就接近原輸入。

---

**Q9.** 以下哪個描述符合 ResNet 設計的核心動機？

A. 引入更多 pooling 層來加速訓練
B. 讓深層網路的訓練誤差不隨深度增加而惡化
C. 使用更大的 kernel 來捕捉全局特徵
D. 完全取代全連接層

答案：B
理由：ResNet 的核心是解決退化問題，而不是增加 pooling 或取代 FC。

---

### 10.3 任務族與架構選型

**Q10.** 「偵測交通影像中每台車的位置（bounding box）和車型」，最適合哪種任務和架構？

A. 影像分類 / ResNet
B. 物件偵測 / YOLO 或 Faster R-CNN
C. 語意分割 / U-Net
D. 實例分割 / Mask R-CNN

答案：B
理由：需要輸出 bounding box + 類別，這是物件偵測；是否選 YOLO 或 Faster R-CNN 取決於速度與精度需求。

---

**Q11.** 「醫療 AI 要標出 MRI 掃描圖中每顆腫瘤的精確輪廓，且每顆腫瘤獨立標記」，應選哪種架構？

答案：Mask R-CNN（實例分割）。
理由：需要每像素類別加每顆腫瘤的獨立 mask；語意分割不能分個體。

---

**Q12.** 「照片裡有 3 隻貓，語意分割的輸出是什麼？」

答案：3 隻貓的像素全部標記為同一個「貓」類別，不區分第幾隻。
理由：語意分割只標類別；要分個體才是實例分割。

---

**Q13.** 以下哪個架構適合「自駕車需要將天空、路面以及每個行人、每台車全部標記」？

A. 語意分割 / DeepLab
B. 實例分割 / Mask R-CNN
C. 全景分割 / Panoptic FPN
D. 影像分類 / ResNet

答案：C
理由：全景分割同時涵蓋 stuff（天空、路面）與 things（行人、車且分個體）。

---

### 10.4 YOLO vs Faster R-CNN

**Q14.** 工廠產線需要每秒偵測 30 幀以上的瑕疵品，應選哪種偵測器？

答案：YOLO（單階段偵測器）。
理由：即時性與高 FPS 是 YOLO 的典型場景。

---

**Q15.** 以下對「Faster R-CNN 和 YOLO」的描述，哪項是正確的？

A. YOLO 先提候選框，再逐框分類
B. Faster R-CNN 一次 forward pass 直接輸出所有 bbox
C. YOLO 是單階段偵測器，速度較快
D. Faster R-CNN 是單階段偵測器，精度較高

答案：C
理由：YOLO 是 single-stage，Faster R-CNN 是 two-stage。

---

**Q16.** NMS（Non-Maximum Suppression，非最大值抑制）的作用是什麼？

答案：刪除同一物件的多個重疊 bounding boxes，只保留信心分數最高的框。
理由：偵測器常對同一物件輸出多個框，NMS 用 IoU 門檻去重。

---

### 10.5 IoU 與 mAP

**Q17.** 「IoU >= 0.5 視為 True Positive」中，IoU 是如何計算的？

答案：IoU = 預測 bbox 與真實 bbox 的交集面積 / 聯集面積。
理由：IoU 範圍是 0 到 1，越高表示定位越準。

---

**Q18.** 以下哪個指標是 COCO benchmark 的現代標準，且比 PASCAL VOC 更嚴格？

A. mAP@0.5
B. Top-1 accuracy
C. mAP@0.5:0.95
D. mIoU

答案：C
理由：`mAP@0.5:0.95` 在 0.50 到 0.95 共 10 個 IoU 門檻下計算後平均，較嚴格。

---

**Q19.** `mAP@0.5:0.95` 使用幾個 IoU 門檻？

答案：10 個。
理由：門檻是 `0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95`，每 0.05 一階。

---

**Q20.** 語意分割任務最常用的評估指標是什麼？

答案：mIoU（mean Intersection over Union）。
理由：語意分割是逐像素任務，常用各類別 IoU 的平均來評估。

---

### 10.6 混合題型

**Q21.** 以下何者對「池化層平移不變性」的描述最準確？

A. 池化層讓模型記住特徵的絕對位置
B. 池化層讓同樣的特徵小幅平移後，輸出仍相似
C. 池化層引入更多非線性
D. 池化層將特徵圖解析度放大

答案：B
理由：平移不變性是指特徵位置小幅改變時，池化後輸出不會大幅變動。

---

**Q22.** AP（Average Precision）是針對什麼計算的？

A. 整個資料集所有類別的平均精度
B. 某一個類別的 Precision-Recall 曲線下面積
C. 某一張圖的精確率
D. 所有 IoU 門檻下的平均

答案：B
理由：AP 是單一類別的 PR 曲線下面積；mAP 才是多類別 AP 的平均。

---

**Q23.** 哪一項架構的輸出格式是「逐像素類別 map，同類物件不分個體」？

答案：語意分割（Semantic Segmentation），代表架構是 U-Net / FCN / DeepLab。
理由：語意分割對每個像素輸出類別標籤，但同類不同個體不分開。

---

**Q24.** 一個 CNN 的完整前向傳播順序（從輸入到分類輸出），以下哪個順序正確？

A. FC → Conv → ReLU → Pool → Softmax
B. Conv → ReLU → Pool → ... → FC → Softmax
C. Pool → Conv → ReLU → ... → FC → Softmax
D. Conv → Pool → ReLU → ... → FC → Softmax

答案：B
理由：簡化 CNN block 是 `Conv → ReLU → Pool` 重複數次，最後接 FC 與 Softmax；現代實作常在 Conv 後加入 BN。

---

**Q25.** ResNet-50 中的「50」代表什麼？

答案：網路總共有 50 層可訓練層。
理由：ResNet 家族常用深度命名，例如 ResNet-18、34、50、101、152。

---

## Final Oral Recall

考前最後 3 分鐘唸這幾句：

1. CNN 元件口訣：卷積抽特徵、BN 穩訓練、ReLU 加非線性、池化縮維度、FC 說答案。
2. 池化不是抽特徵；抽特徵是卷積層，池化是縮小特徵圖與提升平移不變性。
3. 卷積輸出公式：`O = floor((W - F + 2P) / S) + 1`，不要漏掉 `F`、`2P`、`floor`、`+1`。
4. ResNet 解決的是退化問題：訓練誤差也隨深度增加而變差，不是過擬合。
5. `H(x) = F(x) + x` 是 identity shortcut；維度不同時用 `1 x 1 conv` 做 projection shortcut。
6. 任務三階梯：一張標 = 分類；有框 = 偵測；每個像素 = 分割；同類要分個體 = 實例分割。
7. 偵測器二選一：即時 / 高 FPS / 邊際裝置 → YOLO；最高精度 / 醫療 / 離線 → Faster R-CNN。
8. IoU = 交集 / 聯集；AP 是單類別 PR 曲線面積；mAP 是多類別 AP 平均。
9. `mAP@0.5` 是單一門檻較寬鬆；`mAP@0.5:0.95` 是 10 個門檻平均，COCO 較嚴格。
10. 語意不認人，實例會點名，全景全包辦。

---

## Final Study Advice

不要只背架構名稱。考試真正測的是你能不能從題目描述推回：

```text
輸出格式 → 任務類型 → 場景限制 → 架構 → 指標
```

每道情境題都照這三步：

1. 先看輸出格式：一個 label、bbox、每像素，還是每像素加個體 ID。
2. 再看限制：即時、高精度、分個體、是否包含 stuff 背景。
3. 最後選架構與指標：ResNet、YOLO、Faster R-CNN、U-Net、Mask R-CNN、Panoptic FPN，以及 accuracy、mAP、mIoU、PQ。

遇到 mAP 題，先確認是 PASCAL VOC 的單門檻還是 COCO 的 10 門檻；遇到 ResNet 題，先確認是退化問題，不要選成過擬合。這兩個是最容易失分的混淆點。

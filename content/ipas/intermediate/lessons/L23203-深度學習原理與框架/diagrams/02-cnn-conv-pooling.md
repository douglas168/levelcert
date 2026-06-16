# CNN 卷積池化解剖圖

## 完整正向傳播流程（MNIST 範例）

```
輸入影像
28×28×1
    │
    ▼
┌──────────────────────────────────────────┐
│  Conv2D(in=1, out=32, kernel=3, pad=1)   │
│  輸出: 28×28×32                           │
│  參數: (3×3×1 + 1) × 32 = 320           │
└──────────────────────────────────────────┘
    │
    ▼
┌──────────────┐
│  ReLU        │   max(0, z)，不改變形狀
│  28×28×32    │
└──────────────┘
    │
    ▼
┌──────────────────────────────────────────┐
│  MaxPool2D(kernel=2×2, stride=2)         │
│  空間減半: 28→14                          │
│  輸出: 14×14×32                           │
│  無參數 (非學習層)                        │
└──────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────┐
│  Conv2D(in=32, out=64, kernel=3, pad=1)  │
│  輸出: 14×14×64                           │
│  參數: (3×3×32 + 1) × 64 = 18,496       │
└──────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────┐
│  MaxPool2D(kernel=2×2, stride=2)         │
│  空間減半: 14→7                           │
│  輸出: 7×7×64                             │
└──────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────┐
│  Flatten                                  │
│  7 × 7 × 64 = 3,136 個特徵              │
│  輸出: [batch, 3136]                      │
└──────────────────────────────────────────┘
    │
    ▼
  [batch, 3136]
  → 接全連接層 (FC / Linear)
```

## 卷積層參數量計算公式

```
每個 Conv2D 層的參數量：

  參數量 = (K × K × C_in + 1) × C_out

  K      — kernel size（如 3 → 3×3）
  C_in   — 輸入 channel 數
  C_out  — 輸出 channel 數（即 filter 數量）
  +1     — 每個 filter 的 bias（共 C_out 個 bias）

範例驗證：
  Conv1: (3×3×1  + 1) × 32 = 10 × 32   = 320
  Conv2: (3×3×32 + 1) × 64 = 289 × 64  = 18,496
```

## 輸出特徵圖尺寸公式（🔥🔥🔥 計算題必背）

```
H_out = floor((H_in + 2P - K) / S) + 1

  H_in  — 輸入高度
  P     — padding
  K     — kernel size
  S     — stride（預設 = 1）

範例：
  H_in=28, K=3, P=1, S=1
  H_out = floor((28 + 2 - 3) / 1) + 1 = floor(27/1) + 1 = 28  ✓ (same padding)

  H_in=28, K=3, P=0, S=1 (no padding)
  H_out = floor((28 + 0 - 3) / 1) + 1 = 26

  MaxPool K=2, S=2:
  H_out = floor((28 + 0 - 2) / 2) + 1 = 14  ✓ (空間減半)
```

## 主流 CNN 架構差異比較

```
VGG                          ResNet                        Inception
─────────────────────        ──────────────────────        ─────────────────────
Conv → ReLU                  Conv → BN → ReLU              並行多尺度卷積
Conv → ReLU                  Conv → BN → ReLU       ┌─► 1×1 Conv
MaxPool                            +                 │   3×3 Conv  ─┐
Conv → ...                   ┌────┘←─ 殘差連接 ──┐  ├─► 5×5 Conv    ├─► Concat
                              │  (skip connection) │  │   MaxPool ───┘
特點：                         └──────────────────→ ┘  └─► ...
• 結構簡單、每層一種 op         特點：                     特點：
• 深度 ↑ → 梯度消失           • shortcut bypass          • 同層多尺度
• 深度: VGG16/19              • 解決退化問題             • 計算效率高
                              • 深度: ResNet-50/101       • GoogLeNet 系列

考試判斷關鍵：
  「殘差連接 / skip connection / 跳躍連接」→ ResNet
  「多分支並行卷積」→ Inception / GoogLeNet
  「純疊加無 shortcut」→ VGG
```

## PyTorch 實作對照

```python
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        # 卷積塊 1
        self.conv1 = nn.Conv2d(in_channels=1,  out_channels=32,
                                kernel_size=3, padding=1)   # 320 params
        self.pool  = nn.MaxPool2d(kernel_size=2, stride=2)  # 無參數
        # 卷積塊 2
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64,
                                kernel_size=3, padding=1)   # 18,496 params
        self.relu  = nn.ReLU()
        self.fc    = nn.Linear(7 * 7 * 64, 10)             # 分類頭

    def forward(self, x):
        # x: [B, 1, 28, 28]
        x = self.pool(self.relu(self.conv1(x)))   # → [B, 32, 14, 14]
        x = self.pool(self.relu(self.conv2(x)))   # → [B, 64, 7,  7 ]
        x = x.view(x.size(0), -1)                # → [B, 3136]
        x = self.fc(x)                            # → [B, 10]
        return x
```

## 🔥🔥🔥 考試重點

| 考點 | 核心結論 |
|------|----------|
| Conv 參數量公式 | `(K×K×C_in + 1) × C_out`，含 bias |
| MaxPool 參數量 | 0（非學習，只是取最大值） |
| padding=1, kernel=3 | 輸出與輸入同尺寸（same padding） |
| Flatten 後維度 | H × W × C_out，接 Linear 層 |
| ResNet vs VGG | ResNet 有 skip connection，解決梯度消失與退化問題 |
| Inception 特色 | 同一層並行多尺度卷積後 Concat |

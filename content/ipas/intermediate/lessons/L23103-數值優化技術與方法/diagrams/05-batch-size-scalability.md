# 批次大小與可擴展性權衡 (Batch Size & Scalability Trade-offs)

## 批次大小對各維度的影響

```mermaid
quadrantChart
    title 批次大小選擇權衡
    x-axis "批次大小 (Batch Size)" small --> large
    y-axis "記憶體使用" low --> high
    quadrant-1 大批次（GPU高效，但記憶體壓力大）
    quadrant-2 超大批次（可能OOM，泛化能力下降）
    quadrant-3 小批次（低記憶體，但雜訊多）
    quadrant-4 中批次（最佳平衡區間）
    Mini-batch 64: [0.35, 0.35]
    Mini-batch 128: [0.5, 0.5]
    Mini-batch 256: [0.65, 0.65]
    Full Batch: [0.9, 0.95]
    SGD B=1: [0.05, 0.05]
```

## 批次大小影響矩陣

```mermaid
flowchart TD
    BS["批次大小 Batch Size (B)"]

    BS -->|"B 增大"| MEM["記憶體需求 ↑\n(每批次需載入更多資料)"]
    BS -->|"B 增大"| GPU["GPU 利用率 ↑\n(並行計算更多樣本)"]
    BS -->|"B 增大"| NOISE["梯度雜訊 ↓\n(更準確的梯度估計)"]
    BS -->|"B 增大"| GEN["⚠️ 泛化能力可能下降\n(Sharp Minima 問題)"]
    BS -->|"B 減小"| OOM["記憶體壓力降低\n(可解決 OOM 問題)"]
    BS -->|"B 減小"| REG["自然正則化效果 ↑\n(SGD 雜訊 = 隱性正則)"]

    MEM -.->|"太大 → OOM"| OOM
    GPU -.->|"記憶體限制天花板"| MEM

    style GEN fill:#FFF0F0,stroke:#CC0000
    style OOM fill:#E8F5E9,stroke:#2E7D32
    style GPU fill:#E3F2FD,stroke:#1565C0
```

## 可擴展性（Scalability）評估維度

```
批次大小選擇 → 影響三個維度：

1. 計算效率（GPU 並行）
   小批次 ←────────────────→ 大批次
   低GPU利用率              高GPU利用率
         ⬆️最佳平衡：B=64~256

2. 記憶體需求
   小批次 ←────────────────→ 大批次
   低記憶體              記憶體爆炸(OOM)
         ⬆️OOM臨界點依 GPU VRAM 而定

3. 泛化能力（訓練出的模型好不好）
   小批次 ←────────────────→ 大批次
   高泛化（Flat Minima）  低泛化（Sharp Minima）
   （雜訊幫助逃離過擬合）  （可能過擬合，但工程上
                           可用 LR Warmup 緩解）
```

## 分散式訓練與可擴展性

```mermaid
graph LR
    MB["Mini-batch SGD\nB=64 per GPU"]

    MB -->|"多 GPU 並行"| DT["資料並行\n(Data Parallelism)\n每 GPU 處理不同批次"]
    DT --> SYNC["梯度同步\n每步聚合各GPU梯度\n→ 等效更大批次"]
    SYNC --> SCALE["✅ 可擴展性\n增加 GPU 數量\n→ 訓練速度線性提升"]

    style SCALE fill:#E8F5E9,stroke:#2E7D32
```

## 批次大小速查表

| 批次大小 | 記憶體 | GPU效率 | 梯度雜訊 | 泛化 | 適用場景 |
|---------|--------|---------|---------|------|---------|
| 1（純SGD） | 最低 | 最低 | 最高 | 好 | 極端記憶體限制 |
| 32–64 | 低 | 中 | 中高 | 好 | 一般深度學習 |
| 128–256 | 中 | 高 | 中低 | 中 | ✅ 最常用平衡點 |
| 512+ | 高 | 很高 | 低 | 風險↑ | 大規模訓練（需調LR） |
| 全資料 | 最高 | 很高 | 最低 | 最差 | 小資料集 / 凸問題 |

> 🔑 考試快判：
> - **OOM（記憶體不足）** → 減小 batch_size
> - **GPU 利用率低** → 增大 batch_size（在記憶體限制內）
> - **泛化能力差、過擬合** → 考慮減小 batch_size 或加正則化
> - **分散式訓練** → Mini-batch 是基礎，自然支援資料並行

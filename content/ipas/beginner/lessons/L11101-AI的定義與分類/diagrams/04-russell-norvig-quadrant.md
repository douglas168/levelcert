# Russell & Norvig 四象限矩陣

出自《Artificial Intelligence: A Modern Approach》（Stuart Russell & Peter Norvig）

## 2×2 矩陣

```
                    像人類（Humanly）         理性（Rationally）
                  ┌────────────────────┬──────────────────────┐
                  │                    │                      │
   思考           │  像人類思考         │  理性思考             │
  （Thinking）   │  Thinking Humanly  │  Thinking Rationally │
                  │                    │                      │
                  │  研究人腦如何運作   │  用邏輯/數學推理     │
                  │  認知建模（科學）   │  思維法則/形式邏輯   │
                  │  → 認知科學取向    │  → 邏輯主義取向      │
                  │                    │                      │
                  ├────────────────────┼──────────────────────┤
                  │                    │                      │
   行動           │  🔥 像人類行動     │  🔥🔥 理性行動 ★     │
  （Acting）     │  Acting Humanly    │  Acting Rationally   │
                  │                    │                      │
                  │  機器的行為        │  做出最佳決策         │
                  │  像不像人類？      │  達成目標             │
                  │  → 圖靈測試        │  → 理性代理人         │
                  │    (Turing Test)  │    (Rational Agent)  │
                  │                    │  ★ R&N 偏好此取向    │
                  │                    │                      │
                  └────────────────────┴──────────────────────┘

  ★ = Russell & Norvig 最推薦的取向
  🔥 = 考試常考象限
```

## 四象限詳解

| 象限 | 英文 | 核心問題 | 代表技術/方法 | 考試關聯 |
|------|------|---------|------------|---------|
| 像人類思考 | Thinking Humanly | 機器能像人腦一樣思考嗎？ | 認知科學、神經科學模型 | 較少直接考 |
| 理性思考 | Thinking Rationally | 機器能做出邏輯正確的推理嗎？ | 形式邏輯、知識庫推理 | 較少直接考 |
| 🔥 像人類行動 | Acting Humanly | 機器的行為讓人看起來像人嗎？ | **圖靈測試（Turing Test）** | 常考：圖靈測試屬於此象限 |
| 🔥🔥 理性行動 | Acting Rationally | 機器能在環境中做出最佳行動嗎？ | **理性代理人（Rational Agent）** | 常考：R&N 最推薦此取向 |

## 白話對比

```
Uber Eats 外送類比：

Acting Humanly（像人類行動）：
  外送員走跟你一模一樣的路線
  → 模仿人類的行為方式
  → 圖靈測試的邏輯

Acting Rationally（理性行動）★：
  外送員走最快的路線送到你
  → 不管像不像人，只求最佳結果
  → Russell & Norvig 偏好的取向
```

## 考試速記

```
圖靈測試（1950）= Acting Humanly（像人類行動）
理性代理人 = Acting Rationally（理性行動）★ R&N 偏好

記法：R&N 的書叫「AI: A Modern Approach」
     → Modern（現代/理性）取向 = Acting Rationally
```

## Data Sampling Techniques

**比喻：** Simple Random Sampling 就像夜市大轉盤純靠運氣盲抽，Stratified Sampling 是保證每種蝦皮評價分類都按比例抽到，而 Reservoir Sampling 則是捷運閘門只留下固定人數的幸運兒。

| Feature    | Simple Random Sampling（簡單隨機抽樣） | Stratified Sampling（分層抽樣）                       | Reservoir Sampling（蓄水池抽樣）                     |
| ---------- | -------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| What       | Equal chance for every item.           | Split data into groups, then sample.                  | Sample from an unknown Data Stream（資料流）.        |
| How        | Draw randomly from the entire pool.    | Sample proportionally from subgroups.                 | Keep $k$ items; replace with decreasing probability. |
| When       | Small, homogeneous datasets.           | Imbalanced Data（不平衡資料） handles minority class. | Big Data（大數據） with infinite incoming streams.   |
| Example    | Lottery draw for prizes.               | Equal gender split in survey.                         | Sampling live Twitch chat logs.                      |
| Difficulty | Easy                                   | Medium                                                | Hard                                                 |

**Key Points:**

- ⚡ Match your sampling strategy to the data structure and delivery velocity.
- ⚠️ Simple Random Sampling can completely erase minority groups in Class Imbalance（類別不平衡） situations.
- 💡 Reservoir Sampling updates the sample pool on-the-fly without storing the whole stream in memory.

**Quiz:** If you are processing millions of real-time credit card transactions and want to maintain a representative sample of 10,000 transactions without running out of memory, which sampling technique must you use?

## Distribution Transforms（分配轉換）

**比喻：** 就像去一中街夜市排隊買超夯的限量地瓜球，排隊人潮多到塞爆整條街（右偏分配），老闆靈機一動用 LINE 貼圖叫號系統發號碼牌，管你排隊人數是多是少、甚至是零或負值，通通強制拉成間距一模一樣的整齊隊伍。

| Feature    | Log Transform（對數轉換）                                      | Box-Cox Transform（Box-Cox 轉換）                                           | Quantile Transform（分位數轉換）                                            | Yeo-Johnson Transform（Yeo-Johnson 轉換）                               |
| ---------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| What       | Applies mathematical logarithm to stabilize variance.          | Parametric transform finding the optimal power $\lambda$ for normality.     | Non-parametric transform mapping data to a uniform or normal distribution.  | Extension of Box-Cox that handles zero and negative values.             |
| How        | Compresses high values and expands low values using $\log(x)$. | Tests multiple power values to automatically find the best statistical fit. | Ranks data values and maps them directly to target probability percentiles. | Uses modified power formulas depending on whether $x \ge 0$ or $x < 0$. |
| When       | Used for highly right-skewed positive data streams.            | Used when data is strictly positive ($x > 0$) and needs strict normality.   | Used when data has extreme outliers or non-linear distributions.            | Used when data contains zero or negative values and needs normality.    |
| Example    | Scaling volatile housing prices or monthly incomes.            | Preprocessing skewness in financial transaction volumes.                    | Adjusting highly distorted sensor readings for neural networks.             | Transforming volatile profit/loss statements or temperature anomalies.  |
| Difficulty | Low complexity; cannot handle zero or negative numbers.        | Medium complexity; requires optimization search for $\lambda$ parameter.    | Medium complexity; can distort linear patterns and relationships.           | Medium complexity; mathematically more complex but highly versatile.    |

**Key Points:**

- ⚡ **Yeo-Johnson Transform（Yeo-Johnson 轉換）** liberates you from the strict positive-only constraints of **Log Transform（對數轉換）** and **Box-Cox Transform（Box-Cox 轉換）**.
- ⚠️ Do not blindly throw data into Box-Cox without checking for non-positive values, or your pipeline will crash instantly.
- 💡 Crucial for linear models and algorithms that strictly assume homoscedasticity and normally distributed residual patterns.

**Quiz:** If your dataset contains historical user account balances ranging from -$500 to +$5000, which of these four transformation methods can you safely apply without adding an artificial constant shift?

---

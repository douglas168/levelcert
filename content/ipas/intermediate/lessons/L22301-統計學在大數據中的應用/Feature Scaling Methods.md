## Feature Scaling Methods

**比喻：** 就像跟朋友用 LINE 貼圖來比誰的貼圖比較瘋狂，**Min-Max Scaling（最小最大值縮放）** 是強行把大家的瘋狂程度壓在 0 到 100 分之間，**Standardization（標準化）** 是用班上的平均瘋狂度當基準來看誰是邊緣人，而 **RobustScaler（彈性縮放）** 則是直接無視那個擁有上萬張貼圖的超級大課長。

| Feature    | Min-Max Scaling（最小最大值縮放）                          | Standardization（標準化）                                         | RobustScaler（彈性縮放）                                          |
| ---------- | ---------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| What       | Rescales data to a fixed range, usually 0 to 1.            | Centers data around mean with unit standard deviation.            | Scales features using median and Interquartile Range（四分位距）. |
| How        | Binds values using minimum and maximum formulas.           | Subtracts mean and divides by standard deviation.                 | Subtracts median and divides by the IQR range.                    |
| When       | Used when boundaries are fixed and no outliers exist.      | Used when algorithms assume normally distributed data structures. | Used when dataset contains extreme outlier data points.           |
| Example    | Converting image pixel intensity values from 0–255 to 0–1. | Transforming global customer age distributions for PCA models.    | Scaling volatile transaction amounts with extreme whale buyers.   |
| Difficulty | Low complexity but highly sensitive to extreme outliers.   | Medium complexity; assumes a Gaussian distribution shape.         | Low complexity; highly effective at ignoring wild data noise.     |

**Key Points:**

- ⚡ **Min-Max Scaling（最小最大值縮放）** bounds data strictly, **Standardization（標準化）** assumes a bell curve, and **RobustScaler（彈性縮放）** defeats outliers.
- ⚠️ Do not use Min-Max scaling if your live production data stream can encounter values outside your initial training set limits.
- 💡 Crucial step during preprocessing before feeding features into distance-based models like KNN or gradient descent algorithms.

**Quiz:** If you are building a fraud detection model for Shopee transactions where a few users buy millions of dollars of items while most spend under $100, which scaling method should you choose?

---

## Feature Scaling and Distribution Transformation

**比喻：** Scaling 就像把大尺寸的 IG 網美照等比例縮放進限時動態格子裡，而 Distribution Transform 就像用美顏濾鏡直接把歪一邊的合照修成正臉巴掌大。

### Standardization vs Normalization

| Feature    | Standardization（標準化）                                                               | Normalization（常態化）                                                             |
| ---------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| What       | Rescales data to have a mean of 0 and standard deviation of 1.                          | Rescales data to a fixed range, usually 0 to 1.                                     |
| How        | Subtracts the mean and divides by the Standard Deviation（標準差）.                     | Subtracts the minimum value and divides by the range.                               |
| When       | When algorithms assume normal distribution, like Support Vector Machines（支持向量機）. | When algorithms rely on distance metrics, like K-Nearest Neighbors（K-近鄰演算法）. |
| Example    | Preprocessing house prices that follow a bell curve.                                    | Scaling pixel intensities (0–255) to a 0–1 range.                                   |
| Difficulty | Easy                                                                                    | Easy                                                                                |

---

### Scaling vs Distribution Transform

| Feature    | Scaling（特徵縮放）                                                  | Distribution Transform（分佈轉換）                              |
| ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| What       | Changes the range of the data without changing its underlying shape. | Changes the actual shape of the data's distribution.            |
| How        | Multiplies or adds constants to the data features.                   | Applies non-linear mathematical operations to every data point. |
| When       | To prevent features with large magnitudes from dominating the model. | To fix Skewed Data（偏態資料） and stabilize variance.          |
| Example    | Converting centimeters to meters for height data.                    | Applying a logarithm to highly skewed income data.              |
| Difficulty | Easy                                                                 | Medium                                                          |

---

### Log vs Box-Cox vs Quantile Transform

| Feature    | Log Transform（對數轉換）                                   | Box-Cox Transform（Box-Cox 轉換）                                       | Quantile Transform（分位數轉換）                                             |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| What       | Simple non-linear transform for right-skewed data.          | Generalized power transform to find the optimal power parameter.        | Non-linear transform that maps data to a specific target distribution.       |
| How        | Computes $y = \ln(x)$ for all data points.                  | Stabilizes variance using a parameter $\lambda$ via maximum likelihood. | Maps empirical cumulative distribution to a Normal Distribution（常態分佈）. |
| When       | For highly right-skewed data with strictly positive values. | For strictly positive data needing automated variance stabilization.    | For data with extreme Outliers（離群值） or complex multi-modal shapes.      |
| Example    | Transforming user engagement counts or income data.         | Transforming non-normal web traffic data automatically.                 | Forcing highly erratic stock trading volumes into a perfect bell curve.      |
| Difficulty | Easy                                                        | Medium                                                                  | Hard                                                                         |

**Key Points:**

- ⚡ Scaling changes the data bounds, while Distribution Transform fixes the data shape.
- ⚠️ Outliers（離群值） will completely distort Normalization（常態化）, compressing normal data into a tiny range.
- 💡 Use Box-Cox or Quantile Transform when your linear model struggles with non-constant variance or heavy tails.

**Quiz:** If your dataset contains negative values and extreme outliers, and you want to force it into a normal distribution for a linear model, which of the three transformation techniques must you use?

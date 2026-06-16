## Privacy Techniques

**比喻：** 就像在夜市戴口罩、換暱稱、混在人群裡，保護程度不同，能不能被認出也不同。

| Feature    | k-Anonymity（k匿名性）          | ℓ-Diversity（ℓ多樣性）      | t-Closeness（t接近性）              | Differential Privacy（差分隱私） | Pseudonymisation（假名化） | Anonymization（匿名化）        |
| ---------- | ------------------------------- | --------------------------- | ----------------------------------- | -------------------------------- | -------------------------- | ------------------------------ |
| What       | Each person hides in group of k | Sensitive values must vary  | Group distribution close to overall | Adds mathematical noise          | Replace ID with fake ID    | Remove re-identification risk  |
| How        | Generalize/suppress data        | Require ≥ℓ sensitive values | Limit distance ≤t                   | Randomized query outputs         | Token, code, hash          | Strip or transform identifiers |
| When       | Basic dataset release           | Avoid attribute inference   | Avoid skewness leaks                | Statistics, ML, analytics        | Internal processing        | Public sharing                 |
| Example    | Age 20–29                       | Disease has 3 types         | Income distribution similar         | Noisy count                      | User123 → X9A              | No usable link back            |
| Difficulty | Medium                          | Medium                      | Hard                                | Hard                             | Easy                       | Hard                           |

**Key Points:**

- ⚡ Differential Privacy（差分隱私） gives strongest formal privacy guarantee.
- ⚠️ Pseudonymisation（假名化） is not true Anonymization（匿名化）.
- 💡 This matters most when sharing user data for research or ML.

**Quiz:** Which method protects query results by adding noise?

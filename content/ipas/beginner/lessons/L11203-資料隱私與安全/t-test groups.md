Let’s scale up from comparing two groups (t-test) to analyzing multiple groups or categories.

---

## 1. One-Way ANOVA & The F-Test

A **One-Way ANOVA** (Analysis of Variance) compares the averages of **three or more separate groups** at the same time.

If you tried to run multiple t-tests to compare every single group, your chance of a false alarm (Type I error) would compound and skyrocket. ANOVA solves this by running one single test.

### The F-Test (The Engine Behind ANOVA)

ANOVA uses a metric called the **F-statistic** (or F-score). It is a simple ratio of variances:

$$F = \frac{\text{Variance BETWEEN the groups (Signal)}}{\text{Variance WITHIN the groups (Noise)}}$$

- **High F-score:** The groups are spread far apart from each other, but the data inside each group is tightly packed. This means at least one group is genuinely different.
- **Low F-score (near 1.0):** The groups overlap so heavily that they are essentially the same.

> **The Big Catch:** ANOVA is an "omnibus" test. It tells you _if_ a significant difference exists among the groups, but it does **not** tell you _which_ specific group is the outlier. (To find out which one, you run a follow-up "post-hoc" test).

---

## 2. The Chi-Square ($\chi^2$) Test

While ANOVA handles averages of continuous measurements (like heights or scores), the **Chi-Square ($\chi^2$) test** handles **counts of categories** (discrete data).

It compares the counts you actually collected against the counts you would theoretically expect to see.

$$\chi^2 = \sum \frac{(\text{Observed} - \text{Expected})^2}{\text{Expected}}$$

There are two main types of Chi-Square tests:

### A. Goodness-of-Fit Test (One Variable)

- **What it does:** Tests if your sample data matches a claimed distribution.
- **Example:** You open 100 bags of M&Ms to see if the count of colors matches the official factory ratio claim (e.g., 20% red, 20% blue, etc.).

### B. Test of Independence (Two Variables)

- **What it does:** Tests if two categorical variables are related or completely independent.
- **Example:** Does a person's **favorite streaming service** (Netflix, YouTube, Disney+) depend on their **age demographic** (Gen Z, Millennial, Gen X)?

---

## 3. Comparison Cheat Sheet

| Feature                     | One-Way ANOVA (F-Test)                     | Chi-Square ($\chi^2$) Test                 |
| --------------------------- | ------------------------------------------ | ------------------------------------------ |
| **What It Compares**        | Averages across **$\geq 3$ groups**        | Counts across **categories**               |
| **Data Type Required**      | Continuous measurements (Decimals)         | Discrete categories (Counts/Whole numbers) |
| **Null Hypothesis ($H_0$)** | All group averages are exactly equal. <br> |

<br>($\mu_1 = \mu_2 = \mu_3$) | The variables are independent (No relationship/pattern). |
| **Real-World Example** | Comparing the average battery life of **iPhones vs. Samsung vs. Google Pixel** phones. | Testing if **lung cancer rates** are tied to **smoking status** (Smoker vs. Non-Smoker). |

These three concepts are the tools we use to actually calculate probabilities from the distributions we just talked about.

Here is the breakdown: **PMF** and **PDF** tell you the odds of hitting an exact target, while **CDF** tells you the odds of everything up to that target.

---

## 1. What Are They?

### PMF (Probability Mass Function) — For Discrete Data

Used for **Binomial** and **Poisson** distributions. Because discrete data deals with distinct, countable targets (like rolling a 3 or landing 5 free throws), the PMF gives you the **exact probability** of hitting that specific number.

- **The Question:** _"What are the exact odds I get exactly 4 successes?"_

### PDF (Probability Density Function) — For Continuous Data

Used for **Normal**, **Exponential**, and continuous **Uniform** distributions. Because continuous data has infinite decimals (like exact height or time), the probability of hitting an _infinitely exact_ number is technically 0%. Instead, the PDF creates a curve where the **area under the curve** over a range gives you the probability.

- **The Question:** _"How dense is the probability around this specific measurement range?"_

### CDF (Cumulative Distribution Function) — For All Data

Used for **any** distribution. "Cumulative" means it adds everything up as it goes. It calculates the probability of getting a value **equal to or less than** a specific target.

- **The Question:** _"What are the odds I get a result of 4 or fewer?"_

---

## 2. Comparison Guide

| Feature                   | PMF (Probability Mass Function)                     | PDF (Probability Density Function)                      | CDF (Cumulative Distribution Function)                      |
| ------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| **Data Compatibility**    | **Discrete** only (Binomial, Poisson)               | **Continuous** only (Normal, Exponential)               | **Both** Discrete and Continuous                            |
| **What the Y-Axis Shows** | Direct, exact probability (e.g., 0.25 = 25% chance) | Probability _density_ (Height of curve, not a direct %) | Running total probability (Starts at 0, ends at 1.0 / 100%) |
| **Graph Visual**          | Isolated vertical bars or dots                      | A smooth, continuous curve line                         | A rising line that climbs up to the right                   |
| **Formula Goal**          | $P(X = x)$ <br>                                     |

<br>_(Odds of hitting $x$ exactly)_ | Area under curve between $a$ and $b$<br>

<br>_(Odds of landing in a range)_ | $P(X \leq x)$ <br>

<br>_(Odds of getting $x$ or anything lower)_ |

---

## 3. Quick Real-World Example (At a Bus Stop)

Imagine buses arrive every 15 minutes.

- **PMF (Discrete - Poisson):** _"What is the exact probability that exactly **2** buses show up in the next hour?"_ (Output: a single percentage, like 22%).
- **PDF (Continuous - Exponential):** _"What is the probability density of waiting **exactly** 12.345 minutes?"_ (Output: a curve value used to calculate a time range, like the odds of waiting between 10 to 15 minutes).
- **CDF (Cumulative - Both):** _"What is the probability I wait **15 minutes or less** for the next bus?"_ (Output: a running total percentage, like 85% chance you are on a bus within 15 minutes).

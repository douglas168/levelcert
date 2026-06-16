**Hypothesis Testing** is the statistical version of a courtroom trial.

Instead of deciding if a person is "guilty or innocent," you are using data to decide if a claim is **"true or just a lucky coincidence."**

---

## 1. The Two Rivals (The Hypotheses)

Every test has two opposing sides. By default, statistics assumes the status quo is true until proven otherwise.

- **$H_0$: The Null Hypothesis (The Defendant is Innocent)**
- _The Vibe:_ "Nothing special is happening here." There is no effect, no change, or the claim is false. Any result you see is just random luck.

- **$H_1$ or $H_a$: The Alternative Hypothesis (The Prosecutor's Claim)**
- _The Vibe:_ "Something is definitely happening here." There is a real change, a real difference, or a new effect.

---

## 2. How the Trial Works (The 4 Steps)

To run a test, you follow a strict sequence:

```
[State the Claims] ➔ [Set the Bar] ➔ [Collect Data / Calculate p-value] ➔ [Make the Verdict]

```

### Step 1: State your $H_0$ and $H_1$

- _Example:_ A company claims their new energy drink speeds up reaction times.
- **$H_0$:** The drink does nothing. (Reaction time with drink = Reaction time without drink).
- **$H_1$:** The drink works. (Reaction time with drink is faster).

### Step 2: Set your threshold ($\alpha$ Alpha)

Before looking at data, you decide how much proof you need to reject $H_0$. This threshold is called the **significance level ($\alpha$)**.

- The standard baseline is **$0.05$ (5%)**. This means you want to be at least 95% confident the result wasn't a fluke before you declare a winner.

### Step 3: Collect data and find the $p$-value

You run the experiment and calculate a single, crucial number: the **$p$-value** (Probability Value).

- **What it means:** The $p$-value is the probability that you would get your experimental results purely by random luck if the Null Hypothesis were actually true.

### Step 4: Make your verdict

You compare your $p$-value to your threshold ($\alpha$):

> **If $p$-value $\leq \alpha$ (Usually $\leq 0.05$):** The result is highly unlikely to be a fluke. You **Reject the Null Hypothesis**. (The drink works!)
> **If $p$-value $> \alpha$ (Usually $> 0.05$):** You don't have enough evidence. You **Fail to Reject the Null Hypothesis**. (We can't prove the drink does anything).

---

## 3. Quick Summary Matrix

| Tool                        | What It Means                                         | How to Read It                                |
| --------------------------- | ----------------------------------------------------- | --------------------------------------------- |
| **Null Hypothesis ($H_0$)** | The baseline assumption of "no change/no effect."     | Assumed true until proven otherwise.          |
| **Alpha ($\alpha$)**        | Your strict standard for proof (cutoff line).         | Usually set to **0.05**.                      |
| **$p$-value**               | The odds that your data happened by pure random luck. | • **Low $p$ ($\leq 0.05$):** Real effect!<br> |

<br>• **High $p$ ($> 0.05$):** Just random noise. |

---

> **The Professor's Catchphrase:** In statistics, we never say a claim is 100% "proven." We simply say: _"The $p$-value is low, so the Null has got to go."_

Following our courtroom analogy, **Type I** and **Type II errors** are the two ways a jury can make the wrong verdict.

Because statistics relies on random samples, you can never be 100% certain. There is always a small chance you get a weird sample that misleads you.

---

## 1. The Error Matrix

Here is how the true reality matches up against your statistical verdict:

| | Reality: Null is True ($H_0$) <br>

<br>_(System works fine / Nothing happened)_ | Reality: Alternative is True ($H_1$) <br>

| <br>_(There is a real effect / change)_ |
| --------------------------------------- |

| **Verdict: Reject $H_0$** <br>

<br>_(You claim an effect exists)_ | ❌ **Type I Error** (False Alarm) <br>

<br>Probability = **$\alpha$** | **Correct Decision** (True Positive) <br>

<br>Probability = **Power ($1 - \beta$)** |
| **Verdict: Fail to Reject $H_0$** <br>

<br>_(You claim nothing happened)_ | **Correct Decision** (True Negative) <br>

<br>Probability = $1 - \alpha$ | ❌ **Type II Error** (Missed Detonation) <br>

<br>Probability = **$\beta$** |

---

## 2. Breaking Down the Terms

### Type I Error ($\alpha$) — The False Alarm

- **What it is:** You reject the null hypothesis, but it was actually true. You claim something special is happening when it isn't.
- **The Symbol:** **$\alpha$ (Alpha)**. This is the significance level you choose before your test (usually 0.05). By setting $\alpha = 0.05$, you accept a 5% chance of making a Type I error.
- **Courtroom Analogy:** Convicting an innocent person.

### Type II Error ($\beta$) — The Missed Detection

- **What it is:** You fail to reject the null hypothesis, but it was actually false. You claim nothing is happening, but you missed a real effect.
- **The Symbol:** **$\beta$ (Beta)**.
- **Courtroom Analogy:** Letting a guilty person walk free.

### Power ($1 - \beta$) — The Sensitivity

- **What it is:** The probability of correctly rejecting the null hypothesis when it is truly false. It is your test’s ability to detect a real effect. Higher power means you are less likely to miss something.
- **Goal:** You generally want a Power of **0.80 (80%)** or higher.

---

## 3. The Seesaw: $\alpha$ vs. $\beta$

You cannot completely eliminate both errors. If you try to decrease one, the other naturally increases.

> If you make $\alpha$ incredibly strict (e.g., $\alpha = 0.01$ to avoid False Alarms), you raise the bar of proof so high that your test becomes blind, making it much easier to miss real effects (**$\beta$ goes up, Power goes down**).

### How to increase Power without increasing Type I Error?

Increase your **Sample Size ($n$)**. More data makes your estimates tighter and cleaner, lowering $\beta$ and boosting your Power simultaneously.

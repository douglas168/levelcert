## The Big Five Distributions

- **Binomial** = Counting **Yes/No** successes in a fixed number of tries.
- **Poisson** = Counting how many events happen over a **fixed slice of time**.
- **Exponential** = Measuring the **waiting time** before the next event happens.
- **Normal** = Measuring natural data that clusters around an **average** (Bell Curve).
- **Uniform** = Events where **every single outcome** has the exact same baseline odds.

---

## Comparison Guide

| Distribution | Data Type    | Core Question                             | Shape                               | Real-World Examples                      |
| ------------ | ------------ | ----------------------------------------- | ----------------------------------- | ---------------------------------------- |
| **Binomial** | **Discrete** | _"How many wins out of $n$ fixed tries?"_ | Blocky bars; can tilt left or right | • Pulling 3 rare cards from 20 packs<br> |

<br>• Sinking 8 out of 10 free throws |
| **Poisson** | **Discrete** | _"How many events will happen in 1 hour?"_ | Skewed right; flattens out as numbers grow | • Number of website crashes per day<br>

<br>• Text messages received per hour |
| **Exponential** | **Continuous** | _"How long do I have to wait for the next event?"_ | High at zero, **decays downward** rapidly | • Lifespan of a laptop battery<br>

<br>• Time until the next customer calls |
| **Normal** | **Continuous** | _"What is the value of this measurement?"_ | Symmetrical **Bell Curve** | • Human heights or weights<br>

<br>• Video game rank spreads (Gold/Platinum) |
| **Uniform** | **Either** | _"What happens when all odds are identical?"_ | Completely flat **Rectangle** | • Rolling a single 6-sided die<br>

<br>• Spinner on a game show board |

---

## The Time-Tracking Connection

> **Poisson vs. Exponential:**
> Imagine you are waiting at a bus stop.
>
> - **Poisson** tracks the _number_ of buses that arrive each hour (e.g., 3 buses per hour).
> - **Exponential** tracks the _minutes_ that tick by between each bus arrival (e.g., waiting 20 minutes for the next one). Because you are measuring time, the data is continuous and has decimals.

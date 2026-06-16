## 1. Outliers (The "Main Character" Energy)

An **Outlier** is a data point that is so wildly different from the rest of the group that it stands out like a pro esports player dropping into a lobby full of absolute beginners.

```
Normal Data:  [ 👾, 👾, 👾, 👾, 👾, 👾 ]
Outlier:                                    [ 👑 ]  <-- Way off on its own

```

| The Group              | The Normal Crowd   | The Outlier                            |
| ---------------------- | ------------------ | -------------------------------------- |
| **TikTok Screen Time** | 2 to 4 hours a day | 23.5 hours _(Did they sleep?!)_        |
| **Class Shoe Sizes**   | Sizes 7 to 11      | Size 22 _(Shaquille O'Neal walked in)_ |

**Why data scientists care:** If you average everyone's screen time, that 23.5-hour outlier makes the whole class look like tech-addicts. Data scientists have to find and remove them so the math stays realistic.

---

## 2. Type Coercion (The "Shapeshifter" Trick)

Computers are super picky. They see text (like the word "five") and numbers (like the actual digit 5) as completely different species. **Type Coercion** is when the computer automatically forces one data type to transform into another so the code doesn't crash.

Imagine trying to add a text bubble to a math problem:

```
  "10" (Text/String)  +  5 (Actual Number)  =  "105" (Text)

```

The computer panic-shapes the number 5 into the text character "5" and just glues them together.

| What you gave it            | What the computer secretly does        | The Result                                   |
| --------------------------- | -------------------------------------- | -------------------------------------------- |
| Clicking a [Like] button    | Turns the click into a 1               | Adds 1 to the total like count.              |
| Typing 15 in a birthday box | Turns the text "15" into a math number | Lets the app check if you are older than 13. |

---

## 3. Field Extraction (The Specific Loot Grab)

When apps send data across the internet, they don't just send one neat clean word. They send a massive, messy backpack of code called a JSON file. **Field Extraction** is reaching into that giant messy backpack, grabbing the _one specific piece of loot_ you want, and throwing the rest away.

```
[ THE MESSY BACKPACK ] ─────────────────────────> [ THE ONE LOOT DROP YOU WANTED ]
{ "user": "Zack", "ping": 12, "skin": "Gamer" } ──> "ping": 12

```

| The Giant Messy Data Block     | The Field You Extract    | Why You Extracted It                 |
| ------------------------------ | ------------------------ | ------------------------------------ |
| A massive Spotify account file | Just the **Top Song**    | To build your Spotify Wrapped slide. |
| A huge Amazon checkout receipt | Just the **Total Price** | To track how much cash you spent.    |

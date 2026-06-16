## Tokenization Levels & Algorithms

**比喻：** 就像在夜市點餐，Word-level 是整份套餐，Subword 是拆成小菜，Character-level 是一粒粒米。

| Feature    | Word-level（詞級）     | Subword（子詞） / Character-level（字元級） | BPE / WordPiece / SentencePiece / tiktoken / Unigram LM                               |
| ---------- | ---------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| What       | Split by words         | Split into pieces or chars                  | Algorithms / toolkits for subword tokens                                              |
| How        | Space-based vocabulary | Balance meaning + unknown words             | Learn frequent pieces or probabilistic pieces                                         |
| When       | Small fixed domain     | Modern NLP / rare words                     | LLM preprocessing                                                                     |
| Example    | “unhappy”              | “un” + “happy” or chars                     | BPE merges; WordPiece scores; SentencePiece raw text; tiktoken OpenAI; Unigram prunes |
| Difficulty | Simple but huge vocab  | More robust                                 | Details differ by training objective                                                  |

**Key Points:**

- ⚡ Subword Tokenization（子詞斷詞） is the modern default.
- ⚠️ Don’t confuse SentencePiece（句子片段） with one algorithm; it can use BPE or Unigram LM（單字模型）.
- 💡 tiktoken is mainly OpenAI’s fast tokenizer implementation.

**Quiz:** Why do LLMs prefer subword tokens over pure words?

---

## Transformer Architectures

**比喻：** 就像用 LINE 回訊息，Encoder-only 只讀懂整段聊天，Decoder-only 邊看邊回，Encoder-decoder 先讀完再翻成另一種說法。

| Feature    | Encoder-only（僅編碼器）  | Decoder-only（僅解碼器）  | Encoder-decoder（編碼器-解碼器） |
| ---------- | ------------------------- | ------------------------- | -------------------------------- |
| What       | Understands input         | Generates next tokens     | Maps input to output             |
| How        | Bidirectional attention   | Causal attention          | Encoder reads, decoder writes    |
| When       | Classification, retrieval | Chatbots, text generation | Translation, summarization       |
| Example    | BERT（雙向編碼器表示）    | GPT（生成式預訓練轉換器） | T5（文字轉文字轉換器）           |
| Difficulty | Easier for understanding  | Harder long generation    | More complex but flexible        |

**Key Points:**

- ⚡ Attention Direction（注意力方向） is the main difference.
- ⚠️ Don’t use Encoder-only（僅編碼器） for free-form generation.
- 💡 This matters when choosing models for classification vs generation tasks.

**Quiz:** Which architecture is best for machine translation, and why?

---

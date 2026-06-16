## LLM Training & Adaptation

**比喻：** 這像在夜市學開店：先學全夜市規則，再調整自家攤位菜單，最後看客人回饋改服務。

| Feature    | Pretraining（預訓練）  | Fine-tuning（微調） | PEFT/LoRA（參數高效微調） | RLHF（人類回饋強化學習） | DPO（直接偏好最佳化）    | RAG（檢索增強生成）       |
| ---------- | ---------------------- | ------------------- | ------------------------- | ------------------------ | ------------------------ | ------------------------- |
| What       | Learn general language | Adapt model         | Cheap adaptation          | Align with humans        | Preference training      | Add external knowledge    |
| How        | Predict next token     | Train on task data  | Train small adapters      | Reward model + RL        | Chosen vs rejected pairs | Retrieve then generate    |
| When       | Build base model       | Need domain skill   | Limited compute           | Need safer behavior      | Simpler alignment        | Need fresh facts          |
| Example    | GPT base               | Medical chatbot     | LoRA for legal style      | Helpful assistant        | Prefer concise answer    | Search docs before answer |
| Difficulty | Very high              | Medium-high         | Medium                    | High                     | Medium                   | Medium                    |

**Key Points:**

- ⚡ RAG（檢索增強生成）changes input knowledge; tuning changes model behavior.
- ⚠️ Fine-tuning（微調）is not the best way to add frequently changing facts.
- 💡 PEFT/LoRA（參數高效微調）matters most when GPUs or data are limited.

**Quiz:** Which method is best for answering from a company’s latest internal documents?

---

# Research Notes: L23103 數值優化技術與方法

## Official Sources
- iPAS AI應用規劃師學習資源頁: 官方列出中級科目3學習指引與歷屆/公告試題下載；114-2、115-1 中級科目3公告試題已公開，應優先用來校準出題深度。Source: https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources
- iPAS 評鑑內容範圍參考(11502): L23103 條目只明列「數值優化技術與方法」，備註為「如演算法效率與可擴展性評估等」；未點名二階法或約束最佳化。Source: https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf
- iPAS 中級科目3學習指引: 3.3 說明損失函數最小化，涵蓋梯度下降、學習率調整、正則化；GD/SGD/Mini-batch SGD 皆有定義與適用情境。Source: https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf
- iPAS 中級科目3學習指引: GD 使用全訓練集，穩定但計算成本高；SGD 每次一筆，速度快但波動大；Mini-batch SGD 在穩定性與效率間平衡，且適合 GPU。Source: same as above.
- iPAS 中級科目3學習指引: Adam 定義為結合 Momentum 與 RMSprop，追蹤一階/二階動量並自動調整各參數學習率；β1、β2、ε 公式有出現在指引，但考題證據偏向概念辨識。Source: same as above.
- iPAS 中級科目3學習指引: 學習率是核心超參數；過大易震盪/發散，過小收斂慢；策略含固定學習率、Step/Exponential Decay、驗證停滯時動態調降、Warm-up。Source: same as above.
- iPAS 114-2 中級科目3公告試題: 第3題直接考「非凸函數 → 多個極值點 → 局部最優解」；第12題考學習率控制權重更新速度；第17題考「哪個優化演算法內建 Momentum」答案為 Adam。Source: https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%B8%AB%E7%AC%AC%E4%B8%89%E7%A7%91%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000650.pdf
- Local L23 exam intelligence: `content/ipas/intermediate/exams/L23-sample-questions-11409.md` flags「梯度下降與 Adam 優化器概念」as L231 基礎數學中頻，and separately notes batch size effect and loss-function selection.

## Community Insights (exam patterns)
- AITerms 114 L23 Q003 analysis reports an L23103-style question: 梯度下降陷入局部最小值，best mitigation is Momentum or Adam adaptive optimizer; distractors include simply lowering learning rate, stronger regularization, or smaller batch size. Source: https://aiterms.tw/ipas/questions/intermediate-114-L23-q003
- TechHanlin 114-2 L23 breakdown groups optimization under「訓練工程細節」with 正則化、優化器、學習率、早停; highlights Q17: Adam has built-in Momentum design, while SGD+Momentum is explicit add-on. Source: https://www.techhanlin.tw/ipas-ai-planner-mid-l23/
- TechHanlin also flags time complexity as code/logic reading: pairwise comparison over n customers is O(n^2), and 10x data can imply 100x time. Useful for「演算法效率」coverage. Source: same as above.
- Vocus community notes include a common Adam question:「為什麼 Adam 比傳統梯度下降有效？」answer emphasizes automatic learning-rate adjustment per parameter, not generic faster computation. Source: https://vocus.cc/article/68074e04fd897800013f4d3f
- Community posts sometimes include Momentum arithmetic or Adam full formulas; treat as stretch unless official question evidence requires it. The confirmed code-style item should stay at SGD update tracing, not full Adam derivation.
- No strong public evidence found that cosine annealing is directly tested by iPAS L23103. It is useful as current industry vocabulary, but official iPAS guide explicitly names Step/Exponential Decay, dynamic adjustment, and Warm-up.

## Current State (if technology topic)
- TensorFlow/Keras Adam docs define Adam as stochastic gradient descent based on adaptive first/second moment estimates; defaults: learning_rate=0.001, beta_1=0.9, beta_2=0.999, epsilon=1e-7. Source: https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/Adam
- PyTorch Adam docs list Adam as stochastic optimization and expose `lr`, `betas`, `eps`, `weight_decay`, `amsgrad`; useful only to confirm terminology, not to teach implementation internals. Source: https://docs.pytorch.org/docs/stable/generated/torch.optim.Adam.html
- PyTorch SGD docs expose `lr`, `momentum`, `dampening`, `weight_decay`, `nesterov`; exam-relevant contrast: plain SGD vs SGD with Momentum vs Adam. Source: https://docs.pytorch.org/docs/stable/generated/torch.optim.SGD.html
- PyTorch StepLR docs: step decay reduces learning rate by `gamma` every `step_size` epochs; aligns with official iPAS「遞減學習率」coverage. Source: https://docs.pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.StepLR.html
- PyTorch CosineAnnealingLR docs confirm cosine annealing is a standard scheduler; include only as recognition-level「平滑下降」if the guide covers schedules, and mark lower exam confidence. Source: https://docs.pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CosineAnnealingLR.html
- Batch size and scalability: official iPAS guide says Mini-batch size affects gradient accuracy, training speed, GPU memory, and task characteristics; expected depth is trade-off judgment, not distributed systems mechanics.

## External Documents Found
- No separate external syllabus-referenced document found for L23103.
- Official iPAS learning guide and announcement PDFs are sufficient for baseline scope.
- No official vendor FAQ/whitepaper found that narrows Adam depth beyond the learning guide and公告試題.

## Key Findings Summary
- Most exam-relevant variants: GD, SGD, Mini-batch SGD, Momentum, Adam; Adagrad/RMSprop may appear as comparison distractors, but boundary should focus on GD/SGD/Mini-batch/Adam.
- Adam expected depth: know「內建動量 + 自適應學習率 / 一階與二階動量」and recognize β1、β2、ε names; do not require hand-calculating full Adam updates.
- SGD update rule arithmetic is justified by official guide formula θ(t+1)=θ(t)-η∇L and local confirmed code-style item; include 2-step trace with simple numbers.
- Learning-rate schedules: high confidence for fixed, step/exponential decay, Reduce-on-Plateau style dynamic adjustment, warm-up; lower confidence for cosine annealing on iPAS exam despite industry relevance.
- Convex/non-convex is tested as recognition/scenario judgment: non-convex loss surface has multiple extrema and can lead to local optimum/saddle-point issues.

## Scope Notes
- Skip second-order methods, constrained optimization, Lagrange multipliers, KKT, Newton/quasi-Newton; these exceed the provided boundary and are not needed for L23103 guide.
- Keep Adam formula at intuition/term-recognition level; full bias-correction derivation is too deep for the target.
- Do not turn learning-rate schedules into framework API memorization; use scenario triggers such as「震盪 → learning rate too large」and「收斂慢 → learning rate too small」.
- Distributed training readiness should be covered as mini-batch/GPU scalability trade-off, not NCCL, all-reduce, parameter server, or multi-node architecture.
- Community sources are useful for exam pattern hints but should not override official iPAS PDFs when conflicts appear.

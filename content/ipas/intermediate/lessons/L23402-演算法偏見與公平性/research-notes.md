# Research Notes: L23402 演算法偏見與公平性

## Official Sources
- iPAS 115 評鑑內容範圍參考: L23402 官方範圍只有「如識別資料或模型中潛在的偏誤來源與調整策略等」；未提供公平性公式或工具清單。Source: https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf
- iPAS 官方考試資訊: 中級科目三為「機器學習技術與應用」，官方考試頁提供考程/獲證條件，但未列 L23402 細部考點。Source: https://ipd.nat.gov.tw/ipas/certification/AIAP/exam-info
- iPAS 官方公告: 自 114 年第二梯次中級起，科目二/三納入程式相關題型，預計約 25%，含 Python 語法、程式邏輯、程式片段解析；L23402 題目可能以數字/程式判讀方式出現。Source: https://ipd.nat.gov.tw/ipas/certification/AIAP/news/ffdba0fcdbda40baadeef2a1bdc0230e
- CPC 中區 iPAS 中級複習班頁: 課程列出 L234 機器學習治理、L23402 演算法偏見與公平性；未提供公式。Source: https://tc.cpc.org.tw/class/content/1734
- Fairness and Machine Learning, Barocas/Hardt/Narayanan: 適合作為理論背景；重點是 ML loop 會經由 measurement、learning、action、feedback 傳播不平等，Chapter 3 covers independence/demographic parity, separation/equalized odds, sufficiency。Source: https://fairmlbook.org/pdf/fairmlbook.pdf
- IBM/LF AI AIF360 main site: AIF360 有 70+ fairness metrics，包含 statistical parity difference、equal opportunity difference、average odds difference、disparate impact。Source: https://ai-fairness-360.org/
- AIF360 algorithms docs v0.6.1: 明確分 stage: preprocessing, inprocessing, postprocessing；適合直接做教材表格。Source: https://aif360.readthedocs.io/en/stable/modules/algorithms.html
- Fairlearn common fairness metrics: Demographic parity = prediction independent of sensitive feature; binary classification means selection rates across groups equal. Equalized odds requires equal FPR and TPR across groups. Source: https://fairlearn.org/main/user_guide/assessment/common_fairness_metrics.html
- Google ML Crash Course Fairness: 官方教學包含 types of bias, identifying/mitigating/evaluating bias, demographic parity, equality of opportunity；適合 exam-level explanation，不要深入證明。Source: https://developers.google.com/machine-learning/crash-course/fairness
- Google What-If Tool: 可測試 hypothetical inputs、分析 feature importance、視覺化不同資料切片與 fairness metrics；適合 model auditing/tool awareness。Source: https://pair-code.github.io/what-if-tool/
- EEOC Uniform Guidelines Q&A: 80%/four-fifths rule 是 rule of thumb；one selection rate less than 80% of another normally indicates adverse impact, but not final unlawful-discrimination conclusion。Source: https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines
- 29 CFR 1607.4(D): selection rate for any race/sex/ethnic group less than four-fifths of the highest-rate group is generally evidence of adverse impact. Source: https://www.law.cornell.edu/cfr/text/29/1607.4

## Community Insights (exam patterns)
- Local L23 exam intelligence file reports L234 governance heavier than expected, about 25%; fairness item confirmed: Demographic Parity vs Equal Opportunity distinction. Source: content/ipas/intermediate/exams/L23-sample-questions-11409.md
- Same local file reports L233 confusion-matrix metrics have numeric calculation questions; L23402 should prepare fairness metrics from confusion matrices, not just definitions.
- Community summary page mentions L23402 as「避免模型偏見、確保公平、消除對某些群體偏向」but is generic and not formula-level. Source: https://vocus.cc/article/68074e04fd897800013f4d3f
- Community learning-guide analysis lists likely L234 terms: SMOTE, Adversarial Debiasing, Equal Opportunity, Demographic Parity, threshold adjustment. Useful but must verify with official/tool docs before writing claims. Source: https://vocus.cc/article/68ecd196fd89780001f5c8f1
- Community mock-question snippets show Demographic Parity as a likely option/trick answer: checks positive predictions across groups. Source: https://vocus.cc/article/69eac812fd89780001280a9a
- Known local pattern to encode in practice questions: bank approval rates A=60%, B=40%; DI = 40/60 = 0.667 < 0.8, triggers four-fifths adverse-impact concern.
- Known high-frequency trap: DP asks whether positive prediction/selection rates are similar; Equal Opportunity asks whether TPR among actually qualified/positive cases is similar.
- Known post-processing trap: reject-option classification changes outcomes near the decision boundary; not a data cleaning or model-training method.

## Current State (if technology topic)
- AIF360 current PyPI release found: 0.6.1, released 2024-04-08; docs page is also v0.6.1. Source: https://pypi.org/project/aif360/
- AIF360 is now presented by LF AI / Trusted-AI, while IBM remains the origin/reference; wording in guide can say「IBM 發起、現為 LF AI/Trusted-AI 生態的 AIF360」to avoid stale ownership phrasing. Source: https://ai-fairness-360.org/
- Google What-If Tool docs remain accessible and describe model probing/fairness metric visualization; no current version number found in official page. Treat as tool awareness, not implementation requirement. Source: https://pair-code.github.io/what-if-tool/
- Google ML Crash Course fairness pages show last updated 2025-08-25 for module and 2025-12-03 for bias/equality pages, so they are reasonably current for concept wording. Sources: https://developers.google.com/machine-learning/crash-course/fairness and https://developers.google.com/machine-learning/crash-course/fairness/equality-of-opportunity

## External Documents Found
- Barocas, Hardt, Narayanan "Fairness and Machine Learning": found; use for ML-loop framing, measurement issues, independence/demographic parity, separation/equalized odds; avoid higher-level impossibility/proof depth. Source: https://fairmlbook.org/pdf/fairmlbook.pdf
- IBM/LF AI AIF360 toolkit docs: found; use for metrics formulas and mitigation-stage taxonomy. Sources: https://ai-fairness-360.org/ and https://aif360.readthedocs.io/en/stable/modules/algorithms.html
- Google What-If Tool docs: found; use for auditing/probing and slice-based fairness analysis, not as a required coding library. Source: https://pair-code.github.io/what-if-tool/
- US EEOC 80% rule/four-fifths guidance: found; use as rule-of-thumb threshold, not as final legal determination. Sources: https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines and https://www.law.cornell.edu/cfr/text/29/1607.4
- Suresh & Guttag bias-source taxonomy: found via arXiv/EAAMO; use for lifecycle taxonomy: historical, representation, measurement, aggregation, evaluation, deployment. Source: https://arxiv.org/abs/1901.10002

## Key Findings Summary
- Core formulas to teach:
  - Disparate impact ratio: `DI = P(Yhat=1 | D=unprivileged) / P(Yhat=1 | D=privileged)`; in exam shorthand, lower selection rate / higher or privileged selection rate. AIF360 formula source: https://aif360.readthedocs.io/en/stable/modules/generated/aif360.metrics.ClassificationMetric.html
  - Four-fifths rule: `DI < 0.8` normally flags adverse impact / needs investigation; 0.8 is not a final legality judgment. EEOC source: https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines
  - Demographic parity difference / statistical parity difference: `P(Yhat=1 | D=unprivileged) - P(Yhat=1 | D=privileged)`; fair target close to 0. AIF360 source: https://aif360.readthedocs.io/en/stable/modules/generated/aif360.metrics.ClassificationMetric.html
  - Equal opportunity difference: `TPR_unprivileged - TPR_privileged`, where `TPR = TP / P = TP / (TP + FN)`; fair target close to 0. AIF360 source: https://aif360.readthedocs.io/en/stable/modules/generated/aif360.metrics.ClassificationMetric.html
  - Equalized odds difference: `max(|FPR_unpriv - FPR_priv|, |TPR_unpriv - TPR_priv|)`; fair target 0. AIF360 source: https://aif360.readthedocs.io/en/stable/modules/generated/aif360.metrics.ClassificationMetric.html
- Bias-source taxonomy for exam:
  - Data bias: historical bias, representation/selection bias, measurement/proxy-label bias.
  - Model/process bias: aggregation bias (one model ignores subgroup differences), evaluation bias (test set/metric mismatches target population), deployment bias (use context differs from training/evaluation context), feedback loops.
  - Google simpler terms useful for question wording: reporting bias, historical bias, selection/coverage/non-response/sampling bias, confirmation/experimenter bias. Source: https://developers.google.com/machine-learning/crash-course/fairness/types-of-bias
- AIF360 mitigation stage map:
  - Pre-processing: DisparateImpactRemover, LFR, OptimPreproc, Reweighing. Reweighing assigns different weights to each `(group, label)` combination before classification.
  - In-processing: AdversarialDebiasing, PrejudiceRemover, ExponentiatedGradientReduction, GridSearchReduction. AdversarialDebiasing trains classifier for accuracy while reducing adversary ability to infer protected attribute from predictions.
  - Post-processing: CalibratedEqOddsPostprocessing, EqOddsPostprocessing, RejectOptionClassification. CalibratedEqOdds optimizes calibrated score outputs to flip labels probabilistically for equalized-odds objective.
- Reject-option classification mechanism:
  - AIF360: gives favorable outcomes to unprivileged groups and unfavorable outcomes to privileged groups within a confidence band around the decision boundary, where uncertainty is highest. Source: https://aif360.readthedocs.io/en/stable/modules/generated/aif360.algorithms.postprocessing.RejectOptionClassification.html
  - Exam phrasing: score far from threshold stays same; score near threshold may be adjusted toward fairness.
- Reweighting mechanism:
  - Assign sample weights by protected group and label combination so group/label distributions are balanced before training; in sklearn-style questions, expect `sample_weight` concept rather than deriving the exact weight formula.
- Auditing procedure to teach:
  - Define protected attribute and privileged/unprivileged groups.
  - Compute selection rates and confusion matrix per group.
  - Compare DP/DI for allocation parity; compare TPR for Equal Opportunity; compare TPR+FPR for Equalized Odds.
  - If disparity exceeds threshold or context risk is high, choose mitigation stage based on permissions: data available -> pre-processing; training controllable -> in-processing; only model scores available -> post-processing.

## Scope Notes
- Do not re-teach generic ML training, cross-validation, or confusion matrix basics except the minimum needed to compute group-level fairness metrics.
- Do not include mathematical proofs, impossibility theorems, causal fairness, counterfactual fairness, or individual fairness as main content; mention only as out-of-scope if needed.
- Four-fifths rule is US employment-law guidance; useful exam scenario and fairness heuristic, but avoid claiming it is a universal legal standard in Taiwan.
- Official iPAS sources do not provide exact formulas; formula claims should cite AIF360/Fairlearn/Google/EEOC, not iPAS.
- Community sources are study signals, not authoritative citations; use them to prioritize practice questions, not as final truth.

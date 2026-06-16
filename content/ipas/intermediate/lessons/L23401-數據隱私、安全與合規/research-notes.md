# Research Notes: L23401 數據隱私、安全與合規

## Official Sources
- [iPAS AI 應用規劃師學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方頁列出中級科目3「機器學習技術與應用」學習指引與公告試題；應優先用官方公告試題校準題型。
- [iPAS 115 評鑑內容範圍參考 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): L23401 官方範圍只有「資料安全性、隱私保護以及符合法規要求等」；可延伸到 ML lifecycle governance，但不要把 L22404 的隱私技術重教一次。
- [114 第二梯次中級科目2公告試題 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已出現「GenAI 客服可能輸出姓名、電話、交易資訊」情境，正解方向是訓練資料匿名化/偽匿名化 + 輸出內容稽核；可作跨科題型參考。
- [NIST SP 800-218 SSDF v1.1](https://csrc.nist.gov/pubs/sp/800/218/final): secure SDLC 的權威框架；考點可轉成「把安全活動嵌入開發流程」，如需求、設計、實作、驗證、弱點回應，而非只在上線後補救。
- [NIST SP 800-218 Rev.1 draft / SSDF v1.2](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd): 2025-12-17 initial public draft，comment period 已於 2026-01-30 截止；Current State 應註明正式版仍以 v1.1 為主，v1.2 是草案。
- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) and [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/): Govern/Map/Measure/Manage；特別適合 L23401 的「文件化、監控、風險追蹤、停用/退役」治理層。
- [OWASP Machine Learning Security Top 10 draft v0.3 PDF](https://mltop10.info/OWASP-Machine-Learning-Security-Top-10.pdf): ML01 input manipulation, ML02 data poisoning, ML03 model inversion, ML04 membership inference, ML05 model theft；可用於「辨識攻擊情境 → 選治理/控制措施」。
- [個人資料保護法 - 全國法規資料庫](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021): 2025-11-11 修正，部分條文尚未生效；重點為個資定義、蒐集/處理/利用、告知、查閱/更正/停止/刪除、安全維護、事故通知與紀錄保存。

## Community Insights (exam patterns)
- Local reference: `content/ipas/intermediate/exams/L23-sample-questions-11409.md` reports L234 governance heavier than expected, about 25% of 科目三 in 2026-05-17 community report.
- Reported L234 topics: GDPR 被遺忘權 / machine unlearning, differential privacy, fairness metrics, algorithmic bias, model drift monitoring and retraining triggers.
- For this L23401 guide, use the report as exam-intelligence only: include GDPR deletion/erasure and auditability, but keep differential privacy mechanics and federated learning architecture out of main teaching because those belong to L22404.
- [Vocus L23401 quick notes](https://vocus.cc/article/69fedfd6fd89780001edb724): community prep notes emphasize PIA, anonymization, PETs, K-anonymity/L-diversity/T-closeness, FL/HE, and data minimization; useful as a signal that privacy topics are being studied, but several items cross into L22404.
- [TechHanlin 150-question pattern analysis](https://www.techhanlin.tw/ipas-ai-planner-intermediate-guide/): frames intermediate exam as scenario judgment rather than definition recall; privacy/encryption reportedly cross-subject, so write practice questions as applied cases.
- Common trap pattern: option sounds technically strong but is wrong scope, e.g. "use federated learning/differential privacy" when the scenario asks for post-deployment audit trail, consent traceability, or model documentation.

## Current State (if technology topic)
- SSDF: official stable source is NIST SP 800-218 v1.1 (Feb 2022); v1.2 is only an initial public draft as of 2025-12-17, so do not teach v1.2 as final.
- Taiwan PDPA: current law page shows 2025-11-11 amendments with some provisions pending effective date; avoid precise operational deadlines unless checked against the implementing rules.
- GDPR Article 22 remains the core automated decision-making provision; exam framing should be "solely automated decision with legal/similarly significant effect → safeguards, human intervention, contestability, explanation/meaningful information."
- EU AI Act is not listed in the syllabus, but Article 12 logging is relevant background for audit logging: high-risk AI systems need automatic event logs over the system lifetime; include only as industry trend, not as iPAS official requirement.
- Model cards/datasheets are still best treated as documentation patterns, not legal compliance by themselves.

## External Documents Found
- [GDPR Article 22 text](https://gdpr-info.eu/art-22-gdpr/): data subjects have a right not to be subject to solely automated decisions with legal/similarly significant effects; exceptions include contract necessity, law, or explicit consent; safeguards include human intervention, viewpoint expression, and contesting the decision.
- [ICO automated decision-making guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/): practical exam-useful checklist: identify Article 22 processing, explain processing, provide challenge/human review channel, regularly check accuracy/bias, document lawful basis and DPIA.
- [EDPB automated decision-making and profiling guidelines page](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/automated-decision-making-and-profiling_en): WP29 guidelines endorsed by EDPB; useful as EU authority backing for Article 22 interpretation.
- [Taiwan Personal Data Protection Act](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021): key mappings for model outputs: if outputs contain identifiable natural-person data, treat as personal data; requests may involve access, correction, stop processing/use, deletion; security incidents require notification/response/records.
- [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993): model cards document intended use, evaluation procedures, limitations, and performance across relevant groups; L23401 fit = model transparency and post-training governance.
- [TensorFlow Model Card Toolkit](https://www.tensorflow.org/responsible_ai/model_card_toolkit/guide): practical template/tool source; highlights model metadata, metrics, transparency, product-team handoff, user decision support, and oversight/accountability.
- [Datasheets for Datasets](https://arxiv.org/abs/1803.09010): datasheets document dataset motivation, composition, collection process, recommended uses, and maintenance; L23401 fit = data provenance/consent/lineage documentation.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/): Manage 2.4 explicitly covers superseding, disengaging, or deactivating AI systems whose performance/outcomes no longer match intended use; use for model retirement.
- [EU AI Act Article 12, EUR-Lex official regulation](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng): found official regulation; search result confirms record-keeping/logging obligations for high-risk AI. Use as optional current-state source, not central syllabus material.

## Key Findings Summary
- L23401 should teach governance chain: data provenance/datasheet → training/model documentation/model card → deployment audit logging → consent/deletion propagation → retirement/deactivation.
- Exam answers likely reward scenario judgment: "個資輸出/自動化決策/無法追溯/撤回同意/模型退役" should map to documentation, logging, human review, deletion workflow, and governance controls.
- Taiwan 個資法 mapping: identify whether input/output is personal data, check purpose and consent/legal basis, provide data-subject rights handling, protect files, notify incidents, preserve incident/response records.
- GDPR Article 22 is not a generic "right to explanation" for every model; it is strongest when the decision is solely automated and has legal or similarly significant effects.
- OWASP ML security is useful for recognizing attack scenarios, but L23401 should focus on controls and evidence: access control, secure storage, monitoring/auditing, logging inputs/outputs, and anomaly detection.

## Scope Notes
- Do not re-teach differential privacy epsilon, noise mechanisms, secure aggregation, or federated-learning architecture; note only as out-of-scope mitigations when a source/community post mentions them.
- K-anonymity, L-diversity, T-closeness, homomorphic encryption, and FL are mostly L22404 if taught as technical privacy mechanisms; for L23401, mention only as examples that must be documented in datasheets/model cards.
- Model inversion and membership inference can be introduced as privacy risks, but avoid deep attack math or implementation details.
- EU AI Act logging is useful current industry context, but iPAS L23401 official wording does not name it; do not overstate it as an exam-required regulation.
- "Right to explanation" should be phrased carefully: teach practical safeguards and meaningful information/human review, not an absolute universal right to inspect model internals.

# Research Notes: L23102 線性代數之機器學習基礎應用

## Official Sources
- [iPAS AI應用規劃師(中級)-學習指引-科目3機器學習技術與應用](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): L23102 的核心定位是「特徵空間幾何」。資料點在多維特徵空間中，線性變換可做特徵重組、維度轉換、方向加權；PCA 是找出最大化資料變異量的正交向量基底，再用矩陣乘法投影到主成分空間，達到降維與特徵重組。
- [同上，SVD/矩陣分解段落](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): SVD 應以 `X = UΣV^T` 的直覺解釋為主：`U` 對應樣本方向、`Σ` 的奇異值表示主方向重要性、`V` 對應特徵方向。考試層級應連到資料降維、PCA 計算、推薦系統、LSA、影像壓縮。
- [同上，降維方法段落](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): PCA 是線性降維，保留最大變異方向，常用於視覺化、雜訊過濾、建模加速；t-SNE/UMAP 是非線性降維，偏向保留鄰近關係與視覺化探索，不適合直接當預測建模主流程。
- [114年第二次AI應用規劃師-中級能力鑑定 第三科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%89%E7%A7%91%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000650.pdf): 已出現 NumPy 線性代數程式判讀題：`np.linalg.inv(A)`、`v1 * v2`、`np.dot(v1, v2)`、`np.linalg.eig(A)` 的功能辨識；也出現 PCA 對 noisy digits 影像去噪的程式修正題組。
- [iPAS 中級程式題型比重說明](https://www.ipas.org.tw/certification/AIAP/news/ffdba0fcdbda40baadeef2a1bdc0230e): 自 114 年第二梯次起，科目三納入 Python 基本語法、程式邏輯判斷、程式片段解析；後續程式類題目預計約占整體 25%，形式含單選與題組。

## Community Insights (exam patterns)
- Local exam intelligence file `content/ipas/intermediate/exams/L23-sample-questions-11409.md` flags L231 基礎數學為中頻：PCA 最大變異數原則、矩陣乘法/前向傳播計算有計算題。
- [vocus L23102 快速重點整理](https://vocus.cc/article/6a02d6affd8978000122fd7a): Community prep notes emphasize vectors/matrices as ML data containers: vector can represent one sample, model parameters, embeddings, gradients; dot product measures direction similarity/projection; L2 norm is vector length; matrix multiplication maps features through `z = Wx + b`.
- Same community source frames EVD vs SVD as a likely comparison: EVD applies to square matrices, especially symmetric matrices; SVD applies to any matrix and is associated with left/right singular vectors, singular values, recommendation, image compression, LSA.
- [AITerms iPAS 中級備考 page](https://aiterms.tw/ipas/L2/): Community prep page summarizes L23 as needing scikit-learn/Python code reading, not just term memorization; it reports code-reading around 25% and recommends understanding execution logic/output rather than memorizing API names.
- [TechHanlin L23 trend analysis](https://www.techhanlin.tw/ipas-ai-planner-mid-l23/): Prep analysis says code questions should be solved by checking imported library, mentally executing shape/value changes, then matching options. For L23102, this supports adding small NumPy-style snippets and shape/result traps.

## Current State (ML linear algebra tooling)
- [scikit-learn PCA API](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html): `sklearn.decomposition.PCA` is documented as linear dimensionality reduction using SVD to project centered data to a lower-dimensional space. Important exam-safe wording: input is centered, not scaled, before SVD.
- PCA exam-level API pattern:
  ```python
  from sklearn.decomposition import PCA
  pca = PCA(n_components=k)
  X_new = pca.fit_transform(X)
  pca.explained_variance_ratio_
  ```
  Teach `explained_variance_ratio_` and cumulative sum as the way to judge how much variance top components retain.
- [scikit-learn PCA solver state](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html): Current docs list `svd_solver='auto'|'full'|'covariance_eigh'|'arpack'|'randomized'`; `covariance_eigh` was added in scikit-learn 1.5. For exam notes, avoid solver internals except recognizing that PCA may be implemented by SVD or covariance eigendecomposition.
- [NumPy `np.linalg.svd`](https://numpy.org/doc/2.1/reference/generated/numpy.linalg.svd.html): Current SVD output is `U, S, Vh`; `S` is singular values sorted descending. NumPy writes the factorization as `u @ np.diag(s) @ vh`, not `V.T` as a returned variable name.
- [NumPy SVD notes](https://numpy.org/doc/2.1/reference/generated/numpy.linalg.svd.html): For 2D matrix `A`, SVD is `A = U S V^H`; rows of `Vh` relate to eigenvectors of `A^H A`, columns of `U` relate to eigenvectors of `A A^H`, and singular values squared correspond to eigenvalues. Use this only as intuition, not proof.
- [scikit-learn TruncatedSVD](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html): `TruncatedSVD` performs linear dimensionality reduction via truncated SVD and, unlike PCA, does not center data; this is why it works efficiently with sparse matrices such as text term-count or TF-IDF matrices and is known as LSA in that context.
- [scikit-learn t-SNE](https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html) and [manifold learning docs](https://scikit-learn.org/stable/modules/manifold.html): t-SNE is mainly a visualization method for high-dimensional data; manifold learning is non-linear dimensionality reduction. Exam-testable contrast: PCA/SVD are linear, more interpretable for variance/projection/compression; t-SNE/UMAP are non-linear visualization/exploration methods, not primary compression or predictive feature pipelines.

## Key Findings Summary
- Most exam-relevant core: feature space geometry. A sample is a vector, a dataset is a matrix, an embedding is a geometric vector; linear transformations rotate/scale/project/recombine features.
- High-value operations to teach with tiny examples: dot product, norm, cosine similarity, matrix multiplication shape/result, transpose, inverse, and `np.linalg.eig` vs `np.linalg.inv`.
- PCA standard flow for exam recognition: center data -> covariance matrix or SVD route -> select top-k components by largest eigenvalues/singular values -> project `X @ components` -> read variance retained with `explained_variance_ratio_` and cumulative sum.
- SVD standard flow: `A = UΣV^T`/NumPy `U, S, Vh`; keep top-k singular values/vectors for low-rank approximation, denoising, compression, LSA/recommendation-style latent factors.
- Confused pairs to explicitly contrast: eigenvalue vs eigenvector; EVD vs SVD; PCA vs TruncatedSVD; PCA explained variance ratio vs cumulative variance; PCA vs t-SNE/UMAP; elementwise `v1 * v2` vs dot product `np.dot(v1, v2)`.

## Scope Notes
- Stay in L23102: vectors, matrices, feature spaces, embeddings as vectors, linear transformations, EVD/SVD/PCA, low-rank approximation, tensors as higher-order arrays.
- Do not re-teach scaling/transformation selection as a data-prep decision; mention only that PCA implementations center data when explaining API behavior. Detailed StandardScaler/normalization/log transform choices belong to L22301.
- Do not teach algorithm-specific distribution assumptions or statistical inference depth; those belong to L23101.
- No proofs. Use intuition, one-step numeric examples, pseudocode recognition, and scenario judgment.
- Tensor coverage should be recognition-level only: scalar 0D, vector 1D, matrix 2D, tensor 3D+ for images/batches/deep learning data; avoid tensor algebra.

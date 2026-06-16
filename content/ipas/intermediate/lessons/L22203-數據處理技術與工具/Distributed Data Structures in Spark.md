## Distributed Data Structures in Spark

**比喻：** 就像去通化夜市買小吃，你可以選擇自己帶各種形狀的保鮮盒讓老闆瞎裝（RDD），或是直接用夜市統一規格的便當格子外帶（DataFrame），甚至可以要求店家用完全符合餐點尺寸的特製高檔餐盒密封（Dataset）。

| Feature    | RDD（彈性分散式資料集）                                                      | DataFrame（資料訊框）                                               | Dataset（資料集）                                                       |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| What       | Low-level distributed collection of Java/Python objects without schema.      | Distributed collection of data organized into named columns.        | Strongly-typed extension of DataFrame providing type safety.            |
| How        | Manipulates raw data directly using functional transformations.              | Uses Catalyst Optimizer and Tungsten execution engine.              | Combines Catalyst Optimizer with JVM compile-time type checking.        |
| When       | Used when low-level control and unstructured data manipulation are required. | Used for structured data analysis and high-performance SQL queries. | Used in Scala/Java when compile-time type safety is mandatory.          |
| Example    | Transforming a raw text file of LINE chat logs into tuples.                  | Reading a Shopee order CSV directly into a named table format.      | Mapping a structured database stream into a specific User class object. |
| Difficulty | High: requires manual optimization and deep programming knowledge.           | Low: declarative API similar to standard SQL queries.               | Medium: requires static typing knowledge in Scala or Java.              |

- 0 compile-time type safety is provided when using standard DataFrames in Python.
- 3 distinct abstraction layers exist within Apache Spark for managing distributed big data.

**Quiz:** If you are writing a PySpark script to analyze transaction logs and want maximum optimization automatically, should you use RDD or DataFrame? Wait for answer.

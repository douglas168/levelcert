## Distributed Data Processing with Hadoop

**比喻：** 就像在西門町開一家超大排隊飲料店，HDFS（Hadoop 分散式檔案系統）是負責把整卡車的水果分裝到不同大冰箱的倉庫管理員，YARN（資源協調者）是分配哪位員工去榨汁、哪位去點餐的店長，而 MapReduce（對映程式與歸納程式）則是規定「先切塊再總計」的飲料調配SOP。

| Feature    | HDFS（Hadoop 分散式檔案系統）                                         | YARN（資源協調者）                                                       | MapReduce（對映程式與歸納程式）                                              |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| What       | Distributed storage system that breaks data into blocks across nodes. | Architectural resource manager that allocates CPU and memory.            | Software framework for processing vast amounts of data in parallel.          |
| How        | Replicates data blocks across multiple machines for fault tolerance.  | Manages jobs through a ResourceManager and per-application NodeManagers. | Splits tasks into a Map phase (filtering) and a Reduce phase (aggregating).  |
| When       | Triggered when large datasets need to be stored reliably.             | Active constantly to orchestrate cluster resources and job queues.       | Executed when batch processing jobs run over the stored data.                |
| Example    | Splitting a 10 GB log file into 128 MB chunks across a cluster.       | Assigning 4 cores and 16 GB RAM to a specific analytics task.            | Filtering logs for 404 errors (Map) and counting total occurrences (Reduce). |
| Difficulty | Low operational complexity once cluster replication is configured.    | High complexity in tuning resource allocation and queue scheduling.      | High development effort due to rigid, low-level Java code structures.        |

**Key Points:**

- ⚡ **HDFS** stores the data, **YARN** allocates the compute horsepower, and **MapReduce** executes the actual processing logic.
- ⚠️ Do not mistake **YARN** for a data processing engine; it only hands out the compute tickets without looking at the data content.
- 💡 Crucial for legacy enterprise data lakes where reliable batch processing of massive historical datasets outweighs real-time speed requirements.

**Quiz:** If a Hadoop cluster node crashes while executing a heavy analytical job, which component is responsible for re-allocating the CPU and RAM resources to a healthy node so the job can finish?

---

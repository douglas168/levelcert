## Distributed Storage Components in HDFS

**比喻：** NameNode（主節點）就像是台北捷運的中央調度指揮中心，負責掌控所有列車的班次與路線精確位置，而 DataNode（資料節點）则是停在各個捷運站的列車車廂，裡面裝載著被拆分成一節節的 **Block（資料塊）**，並透過 Replication（副本機制）把相同內容備份在不同路線的車站，以免某條捷運線突然故障斷電。

| Feature    | Block（資料塊）                                                | Replication（副本機制）                                           | NameNode（主節點）                                                          | DataNode（資料節點）                                              |
| ---------- | -------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| What       | The minimum unit of continuous storage space in HDFS.          | The mechanism of duplicating data blocks across multiple nodes.   | The master server that manages the file system namespace and metadata.      | The worker node that stores and retrieves the actual data blocks. |
| How        | Splits large files into fixed-size chunks (typically 128 MB).  | Automatically creates and distributes redundant copies of blocks. | Holds the mapping of files to blocks in memory for fast lookup.             | Executes block read/write requests directed by the master.        |
| When       | Determined at the moment data is uploaded to the cluster.      | Executed during data ingestion and when a node failure occurs.    | Accessed whenever a client starts reading or writing any file.              | Active continuously to store data and send heartbeats to master.  |
| Example    | Breaking a huge 1 GB system log file into 8 separate pieces.   | Storing a single data block on three distinct server racks.       | Recording that /data/user_log consists of blocks B1 and B2.                 | Storing block B1 on its local hard drive disk.                    |
| Difficulty | Low operational overhead; handled automatically by the system. | Medium complexity to balance network bandwidth and storage costs. | High single point of failure risk if not configured with High Availability. | Low complexity but requires robust hardware maintenance.          |

**Key Points:**

- ⚡ **NameNode（主節點）** only manages metadata, while **DataNode（資料節點）** holds the actual file content split into **Block（資料塊）**.
- ⚠️ Do not mistake the master node for handling actual data traffic; clients talk directly to worker nodes after getting coordinates.
- 💡 Crucial for preventing massive enterprise data loss when scaling out bare-metal server infrastructure.

**Quiz:** If a cluster has a Replication（副本機制） factor of 3, and 2 worker nodes suddenly catch fire, can a user still successfully download their file?

---

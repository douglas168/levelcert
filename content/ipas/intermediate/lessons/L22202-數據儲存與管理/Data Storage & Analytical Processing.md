## Data Storage & Analytical Processing

**比喻：** 就像在台北捷運站，刷悠遊卡進站要瞬間處理幾百萬人的單次進出（OLTP），但捷運公司總部年底要拉出整年的乘客流量大數據來分析營運策略（OLAP）。

| Feature    | OLTP（線上交易處理）                                    | OLAP（線上分析處理）                                            | Row-Store（行式儲存）                                | Column-Store（列式儲存）                                  |
| ---------- | ------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| What       | Operational system for fast, transactional data writes. | Analytical system for complex data queries and aggregations.    | Database storage layout grouping data by rows.       | Database storage layout grouping data by columns.         |
| How        | Optimizes for CRUD operations on single records.        | Optimizes for scanning massive datasets across specific fields. | Writes entire records sequentially in memory/disk.   | Writes values of the same column sequentially together.   |
| When       | Used in live applications like e-commerce checkouts.    | Used in business intelligence and data warehousing.             | Best for OLTP workloads needing frequent updates.    | Best for OLAP workloads needing heavy aggregations.       |
| Example    | Recording a single product purchase on Shopee.          | Calculating total Q4 revenue trends across Taiwan.              | Postgres storing a user's profile info in one block. | BigQuery calculating the average age of all users.        |
| Difficulty | Low: standard relational database design.               | Medium: requires indexing and data modeling.                    | Low: default setup for most transactional SQL DBs.   | High: needs specialized analytical engineering knowledge. |

- 100% operational uptime is critical for transaction systems to avoid financial loss.
- 0 row-level updates should be run directly on massive analytical column-stores.

**Quiz:** If you are building a system to handle real-time seat bookings for a concert at the Taipei Arena, should you use OLTP or OLAP? Wait for answer.

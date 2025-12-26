# Cloud Firestore vs Realtime Database

| 对比项   | **Cloud Firestore**                 | **Realtime Database** |
| -------- | ----------------------------------- | --------------------- |
| 类型     | 文档型 NoSQL(类似 MongoDB)          | JSON 树               |
| 数据结构 | collection / document               | 一整个 JSON 树        |
| 查询能力 | ✅ 强（where / orderBy / 复合索引） | ❌ 非常弱             |
| 实时监听 | ✅ 支持                             | ✅ 支持               |
| 离线支持 | ✅ 内置好                           | ⚠️ 有但较弱           |
| 扩展性   | ✅ 自动横向扩展                     | ⚠️ 规模大时困难       |
| 安全规则 | ✅ 精细、好维护                     | ❌ 难写               |
| 计费方式 | 按 **读 / 写 / 删除**               | 按 **流量（GB）**     |
| 官方推荐 | ⭐⭐⭐⭐⭐                          | ⭐⭐                  |
| 学习难度 | 中等                                | 低                    |

文档是“很多独立的 JSON 对象”；
JSON 树是“一个巨大的嵌套 JSON 对象”。

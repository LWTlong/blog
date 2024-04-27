---
title: Nodejs 连接 mongodb
order: 1
article: false
category:
    - Nodejs
    - mongodb
tag:
  - mongodb
---

安装 `mongodb` 依赖。

```shell
npm install mongodb --save
```

安装完成后，连接也很简单

```javascript
import { MongoClient } from 'mongodb'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

async function run() {
  try {
    await client.connect()
    const db = client.db('study')
    const res = await db.command({ping: 1})
    console.log('connected:', res)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

run()
// connected: { ok: 1 }
```

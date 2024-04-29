---
title: mongoose
order: 7
article: false
category:
  - Nodejs
  - mongodb
tag:
  - mongodb
---

## 简介

Mongoose 是一个 ODM 工具。（类似 sequelize 是个 ORM 工具，大概就这意思）

基于 native mongoDB nodejs driver 。提出了 Model ，数据模型的概念，用来约束集合中的数据结构。

简单来说就是 原生的 mongoDB nodejs driver 的数据结构过于灵活，需要有个工具使用数据模型的概念来约束，和在进行
数据操作的时候验证。

## 基本使用

### 安装

```shell
npm install mongoose --save
```

### 创建模型

mongoose 创建的 collection 名也会自动添加复数, 并且转为小写

```javascript
import mongoose from 'mongoose'
const {connect, disconnect, Schema, model} = mongoose

async function main() {
  try {
    // 连接数据库
    await connect('mongodb://localhost:27017/study')
    // Schema 对应 mongodb 里面的 collection
    const ProductSchema = new Schema({
      name: {type: String},
      age: {type: Number}
    })
    // 创建一个数据模型 对应的一个 collection, 会自动添加复数，得到的 collection 名为 products
    const ProductModel = model('Product', ProductSchema)
    // 操作表，添加数据
    const result = await ProductModel.create({
      name: '张三',
      age: 30
    })
    console.log(result)
  } catch (e) {
    console.error(e)
  } finally {
    await disconnect()
  }
}
```

另一种添加数据的方式, 实例化一个 `model` 再调用 `save` 方法

```javascript
const ProductModel = model('Product', ProductSchema)
const student = new ProductModel({
  name: '学生',
  age: 18
})
await student.save()
```

当你传入了一个错误的数据类型，会报错，例如 `age: 'abc'` ，会类型错误。

如果你需要添加一个关联的其他集合的 `_id`，可以通过 `Schema.types.ObjectId` 来定义类型。 

### 数据操作

数据操作的 API 和原生的都是一样的，参照原生的 API 写即可。

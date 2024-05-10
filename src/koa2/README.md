---
title: Koa
index: false
article: false
---

[Koa](https://www.w3cways.com/doc/koa/) 基于 Node.js 平台的下一代 Web 开发框架。

## 简介

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

## 概览

### 安装

安装很简单，直接

```shell
npm install koa
```

或者使用 `koa-generator` 脚手架快速的初始化一个 koa 项目。

### 创建一个服务

```javascript
const Koa = require('koa')
// 创建实例
const app = new Koa()
// 中间件
app.use((ctx, next) => {
  ctx.response.body = 'hello koa'
})
// 监听端口
app.listen(9527, () => {
  console.log('start server at 9527')
})
```

这里只是概览，简单介绍一下。

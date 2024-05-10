---
title: Web Storage
order: 2
#article: false
tag:
  - JavaScript
---

#### sessionStorage

`sessionStorage` 为每一个给定的源维持一个独立的储存区域，该存储区域在页面会话期间可用。即只要浏览器处于打开状态，包括页面重新加载和恢复。

#### localStorage

同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

#### 注意事项

- 需要遵循同源策略。
- 是同步 API，会阻塞。
- 存储的是字符串，要保存对象的时候，需要转换为字符串。通常使用 `JSON.stringify`

## sessionStorage 的数据共享性

当打开多个相同 URL 的 Tabs 页面，会创建各自的 sessionStorage

通过 `a` 标签添加属性 `rel="opener"` 能够复制 sessionStorage 的数据。仅仅是复制！后续的更改并不会同步到新标签打开的页面！

## localStorage 过期的简单实现

保存数据的时候，添加一个过期时间的属性。在查询数据的时候，对比时间，过期删除。

localStorage 支持过期库：`web-storage-cache`

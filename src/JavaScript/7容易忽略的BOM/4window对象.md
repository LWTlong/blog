---
title: window对象
order: 4
#article: false
category:
  - javascript
tag:
  - BOM
---

## window 对象

* 一个包含DOM文档的窗口，表示浏览器窗口以及页面可见区域。
* 一个全局变量，全局函数和变量都是它的属性。

## 关于 window.window

window 对象的 window 属性指向 window 对象本身。

```js 
window.window === window // true
window.window.window === window.window // true
```

这样的设计 主要是方便使用 this：

```js
// 全局作用域下
window === this // true
```

`this` 即是 `window` ，其有 `window` 属性: `this.window.window`

需要注意的是

```js 
this.window // window
window.this // undefined
```

## window.isSecureContext

`window.isSecureContext` 属性是一个只读属性，返回一个布尔值，表示当前环境是否安全。

很重要的一个表现就是当前网页是不是 https 协议的。

作用就是，有一些浏览器特性是只支持在安全的上下文里执行的。

例如： 

* Service Worker: 可以在离线的情况下为网页提供资源。
* Web Authentication API: 生物密码的一些认证，例如指纹、面部识别等。
...

还有很多，具体的 API 可以参考 MDN 文档 [仅限于安全上下文的特性](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts)
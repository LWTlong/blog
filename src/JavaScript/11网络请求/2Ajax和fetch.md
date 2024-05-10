---
title: 请求和跨域
order: 2
#article: false
tag:
  - JavaScript
---

## Ajax

Ajax 是异步 JavaScript 和 XML 。它并不是指单一的某种技术，而是多种现有技术的结合，实现 **无页面刷新的数据获取** 。

这些技术包含了：HTML 或 XHTML、CSS、JavaScript、DOM、XML、XSLT，以及最重要的 XMLHttpRequest

[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)

当前常用请求库：`axios`

## 同源策略

同源策略限制了不同源之间如何进行资源交互，是用于隔离潜在恶意文件的重要安全机制。

同源策略：同协议+同域名+同端口

## 跨域网络访问

跨域写操作一般被允许，例如：a 标签链接，重定向，表单提交。

跨域资源嵌入一般被允许，例如：`script` `link` `img` `video` `iframe` 标签等。

#### 跨域解决方案: JSONP

原理：借助浏览器允许 `script` 标签跨域资源嵌套，执行回调。

JSONP 步骤：

- `script` 标签 url 上携带回调函数名称
- 后端解析 queryString, 回去回调函数名称
- 将数据传入回调函数，返回字符串
- 客户端拿到结果，浏览器自动执行

```html
<script src="http://test.com/jsonp?callback=jsonpCallback"></script>
<script>
  function jsonpCallback(data) {
    console.log('收到的数据', data);
  }
</script>
```

缺点：只支持 get 请求，不支持 post 等其他类型的请求。并且 JSONP 服务端返回什么都直接执行，存在安全隐患。

#### 跨域解决方案：CORS

CORS 是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他 Origin, 这样浏览器可以访问加载这些资源。

简单来说，需要服务端配置哪些请求，哪些域可以跨域请求。后面结合 Nodejs 再写详细的介绍。

#### 正反向代理

正向代理：属于客户端代理，服务端不清楚是谁访问自己。常见代表： devServer 。

反向代理：属于服务端代理，客户端不清楚具体是哪个服务器。 常见代表： nginx

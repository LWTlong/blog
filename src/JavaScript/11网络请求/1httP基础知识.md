---
title: HTTP 基础知识
order: 1
#article: false
tag:
  - JavaScript
---

## HTTP 简介

HTTP（HyperText Transfer Protocol）超文本传输协议，是万维网的基础协议。

## HTTP 1.1

目前我们大多使用的都是 HTTP 1.1 版本，此版本在 1997 年发布。

#### 连接复用

HTTP 1.1 版本更新支持了长连接，连接复用。多个请求可以复用一个 TCP 连接。

常见为，请求头添加 `Connection: keep-alive`，响应头返回 `Keep-Alive: timeout=5`

#### 管道化

HTTP 1.1 版本更新了管道化技术，多个连续请求甚至都不用等待立即返回就可以被发送，这样就减少了耗费在网络延迟上的时间。

#### 支持响应分块

HTTP 1.1 支持单个请求返回部分内容，需要服务端配合。

常见状态码为 `206`, 请求头添加 `Range` 告知服务端需要哪部分数据，响应头会返回对应的 `Content-Range` 表示返回哪部分数据。

#### 新的缓存控制

`cache-control`, `eTag` 就是 1.1 引入的 **强缓存** 和 **协商缓存**。

## 常用状态码

#### 信息响应

`101` 协议切换

#### 成功响应

- `200` 请求成功。
- `204` 请求成功，不返回任何内容。
- `206` 范围请求成功。

#### 重定向

- `301` 永久的重定向
- `302` 临时的重定向
- `304` 资源未修改

#### 客户端响应

- `400` 无法被服务器理解
- `401` 未授权
- `403` 禁止访问
- `404` 未找到资源
- `405` 禁止使用该方法

#### 服务端响应

- `500` 服务端异常
- `503` 服务不可达

## Header 头

#### 常见请求头

- `Accept` 告知服务端，客户端可以处理的内容类型, 例如: `text/html` `application/xhtml + xml`
- `Aaccept-Encoding` 客户端能够处理的内容编码方式， 例如: `gzip`
- `Accept-language` 客户端可以理解的语言，例如: `zh-CN`, `zh`
- `Cache-Control` 表示浏览器的缓存方式，例如: `Cache-Control:max-age=<seconds>`
- `Cookie` cookie 信息
- `Connection` 是否长连接, 例如：`keep-alive`
- `Content-Type` 实际发送的数据类型, 例如: `content-type: application/json`
- `Host` 要发送到的服务器主机名和端口号， 例如：`www.anbc.com`
- `User-agent` 用户代理，包含应用类型，操作系统，软件开发商和版本号等信息
- `Referer` 当前请求的原来页面的地址

#### 常见响应头

- `Date` 服务器的响应日期和时间
- `Connection` 是否会关闭连接， 例如: `Connection: keep-alive`
- `Keep-Alive` 空闲连接需要保持打开状态的最小时长和最大请求数, 例如: `Keep-Alive: timeout=5,max=10`, 空闲 5 秒，最多接收 10 次请求就断开
- `Content-Encoding` 内容编码方式
- `Content-Length` 报文中实体主题的字节大小
- `Content-Type` 内容的类型, 例如: `Content-Type: text/html;charset=utf-8`
- `Set-Cookie` 向客户端发送的 cookie

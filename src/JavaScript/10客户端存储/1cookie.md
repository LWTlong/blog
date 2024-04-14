---
title: Cookie
order: 1
article: false
tag:
  - JavaScript
---

Cookie

- `<cookie-name> = <cookie-value>`: 键/值
- `Expires=<date>`: 有效期
- `Max-Age = <non-zero-digit>`: 距离 cookie 失效还有多少秒
- `HttpOnly=<boolean>`: 设置了这个属性的 cookie, 不能使用 document.cookie 访问。
- `Secure=<boolean>`: 一个带有安全属性的 cookie 只有在 SSL 和 Https 协议才能发送到服务器。
- `Domain=<domain-value>`: cookie 可以发送到的主机名
- `Path=<path-value>`: 指定一个 URL 路径
- `SameSite`: 允许服务器设置一定 cookie, 不随跨域请求发送。

#### 注意事项

- 删除 cookie ，设置 cookie 的过期时间为过期时间即可。
- 设置多个 cookie， 多次调用 document.cookie
- 修改和删除 cookie 字段，要保证 path 和 domain 不变。

## 会话期 cookie

浏览器会话期间的 cookie，浏览器关闭以后自动删除。

设置会话期 cookie，不指定过期时间(Expires)和有效期(Max-Age)即可。

## 持久化 cookie

持久化 cookie 的生命周期取决于过期时间(Expires)和有效期(Max-Age)。

`Max-Age`: 正数，cookie 持久化时间，单位秒。设置为 0，可以删除 cookie 。

## HttpOnly

设置为 true，可以阻止通过 js 访问 cookie, 能有效防止 XSS 攻击。document.cookie 无法访问。

## secure

设置为 true, cookie 只会被 https 传输到服务端。

## cookie 的作用域

#### Domain

指定哪些域接受 cookie, 默认不包含子域名。

可以设置 test.com, a.test.com 和 b.test.com 就可以共用 cookie。

#### Path

允许接受 cookie 的 url 路径，一般设置为 `/` ,这样子路由也可以被匹配。

#### SameSite

- `None`: 浏览器不限制，同站和跨站都可以发送 cookie
- `Strict`: 浏览器只在相同站点发送 cookie
- `Lax`: 新版浏览器默认选项，允许部分第三方请求携带 cookie

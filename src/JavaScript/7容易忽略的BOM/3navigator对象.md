---
title: navigator 对象
order: 3
tag:
  - JavaScript
---

## navigator.userAgent

`navigator.userAgent` 返回的一堆字符串，可以用来识别设备。

`android` `ios` `MicroMessenger` 都可以识别。

识别设备，推荐使用 `ua-parser.js`，这个库封装了很多设备识别的。

## navigator.onLine 在线状态

`navigator.onLine` 返回浏览器的在线状态。 `true` | `false`

可以结合 `document.ononline` 与 `document.onoffline` 监听网络变化。

## navigator.cookieEnabled

返回当前页面是否启用了 cookie 。

## navigator.mediaDevices 媒体设备

`navigator.mediaDevices` 返回一个 MdeiaDevices 对象，用户获取媒体信息设备。

应用场景：屏幕共享，调取摄像头扫码等。

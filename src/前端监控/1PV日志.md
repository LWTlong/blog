---
title: PV日志
order: 1
#article: false
category:
  - 前端监控
tag:
  - PV日志
---

## PV日志

PV（Page View）日志是记录用户在网站上的访问情况，包括用户访问的页面、访问时间、访问时长等。


## 信息采集

PV 日志一般会采集用户访问的应用、页面、访问时间、访问来源、访问设备等信息。

其他情况可以根据自己业务来进行采集，例如：用户地理位置等信息。

#### 采集页面基本信息

一般来说会采集一些基本信息，例如页面地址、页面标题、用户设备、访问时间等, 并且可以添加一些生命周期的钩子给使用者对 PV 日志上报流程进行干预或者便于流程调试；

```js
const timestamp = new Date().getTime();
const ua = navigator.userAgent;
const url = window.location.href;
// ... 可以根据需要添加
 ```

#### 采集应用信息

如果是开发内部 sdk，可能需要额外收集一些类似应用id之类的信息；

这些信息可以自己去制定一个规范或者和前端同学一起商量好来定；

例如：可通过 meta 标签中存储应用 id，sdk 通过 meta 标签自定义属性取；


给出生命周期钩子函数，可以给使用者干预整个上报流程或者便于使用者进行上报流程的调试；代码示例：

```js 
export function collect() {
  beforeCreateParams && beforeCreateParams();
  // 1. 采集页面基本信息
  // - a. 应用 （可通过 meta 标签中存储应用id，sdk 通过 meta 标签自定义属性取）
  // - b. 页面 （可通过 body 标签存储，sdk 通过 body 标签自定义属性取）
  let appId, pageId;
  const metaList = document.getElementsByTagName("meta");
  for (let i = 0; i < metaList.length; i++) {
    const meta = metaList[i];
    if (meta.getAttribute("app-id")) {
      appId = meta.getAttribute("app-id");
    }
  }
  pageId = document.body.getAttribute("page-id");
  if (!appId || !pageId) {
    console.log("缺少应用或页面信息");
    return;
  }
  // 2. 日志上报信息收集
  // - a. 应用和页面信息
  // - b. 访问时间
  // - c. UA 信息
  const timestamp = new Date().getTime();
  const ua = navigator.userAgent;
  // 3. 调用日志上报 api
  const params = {
    appId,
    pageId,
    timestamp,
    ua,
  };
  let data = qs.stringify(params);

  // 上传前的钩子函数 可以对上报的信息进行干预
  if (beforeUpload) {
    data = beforeUpload(data);
  }

  let url, uploadData;
  try {
    // 调用上报函数，传入需要上报的信息
    const res = uploadPVInfo(data);
    url = res.url;
    uploadData = res.data;
  } catch (e) {
    if (errorHandle) {
      errorHandle(e);
    } else {
      console.error(e);
    }
  } finally {
    afterUpload && afterUpload({ url, uploadData });
  }
}
```


## 日志上报

日志上报可以通过图片的方式来进行上报，使用图片的原因是可以防止跨域的情况；

例如：

```js
    // 使用图片来上报，可以避免跨域问题
    let img = new Image()
    const {eventType = 'pv'} = options
    const params = `?${data}&eventType=${eventType}`
    const url = `http://localhost:3003/monitor/pv${params}`
    img.src = url
    img = null // 释放内存
```


## 使用

如果在 spa 中使用， 可以根据情况，在页面首次加载的时候进行上报，也可以在路由切换的时候进行上报；

例如在 vue 中，可以通过 vue-router 的路由守卫来进行上报；

```js
import { collect } from "./sdk";

router.beforeEach((to, from, next) => {
  collect();
  next();
});
```
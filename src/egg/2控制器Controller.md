---
title: 路由、Controller、Service、插件
order: 2
article: false
category:
    - Nodejs
    - egg
tag:
  - egg
---

## router 路由

请求路由，约定在 app 的根目录 `app/router.ts` :

```typescript
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/test', controller.test.index);
};
```

在 egg 里，每一个路由对应一个 Controller 控制器，并且 controller 可以直接从 app 实例里面结构出来。也就是说，
按照约定，controller 文件夹里的控制器都会被自动注册到 app 实例上。

## Controller 控制器

[Controller](https://www.eggjs.org/zh-CN/basics/controller) 位于 `app/controller` 里。

例如，在 `app/controller` 里创建一个 `tset.ts`，这就等于创建了一个名为 `test` 的控制器。

egg 提供了 Controller 的基类，里面会封装 app 实例对象，ctx 上下文对象等，通过继承基类，可以直接获取：

```typescript
import { Controller } from 'egg';

export default class TestController extends Controller {
  public async index() {
    const { ctx } = this;
    const query = ctx.request.query;
    this.app.config.sourceUrl = 'xxx';
    ctx.body = query;
  }
}
```

继承基类后，可以通过 `this` 获取 `ctx` 上下文对象，以及 `app` 实例对象。

`ctx` 上下文对象，和 koa 的 `ctx` 一样的，里面的属性和用法都可以直接参考 koa 文档，包括请求的参数获取。

`app` 实例对象，可以获取到 config 配置，service 等等。具体可以参考文档。[框架内置基础对象](https://www.eggjs.org/zh-CN/basics/objects)


[Service](https://www.eggjs.org/zh-CN/basics/service) 就不介绍，和 Controller 一样，也是有写好的 `Service` 基类。继承后通过 `this` 获取 `ctx` 和 `app` 实例对象。


## 插件

插件是 egg 的一大特色。它不但可以保证框架核心的足够精简、稳定、高效，还可以促进业务逻辑的复用，生态圈的形成。

其实你简单理解就是类似一个工具包，但是它包含了 egg 里面的中间件 Service、config 等等内容。

关于插件的使用和配置，看看[官网的介绍](https://www.eggjs.org/zh-CN/basics/plugin)，写的已经很详细了。包括插件的列表等。

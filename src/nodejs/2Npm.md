---
title: Npm
order: 2
article: false
tag:
  - Nodejs
---

npm 是 node 包管理工具。可以安装，管理，共享 js 代码包的工具。是 nodejs 生态中非常重要的一部分。

npm 允许我们从 npm 仓库中下载安装公共的 js 模块。npm 仓库是全球性的，里面包含数百万计的 js 模块。都可以通过 npm 快速的寻找并且下载安装使用。

## 描述文件

当我们执行 `npm init` 的时候，会生成一个描述文件。就是我们常见的 `package.json`

```json
{
  "name": "pkgName",
  "version": "1.0.1",
  "description": "一段描述",
  "keywords": ["aotian"],
  "author": "lwt",
  "license": "ISC",
  // 入口文件
  "main": "lib/index.js",
  // 可执行文件 如果是开发类似脚手架工具
  "bin": {
    "aotian": "bin/index.js"
  }
}
```

## 安装依赖

当我们需要进行一些模块的安装，可以使用 `npm install [包名]` 来进行安装。

比如说：`npm install axios` 安装一个 `axios` 库。

那么在描述文件 `package.json` 中的 `dependencies` 下，就会多出一个关于 `axios` 的说明。

```json
{
  "name": "pkgName",
  "version": "1.0.1",
  "description": "一段描述",
  "keywords": ["aotian"],
  "author": "lwt",
  "license": "ISC",
  // 入口文件
  "main": "lib/index.js",
  // 可执行文件 如果是开发类似脚手架工具
  "bin": {
    "aotian": "bin/index.js"
  },

  // 安装的模块说明
  "dependencies": {
    // 模块名称：版本号
    "axios": "^1.4.0"
  }
}
```

并且安装成功后，会在项目目录里面产生一个 `node_modules` 的目录，用来存放下载安装的模块。

#### 开发环境

如果某些模块，只需要在开发环境中使用，可以在安装的时候加入依赖 `npm install axios -D`

这个时候，安装的模块会出现在 `package.json` 里的 `devDependencies` 下。

```json
{
  "name": "pkgName",
  "version": "1.0.1",
  "description": "一段描述",
  "keywords": ["aotian"],
  "author": "lwt",
  "license": "ISC",
  // 入口文件
  "main": "lib/index.js",
  // 可执行文件 如果是开发类似脚手架工具
  "bin": {
    "aotian": "bin/index.js"
  },

  // 只在开发环境需要
  "devDependencies": {
    // 模块名称：版本号
    "axios": "^1.4.0"
  }
}
```

## 版本号

安装的版本号里面

`^` 表示，主版本号不变，次版本号和修复版本号可变，也就是说 `^1.4.0` 这个说明，安装的不一定会是 `1.4.0`, 它会安装主版本 `1` 下的最新版本，也可能安装实际版本是 `1.5.6` 的最新版本。

`~` 表示主版本和次版本不变，修复版本可以变。 `~1.4.0` 可能会安装的实际版本为 `1.4.3`

那么具体的版本怎么看呢，当安装了模块之后。会生成一个 `packa-lock.json` 的文件，里面就有安装模块的具体信息，在 `package-lock.json` 文件当中，可以查看模块的实际安装版本。

## 卸载模块

卸载模块很简单，直接执行 `npm uninstall [pkgName]` 就可以对模块的卸载。

如果安装或者卸载出现一些问题，可以执行 `npm cache clean --force` 来强制的清除所有缓存。

## 运行脚本

`package.json` 里面可以配置执行脚本， `scripts` 里面可以填写需要执行的脚本。

```json
{
  "name": "pkgName",
  "version": "1.0.1",
  "description": "一段描述",
  "keywords": ["aotian"],
  "author": "lwt",
  "license": "ISC",
  "scripts": {
    "server": "node ./index.js"
  }
}
```

当 `scripts` 配置了可运行的命令的时候，可以通过 `npm run server` 来执行这一条脚本。

## 常用命令

对 npm 和 `package.json` 有了概念之后，再了解一下 npm 的常用命令。

`npm search [pkg-name]` 查询所有相关的模块。

`npm info [pkg-name]` 查询模块的具体信息。

`npm install [pgk-name]@version` 安装指定的版本,例如 `npm info express@4.15.0`

`npm outdated [pkg-name]` 查看项目中那些模块不是最新版本（过期了，太老了），不指定模块名，就查看所有模块。

`npm update [pkg-name]` 对项目中的模块进行更新。如果不加包名，就更新所有，指定包名，就只更新指定的模块。

## 发布一个 npm 包

如果我们需要发布一个 npm 包，例如组件库、工具库、脚手架等。

需要先登录 npm 。

执行命令，查看是否登录：

```shell
npm whoami
```

如果没登录，则需要先登录, 执行命令:

```shell
npm login
```

需要让你输入账号密码。

登录成功后，执行发布命令:

```shell
npm publish
```

发布成功后，可以就可以通过 `npm install` 来安装自己的包了。

## 源管理

平时安装 npm 模块的时候，因为一些网络因素，会导致安装很慢，甚至安装失败的情况，这个时候，我们也许需要更换使用国内的镜像资源。

以淘宝源举例，我通常的方法就是添加 `--registry` 参数，例如 `npm install aotian --registry=https://registry.npmmirror.com` 来使用国内的淘宝镜像资源。可以加快下载安装的速度。

#### nrm

那么其实对于源管理，也是有工具的，类似 nodejs 的版本管理一样。

[nrm](https://github.com/Pana/nrm)

使用也是非常的简单，直接查看官网就一目了然了。为了避免网络问题打不开，简单介绍一下。

安装：

```shell
npm install -g nrm
```

查看源:

```shell
nrm ls
```

使用源:

```shell
nrm use cnpm
```

并且可以执行 `nrm test` 来查看各个源的速度。

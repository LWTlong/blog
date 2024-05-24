---
title: plugin 
order: 7
#article: false
category:
    - webpack
tag:
  - webpack
---

Loaders 关注代码中的单个资源，Plugins 关注整体流程，可以接触到 webpack 构建流程中的各个阶段并劫持做一些代码处理。主要是为构建流程做一些扩展。

官方的教程：https://webpack.js.org/contribute/writing-a-plugin/

## 插件的格式

- 一个 JavaScript 函数或 JavaScript 类
- 在它原型上定义的 apply 方法，会在安装插件时被调用，并被 webpack compiler 调用一次
- 指定一个触及到 webpack 本身的事件钩子，即 hooks，用于特定时机处理额外的逻辑

说起来可能比较复杂，其实就是一个类，需要有一个 apply 方法，接收一个 compiler 实例，
并且可以绑定 compiler 上各种生命周期钩子事件，在某个构建流程的时候，去做一些处理。

例如，写一个检查 bundle 大小的插件, 可以配置 bundle 大小，大于配置大小的时候，发出警告

```javascript
// 首先创建一个 class
const {resolve} = require('node:path')
const { statSync } = require('node:fs')

class BundleSizePlugin {
  constructor(options) {
    this.options = options
  }

  // apply 方法，会在安装插件时被调用，并被 webpack compiler 调用一次
  apply(compiler) {
    // 从 options 中获取配置的文件大小
    const {sizeLimit} = this.options
    // 打包生成 bundle 后的钩子
    compiler.hooks.done.tap('BundleSizePlugin', (stats) => {
      // 获取文件路径和文件名
      const {path, filename} = stats.compilation.outputOptions
      // 打包生成的 bundle.js 文件路径
      const bundlePath = resolve(path, filename)
      // 读取文件大小
      const {size} = statSync(bundlePath)
      // 读取的大小单位是字节， 需要转换成常用的 kb
      const bundleSize = size / 1024
      // 和配置的大小对比
      if (bundleSize < sizeLimit) {
        console.log('Bundle-Size: ', bundleSize)
      } else {
        console.warn('Bundle-Size: ', bundleSize)
        console.warn('Bundle-Size 大于最大打包限制，请优化打包配置。')
      }
    })
  }
}

module.exports = BundleSizePlugin
```

plugin 插件的复杂程度是远远大于 loader 的，这里只是冰山一角。

我认为了解 plugin 的工作机制就差不多。

如果实在要自己写一个 plugin 来支持特殊的业务，可以参考官方的 hooks 列表，在特定的钩子里面进行操作。

Compiler Hooks 列表
https://webpack.js.org/api/compiler-hooks/

Compilation Hooks
https://webpack.js.org/api/compilation-hooks/

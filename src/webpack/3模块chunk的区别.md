---
title: module chunk bundle 的区别
order: 3
#article: false
category:
    - webpack
tag:
  - webpack
---

### module

`module` 模块，各个源码文件。

在 webpack 中一切皆模块。 

只要能引入的，都是模块，js css img。


### chunk

多模块合并生成，一个 chunk 里面可能会引入其他模块的代码。

chunk 可以理解为 webpack 在分析中在内存中存在的。

例如配置 splitChunk 就会根据配置生成 chunk ，这是 webpack 在分析依赖的时候存在的， 最终会根据 chunk 去生成 bundle   

### bundle

最终输出的文件

一个 chunk 对应一个 bundle

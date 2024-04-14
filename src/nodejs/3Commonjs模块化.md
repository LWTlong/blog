---
title: Commonjs 模块化
order: 3
article: false
category:
  - Nodejs
tag:
  - Nodejs
---

模块化，不用多说，能够更好的管理代码，提高代码的复用性，使依赖关系更加明确。

## 简介

每一个 js 文件就是一个模块

`module.exports` 导出

`require` 导入

## module

```javascript
{
  id: '.',
  // 当前路径
  path: 'D:\\arrange\\test',
  // 导出内容
  exports: {},
  // 当前文件路径
  filename: 'D:\\arrange\\test\\test.js',
  // 是否被引用加载过
  loaded: false,
  // 当前模块引用的模块
  children: [],
  // 当前模块引用模块的查找列表
  paths: [
    'D:\\arrange\\test\\node_modules',
    'D:\\arrange\\node_modules',
    'D:\\node_modules'
  ]
}
```

通过 `module` 对象可以看见，下面有一个 `exports` 对象，当文件里面没有使用 `module.exports` 导出内容，也就是没有给 `module.exports` 赋值任何内容的时候，其他文件 `require` 进来的就是一个空对象。

`paths` 这个拿出来说一下，在 nodejs 中，引用模块查找是一级一级的去找，通过文件路径，先在当前层级的 `node_modules` 里面找，没找到再去截取上一层级的路径下的 `node_modules` 里面找，一级一级的这么去查找引用的模块。

#### exports = module.exports

```javascript
console.log(module.exports === exports); // true
```

`exports` 其实就是 `module.exports`

```javascript
module.exports.name = 'lwt';
exports.age = 20;
// require 得到的就是 {name: 'lwt', age: 20}
```

## require

`require` 用于引入一个模块

```javascript
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: {
    id: '.',
    path: 'D:\\arrange\\test',
    exports: {},
    filename: 'D:\\arrange\\test\\test.js',
    loaded: false,
    children: [],
    paths: [
      'D:\\arrange\\test\\node_modules',
      'D:\\arrange\\node_modules',
      'D:\\node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {
    'D:\\arrange\\test\\test.js': {
      id: '.',
      path: 'D:\\arrange\\test',
      exports: {},
      filename: 'D:\\arrange\\test\\test.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
```

可以看见 `require` 是一个方法，也是一个对象。

#### resolve 属性

`require.resolve` 传入一个模块路径，解析得到模块的绝对路径。

```javascript
require.resolve('./testPath/path.js');
// D:\arrange\test\testPath\path.js
```

#### main 属性

`main` 属性也是一个 `module` 对象，表示 Nodejs 启动的入口脚本。

#### cache 属性

`cache` 是一个对象，用来缓存已经加载的模块对象。

`key` 就是模块路径， `value` 就是模块对象。

在我们重复加载一个模块的时候，会从缓存里面读取，属于优化性能了，也能加快读取速度。

## `__filename` 和 `__dirname`

`__filename` 表示当前文件的绝对路径

`__dirname` 表示当前文件的文件夹绝对路径

```javascript
console.log(__filename);
// D:\arrange\test\test.js
console.log(__dirname);
// D:\arrange\test
```

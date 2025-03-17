---
title: Commonjs 模块化
order: 3
#article: false
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


## 引入

在 Nodejs 中， Commonjs 的引入原理，实际上是通过 `fs` 模块，读取文件内容，然后通过 `vm` 模块，将文件内容包裹在一个函数里面，然后执行这个函数，最后返回 `module.exports` 的值。

也就是，`require` 的时候，会执行被引入的文件，然后返回 `module.exports` 的值。

就是 `require` 的时候，被引入的文件内容，会被包裹在一个 iife 的自执行函数里面去执行一遍，并且传入 `module`、`exports`、`require`、`__filename`、`__dirname` 这五个参数，然后返回 `module.exports` 的值。

```javascript
(function (exports, require, module, __filename, __dirname) {
  // 文件内容
  // ...
  return module.exports;
});
```

所以在 nodejs 中可以直接的使用 `reuquire`、`module`、`exports`、`__filename`、`__dirname` 这五个变量, 而不需要额外的引入，比如说使用 `fs` 就需要额外的引入，因为在包裹的自执行函数里面并没有传递进来。

并且这个返回值，会被缓存起来，下次再引入的时候，直接从缓存里面读取，不需要再次执行。

`Module Cache Map`: key(module path + module name): module.exports

缓存的 key 是模块路径 + 模块名，因为有可能存在同名模块，所以需要加上模块路径来区分，值就是模块导出的内容。

## 模块导出的作用域

这里需要注意一个点就是，导出的变量，是作为赋值导出的。

例如一个模块 a.js
```javascript
let a = 0

setA(v) {
  a = v
}

getA() {
  return a
}

module.exports = {
  a,
  setA,
  getA
}
```

在 b.js 中引入 a.js
```javascript
const a = require('./a')

console.log(a.a) // 0
a.a = 2
console.log(a.getA()) // 0
```

在 b.js 中修改 a.a 的值，并不会影响到 a.js 中的 a 的值，因为 a 是一个局部变量，在 a.js 中被赋值导出，在 b.js 中引入的只是 a 的值，并不是 a 的引用，所以修改 a.a 的值，并不会影响到 a.js 中的 a 的值。

## 模块加载顺序

1. 先从缓存中加载
2. 从文件系统中加载
3. 从文件系统中加载 node_modules
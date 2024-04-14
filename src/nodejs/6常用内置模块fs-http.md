---
title: 常用内置模块 fs, path, http
order: 6
article: false
category:
  - Nodejs
tag:
  - Nodejs
---

## fs 文件系统模块

``fs`` 操作文件系统的功能。可以通过 `fs` 模块对文件进行读取、写入、更新、删除。

`fs` 的 API 支持同步和异步两种，同步当然会堵塞。常用的还是异步，异步又分为回调和 `Promise` 的方式。

### 文件读取 同步

> [!warning]
> ``fs`` 读取文件，返回的是 Buffer 。 可以通过 `.toString()` 方法转换，或者通过配置 `options.encoding: 'utf-8'`。

`fs.readFileSync` 同步读取文件，返回的是一个 `Buffer`

通过 `.toString()` 方法：

```javascript
const fs = require('fs')

const fileData = fs.readFileSync('./str.txt')

console.log(fileData)
// <Buffer e8 bf 99 e6 98 af e4 b8 80 e6 ae b5 e6 96 87 e5 ad 97 e5 86 85 e5 ae b9 0d 0a>

console.log(fileData.toString())
// 这是一段文字内容
```

或者配置 `options.encoding = utf-8`

```javascript
const fileData = fs.readFileSync('./str.txt', { encoding: 'utf-8'})
console.log(fileData.toString())
// 这是一段文字内容
```

### 异步读取文件

``fs.readFile`` 异步读取文件，可以使用异步回调和 `Promise`。 ``fs.readFile`` 的第二个参数为 `options` 。

异步回调的方式:

```javascript
fs.readFile('./str.txt', (err, data) => {
  if (err) {
    throw new Error(err)
  }
  console.log(data.toString())
})
// 这是一段文字内容
```

`Promise` 的方式需要引入 `fs` 下的 `promises` 模块，就是 `fs/promises` 模块。如果出现错误，就直接在 `catch` 里面处理。

```javascript
fs.readFile('./str.txt').then((res) => {
  console.log(res.toString())
}).catch(err => {
  console.error(err)
})
// 这是一段文字内容
```

### 创建文件夹

``fs.mkdir`` 用于创建文件夹。

```javascript
fs.mkdir('./dirA', (err) => {
  if (err) {
    throw new Error(err)
  }
  console.log('创建文件夹成功！')
})
```
> [!warning]
> ``fs.mkdir`` 创建多级文件夹需要配置 `recursive` 参数，否则会报错。

递归创建多级文件夹, 配置 ``recursive`` 参数：

```javascript
fs.mkdir('./dirB/dirC', { recursive: true }, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.log('创建文件夹成功！')
})
```

### 创建文件

`fs.writeFile` 用于对文件进行写入，但是如果这个文件不存在，则会直接创建。

由此，也可以用来创建一个文件：

```javascript
fs.writeFile('./dirB/dirC/test.txt', '测试写入内容', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('创建文件成功！')
})
```

此时在 ``/dirB/dirC/`` 下生成了一个 `test.txt` 文件，文件内容就是:

```text
测试写入内容
```

这个时候，如果我们在次基础上再次执行，往 `test.txt` 文件中写入内容：

```javascript
fs.writeFile('./dirB/dirC/test.txt', '继续增加写入内容', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('创建文件成功！')
})
```

此时 `test.txt` 文件的内容：

```text
继续增加写入内容
```

`test.txt` 的内容直接被覆盖了，如果我们需要在后面继续追加内容，需要配置 `options.flag = a`， `a` 就是 `appending`：

```javascript
fs.writeFile('./dirB/dirC/test.txt', '\n啊哈哈哈继续添加内容', { flag: 'a' }, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('创建文件成功！')
})
```

此时执行后的 `test.txt` 内容：

```text
继续增加写入内容

啊哈哈哈继续添加内容
```

更多的配置，可以自行查看文档的相关说明。

### 删除文件

``fs.unlink`` 可以用于删除文件。

```javascript
fs.unlink('./dirB/dirC/test.txt', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('删除文件成功！')
})
```

### 删除文件夹

``fs.rmdir`` 可以用于删除文件夹。

```javascript
fs.rmdir('./dirA', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('删除文件夹成功！')
})
```

> [!warning]
> `fs.rmdir` 只能删除空文件夹，当文件夹下面有文件或者文件夹的时候，不能删除。

如果需要删除文件夹和文件夹里的所有内容的时候，怎么办呢，当然是 `rm -f`, 跑路咯，哈哈哈

使用 ``fs.rm`` 方法，并且传入 `force: true` 和 `recursive: true` 就可以强制性的递归删除文件夹和文件夹里的所有内容了：

```javascript
fs.rm('./dirB', { force: true, recursive: true }, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('强制删除文件夹成功！')
})
```

这个方法，有一定的危险性，不到删库跑路的地步，还是慎用吧。

### 重命名

`fs.rename` 用于对文件或文件夹的重命名。

文件重命名：

```javascript
fs.rename('./str.txt', './rename.txt', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('重命名成功！')
})
```

对文件夹重命名:

```javascript
fs.rename('./dirA', './renameDirA', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('重命名成功！')
})
```

### 查看文件或文件夹状态

``fs.stat`` 用于查看文件或文件夹的状态。

```javascript
fs.stat('./rename.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats)
})
// Stats {
//   dev: 779450366,
//       mode: 33206,
//       nlink: 1,
//       uid: 0,
//       gid: 0,
//       rdev: 0,
//       blksize: 4096,
//       ino: 4503599627644501,
//       size: 26,
//       blocks: 0,
//       atimeMs: 1712937475643.0815,
//       mtimeMs: 1712931146234.0796,
//       ctimeMs: 1712937474769.2405,
//       birthtimeMs: 1712931140258.4746,
//       atime: 2024-04-12T15:57:55.643Z,
//       mtime: 2024-04-12T14:12:26.234Z,
//       ctime: 2024-04-12T15:57:54.769Z,
//       birthtime: 2024-04-12T14:12:20.258Z
// }
```

这个状态可以用于判断当前是一个文件还是一个文件夹: 

```javascript
fs.stat('./rename.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.isFile())
  // true
  console.log(stats.isDirectory())
  // false
})
```

### 复制文件 

`fs.copyFile` 用于复制文件。 复制操作的目标文件夹必须存在，而且必须传到文件名，并且文件名如果存在，则会直接覆盖。

通俗说法就是，粘贴的位置，文件夹是必须要存在的，而且粘贴必须指定一文件名，并且如果指定的文件名已经存在了，就会直接覆盖。

```javascript
fs.copyFile('./rename.txt', './dir/cp.txt', err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('复制成功！')
})
```

### 复制文件夹/路径

``fs.cp`` 复制整个目录结构，包括子目录和文件。

尝试过了，复制目录，需要传入 `options.recursive: true`，递归的复制所有子目录和文件。

```javascript
fs.cp('./copyDir', './paDir', { recursive: true}, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('复制成功！')
})
```

> [!warning]
> `fs.cp` 这个 API 我在写这篇文章的时候，是参考的 `V18.6.0` 的版本，目前这个版本的 `fs.cp` 接口是 **实验** 阶段。如果有使用这个版本或者更低版本的，最好看一下接口的兼容性之类的吧。

``fs`` 文件系统的接口还有很多，比如 `fs.open` `fs.write` `fs.read` `fs.close` 等等。具体需要什么样的能力，可以自己去查询文档。我这里只是挑一些我自己常用的做个记录。


## path 路径模块

``path`` 模块用于处理文件和目录

### path.resolve()

`path.resolve()` 方法将路径或路径片段的序列解析为绝对路径。

```javascript
const p = path.resolve('/foo', '/bar', 'baz')
console.log(p) // D:\bar\baz
```

给定的路径序列从右到左处理，每个后续的 `path` 会被追加到前面，直到构建绝对路径。 例如，给定路径片段的序列：`/foo`、`/bar`、`baz`，调用 `path.resolve('/foo', '/bar', 'baz')` 将返回 `/bar/baz`，因为 'baz' 不是绝对路径，而 '/bar' + '/' + 'baz' 是。

如果在处理完所有给定的 `path` 片段之后，还没有生成绝对路径，则使用当前工作目录。

生成的路径被规范化，并删除尾部斜杠（除非路径解析为根目录）。

零长度的 `path` 片段被忽略。

如果没有传入 `path` 片段，则 `path.resolve()` 将返回当前工作目录的绝对路径。

```javascript
const p = path.resolve()
console.log(p) // D:\arrange\test
```

如果任何参数不是字符串，则抛出 `TypeError`。

```javascript
const p = path.resolve('/foo', '/bar', 3)
console.log(p) // throw new ERR_INVALID_ARG_TYPE
```

### path.join()

`path.join()` 方法使用特定于平台的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径。

零长度的 `path` 片段被忽略。

```javascript
const p1 = path.join('/dirB', '/dirC', 'index.js')
console.log(p1) // \dirB\dirC\index.js

const p2 = path.join('/dirB', '/dirC', 'index.js', '../')
console.log(p2) // \dirB\dirC\

const p3 = path.join('/dirB', '//////////dirC/////', '//index.js')
console.log(p3) // \dirB\dirC\index.js
```

其实你就理解这个就是按照你传入的路径来走。并且可以帮你规范化路径，比如清除多余的斜杆等。

如果连接的路径字符串是零长度字符串，则将返回 '.'，表示当前工作目录。同样的如果任何路径片段不是字符串，则抛出 TypeError。

```javascript
const p = path.join()
console.log(p)
// .
```

### path.basename()

`path.basename()` 方法返回 `path` 的最后一部分。

其实可以理解就是帮你返回文件名，并且可以帮你去除文件的后缀名。

```javascript
const p = path.basename('/testPath/path.js')
console.log(p)
// path.js

const p2 = path.basename('/testPath/path.js', '.js')
console.log(p2)
// path
```

### path.dirname()

`path.dirname()` 方法返回 `path` 的目录名。

```javascript
const p = path.dirname('/testPath/path.js')
console.log(p)
// /testPath
```

### path.extname()

`path.extname()` 方法返回 `path` 的扩展名，即 `path` 的最后一部分中从最后一次出现的 `.`（句点）字符到字符串的结尾。

没有 `.` 个字符，则返回空字符串。

```javascript
const p = path.extname('/testPath/path.js')
console.log(p)
// .js

const p2 = path.extname('/testPath/path.js.mjs')
console.log(p2)
// .mjs
```

### path.parse() 和 path.format()

`path.parse()` 方法返回一个对象，其属性表示 path 的重要元素。 

返回的对象将具有以下属性：

- `dir <string>` 文件夹路径
- `root <string> ` 根目录
- `base <string> ` 文件名和扩展名
- `name <string> ` 文件名
- `ext <string> ` 扩展名


```javascript
const p = path.parse('/testPath/path.js')
console.log(p)
// {
//   root: '/',
//   dir: '/testPath',
//   base: 'path.js',
//   ext: '.js',
//   name: 'path'
// }
```

`path.format()` 方法从对象返回路径字符串。

```javascript
const obj = {
  root: '/',
  dir: '/testPath',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
const p2 = path.format(obj)
console.log(p2)
// /testPath\path.js
```

这一组和 JSON 的 `JSON.stringify()` `JSON.parse()` 有点类似的感觉。

### path.normalize()

`path.normalize()` 方法规范化给定的 `path`，解析 '..' 和 '.' 片段。

如果 `path` 是零长度字符串，则返回 '.'，表示当前工作目录。

```javascript
const p = path.normalize('////testPath////path.js')
console.log(p)
// \testPath\path.js

const p2 = path.normalize('/dirA///dirB///dirC///index.js/../..')
console.log(p2)
// \dirA\dirB
```

## http 模块

`http` 模块，可以用于创建 `http` 服务器，实现基于 `http` 协议的网络通信。

### 创建一个服务器

```javascript
const http = require('http')

// 创建一个网络服务
const server = http.createServer((req, res) => {
  res.end('hello http')
})

// 启动 HTTP 服务器监听连接。
server.listen(9527, () => {
  console.log('server start at 9527')
})
```

此时，一个简单的网络服务就创建出来了，访问 ``http://localhost:9527/``，会看见返回的 `hello http` 。


### 处理请求

以两个接口为例，简单介绍一下怎么处理请求:

``localhost:9527/api/info?name=zhangsan&age=20`` `GET`     
`/api/update` `POST`

```javascript
const http = require('http')
// 处理接口 url
const url = require('node:url')
// 处理 get 请求的入参
const qs = require('node:querystring')


// 创建一个网络服务
const server = http.createServer((req, res) => {
  // req 就是 request 对象， res 就是 response 对象

  // 首先获取接口地址 使用 url.parse 解析请求地址
  const {pathname, query} = url.parse(req.url)

  if (pathname === '/api/info' && req.method === 'GET') {
    // 使用 qs 格式化 get 的请求参数
    const params = qs.parse(query)
    // { name: 'zhangsan', age: '20' }
    res.end(JSON.stringify(params))
  }

  if (pathname === '/api/update' && req.method === 'POST') {
    // POST 请求的数据 有可能不是一次性发完的 需要接收
    let postData = ''
    // 监听数据传入
    req.on('data', (chunk) => {
      postData += chunk
    })
    // 接收完入参的数据后 开始处理接口
    req.on('end', () => {
      console.log(JSON.parse(postData))
      // { name: '李四', age: 22 }
      res.end(postData)
    })
  }
})

// 启动 HTTP 服务器监听连接。
server.listen(9527, () => {
  console.log('server start at 9527')
})
```

当然这里只是简单的介绍如果创建一个网络服务，和怎么去命中接口路由，以及一些参数的简单处理。 `http` 模块的体量也是很大的。
在实际开发中，还是会去借助像 `express` `koa2` 这些框架完成接口服务的开发。

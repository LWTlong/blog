---
title: loader 
order: 6
#article: false
category:
    - webpack
tag:
  - webpack
---


loader 在 webpack 主要用于模块转换。

## 编写 loader

loader 的编写，需要导出一个函数。

例如，自己编写一个转换 md 格式为 html 的 loader

```javascript
// 使用 marked 处理 md 文件
const marked = require('marked')

module.exports = (source) => {
  // source 就是文件源代码
  const html = marked(source)
  return `module.exports = ${JSON.stringify(html)}`
}
```
loader 需要导出一个函数，函数的参数，就是文件的源代码，例如这里的参数就是 md 文件的内容。在多个 loader 串联的适合，就是上一个 loader 返回的内容。 

loader 返回必须是一段字符串类型的 js 代码。


webpack.config.js 里配置 loader

```javascript
{
  test: /\.md$/,
  use: [
    {loader: './mdLoader'}
  ]
}
```

此时，引入的 md 格式文件就会被转换为 html 格式。


## 参数

如果需要配置 loader 的参数， 需要安装一个第三方库， `loader-utils`, 这里 webpack 官方的。

```javascript
// 使用 marked 处理 md 文件
const marked = require('marked')
const utils = require('loader-utils')

module.exports = function (source) {
  // 这里需要传入 this , 所以不能使用箭头函数
  const options = utils.getOptions(this)
  const html = marked(source, options)
  return `module.exports = ${JSON.stringify(html)}`
}
```

此时就可以配置 loader 的参数了：

```javascript
{
  test: /\.md$/,
  use: [
    {loader: './mdLoader', options: {headerIds: false}}
  ]
}
```


## 多个 Loader 串联

- 最后的 loader 最早调用，将会传入原始资源内容。
- 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。
- 中间的 loader 执行时，会传入前一个 loader 传出的结果。

也就是说，多个 loader 的执行顺序是从后往前的。例如

```javascript
{
  test: /\.css/,
  use: [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {loader: 'postcss-loader'},
  ]
}
```

在这个处理 css 的配置中， loader 的执行顺序

1. 先执行 `postcss-loader` 为 css 添加兼容性前缀
2. 在执行 `css-loader` 处理模块化引入的 css
3. 把 css 使用 style 标签直接插入页面中

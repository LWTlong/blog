---
title: tsconfig 配置文件
order: 10
#article: false
category:
- typescript
tag:
- typescript
---

tsconfig.json 配置文件中，一般分为:
* `compilerOptions` - 编译配置
* `include` - 包含
* `exclude` - 排除
* `extends` - 继承

四个大类


## compilerOptions - 编译器配置



### lib - 库

* `lib` 这个配置，就是一个 js 的版本库，例如遇见这种报错：

```ts
let set = new Set<string>()
// 找不到名称“Set”。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2015”或更高版本。
```

这种报错就是说 `lib` 的配置不对，可以直接在配置项里修改：

```json
{
  "compilerOptions": {
    "lib": ["ESNext"]
  }
}
```
当然 `lib` 可选的配置是非常多的，可以根据自身业务需求去选择。


### target - 编译目标

`target` 是用于编译结果的一个配置，例如项目需要比较好的兼容性，需要编译成 ES5，即可配置：

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"]
  }
}
```

这么配置，编译出来的 js 文件就会采用 ES5 的语法。可选项也是非常多的，也可以选择编译为 `ES6` `ESNext` 等。

### module

`module` - 编译后的规范，一般来说默认是 cjs - commonjs, 当然也可以修改成 ES 的规范，看自身需求。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs"
  }
}
```

### rootDir 和 outDir

* rootDir - 需要进行编译的目录
* outDir - 编译后输出 js 文件的目录（类似打包的 dist 文件目录）

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### moduleResolution

moduleResolution - 模块解析

在我们导入一个第三方包的时候，node 规范是在当前目录寻找有没有 `node_modules` ，如果没有，就往上一层目录去找，也就是从内往外找。

当然也可以用 `classic` 的模式，和 `node` 模式相反，它是从外往里找。

一般都是使用 `node` 规范，从里往外找。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node"
  }
}
```

### resolveJsonModule

resolveJsonModule - 是否支持引入 json 文件

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true
  }
}
```

resolveJsonModule 配置为 `true` 可在代码中引入 json 文件。

```ts
import test from './test.json'
console.log(test)
// { name: 'ts', version: '1.0.0' }
```

### allowJs

allowJs - 是否支持引入 js 文件。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true
  }
}
```

当项目里面不可避免的需要引入 js 文件的时候，可以开启此配置，即可引入 js 文件。

```ts
import {str} from './test'
console.log(str)
// 这是来自 js 文件的一句话
```

⚠️ 需要注意的是，开启此配置，会把引入的 js 文件一起编译到配置的 `dist` 文件夹中。

### checkJs

checkJs - 是否检查语法。这个没什么好说的，开启就给你检查你的语法是否正确，错误的语法给你对应的错误提示。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ESNext"],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true
  }
}
```

⚠️ 需要注意的是，`checkJs` 配置依赖于 `allowJs`, 也就是 `checkJs` 需要设置为 `true` 的话，`allowJs` 也需要为 `true`, 因为 `checkJs`
不止检查 ts 的语法，js 文件的语法也会检查。
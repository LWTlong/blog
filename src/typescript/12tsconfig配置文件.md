---
title: tsconfig 配置文件
order: 12
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

四个大类，主要是说明一下 compilerOptions 里面的各种常用配置。
 
## extends - 继承

这个没什么好说的，就是类似 webpack 那种，可以分离出来一个配置文件，然后再引入进来合并配置。

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

### declaration

declaration - 开启会给生成相关的 `.d.ts` 声明文件。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true
  }
}
```

### sourceMap

sourceMap - 在编译的时候会多生成一个 `.js.map` 的文件，可以在浏览器中匹配到我们的 ts 文件。

简单来说，开启这个配置，可以帮助我们在浏览器中直接调试 ts ，包括但不限于打断点之类的。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true
  }
}
```

### strict

strict - 是否开启严格模式。

strict 是一个总开关，它下面还有很多个子项可以单独的开启。

* noImplicitAny - 开启表示参数必须给定一个具体的类型，关闭反之。
* strictNullChecks - 空检查，开启表示 undefined 只能赋值给 any ｜ unknown 的类型，其他类型都不能赋值 undefined。
* strictPropertyInitialization - 表示属性是否必须有初始值。此选项必须和 `strictNullChecks` 配合使用。
* noImplicitReturns - 表示函数所有返回路径里面存在没有返回值的情况报错。

正常开发中，建议这几个配置都打开，或者直接打开总开关。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true
  }
}
```

### removeComments

removeComments - 字面意思，就是在编译的时候，帮我们删除所有的注释。

一般也是会打开的，因为编译后的代码一般不需要留着注释。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true
  }
}
```

### noUnusedLocals

noUnusedLocals - 表示声明的变量必须使用。

这个配置，看情况使用。一般是建议开启的。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true
  }
}
```

### noUnusedParameters

noUnusedParameters - 表示函数参数定义后，必须使用。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### skipLibCheck

skipLibCheck - 对声明文件是否跳过类型检查。意思就是是否跳过对 `.d.ts` 文件的类型检查。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true
  }
}
```

### typeRoots

typeRoots - 表示第三方包的声明文件从哪里读取。

例如安装了 `lodash` 或者 `jQuery` 之类的包，一般情况下会要求安装对应的 `@types/lodash` 这种类似定义的包。

typeRoots 则表示这些类型定义文件从哪里读取，一般默认是 `node_modules/@types`，正常情况下一般不需要额外的配置。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "typeRoots": ["node_modules/@types"]
  }
}
```

### types 

types - 表示需要声明的变量

一般情况下，需要使用 node ，会直接添加一个 node 的配置，这里需要注意的是，正常情况下不需要去配置它。如果有一些额外的 例如 vite 等，会自动加上。

一般就配置一个 node 就好了，甚至可以不去配置。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "types": ["node"]
  }
}
```

### jsx

jsx - 表示是否支持类似 react-jsx 的语法。

默认配置为：preserve

如果不需要，可以直接注释掉。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "types": ["node"],
    "jsx": "preserve"
  }
}
```

### experimentalDecorators && emitDecoratorMetadata

experimentalDecorators 和 emitDecoratorMetadata - 用来支持装饰器的使用。

如果不需要直接注释掉就好。


### 路径别名

路径别名，需要两个配置配合

* baseUrl - 表示工程目录下开始查找的位置，一般配置为 '.'
* paths - 别名配置

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": [
      "ESNext"
    ],
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "types": [
      "node"
    ],
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"] 
    }
  }
}
```

这个配置相当于把项目根目录下的 `src` 文件夹配置为 `@`, 在 ts 文件中引入 src 下的文件

```ts
import fn from '@/utils'
```

> [!warning]
> 这里需要注意的是，路径别名在编译的时候可以识别，但是在运行时是无法识别的，一般情况下需要配合一些第三库或者类似 webpack、vite 等构建工具使用，
> 才能在运行时支持路径别名。
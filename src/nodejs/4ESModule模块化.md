---
title: ESModule 模块化
order: 4
#article: false
category:
  - Nodejs
tag:
  - Nodejs javascript
---

ESModule 就是我们目前常用的 `import` 导入模块，`export` 导出模块

## ESModule 支持

ESModule 如果直接使用，会报错的。

a.js

```javascript
export const name = '张三';

export const sayName = () => {
  console.log('名字：', name);
};
```

b.js

```javascript
import { name, sayName } from './a';

console.log(name);
sayName();
```

直接使用，运行代码，会报错：`Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.`

告诉我们，需要在 `package.json` 中设置 `type` 字段为 `module`，或者文件以 `mjs` 作为后缀。

#### mjs

先尝试第一种办法，文件以 `mjs` 为后缀。

`a.js` => `a.mjs`

`b.js` => `b.mjs`

此时代码能成功运行。

#### package.json 设置 type

第二种解决办法，执行 `npm init -y` 快速初始化项目，得到 `package.json` 描述文件，并且添加 `type` 字段，设置为 `module`

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "test.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

此时再次执行 `.js` 后缀的代码。此时代码执行成功。

## 导入所有被导出的内容

当需要一次性导入一个文件内所有被导出的内容的时候

#### `import * as xx`

a.js

```javascirpt
export const name = '张三'
export const age = 20
export const sayName = () => {
    console.log('名字', name)
}
```

当 `a.js` 导出了一堆变量和方法，想直接全部导入

b.js

```javascript
// 如果有很多的变量，这么导入就不友好了
// import { name, age, sayName } from "./a";

import * as a from './a.js';

console.log(a);
// [Module: null prototype] {
//   age: 20,
//   name: '张三',
//   sayName: [Function: sayName]
// }

console.log(a.name);
// 张三
```

这里通过 `import * as a` 导入，`a` 其实就是一个对象，包含 `a.js` 里面所有的导出内容。

#### export default

还可以通过 `export default` 来导出默认内容

a.js

```javascript
const name = '张三';
const age = 20;
const sayName = () => {
  console.log('名字', name);
};

export default {
  name,
  age,
  sayName,
};
```

b.js

```javascript
import a from './a.js';

console.log(a);
// { name: '张三', age: 20, sayName: [Function: sayName] }

console.log(a.name);
// 张三
```

## 导入和导出

其他的导入和导出形式

#### 导入和导出结合

直接把导入的再次导出

```javascript
export { name } from './a.js';
```

#### 导入的变量和方法别名

如果导入的变量或者方法命名有冲突，还可以给别名

```javascript
import { name: myname } from './a.js';
```


## 直接在 html 中使用

如果不使用构建工具直接在 html 中使用，需要把 `type` 设置为 `module`

```html
<script type="module" src="./a.js"></script>
```

并且，如果是多个模块有引用关系，必须把所有的js文件都在 html 中引入，否则会报错。

```html
<script type="module" src="./a.js"></script>
<script type="module" src="./b.js"></script>
```

并且在 js 文件中，需要加上文件后缀

```javascript
import { name, sayName } from './a.js';
```


## ESModule 和 CommonJS 的区别

1. ESModule 是静态引入，CommonJS 是动态引入
2. ESModule 是导出值的引用，CommonJS 是导出值的拷贝
3. ESModule 支持异步加载，CommonJS 是同步加载的


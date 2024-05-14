---
title: Typescript
index: false
---

关于 ts ，可以首先了解一下动态类型语言和静态类型语言。

### 动态类型语言

运行时才做数据检查的语言。 例如： JavaScript、 Ruby、 Python 等。

### 静态类型语言

编译阶段进行数据类型检查。例如：C、 C++、 Java 等。

### ts 简介

官网的描述， ts 是 js 的超集。

优势：

- 更少的错误
- 程序更好理解
- 包容性


当然，技术的应用还是看自己的实际需求。ts 有好处，肯定有缺点，比如会带来学习成本，写类型定义会带来一些额外的开发成本等。

如果项目不大，单纯使用 js 就能很好很高效的完成业务和维护。那也不一定非要使用 ts 。

还是那句话，适合自己的才是最好的。

### 安装

建议 node 版本还是尽量新一点，大于 16 或者 18 的样子。

可以装一个 nvm 方便切换 node 版本。

安装非常的简单：

```bash
npm install -g typescript
```

当然也可以在项目中安装，不过个人感觉还是全局安装舒服一点，无论在哪儿都能使用。

安装完成后会注册一个 `tsc` 的命令：

```bash
tsc --version
```

可以查看版本

安装完成后，创建一个测试项目， 并且创建一个 `index.ts` 文件：

```typescript
const hello = (name: string) => {
    console.log(`hello ${name}`)
}
hello('word')
```

此时，可以给 `hello` 方法的参数 `name` 定义类型为 `string`, 期望传一个字符串

接着执行 

```bash
tsc index.ts
```

会生成一个 `index.js` 文件：

```javascript
var hello = function (name) {
    console.log("hello ".concat(name));
};
hello('word');
```

看起来没什么不一样，所以说 ts 是兼容 js 的，并且 ts 只会静态的检查，如果有错误，在编译时就会报错，例如修改一下参数：

```typescript
const hello = (name: string) => {
    console.log(`hello ${name}`)
}

hello(123)
```

将传入的参数改为 number 类型，其实修改了之后，编辑器就报红线了。 这个时候再次执行 `tsc index.ts`

```text
Argument of type 'number' is not assignable to parameter of type 'string'.
```

编译会报错，但是一样会生成一个 `index.js` 文件，并且文件内容看起来是没有问题的：

```javascript
var hello = function (name) {
    console.log("hello ".concat(name));
};
hello(123);
```

所以说，ts 只是会进行静态的类型检查，并且在编译的时候报错。如果没有配置报错退出，最后还是会编译好对应的 js 文件。

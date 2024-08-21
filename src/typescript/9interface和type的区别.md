---
title: interface 和 type 的区别
order: 9
#article: false
category:
- typescript
tag:
- typescript
---

type 和 interface 类似，都是用来定义类型的，但是它们之间还是有区别的： 

### 区别1：定义类型范围不同

* interface 只能定义对象类型或接口当名字的函数类型
* type 可以定义任何类型，基础类型、交叉类型、联合类型等。

### 区别2：继承

* interface 可以继承一个或者多个接口，也可以继承 type。
* type 没有继承功能

```ts
interface Father {
    name: string
}

interface Child extends Father {
    age: number
}
const child: Child = {
    age: 12,
}
// 类型 "{ age: number; }" 中缺少属性 "name"，但类型 "Child" 中需要该属性。
```
interface 通过 extends 关键字可以继承其他接口定义的类型。但是 type 无法实现继承。

### 区别3：重名合并

* 接口重名会合并声明
* type 重名会编译错误

```ts
interface MyError {
    name: string
}

interface MyError {
    msg: string
}

const error: MyError = {
    name: 'err',
    msg: 'error message'
} 
```

重名的接口会合并声明的类型，但是 type 重名会直接报错。
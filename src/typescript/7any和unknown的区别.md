---
title: any 和 unknown 的区别
order: 7
#article: false
category:
  - typescript
tag:
  - typescript
---

## any 可以作为任何类型的子类

意思就是，`any` 可以赋值给任意类型的变量，例如：
```ts
let data: any = ['aa', 'bb']
let num: number = data
```

并且 `any` 类型可以获取任意名称的属性和任意名称的方法。


## unknown 不能赋值给其他类型的变量

字面意思，直接看代码：
```ts
let data: unknown = ['aa']
let num: number = data
// 不能将类型“unknown”分配给类型“number”。
```

并且当一个变量的类型是 `unknown` 类型，不能获取任何属性和方法。

`unknown` 一般用于函数参数, 用来接受任意类型的变量实参，但是在函数内部只是用于再次传递或者输出，不用于获取属性。

## any 和 unknown 的区别

* `any` 类型可以获取任意名称的属性和任意名称的方法。
* `unknown` 类型的变量不能获取任何属性和方法。
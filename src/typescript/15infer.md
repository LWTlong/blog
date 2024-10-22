---
title: infer
order: 15
#article: false
category:
- typescript
tag:
- typescript
---


## 简介

`infer` 是 TypeScript 3.7 引入的一个关键字，用于在条件类型中推断类型。它可以让我们在条件类型中推断出某个类型，并将其作为结果类型返回。

`infer` 关键字可以在条件类型中提取类型的一部分, 用于条件类型中进行类型推断。

简单来说就是，在条件类型中，`infer` 关键字后的变量可以看作一个占位符一样的东西，类似泛型一样的。

```typescript
type Unpacked<T> = T extends (infer U)[] ? U : T;
```

例如这段代码， `Unpacked<T>` 是一个条件类型，如果 `T` 是一个数组类型，那么 `Unpacked<T>` 的类型就是 `U`, 这里的 `U` 是跟在 `infer` 关键字后的，所以在此时是不确定什么类型的，但是可以知道的是， `U` 就是数组元素的类型，否则 `Unpacked<T>` 的类型就是 `T` 本身。

那么使用的时候, `U` 就会得到具体的类似推断：

```typescript
type T1 = Unpacked<string[]>;
 // T1 的类型为 string
type T2 = Unpacked<number>; 
// T2 的类型为 number
```

## 使用场景

`infer` 常用于以下场景：

1. 在泛型类型中推断类型参数。
2. 在条件类型中推断类型。
3. 在类型别名中推断类型。


## 示例

### 在泛型类型中推断类型参数

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function foo(): number {
  return 123;
}

type FooReturnType = ReturnType<typeof foo>; // FooReturnType 的类型为 number
```


### 在条件类型中推断类型

```typescript
type Unpacked<T> = T extends (infer U)[] ? U : T;

type T1 = Unpacked<string[]>; // T1 的类型为 string
type T2 = Unpacked<number>; // T2 的类型为 number
```


### 在类型别名中推断类型

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Foo = () => string;
type FooReturnType = GetReturnType<Foo>; // FooReturnType 的类型为 string
```

## 注意事项

1. `infer` 只能在条件类型中使用，不能在普通类型中使用。
2. `infer` 只能推断出类型参数的一部分，不能推断出整个类型。
3. `infer` 不能在类型别名中直接使用，需要在条件类型中使用。



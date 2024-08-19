---
title: 深入理解 interface 接口
order: 8
#article: false
category:
- typescript
tag:
- typescript
---

## 概念和应用场景

#### 概念
接口 ： 另一种定义对象类型的类型。

#### 应用场景
接口类型，在一些第三包或者框架源码中有定义大量的接口类型。      
提供方法的对象类型的参数时使用。        
为多个方法的对象类型的参数时使用。        

```ts
interface List {
  push(): void;
  remove(): void;
}

class ArrayList implements List {
  push(): void {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}

class OtherList implements List {
  push(): void {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
```

## 可索引签名

当出现不确定的属性名和属性值的时候，未知属性名，可以这么写：

```ts
interface Student {
  name: string;
  age: number;
  [k: string]: any;
}

const student: Student = {
  name: "zhangsan",
  age: 19,
  sex: 1,
  isGraduate: false,
  100: "100",
  [Symbol("no")]: "00123",
};
```

`[k:string]` 这里是可以变的 一般都是写 ``string`` 可以兼顾多种类型的属性名。

如果需要定义指定类型的属性名 也可以直接写属性名对应的类型:

```ts
interface Person {
  [k: number]: any;
}

const person: Person = {
  100: "222",
  name: "222",
};
// 对象字面量只能指定已知属性
```

还需要注意的是，属性值，如果需要指定对应的类型的话，必须兼容已有的属性值的类型。

```ts
interface Student2 {
  name: string;
  age: number;
  [k: string]: number;
}
```

如果直接这么写, 就会报错:  **类型“string”的属性“name”不能赋给“string”索引类型“number”**。

需要进行修改

```ts
interface Student3 {
  name: string;
  age: number;
  [k: string]: number | string;
}
```

## 接口重名会合并

重名的接口, 并不会报错, 而是会合并。

```ts
interface Page {
  size: number;
}

interface Page {
  current: number;
}
```

等于这么写: 

```ts
interface PageInfo {
  size: number;
  current: number;
}

const page: Page = {
  size: 10,
};
// 类型 "{ size: number; }" 中缺少属性 "current"，但类型 "Page" 中需要该属性。
```


## 索引访问类型

在某些时候，需要拿某一个属性的类型：

```ts
interface Club {
  name: string;
  price: number;
}

type A = Club["name"];
// A = string
```

可以通过 `keyof` 来拿到所有的索引:

```ts
interface Club {
  name: string;
  price: number;
}
type B = keyof Club;
let b: B = "name";
// 只能选择 naem 或者 price, 类似字符字面量
```
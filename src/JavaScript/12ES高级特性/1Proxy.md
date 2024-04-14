---
title: Proxy
order: 1
article: false
tag:
  - JavaScript
---

Proxy 一般需要结合 [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 使用。

## Proxy 简介

创建一个对象的代理，从而实现基本操作的拦截和自定义。

```javascript
const p = new Proxy(target, handler);
```

`target` 任何类型的对象，包括原生数组、函数，甚至是另外一个代理对象。  
`handler` 一个对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。每个属性，代表这一种可以代办的事项。

[handler 的函数属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#handler_%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E6%B3%95) 是 Proxy 的各个捕获器。

## get set

读取和设置捕获器。 通俗点就是监听属性的读取和赋值。

```javascript
const obj = {
  name: 'zhangsan',
};

const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('触发了 get ');
    // 获取值 会被触发，这里可以做一些额外的特殊处理，例如 Vue，进行依赖收集
    return Reflect.get(target, key, receiver);
  },
  // target: 被代理对象 obj
  // key 属性名
  // value 值
  // 最初被调用对象，通常是 proxy 代理对象本身
  set(target, key, value, receiver) {
    console.log('触发了 set');
    // 设置值的时候，会被触发，例如 Vue 在这里进行依赖的触发
    return Reflect.set(target, key, value, receiver);
  },
});

console.log(p.name);
// 触发了 get
// zhangsan

p.name = 'lisi';
// 触发了 set
```

#### receiver 不是代理对象的情况

- 某个对象 obj 的原型是一个代理对象
- 当其设置 obj 某个属性，obj 自身不存在这个属性，但是原型(代理对象)上存在这个属性
- 会触发 set 捕获器，这个时候 receiver === 某个对象 obj

```javascript
const proto = {
  age: 20,
};

let obj;

const proxyProto = new Proxy(proto, {
  get(target, key, receiver) {
    console.log('get 触发');
    console.log('receiver === proxyProto', receiver === proxyProto);
    console.log('receiver === obj', receiver === obj);
    return Reflect.get(target, key, receiver);
  },

  set(target, key, value, receiver) {
    console.log('set 触发');
    console.log('receiver === proxyProto', receiver === proxyProto);
    console.log('receiver === obj', receiver === obj);
    return Reflect.set(target, key, value, receiver);
  },
});

function testObj(name) {
  this.name = name;
}

testObj.prototype = proxyProto;

obj = new testObj('张三');

console.log(obj.name); // 张三
console.log(obj.age);
// get 触发
// receiver === proxyProto false
// receiver === obj true
// 20

obj.name = '李四';
// 不触发 set

obj.age = 22;
// set 触发
// receiver === proxyProto false
// receiver === obj true
```

这种情况，`receiver` 是 `obj` 这个对象，而不是 `proxyProto` 代理对象。所以最好使用 `Reflect` 传入 `receiver`。

## apply 函数调用捕获器

```javascript
const p = new Proxy(target, {
  // target 目标对象
  // thisArg 上下文
  // argumentsList 参数数组
  apply(target, thisArg, argumentsList) {},
});
```

拦截范围：直接调用 `p(...args)`, `Function.prototype.apply()` `Function.prototype.call()` `Reflect.apply()`

```javascript
function sum(num1, num2) {
  return num1 + num2;
}

const p = new Proxy(sum, {
  // target 目标对象
  // thisArg 上下文
  // argumentsList 参数数组
  apply(target, thisArg, argumentsList) {
    console.log('target', target);
    console.log('thisArg', thisArg);
    console.log('argumentsList', argumentsList);
    return Reflect.apply(target, thisArg, argumentsList);
  },
});

console.log(p(1, 2));
// target [Function: sum]
// thisArg undefined
// argumentsList [ 1, 2 ]
// 3

console.log(p.call(null, 1, 1));
// target [Function: sum]
// thisArg null
// argumentsList [ 1, 1 ]
// 2

console.log(p.apply(undefined, [2, 2]));
// target [Function: sum]
// thisArg undefined
// argumentsList [ 2, 2 ]
// 4
```

## getPrototypeOf 捕获器

```javascript
const p = new Proxy(target, {
  // target 目标对象
  getPrototypeOf(target) {},
});
```

拦截范围: `Object.getPrototypeOf` `Reflect.getPrototypeOf` `__proto__` `Object.prototype.isPrototypeOf` `instanceof`

这里不写例子了，自己试试吧。

## setPrototypeOf 捕获器

```javascript
const p = new Proxy(target, {
  // target 目标对象
  setPrototypeOf(target, newProto) {},
});
```

拦截范围: `Object.setPrototypeOf` `Reflect.setPrototypeOf`

在某些时候，可以禁止设置原型

```javascript
const target = {};

const p = new Proxy(target, {
  // target 目标对象
  // newProto 需要设置的原型属性
  setPrototypeOf(target, newProto) {
    throw new Error('禁止设置原型');
  },
});

Object.setPrototypeOf(p, {}); // Error: 禁止设置原型
```

还有其他更多的捕获器，可以参照 MDN 文档试试。

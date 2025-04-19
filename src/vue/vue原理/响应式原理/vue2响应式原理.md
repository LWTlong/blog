---
title: vue2响应式原理
order: 1
#article: false
category:
    - vue2
tag:
  - vue原理
---

## 核心API 

vue2 中响应式数据的核心API是 `Object.defineProperty`，通过这个API可以给对象添加属性，并给属性添加getter和setter，从而实现数据劫持。

### 响应式原理

1. 在vue实例初始化的时候，会调用`initData`方法，这个方法会遍历data中的属性，并调用`defineReactive`方法，给每个属性添加getter和setter。

2. `defineReactive`方法会调用`Object.defineProperty`给属性添加getter和setter，在getter中会收集依赖，在setter中会通知依赖更新。

```js
function defineReactive(target, key, val) {
  Object.defineProperty(target, key, {
    get() {
      return val
    },

    set(newVal) {
      // 对新值再次进行监听 ，防止新值是对象
      // 触发视图更新
    }
  })
}
```

### 缺点

1. 无法监听对象属性的删除和新增，可以通过`Vue.set`和`Vue.delete`方法来解决这个问题。

2. 深度监听需要递归到每一个对象的属性，一次性计算量大。

3. 性能问题，每次访问属性都会触发getter，如果属性很多，会导致性能问题。


## 监听数组

vue2中监听数组是通过重写数组的原型方法来实现的，大概类似这样

```js
// 创建新对象 原型指向 Array.prototype， 再扩展新的方法不会影响原型
const arrayMethods = Object.create(Array.prototype)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function (method) {
  // 缓存原始方法
  const original = Array.prototype

  // 重新定义方法
  arrayMethods[method] = function (...args) {
    // 调用原始方法
    const result = original[method].call(this, args)

    // 触发视图更新
  }
})
```
---
title: 响应式
order: 12
#article: false
category:
  - vue
tag:
  - vue2
---

## 核心 API - Object.defineProperty

`Object.defineProperty` 在 js 的基础文章里面有写过, 这里不详细介绍, 简单写一下.

```javascript
const data = {
  name: 'Long'
}
// 接收一个对象, 和需要进行描述的属性, 最后一个参数是属性描述符
Object.defineProperty(data, 'name', {
  get() {
    // 可能会做一些依赖收集之类的操作 ...
    return value
  },
  set(newVal) {
    // 在数据变化的时候 触发收集的依赖之类的操作 ...
    value = newVal
    // 赋值后 去触发视图的更新
  }
})
```

由这段代码可见, vue 可以在 get 的时候去收集依赖, 也就是哪里读取了这个属性, 并且把这个操作收集起来.
在 set 改变这个属性的值的时候, 再去触发 get 收集的依赖. 达到响应式的目的.

`Object.defineProperty` 因为只能是监听对象属性的变化, 所以如果 data 里面的数据层次很深, 需要递归到底去遍历每一个对象.计算量是比较大的.

而且因为 `Object.defineProperty` 只能监听对象属性的变化, 所以当对象有新增属性的时候, 并不能触发 `Object.defineProperty` 去监听, 就无法监听到, 包括删除属性也无法监听.

所以 vue 提供了 `Vue.set` 和 `Vue.delete` 的方法.

而且 `Object.defineProperty` 是无法监听数组的.

### 监听数组

对于数组, vue 重新了 Array 原型上的方法, 来实现对数组的监听. 当然 vue 肯定不是直接在原生的 Array 上重写, 是重新定义了一个数组的原型,
然后再进行重写, 不会去污染全局的 Array. 例如:

```javascript
export default {
  data() {
    return {
      list: []
    }
  }
}
```

vue 在循环 data 里定义的数据的时候, 如果是一个数组, 就会把 `list` 数组的原型直接赋值为写好的原型, 来达到实现监听 `list` 数组变化的目的, 而不是直接一股脑的把 Array 给改了.

vue 在监听数组长度变化等地方还有一些问题, 例如在使用一些树型数据的时候, 总是需要使用扩展运算符重新赋值:

```javascript
data() {
  return {
    tree: [
      {
        name: 'parent',
        children: [
          {
            name: 'child',
            children: [
              {
                name: 'xxx',
                childrend: [
                  // ...
                ]
              }
            ]
          }
        ]
      }
    ]
  }
} 

// 一般这种数据的时候, 都需要重新的赋值才能生效
this.tree = [...this.tree]
```

如果你在使用这种复杂的树类型的数据没有更新视图的时候, 不妨试试这个方式.





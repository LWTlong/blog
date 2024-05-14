---
title: 虚拟 DOM
order: 13
#article: false
category:
  - vue
tag:
  - vue2
---

## vnode

DOM 操作是比较耗时而且耗费性能, vue 是数据驱动视图, 数据更新的时候需要有效的控制 DOM 操作.

所以就有了虚拟 DOM, 把更多的计算转移为 js 的运算, 因为 js 执行的速度会更快.

所以 vnode, 就是用 js 模拟 DOM 结构, 计算出最小的变更, 然后去操作 DOM 更新.

```javascript
const vnode = {
  "__v_isVNode": true,
  "type": "div",
  "props": { "class": "test" },
  "children": [
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p1",
      "shapeFlag": 9
    },
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p2",
      "shapeFlag": 9
    },
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p3",
      "shapeFlag": 9
    }
  ],
  "shapeFlag": 17
}
```

(这是后面重新从 Vue3 找的 vnode, 知道大概意思就行)

vnode 的表示没有具体的规范, 反正肯定要有表示 dom 的的类型,

- `type` | `tag` 来表示标签
- `children` 表示子元素
- `props` 表示元素的属性 `class` `style` `id` 等

这三种基础的表述肯定是要有的, 其他的属性可能每个框架的处理都不一样

vnode 是不能直接用的, 一般会配合一个 render 函数来根据 vnode 渲染成具体的页面.

## vnode diff 算法

想要找出最少的变化, 肯定需要进行对比, vnode 的 diff 算法就是用来进行这件事的.

- 只比较同一层级
- tag 不相同就直接删除重建, 不会再深度比较
- tag 和 key 相同, 认为相同节点, 不在深度比较

---
title: $nextTick
order: 4
#article: false
category:
  - vue
tag:
  - vue2
---


- Vue 是异步渲染
- data 改变之后， DOM 不会立刻渲染
- $nextTick 会在 DOM 渲染之后被触发，以获取最新 DOM 节点。

```vue
<template>
  <div id="app">
    <ul ref="ul1">
        <li v-for="(item, index) in list" :key="index">
            {{item}}
        </li>
    </ul>
    <button @click="addItem">添加</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        list: ['a', 'b', 'c']
      }
  },
  methods: {
    addItem() {
        this.list.push(`${Date.now()}`)
        this.list.push(`${Date.now()}`)
        this.list.push(`${Date.now()}`)
        // 获取 DOM 元素
        const ulElem = this.$refs.ul1
        console.log( ulElem.childNodes.length ) // 3
      
        // 1. 异步渲染，$nextTick 待 DOM 渲染完再回调
        // 3. 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次
        this.$nextTick(() => {
          // eslint-disable-next-line
          console.log( ulElem.childNodes.length ) // 6
        })
    }
  }
}
</script>
```

在 `data` 更新后，立马去获取 DOM，这个时候 DOM 是还没更新的。

异步渲染，`$nextTick` 待 DOM 渲染完再回调, 页面渲染时会将 `data` 的修改做整合，多次 `data` 修改只会渲染一次。

所以，当我们有需要页面渲染完成后获取最新 DOM 的需求时，可以使用 `$nextTick` 来确保获取的 DOM 是最新的。

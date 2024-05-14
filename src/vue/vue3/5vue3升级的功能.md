---
title: 升级功能一览
order: 5
#article: false
category:
    - vue
tag:
  - vue3
---

## createApp

在 vue2 中, vue 是直接使用实例来调用一些方法, 例如:

```javascript
Vue.use()
Vue.mixin()
Vue.component()
// ...
```

vue3 中则是使用 `createApp` 生成的实例

```javascript
const app = createApp()

app.use()
app.component()
app.mount()
// ...
```

官网介绍, vue3 可以通过 `createApp` 来创建多个实例.

## emits 属性

vue3 使用 emits, 需要定义

```javascript
export default {
  emits: ['change', 'success'],
  
  setup(props, context) {
    context.emit('change', data)
  }
}
```

## Fragment

vue2 中, 组件模板是单一根节点, 所有内容都写在根节点里面

```vue
<template>
  // 单一根节点
  <div>
    <div>content</div>
    <span>123</span>
  </div>
</template>
```

vue3 中, 可以直接写多个节点

```vue
<template>
  <p>123</p>
  <h1>title</h1>
  <div>content</div>
</template>
```

## 移除 .sync

vue2:

```vue
<my-component v-bind:title.sync="title"></my-component>
```

vue3:

```vue
<my-component v-model:title="title"></my-component>
```

## 异步组件

vue2 

```javascript
new Vue({
  components: {
    `my-component`: () => import('./myComponent.vue')
  }
})
```

vue3:

```javascript
import { defineAsyncComponent } from 'vue'

conponents: {
  'my-component': defineAsyncComponent(() => import('./myComponent.vue'))
}
```

## teleport

简单说就是传送组件

```vue
<teleport to="body">
  <div>我是一个弹框</div>
</teleport>
```

div 会直接被添加到 body 下, div 的父元素直接就是 body


## Suspense

vue3 封装的异步加载的回调组件

```vue
<Suspense>
  <template>
    <sync-component></sync-component>
  </template>

  <template #fallback>
    loading ...
  </template>
</Suspense>
```

简单说就是, 如果加载一个比较大的异步组件, 会先显示 `fallback` 插槽里的内容, 等待异步组件加载完成后, 再显示组件内容.


## Composition API

前面的文章介绍过了, 这里不再写了.

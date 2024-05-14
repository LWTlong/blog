---
title: mixin
order: 8
#article: false
category:
  - vue
tag:
  - vue2
---

多个组件有相同的逻辑的时候, 为了代码复用性, 可以将相同逻辑抽离出来

简单来说, 就是把相同的逻辑, 抽离出来, 然后通过 `mixin` 混合到当前使用的组件里

mixin.js:

```javascript
export default {
    data() {
        return {
            city: '深圳'
        }
    },
    methods: {
        showName() {
            // eslint-disable-next-line
            console.log(this.name)
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log('mixin mounted', this.name)
    }
}
```

Component: 

```vue
<template>
    <div>
        <p>{{name}} {{major}} {{city}}</p>
        <button @click="showName">显示姓名</button>
    </div>
</template>

<script>
import myMixin from './mixin'

export default {
    mixins: [myMixin], // 可以添加多个，会自动合并起来
    data() {
        return {
            name: 'Long',
            major: 'web 前端'
        }
    },
    methods: {
    },
    mounted() {
        // eslint-disable-next-line
        console.log('component mounted', this.name)
    }
}
</script>
```

组件通过 `mixin` 将抽离出来的逻辑混入, 就可以使用抽离出来的逻辑. 组件里并没有写 `showName` 这个方法, 但是通过
混入 `mixin` , 可以直接使用到抽离出来的 `showName` 方法.

但是 `mixin` 使用起来也有一些缺点:

- 变量来源不明确, 因为是 vue 自己实现的混入, 不是类似模块导入, 在组件内某些变量可能无法直接跳转到对应的位置.
- 多个 `mixin` 可能多导致命名冲突
- `mixin` 和组件可能出现多对多的关系, 一个 `mixin` 被多个组件使用, 多个组件使用一个 `mixin`, 复杂度比较高

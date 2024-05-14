---
title: v-model 参数
order: 6
#article: false
category:
    - vue
tag:
  - vue3
---

## vue2 中是添加 `.sync`

某些情况下对 `props` 的 "双向绑定", 就是父组件中传给子组件的 `props`, 可能需要子组件去修改并且父组件也能获得变更后的值.

```vue
<my-component 
    v-bind:title="title"
    v-on:update:title="title = $event"
></my-component>
```

缩写就是

```vue
<my-component v-bind:title.sync="title"></my-component>
```

## vue3 中是 v-model:[prop]

```vue
<my-component :title="title" @update:title="title = $event"></my-component>
```

简写

```vue
<my-component v-model:title="title"></my-component>
```

例如

index.vue:

```vue
<template>
    <p>{{name}} {{age}}</p>

    <user-info
        v-model:name="name"
        v-model:age="age"
    ></user-info>
</template>

<script>
import { reactive, toRefs } from 'vue'
import UserInfo from './UserInfo.vue'

export default {
    name: 'VModel',
    components: { UserInfo },
    setup() {
        const state = reactive({
            name: 'long',
            age: '20'
        })

        return toRefs(state)
    }
}
</script>
```

user-info.vue

```vue
<template>
    <input :value="name" @input="$emit('update:name', $event.target.value)"/>
    <input :value="age" @input="$emit('update:age', $event.target.value)"/>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        name: String,
        age: String
    }
}
</script>
```

父组件使用 `v-model:name` 的简写, 子组件修改值的时候, 只需要往外传递一个 `update:name` 的事件, 并且把更改的数据当作参数传递出去即可.

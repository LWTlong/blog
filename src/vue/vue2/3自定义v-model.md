---
title: 自定义 v-model
order: 3
#article: false
category:
  - vue
tag:
  - vue2
---

## v-model

在 vue 文档中， `v-model` 的实现：

```vue
<template>
    <input type="text"
        :value="value"
        @input="$emit('change', $event.target.value)"
    >
</template>

<script>
export default {
    props: {
      value: String,
        default() {
            return ''
        }
    }
}
</script>
```

`props` 的默认接收参数为 `value`, 然后 `$emit` 一个 `change` 事件。父组件即可对子组件使用 `v-molde`。

## 自定义 v-model

如果是想要自定义参数，需要添加一个 `model` 字段:

```vue
<template>
    <input type="text"
        :value="text"
        @input="$emit('change1', $event.target.value)"
    >
    <!--
        1. 上面的 input 使用了 :value 而不是 v-model
        2. 上面的 change1 和 model.event 要对应起来
        3. text1 属性对应起来
    -->
</template>

<script>
export default {
    model: {
        prop: 'text', // 对应 props text
        event: 'change1'
    },
    props: {
        text: String,
        default() {
            return ''
        }
    }
}
</script>
```

使用 `model` 字段即可自定义 `v-model` 的参数和事件。注意的是，必须要对应起来。

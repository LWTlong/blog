---
title: setup script
order: 8
#article: false
category:
    - vue
tag:
  - vue3
---

vue3.2 版本发布了 setup script 的语法糖

## 基本使用

- 顶级变量, 自定义组件, 可以直接用于模板
- 正常的使用 `ref` `reactive` `computed` 等能力
- 可以和其他的 `<script>` 同时使用

```vue
<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Child1 from './Child1'

const countRef = ref(100)

function addCount() {
  countRef.value++
}

const state = reactive({
  name: 'long'
})
</script>

<template>
  <p @click="addCount">{{countRef}}</p>
  <p>{{state.name}}</p>
  <child-1></child-1>
</template>
```

可以把 `<script setup>` 里面的内容都可以直接作用在模板上, 并且使用都是和 `setup` 一样的正常使用,
只是不需要 `return`, 定义的变量和方法都可以直接在模板上使用, 包括引入的组件, 也不需要手动的去注册, 引入了就可以直接使用.


## 属性和事件

- `defineProps` - 定义属性参数.
- `defineEmits` - 定义事件

`defineProps` 和 `defineEmits` 在 `<script setup>` 中不需要引入, 自动可用的.

```vue
<script setup>
// 定义属性
const props = defineProps({
    name: String,
    age: Number
})

// 定义事件
const emit = defineEmits(['change', 'success'])
function handleChange() {
    emit('change', 'aaa')
}

</script>

<template>
    <p>Child2 - name: {{props.name}}, age: {{props.age}}</p>
    <button @click="handleChange">change</button>
</template>
```


## defineExpose

`defineExpose` 可以在子组件中暴漏一些数据给父组件, 同样的 `defineExpose` 在 `<script setup>` 中不需要引入, 自动可用的.

子组件:

```vue
<script setup>
import { ref, defineExpose } from 'vue'

const a = ref(101)
const b = 201

defineExpose({
    a,
    b
})

</script>

<template>
    <p>Child3</p>
</template>
```

父组件的 `onMounted` 钩子里: 

```vue
<script setup>

</script>
import { ref, onMounted } from 'vue'

const child3Ref = ref(null)
onMounted(() => {
    // 拿到 Child3 组件暴露出来的一些数据
    console.log(child3Ref.value)
    console.log(child3Ref.value.a)
    console.log(child3Ref.value.b)
})

<template>
    <child-3 ref="child3Ref"></child-3>
</template>
```

和 `provide` - `inject` 父组件给后代组件传值有点像, 只不过是反过来了.

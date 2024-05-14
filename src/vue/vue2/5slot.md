---
title: slot
order: 5
#article: false
category:
  - vue
tag:
  - vue2
---

## 插槽

`slot` 插槽十分常见。使用也很简单, 例如 `child.vue`

```vue
<template>
  <div>
    <slot>这是默认的插槽</slot>
  </div>
</template>
```

当你在使用的时候：

```vue
<template>
  <div>
    <child></child>
<!--    渲染默认的插槽内容-->
    <child>
      <span>我需要渲染这一段话</span>
    </child>
<!--    渲染传入的内容-->
  </div>
</template>
```

如果你什么都不传，就会渲染默认插槽中的内容, 传入的话就渲染你传入的内容。


## 具名插槽

当需要使用多个插槽的时候,可以给插槽一个名称,使用的时候需要传入对应插槽的名称才会渲染:

```vue
<template>
  <div>
    <slot name="header"></slot>
    <slot>默认的 content</slot>
    <slot name="footer"></slot>
  </div>
</template>
```

使用的时候, 需要传入对应的 slot name 

```vue
<template>
  <div>
    <child>
      <template v-slot:header>
        <span>这是头</span>
      </template>
      <template v-slot:footer>
        <span>这是足部</span>
      </template>
    </child>
  </div>
  
</template>
```


## 作用域插槽

作用域插槽, 子组件的 data 可以通过 slot 让父组件在使用的时候获取到:

子组件:

```vue
<template>
  <div>
    <slot :slotData="record">
      {{record.name}} <!-- 默认值显示 name ，即父组件不传内容时 -->
    </slot>
  </div>
</template>

<script>
export default {
  props: ['url'],
  data() {
    return {
      record: {
        name: 'long',
        blog: 'https://anbc.cn'
      }
    }
  }
}
</script>
```

父组件使用:

```vue
<template>
  <div>
    
    <child>
      <template v-slot="props">
        <span>名称: {{props.slotData.name}}</span>
        <span>博客: {{props.slotData.blog}}</span>
      </template>
    </child>
    
  </div>
</template>
```

作用域插槽也可以传入多个, 简单来说就是在 `slot` 上添加动态属性,属性名可以自定义,然后传入你想传入的值即可

例如多个值

```vue
<slot :data1="data1" :data2="data2"></slot>
```

使用:

```vue
<child>
  <template v-slot="props">
    访问第一个: {{props.data1}}
    访问第二个: {{props.data2}}
  </template>
</child>
```



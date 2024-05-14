---
title: ref toRef 和 toRefs
order: 4
#article: false
category:
    - vue
tag:
  - vue3
---

## ref

- 生成值类型的响应式数据
- 可用于模板和 `reactive`
- 通过 `.value` 修改值

```vue
<template>
    <p ref="cRef">ref demo {{nameRef}} {{state.name}}</p>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
    name: 'Ref',
    setup() {
      // 值类型
    const nameRef = ref('long')
      
    // 直接用于 reactive
    const state = reactive({
      name: nameRef
    })

    // 用于 dom, 元素上使用 ref 绑定同名的变量即可
    const cRef = ref(null)

    return {
      nameRef,
      state,
      cRef
    }
  }
}
</script>
```

因为 vue3 的响应式核心 api 使用的 `Proxy`, 无法代理简单类型的数据. 所以 `ref` 是为了创建值类型的响应式数据.

但是其实用于引用类型的数据也是可以的. `ref` 内部会对传入的数据进行判断, 如果是一个引用类型的数据,
会直接使用 `reactive` 生成响应式对象返回.

通过 `.value` 修改值是因为, `ref` 内部, 也就是构造函数 `RefImpl` 类里, 使用 `get value()` 和 `set value()`, 
使用 `get` 和 `set` 修饰符, 可以直接通过 `.value` 来获取值和设置值. 在 `get` 里会收集依赖, `set` 的时候触发依赖, 实现
响应式, 所以 `ref` 需要使用 `.value` 来修改值.

## toRef

- 针对一个响应式对象( reactive 封装) 的 prop
- 创建一个 ref, 具有响应式
- 两者保持引用关系

```vue
<template>
    <p>toRef demo - {{ageRef}} - {{state.name}} {{state.age}}</p>
</template>

<script>
import { toRef, reactive } from 'vue'

export default {
    name: 'ToRef',
    setup() {
        const state = reactive({
            age: 20,
            name: 'Long'
        })
      
        const ageRef = toRef(state, 'age')
        
        // 具有引用关系, 修改 state.age  ageRef 的值也会变 
        setTimeout(() => {
            state.age = 25
        }, 1500)
        
        // 反过来也是一样的
        setTimeout(() => {
            ageRef.value = 30
        }, 3000)

        return {
            state,
            ageRef
        }
    }
}
</script>
```

`reactive` 如果结构了或者单独拿出属性来赋值, 会丧失响应性. `toRef` 就可以很好的解决这个问题, 可以把 `reactive` 的属性拿出来使用, 并且不会丧失响应性.

`toRef` 只能用于响应式数据, 如果用于普通对象, 生成的数据不具备响应性


## toRefs

`toRefs` 和 `toRef` 的作用差不多, 只是 `toRefs` 可以直接转换响应式对象里的所有属性.

```javascript
import { toRefs, reactive } from 'vue'

export default {
    name: 'ToRef',
    setup() {
        const state = reactive({
            age: 20,
            name: 'Long'
        })
      
        const {age, name} = toRefs(state)
       
        // 直接结构出来的 age 和 name 都是具体有响应性的
        // 属性变成了 ref 对象, 通过 .value 取值和修改值
      
        return {
          
        }
    }
}
```

总的来说, `toRef` 和 `toRefs` 就是为了结构 `reactive` 的属性, 不失去响应性. 就这么理解的话就好理解了.



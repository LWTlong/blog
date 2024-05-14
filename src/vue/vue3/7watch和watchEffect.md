---
title: watch 和 watchEffect
order: 7
#article: false
category:
    - vue
tag:
  - vue3
---

## watch

```javascript
export default {
    name: 'Watch',
    setup() {
        const numberRef = ref(100)
        const state = reactive({
            name: 'long',
            age: 20
        })

        // 监听一个 ref
        watch(numberRef, (newNumber, oldNumber) => {
            console.log('ref watch', newNumber, oldNumber)
          }, 
          {
            // 和 vue2 一样可以传入深度监听等参数
            immediate: true, // 初始化之前就监听，可选
            deep: true
          }
        )
        
        // 监听一个对象类型, 或者说 props里的某个属性
        watch(
            // 使用一个函数来返回要监听的属性
            () => state.age,

            // 第二个参数，回调函数
            (newAge, oldAge) => {
                console.log('state watch', newAge, oldAge)
            },

            // 第三个参数，配置项
            {
                immediate: true, // 初始化之前就监听，可选
                // deep: true // 深度监听
            }
        )

        return {
           
        }
    }
}
```


## watchEffect

```javascript
export default {
    name: 'Watch',
    setup() {
        const numberRef = ref(100)
        const state = reactive({
            name: '双越',
            age: 20
        })

        watchEffect(() => {
            // 初始化时，一定会执行一次（收集要监听的数据）
            console.log('state.age', state.age)
            console.log('state.name', state.name)
        })

        return {
        }
    }
}
```

`watchEffect` 不需要写监听的属性, 使用了哪些属性, 就会自动监听.

监听的原理就是, 当在使用了 `ref` 或者 `reactive` 的时候, 触发了 `ref` 或者 `reactive` 的 `get`, watch 被当作依赖收集了起来.
当响应式数据被修改的时候, 会触发收集到的依赖, watch 就会被再次触发.

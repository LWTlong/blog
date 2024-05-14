---
title: VueRouter
order: 10
#article: false
category:
  - vue
tag:
  - vue2
---

## 路由模式

- hash 模式(默认)
- H5 history 模式, 需要后端支持

### hash 的特点

- hash 变化会触发网页跳转, 即浏览器的前进, 后退
- hash 变化不会刷页面, SPA 必需的特点
- hash 永远不会提交到 server 端

```html
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>hash test</title>
</head>
<body>
  <p>hash test</p>
  <button id="btn1">修改 hash</button>

  <script>
    // hash 变化，包括：
    // a. JS 修改 url
    // b. 手动修改 url 的 hash
    // c. 浏览器前进、后退
    window.onhashchange = (event) => {
    console.log('old url', event.oldURL)
    console.log('new url', event.newURL)

    console.log('hash:', location.hash)
  }

    // 页面初次加载，获取 hash
    document.addEventListener('DOMContentLoaded', () => {
    console.log('hash:', location.hash)
  })

    // JS 修改 url
    document.getElementById('btn1').addEventListener('click', () => {
    location.href = '#/user'
  })
  </script>
</body>
</html>
```

## 路由配置

### 动态路由

```javascript
const router = new VueRouter({
  routes: [
    {
      // 以冒号开头, 这个配置可以命中 /user/1  /user/10 等格式的路由
      path: 'user/:id',
      component: User
    }
  ]
})
```

组件中通过 `$route.params.id` 来获取路由参数

### query 传参

A 组件在 query 里面传递参数 

```javascript
this.$router.push({path: '/user', query: { name: 'long', age: 23 }})
```

B 组件通过 query 获取参数

```javascript
this.$route.query.name
this.$route.query.age
```

### 懒加载

```javascript
const router = new VueRouter({
  routes: [
    {
      // 以冒号开头, 这个配置可以命中 /user/1  /user/10 等格式的路由
      path: 'user/:id',
      component: () => import('../User')
    }
  ]
})
```

和异步加载组件是一样的

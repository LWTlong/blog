---
title: SSR 简单使用
order: 9
#article: false
category:
    - vue
tag:
  - vue3
---

使用 vue SSR, 除了 vue 本体, 还需要安装一个 `@vue/server-render` 的库.

不过最新的说明, 在 vue 3.2.13 版本以上, 这个库就被添加进了 vue 本体了. 如果大于这个版本, 就不需要额外的安装.

SSR 需要使用 `createSSRApp` 

```typescript
const vueApp = createSSRApp({
    data: () => {
        return {
            components: (content && content.components) || [],
        };
    },
    template: '<render-page :components="components"></render-page>',
});
vueApp.use(dadiComponents);
const html = await renderToString(vueApp);
```

`dadiComponents` 是我自己弄的一个组件库, SSR 同样需要直接引入组件库, 也是使用的 `vueApp.use`,
然后使用 `renderToString` 方法得到一段 html, 然后我是通过模板渲染的方式返回到前端.

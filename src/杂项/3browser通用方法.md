---
title: browser 通用方法
order: 3
#article: false
category:
  - Nodejs
tag:
  - utils
---

## 下载文件

```typescript
export const downloadFile = (src: string, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.rel = 'noopener'
    // 如果资源地址和 location 地址不一样 则是跨域
    if (link.origin !== location.origin) {
        // 跨域发送请求资源
        axios.get(src, {responseType: 'blob'}).then(res => {
            link.href = URL.createObjectURL(res.data)
            // 防止大文件创建链接异步太久
            setTimeout(() => {
                link.dispatchEvent(new MouseEvent('click'))
            })
            setTimeout(() => {
                URL.revokeObjectURL(link.href)
            }, 10000)
        }).catch((e) => {
            // 如果请求失败 或者资源不允许跨域 则直接打开资源地址
            console.error(e)
            link.target = '_blank'
            link.href = src
            link.dispatchEvent(new MouseEvent('click'))
        })
    } else {
        // 不是跨域 直接下载
        link.href = src
        link.dispatchEvent(new MouseEvent('click'))
    }
}
```

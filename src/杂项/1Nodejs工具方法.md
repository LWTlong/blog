---
title: Nodejs工具方法
order: 1
article: false
category:
  - Nodejs
tag:
  - utils
---

## 路径兼容

路径兼容 将 windows 下路径的 `\` 转为 `/`

```typescript
export function formatPath(p: string) {
    if (p) {
        const sep = path.sep;
        if (sep === '/') {
            return p;
        }
        return p.replace(/\\/g, '/');
    }
    return p;
}
```

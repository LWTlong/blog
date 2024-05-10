---
title: Nodejs小而美的工具库合集
order: 2
#article: false
category:
  - Nodejs
tag:
  - utils
---

## 图片处理

### sharp

将常见格式的大图像转换为 较小、适合 Web 的 JPEG、PNG、WebP、GIF 和 AVIF 不同尺寸的图像。
除了调整图像大小外，提供旋转、提取、合成和伽玛校正。

[github 地址](https://github.com/lovell/sharp)

Node >= 12.13.0

```shell
npm install sharp
```

使用 ts 还需要额外安装类型定义

```shell
npm install @types/sharp -D
```

## 压力测试

### loadtest

[github地址](https://github.com/alexfernandez/loadtest)

---
title: 操作DOM上的样式
order: 6
tag:
  - JavaScript
---

## 操作元素节点的 style 属性

#### style 属性名时驼峰语法

```javascript
el.style.fontSize = '30px';
```

#### style.cssText 批量赋值

`important` 也是会生效的

```javascript
el.style.cssText = 'font-size: 30px; color: red !important;';
```

## 操作 DOM 的类

#### className

`className` 是一个字符串类型的。可以添加多个，用空格分割。

```javascript
el.className = 'container box';
```

#### classList

`classList` 是一个 `DOMTokenList` 的类数组，拥有 `add`添加， `remove`移除， `contains` 是否包含，`toggle` 方法等。

## 写在后面

关于操作样式，简单做个介绍，后续在补怎么样去计算转化 rem => px 之类的知识。

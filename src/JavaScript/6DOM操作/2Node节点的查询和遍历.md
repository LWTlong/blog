---
title: Node节点的查询和遍历
order: 2
#article: false
tag:
  - JavaScript
---

先了解几个概念吧，大概了解就行，瞄一眼那种。

Node: 是一个接口，就称它为节点吧。  
Element: 是通用性的积累， nodeType = 1，是 Node 的一类实现，其子类我们都称为元素。

Node 还有很多其他的实现，比如文本，注释等。

HTMLCollection: Element 子类的集合。  
NodeList: 所有 Node 子类的集合。

简单约定一下， HTMLCollection => 元素集合。 NodeList => 节点列表。

## getElementById

`document.getElementById` 只返回元素，nodeType 为 1 的 `Element` 。id 是大小写敏感的字符串，就是你 id 一定不能写错。如果有多个元素有相同 id ,只返回第一个元素。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="container">123</div>
    <div id="container">456</div>

    <div id="nodeList"></div>

    <script>
      const container = document.getElementById('container');
      console.log(container); //     <div id="container">123</div>

      const nodelist = document.getElementById('nodelist');
      // 大小写也不能有错
      console.log(nodelist); // null
    </script>
  </body>
</html>
```

## getElementsByClassName

`document.getElementsByClassName` 或者 `element.getElementsByClassName`：根据指定的类名查询元素。不仅在 `document` 上有，在 `element` 上也有这个方法。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="container">
      <ul class="ul">
        <li class="ul-item"></li>
        <li class="ul-item item-active"></li>
        <li class="ul-item"></li>
      </ul>
    </div>

    <script>
      // 直接查找
      const items = document.getElementsByClassName('ul-item');
      console.log(items); // HTMLCollection(3) [li.ul-item, li.ul-item.item-active, li.ul-item]

      // 通过元素去查找
      const container = document.getElementById('container');
      const container_items = container.getElementsByClassName('ul-item');
      console.log(container_items); // HTMLCollection(3) [li.ul-item, li.ul-item.item-active, li.ul-item]

      // 多个类目一起查找
      const item3 = document.getElementsByClassName('ul-item item-active');
      console.log(item3); // HTMLCollection [li.ul-item.item-active]
    </script>
  </body>
</html>
```

> [!warning]
> 返回的结果是实时的元素集合，但是不是数组。  
> 可以同时匹配多个 class 类名，通过空格分隔。匹配是 `and` 的关系。
> 元素均有此方法，不限于 `document` 。

## getElementsByName

`document.getElementsByName`: 根据指定的 name 属性查询元素。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul class="ul">
      <li name="item">1</li>
      <li name="item">2</li>
      <li name="item">3</li>
    </ul>

    <ccc name="ccc">ccc</ccc>

    <script>
      const items = document.getElementsByName('item');
      console.log(items); // NodeList(3) [li, li, li]

      // 不存在的节点 也能返回
      const c = document.getElementsByName('ccc');
      console.log(c); // NodeList [ccc]
    </script>
  </body>
</html>
```

> [!warning]
> 返回的结果是实时的节点集合 NodeList。  
> 包括不能解析的几点。
> 此方法仅存在于 `document`。

## getElementsByTagName

`document.getElementsByTagName`: 根据指定的标签查询元素。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul class="ul">
      <li name="item">1</li>
      <li name="item">2</li>
      <li name="item">3</li>
    </ul>

    <script>
      const items = document.getElementsByTagName('li');
      console.log(items); // HTMLCollection(3) [li, li, li]

      const all = document.getElementsByTagName('*');
      console.log(all);
      // HTMLCollection(11) [html, head, meta, meta, title, body, ul.ul, li, li, li, script, viewport: meta]
    </script>
  </body>
</html>
```

> [!warning]
> 返回的结果是实时的元素集合。  
> 传入的 `tagName` 可以是 `*` ，代表查询全部元素。
> Webkit 旧版本可能还是返回的 NodeList 。
> 元素均有此方法，不限于 `document` 。

## querySelector

`document.querySelector`: 根据 css 选择器进行节点查询，返回匹配的第一个元素 Element 。

> [!warning]
> 仅返回匹配的第一个元素 Element。  
> 如果传入的不是有效的 css 选择器，会报错。
> 元素均有此方法，不限于 `document` 。

## querySelectorAll

`document.querySelectorAll`: 根据 CSS 选择器进行节点查询，返回节点列表的 NodeList 。

> [!warning]
> 返回的静态的 NodeList, 后续对 DOM 元素的改动不会影响其集合的内容。  
> 元素均有此方法，不限于 `document` 。

## 一些特殊查询属性

- `document.all` : 所有的元素
- `document.images` : 所有的图片
- `document.forms` : 所有的 form 表单元素
- `document.scripts` : 所有的脚本元素
- `document.links` : 所有具有 href 的热点和 a 元素。
- `document.fonts` : 所有字体
- `document.styleSheets`: 所有的 css link 和 style 元素。

## 遍历

#### 元素集合和 NodeList

- `for/while`
- NodeList 的原型上有 forEach 的方法，但是不推荐，可能存在兼容性。
- 转为数组遍历：通过 `Array.from` `Array.prototype.slice` 等方法转为数组再遍历。

#### 某个节点，元素所有子节点

- `children` 或者 `childNodes`

后面实在写不起例子了，感兴趣的，复制一下自己试试吧。

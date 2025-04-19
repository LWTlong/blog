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

## 快速排序

```ts
// 快速排序法
function quickSort<T>(arr: Array<T>): Array<T> {
  if (arr.length < 2) {
    return arr;
  }
  const left: Array<T> = [];
  const right: Array<T> = [];
  const mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(mid, quickSort(right));
}

const arr = [3, 1, 8, 89, 7, 12, 9, 4, 78, 96, 26];
const resArr = quickSort(arr);
console.log(resArr);
// [
//     1,  3,  4,  7,  8,
//     9, 12, 26, 78, 89,
//    96
// ]
```

## 中文排序

```ts
// 中文按照首字母排序
function sortChinese(arr: Array<string>): Array<string> {
  return arr.sort((pre, cur) => {
    return pre.localeCompare(cur, "zh-CN");
  });
}

const testChinese = ["北京", "上海", "深圳", "广州", "东莞", "惠州"];
console.log(sortChinese(testChinese));
// [ '北京', '东莞', '广州', '惠州', '上海', '深圳' ]
```

## 使用 Blob 生成 uid

```js
const blob = new Blob([' ']);
const url = URL.createObjectURL(blob);
const uid = url.split('/').pop();
URL.revokeObjectURL(url);
```
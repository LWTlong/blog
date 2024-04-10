---
title: Promise
order: 2
tag:
  - JavaScript
---

Promise 在 JavaScript 异步中就是西方的耶路撒冷了。也可以说是现代异步编程的核心。五星上将麦克阿瑟曾经说过，异步操作不谈 Promise，就像吃肉不吃蒜，蹲坑没带烟。

## Promise 三种状态

> [!important]  
> `pendding`: 初始状态，没有兑现，也没有拒绝。  
> `fulfilled`: 表示操作成功。  
> `rejected`: 表示操作失败。  
> Promise 的状态是单向转换的，是不可逆的。只能从 `pendding` > `fulfilled` 或者 `pendding` > `rejected`。也就是说，一旦发起，要么成功，要么失败。

## Promise API

`Promise.all`: 全部 Promise 执行成功，或者任意一个执行失败。  
`Promise.allSettled`: 执行多个 Promise ，不论成功失败，结果全部返回。  
`Promise.any`: 接受一个 Promise 集合，返回第一个成功者。  
`Promise.race`: Promise 集合中，返回最快的 Promise 触发结果。  
`Promise.resolve`: 返回一个解析过参数的 Promise 对象，状态是成功。  
`Promise.reject`: 返回一个状态是失败的 Promise 对象。
`Promise.prototype.then`: 返回一个 Promise, 最多两个参数，成功和失败后的回调函数。
`Promise.prototype.catch`: 返回一个 Promise, 并处理被拒绝的情况。
`Promise.prototype.finally`: 返回一个 Promise, 在 Promise 结束时，无论成功或者失败，都会执行该回调。

我这里直接把静态方法和原型上的方法一起说，然后挑几个常用的写例子了。其他的可以自己去试试就知道了。

## 基本使用

```javascript
function syncFn(type) {
  return new Promise((resolve, reject) => {
    if (type) {
      // resolve 表示把 Promise 的状态变为成功
      resolve('成功');
    } else {
      // reject 表示把 Promise 的状态变为失败
      reject('失败');
    }
  });
}

// resolve 成功状态，通过 .then 接受一个参数，就是 resolve 传递过来的参数
syncFn(true).then((res) => {
  console.log('true then:', res);
});
// true then: 成功

// reject 失败状态，不会进入到 .then 里面，可以通过 catch 捕获
syncFn()
  .then((res) => {
    console.log('false then: ', res);
  })
  .catch((e) => {
    console.log('catch', e);
  });
// catch 失败


// reject 失败状态，当然不想用 catch 去捕获 reject 的失败，可以在 then 里面使用第二个参数方法捕获  但是这里需要注意的是，这么处理了 reject 的失败状态，后面的 catch 就不会被触发了
syncFn()
  .then((res) => {
    console.log('false then: ', res);
  }, (e) => {
    console.log('then e': res)
  }).catch(e => {
    console.log('catch e', e)
    // 不会被触发
  })
  // then e 失败
```

## Promise.all

全部 Promise 执行成功，或者任意一个执行失败。

Promise.all 可以等待所有的 Promise 都完成后触发：

```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p1');
  }, 300);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2');
  }, 300);
});

Promise.all([p1, p2]).then((res) => {
  console.log(res);
  // [ 'p1', 'p2' ]
});
```

但是如果有一个的状态是失败，就会进入到 catch 里：

```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p1');
  }, 3000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2');
  }, 3000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p3');
  }, 300);
});

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
    // p3
  });
```

## Promise.resolve

返回一个成功状态的 Promise 对象。

场景：当你想要异步执行某些方法，并且不堵塞的时候：

```javascript
const checkVersion = () => {
  console.log('检查版本');
};

function init() {
  let chain = Promise.resolve();
  chain.then(() => checkVersion());
  console.log('初始化');
}

init();
// 初始化
// 检查版本
```

## 处理 catch 的顺序

前面说了, `reject` 之后的状态，可以在 `then` 的第二个失败回调函数里处理，也可以在 `catch` 里面处理。

#### 第一种, `catch`

```javascript
const p1 = new Promise((resolve, reject) => {
  reject('error');
});

p1.then((res) => {
  // 不会执行
  console.log('第一个 then');
})
  .then((res) => {
    // 不会执行
    console.log('第二个 then');
  })
  .catch((e) => {
    // 执行
    console.log('catch', e);
  });
// atch error
```

#### 第二种, `then` 的第二个错误处理回调:

```javascript
const p1 = new Promise((resolve, reject) => {
  reject('error');
});

p1.then(
  (res) => {
    // 不会执行
    console.log('第一个 then');
  },
  (e) => {
    // 执行
    console.log('then reject: ', e);
  }
)
  .then((res) => {
    // 执行
    console.log('第二个 then');
  })
  .catch((e) => {
    // 不会执行
    console.log('catch', e);
  });
// then reject:  error
```

可以看见，如果在 then 里面去处理了 reject , 那么后面可以继续的传递到 then, 但是不会进入到 catch 里。

#### catch 之后接 then

`catch` 也是返回一个 `promise` , 在 `catch` 处理错误之后，可以接着调用 `then`

```javascript
const p1 = new Promise((resolve, reject) => {
  reject('error');
});

p1.then((res) => {
  // 不会执行
  console.log('第一个 then');
})
  .catch((e) => {
    // 执行
    console.log('catch', e);
    return '处理错误了';
  })
  .then((res) => {
    // 执行
    console.log('接着 catch 后面的第一个 then', res);
    return res;
  })
  .then((res) => {
    // 执行
    console.log('接着 catch 后面的第二个 then', res);
  });
// catch error
// 接着 catch 后面的第一个 then 处理错误了
// 接着 catch 后面的第二个 then 处理错误了
```

## Promise 的执行顺序

代码执行顺序，也是面试的常客了，具体考察的其实是事件循环的知识点。

```javascript
console.log('1');

const p1 = new Promise((resolve) => {
  // 定义 Promise 的时候，代码是立即执行的
  // 所以这里的代码会全部被立即执行
  console.log('2');
  resolve('resolve');
  // resolve 之后的代码也会被执行的
  console.log('3');
});

// then 这里就是微任务了 先放微任务队列里 不会被立即执行
p1.then((res) => {
  console.log('4');
});

// 宏任务 也不会被立即执行
setTimeout(() => {
  console.log('5');
}, 0);

console.log('6');

// 1
// 2
// 3
// 6
// 4
// 5
```

> [!important]
> 这里主要注意的是， `new Promise` 里面的代码会被立即执行。

## Promise resolve 之后，在报错是无效的了

Promise `resolve` 之后，在报错是无效的了。

```javascript
const p1 = new Promise((resolve) => {
  resolve('resolve');
  throw new Error('抛出一个错误');
});

p1.then((res) => {
  // 执行
  console.log(res);
}).catch((e) => {
  // 不会执行
  console.log(e);
});
// resolve
```

这是因为, Promise 的状态是不可逆的。`resolve` 之后, Promise 的状态就变成成功了。

## 值穿透概念

`then` 的参数期望的是一个回调函数，但是如果传入的不是一个函数会怎么样呢

```javascript
const p1 = new Promise((resolve) => {
  resolve('aaa');
});

p1.then(11).then((res) => {
  console.log(res);
});
// aaa
```

当它得到的不是一个函数，就会直接忽略掉，`resolve` 的值会直接继续往后面传递。

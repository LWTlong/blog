---
title: JSON对象
order: 3
#article: false
tag:
  - JavaScript
---

严格意义上 JSON 对象是不合理的，JSON 是文本协议，但是全局作用域下 JSON 名为 JSON，是 Object 对象。

## JSON 格式

JSON 是一种轻量级的，基于文本的、与语言无关的语法，用于定义数据交换格式，它来源与 ECMAScript 编程语言, 但是独立与编程语言。

#### JSON 的特征

`{}` 双括号表示对象, `[]` 中括号表示数组, `"""` 双引号内的是属性或者值。

#### JSON 键

只能是字符串，必须 **双引号** 包裹

#### JSON 值

ECMAScript 协议要求，JSON 的值，只能为 `object`、`array`、`number`、`string`、`true`、`false`、`null`

## JSON.parse

JSON.parse 接收两个参数，第一个参数是一个 JSON 字符串，注意第二个参数 `reviver(k, v) k => 属性键 , v => 属性值`， 如果 `reviver` 返回的是 `undefined` 当前这个属性就会从对象中删除

`reviver` 参数可以用来过滤数据：

```javascript
const jsonStr = `{"name": "lwt", "age": 10}`;
const obj = JSON.parse(jsonStr, (k, v) => {
  if (k === 'age') {
    // 如果返回 undefined , 这个属性就会从对象里删除掉
    return undefined;
  } else {
    return v;
  }
});
console.log(obj); // { name: 'lwt' }
```

需要注意 **遍历的顺序**, 以及 **空 key**：

```javascript
const jsonStr = `{
	"name": "lwt",
	"age": 10,
	"info": {
		"idCard": "xxxxxxxx",
		 "phoneNum": "123123",
		 "house":{
		    "house1": "xxxxx"
        }
    }
}`;
const obj = JSON.parse(jsonStr, (k, v) => {
  console.log('key', k);
  if (k === '') {
    return '123';
  }
  return v;
});
console.log(obj);
// key name
// key age
// key idCard
// key phoneNum
// key house1
// key house
// key info
// key
// 123
// 最后一个是空键 如果空键返回有值，那么会覆盖整个对象,等于直接给当前对象赋值了
```

从循环的顺序来看，应该是深度优先的，还需要注意的是 `this` 的指向，如果不使用箭头函数，那么 `this` 的指向，会指向当前属性所属的对象,比如循环到当前属性是 `idCard` 的时候 `this` 指向的是 `info` 对象。

## JSON.stringify

`JSON.stringify(value[, replacer [, space]])`

`JSON.stringify()` 方法将一个 JavaScript 对象或值转换为 JSON 字符串,如果指定了一个 `replacer` 函数，则可以选择性地替换值，或者指定的 `replacer` 是数组，则可选择性地仅包含数组指定的属性。

`replacer` 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 `null` 或者未提供，则对象所有的属性都会被序列化。

`space` 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

#### replacer 参数

`replacer` 过滤序列化数据, 作为一个函数传入的时候：

```javascript
const person = {
  name: 'lwt',
  age: 10,
  birth: '1996-05-26',
};
const jsonStr = JSON.stringify(person, (k, v) => {
  if (k === 'age') {
    return undefined;
  } else {
    return v;
  }
});
console.log(jsonStr); // {"name":"lwt","birth":"1996-05-26"}
```

`replacer` 作为一个数组传入，只会保留数组中的 key

```javascript
const person = {
  name: 'lwt',
  age: 10,
  birth: '1996-05-26',
};
const jsonStr = JSON.stringify(person, ['name', 'age']);
console.log(jsonStr); // {"name":"lwt","age":10}
```

#### space 参数

美化代码，不传的时候，没有空格缩进,传入之后，会根据传入的值生成空格，美化代码。

```javascript
const person = {
  name: 'lwt',
  age: 10,
  birth: '1996-05-26',
};
const jsonStr = JSON.stringify(person, null, 4);
console.log(jsonStr);
// {
// 	"name": "lwt",
// 	"age": 10,
// 	"birth": "1996-05-26"
// }
```

#### JSON.stringify 规则：不符合要求的值 undefined、任意的函数、Symbol

- 作为对象属性值，自动忽略
- 作为数组里的元素，序列化返回 null
- 单独序列化时，返回 undefined
- Date 返回 ISO 字符串
- 循环会引用报错
- NaN Infinity null 都会转为 null
- BigInt 会报错
- Map/Set/WeakMap 等对象，仅序列化可灭据属性

直接看代码。清晰一点，需要其他类型的值，可以自己测试一下看看

```javascript
const obj = {
  a: 'test',
  b: undefined,
  c: Symbol('test2'),
  fn: function () {
    return '123';
  },
};
console.log(JSON.stringify(obj)); // {"a":"test"}
// 作为数组元素
const obj2 = [
  'test',
  undefined,
  function () {
    return '123';
  },
  Symbol('test2'),
];
console.log(JSON.stringify(obj2)); // ["test",null,null,null]
// 单独序列化的时候
console.log(
  JSON.stringify(function () {
    return '123';
  })
);
// undefined
console.log(JSON.stringify(undefined));
// undefined
console.log(JSON.stringify(Symbol('test2')));
// undefined
```

## toJSON 方法

当对象拥有 `toJSON` 方法， `toJSON` 会覆盖对象默认的序列化方法。

```javascript
const obj = {
  name: 'lwt',
  info: {
    idCard: 'xxxxxx',
    phoneNum: '123123123',
  },
  toJSON() {
    return {
      age: 10,
    };
  },
};
console.log(JSON.stringify(obj)); // {"age":10}
```

> [!warning]
> JSON 可以进行对象拷贝，但是如果对象的值是不符合规则的值，则会被过滤，也就是丢失，这一点需要注意，在不确定对象属性值的时候，不建议直接用 JSON 去完成对象的拷贝。

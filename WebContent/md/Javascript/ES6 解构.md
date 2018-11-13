# 解构

## 数组解构

```javascript
// normal
let [a, b, c] = [1, 2, 3];
let [x, y, z] = new Set(['a', 'b', 'c']);
// nested
let [foo, [[bar], baz]] = [1, [[2], 3]];
// partial match (ignore)
let [ , , third] = ["foo", "bar", "baz"];
let [x, y] = [1, 2, 3];
let [a, [b], d] = [1, [2, 3], 4];
// collect
let [head, ...tail] = [1, 2, 3, 4];
// miss
let [foo] = [];
let [bar, foo] = [1];
let [x, y, ...z] = ['a'];
```

## 对象解构

```javascript
// normal
let { foo, bar } = { foo: "aaa", bar: "bbb" };
// complete form
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
// miss
let { baz } = { foo: "aaa", bar: "bbb" };
// rename
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// nested
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
```

## 数组对象解构

```javascript
const csvFileLine = '2018,Eric Zong,ericzonglu@126.com';
// 分别将下标为1和2的值赋给对应变量
const { 1:name, 2:email} = csvFileLine.split(',');
```

## 字符串解构

```javascript
// normal
const [a, b, c, d, e] = 'hello';
// property
let {length : len} = 'hello';
```

## 数值/布尔值解构

```javascript
// Function
let {toString: s} = 123;
let {toString: s} = true;
```

## 函数参数解构

```javascript
// Array
function add([x, y]){
  return x + y;
}
add([1, 2]);
// Object
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
// Array map
[[1, 2], [3, 4]].map(([a, b]) => a + b);
```

## 使用

### 多变量赋值

```javascript
// 交换变量
[x, y] = [y, x];
// Array
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// Object
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

### 遍历 Map

```javascript
// traverse key & value
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// traverse key
for (let [key] of map) {}
// traverse value
for (let [,value] of map) {}
```


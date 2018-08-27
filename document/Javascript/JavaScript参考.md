# API

## 对象属性遍历

| 遍历方式                          | 返回值   | 自身属性 | 继承属性 | 可枚举属性 | 不可枚举属性 | Symbol属性 |
| --------------------------------- | -------- | -------- | -------- | ---------- | ------------ | ---------- |
| for ... in                        | -        | √        | √        | √          | ×            | √          |
| Object.keys(obj)                  | 数组     | √        | √        | √          | ×            | √          |
| Object.getOwnPropertyNames(obj)   | 数组     | √        | √        | √          | √            | √          |
| Object.getOwnPropertySymbols(obj) | 数组     | ×        | ×        | ×          | ×            | ×          |
| Reflect.ownKeys(obj)              | 数组     | √        | √        | √          | √            | √          |
| Reflect.enumerate(obj)            | Iterator | ?        | ?        | ?          | ?            | ?          |

注：Reflect.enumerate(obj) 主流宿主环境未实现。

# 性能

## 内存分配

| 创建方式      | 描述           |
| ------------- | -------------- |
| {}            | 创建一个新对象 |
| []            | 创建一个新数组 |
| function() {} | 创建一个新函数 |

# 其他 

## 中英文对照

| 英文                          | 中文               |
| ----------------------------- | ------------------ |
| Temporal Dead Zone，TDZ       | 暂时性死区         |
| Callback hell                 | 回调地狱           |
| pyramid of doom               | 毁灭金字塔         |
| resolve                       | 决议               |
| fulfill                       | 完成               |
| reject                        | 拒绝               |
| transpiling                   | 转译               |
| shims                         | 垫片               |
| polyfills                     | 填补               |
| spread                        | 扩散 ...           |
| rest                          | 剩余               |
| interpolation                 | 插值，自动内联求值 |
| Basic Multilingual Plane，BMP | 基本多文种平面     |
| surrogate pair                | 代理对             |
| Combining Diacritical Marks   | 组合变音符号       |
| sticky mode                   | 粘性模式           |
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

| 英文                                    | 中文                  |
| --------------------------------------- | --------------------- |
| Temporal Dead Zone，TDZ                 | 暂时性死区            |
| Callback hell                           | 回调地狱              |
| pyramid of doom                         | 毁灭金字塔            |
| resolve                                 | 决议                  |
| fulfill                                 | 完成                  |
| reject                                  | 拒绝                  |
| transpiling                             | 转译                  |
| shims                                   | 垫片                  |
| polyfills                               | 填补                  |
| spread                                  | 扩散 ...              |
| rest                                    | 剩余                  |
| interpolation                           | 插值，自动内联求值    |
| Basic Multilingual Plane，BMP           | 基本多文种平面        |
| surrogate pair                          | 代理对                |
| Combining Diacritical Marks             | 组合变音符号          |
| sticky mode                             | 粘性模式              |
| machine epsilon                         | 机器精度              |
| build-in function/native function       | 内建函数/原生函数     |
| loose equals/strict equals              | 宽松相等/严格相等     |
| losse not-equals/strict not-equals      | 宽松不相等/严格不相等 |
| abstract equality                       | 抽象相等              |
| abstract relational comparison          | 抽象关系比较          |
| statement completion value              | 语句值                |
| statement-series comma operator         | 语句系列逗号运算符    |
| chained assignment                      | 链式赋值              |
| labeled-loop jump                       | 带标签的循环跳转      |
| Automatic Semicolon Insertion, ASI      | 自动分号插入          |
| yield delegation                        | yield 委托            |
| objects linked to other objects, OLOO   | 连接到其他对象的对象  |
| global symbol registry                  | 全局符号注册          |
| Asynchronous Module Definition, AMD     | 异步模块定义          |
| Universal Module Definition, UMD        | 通用模块定义          |
| named export                            | 命名导出              |
| default export                          | 默认导出              |
| module specifier                        | 模块指定符            |
| namespace import                        | 命名空间导入          |
| meta property                           | 元属性                |
| introspection                           | 内省                  |
| Well-Known Symbol, WKS                  | 公开符号              |
| revocable proxy                         | 可取消代理            |
| split delivery                          | 分批发布              |
| Proper Tail Call, PTC                   | 正确尾调用            |
| Tail Call Optimization, TCO             | 尾调用优化            |
| Single Instruction, Multiple Data, SIMD | 单指令多数据          |
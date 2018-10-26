# 简介



# 关于版本

AutoHotkey Basic：即 AutoHotkey 1.0。

AutoHotkey_L：即 AutoHotkey_L。但 AutoHotkey_L 的一些旧版本也使用 1.0.* 版本号。

# 基本语法

## 变量

**变量** 是脚本用来存储文本或数字的内存块。

### 变量类型

AutoHotkey 没有明确的变量类型。形式上所有变量都可以当作字符串。

“数值型”的变量可以自动转换为数值进行数学运算或比较。

### 变量声明

变量不需要声明。

变量名可以包括字母、数字以及 # _ @ $ 符号；不区分大小写；长度上限为 253 个字符；不能是 and, or, not 等有特殊含义的单词；可以完全由数字组成，但通常用于命令行参数。

赋值分为传统方法（=）和表达式方法（:=）。

获取变量内容也分为传统方法（变量名包围在一对百分号中）和表达式方法（直接使用变量名）。

### 变量的作用域

除了函数中的局部变量外, 所有的变量都是全局的。

## 表达式

表达式用来对一系列变量，原义字符串和/或原义数字执行一个或多个操作。

表达式中，字符串和变量都应使用表达式语法，即字符串用双引号引起来、变量使用变量名直接引用而不需要包围在百分号中。

### 类真 vs. 类假

表达式结果为空或 0 视为假，否则视为真。

根据类真/假，可以简写 if 语句：`if Var`。

### 布尔值

没有布尔类型。true 和 false 是值为 1 和 0 的内置变量，使用它们仅仅是增加可读性而已。

### 数值

表达式中，含有小数点的数字为浮点数，否则为整数。

整数可表示为十进制或十六进制（0x 开头）。

浮点数可使用科学计数法，但必需包含小数点，如：`1.0e8`。

### 转换

一些参数不支持表达式，则需要为表达式加上百分号和空格/tab 前缀进行转换。

# 资源

[官网](https://www.autohotkey.com/)

[AutoHotkey中文化项目](https://sourceforge.net/projects/ahkcn/)

[英文论坛](https://autohotkey.com//boards/index.php)

[中文子论坛](https://autohotkey.com/boards/viewforum.php?f=26)

[中文教程](http://ahkcn.sourceforge.net/docs/Tutorial.htm)

[中文学习指南](https://autohotkey.com/boards/viewtopic.php?f=29&t=1099&sid=2e60a64848a3017955f762075968ad8c)

## 帮助文档

[ahkcn.sourceforge.net](http://ahkcn.sourceforge.net/docs/AutoHotkey.htm)（中文 v1.1.15.01）：更新截止到 2014.6。

[thinkai.net](http://thinkai.net/help/1.1/)（中文 v1.1.22.07）

## 教程

[AHK 快餐店系列教程 - 小众软件](https://www.appinn.com/ahk-fast-food-restaurant/)

## 问题交流

[stackoverflow](https://stackoverflow.com/questions/tagged/autohotkey)




# 文件结构

一个 YAML 文件可以由多个文档组成，文档以“---”作为开始分隔符，“...”作为结束符（可选）。

只有单个文档时，开始分隔符可省略。

文档结束符是可选的，但对于网络传输，明确的结束符有利于软件处理。

# 格式说明

YAML 使用 Unicode 编码作为字符标准编码，如 UTF-8。

行注释符为“#”。

使用空格作为嵌套缩进工具。

## 文本

使用“|”标记多行文本，并保留换行。

```yaml
multi: |
  这是一个多行文本
  换行会被保留
```

使用“>”折叠多行文本，将换行替换为空格，使用空行来分段。

```yaml
multi: >
  多行文本会被合并为一行，
  换行将替换为空格后合并。
  
  空行可用以分段。
```

使用定界符将多行文本表示成一行，定界符包括：双引号、单引号、换行。

## 序列

使用“- ”（注意横线后带空格）作前缀表示单个列表项。

```yaml
- 第一项
- 第二项
```

使用“[]”表示数组。

```yaml
[first, second, third]
```

## 键值表

使用“: ”（注意冒号后带空格）作前缀表示键值对。

```yaml
name: Eric
```

使用“{}”表示键值表。

```yaml
items: {first: red, second: green, third: blue}
```

使用“? ”（注意问号后带空格）作前经表示复杂键。

```yaml
? [male, female]: gender
```

## 锚点引用

使用“&”定义数据锚点，使用“*”引用锚点 。

```yaml
- &MK 项目一
title: *MK
```

# 数据类型

```yaml
 integer: 12345     # 整数标准形式
 octal: 0o34        # 八进制表示，第二个是字母 o
 hex: 0xFF          # 十六进制表示
 
 float: 1.23e+3     # 浮点数
 fixed: 13.67       # 固定小数
 minmin: -.inf      # 表示负无穷
 notNumber: .NaN    # 无效数字
 
 null:              # 空值
 boolean: [true, false] # 布尔值
 string: '12345'    # 字符串
 
 date: 2015-08-23   # 日期
 datetime: 2015-08-23T02:02:00.1z  # 日期时间
 iso8601: 2015-08-23t21:59:43.10-05:00  # iso8601 日期格式
 spaced: 2015-08-23 21:59:43.10 -5      # ?
```

使用“!”指定数据类型，单叹号表示自定义类型，双叹号表示内置类型。

```yaml
isString: !!str 2015-08-23     # 强调是字符串不是日期数据
picture: !!binary |            # Base64  图片
    R0lGODlhDAAMAIQAAP//9/X
    17unp5WZmZgAAAOfn515eXv
    Pz7Y6OjuDg4J+fn5OTk6enp
    56enmleECcgggoBADs=
#下面是内置类型
!!int               # 整数类型
!!float             # 浮点类型
!!bool              # 布尔类型
!!str               # 字符串类型
!!binary            # 也是字符串类型
!!timestamp         # 日期时间类型
!!null              # 空值
!!set               # 集合
!!omap, !!pairs     # 键值列表或对象列表
!!seq               # 序列，也是列表
!!map               # 键值表
```


# 忽略文件

.gitignore 格式规范：

* \# 注释
* 标准glob模式
* 以（/）开头防止递归
* 以（/）结尾指定目录
* 模式取反（!）

glob 模式， shell 所使用的简化了的正则表达式。

| *    |                          |
| ---- | ------------------------ |
| []   | \[abc\] \[0-9\]          |
| ?    |                          |
| **   | 匹配任意中间目录，a/**/z |
| !    | 取反                     |

忽略文件列表：[https://github.com/github/gitignore](https://github.com/github/gitignore)

# 创建库


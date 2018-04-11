# 忽略文件

.gitignore 格式规范：

* \# 注释
* 标准 glob 模式
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

通常有两种方式，但无论如何，总需要事先创建一个远程仓库。

方法一：

```git
git clone <URL>
```

> 说明：该方法适用于全新开始建库。结果是将克隆一个“空”的库。

方法二：

```git
# 在工程根目录执行
git init
git add .
git commit -m "comment"
git remote add origin <URL>
# 场景1：远程仓库不为空
git pull --rebase origin master
# 场景2：远程仓库为空
git push -u origin master
```

> 说明：该方法适用于中途建库。基本思路是，首先创建本地仓库，然后指定远程仓库，最后将本地内容推送到远程仓库。其中可能出现两种场景，一种是远程仓库为空，另一种是不为空。前者很简单，直接推送即可；后者由于远程仓库已有内容，所以需要先拉取并变基，然后才能推送。
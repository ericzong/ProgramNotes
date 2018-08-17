# 配置

> 在使用 Git 管理工程前，应该事进行一些配置工作，这可能是全局的或工程相关的。

## 忽略文件

> 工程目录下总有一些文件是不需要版本控制的，因此我们希望 Git 能自动忽略这些文件。这需要通过配置文件 .gitignore 来进行配置，该文件通常放置于工程根目录下。

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

## 必要配置

> 有一些配置很重要。
>
> 比如：用户名和邮件地址。当进行提交操作时，提交历史中会记录操作者的用户名和邮件地址。因此，我们应该将其事先配置好。

```shell
git config --global user.name <USERNAME>
git config --global user.email <EMAIL>
```

> 说明：--global 选项指明该配置是全局的，但如果仅仅想当前工程使用该配置，则不要指定 --global 选项。

## 技巧

### 别名

> Git命令行不带命令补齐功能，因此，如果不想重复输入冗长的命令，可以为命令设置别名。

```shell
# 配置别名，示例：git config --global alias.co checkout
git config --global alias.<ALIAS> <COMMAND>
```

### 外部命令

使用 !command 调用外部命令，当然，也可以将其设置为别名。

## 其他

```git
# 编辑器
git config --global core.editor=vim
```

# 日常使用

## 创建库

通常有两种方式，但无论如何，总需要事先创建一个远程仓库。

方法一：

```shell
git clone <URL>
```

> 说明：
>
> 该方法适用于全新开始建库，结果是将克隆一个“空”的库；或者克隆一个已经存在的库继续工作。
>
> clone一个仓库时，会自动将其添加为远程仓库，默认简写“origin”。
>
> clone会自动设置默认分支（通常是master分支）跟踪。

方法二：

```shell
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

## 暂存区操作

### 添加、移除

```shell
git add <.|FILES>
git reset HEAD [FILES]
```

> 说明：
>
> “git add .”将把当前工作目录中所有改变加入暂存区。注意，它的影响是递归的。
>
> 对于 SVN 而言，新建的文件（未跟踪）才可以添加到索引；而对于 Git 而言，可添加到暂存区的文件不仅包括新建的未跟踪文件，还包括已修改的跟踪文件。
>
> git reset HEAD不指定文件则清空暂存区。

### 删除

```shell
git rm [--force|-f] --cached <FILES>
```

> 说明：
>
> 简而言之，该命令的效果就是清除暂存文件，并使工作副本文件不再被跟踪。
>
> 换句话说，如果文件没有暂存，执行该命令是无效的。
>
> 文件可用 glob 模式指定，如：
>
> ```shell
> git rm log/\*.log
> git rm \*~
> ```
>
> 注意，其中的“*”使用了“\”进行转义，这是因为 Git 自己处理模式，而不需要 shell 帮忙展开。
>
> 根据文件状态讨论下该命令的效果。
>
> | 当前状态 | 结果状态 | 必须 -f ？ | 文件版本 |
> | -------- | -------- | ---------- | -------- |
> | A        | ??       | N          | 工作副本 |
> | AM       | ??       | Y          | 工作副本 |
> | M        | D        | N          | 工作副本 |
> | MM       | D        | Y          | 工作副本 |
>
> 总结：
>
> 1. 不影响工作副本文件；
> 2. 对于新增文件，将还原为未跟踪状态；而修改的文件，将标记为删除。
> 3. 当暂存后又进行了修改，则需要加 -f 强制删除。因为此时，暂存的文件跟原文件和工作副本都不相同，删除可能存在内容丢失。
> 4. 命令执行后，仍可以使用 add 命令将文件重新加入暂存区。需要注意的是，已跟踪的文件重新加入暂存区后，状态是 M（右），因为它仍和原文件不同，是修改过的。

### 移动/重命名

```shell
git mv <FILE_FROM> <FILE_TO>
```

> 说明：
>
> 移动或重命名。
>
> 不能操作未跟踪的文件。
>
> 等价于如下操作：
>
> ```shell
> mv <FILE_FROM> <FILE_TO>
> git rm <FILE_FROM>
> git add <FILE_TO>
> ```

### 提交

```shell
git commit -m <COMMENT>
# 修改上一次提交
git commit --amend
```

> 说明：命令执行后 Git 会打开编辑器用以修改上次提交的注释。如果命令执行前暂存区为空，则仅仅修改了上一次的提交注释；但是如果暂存区有文件，则会合并入上一次提交的历史记录中。

## 工作区还原

```shell
git checkout <FILES>
```

> **注意：这是一个危险操作，工作副本将被覆盖。**

## 已提交未推送查询

```shell
# 次数
git status 
# 描述
git cherry -v
# 详细信息
git log master ^origin/master
```

## 远程仓库操作

### 查看

```shell
# 查看所有远程服务器简写、地址
git remote [-v | --verbose]
# 查看某远程仓库信息
git remote show [REMOTE_NAME]
```

### 添加、移除和重命名

```shell
# 添加远程仓库
git remote add <SHORT_NAME> <URL>
# 重命名
git remote rename <OLD_SHORT_NAME> <NEW_SHORT_NAME>
## 移除
git remote rm <MISS_NAME>
```

> 注意：
>
> 远程仓库简写名只是本地仓库简化远程仓库地址的一种方式，它不存在于远程仓库中，对于多个本地仓库而言，重命名只会修改自身信息，不会影响其他本地仓库。

### 获取/抓取、拉取

```shell
git fetch [REMOTE_NAME]
git pull
```

> 说明：
>
> git fetch将数据获取到本地仓库，并不会自动合并或修改工作副本。
>
> git pull效果相当于在fetch的基础上，合并到当前分支。

### 推送

```shell
# 示例：git push origin master
git push [REMOTE_NAME] [BRANCH_NAME]
```



## 标签

> 分类：轻量标签（lightweight）、附注标签（annotated）。
>
> 轻量标签：特定提交的引用。像一个不会改变的分支。
>
> 附注标签：存储在Git数据库中的一个完整对象。可校验，有附加信息。
>
> 建议创建附注标签，因为即可拥有附加信息等，轻量标签通常作为临时标签。

### 查看

```shell
# 查看标签列表，示例：git tag -l 'v1.0*'
git tag [-l <PATTERN>]
# 查看标签信息及对应的提交信息
git show <TAG>
```

> 说明：git show命令查看附注标签和轻量标签反馈信息区别在于，附注标签会显示额外的标签信息，而轻量标签没有。

### 添加、删除

```shell
# 附注标签
git tag -a <ANNOTATE> -m <MESSAGE>
# 轻量标签
git tag <TAG>
# 补打标签，示例：git tag v0.0.1 e6d105
git log --pretty=oneline
git tag -a <TAG> <CHECK_SUM>
# 删除本地标签
git tag -d <TAG>
```

> 说明：
>
> 标签本质上来说是对某次提交的引用，因此，补打标签则需要指定某次提交即可。而提交需使用其校验和来指定，故提供校验和（或部分校验和）即可。

### 共享、移除

```shell
# 推送单个标签
git push origin [TAG]
# 推送多个标签
git push origin --tags
# 移除
git push origin --delete [tag] <TAG>
```

> 说明：
>
> 默认，git push不会推送标签到远程仓库。要推送必须显式指定。
>
> 对于GitHub等公共的Git服务而言，标签一般被用来标注发布点，因此，当一个标签被推送到其上时，会压缩生成一个Release以供下载。

### 检出

```shell
git checkout -b [BRANCH_NAME] [TAG]
```

> 说明：由于标签仅仅是对提交的引用，因此，并不能检出一个标签。如果想在某个标签状态下工作，只能将该标签检出为一个新分支。

## 查看状态

> 当需要进行 Git 操作时，通常都会先查看各文件的状态，以确定哪些文件会被处理，怎样处理。

```shell
# 默认是详细模式
# 当使用 --short 选项或其缩写 -s 时显示简览
git status [-s|--short]
```

> 说明：详细模式下会分状态列出各文件，并列出可进行的命令提示。简览模式下会每行列出一个文件，并在行首用标记标明其状态。

简览模式标记：

| 标记    | 描述               |
| :------ | ------------------ |
| ??      | 未跟踪             |
| A       | 新添加到暂存区     |
| M（左） | 被修改并放入暂存区 |
| M（右） | 被修改未放入暂存区 |

> 说明：
>
> 状态标记占2个字符的位置。从 M 标记有左右之分也可以看出来。
>
> 如果使用的是可着色的命令行，可以看出，已加入暂存区的标记是绿色的，如：A 和 M（左）；否则是红色的，如：?? 和 M（右）。
>
> MM 标记是可能的，即 M（左）和 M（右）标记不是互斥的。因此，对于 Git 而言，暂存操作不是仅仅标记文件，而是把暂存操作时的文件副本保存到了暂存区。可以想像这样的情况，某个文件被加入暂存区后，又被修改了，此时，对于这个文件而言，它的第 1 个版本被暂存了，但当前版本没有被暂存。所以其标记为 MM，即表示暂存后又被修改过。类似的 AM 也是可能的。
>
> 注意一点，有的命令选项是可以缩写的，但是完整选项是以“--”（双短线）为前缀的，而缩写是以“-”（单短线）为前缀的。

## 比较差异

```shell
git diff [--cached] [<PATH>...]
```

## 查看日志

```shell
git log [-p] [-n] [--stat] [--pretty=oneline|short|full|fuller] --graph
```


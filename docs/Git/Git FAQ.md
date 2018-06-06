# 配置

## SSL certificate problem

触发场景：push 操作时。

原因：Git 默认使用 SSL 连接，如果未做相关配置，仅使用 https 连接，则出现该错误。

```git
git config --global http.sslVerify false
# or
set GIT_SSL_NO_VERIFY=true git push
```

## 命令回显中文为转义字符

触发场景：status 等命令时。

原因：默认不处理 UTF-8文件名。

```false
git config --global core.quotepath false
```

## 将空文件夹加入版本控制

Git只跟踪文件，不跟踪文件夹，也就是说空文件夹将不会被加入版本控制中。

但有的情况下，我们的确需要将空文件夹加入版本控制，这怎么办呢？

简单来说，如果文件夹不为空就行了，即在空文件夹下创建一个任意的文件即可。但通常我们又不想把这个任意文件加入版本控制，那么，只要在空文件夹下创建一个名为“.gitkeep”的文件就可以达到效果了。

# 操作

## 创建分支失败

```git
$ git branch v1
fatal: Not a valid object name: 'master'.
```

通常这意味着当前仓库是新创建的，git init命令不会创建master分支，只有当提交时才会创建。

不过，直接提交一个空仓库是不被允许的，因此，应该添加一些文件再提交。
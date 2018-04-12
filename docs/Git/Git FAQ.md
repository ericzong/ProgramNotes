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


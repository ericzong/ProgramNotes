# 下载 chromium “被墙”

安装 puppeteer 默认会下载 Chromium，但下载地址被“墙”，所以会下载失败。

**解决方案一**：科学上网，自行学习。

**解决方案二**：设置环境变量或安装命令参数，不在安装步骤中下载绑定 Chromium。

```shell
# 设置环境变量
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
# 安装参数
npm i --save puppeteer --ignore-scripts
```

如不绑定，则需要在代码中指定使用的 Chromium 的路径。

**解决方案三**：使用第三方的镜像地址。这又分两种：通过 cnpm 或 指定 Chromium 下载主机。

cnpm 安装并注册镜像服务地址，然后使用 cnpm 安装 puppeteer：

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

通过环境变量指定 Chromium 下载主机：

```shell
set PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors
```


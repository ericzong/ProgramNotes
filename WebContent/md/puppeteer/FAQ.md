# 安装配置

## 下载 chromium “被墙”

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

# API

## page.waitForNavigation([options])

通常用于等待间接的（比如：点击链接等）页面跳转，代码类似下面这样：

```javascript
await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'domcontentloaded']}),
    expect(target).toClick(selector, options)
]);
```

配置参数 `{waitUntil: ['load', 'domcontentloaded']}` 指明将等待跳转到的页面加载完成。

关键点在于，正如函数名 `waitForNavigation` 指明的一样，它将等待导航开始。换句话说，如果某个操作没有引起页面跳转（比如只是局部刷新），那么，通常将得到一个等待导航超时的异常。
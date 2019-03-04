# 简介

nvm 是 Node.js 的一个多版本管理工具，可以灵活的切换 Node.js 版本。

# 下载

https://github.com/coreybutler/nvm-windows/releases

nvm 有两种安装包：安装版与绿色版。

# 安装

## 绿色版

### 解压压缩包

解压到任意目录作为 nvm 根目录，比如：C:/nvm （需全英文）。

### 创建配置文件

在 nvm 根目录新建 settings.txt 文件，添加类似如下配置信息：

```
root:C:/nvm
path:C:/nvm/nodejs
arch:64
proxy:
```

* root：nvm 根目录
* path：node 快捷方式路径
* arch：当前操作系统位数（32/64）
* proxy：代理地址（可选）

### 配置环境变量

**新增**

NVM_HOME：nvm 根目录（同配置文件中的 root）

NVM_SYMLINK：node 快捷方式路径（同配置文件中的 path）

**修改**

PATH：追加 %NVM_HOME%;%NVM_SYMLINK%

## 安装版

使用可执行文件安装是最简单的，安装向导会询问 nvm 的安装路径及 node 快捷方式路径，然后会自动生成配置文件，并配置环境变量。

# 安装 node

```shell
nvm install <node_version>
```

执行安装命令并指定 node 版本号即可进行安装。安装完成后，使用 use 命令切换要使用的 node 版本。

```
nvm use <node_version>
```

注：版本号可使用 latest 指代最新版本。

# 常用命令

```
nvm version					 // 查看 nvm 版本
nvm install <node_version> 	  // 安装 node 版本
nvm uninstall <node_version>  // 卸载 node 版本
nvm list 				    // 查看已安装 node 版本
nvm use <node_version>		 // 切换到指定 node 版本
nvm root 					// 查看 nvm 根目录
```

# 原理

安装某版本的 node 后，会发现 nvm 根目录下多了一个该版本（比如：v11.0.0）的文件夹，node 的文件都在其下。

同时，会生成一个上文配置的 node 的快捷方式，比如：C:/nvm/nodejs，它指向当前使用的 node 版本文件夹。

# 附录

## 全英文目录

nvm 根目录和 node 快捷方式路径都应该是全英文的。因为，最终它们都会被加入 path 环境变量中，而当 path 环境变量中存在中文等非英文字符时，一些依赖 path 的软件会出现问题。

总之，path 中应尽量保证均为全英文路径。

## 配置镜像

“墙”是常态，所以这些自带中央仓库并且服务器在外国的软件总是需要配置镜像的。

在 nvm 的配置文件 settings.txt 中追加镜像信息（这里以淘宝镜像为例）：

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```


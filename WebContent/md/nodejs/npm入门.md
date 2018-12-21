# 安装

现在，npm 已成为 node 的内置应用，安装 node 时即安装 npm。

# 配置 

## 相关路径

| 名称             | 路径                               |
| ---------------- | ---------------------------------- |
| 包全局命令目录   | ~/AppData/Roaming/npm              |
| 包全局目录       | ~/AppData/Roaming/npm/node_modules |
| 用户全局配置文件 | ~/.npmrc                           |

```shell
# 配置包全局目录
npm config set prefix <MY_NPM_DIR>
# 查看包全局目录
npm root -g
# 配置cache目录
npm config set cache <MY_CACHE_DIR>
```

## 镜像

```shell
# 添加淘宝镜像
npm config set registry https://registry.npm.taobao.org
# 查看配置信息，其中包含用户配置文件的路径，也可直接修改配置文件（不推荐）
npm config list
```

# 使用

## 创建项目

```shell
npm init
```

## 包管理

```shell
# 查看全局安装位置及已安装包
npm list -g --depth=0
# 查看本地已安装包
npm list

# 全局安装
npm install -g <module>
# 本地安装，安装位置为当前目录下的 node_modules 目录
npm install <module>
# 指定安装版本
npm install <module>@<version>
# 安装多个模块
npm install <module1> <module2> ...
# 安装 package.js 中的依赖包
npm install
# 安装模块并保存到 package.json 文件的 dependencies 属性
npm install --save <module>
# 安装模块并保存到 package.json 文件的 devDependencies 属性
npm install --save-dev <module>

# 卸载模块
npm uninstall <module>[@<version>]

# 更新模块，版本号（大.小.次）只能更新小版本号
npm update [--save] <module>[@<version>]
```


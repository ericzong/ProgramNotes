# 简介

[Scoop](https://scoop.sh/) 是一个 Windows 命令行安装器，可以从命令行安装和管理各种应用。

它依赖于 Powershell 3+ 和 .NET Framework 4.5+。

# 安装

命令行执行如下命令即可安装：

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

如果出现错误，执行以下命令：

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

## 自定义安装位置

scoop 默认安装位置是：~/scoop，如下命令可自定义安装位置。

```powershell
[environment]::setEnvironmentVariable('SCOOP', 'D:\program\scoop', 'User')
$env:SCOOP='D:\program\scoop'
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

## 自定义应用全局安装位置

scoop 安装全局应用的默认位置是：\ProgramData\scoop，如下命令可自定义应用安装位置。

```powershell
[environment]::setEnvironmentVariable('SCOOP_GLOBAL','D:\program\scoop-apps','Machine')
$env:SCOOP_GLOBAL='D:\program\scoop-apps'
scoop install -g <APP-NAME>
```

默认情况下，scoop 仅为当前用户安装应用，默认路径是 scoop\apps。

如果需要全局安装，则安装命令需要增加 `-g` 或 `--global` 参数。

## 卸载

```powershell
scoop uninstall scoop
```

# 使用

## 常用命令

```powershell
# 查看帮助
scoop help 
# 查看已安装的应用
scoop list
# 安装应用
scoop install <APP-NAME>
# 卸载应用
scoop uninstall <APP-NAME>
# 更新 scoop 或应用
scoop update [APP-NAME]
scoop update *
```

## 资源库

作为一个“软件包安装器”，scoop 使用 Buckets 来定义软件源。并且提供了一个[main bucket](https://github.com/lukesampson/scoop/tree/master/bucket)；同时，还提供了一个[extras bucket](https://github.com/lukesampson/scoop-extras)，一些不符合主库标准的应用放在这里。

使用如下命令为 scoop 添加扩展库：

```powershell
scoop bucket add extras
```

scoop 不是软件包管理器，而只是安装器。Buckets 所定义的不是软件库，而是软件信息及安装方法，因此，其包含的不是软件本身，而是信息清单——它们被存储在 GitHub 上。

# 上手

## 命令

通过 `scoop help` 来查看可用的命令列表，`scoop help <CMD>` 来查看具体命令的使用。

```powershell
scoop help
scoop help <CMD>
```

## 应用

如果不知道有哪些应用可安装，一方面可以查看各库的 GitHub，另一方面可以使用 `scoop search` 命令来查看。

该命令会列出包含指定查询字符串的所有应用，因此，不必知道应用全名。

```powershell
scoop search <QUERY>
```

## Buckets

查看有哪些官方的扩展库可用，可以用以下命令：

```powershell
scoop bucket known
```

当然也可以创建自己的 Bucket。

# 示例

## 切换 JDK 版本

```powershell
scoop install openjdk12
scoop install openjdk11
java -version
# openjdk version "11.0.1" 2018-10-16
scoop reset openjdk12
java -version
# openjdk version "12-ea" 2019-03-19
```

# 参考

## 常用命令列表

| 命令       | 说明                                                   |
| ---------- | ------------------------------------------------------ |
| alias      | Manage scoop aliases                                   |
| bucket     | Manage Scoop buckets                                   |
| cache      | Show or clear the download cache                       |
| checkup    | Check for potential problems                           |
| cleanup    | Cleanup apps by removing old versions                  |
| config     | Get or set configuration values                        |
| create     | Create a custom app manifest                           |
| depends    | List dependencies for an app                           |
| export     | Exports (an importable) list of installed apps         |
| help       | Show help for a command                                |
| home       | Opens the app homepage                                 |
| info       | Display information about an app                       |
| install    | Install apps                                           |
| list       | List installed apps                                    |
| prefix     | Returns the path to the specified app                  |
| reset      | Reset an app to resolve conflicts                      |
| search     | Search available apps                                  |
| status     | Show status and check for new app versions             |
| uninstall  | Uninstall an app                                       |
| update     | Update apps, or Scoop itself                           |
| virustotal | Look for app's hash on virustotal.com                  |
| which      | Locate a shim/executable (similar to 'which' on Linux) |

## 资料

[官方 GitHub Wiki](https://github.com/lukesampson/scoop/wiki)


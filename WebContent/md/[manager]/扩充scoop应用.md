# 关于应用库

scoop 是一个安装器（installer ），因此，不同于软件管理器，它不需要维护软件包，只是提供应用清单（app manifests）。

应用清单描述如何安装应用，应用清单存放在 bucket 中，我们就称其为“应用库”吧。

scoop 安装后，默认提供了一个主应用库（main），其中包含很多常用的软件，但很可能我们想用的应用不在其中。不用担心，scoop 还提供了一些附加应用库，它们提供了更多丰富的应用。

我们可以使用如下相关命令：

```shell
# 查看附加库列表
scoop bucket known
# 添加附加库（库名来源于上个命令的查询结果）
scoop bucket add <bucket-name>
```

这样，我们就可以通过 scoop 安装绝大多数的应用了，但是，这不可能是全部。不过，scoop 支持添加自定义的应用库。

下面来看看如何创建一个应用库。

# 创建应用库

要创建应用库其实很简单，应用库实质上是一个 GitHub 仓库，因此，在自己的 GitHub 帐号下新建一个仓库，你就得到了一个应用库。并且通过以下命令就可以添加到 scoop 中：

```powershell
# 添加应用库（指定库名和库 GitHub 地址）
scoop bucket add my-bucket https://github.com/<your-username>/my-bucket
# 查看已添加的应用库列表（新添加的应用库应该也在其中）
scoop bucket list
```

不过，目前为止，我们该应用库中尚未包含任何应用。应用库以应用清单的形式提供应用，因此，我们还需要添加应用清单。

# 应用清单

所谓“应用清单”，实质上就是一个 JSON 文件，文件中使用一个 JSON 对象提供应用信息。

## 简单示例

比如，在仓库根目录创建文件“hello.json”，其内容大致如下：

```json
{
    "version": "1.0",
    "url": "https://.../hello.ps1",
    "bin": "hello.ps1"
}
```

这样，就在自己的应用库中添加了一个名为“hello”的应用，通过应用名就可以搜索或安装它：

```powershell
# 搜索应用
scoop search hello
# 安装
scoop install hello
```

当然，以上命令有效的前提是已经添加了自定义的应用库。

## 属性配置

前文只给出了一个简单的应用清单示例，不过，应用清单中的 JSON 对象有很多配置属性，主要分为 [必要属性](https://github.com/lukesampson/scoop/wiki/App-Manifests#required-properties) 和 [可选属性](https://github.com/lukesampson/scoop/wiki/App-Manifests#optional-properties)，详细说明请参考官方 Wiki。

通常，要一个应用清单是可用的，至少必须配置必要属性，即 version 和 url，分别指定应用版本和下载地址。这样，scoop 就可以依此判断应用状态，以正确执行各种命令。而可选属性并非总是可缺省的，这取决于应用的形式，下文应用清单示例会进行相关说明。

## 自动更新

当应用版本升级时，可以手动维护应用清单，以升级相关信息，主要包括：版本号（version）、下载地址（url）、哈希码（hash）等。

但是，手动维护工作量很大，所以，scoop 提供了自动更新应用清单的功能，只是需要进行相关属性配置即可启用。

简单来说，需要配置 checkver 和 autoupdate 两个参数，前者用以获取最新版本，后者用以获取更新的下载地址和哈希码等。

### 自动更新配置

自动更新配置结构大致如下：

```json
{
    ...
    "checkver": ...,
    "autoupdate": {
        "architecture": {
            "64bit": {
                "url": ...
            },
            "32bit": {
                "url": ...
            }
        },
        "hash": {
            "url": ...,
            "find": ...
        }
    }
}
```

通常，配置的难点在于，checkver 和 autoupdate.hash.find 的配置，因为，它们的配置方式有多种，需根据实际情况选择。具体可参考下文相关示例。

### 更新应用清单

scoop 提供了一个脚本，位于 scoop\apps\scoop\current\bin\checkver.ps1，用以更新应用清单。不过，通常我们不会直接使用该脚本，而是使用有批处理能力的 checkver.ps1 脚本，它位于任一已知应用库 bin 目录下，比如：scoop\buckets\extras\bin\checkver.ps1。我们应在自定义的应用库中创建一个 bin 目录，并将该脚本拷贝过去。

这样，我们在应用库根目录就可以执行以下命令：

```powershell
# 查看某应用版本
./bin/checkver.ps1 <app>
# 查看当前库所有应用版本
./bin/checkver.ps1 *
# 更新某应用版本（可自动更新）
./bin/checkver.ps1 <app> -u
# 更新当前库所有可自动更新应用版本
./bin/checkver.ps1 * -u
```

更新命令会将应用清单文件修改到最新版本。

## 持久化数据

默认情况下，升级应用时，通常相当于全新安装新版本，安装目录下的所有数据或配置文件都不会自动迁移。

scoop 使用 persist 属性来配置处理这些需要持久化的数据或配置文件。原理是安装时将这些文件保存在 scoop/persist/\<app\> 目录下，应用版本目录下创建相应的目录联接（对于目录）或硬链接（对于文件）。

持久化的数据通常是安装后就存在的文件（夹），如果不存在会被视为目录处理。

### 持久化配置

配置应该如下面这样：

```json
{
    "persist": [
        "keeps_its_name",
        ["original_name", "new_name_inside_the_data_dir"]
    ]
}
```

persist 属性可以是一个字符串，当且仅当只有一个文件（夹）需要持久化时；通常，它是一个数组，列出了所有需要持久化的文件（夹）。当然，可以为持久化目录中的文件（夹）取不同的名字，像上面配置示例那样给出一个两个元素的子数组，两个元素分别指定原名称和数据存储别名即可。

### 卸载时清理数据

另一点需要注意的是，带有持久化数据的应用在被卸载时，默认不会删除持久化数据，除非卸载命令指定 -p（purge）标志。

```powershell
scoop uninstall -p <app>
```

## 配置参考

scoop 提供了多个应用库，每个库中都有很多应用清单可供参考。并且这些库都被同步到了本地，所以，很方便地就可以进行浏览查看。

主应用库位于：scoop\apps\scoop\current\bucket\，其他添加的应用位于：scoop\buckets\。

## 共享应用

如果要分享某个应用给他人的话，可以有以下方法：

* 将应用库同享给对方添加
* 通过本地或共享的应用清单文件安装，如：`scoop install \\shared\file\to\hello.js`
* 通过应用清单的 URL 安装，如：`scoop install https://path/to/hello.json` 

> 从后两种安装方法可以看出，事实上应用库不是必须的，重点是将应用清单传给 scoop install 命令。

# 应用清单示例

## [powershell](https://github.com/PowerShell/PowerShell)

```json
{
    ...
    "checkver": "github",
    "autoupdate": {
        "note": "Thanks for using autoupdate, please test your updates!",
        "architecture": {
            "64bit": {
                "url": "https://github.com/PowerShell/PowerShell/releases/download/v$version/PowerShell-$version-win-x64.zip"
            },
            "32bit": {
                "url": "https://github.com/PowerShell/PowerShell/releases/download/v$version/PowerShell-$version-win-x86.zip"
            }
        },
        "hash": {
            "url": "https://github.com/PowerShell/PowerShell/releases/latest",
            "find": "(?:$basename)[\\s\\S]{1,64}([a-fA-F0-9]{64})"
        }
    }
}
```

> 完整配置参见 [这里](https://raw.githubusercontent.com/ericzong/ericzone/master/powershell.json)。

上例中，由于 [powershell](https://github.com/PowerShell/PowerShell) 发布于 GitHub，homepage 即是其仓库地址，所以，checkver 属性指定为 github 即可。

> 注意，github 是一个特殊值。默认的正则表达式（`\/releases\/tag\/(?:v)?([\d.]+)`）只匹配了正式版，不会查找到预览版等版本。
>
> checkver 属性通常是一个正则表达式，可以从主页、指定页面、在线 JSON 文件、GitHub 仓库等中查找版本号。详细配置可参考 [这里](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate#add-checkver-to-a-manifest)。

autoupdate 属性中的 url 通常会引用版本变量 `$version`，以生成更新的下载地址。详见 [这里](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate#add-autoupdate-to-a-manifest)。

> 示例中，url 比较简单，只包含了一个版本变量。

示例中，哈希码的获取使用了一些技巧。

首先，url 使用的是 latest 路径，这里展示的也是最后一个正式版本，与 checkver 查找对应。（可以看下这个页面的结构）

匹配的正则表达式中使用到了 $basename 变量，它代表下载地址中的文件名。因为 powershell 一个正式版本发布包含多个系统及位数的文件，所以需要文件名去匹配。注意文件名后换了一行列出 SHA256 哈希码，因此使用 `[\\s\\S]{1, 64}` 匹配换行。这里量词不能是 *，否则会匹配到最后一个哈希码，而且实验发现使用 *? 勉强匹配并不生效，所以只好写一个范围——其数量不确定，所以使用 1~64（SHA256 码是 64 位，所以一般不会匹配出错）。

> autoupdate 属性中的 hash 可通过多种方式获取哈希码，包括：请求链接、在线文件中正则查找、JSON path 查找在线 JSON 文件等。详见 [这里](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate#add-hash-to-autoupdate)。

## Q-Dir

```json
{
    ...
    "extract_dir": "Q-Dir",
    ...
    "persist": [
        "Favoriten",
        "Q-Dir.ini"
    ],
    "checkver": "Q-Dir ([^\\ ]+)",
    "autoupdate": {
        ...
        "hash": {
            "url": "https://www.softwareok.com/?Download=Q-Dir"
        }
    }
}
```

> 完整配置参见 [这里](https://raw.githubusercontent.com/ericzong/ericzone/master/qdir.json)。与 powershell 类似的配置就不再赘述了。

首先，注意 Q-Dir 配置了 extract_dir 属性，但 powershell 没有。这是因为，powershell 压缩包直接包含所有文件，而 Q-Dir 压缩包包含的是 Q-Dir 目录，所以，需要 extract_dir 属性指明解压出 Q-Dir 目录中的文件。

其次，配置了 persist 属性，这是指定持久化数据的。这里主要是为了保存 Q-Dir 的配置文件和快捷目录。

checkver 属性是一个正则表达式，它从 homepage 中匹配版本信息。

最后，注意哈希码的查找。实事上，这里并没有正确配置。autoupdate.hash.url 指出的页面的确有相关的哈希码，但笔者多次实验均没有写出一个能正确匹配哈希码的正则表达式。不过，并不是说自动更新脚本就没法获取到哈希码了，只是会将文件缓存到本地计算出其哈希码而已。当然，如果文件较大会耗时一些。

# 参考资源

[scoop Wiki - Buckets](https://github.com/lukesampson/scoop/wiki/Buckets)

[scoop Wiki - App Manifests](https://github.com/lukesampson/scoop/wiki/App-Manifests)

[scoop Wiki - Optional Properties](https://github.com/lukesampson/scoop/wiki/App-Manifests#optional-properties)

[scoop Wiki - Creating an app manifest](https://github.com/lukesampson/scoop/wiki/Creating-an-app-manifest)

[scoop Wiki - Autoupdate](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate)

[我的应用库](https://github.com/ericzong/ericzone)


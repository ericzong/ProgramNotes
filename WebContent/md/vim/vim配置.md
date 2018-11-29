# 配置文件

在 Windows 系统中，用户配置文件 `_vimrc` 位于用户目录中——它是 Windows 下唯一缺省安装的配置文件。powershell 中可通过 `~/_vimrc` 访问；cmd 中通过 `%PROFILE%/_vimrc` 访问。

> 配置文件路径也可写作：\$HOME/_vimrc。其中，\$HOME 可在 vim 通过命令 `:echo $HOME` 来查看。
>
> 同样，`:echo $VIM` 可以查看 vim 安装路径。

`vim -u <config_file>` 可以使用指定的配置文件启动 vim，通常用于调试。

`vim -u NORC` 可以跳过所有配置文件启动 vim。

# 常用配置

| 设置选项               | 说明                   | 描述                          |
| ---------------------- | ---------------------- | ----------------------------- |
| set number \| nonumber | 显式/隐藏行号          |                               |
| syntax on              | 语法高亮               |                               |
| set t_Co=256           | 启用 256 色            |                               |
| set cursorline         | 光标所在行高亮         |                               |
| set encoding=utf-8     |                        |                               |
| set mouse=a            | 支持鼠标               |                               |
| set nobackup           | 不创建备份文件         | 备份文件名：\<filename\>~     |
| set noswapfile         | 不创建交换文件         | 交换文件名：.\<filename\>.swp |
| set autoread           | 自动重读               | 监视文件外部修改              |
| set autoindent         | 自动缩进               | 回车新一行缩进跟上一行一致    |
| set tabstop=4          | 制表符显式空格数       |                               |
| set shiftwidth=4       | 改变每一级缩进的空格数 |                               |
| set expandtab          | 制表符自动转换为空格   |                               |
| set softtabstop=4      | 制表符转换为的空格数   |                               |
| set textwidth=80       | 行宽                   |                               |
| set warp \| nowrap     | 是否自动换行           |                               |

## tabstop vs. shiftwidth vs. expandtab vs. softtabstop

这 4 个选项都是有关制表符的，一起使用时可能会混淆效果。下面尝试讨论各种情况。

**tabstop**：制表符代表的空格数。即所谓的制表符显示宽度。

**shiftwidth**：(自动) 缩进每一步使用的空白数目。通常使用 << 或 >> 来减少或增加缩进。

当 tabstop 和 shiftwidth 同时使用时，可能会涉及制表符和空格间的相互转换。

> **tabstop=8 & shiftwidth=4** (& softtabstop=0 & noexpandtab)
>
> 假设当前行没有缩进。\>\> 增加一个缩进则会插入 4 个空格，再增加一个缩进结果应该共有 8 个空格，但这 8 个空格会被替换为 1 个制表符。
>
> 反过来也是一样，假设当前行首有一个制表符。<< 减少一个缩进，那一个制表符会转换为 8 个空格，减去减少的一个缩进代表的 4 个空格，还剩 4 个空格。
>
> 注意，即使是手动插入的空格也会参与这种对换。

因此，如果 tabstop 和 shiftwidth 的值不同，那么，缩进行为和制表符之间就不是对等的，这通常不是我们想要的。通常我们设 shiftwidth=0，则会使用 tabstop 的值。

**softtabstop**：执行编辑操作，如按 \<Tab\> 或者 \<BS\> 时，把制表符算作空格的数目。

> **tabstop=4 & softtabstop=8** (&shiftwidth=0 & noexpandtab)
>
> 假设当前行没有缩进。在插入模式下按 1 次 \<Tab\>，此时等价于插入了 8 个空格，而一个制表符显式为 4 个空格，因此，实际上会插入 2 个制表符。

tabstop 与 softtabstop 不同的话，编辑时，按 1 次 \<Tab\> 键与插入一个制表符之间将不是对等的，这通常也不是我们想要的。通常设 softtabstop=0，使用 tabstop 的值。

看起来比较混乱，其实……是真的混乱！

一个简单的办法是，把 shiftwidth 涉及的缩进操作以及 softtabstop 涉及的编辑操作都使用空格来计数，最后，根据 tabstop 转换为制表符即可。

**expandtab**：插入模式里: 插入 \<Tab\> 时使用合适数量的空格。即将制表符替换为空格。

当 `set noexpandtab` 时，制表符和空格是可混用的，这可能在对换过程中出现一些意料之外的情况。因此，推荐 `set expandtab`。

总而言之，一个推荐的综合设置是（注意下面用了缩写形式）：

set ts=4 

set sw=0

set sts=0

set et

# 参考资料

[Vim 配置入门 - 阮一峰](http://www.ruanyifeng.com/blog/2018/09/vimrc.html)
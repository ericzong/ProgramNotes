# 可用cmd/Unix命令别名

| cmd/Unix |         |       |       |
| -------- | ------- | ----- | ----- |
| cat      | dir     | mount | rm    |
| cd       | echo    | move  | rmdir |
| chdir    | erase   | popd  | sleep |
| clear    | h       | ps    | sort  |
| cls      | history | pushd | tee   |
| copy     | kill    | pwd   | type  |
| del      | lp      | r     | write |
| diff     | ls      | ren   |       |

# 缩写

| Noun or Verb | Abbreviation |
| ------------ | ------------ |
| Get          | g            |
| Set          | s            |
| Item         | i            |
| Location     | l            |
| Command      | cm           |
| Alias        | al           |

| Cmdlet name    | Alias |
| -------------- | ----- |
| `Get-Item`     | gi    |
| `Set-Item`     | si    |
| `Get-Location` | gl    |
| `Set-Location` | sl    |
| `Get-Command`  | gcm   |
| `Get-Alias`    | gal   |

# 快捷键

| 快捷键       | 功能                              | 说明                                                         |
| ------------ | --------------------------------- | ------------------------------------------------------------ |
| Esc          | 清空当前命令行                    |                                                              |
| Insert       | 插入/改写模式切换                 |                                                              |
| Tab          | 自动补齐                          | 连续输入在多个候选项间切换                                   |
| Ctrl + Home  | 删除从光标到行首                  |                                                              |
| Ctrl + End   | 删除从光标到行尾                  |                                                              |
| F4           | 删除命令行至光标右边指定字符处    | 例如，当前输入“Get-Proc”，光标在“-”后，按 F4，键入“o” ，则命令为删除为“Get-oc”。注意：如果键入的字符不存在，则删除至末尾。 |
| F2           | 自动补充历史命令至指定字符        | 从上一条历史命令截取字符串。例如上一条命令为 Get-Process，按 F2，键入“s”，则补齐命令为 Get-Proce。 |
| ↑ / ↓        | 向上/下取回历史命令               | 可连续输入                                                   |
| PgUp / PgDn  | 显示当前会话的第一个/最后一个命令 |                                                              |
| F7           | 显示命令历史记录。                | 可用上下箭头选择执行；历史记录带编号，可与 F9 结合使用。     |
| F9           | 按历史命令编号取回命令            | 命令编号可用 F7 查看。                                       |
| F8           | 搜索历史记录                      | 按光标前的文本搜索包含它的历史命令，匹配多条命令连续按 F8 切换。 |
| ALT+F7       | 清除命令的历史记录                |                                                              |
| F3           | 取回上一条命令                    | 等效于按一次 ↑，连续按不会切换                               |
| F5           | 向上取回历史命令                  | 等效于 ↑                                                     |
| Ctrl + H     | 删除光标左边一个字符              | 等效于 Backspace                                             |
| Ctrl + M     | 执行当前命令                      | 等效于 Enter                                                 |
| Ctrl + Break | 终止当前命令执行                  | 等效于 Ctrl + C                                              |

# 参考资源

[PowerShell Documentation - MS](https://docs.microsoft.com/zh-cn/powershell/)

[Powershell - GitHub](https://github.com/PowerShell/PowerShell)

[PowerShell在线教程 - PSTips.net](https://www.pstips.net/powershell-online-tutorials)


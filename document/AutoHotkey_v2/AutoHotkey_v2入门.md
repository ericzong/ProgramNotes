



# GUI

## 托盘

```aut
; 托盘帮助文本
A_IconTip := "Eric HotKey"
; 托盘图标
TraySetIcon("hotkey.png", , 1)

; 托盘菜单
global tray := A_TrayMenu
tray.Delete("&Open")
tray.Delete("&Help")
tray.Delete("1&")
tray.Delete("&Window Spy")
tray.Rename("&Reload This Script", "重载脚本")
tray.Rename("&Edit This Script", "编辑脚本")
tray.Delete("&Suspend Hotkeys")
tray.Delete("&Pause Script")
tray.Rename("E&xit", "退出")
```


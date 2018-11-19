# 屏幕操作

## 获取屏幕尺寸

方法一（推荐）：

```python
# 使用 Windows API 获取
# 安装：pip install pypiwin32
import win32api
import win32con
win32api.GetSystemMetrics(win32con.SM_CXSCREEN)
# 1920
win32api.GetSystemMetrics(win32con.SM_CYSCREEN)
# 1200
```

方法二：

```python
# 使用 wxPython 获取
# 安装：pip install wxPython
import wx
# 必须首先创建 App 对象
wx.App()
wx.DisplaySize()
# (1920, 1200)
```

方法三：

```python
# 使用 Tkinter 获取
# 标准库，不需安装
import tkinter
# 必须首先创建窗口对象
win = tkinter.Tk()
win.winfo_screenwidth()
# 1920
win.winfo_screenheight()
# 1200
```


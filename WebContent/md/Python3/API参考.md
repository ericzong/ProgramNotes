# 迭代

## 生成索引序列

range(stop)

range(start, stop[, step])

# 系统

sys.exit()

sys.setrecursionlimit(n) ，设置递归深度限制。

exec，语句，无返回值，应传递命名空间。

eval，表达式，有返回值，应传递命名空间。

命名空间的用法：

1. 向命名空间加入值；
2. 读取预设值。

# 文件操作

copy.copy()

copy.deepcopy()

```python
# 自动关闭文件
with open("xxx") as f:
  for line in f:
    <Code Block>
```




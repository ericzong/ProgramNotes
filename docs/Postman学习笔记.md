# 概述

官网：https://www.getpostman.com （科学上网）

API 测试工具。

说明版本：6.0.10

# 安装

根据自己的操作系统选择下载对应的安装包安装，或者选择安装 Chrome 插件。

# 使用

Postman 的界面很简洁，基本上看一眼就能简单上手使用。

## URL

### encode

在 URL 输入框中选中要 encode 的文本，点击右击，弹出菜单中选择“EncodeURIComponent”。

### 参数

参数引用格式：

```
:Key
```

配置方式一（事先配置）：

点击 URL 输入框右边的“Params”按钮，在下方展开的表格中填入参数的 Key 和 Value 等。

配置方式二（引用生成）：

直接在 URL 中使用“:XXX”（XXX 参数尚未创建），参数配置表格中会自动添加 Key 为 XXX 的参数，只需设置 Value 即可。

> 示例：
>
> http://www.myhost.com/:path
>
> | Key  | Value  |
> | ---- | ------ |
> | path | mypath |
>
> 说明：该 URL 等价于 http://www.myhost.com/mypath。

### 变量

变量引用格式：

```
{{Key}}
```

变量可以在 Collections 或 Environment 中添加，添加方法见相关说明。

> 示例：
>
> {{HOST_ROOT}}/mypath
>
> | Key       | Value                 |
> | --------- | --------------------- |
> | HOST_ROOT | http://www.myhost.com |
>
> 说明：该 URL 等价于 http://www.myhost.com/mypath。

## Tests

在数据验证方面，Postman 没有类似其他 Restful API 测试工具的 Assert 配置，而是使用 JS 脚本编写 Tests 进行验证。

Postman 的一个测试格式如下：

```js
pm.test('test description', function() {
    // assert
})
```

> 技巧：
>
> 一些常用的测试验证代码不需要我们重复的录入，Request Tests 配置页面右边就有一个 Snippets 栏，列举了不少常用的代码片断，可以简单的点击它们便可插入脚本编辑器的末尾。
>
> 我们不仅可以编写 Request Tests，也可以编写 Collections 和 Folder 的 Tests。这方便我们各个 Request 都要进行的验证提取到 Collections 或 Folder 层级。

### 调试

我们可以通过控制台输出一些信息以便调试：

```js
console.log(xxx);
```

当然，Postman 的控制台默认没有打开，通过菜单“View -> Show Postman Console”或快捷键 Alt+Ctrl+C 打开控制台。

# 附录

## 资源

官方文档：https://www.getpostman.com/docs/v6/
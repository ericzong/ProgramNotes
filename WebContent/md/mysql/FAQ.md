# 管理

## 远程连接异常

> 如果 MySQL 安装在虚拟机中，而且系统环境没有明显异常，那么应首先考虑是系统防火墙引起的。
>
> 这常见于 Win10 系统中，防火墙可能会阻止数据库客户端连接。

异常信息：远程mysql_java.sql.SQLException: null, message from server: "Host 'xxx' is not allowed to connect

简单来说，就是远程客户机不被允许访问MySQL，要使其可以访问需要作如下修改。

```mysql
select `user`, host from user;
update user set host = '%' where user = 'root';
```

这样使用root用户就可以进行远程访问了。

注意，修改后需要重启MySQL服务。

## 插入用户记录报错

MySQL5.7+，默认情况下应该会报如下错误：

ERROR 1364 (HY000): Field 'ssl_cipher' doesn't have a default value

这是因为使用了严格模式，禁用即可，这需要修改MySQL的配置文件。该配置文件位于MySQL Server 5.7目录下，一般名为my.ini，如果没有手动创建一个即可，至少应有以下配置：

```ini
[mysqld]
sql-mode="NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
```

> 注意：
>
> 如果配置文件存在，sql-mode的配置可能是：
>
> sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
>
> 其中，“STRICT_TRANS_TABLES”即是严格模式的配置，删除即可。

# Java程序

## 过时的驱动类

在Java编程中，如果使用6.x.x版本的connector，并使用如下语句加载驱动类：

```java
Class.forName("com.mysql.jdbc.Driver");
```

则控制台会输出如下警告信息：

```
Loading class 'com.mysql.jdbc.Driver'. This is deprecated. The new driver class is 'com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
```

该警告说明，驱动类com.mysql.jdbc.Driver已经过时了，新驱动类是com.mysql.cj.jdbc.Driver，应该使用最新的驱动类。并且新的驱动类会自动注册，而不需要使用Class.forName()来手动注册。

## 时区错误

当使用如“jdbc:mysql://localhost:3306/testdb”的URL连接MySQL时，可能会出现如下错误：

```
The server time zone value 'xxx' is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.
```

错误信息说明，指定的时区（通常是默认的）不对，需要通过serverTimezone属性来指定：

```
// UTC 时间
jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC
// GMT+8（北京时间）
jdbc:mysql://localhost:3306/testdb?serverTimezone=GMT%2B8
```

> 注意：使用东8区时，“+”编码为“%2B”了。这是因为，URL中“+”被视为空格。

另外，也可以设置MySQL的全局时区：

```mysql
set global time_zone='+8:00'
```


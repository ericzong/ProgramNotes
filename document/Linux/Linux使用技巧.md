# 程序安装

# Java

1. 下载Linux压缩包 jdk-8u181-linux-x64.tar.gz，解压到希望的位置，如：/home/ericzong/softwares/jdk1.8.0_181/

2. 编辑 profile 文件

   ```shell
   sudo vim /etc/profile
   # 在文件最后追加以下内容
   # set java environment
   JAVA_HOME=/home/ericzong/sofewares/jdk1.8.0_181
   JRE_HOME=$JAVA_HOME/jre
   CLASSPATH=.:$JAVA_HOME/lib/
   PATH=$JAVA_HOME/bin:$PATH
   # 使 profile 生效
   source /etc/profile
   ```

## LibreOffice

```shell
# 安装
sudo apt-get install libreoffice
# 卸载
sudo apt-get remove libreoffice
```

仓库地址：http://packages.deepin.com/deepin/pool/main/libr/libreoffice/

# 快捷技巧

## 命令在终端可直接访问

需要在 /usr/local/bin 目录下创建相应命令的软链接即可：

```shell
cd /usr/local/bin
sudo ln -s ~/path/to/command
```


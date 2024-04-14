---
title: Nodejs 的版本管理
order: 1
article: false
category:
  - Nodejs
tag:
  - Nodejs
---

当不同项目需要不同的 Nodejs 版本的时候。就需要切换版本了，这时候需要一个版本管理工具来帮我们管理 Nodejs 的版本。

## nvm

nvm 算是目前使用人数较多，使用也比较简单的一款版本管理工具了。

[下载地址](https://github.com/coreybutler/nvm-windows/releases)

如果电脑已经安装过 Nodejs，为了避免一些错误，先卸载掉吧。

安装就傻瓜式安装就行了。

安装好了之后，在命令行直接执行:

```shell
nvm -v
```

打印出版本以及 Usage 说明安装成功了。

#### 常用命令

```shell
nvm list available
```

显示可以安装的所有 nodejs 版本。

```shell
nvm install 16.0.0
```

安装某一个版本的 nodejs 。

安装完成后，可以执行

```shell
nvm list
```

查看当前安装版本列表。

如果想使用列表里面的某个版本的话，可以执行

```shell
nvm use 16.0.0
```

使用 `16.0.0` 版本。

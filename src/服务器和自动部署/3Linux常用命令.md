---
title: Linux 常用命令
order: 3
#article: false
category:
  - 云服务器
tag:
  - 云服务器
---

## 目录操作

- `mkdir`：创建目录
- `rm -rf`：删除目录 
- `cd`：定位目录 
- `ls` `ll`：查看目录文件 
- `mv`：修改目录名 
- `cp`：拷贝目录

## 文件操作

- `touch` `vi`：创建文件
- `rm`：删除文件
- `mv`：修改文件名
- `cp`：拷贝文件

## 文件内容操作

- `cat` `head` `tail`：查看文件
- `vi` `vim`：编辑文件内容

## 远程操作

### 远程拷贝

把当前目录 package.json 拷贝到服务器 /root/test-dir 目录下

如果设置了信任，则不用输入密码。否则得需要输入密码。

```shell
scp ./package.json user@127.0.0.1:/root/test-dir
```

如果是上传一个文件夹

```shell
scp -r dist user@host:/home/
```

这样会上传整个 dist 文件夹上去。

如果你不是 root 用户，需要先看看有没有权限，并且如果设置了权限，可以设置用户文件夹的权限

登录云服务器，使用 root 权限，给你的用户设置可以操作的文件夹。

```shell
chown -R username dirname
```

### 远程执行命令

远程执行命令 `cd ./test-dir; touch a.txt`

```shell
ssh user@127.0.0.1 "cd ./test-dir; touch a.txt"
```

## 查看服务

```bash
# 启动服务
service [server-name] start
# 停止服务
service [server-name] strop
# 重启服务
service [server-name] restart
# 查看状态
service [server-name] status
```

## 网络和端口

```bash
# 查看端口占用情况
netstat -tulnp
```

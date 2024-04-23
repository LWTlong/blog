---
title: Linux 常用命令
order: 3
article: false
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

### 远程执行命令

远程执行命令 `cd ./test-dir; touch a.txt`

```shell
ssh user@127.0.0.1 "cd ./test-dir; touch a.txt"
```

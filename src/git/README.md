---
title: git
index: false
---

git 相关的内容只会记录一些操作少的命令，常用的更新提交就不说了

## 本地代码关联新仓库或者已有的远程仓库

首先切换到工程目录下：

```shell
# 如果初始化过了 直接忽略
git init
git add .
git commit -m '提交说明'
git branch -M master
# 切换仓库
git remote add origin git@仓库地址.git
git push -u origin master
```

如果报：remote origin already exists.

```shell
# 查看当前远程仓库
git remote -v
# 删除远程仓库 重新添加 origin
git remote remove origin
# 或者更新 origin
git remote set-url origin <new-repository-url>
```

接着再次执行 `push` 即可。


## 生成 ssh

github 对密钥进行了升级，不再支持以前的 RSA。

生成新的秘钥

```shell
ssh-keygen -t ecdsa -b 521 -C "your_email@example.com"
```

windows 系统可以使用 git bash 执行，或者自行查找 `.ssh` 文件夹路径

```shell
ls ~/.ssh/
```

会有两个文件:

- `id_ecdsa` 私钥
- `id_ecdsa.pub` 公钥

当然肯定是使用公钥：

```shell
cat ~/.ssh/id_ecdsa.pub
```

复制输出的文件内容，即可去代码托管平台添加 `ssh` 。

## 撤销

撤销暂存 `add`

全部撤销

```shell
git reset
```

撤销特定的文件或文件夹

```shell
git reset <file_or_folder_path>
```

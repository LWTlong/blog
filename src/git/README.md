---
title: git
index: false
---

git 相关的内容只会记录一些操作少的命令，常用的更新提交就不说了

# 本地代码关联新仓库或者已有的远程仓库

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
